"use client"

// app/startup/atlan-data/page.tsx
// UpForge — Atlan · Prukalpa Sankar & Varun Banka Founder Chronicle
// SEO: FAQPage ONLY in JSON-LD. Zero microdata on FAQ HTML = no duplicate error.
// SEO: mainEntity is a proper JSON array [].

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://upforge.in/startup/atlan-data#article",
      "headline": "Atlan — How Prukalpa Sankar & Varun Banka Built India's $750M Data Intelligence Unicorn",
      "description": "Atlan founder story — Prukalpa Sankar and Varun Banka built SocialCops to fix India's national data problem, then spun out Atlan to solve data chaos for the world's largest enterprises. $206M raised. $750M valuation. Trusted by Mastercard, Nasdaq, Unilever, and General Motors.",
      "url": "https://upforge.in/startup/atlan-data",
      "datePublished": "2026-03-14T00:00:00+05:30",
      "dateModified": "2026-03-14T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.in/Upforge-atlan-data.webp",
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
          "name": "Prukalpa Sankar",
          "jobTitle": "Co-Founder & Co-CEO",
          "worksFor": { "@type": "Organization", "name": "Atlan" },
          "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "Nanyang Technological University, Singapore"
          },
          "sameAs": ["https://www.linkedin.com/company/atlan-hq/"]
        },
        {
          "@type": "Person",
          "name": "Varun Banka",
          "jobTitle": "Co-Founder & Co-CEO",
          "worksFor": { "@type": "Organization", "name": "Atlan" },
          "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "Nanyang Technological University, Singapore"
          }
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "Atlan",
        "url": "https://atlan.com",
        "foundingDate": "2019",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "New Delhi",
          "addressCountry": "IN"
        },
        "description": "Atlan is the AI Context Layer for the enterprise — a data catalog, governance, and metadata management platform that helps data and business teams find, trust, and govern AI-ready data across their entire technology stack.",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 300 },
        "sameAs": [
          "https://atlan.com",
          "https://www.linkedin.com/company/atlan-hq/",
          "https://twitter.com/AtlanHQ"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "SaaS Startups India", "item": "https://upforge.in/best-saas-startups" },
        { "@type": "ListItem", "position": 4, "name": "Atlan", "item": "https://upforge.in/startup/atlan-data" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who founded Atlan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Atlan was co-founded by Prukalpa Sankar and Varun Banka, both alumni of Nanyang Technological University (NTU), Singapore, where they met on a bus ride to campus in 2012. Before Atlan, they co-founded SocialCops — a data-for-social-good company that built India's national data platform, used by the Prime Minister's office. Atlan was spun out of SocialCops in 2019 after the internal data collaboration tool they built proved more valuable than the projects it supported."
          }
        },
        {
          "@type": "Question",
          "name": "What does Atlan do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Atlan is the AI Context Layer for the enterprise — a modern data catalog, governance, and active metadata management platform. It connects to 80+ data tools including Snowflake, Databricks, BigQuery, Looker, Salesforce, and AI LLMs to create a unified map of an organization's entire data estate. Enterprise teams use Atlan to find, understand, govern, and trust their data — and to make it AI-ready for AI agents and LLMs."
          }
        },
        {
          "@type": "Question",
          "name": "How much funding has Atlan raised?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Atlan has raised $206 million across 5 funding rounds. The Series C of $105 million, closed in May 2024, was led by GIC (Singapore's sovereign wealth fund) and Meritech Capital, valuing the company at $750 million. Other investors include Insight Partners, Peak XV Partners (formerly Sequoia India), Salesforce Ventures, and WaterBridge Ventures."
          }
        },
        {
          "@type": "Question",
          "name": "What is Atlan's valuation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Atlan is valued at $750 million following its May 2024 Series C round of $105 million led by GIC and Meritech Capital. Revenue grew more than 7x in two years, with 400% enterprise sales growth in Q1 2024. At its current growth trajectory, Atlan is widely expected to cross unicorn status ($1B valuation) in its next funding event."
          }
        },
        {
          "@type": "Question",
          "name": "Who are Atlan's customers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Atlan serves 500+ enterprise customers including Mastercard, Nasdaq, Unilever, General Motors, Cisco, Autodesk, HubSpot, Dropbox, Fox, News Corp, Ralph Lauren, NHS, Plaid, Workday, Virgin Media O2, and Marriott. The company claims a 75% win rate in competitive trials and is the sole leader in G2's Active Metadata Management category since its inception."
          }
        },
        {
          "@type": "Question",
          "name": "What is SocialCops and how is it connected to Atlan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SocialCops was a 'data for social good' company co-founded by Prukalpa Sankar and Varun Banka in 2012 to use big data for development decisions. It built India's national data platform used by the Prime Minister's office, NITI Aayog, and the UN. The internal data collaboration tool built to manage SocialCops' own data chaos — tried and refined across 200+ projects — became the foundation for Atlan, which was spun out as a standalone company in 2019."
          }
        }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Valuation", v: "$750M" },
  { l: "Total Funding", v: "$206M" },
  { l: "Founded", v: "2019" },
  { l: "HQ", v: "New York / Delhi" },
  { l: "Revenue Growth", v: "7x in 2yr" },
  { l: "Customers", v: "500+" },
]

