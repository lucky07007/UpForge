// app/startup/page.tsx — REDESIGN v13
// Indian Startup Registry — Premium Newspaper/Magazine Aesthetic
// Fixed Map Loading, Centered Layout, Proper Header/Collapse

import { createReadClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { ArrowRight, ArrowUpRight, Award, MapPin, Calendar, Users, Verified, Star } from "lucide-react"

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
    description: `India's definitive startup registry. ${n}+ verified companies across AI, FinTech, SaaS, and more. Search by name, founder, city, or sector. Updated daily.`,
    alternates: { canonical: "https://www.upforge.in/startup" },
    openGraph: {
      title: `Indian Startup Registry 2026 — ${n}+ Verified | UpForge`,
      description: `India's definitive startup database. ${n}+ verified companies. Free, structured, updated daily.`,
      url: "https://www.upforge.in/startup", siteName: "UpForge",
      images: [{ url: "https://www.upforge.in/og/registry.png", width: 1200, height: 630 }],
      locale: "en_IN", type: "website",
    },
    robots: {
      index: !isFiltered && page <= 1,
      follow: true,
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

  const currentDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  const schemas = [
    { "@context":"https://schema.org","@type":"WebSite","name":"UpForge","url":"https://www.upforge.in",
      "potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.upforge.in/startup?q={search_term_string}"},"query-input":"required name=search_term_string"} },
    { "@context":"https://schema.org","@type":"CollectionPage","@id":"https://www.upforge.in/startup#cp",
      "name":"Indian Startup Registry 2026","url":"https://www.upforge.in/startup",
      "description":`India's independent registry of ${total.toLocaleString()}+ verified startups across 30+ sectors.`,
      "numberOfItems":total,"inLanguage":"en-IN" },
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap');

        :root {
          --paper: #FDF8F0;
          --paper-dark: #F5EFE2;
          --ink: #2C2418;
          --ink-light: #5C5242;
          --saffron: #E67E22;
          --saffron-dark: #B85C1A;
          --saffron-light: #F5A65B;
          --green: #138808;
          --gold: #D4AF37;
          --border-color: #E8E0D0;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: var(--paper);
          font-family: 'Inter', system-ui, sans-serif;
          color: var(--ink);
        }

        .serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 20px;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade {
          animation: fadeIn 0.5s ease forwards;
        }

        .delay-1 { animation-delay: 0.05s; opacity: 0; animation-fill-mode: forwards; }
        .delay-2 { animation-delay: 0.1s; opacity: 0; animation-fill-mode: forwards; }

        /* Tricolor Bar */
        .tricolor-bar {
          height: 4px;
          display: flex;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }
        .saffron-strip { flex: 1; background: #FF9933; }
        .white-strip { flex: 1; background: #FFFFFF; }
        .green-strip { flex: 1; background: #138808; }

        /* Masthead */
        .masthead {
          background: var(--paper);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 100;
          padding-top: 4px;
        }

        .masthead-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          flex-wrap: wrap;
          gap: 16px;
        }

        .date-badge {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--ink-light);
          border-left: 2px solid var(--saffron);
          padding-left: 12px;
        }

        .masthead-logo {
          text-align: center;
        }

        .masthead-logo h1 {
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          font-weight: 700;
          letter-spacing: -0.5px;
          color: var(--ink);
        }

        .masthead-logo .edition {
          font-size: 0.6rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--saffron);
        }

        .stats-badge {
          display: flex;
          gap: 16px;
        }

        .stat-mini {
          text-align: right;
          font-size: 0.65rem;
        }

        .stat-mini strong {
          font-size: 0.85rem;
          color: var(--saffron);
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, var(--paper) 0%, var(--paper-dark) 100%);
          border-bottom: 1px solid var(--border-color);
          padding: 48px 0;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            text-align: center;
          }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(230, 126, 34, 0.1);
          padding: 6px 16px;
          border-radius: 40px;
          margin-bottom: 24px;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--saffron-dark);
        }

        .hero-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .hero-title .highlight {
          color: var(--saffron);
          position: relative;
          display: inline-block;
        }

        .hero-description {
          font-size: 0.95rem;
          color: var(--ink-light);
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 500px;
        }

        @media (max-width: 900px) {
          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }
        }

        /* India Map */
        .india-map-container {
          background: var(--paper-dark);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid var(--border-color);
          text-align: center;
        }

        .map-placeholder {
          background: linear-gradient(135deg, #E8DFD0, #DDD2C0);
          border-radius: 12px;
          padding: 32px;
          text-align: center;
        }

        .map-caption {
          margin-top: 16px;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--ink-light);
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          background: var(--border-color);
          margin-top: 32px;
          border-radius: 12px;
          overflow: hidden;
        }

        @media (max-width: 680px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .stat-item {
          background: var(--paper);
          padding: 20px 12px;
          text-align: center;
        }

        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--saffron);
        }

        .stat-label {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--ink-light);
        }

        /* Sector Tabs */
        .sector-strip {
          background: var(--paper);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 70px;
          z-index: 90;
        }

        .sector-tabs {
          display: flex;
          overflow-x: auto;
          gap: 4px;
          padding: 12px 0;
          scrollbar-width: thin;
        }

        .sector-tab {
          flex-shrink: 0;
          padding: 6px 18px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--ink-light);
          background: transparent;
          border-radius: 40px;
          text-decoration: none;
          white-space: nowrap;
        }

        .sector-tab:hover {
          color: var(--saffron);
          background: rgba(230, 126, 34, 0.05);
        }

        .sector-tab.active {
          background: var(--saffron);
          color: white;
        }

        /* Toolbar */
        .toolbar {
          background: var(--paper);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 108px;
          z-index: 85;
          padding: 12px 0;
        }

        .toolbar-content {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
        }

        .search-wrapper {
          flex: 2;
          min-width: 240px;
          display: flex;
          align-items: center;
          background: white;
          border: 1px solid var(--border-color);
          border-radius: 48px;
          padding: 4px 4px 4px 20px;
        }

        .search-wrapper:focus-within {
          border-color: var(--saffron);
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 10px 0;
          font-size: 0.85rem;
          outline: none;
        }

        .search-btn {
          background: var(--saffron);
          border: none;
          padding: 8px 24px;
          border-radius: 40px;
          color: white;
          font-weight: 600;
          font-size: 0.7rem;
          cursor: pointer;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-select {
          padding: 8px 16px;
          border: 1px solid var(--border-color);
          border-radius: 40px;
          background: white;
          font-size: 0.7rem;
          cursor: pointer;
        }

        .sort-link {
          padding: 8px 16px;
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--ink-light);
          border-radius: 40px;
        }

        .sort-link.active {
          background: var(--ink);
          color: white;
        }

        .clear-link {
          padding: 8px 16px;
          font-size: 0.65rem;
          color: var(--saffron);
          text-decoration: none;
          font-weight: 600;
        }

        /* Results Header */
        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 12px;
          padding: 24px 0 16px;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 24px;
        }

        /* Featured Cards */
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 48px;
        }

        .featured-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          border: 1px solid var(--border-color);
          transition: all 0.2s;
        }

        .featured-card:hover {
          transform: translateY(-4px);
          border-color: var(--saffron);
        }

        .featured-img {
          height: 160px;
          background: linear-gradient(135deg, #F5EFE2, #EDE5D8);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .featured-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--saffron);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.6rem;
          font-weight: 600;
        }

        .featured-content {
          padding: 20px;
        }

        .featured-category {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--saffron);
          margin-bottom: 8px;
        }

        .featured-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .featured-desc {
          font-size: 0.75rem;
          color: var(--ink-light);
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .featured-meta {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid var(--border-color);
          padding-top: 12px;
          font-size: 0.65rem;
          color: var(--ink-light);
        }

        /* Startup List */
        .startup-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .startup-item {
          display: grid;
          grid-template-columns: 48px 1fr auto;
          background: white;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s;
        }

        .startup-item:hover {
          transform: translateX(4px);
          border-color: var(--saffron);
        }

        .startup-number {
          display: flex;
          justify-content: center;
          padding-top: 20px;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          color: var(--ink-light);
          background: #FAF7F2;
          border-radius: 12px 0 0 12px;
        }

        .startup-body {
          padding: 16px 20px 16px 0;
        }

        .startup-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .startup-logo {
          width: 44px;
          height: 44px;
          background: var(--paper-dark);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
          flex-shrink: 0;
        }

        .startup-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #E8F5E9;
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 0.55rem;
          font-weight: 600;
          color: var(--green);
        }

        .startup-category {
          font-size: 0.65rem;
          color: var(--saffron);
          font-weight: 500;
        }

        .startup-desc {
          font-size: 0.75rem;
          color: var(--ink-light);
          margin: 8px 0;
          line-height: 1.5;
        }

        .startup-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 0.65rem;
          color: var(--ink-light);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .ufrn-badge {
          background: var(--paper-dark);
          padding: 2px 8px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.6rem;
        }

        .startup-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
        }

        /* Sidebar */
        .sidebar {
          position: sticky;
          top: 130px;
        }

        .sidebar-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          border: 1px solid var(--border-color);
        }

        .sidebar-card.dark {
          background: var(--ink);
          border: none;
        }

        .sidebar-title {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--saffron);
          margin-bottom: 16px;
        }

        .sidebar-card.dark .sidebar-title {
          color: var(--gold);
        }

        .sidebar-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .sidebar-text {
          font-size: 0.75rem;
          color: var(--ink-light);
          margin-bottom: 20px;
        }

        .sidebar-card.dark .sidebar-text {
          color: rgba(255,255,255,0.7);
        }

        .sidebar-btn {
          display: block;
          background: var(--saffron);
          color: white;
          text-align: center;
          padding: 10px;
          border-radius: 40px;
          text-decoration: none;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .sector-list {
          list-style: none;
        }

        .sector-list li {
          border-bottom: 1px solid var(--border-color);
        }

        .sector-list li:last-child {
          border-bottom: none;
        }

        .sector-list a {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          text-decoration: none;
          color: var(--ink);
          font-size: 0.75rem;
        }

        .sector-list a:hover {
          color: var(--saffron);
        }

        /* CTA */
        .cta-section {
          background: var(--ink);
          border-radius: 16px;
          padding: 40px;
          margin: 48px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }

        .cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: white;
        }

        .cta-text {
          color: rgba(255,255,255,0.6);
          font-size: 0.8rem;
        }

        .cta-btn {
          background: var(--saffron);
          color: white;
          padding: 12px 28px;
          border-radius: 40px;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid var(--border-color);
        }

        .page-link {
          padding: 8px 16px;
          border-radius: 8px;
          text-decoration: none;
          color: var(--ink);
          border: 1px solid var(--border-color);
          background: white;
        }

        .page-link:hover {
          border-color: var(--saffron);
          color: var(--saffron);
        }

        .page-link.active {
          background: var(--saffron);
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
          .sidebar {
            position: static;
            margin-top: 32px;
          }
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 16px;
          border: 1px solid var(--border-color);
        }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-title-line {
          flex: 1;
          height: 1px;
          background: var(--border-color);
        }
      `}</style>

      {/* Fixed Tricolor Bar */}
      <div className="tricolor-bar">
        <div className="saffron-strip"></div>
        <div className="white-strip"></div>
        <div className="green-strip"></div>
      </div>

      <Navbar />

      {/* Newspaper Style Masthead */}
      <div className="masthead">
        <div className="container">
          <div className="masthead-content">
            <div className="date-badge">{currentDate}</div>
            <div className="masthead-logo">
              <h1 className="serif">THE UPFORGE REGISTRY</h1>
              <div className="edition">INDIA EDITION • VOL. III • 2026</div>
            </div>
            <div className="stats-badge">
              <div className="stat-mini">
                <strong>{total.toLocaleString()}+</strong><br />Startups
              </div>
              <div className="stat-mini">
                <strong>30+</strong><br />Sectors
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with India Map */}
      <div className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="animate-fade">
              <div className="hero-badge">
                <Star size={14} />
                <span>INDIA'S MOST TRUSTED DIRECTORY</span>
              </div>
              <h1 className="hero-title serif">
                The Definitive <span className="highlight">Indian Startup</span><br />
                Registry 2026
              </h1>
              <p className="hero-description">
                Discover, verify, and connect with {total.toLocaleString()}+ innovative Indian startups. 
                The most comprehensive, independent database of India's entrepreneurial ecosystem.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">{total.toLocaleString()}+</div>
                  <div className="stat-label">Verified Startups</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">126+</div>
                  <div className="stat-label">Indian Unicorns</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">$9.2B</div>
                  <div className="stat-label">Q1 2026 Funding</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">3rd</div>
                  <div className="stat-label">Global Ecosystem</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">30+</div>
                  <div className="stat-label">Sectors Covered</div>
                </div>
              </div>
            </div>
            <div className="india-map-container animate-fade delay-1">
              <div className="map-placeholder">
                <svg width="100%" height="180" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M200,30 L320,80 L360,150 L320,220 L240,260 L140,250 L60,200 L40,120 L100,60 L160,40 Z" 
                    fill="#E8DFD0" stroke="#E67E22" strokeWidth="2" />
                  <circle cx="200" cy="140" r="50" fill="none" stroke="#E67E22" strokeWidth="1.5" strokeDasharray="4 4" />
                  <text x="200" y="150" textAnchor="middle" fill="#E67E22" fontSize="12" fontWeight="500">INDIA</text>
                  <circle cx="280" cy="100" r="4" fill="#E67E22" />
                  <circle cx="320" cy="150" r="4" fill="#E67E22" />
                  <circle cx="240" cy="200" r="4" fill="#E67E22" />
                  <circle cx="140" cy="210" r="4" fill="#E67E22" />
                  <circle cx="80" cy="160" r="4" fill="#E67E22" />
                  <circle cx="120" cy="90" r="4" fill="#E67E22" />
                </svg>
                <div className="map-caption">
                  🇮🇳 28 States • 8 Union Territories • One Unified Ecosystem
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sector Tabs */}
      <div className="sector-strip">
        <div className="container">
          <div className="sector-tabs">
            <Link href="/startup" className={`sector-tab ${!cat ? 'active' : ''}`}>All Startups</Link>
            {cats.slice(0, 12).map(c => (
              <Link key={c} href={`/startup?category=${encodeURIComponent(c)}`} className={`sector-tab ${cat === c ? 'active' : ''}`}>{c}</Link>
            ))}
            {cats.length > 12 && (
              <Link href="/startups" className="sector-tab">+{cats.length - 12} More</Link>
            )}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="container">
          <div className="toolbar-content">
            <form action="/startup" method="GET" className="search-wrapper">
              {year && <input type="hidden" name="year" value={year} />}
              {cat && <input type="hidden" name="category" value={cat} />}
              {sort && sort !== "name" && <input type="hidden" name="sort" value={sort} />}
              <input type="search" name="q" defaultValue={q} placeholder="Search startups, founders, sectors..." className="search-input" />
              <button type="submit" className="search-btn">Search</button>
            </form>
            <div className="filter-group">
              <select className="filter-select" id="year-select" defaultValue={year}>
                <option value="">All Years</option>
                {years.map(yr => <option key={yr} value={yr}>{yr}</option>)}
              </select>
              <select className="filter-select" id="category-select" defaultValue={cat}>
                <option value="">All Sectors</option>
                {cats.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <Link href={qs({ sort: "name", page: undefined })} className={`sort-link ${sort === "name" ? "active" : ""}`}>A-Z</Link>
              <Link href={qs({ sort: "newest", page: undefined })} className={`sort-link ${sort === "newest" ? "active" : ""}`}>Newest</Link>
              <Link href={qs({ sort: "year", page: undefined })} className={`sort-link ${sort === "year" ? "active" : ""}`}>Founded</Link>
              {isFiltered && <Link href="/startup" className="clear-link">Clear all</Link>}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="results-header">
          <div>
            <span style={{ fontWeight: 600 }}>
              {q ? `"${q}"` : cat ? cat : year ? `Est. ${year}` : "All Startups"}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--ink-light)', marginLeft: '12px' }}>
              {total.toLocaleString()} results
            </span>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--ink-light)' }}>
            Page {page} of {totalPages || 1}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px' }}>
          <div>
            {/* Featured Startups */}
            {featured.length > 0 && (
              <div>
                <div className="section-title">
                  <span>⭐ Featured This Edition</span>
                  <div className="section-title-line"></div>
                </div>
                <div className="featured-grid">
                  {featured.map((s) => (
                    <Link key={s.id} href={`/startup/${s.slug}`} className="featured-card">
                      <div className="featured-img">
                        {s.logo_url ? (
                          <Image src={s.logo_url} alt={s.name} width={300} height={160} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                        ) : (
                          <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--saffron)' }}>{s.name.charAt(0)}</span>
                        )}
                        <span className="featured-tag">Featured</span>
                      </div>
                      <div className="featured-content">
                        <div className="featured-category">{s.category || "Startup"}</div>
                        <div className="featured-name">{s.name}</div>
                        <p className="featured-desc">{s.description || "Building India's future with innovation."}</p>
                        <div className="featured-meta">
                          <span>{s.founded_year ? `Est. ${s.founded_year}` : ''}</span>
                          {s.city && <span>{s.city}</span>}
                          {s.ufrn && <span className="ufrn-badge">{s.ufrn}</span>}
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
                  <div className="section-title" style={{ marginTop: '24px' }}>
                    <span>📋 All Startups</span>
                    <div className="section-title-line"></div>
                  </div>
                )}
                <div className="startup-list">
                  {grid.map((s, idx) => (
                    <Link key={s.id} href={`/startup/${s.slug}`} className="startup-item">
                      <div className="startup-number">
                        {String(baseNum + idx + 1).padStart(2, '0')}
                      </div>
                      <div className="startup-body">
                        <div className="startup-header">
                          <div className="startup-logo">
                            {s.logo_url ? (
                              <Image src={s.logo_url} alt={s.name} width={44} height={44} style={{ objectFit: 'contain' }} />
                            ) : (
                              <span style={{ fontWeight: 700 }}>{s.name.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <div className="startup-name">
                              {s.name}
                              <span className="verified-badge">
                                <Verified size={10} /> Verified
                              </span>
                            </div>
                            <div className="startup-category">{s.category || "Startup"}</div>
                          </div>
                        </div>
                        {s.description && <p className="startup-desc">{s.description}</p>}
                        <div className="startup-meta">
                          {s.founders && (
                            <span className="meta-item">
                              <Users size={12} /> {s.founders}
                            </span>
                          )}
                          {s.founded_year && (
                            <span className="meta-item">
                              <Calendar size={12} /> Est. {s.founded_year}
                            </span>
                          )}
                          {s.city && (
                            <span className="meta-item">
                              <MapPin size={12} /> {s.city}
                            </span>
                          )}
                          {s.ufrn && <span className="ufrn-badge">{s.ufrn}</span>}
                        </div>
                      </div>
                      <div className="startup-arrow">
                        <ArrowUpRight size={18} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>🔍</span>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No startups found</h3>
                <p style={{ color: 'var(--ink-light)', marginBottom: '24px' }}>
                  {q ? `No results for "${q}". Try a different search term.` : 'Try adjusting your filters.'}
                </p>
                <Link href="/startup" style={{ background: 'var(--saffron)', color: 'white', padding: '10px 24px', borderRadius: '40px', textDecoration: 'none', fontWeight: 600 }}>
                  Clear Filters
                </Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <Link href={pgHref(page - 1)} className={`page-link ${page === 1 ? 'disabled' : ''}`}>← Prev</Link>
                {pgNums.map(p => (
                  <Link key={p} href={pgHref(p)} className={`page-link ${p === page ? 'active' : ''}`}>{p}</Link>
                ))}
                <Link href={pgHref(page + 1)} className={`page-link ${page === totalPages ? 'disabled' : ''}`}>Next →</Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-card dark">
              <div className="sidebar-title">Get Listed</div>
              <div className="sidebar-heading">Add Your Startup</div>
              <p className="sidebar-text">Join India's most trusted startup registry. Free, permanent listing with your unique UFRN.</p>
              <Link href="/submit" className="sidebar-btn">Submit Your Startup →</Link>
            </div>

            {cats.length > 0 && (
              <div className="sidebar-card">
                <div className="sidebar-title">Browse by Sector</div>
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

            <div className="sidebar-card dark">
              <div className="sidebar-title">India's Ecosystem 2026</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)' }}>Total Funding (YTD)</span>
                  <span style={{ fontWeight: 700, color: 'var(--gold)' }}>$12.4B</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)' }}>New Unicorns 2026</span>
                  <span style={{ fontWeight: 700, color: 'var(--gold)' }}>18</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)' }}>Active Investors</span>
                  <span style={{ fontWeight: 700, color: 'var(--gold)' }}>2,300+</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)' }}>Jobs Created</span>
                  <span style={{ fontWeight: 700, color: 'var(--gold)' }}>1.2M+</span>
                </div>
              </div>
            </div>

            <div className="sidebar-card">
              <div className="sidebar-title">From The Forge</div>
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
          <Link href="/submit" className="cta-btn">
            Get Listed Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* JavaScript for filters */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          const yearSelect = document.getElementById('year-select');
          const categorySelect = document.getElementById('category-select');
          
          function updateUrl(param, value) {
            const params = new URLSearchParams(window.location.search);
            if (value && value !== '') {
              params.set(param, value);
            } else {
              params.delete(param);
            }
            params.delete('page');
            window.location.href = '/startup' + (params.toString() ? '?' + params.toString() : '');
          }
          
          if (yearSelect) yearSelect.addEventListener('change', (e) => updateUrl('year', e.target.value));
          if (categorySelect) categorySelect.addEventListener('change', (e) => updateUrl('category', e.target.value));
        })();
      `}} />
    </>
  )
}
