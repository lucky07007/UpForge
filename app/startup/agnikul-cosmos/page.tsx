"use client"

// app/startup/agnikul-cosmos/page.tsx
// UpForge — Agnikul Cosmos · Srinath Ravichandran Founder Chronicle
// SEO: FAQPage ONLY in JSON-LD. No microdata on FAQ HTML. mainEntity is proper JSON array.

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://upforge.in/startup/agnikul-cosmos#article",
      "headline": "Agnikul Cosmos — How Srinath Ravichandran Built the World's First 3D-Printed Rocket From IIT Madras",
      "description": "Agnikul Cosmos founder story — Srinath Ravichandran co-founded India's most innovative private space company at IIT Madras. World's first single-piece 3D-printed semi-cryogenic engine. $72.8M raised. $500M valuation.",
      "url": "https://upforge.in/startup/agnikul-cosmos",
      "datePublished": "2026-03-14T00:00:00+05:30",
      "dateModified": "2026-03-14T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.in/Upforge-Agnikul.webp",
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
          "name": "Srinath Ravichandran",
          "jobTitle": "Co-Founder & CEO",
          "worksFor": { "@type": "Organization", "name": "Agnikul Cosmos" },
          "sameAs": ["https://www.linkedin.com/company/agnikul-cosmos/"]
        },
        {
          "@type": "Person",
          "name": "Moin SPM",
          "jobTitle": "Co-Founder & COO",
          "worksFor": { "@type": "Organization", "name": "Agnikul Cosmos" }
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "Agnikul Cosmos",
        "url": "https://agnikul.in",
        "foundingDate": "2017",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "Chennai",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        },
        "description": "Agnikul Cosmos is an Indian private aerospace company building customizable orbital launch vehicles powered by the world's first single-piece 3D-printed semi-cryogenic rocket engine, Agnilet.",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 150 },
        "sameAs": [
          "https://agnikul.in",
          "https://www.linkedin.com/company/agnikul-cosmos/",
          "https://twitter.com/agnikulcosmos",
          "https://en.wikipedia.org/wiki/AgniKul_Cosmos"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "Spacetech Startups India", "item": "https://upforge.in/spacetech-startups" },
        { "@type": "ListItem", "position": 4, "name": "Agnikul Cosmos", "item": "https://upforge.in/startup/agnikul-cosmos" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who founded Agnikul Cosmos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Agnikul Cosmos was co-founded in 2017 by Srinath Ravichandran (CEO), Moin SPM (COO), Prof. Satyanarayanan Chakravarthy, and Janardhana Raju — all based at or connected to IIT Madras, Chennai. The company was incubated within the IIT Madras Research Park."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Agnilet engine?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Agnilet is the world's first single-piece 3D-printed semi-cryogenic rocket engine, developed by Agnikul Cosmos. It runs on LOX and Kerosene, was first test-fired in February 2021, and first flown in May 2024 aboard Agnibaan SOrTeD — the world's first flight with a 3D-printed engine."
          }
        },
        {
          "@type": "Question",
          "name": "How much funding has Agnikul Cosmos raised?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Agnikul Cosmos has raised $72.8 million across 10 funding rounds. Their November 2025 Series C of ₹150 crore ($17M) was raised at a $500 million valuation. Investors include Pi Ventures, Speciale Invest, Artha Venture Fund, HDFC Bank, Mayfield, and 100X.VC."
          }
        },
        {
          "@type": "Question",
          "name": "What was the Agnibaan SOrTeD launch?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "On May 30, 2024, Agnikul Cosmos launched Agnibaan SOrTeD (SubOrbital Technological Demonstrator) from India's first private launchpad at Sriharikota — achieving the world's first flight with a single-piece 3D-printed engine, India's first semi-cryogenic engine launch, and India's first launch from a private launchpad, all in one mission."
          }
        },
        {
          "@type": "Question",
          "name": "What is Agnibaan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Agnibaan is Agnikul Cosmos's orbital launch vehicle — 18 metres tall, two-stage, capable of placing 100 kg into a 700 km orbit. It uses clustered Agnilet semi-cryogenic engines and launches from a fully mobile launchpad, enabling deployment from any geographic location worldwide."
          }
        },
        {
          "@type": "Question",
          "name": "What is Agnikul Cosmos's valuation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As of November 2025, Agnikul Cosmos is valued at approximately $500 million, following their Series C funding round. Total funding stands at $72.8 million across 10 rounds."
          }
        }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Valuation", v: "$500M" },
  { l: "Total Funding", v: "$72.8M" },
  { l: "Founded", v: "2017" },
  { l: "HQ", v: "Chennai, TN" },
  { l: "Payload", v: "100 kg LEO" },
  { l: "Engine", v: "3D Semi-Cryo" },
]

