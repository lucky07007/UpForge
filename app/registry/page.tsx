// app/registry/page.tsx
// Served on upforge.org — same design as upforge.in/startup
// Global Registry edition — with UFRN column + global SEO signals

import { createReadClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckCircle2 } from "lucide-react"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Global Startup Registry — Verified Worldwide | UpForge",
  description:
    "The open, independent, verified global registry of startups. Every listing is manually reviewed and assigned a unique UpForge Registry Number (UFRN). Free to access, forever.",
  alternates: { canonical: "https://www.upforge.org/registry" },
  openGraph: {
    title: "UpForge Global Startup Registry",
    url: "https://www.upforge.org/registry",
    images: [{ url: "https://www.upforge.in/og/startup-default.png", width: 1200, height: 630 }],
  },
}

// ── JSON-LD ────────────────────────────────────────────────────────────────
const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "UpForge Global Startup Registry",
  description:
    "Open, verified database of startups from India and beyond. Each startup is assigned a unique UpForge Registry Number (UFRN).",
  url: "https://www.upforge.org/registry",
  creator: { "@type": "Organization", name: "UpForge", url: "https://www.upforge.org" },
  license: "https://creativecommons.org/licenses/by/4.0/",
  keywords: ["startups", "startup registry", "Indian startups", "UFRN", "verified startups"],
}

// ── Types ──────────────────────────────────────────────────────────────────
interface RegistryRow {
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

// ── Data fetchers ──────────────────────────────────────────────────────────
async function getStartups(sector?: string, page = 1): Promise<{ data: RegistryRow[]; total: number }> {
  const supabase = createReadClient()
  const from = (page - 1) * PER_PAGE
  const to   = from + PER_PAGE - 1

  let query = supabase
    .from("startups")
    .select(
      "id,name,slug,description,logo_url,category,city,country_name,founded_year,ufrn,is_featured,founders",
      { count: "exact" }
    )
    .eq("status", "approved")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, to)

  if (sector) query = query.eq("category", sector)

  const { data, count } = await query
  return { data: (data ?? []) as RegistryRow[], total: count ?? 0 }
}

async function getFeatured(): Promise<RegistryRow | null> {
  const supabase = createReadClient()
  const { data } = await supabase
    .from("startups")
    .select("id,name,slug,description,logo_url,category,city,country_name,founded_year,ufrn,is_featured,founders")
    .eq("status", "approved")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()
  return (data as RegistryRow) ?? null
}

async function getSectors(): Promise<string[]> {
  const supabase = createReadClient()
  const { data } = await supabase
    .from("startups")
    .select("category")
    .eq("status", "approved")
    .not("category", "is", null)

  if (!data) return []
  const unique = [...new Set(data.map((r) => r.category).filter(Boolean))] as string[]
  return unique.slice(0, 10)
}

// ── Logo ───────────────────────────────────────────────────────────────────
function StartupLogo({ name, logo_url, size = 56 }: { name: string; logo_url?: string | null; size?: number }) {
  if (logo_url) {
    return (
      <Image
        src={logo_url}
        alt={name}
        width={size}
        height={size}
        className="object-contain w-full h-full"
      />
    )
  }
  return (
    <span className="text-xl font-bold text-[#A89060]">
      {name.charAt(0).toUpperCase()}
    </span>
  )
}

