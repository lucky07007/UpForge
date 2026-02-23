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
  ChevronRight,
  Target,
  Eye,
} from "lucide-react"
import { Metadata } from "next"
import DashboardClient from "@/components/DashboardClient"
import { CyclingText } from "@/components/cycling-text"

export const metadata: Metadata = {
  title: "UpForge | India’s Independent Founder Network",
  description:
    "Discover India’s rising startups. Sponsor your startup. Get visibility in the premium founder registry.",
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
      <main className="relative pt-2"> 
        {/* Adjusted pt-20 to pt-2 to remove excessive gap below GlobalHero */}
        
        {/* ========== HERO ========== */}
        <section className="pt-4 sm:pt-6 pb-16 sm:pb-20 px-4 sm:px-6"> 
          {/* Adjusted pt-12 to pt-4 to sit tight under the header */}
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
                  Architect your <br />
                  <CyclingText /> <br />
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
                <div key={i} className="text-center p-6 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-lg transition group">
                  <div className="w-16 h-16 mx-auto bg-[#1e3a5f]/10 rounded-2xl flex items-center justify-center mb-4 text-[#1e3a5f] group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-500">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Trust Dashboard with Metrics - Visual Upgrade */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/5 shadow-xl mt-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left side: Impact numbers with icons */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] text-xs font-medium mb-4">
                    <Shield className="h-3 w-3" /> Trusted by India's best
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Real impact, real numbers</h3>
                  <p className="text-gray-500 mb-8">
                    Our platform processes hundreds of sponsorships and connections every month. Here's a snapshot of our ecosystem growth.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                    <div className="text-center sm:text-left">
                      <div className="text-3xl font-bold text-[#1e3a5f]">3,200+</div>
                      <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                        <Users className="h-3 w-3 text-gray-400" />
                        <span className="text-xs uppercase tracking-wider text-gray-400">Verified Startups</span>
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="text-3xl font-bold text-[#1e3a5f]">850+</div>
                      <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                        <Crown className="h-3 w-3 text-gray-400" />
                        <span className="text-xs uppercase tracking-wider text-gray-400">Active Sponsors</span>
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="text-3xl font-bold text-[#1e3a5f]">15k+</div>
                      <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                        <MessageCircle className="h-3 w-3 text-gray-400" />
                        <span className="text-xs uppercase tracking-wider text-gray-400">Monthly Connections</span>
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="text-3xl font-bold text-[#1e3a5f]">₹45Cr+</div>
                      <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                        <TrendingUp className="h-3 w-3 text-gray-400" />
                        <span className="text-xs uppercase tracking-wider text-gray-400">Funding Facilitated</span>
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="text-3xl font-bold text-[#1e3a5f]">22</div>
                      <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                        <Award className="h-3 w-3 text-gray-400" />
                        <span className="text-xs uppercase tracking-wider text-gray-400">Exit Events</span>
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="text-3xl font-bold text-[#1e3a5f]">100%</div>
                      <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                        <Shield className="h-3 w-3 text-gray-400" />
                        <span className="text-xs uppercase tracking-wider text-gray-400">Founder Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Visual stats */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#1e3a5f] to-[#14304a] rounded-3xl p-8 text-white shadow-2xl">
                    <div className="flex items-center gap-2 mb-6">
                      <Eye className="h-5 w-5 text-[#c6a43f]" />
                      <span className="font-semibold text-lg">Ecosystem at a glance</span>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Quarterly growth</span>
                          <span className="text-[#c6a43f] font-bold">+32%</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full w-2/3 bg-[#c6a43f] rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Sponsor retention</span>
                          <span className="text-[#c6a43f] font-bold">94%</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full w-[94%] bg-[#c6a43f] rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Founder satisfaction</span>
                          <span className="text-[#c6a43f] font-bold">4.9/5</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full w-[98%] bg-[#c6a43f] rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/20 text-center text-xs opacity-70">
                      Based on 1,200+ reviews
                    </div>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c6a43f]/20 rounded-full blur-3xl -z-10" />
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

        <div className="py-6 text-center text-[10px] tracking-[0.4em] uppercase text-[#4a4a4a] border-t border-[#1e3a5f]/10">
          UpForge · Founder First · 2026
        </div>
      </main>
    </div>
  )
}
