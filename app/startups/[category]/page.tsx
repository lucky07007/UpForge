// app/startups/[category]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Programmatic SEO category page — FULLY DYNAMIC + NEWSPAPER AESTHETIC
// Uses await createClient() — same pattern as about page (fixes 0 data bug)
// Design: #F3EFE5 warm, Playfair Display, golden accents, sepia borders
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@/lib/supabase/server"
import { createReadClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft, ArrowUpRight, BadgeCheck,
  Calendar, MapPin, Tag, ChevronRight, TrendingUp, LayoutGrid,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  categoryToSlug, getDisplayName, slugToDbCategory,
  generateCategoryDescription, generateCategoryLongDescription,
} from "@/lib/categories"

const PAGE_SIZE = 24

interface PageProps {
  params:      Promise<{ category: string }>
  searchParams?: Promise<{ page?: string }>
}

interface StartupRow {
  id: string; name: string; slug: string
  description?: string | null; logo_url?: string | null
  founded_year?: number | null; city?: string | null
  category?: string | null; is_featured?: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA HELPERS
//
// IMPORTANT: Two different clients are used intentionally:
//   createReadClient() — no cookies(), safe at build time (generateStaticParams)
//   createClient()     — uses cookies(), only safe inside request scope (page/metadata)
// ─────────────────────────────────────────────────────────────────────────────

/** Build-time safe: uses createReadClient (no cookies dependency) */
async function getAllDbCategoriesStatic(): Promise<string[]> {
  const supabase = createReadClient()
  const { data } = await supabase
    .from("startups").select("category")
    .eq("status", "approved").not("category", "is", null)
  return [...new Set((data ?? []).map((r) => r.category as string))].filter(Boolean)
}

/** Request-time: uses createClient (cookies available) */
async function getAllDbCategories(): Promise<string[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("startups").select("category")
    .eq("status", "approved").not("category", "is", null)
  return [...new Set((data ?? []).map((r) => r.category as string))].filter(Boolean)
}

async function getCategoryStartups(dbCategory: string, page: number) {
  const supabase = await createClient()
  const from = (page - 1) * PAGE_SIZE
  const { data, count } = await supabase
    .from("startups")
    .select("id,name,slug,description,logo_url,founded_year,city,category,is_featured", { count:"exact" })
    .eq("status", "approved").eq("category", dbCategory)
    .order("is_featured", { ascending:false }).order("name", { ascending:true })
    .range(from, from + PAGE_SIZE - 1)
  return { startups:(data ?? []) as StartupRow[], total: count ?? 0 }
}

// ─────────────────────────────────────────────────────────────────────────────
// generateStaticParams — runs at BUILD TIME, must use createReadClient
// ─────────────────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  // Uses getAllDbCategoriesStatic() — createReadClient, no cookies() call
  const dbCats = await getAllDbCategoriesStatic()
  const seen = new Set<string>()
  return dbCats.reduce<{ category:string }[]>((acc, cat) => {
    const slug = categoryToSlug(cat)
    if (!seen.has(slug)) { seen.add(slug); acc.push({ category:slug }) }
    return acc
  }, [])
}

export const revalidate = 86400

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params
  const allDbCats = await getAllDbCategories()
  const dbCategory = slugToDbCategory(slug, allDbCats)
  if (!dbCategory) return { title:"Category Not Found | UpForge", robots:{ index:false, follow:false } }

  const supabase = await createClient()
  const { count } = await supabase.from("startups")
    .select("id", { count:"exact", head:true })
    .eq("status","approved").eq("category", dbCategory)

  const displayName = getDisplayName(dbCategory)
  const description = generateCategoryDescription(dbCategory, count ?? 0)
  const title = `${displayName} Startups in India 2026 | UpForge`
  const url = `https://www.upforge.in/startups/${slug}`

  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName:"UpForge",
      images:[{ url:"https://www.upforge.in/og/registry.png", width:1200, height:630 }],
      locale:"en_IN", type:"website" },
    twitter: { card:"summary_large_image", title, description, images:["https://www.upforge.in/og/registry.png"] },
    robots: { index:true, follow:true, googleBot:{ index:true, follow:true, "max-snippet":-1, "max-image-preview":"large" } },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURED DATA
