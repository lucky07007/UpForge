// lib/supabase/server.ts
//
// TWO CLIENTS:
//
// createClient()     — full client with cookie-based auth session support
//                      Use in: auth flows, user-specific data, mutations
//
// createReadClient() — lightweight read-only client, no session management
//                      Use in: registry queries, blog queries, sitemap,
//                      generateStaticParams, generateMetadata
//                      Faster instantiation, no GoTrue overhead
//
// ENVIRONMENT VARIABLES:
// NEXT_PUBLIC_SUPABASE_URL      — your project URL (safe to expose)
// NEXT_PUBLIC_SUPABASE_ANON_KEY — anon/public key (safe to expose)
//                                 RLS protects data, not key secrecy
//
// NEVER add NEXT_PUBLIC_ prefix to:
// SUPABASE_SERVICE_ROLE_KEY     — server-only, never expose to client

import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

// ---------------------------------------------------------------------------
// ENVIRONMENT VALIDATION
// Fail loudly at startup rather than silently at query time.
// A clear error message saves hours of debugging.
// ---------------------------------------------------------------------------
function getSupabaseConfig(): { url: string; anonKey: string } {
  const url     = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url) {
    throw new Error(
      "[Supabase] NEXT_PUBLIC_SUPABASE_URL is not defined.\n" +
      "Add it to your .env.local file and Vercel environment variables."
    )
  }

  if (!anonKey) {
    throw new Error(
      "[Supabase] NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined.\n" +
      "Add it to your .env.local file and Vercel environment variables."
    )
  }

  // Validate URL format to catch copy-paste errors
  try {
    new URL(url)
  } catch {
    throw new Error(
      `[Supabase] NEXT_PUBLIC_SUPABASE_URL is not a valid URL: "${url}"\n` +
      "It should look like: https://yourproject.supabase.co"
    )
  }

  return { url, anonKey }
}

// ---------------------------------------------------------------------------
// TYPE
// ---------------------------------------------------------------------------
type CookieToSet = {
  name: string
  value: string
  options: CookieOptions
}

// ---------------------------------------------------------------------------
// FULL CLIENT — with cookie-based auth session
//
// Use for:
//   - Authentication flows (login, logout, session check)
//   - User-specific data queries
//   - Server Actions that mutate data on behalf of a user
//   - Route Handlers that need session context
//
// Reads and writes cookies — requires a request context.
// ---------------------------------------------------------------------------
export async function createClient() {
  const { url, anonKey } = getSupabaseConfig()
  const cookieStore = await cookies()

  return createServerClient(url, anonKey, {
    auth: {
      // Server components are stateless — no point persisting session to storage
      persistSession: false,
      // No need to refresh tokens in server context — each request is fresh
      autoRefreshToken: false,
      // Detect session from cookies (correct for SSR)
      detectSessionInUrl: false,
    },
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
          // Expected in Server Components — cookies are read-only there.
          // Route Handlers and Server Actions will succeed.
          // If you need to debug cookie set failures, uncomment:
          // console.warn("[Supabase] Could not set cookies:", error)
        }
      },
    },
  })
}

// ---------------------------------------------------------------------------
// READ CLIENT — lightweight, no session management
//
// Use for:
//   - Public data queries (startups, blogs, registry)
//   - generateMetadata()
//   - generateStaticParams()
//   - sitemap.ts
//   - Any query that does not need user identity
//
// Does NOT read or write cookies — safe to call outside request context
// (e.g. during static build where no cookie store exists).
// Significantly faster than createClient() for read-only operations.
// ---------------------------------------------------------------------------
export function createReadClient() {
  const { url, anonKey } = getSupabaseConfig()

  return createServerClient(url, anonKey, {
    auth: {
      // No session management needed for public read queries
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },

    cookies: {
      // Force fresh request each time (prevents Next.js cache reuse)
      getAll: () => [],
      setAll: () => {},
    },

    global: {
      fetch: (input, init) => {
        return fetch(input, {
          ...init,
          cache: "no-store", // 🚀 MOST IMPORTANT LINE
        })
      },
    },
  })
}

// ---------------------------------------------------------------------------
// SERVICE ROLE CLIENT (optional — add when needed)
//
// Use ONLY for:
//   - Admin operations (approving/rejecting startups)
//   - Bypassing RLS for trusted server-side operations
//
// NEVER expose SUPABASE_SERVICE_ROLE_KEY to the client.
// NEVER use NEXT_PUBLIC_ prefix on it.
// Call only from trusted server-side contexts (Server Actions, API routes).
//
// Uncomment when needed:
// ---------------------------------------------------------------------------
// export function createServiceClient() {
//   const { url } = getSupabaseConfig()
//   const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
//
//   if (!serviceKey) {
//     throw new Error(
//       "[Supabase] SUPABASE_SERVICE_ROLE_KEY is not defined.\n" +
//       "Add it only to server-side environment variables — NEVER with NEXT_PUBLIC_ prefix."
//     )
//   }
//
//   return createServerClient(url, serviceKey, {
//     auth: {
//       persistSession: false,
//       autoRefreshToken: false,
//       detectSessionInUrl: false,
//     },
//     cookies: {
//       getAll: () => [],
//       setAll: () => {},
//     },
//   })
// }
