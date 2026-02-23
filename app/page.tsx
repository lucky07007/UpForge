// app/page.tsx
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Clock,
  MessageCircle,
  Search,
  Plus,
  Check,
  ArrowRight,
  Crown,
  Sparkles,
  Users,
  TrendingUp,
  Award,
  Star,
} from "lucide-react"
import { Metadata } from "next"
import DashboardClient from "@/components/DashboardClient"

export const metadata: Metadata = {
  title: "UpForge | India’s Independent Founder Network",
  description:
    "Discover India’s rising startups. Sponsor your startup. Get visibility in the premium founder registry.",
}

function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-black/5 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          UpForge<span className="text-[#1e3a5f]">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/startups" className="hover:text-[#1e3a5f] transition">Startups</Link>
          <Link href="/investors" className="hover:text-[#1e3a5f] transition">Investors</Link>
          <Link href="/sponsors" className="hover:text-[#1e3a5f] transition">Sponsors</Link>
          <Link href="/about" className="hover:text-[#1e3a5f] transition">About</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium hover:text-[#1e3a5f] transition">
            Log in
          </Link>
          <Button asChild size="sm" className="rounded-full bg-[#1e3a5f] hover:bg-[#14304a]">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-black/5 py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-bold mb-4">Product</h4>
          <ul className="space-y-2 text-gray-500">
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/directory">Directory</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-500">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/careers">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Resources</h4>
          <ul className="space-y-2 text-gray-500">
            <li><Link href="/help">Help</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
        <div className="text-gray-400 text-xs">
          © 2026 UpForge. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default async function Home() {
  const supabase = await createClient()

  const { data: latestStartup } = await supabase
    .from("startups")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  const { count: teamCount } = await supabase
    .from("team_members")
    .select("*", { count: "exact", head: true })

  const comments = [
    {
      author: "FLORENT MERIAN",
      text: "UpForge helps me track the most promising startups. I feel more connected to the ecosystem than ever.",
    },
    {
      author: "HAMPUS PERSSON",
      text: "The dashboard is intuitive, clean, and makes startup sponsorship extremely easy.",
    },
    {
      author: "ERIC FETTNER",
      text: "The platform gives me exactly what I need to make quick, informed decisions without clutter.",
    },
  ]

  return (
    <div className="relative bg-white text-black min-h-screen">
      <Header />

      <main className="relative pt-20">

        {/* HERO */}
        <section className="pt-12 pb-16 md:pt-16 md:pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* LEFT */}
              <div className="space-y-8 text-center lg:text-left mx-auto lg:mx-0 max-w-xl">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="h-px w-10 bg-black/20"></span>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                    EST. 2025 — BUILDING STARTUP ECOSYSTEM
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
                  Transform your <br />
                  <span className="text-gray-500 italic font-medium">
                    startup journey
                  </span>{" "}
                  <br />
                  with UpForge
                </h1>

                <p className="text-lg md:text-xl text-gray-500">
                  UpForge empowers founders, investors, and teams to discover,
                  sponsor, and track promising startups.
                </p>

                <div className="flex gap-4 pt-4 flex-wrap justify-center lg:justify-start">
                  <Button
                    asChild
                    className="rounded-full px-8 h-12 bg-black text-white hover:bg-gray-800 text-xs font-bold uppercase tracking-wider"
                  >
                    <Link href="/apply">Get Started</Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full px-8 h-12 border-black/20 text-xs font-bold uppercase tracking-wider"
                  >
                    <Link href="/download">Download App</Link>
                  </Button>
                </div>
              </div>

              {/* RIGHT MOCKUP */}
              <div className="relative">
                <div className="bg-gradient-to-b from-gray-50 to-white 
                                rounded-3xl border border-black/10 
                                shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] 
                                overflow-hidden transition-all duration-300">

                  <div className="bg-white border-b border-black/5 px-4 py-2 flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="ml-2 font-mono">UpForge — Dashboard</span>
                  </div>

                  <DashboardClient
                    latestStartup={latestStartup}
                    comments={comments}
                    teamCount={teamCount || 4}
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Bottom Signature */}
        <div className="py-6 text-center text-[10px] tracking-[0.4em] uppercase text-[#4a4a4a] border-t border-[#1e3a5f]/10">
          UpForge · Founder First · 2026
        </div>

      </main>

      <Footer />
    </div>
  )
}
