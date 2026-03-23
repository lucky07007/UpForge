// types/startup.ts

export interface Startup {
  id: string
  name: string
  slug: string
  description?: string | null
  logo_url?: string | null
  website?: string | null
  founders?: string | null
  founded_year?: number | null
  category?: string | null
  city?: string | null
  status: "pending" | "approved" | "rejected"
  is_featured?: boolean
  is_sponsored?: boolean
  linkedin_url?: string | null
  twitter_url?: string | null
  instagram_url?: string | null
  created_at?: string
  updated_at?: string | null

  // ── UFRN (UpForge Registry Number) ──────────────────────────────────────
  // Format: UF-YYYY-IND-XXXXX  e.g. UF-2026-IND-00001
  // Generated server-side on approval; unique across the entire registry.
  ufrn?: string | null

  // ── Global registry fields ───────────────────────────────────────────────
  country_code?: string | null   // ISO 3166-1 alpha-3  e.g. "IND"
  country_name?: string | null   // Human label         e.g. "India"
}

export interface StartupDirectoryItem {
  id: string
  name: string
  slug: string
  logo_url: string | null
  description: string | null
  founded_year?: number | null
  category?: string | null
  ufrn?: string | null           // shown on listing cards as a trust signal
}
