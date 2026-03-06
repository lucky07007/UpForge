// app/startup/[slug]/page.tsx
// ZERO logic changes — UI wrapper only upgraded

import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { Startup } from "@/types/startup"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StartupDetail } from "@/components/startup-detail"
import { BadgeCheck, Shield, Globe, ChevronRight } from "lucide-react"

interface PageProps {
  params: Promise<{ slug: string }>
}

// ─── METADATA — unchanged logic, richer keywords ─────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: startup } = await supabase
    .from("startups")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!startup) {
    return {
      title: "Startup Not Found | UpForge",
      description:
        "The requested startup profile could not be found in the UpForge founder registry.",
    }
  }

  const profileUrl = `https://www.upforge.in/startup/${slug}`
  const title = `${startup.name} | Official Startup Profile | UpForge`
  const description =
    startup.description ||
    `View the verified public startup profile of ${startup.name} on UpForge.`

  return {
    title,
    description,
    alternates: { canonical: profileUrl },
    keywords: [
      startup.name,
      `${startup.name} startup`,
      `${startup.name} India`,
      startup.industry || startup.category,
      "Indian startup",
      "verified startup India",
      "UpForge founder registry",
      startup.city,
      startup.founded_year ? `founded ${startup.founded_year}` : "",
    ]
      .filter(Boolean)
      .join(", "),
    openGraph: {
      title,
      description,
      url: profileUrl,
      siteName: "UpForge",
      images: [
        {
          url: startup.logo_url || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${startup.name} Official Profile`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@upforge_in",
      images: [startup.logo_url || "/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
  }
}

// ─── PAGE — unchanged logic, upgraded visual wrapper ─────────────────────────
export default async function StartupPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: startup } = await supabase
    .from("startups")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!startup) {
    notFound()
  }

  const profileUrl = `https://www.upforge.in/startup/${slug}`

  // JSON-LD — unchanged
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: startup.name,
    description: startup.description,
    url: startup.website || profileUrl,
    logo: startup.logo_url,
    foundingDate: startup.founded_year?.toString(),
    industry: startup.category,
    areaServed: "India",
    sameAs: [
      startup.linkedin_url,
      startup.twitter_url,
      startup.instagram_url,
    ].filter(Boolean),
    memberOf: {
      "@type": "Organization",
      name: "UpForge Founder Registry",
      url: "https://www.upforge.in",
    },
  }

  return (
    <div
      className="flex min-h-screen flex-col bg-[#F7F5F0]"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* Structured Data — unchanged */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fu-0 { animation: fadeUp .45s .04s ease both; }
        .fu-1 { animation: fadeUp .45s .14s ease both; }
        .fu-2 { animation: fadeUp .45s .24s ease both; }
      `}</style>

      <Navbar />

      <main className="flex-1">

        {/* Sponsor banner — unchanged condition */}
        {startup.is_sponsored && (
          <div
            className="bg-[#1C1C1C] text-[#E8C547] text-center py-2.5 text-[9px] font-bold uppercase tracking-[0.35em]"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            ★ &nbsp; Featured Startup · Sponsored Listing on UpForge
          </div>
        )}

        {/* ── PRIDE HEADER BAND ───────────────────────────────────────────────
            Pure visual addition — no data or logic touched.
            Gives founders a "this is official" moment.
        ─────────────────────────────────────────────────────────────────────── */}
        <div className="border-b-2 border-[#1C1C1C] bg-[#F7F5F0] fu-0">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1 py-3 border-b border-[#E8E4DC]"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              <a href="/" className="text-[10px] text-[#999] hover:text-[#1C1C1C] transition-colors uppercase tracking-wider">
                Home
              </a>
              <ChevronRight className="w-3 h-3 text-[#CCC]" />
              <a href="/startup" className="text-[10px] text-[#999] hover:text-[#1C1C1C] transition-colors uppercase tracking-wider">
                Registry
              </a>
              <ChevronRight className="w-3 h-3 text-[#CCC]" />
              <span className="text-[10px] text-[#1C1C1C] font-semibold uppercase tracking-wider truncate max-w-[180px]">
                {startup.name}
              </span>
            </nav>

            {/* Registry certificate block */}
            <div className="py-6 sm:py-8">
              <div className="border-2 border-[#1C1C1C] bg-white relative overflow-hidden">

                {/* Gold corner ticks — editorial craft detail */}
                <span className="absolute top-0  left-0  w-6 h-6 border-r-2 border-b-2 border-[#E8C547] pointer-events-none" />
                <span className="absolute top-0  right-0 w-6 h-6 border-l-2 border-b-2 border-[#E8C547] pointer-events-none" />
                <span className="absolute bottom-0 left-0  w-6 h-6 border-r-2 border-t-2 border-[#E8C547] pointer-events-none" />
                <span className="absolute bottom-0 right-0 w-6 h-6 border-l-2 border-t-2 border-[#E8C547] pointer-events-none" />

                {/* Subtle dot-grid texture */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.025]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #000 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 px-6 sm:px-8 py-6 sm:py-7">

                  {/* LEFT — UF seal + name */}
                  <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                    {/* Seal block */}
                    <div className="flex-shrink-0 w-14 h-14 bg-[#1C1C1C] flex flex-col items-center justify-center gap-0.5 border border-[#333]">
                      <span
                        className="text-[#E8C547] font-black text-[15px] leading-none"
                        style={{ fontFamily: "system-ui, sans-serif" }}
                      >
                        UF
                      </span>
                      <span
                        className="text-white/25 text-[6px] uppercase tracking-[0.2em] leading-none"
                        style={{ fontFamily: "system-ui, sans-serif" }}
                      >
                        REG
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div
                        className="flex items-center gap-2 mb-1"
                        style={{ fontFamily: "system-ui, sans-serif" }}
                      >
                        <span className="text-[9px] text-[#BBB] uppercase tracking-[0.22em]">
                          Official Registry Profile
                        </span>
                        <span className="text-[#DDD]">·</span>
                        <span className="text-[9px] font-mono text-[#888] tracking-wider">
                          UF–{String(startup.id || "000001").slice(-6).toUpperCase()}
                        </span>
                      </div>
                      <h1
                        className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] leading-tight tracking-tight truncate"
                      >
                        {startup.name}
                      </h1>
                      {startup.tagline && (
                        <p
                          className="text-sm text-[#777] italic mt-0.5 truncate"
                          style={{ fontFamily: "'Georgia', serif" }}
                        >
                          "{startup.tagline}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* RIGHT — trust badges */}
                  <div
                    className="flex flex-row lg:flex-col items-start lg:items-end gap-2 flex-shrink-0"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {/* Verified badge */}
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-[0.16em]">
                        Verified Startup
                      </span>
                    </div>

                    {/* Mini trust row */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[9px] text-[#AAA]">
                        <Shield className="w-3 h-3" />
                        <span>Independently Reviewed</span>
                      </div>
                      <div className="flex items-center gap-1 text-[9px] text-[#AAA]">
                        <Globe className="w-3 h-3" />
                        <span>Publicly Indexed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom meta strip */}
                <div
                  className="border-t border-[#EEEAE3] bg-[#FAFAF8] px-6 sm:px-8 py-3 flex flex-wrap items-center gap-x-6 gap-y-2"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  {[
                    startup.founded_year && { label: "Founded", value: startup.founded_year },
                    (startup.industry || startup.category) && { label: "Sector", value: startup.industry || startup.category },
                    startup.city && { label: "Based in", value: startup.city },
                    startup.funding_stage && { label: "Stage", value: startup.funding_stage },
                  ]
                    .filter(Boolean)
                    .map((item: any, i: number, arr) => (
                      <div key={i} className="flex items-center gap-3">
                        <div>
                          <span className="text-[9px] text-[#BBB] uppercase tracking-[0.18em]">
                            {item.label}
                          </span>
                          <span className="text-[9px] text-[#BBB] mx-1">·</span>
                          <span className="text-[11px] font-semibold text-[#444]">
                            {item.value}
                          </span>
                        </div>
                        {i < arr.length - 1 && (
                          <span className="text-[#DDD] hidden sm:inline">|</span>
                        )}
                      </div>
                    ))}

                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[9px] text-[#AAA] uppercase tracking-wider">
                      Live Profile
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* StartupDetail — completely unchanged */}
        <StartupDetail startup={startup as Startup} />

      </main>

      <Footer />
    </div>
  )
}
