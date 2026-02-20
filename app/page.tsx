import { createClient } from "@/lib/supabase/server"
import { StartupCard } from "@/components/startup-card"
import { SponsoredCard } from "@/components/sponsored-card"
import { WhyUpforge } from "@/components/why-upforge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Shield, Users, TrendingUp, CheckCircle } from "lucide-react"

export default async function Home() {
  const supabase = await createClient()

  const { data: sponsored } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .limit(3)
    .order("created_at", { ascending: false })

  const { data: trending } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", false)
    .limit(6)
    .order("created_at", { ascending: false })

  return (
    <div className="bg-white text-zinc-900 font-sans antialiased">

      {/* ================= HERO ================= */}
      <section className="pt-40 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500 mb-6">
            India’s Independent Founder Network
          </span>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight">
            Where India’s most
            <span className="block font-semibold text-zinc-900">
              serious founders build reputation.
            </span>
          </h1>

          <p className="mt-8 text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            A curated registry of verified startups and ambitious builders.
            Built for credibility, discovery, and long-term network value.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/apply">
              <Button className="h-12 px-8 rounded-full bg-zinc-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em]">
                Apply for Listing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/startup">
              <Button variant="outline" className="h-12 px-8 rounded-full border-zinc-300 text-zinc-700 hover:bg-zinc-100 text-xs uppercase tracking-[0.2em]">
                Explore Directory
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-24">
            {[
              { label: "Vetted Startups", value: "500+", icon: Shield },
              { label: "Verified Founders", value: "850+", icon: Users },
              { label: "Capital Tracked", value: "$2.4B", icon: TrendingUp },
              { label: "Live Verified", value: "Daily", icon: CheckCircle },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <stat.icon className="h-5 w-5 text-zinc-500 mb-3" />
                <span className="text-2xl font-semibold">{stat.value}</span>
                <span className="text-xs uppercase tracking-widest text-zinc-500 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRUST BAR ================= */}
      <div className="border-y border-zinc-200 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-6 text-sm text-zinc-500">
          <span>Verified & updated daily</span>
          <div className="flex gap-10 font-semibold text-zinc-400">
            <span>SEQUOIA</span>
            <span>ACCEL</span>
            <span>BLUME</span>
            <span>Y COMBINATOR</span>
          </div>
        </div>
      </div>

      {/* ================= FEATURED ================= */}
      <section className="py-32 px-6 max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <h2 className="text-4xl font-light">
            Featured
            <span className="block font-semibold">
              High-Conviction Startups
            </span>
          </h2>
          <p className="mt-6 text-zinc-600 max-w-xl mx-auto">
            A selective spotlight on startups demonstrating exceptional clarity,
            traction, and long-term vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {sponsored?.map((startup) => (
            <div key={startup.id} className="border border-zinc-200 rounded-2xl p-6 hover:shadow-xl transition duration-300">
              <SponsoredCard startup={startup} />
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY UPFORGE ================= */}
      <div className="bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 py-28">
          <WhyUpforge />
        </div>
      </div>

      {/* ================= TRENDING ================= */}
      <section className="py-32 px-6 max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div>
            <h2 className="text-4xl font-light">
              Trending
              <span className="block font-semibold">
                Founder Networks
              </span>
            </h2>
            <p className="mt-6 text-zinc-600 max-w-md">
              The most viewed and fastest-growing startups across the registry.
            </p>
          </div>

          <Link
            href="/startup"
            className="text-xs uppercase tracking-[0.3em] text-zinc-500 hover:text-black flex items-center gap-2"
          >
            View Full Directory
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {trending?.map((startup) => (
            <div
              key={startup.id}
              className="border border-zinc-200 rounded-xl p-5 hover:shadow-lg transition duration-300"
            >
              <StartupCard startup={startup} />
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link href="/startup">
            <Button className="h-11 px-7 rounded-full bg-zinc-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em]">
              Explore Entire Registry
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <p className="mt-6 text-xs uppercase tracking-widest text-zinc-400">
            Data Verified · February 2026
          </p>
        </div>
      </section>

      {/* ================= FOOTER STRIP ================= */}
      <div className="border-t border-zinc-200 py-10 text-center text-xs uppercase tracking-[0.3em] text-zinc-500">
        Invite-only access · 850+ verified founders
      </div>

    </div>
  )
}
