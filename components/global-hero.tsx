"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function GlobalHero() {
  return (
    <div className="border-b border-neutral-200 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-2">

        <div className="flex items-center justify-center gap-3 text-center">

          <p className="text-[11px] sm:text-sm font-medium text-neutral-800 tracking-wide">
            February Intelligence Report is Live — India’s Top Startups, Curated by UpForge
          </p>

          <Link
            href="/download"
            className="inline-flex items-center gap-1 text-[11px] sm:text-sm font-semibold text-black hover:underline"
          >
            Download
            <ArrowRight className="h-3 w-3" />
          </Link>

        </div>

      </div>
    </div>
  )
}
