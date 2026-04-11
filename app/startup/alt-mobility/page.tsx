"use client"

// app/startup/alt-mobility/page.tsx
// UpForge — Alt Mobility · Dev Arora & Team Founder Chronicle
// SEO: Alt Mobility EV Leasing India, Dev Arora, FleetOS, Drive-to-Own, Shell Ventures, Eurazeo
// Designed for maximum crawlability and indexing on Google Search.

import { useEffect } from "react"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://upforge.in/startup/alt-mobility#article",
      "headline": "Alt Mobility — How Dev Arora & Team Built India's Largest Full-Stack EV Leasing Platform",
      "description": "Alt Mobility founder story — Dev Arora, Anuj Gupta, Harsh Dev Goyal, Manas Arora & Jayant Gupta built India's most comprehensive EV leasing and lifecycle management platform from IIT Delhi's incubator. $17.3M raised. 16,000+ vehicles leased. ₹350Cr+ AUM. FleetOS telematics. Drive-to-Own model.",
      "url": "https://upforge.in/startup/alt-mobility",
      "datePublished": "2026-03-14T00:00:00+05:30",
      "dateModified": "2026-04-01T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.in/Upforge-alt-mobility.webp",
        "width": 1200,
        "height": 630
      },
      "publisher": {
        "@type": "Organization",
        "name": "UpForge",
        "url": "https://upforge.in",
        "logo": { "@type": "ImageObject", "url": "https://upforge.in/logo.png" }
      },
      "author": { "@type": "Organization", "name": "UpForge Editorial" },
      "about": [
        {
          "@type": "Person",
          "name": "Dev Arora",
          "jobTitle": "Co-Founder & CEO",
          "worksFor": { "@type": "Organization", "name": "Alt Mobility" },
          "sameAs": ["https://www.linkedin.com/in/dev-arora-alt/"]
        },
        {
          "@type": "Person",
          "name": "Anuj Gupta",
          "jobTitle": "Co-Founder",
          "worksFor": { "@type": "Organization", "name": "Alt Mobility" }
        },
        {
          "@type": "Person",
          "name": "Harsh Dev Goyal",
          "jobTitle": "Co-Founder",
          "worksFor": { "@type": "Organization", "name": "Alt Mobility" }
        },
        {
          "@type": "Person",
          "name": "Manas Arora",
          "jobTitle": "Co-Founder",
          "worksFor": { "@type": "Organization", "name": "Alt Mobility" }
        },
        {
          "@type": "Person",
          "name": "Jayant Gupta",
          "jobTitle": "Co-Founder",
          "worksFor": { "@type": "Organization", "name": "Alt Mobility" }
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "Alt Mobility",
        "url": "https://www.altmobility.in",
        "foundingDate": "2020",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "New Delhi",
          "addressCountry": "IN"
        },
        "description": "Alt Mobility is India's largest full-stack EV leasing and lifecycle management platform, offering FleetOS telematics, Drive-to-Own financing, parametric insurance, and fleet depot infrastructure for commercial fleets.",
        "sameAs": [
          "https://www.altmobility.in",
          "https://www.linkedin.com/company/alt-mobility/"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "EV Startups", "item": "https://upforge.in/ev-startups" },
        { "@type": "ListItem", "position": 4, "name": "Alt Mobility", "item": "https://upforge.in/startup/alt-mobility" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does Alt Mobility do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Alt Mobility is a full-stack EV leasing and lifecycle management platform. It leases commercial electric vehicles to fleet operators and individual drivers while bundling insurance, maintenance, charging, roadside assistance, and real-time telematics via its proprietary FleetOS platform — all in a single monthly payment."
          }
        },
        {
          "@type": "Question",
          "name": "Who are the founders of Alt Mobility?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Alt Mobility was founded in 2020 by Dev Arora (CEO), Anuj Gupta, Harsh Dev Goyal, Manas Arora, and Jayant Gupta. The founding team previously built 8Minute, a rooftop solar startup that deployed over 100MW of clean energy before pivoting their financing expertise to EV adoption."
          }
        },
        {
          "@type": "Question",
          "name": "How much funding has Alt Mobility raised?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Alt Mobility has raised $17.3M in total funding. Key rounds include a $6M round co-led by Shell Ventures, Eurazeo, EV2 Ventures and Twynam (Jan 2024), and a $10M Series A led by Eurazeo with participation from Shell Ventures, Twynam Earth Fund, and EV2 Ventures (Nov 2024)."
          }
        },
        {
          "@type": "Question",
          "name": "What is Alt Mobility's FleetOS platform?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "FleetOS is Alt Mobility's proprietary AI and IoT-powered asset management platform. It provides real-time vehicle tracking, telematics, predictive maintenance alerts, battery health monitoring, usage analytics, and the Fleet GPT AI assistant — enabling fleet operators to maximise vehicle uptime and reduce total cost of ownership."
          }
        },
        {
          "@type": "Question",
          "name": "What is Alt Mobility's Drive-to-Own model?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Drive-to-Own (DTO) model allows drivers — particularly gig economy workers who cannot access traditional vehicle financing — to lease an EV and gradually transition to full ownership. This reduces total cost of ownership by 30–40% and builds long-term assets for India's informal workforce."
          }
        },
        {
          "@type": "Question",
          "name": "How many cities does Alt Mobility operate in?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As of early 2026, Alt Mobility operates across 37 cities in India, with a primary focus on Delhi NCR and select cities in Uttar Pradesh. The company plans to expand into Uttarakhand, Haryana, Maharashtra, and Karnataka through its Drive-to-Own model."
          }
        }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Total Funding", v: "$17.3M" },
  { l: "Valuation", v: "₹461Cr" },
  { l: "Founded", v: "2020" },
  { l: "HQ", v: "New Delhi" },
  { l: "Vehicles Leased", v: "16,000+" },
  { l: "AUM", v: "₹350Cr+" },
]

