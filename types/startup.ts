export interface Startup {
  id: string
  name: string
  slug: string
  logo_url: string
  description: string
  website: string
  founders: string
  founded_year: number
  category?: string
  location?: string

  // Promotion flags
  is_sponsored?: boolean
  is_featured?: boolean   // ✅ ADDED THIS

  created_at?: string
}

/**
 * Lightweight type for directory/search pages
 * Only includes fields required for listing
 */
export interface StartupDirectoryItem {
  id: string
  name: string
  slug: string
  logo_url: string
  is_sponsored?: boolean
  is_featured?: boolean   // ✅ optional but good for listing
}
