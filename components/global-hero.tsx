"use client"

import React from "react"
import { ShieldCheck, Sparkles, Zap, BadgeCheck } from "lucide-react"

export function GlobalHero() {
  return (
    <div className="relative border-b border-slate-200 bg-gradient-to-r from-white via-slate-50 to-white">
      
      {/* Subtle authority glow line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#c6a43f]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-5">

        {/* LEFT — Institutional Authority Signal */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-lg rounded-full" />
            <div className="relative bg-emerald-100 p-2 rounded-full border border-emerald-200">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-400">
              Institutional Registry
            </p>
            <p className="text-sm font-semibold text-slate-800">
              Verified Founders · Curated Leadership · Ecosystem Integrity
            </p>
          </div>
        </div>

        {/* RIGHT — Real-Time Authority + Scarcity */}
        <div className="flex items-center gap-6">

          <div className="hidden lg:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <Zap className="h-3 w-3 text-[#c6a43f]" />
            Live Registry Active
          </div>

          <div className="flex items-center gap-3 px-4 py-2 bg-white/70 backdrop-blur-md border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-all">
            <BadgeCheck className="h-4 w-4 text-[#c6a43f]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
              2026 Founder Cohort — Limited Access
            </span>
          </div>
        </div>
      </div>

      {/* Bottom golden micro-divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#c6a43f]/40 to-transparent" />
    </div>
  )
}
