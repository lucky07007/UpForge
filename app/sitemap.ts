// app/sitemap.ts
// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN-AWARE SITEMAP — Critical SEO fix.
//
// PROBLEM FIXED:
//   The old sitemap always emitted "https://www.upforge.in/..." URLs, meaning
//   Google's crawler on upforge.org was told "all authority lives on .in".
//   This destroyed the .org domain's ability to rank for global queries.
//
// SOLUTION:
//   We now detect the domain from the incoming request (x-upforge-domain header
//   set by middleware, or host header fallback) and emit ONLY URLs for that
//   domain. Google gets two clean, non-overlapping sitemaps:
//     • upforge.in/sitemap.xml  → India hub (startup/ + blog/ + category pages)
//     • upforge.org/sitemap.xml → Global hub (startup/ + blog/ + /ufrn/ pages)
//
// URL TIERS (priority order):
//   1. Static routes          — home, registry, categories hub, about, etc.
//   2. Category pages         — /startups/[category]
//   3. City+Category pages    — /startups/[category]/[city]    (NEW long-tail)
//   4. Startup profiles       — /startup/[slug]                (0.8–0.9)
//   5. UFRN lookup pages      — /ufrn/[ufrn-id]                (0.85, .org only)
//   6. Blog posts             — /blog/[slug]
// ─────────────────────────────────────────────────────────────────────────────

import { MetadataRoute } from "next"
import { headers } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import { categoryToSlug } from "@/lib/categories"

// ─────────────────────────────────────────────────────────────────────────────
// TOP INDIAN CITIES — used to generate city+category long-tail pages.
// Each combo (e.g. "fintech-mumbai") is a near-zero-competition keyword cluster.
// ─────────────────────────────────────────────────────────────────────────────
const TOP_CITIES = [
  "mumbai", "bangalore", "delhi", "hyderabad", "pune",
  "chennai", "kolkata", "ahmedabad", "jaipur", "noida",
]

