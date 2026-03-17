// app/startup/page.tsx — FINAL PRODUCTION v5
// ─────────────────────────────────────────────────────────────────────────────
// Design: exact blog/about page pattern
//   • NO global CSS reset — all styles scoped to .reg-* classes
//   • Playfair Display 900 headings, Georgia body — same as blog page
//   • #F3EFE5 parchment bg, #1A1208 ink, #E8C547 gold, #C8C2B4 rules
//   • Section headers: .sh pattern (8px ALL CAPS + rule line)
//   • Card hover: translate(-2px,-2px) + 4px 4px 0 #1A1208 shadow
//   • <Navbar /> import — no page-level nav (Navbar handles itself)
//   • Page-level footer (NO <Footer /> import — avoids double footer)
//   • Mobile: LinkedIn-style single-column list at <640px
//   • Search: HTML form GET — SEO crawlable, no JS required
//   • Stats bar: NO "Coverage" stat — shows real dynamic data only
//   • SEO: WebSite SearchAction schema, long-tail keywords, ISR 5min
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { ArrowRight, ArrowUpRight } from "lucide-react"

const PAGE_SIZE = 18

interface StartupRow {
  id:string; name:string; slug:string
  description?:string|null; logo_url?:string|null
  founders?:string|null; founded_year?:number|null
  category?:string|null; city?:string|null; is_featured?:boolean
}
interface PageProps {
  searchParams?: Promise<{ page?:string; q?:string; year?:string; sort?:string; category?:string }>
}

