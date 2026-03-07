// app/best-saas-startups/page.tsx
// ─── TARGET KEYWORDS ──────────────────────────────────────────────────────────
// "best SaaS startups India"          ~18,000/mo
// "top SaaS companies India 2026"     ~11,000/mo
// "SaaS unicorns India"               ~5,400/mo
// "Indian SaaS companies list"        ~7,800/mo
// "SaaS startups India Bengaluru"     ~3,600/mo
// "B2B SaaS companies India"          ~4,100/mo
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight, ExternalLink, BadgeCheck, TrendingUp, Globe, Building2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Best SaaS Startups in India 2026 — Ranked List | UpForge",
  description:
    "The definitive list of India's best SaaS startups in 2026 — Zoho, Freshworks, Chargebee, Darwinbox, Postman and more. 15 SaaS unicorns, $26B market by 2026. Verified by UpForge.",
  keywords: "best SaaS startups India, top SaaS companies India 2026, SaaS unicorns India, Indian SaaS companies list, B2B SaaS India, Zoho, Freshworks, Chargebee, Darwinbox, Postman, BrowserStack, CleverTap, SaaS market India, enterprise software India, SaaS funding India 2026",
  alternates: { canonical: "https://upforge.in/best-saas-startups" },
  openGraph: {
    title: "Best SaaS Startups India 2026 | UpForge",
    description: "India has 15 SaaS unicorns & a $26B market. Verified list of the best B2B SaaS companies — funding, revenue, investors & IPO watch. March 2026.",
    url: "https://upforge.in/best-saas-startups",
    siteName: "UpForge", locale: "en_IN", type: "article",
    images: [{ url: "https://upforge.in/og/best-saas-startups.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", site: "@upforge_in", title: "Best SaaS Startups India 2026 | UpForge", images: ["https://upforge.in/og/best-saas-startups.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
}

const STARTUPS = [
  { rank: 1, name: "Zoho", slug: "zoho", sector: "Full-Stack Business SaaS", stage: "Bootstrapped", funding: "Self-Funded", valuation: "$15B+", founded: 1996, hq: "Chennai", badge: "Bootstrapped", hot: false, website: "https://zoho.com", revenue: "$1B+ ARR", investors: "None — fully bootstrapped", what: "The world's most successful bootstrapped SaaS company. 55+ business apps, 100M+ users, 15,000+ employees. Zoho proved Indian founders don't need VC money to build global category leaders." },
  { rank: 2, name: "Freshworks", slug: "freshworks", sector: "CX & IT Service SaaS", stage: "IPO", funding: "$1.03B pre-IPO", valuation: "~$5B market cap", founded: 2010, hq: "Chennai", badge: "IPO", hot: false, website: "https://freshworks.com", revenue: "$763M FY24", investors: "NASDAQ listed (FRSH)", what: "India's first SaaS company to list on NASDAQ. Full suite for customer support, CRM, and ITSM targeting SMBs. Now adding AI-driven CX products to drive next growth wave." },
  { rank: 3, name: "Chargebee", slug: "chargebee", sector: "Subscription Billing & Revenue Ops", stage: "Series F", funding: "$700M+", valuation: "$3.5B", founded: 2011, hq: "Chennai", badge: "Unicorn", hot: false, website: "https://chargebee.com", revenue: "$100M+ ARR", investors: "Tiger Global, Insight Partners, Steadview", what: "The subscription management layer for thousands of SaaS businesses — billing, invoicing, revenue recognition. Acquired Stripe Billing's enterprise book in 2023 to expand global reach." },
  { rank: 4, name: "BrowserStack", slug: "browserstack", sector: "Developer Tools / QA SaaS", stage: "Series B", funding: "$200M+", valuation: "$3.4B", founded: 2011, hq: "Mumbai", badge: "Unicorn", hot: false, website: "https://browserstack.com", revenue: "$100M+ ARR", investors: "Insight Partners, Bond Capital, Accel", what: "The world's leading cloud web and mobile testing platform — 50,000+ customers including Microsoft, Twitter, and Spotify. Grew to unicorn purely on product-led growth." },
  { rank: 5, name: "Postman", slug: "postman", sector: "API Development Platform", stage: "Series D", funding: "$433M", valuation: "$2B+", founded: 2014, hq: "Bengaluru / SF", badge: "Unicorn", hot: false, website: "https://postman.com", revenue: "100M+ users", investors: "Insight Partners, Nexus Venture Partners, CRV", what: "Started as a Bengaluru side project, now the world's #1 API platform. 100M+ users, 500K+ companies. A textbook product-led growth story from Indian founders." },
  { rank: 6, name: "Darwinbox", slug: "darwinbox", sector: "HR Tech / People Management SaaS", stage: "Series D", funding: "$280M+", valuation: "$1B+", founded: 2015, hq: "Hyderabad", badge: "Unicorn", hot: true, website: "https://darwinbox.com", revenue: "$60M+ ARR", investors: "Microsoft, Salesforce Ventures, Sequoia", what: "Asia-Pacific's fastest-growing HCM platform — serves 1,000+ global enterprises including Samsung, Tokopedia, and Accenture. Backed by Microsoft and Salesforce Ventures." },
  { rank: 7, name: "CleverTap", slug: "clevertap", sector: "Customer Engagement & Analytics SaaS", stage: "Series D", funding: "$182M", valuation: "$1.2B", founded: 2013, hq: "Mumbai", badge: "Unicorn", hot: false, website: "https://clevertap.com", revenue: "$80M+ ARR", investors: "Tiger Global, Sequoia Capital India, CDPQ", what: "Real-time customer engagement platform serving Disney+ Hotstar, Domino's, and Sony. Processes 200B+ data points monthly to power personalised user journeys." },
  { rank: 8, name: "Innovaccer", slug: "innovaccer", sector: "Healthcare Data SaaS", stage: "Series F", funding: "$375M+", valuation: "$3.5B", founded: 2014, hq: "Noida / SF", badge: "Unicorn", hot: false, website: "https://innovaccer.com", revenue: "$100M+ ARR", investors: "General Atlantic, Tiger Global, Steadview", what: "Healthcare data activation platform — unifies patient records across systems to enable value-based care. Serves 40+ of the top US health systems." },
  { rank: 9, name: "LeadSquared", slug: "leadsquared", sector: "CRM / Sales Automation SaaS", stage: "Series C", funding: "$153M", valuation: "$1B+", founded: 2011, hq: "Bengaluru", badge: "Unicorn", hot: false, website: "https://leadsquared.com", revenue: "$50M+ ARR", investors: "Gaja Capital, WestBridge Capital", what: "CRM and marketing automation purpose-built for high-velocity businesses — education, healthcare, financial services. 1,000+ customers across 40 countries." },
  { rank: 10, name: "Kissflow", slug: "kissflow", sector: "No-Code / Low-Code SaaS", stage: "Series A", funding: "$32M", valuation: "$100M+", founded: 2012, hq: "Chennai", badge: "Rising", hot: true, website: "https://kissflow.com", revenue: "$25M+ ARR", investors: "WestBridge Capital", what: "No-code workflow automation platform helping 10,000+ businesses automate approvals, processes, and projects without writing a line of code. 70% YoY growth track record." },
]

const STATS = [
  { v: "15+", l: "Indian SaaS Unicorns" },
  { v: "$26B", l: "India SaaS Market 2026" },
  { v: "26,000+", l: "SaaS Startups in India" },
  { v: "$50B", l: "Projected ARR by 2030" },
]

const BADGE_COLORS: Record<string, string> = {
  "Unicorn": "bg-amber-50 text-amber-800 border border-amber-200",
  "IPO": "bg-sky-50 text-sky-800 border border-sky-200",
  "Bootstrapped": "bg-lime-50 text-lime-800 border border-lime-200",
  "Pre-Unicorn": "bg-emerald-50 text-emerald-800 border border-emerald-200",
  "Rising": "bg-stone-100 text-stone-600 border border-stone-200",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": "https://upforge.in/best-saas-startups", url: "https://upforge.in/best-saas-startups", name: "Best SaaS Startups in India 2026 | UpForge", dateModified: "2026-03-07", isPartOf: { "@type": "WebSite", name: "UpForge", url: "https://upforge.in" }, breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://upforge.in" }, { "@type": "ListItem", position: 2, name: "Best SaaS Startups India 2026", item: "https://upforge.in/best-saas-startups" }] } },
    { "@type": "ItemList", name: "Best SaaS Startups in India 2026", numberOfItems: 10, itemListElement: STARTUPS.map((s, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Organization", name: s.name, description: s.what, url: s.website } })) },
    { "@type": "Article", headline: "Best SaaS Startups in India 2026", author: { "@type": "Organization", name: "UpForge", url: "https://upforge.in" }, datePublished: "2026-01-01", dateModified: "2026-03-07" },
  ],
}

export default function BestSaaSStartupsPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0]" style={{ fontFamily: "'Georgia','Times New Roman',serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fadeUp .5s ease both}
        .fu1{animation-delay:.04s}.fu2{animation-delay:.12s}.fu3{animation-delay:.2s}.fu4{animation-delay:.3s}
        .card:hover{background:white;border-color:#1C1C1C;box-shadow:0 2px 16px rgba(0,0,0,.06)}
        .card{transition:all .15s ease}
      `}</style>

      {/* Breadcrumb */}
      <div className="border-b border-[#D5D0C8] bg-[#F7F5F0]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-1.5" style={{ fontFamily: "system-ui,sans-serif" }}>
          <Link href="/" className="text-[10px] text-[#999] hover:text-[#1C1C1C] uppercase tracking-wider transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#CCC]" />
          <span className="text-[10px] text-[#1C1C1C] font-semibold uppercase tracking-wider">Best SaaS Startups India 2026</span>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pb-20">

        {/* ── HEADER ── */}
        <header className="border-b-2 border-[#1C1C1C] py-10 sm:py-14 fu fu1">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-[#1C1C1C]" />
            <span className="text-[9px] tracking-[0.3em] text-[#888] uppercase" style={{ fontFamily: "system-ui,sans-serif" }}>UpForge Intelligence · March 2026</span>
          </div>
          <h1 className="text-[2.6rem] sm:text-[3.6rem] lg:text-[4.4rem] font-bold leading-[1.0] tracking-tight text-[#1C1C1C] mb-6">
            Best SaaS Startups<br />
            <span className="text-[#A89060] italic">in India</span> — 2026
          </h1>
          <p className="text-[15px] sm:text-base text-[#555] max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "system-ui,sans-serif" }}>
            India is the world's second-largest SaaS ecosystem with <strong className="text-[#1C1C1C]">26,000+ SaaS startups</strong>, <strong className="text-[#1C1C1C]">15 unicorns</strong>, and a projected market of <strong className="text-[#1C1C1C]">$26.4B by 2026</strong>. From bootstrapped giants like Zoho to NASDAQ-listed Freshworks, this verified list ranks India's most consequential B2B software companies.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#1C1C1C] divide-x divide-y sm:divide-y-0 divide-[#1C1C1C]">
            {STATS.map((s, i) => (
              <div key={i} className="px-5 py-4">
                <p className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] leading-none mb-1.5">{s.v}</p>
                <p className="text-[9px] text-[#999] uppercase tracking-[0.18em]" style={{ fontFamily: "system-ui,sans-serif" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </header>

        {/* ── CONTEXT ── */}
        <section className="py-8 border-b border-[#D5D0C8] fu fu2">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Globe, title: "India Builds for the World", body: "Indian SaaS companies serve customers in 150+ countries. Zoho, Freshworks, and Chargebee have proven the model: hire in India, sell globally, compound for decades." },
              { icon: TrendingUp, title: "IPO Supercycle Incoming", body: "2026 will see India's biggest SaaS IPO wave — Fractal Analytics, Capillary, and CleverTap are all preparing for listings on domestic exchanges rather than NASDAQ, signalling a maturing local market." },
              { icon: Building2, title: "Vertical SaaS Rising", body: "The next wave isn't horizontal — it's deep verticals. Healthcare SaaS (Innovaccer), HR SaaS (Darwinbox), and BFSI SaaS (Vymo) are commanding premium valuations because of irreplaceable workflow integration." },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#E2DDD5] p-5">
                <item.icon className="w-4 h-4 text-[#CCC] mb-3" />
                <h2 className="text-[13px] font-bold text-[#1C1C1C] mb-2" style={{ fontFamily: "'Georgia',serif" }}>{item.title}</h2>
                <p className="text-[11.5px] text-[#666] leading-relaxed" style={{ fontFamily: "system-ui,sans-serif" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── RANKED LIST ── */}
        <section className="pt-8 fu fu3">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#888]" style={{ fontFamily: "system-ui,sans-serif" }}>Top 10 · Ranked by Valuation & Global Impact</h2>
            <div className="flex items-center gap-1.5" style={{ fontFamily: "system-ui,sans-serif" }}>
              <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" /></span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">Verified · March 2026</span>
            </div>
          </div>

          <div className="space-y-2">
            {STARTUPS.map((s) => (
              <article key={s.rank} className="card border border-[#E2DDD5] bg-white/70 p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0 w-9 pt-0.5 text-center">
                    <span className="text-[11px] font-mono text-[#CCC]" style={{ fontFamily: "system-ui,sans-serif" }}>{String(s.rank).padStart(2,"0")}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="text-[1.05rem] font-bold text-[#1C1C1C] leading-tight">{s.name}</h3>
                      {s.hot && <span className="text-[7.5px] bg-[#1C1C1C] text-[#E8C547] px-1.5 py-0.5 font-black uppercase tracking-[0.15em]" style={{ fontFamily: "system-ui,sans-serif" }}>🔥 Hot</span>}
                      <span className={`text-[8.5px] px-2 py-0.5 font-bold uppercase tracking-[0.1em] ${BADGE_COLORS[s.badge] || "bg-stone-100 text-stone-600 border border-stone-200"}`} style={{ fontFamily: "system-ui,sans-serif" }}>{s.badge}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-3" style={{ fontFamily: "system-ui,sans-serif" }}>
                      <span className="text-[10px] font-semibold text-[#888] uppercase tracking-wider">{s.sector}</span>
                      <span className="text-[#DDD]">·</span><span className="text-[10px] text-[#AAA]">{s.hq}</span>
                      <span className="text-[#DDD]">·</span><span className="text-[10px] text-[#AAA]">Est. {s.founded}</span>
                    </div>
                    <p className="text-[12.5px] text-[#444] leading-relaxed mb-4" style={{ fontFamily: "system-ui,sans-serif" }}>{s.what}</p>
                    <div className="flex flex-wrap items-end gap-x-5 gap-y-2" style={{ fontFamily: "system-ui,sans-serif" }}>
                      {[
                        { label: "Funding", value: s.funding, cls: "text-[#1C1C1C] font-bold" },
                        { label: "Valuation", value: s.valuation, cls: "text-emerald-700 font-bold" },
                        { label: "Revenue", value: s.revenue, cls: "text-[#555] font-semibold" },
                      ].map((m, i) => (
                        <div key={i}>
                          <span className="text-[8.5px] text-[#BBB] uppercase tracking-wider block mb-0.5">{m.label}</span>
                          <span className={`text-[13px] ${m.cls}`}>{m.value}</span>
                        </div>
                      ))}
                      <div className="flex-1 min-w-[120px]">
                        <span className="text-[8.5px] text-[#BBB] uppercase tracking-wider block mb-0.5">Investors</span>
                        <span className="text-[11.5px] text-[#666]">{s.investors}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex sm:flex-col gap-2">
                    <Link href={`/startup/${s.slug}`} className="inline-flex items-center gap-1 px-3 py-2 bg-[#1C1C1C] text-white text-[9.5px] font-bold uppercase tracking-wider hover:bg-[#333] transition-colors" style={{ fontFamily: "system-ui,sans-serif" }}>
                      Profile <ArrowRight className="w-3 h-3" />
                    </Link>
                    {s.website && (
                      <a href={s.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-2 border border-[#D5D0C8] text-[#888] text-[9.5px] font-bold uppercase tracking-wider hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors" style={{ fontFamily: "system-ui,sans-serif" }}>
                        Site <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Internal nav */}
        <nav className="mt-12 border-t border-[#D5D0C8] pt-8 fu fu4" aria-label="Related startup lists">
          <p className="text-[9px] tracking-[0.24em] uppercase text-[#AAA] mb-4" style={{ fontFamily: "system-ui,sans-serif" }}>More UpForge Lists</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Top AI Startups India", href: "/top-ai-startups" },
              { label: "Indian Startups Overview", href: "/indian-startups" },
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
        <div className="mt-10 bg-[#1C1C1C] p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2"><BadgeCheck className="w-4 h-4 text-[#E8C547]" /><span className="text-[9px] text-white/30 uppercase tracking-[0.22em]" style={{ fontFamily: "system-ui,sans-serif" }}>UpForge Registry</span></div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Building a SaaS startup in India?</h2>
            <p className="text-[12.5px] text-white/50 max-w-sm" style={{ fontFamily: "system-ui,sans-serif" }}>Get verified and listed in India's most trusted independent startup registry. Free forever. Indexed by Google.</p>
          </div>
          <Link href="/submit" className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-[#E8C547] text-[#111] text-sm font-bold tracking-wide hover:bg-[#F5D55A] transition-colors" style={{ fontFamily: "system-ui,sans-serif" }}>
            List Your Startup — Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="mt-6 text-[9.5px] text-[#C8C3BC] leading-relaxed" style={{ fontFamily: "system-ui,sans-serif" }}>* Data sourced from SaaSBoomi, Tracxn, Inc42, public company disclosures as of March 2026. Rankings are editorial. UpForge accepts no paid placements.</p>
      </div>
    </div>
  )
}
