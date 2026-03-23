// app/registry/page.tsx — REDESIGN v11 (Modern Global Registry)
// Global Startup Registry — Updated with new background image, polished design
// Matching the Indian Registry page layout and improvements

import { createReadClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

const PAGE_SIZE = 10

interface StartupRow {
  id: string; name: string; slug: string
  description?: string | null; logo_url?: string | null
  founders?: string | null; founded_year?: number | null
  category?: string | null; city?: string | null
  country_name?: string | null; is_featured?: boolean
  ufrn?: string | null
}

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string; year?: string; sort?: string; sector?: string }>
}

async function getData(q: string, year: string, sort: string, cat: string, page: number) {
  const sb = createReadClient()
  const from = (page - 1) * PAGE_SIZE
  let query = sb.from("startups")
    .select("id,name,slug,description,logo_url,founders,founded_year,category,city,country_name,is_featured,ufrn", { count: "exact" })
    .eq("status", "approved")
  if (q)    query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%,founders.ilike.%${q}%,category.ilike.%${q}%,city.ilike.%${q}%`)
  if (year) query = query.eq("founded_year", Number(year))
  if (cat)  query = query.eq("category", cat)
  const col = sort === "year" ? "founded_year" : sort === "newest" ? "created_at" : "name"
  const { data, count } = await query
    .order("is_featured", { ascending: false })
    .order(col, { ascending: sort !== "newest" })
    .range(from, from + PAGE_SIZE - 1)
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
  const isFiltered = !!(sp?.q || sp?.year || sp?.sort || sp?.sector)
  const page = Number(sp?.page ?? 1)
  return {
    title: `Global Startup Registry 2026 — ${n}+ Verified Startups | UpForge`,
    description: `The open, independent, verified global registry of ${n}+ startups. Every listing is manually reviewed and assigned a unique UpForge Registry Number (UFRN). Search by founder, sector, city, year. Free to access, forever.`,
    keywords: [
      "global startup registry", "verified startup database", "UFRN startup registry number",
      "open startup data", "startup proof of existence", "independent startup registry",
      "Indian startup founders 2026", "India unicorn founders", "upforge registry",
      "startup verification", "startup database", "global startup database 2026",
    ],
    alternates: { canonical: "https://www.upforge.org/registry" },
    openGraph: {
      title: `Global Startup Registry 2026 — ${n}+ Verified | UpForge`,
      description: `Open, independent, verified registry of ${n}+ startups worldwide. Every startup gets a unique UFRN.`,
      url: "https://www.upforge.org/registry", siteName: "UpForge Global Registry",
      images: [{ url: "https://www.upforge.in/og/startup-default.png", width: 1200, height: 630 }],
      locale: "en", type: "website",
    },
    robots: {
      index: !isFiltered && page <= 1, follow: true,
      googleBot: { index: !isFiltered && page <= 1, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    },
  }
}

export const revalidate = 300

export default async function RegistryPage({ searchParams }: PageProps) {
  const sp   = await searchParams
  const q    = sp?.q?.trim()      ?? ""
  const year = sp?.year?.trim()   ?? ""
  const sort = sp?.sort?.trim()   ?? "name"
  const cat  = sp?.sector?.trim() ?? ""
  const page = Math.max(1, Number(sp?.page ?? 1))

  const [{ startups, total }, { years, cats }] = await Promise.all([
    getData(q, year, sort, cat, page),
    getFilters(),
  ])
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const isFiltered = !!(q || year || cat || (sort && sort !== "name"))

  const qs = (ov: Record<string, string | undefined>) => {
    const base: Record<string, string | undefined> = {
      q:      q    || undefined,
      year:   year || undefined,
      sort:   sort !== "name" ? sort : undefined,
      sector: cat  || undefined,
      page:   page > 1 ? String(page) : undefined,
    }
    const m = { ...base, ...ov }
    const p = new URLSearchParams()
    Object.entries(m).forEach(([k, v]) => { if (v) p.set(k, v) })
    const s = p.toString()
    return `/registry${s ? `?${s}` : ""}`
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
    {
      "@context": "https://schema.org", "@type": "Dataset",
      "@id": "https://www.upforge.org/registry#dataset",
      name: "UpForge Global Startup Registry",
      description: `Open, verified, independent database of ${total.toLocaleString()}+ startups. Each assigned a unique UFRN (UpForge Registry Number).`,
      url: "https://www.upforge.org/registry",
      creator: { "@type": "Organization", name: "UpForge", url: "https://www.upforge.org" },
      license: "https://creativecommons.org/licenses/by/4.0/",
      isAccessibleForFree: true,
    },
    {
      "@context": "https://schema.org", "@type": "Organization",
      "@id": "https://www.upforge.org/#organization",
      name: "UpForge", url: "https://www.upforge.org",
      logo: { "@type": "ImageObject", url: "https://www.upforge.in/logo.jpg" },
      sameAs: ["https://www.upforge.in", "https://www.upforge.org"],
    },
    {
      "@context": "https://schema.org", "@type": "WebSite",
      name: "UpForge Global Registry", url: "https://www.upforge.org",
      potentialAction: { "@type": "SearchAction", target: { urlTemplate: "https://www.upforge.org/registry?q={search_term_string}" }, "query-input": "required name=search_term_string" },
    },
    {
      "@context": "https://schema.org", "@type": "CollectionPage",
      "@id": "https://www.upforge.org/registry#cp",
      name: "Global Startup Registry 2026", url: "https://www.upforge.org/registry",
      description: `The world's open, independent registry of ${total.toLocaleString()}+ verified startups.`,
      numberOfItems: total, inLanguage: "en",
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "UpForge", item: "https://www.upforge.org" },
        { "@type": "ListItem", position: 2, name: "Global Registry", item: "https://www.upforge.org/registry" },
      ],
    },
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        .pf { font-family: 'Playfair Display', Georgia, serif !important; }

        :root {
          --teal: #0D9488;
          --teal-dark: #0F766E;
          --teal-light: #5EEAD4;
          --ink: #0F1A1C;
          --parch: #F2F4F3;
          --parch-dark: #E8EDEC;
          --rule: #C4CCCB;
          --rule2: #D4DCDA;
          --muted: #4A6360;
          --accent: #0D9488;
          --accent-light: #5EEAD4;
          --gold: #C59A2E;
        }

        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }

        html, body {
          min-height: 100vh;
          scroll-behavior: smooth;
        }

        body { 
          background: var(--parch); 
          display: flex;
          flex-direction: column;
        }

        .page-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .page-body {
          flex: 1;
        }

        @keyframes riseIn { 
          from { opacity: 0; transform: translateY(12px); } 
          to { opacity: 1; transform: none; } 
        }
        .ri-0 { animation: riseIn 0.5s 0s ease both; }
        .ri-1 { animation: riseIn 0.5s 0.08s ease both; }
        .ri-2 { animation: riseIn 0.5s 0.16s ease both; }
        .ri-3 { animation: riseIn 0.5s 0.24s ease both; }

        /* Hero Section with Background Image */
        .hero-section {
          position: relative;
          background: linear-gradient(135deg, rgba(15,26,28,0.88) 0%, rgba(15,26,28,0.75) 100%);
          overflow: hidden;
          border-bottom: 1px solid var(--rule);
          margin-top: 0;
        }
        
        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('https://www.unesco.org/sites/default/files/2022-04/visages%20de%20couleur%20surr%C3%A9aliste.jpg');
          background-size: cover;
          background-position: center 30%;
          background-repeat: no-repeat;
          opacity: 0.2;
          z-index: 0;
        }
        
        .hero-bg::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, rgba(15,26,28,0.85) 0%, rgba(15,26,28,0.5) 50%, rgba(15,26,28,0.85) 100%);
        }
        
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #0F766E 0%, #0D9488 50%, #5EEAD4 100%);
          z-index: 2;
        }

        .mast {
          position: relative;
          z-index: 2;
          background: transparent;
        }

        .mast-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 100px 24px 80px;
        }

        .mast-h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 64px;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: white;
          line-height: 1.1;
          text-shadow: 0 2px 12px rgba(0,0,0,0.3);
          margin-bottom: 20px;
        }

        .mast-rule {
          display: block;
          width: 200px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--teal), var(--teal-light), var(--teal), transparent);
          margin: 20px auto 24px;
        }

        .mast-tagline {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 16px;
          color: rgba(255,255,255,0.92);
          font-style: italic;
          line-height: 1.7;
          max-width: 580px;
          margin: 0 auto 28px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }

        .live-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.25);
          padding: 10px 28px;
          border-radius: 100px;
        }
        .live-dot { 
          width: 8px; 
          height: 8px; 
          border-radius: 50%; 
          background: var(--teal-light); 
          box-shadow: 0 0 0 2px rgba(94,234,212,0.3);
          animation: pulse 2s infinite;
        }
        .live-text {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: white;
        }
        @keyframes pulse { 
          0% { box-shadow: 0 0 0 0 rgba(94,234,212,0.4); } 
          70% { box-shadow: 0 0 0 8px rgba(94,234,212,0); } 
          100% { box-shadow: 0 0 0 0 rgba(94,234,212,0); }
        }

        .ufrn-sample {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 20px;
          border-radius: 100px;
          margin-top: 16px;
        }
        .ufrn-label {
          font-family: system-ui, sans-serif;
          font-size: 8px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.6);
        }
        .ufrn-code {
          font-family: monospace;
          font-size: 12px;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 0.05em;
        }

        /* Category Tabs */
        .cat-tabs { 
          display: flex; 
          overflow-x: auto; 
          border-bottom: 1px solid var(--rule); 
          scrollbar-width: none; 
          background: white; 
          padding: 0 24px;
          position: relative;
          z-index: 5;
        }
        .cat-tabs::-webkit-scrollbar { display: none; }
        .cat-tab { 
          flex-shrink: 0; 
          padding: 16px 24px; 
          font-family: system-ui, -apple-system, sans-serif; 
          font-size: 10px; 
          font-weight: 700; 
          letter-spacing: 0.12em; 
          text-transform: uppercase; 
          color: #888; 
          text-decoration: none; 
          border-bottom: 2.5px solid transparent; 
          transition: all 0.2s; 
          white-space: nowrap; 
        }
        .cat-tab:hover { color: var(--ink); border-bottom-color: var(--rule); }
        .cat-tab.on { color: var(--teal); border-bottom-color: var(--teal); }

        /* Toolbar */
        .toolbar { 
          position: sticky; 
          top: 0; 
          z-index: 20; 
          background: rgba(242,244,243,0.96); 
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--rule);
        }
        .toolbar-inner { 
          max-width: 1300px; 
          margin: 0 auto; 
          padding: 0 24px; 
        }

        .t-search-row { 
          display: flex; 
          align-items: center; 
          height: 56px; 
          background: white; 
          border-radius: 16px; 
          margin: 16px 0; 
          border: 1px solid var(--rule2);
        }
        .t-icon { padding: 0 16px; color: #AAA; font-size: 16px; flex-shrink: 0; }
        .t-inp { 
          flex: 1; 
          border: none; 
          background: transparent; 
          font-size: 15px; 
          font-style: italic; 
          color: var(--ink); 
          outline: none; 
          padding: 0; 
          min-width: 0; 
        }
        .t-inp::placeholder { color: var(--rule); font-size: 14px; }
        .t-btn { 
          height: 44px; 
          padding: 0 28px; 
          background: var(--ink); 
          color: #fff; 
          border: none; 
          font-size: 10px; 
          font-weight: 800; 
          letter-spacing: 0.16em; 
          text-transform: uppercase; 
          cursor: pointer; 
          flex-shrink: 0; 
          border-radius: 12px;
          margin-right: 10px;
        }
        .t-btn:hover { background: var(--teal); }

        .t-filter-row { 
          display: flex; 
          align-items: center; 
          height: 48px; 
          overflow-x: auto; 
          gap: 12px;
          background: white; 
          border-radius: 16px; 
          padding: 0 16px; 
          margin-bottom: 16px;
          border: 1px solid var(--rule2);
        }
        .t-filter-lbl { 
          display: flex; 
          align-items: center; 
          gap: 6px; 
          font-size: 9px; 
          font-weight: 700; 
          text-transform: uppercase; 
          letter-spacing: 0.16em; 
          color: var(--rule); 
          flex-shrink: 0;
        }
        .t-sel { 
          height: 34px; 
          border: 1px solid var(--rule2); 
          border-radius: 10px; 
          background: white; 
          font-size: 11px; 
          color: var(--muted); 
          padding: 0 14px; 
          cursor: pointer; 
          flex-shrink: 0;
        }
        .t-div { width: 1px; height: 24px; background: var(--rule2); flex-shrink: 0; margin: 0 8px; }
        .t-sort { 
          padding: 0 14px; 
          font-size: 10px; 
          font-weight: 600; 
          letter-spacing: 0.1em; 
          text-transform: uppercase; 
          color: #AAA; 
          text-decoration: none; 
          flex-shrink: 0;
          white-space: nowrap;
        }
        .t-sort.on { color: var(--teal); font-weight: 900; }
        .t-clear { 
          display: flex; 
          align-items: center; 
          gap: 5px;
          font-size: 9px; 
          font-weight: 700; 
          color: #DC2626; 
          text-decoration: none;
          flex-shrink: 0;
        }

        .results-bar { 
          max-width: 1300px; 
          margin: 0 auto; 
          padding: 20px 24px; 
          display: flex; 
          align-items: center; 
          gap: 16px; 
          background: var(--parch); 
          border-bottom: 1px solid var(--rule2);
        }
        .results-q { font-size: 15px; font-weight: 700; color: var(--ink); font-style: italic; }
        .results-n { font-size: 13px; color: var(--muted); }
        .results-rule { flex: 1; height: 1px; background: var(--rule2); }
        .results-pg { font-size: 11px; color: #AAA; }

        .main-wrap { 
          max-width: 1300px; 
          margin: 0 auto; 
          padding: 32px 24px 48px; 
        }
        .main-grid { 
          display: grid; 
          grid-template-columns: 1fr 320px; 
          gap: 40px; 
          align-items: start; 
        }
        @media (max-width: 1000px) { 
          .main-grid { grid-template-columns: 1fr; } 
          .rg-aside { display: none; } 
        }

        .sh { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .sh-l { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3em; color: #AAA; font-family: system-ui, sans-serif; white-space: nowrap; }
        .sh-r { flex: 1; height: 1px; background: var(--rule2); }

        /* Featured Cards */
        .feat-grid { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 24px; 
          margin-bottom: 48px;
        }
        @media (max-width: 800px) { .feat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .feat-grid { grid-template-columns: 1fr; } }
        
        .feat-card { 
          background: white; 
          border-radius: 20px; 
          text-decoration: none; 
          transition: all 0.3s ease;
          overflow: hidden; 
          border: 1px solid var(--rule2); 
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
        .feat-card:hover { 
          transform: translateY(-6px); 
          box-shadow: 0 20px 30px -12px rgba(0,0,0,0.12);
          border-color: var(--teal);
        }
        .feat-img-wrap { 
          width: 100%; 
          aspect-ratio: 16/9; 
          position: relative; 
          background: var(--parch-dark); 
          overflow: hidden;
        }
        .feat-img-wrap img { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
        }
        .feat-overlay { 
          position: absolute; 
          inset: 0; 
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
        }
        .feat-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; }
        .feat-sector { 
          font-size: 9px; 
          font-weight: 700; 
          text-transform: uppercase; 
          letter-spacing: 0.12em; 
          color: rgba(255,255,255,0.7); 
          margin-bottom: 6px;
        }
        .feat-company { 
          font-family: 'Playfair Display', serif; 
          font-size: 20px; 
          font-weight: 700; 
          color: #fff; 
          line-height: 1.25; 
        }
        .feat-body { padding: 20px; }
        .feat-desc { 
          font-size: 13px; 
          color: #3D5452; 
          font-style: italic; 
          line-height: 1.55; 
          display: -webkit-box; 
          -webkit-line-clamp: 2; 
          -webkit-box-orient: vertical; 
          overflow: hidden;
          margin-bottom: 16px;
        }
        .feat-foot { display: flex; align-items: center; justify-content: space-between; }
        .feat-chips { font-size: 11px; color: #AAA; display: flex; gap: 12px; flex-wrap: wrap; }

        /* List Items */
        .startup-list { display: flex; flex-direction: column; gap: 12px; }
        .s-row { 
          display: grid; 
          grid-template-columns: 70px 1fr auto; 
          background: white; 
          border-radius: 16px; 
          text-decoration: none; 
          transition: all 0.25s ease;
          border: 1px solid var(--rule2); 
          overflow: hidden;
        }
        .s-row:hover { 
          transform: translateX(5px); 
          border-color: var(--teal); 
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
        }
        @media (max-width: 560px) { 
          .s-row { grid-template-columns: 1fr auto; } 
          .s-num-col { display: none; } 
        }
        
        .s-num-col { 
          display: flex; 
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--parch-dark) 0%, var(--parch) 100%);
          border-right: 1px solid var(--rule2);
          padding: 20px 0;
        }
        .s-num { 
          font-family: 'Playfair Display', serif; 
          font-size: 24px; 
          font-weight: 900; 
          color: var(--teal);
          line-height: 1;
        }
        .s-num-label {
          font-family: system-ui, sans-serif;
          font-size: 7px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #AAA;
          margin-top: 6px;
        }
        .s-rank-badge {
          margin-top: 8px;
          padding: 2px 8px;
          background: rgba(13,148,136,0.1);
          border-radius: 20px;
          font-size: 7px;
          font-weight: 700;
          color: var(--teal);
        }
        
        .s-body { padding: 18px 20px; }
        .s-head { display: flex; align-items: center; gap: 14px; margin-bottom: 10px; }
        .s-logo-wrap { 
          width: 48px; 
          height: 48px; 
          border-radius: 14px; 
          border: 1px solid var(--rule2); 
          background: var(--parch-dark); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          flex-shrink: 0; 
        }
        .s-meta { flex: 1; min-width: 0; }
        .s-name { 
          font-family: 'Playfair Display', serif; 
          font-size: 18px; 
          font-weight: 700; 
          color: var(--ink); 
          line-height: 1.3; 
          margin-bottom: 4px;
        }
        .s-cat { 
          font-size: 10px; 
          color: #AAA; 
          text-transform: uppercase; 
          letter-spacing: 0.1em; 
        }
        .s-verified { 
          display: inline-flex; 
          align-items: center; 
          gap: 5px; 
          font-size: 9px; 
          font-weight: 800; 
          text-transform: uppercase; 
          color: var(--teal); 
          margin-left: 10px; 
        }
        .s-desc { 
          font-size: 13px; 
          color: #3D5452; 
          font-style: italic; 
          line-height: 1.5; 
          display: -webkit-box; 
          -webkit-line-clamp: 2; 
          -webkit-box-orient: vertical; 
          overflow: hidden; 
          margin-bottom: 8px;
        }
        .s-founders { 
          font-size: 12px; 
          color: #AAA; 
          display: -webkit-box; 
          -webkit-line-clamp: 1; 
          -webkit-box-orient: vertical; 
          overflow: hidden; 
          margin-bottom: 6px;
        }
        .s-chips { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; }
        .s-chip { 
          font-size: 10px; 
          color: var(--muted); 
          border: 1px solid var(--rule); 
          padding: 4px 12px; 
          background: var(--parch); 
          border-radius: 24px; 
        }
        .s-ufrn { 
          font-family: monospace; 
          font-size: 9px; 
          font-weight: 700; 
          color: var(--gold); 
          background: #FAFDF9; 
          border: 1px solid #D4E8D4; 
          padding: 3px 10px; 
          border-radius: 14px; 
        }
        .s-country { 
          font-size: 9px; 
          color: var(--teal); 
          border: 1px solid rgba(13,148,136,0.3); 
          padding: 3px 10px; 
          background: #F0FDFB; 
          border-radius: 24px;
        }
        .s-arrow-col { display: flex; align-items: center; justify-content: center; padding: 0 24px; border-left: 1px solid var(--rule2); }
        .s-arrow { 
          width: 36px; 
          height: 36px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          border-radius: 12px; 
          background: var(--parch); 
          transition: all 0.2s;
        }
        .s-row:hover .s-arrow { background: var(--teal); transform: translateX(4px); }
        .s-row:hover .s-arrow svg { color: white; }

        .empty-state { text-align: center; padding: 80px 32px; border-radius: 24px; border: 2px dashed var(--rule); background: white; }

        .pag { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--rule2); }
        .pag-btn { 
          padding: 10px 24px; 
          font-size: 10px; 
          font-weight: 700; 
          letter-spacing: 0.12em; 
          text-transform: uppercase; 
          border: 1px solid var(--rule); 
          background: white; 
          color: var(--muted); 
          text-decoration: none; 
          border-radius: 12px;
        }
        .pag-btn:hover { border-color: var(--teal); color: var(--teal); }
        .pag-btn.dis { opacity: 0.4; pointer-events: none; }
        .pag-num { 
          width: 44px; 
          height: 44px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 14px; 
          font-weight: 700; 
          border: 1px solid var(--rule); 
          text-decoration: none; 
          color: var(--muted); 
          border-radius: 12px;
        }
        .pag-num:hover { border-color: var(--teal); color: var(--teal); }
        .pag-num.on { background: var(--teal); color: white; border-color: var(--teal); }

        .rg-aside { display: flex; flex-direction: column; gap: 24px; }
        .aside-box { border-radius: 20px; border: 1px solid var(--rule2); background: white; padding: 24px; }
        .aside-box.dk { background: linear-gradient(135deg, var(--ink) 0%, #1A2A2C 100%); border-color: var(--teal); }
        .aside-box.tl { border-color: var(--teal); background: #F0FDFB; }
        .aside-ey { font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.28em; color: #AAA; margin-bottom: 14px; }
        .aside-box.dk .aside-ey { color: var(--teal-light); }
        .aside-box.tl .aside-ey { color: var(--teal-dark); }
        .aside-h { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--ink); margin-bottom: 10px; }
        .aside-box.dk .aside-h { color: white; }
        .aside-p { font-size: 13px; color: #3D5452; font-style: italic; line-height: 1.6; margin-bottom: 20px; }
        .aside-btn { 
          display: block; 
          text-align: center; 
          font-size: 10px; 
          font-weight: 900; 
          text-transform: uppercase; 
          letter-spacing: 0.16em; 
          background: var(--teal); 
          color: white; 
          padding: 14px; 
          text-decoration: none; 
          border-radius: 14px;
        }
        .aside-btn:hover { background: var(--teal-dark); }
        .aside-list { list-style: none; padding: 0; margin: 0; }
        .aside-list li { border-bottom: 1px solid var(--rule2); }
        .aside-list li:last-child { border-bottom: none; }
        .aside-list a { 
          display: flex; 
          align-items: center; 
          justify-content: space-between; 
          padding: 12px 0; 
          font-size: 13px; 
          color: #3D5452; 
          text-decoration: none; 
          font-style: italic; 
        }
        .aside-list a:hover { color: var(--teal); }

        .cta-block { 
          background: linear-gradient(135deg, var(--ink) 0%, #1A2A2C 100%); 
          border-radius: 24px; 
          padding: 40px 48px; 
          display: flex; 
          flex-wrap: wrap; 
          align-items: center; 
          justify-content: space-between; 
          gap: 28px; 
          margin-top: 56px; 
        }
        .cta-ey { font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.3em; color: rgba(94,234,212,0.7); margin-bottom: 10px; }
        .cta-h { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: white; margin-bottom: 8px; }
        .cta-p { font-size: 13px; color: rgba(255,255,255,0.5); font-style: italic; }
        .cta-btn { 
          flex-shrink: 0; 
          display: inline-flex; 
          align-items: center; 
          gap: 12px; 
          background: var(--teal); 
          color: white; 
          padding: 14px 32px; 
          font-size: 11px; 
          font-weight: 800; 
          text-transform: uppercase; 
          letter-spacing: 0.1em; 
          text-decoration: none; 
          border-radius: 48px; 
        }
        .cta-btn:hover { background: var(--teal-dark); transform: translateY(-2px); }

        .links-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 40px; padding-top: 40px; border-top: 1px solid var(--rule2); }
        @media (max-width: 700px) { .links-grid { grid-template-columns: repeat(2, 1fr); } }
        .link-card { 
          padding: 14px 16px; 
          border-radius: 14px; 
          border: 1px solid var(--rule2); 
          background: white; 
          text-decoration: none; 
          transition: all 0.2s;
        }
        .link-card:hover { border-color: var(--teal); transform: translateY(-2px); }
        .link-title { 
          font-size: 11px; 
          font-weight: 700; 
          text-transform: uppercase; 
          letter-spacing: 0.08em; 
          color: var(--ink); 
          display: flex; 
          align-items: center; 
          gap: 6px;
          margin-bottom: 6px;
        }
        .link-desc { font-size: 10px; color: #AAA; }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .mast-content { padding: 140px 20px 80px; }
          .mast-h1 { font-size: 48px; margin-bottom: 20px; }
          .mast-tagline { font-size: 15px; line-height: 1.6; }
          .mast-tagline br { display: none; }
          .live-text { font-size: 10px; letter-spacing: 0.16em; }
          .toolbar-inner { padding: 0 16px; }
          .t-search-row { height: 50px; margin: 12px 0; }
          .t-inp { font-size: 14px; }
          .t-btn { padding: 0 20px; font-size: 9px; }
          .t-filter-row { height: 44px; padding: 0 12px; }
          .results-bar { padding: 16px 16px; }
          .results-q { font-size: 14px; }
          .main-wrap { padding: 24px 16px 40px; }
          .main-grid { gap: 32px; }
          .feat-grid { gap: 20px; margin-bottom: 40px; }
          .feat-company { font-size: 18px; }
          .s-body { padding: 16px; }
          .s-name { font-size: 16px; }
          .cta-block { padding: 28px 24px; }
          .cta-h { font-size: 18px; }
        }

        @media (max-width: 480px) {
          .mast-content { padding: 120px 16px 64px; }
          .mast-h1 { font-size: 40px; }
          .mast-tagline { font-size: 14px; }
          .t-search-row { height: 46px; }
          .t-inp { font-size: 13px; }
          .t-inp::placeholder { font-size: 12px; }
          .t-btn { padding: 0 16px; font-size: 8px; }
          .results-q { font-size: 13px; }
          .s-body { padding: 14px; }
          .s-name { font-size: 15px; }
          .s-desc { font-size: 12px; }
        }
      `}</style>

      <div className="page-wrapper">
        <Navbar />

        {/* Hero Section with Background Image */}
        <div className="hero-section">
          <div className="hero-bg"></div>
          
          <div className="mast">
            <div className="mast-content ri-0">
              <h1 className="mast-h1">Global Registry</h1>
              <span className="mast-rule" />
              <p className="mast-tagline">
                The world's open, independent registry of verified startups —<br />free, structured, permanent.
              </p>
              <div className="live-badge">
                <span className="live-dot" />
                <span className="live-text">Live · {total.toLocaleString()} Profiles · UFRN on Approval</span>
              </div>
              <div className="ufrn-sample">
                <span className="ufrn-label">Sample UFRN:</span>
                <span className="ufrn-code">UF-2026-IND-00001</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <nav className="cat-tabs" aria-label="Browse by sector">
          <span style={{ fontSize: 9, color: "#BBB", textTransform: "uppercase", letterSpacing: ".2em", padding: "16px 8px 16px 0", flexShrink: 0 }}>
            Browse:
          </span>
          <Link href="/registry" className={`cat-tab${!cat && !q ? " on" : ""}`}>All</Link>
          {cats.slice(0, 12).map(c => (
            <Link key={c} href={`/registry?sector=${encodeURIComponent(c)}${q ? `&q=${encodeURIComponent(q)}` : ""}`} className={`cat-tab${cat === c ? " on" : ""}`}>{c}</Link>
          ))}
          {cats.length > 12 && <Link href="/registry/sectors" className="cat-tab">More →</Link>}
        </nav>

        {/* Toolbar */}
        <div className="toolbar" id="rg-toolbar">
          <div className="toolbar-inner">
            <form action="/registry" method="GET" className="t-search-row" id="search-form">
              {year && <input type="hidden" name="year" value={year} />}
              {cat  && <input type="hidden" name="sector" value={cat} />}
              {sort && sort !== "name" && <input type="hidden" name="sort" value={sort} />}
              <span className="t-icon" aria-hidden="true">🌍</span>
              <input 
                type="search" 
                name="q" 
                defaultValue={q} 
                className="t-inp"
                placeholder="Search startups, founders, sectors, cities, countries…"
                aria-label="Search global registry" 
                autoComplete="off" 
              />
              <button type="submit" className="t-btn">Search</button>
            </form>
            
            <div className="t-filter-row">
              <span className="t-filter-lbl">
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path d="M1 1h9M2.5 4h6M4.5 7h2" stroke="#C4CCCB" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                Filter
              </span>
              <select className="t-sel" id="rg-year-sel">
                <option value="">Any Year</option>
                {years.map(yr => <option key={yr} value={String(yr)} selected={year === String(yr)}>{yr}</option>)}
              </select>
              <select className="t-sel" id="rg-cat-sel">
                <option value="">All Sectors</option>
                {cats.map(c => <option key={c} value={c} selected={cat === c}>{c}</option>)}
              </select>
              <span className="t-div" />
              <Link href={qs({ sort:"name", page:undefined })} className={`t-sort${sort==="name" ? " on":""}`}>A–Z</Link>
              <Link href={qs({ sort:"newest", page:undefined })} className={`t-sort${sort==="newest" ? " on":""}`}>Newest</Link>
              <Link href={qs({ sort:"year", page:undefined })} className={`t-sort${sort==="year" ? " on":""}`}>Founded</Link>
              {isFiltered && (
                <Link href="/registry" className="t-clear">
                  ✕ Clear
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Page Body */}
        <div className="page-body">
          <div className="results-bar">
            <span className="results-q">
              {q ? `"${q}"` : cat ? cat : year ? `Est. ${year}` : "All Startups"}
            </span>
            <span className="results-n">{total.toLocaleString()} profiles</span>
            <span className="results-rule" />
            <span className="results-pg">Page {page} of {totalPages || 1}</span>
          </div>

          <div className="main-wrap">
            <div className="main-grid">

              {/* Main Content */}
              <div>
                {featured.length > 0 && (
                  <section>
                    <div className="sh">
                      <span style={{ color:"var(--teal)", fontSize:13 }}>◆</span>
                      <span className="sh-l">Featured Startups</span>
                      <div className="sh-r" />
                    </div>
                    <div className="feat-grid">
                      {featured.map((s, fi) => (
                        <a key={s.id} href={`https://www.upforge.in/startup/${s.slug}`} className="feat-card">
                          <div className="feat-img-wrap">
                            {s.logo_url
                              ? <img src={s.logo_url} alt={s.name} loading={fi === 0 ? "eager" : "lazy"} />
                              : <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", background:"var(--parch-dark)" }}>
                                  <span style={{ fontSize:36, fontWeight:700, color:"#AAA" }}>{s.name.charAt(0)}</span>
                                </div>
                            }
                            <div className="feat-overlay" />
                            <div className="feat-caption">
                              <span className="feat-sector">{s.category ?? "Startup"}</span>
                              <span className="feat-company">{s.name}</span>
                            </div>
                          </div>
                          <div className="feat-body">
                            <p className="feat-desc">{s.description?.slice(0, 100) ?? "Building for tomorrow."}</p>
                            <div className="feat-foot">
                              <div className="feat-chips">
                                {s.founded_year && <span>📅 {s.founded_year}</span>}
                                {s.city && <span>📍 {s.city}</span>}
                                {s.ufrn && <span className="s-ufrn">{s.ufrn}</span>}
                              </div>
                              <ArrowUpRight size={15} style={{ color:"var(--rule)" }} />
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </section>
                )}

                {grid.length > 0 ? (
                  <section>
                    {featured.length > 0 && (
                      <div className="sh">
                        <span className="sh-l">All Startups</span>
                        <div className="sh-r" />
                      </div>
                    )}
                    <div className="startup-list">
                      {grid.map((s, idx) => {
                        const rank = baseNum + idx + 1;
                        return (
                          <a key={s.id} href={`https://www.upforge.in/startup/${s.slug}`} className="s-row">
                            <div className="s-num-col">
                              <div className="s-num">{rank}</div>
                              <div className="s-num-label">Rank</div>
                              {rank <= 3 && <div className="s-rank-badge">⭐ Top {rank}</div>}
                            </div>
                            <div className="s-body">
                              <div className="s-head">
                                <div className="s-logo-wrap">
                                  {s.logo_url
                                    ? <Image src={s.logo_url} alt={s.name} width={48} height={48} className="object-contain" loading="lazy" />
                                    : <span style={{ fontSize:18, fontWeight:700, color:"#AAA" }}>{s.name.charAt(0)}</span>
                                  }
                                </div>
                                <div className="s-meta">
                                  <div className="s-name">{s.name}</div>
                                  <div className="s-cat">{s.category ?? "Startup"}<span className="s-verified">✓ UFRN</span></div>
                                </div>
                              </div>
                              {s.description && <p className="s-desc">{s.description.slice(0, 120)}</p>}
                              {s.founders && <p className="s-founders">👥 {s.founders}</p>}
                              <div className="s-chips">
                                {s.founded_year && <span className="s-chip">📅 {s.founded_year}</span>}
                                {s.city && (
                                  <span className="s-chip">
                                    📍 {s.city}{s.country_name && s.country_name !== "India" ? `, ${s.country_name}` : ""}
                                  </span>
                                )}
                                {s.country_name && s.country_name !== "India" && (
                                  <span className="s-country">🌍 {s.country_name}</span>
                                )}
                                {s.ufrn && <span className="s-ufrn">{s.ufrn}</span>}
                              </div>
                            </div>
                            <div className="s-arrow-col">
                              <div className="s-arrow">
                                <ArrowUpRight size={14} style={{ color:"var(--rule)" }} />
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </section>
                ) : (
                  <div className="empty-state">
                    <span style={{ fontSize:56, color:"var(--rule)", display:"block", marginBottom:20 }}>🌐</span>
                    <p style={{ fontSize:22, fontWeight:700, marginBottom:10 }}>No startups found</p>
                    <p style={{ fontSize:14, color:"#3D5452" }}>{q ? `Nothing matched "${q}".` : "Try adjusting your filters."}</p>
                    <Link href="/registry" style={{ display:"inline-block", background:"var(--teal)", color:"white", padding:"12px 28px", borderRadius:"48px", fontSize:12, marginTop:24, textDecoration:"none" }}>
                      Clear filters
                    </Link>
                  </div>
                )}

                {totalPages > 1 && (
                  <nav className="pag">
                    <Link href={pgHref(page - 1)} className={`pag-btn${page === 1 ? " dis" : ""}`}>← Prev</Link>
                    {pgNums.map(p => (
                      <Link key={p} href={pgHref(p)} className={`pag-num${p === page ? " on" : ""}`}>{p}</Link>
                    ))}
                    <Link href={pgHref(page + 1)} className={`pag-btn${page === totalPages ? " dis" : ""}`}>Next →</Link>
                  </nav>
                )}
              </div>

              {/* Sidebar */}
              <aside className="rg-aside" style={{ position:"sticky", top:90 }}>
                <div className="aside-box dk">
                  <p className="aside-ey">✨ Get Your UFRN</p>
                  <p className="aside-h">Got a startup to list?</p>
                  <p className="aside-p">Get independently verified. Receive your global UFRN. Free forever.</p>
                  <a href="https://www.upforge.in/submit" className="aside-btn">Submit Your Startup →</a>
                </div>

                <div className="aside-box tl">
                  <p className="aside-ey">📌 What is a UFRN?</p>
                  <p className="aside-h">Your startup's global ID</p>
                  <p className="aside-p" style={{ marginBottom: 0 }}>A unique, permanent identifier assigned to every approved startup. Shareable on LinkedIn, investor decks, and press kits.</p>
                  <div style={{ marginTop: 16, fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "var(--gold)", background: "white", padding: "8px 12px", borderRadius: 10, textAlign: "center", border: "1px solid #D4E8D4" }}>
                    UF-2026-IND-00001
                  </div>
                </div>

                {cats.length > 0 && (
                  <div className="aside-box">
                    <p className="aside-ey">📂 Browse by Sector</p>
                    <ul className="aside-list">
                      {cats.slice(0, 8).map(c => (
                        <li key={c}>
                          <Link href={`/registry?sector=${encodeURIComponent(c)}`}>
                            <span>{c}</span>
                            <span>→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            </div>

            {/* CTA */}
            <div className="cta-block">
              <div>
                <p className="cta-ey">🌍 UpForge Global Registry</p>
                <p className="cta-h">Your founder story starts with a verified profile.</p>
                <p className="cta-p">Get your UFRN. Free forever. Trusted by investors and press worldwide.</p>
              </div>
              <a href="https://www.upforge.in/submit" className="cta-btn">
                List Free — Get UFRN <ArrowRight size={14} />
              </a>
            </div>

            {/* Internal Links */}
            <div className="links-grid">
              <a href="/registry" className="link-card">
                <span className="link-title">Global Registry →</span>
                <span className="link-desc">Full verified database</span>
              </a>
              <a href="https://www.upforge.in/" className="link-card">
                <span className="link-title">Indian Startup Founders →</span>
                <span className="link-desc">Founder Chronicle 2026</span>
              </a>
              <a href="https://www.upforge.in/blog" className="link-card">
                <span className="link-title">The Forge Blog →</span>
                <span className="link-desc">Startup intelligence</span>
              </a>
              <a href="https://www.upforge.in/submit" className="link-card">
                <span className="link-title">Submit Your Startup →</span>
                <span className="link-desc">Get listed + UFRN free</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          function buildUrl(params) {
            var p = new URLSearchParams();
            if(params.q) p.set('q', params.q);
            if(params.year) p.set('year', params.year);
            if(params.sector) p.set('sector', params.sector);
            if(params.sort && params.sort !== 'name') p.set('sort', params.sort);
            var s = p.toString();
            return '/registry' + (s ? '?' + s : '');
          }
          
          function getCurrentParams() {
            var urlParams = new URLSearchParams(window.location.search);
            return {
              q: urlParams.get('q') || '',
              year: urlParams.get('year') || '',
              sector: urlParams.get('sector') || '',
              sort: urlParams.get('sort') || 'name'
            };
          }
          
          var yearSelect = document.getElementById('rg-year-sel');
          var catSelect = document.getElementById('rg-cat-sel');
          
          if(yearSelect) {
            yearSelect.addEventListener('change', function() {
              var current = getCurrentParams();
              current.year = this.value;
              window.location.href = buildUrl(current);
            });
          }
          
          if(catSelect) {
            catSelect.addEventListener('change', function() {
              var current = getCurrentParams();
              current.sector = this.value;
              window.location.href = buildUrl(current);
            });
          }
          
          var searchForm = document.getElementById('search-form');
          if(searchForm) {
            searchForm.addEventListener('submit', function(e) {
              e.preventDefault();
              var searchInput = this.querySelector('input[name="q"]');
              var current = getCurrentParams();
              current.q = searchInput.value;
              window.location.href = buildUrl(current);
            });
          }
        })();
      `}} />
    </>
  )
}
