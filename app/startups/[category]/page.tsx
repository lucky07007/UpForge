// app/startups/[category]/page.tsx — FINAL
// Centered hero with sector color accent bar, image grid cards,
// scoped CSS (no global reset), single Footer, mobile list view,
// full SEO long-tail keywords, structured data

import { createClient }     from "@/lib/supabase/server"
import { createReadClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  categoryToSlug, getDisplayName, slugToDbCategory,
  generateCategoryDescription, generateCategoryLongDescription,
} from "@/lib/categories"

const PAGE_SIZE = 24

interface PageProps {
  params: Promise<{ category:string }>
  searchParams?: Promise<{ page?:string }>
}
interface StartupRow {
  id:string; name:string; slug:string
  description?:string|null; logo_url?:string|null
  founded_year?:number|null; city?:string|null
  category?:string|null; is_featured?:boolean
}

// Accent colors per sector slug
const COLORS:Record<string,string> = {
  "ai":"#2563EB","ai-ml":"#2563EB","fintech":"#059669","edtech":"#D97706",
  "healthtech":"#DC2626","saas":"#7C3AED","ecommerce":"#EA580C","e-commerce":"#EA580C",
  "agritech":"#16A34A","climate-tech":"#0D9488","logistics":"#92400E",
  "biotech":"#BE185D","devtools":"#4F46E5","web3":"#6D28D9","robotics":"#1D4ED8",
  "gaming":"#B45309","creator-economy":"#C026D3","d2c":"#EA580C","deeptech":"#1D4ED8",
  "spacetech":"#7C3AED","mobility":"#0369A1",
}
function accent(slug:string):string { return COLORS[slug]??"#1A1208" }

