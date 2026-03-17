// app/startup/page.tsx — FINAL
// Key fixes:
//   1. CSS scoped to .reg-* classes only — no global * reset that breaks Navbar
//   2. Single footer — <Footer /> only, no bottom nav duplication
//   3. Reduced masthead padding
//   4. Warm color accents — saffron stripe, tinted stats bar
//   5. Search works via HTML form GET (server-rendered, SEO-rich)
//   6. Mobile: single-column LinkedIn-style list view
//   7. Full SEO — long-tail keywords, structured data, canonical

import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const PAGE_SIZE = 18

interface StartupRow {
  id: string; name: string; slug: string
  description?: string|null; logo_url?: string|null
  founders?: string|null; founded_year?: number|null
  category?: string|null; city?: string|null; is_featured?: boolean
}
interface PageProps {
  searchParams?: Promise<{ page?:string; q?:string; year?:string; sort?:string; category?:string }>
}

async function getRegistryData(q:string,year:string,sort:string,cat:string,page:number) {
  const sb = await createClient()
  const from = (page-1)*PAGE_SIZE
  let query = sb.from("startups")
    .select("id,name,slug,description,logo_url,founders,founded_year,category,city,is_featured",{count:"exact"})
    .eq("status","approved")
  if(q)    query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%,founders.ilike.%${q}%,category.ilike.%${q}%,city.ilike.%${q}%`)
  if(year) query = query.eq("founded_year",Number(year))
  if(cat)  query = query.eq("category",cat)
  const col = sort==="year"?"founded_year":sort==="newest"?"created_at":"name"
  const {data,count,error} = await query.order(col,{ascending:sort!=="newest"}).range(from,from+PAGE_SIZE-1)
  if(error) console.error("[registry]",error.message)
  return {startups:(data??[]) as StartupRow[], total:count??0}
}
async function getFilters() {
  const sb = await createClient()
  const [{data:yd},{data:cd}] = await Promise.all([
    sb.from("startups").select("founded_year").eq("status","approved").not("founded_year","is",null).gte("founded_year",2010).order("founded_year",{ascending:false}),
    sb.from("startups").select("category").eq("status","approved").not("category","is",null),
  ])
  return {
    years:[...new Set((yd??[]).map(r=>r.founded_year as number))].filter(Boolean),
    cats:[...new Set((cd??[]).map(r=>r.category as string))].filter(Boolean).sort(),
  }
}

export async function generateMetadata({searchParams}:PageProps):Promise<Metadata> {
  const sp = await searchParams
  const {total} = await getRegistryData("","","name","",1)
  const n = total>0?total.toLocaleString():"1,000+"
  const isFiltered = !!(sp?.q||sp?.year||sp?.sort||sp?.category)
  const page = Number(sp?.page??1)
  return {
    title:`Indian Startup Registry 2026 — ${n}+ Verified Indian Startups | UpForge`,
    description:`Discover ${n}+ verified Indian startups across AI/ML, FinTech, SaaS, EdTech, HealthTech, Climate Tech, AgriTech, D2C, Web3 and 30+ sectors. Search by founder name, city, founding year. India's most trusted free startup database — updated daily with verified profiles.`,
    alternates:{canonical:"https://www.upforge.in/startup"},
    keywords:"Indian startups 2026, startup registry India, verified startups, AI startups India, fintech startups India, SaaS startups India, startup founders India, Bengaluru startups, Mumbai startups, Delhi startups",
    openGraph:{
      title:`Indian Startup Registry 2026 — ${n}+ Verified | UpForge`,
      description:`Browse ${n}+ verified Indian startups. Free, structured, updated daily.`,
      url:"https://www.upforge.in/startup",siteName:"UpForge",
      images:[{url:"https://www.upforge.in/og/registry.png",width:1200,height:630}],
      locale:"en_IN",type:"website",
    },
    robots:{index:!isFiltered&&page<=1,follow:true,googleBot:{index:!isFiltered&&page<=1,follow:true,"max-snippet":-1,"max-image-preview":"large"}},
  }
}
export const revalidate = 300

