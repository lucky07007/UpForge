"use client"

// components/global-registry-promo.tsx
// Heavy promotional section for /registry
// Global, trusted, premium publication aesthetic
// Redirects to /registry page

import Link from "next/link"

interface GlobalRegistryPromoProps {
  startupCount: number
  isOrg: boolean
}

const COUNTRIES = [
  "🇮🇳 India",
  "🇸🇬 Singapore",
  "🇦🇪 UAE",
  "🇧🇷 Brazil",
  "🇳🇬 Nigeria",
  "🇮🇩 Indonesia",
  "🇰🇪 Kenya",
  "🇲🇽 Mexico",
  "🇻🇳 Vietnam",
  "🇿🇦 South Africa",
]

const SECTORS = [
  "Fintech",
  "SaaS",
  "AI/ML",
  "Edtech",
  "Healthtech",
  "D2C",
  "Climate",
  "Logistics",
]

export function GlobalRegistryPromo({ startupCount, isOrg }: GlobalRegistryPromoProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(0) + ",000+"
    return num.toString()
  }

  return (
    <section className="overflow-hidden" style={{ background: "#1A0A0A" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span
            className="px-4 py-1.5 text-[10px] tracking-[0.25em] uppercase font-bold"
            style={{
              background: "rgba(124, 29, 29, 0.2)",
              color: "#C9B99A",
              fontFamily: "Georgia, 'Times New Roman', serif",
              border: "1px solid rgba(124, 29, 29, 0.5)",
            }}
          >
            The Independent Global Registry
          </span>
        </div>

        {/* Main Headline */}
        <h2
          className="text-center mb-6"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(32px, 6vw, 56px)",
            color: "#FAF7F2",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          Every verified startup.
          <br />
          <span style={{ color: "#C9B99A" }}>One global registry.</span>
        </h2>

        {/* Subheadline */}
        <p
          className="text-center max-w-2xl mx-auto mb-12"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "18px",
            color: "#8B6A6A",
            lineHeight: 1.6,
          }}
        >
          The UpForge Global Registry is the world's most comprehensive open database 
          of verified startups. Every company receives a unique UFRN — permanent proof 
          of existence, free forever.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-14">
          <div className="text-center">
            <div
              className="text-5xl font-bold mb-2"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#FAF7F2" }}
            >
              {formatNumber(startupCount)}
            </div>
            <div
              className="text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#8B6A6A" }}
            >
              Verified Startups
            </div>
          </div>
          <div className="text-center" style={{ borderLeft: "1px solid rgba(139, 106, 106, 0.2)", borderRight: "1px solid rgba(139, 106, 106, 0.2)" }}>
            <div
              className="text-5xl font-bold mb-2"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#FAF7F2" }}
            >
              190+
            </div>
            <div
              className="text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#8B6A6A" }}
            >
              Countries Covered
            </div>
          </div>
          <div className="text-center">
            <div
              className="text-5xl font-bold mb-2"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#FAF7F2" }}
            >
              100%
            </div>
            <div
              className="text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#8B6A6A" }}
            >
              Manually Verified
            </div>
          </div>
        </div>

        {/* Countries & Sectors */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            {COUNTRIES.map((country) => (
              <span
                key={country}
                className="text-sm px-4 py-1.5"
                style={{
                  background: "rgba(250, 247, 242, 0.04)",
                  color: "#C9B99A",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  border: "1px solid rgba(201, 185, 154, 0.15)",
                }}
              >
                {country}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SECTORS.map((sector) => (
              <span
                key={sector}
                className="text-xs px-3 py-1"
                style={{
                  color: "#8B6A6A",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                }}
              >
                {sector}
              </span>
            ))}
          </div>
        </div>

        {/* UFRN Explanation */}
        <div
          className="max-w-3xl mx-auto p-8 mb-10 text-center"
          style={{
            background: "rgba(124, 29, 29, 0.08)",
            border: "1px solid rgba(124, 29, 29, 0.3)",
          }}
        >
          <div
            className="text-3xl font-mono font-bold mb-3 tracking-wider"
            style={{ color: "#C9B99A" }}
          >
            UFRN-2024-001
          </div>
          <p
            className="text-sm max-w-lg mx-auto"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#8B6A6A", lineHeight: 1.6 }}
          >
            The UpForge Registry Number (UFRN) is a permanent, verifiable identifier. 
            Each UFRN is unique, traceable, and serves as your startup's proof of existence 
            in the global ecosystem.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/registry"
            className="group inline-flex items-center gap-3 px-10 py-4 text-base font-semibold tracking-wider uppercase transition-all duration-300"
            style={{
              background: "#7C1D1D",
              color: "#FAF7F2",
              fontFamily: "Georgia, 'Times New Roman', serif",
              letterSpacing: "0.1em",
              border: "1px solid #7C1D1D",
            }}
          >
            Explore the Global Registry
            <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
          <Link
            href="/verify"
            className="group inline-flex items-center gap-3 px-10 py-4 text-base font-semibold tracking-wider uppercase transition-all duration-300"
            style={{
              background: "transparent",
              color: "#C9B99A",
              fontFamily: "Georgia, 'Times New Roman', serif",
              letterSpacing: "0.1em",
              border: "1px solid rgba(201, 185, 154, 0.4)",
            }}
          >
            Verify a UFRN
            <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-6 mt-12 pt-8 border-t" style={{ borderColor: "rgba(139, 106, 106, 0.15)" }}>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="#2D5A1A" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#8B6A6A" }}
            >
              Independently Verified
            </span>
          </div>
          <div className="w-px h-4" style={{ background: "rgba(139, 106, 106, 0.2)" }} />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="#C6A43F" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#8B6A6A" }}
            >
              No Paid Placements
            </span>
          </div>
          <div className="w-px h-4" style={{ background: "rgba(139, 106, 106, 0.2)" }} />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="#7C1D1D" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#8B6A6A" }}
            >
              Free Forever
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