// SEO keyword map per sector
const SECTOR_KEYWORDS:Record<string,string> = {
  "ai-ml":"artificial intelligence startups India, AI ML companies India, machine learning startups Bengaluru, LLM companies India 2026",
  "fintech":"fintech startups India 2026, financial technology companies India, payment startups India, neobank India, BNPL startups India",
  "edtech":"edtech startups India, education technology companies India, online learning platforms India, upskilling startups",
  "healthtech":"healthtech startups India, health technology companies India, telemedicine startups India, digital health India",
  "saas":"SaaS startups India, B2B software companies India, cloud software India, enterprise SaaS India",
  "ecommerce":"ecommerce startups India, D2C brands India, quick commerce India, online retail startups India",
  "agritech":"agritech startups India, agriculture technology India, farmer tech startups, agri fintech India",
  "climate-tech":"climate tech startups India, cleantech India, renewable energy startups India, EV startups India",
}
function seoKeywords(slug:string,displayName:string):string {
  return SECTOR_KEYWORDS[slug] ?? `${displayName} startups India 2026, ${displayName} companies India, ${displayName} founders India, verified ${displayName} startups`
}

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
  const description = `Discover ${n}+ verified ${displayName} startups in India — founding teams, company details, city, and sector insights. Browse India's most trusted independent startup registry for ${displayName} companies.`
  const url = `https://www.upforge.in/startups/${slug}`
  return {
    title, description,
    keywords: seoKeywords(slug,displayName),
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
  const url         = `https://www.upforge.in/startups/${slug}`

  const pgHref = (p:number)=>p===1?`/startups/${slug}`:`/startups/${slug}?page=${p}`
  const winSize = Math.min(5,totalPages)
  const winStart = page<=3||totalPages<=5?1:page>=totalPages-2?totalPages-4:page-2
  const pgNums = Array.from({length:winSize},(_,i)=>winStart+i)

  const schemas = [
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[
      {"@type":"ListItem","position":1,"name":"Home","item":"https://www.upforge.in"},
      {"@type":"ListItem","position":2,"name":"Registry","item":"https://www.upforge.in/startup"},
      {"@type":"ListItem","position":3,"name":"Sectors","item":"https://www.upforge.in/startups"},
      {"@type":"ListItem","position":4,"name":`${displayName} Startups`,item:url},
    ]},
    {"@context":"https://schema.org","@type":"CollectionPage","@id":`${url}#cp`,
      "name":`${displayName} Startups in India 2026`,"description":description,
      "url":url,"inLanguage":"en-IN","numberOfItems":total},
    {"@context":"https://schema.org","@type":"ItemList",
      "name":`Top ${displayName} Startups in India`,
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

        /* ALL SCOPED — no global reset */
        .cp { font-family:'EB Garamond',Georgia,serif; color:#1A1208; background:#F2EFE6; min-height:100vh; }

        .cp-stripe { height:3px; }

        .cp-bc { background:#FDFCF8; border-bottom:1px solid #D5CEBC; }
        .cp-bc ol { max-width:1280px; margin:0 auto; padding:0 clamp(16px,4vw,48px); display:flex; align-items:center; gap:6px; height:32px; font-family:system-ui,sans-serif; font-size:10px; color:#9C8B72; list-style:none; }
        .cp-bc a { color:#9C8B72; text-decoration:none; transition:color .15s; }
        .cp-bc a:hover { color:#1A1208; }
        .cp-bc-sep { color:#D5CEBC; }

        /* ── HERO — centered, color accent ── */
        .cp-hero { border-bottom:3px solid #1A1208; background:#F2EFE6; padding:0; }
        .cp-hero-accent { height:4px; }
        .cp-hero-inner { max-width:1280px; margin:0 auto; padding:clamp(28px,4.5vw,52px) clamp(16px,4vw,48px) clamp(20px,3.5vw,40px); text-align:center; }
        .cp-hero-tag { display:inline-flex; align-items:center; gap:8px; margin-bottom:16px; }
        .cp-hero-tag-pill { font-family:system-ui,sans-serif; font-size:8px; font-weight:900; text-transform:uppercase; letter-spacing:.32em; padding:3px 12px; background:#1A1208; color:#fff; }
        .cp-hero-tag-meta { font-family:system-ui,sans-serif; font-size:8px; color:#9C8B72; letter-spacing:.16em; }
        .cp-hero-h1 { font-family:'Playfair Display',serif; font-size:clamp(1.9rem,5vw,4.2rem); font-weight:900; letter-spacing:-.02em; color:#1A1208; line-height:1.05; margin-bottom:12px; }
        .cp-hero-h1 em { font-style:italic; color:#6B5C40; font-size:.85em; }
        .cp-hero-desc { font-size:clamp(13px,1.4vw,14.5px); color:#6B5C40; font-style:italic; line-height:1.8; max-width:600px; margin:0 auto 20px; }
        .cp-hero-divider { display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:20px; }
        .cp-hero-div-line { height:1px; width:60px; }
        .cp-hero-div-dot { font-size:11px; }
        .cp-hero-long { font-size:clamp(12.5px,1.2vw,13.5px); color:#6B5C40; font-style:italic; line-height:1.8; max-width:680px; margin:0 auto 24px; }

        /* Count + stats row */
        .cp-hero-stats { display:inline-flex; border:1px solid #D5CEBC; background:#1A1208; }
        .cp-hero-stat { padding:12px 20px; text-align:center; border-right:1px solid rgba(255,255,255,.1); }
        .cp-hero-stat:last-child { border-right:none; }
        .cp-hero-stat-v { font-family:'Playfair Display',serif; font-size:clamp(1.2rem,2vw,1.7rem); font-weight:900; color:#fff; line-height:1; margin-bottom:3px; }
        .cp-hero-stat-l { font-family:system-ui,sans-serif; font-size:7px; font-weight:700; text-transform:uppercase; letter-spacing:.2em; color:rgba(255,255,255,.35); white-space:nowrap; }

        /* ── LAYOUT ── */
        .cp-layout { max-width:1280px; margin:0 auto; padding:clamp(16px,3vw,32px) clamp(16px,4vw,48px) 48px; display:grid; grid-template-columns:1fr 240px; gap:28px; align-items:start; }
        @media(max-width:900px) { .cp-layout { grid-template-columns:1fr !important; } }

        .cp-results { display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; padding-bottom:10px; border-bottom:1px solid #D5CEBC; }
        .cp-results-text { font-family:system-ui,sans-serif; font-size:11px; color:#6B5C40; }
        .cp-results-text strong { color:#1A1208; }
        .cp-results-link { font-family:system-ui,sans-serif; font-size:10px; color:#9C8B72; text-decoration:none; transition:color .15s; }
        .cp-results-link:hover { color:#1A1208; }

        /* ── STARTUP CARDS with image ── */
        .cp-grid { display:grid; grid-template-columns:repeat(3,1fr); border:1px solid #D5CEBC; background:#EAE4D4; }
        @media(max-width:800px) { .cp-grid { grid-template-columns:repeat(2,1fr) !important; } }
        @media(max-width:480px) { .cp-grid { display:none !important; } }
        .cp-card { background:#FDFCF8; display:flex; flex-direction:column; text-decoration:none; border-right:1px solid #EAE4D4; border-bottom:1px solid #EAE4D4; transition:all .15s; position:relative; overflow:hidden; }
        .cp-card:hover { background:#F2EFE6; transform:translate(-2px,-2px); box-shadow:3px 3px 0 #1A1208; z-index:1; border-color:#1A1208 !important; }
        .cp-card-img { width:100%; aspect-ratio:16/9; position:relative; background:#EDE9DC; overflow:hidden; flex-shrink:0; }
        .cp-card-img img { width:100%; height:100%; object-fit:cover; filter:sepia(12%) contrast(105%); transition:transform .4s; }
        .cp-card:hover .cp-card-img img { transform:scale(1.04); }
        .cp-card-ph { width:100%; height:100%; display:flex; align-items:center; justify-content:center; }
        .cp-card-ph-letter { font-family:'Playfair Display',serif; font-size:3rem; font-weight:900; color:#C8C2B4; line-height:1; }
        .cp-card-accent { height:3px; flex-shrink:0; }
        .cp-card-body { padding:14px 14px 0; flex:1; display:flex; flex-direction:column; gap:5px; }
        .cp-card-head { display:flex; align-items:flex-start; gap:9px; }
        .cp-card-logo { width:34px; height:34px; border:1px solid #EAE4D4; background:#F2EFE6; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0; }
        .cp-card-name { font-family:'Playfair Display',serif; font-size:clamp(.85rem,1vw,.95rem); font-weight:700; color:#1A1208; line-height:1.25; flex:1; }
        .cp-card:hover .cp-card-name { text-decoration:underline; }
        .cp-card-meta { display:flex; flex-wrap:wrap; gap:3px 8px; }
        .cp-card-chip { font-family:system-ui,sans-serif; font-size:9px; color:#9C8B72; }
        .cp-card-desc { font-size:11.5px; color:#6B5C40; font-style:italic; line-height:1.6; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; flex:1; }
        .cp-card-foot { display:flex; align-items:center; justify-content:space-between; padding:9px 14px; border-top:1px solid #EAE4D4; margin-top:auto; }
        .cp-card-verified { display:flex; align-items:center; gap:4px; font-family:system-ui,sans-serif; font-size:8px; font-weight:800; text-transform:uppercase; letter-spacing:.14em; color:#15803D; }
        .cp-card-arrow { font-size:13px; color:#D5CEBC; transition:all .15s; }
        .cp-card:hover .cp-card-arrow { color:#1A1208; }

        /* ── MOBILE LIST ── */
        .cp-mob { display:none; border:1px solid #D5CEBC; background:#FDFCF8; }
        @media(max-width:480px) { .cp-mob { display:flex !important; flex-direction:column; } }
        .cp-mob-row { display:flex; align-items:center; gap:12px; padding:12px 14px; text-decoration:none; border-bottom:1px solid #EAE4D4; transition:background .15s; }
        .cp-mob-row:last-child { border-bottom:none; }
        .cp-mob-row:hover { background:#F2EFE6; }
        .cp-mob-logo { width:40px; height:40px; border:1px solid #EAE4D4; background:#F2EFE6; display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0; }
        .cp-mob-info { flex:1; min-width:0; }
        .cp-mob-name { font-family:'Playfair Display',serif; font-size:.9rem; font-weight:700; color:#1A1208; }
        .cp-mob-meta { font-family:system-ui,sans-serif; font-size:9.5px; color:#9C8B72; margin-top:1px; }
        .cp-mob-desc { font-size:11px; color:#6B5C40; font-style:italic; margin-top:2px; display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden; }
        .cp-mob-arrow { font-size:14px; color:#D5CEBC; flex-shrink:0; }

        /* ── PAGINATION ── */
        .cp-pag { display:flex; align-items:center; justify-content:center; gap:4px; margin-top:28px; padding-top:20px; border-top:1px solid #D5CEBC; }
        .cp-pag-btn { padding:6px 14px; font-family:system-ui,sans-serif; font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; border:1px solid #D5CEBC; background:#FDFCF8; color:#6B5C40; text-decoration:none; transition:all .15s; }
        .cp-pag-btn:hover { border-color:#1A1208; color:#1A1208; }
        .cp-pag-btn.dis { color:#D5CEBC; pointer-events:none; }
        .cp-pag-num { width:32px; height:32px; display:flex; align-items:center; justify-content:center; font-family:system-ui,sans-serif; font-size:11px; font-weight:700; border:1px solid #D5CEBC; text-decoration:none; color:#6B5C40; transition:all .15s; }
        .cp-pag-num:hover { border-color:#1A1208; color:#1A1208; }
        .cp-pag-num.on { background:#1A1208; color:#fff; border-color:#1A1208; }

        /* ── SIDEBAR ── */
        .cp-side { position:sticky; top:88px; display:flex; flex-direction:column; gap:14px; }
        .cp-side-box { border:1px solid #D5CEBC; background:#FDFCF8; padding:16px; }
        .cp-side-box.dark { background:#1A1208; border-color:#1A1208; }
        .cp-side-ey { font-family:system-ui,sans-serif; font-size:7.5px; font-weight:900; text-transform:uppercase; letter-spacing:.28em; color:#9C8B72; margin-bottom:8px; }
        .cp-side-box.dark .cp-side-ey { color:#E8933A; }
        .cp-side-h { font-family:'Playfair Display',serif; font-size:.9rem; font-weight:700; color:#1A1208; margin-bottom:5px; line-height:1.3; }
        .cp-side-box.dark .cp-side-h { color:#fff; }
        .cp-side-p { font-size:11.5px; color:#6B5C40; font-style:italic; line-height:1.6; margin-bottom:12px; }
        .cp-side-box.dark .cp-side-p { color:rgba(255,255,255,.42); }
        .cp-side-btn { display:block; text-align:center; font-family:system-ui,sans-serif; font-size:8.5px; font-weight:900; text-transform:uppercase; letter-spacing:.2em; background:#fff; color:#1A1208; padding:8px; text-decoration:none; transition:background .15s; }
        .cp-side-btn:hover { background:#E8933A; }
        .cp-side-rank { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:7px; }
        .cp-side-rank li a { display:flex; align-items:center; gap:9px; text-decoration:none; }
        .cp-side-rank-n { font-family:'Playfair Display',serif; font-size:11px; font-weight:900; color:#D5CEBC; width:18px; flex-shrink:0; }
        .cp-side-rank-name { font-size:12px; color:#6B5C40; font-style:italic; line-height:1.3; transition:color .15s; }
        .cp-side-rank li a:hover .cp-side-rank-name { color:#1A1208; text-decoration:underline; }
        .cp-side-list { list-style:none; padding:0; margin:0; }
        .cp-side-list li a { display:flex; align-items:center; justify-content:space-between; padding:6px 0; font-size:12px; color:#6B5C40; text-decoration:none; font-style:italic; border-bottom:1px solid #EAE4D4; transition:color .15s; }
        .cp-side-list li:last-child a { border-bottom:none; }
        .cp-side-list li a:hover { color:#1A1208; text-decoration:underline; }

        /* ── CTA ── */
        .cp-cta { background:#1A1208; padding:clamp(20px,3vw,36px) clamp(16px,3vw,36px); display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; margin-top:28px; }
        .cp-cta-ey { font-family:system-ui,sans-serif; font-size:7.5px; font-weight:900; text-transform:uppercase; letter-spacing:.3em; color:#E8933A; margin-bottom:5px; }
        .cp-cta-h { font-family:'Playfair Display',serif; font-size:clamp(1rem,1.8vw,1.3rem); font-weight:700; color:#fff; margin-bottom:4px; line-height:1.3; }
        .cp-cta-p { font-size:12px; color:rgba(255,255,255,.42); font-style:italic; }
        .cp-cta-btn { flex-shrink:0; display:inline-flex; align-items:center; gap:6px; background:#fff; color:#1A1208; padding:10px 22px; font-family:system-ui,sans-serif; font-size:9px; font-weight:900; text-transform:uppercase; letter-spacing:.18em; text-decoration:none; transition:background .15s; }
        .cp-cta-btn:hover { background:#E8933A; }

        /* ── BOTTOM NAV ── */
        .cp-bot { border-top:1px solid #D5CEBC; background:#FDFCF8; }
        .cp-bot-inner { max-width:1280px; margin:0 auto; padding:clamp(16px,2.5vw,24px) clamp(16px,4vw,48px); }
        .cp-bot-lbl { font-family:system-ui,sans-serif; font-size:7.5px; font-weight:700; text-transform:uppercase; letter-spacing:.3em; color:#9C8B72; margin-bottom:10px; }
        .cp-bot-links { display:flex; flex-wrap:wrap; gap:5px 20px; list-style:none; padding:0; margin:0; }
        .cp-bot-links a { font-size:12.5px; color:#6B5C40; text-decoration:none; font-style:italic; transition:color .15s; }
        .cp-bot-links a:hover { color:#1A1208; text-decoration:underline; }
      `}</style>

      <div className="cp">
        <Navbar />
        <div className="cp-stripe" style={{background:`linear-gradient(90deg,${color} 0%,#C9A84C 50%,${color} 100%)`}} />

        {/* BREADCRUMB */}
        <div className="cp-bc">
          <ol>
            <li><a href="/">Home</a></li>
            <li className="cp-bc-sep">/</li>
            <li><a href="/startup">Registry</a></li>
            <li className="cp-bc-sep">/</li>
            <li><a href="/startups">Sectors</a></li>
            <li className="cp-bc-sep">/</li>
            <li style={{color:"#1A1208",fontWeight:600}}>{displayName}</li>
          </ol>
        </div>

        {/* CENTERED HERO */}
        <header className="cp-hero">
          <div className="cp-hero-accent" style={{background:color}} />
          <div className="cp-hero-inner">
            <div className="cp-hero-tag">
              <span className="cp-hero-tag-pill" style={{background:color}}>{displayName}</span>
              <span className="cp-hero-tag-meta">UpForge Registry · India 2026</span>
            </div>
            <h1 className="cp-hero-h1">
              {displayName}<br />
              <em>Startups in India</em>
            </h1>
            <p className="cp-hero-desc">{description}</p>
            <div className="cp-hero-divider">
              <span className="cp-hero-div-line" style={{background:color}} />
              <span className="cp-hero-div-dot" style={{color}}>✦</span>
              <span className="cp-hero-div-line" style={{background:color}} />
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
                  <div className="cp-hero-stat-v">{s.v}</div>
                  <div className="cp-hero-stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="cp-layout">
          <section aria-label={`${displayName} startups`}>
            <div className="cp-results">
              <p className="cp-results-text" aria-live="polite">
                Showing <strong>{(page-1)*PAGE_SIZE+1}–{Math.min(page*PAGE_SIZE,total)}</strong> of{" "}
                <strong>{total.toLocaleString()}</strong> {displayName} startups
                {totalPages>1 && <span style={{color:"#9C8B72"}}> · Page {page}/{totalPages}</span>}
              </p>
              <a href="/startups" className="cp-results-link">All sectors →</a>
            </div>

            {/* Desktop card grid with images */}
            <div className="cp-grid">
              {startups.map(s=>(
                <a key={s.id} href={`/startup/${s.slug}`} className="cp-card">
                  <div className="cp-card-img">
                    {s.logo_url
                      ? <img src={s.logo_url} alt={s.name} loading="lazy" />
                      : <div className="cp-card-ph"><span className="cp-card-ph-letter">{s.name.charAt(0)}</span></div>
                    }
                  </div>
                  <div className="cp-card-accent" style={{background:color}} />
                  <div className="cp-card-body">
                    <div className="cp-card-head">
                      <div className="cp-card-logo">
                        {s.logo_url
                          ? <Image src={s.logo_url} alt={s.name} width={34} height={34} className="object-contain" loading="lazy" />
                          : <span style={{fontSize:13,fontWeight:700,color:"#9C8B72",fontFamily:"'Playfair Display',serif"}}>{s.name.charAt(0)}</span>
                        }
                      </div>
                      <span className="cp-card-name">{s.name}</span>
                    </div>
                    <div className="cp-card-meta">
                      {s.city && <span className="cp-card-chip">📍 {s.city}</span>}
                      {s.founded_year && <span className="cp-card-chip">Est. {s.founded_year}</span>}
                    </div>
                    <p className="cp-card-desc">{s.description||"Building for India's next decade."}</p>
                  </div>
                  <div className="cp-card-foot">
                    <span className="cp-card-verified">
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#15803D" strokeWidth="1.4" strokeLinecap="round"/></svg>
                      Verified
                    </span>
                    {s.is_featured && <span style={{fontFamily:"system-ui,sans-serif",fontSize:7.5,fontWeight:900,textTransform:"uppercase",letterSpacing:".14em",color:"#E8933A"}}>Featured</span>}
                    <span className="cp-card-arrow">↗</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Mobile list */}
            <div className="cp-mob">
              {startups.map(s=>(
                <a key={s.id} href={`/startup/${s.slug}`} className="cp-mob-row">
                  <div className="cp-mob-logo">
                    {s.logo_url
                      ? <Image src={s.logo_url} alt={s.name} width={40} height={40} className="object-contain" loading="lazy" />
                      : <span style={{fontSize:13,fontWeight:700,color:"#9C8B72",fontFamily:"'Playfair Display',serif"}}>{s.name.charAt(0)}</span>
                    }
                  </div>
                  <div className="cp-mob-info">
                    <div className="cp-mob-name">{s.name}</div>
                    <div className="cp-mob-meta">{s.category||displayName}{s.founded_year&&` · ${s.founded_year}`}{s.city&&` · ${s.city}`}</div>
                    {s.description && <div className="cp-mob-desc">{s.description}</div>}
                  </div>
                  <span className="cp-mob-arrow">›</span>
                </a>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <nav className="cp-pag" aria-label="Pagination">
                <a href={pgHref(page-1)} className={`cp-pag-btn${page===1?" dis":""}`} aria-disabled={page===1}>← Prev</a>
                {pgNums.map(p=>(
                  <a key={p} href={pgHref(p)} className={`cp-pag-num${p===page?" on":""}`} aria-current={p===page?"page":undefined}>{p}</a>
                ))}
                <a href={pgHref(page+1)} className={`cp-pag-btn${page===totalPages?" dis":""}`} aria-disabled={page===totalPages}>Next →</a>
              </nav>
            )}

            {/* CTA */}
            <div className="cp-cta">
              <div>
                <div className="cp-cta-ey">UpForge Registry</div>
                <div className="cp-cta-h">Building a {displayName} startup?</div>
                <div className="cp-cta-p">Get verified and indexed in India's most trusted startup registry. Free forever.</div>
              </div>
              <a href="/submit" className="cp-cta-btn">List Free →</a>
            </div>
          </section>

          {/* SIDEBAR */}
          <aside className="cp-side">
            <div className="cp-side-box dark">
              <div className="cp-side-ey">List Free</div>
              <div className="cp-side-h">Building a {displayName} startup?</div>
              <div className="cp-side-p">Get verified and indexed. Free forever.</div>
              <a href="/submit" className="cp-side-btn">Submit Startup →</a>
            </div>
            {startups.slice(0,6).length > 0 && (
              <div className="cp-side-box">
                <div className="cp-side-ey">Top in {displayName}</div>
                <ul className="cp-side-rank">
                  {startups.slice(0,6).map((s,i)=>(
                    <li key={s.id}>
                      <a href={`/startup/${s.slug}`}>
                        <span className="cp-side-rank-n">{String(i+1).padStart(2,"0")}</span>
                        <span className="cp-side-rank-name">{s.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {related.length > 0 && (
              <div className="cp-side-box">
                <div className="cp-side-ey">Other Sectors</div>
                <ul className="cp-side-list">
                  {related.map(c=>(
                    <li key={c}>
                      <a href={`/startups/${categoryToSlug(c)}`}>
                        <span>{getDisplayName(c)}</span>
                        <span style={{color:"#D5CEBC"}}>›</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="/startups" style={{display:"block",marginTop:8,paddingTop:8,borderTop:"1px solid #EAE4D4",fontFamily:"system-ui,sans-serif",fontSize:"8px",fontWeight:700,textTransform:"uppercase",letterSpacing:".18em",color:"#9C8B72",textDecoration:"none"}}>
                  All sectors →
                </a>
              </div>
            )}
          </aside>
        </div>

        {/* BOTTOM NAV — single, before Footer */}
        <div className="cp-bot">
          <div className="cp-bot-inner">
            <div className="cp-bot-lbl">Explore UpForge Registry</div>
            <ul className="cp-bot-links">
              <li><a href="/startup">All Indian Startups</a></li>
              <li><a href="/startups">Browse by Sector</a></li>
              <li><a href="/submit">Submit Your Startup</a></li>
              {related.slice(0,5).map(c=>(
                <li key={c}><a href={`/startups/${categoryToSlug(c)}`}>{getDisplayName(c)} Startups</a></li>
              ))}
            </ul>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
