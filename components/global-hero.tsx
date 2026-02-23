"use client"

import React from "react"
import Link from "next/link"
import { FileText, ArrowRight } from "lucide-react"

export function GlobalHero() {
  return (
    <div className="relative border-b border-neutral-200 bg-neutral-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

          {/* LEFT — Report Announcement */}
          <div className="flex items-start gap-3">

            <div className="bg-black text-white p-2 rounded-md">
              <FileText className="h-4 w-4" />
            </div>

            <div className="leading-tight">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-neutral-500 font-semibold">
                UpForge Monthly Intelligence
              </p>

              <p className="text-sm sm:text-base font-semibold text-neutral-900">
                February 2026 Startup Report is Live
              </p>

              <p className="hidden sm:block text-xs text-neutral-600 mt-1">
                Curated analysis of India’s most promising startups. Institutional-grade clarity.
              </p>
            </div>
          </div>

          {/* RIGHT — CTA */}
          <Link
            href="/download"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-black border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all"
          >
            Download Report
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>
      </div>
    </div>
  )
}
