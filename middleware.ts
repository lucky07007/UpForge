// middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * UPFORGE DUAL-DOMAIN MIDDLEWARE
 *
 * STRATEGY:
 * 1. .org = Global Authority / Dataset / UFRN Registry
 * 2. .in  = India Marketing Hub / Founder Stories / Local SEO
 *
 * We do NOT redirect between domains to avoid collapsing authority.
 * Instead we set 'x-upforge-domain' so Server Components can generate
 * correct canonical tags, hreflang, and domain-aware startup URLs
 * without re-parsing the hostname in every page/component.
 *
 * CROSS-DOMAIN LEAK FIX:
 * Previously, startup card/detail links used relative hrefs (/startup/slug)
 * which worked fine on .in but broke on .org — Next.js resolved them against
 * the current domain. The x-upforge-domain header is read by lib/domain.ts →
 * getStartupUrl() which returns absolute URLs on .org and relative on .in.
 */
export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  const isOrg = hostname.includes('upforge.org')
  const domainContext = isOrg ? 'org' : 'in'

  // 1. Create initial response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Set domain context header for Server Components (via lib/domain.ts)
  response.headers.set('x-upforge-domain', domainContext)

  // 3. Supabase SSR session handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.headers.set('x-upforge-domain', domainContext)
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.headers.set('x-upforge-domain', domainContext)
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Refresh session if expired — required for Server Components
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
