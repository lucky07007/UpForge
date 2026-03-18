// app/startup/page.tsx — REDESIGN v7
// ─────────────────────────────────────────────────────────────────────────────
// Design: "Indian Luxury Editorial"
//   • Cormorant Garamond display + DM Sans data/UI
//   • Near-black #0A0A0A bg + warm cream #F5F0E8 surface + #C8A96E gold
//   • Museum-label startup cards — each startup is an exhibit, not a tile
//   • 12-col editorial grid, lavish whitespace, zero clutter
//   • PAGE_SIZE reduced to 12 for breathing room
//   • All search / filter / sort / pagination logic identical to v6
//   • 100% LV-level brand authority + full SEO intact
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { ArrowUpRight } from "lucide-react"

const PAGE_SIZE = 12   // fewer per page — more room per card

interface StartupRow {
  id: string; name: string; slug: string
  description?: string | null; logo_url?: string | null
  founders?: string | null; founded_year?: number | null
  category?: string | null; city?: string | null; is_featured?: boolean
}
interface PageProps {
  searchParams?: Promise<{ page?: string; q?: string; year?: string; sort?: string; category?: string }>
}

// ─── DATA ────────────────────────────────────────────────────────────────────

async function getData(q: string, year: string, sort: string, cat: string, page: number) {
  const sb = await createClient()
  const from = (page - 1) * PAGE_SIZE
  let query = sb.from("startups")
    .select("id,name,slug,description,logo_url,founders,founded_year,category,city,is_featured", { count: "exact" })
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
  const sb = await createClient()
  const [{ data: yd }, { data: cd }] = await Promise.all([
    sb.from("startups").select("founded_year").eq("status","approved").not("founded_year","is",null).gte("founded_year",2010).order("founded_year",{ascending:false}),
    sb.from("startups").select("category").eq("status","approved").not("category","is",null),
  ])
  return {
    years: [...new Set((yd ?? []).map(r => r.founded_year as number))].filter(Boolean),
    cats:  [...new Set((cd ?? []).map(r => r.category as string))].filter(Boolean).sort(),
  }
}

