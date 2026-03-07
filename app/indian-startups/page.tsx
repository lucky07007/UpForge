// app/indian-startups/page.tsx
// ─── TARGET KEYWORDS ──────────────────────────────────────────────────────────
// "indian startups"                    ~90,000/mo  ← highest volume
// "startups in India"                  ~74,000/mo
// "Indian startup ecosystem"           ~22,000/mo
// "India startup funding 2026"         ~14,000/mo
// "list of startups in India"          ~18,000/mo
// "new startups in India"              ~12,000/mo
// "startup India 2026"                 ~9,800/mo
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight, BadgeCheck, TrendingUp, Globe, Building2, Zap, Users, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "Indian Startups — Complete Guide to India's Startup Ecosystem 2026 | UpForge",
  description:
    "Everything about Indian startups in 2026 — 650,000+ startups, 126 unicorns, $11.6B raised in 2025. Sector guide, city breakdown, top funded companies, unicorn tracker and more. India's independent startup registry.",
  keywords: "indian startups, startups in India, Indian startup ecosystem 2026, India startup funding, list of startups in India, new startups in India, startup India, Indian unicorns, Bengaluru startups, Mumbai startups, Delhi startup, fintech India, edtech India, healthtech India, SaaS India, AI startups India, startup India DPIIT",
  alternates: { canonical: "https://upforge.in/indian-startups" },
  openGraph: {
    title: "Indian Startups 2026 — Complete Ecosystem Guide | UpForge",
    description: "650,000+ startups. 126 unicorns. $11.6B raised in 2025. The complete guide to India's startup ecosystem — sectors, cities, unicorns, and how to get listed.",
    url: "https://upforge.in/indian-startups",
    siteName: "UpForge", locale: "en_IN", type: "article",
    images: [{ url: "https://upforge.in/og/indian-startups.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", site: "@upforge_in", title: "Indian Startups 2026 | UpForge", images: ["https://upforge.in/og/indian-startups.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
}

const ECOSYSTEM_STATS = [
  { v: "650,000+", l: "DPIIT-Recognized Startups" },
  { v: "126", l: "Unicorns (March 2026)" },
  { v: "$11.6B", l: "Funding Raised in 2025" },
  { v: "3rd", l: "Largest Ecosystem Globally" },
]

const SECTORS = [
  { name: "Fintech", count: "23 unicorns", funding: "$1.6B in 2025", examples: "Razorpay, CRED, Groww, Zepto, PhonePe", color: "bg-blue-50 border-blue-200", tag: "text-blue-700", icon: "💳", why: "India's UPI stack and 900M+ banked citizens create a uniquely captive fintech market. Payments, lending, and wealthtech dominate." },
  { name: "SaaS / Enterprise Tech", count: "15 unicorns", funding: "$1.1B in 2025", examples: "Zoho, Freshworks, Darwinbox, BrowserStack", color: "bg-amber-50 border-amber-200", tag: "text-amber-700", icon: "⚙️", why: "India's engineering talent and English fluency make it the world's SaaS factory. B2B software ships globally from Chennai and Bengaluru." },
  { name: "AI / Deeptech", count: "3 unicorns + growing", funding: "$643M in 2025", examples: "Krutrim, Neysa, Sarvam AI, Fractal", color: "bg-violet-50 border-violet-200", tag: "text-violet-700", icon: "🤖", why: "Government IndiaAI Mission, IIT talent pipeline, and enterprise demand are converging. India's AI story is just beginning." },
  { name: "E-commerce / D2C", count: "18 unicorns", funding: "$800M+ in 2025", examples: "Meesho, Nykaa, Lenskart, FirstCry", color: "bg-rose-50 border-rose-200", tag: "text-rose-700", icon: "🛒", why: "500M internet users and a fast-growing middle class make India the world's most exciting e-commerce growth story — outside China." },
  { name: "Edtech", count: "7 unicorns", funding: "$400M in 2025", examples: "PhysicsWallah, upGrad, Eruditus", color: "bg-emerald-50 border-emerald-200", tag: "text-emerald-700", icon: "📚", why: "350M+ students and massive competitive exam culture drive demand. The post-BYJU's era favours profitability-first models." },
  { name: "Healthtech", count: "6 unicorns", funding: "$500M in 2025", examples: "Qure.ai, Practo, Pristyn Care, 1mg", color: "bg-teal-50 border-teal-200", tag: "text-teal-700", icon: "🏥", why: "Massive underserved market — India has 1 doctor per 1,800 patients. Digital health, diagnostics AI, and telemedicine are filling the gap." },
  { name: "Quick Commerce / Logistics", count: "9 unicorns", funding: "$600M in 2025", examples: "Zepto, Porter, Shiprocket, Delhivery", color: "bg-orange-50 border-orange-200", tag: "text-orange-700", icon: "🚀", why: "India's dark store revolution — Zepto's 10-minute delivery model has been copied globally. Logistics infrastructure is the backbone of the digital economy." },
  { name: "Defence / Deeptech", count: "Emerging", funding: "$311M in H1 2025", examples: "Pixxel, Skyroot, Ideaforge", color: "bg-slate-50 border-slate-200", tag: "text-slate-700", icon: "🛡️", why: "Unprecedented $311M raised in H1 2025 alone. Government's Make-in-India defence push is creating a new category of well-funded hardware startups." },
]

const CITIES = [
  { name: "Bengaluru", unicorns: 52, label: "Silicon Valley of India", detail: "AI, SaaS, Fintech, Deeptech — the undisputed startup capital of India." },
  { name: "Delhi-NCR", unicorns: 40, label: "Policy & Enterprise Hub", detail: "Edtech, logistics, and enterprise tech dominate. Proximity to regulators is a real advantage." },
  { name: "Mumbai", unicorns: 18, label: "FinTech & Media Capital", detail: "BFSI startups, quick commerce, and D2C brands. Raised $8.2M per deal on average in 2025." },
  { name: "Hyderabad", unicorns: 8, label: "Deeptech & Healthcare", detail: "Darwinbox, Qure.ai (Mumbai-founded, Hyd-ops), and strong pharma-adjacent startups." },
  { name: "Pune", unicorns: 8, label: "Product-First Culture", detail: "Engineering-led startups with strong product culture. Growing quickly as Bengaluru overflows." },
  { name: "Chennai", unicorns: 5, label: "SaaS Origin City", detail: "Freshworks, Zoho, Chargebee — Chennai is where Indian SaaS was invented." },
]

const TOP_FUNDED = [
  { name: "Ola Cabs", funding: "$3.8B", sector: "Mobility" },
  { name: "OYO (PRISM)", funding: "$3.7B", sector: "Hospitality" },
  { name: "Zepto", funding: "$2.5B", sector: "Quick Commerce" },
  { name: "Lenskart", funding: "$1.8B", sector: "D2C / Eyewear" },
  { name: "Meesho", funding: "$1.6B", sector: "Social Commerce" },
  { name: "CRED", funding: "$1.4B", sector: "Fintech" },
  { name: "Razorpay", funding: "$1.4B", sector: "Payments" },
  { name: "Groww", funding: "$1.2B", sector: "WealthTech" },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": "https://upforge.in/indian-startups", url: "https://upforge.in/indian-startups", name: "Indian Startups — Complete Ecosystem Guide 2026 | UpForge", description: "Complete guide to India's startup ecosystem: 650K+ startups, 126 unicorns, sector breakdown, city guide, and top funded companies.", dateModified: "2026-03-07", isPartOf: { "@type": "WebSite", name: "UpForge", url: "https://upforge.in" }, breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://upforge.in" }, { "@type": "ListItem", position: 2, name: "Indian Startups", item: "https://upforge.in/indian-startups" }] } },
    { "@type": "Article", headline: "Indian Startups 2026 — Complete Ecosystem Guide", author: { "@type": "Organization", name: "UpForge", url: "https://upforge.in" }, datePublished: "2026-01-01", dateModified: "2026-03-07", description: "Everything you need to know about India's startup ecosystem in 2026." },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "How many startups are in India?", acceptedAnswer: { "@type": "Answer", text: "As of March 2026, India has over 650,000 DPIIT-recognized startups — the third-largest startup ecosystem in the world after the US and China." } },
      { "@type": "Question", name: "How many unicorns are in India?", acceptedAnswer: { "@type": "Answer", text: "India has 126 unicorns as of March 2026, with Neysa being the most recent (February 2026). India is third globally in unicorn count behind the US and China." } },
      { "@type": "Question", name: "Which city has the most startups in India?", acceptedAnswer: { "@type": "Answer", text: "Bengaluru leads with 52 unicorns and the highest deal volume. It is followed by Delhi-NCR (40 unicorns) and Mumbai (18 unicorns)." } },
    ]}
  ],
}

