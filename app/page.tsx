import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowRight, Crown, Sparkles, 
  ArrowUpRight, Quote, ExternalLink
} from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UpForge | India’s Independent Founder Network",
  description: "A premium registry for India's verified startup founders.",
}

export default async function Home() {
  const supabase = await createClient()

  // Sponsor of the Week
  const { data: sponsorOfWeek } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(1)

  // Recent Registry Additions
  const { data: startups } = await supabase
    .from("startups")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6)

  return (
    <div className="bg-white text-black selection:bg-black selection:text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-end">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-10">
                <span className="h-px w-12 bg-black"></span>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">
                  EST. 2026 — INDIA'S FOUNDER REGISTRY
                </span>
              </div>
              <h1 className="text-7xl md:text-[110px] leading-[0.85] font-display font-bold tracking-tighter mb-10">
                Showcase Your <br />
                <span className="text-gray-300 italic font-medium">Innovation.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 max-w-xl leading-tight mb-12">
                UpForge is the premier directory for India's verified startups. 
                Build authority and get discovered by serious builders.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link href="/apply">
                  <Button className="rounded-full px-12 h-14 bg-black text-white hover:bg-gray-900 text-[11px] font-bold uppercase tracking-widest transition-transform active:scale-95">
                    Join the Registry
                  </Button>
                </Link>
              </div>
            </div>
            {/* Minimal Stats */}
            <div className="hidden lg:block border-l border-black/5 pl-12 pb-4">
              <div className="space-y-8">
                <div>
                  <span className="text-4xl font-display font-bold">3,400+</span>
                  <p className="text-[10px] font-bold tracking-widest uppercase opacity-30">Verified Startups</p>
                </div>
                <div>
                  <span className="text-4xl font-display font-bold">12K+</span>
                  <p className="text-[10px] font-bold tracking-widest uppercase opacity-30">Monthly Visitors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THE REGISTRY: INTERACTIVE ROWS ================= */}
      <section className="py-24 px-6 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl font-display font-bold tracking-tighter mb-2">The Registry</h2>
            <p className="text-gray-400">Hover to preview the ecosystem.</p>
          </div>

          <div className="grid grid-cols-1">
            {startups?.map((startup) => (
              <div key={startup.id} className="group relative border-b border-black/5 py-12 transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between z-10 relative">
                  <div className="flex items-center gap-8">
                    <span className="text-[11px] font-mono opacity-20">/ 0{startups.indexOf(startup) + 1}</span>
                    <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tighter group-hover:italic transition-all group-hover:translate-x-4">
                      {startup.name}
                    </h3>
                  </div>
                  
                  <div className="mt-6 md:mt-0 flex items-center gap-6">
                    <span className="text-xs uppercase tracking-widest opacity-40 group-hover:opacity-100">{startup.industry || "Technology"}</span>
                    <ArrowUpRight className="h-6 w-6 opacity-20 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
                  </div>
                </div>

                {/* HIDDEN PREVIEW IMAGE (Visibile on hover) */}
                <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[350px] h-[220px] rounded-2xl overflow-hidden shadow-2xl opacity-0 scale-90 translate-x-10 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-500 z-20 hidden lg:block bg-gray-100">
                   {/* Background Image of Startup Website */}
                   <img 
                    src={startup.logo_url || "/placeholder.jpg"} 
                    alt={startup.name}
                    className="w-full h-full object-cover blur-[2px] opacity-40"
                   />
                   {/* Visit Site Button Overlay */}
                   <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto">
                      <Link 
                        href={startup.website_url || "#"} 
                        target="_blank"
                        className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-200 transition-colors"
                      >
                        Visit Full Site <ExternalLink className="h-3 w-3" />
                      </Link>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS: WHAT FOUNDERS SAY ================= */}
      <section className="py-32 px-6 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">
              What <span className="text-gray-500">Founders</span> <br /> Say About Us.
            </h2>
            <Quote className="h-20 w-20 text-gray-800 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: "Lucky Tiwari", role: "CEO, InternAdda", text: "UpForge helped us gain the verification we needed to build trust with our users." },
              { name: "Sumit Pandey", role: "Founder, Branded Base", text: "The network of ambitious builders here is unmatched in India's startup scene." },
              { name: "Aman Ghiya", role: "Founder", text: "Listing our startup was the best decision for our authority and SEO growth." }
            ].map((test, i) => (
              <div key={i} className="space-y-8 p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-black transition-all duration-500 group">
                <p className="text-xl leading-snug italic group-hover:text-black transition-colors">"{test.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gray-800 group-hover:bg-gray-200 transition-colors"></div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest">{test.name}</h4>
                    <p className="text-[10px] uppercase opacity-40">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER MINI ================= */}
      <footer className="py-20 px-6 text-center bg-white">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase opacity-20">
          UpForge · Built for Founders · 2026
        </p>
      </footer>
    </div>
  )
}
