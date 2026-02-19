"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Startup } from "@/types/startup"
import { motion } from "framer-motion"

interface StartupCardProps {
  startup: Startup
  featured?: boolean
}

export function StartupCard({ startup, featured = false }: StartupCardProps) {
  const getDisplayFounder = () => {
    if (!startup.founders) return { name: "View details" }
    const name = Array.isArray(startup.founders) ? startup.founders[0] : startup.founders.split(",")[0]
    return { name }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Link href={`/startup/${startup.slug || ""}`} className="group block h-full">
        <article className={`relative flex h-full flex-col rounded-2xl border bg-card p-6 transition-all ${featured ? "border-primary/20 shadow-lg" : "border-border hover:border-primary/20"}`}>
          <div className="mb-5 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-border bg-secondary">
            {startup.logo_url ? (
              <img src={startup.logo_url} alt="logo" className="h-full w-full object-contain p-2" />
            ) : (
              <span className="font-black text-primary">{startup.name?.charAt(0)}</span>
            )}
          </div>

          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {startup.name}
          </h3>

          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
            {startup.description}
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <span className="text-xs font-semibold text-muted-foreground">{getDisplayFounder().name}</span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
