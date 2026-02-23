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
  Shield,
  Zap,
  Globe,
  Briefcase,
  Rocket,
  HeartHandshake,
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

  let latestStartup = null
  try {
    const { data } = await supabase
      .from("startups")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
    latestStartup = data
  } catch (error) {
    console.error("Failed to fetch latest startup:", error)
  }

  let teamCount = 4
  try {
    const { count } = await supabase
      .from("team_members")
      .select("*", { count: "exact", head: true })
    if (count !== null) teamCount = count
  } catch (error) {
    console.error("Failed to fetch team count:", error)
  }

  const comments = [
    {
      author: "FLORENT MERIAN",
      role: "DYNAMICSCREEN",
      text: "UpForge helps me track the most promising startups. I feel more connected to the ecosystem than ever.",
    },
    {
      author: "HAMPUS PERSSON",
      role: "VAAM",
      text: "The dashboard is intuitive, clean, and makes startup sponsorship extremely easy.",
    },
    {
      author: "ERIC FETTNER",
      role: "THE JOB SAUCE",
      text: "The platform gives me exactly what I need to make quick, informed decisions without clutter.",
    },
  ]

  return (
    <div className="relative bg-white text-black min-h-screen">
      <Header />

      <main className="relative pt-20">
        {/* ========== HERO ========== */}
        <section className="pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
                <DashboardClient latestStartup={latestStartup} comments={comments} teamCount={teamCount} />
              </div>
            </div>
          </div>
        </section>

        {/* ========== TRUST BADGES ========== */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 bg-gray-50/50 border-y border-black/5">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-xs uppercase tracking-widest text-gray-400 mb-6">Trusted by innovators from</p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-60">
              <span className="text-sm font-semibold text-gray-600">IIT Delhi</span>
              <span className="text-sm font-semibold text-gray-600">IIM Ahmedabad</span>
              <span className="text-sm font-semibold text-gray-600">Sequoia Capital</span>
              <span className="text-sm font-semibold text-gray-600">Accel</span>
              <span className="text-sm font-semibold text-gray-600">Peak XV</span>
            </div>
          </div>
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section className="py-20 sm:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tighter mb-4">
                How UpForge works
              </h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                Three simple steps to amplify your startup journey.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "1. Create Profile",
                  desc: "List your startup with verified details and get discovered by investors.",
                },
                {
                  icon: <Crown className="h-8 w-8" />,
                  title: "2. Get Sponsored",
                  desc: "Boost visibility with premium sponsorship and social media features.",
                },
                {
                  icon: <TrendingUp className="h-8 w-8" />,
                  title: "3. Track Growth",
                  desc: "Monitor engagement, connections, and sponsorship performance.",
                },
              ].map((step, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-lg transition">
                  <div className="w-16 h-16 mx-auto bg-[#1e3a5f]/10 rounded-2xl flex items-center justify-center mb-4 text-[#1e3a5f]">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CONNECT, SPONSOR, TRACK (ENHANCED) ========== */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 bg-gray-50/30">
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
              {[
                {
                  href: "/connect",
                  icon: <Users className="h-7 w-7" />,
                  title: "Connect",
                  desc: "Find and network with verified founders, investors, and mentors in the ecosystem.",
                  color: "bg-[#1e3a5f]",
                  lightColor: "bg-[#1e3a5f]/10",
                  textColor: "text-[#1e3a5f]",
                },
                {
                  href: "/sponsor",
                  icon: <Crown className="h-7 w-7" />,
                  title: "Sponsor",
                  desc: "Boost your startup's visibility with premium placement and social media promotion.",
                  color: "bg-[#c6a43f]",
                  lightColor: "bg-[#c6a43f]/10",
                  textColor: "text-[#c6a43f]",
                },
                {
                  href: "/track",
                  icon: <TrendingUp className="h-7 w-7" />,
                  title: "Track",
                  desc: "Monitor startup growth, engagement metrics, and sponsorship performance in real-time.",
                  color: "bg-green-600",
                  lightColor: "bg-green-100",
                  textColor: "text-green-600",
                },
              ].map((item, i) => (
                <Link key={i} href={item.href} className="group">
                  <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-14 h-14 ${item.lightColor} rounded-2xl flex items-center justify-center mb-6 group-hover:${item.color} group-hover:text-white transition-colors`}>
                      <div className={`${item.textColor} group-hover:text-white transition-colors`}>
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-500 mb-6">{item.desc}</p>
                    <div className={`flex items-center ${item.textColor} font-medium`}>
                      <span>Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Trust Dashboard with Metrics */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/5 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] text-xs font-medium mb-4">
                    <Shield className="h-3 w-3" /> Trusted by India's best
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Real impact, real numbers</h3>
                  <p className="text-gray-500 mb-8">
                    Our platform processes hundreds of sponsorships and connections every month. Here's a snapshot of our ecosystem growth.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
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
                    <div>
                      <div className="text-3xl font-bold text-[#1e3a5f]">₹45Cr+</div>
                      <div className="text-xs uppercase tracking-wider text-gray-400">Funding Facilitated</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[#1e3a5f]">22</div>
                      <div className="text-xs uppercase tracking-wider text-gray-400">Exit Events</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[#1e3a5f]">100%</div>
                      <div className="text-xs uppercase tracking-wider text-gray-400">Founder Verified</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl shadow-inner">
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
                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
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

        {/* ========== FEATURES GRID ========== */}
        <section className="py-20 sm:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tighter mb-4">
                Everything you need to succeed
              </h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                Powerful features designed for founders, by founders.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-sm">
              {[
                { icon: <Shield className="h-4 w-4" />, label: "Verified Startups" },
                { icon: <Crown className="h-4 w-4" />, label: "Sponsored Startups" },
                { icon: <TrendingUp className="h-4 w-4" />, label: "Investor Insights" },
                { icon: <Sparkles className="h-4 w-4" />, label: "AI Recommendations" },
                { icon: <Users className="h-4 w-4" />, label: "Collaboration Tools" },
                { icon: <BarChart3 className="h-4 w-4" />, label: "Analytics Dashboard" },
                { icon: <Briefcase className="h-4 w-4" />, label: "Portfolio Management" },
                { icon: <Rocket className="h-4 w-4" />, label: "Flexible Plans" },
              ].map((feat, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border border-black/5 shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
                  <div className="text-[#1e3a5f] mb-2">{feat.icon}</div>
                  <span className="font-medium">{feat.label}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="link" asChild className="text-black hover:underline">
                <Link href="/features">See all features →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ========== TESTIMONIALS ========== */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tighter mb-4">
                Loved by founders
              </h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                Join 3,200+ startups that trust UpForge.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {comments.map((t, i) => (
                <div key={i} className="p-6 border border-black/5 rounded-xl hover:shadow-lg transition bg-white">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-[#c6a43f] text-[#c6a43f]" />
                    ))}
                  </div>
                  <p className="text-sm italic mb-4">“{t.text}”</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
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

        {/* ========== TEMPLATES ========== */}
        <section className="py-20 sm:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tighter mb-4">
              Jumpstart with templates
            </h2>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
              Proven frameworks used by top founders to raise funds, pitch investors, and track growth.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { name: "Investor Brief", type: "Briefing", icon: "📄" },
                { name: "Startup Plan", type: "Planning", icon: "📊" },
                { name: "Sponsor Checklist", type: "Checklist", icon: "✅" },
                { name: "Weekly Review", type: "Reports", icon: "📈" },
              ].map((t, i) => (
                <Link key={i} href={`/templates/${t.name.toLowerCase().replace(" ", "-")}`}>
                  <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm hover:shadow-md transition group">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{t.icon}</div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.type}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========== FINAL CTA ========== */}
        <section className="py-20 px-4 sm:px-6 bg-[#1e3a5f] text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 8px)`,
            }}
          />
          <div className="relative max-w-3xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-light mb-4">
              Ready to transform your <span className="font-semibold">startup journey?</span>
            </h3>
            <p className="text-white/70 mb-8 text-lg">
              Join India's fastest-growing founder network today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/apply">
                <Button className="rounded-full px-8 h-14 bg-[#c6a43f] text-white hover:bg-[#b08c2e] text-sm uppercase tracking-widest font-semibold shadow-xl border-0">
                  List Your Startup
                </Button>
              </Link>
              <Link href="/sponsor">
                <Button variant="outline" className="rounded-full px-8 h-14 border-white text-white hover:bg-white/10 text-sm uppercase tracking-widest font-semibold">
                  Become a Sponsor
                </Button>
              </Link>
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
