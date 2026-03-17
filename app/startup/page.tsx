// app/startup/page.tsx  — COMPLETE REWRITE
// Design: Founder Chronicle editorial · Playfair + EB Garamond · cream/ink/saffron
// Search: server-side via URL params (SEO-rich, no client JS needed for results)
// Single footer, no duplicate, full SEO keyword richness

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
  website?: string|null; founders?: string|null
  founded_year?: number|null; category?: string|null
  city?: string|null; is_featured?: boolean
}

interface PageProps {
  searchParams?: Promise<{ page?:string; q?:string; year?:string; sort?:string; category?:string }>
}

async function getRegistryData(q:string, year:string, sort:string, cat:string, page:number) {
  const supabase = await createClient()
  const from = (page-1)*PAGE_SIZE
  let query = supabase
    .from("startups")
    .select("id,name,slug,description,logo_url,website,founders,founded_year,category,city,is_featured",{count:"exact"})
    .eq("status","approved")
  if(q)   query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%,founders.ilike.%${q}%,category.ilike.%${q}%,city.ilike.%${q}%`)
  if(year) query = query.eq("founded_year", Number(year))
  if(cat)  query = query.eq("category", cat)
  const orderCol = sort==="year" ? "founded_year" : sort==="newest" ? "created_at" : "name"
  const orderAsc = sort !== "newest"
  const {data,count,error} = await query.order(orderCol,{ascending:orderAsc}).range(from,from+PAGE_SIZE-1)
  if(error) console.error("[registry]",error.message)
  return { startups:(data??[]) as StartupRow[], total: count??0 }
}

async function getFilterOptions() {
  const supabase = await createClient()
  const [{data:yrData},{data:catData}] = await Promise.all([
    supabase.from("startups").select("founded_year").eq("status","approved").not("founded_year","is",null).gte("founded_year",2010).order("founded_year",{ascending:false}),
    supabase.from("startups").select("category").eq("status","approved").not("category","is",null),
  ])
  const years = [...new Set((yrData??[]).map(r=>r.founded_year as number))].filter(Boolean)
  const cats  = [...new Set((catData??[]).map(r=>r.category as string))].filter(Boolean).sort()
  return { years, cats }
}

export async function generateMetadata({searchParams}:PageProps): Promise<Metadata> {
  const sp = await searchParams
  const {total} = await getRegistryData("","","name","",1)
  const n = total>0 ? total.toLocaleString() : "1,000+"
  const isFiltered = !!(sp?.q||sp?.year||sp?.sort||sp?.category)
  const page = Number(sp?.page??1)
  return {
    title: `Indian Startup Registry 2026 — ${n}+ Verified Startups | UpForge`,
    description: `Browse ${n}+ verified Indian startups across AI, FinTech, SaaS, EdTech, HealthTech and 30+ sectors. India's most trusted free startup database — updated daily with verified founder profiles, founding year, city, and company details.`,
    alternates:{canonical:"https://www.upforge.in/startup"},
    openGraph:{
      title:`Indian Startup Registry — ${n}+ Verified | UpForge`,
      description:`Discover ${n}+ verified Indian startups. Free, structured, updated daily.`,
      url:"https://www.upforge.in/startup", siteName:"UpForge",
      images:[{url:"https://www.upforge.in/og/registry.png",width:1200,height:630}],
      locale:"en_IN",type:"website",
    },
    robots:{index:!isFiltered&&page<=1, follow:true, googleBot:{index:!isFiltered&&page<=1,follow:true,"max-snippet":-1,"max-image-preview":"large"}},
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
    getFilterOptions(),
  ])

  const totalPages = Math.max(1,Math.ceil(total/PAGE_SIZE))
  const isFiltered = !!(q||year||cat||(sort&&sort!=="name"))

  const makeUrl = (overrides:Record<string,string|undefined>) => {
    const base:{q?:string;year?:string;sort?:string;category?:string;page?:string} = {
      q:q||undefined, year:year||undefined,
      sort:sort!=="name"?sort:undefined,
      category:cat||undefined,
      page:page>1?String(page):undefined,
    }
    const merged = {...base,...overrides}
    const p = new URLSearchParams()
    Object.entries(merged).forEach(([k,v])=>{ if(v) p.set(k,v) })
    const qs = p.toString()
    return `/startup${qs?`?${qs}`:""}`
  }

  const makeHref = (p:number) => makeUrl({page:p===1?undefined:String(p)})

  const winSize = Math.min(5,totalPages)
  const winStart = page<=3||totalPages<=5 ? 1 : page>=totalPages-2 ? totalPages-4 : page-2
  const pageNums = Array.from({length:winSize},(_,i)=>winStart+i)

  const schemas = [
    {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[
      {"@type":"ListItem",position:1,name:"Home",item:"https://www.upforge.in"},
      {"@type":"ListItem",position:2,name:"Startup Registry",item:"https://www.upforge.in/startup"},
    ]},
    {"@context":"https://schema.org","@type":"CollectionPage",
      "@id":"https://www.upforge.in/startup#collectionpage",
      name:"Indian Startup Registry 2026",
      description:`India's independent registry of ${total.toLocaleString()}+ verified startups across 30+ sectors.`,
      url:"https://www.upforge.in/startup", inLanguage:"en-IN",numberOfItems:total},
    !isFiltered && page<=1 ? {"@context":"https://schema.org","@type":"ItemList",
      name:"Verified Indian Startups — UpForge",
      itemListElement:startups.slice(0,10).map((s,i)=>({
        "@type":"ListItem",position:i+1,name:s.name,
        url:`https://www.upforge.in/startup/${s.slug}`,
      }))} : null,
  ].filter(Boolean)

  return (
    <>
      {schemas.map((s,i)=>(
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        :root {
          --cream:#F2EFE6; --cream2:#EDE9DC; --cream3:#FAF8F3;
          --ink:#1A1208; --ink2:#3D2E18; --ink3:#6B5C40; --ink4:#9C8B72;
          --rule:#D5CEBC; --rule2:#EAE4D4;
          --saffron:#E8933A; --gold:#C9A84C; --white:#FDFCF8;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:var(--cream)}

        .reg-wrap{min-height:100vh;background:var(--cream);font-family:'EB Garamond',Georgia,serif;color:var(--ink)}

        /* BREADCRUMB */
        .reg-bc{border-bottom:1px solid var(--rule);background:var(--white)}
        .reg-bc ol{max-width:1280px;margin:0 auto;padding:0 clamp(16px,4vw,48px);display:flex;align-items:center;gap:6px;height:34px;font-family:system-ui,sans-serif;font-size:10px;color:var(--ink4);list-style:none}
        .reg-bc a{color:var(--ink4);text-decoration:none;transition:color .15s}
        .reg-bc a:hover{color:var(--ink)}
        .reg-bc-sep{color:var(--rule)}

        /* MASTHEAD */
        .reg-mast{border-bottom:3px solid var(--ink);background:var(--cream)}
        .reg-mast-inner{max-width:1280px;margin:0 auto;padding:clamp(32px,5vw,60px) clamp(16px,4vw,48px) clamp(24px,4vw,44px);text-align:center}
        .reg-eyebrow{font-family:system-ui,sans-serif;font-size:9px;font-weight:700;letter-spacing:.42em;text-transform:uppercase;color:var(--ink4);margin-bottom:16px;display:flex;align-items:center;justify-content:center;gap:12px}
        .reg-eyebrow-line{height:1px;width:60px;background:var(--rule)}
        .reg-h1{font-family:'Playfair Display',serif;font-size:clamp(2.2rem,5.5vw,4.8rem);font-weight:900;letter-spacing:-.025em;color:var(--ink);line-height:1.05;margin-bottom:12px}
        .reg-sub{font-size:clamp(13px,1.5vw,15px);color:var(--ink3);font-style:italic;line-height:1.75;max-width:620px;margin:0 auto 24px}
        .reg-live{display:inline-flex;align-items:center;gap:6px;font-family:system-ui,sans-serif;font-size:8.5px;font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:#15803D;border:1px solid #BBF7D0;background:#F0FDF4;padding:4px 12px;margin-bottom:24px}
        .reg-live-dot{width:6px;height:6px;border-radius:50%;background:#15803D}

        /* STATS */
        .reg-stats{display:flex;justify-content:center;border:1px solid var(--rule);background:var(--ink);max-width:560px;margin:0 auto}
        .reg-stat{flex:1;padding:12px 16px;text-align:center;border-right:1px solid rgba(255,255,255,.08)}
        .reg-stat:last-child{border-right:none}
        .reg-stat-v{font-family:'Playfair Display',serif;font-size:clamp(1.2rem,2.2vw,1.7rem);font-weight:900;color:#fff;line-height:1;margin-bottom:2px}
        .reg-stat-l{font-family:system-ui,sans-serif;font-size:7px;font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:rgba(255,255,255,.35)}
        @media(max-width:440px){
          .reg-stats{flex-direction:column}
          .reg-stat{border-right:none;border-bottom:1px solid rgba(255,255,255,.08)}
          .reg-stat:last-child{border-bottom:none}
        }

        /* TOOLBAR */
        .reg-toolbar{background:var(--white);border-bottom:1px solid var(--rule);position:sticky;top:0;z-index:40}
        .reg-toolbar-inner{max-width:1280px;margin:0 auto;padding:0 clamp(16px,4vw,48px)}
        .reg-toolbar-row1{display:flex;align-items:center;gap:0;border-bottom:1px solid var(--rule2)}
        .reg-search-wrap{flex:1;display:flex;align-items:center;border-right:1px solid var(--rule2)}
        .reg-search-icon{padding:0 14px;color:var(--ink4);font-size:14px;flex-shrink:0}
        .reg-search-form{flex:1;display:flex;align-items:center}
        .reg-search-input{flex:1;height:48px;border:none;background:transparent;font-family:'EB Garamond',serif;font-size:15px;color:var(--ink);outline:none;font-style:italic;padding:0}
        .reg-search-input::placeholder{color:var(--ink4)}
        .reg-search-submit{height:48px;padding:0 20px;background:var(--ink);color:#fff;border:none;font-family:system-ui,sans-serif;font-size:8.5px;font-weight:900;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;white-space:nowrap;text-decoration:none;display:flex;align-items:center}
        .reg-toolbar-row2{display:flex;align-items:center;gap:0;height:38px;overflow-x:auto}
        .reg-filter-label{font-family:system-ui,sans-serif;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.28em;color:var(--ink4);padding:0 16px;border-right:1px solid var(--rule2);height:100%;display:flex;align-items:center;flex-shrink:0}
        .reg-filter-select{height:100%;border:none;border-right:1px solid var(--rule2);background:transparent;font-family:system-ui,sans-serif;font-size:11px;color:var(--ink);padding:0 10px;outline:none;cursor:pointer;flex-shrink:0}
        .reg-filter-link{height:100%;padding:0 14px;display:flex;align-items:center;font-family:system-ui,sans-serif;font-size:10px;font-weight:700;letter-spacing:.08em;color:var(--ink3);text-decoration:none;border-right:1px solid var(--rule2);white-space:nowrap;transition:all .15s;flex-shrink:0}
        .reg-filter-link:hover{background:var(--cream2);color:var(--ink)}
        .reg-filter-link.active{background:var(--ink);color:#fff}
        .reg-filter-clear{height:100%;padding:0 14px;display:flex;align-items:center;font-family:system-ui,sans-serif;font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#DC2626;text-decoration:none;transition:color .15s;flex-shrink:0}
        .reg-filter-clear:hover{color:#991B1B}

        /* RESULTS BAR */
        .reg-results-bar{max-width:1280px;margin:0 auto;padding:12px clamp(16px,4vw,48px);display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--rule2)}
        .reg-results-q{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:var(--ink)}
        .reg-results-count{font-size:13px;color:var(--ink3);font-style:italic}
        .reg-results-rule{flex:1;height:1px;background:var(--rule2)}
        .reg-results-page{font-family:system-ui,sans-serif;font-size:9px;color:var(--ink4)}

        /* MAIN */
        .reg-main{max-width:1280px;margin:0 auto;padding:clamp(20px,3vw,36px) clamp(16px,4vw,48px) 60px;display:grid;grid-template-columns:1fr 240px;gap:32px;align-items:start}
        @media(max-width:900px){.reg-main{grid-template-columns:1fr !important}}

        /* FEATURED SECTION */
        .reg-feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;background:var(--rule2);border:1px solid var(--rule);margin-bottom:32px}
        @media(max-width:760px){.reg-feat-grid{grid-template-columns:1fr !important}}
        .reg-feat-card{text-decoration:none;display:flex;flex-direction:column;position:relative;overflow:hidden;background:var(--white);border-right:1px solid var(--rule2);transition:background .15s}
        .reg-feat-card:last-child{border-right:none}
        .reg-feat-card:hover{background:var(--cream)}
        .reg-feat-img{width:100%;aspect-ratio:16/9;overflow:hidden;position:relative;background:var(--cream2)}
        .reg-feat-img img{width:100%;height:100%;object-fit:cover;filter:sepia(15%) contrast(105%);transition:transform .4s}
        .reg-feat-card:hover .reg-feat-img img{transform:scale(1.03)}
        .reg-feat-img-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
        .reg-feat-img-letter{font-family:'Playfair Display',serif;font-size:4rem;font-weight:900;color:var(--rule)}
        .reg-feat-overlay{position:absolute;bottom:0;left:0;right:0;height:55%;background:linear-gradient(to top,rgba(26,18,8,.85),transparent)}
        .reg-feat-num{position:absolute;top:12px;left:12px;background:var(--ink);color:#fff;font-family:system-ui,sans-serif;font-size:8px;font-weight:900;padding:2px 8px;letter-spacing:.14em}
        .reg-feat-caption{position:absolute;bottom:0;left:0;right:0;padding:14px}
        .reg-feat-sector{display:block;font-family:system-ui,sans-serif;font-size:7.5px;font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:rgba(255,255,255,.6);margin-bottom:3px}
        .reg-feat-name{display:block;font-family:'Playfair Display',serif;font-size:clamp(.9rem,1.3vw,1.1rem);font-weight:700;color:#fff;line-height:1.2}
        .reg-feat-body{padding:14px}
        .reg-feat-desc{font-size:11.5px;color:var(--ink3);font-style:italic;line-height:1.65;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .reg-feat-foot{display:flex;align-items:center;justify-content:space-between}
        .reg-feat-chips{display:flex;align-items:center;gap:8px}
        .reg-feat-chip{font-family:system-ui,sans-serif;font-size:8.5px;color:var(--ink4)}

        /* SECTION HD */
        .reg-sec-hd{display:flex;align-items:center;gap:10px;margin-bottom:14px}
        .reg-sec-hd-l{font-family:system-ui,sans-serif;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.32em;color:var(--ink4);white-space:nowrap}
        .reg-sec-hd-r{flex:1;height:1px;background:var(--rule)}

        /* STARTUP GRID */
        .reg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;background:var(--rule2);border:1px solid var(--rule)}
        @media(max-width:760px){.reg-grid{grid-template-columns:repeat(2,1fr) !important}}
        @media(max-width:440px){.reg-grid{grid-template-columns:1fr !important}}
        .reg-card{background:var(--white);padding:16px;display:flex;flex-direction:column;gap:8px;text-decoration:none;border-right:1px solid var(--rule2);border-bottom:1px solid var(--rule2);transition:background .15s,transform .15s,box-shadow .15s;position:relative}
        .reg-card:hover{background:var(--cream);transform:translate(-2px,-2px);box-shadow:3px 3px 0 var(--ink);z-index:1;border-color:var(--ink) !important}
        .reg-card-head{display:flex;align-items:flex-start;gap:10px}
        .reg-card-logo{width:38px;height:38px;border:1px solid var(--rule2);background:var(--cream2);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0}
        .reg-card-titles{flex:1;min-width:0}
        .reg-card-name{font-family:'Playfair Display',serif;font-size:clamp(.85rem,1vw,.95rem);font-weight:700;color:var(--ink);line-height:1.25;margin-bottom:2px}
        .reg-card:hover .reg-card-name{text-decoration:underline}
        .reg-card-cat{font-family:system-ui,sans-serif;font-size:8.5px;color:var(--ink4);text-transform:uppercase;letter-spacing:.1em}
        .reg-card-badge{color:#15803D;flex-shrink:0;margin-top:2px}
        .reg-card-desc{font-size:11.5px;color:var(--ink3);font-style:italic;line-height:1.6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .reg-card-founders{font-size:10.5px;color:var(--ink4);display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
        .reg-card-foot{display:flex;align-items:center;justify-content:space-between}
        .reg-card-chip{display:flex;align-items:center;gap:3px;font-family:system-ui,sans-serif;font-size:8.5px;color:var(--ink4)}
        .reg-card-arrow{font-size:13px;color:var(--rule);transition:color .15s}
        .reg-card:hover .reg-card-arrow{color:var(--ink)}

        /* MOBILE LIST */
        .reg-mob-list{display:none}
        @media(max-width:480px){
          .reg-grid{display:none !important}
          .reg-mob-list{display:flex !important;flex-direction:column;border:1px solid var(--rule);background:var(--white)}
        }
        .reg-mob-row{display:flex;align-items:center;gap:12px;padding:14px 16px;text-decoration:none;border-bottom:1px solid var(--rule2);transition:background .15s}
        .reg-mob-row:last-child{border-bottom:none}
        .reg-mob-row:hover{background:var(--cream2)}
        .reg-mob-logo{width:36px;height:36px;border:1px solid var(--rule2);background:var(--cream2);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0}
        .reg-mob-info{flex:1;min-width:0}
        .reg-mob-name{font-family:'Playfair Display',serif;font-size:.9rem;font-weight:700;color:var(--ink)}
        .reg-mob-meta{font-family:system-ui,sans-serif;font-size:9.5px;color:var(--ink4)}
        .reg-mob-arrow{font-size:13px;color:var(--rule);flex-shrink:0}

        /* EMPTY */
        .reg-empty{text-align:center;padding:60px 20px;border:1px dashed var(--rule);background:var(--white)}
        .reg-empty-icon{font-family:'Playfair Display',serif;font-size:3rem;color:var(--rule);display:block;margin-bottom:16px}
        .reg-empty-h{font-family:'Playfair Display',serif;font-size:1.3rem;color:var(--ink);margin-bottom:8px}
        .reg-empty-p{font-size:13px;color:var(--ink3);font-style:italic;margin-bottom:20px}
        .reg-empty-btn{display:inline-block;background:var(--ink);color:#fff;padding:9px 22px;font-family:system-ui,sans-serif;font-size:9.5px;font-weight:900;text-transform:uppercase;letter-spacing:.18em;text-decoration:none}

        /* PAGINATION */
        .reg-pag{display:flex;align-items:center;justify-content:center;gap:5px;margin-top:32px;padding-top:20px;border-top:1px solid var(--rule)}
        .reg-pag-btn{padding:6px 14px;font-family:system-ui,sans-serif;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border:1px solid var(--rule);background:var(--white);color:var(--ink3);text-decoration:none;transition:all .15s}
        .reg-pag-btn:hover{border-color:var(--ink);color:var(--ink)}
        .reg-pag-btn.disabled{color:var(--rule);pointer-events:none}
        .reg-pag-num{width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif;font-size:11px;font-weight:700;border:1px solid var(--rule);text-decoration:none;color:var(--ink3);transition:all .15s}
        .reg-pag-num:hover{border-color:var(--ink);color:var(--ink)}
        .reg-pag-num.active{background:var(--ink);color:#fff;border-color:var(--ink)}

        /* SIDEBAR */
        .reg-side{position:sticky;top:88px;display:flex;flex-direction:column;gap:16px}
        .reg-side-card{border:1px solid var(--rule);background:var(--white);padding:16px}
        .reg-side-card.dark{background:var(--ink);border-color:var(--ink)}
        .reg-side-eyebrow{font-family:system-ui,sans-serif;font-size:7.5px;font-weight:900;text-transform:uppercase;letter-spacing:.28em;color:var(--ink4);margin-bottom:8px}
        .reg-side-card.dark .reg-side-eyebrow{color:var(--saffron)}
        .reg-side-h{font-family:'Playfair Display',serif;font-size:.9rem;font-weight:700;color:var(--ink);margin-bottom:6px;line-height:1.3}
        .reg-side-card.dark .reg-side-h{color:#fff}
        .reg-side-p{font-size:11.5px;color:var(--ink3);font-style:italic;line-height:1.6;margin-bottom:12px}
        .reg-side-card.dark .reg-side-p{color:rgba(255,255,255,.45)}
        .reg-side-btn{display:block;text-align:center;font-family:system-ui,sans-serif;font-size:8.5px;font-weight:900;text-transform:uppercase;letter-spacing:.2em;background:#fff;color:var(--ink);padding:8px;text-decoration:none}
        .reg-side-btn:hover{background:var(--saffron)}
        .reg-side-list{list-style:none;padding:0;margin:0}
        .reg-side-list li a{display:flex;align-items:center;justify-content:space-between;padding:6px 0;font-size:12px;color:var(--ink3);text-decoration:none;font-style:italic;border-bottom:1px solid var(--rule2);transition:color .15s}
        .reg-side-list li:last-child a{border-bottom:none}
        .reg-side-list li a:hover{color:var(--ink);text-decoration:underline}

        /* CTA BLOCK */
        .reg-cta{background:var(--ink);padding:clamp(24px,4vw,40px);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;margin-top:40px}
        .reg-cta-eyebrow{font-family:system-ui,sans-serif;font-size:7.5px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:var(--saffron);margin-bottom:6px}
        .reg-cta-h{font-family:'Playfair Display',serif;font-size:clamp(1rem,2vw,1.4rem);font-weight:700;color:#fff;margin-bottom:6px;line-height:1.3}
        .reg-cta-p{font-size:12px;color:rgba(255,255,255,.45);font-style:italic}
        .reg-cta-btn{flex-shrink:0;display:inline-flex;align-items:center;gap:6px;background:#fff;color:var(--ink);padding:10px 24px;font-family:system-ui,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.18em;text-decoration:none}
        .reg-cta-btn:hover{background:var(--saffron)}

        /* BOTTOM NAV */
        .reg-bot{border-top:1px solid var(--rule);background:var(--white)}
        .reg-bot-inner{max-width:1280px;margin:0 auto;padding:clamp(18px,3vw,28px) clamp(16px,4vw,48px)}
        .reg-bot-label{font-family:system-ui,sans-serif;font-size:7.5px;font-weight:700;text-transform:uppercase;letter-spacing:.32em;color:var(--ink4);margin-bottom:10px}
        .reg-bot-links{display:flex;flex-wrap:wrap;gap:5px 20px;list-style:none;padding:0;margin:0}
        .reg-bot-links a{font-size:12.5px;color:var(--ink3);text-decoration:none;font-style:italic;transition:color .15s}
        .reg-bot-links a:hover{color:var(--ink);text-decoration:underline}

        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:var(--rule)}
      `}</style>

      <div className="reg-wrap">
        <Navbar />

        {/* BREADCRUMB */}
        <div className="reg-bc">
          <ol>
            <li><a href="/">Home</a></li>
            <li className="reg-bc-sep">/</li>
            <li style={{color:"var(--ink)",fontWeight:600}}>Startup Registry</li>
          </ol>
        </div>

        {/* MASTHEAD */}
        <header className="reg-mast">
          <div className="reg-mast-inner">
            <div className="reg-eyebrow">
              <span className="reg-eyebrow-line" />
              India Edition · 2026
              <span className="reg-eyebrow-line" />
            </div>
            <h1 className="reg-h1">Startup Registry</h1>
            <p className="reg-sub">India's independent registry of verified builders — free, structured, permanent.</p>
            <div className="reg-live">
              <span className="reg-live-dot" />
              Live · {total.toLocaleString()} Profiles · All Verified
            </div>
            <div className="reg-stats">
              {[
                {v:`${total.toLocaleString()}+`,l:"Verified Profiles"},
                {v:`${cats.length || "30"}+`,l:"Sectors"},
                {v:`${years.length || "10"}+`,l:"Years"},
                {v:"Daily",l:"Updated"},
              ].map((s,i)=>(
                <div key={i} className="reg-stat">
                  <div className="reg-stat-v">{s.v}</div>
                  <div className="reg-stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* TOOLBAR — server-rendered form for SEO */}
        <div className="reg-toolbar" role="search">
          <div className="reg-toolbar-inner">
            <form action="/startup" method="GET" className="reg-toolbar-row1">
              {year && <input type="hidden" name="year" value={year} />}
              {cat  && <input type="hidden" name="category" value={cat} />}
              {sort && sort!=="name" && <input type="hidden" name="sort" value={sort} />}
              <div className="reg-search-wrap">
                <span className="reg-search-icon" aria-hidden="true">⌕</span>
                <div className="reg-search-form">
                  <input
                    type="search" name="q"
                    defaultValue={q}
                    className="reg-search-input"
                    placeholder="Search startups, founders, categories, cities…"
                    aria-label="Search startup registry"
                    autoComplete="off"
                  />
                </div>
              </div>
              <button type="submit" className="reg-search-submit">Search →</button>
            </form>

            {/* FILTER ROW */}
            <div className="reg-toolbar-row2">
              <span className="reg-filter-label">Filter</span>

              {/* Year filter */}
              <form action="/startup" method="GET" style={{display:"contents"}}>
                {q    && <input type="hidden" name="q" value={q} />}
                {cat  && <input type="hidden" name="category" value={cat} />}
                {sort && sort!=="name" && <input type="hidden" name="sort" value={sort} />}
                <select name="year" className="reg-filter-select" defaultValue={year}
                  aria-label="Filter by founding year">
                  <option value="">Any Year</option>
                  {years.map(yr=>(
                    <option key={yr} value={String(yr)} selected={year===String(yr)}>{yr}</option>
                  ))}
                </select>
              </form>

              {/* Category filter */}
              <form action="/startup" method="GET" style={{display:"contents"}}>
                {q    && <input type="hidden" name="q" value={q} />}
                {year && <input type="hidden" name="year" value={year} />}
                {sort && sort!=="name" && <input type="hidden" name="sort" value={sort} />}
                <select name="category" className="reg-filter-select" defaultValue={cat}
                  aria-label="Filter by sector">
                  <option value="">All Sectors</option>
                  {cats.map(c=>(
                    <option key={c} value={c} selected={cat===c}>{c}</option>
                  ))}
                </select>
              </form>

              {/* Sort links */}
              <a href={makeUrl({sort:"name",page:undefined})} className={`reg-filter-link${sort==="name"?" active":""}`}>A–Z</a>
              <a href={makeUrl({sort:"newest",page:undefined})} className={`reg-filter-link${sort==="newest"?" active":""}`}>Newest</a>
              <a href={makeUrl({sort:"year",page:undefined})} className={`reg-filter-link${sort==="year"?" active":""}`}>Founded</a>

              {isFiltered && (
                <a href="/startup" className="reg-filter-clear">✕ Clear</a>
              )}
            </div>
          </div>
        </div>

        {/* RESULTS BAR */}
        <div className="reg-results-bar" aria-live="polite">
          <span className="reg-results-q">
            {q ? `"${q}"` : cat ? cat : year ? `Est. ${year}` : "All Startups"}
          </span>
          <span className="reg-results-count">— {total.toLocaleString()} profiles</span>
          <span className="reg-results-rule" />
          <span className="reg-results-page">Pg. {page}/{totalPages||1}</span>
        </div>

        {/* MAIN */}
        <div className="reg-main">
          <div>
            {/* FEATURED — page 1, no filters */}
            {page===1 && !isFiltered && startups.some(s=>s.is_featured) && (
              <section style={{marginBottom:32}} aria-label="Featured startups">
                <div className="reg-sec-hd">
                  <span style={{fontSize:10,marginRight:4}} aria-hidden="true">✦</span>
                  <span className="reg-sec-hd-l">Featured This Edition</span>
                  <span className="reg-sec-hd-r" />
                </div>
                <div className="reg-feat-grid">
                  {startups.filter(s=>s.is_featured).slice(0,3).map((s,fi)=>(
                    <a key={s.id} href={`/startup/${s.slug}`} className="reg-feat-card">
                      <div className="reg-feat-img">
                        {s.logo_url
                          ? <img src={s.logo_url} alt={s.name} loading={fi===0?"eager":"lazy"} />
                          : <div className="reg-feat-img-ph"><span className="reg-feat-img-letter">{s.name.charAt(0)}</span></div>
                        }
                        <div className="reg-feat-overlay" />
                        <span className="reg-feat-num">No.{String(fi+1).padStart(2,"0")}</span>
                        <div className="reg-feat-caption">
                          <span className="reg-feat-sector">{s.category||"Startup"}</span>
                          <span className="reg-feat-name">{s.name}</span>
                        </div>
                      </div>
                      <div className="reg-feat-body">
                        <p className="reg-feat-desc">{s.description||"Building for India's next decade."}</p>
                        <div className="reg-feat-foot">
                          <div className="reg-feat-chips">
                            {s.founded_year && <span className="reg-feat-chip">Est. {s.founded_year}</span>}
                            {s.city && <span className="reg-feat-chip">· {s.city}</span>}
                          </div>
                          <span style={{fontSize:13,color:"var(--ink4)"}}>↗</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* ALL STARTUPS GRID */}
            {startups.length > 0 ? (
              <section aria-label="All startups">
                {page===1 && !isFiltered && startups.some(s=>s.is_featured) && (
                  <div className="reg-sec-hd"><span className="reg-sec-hd-l">All Startups</span><span className="reg-sec-hd-r" /></div>
                )}
                {/* Desktop grid */}
                <div className="reg-grid">
                  {(page===1&&!isFiltered ? startups.filter(s=>!s.is_featured) : startups).map(s=>(
                    <a key={s.id} href={`/startup/${s.slug}`} className="reg-card">
                      <div className="reg-card-head">
                        <div className="reg-card-logo">
                          {s.logo_url
                            ? <Image src={s.logo_url} alt={s.name} width={38} height={38} className="object-contain" loading="lazy" />
                            : <span style={{fontSize:15,fontWeight:700,color:"var(--ink4)",fontFamily:"'Playfair Display',serif"}}>{s.name.charAt(0)}</span>
                          }
                        </div>
                        <div className="reg-card-titles">
                          <div className="reg-card-name">{s.name}</div>
                          <div className="reg-card-cat">{(s.category||"Startup").slice(0,22)}</div>
                        </div>
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" className="reg-card-badge" aria-label="Verified">
                          <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#15803D" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <p className="reg-card-desc">{s.description||"Building for India's next decade."}</p>
                      {s.founders && <p className="reg-card-founders">↳ {s.founders}</p>}
                      <div className="reg-card-foot">
                        <div style={{display:"flex",gap:8}}>
                          {s.founded_year && <span className="reg-card-chip">Est. {s.founded_year}</span>}
                          {s.city && <span className="reg-card-chip">· {s.city}</span>}
                        </div>
                        <span className="reg-card-arrow">↗</span>
                      </div>
                    </a>
                  ))}
                </div>
                {/* Mobile list */}
                <div className="reg-mob-list">
                  {(page===1&&!isFiltered ? startups.filter(s=>!s.is_featured) : startups).map(s=>(
                    <a key={s.id} href={`/startup/${s.slug}`} className="reg-mob-row">
                      <div className="reg-mob-logo">
                        {s.logo_url
                          ? <Image src={s.logo_url} alt={s.name} width={36} height={36} className="object-contain" loading="lazy" />
                          : <span style={{fontSize:13,fontWeight:700,color:"var(--ink4)",fontFamily:"'Playfair Display',serif"}}>{s.name.charAt(0)}</span>
                        }
                      </div>
                      <div className="reg-mob-info">
                        <div className="reg-mob-name">{s.name}</div>
                        <div className="reg-mob-meta">{s.category||"Startup"}{s.founded_year&&` · ${s.founded_year}`}</div>
                      </div>
                      <span className="reg-mob-arrow">›</span>
                    </a>
                  ))}
                </div>
              </section>
            ) : (
              <div className="reg-empty">
                <span className="reg-empty-icon">∅</span>
                <h3 className="reg-empty-h">No startups found</h3>
                <p className="reg-empty-p">{q?`Nothing matched "${q}". Try a different term.`:"Try adjusting your filters."}</p>
                <a href="/startup" className="reg-empty-btn">Clear filters</a>
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <nav className="reg-pag" aria-label="Registry pagination">
                <a href={makeHref(page-1)} className={`reg-pag-btn${page===1?" disabled":""}`} aria-disabled={page===1}>← Prev</a>
                {pageNums.map(p=>(
                  <a key={p} href={makeHref(p)} className={`reg-pag-num${p===page?" active":""}`} aria-current={p===page?"page":undefined}>{p}</a>
                ))}
                <a href={makeHref(page+1)} className={`reg-pag-btn${page===totalPages?" disabled":""}`} aria-disabled={page===totalPages}>Next →</a>
              </nav>
            )}

            {/* CTA */}
            <div className="reg-cta">
              <div>
                <div className="reg-cta-eyebrow">UpForge Registry</div>
                <div className="reg-cta-h">Your founder story starts with a verified profile.</div>
                <div className="reg-cta-p">Free forever. Trusted by investors and press.</div>
              </div>
              <a href="/submit" className="reg-cta-btn">List Free →</a>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="reg-side">
            <div className="reg-side-card dark">
              <div className="reg-side-eyebrow">List Free</div>
              <div className="reg-side-h">Got a startup to list?</div>
              <div className="reg-side-p">Get independently verified. Free forever.</div>
              <a href="/submit" className="reg-side-btn">Submit Startup →</a>
            </div>
            {cats.length > 0 && (
              <div className="reg-side-card">
                <div className="reg-side-eyebrow">Browse by Sector</div>
                <ul className="reg-side-list">
                  {cats.slice(0,10).map(c=>(
                    <li key={c}>
                      <a href={`/startups/${c.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`}>
                        <span>{c}</span>
                        <span style={{color:"var(--rule)"}}>›</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="/startups" style={{display:"block",marginTop:10,fontFamily:"system-ui,sans-serif",fontSize:"8px",fontWeight:700,textTransform:"uppercase",letterSpacing:".18em",color:"var(--ink4)",textDecoration:"none",paddingTop:8,borderTop:"1px solid var(--rule2)"}}>
                  All sectors →
                </a>
              </div>
            )}
          </aside>
        </div>

        {/* BOTTOM NAV */}
        <div className="reg-bot">
          <div className="reg-bot-inner">
            <div className="reg-bot-label">Explore UpForge</div>
            <ul className="reg-bot-links">
              <li><a href="/startup">All Indian Startups</a></li>
              <li><a href="/startups">Browse by Sector</a></li>
              <li><a href="/submit">Submit Your Startup</a></li>
              <li><a href="/blog">Startup Journal</a></li>
              <li><a href="/about">About UpForge</a></li>
              {cats.slice(0,5).map(c=>(
                <li key={c}><a href={`/startups/${c.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`}>{c} Startups</a></li>
              ))}
            </ul>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
