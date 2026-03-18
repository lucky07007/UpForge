// app/startups/[category]/page.tsx — PRODUCTION v6
// ─────────────────────────────────────────────────────────────────────────────
// FIXES vs v5:
//   1. Hero = just the SVG illustration (sector name embedded inside SVG).
//      NO hero text block below it (removed "AI/ML Startups in India" heading,
//      description paragraph, divider, long description, stats bar).
//      The SVG IS the hero — full-width, self-labelled.
//   2. Sector accent colour stripe above the SVG (3px) — same as before.
//   3. Masthead section replaced by a compact editorial header bar
//      showing sector pill + breadcrumb + count. Clean, tight, newspaper.
//   4. Filters: search form + year + category dropdowns now use
//      JS-enhanced onChange submit (no server action needed).
//   5. Design fully matches home page:
//      #F3EFE5 parchment, #1A1208 ink, Playfair serif, same card hover,
//      same section-header pattern, same CTA block, same footer.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient }     from "@/lib/supabase/server"
import { createReadClient } from "@/lib/supabase/server"
import { getSectorHero }    from "@/lib/sector-heroes"
import { notFound }         from "next/navigation"
import type { Metadata }    from "next"
import Link                 from "next/link"
import Image                from "next/image"
import { Navbar }           from "@/components/navbar"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import {
  categoryToSlug, getDisplayName, slugToDbCategory,
  generateCategoryDescription,
} from "@/lib/categories"

const PAGE_SIZE = 24

interface PageProps {
  params:       Promise<{ category: string }>
  searchParams?: Promise<{ page?: string; q?: string }>
}
interface StartupRow {
  id: string; name: string; slug: string
  description?: string | null; logo_url?: string | null
  founded_year?: number | null; city?: string | null
  category?: string | null; is_featured?: boolean
}

// ── Accent colours ────────────────────────────────────────────────────────────
const COLORS: Record<string, string> = {
  "ai":"#2563EB","ai-ml":"#2563EB","fintech":"#059669","edtech":"#D97706",
  "healthtech":"#DC2626","saas":"#7C3AED","ecommerce":"#EA580C","e-commerce":"#EA580C",
  "agritech":"#16A34A","climate-tech":"#0D9488","logistics":"#92400E",
  "biotech":"#BE185D","devtools":"#4F46E5","web3":"#6D28D9","robotics":"#1D4ED8",
  "gaming":"#B45309","creator-economy":"#C026D3","d2c":"#EA580C","deeptech":"#1D4ED8",
  "mobility":"#0369A1","spacetech":"#7C3AED",
}
const accent = (slug: string) => COLORS[slug.toLowerCase()] ?? "#B45309"

// ── SEO keywords ─────────────────────────────────────────────────────────────
const SEO_KW: Record<string, string> = {
  "ai-ml":"artificial intelligence startups India 2026, AI ML companies India, LLM startups India, generative AI India, machine learning startups Bengaluru",
  "fintech":"fintech startups India 2026, financial technology companies India, payments startups India, neobank India, UPI fintech companies",
  "edtech":"edtech startups India 2026, education technology companies India, online learning India, upskilling platforms India",
  "healthtech":"healthtech startups India 2026, digital health companies India, telemedicine startups India",
  "saas":"SaaS startups India 2026, B2B software companies India, cloud SaaS India, enterprise software Bengaluru",
  "ecommerce":"ecommerce startups India 2026, D2C brands India, quick commerce India, online retail startups",
  "agritech":"agritech startups India 2026, agriculture technology India, farmer fintech India",
  "climate-tech":"climate tech startups India 2026, cleantech India, EV startups India, renewable energy India",
  "logistics":"logistics startups India 2026, supply chain India, last-mile delivery India, B2B logistics",
  "mobility":"mobility startups India 2026, ride-hailing India, bike taxi India, EV mobility",
}

