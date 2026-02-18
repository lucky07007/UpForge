import { createClient } from "@/lib/supabase/server"
import type { Startup } from "@/types/startup"
import { StartupCard } from "@/components/startup-card"
import { Award } from "lucide-react"

export async function FeaturedStartups() {
  const supabase = await createClient()

  const { data: startups } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })

  if (!startups || startups.length === 0) return null

  return (
    <section className="bg-secondary/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            <Award className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Top Startups
          </h2>
        </div>
        <p className="mt-2 text-muted-foreground">
          {"Recognized leaders in India's startup ecosystem"}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(startups as Startup[]).map((startup) => (
            <StartupCard key={startup.id} startup={startup} featured />
          ))}
        </div>
      </div>
    </section>
  )
}
