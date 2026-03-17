// app/startups/[category]/page.tsx
// Design: Founder Chronicle editorial · cream/ink/saffron · Playfair + EB Garamond
// generateStaticParams → createReadClient (build-time safe)
// page/metadata       → createClient (request-time)
// Zero event handlers (Server Component)

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
  params: Promise<{ category: string }>
  searchParams?: Promise<{ page?: string }>
}
interface StartupRow {
  id: string; name: string; slug: string
  description?: string|null; logo_url?: string|null
  founded_year?: number|null; city?: string|null
  category?: string|null; is_featured?: boolean
}

// ── DATA HELPERS ──────────────────────────────────────────────────────────────
async function getAllDbCategoriesStatic(): Promise<string[]> {
  const sb = createReadClient()
  const { data } = await sb.from("startups").select("category")
    .eq("status","approved").not("category","is",null)
  return [...new Set((data??[]).map(r=>r.category as string))].filter(Boolean)
}
async function getAllDbCategories(): Promise<string[]> {
  const sb = await createClient()
  const { data } = await sb.from("startups").select("category")
    .eq("status","approved").not("category","is",null)
  return [...new Set((data??[]).map(r=>r.category as string))].filter(Boolean)
}
async function getCategoryStartups(dbCat:string, page:number) {
  const sb = await createClient()
  const from = (page-1)*PAGE_SIZE
  const { data, count } = await sb.from("startups")
    .select("id,name,slug,description,logo_url,founded_year,city,category,is_featured",{count:"exact"})
    .eq("status","approved").eq("category",dbCat)
    .order("is_featured",{ascending:false}).order("name",{ascending:true})
    .range(from, from+PAGE_SIZE-1)
  return { startups:(data??[]) as StartupRow[], total: count??0 }
}

export async function generateStaticParams() {
  const cats = await getAllDbCategoriesStatic()
  const seen = new Set<string>()
  return cats.reduce<{category:string}[]>((acc,cat)=>{
    const slug = categoryToSlug(cat)
    if(!seen.has(slug)){ seen.add(slug); acc.push({category:slug}) }
    return acc
  },[])
}
export const revalidate = 86400

export async function generateMetadata({params}:PageProps): Promise<Metadata> {
  const {category:slug} = await params
  const all = await getAllDbCategories()
  const dbCat = slugToDbCategory(slug,all)
  if(!dbCat) return { title:"Category Not Found | UpForge", robots:{index:false,follow:false} }
  const sb = await createClient()
  const {count} = await sb.from("startups").select("id",{count:"exact",head:true})
    .eq("status","approved").eq("category",dbCat)
  const displayName = getDisplayName(dbCat)
  const description = generateCategoryDescription(dbCat, count??0)
  const title = `${displayName} Startups in India 2026 — Verified | UpForge`
  const url = `https://www.upforge.in/startups/${slug}`
  return {
    title, description,
    alternates:{canonical:url},
    openGraph:{title,description,url,siteName:"UpForge",
      images:[{url:"https://www.upforge.in/og/registry.png",width:1200,height:630}],
      locale:"en_IN",type:"website"},
    twitter:{card:"summary_large_image",title,description,images:["https://www.upforge.in/og/registry.png"]},
    robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-snippet":-1,"max-image-preview":"large"}},
  }
}

function buildSchemas(slug:string,displayName:string,desc:string,startups:StartupRow[],total:number) {
  const url = `https://www.upforge.in/startups/${slug}`
  return [
    {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[
      {"@type":"ListItem",position:1,name:"Home",item:"https://www.upforge.in"},
      {"@type":"ListItem",position:2,name:"Registry",item:"https://www.upforge.in/startup"},
      {"@type":"ListItem",position:3,name:"Sectors",item:"https://www.upforge.in/startups"},
      {"@type":"ListItem",position:4,name:`${displayName} Startups`,item:url},
    ]},
    {"@context":"https://schema.org","@type":"CollectionPage","@id":`${url}#cp`,
      name:`${displayName} Startups in India 2026`,description:desc,url,inLanguage:"en-IN",numberOfItems:total},
    {"@context":"https://schema.org","@type":"ItemList",
      name:`${displayName} Startups in India`,numberOfItems:startups.length,
      itemListElement:startups.map((s,i)=>({
        "@type":"ListItem",position:i+1,name:s.name,
        url:`https://www.upforge.in/startup/${s.slug}`,
      }))},
  ]
}

