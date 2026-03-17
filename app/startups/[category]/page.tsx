// app/startups/[category]/page.tsx — FINAL PRODUCTION v5
// ─────────────────────────────────────────────────────────────────────────────
// Design: exact blog/about pattern
//   • NO global CSS reset — all styles scoped to .cp-* classes  
//   • Playfair Display 900 + Georgia — premium LV feel
//   • #F3EFE5 bg, #1A1208 ink, gold accent per sector color
//   • Section headers: .sh pattern
//   • Card hover: translate(-2,-2) + 4px shadow — exact blog pattern
//   • Centered hero with sector accent bar + editorial stats
//   • Image cards with 16:9 top, sector accent stripe
//   • <Navbar /> only — NO <Footer /> import — page-level footer
//   • Mobile: single-column LinkedIn list at <500px
//   • generateStaticParams: createReadClient (build-time safe)
//   • generateMetadata + page: createClient (request-time)
//   • Pagination: proper numbered pages
//   • SEO: long-tail keywords, trending sector terms, structured data
// ─────────────────────────────────────────────────────────────────────────────

import { createClient }     from "@/lib/supabase/server"
import { createReadClient } from "@/lib/supabase/server"
import { getSectorHero }    from "@/lib/sector-heroes"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import {
  categoryToSlug, getDisplayName, slugToDbCategory,
  generateCategoryDescription, generateCategoryLongDescription,
} from "@/lib/categories"

const PAGE_SIZE = 24

interface PageProps {
  params: Promise<{category:string}>
  searchParams?: Promise<{page?:string}>
}
interface StartupRow {
  id:string; name:string; slug:string
  description?:string|null; logo_url?:string|null
  founded_year?:number|null; city?:string|null
  category?:string|null; is_featured?:boolean
}

// Sector accent colors — tasteful, editorial
const COLORS:Record<string,string> = {
  "ai":"#2563EB","ai-ml":"#2563EB","fintech":"#059669","edtech":"#D97706",
  "healthtech":"#DC2626","saas":"#7C3AED","ecommerce":"#EA580C","e-commerce":"#EA580C",
  "agritech":"#16A34A","climate-tech":"#0D9488","logistics":"#92400E",
  "biotech":"#BE185D","devtools":"#4F46E5","web3":"#6D28D9","robotics":"#1D4ED8",
  "gaming":"#B45309","creator-economy":"#C026D3","d2c":"#EA580C","deeptech":"#1D4ED8",
  "mobility":"#0369A1","spacetech":"#7C3AED",
}
const accent = (slug:string) => COLORS[slug.toLowerCase()]??"#B45309"

// Long-tail SEO keywords per sector
const SEO_KW:Record<string,string> = {
  "ai-ml":"artificial intelligence startups India 2026, AI ML companies India, machine learning startups Bengaluru, LLM startups India, generative AI India",
  "fintech":"fintech startups India 2026, financial technology companies India, payments startups India, neobank India, UPI fintech companies",
  "edtech":"edtech startups India 2026, education technology companies India, online learning India, upskilling platforms India, K-12 tech startups",
  "healthtech":"healthtech startups India 2026, digital health companies India, telemedicine startups India, health AI India",
  "saas":"SaaS startups India 2026, B2B software companies India, cloud SaaS India, enterprise software Bengaluru",
  "ecommerce":"ecommerce startups India 2026, D2C brands India, quick commerce India, online retail startups",
  "agritech":"agritech startups India 2026, agriculture technology India, farmer fintech India, crop tech startups",
  "climate-tech":"climate tech startups India 2026, cleantech India, EV startups India, renewable energy companies India",
}

// DATA HELPERS
async function getAllDbCategoriesStatic():Promise<string[]> {
  const sb = createReadClient()
  const {data} = await sb.from("startups").select("category").eq("status","approved").not("category","is",null)
  return [...new Set((data??[]).map(r=>r.category as string))].filter(Boolean)
}
async function getAllDbCategories():Promise<string[]> {
  const sb = await createClient()
  const {data} = await sb.from("startups").select("category").eq("status","approved").not("category","is",null)
  return [...new Set((data??[]).map(r=>r.category as string))].filter(Boolean)
}
async function getCategoryStartups(dbCat:string,page:number) {
  const sb = await createClient()
  const from = (page-1)*PAGE_SIZE
  const {data,count} = await sb.from("startups")
    .select("id,name,slug,description,logo_url,founded_year,city,category,is_featured",{count:"exact"})
    .eq("status","approved").eq("category",dbCat)
    .order("is_featured",{ascending:false}).order("name",{ascending:true})
    .range(from,from+PAGE_SIZE-1)
  return {startups:(data??[]) as StartupRow[], total:count??0}
}

