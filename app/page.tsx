import { createClient } from "@/lib/supabase/server"
import { StartupCard } from "@/components/startup-card"
import { SponsoredCard } from "@/components/sponsored-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Star, Zap } from "lucide-react"

export default async function Home() {
  const supabase = await createClient()

  // Logic: Fetch Top 10 (including sponsored)
  const { data: topTen } = await supabase
    .from("startups")
    .select("*")
    .order("is_sponsored", { ascending: false }) // Sponsored first
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <div className="space-y-24 pb-20">
      {/* Optimized Hero */}
      <section className="pt-32 pb-20 px-6 text-center bg-gradient-to-b from-indigo-50/50 to-transparent">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
            <Zap className="h-3 w-3" /> The Billion-Dollar Registry
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
            Forge Your <span className="text-primary italic">Legacy.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            India's most exclusive ledger of verified founders. We don't just list startups; we certify excellence.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 shadow-xl shadow-primary/20">Apply for Listing</Button>
            <Button variant="outline" size="lg" className="rounded-full px-8">View Full Directory</Button>
          </div>
        </div>
      </section>

      {/* THE TOP 10 POWER GRID (Mobile Optimized) */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-xs uppercase tracking-[0.4em] text-muted-foreground font-bold">The Elite Ten</h2>
            <p className="text-2xl font-bold mt-1">Verified Market Leaders</p>
          </div>
          <Link href="/startup" className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">
            View All 500+ Startups →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {topTen?.map((startup) => (
            <StartupCard 
              key={startup.id} 
              startup={startup} 
              variant="logo-only" // New simplified card style
              isSponsored={startup.is_sponsored}
            />
          ))}
        </div>
      </section>

      {/* High-Conversion Footer CTA in Page */}
      <section className="mx-6">
        <div className="max-w-7xl mx-auto bg-primary rounded-[2rem] p-12 text-center text-white overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-4">Want to lead the registry?</h2>
            <p className="text-indigo-100 mb-8 max-w-xl mx-auto">Get featured as "Sponsored of the Week" and reach 50k+ investors and founders monthly.</p>
            <Button size="lg" variant="secondary" className="rounded-full font-bold px-10">
              Become a Sponsor
            </Button>
          </div>
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-64 w-64 bg-white/10 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  )
}
