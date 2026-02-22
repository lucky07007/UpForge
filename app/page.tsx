import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Crown, Sparkles, Users, TrendingUp, Award, Star, Globe, ShieldCheck } from "lucide-react"
import { Metadata } from "next"

// 1. DYNAMIC METADATA FOR SEO
export const metadata: Metadata = {
  title: "UpForge | The Premium Founder Registry of India",
  description: "The definitive directory for India's elite startups. Gain visibility, build authority, and join the legacy of India's most ambitious builders.",
  keywords: ["India startups", "founder network", "startup directory", "venture capital india", "entrepreneur registry"],
  openGraph: {
    title: "UpForge | India's Independent Founder Network",
    description: "Discover and sponsor the next generation of Indian innovation.",
    url: "https://upforge.in", // Replace with your actual domain
    siteName: "UpForge",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UpForge | India's Founder Registry",
    description: "Where serious builders are listed.",
  },
  alternates: {
    canonical: "https://upforge.in",
  },
}

export default async function Home() {
  const supabase = await createClient()

  // Data Fetching
  const { data: sponsorOfWeek } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(1)

  const { data: sponsored } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(10)

  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(10)

  // 2. JSON-LD FOR GOOGLE SEARCH CONSOLE AUTHORITY
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "UpForge",
    "url": "https://upforge.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://upforge.in/startup?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <div className="relative bg-[#fcfcfb] text-[#1a1a1a] selection:bg-[#1e3a5f]/10 selection:text-[#1e3a5f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* PREMIUM BACKGROUND: Architecture Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10">
        {/* ================= HERO: MINIMALIST ELITE ================= */}
        <section className="relative pt-36 pb-28 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#1e3a5f]/10 shadow-sm mb-10 animate-fade-in">
              <ShieldCheck className="h-3.5 w-3.5 text-[#1e3a5f]" />
              <span className="text-[10px] font-bold text-[#1e3a5f] tracking-[0.2em] uppercase">
                Verified Founder Registry 2026
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-[#1a1a1a] leading-[0.95]">
              Forge Your <br />
              <span className="text-[#1e3a5f] italic font-serif">Legacy.</span>
            </h1>

            <p className="mt-8 text-xl text-[#666] max-w-2xl mx-auto leading-relaxed font-light">
              UpForge is the curated ecosystem where India’s high-growth startups are cataloged, 
              celebrated, and connected to the global stage.
            </p>

            <div className="mt-12 flex justify-center gap-5 flex-wrap">
              <Link href="/apply">
                <Button className="rounded-full px-10 h-14 bg-[#1a1a1a] text-white hover:bg-[#000] transition-all text-sm font-semibold shadow-2xl hover:scale-105 active:scale-95">
                  Register Startup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/startup">
                <Button
                  variant="outline"
                  className="rounded-full px-10 h-14 border-[#1a1a1a]/10 bg-white/50 backdrop-blur-sm text-[#1a1a1a] hover:bg-white transition-all text-sm font-medium"
                >
                  Explore Registry
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= SPONSOR OF THE WEEK: THE CROWN JEWEL ================= */}
        {sponsorOfWeek && sponsorOfWeek.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 pb-32">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#c6a43f] to-[#e6d29e] rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white border border-[#c6a43f]/20 rounded-[2rem] p-1 shadow-2xl">
                <div className="bg-[#fcfcfb] rounded-[1.8rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
                  <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-white rounded-3xl shadow-inner border border-gray-50 p-6 flex items-center justify-center">
                    <img
                      src={sponsorOfWeek[0].logo_url || "/placeholder-logo.svg"}
                      alt={sponsorOfWeek[0].name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                      <Crown className="h-5 w-5 text-[#c6a43f]" />
                      <span className="text-xs font-bold tracking-[0.3em] text-[#c6a43f] uppercase">Sponsor of the Month</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] mb-4 tracking-tight">
                      {sponsorOfWeek[0].name}
                    </h2>
                    <p className="text-lg text-[#666] leading-relaxed max-w-xl">
                      {sponsorOfWeek[0].short_description || "Setting the benchmark for innovation in the Indian tech landscape."}
                    </p>
                    <Link href={`/startup/${sponsorOfWeek[0].slug}`} className="inline-flex items-center mt-8 text-[#1e3a5f] font-semibold hover:gap-3 transition-all">
                      Review Listing <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= REGISTRY GRIDS ================= */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-8">
            <div>
              <h3 className="text-2xl font-semibold text-[#1a1a1a]">The Premium Ledger</h3>
              <p className="text-sm text-[#888] mt-1">Recently verified and sponsored startups.</p>
            </div>
            <Link href="/startup" className="text-xs font-bold tracking-widest uppercase text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-1">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsored?.map((startup) => (
              <Link key={startup.id} href={`/startup/${startup.slug}`} className="group relative">
                <div className="h-full bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 p-2 border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <img src={startup.logo_url || "/placeholder-logo.svg"} alt="" className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a1a1a] leading-tight">{startup.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 fill-[#c6a43f] text-[#c6a43f]" />
                        <span className="text-[10px] font-bold text-[#c6a43f] uppercase tracking-tighter">Gold Tier</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#666] line-clamp-2 leading-relaxed mb-6">
                    {startup.short_description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Listing ID: #00{startup.id.slice(0,3)}</span>
                    <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-[#1e3a5f] transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================= TRUST BAR ================= */}
        <section className="bg-white border-y border-gray-100 py-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: Users, label: "Founders Registered", value: "3.2k+" },
              { icon: TrendingUp, label: "Platform Reach", value: "100k+" },
              { icon: Globe, label: "Global Partners", value: "45+" },
              { icon: Award, label: "Success Rate", value: "92%" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <stat.icon className="h-6 w-6 mx-auto text-[#1e3a5f] mb-4 opacity-50" />
                <div className="text-3xl font-semibold text-[#1a1a1a]">{stat.value}</div>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA: THE LEGACY INVITATION ================= */}
        <section className="relative py-40 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#1a1a1a] z-0">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:30px_30px]" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-8">
              Ready to be <br /><span className="italic font-serif opacity-80">Forged?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 font-light">
              Join the registry that defines the Indian startup ecosystem. Secure your spot in the legacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sponsor">
                <Button className="rounded-full px-12 h-16 bg-[#c6a43f] text-white hover:bg-[#b08c2e] text-xs font-bold uppercase tracking-widest transition-all shadow-2xl">
                  Get Sponsored Placement
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <footer className="py-12 text-center border-t border-gray-100 bg-white">
          <div className="text-[10px] tracking-[0.5em] uppercase text-gray-400">
            UpForge Premium Registry · Established 2026 · Delhi, India
          </div>
        </footer>
      </div>
    </div>
  )
}