export async function generateStaticParams() {
  const cats = await getAllDbCategoriesStatic()
  const seen = new Set<string>()
  return cats.reduce<{category:string}[]>((acc,cat)=>{
    const s = categoryToSlug(cat)
    if(!seen.has(s)){seen.add(s);acc.push({category:s})}
    return acc
  },[])
}
export const revalidate = 86400

export async function generateMetadata({params}:PageProps):Promise<Metadata> {
  const {category:slug} = await params
  const all = await getAllDbCategories()
  const dbCat = slugToDbCategory(slug,all)
  if(!dbCat) return {title:"Not Found | UpForge",robots:{index:false,follow:false}}
  const sb = await createClient()
  const {count} = await sb.from("startups").select("id",{count:"exact",head:true}).eq("status","approved").eq("category",dbCat)
  const displayName = getDisplayName(dbCat)
  const n = (count??0).toLocaleString()
  const title = `${displayName} Startups in India 2026 — ${n}+ Verified Profiles | UpForge`
  const description = `Discover ${n}+ verified ${displayName} startups in India — founding teams, cities, founding years, company details. India's most trusted independent startup registry for ${displayName} companies.`
  const keywords = SEO_KW[slug] ?? `${displayName} startups India 2026, ${displayName} companies India, verified ${displayName} startups, Indian ${displayName} founders`
  const url = `https://www.upforge.in/startups/${slug}`
  return {
    title,description,keywords,
    alternates:{canonical:url},
    openGraph:{title,description,url,siteName:"UpForge",
      images:[{url:"https://www.upforge.in/og/registry.png",width:1200,height:630}],
      locale:"en_IN",type:"website"},
    twitter:{card:"summary_large_image",title,description,images:["https://www.upforge.in/og/registry.png"]},
    robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-snippet":-1,"max-image-preview":"large"}},
  }
}