const TIMELINE = [
  { year: "2017", event: "Agnikul Cosmos founded at IIT Madras Research Park by Srinath Ravichandran, Moin SPM, Prof. Satyanarayanan Chakravarthy & Janardhana Raju. ₹3 crore seed raised." },
  { year: "2021", event: "World's first single-piece 3D-printed semi-cryogenic engine, Agnilet, successfully test-fired. Framework agreement signed with Department of Space for ISRO facility access." },
  { year: "2022", event: "Agnilet test-fired at Vikram Sarabhai Space Centre, Thumba. Construction begins on India's first private launchpad at Sriharikota." },
  { year: "2023", event: "$26.7M Series B raised, taking total to $40M. 35 Letters of Intent signed with global satellite customers across India, Middle East, and Australia." },
  { year: "May 2024", event: "Historic Agnibaan SOrTeD launch — world's first 3D-printed engine flight, India's first semi-cryo launch, from India's first private launchpad at Sriharikota." },
  { year: "Nov 2025", event: "₹150 crore Series C closed at $500M valuation. Total funding: $72.8M. Tamil Nadu allocates 350 acres for integrated space campus. Reusability patent granted." },
]

const COLS = [
  {
    h: "The Wall Street Trader Who Chose Rockets",
    b: `Srinath Ravichandran did not take the obvious path. After engineering school, he spent years on Wall Street as a trader — the kind of career most people settle into for life. But the engineer in him refused to stay quiet.\n\nIn 2017, he returned to what he had always loved and co-founded Agnikul Cosmos inside IIT Madras, alongside Moin SPM, Prof. Satyanarayanan Chakravarthy, and Janardhana Raju.\n\n"All the big startup stories in the US for space still seem to be driven by billionaires," Ravichandran said. "Here in India, none of us had that kind of money to start." That constraint became a design philosophy — build lean, build smart, build precisely.`
  },
  {
    h: "The Engine That Changed Everything",
    b: `India's private space story needed a technology bet that was genuinely defensible — something no one else had done. Agnikul chose 3D-printed rocket engines, not as a gimmick, but as a fundamental manufacturing philosophy.\n\nIn February 2021, the team test-fired Agnilet — the world's first single-piece 3D-printed semi-cryogenic rocket engine, manufactured in one continuous print with no assembled parts. It cut engine production time by 60% and enabled iterating hardware as fast as software.\n\nThe rocket built around Agnilet is called Agnibaan — 18 metres, two-stage, capable of placing 100 kg into 700 km orbit. Launchable from a fully mobile launchpad. From anywhere on Earth.`
  },
  {
    h: "Four Failures, One Flight, A Factory",
    b: `Before the breakthrough May 2024 launch, Agnikul endured four failed attempts. Each abort was public. Each one tested founder resolve and investor confidence.\n\nWhen Agnibaan SOrTeD finally lifted off from India's first private launchpad at Sriharikota on May 30, 2024, it achieved three simultaneous world firsts — and proved India's private space era had truly arrived.\n\nIn November 2025, a ₹150 crore Series C closed at a $500M valuation. Tamil Nadu allocated 350 acres for an integrated space campus. The next target: 50 launches per year by 2028 — and full reusability within ten missions.`
  }
]

const PULL_QUOTE = {
  text: "We have consistently designed our vehicles to ensure that affordability and flexibility are never afterthoughts — they are built in from day one.",
  by: "Srinath Ravichandran, Co-Founder & CEO, Agnikul Cosmos"
}

const LESSON = "In the new space economy, the advantage goes to whoever can manufacture fastest, iterate hardest, and launch from anywhere. Agnikul printed its way to the front of the queue — one engine at a time."

const INVESTORS = [
  "Pi Ventures",
  "Speciale Invest",
  "Artha Venture Fund",
  "Mayfield",
  "HDFC Bank",
  "100X.VC",
  "Celesta Capital",
  "Anand Mahindra (personal)",
]