const TIMELINE = [
  {
    year: "2012",
    event: "Prukalpa Sankar and Varun Banka meet at Nanyang Technological University, Singapore. They co-found SocialCops at the Microsoft Imagine Cup — runners-up. Mission: use big data for social good.",
  },
  {
    year: "2012–18",
    event: "SocialCops builds India's national data platform. Used by the PM's office, NITI Aayog, and the UN. Across 200+ data projects, the internal data collaboration tool they build proves more powerful than the projects it supports.",
  },
  {
    year: "2019",
    event: "Atlan spun out of SocialCops as a standalone company. First external funding from WaterBridge Ventures and Rajan Anandan. The product repositions from internal tool to enterprise data catalog platform.",
  },
  {
    year: "2021–22",
    event: "Named a Forrester Wave Leader for Enterprise Data Catalogs and G2 Leader in five categories — the sole leader in Active Metadata Management since the category's inception. Insight Partners and Peak XV back the company.",
  },
  {
    year: "Mar 2024",
    event: "$27.5M funding led by Salesforce Ventures. Salesforce becomes both an investor and a key integration partner — signalling that Atlan is becoming foundational enterprise infrastructure.",
  },
  {
    year: "May 2024",
    event: "$105M Series C led by GIC (Singapore's sovereign wealth fund) and Meritech Capital. Valuation reaches $750M. Revenue 7x over two years. 400% enterprise sales growth in Q1 2024. Total raised: $206M.",
  },
  {
    year: "2025–26",
    event: "Named Leader in Gartner Magic Quadrant for Metadata Management Solutions (2025) and Data & Analytics Governance (2026). Atlan MCP Server launched — bringing its context layer directly into every AI agent workflow.",
  },
]

