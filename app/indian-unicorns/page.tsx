// app/indian-unicorns/page.tsx
// ─── TARGET KEYWORDS ──────────────────────────────────────────────────────────
// "Indian unicorns"                    ~28,000/mo
// "unicorn startups India 2026"        ~19,000/mo
// "India unicorn list"                 ~14,500/mo
// "billion dollar startups India"      ~6,200/mo
// "how many unicorns in India 2026"    ~8,100/mo
// "newest unicorn India"               ~4,400/mo
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight, BadgeCheck, TrendingUp, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Indian Unicorns 2026 — All 126 Billion-Dollar Startups | UpForge",
  description:
    "Complete list of all 126 Indian unicorns in 2026 — valuations, sectors, funding, key investors, and the newest entrants. India is third globally with $185B+ in combined unicorn value. Updated March 2026.",
  keywords: "Indian unicorns 2026, unicorn startups India, India unicorn list, billion dollar startups India, how many unicorns India, newest Indian unicorn, Neysa unicorn, Juspay unicorn, Razorpay, CRED, Zepto, Groww unicorn, Indian startup valuation, soonicorn India, decacorn India",
  alternates: { canonical: "https://upforge.in/indian-unicorns" },
  openGraph: {
    title: "Indian Unicorns 2026 — All 126 Billion-Dollar Startups | UpForge",
    description: "India's complete unicorn tracker — 126 startups valued at $1B+, newest entrants, sector breakdown, city guide & investor intelligence. March 2026.",
    url: "https://upforge.in/indian-unicorns",
    siteName: "UpForge", locale: "en_IN", type: "article",
    images: [{ url: "https://upforge.in/og/indian-unicorns.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", site: "@upforge_in", title: "Indian Unicorns 2026 | UpForge", images: ["https://upforge.in/og/indian-unicorns.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
}

const UNICORNS = [
  { name: "Flipkart", valuation: "$37.6B", sector: "E-commerce", hq: "Bengaluru", year: 2012, investors: "Walmart, SoftBank, Tiger Global", status: "Active" },
  { name: "OYO (PRISM)", valuation: "$9B", sector: "Hospitality", hq: "Delhi", year: 2018, investors: "SoftBank, Airbnb, Sequoia", status: "Active" },
  { name: "Dream11", valuation: "$8B", sector: "Fantasy Gaming", hq: "Mumbai", year: 2019, investors: "Tiger Global, Steadview, TPG", status: "Active" },
  { name: "Zerodha", valuation: "$8.2B", sector: "Stock Broking", hq: "Bengaluru", year: 2020, investors: "Bootstrapped", status: "Profitable" },
  { name: "Razorpay", valuation: "$7.5B", sector: "Payments", hq: "Bengaluru", year: 2020, investors: "Sequoia, Tiger Global, GIC", status: "Active" },
  { name: "Zepto", valuation: "$5.9B", sector: "Quick Commerce", hq: "Mumbai", year: 2022, investors: "StepStone, Nexus, Y Combinator", status: "Hot" },
  { name: "Groww", valuation: "$7B", sector: "WealthTech", hq: "Bengaluru", year: 2021, investors: "Tiger Global, Sequoia, YC", status: "IPO-bound" },
  { name: "CRED", valuation: "$6.4B", sector: "Fintech", hq: "Bengaluru", year: 2021, investors: "DST Global, Tiger Global, Sequoia", status: "Active" },
  { name: "Meesho", valuation: "$3.9B", sector: "Social Commerce", hq: "Bengaluru", year: 2021, investors: "SoftBank, Naspers, Prosus", status: "IPO-bound" },
  { name: "PhysicsWallah", valuation: "$2.8B", sector: "EdTech", hq: "Noida", year: 2022, investors: "GSV Ventures, WestBridge", status: "Active" },
  { name: "Nykaa", valuation: "$2.5B", sector: "D2C Beauty", hq: "Mumbai", year: 2018, investors: "TPG, Steadview — IPO 2021", status: "Listed" },
  { name: "Darwinbox", valuation: "$1B+", sector: "HR SaaS", hq: "Hyderabad", year: 2023, investors: "Microsoft, Salesforce Ventures", status: "Hot" },
  { name: "Juspay", valuation: "$1.24B", sector: "Payments Infra", hq: "Bengaluru", year: 2026, investors: "Kedaara Capital, SBI", status: "Newest 2026" },
  { name: "Neysa", valuation: "$1B+", sector: "AI Cloud / GPU", hq: "Bengaluru", year: 2026, investors: "Blackstone", status: "Newest 2026" },
  { name: "Raise (Dhan)", valuation: "$1.2B", sector: "WealthTech", hq: "Mumbai", year: 2025, investors: "Hornbill Capital, MUFG", status: "2025 Entry" },
]

const SECTOR_DIST = [
  { sector: "Fintech", count: 26, pct: 21 },
  { sector: "E-commerce / D2C", count: 18, pct: 14 },
  { sector: "SaaS / Enterprise Tech", count: 15, pct: 12 },
  { sector: "AI / Deeptech", count: 12, pct: 9 },
  { sector: "Logistics", count: 9, pct: 7 },
  { sector: "EdTech", count: 7, pct: 6 },
  { sector: "HealthTech", count: 6, pct: 5 },
  { sector: "Gaming", count: 5, pct: 4 },
  { sector: "Other", count: 28, pct: 22 },
]

const STATUS_COLORS: Record<string, string> = {
  "Active": "bg-stone-100 text-stone-600 border border-stone-200",
  "Hot": "bg-amber-50 text-amber-800 border border-amber-200",
  "Listed": "bg-sky-50 text-sky-800 border border-sky-200",
  "IPO-bound": "bg-blue-50 text-blue-800 border border-blue-200",
  "Profitable": "bg-emerald-50 text-emerald-800 border border-emerald-200",
  "Newest 2026": "bg-violet-50 text-violet-800 border border-violet-200",
  "2025 Entry": "bg-teal-50 text-teal-800 border border-teal-200",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": "https://upforge.in/indian-unicorns", url: "https://upforge.in/indian-unicorns", name: "Indian Unicorns 2026 — All 126 Billion-Dollar Startups | UpForge", dateModified: "2026-03-07", isPartOf: { "@type": "WebSite", name: "UpForge", url: "https://upforge.in" }, breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://upforge.in" }, { "@type": "ListItem", position: 2, name: "Indian Unicorns 2026", item: "https://upforge.in/indian-unicorns" }] } },
    { "@type": "Article", headline: "Indian Unicorns 2026 — All 126 Billion-Dollar Startups", author: { "@type": "Organization", name: "UpForge", url: "https://upforge.in" }, datePublished: "2026-01-01", dateModified: "2026-03-07" },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "How many unicorns are there in India in 2026?", acceptedAnswer: { "@type": "Answer", text: "India has 126 unicorns as of March 2026. Neysa (AI cloud, Feb 2026) and Juspay (payments, Jan 2026) are the most recent entrants." } },
      { "@type": "Question", name: "Which is India's most valuable unicorn?", acceptedAnswer: { "@type": "Answer", text: "Flipkart, valued at ~$37.6B, is India's most valuable unicorn startup. OYO (~$9B) and Dream11 (~$8B) follow closely." } },
      { "@type": "Question", name: "What is a soonicorn in India?", acceptedAnswer: { "@type": "Answer", text: "A soonicorn is a startup widely expected to reach $1B valuation within the next 1-2 years. India has dozens of identified soonicorns in AI, fintech, and healthtech." } },
    ]},
  ],
}