const TIMELINE = [
  { year: "2014–2020", event: "Dev Arora and Anuj Gupta co-found 8Minute, a rooftop solar startup. They deploy 100MW+ of clean energy capacity across homes and industries, learning firsthand that financing — not technology — is the primary barrier to clean energy adoption." },
  { year: "2020", event: "Watching the same financing wall kill EV uptake in India's commercial fleet sector, the 8Minute core team pivots. Alt Mobility is incorporated in New Delhi, incubated out of IIT Delhi's ecosystem, with a mission to remove the capital barrier to electric vehicle adoption." },
  { year: "2021–2022", event: "Alt Mobility launches its first operating leases for electric two- and three-wheelers targeted at last-mile delivery fleets and gig economy drivers in Delhi NCR. FleetOS, the proprietary telematics platform, begins early-stage development." },
  { year: "Jan 2024", event: "Raises $6M in a pre-Series A round co-led by Shell Ventures, Eurazeo, EV2 Ventures, and Twynam Earth Fund, with participation from UC Inclusive, Piper Serica, Pitchright, and LetsVenture. Fleet reaches 6,000+ vehicles across 12 cities." },
  { year: "Nov 2024", event: "Closes a $10M Series A led by Eurazeo, bringing total funding to $17.3M. Fleet surpasses 10,000 vehicles across 20 cities. Launches Drive-to-Own, Battery-as-a-Service (BaaS) for second-life batteries, and LCV / 4-wheeler leasing products. FY2025 revenue: ₹63.4Cr." },
  { year: "2025–2026", event: "Fleet expands to 16,000+ vehicles across 37 cities, capturing ~12.6% of Delhi's three-wheeler EV sales. AUM surpasses ₹350Cr on a path to ₹800Cr target. Fleet GPT AI assistant and parametric insurance verticals launch. Expansion into buses and intercity trucks announced." },
]