function Logo({name,logo_url,size=44}:{name:string;logo_url?:string|null;size?:number}) {
  if(logo_url) return <Image src={logo_url} alt={`${name} logo`} width={size} height={size} className="object-contain" loading="lazy" />
  return <span style={{fontSize:18,fontWeight:700,color:"#9C8B72",fontFamily:"'Playfair Display',serif"}} aria-hidden="true">{name.charAt(0).toUpperCase()}</span>
}

export default async function CategoryPage({params,searchParams}:PageProps) {
  const {category:slug} = await params
  const sp = await searchParams
  const page = Math.max(1, Number(sp?.page??1))

  const all = await getAllDbCategories()
  const dbCat = slugToDbCategory(slug, all)
  if(!dbCat) notFound()

  const [{startups,total}, related] = await Promise.all([
    getCategoryStartups(dbCat, page),
    Promise.resolve(all.filter(c=>categoryToSlug(c)!==slug).sort((a,b)=>a.localeCompare(b)).slice(0,12)),
  ])
  if(total===0) notFound()

  const totalPages  = Math.max(1, Math.ceil(total/PAGE_SIZE))
  const displayName = getDisplayName(dbCat)
  const description = generateCategoryDescription(dbCat, total)
  const longDesc    = generateCategoryLongDescription(dbCat, total)
  const schemas     = buildSchemas(slug, displayName, description, startups, total)

  const makeHref = (p:number) => p===1 ? `/startups/${slug}` : `/startups/${slug}?page=${p}`

  // Pagination window
  const winSize = Math.min(5, totalPages)
  const winStart = page<=3||totalPages<=5 ? 1 : page>=totalPages-2 ? totalPages-4 : page-2
  const pageNums = Array.from({length:winSize},(_,i)=>winStart+i)

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
        *,*::before,*::after{box-sizing:border-box}
        body{background:var(--cream)}

        .cp-wrap{min-height:100vh;background:var(--cream);font-family:'EB Garamond',Georgia,serif;color:var(--ink)}

        /* BREADCRUMB */
        .cp-bc{border-bottom:1px solid var(--rule);background:var(--white)}
        .cp-bc-inner{max-width:1280px;margin:0 auto;padding:0 clamp(16px,4vw,48px);display:flex;align-items:center;gap:6px;height:34px;font-family:system-ui,sans-serif;font-size:10px;color:var(--ink4);list-style:none}
        .cp-bc-inner a{color:var(--ink4);text-decoration:none;transition:color .15s}
        .cp-bc-inner a:hover{color:var(--ink)}
        .cp-bc-sep{color:var(--rule)}

        /* MASTHEAD */
        .cp-mast{border-bottom:3px solid var(--ink);background:var(--cream)}
        .cp-mast-inner{max-width:1280px;margin:0 auto;padding:clamp(28px,5vw,52px) clamp(16px,4vw,48px) clamp(20px,4vw,40px)}
        .cp-back{display:inline-flex;align-items:center;gap:6px;font-family:system-ui,sans-serif;font-size:9.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink4);text-decoration:none;margin-bottom:20px;transition:color .15s}
        .cp-back:hover{color:var(--ink)}
        .cp-eyebrow{display:flex;align-items:center;gap:8px;margin-bottom:12px}
        .cp-eyebrow-tag{background:var(--ink);color:#fff;font-family:system-ui,sans-serif;font-size:8px;font-weight:900;text-transform:uppercase;letter-spacing:.28em;padding:3px 10px}
        .cp-eyebrow-meta{font-family:system-ui,sans-serif;font-size:8.5px;color:var(--ink4);letter-spacing:.12em}
        .cp-h1{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4.5vw,3.8rem);font-weight:900;letter-spacing:-.02em;color:var(--ink);line-height:1.08;margin-bottom:14px}
        .cp-h1 em{font-style:italic;color:var(--ink2)}
        .cp-desc{font-size:clamp(13px,1.4vw,14.5px);color:var(--ink3);font-style:italic;line-height:1.8;max-width:640px;margin-bottom:0}
        .cp-mast-bottom{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:20px;margin-top:24px;padding-top:20px;border-top:1px solid var(--rule)}
        .cp-long-desc{font-size:13px;color:var(--ink3);font-style:italic;line-height:1.8;max-width:680px;flex:1}
        .cp-count-pill{flex-shrink:0;display:flex;align-items:center;gap:16px;border:1px solid var(--rule);background:var(--white);padding:14px 22px}
        .cp-count-v{font-family:'Playfair Display',serif;font-size:clamp(1.5rem,2.5vw,2rem);font-weight:900;color:var(--ink);line-height:1;margin-bottom:2px}
        .cp-count-l{font-family:system-ui,sans-serif;font-size:7.5px;font-weight:700;text-transform:uppercase;letter-spacing:.2em;color:var(--ink4)}
        .cp-count-div{width:1px;height:32px;background:var(--rule)}
        .cp-live{display:flex;flex-direction:column;align-items:center;gap:3px}
        .cp-live-dot{width:8px;height:8px;border-radius:50%;background:#15803D}
        .cp-live-label{font-family:system-ui,sans-serif;font-size:7.5px;font-weight:700;text-transform:uppercase;letter-spacing:.16em;color:#15803D}

        /* LAYOUT */
        .cp-layout{max-width:1280px;margin:0 auto;padding:clamp(24px,4vw,48px) clamp(16px,4vw,48px) 72px;display:grid;grid-template-columns:1fr 260px;gap:40px;align-items:start}
        @media(max-width:900px){.cp-layout{grid-template-columns:1fr !important}}

        /* RESULTS BAR */
        .cp-results{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--rule)}
        .cp-results-text{font-family:system-ui,sans-serif;font-size:11px;color:var(--ink3)}
        .cp-results-text strong{color:var(--ink)}
        .cp-results-link{font-family:system-ui,sans-serif;font-size:10px;color:var(--ink4);text-decoration:none;transition:color .15s}
        .cp-results-link:hover{color:var(--ink)}

        /* STARTUP GRID */
        .cp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;background:var(--rule2);border:1px solid var(--rule)}
        @media(max-width:860px){.cp-grid{grid-template-columns:repeat(2,1fr) !important}}
        @media(max-width:480px){.cp-grid{grid-template-columns:1fr !important}}

        /* STARTUP CARD */
        .su-card{background:var(--white);padding:0;display:flex;flex-direction:column;text-decoration:none;border-right:1px solid var(--rule2);border-bottom:1px solid var(--rule2);transition:background .15s,box-shadow .15s,transform .15s;position:relative}
        .su-card:hover{background:var(--cream);transform:translate(-2px,-2px);box-shadow:3px 3px 0 var(--ink);z-index:1;border-color:var(--ink) !important}
        .su-card-img{width:100%;aspect-ratio:16/9;background:var(--cream2);overflow:hidden;position:relative;flex-shrink:0}
        .su-card-img img{width:100%;height:100%;object-fit:cover;object-position:center;filter:sepia(12%) contrast(105%)}
        .su-card-img-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--cream2) 0%,var(--rule2) 100%)}
        .su-card-img-letter{font-family:'Playfair Display',serif;font-size:3rem;font-weight:900;color:var(--rule);line-height:1}
        .su-card-body{padding:16px 16px 0;flex:1;display:flex;flex-direction:column;gap:6px}
        .su-card-logo-row{display:flex;align-items:center;gap:10px}
        .su-card-logo{width:36px;height:36px;border:1px solid var(--rule2);background:var(--white);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0}
        .su-card-name{font-family:'Playfair Display',serif;font-size:clamp(.88rem,1.1vw,1rem);font-weight:700;color:var(--ink);line-height:1.25}
        .su-card:hover .su-card-name{text-decoration:underline}
        .su-card-meta{display:flex;flex-wrap:wrap;gap:3px 10px}
        .su-card-chip{display:flex;align-items:center;gap:3px;font-family:system-ui,sans-serif;font-size:9px;color:var(--ink4)}
        .su-card-desc{font-size:11.5px;color:var(--ink3);font-style:italic;line-height:1.65;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;flex:1}
        .su-card-foot{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;border-top:1px solid var(--rule2);margin-top:auto}
        .su-card-verified{display:flex;align-items:center;gap:4px;font-family:system-ui,sans-serif;font-size:8px;font-weight:800;text-transform:uppercase;letter-spacing:.14em;color:#15803D}
        .su-card-featured{font-family:system-ui,sans-serif;font-size:8px;font-weight:900;text-transform:uppercase;letter-spacing:.12em;color:var(--saffron)}
        .su-card-arrow{font-size:13px;color:var(--rule);transition:color .15s,transform .15s}
        .su-card:hover .su-card-arrow{color:var(--ink);transform:translate(2px,-2px)}

        /* PAGINATION */
        .cp-pag{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:36px;padding-top:24px;border-top:1px solid var(--rule)}
        .cp-pag-btn{padding:7px 16px;font-family:system-ui,sans-serif;font-size:9.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border:1px solid var(--rule);background:var(--white);color:var(--ink3);text-decoration:none;transition:all .15s}
        .cp-pag-btn:hover{border-color:var(--ink);color:var(--ink)}
        .cp-pag-btn.disabled{color:var(--rule);pointer-events:none}
        .cp-pag-num{width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-family:system-ui,sans-serif;font-size:11px;font-weight:700;border:1px solid var(--rule);text-decoration:none;color:var(--ink3);transition:all .15s}
        .cp-pag-num:hover{border-color:var(--ink);color:var(--ink)}
        .cp-pag-num.active{background:var(--ink);color:#fff;border-color:var(--ink)}

        /* SIDEBAR */
        .cp-side{position:sticky;top:88px;display:flex;flex-direction:column;gap:16px}
        .cp-side-card{border:1px solid var(--rule);background:var(--white);padding:18px 16px}
        .cp-side-card.dark{background:var(--ink);border-color:var(--ink)}
        .cp-side-eyebrow{font-family:system-ui,sans-serif;font-size:7.5px;font-weight:900;text-transform:uppercase;letter-spacing:.28em;color:var(--ink4);margin-bottom:10px}
        .cp-side-card.dark .cp-side-eyebrow{color:var(--saffron)}
        .cp-side-h{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700;color:var(--ink);margin-bottom:6px;line-height:1.3}
        .cp-side-card.dark .cp-side-h{color:#fff}
        .cp-side-p{font-size:11.5px;color:var(--ink3);font-style:italic;line-height:1.65;margin-bottom:14px}
        .cp-side-card.dark .cp-side-p{color:rgba(255,255,255,.45)}
        .cp-side-btn{display:block;text-align:center;font-family:system-ui,sans-serif;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.2em;background:#fff;color:var(--ink);padding:9px;text-decoration:none;transition:background .15s}
        .cp-side-btn:hover{background:var(--saffron)}
        .cp-side-list{list-style:none;padding:0;margin:0}
        .cp-side-list li{border-bottom:1px solid var(--rule2)}
        .cp-side-list li:last-child{border-bottom:none}
        .cp-side-list a{display:flex;align-items:center;justify-content:space-between;padding:7px 0;font-size:12.5px;color:var(--ink3);text-decoration:none;font-style:italic;transition:color .15s;gap:8px}
        .cp-side-list a:hover{color:var(--ink);text-decoration:underline}
        .cp-side-list-arrow{font-size:11px;color:var(--rule);flex-shrink:0}
        .cp-side-rank-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px}
        .cp-side-rank-list li a{display:flex;align-items:center;gap:10px;text-decoration:none}
        .cp-side-rank-num{font-family:'Playfair Display',serif;font-size:11px;font-weight:900;color:var(--rule);width:20px;flex-shrink:0}
        .cp-side-rank-name{font-size:12.5px;color:var(--ink3);font-style:italic;transition:color .15s;line-height:1.3}
        .cp-side-rank-list li a:hover .cp-side-rank-name{color:var(--ink);text-decoration:underline}

        /* BOTTOM NAV */
        .cp-bot-nav{border-top:1px solid var(--rule);background:var(--white)}
        .cp-bot-nav-inner{max-width:1280px;margin:0 auto;padding:clamp(20px,3vw,32px) clamp(16px,4vw,48px)}
        .cp-bot-label{font-family:system-ui,sans-serif;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.3em;color:var(--ink4);margin-bottom:12px}
        .cp-bot-links{display:flex;flex-wrap:wrap;gap:6px 24px;list-style:none;padding:0;margin:0}
        .cp-bot-links a{font-size:13px;color:var(--ink3);text-decoration:none;font-style:italic;transition:color .15s}
        .cp-bot-links a:hover{color:var(--ink);text-decoration:underline}

        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:var(--rule)}
      `}</style>

      <div className="cp-wrap">
        <Navbar />

        {/* BREADCRUMB */}
        <div className="cp-bc">
          <ol className="cp-bc-inner">
            <li><a href="/">Home</a></li>
            <li className="cp-bc-sep">/</li>
            <li><a href="/startup">Registry</a></li>
            <li className="cp-bc-sep">/</li>
            <li><a href="/startups">Sectors</a></li>
            <li className="cp-bc-sep">/</li>
            <li style={{color:"var(--ink)",fontWeight:600}}>{displayName}</li>
          </ol>
        </div>

        {/* MASTHEAD */}
        <header className="cp-mast">
          <div className="cp-mast-inner">
            <a href="/startup" className="cp-back">← All Startups</a>
            <div className="cp-eyebrow">
              <span className="cp-eyebrow-tag">{displayName}</span>
              <span className="cp-eyebrow-meta">UpForge Registry · India 2026</span>
            </div>
            <h1 className="cp-h1">
              {displayName}<br />
              <em>Startups in India</em>
            </h1>
            <p className="cp-desc">{description}</p>
            <div className="cp-mast-bottom">
              <p className="cp-long-desc">{longDesc}</p>
              <div className="cp-count-pill">
                <div>
                  <div className="cp-count-v">{total.toLocaleString()}</div>
                  <div className="cp-count-l">Verified Startups</div>
                </div>
                <div className="cp-count-div" />
                <div className="cp-live">
                  <span className="cp-live-dot" />
                  <span className="cp-live-label">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT LAYOUT */}
        <div className="cp-layout">

          {/* STARTUP GRID */}
          <section aria-label={`${displayName} startups`}>
            <div className="cp-results">
              <p className="cp-results-text">
                Showing <strong>{(page-1)*PAGE_SIZE+1}–{Math.min(page*PAGE_SIZE,total)}</strong> of{" "}
                <strong>{total.toLocaleString()}</strong> {displayName} startups
                {totalPages>1 && <span style={{color:"var(--ink4)"}}> · Page {page}/{totalPages}</span>}
              </p>
              <a href="/startups" className="cp-results-link">All sectors →</a>
            </div>

            <div className="cp-grid">
              {startups.map((s) => (
                <a key={s.id} href={`/startup/${s.slug}`} className="su-card">
                  {/* Image area */}
                  <div className="su-card-img">
                    {s.logo_url ? (
                      <img src={s.logo_url} alt={`${s.name}`} style={{width:"100%",height:"100%",objectFit:"cover",filter:"sepia(10%) contrast(105%)"}} loading="lazy" />
                    ) : (
                      <div className="su-card-img-ph">
                        <span className="su-card-img-letter">{s.name.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                  {/* Body */}
                  <div className="su-card-body">
                    <div className="su-card-logo-row">
                      <div className="su-card-logo">
                        {s.logo_url
                          ? <Image src={s.logo_url} alt={s.name} width={36} height={36} className="object-contain" loading="lazy" />
                          : <span style={{fontSize:14,fontWeight:700,color:"var(--ink4)",fontFamily:"'Playfair Display',serif"}}>{s.name.charAt(0)}</span>
                        }
                      </div>
                      <span className="su-card-name">{s.name}</span>
                    </div>
                    <div className="su-card-meta">
                      {s.city && <span className="su-card-chip">📍 {s.city}</span>}
                      {s.founded_year && <span className="su-card-chip">Est. {s.founded_year}</span>}
                    </div>
                    <p className="su-card-desc">{s.description || "Building for India's next decade."}</p>
                  </div>
                  <div className="su-card-foot">
                    <span className="su-card-verified">
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#15803D" strokeWidth="1.4" strokeLinecap="round"/></svg>
                      Verified
                    </span>
                    {s.is_featured && <span className="su-card-featured">Featured</span>}
                    <span className="su-card-arrow">↗</span>
                  </div>
                </a>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <nav className="cp-pag" aria-label="Pagination">
                <a href={makeHref(page-1)} className={`cp-pag-btn${page===1?" disabled":""}`} aria-disabled={page===1}>← Prev</a>
                {pageNums.map(p => (
                  <a key={p} href={makeHref(p)} className={`cp-pag-num${p===page?" active":""}`} aria-current={p===page?"page":undefined}>{p}</a>
                ))}
                <a href={makeHref(page+1)} className={`cp-pag-btn${page===totalPages?" disabled":""}`} aria-disabled={page===totalPages}>Next →</a>
              </nav>
            )}
          </section>

          {/* SIDEBAR */}
          <aside className="cp-side">
            {/* Submit CTA */}
            <div className="cp-side-card dark">
              <div className="cp-side-eyebrow">List Free</div>
              <div className="cp-side-h">Building a {displayName} startup?</div>
              <div className="cp-side-p">Get verified and indexed in India's most trusted startup registry. Free forever.</div>
              <a href="/submit" className="cp-side-btn">Submit Your Startup →</a>
            </div>

            {/* Top in sector */}
            {startups.slice(0,6).length > 0 && (
              <div className="cp-side-card">
                <div className="cp-side-eyebrow">Top in {displayName}</div>
                <ul className="cp-side-rank-list">
                  {startups.slice(0,6).map((s,i) => (
                    <li key={s.id}>
                      <a href={`/startup/${s.slug}`}>
                        <span className="cp-side-rank-num">{String(i+1).padStart(2,"0")}</span>
                        <span className="cp-side-rank-name">{s.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related sectors */}
            {related.length > 0 && (
              <div className="cp-side-card">
                <div className="cp-side-eyebrow">Other Sectors</div>
                <ul className="cp-side-list">
                  {related.map(cat => (
                    <li key={cat}>
                      <a href={`/startups/${categoryToSlug(cat)}`}>
                        <span>{getDisplayName(cat)}</span>
                        <span className="cp-side-list-arrow">›</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="/startups" style={{display:"block",marginTop:12,fontFamily:"system-ui,sans-serif",fontSize:"8.5px",fontWeight:700,textTransform:"uppercase",letterSpacing:".16em",color:"var(--ink4)",textDecoration:"none",paddingTop:10,borderTop:"1px solid var(--rule2)",transition:"color .15s"}}
                  className="hover:!text-[var(--ink)]">
                  View all sectors →
                </a>
              </div>
            )}
          </aside>
        </div>

        {/* BOTTOM NAV */}
        <div className="cp-bot-nav">
          <div className="cp-bot-nav-inner">
            <div className="cp-bot-label">Explore UpForge Registry</div>
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