export default async function CategoryPage({params,searchParams}:PageProps) {
  const {category:slug} = await params
  const sp = await searchParams
  const page = Math.max(1,Number(sp?.page??1))

  const all = await getAllDbCategories()
  const dbCat = slugToDbCategory(slug,all)
  if(!dbCat) notFound()

  const [{startups,total},related] = await Promise.all([
    getCategoryStartups(dbCat,page),
    Promise.resolve(all.filter(c=>categoryToSlug(c)!==slug).sort((a,b)=>a.localeCompare(b)).slice(0,12)),
  ])
  if(total===0) notFound()

  const totalPages  = Math.max(1,Math.ceil(total/PAGE_SIZE))
  const displayName = getDisplayName(dbCat)
  const description = generateCategoryDescription(dbCat,total)
  const longDesc    = generateCategoryLongDescription(dbCat,total)
  const color       = accent(slug)
  const hero        = getSectorHero(slug)
  const url         = `https://www.upforge.in/startups/${slug}`
  const catSlug     = (c:string) => categoryToSlug(c)

  const pgHref = (p:number)=>p===1?`/startups/${slug}`:`/startups/${slug}?page=${p}`
  const winSize = Math.min(5,totalPages)
  const winStart = page<=3||totalPages<=5?1:page>=totalPages-2?totalPages-4:page-2
  const pgNums = Array.from({length:winSize},(_,i)=>winStart+i)

  const schemas = [
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
      {"@type":"ListItem","position":1,"name":"UpForge","item":"https://www.upforge.in"},
      {"@type":"ListItem","position":2,"name":"Startup Registry","item":"https://www.upforge.in/startup"},
      {"@type":"ListItem","position":3,"name":"Sectors","item":"https://www.upforge.in/startups"},
      {"@type":"ListItem","position":4,"name":`${displayName} Startups`,item:url},
    ]},
    {"@context":"https://schema.org","@type":"CollectionPage","@id":`${url}#cp`,
      "name":`${displayName} Startups in India 2026`,"description":description,
      "url":url,"inLanguage":"en-IN","numberOfItems":total},
    {"@context":"https://schema.org","@type":"ItemList",
      "name":`Top ${displayName} Startups in India 2026`,
      "itemListElement":startups.slice(0,10).map((s,i)=>({
        "@type":"ListItem","position":i+1,"name":s.name,"url":`https://www.upforge.in/startup/${s.slug}`,
      }))},
  ]

  return (
    <>
      {schemas.map((s,i)=>(
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(s)}} />
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

        /* ALL SCOPED — zero global reset, zero Navbar interference */
        .pf{font-family:'Playfair Display',Georgia,serif !important}

        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .a0{animation:fadeUp .38s .00s ease both}
        .a1{animation:fadeUp .38s .07s ease both}
        .a2{animation:fadeUp .38s .14s ease both}
        .a3{animation:fadeUp .38s .20s ease both}

        /* Section header — blog/about .sh pattern */
        .cp-sh{display:flex;align-items:center;gap:10px;margin-bottom:14px}
        .cp-sh-l{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.3em;color:#AAA;font-family:system-ui,sans-serif;white-space:nowrap}
        .cp-sh-r{flex:1;height:1px;background:#D8D2C4}

        /* Card hover — exact blog/about .hc pattern */
        .cp-hc{transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease}
        .cp-hc:hover{transform:translate(-2px,-2px);box-shadow:4px 4px 0 #1A1208;border-color:#1A1208 !important;z-index:1;position:relative}

        /* Breadcrumb */
        .cp-bc{background:#FDFCF9;border-bottom:1px solid #C8C2B4}
        .cp-bc ol{max-width:1300px;margin:0 auto;padding:0 clamp(16px,4vw,48px);display:flex;align-items:center;gap:6px;height:32px;font-family:system-ui,sans-serif;font-size:10px;color:#AAA;list-style:none}
        .cp-bc a{color:#AAA;text-decoration:none;transition:color .15s}
        .cp-bc a:hover{color:#1A1208}

        /* Hero — centered, editorial, no global padding reset */
        .cp-hero{background:#F3EFE5;border-bottom:3px solid #1A1208}
        .cp-hero-accent{height:4px}
        .cp-hero-inner{max-width:1300px;margin:0 auto;padding:clamp(24px,4vw,52px) clamp(16px,4vw,48px) clamp(20px,3.5vw,40px);text-align:center}
        .cp-hero-tag{display:inline-flex;align-items:center;gap:8px;margin-bottom:16px}
        .cp-hero-pill{font-family:system-ui,sans-serif;font-size:7.5px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;padding:3px 12px;color:#fff}
        .cp-hero-meta{font-family:system-ui,sans-serif;font-size:8.5px;color:#AAA;letter-spacing:.14em}
        .cp-hero-h1{font-family:'Playfair Display',serif;font-size:clamp(1.9rem,5vw,4.5rem);font-weight:900;letter-spacing:-.025em;color:#1A1208;line-height:1.05;margin-bottom:12px}
        .cp-hero-h1 em{font-style:italic;color:#6B5C40;font-size:.82em}
        .cp-hero-desc{font-size:clamp(13px,1.5vw,15px);color:#6B5C40;font-style:italic;line-height:1.8;max-width:580px;margin:0 auto 16px}
        .cp-hero-divider{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:16px}
        .cp-hero-line{height:1px;width:60px}
        .cp-hero-dot{font-size:11px}
        .cp-hero-long{font-size:clamp(12.5px,1.3vw,13.5px);color:#6B5C40;font-style:italic;line-height:1.82;max-width:660px;margin:0 auto 24px}
        .cp-hero-stats{display:inline-flex;border:1.5px solid #1A1208;background:#1A1208}
        .cp-hero-stat{padding:12px 18px;text-align:center;border-right:1px solid rgba(255,255,255,.1)}
        .cp-hero-stat:last-child{border-right:none}
        .cp-hero-stat-v{font-family:'Playfair Display',serif;font-size:clamp(1.1rem,2vw,1.7rem);font-weight:900;color:#fff;line-height:1;margin-bottom:3px}
        .cp-hero-stat-l{font-family:system-ui,sans-serif;font-size:7px;font-weight:700;text-transform:uppercase;letter-spacing:.18em;color:rgba(255,255,255,.3);white-space:nowrap}
        @media(max-width:500px){
          .cp-hero-stats{flex-direction:column;width:100%;max-width:260px}
          .cp-hero-stat{border-right:none;border-bottom:1px solid rgba(255,255,255,.1)}
          .cp-hero-stat:last-child{border-bottom:none}
        }

        /* Layout */
        .cp-layout{max-width:1300px;margin:0 auto;padding:clamp(16px,3vw,32px) clamp(16px,4vw,48px) 0;display:grid;grid-template-columns:1fr 280px;gap:clamp(16px,2.5vw,28px);align-items:start}
        @media(max-width:1000px){.cp-layout{grid-template-columns:1fr !important}}

        /* Results bar */
        .cp-results{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid #D8D2C4}
        .cp-results-text{font-family:system-ui,sans-serif;font-size:11px;color:#6B5C40}
        .cp-results-text strong{color:#1A1208}
        .cp-results-link{font-family:system-ui,sans-serif;font-size:10px;color:#AAA;text-decoration:none;transition:color .15s}
        .cp-results-link:hover{color:#1A1208}

        /* Card grid */
        .cp-grid{display:grid;grid-template-columns:repeat(3,1fr);border:1.5px solid #1A1208;background:#1A1208;gap:1.5px}
        @media(max-width:860px){.cp-grid{grid-template-columns:repeat(2,1fr) !important}}
        @media(max-width:500px){.cp-grid{display:none !important}}

        /* Startup card — with image top */
        .cp-card{background:#FDFCF9;display:flex;flex-direction:column;text-decoration:none;transition:all .15s;position:relative;overflow:hidden}
        .cp-card:hover{background:#F3EFE5;transform:translate(-2px,-2px);box-shadow:4px 4px 0 #1A1208;z-index:1;border-color:#1A1208 !important}
        .cp-card-img{width:100%;aspect-ratio:16/9;position:relative;background:#EDE9DF;overflow:hidden;flex-shrink:0}
        .cp-card-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:sepia(12%) contrast(105%);transition:transform .5s}
        .cp-card:hover .cp-card-img img{transform:scale(1.04)}
        .cp-card-ph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#EDE9DF,#C8C2B4)}
        .cp-card-ph-l{font-family:'Playfair Display',serif;font-size:3rem;font-weight:900;color:#AAA;line-height:1}
        .cp-card-stripe{height:3px;flex-shrink:0}
        .cp-card-body{padding:13px 13px 0;flex:1;display:flex;flex-direction:column;gap:5px}
        .cp-card-head{display:flex;align-items:flex-start;gap:8px}
        .cp-card-logo{width:32px;height:32px;border:1px solid #D8D2C4;background:#F3EFE5;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0}
        .cp-card-name{font-family:'Playfair Display',serif;font-size:clamp(.85rem,1vw,.95rem);font-weight:700;color:#1A1208;line-height:1.25;flex:1}
        .cp-card:hover .cp-card-name{text-decoration:underline}
        .cp-card-chips{display:flex;flex-wrap:wrap;gap:3px 8px;font-family:system-ui,sans-serif;font-size:9px;color:#AAA}
        .cp-card-desc{font-size:11.5px;color:#5A4A30;font-style:italic;line-height:1.65;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;flex:1}
        .cp-card-foot{display:flex;align-items:center;justify-content:space-between;padding:9px 13px;border-top:1px solid #D8D2C4;margin-top:auto}
        .cp-card-verified{display:flex;align-items:center;gap:4px;font-family:system-ui,sans-serif;font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:#15803D}
        .cp-card-featured{font-family:system-ui,sans-serif;font-size:7.5px;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:#B45309}

        /* Mobile list */
        .cp-mob{display:none;border:1.5px solid #1A1208;background:#FDFCF9;flex-direction:column}
        @media(max-width:500px){.cp-mob{display:flex !important}}
        .cp-mob-row{display:flex;align-items:center;gap:12px;padding:13px 14px;text-decoration:none;border-bottom:1px solid #D8D2C4;transition:background .15s}
        .cp-mob-row:last-child{border-bottom:none}
        .cp-mob-row:hover{background:#F3EFE5}
        .cp-mob-logo{width:40px;height:40px;border:1px solid #D8D2C4;background:#F3EFE5;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0}
        .cp-mob-info{flex:1;min-width:0}
        .cp-mob-name{font-family:'Playfair Display',serif;font-size:.9rem;font-weight:700;color:#1A1208;line-height:1.2}
        .cp-mob-meta{font-family:system-ui,sans-serif;font-size:9.5px;color:#AAA;margin-top:1px}
        .cp-mob-desc{font-size:11px;color:#5A4A30;font-style:italic;margin-top:2px;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}

        /* Pagination */
        .cp-pag{display:flex;align-items:center;justify-content:center;gap:4px;margin-top:clamp(20px,3vw,32px);padding-top:clamp(16px,2.5vw,24px);border-top:1px solid #D8D2C4}
        .cp-pag-btn{padding:6px 16px;font-family:system-ui,sans-serif;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border:1px solid #C8C2B4;background:#FDFCF9;color:#6B5C40;text-decoration:none;transition:all .15s}
        .cp-pag-btn:hover{border-color:#1A1208;color:#1A1208}
        .cp-pag-btn.dis{color:#C8C2B4;pointer-events:none}
        .cp-pag-num{width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif;font-size:11px;font-weight:700;border:1px solid #C8C2B4;text-decoration:none;color:#6B5C40;transition:all .15s}
        .cp-pag-num:hover{border-color:#1A1208;color:#1A1208}
        .cp-pag-num.on{background:#1A1208;color:#fff;border-color:#1A1208}

        /* Sidebar */
        .cp-side{display:flex;flex-direction:column;gap:14px}
        .cp-side-box{border:1.5px solid #1A1208;background:#FDFCF9;padding:18px}
        .cp-side-box.dk{background:#1A1208}
        .cp-side-ey{font-family:system-ui,sans-serif;font-size:7.5px;font-weight:900;text-transform:uppercase;letter-spacing:.28em;color:#AAA;margin-bottom:8px}
        .cp-side-box.dk .cp-side-ey{color:#E8C547}
        .cp-side-h{font-family:'Playfair Display',serif;font-size:.92rem;font-weight:700;color:#1A1208;margin-bottom:5px;line-height:1.3}
        .cp-side-box.dk .cp-side-h{color:#fff}
        .cp-side-p{font-size:11.5px;color:#5A4A30;font-style:italic;line-height:1.65;margin-bottom:12px}
        .cp-side-box.dk .cp-side-p{color:rgba(255,255,255,.38)}
        .cp-side-btn{display:block;text-align:center;font-family:system-ui,sans-serif;font-size:8.5px;font-weight:900;text-transform:uppercase;letter-spacing:.2em;background:#fff;color:#1A1208;padding:9px;text-decoration:none;transition:background .15s}
        .cp-side-btn:hover{background:#E8C547}
        .cp-side-rank{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px}
        .cp-side-rank li a{display:flex;align-items:center;gap:9px;text-decoration:none}
        .cp-side-rank-n{font-family:'Playfair Display',serif;font-size:11px;font-weight:900;color:#C8C2B4;width:18px;flex-shrink:0}
        .cp-side-rank-name{font-size:12px;color:#5A4A30;font-style:italic;line-height:1.3;transition:color .15s}
        .cp-side-rank li a:hover .cp-side-rank-name{color:#1A1208;text-decoration:underline}
        .cp-side-list{list-style:none;padding:0;margin:0}
        .cp-side-list li{border-bottom:1px solid #D8D2C4}
        .cp-side-list li:last-child{border-bottom:none}
        .cp-side-list a{display:flex;align-items:center;justify-content:space-between;padding:6px 0;font-size:12.5px;color:#5A4A30;font-style:italic;text-decoration:none;transition:color .15s}
        .cp-side-list a:hover{color:#1A1208;text-decoration:underline}

        /* CTA — blog/about gold pattern */
        .cp-cta{background:#1A1208;padding:clamp(20px,3.5vw,36px) clamp(16px,3vw,36px);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;margin-top:clamp(20px,3.5vw,32px);position:relative;overflow:hidden}
        .cp-cta::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#92400E,#D97706,#E8C547,#D97706,#92400E)}
        .cp-cta-ey{font-family:system-ui,sans-serif;font-size:7.5px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;color:rgba(232,197,71,.65);margin-bottom:5px}
        .cp-cta-h{font-family:'Playfair Display',serif;font-size:clamp(1rem,2vw,1.35rem);font-weight:700;color:#fff;margin-bottom:4px;line-height:1.25}
        .cp-cta-p{font-size:12px;color:rgba(255,255,255,.38);font-style:italic}
        .cp-cta-btn{flex-shrink:0;display:inline-flex;align-items:center;gap:6px;background:#D97706;color:#1A1208;padding:11px 22px;font-family:system-ui,sans-serif;font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:.14em;text-decoration:none;transition:opacity .15s;box-shadow:3px 3px 0 #92400E}
        .cp-cta-btn:hover{opacity:.88}

        /* Internal links */
        .cp-links{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
        @media(max-width:800px){.cp-links{grid-template-columns:repeat(2,1fr) !important}}
        .cp-link-card{display:flex;flex-direction:column;gap:4px;padding:11px 12px;border:1px solid #D8D2C4;background:#FDFCF9;text-decoration:none;transition:border-color .15s}
        .cp-link-card:hover{border-color:#1A1208}
        .cp-link-title{font-family:system-ui,sans-serif;font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#1A1208}
        .cp-link-desc{font-family:system-ui,sans-serif;font-size:8.5px;color:#AAA}

        /* Footer — exact blog/about pattern */
        .cp-footer{border-top:1px solid #D8D2C4;padding-top:1rem;margin-top:clamp(20px,3vw,32px);padding-bottom:8px}
        .cp-footer-note{font-family:system-ui,sans-serif;font-size:8.5px;color:#BBB0A0;line-height:1.75}
        .cp-footer-nav{display:flex;flex-wrap:wrap;gap:6px 14px;list-style:none;margin:12px 0 0;padding:0}
        .cp-footer-nav a{font-family:system-ui,sans-serif;font-size:8.5px;color:#AAA;text-transform:uppercase;letter-spacing:.1em;text-decoration:none;transition:color .15s}
        .cp-footer-nav a:hover{color:#1A1208}
      `}</style>

      <Navbar />

      {/* BREADCRUMB */}
      <div className="cp-bc">
        <ol>
          <li><a href="/">UpForge</a></li>
          <li style={{color:"#C8C2B4"}}>/</li>
          <li><a href="/startup">Registry</a></li>
          <li style={{color:"#C8C2B4"}}>/</li>
          <li><a href="/startups">Sectors</a></li>
          <li style={{color:"#C8C2B4"}}>/</li>
          <li style={{color:"#1A1208",fontWeight:600}}>{displayName}</li>
        </ol>
      </div>

      {/* HERO — centered editorial with unique India-themed sector illustration */}
      <header className="cp-hero a0" style={{background:hero.bgColor}}>
        <div className="cp-hero-accent" style={{background:color}} />

        {/* India-themed sector illustration — unique per sector */}
        <div
          aria-hidden="true"
          style={{overflow:"hidden",borderBottom:`1px solid ${color}22`,position:"relative"}}
          dangerouslySetInnerHTML={{__html:hero.svg}}
        />

        <div className="cp-hero-inner">
          <div className="cp-hero-tag">
            <span className="cp-hero-pill" style={{background:color}}>{displayName}</span>
            <span className="cp-hero-meta">UpForge Registry · India 2026</span>
          </div>
          <h1 className="cp-hero-h1 pf">
            {displayName}<br />
            <em>Startups in India</em>
          </h1>
          <p className="cp-hero-desc">{description}</p>
          <div className="cp-hero-divider">
            <span className="cp-hero-line" style={{background:color}} />
            <span className="cp-hero-dot" style={{color}}>✦</span>
            <span className="cp-hero-line" style={{background:color}} />
          </div>
          <p className="cp-hero-long">{longDesc}</p>
          <div className="cp-hero-stats">
            {[
              {v:total.toLocaleString(),l:"Verified Startups"},
              {v:"Verified",l:"All Profiles"},
              {v:"Daily",l:"Updated"},
              {v:"Free",l:"To Browse"},
            ].map((s,i)=>(
              <div key={i} className="cp-hero-stat">
                <p className="pf cp-hero-stat-v">{s.v}</p>
                <p className="cp-hero-stat-l">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="cp-layout a1">

        {/* STARTUP GRID COLUMN */}
        <section aria-label={`${displayName} startups in India`}>
          <div className="cp-results">
            <p className="cp-results-text" aria-live="polite">
              Showing <strong>{(page-1)*PAGE_SIZE+1}–{Math.min(page*PAGE_SIZE,total)}</strong> of{" "}
              <strong>{total.toLocaleString()}</strong> {displayName} startups
              {totalPages>1 && <span style={{color:"#AAA"}}> · Page {page}/{totalPages}</span>}
            </p>
            <a href="/startups" className="cp-results-link">All sectors →</a>
          </div>

          {/* Desktop card grid */}
          <div className="cp-grid">
            {startups.map(s=>(
              <a key={s.id} href={`/startup/${s.slug}`} className="cp-card cp-hc">
                {/* Image */}
                <div className="cp-card-img">
                  {s.logo_url
                    ? <img src={s.logo_url} alt={s.name} loading="lazy" />
                    : <div className="cp-card-ph"><span className="cp-card-ph-l">{s.name.charAt(0)}</span></div>
                  }
                </div>
                {/* Sector accent stripe */}
                <div className="cp-card-stripe" style={{background:color}} />
                {/* Body */}
                <div className="cp-card-body">
                  <div className="cp-card-head">
                    <div className="cp-card-logo">
                      {s.logo_url
                        ? <Image src={s.logo_url} alt={s.name} width={32} height={32} className="object-contain" loading="lazy" />
                        : <span style={{fontSize:13,fontWeight:700,color:"#AAA",fontFamily:"'Playfair Display',serif"}}>{s.name.charAt(0)}</span>
                      }
                    </div>
                    <span className="cp-card-name pf">{s.name}</span>
                  </div>
                  <div className="cp-card-chips">
                    {s.city && <span>📍 {s.city}</span>}
                    {s.founded_year && <span>Est. {s.founded_year}</span>}
                  </div>
                  <p className="cp-card-desc">{s.description||"Building for India's next decade."}</p>
                </div>
                <div className="cp-card-foot">
                  <span className="cp-card-verified">
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#15803D" strokeWidth="1.4" strokeLinecap="round"/></svg>
                    Verified
                  </span>
                  {s.is_featured && <span className="cp-card-featured">Featured</span>}
                  <ArrowUpRight style={{width:11,height:11,color:"#C8C2B4"}} aria-hidden="true" />
                </div>
              </a>
            ))}
          </div>

          {/* Mobile LinkedIn list */}
          <div className="cp-mob">
            {startups.map(s=>(
              <a key={s.id} href={`/startup/${s.slug}`} className="cp-mob-row">
                <div className="cp-mob-logo">
                  {s.logo_url
                    ? <Image src={s.logo_url} alt={s.name} width={40} height={40} className="object-contain" loading="lazy" />
                    : <span style={{fontSize:13,fontWeight:700,color:"#AAA",fontFamily:"'Playfair Display',serif"}}>{s.name.charAt(0)}</span>
                  }
                </div>
                <div className="cp-mob-info">
                  <p className="cp-mob-name pf">{s.name}</p>
                  <p className="cp-mob-meta">{s.category||displayName}{s.founded_year&&` · ${s.founded_year}`}{s.city&&` · ${s.city}`}</p>
                  {s.description && <p className="cp-mob-desc">{s.description}</p>}
                </div>
                <span style={{fontSize:16,color:"#C8C2B4",flexShrink:0}}>›</span>
              </a>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages>1 && (
            <nav className="cp-pag" aria-label={`${displayName} startups pagination`}>
              <a href={pgHref(page-1)} className={`cp-pag-btn${page===1?" dis":""}`} aria-disabled={page===1}>← Prev</a>
              {pgNums.map(p=>(
                <a key={p} href={pgHref(p)} className={`cp-pag-num${p===page?" on":""}`} aria-current={p===page?"page":undefined}>{p}</a>
              ))}
              <a href={pgHref(page+1)} className={`cp-pag-btn${page===totalPages?" dis":""}`} aria-disabled={page===totalPages}>Next →</a>
            </nav>
          )}
        </section>

        {/* SIDEBAR — blog "By the Numbers" pattern */}
        <aside className="cp-side" style={{position:"sticky",top:88}}>
          {/* Submit CTA */}
          <div className="cp-side-box dk">
            <p className="cp-side-ey">List Free · UpForge</p>
            <p className="cp-side-h pf">Building a {displayName} startup?</p>
            <p className="cp-side-p">Get verified and indexed. Free forever.</p>
            <a href="/submit" className="cp-side-btn">Submit Startup →</a>
          </div>

          {/* Top in sector */}
          {startups.slice(0,6).length>0 && (
            <div className="cp-side-box" style={{position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${color},#E8C547,${color})`}} />
              <p className="cp-side-ey">Top in {displayName}</p>
              <ul className="cp-side-rank">
                {startups.slice(0,6).map((s,i)=>(
                  <li key={s.id}>
                    <a href={`/startup/${s.slug}`}>
                      <span className="cp-side-rank-n pf">{String(i+1).padStart(2,"0")}</span>
                      <span className="cp-side-rank-name">{s.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related sectors */}
          {related.length>0 && (
            <div className="cp-side-box">
              <p className="cp-side-ey">Other Sectors</p>
              <ul className="cp-side-list">
                {related.map(c=>(
                  <li key={c}>
                    <a href={`/startups/${catSlug(c)}`}>
                      <span>{getDisplayName(c)}</span>
                      <span style={{color:"#C8C2B4",fontSize:12}}>›</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href="/startups" style={{display:"block",marginTop:8,paddingTop:8,borderTop:"1px solid #D8D2C4",fontFamily:"system-ui,sans-serif",fontSize:"8px",fontWeight:700,textTransform:"uppercase",letterSpacing:".18em",color:"#AAA",textDecoration:"none"}}>
                All sectors →
              </a>
            </div>
          )}
        </aside>
      </div>

      {/* BELOW-GRID CONTENT */}
      <div style={{maxWidth:1300,margin:"0 auto",padding:`0 clamp(16px,4vw,48px)`}}>

        {/* CTA — blog/about gold pattern */}
        <div className="cp-cta a2">
          <div>
            <p className="cp-cta-ey">UpForge Registry</p>
            <p className="cp-cta-h pf">Building a {displayName} startup?</p>
            <p className="cp-cta-p">Get verified and indexed in India's most trusted startup registry. Free forever.</p>
          </div>
          <a href="/submit" className="cp-cta-btn">
            List Free <ArrowRight style={{width:13,height:13}} aria-hidden="true" />
          </a>
        </div>

        {/* Internal links — exact blog/about pattern */}
        <section className="a3" style={{paddingTop:"clamp(18px,3vw,30px)",borderTop:"1px solid #C8C2B4",marginTop:"clamp(18px,3vw,28px)"}}>
          <p style={{fontFamily:"system-ui,sans-serif",fontSize:8.5,letterSpacing:".3em",textTransform:"uppercase",color:"#AAA",marginBottom:14}}>Explore on UpForge</p>
          <div className="cp-links">
            {[
              {l:"All Indian Startups",     h:"/startup",  desc:"Full verified database"},
              {l:"Browse by Sector",        h:"/startups", desc:`${related.length}+ categories`},
              {l:"The Forge — Blog",        h:"/blog",     desc:"Startup intelligence"},
              {l:"Submit Your Startup",     h:"/submit",   desc:"Get listed free"},
              ...related.slice(0,4).map(c=>({l:`${getDisplayName(c)} Startups`,h:`/startups/${catSlug(c)}`,desc:"Verified profiles"})),
            ].slice(0,8).map(lnk=>(
              <a key={lnk.h+lnk.l} href={lnk.h} className="cp-link-card">
                <span className="cp-link-title">
                  {lnk.l}
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true" style={{display:"inline",marginLeft:4,verticalAlign:"middle"}}>
                    <path d="M2 7L7 2M7 2H3M7 2V6" stroke="#1A1208" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="cp-link-desc">{lnk.desc}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Footer — exact blog/about pattern */}
        <footer className="cp-footer a3">
          <p className="cp-footer-note">
            * Registry data sourced from DPIIT, Tracxn, Inc42, Forbes India, Hurun India 2025, and company announcements as of March 2026.
            UpForge is an independent registry — no paid placements, no sponsored rankings.
          </p>
          <nav aria-label="Footer navigation">
            <ul className="cp-footer-nav">
              {[
                {l:"The Founder Chronicle",  h:"/"},
                {l:"Startup Registry India", h:"/startup"},
                {l:"Browse by Sector",       h:"/startups"},
                {l:"The Forge — Blog",       h:"/blog"},
                {l:"Free Valuation Tool",    h:"/report"},
                {l:"Submit Startup",         h:"/submit"},
                ...related.slice(0,3).map(c=>({l:`${getDisplayName(c)} Startups`,h:`/startups/${catSlug(c)}`})),
              ].map(lnk=>(
                <li key={lnk.h+lnk.l}><a href={lnk.h}>{lnk.l}</a></li>
              ))}
            </ul>
          </nav>
        </footer>

      </div>
    </>
  )
}
