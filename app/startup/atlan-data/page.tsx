"use client"

// app/startup/atlan-data/page.tsx — FIXED CSS VERSION
// UpForge — Atlan · Prukalpa Sankar & Varun Banka Founder Chronicle
// CSS: Unified string-injection approach — no Tailwind class conflicts

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

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
      "image": { "@type": "ImageObject", "url": "https://www.upforge.in/Upforge-atlan-data.webp", "width": 1200, "height": 630 },
      "publisher": { "@type": "Organization", "name": "UpForge", "url": "https://upforge.in", "logo": { "@type": "ImageObject", "url": "https://upforge.in/logo.png" } },
      "author": { "@type": "Organization", "name": "UpForge Editorial" },
      "about": [
        { "@type": "Person", "name": "Prukalpa Sankar", "jobTitle": "Co-Founder & Co-CEO", "worksFor": { "@type": "Organization", "name": "Atlan" } },
        { "@type": "Person", "name": "Varun Banka", "jobTitle": "Co-Founder & Co-CEO", "worksFor": { "@type": "Organization", "name": "Atlan" } }
      ],
      "mentions": { "@type": "Organization", "name": "Atlan", "url": "https://atlan.com", "foundingDate": "2019" }
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
        { "@type": "Question", "name": "Who founded Atlan?", "acceptedAnswer": { "@type": "Answer", "text": "Atlan was co-founded by Prukalpa Sankar and Varun Banka, both alumni of Nanyang Technological University (NTU), Singapore, where they met in 2012. Before Atlan, they co-founded SocialCops — a data-for-social-good company that built India's national data platform, used by the Prime Minister's office. Atlan was spun out of SocialCops in 2019." } },
        { "@type": "Question", "name": "What does Atlan do?", "acceptedAnswer": { "@type": "Answer", "text": "Atlan is the AI Context Layer for the enterprise — a modern data catalog, governance, and active metadata management platform. It connects to 80+ data tools including Snowflake, Databricks, BigQuery, Looker, Salesforce, and AI LLMs to create a unified map of an organization's entire data estate." } },
        { "@type": "Question", "name": "How much funding has Atlan raised?", "acceptedAnswer": { "@type": "Answer", "text": "Atlan has raised $206 million across 5 funding rounds. The Series C of $105 million, closed in May 2024, was led by GIC (Singapore's sovereign wealth fund) and Meritech Capital, valuing the company at $750 million." } },
        { "@type": "Question", "name": "What is Atlan's valuation?", "acceptedAnswer": { "@type": "Answer", "text": "Atlan is valued at $750 million following its May 2024 Series C round of $105 million led by GIC and Meritech Capital. Revenue grew more than 7x in two years, with 400% enterprise sales growth in Q1 2024." } },
        { "@type": "Question", "name": "Who are Atlan's customers?", "acceptedAnswer": { "@type": "Answer", "text": "Atlan serves 500+ enterprise customers including Mastercard, Nasdaq, Unilever, General Motors, Cisco, Autodesk, HubSpot, Dropbox, Fox, News Corp, Ralph Lauren, NHS, Plaid, Workday, Virgin Media O2, and Marriott. The company claims a 75% win rate in competitive trials." } },
        { "@type": "Question", "name": "What is SocialCops and how is it connected to Atlan?", "acceptedAnswer": { "@type": "Answer", "text": "SocialCops was a 'data for social good' company co-founded by Prukalpa Sankar and Varun Banka in 2012. It built India's national data platform used by the Prime Minister's office, NITI Aayog, and the UN. The internal data collaboration tool built to manage SocialCops' own data chaos became the foundation for Atlan, which was spun out as a standalone company in 2019." } }
      ]
    }
  ]
}

const STATS = [
  { l: "Valuation", v: "$750M" },
  { l: "Total Funding", v: "$206M" },
  { l: "Founded", v: "2019" },
  { l: "HQ", v: "New York / Delhi" },
  { l: "Revenue Growth", v: "7x in 2yr" },
  { l: "Customers", v: "500+" },
]

