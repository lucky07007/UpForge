// app/sitemap.ts
//
// ARCHITECTURE NOTE:
// This is a sitemap INDEX that delegates to three sub-sitemaps:
//   /sitemap/static.xml   — static routes
//   /sitemap/startups.xml — approved startup profiles
//   /sitemap/blogs.xml    — published blog posts
//
// At 5000+ startups and 2500+ blogs, a single sitemap.ts will exceed
// recommended per-file limits. The index pattern scales to 50,000+ pages.
//
// HOW TO ACTIVATE SUB-SITEMAPS:
// Create the following files:
//   app/sitemap/static/route.ts
//   app/sitemap/startups/route.ts
//   app/sitemap/blogs/route.ts
// Templates for each are provided below this file.
//
// Until sub-sitemaps are created, this file generates a single combined
// sitemap that works correctly for your current scale.

import { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"

const BASE_URL = "https://www.upforge.in"

// ---------------------------------------------------------------------------
// STATIC ROUTES
// Rules:
// - Only include pages that exist and return 200
// - Do NOT include pages with canonical conflicts (/industries, /verification)
//   until those canonical errors are resolved in Google Search Console
// - lastModified uses a real date, not new Date() on every request
//   (dynamic new Date() trains Google to distrust your freshness signals)
// - /submit is a form page, not a discovery page — priority capped at 0.6
// ---------------------------------------------------------------------------
const STATIC_ROUTES: Array<{
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  lastModified: string // ISO date string — update manually when page changes
}> = [
  {
    path: "",
    priority: 1.0,
    changeFrequency: "daily",
    lastModified: "2026-01-01",
  },
  {
    path: "/startup",
    priority: 0.9,
    changeFrequency: "daily",
    lastModified: "2026-01-01",
  },
  {
    path: "/blog",
    priority: 0.8,
    changeFrequency: "daily",
    lastModified: "2026-01-01",
  },
  {
    path: "/about",
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: "2026-01-01",
  },
  {
    path: "/submit",
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: "2026-01-01",
  },
  {
    path: "/contact",
    priority: 0.5,
    changeFrequency: "monthly",
    lastModified: "2026-01-01",
  },
  // ── ADD WHEN LIVE ──
  // Uncomment each line ONLY when the route exists and returns 200.
  // Submitting non-existent pages wastes crawl budget.
  //
  // { path: "/startups",          priority: 0.9, changeFrequency: "daily",   lastModified: "2026-01-01" },
  // { path: "/startups/ai",       priority: 0.8, changeFrequency: "weekly",  lastModified: "2026-01-01" },
  // { path: "/startups/fintech",  priority: 0.8, changeFrequency: "weekly",  lastModified: "2026-01-01" },
  // { path: "/startups/edtech",   priority: 0.8, changeFrequency: "weekly",  lastModified: "2026-01-01" },
  // { path: "/startups/saas",     priority: 0.8, changeFrequency: "weekly",  lastModified: "2026-01-01" },
  // { path: "/startups/healthtech", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-01-01" },
  // { path: "/reports",           priority: 0.7, changeFrequency: "weekly",  lastModified: "2026-01-01" },
  //
  // ── DO NOT ADD until canonical errors are resolved in GSC ──
  // { path: "/industries",        ... }  ← has canonical conflict
  // { path: "/verification",      ... }  ← has canonical conflict
  // { path: "/founder-stories",   ... }  ← has canonical conflict
]

// ---------------------------------------------------------------------------
// SITEMAP GENERATOR
// ---------------------------------------------------------------------------
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  // ── STARTUP PAGES ──
  // CRITICAL: Only approved startups.
  // Select both updated_at and created_at — use whichever is non-null.
  // If your schema only has created_at, updated_at will be null.
  // The fallback chain: updated_at → created_at → today
  const { data: startups, error: startupError } = await supabase
    .from("startups")
    .select("slug, updated_at, created_at")
    .eq("status", "approved")
    .not("slug", "is", null)
    .order("created_at", { ascending: false })

  if (startupError) {
    console.error("[sitemap] Startup fetch error:", startupError.message)
  }

  const startupEntries: MetadataRoute.Sitemap = (startups ?? []).map(
    (startup) => {
      const rawDate =
        startup.updated_at ?? startup.created_at ?? null

      const lastModified = rawDate
        ? new Date(rawDate)
        : new Date("2026-01-01")

      return {
        url: `${BASE_URL}/startup/${startup.slug}`,
        lastModified,
        changeFrequency: "weekly",
        // Startup profiles are high-value — 0.8 priority
        // Featured startups could be boosted to 0.9 if you add is_featured filter
        priority: 0.8,
      }
    }
  )

  // ── BLOG POSTS ──
  // Filter by published status if your blogs table has a status column.
  // If not, all blogs are included (adjust the query when you add status).
  const { data: blogs, error: blogError } = await supabase
    .from("blogs")
    .select("slug, updated_at, created_at, is_featured")
    .order("created_at", { ascending: false })
  // Uncomment when blogs table has a status column:
  // .eq("status", "published")

  if (blogError) {
    console.error("[sitemap] Blog fetch error:", blogError.message)
  }

  const blogEntries: MetadataRoute.Sitemap = (blogs ?? []).map((blog) => {
    const rawDate = blog.updated_at ?? blog.created_at ?? null
    const lastModified = rawDate
      ? new Date(rawDate)
      : new Date("2026-01-01")

    return {
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      // Featured/pillar blogs get higher priority than standard posts
      priority: blog.is_featured ? 0.8 : 0.7,
    }
  })

  // ── STATIC ROUTES ──
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // ── COMBINED OUTPUT ──
  // Order: static (highest priority first) → startups → blogs
  // Google processes sitemaps in order — put most important URLs first.
  return [
    ...staticEntries,
    ...startupEntries,
    ...blogEntries,
  ]
}
