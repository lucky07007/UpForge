import { createClient } from "@/lib/supabase/server"
import { SearchBar } from "@/components/search-bar"
import Link from "next/link"
import { Crown } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Startup Directory | UpForge",
  description:
    "Explore verified Indian startups listed on UpForge. A premium founder-first startup registry built for visibility and long-term credibility.",
  keywords: [
    "Indian startup directory",
    "founder registry India",
    "startup listing platform",
    "verified startups India",
    "sponsor startup listing",
  ],
  openGraph: {
    title: "Startup Directory | UpForge",
    description:
      "Browse India’s verified startup registry. Discover founders. Gain visibility. Build credibility.",
    url: "https://upforge.in/startup",
    type: "website",
  },
}

export default async function StartupsPage() {
  const supabase = await createClient()

  const { data: startups } = await supabase
    .from("startups")
    .select("id, name, slug, logo_url, is_sponsored")
    .order("name", { ascending: true })

  const total = startups?.length || 0

  return (
    <div className="relative min-h-screen bg-[#FAFAF9] text-zinc-900 overflow-hidden">

      {/* PREMIUM GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.25] pointer-events-none" />

      <div className="relative py-40 px-6">
        <div className="max-w-7xl mx-auto">

          {/* ================= HEADER ================= */}
          <div className="mb-24 text-center max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500 mb-8">
              UpForge · Public Startup Ledger
            </p>

            <h1 className="text-6xl md:text-7xl font-light leading-[1.05] tracking-tight">
              The Founder
              <span className="block font-semibold">
                Registry.
              </span>
            </h1>

            <p className="mt-10 text-lg text-zinc-600 leading-relaxed">
              A structured, searchable record of verified Indian startups.
              Click any logo to view its full public profile.
            </p>

            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-zinc-400">
              {total} Startups Listed
            </p>
          </div>

          {/* ================= SEARCH ================= */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm mb-24">
            <SearchBar initialData={startups || []} />
          </div>

          {/* ================= LOGO GRID ================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
            {startups?.map((startup) => (
              <Link key={startup.id} href={`/startup/${startup.slug}`}>
                <div className="relative bg-white border border-zinc-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 flex items-center justify-center group">

                  {startup.is_sponsored && (
                    <div className="absolute top-3 right-3 text-amber-500">
                      <Crown className="h-4 w-4" />
                    </div>
                  )}

                  <img
                    src={startup.logo_url}
                    alt={`${startup.name} logo`}
                    className="max-h-12 object-contain grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* ================= SPONSOR CTA ================= */}
          <div className="mt-32 text-center bg-black text-white py-20 rounded-3xl">
            <h3 className="text-3xl font-semibold mb-6">
              Want Priority Visibility?
            </h3>

            <p className="text-zinc-400 max-w-xl mx-auto mb-10">
              Featured startups appear in the Sponsored Spotlight on our homepage
              and receive social media promotion.
            </p>

            <Link
              href="/sponsor"
              className="inline-block bg-white text-black px-10 py-3 rounded-full text-xs uppercase tracking-[0.3em] hover:bg-zinc-200 transition"
            >
              Sponsor With UpForge
            </Link>
          </div>

        </div>
      </div>

      {/* FOOTER STRIP */}
      <div className="border-t border-zinc-200 py-16 text-center text-xs uppercase tracking-[0.35em] text-zinc-500">
        UpForge · Independent · Structured · Founder First · 2026
      </div>
    </div>
  )
}
