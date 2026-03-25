/**
 * lib/domain.ts — UpForge Domain Intelligence Layer
 *
 * ARCHITECTURE:
 * ─────────────────────────────────────────────────────────────────────────────
 *  upforge.in   → India hub  : Founder stories, local SEO, Indian startup pages
 *  upforge.org  → Global hub : UFRN Registry, cross-border data, global SEO
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * HOW getDomainContext() WORKS:
 *  • Server Components / layouts  → reads the `x-upforge-domain` header set by
 *    middleware.ts (no hostname parsing needed — fast and reliable).
 *  • Client Components            → reads window.location.hostname at runtime.
 *  • Build-time / ISR / SSG       → falls back to NEXT_PUBLIC_DOMAIN env var,
 *    then defaults to 'in' (safe for Vercel preview deployments).
 *
 * USAGE:
 *  import { getDomainContext, getDomainMeta, getStartupUrl } from '@/lib/domain'
 */

import { headers } from 'next/headers'

// ─── Types ────────────────────────────────────────────────────────────────────

export type DomainContext = 'in' | 'org'

export interface DomainMeta {
  context: DomainContext
  baseUrl: string          // e.g. "https://www.upforge.in"
  alternateUrl: string     // e.g. "https://www.upforge.org"
  isIndia: boolean
  isGlobal: boolean
  locale: string           // "en-IN" | "en-US"
  hreflangSelf: string     // for <link rel="alternate" hreflang="...">
  hreflangAlternate: string
  siteName: string
  region: 'IN' | 'GLOBAL'
}

// ─── Core: getDomainContext ───────────────────────────────────────────────────

/**
 * getDomainContext()
 *
 * Server-side: reads the `x-upforge-domain` header injected by middleware.ts.
 * This is the canonical way to detect domain in Server Components and layouts.
 *
 * Returns 'in' | 'org'
 *
 * @example
 * // In a Server Component or layout:
 * import { getDomainContext } from '@/lib/domain'
 * const ctx = await getDomainContext()  // 'in' or 'org'
 */
export async function getDomainContext(): Promise<DomainContext> {
  try {
    // next/headers is available in Server Components, layouts, and API routes.
    // It throws in Client Components — that's expected; use getDomainContextClient() there.
    const headersList = await headers()
    const domainHeader = headersList.get('x-upforge-domain')

    if (domainHeader === 'org') return 'org'
    if (domainHeader === 'in') return 'in'

    // Fallback: check NEXT_PUBLIC_DOMAIN env (set per-deployment in Vercel)
    // e.g. NEXT_PUBLIC_DOMAIN=org for the upforge.org Vercel project
    const envDomain = process.env.NEXT_PUBLIC_DOMAIN
    if (envDomain === 'org') return 'org'
    if (envDomain === 'in') return 'in'

    // Safe default — .in is the primary deployment
    return 'in'
  } catch {
    // headers() throws outside of a request context (build time, ISR shell)
    const envDomain = process.env.NEXT_PUBLIC_DOMAIN
    return envDomain === 'org' ? 'org' : 'in'
  }
}

/**
 * getDomainContextClient()
 *
 * Client-side equivalent. Reads window.location.hostname.
 * Only call this inside a useEffect or event handler (not during SSR).
 *
 * @example
 * // In a Client Component:
 * import { getDomainContextClient } from '@/lib/domain'
 * const ctx = getDomainContextClient()
 */
export function getDomainContextClient(): DomainContext {
  if (typeof window === 'undefined') {
    // Called during SSR of a Client Component — use env fallback
    return process.env.NEXT_PUBLIC_DOMAIN === 'org' ? 'org' : 'in'
  }
  return window.location.hostname.includes('upforge.org') ? 'org' : 'in'
}

// ─── getDomainMeta ────────────────────────────────────────────────────────────

/**
 * getDomainMeta(context)
 *
 * Returns the full metadata object for a given domain context.
 * Used in layout.tsx for metadata, JSON-LD, and hreflang generation.
 *
 * @example
 * const ctx = await getDomainContext()
 * const meta = getDomainMeta(ctx)
 * console.log(meta.baseUrl) // "https://www.upforge.in"
 */
export function getDomainMeta(context: DomainContext): DomainMeta {
  if (context === 'org') {
    return {
      context: 'org',
      baseUrl: 'https://www.upforge.org',
      alternateUrl: 'https://www.upforge.in',
      isIndia: false,
      isGlobal: true,
      locale: 'en-US',
      hreflangSelf: 'en',          // x-default and global English
      hreflangAlternate: 'en-IN',
      siteName: 'UpForge',
      region: 'GLOBAL',
    }
  }

  return {
    context: 'in',
    baseUrl: 'https://www.upforge.in',
    alternateUrl: 'https://www.upforge.org',
    isIndia: true,
    isGlobal: false,
    locale: 'en-IN',
    hreflangSelf: 'en-IN',
    hreflangAlternate: 'en',
    siteName: 'UpForge',
    region: 'IN',
  }
}

