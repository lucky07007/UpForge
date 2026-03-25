/**
 * lib/domain.ts — UpForge Domain Utilities (universal)
 *
 * ✅ Safe to import in BOTH Server Components AND Client Components.
 * ✅ No 'next/headers', no browser APIs at module level.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type DomainContext = 'in' | 'org'

export interface DomainMeta {
  context: DomainContext
  baseUrl: string
  alternateUrl: string
  isIndia: boolean
  isGlobal: boolean
  locale: string
  hreflangSelf: string
  hreflangAlternate: string
  siteName: string
  region: 'IN' | 'GLOBAL'
}

// ─── Client-safe domain detection ────────────────────────────────────────────

export function getDomainContextClient(): DomainContext {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_DOMAIN === 'org' ? 'org' : 'in'
  }
  const htmlDomain = document.documentElement.getAttribute('data-domain')
  if (htmlDomain === 'org') return 'org'
  if (htmlDomain === 'in')  return 'in'
  return window.location.hostname.includes('upforge.org') ? 'org' : 'in'
}

// ─── getDomainMeta ────────────────────────────────────────────────────────────

export function getDomainMeta(context: DomainContext): DomainMeta {
  if (context === 'org') {
    return {
      context:           'org',
      baseUrl:           'https://www.upforge.org',
      alternateUrl:      'https://www.upforge.in',
      isIndia:           false,
      isGlobal:          true,
      locale:            'en-US',
      hreflangSelf:      'en',
      hreflangAlternate: 'en-IN',
      siteName:          'UpForge',
      region:            'GLOBAL',
    }
  }
  return {
    context:           'in',
    baseUrl:           'https://www.upforge.in',
    alternateUrl:      'https://www.upforge.org',
    isIndia:           true,
    isGlobal:          false,
    locale:            'en-IN',
    hreflangSelf:      'en-IN',
    hreflangAlternate: 'en',
    siteName:          'UpForge',
    region:            'IN',
  }
}

// ─── URL helpers ──────────────────────────────────────────────────────────────

/**
 * getStartupUrl(slug, context)
 * Ab ye hamesha relative path return karega taaki domain change na ho.
 */
export function getStartupUrl(slug: string, context: DomainContext): string {
  return `/startup/${slug}`
}

/**
 * getRegistryUrl(path, context)
 * Registry ke liye domain switch logic rakha hai (optional).
 */
export function getRegistryUrl(path = '', context: DomainContext): string {
  const suffix = path ? `/${path}` : ''
  return context === 'in'
    ? `https://www.upforge.org/registry${suffix}`
    : `/registry${suffix}`
}

/**
 * getNavUrl(route, context)
 * Isme se 'inRoutes' ka redirection logic hata diya gaya hai.
 */
export function getNavUrl(route: string, context: DomainContext): string {
  const orgRoutes = ['/registry', '/ufrn', '/global']
  
  // Sirf tabhi switch karein jab .in wala user specifically Global Registry dekhna chahe
  if (orgRoutes.some(r => route.startsWith(r)) && context === 'in') {
    return `https://www.upforge.org${route}`
  }

  // Pehle yahan .org se .in par bhejne ka logic tha, use hata diya gaya hai.
  return route
}

/**
 * getCanonicalUrl(pathname, context)
 */
export function getCanonicalUrl(pathname: string, context: DomainContext): string {
  const { baseUrl } = getDomainMeta(context)
  const cleanPath = pathname === '/' ? '' : pathname.replace(/\/$/, '')
  return `${baseUrl}${cleanPath}`
}

/**
 * getAlternatesForLayout(pathname, context)
 */
export function getAlternatesForLayout(pathname: string, context: DomainContext) {
  const inUrl  = `https://www.upforge.in${pathname === '/' ? '' : pathname}`
  const orgUrl = `https://www.upforge.org${pathname === '/' ? '' : pathname}`
  return {
    canonical: context === 'in' ? inUrl : orgUrl,
    languages: {
      'en-IN':     inUrl,
      'en':        orgUrl,
      'x-default': orgUrl,
    },
  }
}

// ─── JSON-LD helpers ──────────────────────────────────────────────────────────

export function getOrganizationJsonLd(context: DomainContext) {
  const { baseUrl } = getDomainMeta(context)
  const isGlobal = context === 'org'
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'UpForge',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: isGlobal
      ? 'UpForge is the global startup registry and emerging market intelligence platform.'
      : "UpForge is India's independent, verified startup registry and founder intelligence platform.",
    foundingDate: '2024',
    areaServed: isGlobal
      ? { '@type': 'Place', name: 'Worldwide' }
      : { '@type': 'Country', name: 'India' },
    sameAs: [
      'https://twitter.com/upforge_in',
      'https://www.linkedin.com/company/upforge',
    ],
  }
}

export function getWebsiteJsonLd(context: DomainContext) {
  const { baseUrl, locale } = getDomainMeta(context)
  const searchBase = context === 'org'
    ? 'https://www.upforge.org/registry'
    : 'https://www.upforge.in/startup'
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'UpForge',
    inLanguage: locale,
    publisher: { '@id': `${baseUrl}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${searchBase}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
