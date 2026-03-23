// app/startup/page.tsx — REDESIGN v11
// Indian Startup Registry — Premium, Trust-Centric Design
// Centered Layout, Enhanced Stats, Superior Card UX
// Optimized for SEO, Authority, and User Engagement

import { createReadClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { ArrowRight, ArrowUpRight, ChevronRight, Award, Building2, MapPin, Calendar, Users, Verified } from "lucide-react"

const PAGE_SIZE = 10

interface StartupRow {
  id: string; name: string; slug: string
  description?: string | null; logo_url?: string | null
  founders?: string | null; founded_year?: number | null
  category?: string | null; city?: string | null
  is_featured?: boolean; ufrn?: string | null
}
interface PageProps {
  searchParams?: Promise<{ page?: string; q?: string; year?: string; sort?: string; category?: string }>
}

async function getData(q: string, year: string, sort: string, cat: string, page: number) {
  const sb = createReadClient()
  const from = (page - 1) * PAGE_SIZE
  let query = sb.from("startups")
    .select("id,name,slug,description,logo_url,founders,founded_year,category,city,is_featured,ufrn", { count: "exact" })
    .eq("status", "approved")
  if (q)    query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%,founders.ilike.%${q}%,category.ilike.%${q}%,city.ilike.%${q}%`)
  if (year) query = query.eq("founded_year", Number(year))
  if (cat)  query = query.eq("category", cat)
  const col = sort === "year" ? "founded_year" : sort === "newest" ? "created_at" : "name"
  const { data, count, error } = await query
    .order(col, { ascending: sort !== "newest" })
    .range(from, from + PAGE_SIZE - 1)
  if (error) console.error("[registry]", error.message)
  return { startups: (data ?? []) as StartupRow[], total: count ?? 0 }
}

async function getFilters() {
  const sb = createReadClient()
  const [{ data: yd }, { data: cd }] = await Promise.all([
    sb.from("startups").select("founded_year").eq("status","approved").not("founded_year","is",null).gte("founded_year",2010).order("founded_year",{ascending:false}),
    sb.from("startups").select("category").eq("status","approved").not("category","is",null),
  ])
  return {
    years: [...new Set((yd ?? []).map(r => r.founded_year as number))].filter(Boolean),
    cats:  [...new Set((cd ?? []).map(r => r.category as string))].filter(Boolean).sort(),
  }
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams
  const { total } = await getData("","","name","",1)
  const n = total > 0 ? total.toLocaleString() : "1,000+"
  const isFiltered = !!(sp?.q || sp?.year || sp?.sort || sp?.category)
  const page = Number(sp?.page ?? 1)
  return {
    title: `Indian Startup Registry 2026 — ${n}+ Verified Startups | UpForge`,
    description: `India's most trusted startup registry. ${n}+ verified companies across AI, FinTech, SaaS, and more. Search by name, founder, city, or sector. Updated daily.`,
    keywords: "Indian startups 2026, startup registry India, verified startups, AI startups India, fintech startups India, SaaS startups India, edtech startups, healthtech India, startup founders India, Bengaluru startups, Mumbai startups, Delhi NCR startups, Indian unicorns 2026",
    alternates: { canonical: "https://www.upforge.in/startup" },
    openGraph: {
      title: `Indian Startup Registry 2026 — ${n}+ Verified | UpForge`,
      description: `India's definitive startup database. ${n}+ verified companies. Free, structured, updated daily.`,
      url: "https://www.upforge.in/startup", siteName: "UpForge",
      images: [{ url: "https://www.upforge.in/og/registry.png", width: 1200, height: 630 }],
      locale: "en_IN", type: "website",
    },
    other: {
      "article:publisher": "https://www.upforge.in",
      "article:modified_time": new Date().toISOString(),
      "article:section": "Indian Startup Registry",
    },
    robots: {
      index: !isFiltered && page <= 1,
      follow: true,
      googleBot: { index: !isFiltered && page <= 1, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    },
  }
}
export const revalidate = 300

export default async function StartupPage({ searchParams }: PageProps) {
  const sp   = await searchParams
  const q    = sp?.q?.trim()        ?? ""
  const year = sp?.year?.trim()     ?? ""
  const sort = sp?.sort?.trim()     ?? "name"
  const cat  = sp?.category?.trim() ?? ""
  const page = Math.max(1, Number(sp?.page ?? 1))

  const [{ startups, total }, { years, cats }] = await Promise.all([
    getData(q, year, sort, cat, page),
    getFilters(),
  ])
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const isFiltered = !!(q || year || cat || (sort && sort !== "name"))

  const qs = (ov: Record<string, string | undefined>) => {
    const base: Record<string, string | undefined> = {
      q:        q    || undefined,
      year:     year || undefined,
      sort:     sort !== "name" ? sort : undefined,
      category: cat  || undefined,
      page:     page > 1 ? String(page) : undefined,
    }
    const m = { ...base, ...ov }
    const p = new URLSearchParams()
    Object.entries(m).forEach(([k, v]) => { if (v) p.set(k, v) })
    const s = p.toString()
    return `/startup${s ? `?${s}` : ""}`
  }
  const pgHref = (p: number) => qs({ page: p === 1 ? undefined : String(p) })

  const winSize  = Math.min(5, totalPages)
  const winStart = page <= 3 || totalPages <= 5 ? 1 : page >= totalPages - 2 ? totalPages - 4 : page - 2
  const pgNums   = Array.from({ length: winSize }, (_, i) => winStart + i)

  const featured = page === 1 && !isFiltered ? startups.filter(s => s.is_featured).slice(0, 3) : []
  const featIds  = new Set(featured.map(s => s.id))
  const grid     = page === 1 && !isFiltered ? startups.filter(s => !featIds.has(s.id)) : startups
  const baseNum  = (page - 1) * PAGE_SIZE

  const schemas = [
    { "@context":"https://schema.org","@type":"WebSite","name":"UpForge","url":"https://www.upforge.in",
      "potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.upforge.in/startup?q={search_term_string}"},"query-input":"required name=search_term_string"} },
    { "@context":"https://schema.org","@type":"CollectionPage","@id":"https://www.upforge.in/startup#cp",
      "name":"Indian Startup Registry 2026","url":"https://www.upforge.in/startup",
      "description":`India's independent registry of ${total.toLocaleString()}+ verified startups across 30+ sectors.`,
      "numberOfItems":total,"inLanguage":"en-IN" },
    { "@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
      {"@type":"ListItem","position":1,"name":"UpForge","item":"https://www.upforge.in"},
      {"@type":"ListItem","position":2,"name":"Startup Registry","item":"https://www.upforge.in/startup"},
    ]},
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        
        :root {
          --primary: #1E3A5F;
          --primary-dark: #0A2540;
          --accent: #E67E22;
          --accent-dark: #B45309;
          --accent-light: #F39C12;
          --gold: #F3B33D;
          --text-dark: #1F2937;
          --text-muted: #6B7280;
          --bg-parchment: #FEF9F0;
          --bg-white: #FFFFFF;
          --border-light: #F3F4F6;
          --border-medium: #E5E7EB;
          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: var(--bg-parchment);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          color: var(--text-dark);
          line-height: 1.5;
        }

        .pf {
          font-family: 'Playfair Display', Georgia, serif;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        @media (min-width: 640px) {
          .container {
            padding: 0 32px;
          }
        }
        @media (min-width: 1024px) {
          .container {
            padding: 0 48px;
          }
        }

        /* Animations */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-up {
          animation: fadeUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }

        .delay-1 { animation-delay: 0.05s; }
        .delay-2 { animation-delay: 0.1s; }
        .delay-3 { animation-delay: 0.15s; }
        .delay-4 { animation-delay: 0.2s; }
        .delay-5 { animation-delay: 0.25s; }

        /* Tricolor Header */
        .tricolor {
          height: 6px;
          display: flex;
          position: relative;
          z-index: 50;
        }
        .tricolor-saffron { flex: 1; background: #FF9933; }
        .tricolor-white { flex: 1; background: #FFFFFF; }
        .tricolor-green { flex: 1; background: #138808; }

        /* Navigation Spacing */
        .navbar-spacer {
          height: 70px;
        }

        /* Hero Section */
        .hero-section {
          text-align: center;
          padding: 48px 0 32px;
          background: linear-gradient(to bottom, var(--bg-parchment), #FEF7E8);
          border-bottom: 1px solid var(--border-medium);
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(230, 126, 34, 0.1);
          padding: 6px 16px 6px 12px;
          border-radius: 100px;
          margin-bottom: 24px;
          font-size: 13px;
          font-weight: 500;
          color: var(--accent-dark);
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--primary-dark);
          margin-bottom: 20px;
        }

        .hero-title-gradient {
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--accent-dark) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .hero-description {
          font-size: 1.125rem;
          color: var(--text-muted);
          max-width: 640px;
          margin: 0 auto 32px;
          line-height: 1.6;
        }

        /* Stats Grid - Enhanced */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1px;
          background: var(--border-medium);
          border-radius: 20px;
          overflow: hidden;
          margin-top: 32px;
          box-shadow: var(--shadow-md);
        }

        .stat-card {
          background: var(--bg-white);
          padding: 28px 16px;
          text-align: center;
          transition: all 0.2s ease;
        }

        .stat-card:hover {
          background: #FEFAF3;
          transform: translateY(-2px);
        }

        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        /* Sector Tabs */
        .sector-tabs {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 8px;
          padding: 16px 0;
          margin-bottom: 24px;
          scrollbar-width: thin;
          border-bottom: 1px solid var(--border-medium);
        }

        .sector-tab {
          flex-shrink: 0;
          padding: 8px 20px;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-muted);
          background: var(--bg-white);
          border-radius: 40px;
          transition: all 0.2s;
          text-decoration: none;
          border: 1px solid var(--border-medium);
        }

        .sector-tab:hover {
          border-color: var(--accent);
          color: var(--accent-dark);
          background: rgba(230, 126, 34, 0.05);
        }

        .sector-tab.active {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }

        /* Toolbar */
        .toolbar {
          position: sticky;
          top: 70px;
          z-index: 40;
          background: var(--bg-white);
          border-bottom: 1px solid var(--border-medium);
          box-shadow: var(--shadow-sm);
        }

        .toolbar-content {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          padding: 12px 0;
        }

        .search-form {
          flex: 2;
          min-width: 240px;
          display: flex;
          align-items: center;
          background: var(--bg-parchment);
          border: 1px solid var(--border-medium);
          border-radius: 48px;
          padding: 4px 4px 4px 20px;
          transition: all 0.2s;
        }
        .search-form:focus-within {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(230, 126, 34, 0.1);
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 10px 0;
          font-size: 0.9rem;
          outline: none;
        }

        .search-button {
          background: var(--primary);
          border: none;
          padding: 8px 24px;
          border-radius: 40px;
          color: white;
          font-weight: 600;
          font-size: 0.8rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .search-button:hover {
          background: var(--primary-dark);
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid var(--border-medium);
          border-radius: 40px;
          background: var(--bg-white);
          font-size: 0.8rem;
          color: var(--text-dark);
          cursor: pointer;
          outline: none;
        }

        .sort-link {
          padding: 6px 12px;
          font-size: 0.75rem;
          font-weight: 500;
          text-decoration: none;
          color: var(--text-muted);
          border-radius: 40px;
          transition: all 0.2s;
        }
        .sort-link.active {
          background: var(--primary);
          color: white;
        }
        .clear-link {
          padding: 6px 12px;
          font-size: 0.75rem;
          color: var(--accent);
          text-decoration: none;
        }

        /* Results Header */
        .results-header {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 12px;
          margin: 24px 0;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-medium);
        }

        /* Featured Cards Grid */
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          margin-bottom: 48px;
        }

        .featured-card {
          background: var(--bg-white);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .featured-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-xl);
        }

        .featured-image {
          position: relative;
          height: 200px;
          background: linear-gradient(135deg, #FEF3E2, #FFF8F0);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .featured-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .featured-card:hover .featured-image img {
          transform: scale(1.05);
        }
        .featured-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: var(--accent);
          color: white;
          padding: 4px 12px;
          border-radius: 40px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .featured-content {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .featured-category {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--accent);
          margin-bottom: 8px;
        }
        .featured-name {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 12px;
          line-height: 1.3;
        }
        .featured-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 16px;
          line-height: 1.5;
          flex: 1;
        }
        .featured-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-light);
          padding-top: 12px;
          margin-top: auto;
        }
        .featured-chips {
          display: flex;
          gap: 8px;
          font-size: 0.7rem;
          color: var(--text-muted);
        }
        .featured-ufrn {
          background: var(--bg-parchment);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.65rem;
        }

        /* Startup List Item - Premium Card */
        .startup-item {
          display: grid;
          grid-template-columns: 56px 1fr auto;
          background: var(--bg-white);
          border-radius: 16px;
          margin-bottom: 12px;
          transition: all 0.2s;
          text-decoration: none;
          color: inherit;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-light);
          overflow: hidden;
        }
        .startup-item:hover {
          transform: translateX(4px);
          box-shadow: var(--shadow-md);
          border-color: var(--accent-light);
        }

        .startup-number {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 20px;
          font-weight: 600;
          color: var(--text-muted);
          background: #FEFAF5;
          font-size: 0.8rem;
        }

        .startup-body {
          padding: 16px 20px 16px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .startup-header {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .startup-logo {
          width: 48px;
          height: 48px;
          background: var(--bg-parchment);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-medium);
          overflow: hidden;
          flex-shrink: 0;
        }
        .startup-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .startup-info {
          flex: 1;
        }
        .startup-name {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 4px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #E8F5E9;
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 0.6rem;
          font-weight: 600;
          color: #2E7D32;
        }
        .startup-category {
          font-size: 0.7rem;
          color: var(--accent);
          font-weight: 500;
          text-transform: uppercase;
        }
        .startup-description {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .startup-meta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .meta-chip {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .ufrn-chip {
          background: #FEF3E2;
          padding: 2px 8px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.7rem;
          color: var(--accent-dark);
        }

        .startup-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          color: var(--text-muted);
        }

        /* Aside Sections */
        .aside-sticky {
          position: sticky;
          top: 100px;
        }
        .aside-card {
          background: var(--bg-white);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-light);
        }
        .aside-card.dark {
          background: var(--primary-dark);
          color: white;
          border: none;
        }
        .aside-title {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent);
          margin-bottom: 16px;
        }
        .aside-card.dark .aside-title {
          color: var(--gold);
        }
        .aside-heading {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .aside-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 20px;
          line-height: 1.5;
        }
        .aside-card.dark .aside-text {
          color: rgba(255,255,255,0.7);
        }
        .aside-button {
          display: inline-block;
          background: var(--accent);
          color: white;
          padding: 10px 20px;
          border-radius: 40px;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          text-align: center;
          width: 100%;
          transition: background 0.2s;
        }
        .aside-button:hover {
          background: var(--accent-dark);
        }
        .sector-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .sector-list li {
          border-bottom: 1px solid var(--border-light);
        }
        .sector-list li:last-child {
          border-bottom: none;
        }
        .sector-list a {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          text-decoration: none;
          color: var(--text-dark);
          font-size: 0.85rem;
          transition: color 0.2s;
        }
        .sector-list a:hover {
          color: var(--accent);
        }
        .stats-aside {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .stat-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .stat-label-aside {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.6);
        }
        .stat-value-aside {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--gold);
        }

        /* CTA Section */
        .cta-section {
          background: var(--primary);
          border-radius: 24px;
          padding: 48px;
          margin: 48px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }
        .cta-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }
        .cta-text {
          color: rgba(255,255,255,0.7);
        }
        .cta-button {
          background: var(--accent);
          color: white;
          padding: 14px 32px;
          border-radius: 40px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .cta-button:hover {
          background: var(--accent-dark);
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid var(--border-medium);
        }
        .page-link {
          padding: 8px 16px;
          border-radius: 8px;
          text-decoration: none;
          color: var(--text-dark);
          font-weight: 500;
          transition: all 0.2s;
        }
        .page-link:hover {
          background: var(--bg-parchment);
        }
        .page-link.active {
          background: var(--primary);
          color: white;
        }
        .page-link.disabled {
          opacity: 0.5;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .toolbar-content {
            flex-direction: column;
            align-items: stretch;
          }
          .startup-item {
            grid-template-columns: 1fr auto;
          }
          .startup-number {
            display: none;
          }
          .startup-body {
            padding: 16px;
          }
          .cta-section {
            padding: 32px;
            flex-direction: column;
            text-align: center;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <Navbar />
      <div className="tricolor">
        <div className="tricolor-saffron"></div>
        <div className="tricolor-white"></div>
        <div className="tricolor-green"></div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="hero-badge animate-up">
            <Award size={16} />
            <span>India's Most Trusted Startup Registry</span>
          </div>
          <h1 className="hero-title pf animate-up delay-1">
            India's Definitive <span className="hero-title-gradient">Startup Database</span>
          </h1>
          <p className="hero-description animate-up delay-2">
            Discover {total.toLocaleString()}+ verified Indian startups. Search by name, founder, city, or sector. 
            Updated daily with the latest funding rounds and company profiles.
          </p>

          {/* Enhanced Stats Grid */}
          <div className="stats-grid animate-up delay-3">
            <div className="stat-card">
              <div className="stat-value">{total.toLocaleString()}+</div>
              <div className="stat-label">Verified Startups</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">126+</div>
              <div className="stat-label">Indian Unicorns</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">$9.2B</div>
              <div className="stat-label">Q1 2026 Funding</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">3rd</div>
              <div className="stat-label">Global Ecosystem</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">30+</div>
              <div className="stat-label">Sectors Covered</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Sector Tabs */}
        <div className="sector-tabs">
          <Link href="/startup" className={`sector-tab ${!cat ? 'active' : ''}`}>All</Link>
          {cats.slice(0, 12).map(c => (
            <Link key={c} href={`/startup?category=${encodeURIComponent(c)}`} className={`sector-tab ${cat === c ? 'active' : ''}`}>{c}</Link>
          ))}
          {cats.length > 12 && (
            <Link href="/startups" className="sector-tab">More +</Link>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="container">
          <div className="toolbar-content">
            <form action="/startup" method="GET" className="search-form">
              {year && <input type="hidden" name="year" value={year} />}
              {cat && <input type="hidden" name="category" value={cat} />}
              {sort && sort !== "name" && <input type="hidden" name="sort" value={sort} />}
              <input type="search" name="q" defaultValue={q} placeholder="Search startups, founders, sectors..." className="search-input" />
              <button type="submit" className="search-button">Search</button>
            </form>
            <div className="filter-group">
              <select className="filter-select" id="year-select" defaultValue={year}>
                <option value="">Any Year</option>
                {years.map(yr => <option key={yr} value={yr}>{yr}</option>)}
              </select>
              <select className="filter-select" id="category-select" defaultValue={cat}>
                <option value="">All Sectors</option>
                {cats.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div style={{ display: 'flex', gap: '4px' }}>
                <Link href={qs({ sort: "name", page: undefined })} className={`sort-link ${sort === "name" ? "active" : ""}`}>A-Z</Link>
                <Link href={qs({ sort: "newest", page: undefined })} className={`sort-link ${sort === "newest" ? "active" : ""}`}>Newest</Link>
                <Link href={qs({ sort: "year", page: undefined })} className={`sort-link ${sort === "year" ? "active" : ""}`}>Founded</Link>
              </div>
              {isFiltered && <Link href="/startup" className="clear-link">Clear All</Link>}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Results Header */}
        <div className="results-header">
          <span style={{ fontWeight: 600 }}>
            {q ? `"${q}"` : cat ? cat : year ? `Est. ${year}` : "All Startups"}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {total.toLocaleString()} results
          </span>
          <div style={{ flex: 1 }}></div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Page {page} of {totalPages || 1}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px' }}>
          <div>
            {/* Featured Startups */}
            {featured.length > 0 && (
              <div style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={24} color="#E67E22" />
                  Featured Startups
                </h2>
                <div className="featured-grid">
                  {featured.map((s, idx) => (
                    <Link key={s.id} href={`/startup/${s.slug}`} className="featured-card">
                      <div className="featured-image">
                        {s.logo_url ? (
                          <Image src={s.logo_url} alt={s.name} width={400} height={200} style={{ objectFit: 'cover' }} />
                        ) : (
                          <span style={{ fontSize: '3rem', fontWeight: 700, color: '#E67E22' }}>{s.name.charAt(0)}</span>
                        )}
                        <span className="featured-badge">Featured</span>
                      </div>
                      <div className="featured-content">
                        <div className="featured-category">{s.category || "Startup"}</div>
                        <div className="featured-name pf">{s.name}</div>
                        <p className="featured-desc">{s.description || "Building for India's future."}</p>
                        <div className="featured-meta">
                          <div className="featured-chips">
                            {s.founded_year && <span>Est. {s.founded_year}</span>}
                            {s.city && <span>• {s.city}</span>}
                          </div>
                          {s.ufrn && <span className="featured-ufrn">{s.ufrn}</span>}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Startup List */}
            {grid.length > 0 ? (
              <div>
                {featured.length > 0 && (
                  <div style={{ margin: '24px 0 16px' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>All Startups</h2>
                  </div>
                )}
                {grid.map((s, idx) => (
                  <Link key={s.id} href={`/startup/${s.slug}`} className="startup-item">
                    <div className="startup-number">
                      {String(baseNum + idx + 1).padStart(2, '0')}
                    </div>
                    <div className="startup-body">
                      <div className="startup-header">
                        <div className="startup-logo">
                          {s.logo_url ? (
                            <Image src={s.logo_url} alt={s.name} width={48} height={48} style={{ objectFit: 'contain' }} />
                          ) : (
                            <span style={{ fontWeight: 700, fontSize: '1rem' }}>{s.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="startup-info">
                          <div className="startup-name">
                            {s.name}
                            <span className="verified-badge">
                              <Verified size={10} /> Verified
                            </span>
                          </div>
                          <div className="startup-category">{s.category || "Startup"}</div>
                        </div>
                      </div>
                      {s.description && <p className="startup-description">{s.description}</p>}
                      <div className="startup-meta">
                        {s.founders && (
                          <span className="meta-chip">
                            <Users size={12} /> {s.founders}
                          </span>
                        )}
                        {s.founded_year && (
                          <span className="meta-chip">
                            <Calendar size={12} /> Est. {s.founded_year}
                          </span>
                        )}
                        {s.city && (
                          <span className="meta-chip">
                            <MapPin size={12} /> {s.city}
                          </span>
                        )}
                        {s.ufrn && <span className="ufrn-chip">{s.ufrn}</span>}
                      </div>
                    </div>
                    <div className="startup-arrow">
                      <ArrowUpRight size={18} />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 20px', background: 'white', borderRadius: '24px' }}>
                <span style={{ fontSize: '4rem', display: 'block', marginBottom: '16px' }}>🔍</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No startups found</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                  {q ? `No results for "${q}". Try a different search term.` : 'Try adjusting your filters.'}
                </p>
                <Link href="/startup" style={{ background: 'var(--primary)', color: 'white', padding: '10px 24px', borderRadius: '40px', textDecoration: 'none' }}>
                  Clear Filters
                </Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <Link href={pgHref(page - 1)} className={`page-link ${page === 1 ? 'disabled' : ''}`}>← Previous</Link>
                {pgNums.map(p => (
                  <Link key={p} href={pgHref(p)} className={`page-link ${p === page ? 'active' : ''}`}>{p}</Link>
                ))}
                <Link href={pgHref(page + 1)} className={`page-link ${page === totalPages ? 'disabled' : ''}`}>Next →</Link>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="aside-sticky">
            {/* Submit CTA */}
            <div className="aside-card dark">
              <div className="aside-title">List Your Startup</div>
              <div className="aside-heading">Get Verified. Get Found.</div>
              <p className="aside-text">Join India's most trusted startup registry. Free, permanent listing with your unique UFRN.</p>
              <Link href="/submit" className="aside-button">Submit Your Startup →</Link>
            </div>

            {/* Top Sectors */}
            {cats.length > 0 && (
              <div className="aside-card">
                <div className="aside-title">Browse by Sector</div>
                <ul className="sector-list">
                  {cats.slice(0, 8).map(c => (
                    <li key={c}>
                      <Link href={`/startup?category=${encodeURIComponent(c)}`}>
                        <span>{c}</span>
                        <span>→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* India Ecosystem Stats */}
            <div className="aside-card dark">
              <div className="aside-title">India's Ecosystem 2026</div>
              <div className="stats-aside">
                <div className="stat-row">
                  <span className="stat-label-aside">Total Funding (YTD)</span>
                  <span className="stat-value-aside">$12.4B</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label-aside">New Unicorns 2026</span>
                  <span className="stat-value-aside">18</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label-aside">Active Investors</span>
                  <span className="stat-value-aside">2,300+</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label-aside">Jobs Created</span>
                  <span className="stat-value-aside">1.2M+</span>
                </div>
              </div>
            </div>

            {/* Trending Reads */}
            <div className="aside-card">
              <div className="aside-title">From The Forge</div>
              <ul className="sector-list">
                <li><Link href="/blog/top-ai-startups-india-2026">Top AI Startups India 2026 →</Link></li>
                <li><Link href="/blog/how-to-get-startup-funding-india-2026">Startup Funding Guide 2026 →</Link></li>
                <li><Link href="/blog/top-indian-unicorns-2026">All 126+ Indian Unicorns →</Link></li>
                <li><Link href="/blog/how-to-start-startup-india-2026">How to Start a Startup in India →</Link></li>
              </ul>
            </div>
          </aside>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div>
            <div className="cta-title">Ready to list your startup?</div>
            <div className="cta-text">Join 5,000+ founders who trust UpForge for visibility and credibility.</div>
          </div>
          <Link href="/submit" className="cta-button">
            Get Listed Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Filter JS */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          const yearSelect = document.getElementById('year-select');
          const categorySelect = document.getElementById('category-select');
          const currentParams = new URLSearchParams(window.location.search);
          const currentYear = currentParams.get('year') || '';
          const currentCat = currentParams.get('category') || '';
          if (yearSelect) yearSelect.value = currentYear;
          if (categorySelect) categorySelect.value = currentCat;
          function updateUrl(param, value) {
            const params = new URLSearchParams(window.location.search);
            if (value) {
              params.set(param, value);
            } else {
              params.delete(param);
            }
            params.delete('page');
            const newUrl = '/startup' + (params.toString() ? '?' + params.toString() : '');
            window.location.href = newUrl;
          }
          if (yearSelect) yearSelect.addEventListener('change', (e) => updateUrl('year', e.target.value));
          if (categorySelect) categorySelect.addEventListener('change', (e) => updateUrl('category', e.target.value));
        })();
      `}} />
    </>
  )
}