const TIMELINE = [
  { year: "2012", event: "Prukalpa Sankar and Varun Banka meet at Nanyang Technological University, Singapore. They co-found SocialCops at the Microsoft Imagine Cup — runners-up. Mission: use big data for social good." },
  { year: "2012–18", event: "SocialCops builds India's national data platform. Used by the PM's office, NITI Aayog, and the UN. Across 200+ data projects, the internal data collaboration tool they build proves more powerful than the projects it supports." },
  { year: "2019", event: "Atlan spun out of SocialCops as a standalone company. First external funding from WaterBridge Ventures and Rajan Anandan. The product repositions from internal tool to enterprise data catalog platform." },
  { year: "2021–22", event: "Named a Forrester Wave Leader for Enterprise Data Catalogs and G2 Leader in five categories — the sole leader in Active Metadata Management since the category's inception. Insight Partners and Peak XV back the company." },
  { year: "Mar 2024", event: "$27.5M funding led by Salesforce Ventures. Salesforce becomes both an investor and a key integration partner — signalling that Atlan is becoming foundational enterprise infrastructure." },
  { year: "May 2024", event: "$105M Series C led by GIC (Singapore's sovereign wealth fund) and Meritech Capital. Valuation reaches $750M. Revenue 7x over two years. 400% enterprise sales growth in Q1 2024. Total raised: $206M." },
  { year: "2025–26", event: "Named Leader in Gartner Magic Quadrant for Metadata Management Solutions (2025) and Data & Analytics Governance (2026). Atlan MCP Server launched — bringing its context layer directly into every AI agent workflow." },
]