// ── Startup Card ───────────────────────────────────────────────────────────
function StartupCard({ s }: { s: RegistryRow }) {
  return (
    <Link
      href={`https://www.upforge.in/startup/${s.slug}`}
      className="group block border border-[#E8E4DC] bg-white hover:border-[#C5BFB4] hover:shadow-sm transition-all duration-150"
    >
      <div className="p-5">
        {/* Logo + category */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-14 h-14 border border-[#E8E4DC] bg-[#F7F5F0] flex items-center justify-center flex-shrink-0 overflow-hidden">
            <StartupLogo name={s.name} logo_url={s.logo_url} size={56} />
          </div>
          {s.category && (
            <span className="text-[9px] uppercase tracking-[0.15em] text-[#888] border border-[#E8E4DC] px-2 py-0.5 flex-shrink-0 mt-1">
              {s.category.length > 22 ? s.category.slice(0, 22) + "…" : s.category}
            </span>
          )}
        </div>

        {/* Name */}
        <h3
          className="text-[15px] font-bold text-[#1C1C1C] leading-tight mb-2 group-hover:underline"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {s.name}
        </h3>

        {/* Description */}
        {s.description && (
          <p className="text-[12px] text-[#666] leading-relaxed line-clamp-3 mb-4">
            {s.description}
          </p>
        )}

        {/* Meta row */}
        <div className="flex items-center justify-between pt-3 border-t border-[#F0EFEA]">
          <div className="flex items-center gap-3 text-[10px] text-[#999]">
            {s.founders && (
              <span className="truncate max-w-[120px]">↳ {s.founders.split(",")[0]}</span>
            )}
            {s.founded_year && <span>{s.founded_year}</span>}
          </div>
          {/* UFRN badge */}
          {s.ufrn ? (
            <span className="font-mono text-[9px] text-[#A89060] font-bold tracking-tight">
              {s.ufrn}
            </span>
          ) : (
            <div className="flex items-center gap-1 text-[9px] text-emerald-600 font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

// ── Featured Hero Card ─────────────────────────────────────────────────────
function FeaturedCard({ s }: { s: RegistryRow }) {
  return (
    <Link
      href={`https://www.upforge.in/startup/${s.slug}`}
      className="group block border border-[#1C1C1C] bg-white mb-8 hover:shadow-md transition-all"
    >
      <div className="flex flex-col sm:flex-row">
        {s.logo_url && (
          <div className="sm:w-48 h-40 sm:h-auto bg-[#F7F5F0] flex items-center justify-center flex-shrink-0 border-b sm:border-b-0 sm:border-r border-[#E8E4DC] overflow-hidden p-6">
            <Image
              src={s.logo_url}
              alt={s.name}
              width={120}
              height={80}
              className="object-contain"
            />
          </div>
        )}
        <div className="p-6 flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[9px] uppercase tracking-[0.25em] text-white bg-[#1C1C1C] px-2 py-0.5 font-bold">
              Featured This Edition
            </span>
            {s.category && (
              <span className="text-[9px] uppercase tracking-[0.12em] text-[#888]">
                {s.category}
              </span>
            )}
          </div>
          <h2
            className="text-2xl font-bold text-[#1C1C1C] mb-2 group-hover:underline"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {s.name}
          </h2>
          {s.description && (
            <p className="text-[13px] text-[#555] leading-relaxed line-clamp-3 mb-4">
              {s.description}
            </p>
          )}
          <div className="flex items-center gap-4 text-[10px] text-[#888] flex-wrap">
            {s.founders && <span>Founders — {s.founders}</span>}
            {s.founded_year && <span>{s.founded_year}</span>}
            {s.ufrn && (
              <span className="font-mono text-[#A89060] font-bold">{s.ufrn}</span>
            )}
            <span className="ml-auto text-[#1C1C1C] font-bold uppercase tracking-widest group-hover:underline">
              View Profile →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function RegistryPage({ searchParams }: PageProps) {
  const { sector, page: pageStr } = await searchParams
  const page       = parseInt(pageStr ?? "1", 10) || 1
  const baseHref   = (s?: string) =>
    s ? `/registry?sector=${encodeURIComponent(s)}` : "/registry"

  const [{ data: startups, total }, featured, sectors] = await Promise.all([
    getStartups(sector, page),
    getFeatured(),
    getSectors(),
  ])

  const totalPages = Math.ceil(total / PER_PAGE)

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />

      <Navbar />

      <main className="flex-1">

        {/* ── PAGE HEADER ── */}
        <div className="border-b border-[#D5D0C8] bg-[#F7F5F0]">
          <div className="max-w-[1400px] mx-auto px-6 py-10">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-[10px] text-[#AAA] uppercase tracking-widest mb-6">
              <Link href="https://www.upforge.in" className="hover:text-[#1C1C1C]">UpForge</Link>
              <span>/</span>
              <span className="text-[#1C1C1C]">Global Registry</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#A89060] font-bold mb-2">
                  Global Edition · 2026
                </p>
                <h1
                  className="text-4xl sm:text-5xl text-[#1C1C1C] leading-tight mb-3"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Global Startup Registry
                </h1>
                <p className="text-[13px] text-[#888] max-w-lg leading-relaxed">
                  The world's open, independent registry of verified startups — every listing
                  manually reviewed and assigned a unique{" "}
                  <strong className="text-[#1C1C1C]">UFRN</strong> (UpForge Registry Number).
                </p>
              </div>

              {/* Live counter */}
              <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                  </span>
                  <span className="text-[10px] text-[#666] font-medium tracking-wider uppercase">
                    Live · {total} Profiles
                  </span>
                </div>
                <span className="text-[9px] text-[#AAA] uppercase tracking-widest">
                  All Verified · Updated Daily
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTOR FILTERS ── */}
        <div className="border-b border-[#D5D0C8] bg-white sticky top-14 z-30">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex items-center gap-0 overflow-x-auto py-0">
              <Link
                href="/registry"
                className={`flex-shrink-0 px-4 py-3 text-[11px] font-bold uppercase tracking-widest border-b-2 transition-colors ${
                  !sector
                    ? "border-[#1C1C1C] text-[#1C1C1C]"
                    : "border-transparent text-[#888] hover:text-[#1C1C1C]"
                }`}
              >
                All
              </Link>
              {sectors.map((s) => (
                <Link
                  key={s}
                  href={`/registry?sector=${encodeURIComponent(s)}`}
                  className={`flex-shrink-0 px-4 py-3 text-[11px] font-bold uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ${
                    sector === s
                      ? "border-[#1C1C1C] text-[#1C1C1C]"
                      : "border-transparent text-[#888] hover:text-[#1C1C1C]"
                  }`}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="max-w-[1400px] mx-auto px-6 py-10">

          {/* Section label */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-widest text-[#888] font-bold">
                {sector ? `${sector} Startups` : "All Startups"}
              </span>
              <span className="text-[10px] text-[#AAA]">— {total} profiles</span>
              <span className="text-[10px] text-[#AAA]">Pg. {page} / {totalPages || 1}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 border border-[#A89060] px-3 py-1.5">
              <span className="text-[9px] uppercase tracking-widest text-[#A89060] font-bold">UFRN</span>
              <span className="text-[9px] text-[#888]">
                UpForge Registry Number — unique global ID per startup
              </span>
            </div>
          </div>

          {/* Featured — page 1 only */}
          {!sector && page === 1 && featured && (
            <FeaturedCard s={featured} />
          )}

          {/* Card grid */}
          {startups.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {startups
                .filter((s) =>
                  !(!sector && page === 1 && featured && s.id === featured.id)
                )
                .map((s) => (
                  <StartupCard key={s.id} s={s} />
                ))}
            </div>
          ) : (
            <div className="text-center py-24 text-[#AAA] text-sm">
              No startups found{sector ? ` in "${sector}"` : ""}.
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {page > 1 && (
                <Link
                  href={`${baseHref(sector)}&page=${page - 1}`}
                  className="px-4 py-2 border border-[#D5D0C8] text-[11px] font-bold uppercase tracking-widest text-[#666] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors"
                >
                  Prev
                </Link>
              )}
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const p = i + 1
                return (
                  <Link
                    key={p}
                    href={`${baseHref(sector)}${p > 1 ? `&page=${p}` : ""}`}
                    className={`w-9 h-9 flex items-center justify-center text-[11px] font-bold border transition-colors ${
                      p === page
                        ? "bg-[#1C1C1C] text-white border-[#1C1C1C]"
                        : "border-[#D5D0C8] text-[#666] hover:border-[#1C1C1C] hover:text-[#1C1C1C]"
                    }`}
                  >
                    {p}
                  </Link>
                )
              })}
              {page < totalPages && (
                <Link
                  href={`${baseHref(sector)}&page=${page + 1}`}
                  className="px-4 py-2 border border-[#D5D0C8] text-[11px] font-bold uppercase tracking-widest text-[#666] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors"
                >
                  Next
                </Link>
              )}
            </div>
          )}

          {/* CTA Banner */}
          <div className="mt-16 border border-[#D5D0C8] bg-white p-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#888] mb-3">
              UpForge Registry
            </p>
            <h2
              className="text-2xl text-[#1C1C1C] mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Your founder story starts with a verified profile.
            </h2>
            <p className="text-[13px] text-[#888] mb-6 max-w-md mx-auto">
              Get independently verified, receive your UFRN, and get indexed in the world's most
              trusted startup registry. Free forever.
            </p>
            <a
              href="https://www.upforge.in/submit"
              className="inline-flex items-center gap-2 bg-[#1C1C1C] text-white px-8 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-[#333] transition-colors"
            >
              List Free →
            </a>
          </div>

          {/* Internal link network */}
          <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2" aria-label="Explore registry">
            {[
              { l: "Indian Startup Founders 2026", h: "https://www.upforge.in/" },
              { l: "Top AI Startups India",        h: "https://www.upforge.in/top-ai-startups" },
              { l: "Indian Unicorns List",         h: "https://www.upforge.in/indian-unicorns" },
              { l: "Best SaaS Startups",           h: "https://www.upforge.in/best-saas-startups" },
              { l: "Fintech Startups India",       h: "https://www.upforge.in/fintech-startups" },
              { l: "Edtech Founders India",        h: "https://www.upforge.in/edtech-startups" },
              { l: "Submit Your Startup",          h: "https://www.upforge.in/submit" },
            ].map(({ l, h }) => (
              <a
                key={h}
                href={h}
                className="text-[12px] text-[#888] hover:text-[#1C1C1C] hover:underline transition-colors"
              >
                {l}
              </a>
            ))}
          </nav>
        </div>
      </main>

      <Footer />
    </div>
  )
}
