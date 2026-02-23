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
import DashboardClient from "@/components/DashboardClient" // client component for interactivity

export const metadata: Metadata = {
  title: "UpForge | India’s Independent Founder Network",
  description:
    "Discover India’s rising startups. Sponsor your startup. Get visibility in the premium founder registry.",
}

// Simple header
function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-black/5 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          UpForge<span className="text-[#1e3a5f]">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/startups" className="hover:text-[#1e3a5f] transition">
            Startups
          </Link>
          <Link href="/investors" className="hover:text-[#1e3a5f] transition">
            Investors
          </Link>
          <Link href="/sponsors" className="hover:text-[#1e3a5f] transition">
            Sponsors
          </Link>
          <Link href="/about" className="hover:text-[#1e3a5f] transition">
            About
          </Link>
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

// Simple footer
function Footer() {
  return (
    <footer className="border-t border-black/5 py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-bold mb-4">Product</h4>
          <ul className="space-y-2 text-gray-500">
            <li>
              <Link href="/features">Features</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/directory">Directory</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-500">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/careers">Careers</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Resources</h4>
          <ul className="space-y-2 text-gray-500">
            <li>
              <Link href="/help">Help</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
          </ul>
        </div>
        <div className="text-gray-400 text-xs">© 2026 UpForge. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default async function Home() {
  const supabase = await createClient()

  // Fetch latest startup (for "New Startup Added")
  const { data: latestStartup } = await supabase
    .from("startups")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  // Fetch team members count (optional)
  const { count: teamCount } = await supabase
    .from("team_members")
    .select("*", { count: "exact", head: true })

  // Use testimonials as example comments
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
        {/* ========== HERO WITH APP MOCKUP ========== */}
        <section className="pt-16 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* LEFT TEXT */}
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-black/20"></span>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                    EST. 2025 — BUILDING STARTUP ECOSYSTEM
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9]">
                  Transform your <br />
                  <span className="text-gray-500 italic font-medium">startup journey</span> <br />
                  with UpForge
                </h1>
                <p className="text-xl text-gray-400 max-w-md">
                  UpForge empowers founders, investors, and teams to discover, sponsor, and track the most promising
                  startups.
                </p>
                <p className="text-lg text-gray-600">Join thousands of innovators shaping the future of tech.</p>
                <div className="flex gap-4 pt-4 flex-wrap">
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

              {/* RIGHT MOCKUP - APP INTERFACE (now dynamic) */}
              <div className="bg-gray-50 rounded-2xl border border-black/10 shadow-2xl overflow-hidden">
                <div className="bg-white border-b border-black/5 px-4 py-2 flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="ml-2 font-mono">UpForge — Dashboard</span>
                </div>

                {/* Dashboard grid - interactive via client component */}
                <DashboardClient
                  latestStartup={latestStartup}
                  comments={comments}
                  teamCount={teamCount || 4}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========== SECOND MOCKUP / QUOTE ========== */}
        <section className="py-20 px-6 bg-gray-50 border-t border-black/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="bg-white rounded-xl border border-black/10 p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <span className="font-bold">Acme Inc.</span>
                  <span className="text-gray-400">© UpForge</span>
                  <MessageCircle className="h-4 w-4 ml-auto" />
                </div>
                <div className="grid grid-cols-[180px_1fr] gap-4">
                  <div className="space-y-2">
                    <div className="font-medium">Discussions</div>
                    <div className="text-gray-500">My private docs</div>
                    <div className="border-t my-2"></div>
                    <div className="font-medium">Channels</div>
                    <div>General</div>
                    <div>Company Wiki</div>
                    <div>Mission, vision, values</div>
                    <div>Remote work setup</div>
                    <div>Policies & perks</div>
                    <div>Strategy</div>
                    <div>Updates</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">All your startup updates in one place.</div>
                    <p className="text-sm text-gray-600 mt-2">
                      Track, sponsor, and connect with promising startups easily.
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button asChild size="sm" className="rounded-full text-xs">
                        <Link href="/apply">Get started</Link>
                      </Button>
                      <Button asChild size="sm" variant="outline" className="rounded-full text-xs">
                        <Link href="/download">Download the app</Link>
                      </Button>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-gray-400">
                      <MessageCircle className="h-4 w-4" /> Discussions
                      <Search className="h-4 w-4 ml-2" /> Find anything
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <blockquote className="text-2xl italic">
                  “UpForge connects startups, sponsors, and innovators, making discovery and support seamless. The
                  ecosystem grows stronger with every decision taken transparently and efficiently.”
                  <footer className="mt-4 text-sm not-italic font-bold">
                    — SEBASTIEN GENDREAU <span className="font-normal text-gray-500">POOF AGORAPULSE</span>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ========== COMMUNICATE WHERE WORK HAPPENS ========== */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-4">
              Connect, Sponsor, Track.
            </h2>
            <p className="text-xl text-gray-400 mb-16">All your startup ecosystem activity in one place.</p>

            <div className="bg-white border border-black/10 rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_260px] h-auto md:h-[450px] text-sm">
                {/* Left */}
                <div className="bg-gray-50 p-4 border-r border-black/5">
                  <div className="font-bold mb-4">Acme</div>
                  <div className="text-gray-500">Marketing / Q1 Initiatives</div>
                  <div className="mt-6 flex items-center gap-2 text-gray-400">
                    <Search className="h-4 w-4" /> Find anything
                  </div>
                  <div className="mt-4">
                    <div className="font-medium">Channels</div>
                    <div className="font-medium mt-2">Discussions</div>
                  </div>
                </div>

                {/* Center */}
                <div className="p-4 overflow-y-auto">
                  <div className="font-bold text-lg">Goals & planning</div>
                  <p className="text-sm text-gray-600 mt-2">
                    Highlight the most promising startups and plan sponsorships effectively.
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                      <div className="font-medium">AI Startup Spotlight!</div>
                      <div className="text-xs">Review and sponsor the top innovative teams in Q1.</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <div className="font-medium">Outreach Campaigns</div>
                    </div>
                    <div className="p-3 border-l-2 border-black">
                      <div className="font-medium">Analytics Dashboard</div>
                      <div>Track engagements, metrics, and startup growth</div>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="bg-gray-50 p-4 border-l border-black/5">
                  <div className="font-bold">Tasks</div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Plus className="h-3 w-3" /> Interview founders for sponsorship
                    </div>
                    <div className="border-t my-2"></div>
                    <div>Projects</div>
                    <div>Investment Planning</div>
                    <div>Growth Updates</div>
                    <div>Metrics</div>
                    <div>Templates</div>
                  </div>
                  <div className="mt-6 text-xs text-gray-500">
                    Assign tasks, track progress, and collaborate with the right people.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg">Flexible plans for startups & investors.</p>
              <div className="flex justify-center gap-8 mt-6">
                <div className="text-left">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-gray-400"> /month</span>
                  <p className="text-xs uppercase tracking-wider mt-1">Starter</p>
                </div>
                <div className="text-left">
                  <span className="text-3xl font-bold">$6</span>
                  <span className="text-gray-400"> /month per user</span>
                  <p className="text-xs uppercase tracking-wider mt-1">Pro Plan</p>
                </div>
              </div>
              <Button asChild className="mt-8 rounded-full px-10 bg-black text-white hover:bg-gray-800">
                <Link href="/pricing">Compare all plans &gt;</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ========== FEATURES GRID ========== */}
        <section className="py-20 px-6 bg-gray-50 border-y border-black/5">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm uppercase tracking-widest mb-4">Core Features:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
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
                <div key={feat} className="bg-white p-4 rounded-lg border border-black/5 shadow-sm">
                  <Check className="h-4 w-4 text-green-600 mx-auto mb-2" />
                  {feat}
                </div>
              ))}
            </div>
            <Button variant="link" asChild className="mt-8 text-black">
              <Link href="/features">See all features →</Link>
            </Button>
          </div>
        </section>

        {/* ========== TESTIMONIALS WALL ========== */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-16 text-center">
              What our users say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {comments.map((t, i) => (
                <div key={i} className="p-6 border border-black/5 rounded-xl hover:shadow-lg transition">
                  <p className="text-sm italic mb-4">“{t.text}”</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <div>
                      <div className="font-bold text-sm">{t.author}</div>
                      <div className="text-[10px] uppercase tracking-wider text-gray-400">FOUNDER</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="link" asChild className="text-black">
                <Link href="/reviews">Read more reviews →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ========== TEMPLATES ========== */}
        <section className="py-20 px-6 bg-gray-50 border-y border-black/5">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold tracking-tighter mb-2">Get started with a template</h2>
            <p className="text-gray-400 mb-10">Jumpstart your startup workflow.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
