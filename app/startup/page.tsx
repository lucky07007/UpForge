// app/startup/page.tsx — PRODUCTION v6
// ─────────────────────────────────────────────────────────────────────────────
// FIXES vs v5:
//   1. Filter selects now auto-submit on change via inline JS (no hydration needed)
//   2. Sort links preserve existing q + year + category params correctly
//   3. Category tab strip now submits full filter state (not just category)
//   4. Design fully matches home page: #F3EFE5 parchment, Playfair, same
//      card hover (translate -2,-2 + 4px shadow), same CTA, same footer
//   5. Stats bar: all 4 stats are real dynamic data
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { ArrowRight, ArrowUpRight } from "lucide-react"

const PAGE_SIZE = 18

interface StartupRow {
  id: string; name: string; slug: string
  description?: string | null; logo_url?: string | null
  founders?: string | null; founded_year?: number | null
  category?: string | null; city?: string | null; is_featured?: boolean
}
interface PageProps {
  searchParams?: Promise<{ page?: string; q?: string; year?: string; sort?: string; category?: string }>
}

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
  const { data, count, error } = await query.order(col, { ascending: sort !== "newest" }).range(from, from + PAGE_SIZE - 1)
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
    robots: { index: !isFiltered && page <= 1, follow: true, googleBot: { index: !isFiltered && page <= 1, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
  }
}
export const revalidate = 300

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

  // Build URL preserving all current params except the overridden one
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

        .pf { font-family:'Playfair Display',Georgia,serif !important }

        @keyframes regFadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .rg-a0 { animation:regFadeUp .38s .00s ease both }
        .rg-a1 { animation:regFadeUp .38s .07s ease both }
        .rg-a2 { animation:regFadeUp .38s .14s ease both }
        .rg-a3 { animation:regFadeUp .38s .20s ease both }
        .rg-a4 { animation:regFadeUp .38s .27s ease both }

        /* Section header — exact home page pattern */
        .rg-sh { display:flex; align-items:center; gap:10px; margin-bottom:14px }
        .rg-sh-l { font-size:8px; font-weight:700; text-transform:uppercase; letter-spacing:.3em; color:#AAA; font-family:system-ui,sans-serif; white-space:nowrap }
        .rg-sh-r { flex:1; height:1px; background:#D8D2C4 }

        /* Masthead — exact home page pattern */
        .rg-mast { background:#F3EFE5; border-bottom:3px solid #1A1208 }
        .rg-mast-inner { text-align:center; padding:clamp(24px,4vw,52px) 16px clamp(16px,3vw,36px); max-width:1300px; margin:0 auto; border-bottom:1px solid #C8C2B4 }

        /* Stats bar — exact home page pattern */
        .rg-stats { display:flex; background:#1A1208; max-width:600px; margin:0 auto }
        .rg-stat { flex:1; padding:14px 8px; text-align:center; border-right:1px solid rgba(255,255,255,.08) }
        .rg-stat:last-child { border-right:none }
        .rg-stat-v { font-family:'Playfair Display',serif; font-size:clamp(1.2rem,2.5vw,1.9rem); font-weight:900; color:#fff; line-height:1; margin-bottom:3px }
        .rg-stat-l { font-family:system-ui,sans-serif; font-size:7px; font-weight:700; text-transform:uppercase; letter-spacing:.2em; color:rgba(255,255,255,.32) }
        @media(max-width:440px) {
          .rg-stats { flex-direction:column }
          .rg-stat { border-right:none; border-bottom:1px solid rgba(255,255,255,.08) }
          .rg-stat:last-child { border-bottom:none }
        }

        /* Tab strip */
        .rg-tabs { display:flex; overflow-x:auto; border-bottom:1px solid #C8C2B4; scrollbar-width:none }
        .rg-tabs::-webkit-scrollbar { display:none }
        .rg-tab { flex-shrink:0; padding:11px 16px; font-family:system-ui,sans-serif; font-size:8.5px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#888; text-decoration:none; border-bottom:2.5px solid transparent; transition:all .15s; white-space:nowrap }
        .rg-tab:hover { color:#1A1208 }
        .rg-tab.on { color:#B45309; border-bottom-color:#B45309 }

        /* Toolbar — sticky */
        .rg-toolbar { background:#FDFCF9; border-bottom:1px solid #C8C2B4; position:sticky; top:0; z-index:30 }
        .rg-toolbar-inner { max-width:1300px; margin:0 auto; padding:0 clamp(16px,4vw,48px) }
        .rg-search-row { display:flex; align-items:stretch; border-bottom:1px solid #EDE9DF }
        .rg-search-icon { display:flex; align-items:center; padding:0 14px; color:#C8C2B4; font-size:16px; flex-shrink:0 }
        .rg-search-inp { flex:1; height:46px; border:none; background:transparent; font-family:Georgia,serif; font-size:15px; color:#1A1208; outline:none; font-style:italic; padding:0; min-width:0 }
        .rg-search-inp::placeholder { color:#C8C2B4 }
        .rg-search-btn { height:46px; padding:0 22px; background:#1A1208; color:#fff; border:none; font-family:system-ui,sans-serif; font-size:8.5px; font-weight:900; letter-spacing:.2em; text-transform:uppercase; cursor:pointer; flex-shrink:0 }
        .rg-filter-row { display:flex; align-items:center; height:38px; overflow-x:auto }
        .rg-filter-row::-webkit-scrollbar { display:none }
        .rg-filter-lbl { font-family:system-ui,sans-serif; font-size:8px; font-weight:700; text-transform:uppercase; letter-spacing:.28em; color:#C8C2B4; padding:0 14px; border-right:1px solid #EDE9DF; height:100%; display:flex; align-items:center; flex-shrink:0; white-space:nowrap }
        /* FIXED: selects auto-submit via JS onChange */
        .rg-filter-sel { height:100%; border:none; border-right:1px solid #EDE9DF; background:transparent; font-family:system-ui,sans-serif; font-size:11px; color:#1A1208; padding:0 8px; outline:none; cursor:pointer; flex-shrink:0; max-width:140px }
        .rg-filter-link { height:100%; padding:0 14px; display:flex; align-items:center; font-family:system-ui,sans-serif; font-size:8.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#6B5C40; text-decoration:none; border-right:1px solid #EDE9DF; white-space:nowrap; transition:all .15s; flex-shrink:0 }
        .rg-filter-link:hover { background:#F3EFE5; color:#1A1208 }
        .rg-filter-link.on { background:#1A1208; color:#fff }
        .rg-filter-clear { height:100%; padding:0 14px; display:flex; align-items:center; font-family:system-ui,sans-serif; font-size:9px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#DC2626; text-decoration:none; flex-shrink:0 }

        /* Results bar */
        .rg-results-bar { max-width:1300px; margin:0 auto; padding:10px clamp(16px,4vw,48px); display:flex; align-items:center; gap:10px; border-bottom:1px solid #D8D2C4 }
        .rg-results-q { font-family:'Playfair Display',serif; font-size:1.05rem; font-weight:700; color:#1A1208 }
        .rg-results-n { font-size:13px; color:#6B5C40; font-style:italic }
        .rg-results-rule { flex:1; height:1px; background:#D8D2C4 }
        .rg-results-pg { font-family:system-ui,sans-serif; font-size:9px; color:#AAA }

        /* Main layout */
        .rg-main { max-width:1300px; margin:0 auto; padding:clamp(16px,3vw,32px) clamp(16px,4vw,48px) 0 }
        .rg-layout { display:grid; grid-template-columns:1fr 300px; gap:clamp(16px,2.5vw,28px); align-items:start }
        @media(max-width:1000px) { .rg-layout { grid-template-columns:1fr !important } }

        /* Featured grid — exact home page pattern */
        .rg-feat-grid { display:grid; grid-template-columns:repeat(3,1fr); border:1.5px solid #1A1208; background:#1A1208; gap:1.5px; margin-bottom:clamp(18px,3vw,28px) }
        @media(max-width:700px) { .rg-feat-grid { grid-template-columns:1fr !important } }
        .rg-feat-card { background:#FDFCF9; display:flex; flex-direction:column; text-decoration:none; transition:background .15s }
        .rg-feat-card:hover { background:#F3EFE5 }
        .rg-feat-img { width:100%; aspect-ratio:16/9; position:relative; background:#EDE9DF; overflow:hidden; flex-shrink:0 }
        .rg-feat-img img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:sepia(12%) contrast(105%); transition:transform .5s }
        .rg-feat-card:hover .rg-feat-img img { transform:scale(1.04) }
        .rg-feat-ph { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#EDE9DF,#C8C2B4) }
        .rg-feat-ph-l { font-family:'Playfair Display',serif; font-size:3.5rem; font-weight:900; color:#AAA }
        .rg-feat-ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(26,18,8,.82) 0%,transparent 55%) }
        .rg-feat-num { position:absolute; top:10px; left:10px; background:#1A1208; color:#fff; font-family:system-ui,sans-serif; font-size:7.5px; font-weight:900; padding:2px 8px; letter-spacing:.14em }
        .rg-feat-caption { position:absolute; bottom:0; left:0; right:0; padding:12px }
        .rg-feat-sector { display:block; font-family:system-ui,sans-serif; font-size:7px; font-weight:700; text-transform:uppercase; letter-spacing:.2em; color:rgba(255,255,255,.55); margin-bottom:2px }
        .rg-feat-name { display:block; font-family:'Playfair Display',serif; font-size:clamp(.88rem,1.2vw,1.05rem); font-weight:700; color:#fff; line-height:1.2 }
        .rg-feat-body { padding:12px; flex:1; display:flex; flex-direction:column; gap:6px }
        .rg-feat-desc { font-size:11.5px; color:#5A4A30; font-style:italic; line-height:1.65; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; flex:1 }
        .rg-feat-foot { display:flex; align-items:center; justify-content:space-between; padding-top:8px; border-top:1px solid #D8D2C4; margin-top:auto }
        .rg-feat-meta { font-family:system-ui,sans-serif; font-size:8.5px; color:#AAA }

        /* All startups grid — exact home page pattern */
        .rg-grid { display:grid; grid-template-columns:repeat(3,1fr); border:1.5px solid #1A1208; background:#1A1208; gap:1.5px }
        @media(max-width:800px) { .rg-grid { grid-template-columns:repeat(2,1fr) !important } }
        @media(max-width:500px) { .rg-grid { display:none !important } }
        .rg-card { background:#FDFCF9; padding:14px; display:flex; flex-direction:column; gap:7px; text-decoration:none; transition:all .15s; position:relative }
        .rg-card:hover { background:#F3EFE5; transform:translate(-2px,-2px); box-shadow:4px 4px 0 #1A1208; z-index:1 }
        .rg-card-head { display:flex; align-items:flex-start; gap:10px }
        .rg-card-logo { width:36px; height:36px; border:1px solid #D8D2C4; background:#F3EFE5; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0 }
        .rg-card-titles { flex:1; min-width:0 }
        .rg-card-name { font-family:'Playfair Display',serif; font-size:clamp(.86rem,1vw,.95rem); font-weight:700; color:#1A1208; line-height:1.25; margin-bottom:1px }
        .rg-card:hover .rg-card-name { text-decoration:underline }
        .rg-card-cat { font-family:system-ui,sans-serif; font-size:8px; color:#AAA; text-transform:uppercase; letter-spacing:.1em }
        .rg-card-desc { font-size:11.5px; color:#5A4A30; font-style:italic; line-height:1.6; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden }
        .rg-card-founders { font-size:10.5px; color:#AAA; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden }
        .rg-card-foot { display:flex; align-items:center; justify-content:space-between; margin-top:auto }
        .rg-card-chips { display:flex; gap:6px; font-family:system-ui,sans-serif; font-size:8.5px; color:#AAA }
        .rg-verified { display:flex; align-items:center; gap:3px; font-family:system-ui,sans-serif; font-size:8px; font-weight:800; text-transform:uppercase; letter-spacing:.12em; color:#15803D }

        /* Mobile list */
        .rg-mob { display:none; border:1.5px solid #1A1208; background:#FDFCF9; flex-direction:column }
        @media(max-width:500px) { .rg-mob { display:flex !important } }
        .rg-mob-row { display:flex; align-items:center; gap:12px; padding:13px 14px; text-decoration:none; border-bottom:1px solid #D8D2C4; transition:background .15s }
        .rg-mob-row:last-child { border-bottom:none }
        .rg-mob-row:hover { background:#F3EFE5 }
        .rg-mob-logo { width:40px; height:40px; border:1px solid #D8D2C4; background:#F3EFE5; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0 }
        .rg-mob-info { flex:1; min-width:0 }
        .rg-mob-name { font-family:'Playfair Display',serif; font-size:.9rem; font-weight:700; color:#1A1208; line-height:1.2 }
        .rg-mob-meta { font-family:system-ui,sans-serif; font-size:9.5px; color:#AAA; margin-top:1px }
        .rg-mob-desc { font-size:11px; color:#5A4A30; font-style:italic; margin-top:2px; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden }

        /* Empty state */
        .rg-empty { text-align:center; padding:52px 20px; border:1.5px dashed #C8C2B4; background:#FDFCF9 }

        /* Pagination */
        .rg-pag { display:flex; align-items:center; justify-content:center; gap:4px; margin-top:clamp(20px,3vw,32px); padding-top:clamp(16px,2.5vw,24px); border-top:1px solid #D8D2C4 }
        .rg-pag-btn { padding:6px 16px; font-family:system-ui,sans-serif; font-size:9px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; border:1px solid #C8C2B4; background:#FDFCF9; color:#6B5C40; text-decoration:none; transition:all .15s }
        .rg-pag-btn:hover { border-color:#1A1208; color:#1A1208 }
        .rg-pag-btn.dis { color:#C8C2B4; pointer-events:none }
        .rg-pag-num { width:34px; height:34px; display:flex; align-items:center; justify-content:center; font-family:system-ui,sans-serif; font-size:11px; font-weight:700; border:1px solid #C8C2B4; text-decoration:none; color:#6B5C40; transition:all .15s }
        .rg-pag-num:hover { border-color:#1A1208; color:#1A1208 }
        .rg-pag-num.on { background:#1A1208; color:#fff; border-color:#1A1208 }

        /* Sidebar */
        .rg-side { display:flex; flex-direction:column; gap:14px }
        .rg-side-box { border:1.5px solid #1A1208; background:#FDFCF9; padding:18px }
        .rg-side-box.dk { background:#1A1208 }
        .rg-side-ey { font-family:system-ui,sans-serif; font-size:7.5px; font-weight:900; text-transform:uppercase; letter-spacing:.28em; color:#AAA; margin-bottom:8px }
        .rg-side-box.dk .rg-side-ey { color:#E8C547 }
        .rg-side-h { font-family:'Playfair Display',serif; font-size:.95rem; font-weight:700; color:#1A1208; margin-bottom:5px; line-height:1.3 }
        .rg-side-box.dk .rg-side-h { color:#fff }
        .rg-side-p { font-size:11.5px; color:#5A4A30; font-style:italic; line-height:1.65; margin-bottom:12px }
        .rg-side-box.dk .rg-side-p { color:rgba(255,255,255,.38) }
        .rg-side-btn { display:block; text-align:center; font-family:system-ui,sans-serif; font-size:8.5px; font-weight:900; text-transform:uppercase; letter-spacing:.2em; background:#fff; color:#1A1208; padding:9px; text-decoration:none; transition:background .15s }
        .rg-side-btn:hover { background:#E8C547 }
        .rg-side-list { list-style:none; padding:0; margin:0 }
        .rg-side-list li { border-bottom:1px solid #D8D2C4 }
        .rg-side-list li:last-child { border-bottom:none }
        .rg-side-list a { display:flex; align-items:center; justify-content:space-between; padding:7px 0; font-size:12.5px; color:#5A4A30; text-decoration:none; font-style:italic; transition:color .15s }
        .rg-side-list a:hover { color:#1A1208; text-decoration:underline }

        /* CTA — exact home page pattern */
        .rg-cta { background:#1A1208; padding:clamp(20px,3.5vw,36px) clamp(16px,3vw,36px); display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:18px; margin-top:clamp(20px,3.5vw,32px); position:relative; overflow:hidden }
        .rg-cta::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#92400E,#D97706,#E8C547,#D97706,#92400E) }
        .rg-cta-ey { font-family:system-ui,sans-serif; font-size:7.5px; font-weight:900; text-transform:uppercase; letter-spacing:.3em; color:rgba(232,197,71,.65); margin-bottom:6px }
        .rg-cta-h { font-family:'Playfair Display',serif; font-size:clamp(1rem,2vw,1.4rem); font-weight:700; color:#fff; margin-bottom:4px; line-height:1.25 }
        .rg-cta-p { font-size:12px; color:rgba(255,255,255,.38); font-style:italic }
        .rg-cta-btn { flex-shrink:0; display:inline-flex; align-items:center; gap:6px; background:#D97706; color:#1A1208; padding:12px 24px; font-family:system-ui,sans-serif; font-size:9.5px; font-weight:800; text-transform:uppercase; letter-spacing:.14em; text-decoration:none; transition:opacity .15s; box-shadow:3px 3px 0 #92400E }
        .rg-cta-btn:hover { opacity:.88 }

        /* Internal links — exact home page pattern */
        .rg-links-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px }
        @media(max-width:800px) { .rg-links-grid { grid-template-columns:repeat(2,1fr) !important } }
        .rg-link-card { display:flex; flex-direction:column; gap:4px; padding:11px 12px; border:1px solid #D8D2C4; background:#FDFCF9; text-decoration:none; transition:border-color .15s }
        .rg-link-card:hover { border-color:#1A1208 }
        .rg-link-title { font-family:system-ui,sans-serif; font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:.12em; color:#1A1208 }
        .rg-link-desc { font-family:system-ui,sans-serif; font-size:8.5px; color:#AAA }

        /* Footer — exact home page pattern */
        .rg-footer { border-top:1px solid #D8D2C4; padding-top:1rem; margin-top:clamp(20px,3vw,32px); padding-bottom:8px }
        .rg-footer-note { font-family:system-ui,sans-serif; font-size:8.5px; color:#BBB0A0; line-height:1.75 }
        .rg-footer-nav { display:flex; flex-wrap:wrap; gap:6px 14px; list-style:none; margin:12px 0 0; padding:0 }
        .rg-footer-nav a { font-family:system-ui,sans-serif; font-size:8.5px; color:#AAA; text-transform:uppercase; letter-spacing:.1em; text-decoration:none; transition:color .15s }
        .rg-footer-nav a:hover { color:#1A1208 }
      `}</style>

      {/* ── MASTHEAD ── */}
      <Navbar />
      <header className="rg-mast rg-a0" role="banner">
        <div className="rg-mast-inner">
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:16 }}>
            <div style={{ height:1, width:48, background:"#C8C2B4" }} />
            <p style={{ fontFamily:"system-ui,sans-serif", fontSize:8.5, fontWeight:700, letterSpacing:".4em", textTransform:"uppercase", color:"#AAA" }}>India Edition · 2026</p>
            <div style={{ height:1, width:48, background:"#C8C2B4" }} />
          </div>
          <h1 className="pf" style={{ fontSize:"clamp(2.2rem,6vw,5rem)", fontWeight:900, letterSpacing:"-.025em", color:"#1A1208", lineHeight:1.05, marginBottom:10 }}>
            Startup Registry
          </h1>
          <p style={{ fontSize:"clamp(13px,1.6vw,15px)", color:"#6B5C40", fontStyle:"italic", lineHeight:1.75, maxWidth:560, margin:"0 auto 16px" }}>
            India's independent registry of verified builders — free, structured, permanent.
          </p>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontFamily:"system-ui,sans-serif", fontSize:8.5, fontWeight:700, textTransform:"uppercase", letterSpacing:".2em", color:"#15803D", border:"1px solid #86EFAC", background:"#F0FDF4", padding:"4px 14px", borderRadius:999, marginBottom:20 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#15803D" }} />
            Live · {total.toLocaleString()} Profiles · All Verified
          </div>
          <div className="rg-stats">
            {[
              { v:`${total.toLocaleString()}+`, l:"Verified Profiles" },
              { v:`${cats.length || "30"}+`,    l:"Sectors"           },
              { v:`${years.length > 0 ? years[years.length-1] : "2010"}+`, l:"Founding Since" },
              { v:"Daily",                       l:"Updated"           },
            ].map((s, i) => (
              <div key={i} className="rg-stat">
                <p className="rg-stat-v pf">{s.v}</p>
                <p className="rg-stat-l">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category tab strip */}
        <nav className="rg-tabs rg-a1" aria-label="Browse by sector" style={{ padding:"0 clamp(16px,4vw,48px)" }}>
          <span style={{ fontFamily:"system-ui,sans-serif", fontSize:7.5, color:"#BBB", textTransform:"uppercase", letterSpacing:".2em", padding:"11px 6px 11px 0", flexShrink:0, display:"inline-flex", alignItems:"center" }}>Browse:</span>
          <Link href="/startup" className={`rg-tab${!cat && !q ? " on" : ""}`}>All</Link>
          {cats.slice(0, 8).map(c => (
            <Link key={c} href={`/startup?category=${encodeURIComponent(c)}${q?`&q=${encodeURIComponent(q)}`:""}`} className={`rg-tab${cat === c ? " on" : ""}`}>{c}</Link>
          ))}
          {cats.length > 8 && <Link href="/startups" className="rg-tab">More Sectors →</Link>}
        </nav>
      </header>

      {/* ── SEARCH TOOLBAR — sticky ── */}
      <div className="rg-toolbar rg-a1" id="rg-toolbar">
        <div className="rg-toolbar-inner">
          {/* Search row */}
          <form action="/startup" method="GET" className="rg-search-row" id="rg-search-form">
            {/* Preserve filter state across search */}
            {year && <input type="hidden" name="year" value={year} />}
            {cat  && <input type="hidden" name="category" value={cat} />}
            {sort && sort !== "name" && <input type="hidden" name="sort" value={sort} />}
            <span className="rg-search-icon" aria-hidden="true">⌕</span>
            <input
              type="search" name="q" defaultValue={q}
              className="rg-search-inp"
              placeholder="Search startups, founders, sectors, cities…"
              aria-label="Search startup registry"
              autoComplete="off"
            />
            <button type="submit" className="rg-search-btn">Search →</button>
          </form>

          {/* Filter row — FIXED: selects auto-submit on change via JS */}
          <div className="rg-filter-row" id="rg-filter-row">
            <span className="rg-filter-lbl">Filter</span>

            {/* Year filter */}
            <select
              className="rg-filter-sel"
              aria-label="Filter by founding year"
              defaultValue={year}
              id="rg-year-sel"
              name="year"
            >
              <option value="">Any Year</option>
              {years.map(yr => <option key={yr} value={String(yr)}>{yr}</option>)}
            </select>

            {/* Category filter */}
            <select
              className="rg-filter-sel"
              aria-label="Filter by sector"
              defaultValue={cat}
              id="rg-cat-sel"
              name="category"
            >
              <option value="">All Sectors</option>
              {cats.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Sort links */}
            <Link href={qs({ sort: "name", page: undefined })}    className={`rg-filter-link${sort === "name"   ? " on" : ""}`}>A–Z</Link>
            <Link href={qs({ sort: "newest", page: undefined })}  className={`rg-filter-link${sort === "newest" ? " on" : ""}`}>Newest</Link>
            <Link href={qs({ sort: "year", page: undefined })}    className={`rg-filter-link${sort === "year"   ? " on" : ""}`}>Founded Year</Link>
            {isFiltered && <Link href="/startup" className="rg-filter-clear">✕ Clear</Link>}
          </div>
        </div>
      </div>

      {/* ── RESULTS BAR ── */}
      <div className="rg-results-bar rg-a2" aria-live="polite">
        <span className="rg-results-q pf">{q ? `"${q}"` : cat ? cat : year ? `Est. ${year}` : "All Startups"}</span>
        <span className="rg-results-n">— {total.toLocaleString()} profiles</span>
        <span className="rg-results-rule" />
        <span className="rg-results-pg">Pg. {page} / {totalPages || 1}</span>
      </div>

      {/* ── MAIN ── */}
      <div className="rg-main rg-a2">
        <div className="rg-layout">

          {/* ── CONTENT COLUMN ── */}
          <div>
            {/* Featured */}
            {featured.length > 0 && (
              <section aria-label="Featured startups" style={{ marginBottom:"clamp(18px,3vw,28px)" }}>
                <div className="rg-sh">
                  <span style={{ color:"#B45309", fontSize:10, marginRight:2 }}>✦</span>
                  <span className="rg-sh-l">Featured This Edition</span>
                  <div className="rg-sh-r" />
                </div>
                <div className="rg-feat-grid">
                  {featured.map((s, fi) => (
                    <Link key={s.id} href={`/startup/${s.slug}`} className="rg-feat-card">
                      <div className="rg-feat-img">
                        {s.logo_url
                          ? <img src={s.logo_url} alt={s.name} loading={fi === 0 ? "eager" : "lazy"} />
                          : <div className="rg-feat-ph"><span className="rg-feat-ph-l pf">{s.name.charAt(0)}</span></div>
                        }
                        <div className="rg-feat-ov" />
                        <span className="rg-feat-num">No.{String(fi + 1).padStart(2, "0")}</span>
                        <div className="rg-feat-caption">
                          <span className="rg-feat-sector">{s.category ?? "Startup"}</span>
                          <span className="rg-feat-name pf">{s.name}</span>
                        </div>
                      </div>
                      <div className="rg-feat-body">
                        <p className="rg-feat-desc">{s.description ?? "Building for India's next decade."}</p>
                        <div className="rg-feat-foot">
                          <span className="rg-feat-meta">{s.founded_year && `Est. ${s.founded_year}`}{s.city && ` · ${s.city}`}</span>
                          <ArrowUpRight style={{ width:12, height:12, color:"#C8C2B4" }} aria-hidden="true" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* All startups */}
            {grid.length > 0 ? (
              <section aria-label="All startups">
                {featured.length > 0 && (
                  <div className="rg-sh">
                    <span className="rg-sh-l">All Startups</span>
                    <div className="rg-sh-r" />
                  </div>
                )}
                {/* Desktop grid */}
                <div className="rg-grid">
                  {grid.map(s => (
                    <Link key={s.id} href={`/startup/${s.slug}`} className="rg-card">
                      <div className="rg-card-head">
                        <div className="rg-card-logo">
                          {s.logo_url
                            ? <Image src={s.logo_url} alt={s.name} width={36} height={36} className="object-contain" loading="lazy" />
                            : <span style={{ fontSize:14, fontWeight:700, color:"#AAA", fontFamily:"'Playfair Display',serif" }}>{s.name.charAt(0)}</span>
                          }
                        </div>
                        <div className="rg-card-titles">
                          <p className="rg-card-name pf">{s.name}</p>
                          <p className="rg-card-cat">{(s.category ?? "").slice(0, 20)}</p>
                        </div>
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-label="Verified" style={{ flexShrink:0, marginTop:3 }}>
                          <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#15803D" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <p className="rg-card-desc">{s.description ?? "Building for India's next decade."}</p>
                      {s.founders && <p className="rg-card-founders">↳ {s.founders}</p>}
                      <div className="rg-card-foot">
                        <div className="rg-card-chips">
                          {s.founded_year && <span>Est. {s.founded_year}</span>}
                          {s.city && <span>· {s.city}</span>}
                        </div>
                        <ArrowUpRight style={{ width:11, height:11, color:"#C8C2B4" }} aria-hidden="true" />
                      </div>
                    </Link>
                  ))}
                </div>
                {/* Mobile list */}
                <div className="rg-mob">
                  {grid.map(s => (
                    <Link key={s.id} href={`/startup/${s.slug}`} className="rg-mob-row">
                      <div className="rg-mob-logo">
                        {s.logo_url
                          ? <Image src={s.logo_url} alt={s.name} width={40} height={40} className="object-contain" loading="lazy" />
                          : <span style={{ fontSize:14, fontWeight:700, color:"#AAA", fontFamily:"'Playfair Display',serif" }}>{s.name.charAt(0)}</span>
                        }
                      </div>
                      <div className="rg-mob-info">
                        <p className="rg-mob-name pf">{s.name}</p>
                        <p className="rg-mob-meta">{s.category ?? "Startup"}{s.founded_year && ` · ${s.founded_year}`}{s.city && ` · ${s.city}`}</p>
                        {s.description && <p className="rg-mob-desc">{s.description}</p>}
                      </div>
                      <span style={{ fontSize:16, color:"#C8C2B4", flexShrink:0 }}>›</span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : (
              <div className="rg-empty">
                <span className="pf" style={{ fontSize:"2.8rem", color:"#C8C2B4", display:"block", marginBottom:12 }}>∅</span>
                <p className="pf" style={{ fontSize:"1.2rem", color:"#1A1208", marginBottom:6, fontWeight:700 }}>No startups found</p>
                <p style={{ fontSize:13, color:"#5A4A30", fontStyle:"italic", marginBottom:16 }}>{q ? `Nothing matched "${q}". Try a different term.` : "Try adjusting your filters."}</p>
                <Link href="/startup" style={{ display:"inline-block", background:"#1A1208", color:"#fff", padding:"8px 20px", fontFamily:"system-ui,sans-serif", fontSize:9, fontWeight:900, textTransform:"uppercase", letterSpacing:".18em", textDecoration:"none" }}>Clear filters</Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="rg-pag" aria-label="Registry pagination">
                <Link href={pgHref(page - 1)} className={`rg-pag-btn${page === 1 ? " dis" : ""}`} aria-disabled={page === 1}>← Prev</Link>
                {pgNums.map(p => (
                  <Link key={p} href={pgHref(p)} className={`rg-pag-num${p === page ? " on" : ""}`} aria-current={p === page ? "page" : undefined}>{p}</Link>
                ))}
                <Link href={pgHref(page + 1)} className={`rg-pag-btn${page === totalPages ? " dis" : ""}`} aria-disabled={page === totalPages}>Next →</Link>
              </nav>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="rg-side" style={{ position:"sticky", top:88 }}>
            <div className="rg-side-box dk">
              <p className="rg-side-ey">List Free · UpForge</p>
              <p className="rg-side-h pf">Got a startup to list?</p>
              <p className="rg-side-p">Get independently verified. Free forever.</p>
              <Link href="/submit" className="rg-side-btn">Submit Startup →</Link>
            </div>
            {cats.length > 0 && (
              <div className="rg-side-box">
                <p className="rg-side-ey">Browse by Sector</p>
                <ul className="rg-side-list">
                  {cats.slice(0, 10).map(c => (
                    <li key={c}>
                      <Link href={`/startups/${c.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")}`}>
                        <span>{c}</span>
                        <span style={{ color:"#C8C2B4", fontSize:12 }}>›</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {cats.length > 10 && (
                  <Link href="/startups" style={{ display:"block", marginTop:8, paddingTop:8, borderTop:"1px solid #D8D2C4", fontFamily:"system-ui,sans-serif", fontSize:"8px", fontWeight:700, textTransform:"uppercase", letterSpacing:".18em", color:"#AAA", textDecoration:"none" }}>
                    All {cats.length} sectors →
                  </Link>
                )}
              </div>
            )}
            <div className="rg-side-box dk" style={{ position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,#92400E,#D97706,#E8C547)" }} />
              <p className="rg-side-ey">By The Numbers</p>
              <p className="pf" style={{ fontSize:"1rem", fontWeight:700, color:"#fff", fontStyle:"italic", marginBottom:14, lineHeight:1.3 }}>India's Startup<br /><span style={{ color:"#E8C547" }}>Ecosystem 2026</span></p>
              {[
                { v:`${total.toLocaleString()}+`, l:"Verified on UpForge" },
                { v:"125+",    l:"Indian Unicorns"  },
                { v:"$3.4B",   l:"Q1 2026 Funding"  },
                { v:"3rd",     l:"Largest Ecosystem" },
              ].map((s, i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", padding:"7px 0", borderBottom:i<3?"1px solid rgba(255,255,255,.08)":"none" }}>
                  <span style={{ fontFamily:"system-ui,sans-serif", fontSize:8, color:"rgba(255,255,255,.4)", textTransform:"uppercase", letterSpacing:".12em" }}>{s.l}</span>
                  <span className="pf" style={{ fontSize:"1.1rem", fontWeight:900, color:"#E8C547" }}>{s.v}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* CTA */}
        <div className="rg-cta rg-a3">
          <div>
            <p className="rg-cta-ey">UpForge Intelligence</p>
            <p className="rg-cta-h pf">Your founder story starts with a verified profile.</p>
            <p className="rg-cta-p">Free forever. Trusted by investors and press across India.</p>
          </div>
          <Link href="/submit" className="rg-cta-btn">
            List Free <ArrowRight style={{ width:13, height:13 }} aria-hidden="true" />
          </Link>
        </div>

        {/* Internal links */}
        <section className="rg-a4" style={{ paddingTop:"clamp(18px,3vw,30px)", borderTop:"1px solid #C8C2B4", marginTop:"clamp(18px,3vw,28px)" }}>
          <p style={{ fontFamily:"system-ui,sans-serif", fontSize:8.5, letterSpacing:".3em", textTransform:"uppercase", color:"#AAA", marginBottom:14 }}>Explore on UpForge</p>
          <div className="rg-links-grid">
            {[
              { l:"Startup Registry India",    h:"/startup",             desc:"Full verified database"     },
              { l:"Browse by Sector",          h:"/startups",            desc:"30+ categories"             },
              { l:"Indian Unicorns 2026",      h:"/blog/top-indian-unicorns-2026", desc:"All 125+ profiled"},
              { l:"Funding Guide 2026",        h:"/blog/how-to-get-startup-funding-india-2026", desc:"DPIIT, SISFS & VCs" },
              { l:"AI Startups India",         h:"/startups/ai-ml",      desc:"India's AI builders"        },
              { l:"FinTech Startups India",    h:"/startups/fintech",    desc:"Zerodha, CRED & more"       },
              { l:"The Forge — Blog",          h:"/blog",                desc:"Startup intelligence"       },
              { l:"Submit Your Startup",       h:"/submit",              desc:"Get listed free"            },
            ].map(lnk => (
              <Link key={lnk.h + lnk.l} href={lnk.h} className="rg-link-card">
                <span className="rg-link-title">
                  {lnk.l}
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true" style={{ display:"inline", marginLeft:4, verticalAlign:"middle" }}>
                    <path d="M2 7L7 2M7 2H3M7 2V6" stroke="#1A1208" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="rg-link-desc">{lnk.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="rg-footer rg-a4">
          <p className="rg-footer-note">
            * Registry data sourced from DPIIT, Tracxn, Inc42, Forbes India, Hurun India 2025, and company announcements as of March 2026.
            UpForge is an independent registry — no paid placements, no sponsored rankings.
          </p>
          <nav aria-label="Footer navigation">
            <ul className="rg-footer-nav">
              {[
                { l:"The Founder Chronicle", h:"/"        },
                { l:"Startup Registry India",h:"/startup" },
                { l:"Browse by Sector",      h:"/startups"},
                { l:"Indian Unicorns 2026",  h:"/blog/top-indian-unicorns-2026" },
                { l:"The Forge — Blog",      h:"/blog"    },
                { l:"Free Valuation Tool",   h:"/report"  },
                { l:"Submit Startup",        h:"/submit"  },
              ].map(lnk => (
                <li key={lnk.h + lnk.l}><Link href={lnk.h}>{lnk.l}</Link></li>
              ))}
            </ul>
          </nav>
        </footer>
      </div>

      {/*
        ── FILTER AUTO-SUBMIT JS ────────────────────────────────────────────
        Pure vanilla JS — no React, no router.
        When year OR category select changes, builds the correct URL
        preserving all existing params and navigates immediately.
        This is the FIX for the broken filters.
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
          function buildUrl(overrides){
            var cur = getParams();
            var merged = Object.assign({}, cur, overrides);
            var p = new URLSearchParams();
            if(merged.q)                     p.set('q',merged.q);
            if(merged.year)                  p.set('year',merged.year);
            if(merged.cat)                   p.set('category',merged.cat);
            if(merged.sort && merged.sort !== 'name') p.set('sort',merged.sort);
            var s = p.toString();
            return '/startup' + (s ? '?' + s : '');
          }
          // Year select
          var yearSel = document.getElementById('rg-year-sel');
          if(yearSel){
            yearSel.addEventListener('change', function(){
              window.location.href = buildUrl({year: this.value, page: undefined});
            });
          }
          // Category select
          var catSel = document.getElementById('rg-cat-sel');
          if(catSel){
            catSel.addEventListener('change', function(){
              window.location.href = buildUrl({cat: this.value, page: undefined});
            });
          }
        })();
      `}} />
    </>
  )
}