async function getData(q:string,year:string,sort:string,cat:string,page:number) {
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
  const {total} = await getData("","","name","",1)
  const n = total>0?total.toLocaleString():"1,000+"
  const isFiltered = !!(sp?.q||sp?.year||sp?.sort||sp?.category)
  const page = Number(sp?.page??1)
  return {
    title:`Indian Startup Registry 2026 — ${n}+ Verified Indian Startups | UpForge`,
    description:`Discover ${n}+ verified Indian startups across AI, FinTech, SaaS, EdTech, HealthTech, Climate Tech, AgriTech, Web3 and 30+ sectors. Search by founder, city, year. India's most trusted free startup database — updated daily.`,
    keywords:"Indian startups 2026, startup registry India, verified startups India, AI startups India, fintech startups India, SaaS startups India, edtech startups India, healthtech India, startup founders India, Bengaluru startups, Mumbai startups, Delhi NCR startups, Indian unicorns 2026",
    alternates:{canonical:"https://www.upforge.in/startup"},
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
    getData(q,year,sort,cat,page),
    getFilters(),
  ])
  const totalPages = Math.max(1,Math.ceil(total/PAGE_SIZE))
  const isFiltered = !!(q||year||cat||(sort&&sort!=="name"))

  const qs = (ov:Record<string,string|undefined>)=>{
    const base:{[k:string]:string|undefined}={q:q||undefined,year:year||undefined,sort:sort!=="name"?sort:undefined,category:cat||undefined,page:page>1?String(page):undefined}
    const m={...base,...ov}; const p=new URLSearchParams()
    Object.entries(m).forEach(([k,v])=>{ if(v) p.set(k,v) })
    const s=p.toString(); return `/startup${s?`?${s}`:""}`
  }
  const pgHref=(p:number)=>qs({page:p===1?undefined:String(p)})
  const winSize=Math.min(5,totalPages)
  const winStart=page<=3||totalPages<=5?1:page>=totalPages-2?totalPages-4:page-2
  const pgNums=Array.from({length:winSize},(_,i)=>winStart+i)

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
      {"@type":"ListItem","position":1,"name":"UpForge","item":"https://www.upforge.in"},
      {"@type":"ListItem","position":2,"name":"Startup Registry","item":"https://www.upforge.in/startup"},
    ]},
  ]

  const catSlug = (c:string) => c.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")

  return (
    <>
      {schemas.map((s,i)=>(
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

        /* ALL SCOPED — zero global reset */
        .pf{font-family:'Playfair Display',Georgia,serif !important}

        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .a0{animation:fadeUp .38s .00s ease both}
        .a1{animation:fadeUp .38s .07s ease both}
        .a2{animation:fadeUp .38s .14s ease both}
        .a3{animation:fadeUp .38s .20s ease both}
        .a4{animation:fadeUp .38s .27s ease both}

        /* Section header — exact blog/about pattern */
        .reg-sh{display:flex;align-items:center;gap:10px;margin-bottom:14px}
        .reg-sh-l{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.3em;color:#AAA;font-family:system-ui,sans-serif;white-space:nowrap}
        .reg-sh-r{flex:1;height:1px;background:#D8D2C4}

        /* Card hover — exact blog/about .hc pattern */
        .reg-hc{transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease}
        .reg-hc:hover{transform:translate(-2px,-2px);box-shadow:4px 4px 0 #1A1208;border-color:#1A1208 !important;z-index:1;position:relative}

        /* Image hover zoom */
        .reg-imgf{position:relative;overflow:hidden}
        .reg-imgf img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;transition:transform .5s ease}
        .reg-imgf:hover img{transform:scale(1.04)}

        /* Masthead */
        .reg-mast{background:#F3EFE5;border-bottom:3px solid #1A1208}
        .reg-mast-inner{text-align:center;padding:clamp(24px,4vw,52px) 16px clamp(16px,3vw,36px);max-width:1300px;margin:0 auto;border-bottom:1px solid #C8C2B4}

        /* Stats bar — blog/about pattern */
        .reg-stats{display:flex;background:#1A1208;max-width:600px;margin:0 auto}
        .reg-stat{flex:1;padding:14px 8px;text-align:center;border-right:1px solid rgba(255,255,255,.08)}
        .reg-stat:last-child{border-right:none}
        .reg-stat-v{font-family:'Playfair Display',serif;font-size:clamp(1.2rem,2.5vw,1.9rem);font-weight:900;color:#fff;line-height:1;margin-bottom:3px}
        .reg-stat-l{font-family:system-ui,sans-serif;font-size:7px;font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:rgba(255,255,255,.32)}
        @media(max-width:440px){
          .reg-stats{flex-direction:column}
          .reg-stat{border-right:none;border-bottom:1px solid rgba(255,255,255,.08)}
          .reg-stat:last-child{border-bottom:none}
        }

        /* Tab strip — exact blog/about pattern */
        .reg-tabs{display:flex;overflow-x:auto;border-bottom:1px solid #C8C2B4;scrollbar-width:none}
        .reg-tabs::-webkit-scrollbar{display:none}
        .reg-tab{flex-shrink:0;padding:11px 16px;font-family:system-ui,sans-serif;font-size:8.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#888;text-decoration:none;border-bottom:2.5px solid transparent;transition:all .15s;white-space:nowrap}
        .reg-tab:hover{color:#1A1208}
        .reg-tab.on{color:#B45309;border-bottom-color:#B45309}

        /* Toolbar */
        .reg-toolbar{background:#FDFCF9;border-bottom:1px solid #C8C2B4;position:sticky;top:0;z-index:30}
        .reg-toolbar-inner{max-width:1300px;margin:0 auto;padding:0 clamp(16px,4vw,48px)}
        .reg-search-row{display:flex;align-items:stretch;border-bottom:1px solid #EDE9DF}
        .reg-search-icon{display:flex;align-items:center;padding:0 14px;color:#C8C2B4;font-size:16px;flex-shrink:0}
        .reg-search-inp{flex:1;height:46px;border:none;background:transparent;font-family:Georgia,serif;font-size:15px;color:#1A1208;outline:none;font-style:italic;padding:0;min-width:0}
        .reg-search-inp::placeholder{color:#C8C2B4}
        .reg-search-btn{height:46px;padding:0 22px;background:#1A1208;color:#fff;border:none;font-family:system-ui,sans-serif;font-size:8.5px;font-weight:900;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;flex-shrink:0;white-space:nowrap}
        .reg-filter-row{display:flex;align-items:center;height:38px;overflow-x:auto}
        .reg-filter-row::-webkit-scrollbar{display:none}
        .reg-filter-lbl{font-family:system-ui,sans-serif;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.28em;color:#C8C2B4;padding:0 14px;border-right:1px solid #EDE9DF;height:100%;display:flex;align-items:center;flex-shrink:0;white-space:nowrap}
        .reg-filter-sel{height:100%;border:none;border-right:1px solid #EDE9DF;background:transparent;font-family:system-ui,sans-serif;font-size:11px;color:#1A1208;padding:0 8px;outline:none;cursor:pointer;flex-shrink:0;max-width:130px}
        .reg-filter-link{height:100%;padding:0 14px;display:flex;align-items:center;font-family:system-ui,sans-serif;font-size:8.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#6B5C40;text-decoration:none;border-right:1px solid #EDE9DF;white-space:nowrap;transition:all .15s;flex-shrink:0}
        .reg-filter-link:hover{background:#F3EFE5;color:#1A1208}
        .reg-filter-link.on{background:#1A1208;color:#fff}
        .reg-filter-clear{height:100%;padding:0 14px;display:flex;align-items:center;font-family:system-ui,sans-serif;font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#DC2626;text-decoration:none;flex-shrink:0}

        /* Results bar */
        .reg-results-bar{max-width:1300px;margin:0 auto;padding:10px clamp(16px,4vw,48px);display:flex;align-items:center;gap:10px;border-bottom:1px solid #D8D2C4}
        .reg-results-q{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:700;color:#1A1208}
        .reg-results-n{font-size:13px;color:#6B5C40;font-style:italic}
        .reg-results-rule{flex:1;height:1px;background:#D8D2C4}
        .reg-results-pg{font-family:system-ui,sans-serif;font-size:9px;color:#AAA}

        /* Main layout */
        .reg-main{max-width:1300px;margin:0 auto;padding:clamp(16px,3vw,32px) clamp(16px,4vw,48px) 0}
        .reg-layout{display:grid;grid-template-columns:1fr 300px;gap:clamp(16px,2.5vw,28px);align-items:start}
        @media(max-width:1000px){.reg-layout{grid-template-columns:1fr !important}}

        /* Featured hero grid */
        .reg-feat-grid{display:grid;grid-template-columns:repeat(3,1fr);border:1.5px solid #1A1208;background:#1A1208;gap:1.5px;margin-bottom:clamp(18px,3vw,28px)}
        @media(max-width:700px){.reg-feat-grid{grid-template-columns:1fr !important}}
        .reg-feat-card{background:#FDFCF9;display:flex;flex-direction:column;text-decoration:none;transition:background .15s}
        .reg-feat-card:hover{background:#F3EFE5}
        .reg-feat-img{width:100%;aspect-ratio:16/9;position:relative;background:#EDE9DF;overflow:hidden;flex-shrink:0}
        .reg-feat-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:sepia(12%) contrast(105%);transition:transform .5s}
        .reg-feat-card:hover .reg-feat-img img{transform:scale(1.04)}
        .reg-feat-ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#EDE9DF,#C8C2B4)}
        .reg-feat-ph-l{font-family:'Playfair Display',serif;font-size:3.5rem;font-weight:900;color:#AAA}
        .reg-feat-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(26,18,8,.82) 0%,transparent 55%)}
        .reg-feat-num{position:absolute;top:10px;left:10px;background:#1A1208;color:#fff;font-family:system-ui,sans-serif;font-size:7.5px;font-weight:900;padding:2px 8px;letter-spacing:.14em}
        .reg-feat-caption{position:absolute;bottom:0;left:0;right:0;padding:12px}
        .reg-feat-sector{display:block;font-family:system-ui,sans-serif;font-size:7px;font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:rgba(255,255,255,.55);margin-bottom:2px}
        .reg-feat-name{display:block;font-family:'Playfair Display',serif;font-size:clamp(.88rem,1.2vw,1.05rem);font-weight:700;color:#fff;line-height:1.2}
        .reg-feat-body{padding:12px;flex:1;display:flex;flex-direction:column;gap:6px}
        .reg-feat-desc{font-size:11.5px;color:#5A4A30;font-style:italic;line-height:1.65;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;flex:1}
        .reg-feat-foot{display:flex;align-items:center;justify-content:space-between;padding-top:8px;border-top:1px solid #D8D2C4;margin-top:auto}
        .reg-feat-meta{font-family:system-ui,sans-serif;font-size:8.5px;color:#AAA}

        /* All startups grid */
        .reg-grid{display:grid;grid-template-columns:repeat(3,1fr);border:1.5px solid #1A1208;background:#1A1208;gap:1.5px}
        @media(max-width:800px){.reg-grid{grid-template-columns:repeat(2,1fr) !important}}
        @media(max-width:500px){.reg-grid{display:none !important}}
        .reg-card{background:#FDFCF9;padding:14px;display:flex;flex-direction:column;gap:7px;text-decoration:none;transition:all .15s;position:relative}
        .reg-card:hover{background:#F3EFE5;transform:translate(-2px,-2px);box-shadow:4px 4px 0 #1A1208;z-index:1;border-color:#1A1208 !important}
        .reg-card-head{display:flex;align-items:flex-start;gap:10px}
        .reg-card-logo{width:36px;height:36px;border:1px solid #D8D2C4;background:#F3EFE5;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0}
        .reg-card-titles{flex:1;min-width:0}
        .reg-card-name{font-family:'Playfair Display',serif;font-size:clamp(.86rem,1vw,.95rem);font-weight:700;color:#1A1208;line-height:1.25;margin-bottom:1px}
        .reg-card:hover .reg-card-name{text-decoration:underline}
        .reg-card-cat{font-family:system-ui,sans-serif;font-size:8px;color:#AAA;text-transform:uppercase;letter-spacing:.1em}
        .reg-card-desc{font-size:11.5px;color:#5A4A30;font-style:italic;line-height:1.6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .reg-card-founders{font-size:10.5px;color:#AAA;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
        .reg-card-foot{display:flex;align-items:center;justify-content:space-between;margin-top:auto}
        .reg-card-chips{display:flex;gap:6px;font-family:system-ui,sans-serif;font-size:8.5px;color:#AAA}
        .reg-verified{display:flex;align-items:center;gap:3px;font-family:system-ui,sans-serif;font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:#15803D}

        /* Mobile list — LinkedIn style */
        .reg-mob{display:none;border:1.5px solid #1A1208;background:#FDFCF9;flex-direction:column}
        @media(max-width:500px){.reg-mob{display:flex !important}}
        .reg-mob-row{display:flex;align-items:center;gap:12px;padding:13px 14px;text-decoration:none;border-bottom:1px solid #D8D2C4;transition:background .15s}
        .reg-mob-row:last-child{border-bottom:none}
        .reg-mob-row:hover{background:#F3EFE5}
        .reg-mob-logo{width:40px;height:40px;border:1px solid #D8D2C4;background:#F3EFE5;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0}
        .reg-mob-info{flex:1;min-width:0}
        .reg-mob-name{font-family:'Playfair Display',serif;font-size:.9rem;font-weight:700;color:#1A1208;line-height:1.2}
        .reg-mob-meta{font-family:system-ui,sans-serif;font-size:9.5px;color:#AAA;margin-top:1px}
        .reg-mob-desc{font-size:11px;color:#5A4A30;font-style:italic;margin-top:2px;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}

        /* Empty state */
        .reg-empty{text-align:center;padding:52px 20px;border:1.5px dashed #C8C2B4;background:#FDFCF9}
        .reg-empty-icon{font-family:'Playfair Display',serif;font-size:2.8rem;color:#C8C2B4;display:block;margin-bottom:12px}
        .reg-empty-h{font-family:'Playfair Display',serif;font-size:1.2rem;color:#1A1208;margin-bottom:6px;font-weight:700}
        .reg-empty-p{font-size:13px;color:#5A4A30;font-style:italic;margin-bottom:16px}

        /* Pagination */
        .reg-pag{display:flex;align-items:center;justify-content:center;gap:4px;margin-top:clamp(20px,3vw,32px);padding-top:clamp(16px,2.5vw,24px);border-top:1px solid #D8D2C4}
        .reg-pag-btn{padding:6px 16px;font-family:system-ui,sans-serif;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border:1px solid #C8C2B4;background:#FDFCF9;color:#6B5C40;text-decoration:none;transition:all .15s}
        .reg-pag-btn:hover{border-color:#1A1208;color:#1A1208}
        .reg-pag-btn.dis{color:#C8C2B4;pointer-events:none}
        .reg-pag-num{width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif;font-size:11px;font-weight:700;border:1px solid #C8C2B4;text-decoration:none;color:#6B5C40;transition:all .15s}
        .reg-pag-num:hover{border-color:#1A1208;color:#1A1208}
        .reg-pag-num.on{background:#1A1208;color:#fff;border-color:#1A1208}

        /* Sidebar */
        .reg-side{display:flex;flex-direction:column;gap:14px}
        .reg-side-box{border:1.5px solid #1A1208;background:#FDFCF9;padding:18px}
        .reg-side-box.dk{background:#1A1208}
        .reg-side-ey{font-family:system-ui,sans-serif;font-size:7.5px;font-weight:900;text-transform:uppercase;letter-spacing:.28em;color:#AAA;margin-bottom:8px}
        .reg-side-box.dk .reg-side-ey{color:#E8C547}
        .reg-side-h{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700;color:#1A1208;margin-bottom:5px;line-height:1.3}
        .reg-side-box.dk .reg-side-h{color:#fff}
        .reg-side-p{font-size:11.5px;color:#5A4A30;font-style:italic;line-height:1.65;margin-bottom:12px}
        .reg-side-box.dk .reg-side-p{color:rgba(255,255,255,.38)}
        .reg-side-btn{display:block;text-align:center;font-family:system-ui,sans-serif;font-size:8.5px;font-weight:900;text-transform:uppercase;letter-spacing:.2em;background:#fff;color:#1A1208;padding:9px;text-decoration:none;transition:background .15s}
        .reg-side-btn:hover{background:#E8C547}
        .reg-side-list{list-style:none;padding:0;margin:0}
        .reg-side-list li{border-bottom:1px solid #D8D2C4}
        .reg-side-list li:last-child{border-bottom:none}
        .reg-side-list a{display:flex;align-items:center;justify-content:space-between;padding:7px 0;font-size:12.5px;color:#5A4A30;text-decoration:none;font-style:italic;transition:color .15s}
        .reg-side-list a:hover{color:#1A1208;text-decoration:underline}

        /* CTA block — blog/about pattern */
        .reg-cta{background:#1A1208;padding:clamp(20px,3.5vw,36px) clamp(16px,3vw,36px);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px;margin-top:clamp(20px,3.5vw,32px);position:relative;overflow:hidden}
        .reg-cta::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#92400E,#D97706,#E8C547,#D97706,#92400E)}
        .reg-cta-ey{font-family:system-ui,sans-serif;font-size:7.5px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(232,197,71,.65);margin-bottom:6px}
        .reg-cta-h{font-family:'Playfair Display',serif;font-size:clamp(1rem,2vw,1.4rem);font-weight:700;color:#fff;margin-bottom:4px;line-height:1.25}
        .reg-cta-p{font-size:12px;color:rgba(255,255,255,.38);font-style:italic}
        .reg-cta-btn{flex-shrink:0;display:inline-flex;align-items:center;gap:6px;background:#D97706;color:#1A1208;padding:12px 24px;font-family:system-ui,sans-serif;font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:.14em;text-decoration:none;transition:opacity .15s;box-shadow:3px 3px 0 #92400E}
        .reg-cta-btn:hover{opacity:.88}

        /* Internal links grid — exact blog/about pattern */
        .reg-links-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
        @media(max-width:800px){.reg-links-grid{grid-template-columns:repeat(2,1fr) !important}}
        .reg-link-card{display:flex;flex-direction:column;gap:4px;padding:11px 12px;border:1px solid #D8D2C4;background:#FDFCF9;text-decoration:none;transition:border-color .15s}
        .reg-link-card:hover{border-color:#1A1208}
        .reg-link-title{font-family:system-ui,sans-serif;font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#1A1208}
        .reg-link-desc{font-family:system-ui,sans-serif;font-size:8.5px;color:#AAA}

        /* Footer — exact blog/about pattern */
        .reg-footer{border-top:1px solid #D8D2C4;padding-top:1rem;margin-top:clamp(20px,3vw,32px);padding-bottom:8px}
        .reg-footer-note{font-family:system-ui,sans-serif;font-size:8.5px;color:#BBB0A0;line-height:1.75}
        .reg-footer-nav{display:flex;flex-wrap:wrap;gap:6px 14px;list-style:none;margin:12px 0 0;padding:0}
        .reg-footer-nav a{font-family:system-ui,sans-serif;font-size:8.5px;color:#AAA;text-transform:uppercase;letter-spacing:.1em;text-decoration:none;transition:color .15s}
        .reg-footer-nav a:hover{color:#1A1208}
      `}</style>

      {/* ── MASTHEAD — exact blog/about pattern ── */}
      <Navbar />
      <header className="reg-mast a0" role="banner">
        <div className="reg-mast-inner">
          {/* Eyebrow + edition */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:16}}>
            <div style={{height:1,width:48,background:"#C8C2B4"}} />
            <p style={{fontFamily:"system-ui,sans-serif",fontSize:8.5,fontWeight:700,letterSpacing:".4em",textTransform:"uppercase",color:"#AAA"}}>India Edition · 2026</p>
            <div style={{height:1,width:48,background:"#C8C2B4"}} />
          </div>

          <h1 className="pf" style={{fontSize:"clamp(2.2rem,6vw,5rem)",fontWeight:900,letterSpacing:"-.025em",color:"#1A1208",lineHeight:1.05,marginBottom:10}}>
            Startup Registry
          </h1>
          <p style={{fontSize:"clamp(13px,1.6vw,15px)",color:"#6B5C40",fontStyle:"italic",lineHeight:1.75,maxWidth:560,margin:"0 auto 16px"}}>
            India's independent registry of verified builders — free, structured, permanent.
          </p>

          {/* Live badge */}
          <div style={{display:"inline-flex",alignItems:"center",gap:6,fontFamily:"system-ui,sans-serif",fontSize:8.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".2em",color:"#15803D",border:"1px solid #86EFAC",background:"#F0FDF4",padding:"4px 14px",borderRadius:999,marginBottom:20}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#15803D",animation:"fadeUp .5s infinite alternate"}} />
            Live · {total.toLocaleString()} Profiles · All Verified
          </div>

          {/* Stats */}
          <div className="reg-stats">
            {[
              {v:`${total.toLocaleString()}+`,l:"Verified Profiles"},
              {v:`${cats.length||"30"}+`,l:"Sectors"},
              {v:`${years.length>0?years[years.length-1]:"2010"}+`,l:"Founding Since"},
              {v:"Daily",l:"Updated"},
            ].map((s,i)=>(
              <div key={i} className="reg-stat">
                <p className="reg-stat-v">{s.v}</p>
                <p className="reg-stat-l">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tab strip — category quick-jump */}
        <nav className="reg-tabs a1" aria-label="Browse by sector" style={{padding:"0 clamp(16px,4vw,48px)"}}>
          <span style={{fontFamily:"system-ui,sans-serif",fontSize:7.5,color:"#BBB",textTransform:"uppercase",letterSpacing:".2em",padding:"11px 6px 11px 0",flexShrink:0,display:"inline-flex",alignItems:"center"}}>Browse:</span>
          <Link href="/startup" className={`reg-tab${!cat&&!q?" on":""}`}>All</Link>
          {cats.slice(0,8).map(c=>(
            <Link key={c} href={qs({category:c,page:undefined})} className={`reg-tab${cat===c?" on":""}`}>{c}</Link>
          ))}
          {cats.length>8 && <Link href="/startups" className="reg-tab">More Sectors →</Link>}
        </nav>
      </header>

      {/* ── SEARCH TOOLBAR ── */}
      <div className="reg-toolbar a1">
        <div className="reg-toolbar-inner">
          <form action="/startup" method="GET" className="reg-search-row">
            {year && <input type="hidden" name="year" value={year} />}
            {cat  && <input type="hidden" name="category" value={cat} />}
            {sort && sort!=="name" && <input type="hidden" name="sort" value={sort} />}
            <span className="reg-search-icon" aria-hidden="true">⌕</span>
            <input type="search" name="q" defaultValue={q} className="reg-search-inp"
              placeholder="Search startups, founders, sectors, cities…" aria-label="Search startup registry" autoComplete="off" />
            <button type="submit" className="reg-search-btn">Search →</button>
          </form>
          <div className="reg-filter-row">
            <span className="reg-filter-lbl">Filter</span>
            <form action="/startup" method="GET" style={{display:"contents"}}>
              {q   && <input type="hidden" name="q" value={q} />}
              {cat && <input type="hidden" name="category" value={cat} />}
              {sort&&sort!=="name" && <input type="hidden" name="sort" value={sort} />}
              <select name="year" defaultValue={year} className="reg-filter-sel" aria-label="Year">
                <option value="">Any Year</option>
                {years.map(yr=><option key={yr} value={String(yr)}>{yr}</option>)}
              </select>
              <button type="submit" style={{display:"none"}} />
            </form>
            <form action="/startup" method="GET" style={{display:"contents"}}>
              {q    && <input type="hidden" name="q" value={q} />}
              {year && <input type="hidden" name="year" value={year} />}
              {sort&&sort!=="name" && <input type="hidden" name="sort" value={sort} />}
              <select name="category" defaultValue={cat} className="reg-filter-sel" aria-label="Sector">
                <option value="">All Sectors</option>
                {cats.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              <button type="submit" style={{display:"none"}} />
            </form>
            <Link href={qs({sort:"name",page:undefined})} className={`reg-filter-link${sort==="name"?" on":""}`}>A–Z</Link>
            <Link href={qs({sort:"newest",page:undefined})} className={`reg-filter-link${sort==="newest"?" on":""}`}>Newest</Link>
            <Link href={qs({sort:"year",page:undefined})} className={`reg-filter-link${sort==="year"?" on":""}`}>Founded Year</Link>
            {isFiltered && <Link href="/startup" className="reg-filter-clear">✕ Clear</Link>}
          </div>
        </div>
      </div>

      {/* ── RESULTS BAR ── */}
      <div className="reg-results-bar a2" aria-live="polite">
        <span className="reg-results-q">{q?`"${q}"`:cat?cat:year?`Est. ${year}`:"All Startups"}</span>
        <span className="reg-results-n">— {total.toLocaleString()} profiles</span>
        <span className="reg-results-rule" />
        <span className="reg-results-pg">Pg. {page} / {totalPages||1}</span>
      </div>

      {/* ── MAIN ── */}
      <div className="reg-main a2">
        <div className="reg-layout">

          {/* ── CONTENT COLUMN ── */}
          <div>
            {/* FEATURED */}
            {featured.length>0 && (
              <section aria-label="Featured startups" style={{marginBottom:"clamp(18px,3vw,28px)"}}>
                <div className="reg-sh">
                  <span style={{color:"#B45309",fontSize:10,marginRight:2}}>✦</span>
                  <span className="reg-sh-l">Featured This Edition</span>
                  <div className="reg-sh-r" />
                </div>
                <div className="reg-feat-grid">
                  {featured.map((s,fi)=>(
                    <Link key={s.id} href={`/startup/${s.slug}`} className="reg-feat-card">
                      <div className="reg-feat-img">
                        {s.logo_url
                          ? <img src={s.logo_url} alt={s.name} loading={fi===0?"eager":"lazy"} />
                          : <div className="reg-feat-ph"><span className="reg-feat-ph-l">{s.name.charAt(0)}</span></div>
                        }
                        <div className="reg-feat-ov" />
                        <span className="reg-feat-num">No.{String(fi+1).padStart(2,"0")}</span>
                        <div className="reg-feat-caption">
                          <span className="reg-feat-sector">{s.category||"Startup"}</span>
                          <span className="reg-feat-name">{s.name}</span>
                        </div>
                      </div>
                      <div className="reg-feat-body">
                        <p className="reg-feat-desc">{s.description||"Building for India's next decade."}</p>
                        <div className="reg-feat-foot">
                          <span className="reg-feat-meta">{s.founded_year&&`Est. ${s.founded_year}`}{s.city&&` · ${s.city}`}</span>
                          <ArrowUpRight style={{width:12,height:12,color:"#C8C2B4"}} aria-hidden="true" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* ALL STARTUPS */}
            {grid.length>0 ? (
              <section aria-label="All startups">
                {featured.length>0 && (
                  <div className="reg-sh">
                    <span className="reg-sh-l">All Startups</span>
                    <div className="reg-sh-r" />
                  </div>
                )}
                {/* Desktop 3-col grid */}
                <div className="reg-grid">
                  {grid.map(s=>(
                    <Link key={s.id} href={`/startup/${s.slug}`} className="reg-card">
                      <div className="reg-card-head">
                        <div className="reg-card-logo">
                          {s.logo_url
                            ? <Image src={s.logo_url} alt={s.name} width={36} height={36} className="object-contain" loading="lazy" />
                            : <span style={{fontSize:14,fontWeight:700,color:"#AAA",fontFamily:"'Playfair Display',serif"}}>{s.name.charAt(0)}</span>
                          }
                        </div>
                        <div className="reg-card-titles">
                          <p className="reg-card-name">{s.name}</p>
                          <p className="reg-card-cat">{(s.category||"").slice(0,20)}</p>
                        </div>
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-label="Verified" style={{flexShrink:0,marginTop:3}}><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#15803D" strokeWidth="1.4" strokeLinecap="round"/></svg>
                      </div>
                      <p className="reg-card-desc">{s.description||"Building for India's next decade."}</p>
                      {s.founders && <p className="reg-card-founders">↳ {s.founders}</p>}
                      <div className="reg-card-foot">
                        <div className="reg-card-chips">
                          {s.founded_year && <span>Est. {s.founded_year}</span>}
                          {s.city && <span>· {s.city}</span>}
                        </div>
                        <ArrowUpRight style={{width:11,height:11,color:"#C8C2B4"}} aria-hidden="true" />
                      </div>
                    </Link>
                  ))}
                </div>
                {/* Mobile LinkedIn list */}
                <div className="reg-mob">
                  {grid.map(s=>(
                    <Link key={s.id} href={`/startup/${s.slug}`} className="reg-mob-row">
                      <div className="reg-mob-logo">
                        {s.logo_url
                          ? <Image src={s.logo_url} alt={s.name} width={40} height={40} className="object-contain" loading="lazy" />
                          : <span style={{fontSize:14,fontWeight:700,color:"#AAA",fontFamily:"'Playfair Display',serif"}}>{s.name.charAt(0)}</span>
                        }
                      </div>
                      <div className="reg-mob-info">
                        <p className="reg-mob-name">{s.name}</p>
                        <p className="reg-mob-meta">{s.category||"Startup"}{s.founded_year&&` · ${s.founded_year}`}{s.city&&` · ${s.city}`}</p>
                        {s.description && <p className="reg-mob-desc">{s.description}</p>}
                      </div>
                      <span style={{fontSize:16,color:"#C8C2B4",flexShrink:0}}>›</span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : (
              <div className="reg-empty">
                <span className="reg-empty-icon">∅</span>
                <h3 className="reg-empty-h">No startups found</h3>
                <p className="reg-empty-p">{q?`Nothing matched "${q}". Try a different term.`:"Try adjusting your filters."}</p>
                <Link href="/startup" style={{display:"inline-block",background:"#1A1208",color:"#fff",padding:"8px 20px",fontFamily:"system-ui,sans-serif",fontSize:9,fontWeight:900,textTransform:"uppercase",letterSpacing:".18em",textDecoration:"none"}}>Clear filters</Link>
              </div>
            )}

            {/* PAGINATION */}
            {totalPages>1 && (
              <nav className="reg-pag" aria-label="Registry pagination">
                <Link href={pgHref(page-1)} className={`reg-pag-btn${page===1?" dis":""}`} aria-disabled={page===1}>← Prev</Link>
                {pgNums.map(p=>(
                  <Link key={p} href={pgHref(p)} className={`reg-pag-num${p===page?" on":""}`} aria-current={p===page?"page":undefined}>{p}</Link>
                ))}
                <Link href={pgHref(page+1)} className={`reg-pag-btn${page===totalPages?" dis":""}`} aria-disabled={page===totalPages}>Next →</Link>
              </nav>
            )}
          </div>

          {/* ── SIDEBAR — blog/about "By the Numbers" pattern ── */}
          <aside className="reg-side" style={{position:"sticky",top:88}}>
            {/* Submit CTA */}
            <div className="reg-side-box dk">
              <p className="reg-side-ey">List Free · UpForge</p>
              <p className="reg-side-h">Got a startup to list?</p>
              <p className="reg-side-p">Get independently verified. Free forever.</p>
              <Link href="/submit" className="reg-side-btn">Submit Startup →</Link>
            </div>

            {/* Sector directory */}
            {cats.length>0 && (
              <div className="reg-side-box">
                <p className="reg-side-ey">Browse by Sector</p>
                <ul className="reg-side-list">
                  {cats.slice(0,10).map(c=>(
                    <li key={c}>
                      <Link href={`/startups/${catSlug(c)}`}>
                        <span>{c}</span>
                        <span style={{color:"#C8C2B4",fontSize:12}}>›</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {cats.length>10 && (
                  <Link href="/startups" style={{display:"block",marginTop:8,paddingTop:8,borderTop:"1px solid #D8D2C4",fontFamily:"system-ui,sans-serif",fontSize:"8px",fontWeight:700,textTransform:"uppercase",letterSpacing:".18em",color:"#AAA",textDecoration:"none"}}>
                    All {cats.length} sectors →
                  </Link>
                )}
              </div>
            )}

            {/* Stats box — "By the Numbers" blog/about pattern */}
            <div className="reg-side-box dk" style={{position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,#92400E,#D97706,#E8C547)"}} />
              <p className="reg-side-ey">By The Numbers</p>
              <p className="pf" style={{fontSize:"1rem",fontWeight:700,color:"#fff",fontStyle:"italic",marginBottom:14,lineHeight:1.3}}>India's Startup<br /><span style={{color:"#E8C547"}}>Ecosystem 2026</span></p>
              {[
                {v:`${total.toLocaleString()}+`,l:"Verified on UpForge"},
                {v:"125+",l:"Indian Unicorns"},
                {v:"$3.4B",l:"Q1 2026 Funding"},
                {v:"3rd",l:"Largest Ecosystem"},
              ].map((s,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",padding:"7px 0",borderBottom:i<3?"1px solid rgba(255,255,255,.08)":"none"}}>
                  <span style={{fontFamily:"system-ui,sans-serif",fontSize:8,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".12em"}}>{s.l}</span>
                  <span className="pf" style={{fontSize:"1.1rem",fontWeight:900,color:"#E8C547"}}>{s.v}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* ── CTA — blog/about pattern ── */}
        <div className="reg-cta a3">
          <div>
            <p className="reg-cta-ey">UpForge Intelligence</p>
            <p className="reg-cta-h">Your founder story starts with a verified profile.</p>
            <p className="reg-cta-p">Free forever. Trusted by investors and press across India.</p>
          </div>
          <Link href="/submit" className="reg-cta-btn">
            List Free <ArrowRight style={{width:13,height:13}} aria-hidden="true" />
          </Link>
        </div>

        {/* ── INTERNAL LINKS — exact blog/about pattern ── */}
        <section className="a4" style={{paddingTop:"clamp(18px,3vw,30px)",borderTop:"1px solid #C8C2B4",marginTop:"clamp(18px,3vw,28px)"}}>
          <p style={{fontFamily:"system-ui,sans-serif",fontSize:8.5,letterSpacing:".3em",textTransform:"uppercase",color:"#AAA",marginBottom:14}}>Explore on UpForge</p>
          <div className="reg-links-grid">
            {[
              {l:"Startup Registry India",  h:"/startup",      desc:"Full verified database"},
              {l:"Browse by Sector",        h:"/startups",     desc:"30+ categories"},
              {l:"Indian Unicorns 2026",    h:"/blog/top-indian-unicorns-2026", desc:"All 125+ profiled"},
              {l:"Funding Guide 2026",      h:"/blog/how-to-get-startup-funding-india-2026", desc:"DPIIT, SISFS & VCs"},
              {l:"AI Startups India",       h:"/startups/ai-ml",   desc:"India's AI builders"},
              {l:"FinTech Startups India",  h:"/startups/fintech", desc:"Zerodha, CRED & more"},
              {l:"The Forge — Blog",        h:"/blog",         desc:"Startup intelligence"},
              {l:"Submit Your Startup",     h:"/submit",       desc:"Get listed free"},
            ].map(lnk=>(
              <Link key={lnk.h+lnk.l} href={lnk.h} className="reg-link-card">
                <span className="reg-link-title">
                  {lnk.l}
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true" style={{display:"inline",marginLeft:4,verticalAlign:"middle",flexShrink:0}}>
                    <path d="M2 7L7 2M7 2H3M7 2V6" stroke="#1A1208" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="reg-link-desc">{lnk.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── FOOTER — exact blog/about pattern ── */}
        <footer className="reg-footer a4">
          <p className="reg-footer-note">
            * Registry data sourced from DPIIT, Tracxn, Inc42, Forbes India, Hurun India 2025, and company announcements as of March 2026.
            UpForge is an independent registry — no paid placements, no sponsored rankings.
          </p>
          <nav aria-label="Footer navigation">
            <ul className="reg-footer-nav">
              {[
                {l:"The Founder Chronicle", h:"/"},
                {l:"Startup Registry India",h:"/startup"},
                {l:"Browse by Sector",      h:"/startups"},
                {l:"Indian Unicorns 2026",  h:"/blog/top-indian-unicorns-2026"},
                {l:"The Forge — Blog",      h:"/blog"},
                {l:"Free Valuation Tool",   h:"/report"},
                {l:"Submit Startup",        h:"/submit"},
              ].map(lnk=>(
                <li key={lnk.h+lnk.l}><Link href={lnk.h}>{lnk.l}</Link></li>
              ))}
            </ul>
          </nav>
        </footer>

      </div>
    </>
  )
}
