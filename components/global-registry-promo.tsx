"use client"

// components/global-registry-promo.tsx
// Clean, editorial section for /registry
// Following upforge.org magazine aesthetic

import Link from "next/link"

interface GlobalRegistryPromoProps {
  startupCount: number
  isOrg: boolean
}

const COUNTRIES = [
  "India", "Singapore", "UAE", "Brazil", "Nigeria",
  "Indonesia", "Kenya", "Mexico", "Vietnam", "South Africa",
]

const SECTORS = [
  "Fintech", "SaaS", "AI/ML", "Edtech", "Healthtech", "D2C", "Climate", "Logistics",
]

export function GlobalRegistryPromo({ startupCount, isOrg }: GlobalRegistryPromoProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(0) + ",000+"
    return num.toString()
  }

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        
        {/* Eyebrow */}
        <div className="flex justify-center mb-6">
          <span className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 font-mono">
            The Global Registry
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-center mb-4 text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-neutral-900">
          Every verified startup.
          <br />
          <span className="text-neutral-500">One global registry.</span>
        </h1>

        {/* Subhead */}
        <p className="text-center max-w-xl mx-auto mb-14 text-base text-neutral-500 font-serif leading-relaxed">
          The UpForge Global Registry is the world's most comprehensive open database 
          of verified startups. Free forever.
        </p>

        {/* Stats - Clean grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-2xl mx-auto mb-16">
          <div className="text-center">
            <div className="text-5xl font-serif font-normal text-neutral-900 mb-1">
              {formatNumber(startupCount)}
            </div>
            <div className="text-[10px] tracking-[0.15em] uppercase text-neutral-400">
              Verified Startups
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-serif font-normal text-neutral-900 mb-1">
              190+
            </div>
            <div className="text-[10px] tracking-[0.15em] uppercase text-neutral-400">
              Countries
            </div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-serif font-normal text-neutral-900 mb-1">
              100%
            </div>
            <div className="text-[10px] tracking-[0.15em] uppercase text-neutral-400">
              Manually Verified
            </div>
          </div>
        </div>

        {/* Countries & Sectors - Clean chips */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 mb-4">
            {COUNTRIES.map((country) => (
              <span
                key={country}
                className="text-sm text-neutral-500 font-serif"
              >
                {country}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
            {SECTORS.map((sector) => (
              <span
                key={sector}
                className="text-xs text-neutral-400 font-serif"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>

        {/* UFRN Card - Very subtle */}
        <div className="max-w-xl mx-auto mb-12 text-center border-t border-b border-neutral-100 py-8">
          <code className="text-sm tracking-wide text-neutral-500 font-mono mb-2 block">
            UFRN-2024-001
          </code>
          <p className="text-xs text-neutral-400 font-serif max-w-md mx-auto leading-relaxed">
            The UpForge Registry Number (UFRN) is a permanent, verifiable identifier — your startup's proof of existence.
          </p>
        </div>

        {/* CTA Buttons - Clean, no heavy backgrounds */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/registry"
            className="px-8 py-3 text-sm font-mono tracking-wide text-white bg-neutral-900 hover:bg-neutral-800 transition-colors duration-200"
          >
            Explore Registry →
          </Link>
          <Link
            href="/verify"
            className="px-8 py-3 text-sm font-mono tracking-wide text-neutral-600 border border-neutral-200 hover:border-neutral-300 hover:text-neutral-900 transition-colors duration-200"
          >
            Verify a UFRN →
          </Link>
        </div>

        {/* Trust indicators - Minimal */}
        <div className="flex items-center justify-center gap-6 mt-14 pt-8 border-t border-neutral-100">
          <span className="text-[9px] tracking-[0.15em] uppercase text-neutral-400">Independently Verified</span>
          <span className="w-px h-3 bg-neutral-200" />
          <span className="text-[9px] tracking-[0.15em] uppercase text-neutral-400">No Paid Placements</span>
          <span className="w-px h-3 bg-neutral-200" />
          <span className="text-[9px] tracking-[0.15em] uppercase text-neutral-400">Free Forever</span>
        </div>
      </div>
    </section>
  )
}