const COLS = [
  {
    h: "A Bus Ride That Changed Indian Data",
    b: `Prukalpa Sankar was about to graduate from Nanyang Technological University in 2012, with internship offers from ExxonMobil and Goldman Sachs already in hand. On a bus to campus, she met Varun Banka — same batch, same obsession with startups, same desire to do something that mattered.\n\nAt the Microsoft Imagine Cup that April, they ideated SocialCops: a big data platform for development decisions. They finished runners-up and returned to India to build it for real. Over the next six years, SocialCops built the national data platform used by India's Prime Minister's office, NITI Aayog, and the United Nations — helping route everything from rural healthcare logistics to agricultural insurance data.\n\n"On the outside, you think 'cool projects,'" Sankar told Datanami. "But on the inside, it was not. It was just chaos every single day." Managing data across 200+ simultaneous projects, with every team working in different tools and formats, was ungovernable. They tried three separate data catalog and governance tools. None worked. The fourth time around — the one they built themselves — finally did.`,
  },
  {
    h: "The Internal Tool That Became a $750M Company",
    b: `By 2019, Sankar and Banka faced a question most founders never get to ask: the side project built to manage their real company was more valuable than the real company.\n\nAtlan — the internal data collaboration tool — had been stress-tested across 200 projects, dozens of data sources, and a team of analysts, scientists, and engineers who each worked in their own preferred tools. It had become, as Sankar describes it, a "GitHub for data teams" — a place where data has lineage, owners, definitions, and trust scores, connected across every system in an organisation.\n\nThey spun it out in 2019. Within two years, Forrester named it a Wave Leader for Enterprise Data Catalogs. Within three, it was the sole leader in G2's Active Metadata Management category — a category it effectively invented. By May 2024, GIC (Singapore's sovereign wealth fund) and Meritech Capital led a $105M Series C at a $750M valuation. Revenue had grown 7x in two years. Enterprise sales had grown 400% in a single quarter.`,
  },
  {
    h: "Context Is King — The AI Inflection Point",
    b: `Every major enterprise AI initiative runs into the same wall. The model is fine. The problem is that the model knows nothing about the business it's being asked to reason about. What does "revenue" mean here — gross or net? Which Snowflake table has the authoritative number? Whose definition of "active customer" should the dashboard use?\n\nAtlan's entire product is the answer to that question. Its Enterprise Data Graph — built by connecting 80+ data tools including Snowflake, Databricks, BigQuery, Salesforce, BI platforms, and AI LLMs — holds the institutional knowledge that makes AI agents actually useful in production.\n\n"In 1996, Bill Gates wrote that content is king," Varun Banka noted in 2025. "In 2025, context is king." The launch of Atlan's MCP Server — which pipes its enterprise context directly into any AI agent — completed the circle. The company that started on a bus in Singapore, building a data platform for India's poorest districts, is now the context layer that makes enterprise AI work for Mastercard, General Motors, and the NHS.`,
  },
]

const PULL_QUOTE = {
  text: "The main hurdle isn't AI models — it's the lack of AI-ready data. Data enriched with business context, trust, and security. That's what Atlan builds.",
  by: "Prukalpa Sankar, Co-Founder & Co-CEO, Atlan",
}

const LESSON =
  "The best B2B infrastructure companies are born from personal pain. Sankar and Banka didn't research the data governance market — they lived the problem for seven years at SocialCops. When they finally built the right tool, they already knew every edge case. That's an unfair advantage no competitor can replicate from a whiteboard."

const INVESTORS = [
  "GIC — Singapore Sovereign Wealth Fund",
  "Meritech Capital",
  "Insight Partners",
  "Peak XV Partners (Sequoia India)",
  "Salesforce Ventures",
  "WaterBridge Ventures",
  "Rajan Anandan (Angel)",
  "Snowflake (Strategic)",
]

const FAQS = [
  {
    q: "Who are the founders of Atlan and where did they study?",
    a: "Atlan was co-founded by Prukalpa Sankar and Varun Banka, who met at Nanyang Technological University (NTU), Singapore in 2012. Both serve as co-CEOs. Before Atlan, they co-founded SocialCops — which built India's national data platform used by the PM's office and the UN.",
  },
  {
    q: "What is Atlan's data catalog and how does it work?",
    a: "Atlan scans an organisation's entire data ecosystem — connecting to 80+ tools including Snowflake, Databricks, BigQuery, Looker, Salesforce, and AI models — and creates a unified, living map of every data asset, its lineage, ownership, definitions, quality scores, and access policies. Teams can search, discover, govern, and collaborate around data from one place. The platform also uses AI to auto-generate metadata and surface context for AI agents via its MCP Server.",
  },
  {
    q: "How does Atlan compare to Alation, Collibra, and Microsoft Purview?",
    a: "Atlan differentiates through its collaboration-first, metadata lakehouse architecture and active metadata approach — pulling context automatically rather than requiring manual tagging. It scored higher than Alation and Collibra in the 2024 and 2025 Forrester Wave for Enterprise Data Catalogs, and has a 75% competitive win rate. Gartner named it a Leader in both Metadata Management Solutions (2025) and Data & Analytics Governance (2026).",
  },
  {
    q: "What is Atlan's MCP Server?",
    a: "Atlan's MCP (Model Context Protocol) Server pipes the enterprise context layer — all data definitions, lineage, quality scores, and business glossary terms — directly into AI agents and LLMs. This means any AI tool connected to Atlan's MCP Server instantly knows your organisation's data dictionary, business logic, and trusted data sources, enabling reliable AI reasoning in production without hallucination.",
  },
]

