// app/page.tsx
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UpForge | India’s Independent Founder Registry",
  description:
    "A public registry of verified founders and startups in India. Signal over hype. Credibility as infrastructure.",
}

export default async function Home() {
  const supabase = await createClient()

  const { count: totalStartups } = await supabase
    .from("startups")
    .select("*", { count: "exact", head: true })

  const { count: totalSponsored } = await supabase
    .from("startups")
    .select("*", { count: "exact", head: true })
    .eq("is_sponsored", true)

  const { data: verifiedStartups } = await supabase
    .from("startups")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8)

  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <section className="pt-32 pb-24 text-center">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 max-w-4xl mx-auto">
            India’s Independent Founder Registry.
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto">
            A public registry of verified founders and startups. Built for long‑term reputation,
            signal, and credibility. No hype. No noise.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/apply">
              <Button className="px-8 h-12 bg-gray-900 text-white hover:bg-gray-800 text-sm font-medium">
                Apply for Verification
              </Button>
            </Link>
            <Link href="/startup">
              <Button
                variant="outline"
                className="px-8 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium"
              >
                Explore Registry
              </Button>
            </Link>
          </div>
        </section>

        {/* Trust markers */}
        <section className="py-20 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                Public Registry
              </div>
              <p className="text-sm text-gray-600">Open, transparent, and accessible to all.</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                Verified Identities
              </div>
              <p className="text-sm text-gray-600">Founder and company information is validated.</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                Structured Profiles
              </div>
              <p className="text-sm text-gray-600">Consistent, comparable, and rich data.</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                Long‑Term Signal
              </div>
              <p className="text-sm text-gray-600">Designed for durability, not fleeting trends.</p>
            </div>
          </div>
        </section>

        {/* Registry statistics */}
        <section className="py-20 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-light text-gray-900">
                {totalStartups?.toLocaleString()}+
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mt-2">
                Verified Startups
              </div>
            </div>
            <div>
              <div className="text-3xl font-light text-gray-900">10,000+</div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mt-2">
                Monthly Observers
              </div>
            </div>
            <div>
              <div className="text-3xl font-light text-gray-900">
                {totalSponsored?.toLocaleString()}+
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mt-2">
                Sponsored Profiles
              </div>
            </div>
            <div>
              <div className="text-3xl font-light text-gray-900">2025</div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mt-2">
                Founded
              </div>
            </div>
          </div>
        </section>

        {/* Recently verified startups */}
        {verifiedStartups && verifiedStartups.length > 0 && (
          <section className="py-20 border-t border-gray-100">
            <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-8">
              Recently Verified
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {verifiedStartups.map((startup) => (
                <Link
                  key={startup.id}
                  href={`/startup/${startup.slug}`}
                  className="group block p-5 border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={startup.logo_url || "/placeholder-logo.svg"}
                      className="h-10 w-10 object-contain"
                      alt={startup.name}
                    />
                    <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                      {startup.name}
                    </h3>
                  </div>
                  {startup.short_description && (
                    <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                      {startup.short_description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer note */}
        <div className="py-12 text-center text-xs text-gray-400 border-t border-gray-100">
          UpForge · India’s Independent Founder Registry · Est. 2025
        </div>
      </div>
    </div>
  )
}
