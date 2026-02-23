"use client"

import React from "react"
import { ShieldCheck, Sparkles, Zap } from "lucide-react"

export function GlobalHero() {
  return (
    <div className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: Authenticity Note */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 p-2 rounded-full">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-sm font-medium text-slate-700">
            <span className="font-bold text-slate-900">Institutional Registry:</span> 
            All profiles are verified for ecosystem integrity and leadership vision.
          </p>
        </div>

        {/* Right Side: Active Status/Offer */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <Zap className="h-3 w-3 text-[#c6a43f]" />
            Real-time Updates Active
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm">
            <Sparkles className="h-3 w-3 text-[#c6a43f]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              2026 Founder Cohort
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
