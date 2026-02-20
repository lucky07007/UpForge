import { createClient } from "@/lib/supabase/server"
import { StartupCard } from "@/components/startup-card"
import { SponsoredCard } from "@/components/sponsored-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Zap } from "lucide-react"

export default async function Home() {
  const supabase = await createClient()

  const { data: topTen } = await supabase
    .from("startups")
    .select("*")
    .order("is_sponsored", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO */}
      <section className="pt-32 pb-20 px-6 text-center bg-gradient-to-b from-indigo-50/50 to-transparent">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
            <Zap className="h-3 w-3" /> The Billion-Dollar Registry
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
            Forge Your <span className="text-primary italic">Legacy.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            India's most exclusive ledger of verified founders.
          </p>

          <div className="flex justify-center gap-4">
            <Button size="lg" className="rounded-full px-8">
              Apply for Listing
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8">
              View Directory
            </Button>
          </div>
        </div>
      </section>

      {/* TOP GRID */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-xs uppercase tracking-[0.4em] text-muted-foreground font-bold">
              The Elite Ten
            </h2>
            <p className="text-2xl font-bold mt-1">
              Verified Market Leaders
            </p>
          </div>

          <Link
            href="/startup"
            className="text-xs font-bold uppercase tracking-widest text-primary hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {topTen?.map((startup) =>
            startup.is_sponsored ? (
              <SponsoredCard key={startup.id} startup={startup} />
            ) : (
              <StartupCard key={startup.id} startup={startup} />
            )
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-6">
        <div className="max-w-7xl mx-auto bg-primary rounded-[2rem] p-12 text-center text-white relative">
          <h2 className="text-4xl font-black mb-4">
            Want to lead the registry?
          </h2>
          <p className="mb-8 max-w-xl mx-auto">
            Get featured as Sponsored Startup of the Week.
          </p>
          <Button size="lg" variant="secondary" className="rounded-full px-10">
            Become a Sponsor
          </Button>
        </div>
      </section>
    </div>
  )
}