const COLS = [
  {
    h: "The Financing Wall India's EVs Kept Hitting",
    b: `Before electric vehicles could conquer India's streets, they had to conquer India's balance sheets. For fleet operators — the aggregators, logistics companies, and gig workers who drive commercial transport — buying an EV outright was impossible. Banks offered no financing for depreciating electric assets they didn't understand. OEM warranties were untested. And resale value was a question mark.\n\nDev Arora had seen this story before. When he built 8Minute, his rooftop solar venture, the technology worked. The financing didn't. Solar panels sat in warehouses while willing adopters couldn't find a lender. By 2020, watching the exact same wall emerge in the EV sector, Arora and his team of co-founders — Anuj Gupta, Harsh Dev Goyal, Manas Arora, and Jayant Gupta — decided not to fight it from the outside. They would become the financing infrastructure.`
  },
  {
    h: "Full-Stack: When Leasing Is Only the Beginning",
    b: `Most leasing companies hand over a vehicle and issue an invoice. Alt Mobility engineered the entire operational layer around the vehicle's life. A fleet operator on Alt's platform gets not just the EV, but insurance, maintenance contracts, 24x7 roadside assistance, access to charging and parking hubs, and real-time fleet intelligence from FleetOS — all bundled into a single monthly payment.\n\nFleetOS is the hidden engine of Alt's moat. Powered by AI and IoT, it provides live telematics, battery health monitoring, predictive maintenance alerts, and driver behavior analytics. The latest iteration includes Fleet GPT, an AI assistant that answers natural language queries about fleet data — from a vehicle's daily mileage to predicted payment defaults based on usage patterns. "EVs are essentially batteries on wheels," Arora has said. "Once you solve for financing and uptime, the economics take care of the rest."`
  },
  {
    h: "Drive-to-Own: Leasing as a Path to Liberation",
    b: `Alt Mobility's most consequential innovation is not a technology — it is a financial structure. The Drive-to-Own (DTO) model allows gig economy drivers who lack credit history or collateral to begin with a standard lease and progressively transition to full vehicle ownership. For a delivery rider in Delhi, this can reduce total cost of ownership by 30–40% while building an asset that outlasts any single platform.\n\nBacked by Shell Ventures, Eurazeo, and Australia's Twynam Earth Fund — investors spanning four continents — Alt Mobility is not just the largest EV fleet lessor in India by proprietary ownership. It is building the social infrastructure of the electric transition. With ₹200Cr in cumulative fuel savings delivered, 25,000 metric tonnes of CO₂ offset annually, and a fleet that owns roughly 12.6% of Delhi's three-wheeler EV market, the Delhi NCR startup is quietly writing the rules of India's green mobility economy.`
  }
]

const PULL_QUOTE = {
  text: "Traditional lenders were not built for the EV revolution. We needed to develop a new model — one that caters to both businesses and everyday drivers, and removes every barrier between them and the vehicle.",
  by: "Dev Arora, Co-Founder & CEO, Alt Mobility"
}

const LESSON = "Alt Mobility proves that the biggest opportunities in emerging markets are not in building the technology — they are in building the financial infrastructure that makes the technology accessible. By becoming the trust layer between EVs and India's fleet economy, Arora and his team created a moat no OEM or bank can easily replicate."

const INVESTORS = [
  "Eurazeo (Paris, France)",
  "Shell Ventures (Global)",
  "Twynam Earth Fund (Australia)",
  "EV2 Ventures",
  "UC Inclusive Credit",
  "Piper Serica",
  "Pitchright Ventures",
  "LetsVenture",
  "Beyond Capital Ventures",
]

