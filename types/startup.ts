export interface Startup {
  id: string
  name: string
  slug: string
  logo_url: string
  description: string
  website: string
// upforge-in/upforge/Upforge-b69600313d9aaf587d9db2d25aef7d68eebcbd33/types/startup.ts

export interface Startup {
  id: string
  name: string
  slug: string
  logo_url: string
  description: string
  short_description?: string // Added here
  website: string
  founders: string | string[]
  founded_year: number
  category?: string
  location?: string
  is_sponsored?: boolean
  is_featured?: boolean
  created_at?: string
}

export interface StartupDirectoryItem {
  id: string
  name: string
  slug: string
  logo_url: string
  short_description?: string // Added here to fix the build error
  is_sponsored?: boolean
  is_featured?: boolean
}
  // allow both single string and array
  founders: string | string[]

  founded_year: number
  category?: string
  location?: string
  is_sponsored?: boolean
  is_featured?: boolean
  created_at?: string
}

export interface StartupDirectoryItem {
  id: string
  name: string
  slug: string
  logo_url: string
  is_sponsored?: boolean
  is_featured?: boolean
}
