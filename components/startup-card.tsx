"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/badge"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, Users } from "lucide-react"
import type { Startup } from "@/types/startup"
import Link from "next/link" // Import Link

interface StartupCardProps {
  startup: Startup
}

export function StartupCard({ startup }: StartupCardProps) {
  return (
    // Wrap entire card in Link using the dynamic slug
    <Link href={`/startup/${startup.slug}`} className="block transition-transform hover:scale-[1.02]">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Display Logo URL if available */}
              {startup.logo_url ? (
                <img 
                  src={startup.logo_url} 
                  alt={`${startup.name} logo`} 
                  className="h-12 w-12 rounded-lg object-contain bg-muted p-1"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                  {startup.name[0]}
                </div>
              )}
              <div>
                <h3 className="font-bold text-foreground leading-tight">{startup.name}</h3>
                <p className="text-xs text-muted-foreground">{startup.category}</p>
              </div>
            </div>
            {startup.is_featured && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                <Award className="mr-1 h-3 w-3" />
                Top
              </Badge>
            )}
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
            {startup.description}
          </p>
        </div>

        <div className="mt-auto border-t border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <span>{Array.isArray(startup.founders) ? startup.founders[0] : startup.founders?.split(',')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{startup.founded_year || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