// ─── METADATA ────────────────────────────────────────────────────────────────

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams
  const { total } = await getData("","","name","",1)
  const n = total > 0 ? total.toLocaleString() : "1,000+"
  const isFiltered = !!(sp?.q || sp?.year || sp?.sort || sp?.category)
  const page = Number(sp?.page ?? 1)
  return {
    title: `Indian Startup Registry 2026 — ${n}+ Verified Indian Startups | UpForge`,
    description: `Discover ${n}+ verified Indian startups across AI, FinTech, SaaS, EdTech, HealthTech, Climate Tech, AgriTech, Web3 and 30+ sectors. Search by founder, city, year. India's most trusted free startup database — updated daily.`,
    keywords: "Indian startups 2026, startup registry India, verified startups India, AI startups India, fintech startups India, SaaS startups India, edtech startups India, healthtech India, startup founders India, Bengaluru startups, Mumbai startups, Delhi NCR startups, Indian unicorns 2026",
    alternates: { canonical: "https://www.upforge.in/startup" },
    openGraph: {
      title: `Indian Startup Registry 2026 — ${n}+ Verified | UpForge`,
      description: `Browse ${n}+ verified Indian startups. Free, structured, updated daily.`,
      url: "https://www.upforge.in/startup", siteName: "UpForge",
      images: [{ url: "https://www.upforge.in/og/registry.png", width: 1200, height: 630 }],
      locale: "en_IN", type: "website",
    },
    robots: {
      index: !isFiltered && page <= 1,
      follow: true,
      googleBot: { index: !isFiltered && page <= 1, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    },
  }
}
export const revalidate = 300

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default async function StartupPage({ searchParams }: PageProps) {
  const sp   = await searchParams
  const q    = sp?.q?.trim()    ?? ""
  const year = sp?.year?.trim() ?? ""
  const sort = sp?.sort?.trim() ?? "name"
  const cat  = sp?.category?.trim() ?? ""
  const page = Math.max(1, Number(sp?.page ?? 1))

  const [{ startups, total }, { years, cats }] = await Promise.all([
    getData(q, year, sort, cat, page),
    getFilters(),
  ])
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const isFiltered = !!(q || year || cat || (sort && sort !== "name"))

  // URL builder — preserves all params, overrides given keys
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

  const featured = page === 1 && !isFiltered ? startups.filter(s => s.is_featured).slice(0, 2) : []
  const featIds  = new Set(featured.map(s => s.id))
  const grid     = page === 1 && !isFiltered ? startups.filter(s => !featIds.has(s.id)) : startups

  // Global offset for sequential numbering across pages
  const baseIndex = (page - 1) * PAGE_SIZE

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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Design tokens ───────────────────────────────────────────────── */
        :root {
          --void:    #0A0A0A;
          --void2:   #111111;
          --void3:   #1A1A1A;
          --cream:   #F5F0E8;
          --cream2:  #EDE8DF;
          --cream3:  #FAF7F3;
          --gold:    #C8A96E;
          --gold2:   #A8893E;
          --gold3:   #E8C980;
          --muted:   #6B6560;
          --muted2:  #9A958F;
          --rule:    rgba(200,169,110,.2);
          --rule2:   rgba(200,169,110,.08);
          --cg:      'Cormorant Garamond', Georgia, serif;
          --dm:      'DM Sans', system-ui, sans-serif;
        }

        /* ── Reset for this page only ────────────────────────────────────── */
        .pg * { box-sizing: border-box; }
        .pg a { text-decoration: none; }
        .pg ul { list-style: none; margin: 0; padding: 0; }

        /* ── Animations ──────────────────────────────────────────────────── */
        @keyframes pgRise  { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:none } }
        @keyframes pgFade  { from { opacity:0 } to { opacity:1 } }
        @keyframes pgSlide { from { opacity:0; transform:translateX(-12px) } to { opacity:1; transform:none } }
        .pg-rise  { animation: pgRise  .7s cubic-bezier(.16,1,.3,1) both }
        .pg-fade  { animation: pgFade  .5s ease both }
        .pg-slide { animation: pgSlide .6s cubic-bezier(.16,1,.3,1) both }
        .d1  { animation-delay:.00s } .d2 { animation-delay:.08s }
        .d3  { animation-delay:.16s } .d4 { animation-delay:.24s }
        .d5  { animation-delay:.32s } .d6 { animation-delay:.40s }

        /* ── Page shell ──────────────────────────────────────────────────── */
        .pg {
          min-height: 100vh;
          background: var(--void);
          font-family: var(--dm);
          color: var(--cream);
        }

        /* ── Masthead ─────────────────────────────────────────────────────── */
        .mast {
          background: var(--void);
          border-bottom: 1px solid var(--rule);
          padding: clamp(48px,8vw,96px) clamp(20px,5vw,80px) 0;
          position: relative;
          overflow: hidden;
        }
        /* Subtle grid texture */
        .mast::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--rule2) 1px, transparent 1px),
            linear-gradient(90deg, var(--rule2) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none;
        }
        .mast-inner {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
        }
        .mast-eyebrow {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 28px;
        }
        .mast-eyebrow-line { height: 1px; width: 48px; background: var(--gold); opacity: .6; }
        .mast-eyebrow-text {
          font-family: var(--dm); font-size: 9px; font-weight: 500;
          letter-spacing: .35em; text-transform: uppercase;
          color: var(--gold); opacity: .8;
        }
        .mast-title {
          font-family: var(--cg);
          font-size: clamp(3.2rem, 9vw, 8rem);
          font-weight: 300;
          letter-spacing: -.02em;
          line-height: .92;
          color: var(--cream);
          margin-bottom: 24px;
        }
        .mast-title em { font-style: italic; color: var(--gold); }
        .mast-sub {
          font-family: var(--dm); font-size: clamp(12px,1.4vw,14px);
          color: var(--muted2); font-weight: 300; line-height: 1.8;
          max-width: 520px; margin-bottom: 40px;
          letter-spacing: .01em;
        }

        /* Stats row */
        .mast-stats {
          display: grid;
          grid-template-columns: repeat(4,auto);
          gap: 0;
          width: fit-content;
          border: 1px solid var(--rule);
          margin-bottom: 0;
        }
        @media(max-width:600px) { .mast-stats { grid-template-columns: repeat(2,1fr); width:100% } }
        .mast-stat {
          padding: 20px 32px;
          border-right: 1px solid var(--rule);
          min-width: 120px;
        }
        .mast-stat:last-child { border-right: none; }
        .mast-stat-v {
          font-family: var(--cg); font-size: clamp(1.8rem,3vw,2.6rem);
          font-weight: 300; color: var(--gold3); line-height: 1; margin-bottom: 4px;
        }
        .mast-stat-l {
          font-family: var(--dm); font-size: 8px; font-weight: 500;
          text-transform: uppercase; letter-spacing: .22em; color: var(--muted);
        }

        /* Live badge */
        .live-badge {
          display: inline-flex; align-items: center; gap: 7px;
          border: 1px solid rgba(200,169,110,.3);
          padding: 6px 16px; margin-bottom: 28px;
          font-family: var(--dm); font-size: 9px; font-weight: 500;
          letter-spacing: .2em; text-transform: uppercase; color: var(--gold);
        }
        .live-dot {
          width: 5px; height: 5px; border-radius: 50%; background: var(--gold);
          animation: pgFade .8s ease infinite alternate;
        }

        /* ── Category strip ──────────────────────────────────────────────── */
        .cat-strip {
          border-top: 1px solid var(--rule);
          display: flex; overflow-x: auto; gap: 0;
          scrollbar-width: none;
        }
        .cat-strip::-webkit-scrollbar { display: none; }
        .cat-tab {
          flex-shrink: 0; padding: 14px 22px;
          font-family: var(--dm); font-size: 9px; font-weight: 500;
          letter-spacing: .18em; text-transform: uppercase;
          color: var(--muted); border-right: 1px solid var(--rule);
          border-bottom: 2px solid transparent;
          transition: color .2s, border-color .2s;
          white-space: nowrap;
        }
        .cat-tab:hover { color: var(--cream); border-bottom-color: var(--rule); }
        .cat-tab.on { color: var(--gold); border-bottom-color: var(--gold); }

        /* ── Search / filter toolbar ─────────────────────────────────────── */
        .toolbar {
          position: sticky; top: 0; z-index: 40;
          background: rgba(10,10,10,.96);
          backdrop-filter: blur(20px) saturate(1.2);
          border-bottom: 1px solid var(--rule);
        }
        .toolbar-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 clamp(20px,5vw,80px);
        }
        .search-row {
          display: flex; align-items: center;
          border-bottom: 1px solid var(--rule2);
          gap: 0;
        }
        .search-icon { padding: 0 18px; color: var(--muted); font-size: 18px; flex-shrink: 0; }
        .search-inp {
          flex: 1; height: 52px; border: none; background: transparent;
          font-family: var(--cg); font-size: 17px; font-style: italic;
          color: var(--cream); outline: none; padding: 0;
          letter-spacing: .01em;
        }
        .search-inp::placeholder { color: var(--muted); }
        .search-btn {
          height: 52px; padding: 0 28px; background: var(--gold);
          color: var(--void); border: none; cursor: pointer;
          font-family: var(--dm); font-size: 8.5px; font-weight: 600;
          letter-spacing: .22em; text-transform: uppercase; flex-shrink: 0;
          transition: opacity .15s;
        }
        .search-btn:hover { opacity: .88; }
        .filter-row {
          display: flex; align-items: center; height: 40px; overflow-x: auto;
          scrollbar-width: none; gap: 0;
        }
        .filter-row::-webkit-scrollbar { display: none; }
        .filter-lbl {
          font-family: var(--dm); font-size: 8px; font-weight: 500;
          text-transform: uppercase; letter-spacing: .28em; color: var(--muted);
          padding: 0 18px; border-right: 1px solid var(--rule2);
          height: 100%; display: flex; align-items: center; flex-shrink: 0;
        }
        .filter-sel {
          height: 100%; border: none; border-right: 1px solid var(--rule2);
          background: transparent; font-family: var(--dm); font-size: 11px;
          font-weight: 300; color: var(--cream2); padding: 0 14px;
          outline: none; cursor: pointer; flex-shrink: 0; max-width: 150px;
        }
        .filter-sel option { background: var(--void); }
        .filter-link {
          height: 100%; padding: 0 16px; display: flex; align-items: center;
          font-family: var(--dm); font-size: 8.5px; font-weight: 500;
          letter-spacing: .12em; text-transform: uppercase;
          color: var(--muted); border-right: 1px solid var(--rule2);
          white-space: nowrap; transition: color .15s;
          flex-shrink: 0;
        }
        .filter-link:hover { color: var(--cream); }
        .filter-link.on { color: var(--gold); }
        .filter-clear {
          height: 100%; padding: 0 16px; display: flex; align-items: center;
          font-family: var(--dm); font-size: 8.5px; font-weight: 500;
          letter-spacing: .12em; text-transform: uppercase;
          color: #C06060; flex-shrink: 0;
        }

        /* ── Results meta bar ────────────────────────────────────────────── */
        .results-bar {
          max-width: 1280px; margin: 0 auto;
          padding: 16px clamp(20px,5vw,80px);
          display: flex; align-items: center; gap: 14px;
          border-bottom: 1px solid var(--rule2);
        }
        .results-q {
          font-family: var(--cg); font-size: 1.1rem; font-weight: 400;
          font-style: italic; color: var(--cream);
        }
        .results-n { font-family: var(--dm); font-size: 11px; color: var(--muted2); font-weight: 300; }
        .results-rule { flex: 1; height: 1px; background: var(--rule2); }
        .results-pg { font-family: var(--dm); font-size: 9px; color: var(--muted); letter-spacing: .08em; }

        /* ── Main layout ─────────────────────────────────────────────────── */
        .main-wrap {
          max-width: 1280px; margin: 0 auto;
          padding: clamp(32px,5vw,64px) clamp(20px,5vw,80px) 0;
        }
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: clamp(32px,4vw,72px);
          align-items: start;
        }
        @media(max-width:1080px) { .main-grid { grid-template-columns: 1fr; } .aside { display:none; } }

        /* ── Section header ──────────────────────────────────────────────── */
        .sec-head {
          display: flex; align-items: center; gap: 14px; margin-bottom: 24px;
        }
        .sec-head-line { flex: 1; height: 1px; background: var(--rule); }
        .sec-head-label {
          font-family: var(--dm); font-size: 8px; font-weight: 500;
          text-transform: uppercase; letter-spacing: .32em; color: var(--muted);
          white-space: nowrap;
        }
        .sec-head-num {
          font-family: var(--cg); font-size: 11px; color: var(--gold); opacity: .6;
        }

        /* ── FEATURED CARDS — hero format ────────────────────────────────── */
        .feat-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: var(--rule); margin-bottom: 48px;
          border: 1px solid var(--rule);
        }
        @media(max-width:700px) { .feat-grid { grid-template-columns: 1fr; } }

        .feat-card {
          background: var(--void2);
          padding: 36px 32px;
          display: flex; flex-direction: column; gap: 0;
          position: relative; overflow: hidden;
          transition: background .25s;
        }
        .feat-card:hover { background: var(--void3); }
        .feat-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--gold2), var(--gold3), var(--gold2));
          opacity: 0; transition: opacity .25s;
        }
        .feat-card:hover::before { opacity: 1; }
        .feat-num {
          font-family: var(--cg); font-size: 4.5rem; font-weight: 300;
          line-height: 1; color: var(--rule); letter-spacing: -.03em;
          margin-bottom: -8px; position: relative; z-index: 0;
        }
        .feat-logo-row { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
        .feat-logo {
          width: 44px; height: 44px; border: 1px solid var(--rule);
          background: var(--void3); display: flex; align-items: center;
          justify-content: center; overflow: hidden; flex-shrink: 0;
        }
        .feat-badge {
          font-family: var(--dm); font-size: 8px; font-weight: 500;
          text-transform: uppercase; letter-spacing: .2em;
          color: var(--gold); border: 1px solid rgba(200,169,110,.3);
          padding: 3px 10px;
        }
        .feat-name {
          font-family: var(--cg); font-size: clamp(1.5rem,2.5vw,2rem);
          font-weight: 400; color: var(--cream); line-height: 1.1;
          margin-bottom: 12px; letter-spacing: -.01em;
        }
        .feat-desc {
          font-family: var(--dm); font-size: 12.5px; color: var(--muted2);
          font-weight: 300; line-height: 1.75; margin-bottom: 24px; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        .feat-meta {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 16px; border-top: 1px solid var(--rule2);
        }
        .feat-chips {
          display: flex; gap: 12px;
          font-family: var(--dm); font-size: 10px; font-weight: 300;
          color: var(--muted); letter-spacing: .06em;
        }
        .feat-chips span::before { content: ''; }
        .feat-arrow {
          width: 32px; height: 32px; border: 1px solid var(--rule);
          display: flex; align-items: center; justify-content: center;
          transition: background .2s, border-color .2s;
        }
        .feat-card:hover .feat-arrow { background: var(--gold); border-color: var(--gold); }
        .feat-card:hover .feat-arrow svg { color: var(--void); }

        /* ── STARTUP LIST — museum-label cards ───────────────────────────── */
        .startup-list { display: flex; flex-direction: column; gap: 1px; background: var(--rule2); }

        .s-card {
          background: var(--void);
          display: grid;
          grid-template-columns: 72px 1fr auto;
          gap: 0;
          align-items: stretch;
          transition: background .2s;
          border-bottom: 1px solid var(--rule2);
          position: relative;
        }
        .s-card:last-child { border-bottom: none; }
        .s-card:hover { background: var(--void2); }
        .s-card::after {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0; width: 0;
          background: var(--gold); opacity: .6;
          transition: width .2s cubic-bezier(.16,1,.3,1);
        }
        .s-card:hover::after { width: 2px; }

        /* Number column */
        .s-num {
          display: flex; align-items: flex-start; justify-content: center;
          padding: 24px 0 24px 0;
          border-right: 1px solid var(--rule2);
        }
        .s-num-text {
          font-family: var(--cg); font-size: .85rem; font-weight: 300;
          color: var(--muted); letter-spacing: .05em;
        }

        /* Main content column */
        .s-body {
          padding: 22px 24px 22px 24px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .s-header { display: flex; align-items: flex-start; gap: 14px; }
        .s-logo {
          width: 40px; height: 40px; border: 1px solid var(--rule);
          background: var(--void2); display: flex; align-items: center;
          justify-content: center; overflow: hidden; flex-shrink: 0;
        }
        .s-title-col { flex: 1; min-width: 0; }
        .s-name {
          font-family: var(--cg); font-size: 1.15rem; font-weight: 500;
          color: var(--cream); line-height: 1.2; letter-spacing: -.01em;
          transition: color .15s;
        }
        .s-card:hover .s-name { color: var(--gold3); }
        .s-cat {
          font-family: var(--dm); font-size: 8.5px; font-weight: 400;
          text-transform: uppercase; letter-spacing: .16em;
          color: var(--muted); margin-top: 2px;
        }
        .s-verified {
          display: inline-flex; align-items: center; gap: 4px;
          font-family: var(--dm); font-size: 8px; font-weight: 500;
          text-transform: uppercase; letter-spacing: .14em;
          color: #52A36A; margin-top: 2px;
        }
        .s-desc {
          font-family: var(--dm); font-size: 12px; color: var(--muted2);
          font-weight: 300; line-height: 1.7;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .s-founders { font-family: var(--dm); font-size: 11px; color: var(--muted); font-weight: 300; }
        .s-chips {
          display: flex; gap: 8px; flex-wrap: wrap;
          font-family: var(--dm); font-size: 10px; color: var(--muted); font-weight: 300;
        }
        .s-chip {
          border: 1px solid var(--rule2); padding: 2px 10px;
          color: var(--muted2); font-size: 9px; letter-spacing: .06em;
        }

        /* Action column */
        .s-action {
          display: flex; align-items: center; justify-content: center;
          padding: 0 24px; border-left: 1px solid var(--rule2);
          min-width: 64px;
        }
        .s-act-btn {
          width: 36px; height: 36px; border: 1px solid var(--rule);
          display: flex; align-items: center; justify-content: center;
          transition: background .2s, border-color .2s;
          flex-shrink: 0;
        }
        .s-card:hover .s-act-btn {
          background: var(--gold); border-color: var(--gold);
        }
        .s-card:hover .s-act-btn svg { color: var(--void) !important; }

        /* Mobile card — stacked */
        @media(max-width:600px) {
          .s-card { grid-template-columns: 1fr; }
          .s-num { display:none; }
          .s-action { border-left:none; border-top:1px solid var(--rule2); padding:12px 24px; justify-content:flex-end; }
          .startup-list { gap: 0; background: none; }
          .s-card { border: 1px solid var(--rule2); margin-bottom: 8px; }
        }

        /* ── Empty state ─────────────────────────────────────────────────── */
        .empty {
          padding: 80px 40px; text-align: center;
          border: 1px solid var(--rule2);
        }
        .empty-icon {
          font-family: var(--cg); font-size: 3rem; color: var(--muted);
          display: block; margin-bottom: 16px;
        }
        .empty-h { font-family: var(--cg); font-size: 1.6rem; color: var(--cream); margin-bottom: 8px; font-weight: 300; }
        .empty-p { font-family: var(--dm); font-size: 13px; color: var(--muted2); margin-bottom: 24px; font-weight: 300; }
        .empty-btn {
          display: inline-block; border: 1px solid var(--gold);
          padding: 10px 28px; font-family: var(--dm); font-size: 9px;
          font-weight: 500; letter-spacing: .22em; text-transform: uppercase;
          color: var(--gold); transition: background .2s, color .2s;
        }
        .empty-btn:hover { background: var(--gold); color: var(--void); }

        /* ── Pagination ──────────────────────────────────────────────────── */
        .pag {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 40px 0 0; margin-top: 0;
          border-top: 1px solid var(--rule2);
        }
        .pag-btn {
          padding: 8px 20px; border: 1px solid var(--rule);
          font-family: var(--dm); font-size: 8.5px; font-weight: 500;
          letter-spacing: .14em; text-transform: uppercase;
          color: var(--muted2); transition: all .15s;
        }
        .pag-btn:hover { border-color: var(--gold); color: var(--gold); }
        .pag-btn.dis { color: var(--muted); pointer-events: none; opacity: .4; }
        .pag-num {
          width: 36px; height: 36px; display: flex; align-items: center;
          justify-content: center; border: 1px solid var(--rule);
          font-family: var(--dm); font-size: 11px; font-weight: 400;
          color: var(--muted2); transition: all .15s;
        }
        .pag-num:hover { border-color: var(--gold); color: var(--gold); }
        .pag-num.on { background: var(--gold); color: var(--void); border-color: var(--gold); font-weight: 600; }

        /* ── ASIDE ───────────────────────────────────────────────────────── */
        .aside { display: flex; flex-direction: column; gap: 24px; }

        .aside-box {
          border: 1px solid var(--rule);
          padding: 0; overflow: hidden;
          background: var(--void2);
        }
        .aside-head {
          padding: 16px 20px;
          border-bottom: 1px solid var(--rule2);
          display: flex; align-items: center; justify-content: space-between;
        }
        .aside-head-label {
          font-family: var(--dm); font-size: 8px; font-weight: 500;
          text-transform: uppercase; letter-spacing: .28em; color: var(--gold);
        }
        .aside-body { padding: 20px; }

        /* Submit CTA box */
        .aside-cta {
          background: var(--void2);
          border: 1px solid var(--rule);
          position: relative; overflow: hidden;
          padding: 28px 24px;
        }
        .aside-cta::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--gold2), var(--gold3), var(--gold2));
        }
        .aside-cta-eyebrow {
          font-family: var(--dm); font-size: 8px; font-weight: 500;
          text-transform: uppercase; letter-spacing: .28em;
          color: var(--gold); margin-bottom: 10px; display: block;
        }
        .aside-cta-title {
          font-family: var(--cg); font-size: 1.3rem; font-weight: 300;
          color: var(--cream); line-height: 1.25; margin-bottom: 8px;
        }
        .aside-cta-title em { color: var(--gold3); font-style: italic; }
        .aside-cta-p {
          font-family: var(--dm); font-size: 11.5px; color: var(--muted2);
          font-weight: 300; line-height: 1.65; margin-bottom: 20px;
        }
        .aside-cta-btn {
          display: block; text-align: center; border: 1px solid var(--gold);
          padding: 11px; font-family: var(--dm); font-size: 9px;
          font-weight: 500; letter-spacing: .22em; text-transform: uppercase;
          color: var(--gold); transition: background .2s, color .2s;
        }
        .aside-cta-btn:hover { background: var(--gold); color: var(--void); }

        /* Sector list */
        .aside-list li { border-bottom: 1px solid var(--rule2); }
        .aside-list li:last-child { border-bottom: none; }
        .aside-list a {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 20px; font-family: var(--dm); font-size: 12px;
          font-weight: 300; color: var(--muted2); transition: color .15s;
        }
        .aside-list a:hover { color: var(--cream); }
        .aside-list-chevron { font-size: 12px; color: var(--muted); }

        /* Numbers box */
        .aside-nums-row {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 10px 20px; border-bottom: 1px solid var(--rule2);
        }
        .aside-nums-row:last-child { border-bottom: none; }
        .aside-nums-l {
          font-family: var(--dm); font-size: 9px; font-weight: 400;
          text-transform: uppercase; letter-spacing: .14em; color: var(--muted);
        }
        .aside-nums-v {
          font-family: var(--cg); font-size: 1.1rem; font-weight: 400; color: var(--gold3);
        }

        /* ── CTA banner ──────────────────────────────────────────────────── */
        .cta-banner {
          background: var(--void2); border: 1px solid var(--rule);
          padding: clamp(32px,5vw,52px) clamp(24px,4vw,52px);
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: space-between; gap: 24px;
          margin-top: clamp(32px,5vw,56px); position: relative; overflow: hidden;
        }
        .cta-banner::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }
        /* Large decorative text */
        .cta-banner::after {
          content: 'UPFORGE';
          position: absolute; right: -20px; bottom: -24px;
          font-family: var(--cg); font-size: 6rem; font-weight: 300;
          color: var(--rule2); letter-spacing: -.02em; pointer-events: none;
          line-height: 1; white-space: nowrap;
        }
        .cta-banner-ey {
          font-family: var(--dm); font-size: 8px; font-weight: 500;
          text-transform: uppercase; letter-spacing: .3em;
          color: var(--gold); opacity: .7; margin-bottom: 10px; display: block;
        }
        .cta-banner-title {
          font-family: var(--cg); font-size: clamp(1.5rem,3vw,2.4rem);
          font-weight: 300; color: var(--cream); line-height: 1.15; margin-bottom: 8px;
        }
        .cta-banner-title em { font-style: italic; color: var(--gold3); }
        .cta-banner-p {
          font-family: var(--dm); font-size: 12px; color: var(--muted2);
          font-weight: 300; max-width: 420px; line-height: 1.7;
        }
        .cta-banner-btn {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid var(--gold); padding: 14px 32px;
          font-family: var(--dm); font-size: 9px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase; color: var(--gold);
          transition: background .2s, color .2s; flex-shrink: 0; position: relative;
          white-space: nowrap;
        }
        .cta-banner-btn:hover { background: var(--gold); color: var(--void); }

        /* ── Internal links ──────────────────────────────────────────────── */
        .links-grid {
          display: grid; grid-template-columns: repeat(4,1fr); gap: 1px;
          background: var(--rule2); border: 1px solid var(--rule2);
          margin-top: clamp(24px,4vw,40px);
        }
        @media(max-width:800px) { .links-grid { grid-template-columns: repeat(2,1fr); } }
        .link-card {
          background: var(--void); padding: 18px 20px;
          display: flex; flex-direction: column; gap: 5px;
          transition: background .2s;
        }
        .link-card:hover { background: var(--void2); }
        .link-title {
          font-family: var(--dm); font-size: 9.5px; font-weight: 500;
          text-transform: uppercase; letter-spacing: .12em; color: var(--cream2);
          transition: color .15s;
        }
        .link-card:hover .link-title { color: var(--gold3); }
        .link-desc {
          font-family: var(--dm); font-size: 10px; color: var(--muted);
          font-weight: 300;
        }

        /* ── Footer ──────────────────────────────────────────────────────── */
        .pg-footer {
          border-top: 1px solid var(--rule);
          padding: clamp(20px,3vw,32px) clamp(20px,5vw,80px);
          max-width: 1280px; margin: clamp(32px,5vw,56px) auto 0;
        }
        .footer-note {
          font-family: var(--dm); font-size: 10px; color: var(--muted);
          font-weight: 300; line-height: 1.7; margin-bottom: 16px;
        }
        .footer-nav { display: flex; flex-wrap: wrap; gap: 6px 20px; }
        .footer-nav a {
          font-family: var(--dm); font-size: 9px; font-weight: 400;
          text-transform: uppercase; letter-spacing: .14em; color: var(--muted);
          transition: color .15s;
        }
        .footer-nav a:hover { color: var(--gold); }
      `}</style>

      <div className="pg">
        <Navbar />

        {/* ══════════════════════════════
            MASTHEAD
        ══════════════════════════════ */}
        <header className="mast">
          <div className="mast-inner">

            {/* Eyebrow */}
            <div className="mast-eyebrow pg-rise d1">
              <div className="mast-eyebrow-line" />
              <span className="mast-eyebrow-text">India Edition · 2026</span>
              <div className="mast-eyebrow-line" />
            </div>

            {/* Title */}
            <h1 className="mast-title pg-rise d2">
              Startup<br />
              <em>Registry</em>
            </h1>

            {/* Sub */}
            <p className="mast-sub pg-rise d3">
              India's independent registry of verified builders —
              free, structured, permanent. Every profile curated
              by the UpForge editorial team.
            </p>

            {/* Live badge */}
            <div className="live-badge pg-rise d3">
              <span className="live-dot" />
              Live · {total.toLocaleString()} Profiles · All Verified
            </div>

            {/* Stats */}
            <div className="mast-stats pg-rise d4">
              {[
                { v:`${total.toLocaleString()}+`, l:"Verified Profiles" },
                { v:`${cats.length || "30"}+`,    l:"Sectors"           },
                { v:`${years.length > 0 ? years[years.length-1] : "2010"}+`, l:"Since" },
                { v:"Daily",                       l:"Updated"           },
              ].map((s, i) => (
                <div key={i} className="mast-stat">
                  <div className="mast-stat-v">{s.v}</div>
                  <div className="mast-stat-l">{s.l}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Category strip */}
          <nav className="cat-strip pg-rise d5" aria-label="Browse by sector"
            style={{ maxWidth:"none", paddingLeft:"clamp(20px,5vw,80px)" }}>
            <Link href="/startup" className={`cat-tab${!cat && !q ? " on" : ""}`}>All</Link>
            {cats.slice(0, 9).map(c => (
              <Link key={c}
                href={`/startup?category=${encodeURIComponent(c)}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
                className={`cat-tab${cat === c ? " on" : ""}`}
              >{c}</Link>
            ))}
            {cats.length > 9 && (
              <Link href="/startups" className="cat-tab">All Sectors →</Link>
            )}
          </nav>
        </header>

        {/* ══════════════════════════════
            SEARCH TOOLBAR — sticky
        ══════════════════════════════ */}
        <div className="toolbar" id="rg-toolbar">
          <div className="toolbar-inner">
            <form action="/startup" method="GET" className="search-row" id="rg-search-form">
              {year && <input type="hidden" name="year" value={year} />}
              {cat  && <input type="hidden" name="category" value={cat} />}
              {sort && sort !== "name" && <input type="hidden" name="sort" value={sort} />}
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input
                type="search" name="q" defaultValue={q}
                className="search-inp"
                placeholder="Search startups, founders, sectors, cities…"
                aria-label="Search startup registry"
                autoComplete="off"
              />
              <button type="submit" className="search-btn">Search →</button>
            </form>
            <div className="filter-row" id="rg-filter-row">
              <span className="filter-lbl">Filter</span>
              <select className="filter-sel" aria-label="Filter by year" defaultValue={year} id="rg-year-sel" name="year">
                <option value="">Any Year</option>
                {years.map(yr => <option key={yr} value={String(yr)}>{yr}</option>)}
              </select>
              <select className="filter-sel" aria-label="Filter by sector" defaultValue={cat} id="rg-cat-sel" name="category">
                <option value="">All Sectors</option>
                {cats.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <Link href={qs({ sort:"name",   page:undefined })} className={`filter-link${sort==="name"   ? " on":""}`}>A–Z</Link>
              <Link href={qs({ sort:"newest", page:undefined })} className={`filter-link${sort==="newest" ? " on":""}`}>Newest</Link>
              <Link href={qs({ sort:"year",   page:undefined })} className={`filter-link${sort==="year"   ? " on":""}`}>Founded</Link>
              {isFiltered && <Link href="/startup" className="filter-clear">✕ Clear</Link>}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            RESULTS META BAR
        ══════════════════════════════ */}
        <div className="results-bar pg-fade d2" aria-live="polite">
          <span className="results-q">
            {q ? `"${q}"` : cat ? cat : year ? `Est. ${year}` : "All Startups"}
          </span>
          <span className="results-n">— {total.toLocaleString()} profiles found</span>
          <span className="results-rule" />
          <span className="results-pg">Page {page} of {totalPages || 1}</span>
        </div>

        {/* ══════════════════════════════
            MAIN CONTENT
        ══════════════════════════════ */}
        <div className="main-wrap">
          <div className="main-grid">

            {/* ── LEFT COLUMN ── */}
            <div>

              {/* FEATURED (hero format, 2 cards) */}
              {featured.length > 0 && (
                <section aria-label="Featured startups" style={{ marginBottom: 48 }}>
                  <div className="sec-head pg-rise d2">
                    <span className="sec-head-label">✦ Featured · This Edition</span>
                    <div className="sec-head-line" />
                    <span className="sec-head-num">{featured.length} profiles</span>
                  </div>
                  <div className="feat-grid">
                    {featured.map((s, fi) => (
                      <Link key={s.id} href={`/startup/${s.slug}`} className="feat-card pg-rise" style={{ animationDelay: `${fi * 0.08}s` }}>
                        <div className="feat-num">{String(fi + 1).padStart(2,"0")}</div>
                        <div className="feat-logo-row">
                          <div className="feat-logo">
                            {s.logo_url
                              ? <Image src={s.logo_url} alt={s.name} width={44} height={44} className="object-contain" />
                              : <span style={{ fontFamily:"var(--cg)", fontSize:18, color:"var(--muted)" }}>{s.name.charAt(0)}</span>
                            }
                          </div>
                          <span className="feat-badge">{s.category ?? "Startup"}</span>
                        </div>
                        <h2 className="feat-name">{s.name}</h2>
                        <p className="feat-desc">{s.description ?? "Building for India's next decade."}</p>
                        <div className="feat-meta">
                          <div className="feat-chips">
                            {s.founded_year && <span>Est. {s.founded_year}</span>}
                            {s.city && <span>{s.city}</span>}
                          </div>
                          <div className="feat-arrow">
                            <ArrowUpRight style={{ width:14, height:14, color:"var(--gold)" }} aria-hidden="true" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* ALL STARTUPS — museum-label list */}
              {grid.length > 0 ? (
                <section aria-label="All startups">
                  {featured.length > 0 && (
                    <div className="sec-head pg-rise d3">
                      <span className="sec-head-label">All Startups</span>
                      <div className="sec-head-line" />
                      <span className="sec-head-num">{total.toLocaleString()} total</span>
                    </div>
                  )}
                  <div className="startup-list">
                    {grid.map((s, idx) => (
                      <Link key={s.id} href={`/startup/${s.slug}`} className="s-card pg-rise"
                        style={{ animationDelay: `${Math.min(idx * 0.04, 0.3)}s` }}>

                        {/* Number */}
                        <div className="s-num">
                          <span className="s-num-text">
                            {String(baseIndex + (featured.length > 0 ? 0 : 0) + idx + 1).padStart(2,"0")}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="s-body">
                          <div className="s-header">
                            <div className="s-logo">
                              {s.logo_url
                                ? <Image src={s.logo_url} alt={s.name} width={40} height={40} className="object-contain" loading="lazy" />
                                : <span style={{ fontFamily:"var(--cg)", fontSize:14, color:"var(--muted)", fontWeight:300 }}>{s.name.charAt(0)}</span>
                              }
                            </div>
                            <div className="s-title-col">
                              <div className="s-name">{s.name}</div>
                              <div className="s-cat">{s.category ?? ""}</div>
                              <div className="s-verified">
                                <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                                  <path d="M1 3.5L3 5.5L7 1.5" stroke="#52A36A" strokeWidth="1.4" strokeLinecap="round"/>
                                </svg>
                                Verified
                              </div>
                            </div>
                          </div>

                          {s.description && (
                            <p className="s-desc">{s.description}</p>
                          )}

                          {s.founders && (
                            <p className="s-founders">↳ {s.founders}</p>
                          )}

                          <div className="s-chips">
                            {s.founded_year && <span className="s-chip">Est. {s.founded_year}</span>}
                            {s.city && <span className="s-chip">{s.city}</span>}
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="s-action">
                          <div className="s-act-btn">
                            <ArrowUpRight style={{ width:13, height:13, color:"var(--muted)" }} aria-hidden="true" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : (
                <div className="empty">
                  <span className="empty-icon">∅</span>
                  <h3 className="empty-h">Nothing found</h3>
                  <p className="empty-p">
                    {q
                      ? `No results for "${q}". Try a different search term.`
                      : "Adjust your filters to see results."
                    }
                  </p>
                  <Link href="/startup" className="empty-btn">Clear all filters</Link>
                </div>
              )}

              {/* PAGINATION */}
              {totalPages > 1 && (
                <nav className="pag" aria-label="Registry pagination">
                  <Link href={pgHref(page - 1)} className={`pag-btn${page === 1 ? " dis" : ""}`} aria-disabled={page === 1}>← Prev</Link>
                  {pgNums.map(p => (
                    <Link key={p} href={pgHref(p)} className={`pag-num${p === page ? " on" : ""}`} aria-current={p === page ? "page" : undefined}>{p}</Link>
                  ))}
                  <Link href={pgHref(page + 1)} className={`pag-btn${page === totalPages ? " dis" : ""}`} aria-disabled={page === totalPages}>Next →</Link>
                </nav>
              )}
            </div>

            {/* ── ASIDE ── */}
            <aside className="aside pg-rise d4">

              {/* Submit CTA */}
              <div className="aside-cta">
                <span className="aside-cta-eyebrow">List Free · UpForge</span>
                <div className="aside-cta-title">Got a startup<br /><em>to list?</em></div>
                <p className="aside-cta-p">
                  Get independently verified and permanently indexed on India's most trusted startup registry. Free forever.
                </p>
                <Link href="/submit" className="aside-cta-btn">Submit Startup →</Link>
              </div>

              {/* Sector directory */}
              {cats.length > 0 && (
                <div className="aside-box">
                  <div className="aside-head">
                    <span className="aside-head-label">Browse by Sector</span>
                  </div>
                  <ul className="aside-list">
                    {cats.slice(0, 10).map(c => (
                      <li key={c}>
                        <Link href={`/startups/${c.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")}`}>
                          <span>{c}</span>
                          <span className="aside-list-chevron">›</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {cats.length > 10 && (
                    <div style={{ padding:"12px 20px", borderTop:"1px solid var(--rule2)" }}>
                      <Link href="/startups" style={{ fontFamily:"var(--dm)", fontSize:9, fontWeight:500, textTransform:"uppercase", letterSpacing:".18em", color:"var(--gold)", opacity:.7 }}>
                        All {cats.length} sectors →
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* By the numbers */}
              <div className="aside-box">
                <div className="aside-head">
                  <span className="aside-head-label">By the Numbers</span>
                </div>
                <div>
                  {[
                    { v:`${total.toLocaleString()}+`, l:"Verified on UpForge" },
                    { v:"125+",    l:"Indian Unicorns"   },
                    { v:"$3.4B",   l:"Q1 2026 Funding"   },
                    { v:"3rd",     l:"Largest Ecosystem"  },
                  ].map((s, i) => (
                    <div key={i} className="aside-nums-row">
                      <span className="aside-nums-l">{s.l}</span>
                      <span className="aside-nums-v">{s.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blog links */}
              <div className="aside-box">
                <div className="aside-head">
                  <span className="aside-head-label">From The Forge</span>
                </div>
                <ul className="aside-list">
                  {[
                    { l:"Top AI Startups India 2026",     h:"/blog/top-ai-startups-india-2026"          },
                    { l:"How to Get Startup Funding",     h:"/blog/how-to-get-startup-funding-india-2026" },
                    { l:"Top Indian Unicorns 2026",       h:"/blog/top-indian-unicorns-2026"             },
                    { l:"How to Start a Startup India",   h:"/blog/how-to-start-startup-india-2026"      },
                    { l:"The Forge — Blog",               h:"/blog"                                      },
                  ].map(lnk => (
                    <li key={lnk.h}>
                      <Link href={lnk.h}>
                        <span>{lnk.l}</span>
                        <span className="aside-list-chevron">›</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* ── CTA BANNER ── */}
          <div className="cta-banner pg-rise d5">
            <div>
              <span className="cta-banner-ey">UpForge Intelligence</span>
              <div className="cta-banner-title">
                Your founder story starts<br />
                <em>with a verified profile.</em>
              </div>
              <p className="cta-banner-p">
                Free forever. Trusted by investors, journalists, and
                builders across India's startup ecosystem.
              </p>
            </div>
            <Link href="/submit" className="cta-banner-btn">
              List Free
              <ArrowUpRight style={{ width:13, height:13 }} aria-hidden="true" />
            </Link>
          </div>

          {/* ── INTERNAL LINKS ── */}
          <section style={{ marginTop:"clamp(24px,4vw,40px)" }} aria-label="Explore on UpForge">
            <div className="sec-head pg-rise d5">
              <span className="sec-head-label">Explore on UpForge</span>
              <div className="sec-head-line" />
            </div>
            <div className="links-grid">
              {[
                { l:"Startup Registry India",       h:"/startup",                                               desc:"Full verified database"     },
                { l:"Browse All Sectors",           h:"/startups",                                              desc:"30+ sector directories"     },
                { l:"Top AI Startups 2026",         h:"/blog/top-ai-startups-india-2026",                       desc:"Sarvam, Krutrim & more"     },
                { l:"Funding Guide 2026",           h:"/blog/how-to-get-startup-funding-india-2026",            desc:"DPIIT, SISFS & VCs"         },
                { l:"Indian Unicorns 2026",         h:"/blog/top-indian-unicorns-2026",                         desc:"All 125+ profiled"          },
                { l:"AI Startups India",            h:"/startups/ai-ml",                                        desc:"India's AI builders"        },
                { l:"FinTech Startups",             h:"/startups/fintech",                                      desc:"Zerodha, CRED & more"       },
                { l:"Submit Your Startup",          h:"/submit",                                                desc:"Get listed free"            },
              ].map(lnk => (
                <Link key={lnk.h + lnk.l} href={lnk.h} className="link-card">
                  <span className="link-title">{lnk.l}</span>
                  <span className="link-desc">{lnk.desc}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="pg-footer pg-rise d6">
            <p className="footer-note">
              * Registry data sourced from DPIIT, Tracxn, Inc42, Forbes India, Hurun India 2025, and company
              announcements as of March 2026. UpForge is an independent registry — no paid placements, no sponsored rankings.
            </p>
            <nav className="footer-nav" aria-label="Footer navigation">
              {[
                { l:"The Founder Chronicle", h:"/"         },
                { l:"Startup Registry",      h:"/startup"  },
                { l:"Browse by Sector",      h:"/startups" },
                { l:"Indian Unicorns 2026",  h:"/blog/top-indian-unicorns-2026" },
                { l:"The Forge — Blog",      h:"/blog"     },
                { l:"Free Valuation Tool",   h:"/report"   },
                { l:"Submit Startup",        h:"/submit"   },
              ].map(lnk => (
                <Link key={lnk.h + lnk.l} href={lnk.h}>{lnk.l}</Link>
              ))}
            </nav>
          </footer>
        </div>
      </div>

      {/*
        ── FILTER AUTO-SUBMIT JS ─────────────────────────────────────────────
        Identical logic to v6. Year + category selects auto-navigate on change.
        Preserves all existing URL params.
      */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          function getParams(){
            var p = new URLSearchParams(window.location.search);
            return {
              q:    p.get('q')        || '',
              sort: p.get('sort')     || 'name',
              year: p.get('year')     || '',
              cat:  p.get('category') || '',
            };
          }
          function buildUrl(ov){
            var cur = getParams();
            var m = Object.assign({}, cur, ov);
            var p = new URLSearchParams();
            if(m.q)                     p.set('q', m.q);
            if(m.year)                  p.set('year', m.year);
            if(m.cat)                   p.set('category', m.cat);
            if(m.sort && m.sort !== 'name') p.set('sort', m.sort);
            var s = p.toString();
            return '/startup' + (s ? '?' + s : '');
          }
          var yearSel = document.getElementById('rg-year-sel');
          if(yearSel) yearSel.addEventListener('change', function(){ window.location.href = buildUrl({year: this.value}); });
          var catSel = document.getElementById('rg-cat-sel');
          if(catSel)  catSel.addEventListener('change', function(){ window.location.href = buildUrl({cat:  this.value}); });
        })();
      `}} />
    </>
  )
}
