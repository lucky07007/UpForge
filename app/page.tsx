import { createClient } from "@/lib/supabase/server"
import { Hero } from "@/components/hero"
import { WhyUpforge } from "@/components/why-upforge"
import { StartupCard } from "@/components/startup-card"
import { SponsoredCard } from "@/components/sponsored-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  TrendingUp,
  CheckCircle,
  Award,
  Sparkle,
  Star,
  Gem
} from "lucide-react"

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
    <div className="relative bg-[#0B0F1A] overflow-hidden font-sans antialiased text-white">
      {/* Deep navy background with subtle texture */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-950/20 via-transparent to-amber-900/10 pointer-events-none" />
      
      {/* Animated orbs */}
      <div className="absolute top-20 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />

      {/* SECTION 1: CENTERED HERO */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-amber-500/10 border border-indigo-500/20 mb-8 backdrop-blur-sm">
            <Gem className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-medium uppercase tracking-widest text-amber-400/90">
              The Founder's Benchmark
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-6">
            The elite ecosystem for India's most 
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-amber-200 block mt-2">
              ambitious builders.
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Vetted startups, verified founders, and institutional‑grade networking. 
            <span className="block mt-2 text-indigo-300 font-medium">Every status symbol dreams of being listed here.</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button className="group h-12 px-8 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-xs font-semibold uppercase tracking-[0.15em] shadow-lg shadow-indigo-500/20 transition-all duration-300">
              Join the registry
              <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" className="h-12 px-8 rounded-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-indigo-500/50 text-xs font-semibold uppercase tracking-[0.15em] transition-all">
              View featured
            </Button>
          </div>

          {/* Elegant stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[ 
              { label: 'Vetted Startups', value: '500+', icon: Shield },
              { label: 'Verified Founders', value: '850+', icon: Users },
              { label: 'Capital Tracked', value: '$2.4B', icon: TrendingUp },
              { label: 'Annual Events', value: '48', icon: Zap },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center p-4 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
                <div className="p-3 rounded-full bg-gradient-to-br from-indigo-500/20 to-amber-500/20 mb-3">
                  <stat.icon className="h-5 w-5 text-indigo-300" />
                </div>
                <span className="text-2xl font-bold text-white mb-1">{stat.value}</span>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE VERIFICATION BAR */}
      <div className="border-y border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Live verification · Updated daily</span>
            </div>
            <div className="flex items-center gap-8">
              {['SEQUOIA', 'ACCEL', 'BLUME', 'Y COMBINATOR'].map((partner) => (
                <span key={partner} className="text-sm font-bold tracking-tight text-slate-500 hover:text-slate-300 transition">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: FEATURED STARTUPS */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-6 backdrop-blur-sm">
            <Award className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-medium uppercase tracking-widest text-amber-400/90">
              The Vetted Few
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-slate-100 max-w-2xl mx-auto">
            Hand‑picked startups leading the next 
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-amber-200 block mt-1">
              wave of innovation.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sponsored?.map((startup, index) => (
            <div 
              key={startup.id} 
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-b from-indigo-500/20 to-amber-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 shadow-xl hover:border-indigo-500/30 transition-all duration-500">
                <SponsoredCard startup={startup} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY UPFORGE – DARK THEME */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <WhyUpforge />
        </div>
      </div>

      {/* SECTION 3: TRENDING NETWORKS */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/80">
              Real‑time index
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-slate-100">
              Trending 
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-amber-200 block mt-1">
                networks today.
              </span>
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              The most influential startups in our ecosystem, updated in real time.
            </p>
          </div>
          <Link 
            href="/startup" 
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-amber-400 hover:text-amber-300 transition"
          >
            View full directory
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {trending?.map((startup) => (
            <div key={startup.id} className="group">
              <div className="relative bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 p-5 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
                <StartupCard startup={startup} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link href="/startup">
            <Button className="group h-11 px-7 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-xs font-semibold uppercase tracking-[0.2em] shadow-lg shadow-indigo-500/20 transition-all duration-300">
              Explore entire registry
              <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <p className="mt-6 text-xs font-medium text-slate-500 uppercase tracking-wider">
            Data verified · February 2026
          </p>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <div className="border-t border-slate-800 bg-slate-900/50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-10">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
              Trusted by leading capital firms
            </span>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
              {['SEQUOIA', 'ACCEL', 'BLUME', 'MATRIX', 'YCOMBINATOR'].map((partner) => (
                <span 
                  key={partner} 
                  className="text-lg md:text-xl font-black tracking-tight text-slate-600 hover:text-slate-400 transition"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="border-t border-slate-800 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">
            Invite‑only for verified founders · 850+ members and growing
          </p>
        </div>
      </div>
    </div>
  )
}
