// lib/categories.ts
// ─────────────────────────────────────────────────────────────────────────────
// Fully dynamic category system — NO hardcoded category list.
// Categories are derived 100% from whatever exists in the Supabase DB.
// To add a new category: just add startups with that category in Supabase.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Normalise a raw DB category string → URL-safe slug.
 * "AI/ML"        → "ai-ml"
 * "FinTech"      → "fintech"
 * "Climate Tech" → "climate-tech"
 * "E-Commerce"   → "e-commerce"
 */
export function categoryToSlug(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[/\\]/g, "-")     // slashes → hyphens
    .replace(/\s+/g, "-")       // spaces  → hyphens
    .replace(/[^a-z0-9-]/g, "") // strip everything else (keep hyphens)
    .replace(/-+/g, "-")        // collapse consecutive hyphens
    .replace(/^-|-$/g, "")      // strip leading/trailing hyphens
}

/**
 * Given a raw DB category string, produce a display name.
 * Preserves the original DB string — that's the ground truth.
 */
export function getDisplayName(dbCategory: string): string {
  return dbCategory
}

/**
 * Given a URL slug, find the matching raw DB category string
 * from an array of known DB values.
 * Handles fuzzy matching for DB inconsistencies.
 */
export function slugToDbCategory(
  slug: string,
  dbCategories: string[]
): string | null {
  // 1. Exact slug match
  const exact = dbCategories.find((c) => categoryToSlug(c) === slug)
  if (exact) return exact

  // 2. Loose match — strip all non-alphanumeric and compare lowercased
  const stripped = slug.replace(/-/g, "").toLowerCase()
  const loose = dbCategories.find(
    (c) => c.replace(/[^a-z0-9]/gi, "").toLowerCase() === stripped
  )
  return loose ?? null
}

/**
 * Generate a short SEO meta description for any category automatically.
 */
export function generateCategoryDescription(
  dbCategory: string,
  count: number
): string {
  const n = count > 0 ? count.toLocaleString() : "verified"
  return `Discover ${n} ${dbCategory} startups in India — verified profiles including founders, company details and sector data. India's most trusted independent startup registry.`
}

/**
 * Generate a longer body-copy description for the category page hero.
 */
export function generateCategoryLongDescription(
  dbCategory: string,
  count: number
): string {
  const n = count > 0 ? count.toLocaleString() : "verified"
  return `India's ${dbCategory} ecosystem is home to ${n} verified startups building at the frontier of their sector. UpForge maintains independently verified, structured profiles for every listed company — free for founders, trusted by investors and press. Browse founder profiles, company details and sector data below.`
}
