// components/all-startups.tsx
// ZERO logic changes — same two functions, UI only upgraded

import { createClient } from "@/lib/supabase/server"
import type { Startup } from "@/types/startup"
import { StartupCard } from "@/components/startup-card"
import { BadgeCheck, Building2, Globe, TrendingUp, ChevronRight } from "lucide-react"

export async function AllStartups() {
  // ── DATA FETCH — completely unchanged ────────────────────────────────────
  const supabase = await createClient()
  const { data: startups } = await supabase
    .from("startups")
    .select("*")
    .order("created_at", { ascending: false })

  // ── EMPTY STATE — same condition, better visual ───────────────────────────
  if (!startups || startups.length === 0) {
    return (
      <section
        id="startups"
        className="bg-[#F7F5F0] py-24"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="border-b-2 border-[#1C1C1C] pb-5 mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-[#1C1C1C] block" />
              <span
                className="text-[10px] tracking-[0.28em] text-[#888] uppercase"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                UpForge Founder Registry
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] tracking-tight">
              All Startups
            </h2>
          </div>

          {/* Empty state */}
          <div className="border-2 border-dashed border-[#D5D0C8] bg-white py-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <div className="relative">
              <div className="w-14 h-14 bg-[#1C1C1C] mx-auto flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6 text-[#E8C547]" />
              </div>
              <p
                className="text-lg font-bold text-[#1C1C1C] mb-2"
              >
                No startups listed yet
              </p>
              <p
                className="text-sm text-[#888] mb-6"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Be the first founder in India's independent startup registry.
              </p>
              <a
                href="/submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C1C1C] text-white text-sm font-bold tracking-wide hover:bg-[#333] transition-colors"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                List Your Startup — Free <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </section>
    )
  }

  // ── FULL LIST — same map, upgraded section UI ─────────────────────────────
  return (
    <section
      id="startups"
      className="bg-[#F7F5F0] py-12 sm:py-16"
      aria-label="All verified Indian startups on UpForge"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* ── SECTION MASTHEAD ─────────────────────────────────────────────── */}
        <div className="border-b-2 border-[#1C1C1C] pb-5 mb-0">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-px bg-[#1C1C1C] block" />
                <span
                  className="text-[10px] tracking-[0.28em] text-[#888] uppercase"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  UpForge Founder Registry
                </span>
              </div>
              <h2 className="text-3xl sm:text-[2.4rem] font-bold text-[#1C1C1C] tracking-tight leading-tight">
                All Startups
              </h2>
              <p
                className="text-sm text-[#777] mt-1.5"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Discover India's most ambitious companies — independently verified
              </p>
            </div>

            {/* Live count badge */}
            <div
              className="flex items-center gap-3 flex-shrink-0"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              <div className="flex items-center gap-2 border border-[#DDD] bg-white px-3 py-2">
                <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[10px] font-bold text-[#555] uppercase tracking-wider">
                  {startups.length.toLocaleString()} Listed
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#888]">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>All Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── TRUST STRIP ──────────────────────────────────────────────────── */}
        <div
          className="border-b border-[#E8E4DC] bg-white px-4 py-2.5 mb-8 flex flex-wrap items-center gap-x-6 gap-y-1.5"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          {[
            { icon: BadgeCheck, text: "Every startup manually reviewed" },
            { icon: Globe,      text: "All profiles Google-indexed" },
            { icon: TrendingUp, text: "Sorted by most recent" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <item.icon className="w-3 h-3 text-[#999]" />
              <span className="text-[10px] text-[#777]">{item.text}</span>
            </div>
          ))}
        </div>

        {/* ── STARTUP GRID — same map, zero changes ────────────────────────── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(startups as Startup[]).map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>

        {/* ── FOOTER CTA ───────────────────────────────────────────────────── */}
        <div
          className="mt-12 border-t border-[#D5D0C8] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          <div>
            <p className="text-sm font-semibold text-[#1C1C1C]" style={{ fontFamily: "'Georgia', serif" }}>
              Not seeing your startup?
            </p>
            <p className="text-[11px] text-[#888] mt-0.5">
              Get listed in India's independent founder registry — free, forever.
            </p>
          </div>
          <a
            href="/submit"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#1C1C1C] text-white text-[12px] font-bold tracking-wide hover:bg-[#333] transition-colors"
          >
            List Your Startup — Free
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  )
}
