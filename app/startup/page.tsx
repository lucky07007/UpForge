import { createClient } from "@/lib/supabase/server"
import { SearchBar } from "@/components/search-bar"
import Link from "next/link"
import { Crown } from "lucide-react"
import type { StartupDirectoryItem } from "@/types/startup"
import type { Metadata } from "next"

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
  alternates: {
    canonical: "https://upforge.in/startup",
  },
}

export default async function StartupsPage() {
  const supabase = await createClient()

  const { data: startupsData, error } = await supabase
    .from("startups")
    .select("*")
    .order("is_sponsored", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Startup fetch error:", error)
  }

  const startups: StartupDirectoryItem[] = startupsData ?? []
  const total = startups.length

  return (
    <div className="min-h-screen bg-[#F8F8F6] text-zinc-900">

      <div className="py-40 px-6">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-24 text-center max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.4em] text-zinc-500 mb-8">
              UpForge Registry
            </p>

            <h1 className="text-6xl md:text-7xl font-light leading-[1.05] tracking-tight">
              The Founder
              <span className="block font-semibold">
                Registry.
              </span>
            </h1>

            <p className="mt-10 text-lg text-zinc-600 leading-relaxed">
              A structured public record of verified founder-led companies.
              Each profile is documented for long-term visibility and credibility.
            </p>

            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-zinc-400">
              {total} {total === 1 ? "Startup" : "Startups"} Listed
            </p>
          </div>

          {/* SEARCH */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm mb-24">
            <SearchBar initialData={startups} />
          </div>

          {/* LOGO GRID */}
          {startups.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
              {startups.map((startup) => (
                <Link
                  key={startup.id}
                  href={`/startup/${startup.slug}`}
                  className="group"
                >
                  <div className="relative bg-white border border-zinc-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center aspect-square">

                    {startup.is_sponsored && (
                      <div className="absolute top-3 right-3 text-amber-500">
                        <Crown className="h-4 w-4" />
                      </div>
                    )}

                    {startup.logo_url ? (
                      <img
                        src={startup.logo_url}
                        alt={`${startup.name} logo`}
                        className="max-h-12 w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      <span className="text-sm font-medium text-zinc-400">
                        {startup.name}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border-2 border-dashed border-zinc-200 rounded-3xl">
              <p className="text-zinc-400 uppercase tracking-widest text-xs">
                No startups found in the registry
              </p>
            </div>
          )}

          {/* STATS STRIP (original clean design style) */}
          <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-3xl font-semibold">{total}</p>
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mt-2">
                Listed Startups
              </p>
            </div>

            <div>
              <p className="text-3xl font-semibold">850+</p>
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mt-2">
                Verified Founders
              </p>
            </div>

            <div>
              <p className="text-3xl font-semibold">$2.4B</p>
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mt-2">
                Capital Represented
              </p>
            </div>

            <div>
              <p className="text-3xl font-semibold">Updated</p>
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mt-2">
                February 2026
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-zinc-200 py-16 text-center text-xs uppercase tracking-[0.35em] text-zinc-500">
        UpForge · Independent Founder Registry · {new Date().getFullYear()}
      </div>
    </div>
  )
}
