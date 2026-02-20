import { createClient } from "@/lib/supabase/server"
import { WhyUpforge } from "@/components/why-upforge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Crown } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UpForge | India’s Independent Founder Network",
  description:
    "UpForge is India’s premium founder registry. Discover verified startups and sponsored spotlight companies.",
}

export default async function Home() {
  const supabase = await createClient()

  // SAME QUERY (unchanged)
  const { data: sponsored } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .limit(6)
    .order("created_at", { ascending: false })

  return (
    <div className="relative bg-[#FAFAF9] text-zinc-900 overflow-hidden">

      {/* Premium Soft Grid + Fade */}
      <div className="absolute inset-0 
        bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] 
        bg-[size:80px_80px] opacity-[0.15] pointer-events-none" 
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-60 pointer-events-none" />

      {/* ================= HERO ================= */}
      <section className="relative pt-44 pb-32 px-6 text-center">
        <div className="max-w-5xl mx-auto">

          <div className="text-xs tracking-[0.4em] uppercase text-zinc-500 mb-8">
            UPFORGE · VERIFIED FOUNDER REGISTRY
          </div>

          <h1 className="text-6xl md:text-7xl font-light leading-[1.05] tracking-tight">
            India’s Independent
            <span className="block font-semibold">
              Startup Directory.
            </span>
          </h1>

          <p className="mt-10 text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Discover serious founders. Sponsor visibility.
            Build long-term credibility.
          </p>

          <div className="mt-14 flex justify-center gap-5 flex-wrap">
            <Link href="/apply">
              <Button className="h-12 px-10 rounded-full bg-black hover:bg-zinc-800 text-white text-xs uppercase tracking-[0.25em]">
                List Your Startup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/startup">
              <Button
                variant="outline"
                className="h-12 px-10 rounded-full border-zinc-300 text-zinc-700 hover:bg-zinc-100 text-xs uppercase tracking-[0.25em]"
              >
                Browse Directory
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SPONSORED OF THE WEEK ================= */}
      {sponsored && sponsored.length > 0 && (
        <section className="relative py-24 px-6 max-w-6xl mx-auto">

          <div className="flex items-center gap-3 mb-12">
            <Crown className="h-5 w-5 text-amber-500" />
            <h2 className="text-xs tracking-[0.35em] uppercase font-semibold">
              Sponsored of the Week
            </h2>
          </div>

          {/* Small Clean Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {sponsored.map((startup) => (
              <Link key={startup.id} href={`/startup/${startup.slug}`}>
                <div className="group bg-white/70 backdrop-blur-sm border border-zinc-200 rounded-xl px-5 py-4 
                                hover:shadow-lg hover:-translate-y-1 transition-all duration-300 
                                flex items-center gap-3">

                  {/* Small colorful logo */}
                  {startup.logo_url && (
                    <img
                      src={startup.logo_url}
                      alt={`${startup.name} logo`}
                      className="h-8 w-8 object-contain"
                    />
                  )}

                  {/* Small name */}
                  <span className="text-sm font-medium text-zinc-800 group-hover:text-black transition-colors">
                    {startup.name}
                  </span>

                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ================= WHY ================= */}
      <div className="relative bg-white border-y border-zinc-200 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-28">
          <WhyUpforge />
        </div>
      </div>

      {/* ================= CTA ================= */}
      <section className="relative py-28 text-center bg-black text-white">
        <h3 className="text-3xl font-semibold mb-6">
          Get Premium Visibility
        </h3>
        <p className="text-zinc-400 max-w-xl mx-auto mb-10">
          Sponsor your startup and appear in our weekly spotlight.
        </p>

        <Link href="/sponsor">
          <Button className="h-12 px-10 rounded-full bg-white text-black hover:bg-zinc-200 text-xs uppercase tracking-[0.25em]">
            Sponsor With Us
          </Button>
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <div className="py-10 text-center text-[10px] tracking-[0.4em] uppercase text-zinc-400">
        UpForge · Independent · Curated · Founder First · 2026
      </div>

    </div>
  )
}