// ─────────────────────────────────────────────────────────────────────────────
// STATIC ROUTES
// ─────────────────────────────────────────────────────────────────────────────
const STATIC_ROUTES: Array<{
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  lastModified: string
  orgOnly?: boolean   // Include only on .org
  inOnly?: boolean    // Include only on .in
}> = [
  { path: "",           priority: 1.0, changeFrequency: "daily",   lastModified: "2026-01-01" },
  { path: "/startup",   priority: 0.9, changeFrequency: "daily",   lastModified: "2026-01-01" },
  { path: "/startups",  priority: 0.9, changeFrequency: "daily",   lastModified: "2026-01-01" },
  { path: "/blog",      priority: 0.8, changeFrequency: "daily",   lastModified: "2026-01-01" },
  { path: "/about",     priority: 0.7, changeFrequency: "monthly", lastModified: "2026-01-01" },
  { path: "/submit",    priority: 0.6, changeFrequency: "monthly", lastModified: "2026-01-01" },
  { path: "/contact",   priority: 0.5, changeFrequency: "monthly", lastModified: "2026-01-01" },
  // UFRN index — only on .org (this is the authority landing for UFRN system)
  { path: "/ufrn",      priority: 0.8, changeFrequency: "daily",   lastModified: "2026-01-01", orgOnly: true },
]

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN DETECTION
// ─────────────────────────────────────────────────────────────────────────────
async function getRequestDomain(): Promise<"in" | "org"> {
  const headersList = await headers()
  const ctx = headersList.get("x-upforge-domain")
  if (ctx === "in" || ctx === "org") return ctx

  // Fallback: read the Host header directly
  const host = headersList.get("host") ?? ""
  if (host.includes(".org")) return "org"
  return "in" // Default to India hub
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function parseDate(raw: string | null | undefined): Date {
  if (!raw) return new Date("2026-01-01")
  const d = new Date(raw)
  return isNaN(d.getTime()) ? new Date("2026-01-01") : d
}

// ─────────────────────────────────────────────────────────────────────────────
// SITEMAP
// ─────────────────────────────────────────────────────────────────────────────
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = await getRequestDomain()
  const isOrg  = domain === "org"

  // Each domain is its own authority — never cross-link in sitemaps.
  const BASE = isOrg ? "https://www.upforge.org" : "https://www.upforge.in"

  const supabase = await createClient()

  // ── 1. Fetch approved startups ────────────────────────────────────────────
  const { data: startups, error: startupError } = await supabase
    .from("startups")
    .select("slug, category, updated_at, created_at, is_featured, ufrn")
    .eq("status", "approved")
    .not("slug", "is", null)
    .order("created_at", { ascending: false })

  if (startupError) {
    console.error("[sitemap] Startup fetch error:", startupError.message)
  }

  // ── 2. Category routes ────────────────────────────────────────────────────
  const seenCategorySlugs = new Set<string>()
  const categoryEntries: MetadataRoute.Sitemap = []

  for (const s of startups ?? []) {
    if (!s.category) continue
    const slug = categoryToSlug(s.category)
    if (seenCategorySlugs.has(slug)) continue
    seenCategorySlugs.add(slug)

    // Main category page
    categoryEntries.push({
      url: `${BASE}/startups/${slug}`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "daily",
      priority: 0.85,
    })
  }

  // ── 3. City + Category long-tail pages (NEW) ──────────────────────────────
  // e.g. /startups/fintech/mumbai — near-zero competition, high conversion.
  // Only generate for .in (India-local SEO), not for .org (global hub).
  const cityEntries: MetadataRoute.Sitemap = []
  if (!isOrg) {
    for (const catSlug of seenCategorySlugs) {
      for (const city of TOP_CITIES) {
        cityEntries.push({
          url: `${BASE}/startups/${catSlug}/${city}`,
          lastModified: new Date("2026-01-01"),
          changeFrequency: "weekly",
          priority: 0.75,
        })
      }
    }
  }

  // ── 4. Startup profile routes ─────────────────────────────────────────────
  const startupEntries: MetadataRoute.Sitemap = (startups ?? []).map((s) => ({
    url: `${BASE}/startup/${s.slug}`,
    lastModified: parseDate(s.updated_at ?? s.created_at),
    changeFrequency: "weekly" as const,
    priority: s.is_featured ? 0.9 : 0.8,
  }))

  // ── 5. UFRN lookup routes — ONLY on .org ─────────────────────────────────
  // These are canonical on .org. Each UFRN page "double-parks" UpForge for
  // the exact UFRN search query. Google indexes them as Dataset entries.
  // NOT included in .in sitemap — no duplicate signals.
  const ufrnEntries: MetadataRoute.Sitemap = isOrg
    ? (startups ?? [])
        .filter((s): s is typeof s & { ufrn: string } => typeof s.ufrn === "string" && s.ufrn.length > 0)
        .map((s) => ({
          url: `${BASE}/ufrn/${s.ufrn}`,
          lastModified: parseDate(s.updated_at ?? s.created_at),
          changeFrequency: "monthly" as const,
          priority: 0.85,
        }))
    : []

  // ── 6. Blog posts ─────────────────────────────────────────────────────────
  const { data: blogs, error: blogError } = await supabase
    .from("blogs")
    .select("slug, updated_at, created_at, is_featured")
    .order("created_at", { ascending: false })

  if (blogError) {
    console.error("[sitemap] Blog fetch error:", blogError.message)
  }

  const blogEntries: MetadataRoute.Sitemap = (blogs ?? []).map((b) => ({
    url: `${BASE}/blog/${b.slug}`,
    lastModified: parseDate(b.updated_at ?? b.created_at),
    changeFrequency: "monthly" as const,
    priority: b.is_featured ? 0.8 : 0.7,
  }))

  // ── 7. Static routes (domain-filtered) ───────────────────────────────────
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES
    .filter((r) => {
      if (r.orgOnly && !isOrg) return false
      if (r.inOnly  &&  isOrg) return false
      return true
    })
    .map((r) => ({
      url: `${BASE}${r.path}`,
      lastModified: new Date(r.lastModified),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    }))

  // ── 8. Combine — most important first ────────────────────────────────────
  return [
    ...staticEntries,
    ...categoryEntries,
    ...cityEntries,        // ← NEW: long-tail city+category pages (.in only)
    ...startupEntries,
    ...ufrnEntries,        // ← .org only: UFRN lookup pages
    ...blogEntries,
  ]
}
