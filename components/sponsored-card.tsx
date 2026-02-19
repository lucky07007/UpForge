// officialnewbharat-art/upforge-next/upforge-next-7b82ebbdc8bb9b76587d7c750b36e9b3eafb2119/components/sponsored-card.tsx
"use client"

import Link from "next/link"
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react"
import type { Startup } from "@/types/startup"
import { motion } from "framer-motion"

interface SponsoredCardProps {
  startup: Startup
}

export function SponsoredCard({ startup }: SponsoredCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, rotateX: 2, rotateY: 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="perspective-1000 h-full"
    >
      <Link href={`/startup/${startup.slug || ""}`} className="group relative block h-full">
        {/* Animated Gradient Glow Border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-[2rem] blur opacity-20 group-hover:opacity-50 transition duration-500 bg-[length:200%_auto] animate-gradient-x" />
        
        <article className="relative flex h-full flex-col rounded-[2rem] border border-white/40 bg-white/80 backdrop-blur-md p-8 shadow-2xl shadow-indigo-100/30">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-8">
            <div className="relative">
              <div className="h-20 w-20 flex items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm p-4 transition-transform group-hover:scale-105 duration-500">
                {startup.logo_url ? (
                  <img 
                    src={startup.logo_url} 
                    alt={`${startup.name} logo`} 
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-3xl font-black text-slate-900">
                    {startup.name?.charAt(0) || "?"}
                  </span>
                )}
              </div>
              {/* Sponsored Indicator Badge */}
              <div className="absolute -top-2 -right-2 bg-amber-400 rounded-full p-1.5 shadow-lg border-2 border-white">
                <Sparkles className="h-3 w-3 text-white fill-current" />
              </div>
            </div>
            
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-45">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">
                  Featured Partner
                </span>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                {startup.name}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-lg bg-indigo-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-indigo-600 border border-indigo-100">
                {startup.category}
              </span>
              {startup.founded_year && (
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  • EST. {startup.founded_year}
                </span>
              )}
            </div>

            <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 font-medium">
              {startup.description}
            </p>
          </div>

          {/* Action Footer */}
          <div className="mt-8 pt-6 border-t border-slate-50">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
              <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                View Profile
              </span>
              <div className="flex items-center gap-2 text-indigo-600">
                <span className="hidden sm:inline">Visit Site</span>
                <ExternalLink className="h-3 w-3" />
              </div>
            </div>
            
            {/* Animated Underline */}
            <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 w-0 group-hover:w-full transition-all duration-700 ease-out" />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