const FAQS = [
  {
    q: "Who are the founders of Agnikul Cosmos?",
    a: "Agnikul Cosmos was co-founded in 2017 by Srinath Ravichandran (CEO), Moin SPM (COO), Prof. Satyanarayanan Chakravarthy, and Janardhana Raju — all at IIT Madras, Chennai. Ravichandran is a former Wall Street trader who left finance to build rockets."
  },
  {
    q: "What makes Agnilet unique?",
    a: "Agnilet is the world's first single-piece 3D-printed semi-cryogenic rocket engine — manufactured in a single continuous print process with zero assembled parts. This approach cuts production time by ~60%, enables rapid iteration, and makes Agnikul's launches significantly cheaper and faster to prepare than traditional rocket manufacturing."
  },
  {
    q: "How does Agnikul compare to Skyroot Aerospace?",
    a: "Both are Indian private launch startups, but with different approaches. Agnikul's core differentiator is the 3D-printed semi-cryogenic Agnilet engine and a fully mobile launchpad system that enables launch from any location. Skyroot uses solid and liquid engines and completed India's first private orbital attempt with Vikram-S in 2022. Agnikul's SOrTeD launch in May 2024 was the world's first flight with a 3D-printed engine."
  },
  {
    q: "Is Agnikul Cosmos profitable?",
    a: "Agnikul is pre-profitability, investing heavily in vehicle development, manufacturing infrastructure, and launchpad construction. The company is backed by $72.8M in funding and 35+ Letters of Intent from global customers. Profitability is targeted as the company scales toward its 50 launches per year goal by 2028."
  },
]