const COLS = [
  {
    h: "A Bus Ride That Changed Indian Data",
    b: `Prukalpa Sankar was about to graduate from Nanyang Technological University in 2012, with internship offers from ExxonMobil and Goldman Sachs already in hand. On a bus to campus, she met Varun Banka — same batch, same obsession with startups, same desire to do something that mattered.\n\nAt the Microsoft Imagine Cup that April, they ideated SocialCops: a big data platform for development decisions. They finished runners-up and returned to India to build it for real. Over the next six years, SocialCops built the national data platform used by India's Prime Minister's office, NITI Aayog, and the United Nations — helping route everything from rural healthcare logistics to agricultural insurance data.\n\n"On the outside, you think 'cool projects,'" Sankar told Datanami. "But on the inside, it was not. It was just chaos every single day." Managing data across 200+ simultaneous projects, with every team working in different tools and formats, was ungovernable. They tried three separate data catalog and governance tools. None worked. The fourth time around — the one they built themselves — finally did.`,
  },
  {
    h: "The Internal Tool That Became a $750M Company",
    b: `By 2019, Sankar and Banka faced a question most founders never get to ask: the side project built to manage their real company was more valuable than the real company.\n\nAtlan — the internal data collaboration tool — had been stress-tested across 200 projects, dozens of data sources, and a team of analysts, scientists, and engineers who each worked in their own preferred tools. It had become, as Sankar describes it, a "GitHub for data teams" — a place where data has lineage, owners, definitions, and trust scores, connected across every system in an organisation.\n\nThey spun it out in 2019. Within two years, Forrester named it a Wave Leader for Enterprise Data Catalogs. Within three, it was the sole leader in G2's Active Metadata Management category — a category it effectively invented. By May 2024, GIC and Meritech Capital led a $105M Series C at a $750M valuation. Revenue had grown 7x in two years. Enterprise sales had grown 400% in a single quarter.`,
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

const LESSON = "The best B2B infrastructure companies are born from personal pain. Sankar and Banka didn't research the data governance market — they lived the problem for seven years at SocialCops. When they finally built the right tool, they already knew every edge case. That's an unfair advantage no competitor can replicate from a whiteboard."

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
  { q: "Who are the founders of Atlan and where did they study?", a: "Atlan was co-founded by Prukalpa Sankar and Varun Banka, who met at Nanyang Technological University (NTU), Singapore in 2012. Both serve as co-CEOs. Before Atlan, they co-founded SocialCops — which built India's national data platform used by the PM's office and the UN." },
  { q: "What is Atlan's data catalog and how does it work?", a: "Atlan scans an organisation's entire data ecosystem — connecting to 80+ tools including Snowflake, Databricks, BigQuery, Looker, Salesforce, and AI models — and creates a unified, living map of every data asset, its lineage, ownership, definitions, quality scores, and access policies. Teams can search, discover, govern, and collaborate around data from one place." },
  { q: "How does Atlan compare to Alation, Collibra, and Microsoft Purview?", a: "Atlan differentiates through its collaboration-first, metadata lakehouse architecture and active metadata approach. It scored higher than Alation and Collibra in the 2024 and 2025 Forrester Wave for Enterprise Data Catalogs, and has a 75% competitive win rate. Gartner named it a Leader in both Metadata Management Solutions (2025) and Data & Analytics Governance (2026)." },
  { q: "What is Atlan's MCP Server?", a: "Atlan's MCP (Model Context Protocol) Server pipes the enterprise context layer — all data definitions, lineage, quality scores, and business glossary terms — directly into AI agents and LLMs. This means any AI tool connected to Atlan's MCP Server instantly knows your organisation's data dictionary, business logic, and trusted data sources." },
]

const RELATED = [
  { name: "Sarvam AI", slug: "sarvam-ai", cat: "Artificial Intelligence", val: "$1B+" },
  { name: "Articulus Surgical", slug: "articulus-surgical", cat: "MedTech", val: "Kalaari" },
  { name: "Agnikul Cosmos", slug: "agnikul-cosmos", cat: "Spacetech", val: "$500M" },
]

const accent = "#2563eb"
const accentDark = "#1d4ed8"
const accentBg = "#eff6ff"
const accentBorder = "#bfdbfe"

const makeCSS = (ac: string, ab: string) => `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  a { text-decoration: none !important; color: inherit; }
  img { display: block; max-width: 100%; }
  .uf-serif { font-family: 'Playfair Display', Georgia, serif !important; }
  .uf-sans  { font-family: 'DM Sans', system-ui, sans-serif !important; }
  .uf-dropcap::first-letter {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3.8em; font-weight: 900; line-height: .82;
    float: left; margin-right: .1em; margin-top: .06em; margin-bottom: -.04em; color: #1A1208;
  }
  @keyframes uf-fu { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  .uf-fade-up { animation: uf-fu .45s cubic-bezier(.22,1,.36,1) both; }
  .uf-outer { max-width: 1280px; margin: 0 auto; padding: 0 16px 64px; }
  @media (min-width:640px)  { .uf-outer { padding-left: 24px; padding-right: 24px; } }
  @media (min-width:1024px) { .uf-outer { padding-left: 32px; padding-right: 32px; } }
  .uf-main-grid { display: grid; grid-template-columns: 1fr; border-bottom: 2px solid #1A1208; }
  @media (min-width:1024px) { .uf-main-grid { grid-template-columns: 1fr 380px; } }
  @media (min-width:1280px) { .uf-main-grid { grid-template-columns: 1fr 420px; } }
  .uf-article { padding: 32px 0; }
  @media (min-width:1024px) { .uf-article { border-right: 1px solid #C8C2B4; padding-right: 32px; } }
  .uf-sidebar { display: none; }
  @media (min-width:1024px) { .uf-sidebar { display: block; padding: 32px 0 32px 32px; } }
  .uf-mobile-hero { display: block; margin-bottom: 28px; }
  @media (min-width:1024px) { .uf-mobile-hero { display: none; } }
  .uf-ncols { display: flex; flex-direction: column; gap: 24px; }
  @media (min-width:768px) {
    .uf-ncols { display: grid; grid-template-columns: repeat(3,1fr); gap: 0; }
    .uf-ncols > div { padding: 0 20px; border-right: 1px solid #C8C2B4; }
    .uf-ncols > div:first-child { padding-left: 0; }
    .uf-ncols > div:last-child { border-right: none; padding-right: 0; }
  }
  .uf-stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); }
  .uf-stats-grid > div { padding: 12px 16px; border-right: 1px solid #D8D2C4; border-bottom: 1px solid #D8D2C4; }
  .uf-stats-grid > div:nth-child(even)  { border-right: none; }
  .uf-stats-grid > div:nth-last-child(1),
  .uf-stats-grid > div:nth-last-child(2) { border-bottom: none; }
  .uf-seo-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; }
  @media (min-width:640px) { .uf-seo-grid { grid-template-columns: repeat(4,1fr); } }
  .uf-footer-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
  @media (min-width:640px) { .uf-footer-grid { grid-template-columns: 1fr auto; align-items: center; } }
  .uf-pq-top { border-top: 3px double ${ac}; }
  .uf-tl-dot  { width:8px; height:8px; border-radius:50%; flex-shrink:0; margin-top:4px; background:${ac}; }
  .uf-tl-line { width:1px; flex:1; margin-top:4px; background:${ab}; min-height:18px; }
  .uf-ext-link { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border:1.5px solid ${ac}; transition:opacity .2s; }
  .uf-ext-link:hover { opacity:.72; }
  .uf-li-link  { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border:1.5px solid #0077b5; transition:opacity .2s; }
  .uf-li-link:hover { opacity:.72; }
  .uf-seo-link { display:flex; align-items:center; gap:4px; padding:10px 12px; border:1px solid #D8D2C4; background:white; transition:border-color .2s; }
  .uf-seo-link:hover { border-color:#1A1208; }
  .uf-rel-link { display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid #EDE9DF; transition:opacity .2s; }
  .uf-rel-link:last-child { border-bottom:none; }
  .uf-rel-link:hover { opacity:.65; }
  .uf-dot  { display:inline-block; width:6px; height:6px; border-radius:1px; flex-shrink:0; background:${ac}; }
  .uf-faq  { margin-bottom:16px; padding-bottom:16px; border-bottom:1px solid #D8D2C4; }
  .uf-faq:last-child { border-bottom:none; }
  .uf-badge { display:inline-block; font-family:'DM Sans',system-ui,sans-serif; font-size:8.5px; font-weight:800; letter-spacing:.28em; text-transform:uppercase; padding:5px 10px; color:white; background:${ac}; }
  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-thumb { background:#C8C2B4; border-radius:2px; }
`

export default function AtlanDataPage() {
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

  const globeSvg = (color: string) => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
  const liSvg = (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#0077b5">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  )

  return (
    <div style={{ minHeight:"100vh", background:"#F3EFE5" }}>
      <style>{makeCSS(accent, accentBorder)}</style>
      <h1 className="sr-only">Atlan Founder Story — Prukalpa Sankar & Varun Banka | India's $750M Data Intelligence Unicorn | Data Catalog | UpForge</h1>

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" style={{ background:"#EDE9DF", borderBottom:"1px solid #D8D2C4", padding:"8px 24px" }}>
        <ol style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"6px", listStyle:"none" }}>
          {[{ n:"UpForge",h:"/" },{ n:"Startup Registry",h:"/startup" },{ n:"SaaS Startups India",h:"/best-saas-startups" },{ n:"Atlan",h:"/startup/atlan-data" }].map((b,i,arr)=>(
            <li key={i} style={{ display:"flex", alignItems:"center", gap:"6px" }}>
              {i<arr.length-1 ? <Link href={b.h} className="uf-sans" style={{ fontSize:9, color:"#AAA", textTransform:"uppercase", letterSpacing:".14em" }}>{b.n}</Link>
                : <span className="uf-sans" style={{ fontSize:9, color:"#1A1208", fontWeight:700, textTransform:"uppercase", letterSpacing:".14em" }}>{b.n}</span>}
              {i<arr.length-1 && <ChevronRight style={{ width:10, height:10, color:"#C8C2B4" }}/>}
            </li>
          ))}
        </ol>
      </nav>

      {/* MASTHEAD */}
      <header style={{ background:"#F3EFE5", borderBottom:"3px solid #1A1208" }}>
        <div style={{ textAlign:"center", padding:"16px 16px 28px", borderBottom:"1px solid #C8C2B4" }}>
          <p className="uf-sans" style={{ fontSize:8, letterSpacing:".44em", color:"#AAA", textTransform:"uppercase", marginBottom:10 }}>UpForge · Startup Registry · Data & AI</p>
          <p className="uf-serif" style={{ fontSize:"clamp(2rem,5.5vw,4.2rem)", fontWeight:900, lineHeight:1, color:"#1A1208" }}>The Founder Chronicle</p>
          <p className="uf-serif" style={{ fontStyle:"italic", marginTop:10, color:"#6B5C40", fontSize:"clamp(12px,1.8vw,15px)" }}>India's independent startup registry — verified, editorial, March 2026</p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginTop:18 }}>
            <div style={{ height:1, width:"clamp(60px,10vw,140px)", background:"#C8C2B4" }}/>
            <span style={{ color:"#C8C2B4", fontSize:13 }}>✦</span>
            <div style={{ height:1, width:"clamp(60px,10vw,140px)", background:"#C8C2B4" }}/>
          </div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", padding:"8px 24px", gap:16, borderBottom:"1px solid #C8C2B4" }}>
          <span className="uf-sans" style={{ fontSize:8, color:"#AAA", textTransform:"uppercase", letterSpacing:".16em" }}>Edition · Data & AI</span>
          <div style={{ width:1, height:12, background:"#C8C2B4" }}/>
          <span className="uf-sans" style={{ fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:".14em", color:accent }}>SaaS / Data Intelligence · March 2026</span>
          <div style={{ width:1, height:12, background:"#C8C2B4" }}/>
          <span className="uf-sans" style={{ fontSize:9, color:"#AAA" }}>New Delhi · New York</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="uf-outer uf-fade-up">
        <div className="uf-main-grid">
          <article className="uf-article">
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <span className="uf-badge">DATA & AI / SAAS</span>
              <span className="uf-sans" style={{ fontSize:9, color:"#AAA", textTransform:"uppercase", letterSpacing:".14em" }}>March 2026</span>
            </div>

            <h2 className="uf-serif" style={{ fontSize:"clamp(1.75rem,4vw,3.1rem)", fontWeight:900, lineHeight:1.07, color:"#1A1208", marginBottom:18 }}>
              They built India's national data platform. Then the tool they made for themselves{" "}
              <em style={{ color:accent }}>became a $750 million company.</em>
            </h2>

            <p className="uf-serif" style={{ fontStyle:"italic", lineHeight:1.75, marginBottom:24, paddingBottom:24, color:"#5A4A30", fontSize:"clamp(14px,1.9vw,17px)", borderBottom:"1px solid #C8C2B4" }}>
              Prukalpa Sankar and Varun Banka spent seven years solving India's data problem at the national scale — building platforms for the PM's office, the UN, and NITI Aayog. The data chaos of doing that work forced them to build their own tool. That tool became Atlan. $206M raised. $750M valuation. Mastercard, Nasdaq, General Motors, and the NHS trust it with their most critical data.
            </p>

            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"6px 8px", marginBottom:32 }}>
              {["By UpForge Editorial","New Delhi · New York","Est. 2019","The AI Context Layer"].map((t,i,a)=>(
                <span key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span className="uf-sans" style={{ fontSize:9, color:"#AAA", textTransform:"uppercase", letterSpacing:".14em" }}>{t}</span>
                  {i<a.length-1 && <span style={{ color:"#C8C2B4", fontSize:10 }}>·</span>}
                </span>
              ))}
            </div>

            {/* Mobile hero */}
            <div className="uf-mobile-hero">
              <img src="/Upforge-atlan-data.webp" alt="Prukalpa Sankar and Varun Banka, Co-Founders of Atlan"
                style={{ width:"100%", height:"min(300px,60vw)", objectFit:"cover", objectPosition:"top" }} loading="eager"/>
              <div style={{ padding:"12px 16px", background:"#1A1208" }}>
                <p className="uf-serif" style={{ color:"white", fontWeight:700, fontSize:13 }}>Prukalpa Sankar & Varun Banka</p>
                <p className="uf-sans" style={{ color:"rgba(255,255,255,.4)", fontSize:9, textTransform:"uppercase", letterSpacing:".14em", marginTop:3 }}>Co-Founders · Atlan</p>
              </div>
            </div>

            {/* 3-col body */}
            <div className="uf-ncols">
              {COLS.map((col,ci)=>(
                <div key={ci}>
                  <h3 className="uf-sans" style={{ fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:".14em", color:"#1A1208", borderBottom:`1.5px solid ${accent}`, paddingBottom:6, marginBottom:12 }}>{col.h}</h3>
                  {col.b.split("\n\n").map((p,pi)=>(
                    <p key={pi} className={ci===0&&pi===0?"uf-serif uf-dropcap":"uf-serif"} style={{ lineHeight:1.88, marginBottom:12, color:"#2C2010", fontSize:"clamp(12.5px,1.3vw,13.5px)" }}>{p}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* Pull quote */}
            <div className="uf-pq-top" style={{ marginTop:40, paddingTop:24, paddingBottom:24, textAlign:"center", borderBottom:"1px solid #C8C2B4" }}>
              <span style={{ display:"block", color:accentDark, fontSize:26, marginBottom:10 }}>❝</span>
              <blockquote className="uf-serif" style={{ fontStyle:"italic", color:"#1A1208", lineHeight:1.7, maxWidth:640, margin:"0 auto", padding:"0 16px", fontSize:"clamp(15px,2.2vw,21px)" }}>"{PULL_QUOTE.text}"</blockquote>
              <p className="uf-sans" style={{ fontSize:9, textTransform:"uppercase", letterSpacing:".24em", color:"#AAA", marginTop:16 }}>— {PULL_QUOTE.by}</p>
            </div>

            {/* Timeline */}
            <div style={{ marginTop:32 }}>
              <p className="uf-sans" style={{ fontSize:8.5, fontWeight:800, textTransform:"uppercase", letterSpacing:".26em", color:accent, borderBottom:`1px solid ${accentBorder}`, paddingBottom:8, marginBottom:16 }}>Company Timeline</p>
              <ol style={{ listStyle:"none" }}>
                {TIMELINE.map((t,i)=>(
                  <li key={i} style={{ display:"flex", gap:16, marginBottom:16 }}>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
                      <div className="uf-tl-dot"/>
                      {i<TIMELINE.length-1 && <div className="uf-tl-line"/>}
                    </div>
                    <div>
                      <span className="uf-sans" style={{ fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:".14em", color:accent }}>{t.year}</span>
                      <p className="uf-sans" style={{ fontSize:12, color:"#2C2010", marginTop:3, lineHeight:1.6 }}>{t.event}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* FAQ */}
            <section style={{ marginTop:32 }}>
              <p className="uf-sans" style={{ fontSize:8.5, fontWeight:800, textTransform:"uppercase", letterSpacing:".26em", color:accent, borderBottom:`1px solid ${accentBorder}`, paddingBottom:8, marginBottom:16 }}>Frequently Asked Questions</p>
              {FAQS.map((faq,i)=>(
                <div key={i} className="uf-faq">
                  <h3 className="uf-sans" style={{ fontSize:13, fontWeight:700, color:"#1A1208", marginBottom:6 }}>{faq.q}</h3>
                  <p className="uf-sans" style={{ fontSize:12.5, color:"#5A4A30", lineHeight:1.7 }}>{faq.a}</p>
                </div>
              ))}
            </section>
          </article>

          {/* SIDEBAR */}
          <aside className="uf-sidebar">
            <div style={{ position:"sticky", top:16, display:"flex", flexDirection:"column", gap:20 }}>
              <div style={{ position:"relative", overflow:"hidden", height:340 }}>
                <img src="/Upforge-atlan-data.webp" alt="Prukalpa Sankar and Varun Banka, Co-Founders of Atlan"
                  style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }} loading="eager"/>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"14px 16px", background:"linear-gradient(to top,rgba(12,7,2,.96) 60%,transparent)" }}>
                  <p className="uf-serif" style={{ color:"white", fontWeight:700, fontSize:14 }}>Prukalpa Sankar & Varun Banka</p>
                  <p className="uf-sans" style={{ color:"rgba(255,255,255,.4)", fontSize:9, textTransform:"uppercase", letterSpacing:".14em", marginTop:2 }}>Co-Founders · Atlan</p>
                </div>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <a href="https://atlan.com/" target="_blank" rel="noopener noreferrer" className="uf-ext-link" aria-label="Visit Atlan official website">
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>{globeSvg(accent)}<span className="uf-sans" style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:accent }}>atlan.com — Official Website</span></div>
                  <ArrowUpRight style={{ width:14, height:14, color:accent }}/>
                </a>
                <a href="https://www.linkedin.com/company/atlan-hq/" target="_blank" rel="noopener noreferrer" className="uf-li-link" aria-label="View Atlan on LinkedIn">
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>{liSvg}<span className="uf-sans" style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:"#0077b5" }}>LinkedIn — Atlan</span></div>
                  <ArrowUpRight style={{ width:14, height:14, color:"#0077b5" }}/>
                </a>
              </div>

              <div style={{ border:"2px solid #1A1208" }}>
                <div style={{ padding:"10px 16px", background:"#1A1208" }}>
                  <p className="uf-sans" style={{ fontSize:8, fontWeight:800, textTransform:"uppercase", letterSpacing:".3em", color:"white" }}>By the Numbers</p>
                </div>
                <div className="uf-stats-grid">
                  {STATS.map((s,i)=>(
                    <div key={i}>
                      <p className="uf-sans" style={{ fontSize:7.5, color:"#AAA", textTransform:"uppercase", letterSpacing:".16em", marginBottom:4 }}>{s.l}</p>
                      <p className="uf-serif" style={{ fontSize:"1.2rem", fontWeight:900, color:"#1A1208", lineHeight:1 }}>{s.v}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding:16, background:accentBg, border:`1px solid ${accentBorder}` }}>
                <p className="uf-sans" style={{ fontSize:8, fontWeight:800, textTransform:"uppercase", letterSpacing:".26em", color:accent, marginBottom:8 }}>The Lesson</p>
                <p className="uf-serif" style={{ fontStyle:"italic", color:"#1A1208", lineHeight:1.72, fontSize:13 }}>{LESSON}</p>
              </div>

              <div style={{ border:"1px solid #D8D2C4" }}>
                <div style={{ padding:"8px 16px", background:"#F9F7F2", borderBottom:"1px solid #D8D2C4" }}>
                  <p className="uf-sans" style={{ fontSize:8, fontWeight:800, textTransform:"uppercase", letterSpacing:".24em", color:"#1A1208" }}>Key Investors</p>
                </div>
                <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:7 }}>
                  {INVESTORS.map((inv,i)=>(
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span className="uf-dot"/>
                      <span className="uf-sans" style={{ fontSize:11, color:"#2C2010", fontWeight:500 }}>{inv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="uf-sans" style={{ fontSize:8, fontWeight:800, textTransform:"uppercase", letterSpacing:".26em", color:"#AAA", marginBottom:12 }}>Also Read on UpForge</p>
                {RELATED.map(r=>(
                  <Link key={r.slug} href={`/startup/${r.slug}`} className="uf-rel-link">
                    <div>
                      <p className="uf-sans" style={{ fontSize:11, fontWeight:700, color:"#1A1208" }}>{r.name}</p>
                      <p className="uf-sans" style={{ fontSize:9, color:"#AAA", textTransform:"uppercase", letterSpacing:".12em", marginTop:2 }}>{r.cat} · {r.val}</p>
                    </div>
                    <ArrowUpRight style={{ width:14, height:14, color:"#AAA", flexShrink:0 }}/>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* SEO LINKS */}
        <section style={{ padding:"32px 0", borderBottom:"1px solid #C8C2B4" }}>
          <p className="uf-sans" style={{ fontSize:9, letterSpacing:".3em", textTransform:"uppercase", color:"#AAA", marginBottom:16 }}>Explore More on UpForge</p>
          <div className="uf-seo-grid">
            {[{ l:"Best SaaS Startups India",h:"/best-saas-startups" },{ l:"Indian Unicorns Full List",h:"/indian-unicorns" },{ l:"Top AI Startups 2026",h:"/top-ai-startups" },{ l:"DeepTech Startups India",h:"/deep-tech-startups" },{ l:"Atlan vs Alation vs Collibra",h:"/saas/data-catalog-comparison" },{ l:"Peak XV Portfolio India",h:"/investors/peak-xv-partners" },{ l:"Startup Registry India",h:"/startup" },{ l:"Submit Your Startup",h:"/submit" }].map(lnk=>(
              <Link key={lnk.h} href={lnk.h} className="uf-seo-link">
                <span className="uf-sans" style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"#1A1208" }}>{lnk.l}</span>
                <ChevronRight style={{ width:10, height:10, color:"#AAA", flexShrink:0, marginLeft:"auto" }}/>
              </Link>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ paddingTop:32, paddingBottom:8 }}>
          <div className="uf-footer-grid" style={{ paddingBottom:32, borderBottom:"1px solid #D8D2C4" }}>
            <div>
              <p className="uf-serif" style={{ fontWeight:700, color:"#1A1208", marginBottom:8, fontSize:"1.2rem" }}>Building India's next unicorn? Get verified on UpForge.</p>
              <p className="uf-sans" style={{ fontSize:12, color:"#6B5C40" }}>Free startup profiles. Independent verification. Indexed by Google.</p>
            </div>
            <Link href="/submit" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 24px", background:"#1A1208", color:"white" }} className="uf-sans" aria-label="List your startup">
              <span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em" }}>List Your Startup — Free</span>
              <ArrowRight style={{ width:14, height:14 }}/>
            </Link>
          </div>
          <p className="uf-sans" style={{ fontSize:9, lineHeight:1.7, marginTop:16, color:"#BBB0A0" }}>
            * Data sourced from TechCrunch, Datanami, Tracxn, Inc42, Gartner, Forrester, G2, and Atlan press releases as of March 2026. UpForge is an independent registry — no paid placements, no sponsored rankings.
          </p>
          <nav aria-label="Footer navigation" style={{ marginTop:12 }}>
            <ul style={{ display:"flex", flexWrap:"wrap", gap:"8px 16px", listStyle:"none" }}>
              {[{ l:"SaaS Startups India",h:"/best-saas-startups" },{ l:"Top AI Startups",h:"/top-ai-startups" },{ l:"Startup Registry",h:"/startup" },{ l:"Indian Unicorns",h:"/indian-unicorns" },{ l:"Sarvam AI Profile",h:"/startup/sarvam-ai" },{ l:"Submit Startup",h:"/submit" }].map(lnk=>(
                <li key={lnk.h}><Link href={lnk.h} className="uf-sans" style={{ fontSize:9, color:"#AAA", textTransform:"uppercase", letterSpacing:".14em" }}>{lnk.l}</Link></li>
              ))}
            </ul>
          </nav>
        </footer>
      </main>
    </div>
  )
}
