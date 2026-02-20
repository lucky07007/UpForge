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
  is_sponsored?: boolean
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
}