// ─────────────────────────────────────────────────────────────────────────────
function buildSchemas(slug:string, displayName:string, desc:string, startups:StartupRow[], total:number) {
  const url = `https://www.upforge.in/startups/${slug}`
  return [
    { "@context":"https://schema.org", "@type":"BreadcrumbList",
      itemListElement:[
        { "@type":"ListItem", position:1, name:"Home",            item:"https://www.upforge.in" },
        { "@type":"ListItem", position:2, name:"Startup Registry", item:"https://www.upforge.in/startup" },
        { "@type":"ListItem", position:3, name:"Categories",       item:"https://www.upforge.in/startups" },
        { "@type":"ListItem", position:4, name:`${displayName} Startups`, item:url },
      ],
    },
    { "@context":"https://schema.org", "@type":"CollectionPage",
      "@id":`${url}#collectionpage`, name:`${displayName} Startups in India 2026`,
      description:desc, url, inLanguage:"en-IN", numberOfItems:total,
      publisher:{ "@id":"https://www.upforge.in/#organization" },
    },
    { "@context":"https://schema.org", "@type":"ItemList",
      name:`${displayName} Startups in India`, numberOfItems:startups.length,
      itemListElement:startups.map((s,i) => ({
        "@type":"ListItem", position:i+1, name:s.name,
        url:`https://www.upforge.in/startup/${s.slug}`,
      })),
    },
  ]
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO
// ─────────────────────────────────────────────────────────────────────────────
function StartupLogo({ name, logo_url, size=48 }: { name:string; logo_url?:string|null; size?:number }) {
  if (logo_url) return <Image src={logo_url} alt={`${name} logo`} width={size} height={size} className="object-contain" loading="lazy" />
  return <span style={{ fontSize:20, fontWeight:700, color:"#8C7D65", fontFamily:"Georgia,serif" }} aria-hidden="true">{name.charAt(0).toUpperCase()}</span>
}

// ─────────────────────────────────────────────────────────────────────────────
// STARTUP CARD — newspaper aesthetic
// ─────────────────────────────────────────────────────────────────────────────
function StartupCard({ startup, index }: { startup:StartupRow; index:number }) {
  return (
    <Link
      href={`/startup/${startup.slug}`}
      style={{ display:"flex", flexDirection:"column", height:"100%", border:"1px solid #D8D2C4", background:"#FDFCF9", textDecoration:"none",
        transition:"transform .15s ease, box-shadow .15s ease, border-color .15s ease",
        animationDelay:`${Math.min(index,11)*0.04}s` }}
      className="cat-startup-card group"
    >
      {/* Header */}
      <div style={{ padding:"18px 18px 10px", display:"flex", alignItems:"flex-start", gap:12 }}>
        <div style={{ width:44, height:44, border:"1px solid #EDE8DF", background:"#F3EFE5", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden", borderRadius:4 }}>
          <StartupLogo name={startup.name} logo_url={startup.logo_url} size={44} />
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:4 }}>
            <h3 style={{ fontSize:"clamp(12px,1.2vw,13.5px)", fontWeight:700, color:"#1A1208", lineHeight:1.3, margin:0, fontFamily:"Georgia,serif" }}
              className="group-hover:underline">
              {startup.name}
            </h3>
            <ArrowUpRight style={{ width:12, height:12, color:"#C8C2B4", flexShrink:0, marginTop:2 }} className="group-hover:!text-[#1A1208] transition-colors" aria-hidden="true" />
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"4px 12px", marginTop:4 }}>
            {startup.city && (
              <span style={{ display:"flex", alignItems:"center", gap:3, fontSize:9.5, color:"#AAA", fontFamily:"system-ui,sans-serif" }}>
                <MapPin style={{ width:9, height:9 }} aria-hidden="true" />{startup.city}
              </span>
            )}
            {startup.founded_year && (
              <span style={{ display:"flex", alignItems:"center", gap:3, fontSize:9.5, color:"#AAA", fontFamily:"system-ui,sans-serif" }}>
                <Calendar style={{ width:9, height:9 }} aria-hidden="true" />Est. {startup.founded_year}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={{ padding:"0 18px 16px", flex:1 }}>
        <p style={{ fontSize:11.5, color:"#5A4A30", lineHeight:1.7, margin:0, fontStyle:"italic",
          display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {startup.description || "Building for India's next decade."}
        </p>
      </div>

      {/* Footer */}
      <div style={{ padding:"10px 18px", borderTop:"1px solid #EDE8DF", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:8.5, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.14em", color:"#15803D", fontFamily:"system-ui,sans-serif" }}>
          <BadgeCheck style={{ width:9, height:9 }} aria-hidden="true" />Verified
        </span>
        {startup.is_featured && (
          <span style={{ fontSize:8, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.14em", color:"#8C7D65", fontFamily:"system-ui,sans-serif" }}>Featured</span>
        )}
      </div>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGINATION
// ─────────────────────────────────────────────────────────────────────────────
function PaginationNav({ slug, currentPage, totalPages }: { slug:string; currentPage:number; totalPages:number }) {
  if (totalPages <= 1) return null
  const makeHref = (p:number) => p === 1 ? `/startups/${slug}` : `/startups/${slug}?page=${p}`
  const windowSize = Math.min(5, totalPages)
  const start = currentPage <= 3 || totalPages <= 5 ? 1
    : currentPage >= totalPages - 2 ? totalPages - 4
    : currentPage - 2
  const pages = Array.from({ length:windowSize }, (_,i) => start+i)

  return (
    <nav style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:40 }} aria-label="Pagination">
      <Link href={makeHref(currentPage-1)} aria-disabled={currentPage===1} tabIndex={currentPage===1?-1:0}
        style={{ padding:"8px 16px", fontSize:11, fontWeight:700, border:"1px solid #C8C2B4", color:currentPage===1?"#DDD":"#5A4A30",
          pointerEvents:currentPage===1?"none":"auto", fontFamily:"system-ui,sans-serif", textDecoration:"none",
          background:"#FDFCF9", transition:"border-color .15s" }}>← Prev</Link>
      {pages.map(p => (
        <Link key={p} href={makeHref(p)} aria-current={p===currentPage?"page":undefined}
          style={{ width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:11, fontWeight:700, border:"1px solid", fontFamily:"system-ui,sans-serif", textDecoration:"none",
            borderColor:p===currentPage?"#1A1208":"#C8C2B4",
            background:p===currentPage?"#1A1208":"#FDFCF9",
            color:p===currentPage?"white":"#5A4A30" }}>
          {p}
        </Link>
      ))}
      <Link href={makeHref(currentPage+1)} aria-disabled={currentPage===totalPages} tabIndex={currentPage===totalPages?-1:0}
        style={{ padding:"8px 16px", fontSize:11, fontWeight:700, border:"1px solid #C8C2B4", color:currentPage===totalPages?"#DDD":"#5A4A30",
          pointerEvents:currentPage===totalPages?"none":"auto", fontFamily:"system-ui,sans-serif", textDecoration:"none",
          background:"#FDFCF9", transition:"border-color .15s" }}>Next →</Link>
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category: slug } = await params
  const sp = await searchParams
  const currentPage = Math.max(1, Number(sp?.page ?? 1))

  const allDbCats = await getAllDbCategories()
  const dbCategory = slugToDbCategory(slug, allDbCats)
  if (!dbCategory) notFound()

  const [{ startups, total }, relatedDbCats] = await Promise.all([
    getCategoryStartups(dbCategory, currentPage),
    Promise.resolve(allDbCats.filter(c => categoryToSlug(c) !== slug).sort((a,b) => a.localeCompare(b)).slice(0,10)),
  ])

  if (total === 0) notFound()

  const totalPages  = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const displayName = getDisplayName(dbCategory)
  const description = generateCategoryDescription(dbCategory, total)
  const longDesc    = generateCategoryLongDescription(dbCategory, total)
  const schemas     = buildSchemas(slug, displayName, description, startups, total)

  return (
    <>
      {schemas.map((s,i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html:JSON.stringify(s) }} />
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        .pf  { font-family:'Playfair Display',Georgia,serif !important; }
        .sys { font-family:system-ui,-apple-system,sans-serif; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .au0{animation:fadeUp .38s .00s ease both}
        .au1{animation:fadeUp .38s .07s ease both}
        .au2{animation:fadeUp .38s .14s ease both}

        .cat-startup-card:hover {
          transform: translate(-2px,-2px);
          box-shadow: 4px 4px 0 #1A1208;
          border-color: #1A1208 !important;
          position: relative; z-index:1;
        }

        .startup-grid {
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:1px;
          background:#D8D2C4;
          border:1px solid #D8D2C4;
        }
        @media(max-width:900px){ .startup-grid{grid-template-columns:repeat(2,1fr) !important} }
        @media(max-width:540px){ .startup-grid{grid-template-columns:1fr !important} }

        .sh{display:flex;align-items:center;gap:10px;margin-bottom:14px}
        .sh-l{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.3em;color:#AAA;font-family:system-ui,sans-serif;white-space:nowrap}
        .sh-r{flex:1;height:1px;background:#D8D2C4}

        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#C8C2B4}
      `}</style>

      <div style={{ minHeight:"100vh", background:"#F3EFE5", fontFamily:"Georgia,'Times New Roman',serif" }}>
        <Navbar />

        {/* ── BREADCRUMB ── */}
        <div style={{ borderBottom:"1px solid #D8D2C4", background:"#FDFCF9" }}>
          <div style={{ maxWidth:1300, margin:"0 auto", padding:"0 clamp(16px,4vw,48px)" }}>
            <ol className="sys" style={{ display:"flex", alignItems:"center", gap:6, height:36, fontSize:10, color:"#AAA", listStyle:"none", margin:0, padding:0 }}>
              <li><Link href="/" style={{ color:"#AAA", textDecoration:"none" }} className="hover:text-[#1A1208] transition-colors">Home</Link></li>
              <li style={{ color:"#D8D2C4" }}>/</li>
              <li><Link href="/startup" style={{ color:"#AAA", textDecoration:"none" }} className="hover:text-[#1A1208] transition-colors">Registry</Link></li>
              <li style={{ color:"#D8D2C4" }}>/</li>
              <li><Link href="/startups" style={{ color:"#AAA", textDecoration:"none" }} className="hover:text-[#1A1208] transition-colors">Categories</Link></li>
              <li style={{ color:"#D8D2C4" }}>/</li>
              <li style={{ color:"#1A1208", fontWeight:600 }}>{displayName}</li>
            </ol>
          </div>
        </div>

        <main>
          {/* ── MASTHEAD ── */}
          <header className="au0" style={{ background:"#F3EFE5", borderBottom:"3px solid #1A1208" }}>
            <div style={{ maxWidth:1300, margin:"0 auto", padding:"clamp(28px,5vw,52px) clamp(16px,4vw,48px) clamp(20px,4vw,40px)" }}>
              <Link href="/startup" style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:10, color:"#AAA", textDecoration:"none", marginBottom:20, fontFamily:"system-ui,sans-serif" }}
                className="hover:text-[#1A1208] transition-colors">
                <ArrowLeft style={{ width:11, height:11 }} aria-hidden="true" />All Startups
              </Link>

              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                <Tag style={{ width:12, height:12, color:"#8C7D65" }} aria-hidden="true" />
                <p className="sys" style={{ fontSize:8, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.36em", color:"#AAA" }}>
                  Category · UpForge Registry India 2026
                </p>
              </div>

              <div style={{ display:"flex", flexWrap:"wrap", alignItems:"flex-end", justifyContent:"space-between", gap:20 }}>
                <div style={{ maxWidth:640 }}>
                  <h1 className="pf" style={{ fontSize:"clamp(1.8rem,4vw,3.6rem)", fontWeight:900, color:"#1A1208", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:12 }}>
                    {displayName}<br />
                    <span style={{ fontStyle:"italic", color:"#8C7D65", fontSize:"0.75em" }}>Startups in India</span>
                  </h1>
                  <p style={{ fontSize:13, color:"#5A4A30", lineHeight:1.8, fontStyle:"italic" }}>
                    {description}
                  </p>
                </div>

                {/* Count pill */}
                <div style={{ flexShrink:0, border:"1px solid #C8C2B4", background:"#FDFCF9", padding:"16px 24px", display:"flex", alignItems:"center", gap:20 }}>
                  <div style={{ textAlign:"center" }}>
                    <p className="pf" style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:900, color:"#1A1208", lineHeight:1, marginBottom:4 }}>
                      {total.toLocaleString()}
                    </p>
                    <p className="sys" style={{ fontSize:8, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.16em", color:"#AAA" }}>Verified Startups</p>
                  </div>
                  <div style={{ width:1, height:36, background:"#D8D2C4" }} aria-hidden="true" />
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                    <span style={{ width:8, height:8, borderRadius:"50%", background:"#15803D", display:"block" }} className="animate-pulse" aria-hidden="true" />
                    <p className="sys" style={{ fontSize:8, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.14em", color:"#15803D" }}>All Verified</p>
                  </div>
                </div>
              </div>

              {/* Long description */}
              <p style={{ fontSize:12.5, color:"#6B5C40", lineHeight:1.82, fontStyle:"italic", maxWidth:720, marginTop:20, paddingTop:16, borderTop:"1px solid #D8D2C4" }}>
                {longDesc}
              </p>
            </div>
          </header>

          {/* ── CONTENT ── */}
          <div style={{ maxWidth:1300, margin:"0 auto", padding:"clamp(24px,4vw,48px) clamp(16px,4vw,48px) 60px", display:"grid", gridTemplateColumns:"1fr 280px", gap:40, alignItems:"start" }}
            className="au1 [grid-template-columns:1fr] lg:[grid-template-columns:1fr_280px]">

            {/* ── STARTUP GRID ── */}
            <section aria-label={`${displayName} startups`}>
              {/* Results bar */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                <p className="sys" style={{ fontSize:11, color:"#6B5C40" }} aria-live="polite">
                  Showing <strong style={{ color:"#1A1208" }}>{(currentPage-1)*PAGE_SIZE+1}–{Math.min(currentPage*PAGE_SIZE,total)}</strong>{" "}
                  of <strong style={{ color:"#1A1208" }}>{total.toLocaleString()}</strong> {displayName} startups
                  {totalPages > 1 && <span style={{ color:"#AAA" }}> · Page {currentPage}/{totalPages}</span>}
                </p>
                <Link href="/startups" className="sys hover:text-[#1A1208] transition-colors hidden sm:inline" style={{ fontSize:10, color:"#AAA", textDecoration:"none" }}>
                  All categories →
                </Link>
              </div>

              <div className="startup-grid">
                {startups.map((s,i) => <StartupCard key={s.id} startup={s} index={i} />)}
              </div>

              <PaginationNav slug={slug} currentPage={currentPage} totalPages={totalPages} />
            </section>

            {/* ── SIDEBAR ── */}
            <aside className="au2" style={{ position:"sticky", top:88, display:"flex", flexDirection:"column", gap:16 }}>

              {/* Submit CTA */}
              <div style={{ background:"#1A1208", padding:"20px 18px" }}>
                <p className="sys" style={{ fontSize:8, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.22em", color:"#E8C547", marginBottom:8 }}>
                  List Free
                </p>
                <p className="pf" style={{ fontSize:"1rem", fontWeight:700, color:"white", lineHeight:1.3, marginBottom:8 }}>
                  Building a {displayName} startup?
                </p>
                <p style={{ fontSize:11.5, color:"rgba(255,255,255,.5)", fontStyle:"italic", lineHeight:1.65, marginBottom:14 }}>
                  Get verified and indexed in India's most trusted startup registry. Free forever.
                </p>
                <Link href="/submit" style={{ display:"block", textAlign:"center", fontSize:9.5, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.16em", background:"white", color:"#1A1208", padding:"10px", textDecoration:"none", fontFamily:"system-ui,sans-serif", transition:"background .15s" }}
                  className="hover:bg-[#E8C547] transition-colors">
                  Submit Your Startup →
                </Link>
              </div>

              {/* Top in category */}
              {startups.slice(0,6).length > 0 && (
                <div style={{ border:"1px solid #D8D2C4", background:"#FDFCF9", padding:"18px 16px" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp style={{ width:11, height:11, color:"#8C7D65" }} aria-hidden="true" />
                    <p className="sys" style={{ fontSize:8, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.22em", color:"#AAA" }}>
                      Top in {displayName}
                    </p>
                  </div>
                  <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:8 }}>
                    {startups.slice(0,6).map((s,i) => (
                      <li key={s.id}>
                        <Link href={`/startup/${s.slug}`} style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}
                          className="group">
                          <span className="pf" style={{ fontSize:11, fontWeight:900, color:"#D8D2C4", width:20, flexShrink:0 }}>
                            {String(i+1).padStart(2,"0")}
                          </span>
                          <span style={{ fontSize:12, color:"#5A4A30", lineHeight:1.3 }} className="group-hover:text-[#1A1208] group-hover:underline transition-colors">
                            {s.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related categories */}
              {relatedDbCats.length > 0 && (
                <div style={{ border:"1px solid #EDE8DF", background:"#F3EFE5", padding:"18px 16px" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <LayoutGrid style={{ width:11, height:11, color:"#8C7D65" }} aria-hidden="true" />
                    <p className="sys" style={{ fontSize:8, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.22em", color:"#AAA" }}>
                      Other Sectors
                    </p>
                  </div>
                  <ul style={{ listStyle:"none", margin:0, padding:0 }}>
                    {relatedDbCats.map(cat => (
                      <li key={cat} style={{ borderBottom:"1px solid #EDE8DF" }}>
                        <Link href={`/startups/${categoryToSlug(cat)}`} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"7px 0", fontSize:12, color:"#5A4A30", textDecoration:"none", fontStyle:"italic" }}
                          className="group hover:text-[#1A1208] transition-colors">
                          <span className="group-hover:underline">{getDisplayName(cat)}</span>
                          <ChevronRight style={{ width:11, height:11, color:"#C8C2B4", flexShrink:0 }} aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/startups" className="sys hover:text-[#1A1208] transition-colors" style={{ display:"block", fontSize:8.5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.16em", color:"#AAA", textDecoration:"none", paddingTop:10, marginTop:6, borderTop:"1px solid #D8D2C4" }}>
                    View all categories →
                  </Link>
                </div>
              )}

            </aside>
          </div>

          {/* ── INTERNAL LINKING FOOTER ── */}
          <section style={{ borderTop:"1px solid #D8D2C4", background:"#FDFCF9" }}>
            <div style={{ maxWidth:1300, margin:"0 auto", padding:"clamp(20px,3vw,36px) clamp(16px,4vw,48px)" }}>
              <p className="sys" style={{ fontSize:8, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.3em", color:"#AAA", marginBottom:14 }}>
                Explore UpForge Registry
              </p>
              <nav aria-label="Explore more startup categories">
                <ul style={{ display:"flex", flexWrap:"wrap", gap:"8px 24px", listStyle:"none", margin:0, padding:0 }}>
                  {[
                    { l:"All Indian Startups", h:"/startup" },
                    { l:"Browse by Category",  h:"/startups" },
                    { l:"Submit Your Startup", h:"/submit" },
                    ...relatedDbCats.slice(0,5).map(c => ({ l:`${getDisplayName(c)} Startups`, h:`/startups/${categoryToSlug(c)}` })),
                  ].map(lnk => (
                    <li key={lnk.h+lnk.l}>
                      <Link href={lnk.h} style={{ fontSize:12, color:"#6B5C40", textDecoration:"none", fontStyle:"italic" }}
                        className="hover:text-[#1A1208] hover:underline transition-colors">
                        {lnk.l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
