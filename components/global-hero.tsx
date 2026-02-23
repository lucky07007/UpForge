"use client"

import React from "react"
import { ShieldCheck, Globe, Activity } from "lucide-react"

export function GlobalHero() {
  return (
    <div className="relative border-b border-neutral-200 bg-white">

      {/* Top micro authority line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-neutral-900 to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* LEFT — Brand Authority Statement */}
        <div className="flex items-start gap-4">

          <div className="bg-neutral-900 p-2 rounded-md">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>

          <div className="flex flex-col">
            <p className="text-[11px] tracking-[0.25em] uppercase text-neutral-400 font-semibold">
              UpForge Intelligence Network
            </p>

            <p className="text-sm md:text-base font-semibold text-neutral-900 leading-snug">
              Structured credibility. Verified leadership.  
              A disciplined ecosystem built for long-term builders.
            </p>
          </div>
        </div>

        {/* RIGHT — Silent Power Signals */}
        <div className="flex items-center gap-8 text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">

          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-neutral-700" />
            Independent Infrastructure
          </div>

          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-neutral-700" />
            Continuously Monitored
          </div>

        </div>
      </div>

      {/* Bottom subtle divider */}
      <div className="h-[1px] bg-neutral-200" />
    </div>
  )
}