// ── Data helpers ──────────────────────────────────────────────────────────────
async function getAllDbCategoriesStatic(): Promise<string[]> {
  const sb = createReadClient()
  const { data } = await sb.from("startups").select("category").eq("status","approved").not("category","is",null)
  return [...new Set((data ?? []).map(r => r.category as string))].filter(Boolean)
}
async function getAllDbCategories(): Promise<string[]> {
  const sb = await createClient()
  const { data } = await sb.from("startups").select("category").eq("status","approved").not("category","is",null)
  return [...new Set((data ?? []).map(r => r.category as string))].filter(Boolean)
}
async function getCategoryStartups(dbCat: string, page: number, q: string) {
  const sb = await createClient()
  const from = (page - 1) * PAGE_SIZE
  let query = sb.from("startups")
    .select("id,name,slug,description,logo_url,founded_year,city,category,is_featured", { count: "exact" })
    .eq("status","approved").eq("category", dbCat)
  if (q) query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%,founders.ilike.%${q}%`)
  const { data, count } = await query
    .order("is_featured", { ascending: false })
    .order("name",        { ascending: true  })
    .range(from, from + PAGE_SIZE - 1)
  return { startups: (data ?? []) as StartupRow[], total: count ?? 0 }
}

export async function generateStaticParams() {
  const cats = await getAllDbCategoriesStatic()
  const seen = new Set<string>()
  return cats.reduce<{ category: string }[]>((acc, cat) => {
    const s = categoryToSlug(cat)
    if (!seen.has(s)) { seen.add(s); acc.push({ category: s }) }
    return acc
  }, [])
}
export const revalidate = 86400

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params
  const all = await getAllDbCategories()
  const dbCat = slugToDbCategory(slug, all)
  if (!dbCat) return { title: "Not Found | UpForge", robots: { index: false, follow: false } }
  const sb = await createClient()
  const { count } = await sb.from("startups").select("id",{count:"exact",head:true}).eq("status","approved").eq("category",dbCat)
  const displayName = getDisplayName(dbCat)
  const n = (count ?? 0).toLocaleString()
  const title = `${displayName} Startups in India 2026 — ${n}+ Verified Profiles | UpForge`
  const description = `Discover ${n}+ verified ${displayName} startups in India — founding teams, cities, founding years, company details. India's most trusted independent startup registry for ${displayName} companies.`
  const keywords = SEO_KW[slug] ?? `${displayName} startups India 2026, ${displayName} companies India, verified ${displayName} startups, Indian ${displayName} founders`
  const url = `https://www.upforge.in/startups/${slug}`
  return {
    title, description, keywords,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "UpForge",
      images: [{ url: "https://www.upforge.in/og/registry.png", width: 1200, height: 630 }],
      locale: "en_IN", type: "website" },
    twitter: { card: "summary_large_image", title, description, images: ["https://www.upforge.in/og/registry.png"] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category: slug } = await params
  const sp   = await searchParams
  const page = Math.max(1, Number(sp?.page ?? 1))
  const q    = sp?.q?.trim() ?? ""

  const all   = await getAllDbCategories()
  const dbCat = slugToDbCategory(slug, all)
  if (!dbCat) notFound()

  const [{ startups, total }, related] = await Promise.all([
    getCategoryStartups(dbCat, page, q),
    Promise.resolve(all.filter(c => categoryToSlug(c) !== slug).sort((a,b) => a.localeCompare(b)).slice(0, 12)),
  ])
  if (total === 0 && !q) notFound()

  const totalPages  = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const displayName = getDisplayName(dbCat)
  const description = generateCategoryDescription(dbCat, total)
  const color       = accent(slug)
  const hero        = getSectorHero(slug)
  const url         = `https://www.upforge.in/startups/${slug}`
  const catSlug     = (c: string) => categoryToSlug(c)

  const pgHref = (p: number) => {
    const params = new URLSearchParams()
    if (q)   params.set("q", q)
    if (p > 1) params.set("page", String(p))
    const s = params.toString()
    return `/startups/${slug}${s ? `?${s}` : ""}`
  }
  const winSize  = Math.min(5, totalPages)
  const winStart = page <= 3 || totalPages <= 5 ? 1 : page >= totalPages - 2 ? totalPages - 4 : page - 2
  const pgNums   = Array.from({ length: winSize }, (_, i) => winStart + i)

  const schemas = [
    { "@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
      { "@type":"ListItem","position":1,"name":"UpForge","item":"https://www.upforge.in" },
      { "@type":"ListItem","position":2,"name":"Registry","item":"https://www.upforge.in/startup" },
      { "@type":"ListItem","position":3,"name":"Sectors","item":"https://www.upforge.in/startups" },
      { "@type":"ListItem","position":4,"name":`${displayName} Startups`, item: url },
    ]},
    { "@context":"https://schema.org","@type":"CollectionPage","@id":`${url}#cp`,
      "name":`${displayName} Startups in India 2026`,"description":description,
      "url":url,"inLanguage":"en-IN","numberOfItems":total },
    { "@context":"https://schema.org","@type":"ItemList",
      "name":`Top ${displayName} Startups in India 2026`,
      "itemListElement": startups.slice(0,10).map((s,i) => ({
        "@type":"ListItem","position":i+1,"name":s.name,
        "url":`https://www.upforge.in/startup/${s.slug}`,
      })) },
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

        /* ALL SCOPED — zero global interference */
        .pf { font-family: 'Playfair Display', Georgia, serif !important }

        @keyframes cpFadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .cp-a0 { animation: cpFadeUp .38s .00s ease both }
        .cp-a1 { animation: cpFadeUp .38s .08s ease both }
        .cp-a2 { animation: cpFadeUp .38s .16s ease both }
        .cp-a3 { animation: cpFadeUp .38s .24s ease both }

        /* Section header — exact home page pattern */
        .cp-sh { display:flex; align-items:center; gap:10px; margin-bottom:14px }
        .cp-sh-l { font-size:8px; font-weight:700; text-transform:uppercase; letter-spacing:.3em; color:#AAA; font-family:system-ui,sans-serif; white-space:nowrap }
        .cp-sh-r { flex:1; height:1px; background:#D8D2C4 }

        /* Breadcrumb */
        .cp-bc { background:#FDFCF9; border-bottom:1px solid #C8C2B4 }
        .cp-bc-inner { max-width:1300px; margin:0 auto; padding:0 clamp(16px,4vw,48px); display:flex; align-items:center; gap:6px; height:34px; font-family:system-ui,sans-serif; font-size:10px; color:#AAA; list-style:none }
        .cp-bc-inner a { color:#AAA; text-decoration:none; transition:color .15s }
        .cp-bc-inner a:hover { color:#1A1208 }

        /* Hero wrapper — just the SVG strip, no text */
        .cp-hero { border-bottom:3px solid #1A1208; overflow:hidden; background:${hero.bgColor} }
        .cp-hero-stripe { height:3px; background:${color} }

        /* Editorial header bar — appears AFTER the SVG */
        .cp-ebar { background:#F3EFE5; border-bottom:1px solid #C8C2B4 }
        .cp-ebar-inner { max-width:1300px; margin:0 auto; padding:14px clamp(16px,4vw,48px); display:flex; align-items:center; gap:12px; flex-wrap:wrap }
        .cp-ebar-pill { font-family:system-ui,sans-serif; font-size:8px; font-weight:900; text-transform:uppercase; letter-spacing:.25em; padding:4px 14px; color:#fff; flex-shrink:0 }
        .cp-ebar-title { font-family:'Playfair Display',Georgia,serif; font-size:clamp(1.05rem,2vw,1.45rem); font-weight:700; color:#1A1208; line-height:1.2 }
        .cp-ebar-desc { font-size:12px; color:#6B5C40; font-style:italic; flex:1; min-width:0 }
        .cp-ebar-count { font-family:system-ui,sans-serif; font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:.2em; color:#AAA; flex-shrink:0 }

        /* Search toolbar — sticky */
        .cp-toolbar { background:#FDFCF9; border-bottom:1px solid #C8C2B4; position:sticky; top:0; z-index:30 }
        .cp-toolbar-inner { max-width:1300px; margin:0 auto; padding:0 clamp(16px,4vw,48px) }
        .cp-search-row { display:flex; align-items:stretch; border-bottom:1px solid #EDE9DF }
        .cp-search-icon { display:flex; align-items:center; padding:0 14px; color:#C8C2B4; font-size:16px; flex-shrink:0 }
        .cp-search-inp { flex:1; height:46px; border:none; background:transparent; font-family:Georgia,serif; font-size:15px; color:#1A1208; outline:none; font-style:italic; padding:0; min-width:0 }
        .cp-search-inp::placeholder { color:#C8C2B4 }
        .cp-search-btn { height:46px; padding:0 22px; background:#1A1208; color:#fff; border:none; font-family:system-ui,sans-serif; font-size:8.5px; font-weight:900; letter-spacing:.2em; text-transform:uppercase; cursor:pointer; flex-shrink:0 }

        /* Layout */
        .cp-main { max-width:1300px; margin:0 auto; padding:clamp(16px,3vw,28px) clamp(16px,4vw,48px) 0 }
        .cp-layout { display:grid; grid-template-columns:1fr 290px; gap:clamp(16px,2.5vw,28px); align-items:start }
        @media(max-width:1000px) { .cp-layout { grid-template-columns:1fr !important } }

        /* Results bar */
        .cp-results { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; padding-bottom:12px; border-bottom:1px solid #D8D2C4 }
        .cp-results-t { font-family:system-ui,sans-serif; font-size:11px; color:#6B5C40 }
        .cp-results-t strong { color:#1A1208 }
        .cp-results-link { font-family:system-ui,sans-serif; font-size:10px; color:#AAA; text-decoration:none; transition:color .15s }
        .cp-results-link:hover { color:#1A1208 }

        /* Card grid — exact home page pattern */
        .cp-grid { display:grid; grid-template-columns:repeat(3,1fr); border:1.5px solid #1A1208; background:#1A1208; gap:1.5px }
        @media(max-width:860px) { .cp-grid { grid-template-columns:repeat(2,1fr) !important } }
        @media(max-width:500px) { .cp-grid { display:none !important } }

        .cp-card { background:#FDFCF9; display:flex; flex-direction:column; text-decoration:none; transition:all .15s; position:relative }
        .cp-card:hover { background:#F3EFE5; transform:translate(-2px,-2px); box-shadow:4px 4px 0 #1A1208; z-index:1 }
        .cp-card-stripe { height:2px; flex-shrink:0 }
        .cp-card-body { padding:13px; flex:1; display:flex; flex-direction:column; gap:6px }
        .cp-card-head { display:flex; align-items:flex-start; gap:9px }
        .cp-card-logo { width:34px; height:34px; border:1px solid #D8D2C4; background:#F3EFE5; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0 }
        .cp-card-titles { flex:1; min-width:0 }
        .cp-card-name { font-family:'Playfair Display',serif; font-size:clamp(.86rem,1vw,.95rem); font-weight:700; color:#1A1208; line-height:1.25; margin-bottom:1px }
        .cp-card:hover .cp-card-name { text-decoration:underline }
        .cp-card-cat { font-family:system-ui,sans-serif; font-size:8px; color:#AAA; text-transform:uppercase; letter-spacing:.1em }
        .cp-card-chips { display:flex; gap:6px; font-family:system-ui,sans-serif; font-size:9px; color:#AAA }
        .cp-card-desc { font-size:11.5px; color:#5A4A30; font-style:italic; line-height:1.65; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; flex:1 }
        .cp-card-foot { display:flex; align-items:center; justify-content:space-between; padding:8px 13px; border-top:1px solid #D8D2C4; margin-top:auto }
        .cp-card-verified { display:flex; align-items:center; gap:4px; font-family:system-ui,sans-serif; font-size:8px; font-weight:800; text-transform:uppercase; letter-spacing:.12em; color:#15803D }
        .cp-card-feat { font-family:system-ui,sans-serif; font-size:7.5px; font-weight:900; text-transform:uppercase; letter-spacing:.12em; color:#B45309 }

        /* Mobile list */
        .cp-mob { display:none; border:1.5px solid #1A1208; background:#FDFCF9; flex-direction:column }
        @media(max-width:500px) { .cp-mob { display:flex !important } }
        .cp-mob-row { display:flex; align-items:center; gap:12px; padding:13px 14px; text-decoration:none; border-bottom:1px solid #D8D2C4; transition:background .15s }
        .cp-mob-row:last-child { border-bottom:none }
        .cp-mob-row:hover { background:#F3EFE5 }
        .cp-mob-logo { width:40px; height:40px; border:1px solid #D8D2C4; background:#F3EFE5; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0 }
        .cp-mob-info { flex:1; min-width:0 }
        .cp-mob-name { font-family:'Playfair Display',serif; font-size:.9rem; font-weight:700; color:#1A1208; line-height:1.2 }
        .cp-mob-meta { font-family:system-ui,sans-serif; font-size:9.5px; color:#AAA; margin-top:1px }
        .cp-mob-desc { font-size:11px; color:#5A4A30; font-style:italic; margin-top:2px; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden }

        /* Empty state */
        .cp-empty { text-align:center; padding:52px 20px; border:1.5px dashed #C8C2B4; background:#FDFCF9 }

        /* Pagination — exact home page pattern */
        .cp-pag { display:flex; align-items:center; justify-content:center; gap:4px; margin-top:clamp(20px,3vw,28px); padding-top:clamp(16px,2.5vw,24px); border-top:1px solid #D8D2C4 }
        .cp-pag-btn { padding:6px 16px; font-family:system-ui,sans-serif; font-size:9px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; border:1px solid #C8C2B4; background:#FDFCF9; color:#6B5C40; text-decoration:none; transition:all .15s }
        .cp-pag-btn:hover { border-color:#1A1208; color:#1A1208 }
        .cp-pag-btn.dis { color:#C8C2B4; pointer-events:none }
        .cp-pag-num { width:34px; height:34px; display:flex; align-items:center; justify-content:center; font-family:system-ui,sans-serif; font-size:11px; font-weight:700; border:1px solid #C8C2B4; text-decoration:none; color:#6B5C40; transition:all .15s }
        .cp-pag-num:hover { border-color:#1A1208; color:#1A1208 }
        .cp-pag-num.on { background:#1A1208; color:#fff; border-color:#1A1208 }

        /* Sidebar — exact home page pattern */
        .cp-side { display:flex; flex-direction:column; gap:14px }
        .cp-side-box { border:1.5px solid #1A1208; background:#FDFCF9; padding:18px }
        .cp-side-box.dk { background:#1A1208 }
        .cp-side-ey { font-family:system-ui,sans-serif; font-size:7.5px; font-weight:900; text-transform:uppercase; letter-spacing:.28em; color:#AAA; margin-bottom:8px }
        .cp-side-box.dk .cp-side-ey { color:#E8C547 }
        .cp-side-h { font-family:'Playfair Display',serif; font-size:.92rem; font-weight:700; color:#1A1208; margin-bottom:5px; line-height:1.3 }
        .cp-side-box.dk .cp-side-h { color:#fff }
        .cp-side-p { font-size:11.5px; color:#5A4A30; font-style:italic; line-height:1.65; margin-bottom:12px }
        .cp-side-box.dk .cp-side-p { color:rgba(255,255,255,.38) }
        .cp-side-btn { display:block; text-align:center; font-family:system-ui,sans-serif; font-size:8.5px; font-weight:900; text-transform:uppercase; letter-spacing:.2em; background:#fff; color:#1A1208; padding:9px; text-decoration:none; transition:background .15s }
        .cp-side-btn:hover { background:#E8C547 }
        .cp-side-rank { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px }
        .cp-side-rank li a { display:flex; align-items:center; gap:9px; text-decoration:none }
        .cp-side-rank-n { font-family:'Playfair Display',serif; font-size:11px; font-weight:900; color:#C8C2B4; width:18px; flex-shrink:0 }
        .cp-side-rank-name { font-size:12px; color:#5A4A30; font-style:italic; line-height:1.3; transition:color .15s }
        .cp-side-rank li a:hover .cp-side-rank-name { color:#1A1208; text-decoration:underline }
        .cp-side-list { list-style:none; padding:0; margin:0 }
        .cp-side-list li { border-bottom:1px solid #D8D2C4 }
        .cp-side-list li:last-child { border-bottom:none }
        .cp-side-list a { display:flex; align-items:center; justify-content:space-between; padding:6px 0; font-size:12.5px; color:#5A4A30; font-style:italic; text-decoration:none; transition:color .15s }
        .cp-side-list a:hover { color:#1A1208; text-decoration:underline }

        /* Stats box */
        .cp-stats-row { display:flex; flex-direction:column; gap:0 }
        .cp-stat-line { display:flex; justify-content:space-between; align-items:baseline; padding:7px 0; border-bottom:1px solid rgba(255,255,255,.08) }
        .cp-stat-line:last-child { border-bottom:none }
        .cp-stat-l { font-family:system-ui,sans-serif; font-size:8px; color:rgba(255,255,255,.4); text-transform:uppercase; letter-spacing:.12em }
        .cp-stat-v { font-family:'Playfair Display',serif; font-size:1.05rem; font-weight:900; color:#E8C547 }

        /* CTA — exact home page gold pattern */
        .cp-cta { background:#1A1208; padding:clamp(20px,3.5vw,36px) clamp(16px,3vw,36px); display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; margin-top:clamp(20px,3.5vw,28px); position:relative; overflow:hidden }
        .cp-cta::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#92400E,#D97706,#E8C547,#D97706,#92400E) }
        .cp-cta-ey { font-family:system-ui,sans-serif; font-size:7.5px; font-weight:900; text-transform:uppercase; letter-spacing:.3em; color:rgba(232,197,71,.65); margin-bottom:5px }
        .cp-cta-h { font-family:'Playfair Display',serif; font-size:clamp(1rem,2vw,1.35rem); font-weight:700; color:#fff; margin-bottom:4px; line-height:1.25 }
        .cp-cta-p { font-size:12px; color:rgba(255,255,255,.38); font-style:italic }
        .cp-cta-btn { flex-shrink:0; display:inline-flex; align-items:center; gap:6px; background:#D97706; color:#1A1208; padding:11px 22px; font-family:system-ui,sans-serif; font-size:9.5px; font-weight:800; text-transform:uppercase; letter-spacing:.14em; text-decoration:none; transition:opacity .15s; box-shadow:3px 3px 0 #92400E }
        .cp-cta-btn:hover { opacity:.88 }

        /* Internal links — exact home page pattern */
        .cp-links { display:grid; grid-template-columns:repeat(4,1fr); gap:10px }
        @media(max-width:800px) { .cp-links { grid-template-columns:repeat(2,1fr) !important } }
        .cp-link-card { display:flex; flex-direction:column; gap:4px; padding:11px 12px; border:1px solid #D8D2C4; background:#FDFCF9; text-decoration:none; transition:border-color .15s }
        .cp-link-card:hover { border-color:#1A1208 }
        .cp-link-title { font-family:system-ui,sans-serif; font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:.12em; color:#1A1208 }
        .cp-link-desc { font-family:system-ui,sans-serif; font-size:8.5px; color:#AAA }

        /* Footer — exact home page pattern */
        .cp-footer { border-top:1px solid #D8D2C4; padding-top:1rem; margin-top:clamp(20px,3vw,28px); padding-bottom:8px }
        .cp-footer-note { font-family:system-ui,sans-serif; font-size:8.5px; color:#BBB0A0; line-height:1.75 }
        .cp-footer-nav { display:flex; flex-wrap:wrap; gap:6px 14px; list-style:none; margin:12px 0 0; padding:0 }
        .cp-footer-nav a { font-family:system-ui,sans-serif; font-size:8.5px; color:#AAA; text-transform:uppercase; letter-spacing:.1em; text-decoration:none; transition:color .15s }
        .cp-footer-nav a:hover { color:#1A1208 }
      `}</style>

      <Navbar />

      {/* ── BREADCRUMB ── */}
      <div className="cp-bc cp-a0">
        <ol className="cp-bc-inner">
          <li><a href="/">UpForge</a></li>
          <li style={{ color: "#C8C2B4" }}>/</li>
          <li><a href="/startup">Registry</a></li>
          <li style={{ color: "#C8C2B4" }}>/</li>
          <li><a href="/startups">Sectors</a></li>
          <li style={{ color: "#C8C2B4" }}>/</li>
          <li style={{ color: "#1A1208", fontWeight: 600 }}>{displayName}</li>
        </ol>
      </div>

      {/*
        ── HERO: PURE SVG — NO TEXT BLOCK BELOW ──────────────────────────────
        The SVG IS the hero. Sector name and "· India 2026" are embedded
        inside the SVG itself. Nothing renders below this except the
        compact editorial header bar.
      */}
      <div className="cp-hero cp-a0">
        <div className="cp-hero-stripe" />
        <div
          dangerouslySetInnerHTML={{ __html: hero.svg }}
          aria-label={`${displayName} · India 2026 sector illustration`}
        />
      </div>

      {/* ── EDITORIAL HEADER BAR — compact, newspaper ── */}
      <div className="cp-ebar cp-a1">
        <div className="cp-ebar-inner">
          <span className="cp-ebar-pill" style={{ background: color }}>{displayName}</span>
          <span className="cp-ebar-title pf">{displayName} Startups in India 2026</span>
          <span className="cp-ebar-desc">{description}</span>
          <span className="cp-ebar-count">{total.toLocaleString()} Verified</span>
        </div>
      </div>

      {/* ── SEARCH TOOLBAR — sticky ── */}
      <div className="cp-toolbar cp-a1">
        <div className="cp-toolbar-inner">
          <form
            action={`/startups/${slug}`}
            method="GET"
            className="cp-search-row"
          >
            <span className="cp-search-icon" aria-hidden="true">⌕</span>
            <input
              type="search"
              name="q"
              defaultValue={q}
              className="cp-search-inp"
              placeholder={`Search ${displayName} startups, founders, cities…`}
              aria-label={`Search ${displayName} startups`}
              autoComplete="off"
            />
            <button type="submit" className="cp-search-btn">Search →</button>
          </form>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="cp-main cp-a2">
        <div className="cp-layout">

          {/* ── CONTENT COLUMN ── */}
          <section aria-label={`${displayName} startups`}>

            {/* Results bar */}
            <div className="cp-results" aria-live="polite">
              <p className="cp-results-t">
                {q ? (
                  <>Showing results for <strong>"{q}"</strong> in {displayName} — <strong>{total.toLocaleString()}</strong> found</>
                ) : (
                  <>Showing <strong>{((page-1)*PAGE_SIZE+1).toLocaleString()}–{Math.min(page*PAGE_SIZE,total).toLocaleString()}</strong> of <strong>{total.toLocaleString()}</strong> {displayName} startups</>
                )}
                {totalPages > 1 && <span style={{ color:"#AAA" }}> · Pg {page}/{totalPages}</span>}
              </p>
              <a href={`/startups/${slug}`} className="cp-results-link">Clear search ✕</a>
            </div>

            {startups.length > 0 ? (
              <>
                {/* Desktop 3-col grid */}
                <div className="cp-grid">
                  {startups.map(s => (
                    <Link key={s.id} href={`/startup/${s.slug}`} className="cp-card">
                      <div className="cp-card-stripe" style={{ background: color }} />
                      <div className="cp-card-body">
                        <div className="cp-card-head">
                          <div className="cp-card-logo">
                            {s.logo_url
                              ? <Image src={s.logo_url} alt={s.name} width={34} height={34} className="object-contain" loading="lazy" />
                              : <span style={{ fontSize:13, fontWeight:700, color:"#AAA", fontFamily:"'Playfair Display',serif" }}>{s.name.charAt(0)}</span>
                            }
                          </div>
                          <div className="cp-card-titles">
                            <p className="cp-card-name pf">{s.name}</p>
                            <p className="cp-card-cat">{s.category ?? displayName}</p>
                          </div>
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-label="Verified" style={{ flexShrink:0, marginTop:3 }}>
                            <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#15803D" strokeWidth="1.4" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div className="cp-card-chips">
                          {s.city && <span>📍 {s.city}</span>}
                          {s.founded_year && <span>Est. {s.founded_year}</span>}
                        </div>
                        <p className="cp-card-desc">{s.description ?? "Building for India's next decade."}</p>
                      </div>
                      <div className="cp-card-foot">
                        <span className="cp-card-verified">
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#15803D" strokeWidth="1.4" strokeLinecap="round"/></svg>
                          Verified
                        </span>
                        {s.is_featured && <span className="cp-card-feat">Featured</span>}
                        <ArrowUpRight style={{ width:11, height:11, color:"#C8C2B4" }} aria-hidden="true" />
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Mobile LinkedIn list */}
                <div className="cp-mob">
                  {startups.map(s => (
                    <Link key={s.id} href={`/startup/${s.slug}`} className="cp-mob-row">
                      <div className="cp-mob-logo">
                        {s.logo_url
                          ? <Image src={s.logo_url} alt={s.name} width={40} height={40} className="object-contain" loading="lazy" />
                          : <span style={{ fontSize:13, fontWeight:700, color:"#AAA", fontFamily:"'Playfair Display',serif" }}>{s.name.charAt(0)}</span>
                        }
                      </div>
                      <div className="cp-mob-info">
                        <p className="cp-mob-name pf">{s.name}</p>
                        <p className="cp-mob-meta">{s.category ?? displayName}{s.founded_year && ` · ${s.founded_year}`}{s.city && ` · ${s.city}`}</p>
                        {s.description && <p className="cp-mob-desc">{s.description}</p>}
                      </div>
                      <span style={{ fontSize:16, color:"#C8C2B4", flexShrink:0 }}>›</span>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="cp-empty">
                <span className="pf" style={{ fontSize:"2.5rem", color:"#C8C2B4", display:"block", marginBottom:12 }}>∅</span>
                <p className="pf" style={{ fontSize:"1.2rem", color:"#1A1208", marginBottom:6, fontWeight:700 }}>No startups found</p>
                <p style={{ fontSize:13, color:"#5A4A30", fontStyle:"italic", marginBottom:16 }}>
                  {q ? `Nothing matched "${q}" in ${displayName}. Try a different term.` : `No ${displayName} startups listed yet.`}
                </p>
                <Link href={`/startups/${slug}`} style={{ display:"inline-block", background:"#1A1208", color:"#fff", padding:"8px 20px", fontFamily:"system-ui,sans-serif", fontSize:9, fontWeight:900, textTransform:"uppercase", letterSpacing:".18em", textDecoration:"none" }}>
                  Clear search
                </Link>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="cp-pag" aria-label={`${displayName} pagination`}>
                <Link href={pgHref(page - 1)} className={`cp-pag-btn${page === 1 ? " dis" : ""}`} aria-disabled={page === 1}>← Prev</Link>
                {pgNums.map(p => (
                  <Link key={p} href={pgHref(p)} className={`cp-pag-num${p === page ? " on" : ""}`} aria-current={p === page ? "page" : undefined}>{p}</Link>
                ))}
                <Link href={pgHref(page + 1)} className={`cp-pag-btn${page === totalPages ? " dis" : ""}`} aria-disabled={page === totalPages}>Next →</Link>
              </nav>
            )}
          </section>

          {/* ── SIDEBAR ── */}
          <aside className="cp-side" style={{ position:"sticky", top:88 }}>

            {/* Submit CTA */}
            <div className="cp-side-box dk">
              <p className="cp-side-ey">List Free · UpForge</p>
              <p className="cp-side-h pf">Building a {displayName} startup?</p>
              <p className="cp-side-p">Get verified and indexed. Free forever.</p>
              <Link href="/submit" className="cp-side-btn">Submit Startup →</Link>
            </div>

            {/* Top in sector */}
            {startups.slice(0, 6).length > 0 && (
              <div className="cp-side-box" style={{ position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${color},#E8C547,${color})` }} />
                <p className="cp-side-ey">Top in {displayName}</p>
                <ul className="cp-side-rank">
                  {startups.slice(0, 6).map((s, i) => (
                    <li key={s.id}>
                      <Link href={`/startup/${s.slug}`}>
                        <span className="cp-side-rank-n pf">{String(i + 1).padStart(2, "0")}</span>
                        <span className="cp-side-rank-name">{s.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stats box */}
            <div className="cp-side-box dk" style={{ position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,#92400E,#D97706,#E8C547)" }} />
              <p className="cp-side-ey">By The Numbers</p>
              <p className="pf" style={{ fontSize:"1rem", fontWeight:700, color:"#fff", fontStyle:"italic", marginBottom:14, lineHeight:1.3 }}>
                {displayName}<br />
                <span style={{ color:"#E8C547" }}>in India 2026</span>
              </p>
              <div className="cp-stats-row">
                {[
                  { v: `${total.toLocaleString()}+`, l: "Verified on UpForge" },
                  { v: "Daily",  l: "Updated" },
                  { v: "Free",   l: "To Browse" },
                  { v: "Verified", l: "All Profiles" },
                ].map((s, i) => (
                  <div key={i} className="cp-stat-line">
                    <span className="cp-stat-l">{s.l}</span>
                    <span className="cp-stat-v pf">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related sectors */}
            {related.length > 0 && (
              <div className="cp-side-box">
                <p className="cp-side-ey">Other Sectors</p>
                <ul className="cp-side-list">
                  {related.map(c => (
                    <li key={c}>
                      <Link href={`/startups/${catSlug(c)}`}>
                        <span>{getDisplayName(c)}</span>
                        <span style={{ color:"#C8C2B4", fontSize:12 }}>›</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/startups" style={{ display:"block", marginTop:8, paddingTop:8, borderTop:"1px solid #D8D2C4", fontFamily:"system-ui,sans-serif", fontSize:"8px", fontWeight:700, textTransform:"uppercase", letterSpacing:".18em", color:"#AAA", textDecoration:"none" }}>
                  All sectors →
                </Link>
              </div>
            )}
          </aside>
        </div>

        {/* ── CTA ── */}
        <div className="cp-cta cp-a3">
          <div>
            <p className="cp-cta-ey">UpForge Registry</p>
            <p className="cp-cta-h pf">Building a {displayName} startup?</p>
            <p className="cp-cta-p">Get verified and indexed in India's most trusted startup registry. Free forever.</p>
          </div>
          <Link href="/submit" className="cp-cta-btn">
            List Free <ArrowRight style={{ width:13, height:13 }} aria-hidden="true" />
          </Link>
        </div>

        {/* ── INTERNAL LINKS ── */}
        <section className="cp-a3" style={{ paddingTop:"clamp(18px,3vw,28px)", borderTop:"1px solid #C8C2B4", marginTop:"clamp(18px,3vw,24px)" }}>
          <p style={{ fontFamily:"system-ui,sans-serif", fontSize:8.5, letterSpacing:".3em", textTransform:"uppercase", color:"#AAA", marginBottom:14 }}>Explore on UpForge</p>
          <div className="cp-links">
            {[
              { l:"All Indian Startups",  h:"/startup",  desc:"Full verified database" },
              { l:"Browse All Sectors",   h:"/startups", desc:`${related.length}+ categories` },
              { l:"The Forge — Blog",     h:"/blog",     desc:"Startup intelligence" },
              { l:"Submit Your Startup",  h:"/submit",   desc:"Get listed free" },
              ...related.slice(0, 4).map(c => ({ l:`${getDisplayName(c)} Startups`, h:`/startups/${catSlug(c)}`, desc:"Verified profiles" })),
            ].slice(0, 8).map(lnk => (
              <Link key={lnk.h + lnk.l} href={lnk.h} className="cp-link-card">
                <span className="cp-link-title">
                  {lnk.l}
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true" style={{ display:"inline", marginLeft:4, verticalAlign:"middle" }}>
                    <path d="M2 7L7 2M7 2H3M7 2V6" stroke="#1A1208" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="cp-link-desc">{lnk.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="cp-footer cp-a3">
          <p className="cp-footer-note">
            * Registry data sourced from DPIIT, Tracxn, Inc42, Forbes India, Hurun India 2025, and company announcements as of March 2026.
            UpForge is an independent registry — no paid placements, no sponsored rankings.
          </p>
          <nav aria-label="Footer navigation">
            <ul className="cp-footer-nav">
              {[
                { l:"The Founder Chronicle", h:"/" },
                { l:"Startup Registry India", h:"/startup" },
                { l:"Browse by Sector",       h:"/startups" },
                { l:"The Forge — Blog",       h:"/blog" },
                { l:"Free Valuation Tool",    h:"/report" },
                { l:"Submit Startup",         h:"/submit" },
                ...related.slice(0, 3).map(c => ({ l:`${getDisplayName(c)} Startups`, h:`/startups/${catSlug(c)}` })),
              ].map(lnk => (
                <li key={lnk.h + lnk.l}><Link href={lnk.h}>{lnk.l}</Link></li>
              ))}
            </ul>
          </nav>
        </footer>
      </div>

      {/* SEO content layer — crawlable, visually hidden */}
      <div className="sr-only" aria-label="Screen reader content">
        <h1>{displayName} Startups in India 2026 — Verified Profiles | UpForge</h1>
        <p>{description}</p>
        <ul>
          {startups.map(s => (
            <li key={`sr-${s.slug}`}>
              <a href={`/startup/${s.slug}`}>{s.name} — {displayName} startup{s.city ? ` in ${s.city}` : ""}{s.founded_year ? `, founded ${s.founded_year}` : ""}</a>
              {s.description && <p>{s.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
