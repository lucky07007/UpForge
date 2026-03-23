// app/registry/page.tsx
// UpForge Global Registry — upforge.org
// Design language: same as app/about/page.tsx
// — Playfair Display serif masthead
// — #F3EFE5 beige background
// — Newspaper ornament divider  ✦
// — Dark #1A1208 accents
// — Gold #E8C547 / #C59A2E highlights
// — About-page level hover cards (.hc)
// — Mobile-first fluid type (clamp)

import { createReadClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckCircle2, Shield, BadgeCheck, Globe } from "lucide-react"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Global Startup Registry 2026 — Verified Worldwide | UpForge",
  description:
    "The open, independent, verified global registry of startups. Every listing is manually reviewed and assigned a unique UpForge Registry Number (UFRN). The world's most trusted startup database — free to access, forever.",
  alternates: { canonical: "https://www.upforge.org/registry" },
  openGraph: {
    title: "UpForge Global Startup Registry — Open & Verified",
    url: "https://www.upforge.org/registry",
    images: [{ url: "https://www.upforge.in/og/startup-default.png", width: 1200, height: 630 }],
  },
}

// ── JSON-LD — Dataset schema ───────────────────────────────────────────────
const LD = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "UpForge Global Startup Registry",
  description: "Open, verified, independent database of startups. Each startup is assigned a unique UFRN.",
  url: "https://www.upforge.org/registry",
  creator: { "@type": "Organization", name: "UpForge", url: "https://www.upforge.org" },
  license: "https://creativecommons.org/licenses/by/4.0/",
  isAccessibleForFree: true,
  keywords: ["startups", "UFRN", "startup registry", "Indian startups", "global startup database"],
}

// ── Types ──────────────────────────────────────────────────────────────────
interface Row {
  id: string
  name: string
  slug: string
  description: string | null
  logo_url: string | null
  category: string | null
  city: string | null
  country_name: string | null
  founded_year: number | null
  ufrn: string | null
  is_featured?: boolean
  founders?: string | null
}

interface PageProps {
  searchParams: Promise<{ sector?: string; page?: string }>
}

const PER_PAGE = 20

// ── Fetchers ───────────────────────────────────────────────────────────────
async function getStartups(sector?: string, page = 1) {
  const supabase = createReadClient()
  const from = (page - 1) * PER_PAGE
  const to   = from + PER_PAGE - 1
  let q = supabase
    .from("startups")
    .select("id,name,slug,description,logo_url,category,city,country_name,founded_year,ufrn,is_featured,founders", { count: "exact" })
    .eq("status", "approved")
    .order("is_featured", { ascending: false })
    .order("created_at",  { ascending: false })
    .range(from, to)
  if (sector) q = q.eq("category", sector)
  const { data, count } = await q
  return { data: (data ?? []) as Row[], total: count ?? 0 }
}

async function getFeatured(): Promise<Row | null> {
  const supabase = createReadClient()
  const { data } = await supabase
    .from("startups")
    .select("id,name,slug,description,logo_url,category,city,country_name,founded_year,ufrn,is_featured,founders")
    .eq("status", "approved").eq("is_featured", true)
    .order("created_at", { ascending: false }).limit(1).single()
  return (data as Row) ?? null
}

async function getSectors(): Promise<string[]> {
  const supabase = createReadClient()
  const { data } = await supabase.from("startups").select("category").eq("status", "approved").not("category", "is", null)
  if (!data) return []
  return [...new Set(data.map((r) => r.category).filter(Boolean))] as string[]
}

// ── Logo ───────────────────────────────────────────────────────────────────
function Logo({ name, logo_url }: { name: string; logo_url?: string | null }) {
  if (logo_url)
    return <Image src={logo_url} alt={name} width={56} height={56} className="object-contain w-full h-full" />
  return (
    <span style={{ fontFamily: "Georgia,serif", fontSize: "1.5rem", fontWeight: 700, color: "#C59A2E" }}>
      {name.charAt(0).toUpperCase()}
    </span>
  )
}

