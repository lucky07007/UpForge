// app/sitemap.ts
import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  const baseUrl = "https://upforge.in"

  // 1️⃣ Fetch startup pages
  const { data: startups } = await supabase
    .from('startups')
    .select('slug, updated_at')

  const startupEntries = (startups || []).map((startup) => ({
    url: `${baseUrl}/startup/${startup.slug}`,
    lastModified: new Date(startup.updated_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 2️⃣ Fetch blog posts
  const { data: blogs } = await supabase
    .from('blogs')
    .select('slug, updated_at')

  const blogEntries = (blogs || []).map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updated_at || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 3️⃣ Static routes
  const staticRoutes = [
    "",
    "/about",
    "/startup",
    "/reports",
    "/industries",
    "/verification",
    "/blog"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === "" ? 1.0 : 0.9,
  }))

  // 4️⃣ Combine all entries
  return [
    ...staticRoutes,
    ...startupEntries,
    ...blogEntries
  ]
}
