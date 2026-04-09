"use client"

import Link from "next/link"

interface GlobalRegistryPromoProps {
  startupCount: number
}

export function GlobalRegistryPromo({
  startupCount,
}: GlobalRegistryPromoProps) {

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${Math.floor(num / 1000)},000+`
    return num.toString()
  }

  return (
    <section className="relative border-y border-neutral-200 overflow-hidden">

      {/* Background masthead */}

      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-[0.06]"
        style={{
          backgroundImage: "url('/masthead.jpg')",
        }}
      />

      {/* Content layer */}

      <div className="relative max-w-[1100px] mx-auto px-6 py-5 flex items-center justify-between flex-wrap gap-3">

        {/* Left */}

        <div>

          <div className="text-[11px] tracking-[0.25em] uppercase text-neutral-400 font-mono">
            UpForge Global Registry
          </div>

          <div className="text-neutral-700 font-serif text-sm">

            {formatNumber(startupCount)} verified startups · 190+ countries · UFRN identity layer

          </div>

        </div>


        {/* Right */}

        <div className="flex items-center gap-4 text-sm font-mono">

          <Link
            href="/registry"
            className="text-neutral-900 hover:opacity-70 transition"
          >
            Explore →
          </Link>

          <span className="text-neutral-300">|</span>

          <Link
            href="/verify"
            className="text-neutral-500 hover:text-neutral-900 transition"
          >
            Verify UFRN
          </Link>

        </div>

      </div>

    </section>
  )
}
