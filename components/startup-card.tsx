"use client"

import Link from "next/link"
import { Award, ArrowUpRight, Sparkles } from "lucide-react"
import type { Startup } from "@/types/startup"
import { motion } from "framer-motion"

interface StartupCardProps {
  startup: Startup
  featured?: boolean
}

export function StartupCard({ startup, featured = false }: StartupCardProps) {
  const getDisplayFounder = () => {
    if (!startup.founders) return { name: "View details", hasMore: false }
    if (typeof startup.founders === 'string') {
      const parts = startup.founders.split(",")
      return { name: parts[0], hasMore: parts.length > 1 }
    }
    if (Array.isArray(startup.founders)) {
      return { name: startup.founders[0], hasMore: startup.founders.length > 1 }
    }
    return { name: "View details", hasMore: false }
  }

  const founderInfo = getDisplayFounder()

  return (
    <Link href={`/startup/${startup.slug || ""}`} className="group block">
      <article
        className={`relative flex h-full flex-col rounded-2xl border transition-all duration-300 ${
          featured
            ? "border-primary/30 bg-gradient-to-br from-primary/5 via-card to-background p-7 shadow-lg shadow-primary/5 hover:border-primary/60 hover:shadow-primary/10"
            : "border-border bg-card p-6 hover:border-primary/20 hover:shadow-md"
        }`}
      >
        {/* Premium Badge for Featured Startups */}
        {featured && (
          <div className="absolute -top-3 left-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 shadow-lg shadow-primary/20">
              <Sparkles className="h-3 w-3 text-primary-foreground" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary-foreground">
                Elite Member
              </span>
            </div>
          </div>
        )}

        {/* Logo Section with special ring for featured */}
        <div className="mb-5 flex items-start justify-between">
          <div className={`flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border ${
            featured ? "border-primary/20 bg-white shadow-inner" : "border-border bg-secondary"
          }`}>
            {startup.logo_url ? (
              <img 
                src={startup.logo_url} 
                alt={`${startup.name} logo`} 
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <span className={`text-xl font-black ${featured ? "text-primary" : "text-secondary-foreground"}`}>
                {startup.name?.charAt(0) || "?"}
              </span>
            )}
          </div>
          
          {featured && (
             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary opacity-0 transition-all group-hover:opacity-100">
                <ArrowUpRight className="h-5 w-5" />
             </div>
          )}
        </div>

        <h3 className={`text-xl font-bold tracking-tight ${featured ? "text-foreground group-hover:text-primary" : "text-card-foreground"}`}>
          {startup.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            featured ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"
          }`}>
            {startup.category}
          </span>
          {startup.founded_year && (
            <span className="text-xs font-medium text-muted-foreground/60">
              • Est. {startup.founded_year}
            </span>
          )}
        </div>

        <p className={`mt-4 line-clamp-3 flex-1 text-sm leading-relaxed ${
          featured ? "text-muted-foreground/90 font-medium" : "text-muted-foreground"
        }`}>
          {startup.description}
        </p>

        <div className={`mt-6 flex items-center justify-between border-t pt-4 ${
          featured ? "border-primary/10" : "border-border"
        }`}>
          <div className="flex items-center gap-2">
            <div className={`h-1.5 w-1.5 rounded-full ${featured ? "bg-primary animate-pulse" : "bg-muted-foreground/30"}`} />
            <p className="text-xs font-semibold text-muted-foreground">
              {founderInfo.name}
              {founderInfo.hasMore && " + Team"}
            </p>
          </div>
          {!featured && <ArrowUpRight className="h-4 w-4 text-muted-foreground" />}
        </div>

        {/* Bottom glowing line for Featured only */}
        {featured && (
          <div className="absolute bottom-0 left-0 h-1 w-full scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-500 group-hover:scale-x-100" />
        )}
      </article>
    </Link>
  )
}
