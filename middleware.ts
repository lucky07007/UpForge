// middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * UPFORGE AUTHORITY CONSOLIDATION MIDDLEWARE
 * * STRATEGY:
 * 1. Permanently redirect (301) all upforge.in traffic to upforge.org.
 * 2. Maintain 'x-upforge-domain' as 'org' for the entire application.
 * 3. Ensure Supabase auth sessions are refreshed on the primary domain.
 */
export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? ''
  const pathname = request.nextUrl.pathname

  // ── 1. ENFORCE GLOBAL REDIRECT ───────────────────────────────────────────
  // If the request comes from the .in domain, redirect to .org immediately.
  if (hostname.includes('upforge.in')) {
    const url = request.nextUrl.clone()
    url.hostname = 'www.upforge.org'
    url.protocol = 'https'
    return NextResponse.redirect(url, 301)
  }

  // Define domain context as global 'org' for all remaining requests
  const domainContext = 'org'

  // ── 2. BUILD RESPONSE & HEADERS ──────────────────────────────────────────
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  // Inject domain context headers (used by lib/domain.ts and server components)
  response.headers.set('x-upforge-domain',   domainContext)
  response.headers.set('x-upforge-pathname', pathname)

  // ── 3. SUPABASE SSR SESSION HANDLING ──────────────────────────────────────
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
          response.headers.set('x-upforge-domain',   domainContext)
          response.headers.set('x-upforge-pathname', pathname)
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.headers.set('x-upforge-domain',   domainContext)
          response.headers.set('x-upforge-pathname', pathname)
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
