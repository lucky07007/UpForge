import { createClient } from "@/lib/supabase/server"
import type { Startup } from "@/types/startup"
import { StartupCard } from "@/components/startup-card"

export async function AllStartups() {
  const supabase = await createClient()

  const { data: startups } = await supabase
    .from("startups")
    .select("*")
    .order("created_at", { ascending: false })

  if (!startups || startups.length === 0) {
    return (
      <section id="startups" className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            All Startups
          </h2>
          <p className="mt-8 text-center text-muted-foreground">
            No startups listed yet. Check back soon.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="startups" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          All Startups
        </h2>
        <p className="mt-2 text-muted-foreground">
          {"Discover India's most ambitious companies"}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(startups as Startup[]).map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      </div>
    </section>
  )
}
