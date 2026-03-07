// app/top-funded-startups/page.tsx
// ─── TARGET KEYWORDS ─────────────────────────────────────────────────────────
// "top funded startups India"          ~16,000/mo
// "most funded startups India 2026"    ~8,400/mo
// "highest funded Indian startups"     ~5,800/mo
// "India startup funding rounds 2025"  ~7,200/mo
// "recently funded startups India"     ~9,100/mo
// "startup funding India 2026"         ~12,000/mo
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Top Funded Startups in India 2026 — Capital Intelligence | UpForge",
  description:
    "India's 10 most funded startups ranked by total capital raised. Ola ($3.8B), OYO ($3.7B), Zepto ($2.5B) and more. Recent 2025–26 funding rounds, sector breakdown, investor intelligence. $11.6B raised in 2025. Updated March 2026.",
  keywords:
    "top funded startups India, most funded startups India 2026, highest funded Indian startups, India startup funding 2025, recently funded startups India, startup funding rounds India, Zepto funding, Meesho funding, PhysicsWallah valuation, Indian startup investment, VC funding India, tiger global india, sequoia india startups, softbank india, startup investment report India",
  alternates: { canonical: "https://upforge.in/top-funded-startups" },
  openGraph: {
    title: "Top Funded Startups India 2026 — Capital Intelligence | UpForge",
    description:
      "India's most funded startups ranked — cumulative funding, latest rounds, investors & valuation. $11.6B raised in 2025. Updated March 2026.",
    url: "https://upforge.in/top-funded-startups",
    siteName: "UpForge",
    locale: "en_IN",
    type: "article",
    images: [{ url: "https://upforge.in/og/top-funded-startups.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@upforge_in",
    title: "Top Funded Startups India 2026 | UpForge",
    images: ["https://m.economictimes.com/thumb/msid-60004701,width-1600,height-900,resizemode-4,imgsize-52295/here-are-indias-top-funded-startups-for-2017.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const TOP_FUNDED = [
  {
    rank: 1, name: "Ola Cabs", slug: "ola-cabs",
    total: "$3.8B", totalRaw: 3.8,
    lastRound: "Series J", lastAmt: "Undisclosed", lastYear: 2023,
    sector: "Mobility", sectorColor: "#7C3AED",
    hq: "Bengaluru", valuation: "$7.3B",
    investors: "SoftBank · Tiger Global · Accel · DST Global",
    note: "India's largest ride-hailing company by fleet size. SoftBank is the largest external shareholder. ANI Technologies parent. Eyes a public listing.",
    tag: "Market Leader", tagColor: "#7C3AED",
  },
  {
    rank: 2, name: "OYO Rooms", slug: "oyo",
    total: "$3.7B", totalRaw: 3.7,
    lastRound: "Series G", lastAmt: "$807M", lastYear: 2021,
    sector: "Hospitality", sectorColor: "#DC2626",
    hq: "Delhi", valuation: "$9B",
    investors: "SoftBank · Airbnb · Sequoia · Lightspeed",
    note: "World's third-largest hotel chain by property count. Founder Ritesh Agarwal started at 19 from Odisha. Filed DRHP for IPO after a pandemic restructuring.",
    tag: "IPO Bound", tagColor: "#DC2626",
  },
  {
    rank: 3, name: "Zepto", slug: "zepto",
    total: "$2.5B", totalRaw: 2.5,
    lastRound: "Series H", lastAmt: "$350M", lastYear: 2025,
    sector: "Quick Commerce", sectorColor: "#D97706",
    hq: "Mumbai", valuation: "$5.9B",
    investors: "StepStone · Nexus · Y Combinator · Contrary",
    note: "10-minute grocery delivery built by two Stanford dropouts at 19. Fastest Indian startup to reach $5B+ valuation. Kaivalya Vohra is India's youngest billionaire at 22.",
    tag: "Fastest Growing", tagColor: "#D97706",
  },
  {
    rank: 4, name: "Lenskart", slug: "lenskart",
    total: "$1.8B", totalRaw: 1.8,
    lastRound: "Series H", lastAmt: "$200M", lastYear: 2023,
    sector: "D2C / Eyewear", sectorColor: "#059669",
    hq: "Delhi", valuation: "$4.5B",
    investors: "SoftBank · KKR · Temasek · Premji Invest",
    note: "Omnichannel eyewear with 2,000+ stores across India, Singapore, and UAE. One of India's few D2C companies with genuine offline scale at this size. IPO in 2026.",
    tag: "IPO 2026", tagColor: "#059669",
  },
  {
    rank: 5, name: "Meesho", slug: "meesho",
    total: "$1.6B", totalRaw: 1.6,
    lastRound: "Secondary", lastAmt: "$275M", lastYear: 2024,
    sector: "Social Commerce", sectorColor: "#E11D48",
    hq: "Bengaluru", valuation: "$3.9B",
    investors: "SoftBank · Naspers · Prosus · Y Combinator",
    note: "India's leading social commerce platform serving 150M+ transacting users from Tier 2 and 3 cities. Built specifically for the next 500 million Indian internet users.",
    tag: "IPO Bound", tagColor: "#E11D48",
  },
  {
    rank: 6, name: "CRED", slug: "cred",
    total: "$1.4B", totalRaw: 1.4,
    lastRound: "Series F", lastAmt: "$140M", lastYear: 2023,
    sector: "Fintech", sectorColor: "#2563EB",
    hq: "Bengaluru", valuation: "$6.4B",
    investors: "DST Global · Tiger Global · Sequoia Capital",
    note: "Premium credit card rewards platform by serial founder Kunal Shah. Expanding into personal lending, payments, and investing for India's creditworthy segment.",
    tag: "Premium Fintech", tagColor: "#2563EB",
  },
  {
    rank: 7, name: "Razorpay", slug: "razorpay",
    total: "$1.4B", totalRaw: 1.4,
    lastRound: "Series F", lastAmt: "$375M", lastYear: 2021,
    sector: "Payments Infra", sectorColor: "#0891B2",
    hq: "Bengaluru", valuation: "$7.5B",
    investors: "Sequoia · GIC · Tiger Global · Ribbit Capital",
    note: "India's leading payment gateway processing transactions for 8M+ businesses. Reverse-flipped domicile to India in 2023 ahead of a planned domestic IPO.",
    tag: "Infrastructure", tagColor: "#0891B2",
  },
  {
    rank: 8, name: "Groww", slug: "groww",
    total: "$1.2B", totalRaw: 1.2,
    lastRound: "Series F", lastAmt: "$251M", lastYear: 2022,
    sector: "WealthTech", sectorColor: "#16A34A",
    hq: "Bengaluru", valuation: "$7B",
    investors: "Tiger Global · Sequoia · YC · Ribbit",
    note: "India's largest retail investment platform with 12M+ active investors in mutual funds and equities. Plans to raise ₹8,500 crore via IPO in 2026.",
    tag: "IPO 2026", tagColor: "#16A34A",
  },
  {
    rank: 9, name: "Neysa", slug: "neysa",
    total: "$600M", totalRaw: 0.6,
    lastRound: "Series B", lastAmt: "$600M", lastYear: 2026,
    sector: "AI Cloud", sectorColor: "#9333EA",
    hq: "Bengaluru", valuation: "$1B+",
    investors: "Blackstone",
    note: "India's newest unicorn (Feb 2026). AI-native GPU cloud platform offering GPU-as-a-Service and AI inference infrastructure. The single largest AI round in India's history.",
    tag: "New Unicorn '26", tagColor: "#9333EA",
  },
  {
    rank: 10, name: "PhysicsWallah", slug: "physicswallah",
    total: "$700M", totalRaw: 0.7,
    lastRound: "Series B", lastAmt: "$210M", lastYear: 2024,
    sector: "EdTech", sectorColor: "#CA8A04",
    hq: "Noida", valuation: "$2.8B",
    investors: "GSV Ventures · WestBridge Capital · Hornbill",
    note: "Started as a YouTube channel teaching Physics for free. Now serves 10M+ students at ₹2,000/year — a fraction of BYJU's price. Listed on Indian exchanges in November 2025.",
    tag: "Profitable", tagColor: "#CA8A04",
  },
]

const RECENT_ROUNDS = [
  { startup: "Neysa", sector: "AI Cloud", amount: "$600M", type: "Series B", month: "Feb 2026", isNew: true },
  { startup: "Juspay", sector: "Payments Infra", amount: "$45M", type: "Series D", month: "Jan 2026", isNew: true },
  { startup: "Zepto", sector: "Quick Commerce", amount: "$350M", type: "Series H", month: "Dec 2025", isNew: false },
  { startup: "Porter", sector: "Logistics", amount: "$200M", type: "Series F", month: "Sep 2025", isNew: false },
  { startup: "TrueMeds", sector: "HealthTech", amount: "$85M", type: "Series C", month: "Oct 2025", isNew: false },
  { startup: "Darwinbox", sector: "HR SaaS", amount: "$40M+", type: "Series D", month: "Nov 2025", isNew: false },
]

const TOP_INVESTORS = [
  {
    name: "Sequoia Capital India",
    aka: "Peak XV Partners",
    deals: "20+ unicorns",
    focus: "Seed to growth, all sectors",
    portfolio: "Razorpay, CRED, Groww, Unacademy, BrowserStack",
  },
  {
    name: "Tiger Global",
    aka: "Growth & Crossover",
    deals: "15+ unicorns",
    focus: "Growth-stage internet companies",
    portfolio: "CRED, Upstox, Groww, Infra.Market, Games24x7",
  },
  {
    name: "SoftBank Group",
    aka: "Vision Fund",
    deals: "$5B+ deployed India",
    focus: "Late-stage market leaders",
    portfolio: "OYO, Lenskart, Meesho, Ola",
  },
  {
    name: "Accel India",
    aka: "India's Oldest Major VC",
    deals: "30+ years India focus",
    focus: "Seed to Series B",
    portfolio: "Flipkart, Freshworks, Swiggy, BrowserStack",
  },
]

const SECTORS = [
  { name: "Fintech", count: 23, pct: 92, color: "#2563EB" },
  { name: "SaaS / B2B", count: 15, pct: 60, color: "#7C3AED" },
  { name: "E-commerce", count: 18, pct: 72, color: "#E11D48" },
  { name: "Quick Commerce", count: 9, pct: 36, color: "#D97706" },
  { name: "EdTech", count: 7, pct: 28, color: "#CA8A04" },
  { name: "HealthTech", count: 6, pct: 24, color: "#059669" },
  { name: "Mobility", count: 6, pct: 24, color: "#0891B2" },
  { name: "AI / Cloud", count: 3, pct: 12, color: "#9333EA" },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://upforge.in/top-funded-startups",
      url: "https://upforge.in/top-funded-startups",
      name: "Top Funded Startups India 2026 — Capital Intelligence | UpForge",
      description: "India's 10 most funded startups ranked by total capital raised. $11.6B raised in 2025.",
      dateModified: "2026-03-07",
      isPartOf: { "@type": "WebSite", name: "UpForge", url: "https://upforge.in" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://upforge.in" },
          { "@type": "ListItem", position: 2, name: "Top Funded Startups India 2026", item: "https://upforge.in/top-funded-startups" },
        ],
      },
    },
    {
      "@type": "ItemList",
      name: "Most Funded Startups India 2026",
      numberOfItems: 10,
      itemListElement: TOP_FUNDED.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "Organization", name: s.name, description: s.note, foundingLocation: { "@type": "Place", name: s.hq } },
      })),
    },
    {
      "@type": "Article",
      headline: "Top Funded Startups in India 2026 — Capital Intelligence",
      author: { "@type": "Organization", name: "UpForge", url: "https://upforge.in" },
      publisher: { "@type": "Organization", name: "UpForge", logo: { "@type": "ImageObject", url: "https://upforge.in/logo.png" } },
      datePublished: "2026-01-01",
      dateModified: "2026-03-07",
      image: "https://upforge.in/og/top-funded-startups.png",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which is the most funded startup in India?",
          acceptedAnswer: { "@type": "Answer", text: "Ola Cabs is India's most funded startup with $3.8B raised, followed by OYO at $3.7B and Zepto at $2.5B as of March 2026." },
        },
        {
          "@type": "Question",
          name: "How much did Indian startups raise in 2025?",
          acceptedAnswer: { "@type": "Answer", text: "Indian startups raised $11.6B across 936 deals in 2025, with AI infrastructure, quick commerce, and fintech leading funding activity." },
        },
      ],
    },
  ],
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function TopFundedStartupsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F4F0E8", fontFamily: "'Georgia','Times New Roman',serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .pf { font-family: 'Playfair Display', Georgia, serif !important; }
        .dm { font-family: 'DM Sans', system-ui, sans-serif !important; }

        :root {
          --ink:   #18120A;
          --paper: #F4F0E8;
          --rule:  #C8C2B2;
          --muted: #6B5C40;
          --gold:  #C9A84C;
        }

        @keyframes riseIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .r1 { animation: riseIn .48s ease both .04s; }
        .r2 { animation: riseIn .48s ease both .10s; }
        .r3 { animation: riseIn .48s ease both .18s; }
        .r4 { animation: riseIn .48s ease both .26s; }

        .row {
          border-bottom: 1px solid var(--rule);
          transition: background .14s;
        }
        .row:last-child { border-bottom: none; }
        .row:hover { background: rgba(255,255,255,.9); }

        .rank-bg {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          color: #E2DDD4;
          line-height: 1;
          user-select: none;
          pointer-events: none;
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: var(--rule); }
      `}</style>

      {/* BREADCRUMB */}
      <div className="dm" style={{ borderBottom: "1px solid var(--rule)", background: "var(--paper)" }}>
        <div className="max-w-[1180px] mx-auto px-4 sm:px-8 py-2.5 flex items-center gap-1.5">
          <Link href="/" className="text-[9px] text-[#AAA] hover:text-[var(--ink)] uppercase tracking-widest transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" style={{ color: "var(--rule)" }} />
          <Link href="/indian-startups" className="text-[9px] text-[#AAA] hover:text-[var(--ink)] uppercase tracking-widest transition-colors">Indian Startups</Link>
          <ChevronRight className="w-3 h-3" style={{ color: "var(--rule)" }} />
          <span className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: "var(--ink)" }}>Top Funded 2026</span>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 pb-24">

        {/* ══════════════════════════════════
            MASTHEAD
        ══════════════════════════════════ */}
        <header className="r1">
          {/* Top rule */}
          <div
            className="flex items-center justify-between pt-8 pb-5"
            style={{ borderBottom: "3px solid var(--ink)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5" style={{ background: "var(--ink)" }} />
              <span className="dm text-[9px] font-semibold uppercase tracking-[0.32em]" style={{ color: "var(--muted)" }}>
                UpForge Capital Intelligence · March 2026
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="dm text-[9px] uppercase tracking-widest" style={{ color: "#AAA" }}>Live · Verified</span>
            </div>
          </div>

          {/* Hero: headline + stats */}
          <div
            className="grid lg:grid-cols-[1fr_380px] gap-8 items-end py-10"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            <div>
              <p className="dm text-[9.5px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>
                Funding Intelligence Report — Top 10
              </p>
              <h1
                className="pf font-black leading-[1.03] text-[var(--ink)]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4.4rem)" }}
              >
                India's Most<br />
                <em style={{ color: "var(--muted)", fontStyle: "italic" }}>Capital-Intensive</em><br />
                Startups — 2026
              </h1>
              <p
                className="dm leading-[1.82] mt-5 max-w-lg"
                style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "#5A4A30" }}
              >
                Indian startups raised{" "}
                <strong style={{ color: "var(--ink)" }}>$11.6 billion across 936 deals in 2025.</strong>{" "}
                This report ranks the 10 companies that absorbed the most capital — with the latest rounds, lead investors, and what sector concentration tells us about India's next decade.
              </p>
            </div>

            {/* 4-stat dark block */}
            <div className="flex-shrink-0 grid grid-cols-2 gap-px" style={{ background: "var(--rule)" }}>
              {[
                { v: "$11.6B", l: "Raised in 2025", s: "936 deals" },
                { v: "$3.32B", l: "YTD 2026",       s: "332 deals" },
                { v: "126",   l: "Total Unicorns",  s: "India" },
                { v: "10",    l: "In This Report",  s: "by capital raised" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="px-5 py-5"
                  style={{ background: i % 2 === 0 ? "#18120A" : "#251A0E" }}
                >
                  <p className="pf font-black text-white leading-none" style={{ fontSize: "1.9rem" }}>{s.v}</p>
                  <p className="dm text-[8px] uppercase tracking-[0.2em] mt-1.5" style={{ color: "rgba(255,255,255,.4)" }}>{s.l}</p>
                  <p className="dm text-[7.5px] mt-0.5" style={{ color: "rgba(255,255,255,.22)" }}>{s.s}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════
            TWO-COLUMN: List + Sidebar
        ══════════════════════════════════ */}
        <div className="grid lg:grid-cols-[1fr_296px] xl:grid-cols-[1fr_316px] gap-0 r2">

          {/* ── RANKED LIST ── */}
          <div className="pt-8 lg:pr-10" style={{ borderRight: "1px solid var(--rule)" }}>

            {/* Section label */}
            <div className="flex items-center justify-between mb-7">
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-px" style={{ background: "var(--ink)" }} />
                <h2 className="dm text-[8.5px] font-bold uppercase tracking-[0.28em]" style={{ color: "var(--muted)" }}>
                  Ranked by Total Funding Raised
                </h2>
              </div>
              <span className="dm text-[8.5px] uppercase tracking-wider" style={{ color: "var(--rule)" }}>2026 Edition</span>
            </div>

            {/* THE ROWS */}
            {TOP_FUNDED.map((s) => {
              const barPct = Math.round((s.totalRaw / 3.8) * 100)
              return (
                <article key={s.rank} className="row py-6 relative">
                  <div className="flex gap-4 sm:gap-5 items-start">

                    {/* Ghost rank number */}
                    <div className="flex-shrink-0 w-12 sm:w-14 text-right pt-1">
                      <span className="rank-bg" style={{ fontSize: "clamp(2.6rem, 4.5vw, 3.8rem)" }}>
                        {String(s.rank).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">

                      {/* Name + badge */}
                      <div className="flex flex-wrap items-start gap-2 mb-1.5">
                        <h3
                          className="pf font-bold leading-tight text-[var(--ink)]"
                          style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)" }}
                        >
                          {s.name}
                        </h3>
                        <span
                          className="dm text-[7.5px] font-bold uppercase tracking-wider px-2 py-0.5 flex-shrink-0 mt-0.5"
                          style={{
                            background: s.tagColor + "14",
                            color: s.tagColor,
                            border: `1px solid ${s.tagColor}35`,
                          }}
                        >
                          {s.tag}
                        </span>
                      </div>

                      {/* Sector + city */}
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="dm text-[8.5px] font-semibold uppercase tracking-wider px-2 py-0.5"
                          style={{ background: s.sectorColor + "15", color: s.sectorColor }}
                        >
                          {s.sector}
                        </span>
                        <span className="dm text-[8.5px]" style={{ color: "var(--rule)" }}>·</span>
                        <span className="dm text-[8.5px]" style={{ color: "var(--muted)" }}>{s.hq}</span>
                      </div>

                      {/* Note */}
                      <p
                        className="dm leading-[1.8] mb-4"
                        style={{ fontSize: "clamp(12px, 1.2vw, 13.5px)", color: "#4A3C28" }}
                      >
                        {s.note}
                      </p>

                      {/* Funding bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="dm text-[7.5px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                            Total Capital Raised
                          </span>
                          <span className="pf font-black" style={{ fontSize: "1.15rem", color: "var(--ink)" }}>
                            {s.total}
                          </span>
                        </div>
                        {/* Track */}
                        <div className="h-[3px] rounded-sm" style={{ background: "#E2DDD4" }}>
                          <div
                            className="h-full rounded-sm"
                            style={{ width: `${barPct}%`, background: s.sectorColor }}
                          />
                        </div>
                      </div>

                      {/* Meta grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3">
                        <div>
                          <p className="dm text-[7px] uppercase tracking-[0.18em] mb-0.5" style={{ color: "var(--rule)" }}>Last Round</p>
                          <p className="dm text-[12.5px] font-semibold" style={{ color: "var(--ink)" }}>{s.lastAmt}</p>
                          <p className="dm text-[8px]" style={{ color: "var(--muted)" }}>{s.lastRound} · {s.lastYear}</p>
                        </div>
                        <div>
                          <p className="dm text-[7px] uppercase tracking-[0.18em] mb-0.5" style={{ color: "var(--rule)" }}>Valuation</p>
                          <p className="dm text-[12.5px] font-semibold" style={{ color: "var(--ink)" }}>{s.valuation}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="dm text-[7px] uppercase tracking-[0.18em] mb-0.5" style={{ color: "var(--rule)" }}>Key Investors</p>
                          <p className="dm leading-relaxed" style={{ fontSize: 11.5, color: "var(--muted)" }}>{s.investors}</p>
                        </div>
                      </div>

                      {/* Profile link */}
                      <div className="mt-4 pt-3" style={{ borderTop: `1px solid ${s.sectorColor}28` }}>
                        <Link
                          href={`/startup/${s.slug}`}
                          className="dm inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider transition-opacity hover:opacity-55"
                          style={{ fontSize: 9.5, color: s.sectorColor }}
                        >
                          View {s.name} Profile <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* ── SIDEBAR ── */}
          <div className="pt-8 lg:pl-8 flex flex-col gap-7">

            {/* RECENT ROUNDS */}
            <div>
              <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: "var(--ink)" }}>
                <TrendingUp className="w-3 h-3 text-white opacity-50" />
                <span className="dm text-[7.5px] font-bold uppercase tracking-[0.28em] text-white">
                  Recent Funding Rounds
                </span>
              </div>
              <div style={{ border: "1px solid var(--rule)", borderTop: "none" }}>
                {RECENT_ROUNDS.map((r, i) => (
                  <div
                    key={i}
                    className="px-4 py-3.5"
                    style={{
                      borderBottom: i < RECENT_ROUNDS.length - 1 ? `1px solid var(--rule)` : "none",
                      background: i % 2 === 0 ? "white" : "transparent",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {r.isNew && (
                            <span
                              className="dm text-[6.5px] font-black uppercase tracking-wider px-1.5 py-0.5 flex-shrink-0"
                              style={{ background: "var(--ink)", color: "#E8C547" }}
                            >NEW</span>
                          )}
                          <p className="pf font-bold leading-tight text-[var(--ink)]" style={{ fontSize: 12.5 }}>
                            {r.startup}
                          </p>
                        </div>
                        <p className="dm text-[8px]" style={{ color: "var(--muted)" }}>
                          {r.sector} · {r.type} · {r.month}
                        </p>
                      </div>
                      <span className="dm font-bold flex-shrink-0" style={{ fontSize: 13.5, color: "#16A34A" }}>
                        {r.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTOR BARS */}
            <div>
              <div className="px-4 py-2.5" style={{ background: "var(--ink)" }}>
                <span className="dm text-[7.5px] font-bold uppercase tracking-[0.28em] text-white">
                  Unicorn Sector Breakdown
                </span>
              </div>
              <div className="p-4" style={{ background: "white", border: "1px solid var(--rule)", borderTop: "none" }}>
                <div className="space-y-3.5">
                  {SECTORS.map((sec, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="dm text-[11px]" style={{ color: "var(--ink)" }}>{sec.name}</span>
                        <span className="dm text-[10px] font-bold" style={{ color: "var(--muted)" }}>{sec.count}</span>
                      </div>
                      <div className="h-[3px] rounded-sm" style={{ background: "#EAE6DC" }}>
                        <div
                          className="h-full rounded-sm"
                          style={{ width: `${sec.pct}%`, background: sec.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="dm text-[8.5px] mt-4 leading-relaxed" style={{ color: "var(--muted)" }}>
                  Fintech leads with 23 of India's 126 unicorns. Quick Commerce, SaaS, and AI are the fastest-growing new entrants as of 2026.
                </p>
              </div>
            </div>

            {/* INSIGHT PULL */}
            <div className="px-5 py-6" style={{ background: "var(--ink)" }}>
              <p className="dm text-[7.5px] font-bold uppercase tracking-[0.28em] mb-3" style={{ color: "var(--gold)" }}>
                UpForge Intelligence Note
              </p>
              <blockquote
                className="pf italic text-white leading-[1.74]"
                style={{ fontSize: 13.5 }}
              >
                "The concentration of India's top 10 most-funded companies across just 5 sectors tells you exactly where the next decade of infrastructure will be built."
              </blockquote>
              <p className="dm text-[8.5px] mt-3 uppercase tracking-wider" style={{ color: "rgba(255,255,255,.28)" }}>
                — UpForge Editorial, March 2026
              </p>
            </div>

            {/* CTA BOX */}
            <div style={{ border: "1px solid var(--rule)" }}>
              <div className="px-5 py-6">
                <p className="dm text-[7.5px] font-black uppercase tracking-[0.26em] mb-2" style={{ color: "var(--gold)" }}>
                  UpForge Registry
                </p>
                <p className="pf font-bold leading-snug mb-2 text-[var(--ink)]" style={{ fontSize: "1.05rem" }}>
                  Is your startup in the next funding wave?
                </p>
                <p className="dm text-[12px] leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                  Investors research startups on UpForge. Get listed, verified, and found — free forever.
                </p>
                <Link
                  href="/submit"
                  className="dm flex items-center justify-center gap-2 px-4 py-3 text-[9.5px] font-bold uppercase tracking-wider transition-opacity hover:opacity-80"
                  style={{ background: "var(--ink)", color: "white" }}
                >
                  List Your Startup — Free <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* ══════════════════════════════════
            POWER INVESTORS — full width
        ══════════════════════════════════ */}
        <section className="mt-14 pt-10 r3" style={{ borderTop: "2px solid var(--ink)" }}>
          <div className="flex items-center gap-2.5 mb-7">
            <span className="w-5 h-px" style={{ background: "var(--ink)" }} />
            <h2 className="dm text-[8.5px] font-bold uppercase tracking-[0.28em]" style={{ color: "var(--muted)" }}>
              India's Power Investors
            </h2>
          </div>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4"
            style={{ border: "1px solid var(--rule)" }}
          >
            {TOP_INVESTORS.map((inv, i) => (
              <div
                key={i}
                className="p-5"
                style={{
                  borderRight: i < TOP_INVESTORS.length - 1 ? "1px solid var(--rule)" : "none",
                  borderBottom: i < 2 ? "1px solid var(--rule)" : "none",
                }}
              >
                <div className="w-7 h-0.5 mb-4" style={{ background: "var(--ink)" }} />
                <h3 className="pf font-bold leading-snug mb-0.5 text-[var(--ink)]" style={{ fontSize: "1rem" }}>
                  {inv.name}
                </h3>
                <p className="dm text-[8.5px] mb-3" style={{ color: "var(--muted)" }}>{inv.aka}</p>
                <div className="space-y-2.5 mb-4">
                  {[
                    { l: "Record", v: inv.deals },
                    { l: "Focus", v: inv.focus },
                  ].map((m, mi) => (
                    <div key={mi}>
                      <p className="dm text-[7px] uppercase tracking-widest mb-0.5" style={{ color: "var(--rule)" }}>{m.l}</p>
                      <p className="dm text-[11px] font-medium" style={{ color: "var(--ink)" }}>{m.v}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-3" style={{ borderTop: "1px solid var(--rule)" }}>
                  <p className="dm text-[7px] uppercase tracking-widest mb-1" style={{ color: "var(--rule)" }}>Portfolio</p>
                  <p className="dm leading-relaxed" style={{ fontSize: 11, color: "var(--muted)" }}>{inv.portfolio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════
            INTERNAL NAV
        ══════════════════════════════════ */}
        <nav
          className="mt-12 pt-8 r4"
          style={{ borderTop: "1px solid var(--rule)" }}
          aria-label="Related UpForge reports"
        >
          <p className="dm text-[8.5px] uppercase tracking-[0.28em] mb-4" style={{ color: "var(--rule)" }}>
            More UpForge Intelligence Reports
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Top AI Startups India", href: "/top-ai-startups" },
              { label: "Best SaaS Startups", href: "/best-saas-startups" },
              { label: "Indian Unicorns 2026", href: "/indian-unicorns" },
              { label: "Indian Startups Guide", href: "/indian-startups" },
              { label: "Founder Stories", href: "/founder-stories" },
              { label: "Browse All Startups", href: "/startup" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="dm inline-flex items-center gap-1 px-3.5 py-2 text-[9px] font-medium uppercase tracking-wider transition-all hover:bg-[var(--ink)] hover:text-white"
                style={{ border: "1px solid var(--rule)", color: "var(--muted)", background: "white" }}
              >
                {l.label} <ChevronRight className="w-2.5 h-2.5" />
              </Link>
            ))}
          </div>
        </nav>

        <p
          className="dm mt-8 pb-2 text-[9px] leading-relaxed"
          style={{ color: "#B8AF9E" }}
        >
          * All funding data sourced from Tracxn, Inc42, Growthlist, and public company announcements as of March 2026. Valuations are last known figures and may not reflect current market prices. UpForge is an independent registry — no paid placements or sponsored rankings.
        </p>

      </div>
    </div>
  )
}