const FAQS = [
  {
    q: "How does Alt Mobility make money?",
    a: "Alt Mobility earns revenue through monthly operating lease payments from fleet operators and individual drivers. Additional revenue streams include FleetOS SaaS fees, parametric insurance commissions, battery refurbishment services, fleet depot (charging and parking hub) operations, and its Battery-as-a-Service (BaaS) model for second-life vehicle batteries."
  },
  {
    q: "What types of vehicles does Alt Mobility lease?",
    a: "Alt Mobility primarily leases electric two-wheelers (E2W) and three-wheelers (E3W) for last-mile delivery and gig economy use. It has expanded into light commercial vehicles (LCVs), electric cars for employee transport and ride-hailing, and is preparing to launch bus and truck leasing for intercity and corporate fleets."
  },
  {
    q: "How is Alt Mobility different from other EV leasing companies in India?",
    a: "Unlike competitors who lease vehicles and stop there, Alt Mobility manages the full asset lifecycle — from financing and registration to insurance, maintenance, charging infrastructure, telematics (FleetOS), and end-of-life battery refurbishment. This integrated model gives fleet operators a single accountability partner and keeps operational costs 30–40% below traditional approaches."
  },
  {
    q: "Is Alt Mobility profitable?",
    a: "Alt Mobility states it has been profitable from inception at the unit economics level, doubling revenue each year. FY2025 revenues reached ₹63.4 crore. The company is focused on scaling AUM toward ₹800Cr while maintaining a lean cost structure to reach full-company profitability as fleet size grows."
  },
  {
    q: "What is the EV leasing market size in India?",
    a: "According to Mordor Intelligence, India's EV leasing market was valued at approximately $1.19 billion in 2025 and is projected to reach $5.33 billion by 2030, growing at a CAGR of roughly 35%. Alt Mobility is positioned as the infrastructure layer of this expansion."
  },
]