// ── Card ───────────────────────────────────────────────────────────────────
function Card({ s }: { s: Row }) {
  return (
    <a
      href={`https://www.upforge.in/startup/${s.slug}`}
      style={{
        display: "block", background: "#FDFCF9",
        border: "1px solid #D8D2C4", textDecoration: "none",
        transition: "transform .15s ease, box-shadow .15s ease, border-color .15s ease",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = "translate(-2px,-2px)"
        el.style.boxShadow = "4px 4px 0 #1A1208"
        el.style.borderColor = "#1A1208"
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = ""
        el.style.boxShadow = ""
        el.style.borderColor = "#D8D2C4"
      }}
    >
      <div style={{ padding: "20px 18px" }}>
        {/* Logo + tag */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 14 }}>
          <div style={{
            width: 52, height: 52, flexShrink: 0,
            border: "1px solid #E8E4DC", background: "#F7F5F0",
            display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
          }}>
            <Logo name={s.name} logo_url={s.logo_url} />
          </div>
          {s.category && (
            <span style={{
              fontSize: 9, fontFamily: "system-ui,sans-serif",
              textTransform: "uppercase", letterSpacing: "0.16em",
              color: "#888", border: "1px solid #E0DDD6",
              background: "#F7F5F0", padding: "2px 7px", marginTop: 2, flexShrink: 0,
              maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {s.category}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: "'Georgia','Times New Roman',serif",
          fontSize: "clamp(14px,1.5vw,16px)", fontWeight: 700,
          color: "#1A1208", lineHeight: 1.3, marginBottom: 8,
        }}>
          {s.name}
        </h3>

        {/* Description */}
        {s.description && (
          <p style={{
            fontFamily: "system-ui,sans-serif",
            fontSize: "clamp(11px,1.2vw,12.5px)", color: "#6B5C40",
            lineHeight: 1.65, marginBottom: 14,
            display: "-webkit-box", WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {s.description}
          </p>
        )}

        {/* Meta */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 12, borderTop: "1px solid #F0EFEA",
        }}>
          <div style={{ fontFamily: "system-ui,sans-serif", fontSize: 10, color: "#AAA", display: "flex", gap: 6 }}>
            {s.founders && (
              <span style={{ maxWidth: 110, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                ↳ {s.founders.split(",")[0].trim()}
              </span>
            )}
            {s.founded_year && <span>· {s.founded_year}</span>}
          </div>

          {s.ufrn ? (
            <span style={{
              fontFamily: "monospace", fontSize: 9, fontWeight: 700,
              color: "#C59A2E", background: "#FBF8F3",
              border: "1px solid #E8DFCC", padding: "2px 6px",
            }}>
              {s.ufrn}
            </span>
          ) : (
            <span style={{
              fontFamily: "system-ui,sans-serif", fontSize: 9,
              color: "#15803D", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.12em",
              display: "flex", alignItems: "center", gap: 3,
            }}>
              <CheckCircle2 style={{ width: 10, height: 10 }} />
              Verified
            </span>
          )}
        </div>
      </div>
    </a>
  )
}

// ── Featured Hero ──────────────────────────────────────────────────────────
function FeaturedHero({ s }: { s: Row }) {
  return (
    <a
      href={`https://www.upforge.in/startup/${s.slug}`}
      style={{
        display: "block", border: "2px solid #1A1208",
        background: "#FDFCF9", textDecoration: "none", marginBottom: 32,
        transition: "box-shadow .15s ease",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #1A1208" }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "" }}
    >
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {s.logo_url && (
          <div style={{
            width: "clamp(120px,16vw,200px)", minHeight: 140,
            background: "#F0EDE6", display: "flex", alignItems: "center", justifyContent: "center",
            borderRight: "1px solid #D8D2C4", padding: "clamp(16px,3vw,32px)", flexShrink: 0,
          }}>
            <Image src={s.logo_url} alt={s.name} width={120} height={80} className="object-contain" />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 200, padding: "clamp(18px,3vw,32px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: "system-ui,sans-serif", fontSize: 8,
              textTransform: "uppercase", letterSpacing: "0.25em",
              fontWeight: 700, background: "#C59A2E", color: "#fff",
              padding: "3px 10px",
            }}>
              Featured This Edition
            </span>
            {s.category && (
              <span style={{
                fontFamily: "system-ui,sans-serif", fontSize: 9,
                textTransform: "uppercase", letterSpacing: "0.14em", color: "#888",
              }}>
                {s.category}
              </span>
            )}
          </div>

          <h2 style={{
            fontFamily: "'Georgia','Times New Roman',serif",
            fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 700,
            color: "#1A1208", lineHeight: 1.25, marginBottom: 10,
          }}>
            {s.name}
          </h2>

          {s.description && (
            <p style={{
              fontFamily: "system-ui,sans-serif",
              fontSize: "clamp(12px,1.3vw,13.5px)", color: "#5A4A30",
              lineHeight: 1.7, marginBottom: 14,
              display: "-webkit-box", WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>
              {s.description}
            </p>
          )}

          <div style={{
            display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
            fontFamily: "system-ui,sans-serif", fontSize: 10, color: "#AAA",
          }}>
            {s.founders && <span>Founders — {s.founders}</span>}
            {s.founded_year && <span>Est. {s.founded_year}</span>}
            {s.city && <span>{s.city}{s.country_name ? `, ${s.country_name}` : ""}</span>}
            {s.ufrn && (
              <span style={{ fontFamily: "monospace", color: "#C59A2E", fontWeight: 700, border: "1px solid #E8DFCC", background: "#FBF8F3", padding: "2px 8px", fontSize: 10 }}>
                {s.ufrn}
              </span>
            )}
            <span style={{
              marginLeft: "auto", color: "#1A1208", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 10,
            }}>
              View Profile →
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function RegistryPage({ searchParams }: PageProps) {
  const { sector, page: ps } = await searchParams
  const page     = parseInt(ps ?? "1", 10) || 1
  const baseHref = (s?: string) => s ? `/registry?sector=${encodeURIComponent(s)}` : "/registry"

  const [{ data: startups, total }, featured, sectors] = await Promise.all([
    getStartups(sector, page),
    getFeatured(),
    getSectors(),
  ])
  const totalPages = Math.ceil(total / PER_PAGE)

  return (
    <>
      {/* ── CSS — same patterns as about/page.tsx ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        .pf { font-family: 'Playfair Display', Georgia, serif !important; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .fu0{animation:fadeUp .4s .00s ease both}
        .fu1{animation:fadeUp .4s .08s ease both}
        .fu2{animation:fadeUp .4s .16s ease both}

        /* Sector tab scrollbar hide */
        .tabs-scroll::-webkit-scrollbar{display:none}
        .tabs-scroll{-ms-overflow-style:none;scrollbar-width:none}

        /* Section header rule */
        .sh{display:flex;align-items:center;gap:10px;margin-bottom:16px}
        .sh-l{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.3em;color:#AAA;font-family:system-ui,sans-serif;white-space:nowrap}
        .sh-r{flex:1;height:1px;background:#D8D2C4}

        /* Pagination button */
        .pg-btn{
          display:inline-flex;align-items:center;justify-content:center;
          border:1px solid #D8D2C4;background:#FDFCF9;
          font-family:system-ui,sans-serif;font-size:11px;font-weight:700;
          color:#5A4A30;cursor:pointer;text-decoration:none;
          transition:border-color .15s,background .15s,color .15s;
          padding:8px 16px;
        }
        .pg-btn:hover{border-color:#1A1208;background:#1A1208;color:#fff}
        .pg-btn.active{border-color:#1A1208;background:#1A1208;color:#fff}
        .pg-num{width:36px;height:36px;padding:0}

        /* Promise strip */
        .promise-strip{display:flex;flex-wrap:wrap;background:#FDFCF9;border:1px solid #D8D2C4;border-top:none}
        .promise-item{flex:1;min-width:160px;padding:18px 20px;border-right:1px solid #D8D2C4;display:flex;align-items:flex-start;gap:10px}
        .promise-item:last-child{border-right:none}
        @media(max-width:640px){
          .promise-item{border-right:none!important;border-bottom:1px solid #D8D2C4;flex:0 0 100%}
          .promise-item:last-child{border-bottom:none}
        }

        /* Card grid */
        .card-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#D8D2C4}
        @media(max-width:1100px){.card-grid{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:740px){.card-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:440px){.card-grid{grid-template-columns:1fr}}

        /* Stats bar */
        .stats-bar{display:flex;background:#1A1208}
        @media(max-width:540px){
          .stats-bar{flex-direction:column}
          .stats-bar>div{border-right:none!important;border-bottom:1px solid rgba(255,255,255,.07)}
          .stats-bar>div:last-child{border-bottom:none}
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }}
      />

      <div style={{ minHeight: "100vh", background: "#F3EFE5", fontFamily: "'Georgia','Times New Roman',serif" }}>
        <Navbar />

        {/* ══════════════════════════════════════════
            MASTHEAD — Playfair, newspaper authority
        ══════════════════════════════════════════ */}
        <header
          className="fu0"
          style={{ background: "#F3EFE5", borderBottom: "3px solid #1A1208" }}
        >
          <div style={{ textAlign: "center", padding: "clamp(32px,5vw,60px) 24px clamp(20px,3vw,36px)" }}>

            <p style={{
              fontFamily: "system-ui,sans-serif", fontSize: 9,
              textTransform: "uppercase", letterSpacing: "0.4em",
              color: "#AAA", marginBottom: 12,
            }}>
              Independent Global Startup Registry
            </p>

            <h1
              className="pf"
              style={{
                fontSize: "clamp(2.4rem,7vw,6rem)",
                fontWeight: 900, color: "#1A1208",
                lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 14,
              }}
            >
              The Global Registry
            </h1>

            <p style={{
              fontFamily: "'Georgia',serif", fontStyle: "italic",
              fontSize: "clamp(13px,1.6vw,16px)", color: "#6B5C40",
              maxWidth: 560, margin: "0 auto 20px",
            }}>
              Verified profiles of the startups building tomorrow —&nbsp;
              {new Date().getFullYear()} Edition
            </p>

            {/* Ornament divider — same as homepage */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ height: 1, width: "clamp(40px,8vw,100px)", background: "#C8C2B4" }} />
              <span style={{ color: "#C8C2B4", fontSize: 13 }} aria-hidden="true">✦</span>
              <div style={{ height: 1, width: "clamp(40px,8vw,100px)", background: "#C8C2B4" }} />
            </div>

            {/* Live stats row */}
            <div style={{
              display: "inline-flex", flexWrap: "wrap", justifyContent: "center",
              gap: "clamp(12px,2vw,28px)",
              fontFamily: "system-ui,sans-serif", fontSize: "clamp(9px,1vw,11px)",
              textTransform: "uppercase", letterSpacing: "0.2em", color: "#888",
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7 }}>
                  <span style={{
                    position: "absolute", inset: 0, borderRadius: "50%",
                    background: "#22c55e", opacity: 0.7,
                    animation: "ping 1.5s cubic-bezier(0,0,.2,1) infinite",
                  }} />
                  <span style={{ position: "relative", width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-flex" }} />
                </span>
                Live · {total} Profiles
              </span>
              <span style={{ color: "#C8C2B4" }}>·</span>
              <span>All Verified</span>
              <span style={{ color: "#C8C2B4" }}>·</span>
              <span>Updated Daily</span>
              <span style={{ color: "#C8C2B4" }}>·</span>
              <span style={{ color: "#C59A2E", fontWeight: 700 }}>UFRN on Approval</span>
            </div>
          </div>

          {/* Stats bar — dark, like about page */}
          <div className="stats-bar">
            <div style={{ flex: 1, padding: "clamp(16px,2.5vw,24px) 0", textAlign: "center", borderRight: "1px solid rgba(255,255,255,.07)" }}>
              <p className="pf" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: 6 }}>{total.toLocaleString("en-IN")}+</p>
              <p style={{ fontFamily: "system-ui,sans-serif", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,.35)" }}>Verified Profiles</p>
            </div>
            <div style={{ flex: 1, padding: "clamp(16px,2.5vw,24px) 0", textAlign: "center", borderRight: "1px solid rgba(255,255,255,.07)" }}>
              <p className="pf" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, color: "#E8C547", lineHeight: 1, marginBottom: 6 }}>UFRN</p>
              <p style={{ fontFamily: "system-ui,sans-serif", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,.35)" }}>Global Registry ID</p>
            </div>
            <div style={{ flex: 1, padding: "clamp(16px,2.5vw,24px) 0", textAlign: "center" }}>
              <p className="pf" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: 6 }}>12+</p>
              <p style={{ fontFamily: "system-ui,sans-serif", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,.35)" }}>Countries</p>
            </div>
          </div>

          {/* Promise strip */}
          <div className="promise-strip">
            {[
              { icon: BadgeCheck, label: "Manually Verified",    desc: "Every profile reviewed before listing",   c: "#15803D" },
              { icon: Shield,     label: "No Paid Rankings",     desc: "Zero sponsored placements, ever",         c: "#2563EB" },
              { icon: Globe,      label: "Permanently Indexed",  desc: "Public, structured, always accessible",   c: "#7C3AED" },
            ].map((item, i) => (
              <div key={i} className="promise-item">
                <item.icon style={{ width: 14, height: 14, color: item.c, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ fontFamily: "system-ui,sans-serif", fontSize: "clamp(9px,1vw,10px)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#1A1208", marginBottom: 3 }}>{item.label}</p>
                  <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "clamp(11px,1.1vw,12.5px)", color: "#6B5C40", lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
            {/* UFRN info */}
            <div className="promise-item" style={{ background: "#1A1208" }}>
              <div>
                <p style={{ fontFamily: "system-ui,sans-serif", fontSize: "clamp(9px,1vw,10px)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#E8C547", marginBottom: 3 }}>What is a UFRN?</p>
                <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "clamp(11px,1.1vw,12.5px)", color: "rgba(255,255,255,.6)", lineHeight: 1.5 }}>
                  Your startup's global ID — <span style={{ fontFamily: "monospace", color: "#E8C547", fontSize: 11 }}>UF-2026-IND-00001</span>
                </p>
              </div>
            </div>
          </div>

          {/* ── Sector tab nav ── */}
          <div
            className="tabs-scroll"
            style={{
              borderTop: "1px solid #D8D2C4",
              overflowX: "auto", background: "#F3EFE5",
            }}
          >
            <div style={{ display: "flex", maxWidth: 1300, margin: "0 auto", padding: "0 clamp(12px,3vw,24px)" }}>
              <div style={{
                flexShrink: 0, padding: "0 16px 0 0", marginRight: 8,
                display: "flex", alignItems: "center",
                borderRight: "1px solid #D8D2C4",
                fontFamily: "system-ui,sans-serif", fontSize: 9,
                textTransform: "uppercase", letterSpacing: "0.2em", color: "#AAA",
              }}>
                Browse By
              </div>
              {[{ label: "All", href: "/registry", active: !sector },
                ...sectors.map((s) => ({
                  label: s,
                  href: `/registry?sector=${encodeURIComponent(s)}`,
                  active: sector === s,
                }))
              ].map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  style={{
                    flexShrink: 0, padding: "clamp(10px,1.5vw,14px) clamp(12px,1.5vw,20px)",
                    fontFamily: "system-ui,sans-serif",
                    fontSize: "clamp(9px,1vw,11px)", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.14em",
                    textDecoration: "none", whiteSpace: "nowrap",
                    borderBottom: tab.active ? "2px solid #1A1208" : "2px solid transparent",
                    color: tab.active ? "#1A1208" : "#888",
                    transition: "color .15s, border-color .15s",
                  }}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════════ */}
        <main
          className="fu1"
          style={{ maxWidth: 1300, margin: "0 auto", padding: "clamp(24px,4vw,48px) clamp(16px,3vw,24px)" }}
        >

          {/* Section label */}
          <div style={{ marginBottom: 20 }}>
            <div className="sh">
              <span className="sh-l">
                {sector ? sector : "All Startups"} · {total} profiles · Pg. {page}/{totalPages || 1}
              </span>
              <div className="sh-r" />
            </div>
          </div>

          {/* Featured — page 1 only */}
          {!sector && page === 1 && featured && <FeaturedHero s={featured} />}

          {/* Card grid */}
          {startups.length > 0 ? (
            <div className="card-grid" style={{ border: "1px solid #D8D2C4", marginBottom: 32 }}>
              {startups
                .filter((s) => !(!sector && page === 1 && featured && s.id === featured.id))
                .map((s) => <Card key={s.id} s={s} />)
              }
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 24px", color: "#AAA", fontFamily: "system-ui,sans-serif", fontSize: 14 }}>
              No startups found{sector ? ` in "${sector}"` : ""}.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 48 }}>
              {page > 1 && (
                <Link href={`${baseHref(sector)}&page=${page - 1}`} className="pg-btn">← Prev</Link>
              )}
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const p = i + 1
                return (
                  <Link key={p} href={`${baseHref(sector)}${p > 1 ? `&page=${p}` : ""}`}
                    className={`pg-btn pg-num${p === page ? " active" : ""}`}>
                    {p}
                  </Link>
                )
              })}
              {page < totalPages && (
                <Link href={`${baseHref(sector)}&page=${page + 1}`} className="pg-btn">Next →</Link>
              )}
            </div>
          )}

          {/* ── CTA — newspaper double-rule style ── */}
          <section
            className="fu2"
            style={{
              borderTop: "3px solid #1A1208", borderBottom: "1px solid #1A1208",
              padding: "clamp(28px,4vw,48px) clamp(16px,4vw,48px)",
              textAlign: "center", marginBottom: 32,
            }}
          >
            <p style={{ fontFamily: "system-ui,sans-serif", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.35em", color: "#AAA", marginBottom: 10 }}>
              UpForge Registry
            </p>
            <h2
              className="pf"
              style={{ fontSize: "clamp(1.3rem,3vw,2rem)", fontWeight: 700, color: "#1A1208", lineHeight: 1.2, marginBottom: 10 }}
            >
              Your founder story starts with a verified profile.
            </h2>
            <p style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "clamp(12px,1.4vw,14px)", color: "#6B5C40", marginBottom: 24, maxWidth: 480, margin: "0 auto 24px" }}>
              Get independently verified, receive your UFRN, and get indexed in the world's most trusted startup registry. Free forever.
            </p>
            <a
              href="https://www.upforge.in/submit"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#1A1208", color: "#fff",
                fontFamily: "system-ui,sans-serif", fontSize: "clamp(9px,1vw,11px)",
                fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em",
                padding: "clamp(10px,1.5vw,14px) clamp(24px,3vw,40px)",
                textDecoration: "none", transition: "background .15s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#C59A2E" }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#1A1208" }}
            >
              List Free → Get Your UFRN
            </a>
          </section>

          {/* Internal links */}
          <nav style={{ display: "flex", flexWrap: "wrap", gap: "clamp(8px,1.5vw,16px) clamp(16px,2vw,28px)" }} aria-label="Explore registry">
            {[
              { l: "Indian Startup Founders 2026", h: "https://www.upforge.in/" },
              { l: "Top AI Startups India",        h: "https://www.upforge.in/top-ai-startups" },
              { l: "Indian Unicorns List",         h: "https://www.upforge.in/indian-unicorns" },
              { l: "Best SaaS Startups",           h: "https://www.upforge.in/best-saas-startups" },
              { l: "Fintech Startups India",       h: "https://www.upforge.in/fintech-startups" },
              { l: "Submit Your Startup",          h: "https://www.upforge.in/submit" },
            ].map(({ l, h }) => (
              <a key={h} href={h} style={{
                fontFamily: "system-ui,sans-serif", fontSize: "clamp(10px,1.1vw,12px)",
                color: "#888", textDecoration: "none",
                transition: "color .15s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#1A1208"; (e.currentTarget as HTMLElement).style.textDecoration = "underline" }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#888"; (e.currentTarget as HTMLElement).style.textDecoration = "none" }}
              >
                {l}
              </a>
            ))}
          </nav>
        </main>

        <Footer />
      </div>
    </>
  )
}
