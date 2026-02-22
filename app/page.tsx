import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Crown, Sparkles, Users, TrendingUp, Award, Star } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UpForge | India’s Independent Founder Network",
  description:
    "Discover India’s rising startups. Sponsor your startup. Get visibility in the premium founder registry.",
}

export default async function Home() {
  const supabase = await createClient()

  // Sponsor of the Week (Top 1 newest sponsored)
  const { data: sponsorOfWeek } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(1)

  // Top 3 Sponsored
  const { data: sponsored } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(3)

  // Top 3 Featured (Ranking)
  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(3)

  return (
    <div className="relative bg-[#fbf9f6] text-[#1e1b1b]">

      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-24 px-6 text-center">
        <div className="max-w-5xl mx-auto">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e3a5f]/5 border border-[#1e3a5f]/10 mb-8">
            <Award className="h-4 w-4 text-[#1e3a5f]" />
            <span className="text-xs font-medium text-[#1e3a5f] tracking-wide">
              INDIA'S VERIFIED FOUNDER REGISTRY
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[#1e1b1b]">
            Discover India’s
            <span className="block font-semibold text-[#1e3a5f]">
              Rising Startups.
            </span>
          </h1>

          <p className="mt-6 text-lg text-[#4a4a4a] max-w-2xl mx-auto">
            A premier directory where serious founders gain visibility,
            build authority, and connect with India’s most ambitious builders.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link href="/apply">
              <Button className="rounded-full px-8 h-12 bg-[#1e3a5f] text-white hover:bg-[#14304a] transition-all text-sm font-medium shadow-lg">
                List Your Startup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/startup">
              <Button
                variant="outline"
                className="rounded-full px-8 h-12 border-[#1e3a5f]/30 text-[#1e3a5f] hover:bg-[#1e3a5f]/5 transition-all text-sm font-medium"
              >
                Browse Directory
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-[#4a4a4a]">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#1e3a5f]" />
              <span>3.4K + Startups</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#1e3a5f]" />
              <span>70K + Visits</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-[#1e3a5f]" />
              <span>500+ Sponsored</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SPONSOR OF THE WEEK ================= */}
      {sponsorOfWeek && sponsorOfWeek.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <Link href={`/startup/${sponsorOfWeek[0].slug}`} className="block group">
            <div className="relative bg-white border border-[#c6a43f]/30 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-8 hover:shadow-2xl transition-all">

              <Crown className="absolute top-6 right-6 h-6 w-6 text-[#c6a43f]" />

              <img
                src={sponsorOfWeek[0].logo_url || "/placeholder-logo.svg"}
                className="h-28 w-28 object-contain rounded-xl bg-white"
                alt={sponsorOfWeek[0].name}
              />

              <div>
                <h3 className="text-3xl font-light text-[#1e1b1b]">
                  {sponsorOfWeek[0].name}
                </h3>
                <p className="text-[#4a4a4a] mt-3 max-w-xl">
                  {sponsorOfWeek[0].short_description ||
                    "Premium sponsored startup gaining ecosystem visibility."}
                </p>
                <div className="mt-4 text-sm text-[#c6a43f] font-medium">
                  Sponsor of the Week
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ================= TOP 3 SPONSORED ================= */}
      {sponsored && sponsored.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <h2 className="text-sm uppercase tracking-[0.3em] font-semibold text-[#4a4a4a] mb-8">
            Top Sponsored Startups
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sponsored.map((startup, index) => (
              <Link key={startup.id} href={`/startup/${startup.slug}`}>
                <div className="bg-white rounded-3xl border border-[#c6a43f]/20 p-6 hover:shadow-2xl transition-all relative">

                  <div className="absolute top-4 right-4 text-xs font-bold text-[#c6a43f]">
                    #{index + 1}
                  </div>

                  <img
                    src={startup.logo_url || "/placeholder-logo.svg"}
                    className="h-14 w-14 object-contain mb-4"
                    alt={startup.name}
                  />

                  <h3 className="font-semibold text-lg text-[#1e1b1b]">
                    {startup.name}
                  </h3>

                  <p className="text-sm text-[#4a4a4a] mt-2 line-clamp-2">
                    {startup.short_description}
                  </p>

                  <div className="mt-4 text-xs text-[#c6a43f] font-medium">
                    Premium Sponsored
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ================= TOP 3 FEATURED (RANKED) ================= */}
      {featured && featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-28">
          <h2 className="text-sm uppercase tracking-[0.3em] font-semibold text-[#4a4a4a] mb-8">
            Top Featured Startups
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((startup, index) => {
              const rankStyles = [
                { color: "text-[#c6a43f]", bg: "bg-[#c6a43f]/10", label: "Gold Featured" },
                { color: "text-gray-500", bg: "bg-gray-200", label: "Silver Featured" },
                { color: "text-amber-700", bg: "bg-amber-100", label: "Bronze Featured" },
              ]

              const rank = rankStyles[index]

              return (
                <Link key={startup.id} href={`/startup/${startup.slug}`}>
                  <div className="bg-white rounded-3xl border border-[#1e3a5f]/10 p-6 hover:shadow-2xl transition-all relative">

                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${rank.bg} ${rank.color}`}>
                      <Crown className="h-3 w-3" />
                      #{index + 1}
                    </div>

                    <img
                      src={startup.logo_url || "/placeholder-logo.svg"}
                      className="h-14 w-14 object-contain mb-4"
                      alt={startup.name}
                    />

                    <h3 className="font-semibold text-lg text-[#1e1b1b]">
                      {startup.name}
                    </h3>

                    <p className="text-sm text-[#4a4a4a] mt-2 line-clamp-2">
                      {startup.short_description}
                    </p>

                    <div className={`mt-4 text-xs font-medium ${rank.color}`}>
                      {rank.label}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* ================= CTA ================= */}
      <section className="py-24 text-center bg-[#1e3a5f] text-white">
        <h3 className="text-3xl font-light mb-4">
          Get Featured on UpForge
        </h3>
        <p className="text-white/70 mb-8">
          Increase visibility. Build authority. Join serious founders.
        </p>

        <Link href="/sponsor">
          <Button className="rounded-full px-10 h-14 bg-[#c6a43f] text-white hover:bg-[#b08c2e] text-sm uppercase tracking-widest font-semibold shadow-xl">
            Sponsor Your Startup
          </Button>
        </Link>
      </section>

      <div className="py-8 text-center text-[10px] tracking-[0.4em] uppercase text-[#4a4a4a] border-t border-[#1e3a5f]/10">
        UpForge · Founder First · 2026
      </div>

    </div>
  )
}
