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
    if (num >= 1000) return `${Math.floor(num / 1000)},000+`
    return num.toString()
  }

  return (
    <section className="bg-neutral-50 py-24 lg:py-32 border-y border-neutral-100">

      <div className="max-w-[980px] mx-auto px-6 lg:px-8 text-center">

        {/* Eyebrow */}

        <div className="mb-6">
          <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-400 font-mono">
            UpForge Global Registry
          </span>
        </div>


        {/* Headline */}

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-neutral-900 leading-tight mb-6">

          A permanent record  
          of global startups.

        </h2>


        {/* Subhead */}

        <p className="text-neutral-500 font-serif text-lg max-w-xl mx-auto leading-relaxed mb-14">

          Independently verified.  
          Structured for long-term discovery.

        </p>


        {/* Stats */}

        <div className="flex justify-center gap-14 mb-16">

          <div>
            <div className="text-5xl font-serif text-neutral-900">
              {formatNumber(startupCount)}
            </div>

            <div className="text-[10px] tracking-[0.18em] uppercase text-neutral-400 mt-1">
              Verified Startups
            </div>
          </div>


          <div>
            <div className="text-5xl font-serif text-neutral-900">
              190+
            </div>

            <div className="text-[10px] tracking-[0.18em] uppercase text-neutral-400 mt-1">
              Countries
            </div>
          </div>


          <div>
            <div className="text-5xl font-serif text-neutral-900">
              UFRN
            </div>

            <div className="text-[10px] tracking-[0.18em] uppercase text-neutral-400 mt-1">
              Permanent Identity Layer
            </div>
          </div>

        </div>


        {/* Identity Layer Statement */}

        <div className="max-w-lg mx-auto border-t border-neutral-200 pt-10 mb-14">

          <p className="text-neutral-500 text-sm font-serif leading-relaxed">

            Every listed startup receives a  
            permanent UpForge Registry Number (UFRN) —  
            a verifiable global reference.

          </p>

        </div>


        {/* CTA */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <Link
            href="/registry"
            className="px-8 py-3 text-sm font-mono tracking-wide bg-neutral-900 text-white hover:bg-neutral-800 transition"
          >
            Explore Registry →
          </Link>

          <Link
            href="/verify"
            className="px-8 py-3 text-sm font-mono tracking-wide border border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:border-neutral-500 transition"
          >
            Verify a UFRN →
          </Link>

        </div>


        {/* Trust Strip */}

        <div className="flex justify-center items-center gap-6 mt-14 text-[10px] tracking-[0.18em] uppercase text-neutral-400">

          <span>Independently Verified</span>

          <span className="w-px h-3 bg-neutral-300" />

          <span>No Paid Placement</span>

          <span className="w-px h-3 bg-neutral-300" />

          <span>Free Public Infrastructure</span>

        </div>


      </div>

    </section>
  )
}