// ─── URL helpers ──────────────────────────────────────────────────────────────

/**
 * getStartupUrl(slug, context)
 *
 * Returns the correct absolute or relative URL for a startup detail page.
 *
 * .in  context → relative  /startup/[slug]   (no domain hop, fast nav)
 * .org context → absolute  https://www.upforge.in/startup/[slug]
 *                           (startup pages live on .in — cross-domain link)
 *
 * @example
 * const url = getStartupUrl('zepto', 'org')
 * // → "https://www.upforge.in/startup/zepto"
 */
export function getStartupUrl(slug: string, context: DomainContext): string {
  if (context === 'org') {
    return `https://www.upforge.in/startup/${slug}`
  }
  return `/startup/${slug}`
}

/**
 * getRegistryUrl(path, context)
 *
 * Returns the correct URL for a registry page.
 *
 * .org context → relative  /registry/[path]  (registry lives on .org)
 * .in  context → absolute  https://www.upforge.org/registry/[path]
 *
 * @example
 * const url = getRegistryUrl('fintech', 'in')
 * // → "https://www.upforge.org/registry/fintech"
 */
export function getRegistryUrl(path: string = '', context: DomainContext): string {
  const suffix = path ? `/${path}` : ''
  if (context === 'in') {
    return `https://www.upforge.org/registry${suffix}`
  }
  return `/registry${suffix}`
}

/**
 * getNavUrl(route, context)
 *
 * Generic domain-aware URL resolver for Navbar / Footer links.
 * Routes that belong to a specific domain are returned as absolute
 * cross-domain URLs when accessed from the "wrong" domain.
 *
 * Route ownership:
 *   .in  owns: /startup/*, /founders, /sector, /reports
 *   .org owns: /registry/*, /ufrn, /global
 *
 * @example
 * getNavUrl('/registry', 'in')   // → "https://www.upforge.org/registry"
 * getNavUrl('/startup', 'org')   // → "https://www.upforge.in/startup"
 * getNavUrl('/about', 'in')      // → "/about"  (shared, stays relative)
 */
export function getNavUrl(route: string, context: DomainContext): string {
  const orgRoutes = ['/registry', '/ufrn', '/global']
  const inRoutes  = ['/startup', '/founders', '/sector', '/reports']

  const isOrgRoute = orgRoutes.some(r => route.startsWith(r))
  const isInRoute  = inRoutes.some(r => route.startsWith(r))

  if (isOrgRoute && context === 'in') return `https://www.upforge.org${route}`
  if (isInRoute  && context === 'org') return `https://www.upforge.in${route}`

  // Shared routes (/about, /contact, /blog, etc.) — keep relative
  return route
}

// ─── Metadata helpers ─────────────────────────────────────────────────────────

/**
 * getCanonicalUrl(pathname, context)
 *
 * Returns the canonical URL for a given page path on the current domain.
 *
 * @example
 * getCanonicalUrl('/startup/zepto', 'in')
 * // → "https://www.upforge.in/startup/zepto"
 */
export function getCanonicalUrl(pathname: string, context: DomainContext): string {
  const { baseUrl } = getDomainMeta(context)
  // Strip trailing slash from pathname (except root)
  const cleanPath = pathname === '/' ? '' : pathname.replace(/\/$/, '')
  return `${baseUrl}${cleanPath}`
}

/**
 * getAlternatesForLayout(pathname, context)
 *
 * Returns the Next.js `alternates` metadata object for hreflang implementation.
 * Drop this directly into your generateMetadata() return value.
 *
 * Implements the Google-recommended cross-domain hreflang pattern:
 * https://developers.google.com/search/docs/specialty/international/localization
 *
 * @example
 * // In app/layout.tsx or any page's generateMetadata():
 * const alternates = getAlternatesForLayout(pathname, ctx)
 * return { ...baseMetadata, alternates }
 */
export function getAlternatesForLayout(
  pathname: string,
  context: DomainContext
) {
  const inUrl  = `https://www.upforge.in${pathname === '/' ? '' : pathname}`
  const orgUrl = `https://www.upforge.org${pathname === '/' ? '' : pathname}`

  return {
    canonical: context === 'in' ? inUrl : orgUrl,
    languages: {
      'en-IN':    inUrl,   // Indian English → .in
      'en':       orgUrl,  // Global English  → .org
      'x-default': orgUrl, // Default fallback → .org (global)
    },
  }
}

// ─── JSON-LD helpers ──────────────────────────────────────────────────────────

/**
 * getOrganizationJsonLd(context)
 *
 * Returns domain-aware Organization schema.
 * .in  → areaServed: India
 * .org → areaServed: Worldwide
 */
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
      : 'UpForge is India\'s independent, verified startup registry and founder intelligence platform.',
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

/**
 * getWebsiteJsonLd(context)
 *
 * Returns domain-aware WebSite schema with correct SearchAction URL.
 */
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
