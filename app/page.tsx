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
  BarChart3,
  Target,
  Handshake,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          UpForge<span className="text-[#1e3a5f]">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/startups" className="hover:text-[#1e3a5f] transition">Startups</Link>
          <Link href="/investors" className="hover:text-[#1e3a5f] transition">Investors</Link>
          <Link href="/sponsors" className="hover:text-[#1e3a5f] transition">Sponsors</Link>
          <Link href="/about" className="hover:text-[#1e3a5f] transition">About</Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/login" className="text-sm font-medium hover:text-[#1e3a5f] transition">Log in</Link>
          <Button asChild size="sm" className="rounded-full bg-[#1e3a5f] hover:bg-[#14304a] px-4 sm:px-5">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-black/5 py-12 px-4 sm:px-6 bg-white">
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
        <div className="text-gray-400 text-xs">© 2026 UpForge. All rights reserved.</div>
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
      role: "DYNAMICSCREEN",
      text: "UpForge helps me track the most promising startups. I feel more connected to the ecosystem than ever.",
      image: "/founders/florent-merian.jpg", // Placeholder - replace with actual image
    },
    {
      author: "HAMPUS PERSSON",
      role: "VAAM",
      text: "The dashboard is intuitive, clean, and makes startup sponsorship extremely easy.",
      image: "/founders/hampus-persson.jpg",
    },
    {
      author: "ERIC FETTNER",
      role: "THE JOB SAUCE",
      text: "The platform gives me exactly what I need to make quick, informed decisions without clutter.",
      image: "/founders/eric-fettner.jpg",
    },
  ]

  return (
    <div className="relative bg-white text-black min-h-screen">
      <Header />

      <main className="relative pt-20">
        {/* HERO SECTION (unchanged) */}
        <section className="pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* LEFT TEXT */}
              <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <span className="h-px w-10 bg-black/20 hidden sm:block"></span>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                    EST. 2025 — BUILDING STARTUP ECOSYSTEM
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9]">
                  Transform your <br />
                  <span className="text-gray-500 italic font-medium">startup journey</span> <br />
                  with UpForge
                </h1>
                <p className="text-base sm:text-xl text-gray-400 max-w-md mx-auto lg:mx-0">
                  UpForge empowers founders, investors, and teams to discover, sponsor, and track the most promising
                  startups.
                </p>
                <p className="text-base sm:text-lg text-gray-600">Join thousands of innovators shaping the future of tech.</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 justify-center lg:justify-start">
                  <Button asChild className="rounded-full px-6 sm:px-8 h-12 bg-black text-white hover:bg-gray-800 text-xs font-bold uppercase tracking-wider">
                    <Link href="/apply">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full px-6 sm:px-8 h-12 border-black/20 text-xs font-bold uppercase tracking-wider">
                    <Link href="/download">Download App</Link>
                  </Button>
                </div>
              </div>

              {/* RIGHT MOCKUP */}
              <div className="bg-gray-50 rounded-2xl border border-black/10 shadow-2xl overflow-hidden">
                <div className="bg-white border-b border-black/5 px-4 py-2 flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="ml-2 font-mono truncate">UpForge — Dashboard</span>
                </div>

                <DashboardClient latestStartup={latestStartup} comments={comments} teamCount={teamCount || 4} />
              </div>
            </div>
          </div>
        </section>

        {/* ========== CONNECT, SPONSOR, TRACK - ENHANCED SECTION ========== */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold tracking-tighter mb-4">
                Connect, Sponsor, Track.
              </h2>
              <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto">
                Everything you need to build and grow your startup ecosystem — all in one unified dashboard.
              </p>
            </div>

            {/* Interactive Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
              {/* Connect Card */}
              <Link href="/connect" className="group">
                <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-[#1e3a5f]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1e3a5f] group-hover:text-white transition-colors">
                    <Users className="h-7 w-7 text-[#1e3a5f] group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Connect</h3>
                  <p className="text-gray-500 mb-6">Find and network with verified founders, investors, and mentors in the ecosystem.</p>
                  <div className="flex items-center text-[#1e3a5f] font-medium">
                    <span>Discover network</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>

              {/* Sponsor Card */}
              <Link href="/sponsor" className="group">
                <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-[#c6a43f]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#c6a43f] group-hover:text-white transition-colors">
                    <Crown className="h-7 w-7 text-[#c6a43f] group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Sponsor</h3>
                  <p className="text-gray-500 mb-6">Boost your startup's visibility with premium placement and social media promotion.</p>
                  <div className="flex items-center text-[#c6a43f] font-medium">
                    <span>View sponsorship</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>

              {/* Track Card */}
              <Link href="/track" className="group">
                <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <TrendingUp className="h-7 w-7 text-green-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Track</h3>
                  <p className="text-gray-500 mb-6">Monitor startup growth, engagement metrics, and sponsorship performance in real-time.</p>
                  <div className="flex items-center text-green-600 font-medium">
                    <span>View analytics</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Trust & Credibility Dashboard - Mini Chart & Stats */}
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-black/5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left side: Mini chart placeholder */}
                <div>
                  <h3 className="text-2xl font-bold mb-4">Trusted by India's top founders</h3>
                  <p className="text-gray-500 mb-8">
                    Our platform processes hundreds of sponsorships and connections every month. Here's a snapshot of our ecosystem growth.
                  </p>
                  <div className="flex flex-wrap gap-8">
                    <div>
                      <div className="text-3xl font-bold text-[#1e3a5f]">3,200+</div>
                      <div className="text-xs uppercase tracking-wider text-gray-400">Verified Startups</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[#1e3a5f]">850+</div>
                      <div className="text-xs uppercase tracking-wider text-gray-400">Active Sponsors</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[#1e3a5f]">15k+</div>
                      <div className="text-xs uppercase tracking-wider text-gray-400">Monthly Connections</div>
                    </div>
                  </div>
                </div>

                {/* Right side: Simple bar chart (CSS only) */}
                <div className="bg-white p-6 rounded-2xl shadow-inner">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="h-5 w-5 text-[#1e3a5f]" />
                    <span className="font-semibold">Ecosystem Growth (last 6 months)</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Jan", value: 65 },
                      { label: "Feb", value: 72 },
                      { label: "Mar", value: 80 },
                      { label: "Apr", value: 78 },
                      { label: "May", value: 88 },
                      { label: "Jun", value: 95 },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span className="text-xs w-8 text-gray-500">{item.label}</span>
                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#1e3a5f] rounded-full"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
              <Button asChild size="lg" className="rounded-full px-8 bg-[#1e3a5f] hover:bg-[#14304a]">
                <Link href="/startups">Browse Startups</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-[#1e3a5f]/30 text-[#1e3a5f]">
                <Link href="/sponsor">Become a Sponsor</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FEATURES GRID (unchanged) */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50 border-y border-black/5">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm uppercase tracking-widest mb-4">Core Features:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-sm">
              {[
                "Verified Startups",
                "Sponsored Startups",
                "Investor Insights",
                "AI Recommendations",
                "Collaboration Tools",
                "Analytics Dashboard",
                "Portfolio Management",
                "Flexible Plans",
              ].map((feat) => (
                <div key={feat} className="bg-white p-4 rounded-lg border border-black/5 shadow-sm hover:shadow-md transition">
                  <Check className="h-4 w-4 text-green-600 mx-auto mb-2" />
                  {feat}
                </div>
              ))}
            </div>
            <Button variant="link" asChild className="mt-8 text-black hover:underline">
              <Link href="/features">See all features →</Link>
            </Button>
          </div>
        </section>

        {/* TESTIMONIALS WALL - with actual image placeholders */}
        <section className="py-20 sm:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tighter mb-12 sm:mb-16 text-center">
              What our users say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {comments.map((t, i) => (
                <div key={i} className="p-6 border border-black/5 rounded-xl hover:shadow-lg transition bg-white">
                  <p className="text-sm italic mb-4">“{t.text}”</p>
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.image}
                      alt={t.author}
                      className="w-10 h-10 rounded-full object-cover bg-gray-200"
                      onError={(e) => {
                        // Fallback to gray circle if image fails to load
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <div className="font-bold text-sm">{t.author}</div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="link" asChild className="text-black hover:underline">
                <Link href="/reviews">Read more reviews →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* TEMPLATES SECTION (unchanged) */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50 border-y border-black/5">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tighter mb-2">Get started with a template</h2>
            <p className="text-gray-400 mb-10">Jumpstart your startup workflow.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { name: "Investor Brief", type: "Briefing" },
                { name: "Startup Plan", type: "Planning" },
                { name: "Sponsor Checklist", type: "Checklist" },
                { name: "Weekly Review", type: "Reports" },
              ].map((t, i) => (
                <Link key={i} href={`/templates/${t.name.toLowerCase().replace(" ", "-")}`}>
                  <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm hover:shadow-md transition">
                    <div className="text-4xl mb-2">📄</div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.type}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="py-6 text-center text-[10px] tracking-[0.4em] uppercase text-[#4a4a4a] border-t border-[#1e3a5f]/10">
          UpForge · Founder First · 2026
        </div>
      </main>

      <Footer />
    </div>
  )
}
