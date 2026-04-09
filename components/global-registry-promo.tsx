"use client"

import Link from "next/link"

interface GlobalRegistryPromoProps {
  startupCount: number
  isOrg: boolean
}

export function GlobalRegistryPromo({
  startupCount,
}: GlobalRegistryPromoProps) {

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${Math.floor(num / 1000)}k+`
    return num.toString()
  }

  return (
    <section className="relative border-y border-neutral-200 bg-[#faf9f7] overflow-hidden">

      {/* Background masthead - enhanced visibility */}

      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-20"
        style={{
          backgroundImage: "url('/mastheade.jpg')",
        }}
      />

      {/* Content - larger vertical padding for banner feel */}

      <div className="relative max-w-[1100px] mx-auto px-6 py-8 md:py-10 flex items-center justify-between flex-wrap gap-5">

        {/* Left text - slightly larger typography */}

        <div className="flex flex-col leading-tight">

          <span className="text-[12px] tracking-[0.28em] uppercase text-neutral-500 font-mono">
            UpForge Global Registry
          </span>

          <span className="text-neutral-800 text-[18px] font-serif mt-1.5">

            {formatNumber(startupCount)} verified startups · 190+ countries

          </span>

        </div>

        {/* Right actions - refined spacing */}

        <div className="flex items-center gap-6 text-[14px] font-mono">

          <Link
            href="/registry"
            className="text-neutral-900 font-medium hover:text-amber-700 transition-colors"
          >
            Explore registry →
          </Link>

          <span className="text-neutral-300">|</span>

          <Link
            href="/verify"
            className="text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Verify UFRN
          </Link>

        </div>

      </div>

    </section>
  )
}