const RELATED = [
  { name: "Ather Energy", slug: "ather-energy", cat: "EV Manufacturing", val: "₹5,500Cr" },
  { name: "BluSmart Mobility", slug: "blusmart-mobility", cat: "EV Ride-Hailing", val: "$250M+" },
  { name: "Ola Electric", slug: "ola-electric", cat: "EV Two-Wheelers", val: "$4B+" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AltMobilityPage() {
  const accent = "#1a6b3a"         // Deep EV Green
  const accentLight = "#2d9e58"    // Mid Green for hover/accents
  const accentBg = "#f0f7f2"
  const accentBorder = "#b8dfc6"

  useEffect(() => {
    const existing = document.getElementById("page-jsonld")
    if (!existing) {
      const s = document.createElement("script")
      s.id = "page-jsonld"
      s.type = "application/ld+json"
      s.textContent = JSON.stringify(JSON_LD)
      document.head.appendChild(s)
    }
    return () => { document.getElementById("page-jsonld")?.remove() }
  }, [])

  return (
    <div style={{ minHeight: "100vh", background: "#F3EFE5", fontFamily: "'Georgia','Times New Roman',serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        .pf { font-family: 'Playfair Display', Georgia, serif !important; }
        .dropcap::first-letter {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 4em; font-weight: 900; line-height: 0.82;
          float: left; margin-right: 0.08em; margin-top: 0.06em; color: #1A1208;
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp .4s ease both; }
        @media (min-width:640px) {
          .ncols { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0; }
          .ncols > div { padding:0 1.5rem; border-right:1px solid #C8C2B4; }
          .ncols > div:first-child { padding-left:0; }
          .ncols > div:last-child { border-right:none; padding-right:0; }
        }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:#C8C2B4; }
      `}</style>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        Alt Mobility Founder Story — Dev Arora, Anuj Gupta & Team | India's Largest EV Leasing Platform | FleetOS | Drive-to-Own | UpForge
      </h1>

      {/* ── BREADCRUMB ── */}
      <nav
        aria-label="Breadcrumb"
        className="px-4 sm:px-8 py-2"
        style={{ background: "#EDE9DF", borderBottom: "1px solid #D8D2C4", fontFamily: "system-ui,sans-serif" }}
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-[9px] text-[#AAA] uppercase tracking-widest">
          {[
            { n: "UpForge", h: "/" },
            { n: "Startup Registry", h: "/startup" },
            { n: "EV Startups", h: "/ev-startups" },
            { n: "Alt Mobility", h: "/startup/alt-mobility" },
          ].map((b, i, arr) => (
            <li key={i} className="flex items-center gap-1.5">
              {i < arr.length - 1 ? (
                <a href={b.h} className="hover:text-[#1A1208] transition-colors">{b.n}</a>
              ) : (
                <span className="text-[#1A1208] font-semibold">{b.n}</span>
              )}
              {i < arr.length - 1 && <ChevronRight className="w-2.5 h-2.5 text-[#C8C2B4]" />}
            </li>
          ))}
        </ol>
      </nav>

      {/* ── MASTHEAD ── */}
      <header style={{ background: "#F3EFE5", borderBottom: "3px solid #1A1208" }}>
        <div className="text-center px-4 pt-3 pb-6" style={{ borderBottom: "1px solid #C8C2B4" }}>
          <p
            className="text-[8px] tracking-[0.44em] text-[#AAA] uppercase mb-2"
            style={{ fontFamily: "system-ui,sans-serif" }}
          >
            UpForge · Global Startup Registry · Electric Mobility · India
          </p>
          <p
            className="pf font-black leading-none text-[#1A1208]"
            style={{ fontSize: "clamp(2rem,5.5vw,4.2rem)" }}
          >
            The Founder Chronicle
          </p>
          <p className="italic mt-2 text-[#6B5C40]" style={{ fontSize: "clamp(12px,1.8vw,15px)" }}>
            Documenting the architects of India's Electric Fleet Economy — April 2026
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-20 sm:w-36" style={{ background: "#C8C2B4" }} />
            <span style={{ color: "#C8C2B4", fontSize: 12 }}>✦</span>
            <div className="h-px w-20 sm:w-36" style={{ background: "#C8C2B4" }} />
          </div>
        </div>
        <div
          className="flex items-center px-4 sm:px-8 py-2 gap-4"
          style={{ fontFamily: "system-ui,sans-serif", borderBottom: "1px solid #C8C2B4" }}
        >
          <span className="text-[8px] text-[#AAA] uppercase tracking-widest flex-shrink-0">Edition · Green Fleet 2026</span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: accent }}>
            EV Leasing & Fleet OS · April 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">New Delhi, India</span>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="fade-up max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div
          className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]"
          style={{ borderBottom: "2px solid #1A1208" }}
        >

          {/* ────── LEFT: EDITORIAL ────── */}
          <article className="py-8 lg:pr-8" style={{ borderRight: "1px solid #C8C2B4" }}>

            {/* Category tag */}
            <div className="flex items-center gap-3 mb-5" style={{ fontFamily: "system-ui,sans-serif" }}>
              <span
                className="text-[8.5px] font-black tracking-[0.28em] uppercase px-3 py-1.5 text-white"
                style={{ background: accent }}
              >
                EV / FLEET LEASING
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">April 2026</span>
            </div>

            {/* Headline */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              The Infrastructure Play: How Alt Mobility 
              Built India's <em style={{ color: accent }}>Full-Stack EV Fleet Economy.</em>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              India's electric vehicle revolution had a technology problem that turned out to be 
              a financing problem. Dev Arora and his four co-founders knew this — they had fought 
              the same battle in rooftop solar. This time, they didn't just remove the barrier. 
              They became the infrastructure. $17.3M raised. 16,000+ vehicles on the road across 
              37 cities. ₹350Cr+ in assets under management. And a proprietary Fleet OS platform 
              that may be the most valuable piece of data infrastructure in India's EV ecosystem.
            </p>

            {/* Byline */}
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}
            >
              {[
                "By UpForge Editorial",
                "New Delhi",
                "Est. 2020",
                "India's EV Fleet OS",
              ].map((t, i, a) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-[9px] text-[#AAA] uppercase tracking-wider">{t}</span>
                  {i < a.length - 1 && <span className="text-[#C8C2B4] text-[10px]">·</span>}
                </span>
              ))}
            </div>

            {/* Mobile hero image */}
            <div className="lg:hidden mb-8">
              <img
                src="/alt-mobility.jpg"
                alt="Dev Arora, Co-Founder & CEO of Alt Mobility — UpForge Founder Chronicle"
                className="w-full object-cover object-top"
                style={{ height: "min(300px,60vw)", display: "block" }}
                loading="eager"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800';
                }}
              />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>Dev Arora</p>
                <p
                  className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  Co-Founder & CEO · Alt Mobility
                </p>
              </div>
            </div>

            {/* 3-col newspaper body */}
            <div className="ncols">
              {COLS.map((col, ci) => (
                <div key={ci} className="mb-6 sm:mb-0">
                  <h3
                    className="font-black uppercase tracking-[0.13em] mb-3 pb-1.5"
                    style={{
                      fontSize: 11,
                      color: "#1A1208",
                      borderBottom: `1.5px solid ${accent}`,
                      fontFamily: "system-ui,sans-serif",
                    }}
                  >
                    {col.h}
                  </h3>
                  {col.b.split("\n\n").map((p, pi) => (
                    <p
                      key={pi}
                      className={`leading-[1.9] mb-3 text-[#2C2010] ${ci === 0 && pi === 0 ? "dropcap" : ""}`}
                      style={{ fontSize: "clamp(12.5px,1.3vw,13.5px)" }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Pull quote */}
            <div
              className="mt-10 pt-6 pb-6 text-center"
              style={{ borderTop: `3px double ${accent}`, borderBottom: "1px solid #C8C2B4" }}
            >
              <span style={{ display: "block", color: accent, fontSize: 24, marginBottom: 10 }}>❝</span>
              <blockquote
                className="pf italic text-[#1A1208] leading-[1.7] max-w-2xl mx-auto px-4"
                style={{ fontSize: "clamp(16px,2.2vw,22px)" }}
              >
                "{PULL_QUOTE.text}"
              </blockquote>
              <p
                className="text-[9px] uppercase tracking-[0.24em] text-[#AAA] mt-4"
                style={{ fontFamily: "system-ui,sans-serif" }}
              >
                — {PULL_QUOTE.by}
              </p>
            </div>

            {/* Company Timeline */}
            <div className="mt-8">
              <p
                className="text-[8.5px] font-black uppercase tracking-[0.26em] mb-4"
                style={{
                  color: accent,
                  fontFamily: "system-ui,sans-serif",
                  borderBottom: `1px solid ${accentBorder}`,
                  paddingBottom: 8,
                }}
              >
                Company Timeline
              </p>
              <ol style={{ fontFamily: "system-ui,sans-serif" }}>
                {TIMELINE.map((t, i) => (
                  <li key={i} className="flex gap-4 mb-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: accent }}
                      />
                      {i < TIMELINE.length - 1 && (
                        <div
                          className="w-px flex-1 mt-1"
                          style={{ background: accentBorder, minHeight: 24 }}
                        />
                      )}
                    </div>
                    <div>
                      <span
                        className="text-[9px] font-black uppercase tracking-wider"
                        style={{ color: accent }}
                      >
                        {t.year}
                      </span>
                      <p className="text-[12px] text-[#2C2010] mt-0.5 leading-relaxed">{t.event}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* FAQ */}
            <section className="mt-8">
              <p
                className="text-[8.5px] font-black uppercase tracking-[0.26em] mb-4"
                style={{
                  color: accent,
                  fontFamily: "system-ui,sans-serif",
                  borderBottom: `1px solid ${accentBorder}`,
                  paddingBottom: 8,
                }}
              >
                Frequently Asked Questions
              </p>
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="mb-4 pb-4"
                  style={{ borderBottom: "1px solid #D8D2C4" }}
                >
                  <h3
                    className="font-bold text-[#1A1208] mb-1.5"
                    style={{ fontSize: 13, fontFamily: "system-ui,sans-serif" }}
                  >
                    {faq.q}
                  </h3>
                  <p
                    className="text-[12.5px] text-[#5A4A30] leading-relaxed"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </section>
          </article>

          {/* ────── RIGHT: SIDEBAR ────── */}
          <aside className="hidden lg:block pl-8 pt-8 pb-8">
            <div className="sticky top-4 flex flex-col gap-5">

              {/* Founder image */}
              <div className="relative w-full overflow-hidden" style={{ height: 340 }}>
                <img
                  src="/alt-mobility.jpg"
                  alt="Dev Arora, Co-Founder & CEO of Alt Mobility — UpForge Founder Chronicle"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3.5"
                  style={{ background: "linear-gradient(to top, rgba(12,7,2,0.96) 60%, transparent)" }}
                >
                  <p className="pf text-white font-bold" style={{ fontSize: 14 }}>Dev Arora</p>
                  <p
                    className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Co-Founder & CEO · Alt Mobility
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn links */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.altmobility.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: `1.5px solid ${accent}`, textDecoration: "none" }}
                  aria-label="Visit Alt Mobility official website"
                >
                  <div className="flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: accent, fontFamily: "system-ui,sans-serif" }}
                    >
                      altmobility.in — Official Website
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/alt-mobility/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View Alt Mobility on LinkedIn"
                >
                  <div className="flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#0077b5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "#0077b5", fontFamily: "system-ui,sans-serif" }}
                    >
                      LinkedIn — Alt Mobility
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "#0077b5" }} />
                </a>
              </div>

              {/* By the Numbers */}
              <div style={{ border: "2px solid #1A1208" }}>
                <div className="px-4 py-2.5" style={{ background: "#1A1208" }}>
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.3em] text-white"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Alt Mobility Scale
                  </p>
                </div>
                <dl className="grid grid-cols-2 divide-x divide-y" style={{ borderColor: "#D8D2C4" }}>
                  {STATS.map((s, i) => (
                    <div key={i} className="px-4 py-3" style={{ borderColor: "#D8D2C4" }}>
                      <dt
                        className="text-[7.5px] text-[#AAA] uppercase tracking-[0.16em] mb-1"
                        style={{ fontFamily: "system-ui,sans-serif" }}
                      >
                        {s.l}
                      </dt>
                      <dd
                        className="pf font-black text-[#1A1208] leading-none"
                        style={{ fontSize: "1.25rem" }}
                      >
                        {s.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* The Lesson */}
              <div
                className="px-4 py-4"
                style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
              >
                <p
                  className="text-[8px] font-black uppercase tracking-[0.26em] mb-2"
                  style={{ color: accent, fontFamily: "system-ui,sans-serif" }}
                >
                  The Lesson
                </p>
                <p className="italic text-[#1A1208] leading-[1.72]" style={{ fontSize: 13 }}>
                  {LESSON}
                </p>
              </div>

              {/* Key Investors */}
              <div style={{ border: "1px solid #D8D2C4" }}>
                <div
                  className="px-4 py-2"
                  style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}
                >
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Key Investors
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {INVESTORS.map((inv, i) => (
                    <p
                      key={i}
                      className="flex items-center gap-2 text-[11px] text-[#2C2010]"
                      style={{ fontFamily: "system-ui,sans-serif" }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 1,
                          background: accent,
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                      {inv}
                    </p>
                  ))}
                </div>
              </div>

              {/* Also Read */}
              <div>
                <p
                  className="text-[8px] font-black uppercase tracking-[0.26em] mb-3"
                  style={{ color: "#AAA", fontFamily: "system-ui,sans-serif" }}
                >
                  Also Read on UpForge
                </p>
                {RELATED.map((r) => (
                  <a
                    key={r.slug}
                    href={`/startup/${r.slug}`}
                    className="flex items-center justify-between py-2.5 hover:opacity-70 transition-opacity"
                    style={{ borderBottom: "1px solid #EDE9DF", textDecoration: "none" }}
                  >
                    <div>
                      <p
                        className="text-[11px] font-bold text-[#1A1208]"
                        style={{ fontFamily: "system-ui,sans-serif" }}
                      >
                        {r.name}
                      </p>
                      <p className="text-[9px] text-[#AAA] uppercase tracking-wider">
                        {r.cat} · {r.val}
                      </p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#AAA]" />
                  </a>
                ))}
              </div>

            </div>
          </aside>
        </div>

        {/* ── SEO INTERNAL LINKS ── */}
        <section className="py-8" style={{ borderBottom: "1px solid #C8C2B4" }}>
          <p
            className="text-[9px] tracking-[0.3em] uppercase text-[#AAA] mb-4"
            style={{ fontFamily: "system-ui,sans-serif" }}
          >
            Explore the EV & Clean Mobility Ecosystem
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "India EV Startups 2026", h: "/ev-startups" },
              { l: "EV Leasing vs Buying", h: "/vs/ev-lease-vs-buy" },
              { l: "Shell Ventures Portfolio", h: "/shell-ventures-investments" },
              { l: "Eurazeo India Bets", h: "/eurazeo-india-portfolio" },
              { l: "FleetOS vs Competitors", h: "/vs/fleet-management-software" },
              { l: "India Green Economy", h: "/green-economy-india" },
              { l: "Startup Registry", h: "/startup" },
              { l: "Submit Profile", h: "/submit" },
            ].map((lnk) => (
              <a
                key={lnk.h}
                href={lnk.h}
                className="flex items-center gap-1 p-3 hover:border-[#1A1208] transition-all"
                style={{ border: "1px solid #D8D2C4", background: "white", textDecoration: "none" }}
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-wider text-[#1A1208]"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  {lnk.l}
                </span>
                <ChevronRight className="w-2.5 h-2.5 text-[#AAA] flex-shrink-0 ml-auto" />
              </a>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="pt-8 pb-2">
          <div
            className="grid sm:grid-cols-2 gap-6 items-center pb-8"
            style={{ borderBottom: "1px solid #D8D2C4" }}
          >
            <div>
              <p className="pf font-bold text-[#1A1208] mb-2" style={{ fontSize: "1.2rem" }}>
                Building India's clean mobility future? Get verified on UpForge.
              </p>
              <p
                className="text-[12px] text-[#6B5C40]"
                style={{ fontFamily: "system-ui,sans-serif" }}
              >
                Independent verification. Global search authority. Google Indexed.
              </p>
            </div>
            <div className="flex sm:justify-end">
              <a
                href="/submit"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-bold uppercase tracking-wider hover:opacity-90"
                style={{
                  background: "#1A1208",
                  fontSize: 11,
                  fontFamily: "system-ui,sans-serif",
                  textDecoration: "none",
                }}
              >
                List Your Startup — Free <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <p
            className="text-[9px] leading-relaxed mt-4"
            style={{ color: "#BBB0A0", fontFamily: "system-ui,sans-serif" }}
          >
            * Data sourced from public filings, Tracxn, Inc42, Crunchbase, YourStory, Autocar Professional,
            and Alt Mobility official announcements as of April 2026. UpForge is an independent registry.
            No paid placements or sponsored rankings. Valuations are estimates based on latest available
            funding data and market cycles. AUM and fleet figures as reported by Alt Mobility.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "EV Startup List", h: "/ev-startups" },
                { l: "Registry Home", h: "/startup" },
                { l: "India Unicorns", h: "/unicorns" },
                { l: "Ather Energy", h: "/startup/ather-energy" },
                { l: "BluSmart Profile", h: "/startup/blusmart-mobility" },
                { l: "Green Economy", h: "/green-economy-india" },
                { l: "Submit Profile", h: "/submit" },
              ].map((lnk) => (
                <li key={lnk.h}>
                  <a
                    href={lnk.h}
                    className="text-[9px] text-[#AAA] hover:text-[#1A1208] uppercase tracking-wider transition-colors"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    {lnk.l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </footer>
      </main>
    </div>
  )
}
