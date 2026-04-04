// proxy.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') ?? ''
  const url = request.nextUrl.clone()

  // 1️⃣ REDIRECT .in to .org (Strict check)
  if (hostname.includes('upforge.in')) {
    url.hostname = 'www.upforge.org'
    url.protocol = 'https'
    return NextResponse.redirect(url, 301)
  }

  // 2️⃣ FORCE NON-WWW TO WWW (Strict equality check prevents loops)
  if (hostname === 'upforge.org') {
    url.hostname = 'www.upforge.org'
    url.protocol = 'https'
    return NextResponse.redirect(url, 301)
  }

  let response = NextResponse.next()

  const pathname = request.nextUrl.pathname
  const domainContext = 'org'

  response.headers.set('x-upforge-domain', domainContext)
  response.headers.set('x-upforge-pathname', pathname)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  await supabase.auth.getUser()
  return response
}
