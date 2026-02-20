import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

type CookieToSet = {
  name: string
  value: string
  options: CookieOptions
}

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      cookies: {
        getAll(): ReturnType<typeof cookieStore.getAll> {
          return cookieStore.getAll()
        },

        setAll(cookiesToSet: CookieToSet[]): void {
          try {
            cookiesToSet.forEach((cookie: CookieToSet) => {
              cookieStore.set(cookie.name, cookie.value, cookie.options)
            })
          } catch {
            // Safe to ignore in Server Components
          }
        },
      },
    }
  )
}