const RELATED = [
  { name: "Sarvam AI", slug: "sarvam-ai", cat: "Artificial Intelligence", val: "$1B+" },
  { name: "Articulus Surgical", slug: "articulus-surgical", cat: "MedTech", val: "Kalaari" },
  { name: "Agnikul Cosmos", slug: "agnikul-cosmos", cat: "Spacetech", val: "$500M" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AtlanDataPage() {
  const accent = "#2563eb"
  const accentDark = "#1d4ed8"
  const accentBg = "#eff6ff"
  const accentBorder = "#bfdbfe"

  useEffect(() => {
    const existing = document.getElementById("page-jsonld")
    if (!existing) {
      const s = document.createElement("script")
      s.id = "page-jsonld"
      s.type = "application/ld+json"
      s.textContent = JSON.stringify(JSON_LD)
      document.head.appendChild(s)
    }
    return () => {
      document.getElementById("page-jsonld")?.remove()
    }
  }, [])

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F3EFE5",
        fontFamily: "'Georgia','Times New Roman',serif",
      }}
    >
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
        Atlan Founder Story — Prukalpa Sankar & Varun Banka | India's $750M Data Intelligence Unicorn | Data Catalog | UpForge
      </h1>

      {/* ── BREADCRUMB ── */}
      <nav
        aria-label="Breadcrumb"
        className="px-4 sm:px-8 py-2"
        style={{
          background: "#EDE9DF",
          borderBottom: "1px solid #D8D2C4",
          fontFamily: "system-ui,sans-serif",
        }}
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-[9px] text-[#AAA] uppercase tracking-widest">
          {[
            { n: "UpForge", h: "/" },
            { n: "Startup Registry", h: "/startup" },
            { n: "SaaS Startups India", h: "/best-saas-startups" },
            { n: "Atlan", h: "/startup/atlan-data" },
          ].map((b, i, arr) => (
            <li key={i} className="flex items-center gap-1.5">
              {i < arr.length - 1 ? (
                <Link href={b.h} className="hover:text-[#1A1208] transition-colors">
                  {b.n}
                </Link>
              ) : (
                <span className="text-[#1A1208] font-semibold">{b.n}</span>
              )}
              {i < arr.length - 1 && (
                <ChevronRight className="w-2.5 h-2.5 text-[#C8C2B4]" />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* ── MASTHEAD ── */}
      <header style={{ background: "#F3EFE5", borderBottom: "3px solid #1A1208" }}>
        <div
          className="text-center px-4 pt-3 pb-6"
          style={{ borderBottom: "1px solid #C8C2B4" }}
        >
          <p
            className="text-[8px] tracking-[0.44em] text-[#AAA] uppercase mb-2"
            style={{ fontFamily: "system-ui,sans-serif" }}
          >
            UpForge · Startup Registry · Data & AI
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
          <span className="text-[8px] text-[#AAA] uppercase tracking-widest flex-shrink-0">
            Edition · Data & AI
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span
            className="text-[9px] font-black uppercase tracking-wider"
            style={{ color: accent }}
          >
            SaaS / Data Intelligence · March 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">New Delhi · New York</span>
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
                DATA & AI / SAAS
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">March 2026</span>
            </div>

            {/* Headline */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              They built India's national data platform.
              Then the tool they made for themselves{" "}
              <em style={{ color: accent }}>became a $750 million company.</em>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              Prukalpa Sankar and Varun Banka spent seven years solving India's data problem
              at the national scale — building platforms for the PM's office, the UN, and NITI
              Aayog. The data chaos of doing that work forced them to build their own tool.
              That tool became Atlan. $206M raised. $750M valuation. Mastercard, Nasdaq,
              General Motors, and the NHS trust it with their most critical data.
            </p>

            {/* Byline */}
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}
            >
              {[
                "By UpForge Editorial",
                "New Delhi · New York",
                "Est. 2019",
                "The AI Context Layer",
              ].map((t, i, a) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-[9px] text-[#AAA] uppercase tracking-wider">{t}</span>
                  {i < a.length - 1 && (
                    <span className="text-[#C8C2B4] text-[10px]">·</span>
                  )}
                </span>
              ))}
            </div>

            {/* Mobile hero image */}
            <div className="lg:hidden mb-8">
              <img
                src="/Upforge-atlan-data.webp"
                alt="Prukalpa Sankar and Varun Banka, Co-Founders of Atlan — UpForge Founder Chronicle"
                className="w-full object-cover object-top"
                style={{ height: "min(300px,60vw)", display: "block" }}
                loading="eager"
              />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>
                  Prukalpa Sankar & Varun Banka
                </p>
                <p
                  className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  Co-Founders · Atlan
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
                      className={`leading-[1.9] mb-3 text-[#2C2010] ${
                        ci === 0 && pi === 0 ? "dropcap" : ""
                      }`}
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
              style={{
                borderTop: `3px double ${accent}`,
                borderBottom: "1px solid #C8C2B4",
              }}
            >
              <span
                style={{ display: "block", color: accentDark, fontSize: 24, marginBottom: 10 }}
              >
                ❝
              </span>
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
                      <p className="text-[12px] text-[#2C2010] mt-0.5 leading-relaxed">
                        {t.event}
                      </p>
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
                  src="/Upforge-atlan-data.webp"
                  alt="Prukalpa Sankar and Varun Banka, Co-Founders of Atlan — UpForge Founder Chronicle"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3.5"
                  style={{
                    background: "linear-gradient(to top, rgba(12,7,2,0.96) 60%, transparent)",
                  }}
                >
                  <p className="pf text-white font-bold" style={{ fontSize: 14 }}>
                    Prukalpa Sankar & Varun Banka
                  </p>
                  <p
                    className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Co-Founders · Atlan
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://atlan.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: `1.5px solid ${accent}`, textDecoration: "none" }}
                  aria-label="Visit Atlan official website"
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
                      style={{ color: accent, fontFamily: "system-ui,sans-serif" }}
                    >
                      atlan.com — Official Website
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/atlan-hq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View Atlan on LinkedIn"
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
                      LinkedIn — Atlan
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
              { l: "Best SaaS Startups India", h: "/best-saas-startups" },
              { l: "Indian Unicorns Full List", h: "/indian-unicorns" },
              { l: "Top AI Startups 2026", h: "/top-ai-startups" },
              { l: "DeepTech Startups India", h: "/deep-tech-startups" },
              { l: "Atlan vs Alation vs Collibra", h: "/saas/data-catalog-comparison" },
              { l: "Peak XV Portfolio India", h: "/investors/peak-xv-partners" },
              { l: "Startup Registry India", h: "/startup" },
              { l: "Submit Your Startup", h: "/submit" },
            ].map((lnk) => (
              <Link
                key={lnk.h}
                href={lnk.h}
                className="flex items-center gap-1 p-3 hover:border-[#1A1208] transition-all"
                style={{
                  border: "1px solid #D8D2C4",
                  background: "white",
                  textDecoration: "none",
                }}
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
              <p
                className="pf font-bold text-[#1A1208] mb-2"
                style={{ fontSize: "1.2rem" }}
              >
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
            * Data sourced from TechCrunch, Datanami, Tracxn, Inc42, Gartner, Forrester, G2,
            and Atlan press releases as of March 2026. UpForge is an independent registry —
            no paid placements, no sponsored rankings. Funding figures and valuations are
            approximate and reflect latest available public data.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "SaaS Startups India", h: "/best-saas-startups" },
                { l: "Top AI Startups", h: "/top-ai-startups" },
                { l: "Startup Registry", h: "/startup" },
                { l: "Indian Unicorns", h: "/indian-unicorns" },
                { l: "Sarvam AI Profile", h: "/startup/sarvam-ai" },
                { l: "Articulus Surgical", h: "/startup/articulus-surgical" },
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
