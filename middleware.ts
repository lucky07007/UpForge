import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * UPFORGE DUAL-DOMAIN MIDDLEWARE
 * * STRATEGY: 
 * 1. .org = Global Authority / Dataset / UFRN Registry
 * 2. .in  = India Marketing Hub / Founder Stories / Local SEO
 * * We do NOT redirect between domains to avoid "collapsing" authority.
 * Instead, we use the 'x-upforge-domain' header so components can 
 * render domain-specific canonicals and SEO content.
 */

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  
  // Identify the domain context
  const isOrg = hostname.includes('upforge.org')
  const domainContext = isOrg ? 'org' : 'in'

  // 1. Create the initial response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Add domain context to headers for use in Server Components (headers())
  // This allows us to avoid re-parsing the hostname in every page/component.
  response.headers.set('x-upforge-domain', domainContext)

  // 3. Standard Supabase session handling (SSR)
  // This ensures the user session is synced across the server and client.
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
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  await supabase.auth.getUser()

  return response
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - public assets (svg, png, jpg, webp, etc)
   */
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