export default function IndianStartupsPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0]" style={{ fontFamily: "'Georgia','Times New Roman',serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp .5s ease both}
        .fu1{animation-delay:.04s}.fu2{animation-delay:.1s}.fu3{animation-delay:.18s}.fu4{animation-delay:.26s}.fu5{animation-delay:.34s}.fu6{animation-delay:.42s}
      `}</style>

      {/* Breadcrumb */}
      <div className="border-b border-[#D5D0C8] bg-[#F7F5F0]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-1.5" style={{ fontFamily: "system-ui,sans-serif" }}>
          <Link href="/" className="text-[10px] text-[#999] hover:text-[#1C1C1C] uppercase tracking-wider transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#CCC]" />
          <span className="text-[10px] text-[#1C1C1C] font-semibold uppercase tracking-wider">Indian Startups</span>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pb-24">

        {/* ── HEADER ── */}
        <header className="border-b-2 border-[#1C1C1C] py-10 sm:py-14 fu fu1">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-[#1C1C1C]" />
            <span className="text-[9px] tracking-[0.3em] text-[#888] uppercase" style={{ fontFamily: "system-ui,sans-serif" }}>UpForge Intelligence · March 2026</span>
          </div>
          <h1 className="text-[2.6rem] sm:text-[3.6rem] lg:text-[4.4rem] font-bold leading-[1.0] tracking-tight text-[#1C1C1C] mb-6">
            Indian Startups<br />
            <span className="text-[#A89060] italic">The Complete Guide</span> — 2026
          </h1>
          <p className="text-[15px] sm:text-base text-[#555] max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "system-ui,sans-serif" }}>
            India is the world's third-largest startup ecosystem — <strong className="text-[#1C1C1C]">650,000+ DPIIT-recognized startups</strong>, <strong className="text-[#1C1C1C]">126 unicorns</strong>, and <strong className="text-[#1C1C1C]">$11.6B raised in 2025</strong>. This is the authoritative reference to understanding what's being built, where, by whom, and what's next.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#1C1C1C] divide-x divide-y sm:divide-y-0 divide-[#1C1C1C]">
            {ECOSYSTEM_STATS.map((s, i) => (
              <div key={i} className="px-5 py-4">
                <p className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] leading-none mb-1.5">{s.v}</p>
                <p className="text-[9px] text-[#999] uppercase tracking-[0.18em]" style={{ fontFamily: "system-ui,sans-serif" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </header>

        {/* ── SECTOR BREAKDOWN ── */}
        <section className="py-10 border-b border-[#D5D0C8] fu fu2">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-4 h-4 text-[#999]" />
            <h2 className="text-base font-bold text-[#1C1C1C]">Sector Breakdown</h2>
            <span className="text-[9px] text-[#AAA] uppercase tracking-wider ml-1" style={{ fontFamily: "system-ui,sans-serif" }}>Where India's startup capital flows</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {SECTORS.map((s, i) => (
              <div key={i} className={`border ${s.color} p-4 bg-white`}>
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">{s.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[13px] font-bold text-[#1C1C1C]">{s.name}</h3>
                      <span className={`text-[8px] font-bold uppercase tracking-wider ${s.tag}`} style={{ fontFamily: "system-ui,sans-serif" }}>{s.count}</span>
                    </div>
                    <p className="text-[11px] text-[#666] leading-relaxed mb-2" style={{ fontFamily: "system-ui,sans-serif" }}>{s.why}</p>
                    <div className="flex items-center gap-3" style={{ fontFamily: "system-ui,sans-serif" }}>
                      <span className="text-[9px] text-[#AAA]">Funding: <strong className="text-[#555]">{s.funding}</strong></span>
                      <span className="text-[#DDD]">·</span>
                      <span className="text-[9px] text-[#AAA] truncate">eg: {s.examples}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CITY GUIDE ── */}
        <section className="py-10 border-b border-[#D5D0C8] fu fu3">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-4 h-4 text-[#999]" />
            <h2 className="text-base font-bold text-[#1C1C1C]">Startup Cities of India</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CITIES.map((c, i) => (
              <div key={i} className="bg-white border border-[#E2DDD5] p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[14px] font-bold text-[#1C1C1C]">{c.name}</h3>
                  <div className="text-right">
                    <span className="text-[18px] font-bold text-[#1C1C1C] leading-none">{c.unicorns}</span>
                    <span className="text-[8px] text-[#AAA] uppercase tracking-wider block" style={{ fontFamily: "system-ui,sans-serif" }}>Unicorns</span>
                  </div>
                </div>
                <p className="text-[9.5px] font-bold text-[#E8C547] uppercase tracking-wider mb-1.5" style={{ fontFamily: "system-ui,sans-serif" }}>{c.label}</p>
                <p className="text-[11px] text-[#666] leading-relaxed" style={{ fontFamily: "system-ui,sans-serif" }}>{c.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TOP FUNDED ── */}
        <section className="py-10 border-b border-[#D5D0C8] fu fu4">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-4 h-4 text-[#999]" />
            <h2 className="text-base font-bold text-[#1C1C1C]">Most Funded Indian Startups</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {TOP_FUNDED.map((s, i) => (
              <div key={i} className="bg-white border border-[#E2DDD5] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-[#DDD] w-5" style={{ fontFamily: "system-ui,sans-serif" }}>{String(i+1).padStart(2,"0")}</span>
                  <div>
                    <p className="text-[13px] font-bold text-[#1C1C1C] leading-tight">{s.name}</p>
                    <p className="text-[9.5px] text-[#999] uppercase tracking-wider" style={{ fontFamily: "system-ui,sans-serif" }}>{s.sector}</p>
                  </div>
                </div>
                <span className="text-[14px] font-bold text-emerald-700" style={{ fontFamily: "system-ui,sans-serif" }}>{s.funding}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2026 TRENDS ── */}
        <section className="py-10 border-b border-[#D5D0C8] fu fu5">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-4 h-4 text-[#999]" />
            <h2 className="text-base font-bold text-[#1C1C1C]">Key Trends Shaping India's Startup Story in 2026</h2>
          </div>
          <div className="space-y-3">
            {[
              { num: "01", title: "IPO Supercycle", body: "More than 18 Indian startups went public in 2025. 2026 will see the second wave — Groww, Zerodha, and multiple SaaS companies are in the pipeline. Public markets are now a viable and preferred exit route." },
              { num: "02", title: "Profitability Over Growth", body: "Over one-third of Indian startups chose runway extension over fundraising in 2025. The 'grow at all costs' era is over. Investors now ask for EBITDA visibility as a baseline expectation at every stage." },
              { num: "03", title: "Reverse Flips", body: "Indian startups that had incorporated in Singapore or Delaware are moving their legal domicile back to India. Listing domestically is no longer a compromise — it's the smartest path for many." },
              { num: "04", title: "Tier-2 City Surge", body: "Jaipur, Indore, Kochi, Chandigarh — Tier-2 cities saw 45% YoY growth in startup registrations in 2025. The next generation of Indian founders is not from Bengaluru." },
              { num: "05", title: "AI from Experimentation to Accountability", body: "2026 will separate defensible AI businesses from surface-level wrappers. Startups that show measurable ROI from AI — not just a product with 'AI inside' — will attract capital." },
              { num: "06", title: "Defence Tech Breakthrough", body: "$311M raised by defence tech startups in H1 2025 alone — an unprecedented figure. The Make-in-India defence push is creating a funded hardware startup category for the first time." },
            ].map((t) => (
              <div key={t.num} className="bg-white border border-[#E2DDD5] p-5 flex gap-4">
                <span className="flex-shrink-0 text-[11px] font-mono font-bold text-[#DDD] mt-0.5" style={{ fontFamily: "system-ui,sans-serif" }}>{t.num}</span>
                <div>
                  <h3 className="text-[13px] font-bold text-[#1C1C1C] mb-1.5" style={{ fontFamily: "'Georgia',serif" }}>{t.title}</h3>
                  <p className="text-[12px] text-[#555] leading-relaxed" style={{ fontFamily: "system-ui,sans-serif" }}>{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ (also indexed by Google as rich result) */}
        <section className="py-10 border-b border-[#D5D0C8] fu fu6">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-4 h-4 text-[#999]" />
            <h2 className="text-base font-bold text-[#1C1C1C]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "How many startups are in India?", a: "India has over 650,000 DPIIT-recognized startups as of March 2026, making it the world's third-largest startup ecosystem after the US and China." },
              { q: "How many unicorns are in India?", a: "India has 126 unicorns as of March 2026. The most recent is Neysa (February 2026), an AI cloud company. India is third globally in unicorn count." },
              { q: "Which is India's startup capital?", a: "Bengaluru, with 52 unicorns and the highest deal volume, is India's undisputed startup capital — followed by Delhi-NCR (40 unicorns) and Mumbai (18 unicorns)." },
              { q: "How do I list my startup on UpForge?", a: "Listing on UpForge is completely free. Visit upforge.in/submit, fill in your startup details, and get independently verified, publicly indexed, and added to India's trusted registry." },
            ].map((f, i) => (
              <details key={i} className="bg-white border border-[#E2DDD5] group">
                <summary className="px-5 py-4 text-[13px] font-bold text-[#1C1C1C] cursor-pointer list-none flex items-center justify-between hover:bg-[#FAFAF8] transition-colors">
                  {f.q}
                  <ChevronRight className="w-4 h-4 text-[#CCC] group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-5 pb-4 border-t border-[#EEEAE3]">
                  <p className="text-[12.5px] text-[#555] leading-relaxed pt-3" style={{ fontFamily: "system-ui,sans-serif" }}>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Internal nav */}
        <nav className="mt-10 pt-6 border-t border-[#D5D0C8]" aria-label="Related startup lists">
          <p className="text-[9px] tracking-[0.24em] uppercase text-[#AAA] mb-4" style={{ fontFamily: "system-ui,sans-serif" }}>Explore More on UpForge</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Top AI Startups India", href: "/top-ai-startups" },
              { label: "Best SaaS Startups", href: "/best-saas-startups" },
              { label: "Indian Unicorns 2026", href: "/indian-unicorns" },
              { label: "Top Funded Startups", href: "/top-funded-startups" },
              { label: "Browse All Startups", href: "/startup" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#D5D0C8] text-[10px] text-[#666] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors bg-white" style={{ fontFamily: "system-ui,sans-serif" }}>
                {l.label} <ChevronRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </nav>

        {/* CTA */}
        <div className="mt-8 bg-[#1C1C1C] p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2"><BadgeCheck className="w-4 h-4 text-[#E8C547]" /><span className="text-[9px] text-white/30 uppercase tracking-[0.22em]" style={{ fontFamily: "system-ui,sans-serif" }}>UpForge Registry</span></div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Your startup belongs in this list.</h2>
            <p className="text-[12.5px] text-white/50 max-w-sm" style={{ fontFamily: "system-ui,sans-serif" }}>Get independently verified and listed in India's most trusted startup registry. Free forever. Google-indexed. Trusted by founders and investors.</p>
          </div>
          <Link href="/submit" className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-[#E8C547] text-[#111] text-sm font-bold tracking-wide hover:bg-[#F5D55A] transition-colors" style={{ fontFamily: "system-ui,sans-serif" }}>
            List Your Startup — Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="mt-6 text-[9.5px] text-[#C8C3BC] leading-relaxed" style={{ fontFamily: "system-ui,sans-serif" }}>
          * Statistics sourced from Tracxn, Inc42, DPIIT, Growthlist, and public company disclosures as of March 2026.
        </p>
      </div>
    </div>
  )
}
