import { createClient } from "@/lib/supabase/server"
import { StartupCard } from "@/components/startup-card"
import { SponsoredCard } from "@/components/sponsored-card"
import { WhyUpforge } from "@/components/why-upforge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

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
    <div className="bg-[#F8F8F6] text-zinc-900 antialiased">

      {/* ================= HERO ================= */}
      <section className="pt-44 pb-36 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <div className="text-xs tracking-[0.35em] uppercase text-zinc-500 mb-8">
            Upforge · Founder Registry
          </div>

          <h1 className="text-6xl md:text-7xl font-light leading-[1.05] tracking-tight">
            India’s Independent
            <span className="block font-semibold">
              Founder Network.
            </span>
          </h1>

          <p className="mt-10 text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            A curated public ledger of serious builders.  
            Verified startups. Real founders. Long-term reputation.
          </p>

          <div className="mt-14 flex justify-center gap-5 flex-wrap">
            <Link href="/apply">
              <Button className="h-12 px-10 rounded-full bg-black hover:bg-zinc-800 text-white text-xs uppercase tracking-[0.25em]">
                Request Listing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/startup">
              <Button
                variant="outline"
                className="h-12 px-10 rounded-full border-zinc-300 text-zinc-700 hover:bg-zinc-100 text-xs uppercase tracking-[0.25em]"
              >
                Browse Registry
              </Button>
            </Link>
          </div>

          {/* Quiet credibility strip */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div>
              <p className="text-3xl font-semibold">500+</p>
              <p className="text-xs tracking-widest uppercase text-zinc-500 mt-2">
                Vetted Startups
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">850+</p>
              <p className="text-xs tracking-widest uppercase text-zinc-500 mt-2">
                Verified Founders
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">$2.4B</p>
              <p className="text-xs tracking-widest uppercase text-zinc-500 mt-2">
                Capital Represented
              </p>
            </div>
            <div>
              <p className="text-3xl font-semibold">Daily</p>
              <p className="text-xs tracking-widest uppercase text-zinc-500 mt-2">
                Live Updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MANIFESTO SECTION ================= */}
      <section className="border-y border-zinc-200 bg-white py-28 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          <h2 className="text-4xl font-light">
            Reputation is the new capital.
          </h2>

          <p className="text-zinc-600 leading-relaxed text-lg">
            In a noisy ecosystem, visibility is easy.  
            Credibility is rare.  
            Upforge exists to document founders who are building with intent,
            clarity, and long-term conviction.
          </p>

          <p className="text-zinc-500 text-sm tracking-widest uppercase">
            Built for the serious, not the loud.
          </p>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="py-36 px-6 max-w-7xl mx-auto">

        <div className="mb-24 text-center">
          <h2 className="text-4xl font-light">
            Featured
            <span className="block font-semibold">
              High-Conviction Companies
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {sponsored?.map((startup) => (
            <div
              key={startup.id}
              className="bg-white border border-zinc-200 rounded-2xl p-8 hover:shadow-2xl transition duration-500"
            >
              <SponsoredCard startup={startup} />
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY UPFORGE ================= */}
      <div className="bg-[#F3F3F1] border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <WhyUpforge />
        </div>
      </div>

      {/* ================= TRENDING ================= */}
      <section className="py-36 px-6 max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h2 className="text-4xl font-light">
              Active
              <span className="block font-semibold">
                Founder Networks
              </span>
            </h2>
            <p className="mt-6 text-zinc-600 max-w-md">
              The most engaged and frequently viewed startups
              within the Upforge registry.
            </p>
          </div>

          <Link
            href="/startup"
            className="text-xs uppercase tracking-[0.3em] text-zinc-500 hover:text-black flex items-center gap-2"
          >
            Full Directory
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {trending?.map((startup) => (
            <div
              key={startup.id}
              className="bg-white border border-zinc-200 rounded-xl p-6 hover:shadow-xl transition duration-500"
            >
              <StartupCard startup={startup} />
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINAL STRIP ================= */}
      <div className="border-t border-zinc-200 py-12 text-center text-xs tracking-[0.35em] uppercase text-zinc-500">
        Upforge · Invite-only · Verified Founder Registry · 2026
      </div>

    </div>
  )
}
