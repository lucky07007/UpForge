// app/top-ai-startups/page.tsx
// ─── TARGET KEYWORDS ──────────────────────────────────────────────────────────
// "top AI startups India"           ~22,000/mo
// "best AI companies India 2026"    ~9,500/mo
// "AI startups India list"          ~8,200/mo
// "Indian AI unicorns"              ~4,400/mo
// "generative AI startups India"    ~5,100/mo
// "AI startup India Bengaluru"      ~3,800/mo
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight, ExternalLink, BadgeCheck, TrendingUp, Zap, Brain } from "lucide-react"

export const metadata: Metadata = {
  title: "Top AI Startups in India 2026 — Verified List | UpForge",
  description:
    "India's definitive list of top AI startups in 2026 — Krutrim, Sarvam AI, Neysa, Qure.ai and more. Verified funding, valuations, investors & sector breakdown. Updated March 2026.",
  keywords: "top AI startups India, best AI companies India 2026, AI startups India list, Indian AI unicorns, generative AI India, Krutrim AI, Sarvam AI, Neysa startup, AI funding India 2026, deeptech startups India, enterprise AI India, sovereign LLM India, IndiaAI Mission startups, machine learning companies India",
  alternates: { canonical: "https://upforge.in/top-ai-startups" },
  openGraph: {
    title: "Top AI Startups in India 2026 | UpForge",
    description: "Verified, ranked list of India's most funded & impactful AI companies — funding data, investors & sector intelligence. March 2026.",
    url: "https://upforge.in/top-ai-startups",
    siteName: "UpForge", locale: "en_IN", type: "article",
    images: [{ url: "https://upforge.in/og/top-ai-startups.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", site: "@upforge_in", title: "Top AI Startups India 2026 | UpForge", images: ["https://upforge.in/og/top-ai-startups.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 } },
}

const STARTUPS = [
  { rank: 1, name: "Krutrim AI", slug: "krutrim-ai", sector: "AI Infrastructure", stage: "Series B", funding: "$383M", valuation: "$1B+", founded: 2022, hq: "Bengaluru", badge: "Unicorn", hot: true, website: "https://krutrim.com", investors: "Aditya Birla Group, Matrix Partners", what: "India's first AI unicorn — building sovereign LLMs, GPU cloud, and Kruti agentic assistant supporting 13 Indian languages. Deployed India's first GB200 system with Nvidia." },
  { rank: 2, name: "Neysa", slug: "neysa", sector: "AI Cloud / GPU-as-a-Service", stage: "Series B", funding: "$600M", valuation: "$1B+", founded: 2023, hq: "Bengaluru", badge: "Unicorn 2026", hot: true, website: "https://neysa.ai", investors: "Blackstone", what: "India's newest AI unicorn (Feb 2026) — AI-native GPU cloud offering GPU-as-a-Service, AI Platform-as-a-Service, and inference infrastructure. Backed by Blackstone." },
  { rank: 3, name: "Sarvam AI", slug: "sarvam-ai", sector: "Sovereign LLM", stage: "Series A", funding: "$53M", valuation: "$200M+", founded: 2023, hq: "Bengaluru", badge: "Gov-Backed", hot: true, website: "https://sarvam.ai", investors: "Lightspeed, Peak XV, Khosla Ventures", what: "Selected by India's government under the IndiaAI Mission to build a sovereign LLM. Unveiled Sarvam-30B and Sarvam-105B at India AI Impact Summit 2026." },
  { rank: 4, name: "Fractal Analytics", slug: "fractal-analytics", sector: "Enterprise AI / Decision Intelligence", stage: "Late Stage", funding: "$685M", valuation: "$1B+", founded: 2000, hq: "Mumbai", badge: "Unicorn", hot: false, website: "https://fractal.ai", investors: "TPG, Apax Partners, Khosla Ventures", what: "Decision intelligence platform serving Fortune 500 clients. IPO pipeline confirmed — Fractal is among the most credible AI-for-enterprise bets in India." },
  { rank: 5, name: "Yellow.ai", slug: "yellow-ai", sector: "Conversational AI", stage: "Series C", funding: "$102M", valuation: "$1.2B", founded: 2016, hq: "Bengaluru", badge: "Unicorn", hot: false, website: "https://yellow.ai", investors: "WestBridge, Lightspeed, Sapphire Ventures", what: "Enterprise conversational AI handling 5B+ conversations in 135+ languages. Serves BFSI, retail, and healthcare clients globally." },
  { rank: 6, name: "Observe.AI", slug: "observe-ai", sector: "Voice AI / Contact Centre", stage: "Series C", funding: "$214M", valuation: "$800M+", founded: 2017, hq: "Bengaluru / SF", badge: "Pre-Unicorn", hot: true, website: "https://observe.ai", investors: "SoftBank, Menlo Ventures, Zoom", what: "Conversation intelligence for contact centres — real-time agent assist, automated QA, AI coaching. Acquired Dubdub.ai in March 2025." },
  { rank: 7, name: "Qure.ai", slug: "qure-ai", sector: "Healthcare AI / Radiology", stage: "Series C", funding: "$65M+", valuation: "$300M+", founded: 2016, hq: "Mumbai", badge: "Global", hot: false, website: "https://qure.ai", investors: "Sequoia, Merck, Novo Holdings", what: "AI radiology platform detecting TB, lung cancer, and stroke from X-rays and CT scans. Deployed in 70+ countries across 6 continents." },
  { rank: 8, name: "Pixis", slug: "pixis", sector: "AI Marketing Infrastructure", stage: "Series C", funding: "$209M", valuation: "$600M+", founded: 2020, hq: "Bengaluru", badge: "Pre-Unicorn", hot: false, website: "https://pixis.ai", investors: "General Atlantic, Celesta Capital, Chiratae", what: "Codeless AI platform helping brands orchestrate and monitor marketing campaigns. Backed by General Atlantic with $85M raised in the last round." },
  { rank: 9, name: "SuperAGI", slug: "superagi", sector: "Agentic AI", stage: "Series A", funding: "$15M", valuation: "$50M+", founded: 2023, hq: "Hyderabad / SF", badge: "Rising", hot: true, website: "https://superagi.com", investors: "Matrix Partners India", what: "Open-source large action model (LAM) platform enabling enterprises to build autonomous AI agents. Pivoted to full agentic AI stack in July 2025." },
  { rank: 10, name: "QpiAI", slug: "qpiai", sector: "Quantum AI / Deeptech", stage: "Series B", funding: "$65M+", valuation: "$150M+", founded: 2019, hq: "Bengaluru", badge: "Rising", hot: true, website: "https://qpiai.tech", investors: "We Founder Circle, YourNest VC, HEM Angels", what: "Combines AI and quantum computing — offers QCaaS software and manufactures quantum processors and cryogenic controllers. Has subsidiaries in US and Finland." },
]

const STATS = [
  { v: "1,779+", l: "AI Companies in India" },
  { v: "$3.4B", l: "Total Funding Raised" },
  { v: "126", l: "Unicorns in India" },
  { v: "$126B", l: "AI Market Size by 2030" },
]

const BADGE_COLORS: Record<string, string> = {
  "Unicorn": "bg-amber-50 text-amber-800 border border-amber-200",
  "Unicorn 2026": "bg-amber-50 text-amber-800 border border-amber-200",
  "Gov-Backed": "bg-blue-50 text-blue-800 border border-blue-200",
  "Global": "bg-violet-50 text-violet-800 border border-violet-200",
  "Pre-Unicorn": "bg-emerald-50 text-emerald-800 border border-emerald-200",
  "Rising": "bg-stone-100 text-stone-600 border border-stone-200",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": "https://upforge.in/top-ai-startups", url: "https://upforge.in/top-ai-startups", name: "Top AI Startups in India 2026 | UpForge", description: "Definitive ranked list of India's top AI startups by funding, valuation and impact.", dateModified: "2026-03-07", isPartOf: { "@type": "WebSite", name: "UpForge", url: "https://upforge.in" }, breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://upforge.in" }, { "@type": "ListItem", position: 2, name: "Top AI Startups India 2026", item: "https://upforge.in/top-ai-startups" }] } },
    { "@type": "ItemList", name: "Top AI Startups India 2026", numberOfItems: 10, itemListElement: STARTUPS.map((s, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Organization", name: s.name, description: s.what, foundingDate: String(s.founded), url: s.website } })) },
    { "@type": "Article", headline: "Top AI Startups in India 2026", author: { "@type": "Organization", name: "UpForge", url: "https://upforge.in" }, publisher: { "@type": "Organization", name: "UpForge", logo: { "@type": "ImageObject", url: "https://upforge.in/logo.png" } }, datePublished: "2026-01-01", dateModified: "2026-03-07" },
  ],
}

export default function TopAIStartupsPage() {
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
          <span className="text-[10px] text-[#1C1C1C] font-semibold uppercase tracking-wider">Top AI Startups India 2026</span>
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
            Top AI Startups<br />
            <span className="text-[#A89060] italic">in India</span> — 2026
          </h1>
          <p className="text-[15px] sm:text-base text-[#555] max-w-2xl leading-relaxed mb-8" style={{ fontFamily: "system-ui,sans-serif" }}>
            India's AI ecosystem has crossed <strong className="text-[#1C1C1C]">1,779 companies</strong> and <strong className="text-[#1C1C1C]">$3.4B in cumulative funding</strong>, with three unicorns and a government-backed sovereign LLM programme in motion. This independently verified list ranks the companies shaping India's AI decade — sorted by funding raised, category leadership, and 2026 momentum.
          </p>
          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#1C1C1C] divide-x divide-y sm:divide-y-0 divide-[#1C1C1C]">
            {STATS.map((s, i) => (
              <div key={i} className="px-5 py-4">
                <p className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] leading-none mb-1.5">{s.v}</p>
                <p className="text-[9px] text-[#999] uppercase tracking-[0.18em]" style={{ fontFamily: "system-ui,sans-serif" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </header>

        {/* ── CONTEXT CARDS ── */}
        <section className="py-8 border-b border-[#D5D0C8] fu fu2">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Zap, title: "Sovereign AI Push", body: "The IndiaAI Mission's $1.25B corpus is funding indigenous LLMs, GPU compute, and AI literacy — creating a structurally protected runway for homegrown startups that no other emerging market can match." },
              { icon: TrendingUp, title: "Applied AI Wins Capital", body: "2025 proved India's AI capital flows to practical, ROI-first applications. Enterprise AI, healthcare diagnostics, and contact-centre automation attracted the most disciplined investor dollars — over $643M across 100 deals." },
              { icon: Brain, title: "GPU Infrastructure Race", body: "Neysa's $600M Blackstone round in Feb 2026 signals the start of India's compute infrastructure arms race. Domestic GPU cloud is now a strategic national asset, not just a startup category." },
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
            <h2 className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#888]" style={{ fontFamily: "system-ui,sans-serif" }}>Top 10 · Ranked by Funding & Market Impact</h2>
            <div className="flex items-center gap-1.5" style={{ fontFamily: "system-ui,sans-serif" }}>
              <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" /></span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">Live · March 2026</span>
            </div>
          </div>

          <div className="space-y-2">
            {STARTUPS.map((s) => (
              <article key={s.rank} className="card border border-[#E2DDD5] bg-white/70 p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-9 pt-0.5 text-center">
                    <span className="text-[11px] font-mono text-[#CCC]" style={{ fontFamily: "system-ui,sans-serif" }}>{String(s.rank).padStart(2,"0")}</span>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="text-[1.05rem] font-bold text-[#1C1C1C] leading-tight">{s.name}</h3>
                      {s.hot && <span className="text-[7.5px] bg-[#1C1C1C] text-[#E8C547] px-1.5 py-0.5 font-black uppercase tracking-[0.15em]" style={{ fontFamily: "system-ui,sans-serif" }}>🔥 Hot</span>}
                      <span className={`text-[8.5px] px-2 py-0.5 font-bold uppercase tracking-[0.1em] ${BADGE_COLORS[s.badge] || "bg-stone-100 text-stone-600 border border-stone-200"}`} style={{ fontFamily: "system-ui,sans-serif" }}>{s.badge}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-3" style={{ fontFamily: "system-ui,sans-serif" }}>
                      <span className="text-[10px] font-semibold text-[#888] uppercase tracking-wider">{s.sector}</span>
                      <span className="text-[#DDD]">·</span>
                      <span className="text-[10px] text-[#AAA]">{s.hq}</span>
                      <span className="text-[#DDD]">·</span>
                      <span className="text-[10px] text-[#AAA]">Est. {s.founded}</span>
                    </div>
                    <p className="text-[12.5px] text-[#444] leading-relaxed mb-4" style={{ fontFamily: "system-ui,sans-serif" }}>{s.what}</p>
                    <div className="flex flex-wrap items-end gap-x-5 gap-y-2" style={{ fontFamily: "system-ui,sans-serif" }}>
                      {[
                        { label: "Funding", value: s.funding, cls: "text-[#1C1C1C] font-bold" },
                        { label: "Valuation", value: s.valuation, cls: "text-emerald-700 font-bold" },
                        { label: "Stage", value: s.stage, cls: "text-[#555] font-semibold" },
                      ].map((m, i) => (
                        <div key={i}>
                          <span className="text-[8.5px] text-[#BBB] uppercase tracking-wider block mb-0.5">{m.label}</span>
                          <span className={`text-[13px] ${m.cls}`}>{m.value}</span>
                        </div>
                      ))}
                      <div className="flex-1 min-w-[120px]">
                        <span className="text-[8.5px] text-[#BBB] uppercase tracking-wider block mb-0.5">Key Investors</span>
                        <span className="text-[11.5px] text-[#666]">{s.investors}</span>
                      </div>
                    </div>
                  </div>
                  {/* CTAs */}
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

        {/* ── INTERNAL LINKS (great for crawlability) ── */}
        <nav className="mt-12 border-t border-[#D5D0C8] pt-8 fu fu4" aria-label="Related startup lists">
          <p className="text-[9px] tracking-[0.24em] uppercase text-[#AAA] mb-4" style={{ fontFamily: "system-ui,sans-serif" }}>More UpForge Lists</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Best SaaS Startups India", href: "/best-saas-startups" },
              { label: "Indian Startups Overview", href: "/indian-startups" },
              { label: "Top Funded Startups", href: "/top-funded-startups" },
              { label: "Indian Unicorns 2026", href: "/indian-unicorns" },
              { label: "Browse All Startups", href: "/startup" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#D5D0C8] text-[10px] text-[#666] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors bg-white" style={{ fontFamily: "system-ui,sans-serif" }}>
                {l.label} <ChevronRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </nav>

        {/* ── CTA ── */}
        <div className="mt-10 bg-[#1C1C1C] p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BadgeCheck className="w-4 h-4 text-[#E8C547]" />
              <span className="text-[9px] text-white/30 uppercase tracking-[0.22em]" style={{ fontFamily: "system-ui,sans-serif" }}>UpForge Registry</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Building an AI startup in India?</h2>
            <p className="text-[12.5px] text-white/50 max-w-sm" style={{ fontFamily: "system-ui,sans-serif" }}>Get verified, listed, and indexed in India's most trusted independent startup registry. Free forever.</p>
          </div>
          <Link href="/submit" className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-[#E8C547] text-[#111] text-sm font-bold tracking-wide hover:bg-[#F5D55A] transition-colors" style={{ fontFamily: "system-ui,sans-serif" }}>
            List Your Startup — Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="mt-6 text-[9.5px] text-[#C8C3BC] leading-relaxed" style={{ fontFamily: "system-ui,sans-serif" }}>
          * Funding and valuation data sourced from Tracxn, Inc42, public company announcements as of March 2026. Rankings are editorial — based on funding, market impact, and ecosystem significance. UpForge accepts no paid placements.
        </p>
      </div>
    </div>
  )
}
