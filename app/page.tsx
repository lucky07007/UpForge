import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowRight, 
  Crown, 
  Sparkles, 
  Users, 
  TrendingUp, 
  Award, 
  Zap, 
  ChevronRight,
  ShieldCheck
} from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UpForge | The Elite Founder Network",
  description: "India's most exclusive startup registry. Scale your visibility.",
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

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-hidden">
      
      {/* --- AMBIENT BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[30%] bg-gradient-to-t from-indigo-950/20 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-300 uppercase">
                The 2026 Founder Registry
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6">
              Forge Your <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500">
                Legacy in Tech.
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
              Where India’s <span className="text-slate-200 font-medium">top 1% founders</span> showcase 
              what they're building. No noise, just high-signal networking.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
              <Link href="/apply">
                <Button className="group relative rounded-xl px-8 h-14 bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                  <span className="relative z-10 flex items-center gap-2 font-bold tracking-tight">
                    Join the Network <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="/startup">
                <Button variant="ghost" className="rounded-xl px-8 h-14 border border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-300 transition-all">
                  Browse Directory
                </Button>
              </Link>
            </div>

            {/* Social Proof Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto py-10 border-y border-slate-800/50 backdrop-blur-sm">
              {[
                { label: "Active Founders", val: "3.2k+", icon: Users },
                { label: "Capital Raised", val: "$140M+", icon: TrendingUp },
                { label: "Daily Views", val: "12k+", icon: Zap },
                { label: "Verified Only", val: "100%", icon: ShieldCheck },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <stat.icon className="h-5 w-5 text-indigo-500 mb-2 opacity-80" />
                  <span className="text-2xl font-bold text-white tracking-tight">{stat.val}</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SPONSOR OF THE WEEK (FEATURE CARD) ================= */}
        {sponsorOfWeek?.[0] && (
          <section className="max-w-7xl mx-auto px-6 pb-24">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-[2rem] overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                    <Crown className="h-3 w-3 text-amber-500" />
                    <span className="text-[10px] font-bold text-amber-500 tracking-tighter uppercase">Sponsor of the Week</span>
                  </div>
                </div>
                
                <div className="p-8 md:p-14 flex flex-col md:flex-row items-center gap-12">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-white p-6 shadow-2xl flex-shrink-0 group-hover:rotate-3 transition-transform duration-500">
                    <img 
                      src={sponsorOfWeek[0].logo_url || "/placeholder-logo.svg"} 
                      alt={sponsorOfWeek[0].name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{sponsorOfWeek[0].name}</h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
                      {sponsorOfWeek[0].short_description || "Leading the next generation of Indian innovation with cutting-edge solutions."}
                    </p>
                    <Link href={`/startup/${sponsorOfWeek[0].slug}`}>
                      <Button className="bg-white text-black hover:bg-slate-200 rounded-lg px-6 font-bold">
                        Learn More <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= GRID SECTIONS (SPONSORED & FEATURED) ================= */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="flex flex-col gap-24">
            
            {/* SPONSORED LIST */}
            <div>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-400" /> Premium Visibility
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">Startups scaling with UpForge</p>
                </div>
                <Link href="/sponsor" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">
                  Be Listed Here →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {sponsored?.map((startup) => (
                  <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
                    <div className="h-full p-5 rounded-2xl bg-slate-900/40 border border-slate-800/50 hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all duration-300">
                      <img src={startup.logo_url} className="w-10 h-10 rounded-lg mb-4 grayscale group-hover:grayscale-0 transition-all" alt="" />
                      <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors">{startup.name}</h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{startup.short_description}</p>
                      <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Featured</span>
                        <ArrowRight className="h-3 w-3 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* EDITORIAL PICKS */}
            <div>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Award className="h-5 w-5 text-cyan-400" /> Editorial Picks
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">Handpicked by our growth team</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured?.map((startup) => (
                  <Link key={startup.id} href={`/startup/${startup.slug}`} className="group relative overflow-hidden p-[1px] rounded-2xl hover:scale-[1.02] transition-transform">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 group-hover:from-cyan-500/50 group-hover:to-indigo-500/50" />
                    <div className="relative bg-slate-950 p-6 rounded-[15px] h-full">
                      <div className="flex items-start justify-between">
                        <img src={startup.logo_url} className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 p-2" alt="" />
                        <Sparkles className="h-4 w-4 text-slate-700 group-hover:text-cyan-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white mt-4">{startup.name}</h3>
                      <p className="text-sm text-slate-400 mt-2 line-clamp-2 font-light leading-relaxed">
                        {startup.short_description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden bg-indigo-600 py-20 px-10 text-center">
            {/* CTA Decorative BG */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Ready to take off?</h2>
              <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto font-medium">
                Get your startup in front of investors, partners, and high-quality talent today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sponsor">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 font-black rounded-xl px-10 h-16 text-lg shadow-2xl">
                    SPONSOR NOW
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="py-12 border-t border-slate-900 bg-black/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white">U</div>
              <span className="font-bold tracking-tighter text-white text-xl">UpForge</span>
            </div>
            <div className="text-[10px] tracking-[0.5em] uppercase text-slate-600 font-bold">
              © 2026 INDIA FOUNDER REGISTRY • BUILT FOR BUILDERS
            </div>
            <div className="flex gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <Link href="#" className="hover:text-white">Twitter</Link>
              <Link href="#" className="hover:text-white">Privacy</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