const RELATED = [
  { name: "Sarvam AI", slug: "sarvam-ai", cat: "Artificial Intelligence", val: "$1B+" },
  { name: "Zepto", slug: "zepto", cat: "Quick Commerce", val: "$5.9B" },
  { name: "Ather Energy", slug: "ather-energy-ev", cat: "Electric Vehicles", val: "$1.3B" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AgnikulCosmosPage() {
  const accent = "#1a2744"
  const accentMid = "#2d3f6b"
  const accentBg = "#eef2fb"
  const accentBorder = "#c5d3ef"

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
        Agnikul Cosmos Founder Story — Srinath Ravichandran | World's First 3D-Printed Rocket | India Private Space | UpForge
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
            { n: "Spacetech Startups", h: "/spacetech-startups" },
            { n: "Agnikul Cosmos", h: "/startup/agnikul-cosmos" },
          ].map((b, i, arr) => (
            <li key={i} className="flex items-center gap-1.5">
              {i < arr.length - 1 ? (
                <Link href={b.h} className="hover:text-[#1A1208] transition-colors">{b.n}</Link>
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
            UpForge · Startup Registry · Spacetech
          </p>
          <p
            className="pf font-black leading-none text-[#1A1208]"
            style={{ fontSize: "clamp(2rem,5.5vw,4.2rem)" }}
          >
            The Founder Chronicle
          </p>
          <p className="italic mt-2 text-[#6B5C40]" style={{ fontSize: "clamp(12px,1.8vw,15px)" }}>
            India's independent startup registry — verified, editorial, March 2026
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
          <span className="text-[8px] text-[#AAA] uppercase tracking-widest flex-shrink-0">Edition · Spacetech</span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span
            className="text-[9px] font-black uppercase tracking-wider"
            style={{ color: accent }}
          >
            Private Space · March 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">Chennai, Tamil Nadu</span>
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
                SPACETECH
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">March 2026</span>
            </div>

            {/* Headline */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              Space should be accessible to everyone — not just billionaires.{" "}
              <em style={{ color: "#8b2e12" }}>India proved it.</em>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              From an IIT Madras lab to India's first private launchpad — Srinath Ravichandran
              built the world's first single-piece 3D-printed rocket engine and launched a new
              era for Indian spacetech. $72.8M raised. $500M valuation. 50 launches per year
              by 2028. The Agnikul Cosmos story.
            </p>

            {/* Byline */}
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}
            >
              {[
                "By UpForge Editorial",
                "Chennai, Tamil Nadu",
                "Est. 2017",
                "India's Rocket Factory",
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
                src="/Upforge-Agnikul.webp"
                alt="Srinath Ravichandran, Co-Founder & CEO of Agnikul Cosmos — UpForge Founder Chronicle"
                className="w-full object-cover object-top"
                style={{ height: "min(300px,60vw)", display: "block" }}
                loading="eager"
              />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>Srinath Ravichandran</p>
                <p
                  className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  Co-Founder & CEO · Agnikul Cosmos
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
              <span style={{ display: "block", color: accentMid, fontSize: 24, marginBottom: 10 }}>❝</span>
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

            {/* FAQ — visual only, NO microdata (schema is in JSON-LD) */}
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
                  src="/Upforge-Agnikul.webp"
                  alt="Srinath Ravichandran, Co-Founder & CEO of Agnikul Cosmos — UpForge Founder Chronicle"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3.5"
                  style={{ background: "linear-gradient(to top, rgba(12,7,2,0.96) 60%, transparent)" }}
                >
                  <p className="pf text-white font-bold" style={{ fontSize: 14 }}>
                    Srinath Ravichandran
                  </p>
                  <p
                    className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Co-Founder & CEO · Agnikul Cosmos
                  </p>
                </div>
              </div>

              {/* Links — website + LinkedIn */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://agnikul.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{
                    border: `1.5px solid ${accent}`,
                    fontFamily: "system-ui,sans-serif",
                    textDecoration: "none",
                  }}
                  aria-label="Visit Agnikul Cosmos official website"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={accent}
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: accent }}
                    >
                      agnikul.in — Official Website
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/agnikul-cosmos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{
                    border: "1.5px solid #0077b5",
                    fontFamily: "system-ui,sans-serif",
                    textDecoration: "none",
                  }}
                  aria-label="View Agnikul Cosmos on LinkedIn"
                >
                  <div className="flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#0077b5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "#0077b5" }}
                    >
                      LinkedIn — Agnikul Cosmos
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
                    By the Numbers
                  </p>
                </div>
                <dl
                  className="grid grid-cols-2 divide-x divide-y"
                  style={{ borderColor: "#D8D2C4" }}
                >
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
                  <Link
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
                  </Link>
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
            Explore More on UpForge
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "Spacetech Startups India", h: "/spacetech-startups" },
              { l: "Indian Unicorns Full List", h: "/indian-unicorns" },
              { l: "Deep Tech Startups India", h: "/deep-tech-startups" },
              { l: "Top AI Startups 2026", h: "/top-ai-startups" },
              { l: "Agnikul vs Skyroot", h: "/spacetech-startups/agnikul-vs-skyroot" },
              { l: "IIT Madras Startups", h: "/iit-madras-startups" },
              { l: "Startup Registry India", h: "/startup" },
              { l: "Submit Your Startup", h: "/submit" },
            ].map((lnk) => (
              <Link
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
              </Link>
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
                Building India's next unicorn? Get verified on UpForge.
              </p>
              <p
                className="text-[12px] text-[#6B5C40]"
                style={{ fontFamily: "system-ui,sans-serif" }}
              >
                Free startup profiles. Independent verification. Indexed by Google.
              </p>
            </div>
            <div className="flex sm:justify-end">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-bold uppercase tracking-wider hover:opacity-90"
                style={{
                  background: "#1A1208",
                  fontSize: 11,
                  fontFamily: "system-ui,sans-serif",
                  textDecoration: "none",
                }}
                aria-label="List your Indian startup on UpForge for free"
              >
                List Your Startup — Free <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <p
            className="text-[9px] leading-relaxed mt-4"
            style={{ color: "#BBB0A0", fontFamily: "system-ui,sans-serif" }}
          >
            * Data sourced from public filings, Wikipedia, Tracxn, Inc42, YourStory, and Agnikul
            Cosmos press releases as of March 2026. UpForge is an independent registry — no paid
            placements, no sponsored rankings. Funding figures and valuations are approximate and
            reflect latest available public data.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "Spacetech Startups India", h: "/spacetech-startups" },
                { l: "Startup Registry", h: "/startup" },
                { l: "Indian Unicorns", h: "/indian-unicorns" },
                { l: "Ather Energy Profile", h: "/startup/ather-energy-ev" },
                { l: "Sarvam AI Profile", h: "/startup/sarvam-ai" },
                { l: "Deep Tech Startups", h: "/deep-tech-startups" },
                { l: "Submit Startup", h: "/submit" },
              ].map((lnk) => (
                <li key={lnk.h}>
                  <Link
                    href={lnk.h}
                    className="text-[9px] text-[#AAA] hover:text-[#1A1208] uppercase tracking-wider transition-colors"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    {lnk.l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </footer>
      </main>
    </div>
  )
}
