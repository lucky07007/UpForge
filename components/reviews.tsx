"use client"

import Image from "next/image"
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
    <section className="border-y border-neutral-200 bg-[#faf9f7]">

      <div className="max-w-[1100px] mx-auto px-6 py-6 flex items-center justify-between gap-6 flex-col sm:flex-row">

        {/* Left side — masthead visual */}

        <div className="flex items-center gap-4">

          <Image
            src="/masthead"
            alt="UpForge Registry"
            width={64}
            height={64}
            className="opacity-80"
            priority
          />

          <div>

            <div className="text-[11px] tracking-[0.22em] uppercase text-neutral-400 font-mono">
              UpForge Global Registry
            </div>

            <div className="text-neutral-700 font-serif text-sm">
              {formatNumber(startupCount)} verified startups · 190+ countries
            </div>

          </div>

        </div>


        {/* Right side — CTA */}

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