export default function IndianUnicornsPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0]" style={{ fontFamily: "'Georgia','Times New Roman',serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp .5s ease both}
        .fu1{animation-delay:.04s}.fu2{animation-delay:.12s}.fu3{animation-delay:.2s}.fu4{animation-delay:.28s}.fu5{animation-delay:.36s}
        .urow:hover{background:white;border-color:#1C1C1C}
        .urow{transition:all .14s ease}
      `}</style>

      <div className="border-b border-[#D5D0C8] bg-[#F7F5F0]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-1.5" style={{ fontFamily: "system-ui,sans-serif" }}>
          <Link href="/" className="text-[10px] text-[#999] hover:text-[#1C1C1C] uppercase tracking-wider">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#CCC]" />
          <Link href="/indian-startups" className="text-[10px] text-[#999] hover:text-[#1C1C1C] uppercase tracking-wider">Indian Startups</Link>
          <ChevronRight className="w-3 h-3 text-[#CCC]" />
          <span className="text-[10px] text-[#1C1C1C] font-semibold uppercase tracking-wider">Indian Unicorns 2026</span>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pb-20">

        {/* HEADER */}
        <header className="border-b-2 border-[#1C1C1C] py-10 sm:py-14 fu fu1">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-[#1C1C1C]" />
            <span className="text-[9px] tracking-[0.3em] text-[#888] uppercase" style={{ fontFamily: "system-ui,sans-serif" }}>UpForge Intelligence · March 2026</span>
          </div>
          <h1 className="text-[2.6rem] sm:text-[3.6rem] lg:text-[4.4rem] font-bold leading-[1.0] tracking-tight text-[#1C1C1C] mb-6">
            Indian Unicorns<br />
            <span className="text-[#A89060] italic">126 Billion-Dollar Startups</span> — 2026
          </h1>
          <p className="text-[15px] sm:text-base text-[#555] max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "system-ui,sans-serif" }}>
            India has minted <strong className="text-[#1C1C1C]">126 unicorns</strong> — privately held startups valued at $1B or more — making it the world's third-largest unicorn ecosystem with <strong className="text-[#1C1C1C]">$185B+ in combined valuation</strong>. The newest entrant is Neysa, an AI GPU cloud company backed by Blackstone, which crossed $1B in February 2026.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#1C1C1C] divide-x divide-y sm:divide-y-0 divide-[#1C1C1C]">
            {[
              { v: "126", l: "Unicorns in India" },
              { v: "$185B+", l: "Combined Valuation" },
              { v: "2", l: "New Unicorns in 2026" },
              { v: "3rd", l: "Globally by Count" },
            ].map((s, i) => (
              <div key={i} className="px-5 py-4">
                <p className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] leading-none mb-1.5">{s.v}</p>
                <p className="text-[9px] text-[#999] uppercase tracking-[0.18em]" style={{ fontFamily: "system-ui,sans-serif" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </header>

        {/* NEWEST 2026 SPOTLIGHT */}
        <section className="py-8 border-b border-[#D5D0C8] fu fu2">
          <p className="text-[9px] tracking-[0.24em] uppercase text-[#AAA] mb-4" style={{ fontFamily: "system-ui,sans-serif" }}>New in 2026</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { name: "Neysa", date: "February 16, 2026", funding: "$600M Series B", led: "Blackstone", val: "$1B+", what: "AI acceleration cloud — GPU-as-a-Service, MLOps, and inference infrastructure. India's newest AI unicorn." },
              { name: "Juspay", date: "April 7, 2025", funding: "$45M Series D", led: "Kedaara Capital", val: "$1.24B", what: "Payments infrastructure processing 300M daily transactions across 500+ global enterprises and banks." },
            ].map((u, i) => (
              <div key={i} className="bg-[#1C1C1C] p-5 relative overflow-hidden">
                <div className="h-0.5 absolute top-0 left-0 right-0 bg-gradient-to-r from-[#B8941E] via-[#E8C547] to-[#B8941E]" />
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-3.5 h-3.5 text-[#E8C547]" />
                  <span className="text-[8px] text-[#E8C547] font-black uppercase tracking-[0.2em]" style={{ fontFamily: "system-ui,sans-serif" }}>New Unicorn · {u.date}</span>
                </div>
                <h3 className="text-[1.2rem] font-bold text-white mb-1">{u.name}</h3>
                <p className="text-[11.5px] text-white/50 leading-relaxed mb-3" style={{ fontFamily: "system-ui,sans-serif" }}>{u.what}</p>
                <div className="flex gap-4" style={{ fontFamily: "system-ui,sans-serif" }}>
                  <div><span className="text-[8px] text-white/25 uppercase tracking-wider block">Round</span><span className="text-[12px] font-bold text-white">{u.funding}</span></div>
                  <div><span className="text-[8px] text-white/25 uppercase tracking-wider block">Led by</span><span className="text-[12px] font-bold text-[#E8C547]">{u.led}</span></div>
                  <div><span className="text-[8px] text-white/25 uppercase tracking-wider block">Valuation</span><span className="text-[12px] font-bold text-white">{u.val}</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTOR DISTRIBUTION */}
        <section className="py-8 border-b border-[#D5D0C8] fu fu3">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4 text-[#999]" />
            <h2 className="text-base font-bold text-[#1C1C1C]">Unicorns by Sector</h2>
          </div>
          <div className="space-y-2">
            {SECTOR_DIST.map((s) => (
              <div key={s.sector} className="flex items-center gap-3 bg-white border border-[#E2DDD5] px-4 py-2.5">
                <span className="text-[12px] font-semibold text-[#1C1C1C] w-36 flex-shrink-0">{s.sector}</span>
                <div className="flex-1 h-2 bg-[#F0EDE8] overflow-hidden">
                  <div className="h-full bg-[#1C1C1C] transition-all" style={{ width: `${s.pct}%` }} />
                </div>
                <span className="text-[11px] font-bold text-[#1C1C1C] w-8 text-right flex-shrink-0" style={{ fontFamily: "system-ui,sans-serif" }}>{s.count}</span>
              </div>
            ))}
          </div>
        </section>

        {/* UNICORN TABLE — top 15 */}
        <section className="pt-8 fu fu4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#888]" style={{ fontFamily: "system-ui,sans-serif" }}>Featured Unicorns — Top Valuations</h2>
            <div className="flex items-center gap-1.5" style={{ fontFamily: "system-ui,sans-serif" }}>
              <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" /></span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">Live · March 2026</span>
            </div>
          </div>
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[1fr_100px_100px_80px] gap-2 px-4 py-2 bg-[#1C1C1C] mb-1">
            {["Company / Sector", "Valuation", "Joined", "Status"].map((h) => (
              <span key={h} className="text-[8px] font-black uppercase tracking-[0.18em] text-white/40" style={{ fontFamily: "system-ui,sans-serif" }}>{h}</span>
            ))}
          </div>
          <div className="space-y-1">
            {UNICORNS.map((u, i) => (
              <div key={i} className="urow border border-[#E2DDD5] bg-white/70 px-4 py-3 grid sm:grid-cols-[1fr_100px_100px_80px] gap-2 items-center">
                <div>
                  <p className="text-[13px] font-bold text-[#1C1C1C] leading-tight">{u.name}</p>
                  <p className="text-[9px] text-[#AAA] uppercase tracking-wider mt-0.5" style={{ fontFamily: "system-ui,sans-serif" }}>{u.sector} · {u.hq}</p>
                </div>
                <span className="text-[13px] font-bold text-emerald-700" style={{ fontFamily: "system-ui,sans-serif" }}>{u.valuation}</span>
                <span className="text-[11px] text-[#888]" style={{ fontFamily: "system-ui,sans-serif" }}>{u.year}</span>
                <span className={`text-[8px] px-2 py-0.5 font-bold uppercase tracking-[0.1em] inline-block ${STATUS_COLORS[u.status] || "bg-stone-100 text-stone-600"}`} style={{ fontFamily: "system-ui,sans-serif" }}>{u.status}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-[#AAA] italic" style={{ fontFamily: "system-ui,sans-serif" }}>
            Showing 15 of 126 Indian unicorns. Full list updated quarterly.
          </p>
        </section>

        {/* Internal nav */}
        <nav className="mt-12 border-t border-[#D5D0C8] pt-8 fu fu5" aria-label="Related startup lists">
          <p className="text-[9px] tracking-[0.24em] uppercase text-[#AAA] mb-4" style={{ fontFamily: "system-ui,sans-serif" }}>More UpForge Lists</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Top AI Startups India", href: "/top-ai-startups" },
              { label: "Best SaaS Startups", href: "/best-saas-startups" },
              { label: "Indian Startups Guide", href: "/indian-startups" },
              { label: "Top Funded Startups", href: "/top-funded-startups" },
              { label: "Browse All Startups", href: "/startup" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#D5D0C8] text-[10px] text-[#666] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors bg-white" style={{ fontFamily: "system-ui,sans-serif" }}>
                {l.label} <ChevronRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </nav>

        <div className="mt-8 bg-[#1C1C1C] p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2"><BadgeCheck className="w-4 h-4 text-[#E8C547]" /><span className="text-[9px] text-white/30 uppercase tracking-[0.22em]" style={{ fontFamily: "system-ui,sans-serif" }}>UpForge Registry</span></div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Aiming for unicorn status?</h2>
            <p className="text-[12.5px] text-white/50 max-w-sm" style={{ fontFamily: "system-ui,sans-serif" }}>Start with a verified public profile. List your startup in India's most trusted independent registry — free, forever.</p>
          </div>
          <Link href="/submit" className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-[#E8C547] text-[#111] text-sm font-bold tracking-wide hover:bg-[#F5D55A] transition-colors" style={{ fontFamily: "system-ui,sans-serif" }}>
            List Your Startup — Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="mt-6 text-[9.5px] text-[#C8C3BC] leading-relaxed" style={{ fontFamily: "system-ui,sans-serif" }}>
          * Valuations based on last disclosed funding round. Sources: Tracxn, Inc42, Hurun India, public disclosures. March 2026.
        </p>
      </div>
    </div>
  )
}