export default async function StartupPage({searchParams}:PageProps) {
  const sp = await searchParams
  const q    = sp?.q?.trim()??""
  const year = sp?.year?.trim()??""
  const sort = sp?.sort?.trim()??"name"
  const cat  = sp?.category?.trim()??""
  const page = Math.max(1,Number(sp?.page??1))

  const [{startups,total},{years,cats}] = await Promise.all([
    getRegistryData(q,year,sort,cat,page),
    getFilters(),
  ])
  const totalPages = Math.max(1,Math.ceil(total/PAGE_SIZE))
  const isFiltered = !!(q||year||cat||(sort&&sort!=="name"))

  const qs = (ov:Record<string,string|undefined>)=>{
    const base:{[k:string]:string|undefined} = {
      q:q||undefined,year:year||undefined,
      sort:sort!=="name"?sort:undefined,
      category:cat||undefined,
      page:page>1?String(page):undefined,
    }
    const m = {...base,...ov}
    const p = new URLSearchParams()
    Object.entries(m).forEach(([k,v])=>{ if(v) p.set(k,v) })
    const s = p.toString()
    return `/startup${s?`?${s}`:""}`
  }
  const pgHref = (p:number)=>qs({page:p===1?undefined:String(p)})

  const winSize = Math.min(5,totalPages)
  const winStart = page<=3||totalPages<=5?1:page>=totalPages-2?totalPages-4:page-2
  const pgNums = Array.from({length:winSize},(_,i)=>winStart+i)

  const featured = page===1&&!isFiltered ? startups.filter(s=>s.is_featured).slice(0,3) : []
  const featIds  = new Set(featured.map(s=>s.id))
  const grid     = page===1&&!isFiltered ? startups.filter(s=>!featIds.has(s.id)) : startups

  const schemas = [
    {"@context":"https://schema.org","@type":"WebSite","name":"UpForge","url":"https://www.upforge.in",
      "potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://www.upforge.in/startup?q={search_term_string}"},"query-input":"required name=search_term_string"}},
    {"@context":"https://schema.org","@type":"CollectionPage","@id":"https://www.upforge.in/startup#cp",
      "name":"Indian Startup Registry 2026","url":"https://www.upforge.in/startup",
      "description":`India's independent registry of ${total.toLocaleString()}+ verified startups across 30+ sectors.`,
      "numberOfItems":total,"inLanguage":"en-IN"},
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://www.upforge.in"},
      {"@type":"ListItem","position":2,"name":"Startup Registry","item":"https://www.upforge.in/startup"},
    ]},
  ]

  return (
    <>
      {schemas.map((s,i)=>(
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

        /* ALL SCOPED — no global reset that would break Navbar */
        .rg { font-family:'EB Garamond',Georgia,serif; color:#1A1208; background:#F2EFE6; min-height:100vh; }

        /* ── SAFFRON ACCENT STRIPE ── */
        .rg-stripe { height:3px; background:linear-gradient(90deg,#E8933A 0%,#C9A84C 50%,#E8933A 100%); }

        /* ── BREADCRUMB ── */
        .rg-bc { background:#FDFCF8; border-bottom:1px solid #D5CEBC; }
        .rg-bc-inner { max-width:1280px; margin:0 auto; padding:0 clamp(16px,4vw,48px); display:flex; align-items:center; gap:6px; height:32px; font-family:system-ui,sans-serif; font-size:10px; color:#9C8B72; list-style:none; }
        .rg-bc-inner a { color:#9C8B72; text-decoration:none; }
        .rg-bc-inner a:hover { color:#1A1208; }
        .rg-bc-sep { color:#D5CEBC; }

        /* ── MASTHEAD ── */
        .rg-mast { background:#F2EFE6; border-bottom:3px solid #1A1208; padding:clamp(20px,3.5vw,44px) clamp(16px,4vw,48px) clamp(16px,3vw,36px); text-align:center; }
        .rg-edition { display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:14px; }
        .rg-edition-line { height:1px; width:48px; background:#C9A84C; }
        .rg-edition-text { font-family:system-ui,sans-serif; font-size:8.5px; font-weight:700; letter-spacing:.4em; text-transform:uppercase; color:#9C8B72; }
        .rg-h1 { font-family:'Playfair Display',serif; font-size:clamp(2.2rem,6vw,5rem); font-weight:900; letter-spacing:-.025em; color:#1A1208; line-height:1.05; margin-bottom:10px; }
        .rg-sub { font-size:clamp(13px,1.5vw,15px); color:#6B5C40; font-style:italic; line-height:1.75; max-width:560px; margin:0 auto 16px; }
        .rg-live { display:inline-flex; align-items:center; gap:6px; font-family:system-ui,sans-serif; font-size:8.5px; font-weight:700; text-transform:uppercase; letter-spacing:.2em; color:#15803D; border:1px solid #86EFAC; background:#F0FDF4; padding:4px 14px; border-radius:999px; margin-bottom:18px; }
        .rg-live-dot { width:6px; height:6px; border-radius:50%; background:#15803D; animation:rg-pulse 2s infinite; }
        @keyframes rg-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

        /* ── STATS BAR ── */
        .rg-stats { display:flex; max-width:600px; margin:0 auto; border:1px solid #1A1208; background:#1A1208; }
        .rg-stat { flex:1; padding:12px 8px; text-align:center; border-right:1px solid rgba(255,255,255,.1); }
        .rg-stat:last-child { border-right:none; }
        .rg-stat-v { font-family:'Playfair Display',serif; font-size:clamp(1.2rem,2.5vw,1.8rem); font-weight:900; color:#fff; line-height:1; margin-bottom:3px; }
        .rg-stat-l { font-family:system-ui,sans-serif; font-size:7px; font-weight:700; text-transform:uppercase; letter-spacing:.18em; color:rgba(255,255,255,.35); }
        @media(max-width:440px){
          .rg-stats{flex-direction:column}
          .rg-stat{border-right:none;border-bottom:1px solid rgba(255,255,255,.1)}
          .rg-stat:last-child{border-bottom:none}
        }

        /* ── TOOLBAR ── */
        .rg-toolbar { background:#FDFCF8; border-bottom:1px solid #D5CEBC; position:sticky; top:0; z-index:30; }
        .rg-toolbar-inner { max-width:1280px; margin:0 auto; padding:0 clamp(16px,4vw,48px); }
        .rg-search-row { display:flex; align-items:stretch; border-bottom:1px solid #EAE4D4; }
        .rg-search-icon { display:flex; align-items:center; padding:0 14px; color:#9C8B72; font-size:15px; flex-shrink:0; }
        .rg-search-inp { flex:1; height:46px; border:none; background:transparent; font-family:'EB Garamond',serif; font-size:15px; color:#1A1208; outline:none; font-style:italic; padding:0; min-width:0; }
        .rg-search-inp::placeholder { color:#9C8B72; }
        .rg-search-btn { height:46px; padding:0 22px; background:#1A1208; color:#fff; border:none; font-family:system-ui,sans-serif; font-size:8.5px; font-weight:900; letter-spacing:.2em; text-transform:uppercase; cursor:pointer; flex-shrink:0; white-space:nowrap; }
        .rg-filter-row { display:flex; align-items:center; height:38px; overflow-x:auto; gap:0; }
        .rg-filter-row::-webkit-scrollbar { display:none; }
        .rg-filter-lbl { font-family:system-ui,sans-serif; font-size:8px; font-weight:700; text-transform:uppercase; letter-spacing:.28em; color:#9C8B72; padding:0 14px; border-right:1px solid #EAE4D4; height:100%; display:flex; align-items:center; flex-shrink:0; white-space:nowrap; }
        .rg-filter-sel { height:100%; border:none; border-right:1px solid #EAE4D4; background:transparent; font-family:system-ui,sans-serif; font-size:11px; color:#1A1208; padding:0 8px; outline:none; cursor:pointer; flex-shrink:0; max-width:130px; }
        .rg-filter-link { height:100%; padding:0 14px; display:flex; align-items:center; font-family:system-ui,sans-serif; font-size:10px; font-weight:700; letter-spacing:.06em; color:#6B5C40; text-decoration:none; border-right:1px solid #EAE4D4; white-space:nowrap; transition:all .15s; flex-shrink:0; }
        .rg-filter-link:hover { background:#F2EFE6; color:#1A1208; }
        .rg-filter-link.on { background:#1A1208; color:#fff; }
        .rg-filter-clear { height:100%; padding:0 14px; display:flex; align-items:center; font-family:system-ui,sans-serif; font-size:9px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#DC2626; text-decoration:none; flex-shrink:0; }
        .rg-filter-clear:hover { text-decoration:underline; }

        /* ── RESULTS BAR ── */
        .rg-results { max-width:1280px; margin:0 auto; padding:10px clamp(16px,4vw,48px); display:flex; align-items:center; gap:10px; border-bottom:1px solid #EAE4D4; }
        .rg-results-q { font-family:'Playfair Display',serif; font-size:1.05rem; font-weight:700; color:#1A1208; }
        .rg-results-n { font-size:13px; color:#6B5C40; font-style:italic; }
        .rg-results-flex { flex:1; }
        .rg-results-pg { font-family:system-ui,sans-serif; font-size:9px; color:#9C8B72; }

        /* ── LAYOUT ── */
        .rg-layout { max-width:1280px; margin:0 auto; padding:clamp(16px,3vw,32px) clamp(16px,4vw,48px) 48px; display:grid; grid-template-columns:1fr 240px; gap:28px; align-items:start; }
        @media(max-width:900px) { .rg-layout { grid-template-columns:1fr !important; } }

        /* ── SECTION HEADER ── */
        .rg-sh { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
        .rg-sh-l { font-family:system-ui,sans-serif; font-size:8px; font-weight:700; text-transform:uppercase; letter-spacing:.32em; color:#9C8B72; white-space:nowrap; }
        .rg-sh-r { flex:1; height:1px; background:#D5CEBC; }

        /* ── FEATURED GRID ── */
        .rg-feat-grid { display:grid; grid-template-columns:repeat(3,1fr); border:1px solid #D5CEBC; margin-bottom:28px; }
        @media(max-width:640px) { .rg-feat-grid { grid-template-columns:1fr !important; } }
        .rg-feat-card { display:flex; flex-direction:column; text-decoration:none; background:#FDFCF8; border-right:1px solid #D5CEBC; overflow:hidden; transition:background .15s; }
        .rg-feat-card:last-child { border-right:none; }
        .rg-feat-card:hover { background:#F2EFE6; }
        .rg-feat-img { width:100%; aspect-ratio:16/9; position:relative; background:#EDE9DC; overflow:hidden; }
        .rg-feat-img img { width:100%; height:100%; object-fit:cover; filter:sepia(15%) contrast(105%); transition:transform .4s; }
        .rg-feat-card:hover .rg-feat-img img { transform:scale(1.04); }
        .rg-feat-ph { width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#EDE9DC,#D5CEBC); }
        .rg-feat-ph-letter { font-family:'Playfair Display',serif; font-size:3.5rem; font-weight:900; color:#C8C2B4; }
        .rg-feat-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(26,18,8,.82) 0%,transparent 55%); }
        .rg-feat-num { position:absolute; top:10px; left:10px; background:#1A1208; color:#fff; font-family:system-ui,sans-serif; font-size:8px; font-weight:900; padding:2px 8px; letter-spacing:.14em; }
        .rg-feat-caption { position:absolute; bottom:0; left:0; right:0; padding:12px; }
        .rg-feat-sector { display:block; font-family:system-ui,sans-serif; font-size:7.5px; font-weight:700; text-transform:uppercase; letter-spacing:.2em; color:rgba(255,255,255,.6); margin-bottom:2px; }
        .rg-feat-name { display:block; font-family:'Playfair Display',serif; font-size:clamp(.9rem,1.2vw,1.05rem); font-weight:700; color:#fff; line-height:1.2; }
        .rg-feat-body { padding:12px; display:flex; flex-direction:column; gap:6px; }
        .rg-feat-desc { font-size:11.5px; color:#6B5C40; font-style:italic; line-height:1.6; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .rg-feat-foot { display:flex; align-items:center; justify-content:space-between; }
        .rg-feat-meta { font-family:system-ui,sans-serif; font-size:8.5px; color:#9C8B72; }
        .rg-feat-arrow { font-size:13px; color:#D5CEBC; }
        .rg-feat-card:hover .rg-feat-arrow { color:#1A1208; }

        /* ── STARTUP GRID (desktop) ── */
        .rg-grid { display:grid; grid-template-columns:repeat(3,1fr); border:1px solid #D5CEBC; background:#EAE4D4; }
        @media(max-width:700px) { .rg-grid { display:none !important; } }
        .rg-card { background:#FDFCF8; padding:14px; display:flex; flex-direction:column; gap:7px; text-decoration:none; border-right:1px solid #EAE4D4; border-bottom:1px solid #EAE4D4; transition:all .15s; position:relative; }
        .rg-card:hover { background:#F2EFE6; transform:translate(-2px,-2px); box-shadow:3px 3px 0 #1A1208; z-index:1; border-color:#1A1208 !important; }
        .rg-card-head { display:flex; align-items:flex-start; gap:10px; }
        .rg-card-logo { width:36px; height:36px; border:1px solid #EAE4D4; background:#F2EFE6; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0; }
        .rg-card-titles { flex:1; min-width:0; }
        .rg-card-name { font-family:'Playfair Display',serif; font-size:clamp(.85rem,.95vw,.95rem); font-weight:700; color:#1A1208; line-height:1.25; margin-bottom:1px; }
        .rg-card:hover .rg-card-name { text-decoration:underline; }
        .rg-card-cat { font-family:system-ui,sans-serif; font-size:8px; color:#9C8B72; text-transform:uppercase; letter-spacing:.1em; }
        .rg-card-check { color:#15803D; flex-shrink:0; margin-top:2px; }
        .rg-card-desc { font-size:11.5px; color:#6B5C40; font-style:italic; line-height:1.6; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .rg-card-founders { font-size:10.5px; color:#9C8B72; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden; }
        .rg-card-foot { display:flex; align-items:center; justify-content:space-between; }
        .rg-card-chips { display:flex; gap:6px; }
        .rg-card-chip { font-family:system-ui,sans-serif; font-size:8.5px; color:#9C8B72; }
        .rg-card-arrow { font-size:13px; color:#D5CEBC; transition:color .15s; }
        .rg-card:hover .rg-card-arrow { color:#1A1208; }

        /* ── MOBILE LIST (LinkedIn style) ── */
        .rg-mob { display:none; border:1px solid #D5CEBC; background:#FDFCF8; }
        @media(max-width:700px) { .rg-mob { display:flex !important; flex-direction:column; } }
        .rg-mob-row { display:flex; align-items:center; gap:12px; padding:12px 14px; text-decoration:none; border-bottom:1px solid #EAE4D4; transition:background .15s; }
        .rg-mob-row:last-child { border-bottom:none; }
        .rg-mob-row:hover { background:#F2EFE6; }
        .rg-mob-logo { width:40px; height:40px; border:1px solid #EAE4D4; background:#F2EFE6; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0; }
        .rg-mob-info { flex:1; min-width:0; }
        .rg-mob-name { font-family:'Playfair Display',serif; font-size:.9rem; font-weight:700; color:#1A1208; line-height:1.2; }
        .rg-mob-meta { font-family:system-ui,sans-serif; font-size:9.5px; color:#9C8B72; margin-top:1px; }
        .rg-mob-desc { font-size:11px; color:#6B5C40; font-style:italic; margin-top:2px; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden; }
        .rg-mob-arrow { font-size:14px; color:#D5CEBC; flex-shrink:0; }

        /* ── EMPTY ── */
        .rg-empty { text-align:center; padding:48px 20px; border:1px dashed #D5CEBC; background:#FDFCF8; }
        .rg-empty-icon { font-family:'Playfair Display',serif; font-size:2.5rem; color:#D5CEBC; display:block; margin-bottom:12px; }
        .rg-empty-h { font-family:'Playfair Display',serif; font-size:1.2rem; color:#1A1208; margin-bottom:6px; }
        .rg-empty-p { font-size:13px; color:#6B5C40; font-style:italic; margin-bottom:16px; }
        .rg-empty-btn { display:inline-block; background:#1A1208; color:#fff; padding:8px 20px; font-family:system-ui,sans-serif; font-size:9px; font-weight:900; text-transform:uppercase; letter-spacing:.18em; text-decoration:none; }

        /* ── PAGINATION ── */
        .rg-pag { display:flex; align-items:center; justify-content:center; gap:4px; margin-top:28px; padding-top:20px; border-top:1px solid #D5CEBC; }
        .rg-pag-btn { padding:6px 14px; font-family:system-ui,sans-serif; font-size:9px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; border:1px solid #D5CEBC; background:#FDFCF8; color:#6B5C40; text-decoration:none; transition:all .15s; }
        .rg-pag-btn:hover { border-color:#1A1208; color:#1A1208; }
        .rg-pag-btn.dis { color:#D5CEBC; pointer-events:none; }
        .rg-pag-num { width:32px; height:32px; display:flex; align-items:center; justify-content:center; font-family:system-ui,sans-serif; font-size:11px; font-weight:700; border:1px solid #D5CEBC; text-decoration:none; color:#6B5C40; transition:all .15s; }
        .rg-pag-num:hover { border-color:#1A1208; color:#1A1208; }
        .rg-pag-num.on { background:#1A1208; color:#fff; border-color:#1A1208; }

        /* ── SIDEBAR ── */
        .rg-side { position:sticky; top:88px; display:flex; flex-direction:column; gap:14px; }
        .rg-side-box { border:1px solid #D5CEBC; background:#FDFCF8; padding:16px; }
        .rg-side-box.dark { background:#1A1208; border-color:#1A1208; }
        .rg-side-ey { font-family:system-ui,sans-serif; font-size:7.5px; font-weight:900; text-transform:uppercase; letter-spacing:.28em; color:#9C8B72; margin-bottom:8px; }
        .rg-side-box.dark .rg-side-ey { color:#E8933A; }
        .rg-side-h { font-family:'Playfair Display',serif; font-size:.9rem; font-weight:700; color:#1A1208; margin-bottom:5px; line-height:1.3; }
        .rg-side-box.dark .rg-side-h { color:#fff; }
        .rg-side-p { font-size:11.5px; color:#6B5C40; font-style:italic; line-height:1.6; margin-bottom:12px; }
        .rg-side-box.dark .rg-side-p { color:rgba(255,255,255,.42); }
        .rg-side-btn { display:block; text-align:center; font-family:system-ui,sans-serif; font-size:8.5px; font-weight:900; text-transform:uppercase; letter-spacing:.2em; background:#fff; color:#1A1208; padding:8px; text-decoration:none; transition:background .15s; }
        .rg-side-btn:hover { background:#E8933A; }
        .rg-side-list { list-style:none; padding:0; margin:0; }
        .rg-side-list li a { display:flex; align-items:center; justify-content:space-between; padding:6px 0; font-size:12px; color:#6B5C40; text-decoration:none; font-style:italic; border-bottom:1px solid #EAE4D4; transition:color .15s; }
        .rg-side-list li:last-child a { border-bottom:none; }
        .rg-side-list li a:hover { color:#1A1208; text-decoration:underline; }

        /* ── CTA ── */
        .rg-cta { background:#1A1208; padding:clamp(20px,3.5vw,36px) clamp(16px,3vw,36px); display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; margin-top:32px; }
        .rg-cta-text {}
        .rg-cta-ey { font-family:system-ui,sans-serif; font-size:7.5px; font-weight:900; text-transform:uppercase; letter-spacing:.3em; color:#E8933A; margin-bottom:5px; }
        .rg-cta-h { font-family:'Playfair Display',serif; font-size:clamp(1rem,1.8vw,1.35rem); font-weight:700; color:#fff; margin-bottom:4px; line-height:1.3; }
        .rg-cta-p { font-size:12px; color:rgba(255,255,255,.42); font-style:italic; }
        .rg-cta-btn { flex-shrink:0; display:inline-flex; align-items:center; gap:6px; background:#fff; color:#1A1208; padding:10px 22px; font-family:system-ui,sans-serif; font-size:9px; font-weight:900; text-transform:uppercase; letter-spacing:.18em; text-decoration:none; transition:background .15s; }
        .rg-cta-btn:hover { background:#E8933A; }
      `}</style>

      <div className="rg">
        <Navbar />
        <div className="rg-stripe" />

        {/* BREADCRUMB */}
        <div className="rg-bc">
          <ol className="rg-bc-inner">
            <li><Link href="/">Home</Link></li>
            <li className="rg-bc-sep">/</li>
            <li style={{color:"#1A1208",fontWeight:600}}>Startup Registry</li>
          </ol>
        </div>

        {/* MASTHEAD */}
        <header className="rg-mast">
          <div className="rg-edition">
            <span className="rg-edition-line" />
            <span className="rg-edition-text">India Edition · 2026</span>
            <span className="rg-edition-line" />
          </div>
          <h1 className="rg-h1">Startup Registry</h1>
          <p className="rg-sub">India's independent registry of verified builders — free, structured, permanent.</p>
          <div className="rg-live">
            <span className="rg-live-dot" />
            Live · {total.toLocaleString()} Profiles · All Verified
          </div>
          <div className="rg-stats">
            {[
              {v:`${total.toLocaleString()}+`,l:"Verified Profiles"},
              {v:`${cats.length||"30"}+`,l:"Sectors"},
              {v:`${years[0]||"2010"}–${new Date().getFullYear()}`,l:"Coverage"},
              {v:"Daily",l:"Updated"},
            ].map((s,i)=>(
              <div key={i} className="rg-stat">
                <div className="rg-stat-v">{s.v}</div>
                <div className="rg-stat-l">{s.l}</div>
              </div>
            ))}
          </div>
        </header>

        {/* TOOLBAR — HTML form for SEO-safe search */}
        <div className="rg-toolbar">
          <div className="rg-toolbar-inner">
            <form action="/startup" method="GET" className="rg-search-row">
              {year && <input type="hidden" name="year" value={year} />}
              {cat  && <input type="hidden" name="category" value={cat} />}
              {sort && sort!=="name" && <input type="hidden" name="sort" value={sort} />}
              <span className="rg-search-icon" aria-hidden="true">⌕</span>
              <input type="search" name="q" defaultValue={q} className="rg-search-inp"
                placeholder="Search startups, founders, sectors, cities…" aria-label="Search" autoComplete="off" />
              <button type="submit" className="rg-search-btn">Search →</button>
            </form>
            <div className="rg-filter-row">
              <span className="rg-filter-lbl">Filter</span>
              {/* Year — form submit */}
              <form action="/startup" method="GET" style={{display:"contents"}}>
                {q    && <input type="hidden" name="q" value={q} />}
                {cat  && <input type="hidden" name="category" value={cat} />}
                {sort && sort!=="name" && <input type="hidden" name="sort" value={sort} />}
                <select name="year" defaultValue={year} className="rg-filter-sel" aria-label="Year">
                  <option value="">Any Year</option>
                  {years.map(yr=><option key={yr} value={String(yr)}>{yr}</option>)}
                </select>
                <button type="submit" style={{display:"none"}} />
              </form>
              {/* Category */}
              <form action="/startup" method="GET" style={{display:"contents"}}>
                {q    && <input type="hidden" name="q" value={q} />}
                {year && <input type="hidden" name="year" value={year} />}
                {sort && sort!=="name" && <input type="hidden" name="sort" value={sort} />}
                <select name="category" defaultValue={cat} className="rg-filter-sel" aria-label="Sector">
                  <option value="">All Sectors</option>
                  {cats.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
                <button type="submit" style={{display:"none"}} />
              </form>
              {/* Sort */}
              <Link href={qs({sort:"name",page:undefined})} className={`rg-filter-link${sort==="name"?" on":""}`}>A–Z</Link>
              <Link href={qs({sort:"newest",page:undefined})} className={`rg-filter-link${sort==="newest"?" on":""}`}>Newest</Link>
              <Link href={qs({sort:"year",page:undefined})} className={`rg-filter-link${sort==="year"?" on":""}`}>Founded</Link>
              {isFiltered && <Link href="/startup" className="rg-filter-clear">✕ Clear all</Link>}
            </div>
          </div>
        </div>

        {/* RESULTS BAR */}
        <div className="rg-results" aria-live="polite">
          <span className="rg-results-q">{q?`"${q}"`:cat?cat:year?`Est. ${year}`:"All Startups"}</span>
          <span className="rg-results-n">— {total.toLocaleString()} profiles</span>
          <span className="rg-results-flex" />
          <span className="rg-results-pg">Pg. {page} / {totalPages}</span>
        </div>

        {/* MAIN LAYOUT */}
        <div className="rg-layout">
          <div>
            {/* FEATURED */}
            {featured.length > 0 && (
              <section style={{marginBottom:24}} aria-label="Featured startups">
                <div className="rg-sh">
                  <span style={{color:"#E8933A",fontSize:10,marginRight:2}}>✦</span>
                  <span className="rg-sh-l">Featured This Edition</span>
                  <span className="rg-sh-r" />
                </div>
                <div className="rg-feat-grid">
                  {featured.map((s,fi)=>(
                    <Link key={s.id} href={`/startup/${s.slug}`} className="rg-feat-card">
                      <div className="rg-feat-img">
                        {s.logo_url
                          ? <img src={s.logo_url} alt={s.name} loading={fi===0?"eager":"lazy"} />
                          : <div className="rg-feat-ph"><span className="rg-feat-ph-letter">{s.name.charAt(0)}</span></div>
                        }
                        <div className="rg-feat-overlay" />
                        <span className="rg-feat-num">No.{String(fi+1).padStart(2,"0")}</span>
                        <div className="rg-feat-caption">
                          <span className="rg-feat-sector">{s.category||"Startup"}</span>
                          <span className="rg-feat-name">{s.name}</span>
                        </div>
                      </div>
                      <div className="rg-feat-body">
                        <p className="rg-feat-desc">{s.description||"Building for India's next decade."}</p>
                        <div className="rg-feat-foot">
                          <span className="rg-feat-meta">{s.founded_year&&`Est. ${s.founded_year}`}{s.city&&` · ${s.city}`}</span>
                          <span className="rg-feat-arrow">↗</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* GRID */}
            {grid.length > 0 ? (
              <section aria-label="All startups">
                {featured.length>0 && (
                  <div className="rg-sh"><span className="rg-sh-l">All Startups</span><span className="rg-sh-r" /></div>
                )}
                {/* Desktop */}
                <div className="rg-grid">
                  {grid.map(s=>(
                    <Link key={s.id} href={`/startup/${s.slug}`} className="rg-card">
                      <div className="rg-card-head">
                        <div className="rg-card-logo">
                          {s.logo_url
                            ? <Image src={s.logo_url} alt={s.name} width={36} height={36} className="object-contain" loading="lazy" />
                            : <span style={{fontSize:14,fontWeight:700,color:"#9C8B72",fontFamily:"'Playfair Display',serif"}}>{s.name.charAt(0)}</span>
                          }
                        </div>
                        <div className="rg-card-titles">
                          <div className="rg-card-name">{s.name}</div>
                          <div className="rg-card-cat">{(s.category||"").slice(0,20)}</div>
                        </div>
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" className="rg-card-check" aria-label="Verified"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#15803D" strokeWidth="1.4" strokeLinecap="round"/></svg>
                      </div>
                      <p className="rg-card-desc">{s.description||"Building for India's next decade."}</p>
                      {s.founders && <p className="rg-card-founders">↳ {s.founders}</p>}
                      <div className="rg-card-foot">
                        <div className="rg-card-chips">
                          {s.founded_year && <span className="rg-card-chip">Est. {s.founded_year}</span>}
                          {s.city && <span className="rg-card-chip">· {s.city}</span>}
                        </div>
                        <span className="rg-card-arrow">↗</span>
                      </div>
                    </Link>
                  ))}
                </div>
                {/* Mobile LinkedIn-style */}
                <div className="rg-mob">
                  {grid.map(s=>(
                    <Link key={s.id} href={`/startup/${s.slug}`} className="rg-mob-row">
                      <div className="rg-mob-logo">
                        {s.logo_url
                          ? <Image src={s.logo_url} alt={s.name} width={40} height={40} className="object-contain" loading="lazy" />
                          : <span style={{fontSize:14,fontWeight:700,color:"#9C8B72",fontFamily:"'Playfair Display',serif"}}>{s.name.charAt(0)}</span>
                        }
                      </div>
                      <div className="rg-mob-info">
                        <div className="rg-mob-name">{s.name}</div>
                        <div className="rg-mob-meta">{s.category||"Startup"}{s.founded_year&&` · ${s.founded_year}`}{s.city&&` · ${s.city}`}</div>
                        {s.description && <div className="rg-mob-desc">{s.description}</div>}
                      </div>
                      <span className="rg-mob-arrow">›</span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : (
              <div className="rg-empty">
                <span className="rg-empty-icon">∅</span>
                <h3 className="rg-empty-h">No startups found</h3>
                <p className="rg-empty-p">{q?`Nothing matched "${q}". Try a different term.`:"Try adjusting your filters."}</p>
                <Link href="/startup" className="rg-empty-btn">Clear filters</Link>
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <nav className="rg-pag" aria-label="Pagination">
                <Link href={pgHref(page-1)} className={`rg-pag-btn${page===1?" dis":""}`} aria-disabled={page===1}>← Prev</Link>
                {pgNums.map(p=>(
                  <Link key={p} href={pgHref(p)} className={`rg-pag-num${p===page?" on":""}`} aria-current={p===page?"page":undefined}>{p}</Link>
                ))}
                <Link href={pgHref(page+1)} className={`rg-pag-btn${page===totalPages?" dis":""}`} aria-disabled={page===totalPages}>Next →</Link>
              </nav>
            )}

            {/* CTA */}
            <div className="rg-cta">
              <div className="rg-cta-text">
                <div className="rg-cta-ey">UpForge Registry</div>
                <div className="rg-cta-h">Your founder story starts with a verified profile.</div>
                <div className="rg-cta-p">Free forever. Trusted by investors and press across India.</div>
              </div>
              <Link href="/submit" className="rg-cta-btn">List Free →</Link>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="rg-side">
            <div className="rg-side-box dark">
              <div className="rg-side-ey">List Free</div>
              <div className="rg-side-h">Got a startup to list?</div>
              <div className="rg-side-p">Get independently verified. Free forever.</div>
              <Link href="/submit" className="rg-side-btn">Submit Startup →</Link>
            </div>
            {cats.length > 0 && (
              <div className="rg-side-box">
                <div className="rg-side-ey">Browse by Sector</div>
                <ul className="rg-side-list">
                  {cats.slice(0,10).map(c=>(
                    <li key={c}>
                      <Link href={`/startups/${c.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")}`}>
                        <span>{c}</span><span style={{color:"#D5CEBC"}}>›</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {cats.length > 10 && (
                  <Link href="/startups" style={{display:"block",marginTop:8,paddingTop:8,borderTop:"1px solid #EAE4D4",fontFamily:"system-ui,sans-serif",fontSize:"8px",fontWeight:700,textTransform:"uppercase",letterSpacing:".18em",color:"#9C8B72",textDecoration:"none"}}>
                    All {cats.length} sectors →
                  </Link>
                )}
              </div>
            )}
          </aside>
        </div>

        <Footer />
      </div>
    </>
  )
}
