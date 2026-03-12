// app/sitemap.ts
import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  
  // SEO Upgrade: 'www' domain consistency maintain karna sabse zaroori hai
  const baseUrl = "https://www.upforge.in"

  // 1️⃣ Fetch startup pages with fresh data
  const { data: startups } = await supabase
    .from('startups')
    .select('slug, updated_at')

  const startupEntries = (startups || []).map((startup) => ({
    url: `${baseUrl}/startup/${startup.slug}`,
    lastModified: new Date(startup.updated_at || new Date()),
    changeFrequency: 'weekly' as const, // Startups update frequency weekly search engine ke liye optimize hai
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

  // 3️⃣ Static routes with hierarchy optimization
  // Humne priorities ko logical order mein set kiya hai taaki Google important pages pehle crawl kare
  const staticRoutes = [
    { path: "", priority: 1.0, freq: 'daily' },           // Homepage - Highest Priority
    { path: "/startup", priority: 0.9, freq: 'daily' },    // Registry Hub
    { path: "/submit", priority: 0.9, freq: 'monthly' },   // Lead Gen Page
    { path: "/about", priority: 0.8, freq: 'monthly' },    // Brand Story
    { path: "/reports", priority: 0.8, freq: 'daily' },    // Data Content
    { path: "/industries", priority: 0.8, freq: 'weekly' },
    { path: "/verification", priority: 0.7, freq: 'monthly' },
    { path: "/blog", priority: 0.7, freq: 'daily' },
    { path: "/contact", priority: 0.5, freq: 'monthly' },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.freq as any,
    priority: route.priority,
  }))

  // 4️⃣ Combine and export
  // SEO Best Practice: Homepage aur High Priority pages list mein upar rakhein
  return [
    ...staticRoutes,
    ...startupEntries,
    ...blogEntries
  ]
}
