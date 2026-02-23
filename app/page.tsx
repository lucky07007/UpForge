// app/page.tsx
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
  Star,
  MessageCircle,
  Search,
  Plus,
  Check,
  Clock,
} from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UpForge | India’s Independent Founder Network",
  description:
    "Discover India’s rising startups. Sponsor your startup. Get visibility in the premium founder registry.",
}

// Simple header component
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
          <Link href="/login" className="text-sm font-medium hover:text-[#1e3a5f] transition">Log in</Link>
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

  // Sponsor of the Week (Top 1 newest sponsored)
  const { data: sponsorOfWeek } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(1)

  // Top 7 Sponsored
  const { data: sponsored } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(7)

  // Top 7 Featured
  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(7)

  return (
    <div className="relative bg-[#fbf9f6] text-[#1e1b1b] min-h-screen">
      {/* Subtle diagonal pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 8px)`,
        }}
      />

      <Header />

      <main className="relative pt-20">
        {/* ================= HERO ================= */}
        <section className="relative pt-16 pb-20 px-6 text-center overflow-hidden">
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
              A premier directory where serious founders gain visibility, build authority,
              and connect with India’s most ambitious builders.
            </p>

            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <Link href="/apply">
                <Button className="rounded-full px-8 h-12 bg-[#1e3a5f] text-white hover:bg-[#14304a] transition-all text-sm font-medium shadow-lg shadow-[#1e3a5f]/20">
                  List Your Startup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/startup">
                <Button
                  variant="outline"
                  className="rounded-full px-8 h-12 border-[#1e3a5f]/30 text-[#1e3a5f] hover:bg-[#1e3a5f]/5 hover:border-[#1e3a5f]/50 transition-all text-sm font-medium"
                >
                  Browse Directory
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-[#4a4a4a]">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#1e3a5f]" />
                <span>3,000+ Startups</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#1e3a5f]" />
                <span>10,000+ Monthly Visitors</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-[#1e3a5f]" />
                <span>500+ Sponsored</span>
              </div>
            </div>

            {/* As featured in */}
            <div className="mt-16 pt-8 border-t border-[#1e3a5f]/10">
              <p className="text-xs uppercase tracking-[0.3em] text-[#4a4a4a] mb-4">As featured in</p>
              <div className="flex justify-center gap-8 opacity-60">
                <span className="text-sm font-semibold text-[#1e3a5f]/40">TECHCRUNCH</span>
                <span className="text-sm font-semibold text-[#1e3a5f]/40">FORBES</span>
                <span className="text-sm font-semibold text-[#1e3a5f]/40">YOURSTORY</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SPONSOR OF THE WEEK ================= */}
        {sponsorOfWeek && sponsorOfWeek.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 pb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-full bg-[#c6a43f]/10">
                <Crown className="h-5 w-5 text-[#c6a43f]" />
              </div>
              <h2 className="text-sm uppercase tracking-[0.3em] font-semibold text-[#4a4a4a]">
                Sponsor of the Week
              </h2>
            </div>

            <Link href={`/startup/${sponsorOfWeek[0].slug}`} className="block group">
              <div className="relative bg-white border border-[#c6a43f]/30 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.01]">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#c6a43f]/20 to-transparent rounded-3xl blur opacity-30 group-hover:opacity-50 transition" />

                <div className="relative flex items-center gap-6 w-full md:w-auto">
                  <img
                    src={sponsorOfWeek[0].logo_url || "/placeholder-logo.svg"}
                    className="h-24 w-24 object-contain rounded-xl bg-white p-3 shadow-md"
                    alt={sponsorOfWeek[0].name}
                  />
                  <div className="flex-1">
                    <h3 className="text-3xl font-light text-[#1e1b1b]">
                      {sponsorOfWeek[0].name}
                    </h3>
                    <p className="text-[#4a4a4a] mt-2 line-clamp-2 max-w-xl">
                      {sponsorOfWeek[0].short_description ||
                        "Featured premium visibility startup making waves in the ecosystem."}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-[#c6a43f]/10 text-[#c6a43f] rounded-full">
                        Premium Sponsor
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative ml-auto">
                  <span className="text-sm font-medium text-[#c6a43f] flex items-center gap-1">
                    View Startup <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ================= TOP 7 FEATURED ================= */}
        {featured && featured.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 pb-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#1e3a5f]/10">
                  <Sparkles className="h-5 w-5 text-[#1e3a5f]" />
                </div>
                <h2 className="text-sm uppercase tracking-[0.3em] font-semibold text-[#4a4a4a]">
                  Editorial Picks
                </h2>
              </div>
              <Link
                href="/featured"
                className="text-sm font-medium text-[#1e3a5f] hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featured.map((startup) => (
                <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
                  <div className="bg-white rounded-2xl border border-[#1e3a5f]/10 p-5 hover:shadow-xl transition-all duration-200 hover:border-[#1e3a5f]/30 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={startup.logo_url || "/placeholder-logo.svg"}
                        className="h-12 w-12 object-contain rounded-lg bg-white"
                        alt={startup.name}
                      />
                      <h3 className="font-semibold text-[#1e1b1b] group-hover:text-[#1e3a5f] transition-colors line-clamp-1">
                        {startup.name}
                      </h3>
                    </div>
                    {startup.short_description && (
                      <p className="text-sm text-[#4a4a4a] line-clamp-2">
                        {startup.short_description}
                      </p>
                    )}
                    <div className="mt-auto pt-3 text-xs text-[#1e3a5f] font-medium">
                      Featured
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================= TOP 7 SPONSORED ================= */}
        {sponsored && sponsored.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 pb-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#c6a43f]/10">
                  <Crown className="h-5 w-5 text-[#c6a43f]" />
                </div>
                <h2 className="text-sm uppercase tracking-[0.3em] font-semibold text-[#4a4a4a]">
                  Top Sponsored Startups
                </h2>
              </div>
              <Link
                href="/sponsored"
                className="text-sm font-medium text-[#c6a43f] hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sponsored.map((startup) => (
                <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
                  <div className="bg-white rounded-2xl border border-[#c6a43f]/20 p-5 hover:shadow-xl transition-all duration-200 hover:border-[#c6a43f]/40 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={startup.logo_url || "/placeholder-logo.svg"}
                        className="h-12 w-12 object-contain rounded-lg bg-white"
                        alt={startup.name}
                      />
                      <h3 className="font-semibold text-[#1e1b1b] group-hover:text-[#c6a43f] transition-colors line-clamp-1">
                        {startup.name}
                      </h3>
                    </div>
                    {startup.short_description && (
                      <p className="text-sm text-[#4a4a4a] line-clamp-2">
                        {startup.short_description}
                      </p>
                    )}
                    <div className="mt-auto pt-3 text-xs text-[#c6a43f] font-medium">
                      Sponsored
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ========== CONNECT, SPONSOR, TRACK ========== */}
        <section className="max-w-7xl mx-auto px-6 pb-28">
          <div className="bg-white border border-black/10 rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_260px] h-auto md:h-[450px] text-sm">
              {/* Left Sidebar - Channels */}
              <div className="bg-gray-50 p-6 border-r border-black/5">
                <div className="font-bold mb-4 text-lg">UpForge</div>
                <div className="space-y-1 text-gray-600">
                  <div className="py-1.5 px-2 rounded hover:bg-black/5 cursor-pointer">Startups</div>
                  <div className="py-1.5 px-2 rounded hover:bg-black/5 cursor-pointer">Investments</div>
                  <div className="py-1.5 px-2 rounded hover:bg-black/5 cursor-pointer">Sponsors</div>
                  <div className="py-1.5 px-2 rounded hover:bg-black/5 cursor-pointer">Analytics</div>
                  <div className="py-1.5 px-2 rounded hover:bg-black/5 cursor-pointer">Portfolio</div>
                  <div className="py-1.5 px-2 rounded hover:bg-black/5 cursor-pointer">Insights</div>
                  <div className="py-1.5 px-2 text-gray-400 hover:text-black">More &gt;</div>
                </div>
                <div className="mt-6 pt-4 border-t border-black/5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-black/10"></div>
                    <span className="font-mono text-xs">Admin</span>
                  </div>
                </div>
              </div>

              {/* Center - Feed */}
              <div className="p-6 overflow-y-auto">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
                  <Clock className="h-3 w-3" />
                  <span>9:00 AM - IST</span>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                  <div className="font-medium">New Startup Added</div>
                  <div className="text-sm text-gray-700">
                    Check out this innovative AI startup transforming remote work.
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                    <div className="flex-1 bg-gray-100 p-2 rounded text-sm">
                      A: Amazing potential, will sponsor soon.
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                    <div className="flex-1 bg-gray-100 p-2 rounded text-sm">
                      M: +1 for AI integration.
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-black/20 text-xs font-medium"
                    asChild
                  >
                    <Link href="/feed">Join the conversation →</Link>
                  </Button>
                </div>
              </div>

              {/* Right Sidebar - Actions */}
              <div className="bg-gray-50 p-6 border-l border-black/5">
                <h3 className="font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    href="/connect"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition group"
                  >
                    <div className="p-2 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f]">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium group-hover:text-[#1e3a5f]">Connect</div>
                      <div className="text-xs text-gray-500">Find investors</div>
                    </div>
                  </Link>
                  <Link
                    href="/sponsor"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition group"
                  >
                    <div className="p-2 rounded-full bg-[#c6a43f]/10 text-[#c6a43f]">
                      <Crown className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium group-hover:text-[#c6a43f]">Sponsor</div>
                      <div className="text-xs text-gray-500">Boost visibility</div>
                    </div>
                  </Link>
                  <Link
                    href="/track"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition group"
                  >
                    <div className="p-2 rounded-full bg-green-100 text-green-700">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium group-hover:text-green-700">Track</div>
                      <div className="text-xs text-gray-500">Monitor progress</div>
                    </div>
                  </Link>
                </div>
                <div className="mt-6 text-xs text-gray-500 border-t border-black/5 pt-4">
                  <div className="flex items-center gap-2">
                    <Search className="h-3 w-3" /> Find anything
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== WHY UPFORGE ========== */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-12">
            Built for <span className="font-semibold text-[#1e3a5f]">founders</span>, by founders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex p-3 rounded-full bg-[#1e3a5f]/5 mb-4">
                <Users className="h-6 w-6 text-[#1e3a5f]" />
              </div>
              <h3 className="font-semibold mb-2 text-[#1e1b1b]">Founder First</h3>
              <p className="text-sm text-[#4a4a4a]">
                Join a network of serious builders, not just a listing.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex p-3 rounded-full bg-[#1e3a5f]/5 mb-4">
                <TrendingUp className="h-6 w-6 text-[#1e3a5f]" />
              </div>
              <h3 className="font-semibold mb-2 text-[#1e1b1b]">Amplified Visibility</h3>
              <p className="text-sm text-[#4a4a4a]">
                Sponsored startups get social media promotion and prime placement.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex p-3 rounded-full bg-[#1e3a5f]/5 mb-4">
                <Award className="h-6 w-6 text-[#1e3a5f]" />
              </div>
              <h3 className="font-semibold mb-2 text-[#1e1b1b]">Trust & Credibility</h3>
              <p className="text-sm text-[#4a4a4a]">
                Every founder is verified, ensuring a premium directory.
              </p>
            </div>
          </div>
        </section>

        {/* ========== TESTIMONIALS ========== */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-12">
            What our <span className="font-semibold text-[#1e3a5f]">users</span> say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "FLORENT MERIAN",
                role: "DYNAMICSCREEN",
                text: "UpForge helps me track the most promising startups. I feel more connected to the ecosystem than ever.",
              },
              {
                name: "HAMPUS PERSSON",
                role: "VAAM",
                text: "The dashboard is intuitive, clean, and makes startup sponsorship extremely easy.",
              },
              {
                name: "ERIC FETTNER",
                role: "THE JOB SAUCE",
                text: "The platform gives me exactly what I need to make quick, informed decisions without clutter.",
              },
            ].map((t, i) => (
              <div key={i} className="p-6 border border-black/5 rounded-xl hover:shadow-lg transition bg-white">
                <p className="text-sm italic mb-4">“{t.text}”</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div>
                    <div className="font-bold text-sm">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="link" asChild className="text-[#1e3a5f]">
              <Link href="/reviews">Read more reviews →</Link>
            </Button>
          </div>
        </section>

        {/* ========== TEMPLATES ========== */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-4">
            Jumpstart with <span className="font-semibold text-[#1e3a5f]">templates</span>
          </h2>
          <p className="text-center text-gray-500 mb-12">Proven frameworks used by top founders</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Investor Brief", type: "Briefing" },
              { name: "Startup Plan", type: "Planning" },
              { name: "Sponsor Checklist", type: "Checklist" },
              { name: "Weekly Review", type: "Reports" },
            ].map((t, i) => (
              <Link key={i} href={`/templates/${t.name.toLowerCase().replace(" ", "-")}`}>
                <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm hover:shadow-md transition text-center">
                  <div className="text-4xl mb-2">📄</div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.type}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-20 text-center bg-[#1e3a5f] text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 8px)`,
            }}
          />
          <div className="relative max-w-3xl mx-auto px-6">
            <h3 className="text-3xl md:text-4xl font-light mb-4">
              Get Featured on <span className="font-semibold">UpForge</span>
            </h3>
            <p className="text-white/70 mb-8 text-lg">
              Increase visibility, build trust, and reach serious builders across India.
            </p>

            <Link href="/sponsor">
              <Button className="rounded-full px-10 h-14 bg-[#c6a43f] text-white hover:bg-[#b08c2e] text-sm uppercase tracking-widest font-semibold shadow-xl border-0">
                Sponsor Your Startup
              </Button>
            </Link>
          </div>
        </section>

        {/* Tiny footer note */}
        <div className="py-6 text-center text-[10px] tracking-[0.4em] uppercase text-[#4a4a4a] border-t border-[#1e3a5f]/10">
          UpForge · Founder First · 2026
        </div>
      </main>

      <Footer />
    </div>
  )
}
