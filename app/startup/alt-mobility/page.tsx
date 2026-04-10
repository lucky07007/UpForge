"use client"

// app/startup/alt-mobility/page.tsx — FIXED CSS VERSION
// UpForge — Alt Mobility · Dev Arora & Co-Founders Founder Chronicle
// CSS: Unified string-injection approach (same as Perplexity page) — no Tailwind class conflicts

import { useEffect } from "react"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

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
      "image": { "@type": "ImageObject", "url": "https://www.upforge.in/Upforge-alt-mobility.webp", "width": 1200, "height": 630 },
      "publisher": { "@type": "Organization", "name": "UpForge", "url": "https://upforge.in", "logo": { "@type": "ImageObject", "url": "https://upforge.in/logo.png" } },
      "author": { "@type": "Organization", "name": "UpForge Editorial" },
      "keywords": "Alt Mobility, Dev Arora, EV leasing India, FleetOS, electric vehicle fleet, Drive-to-Own, Eurazeo India, Shell Ventures India, IIT Delhi startup, last mile EV delivery, EV fleet management platform",
      "about": [
        { "@type": "Person", "name": "Dev Arora", "jobTitle": "Co-Founder & CEO", "worksFor": { "@type": "Organization", "name": "Alt Mobility" } },
        { "@type": "Person", "name": "Anuj Gupta", "jobTitle": "Co-Founder & CBO", "worksFor": { "@type": "Organization", "name": "Alt Mobility" } },
        { "@type": "Person", "name": "Harsh Dev Goyal", "jobTitle": "Co-Founder & CPO", "worksFor": { "@type": "Organization", "name": "Alt Mobility" } },
        { "@type": "Person", "name": "Manas Arora", "jobTitle": "Co-Founder & CFO", "worksFor": { "@type": "Organization", "name": "Alt Mobility" } },
        { "@type": "Person", "name": "Jayant Gupta", "jobTitle": "Co-Founder & CCO", "worksFor": { "@type": "Organization", "name": "Alt Mobility" } }
      ],
      "mentions": { "@type": "Organization", "name": "Alt Mobility", "url": "https://alt-mobility.com", "foundingDate": "2020" }
    },
    { "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" }, { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" }, { "@type": "ListItem", "position": 3, "name": "EV Startups India", "item": "https://upforge.in/ev-startups-india" }, { "@type": "ListItem", "position": 4, "name": "Alt Mobility", "item": "https://upforge.in/startup/alt-mobility" } ] },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Who founded Alt Mobility?", "acceptedAnswer": { "@type": "Answer", "text": "Alt Mobility was co-founded in 2020 by Dev Arora (CEO), Anuj Gupta (CBO), Harsh Dev Goyal (CPO), Manas Arora (CFO), and Jayant Gupta (CCO), born out of IIT Delhi's incubator." } },
        { "@type": "Question", "name": "How much funding has Alt Mobility raised?", "acceptedAnswer": { "@type": "Answer", "text": "Alt Mobility has raised $17.3 million in total across 5 rounds. Their Series A of $10 million in November 2024 was led by Eurazeo, with Shell Ventures, Twynam Earth Fund, and EV2 Ventures participating." } },
        { "@type": "Question", "name": "What is FleetOS?", "acceptedAnswer": { "@type": "Answer", "text": "FleetOS is Alt Mobility's proprietary AI-powered fleet management platform providing real-time vehicle tracking, predictive maintenance diagnostics, driver behaviour analytics, charging station integration, and roadside assistance." } },
        { "@type": "Question", "name": "What is Alt Mobility's Drive-to-Own model?", "acceptedAnswer": { "@type": "Answer", "text": "Alt Mobility's Drive-to-Own model enables drivers who lease vehicles to transition into EV ownership over time without requiring credit history, collateral, or high upfront payment. It reduces total cost of ownership by 30-40%." } },
        { "@type": "Question", "name": "How many EVs has Alt Mobility leased?", "acceptedAnswer": { "@type": "Answer", "text": "As of early 2026, Alt Mobility has leased over 16,000 electric vehicles and manages ₹350 crore+ in Assets Under Management across 37+ cities in India." } }
      ]
    }
  ]
}

const STATS = [
  { l: "Total Funding", v: "$17.3M" },
  { l: "Valuation", v: "₹461 Cr" },
  { l: "Founded", v: "2020" },
  { l: "HQ", v: "New Delhi" },
  { l: "Vehicles Leased", v: "16,000+" },
  { l: "AUM", v: "₹350 Cr+" },
  { l: "Cities", v: "37+" },
  { l: "Employees", v: "185+" },
]

const TIMELINE = [
  { year: "2014–20", event: "Dev Arora & Anuj Gupta build 8Minute, deploying 100MW+ of rooftop solar across India. They connect with Manas Arora, Harsh Dev Goyal, and Jayant Gupta in the solar industry." },
  { year: "2020–21", event: "The team identifies EVs facing the same barriers solar once did — unclear residual values, high upfront costs, fragmented after-sales. Alt Mobility is conceived at IIT Delhi's incubator." },
  { year: "Mar 2022", event: "First deployment: 82 two-wheelers and 10 three-wheelers leased to Lightning Logistics in Delhi. The full-stack leasing model is proven viable in the real world." },
  { year: "2023", event: "Fleet crosses 6,500 EVs across 10+ cities. AUM reaches ₹100 crore. Drive-to-Own model launched in Delhi NCR under the Delhi EV Aggregators Policy." },
  { year: "Jan 2024", event: "$6M raised co-led by Shell Ventures, Eurazeo, EV2 Ventures, and Twynam. FleetOS expanded with AI-driven predictive maintenance and Fleet GPT conversational layer." },
  { year: "Nov 2024", event: "$10M Series A led by Eurazeo. Total funding reaches $17.3M. Target: 30,000 vehicles and ₹500 Cr+ AUM by FY2026. Expansion to buses and trucks begins." },
  { year: "2025–26", event: "16,000+ vehicles leased. 37+ cities. 185 employees. ₹150 crore in fuel savings generated. Annual revenue reaches ₹63.4 crore. Expansion to UP, Haryana, Maharashtra, Karnataka." },
]

const COLS = [
  {
    h: "Solar Veterans Who Bet on EVs",
    b: `Dev Arora, a computer science graduate from NIT Kurukshetra, built his first company not in tech — but in rooftop solar. In 2014, he and Anuj Gupta founded 8Minute, deploying over 100MW of clean energy projects across homes and industries. Along the way, they met Manas Arora, Harsh Dev Goyal, and Jayant Gupta.\n\nThe solar industry taught them something few people know from the inside: new energy technologies fail to scale not because of the technology, but because of the financing. Buyers don't understand residual values. Lenders won't take the asset risk. The ecosystem is fragmented. Sound familiar?\n\nWhen Jayant Gupta moved into EV manufacturing around 2020, the team immediately recognised the pattern. "We all realised EVs faced the same challenges as solar in its early days," Arora says. "Lack of resale market, unclear residual values, and technology risks." The solution was the same one that had worked for solar: remove the upfront cost entirely. Offer a lease.`
  },
  {
    h: "The Full-Stack Leasing Bet",
    b: `Alt Mobility launched leasing operations in March 2022 with 82 two-wheelers and 10 three-wheelers for Lightning Logistics in Delhi. The model was deceptively simple from the outside — but radically different from anything else in the market.\n\nWhile banks demanded 20–25% down payments, Alt took only a three-month deposit. While NBFCs just disbursed loans, Alt bundled the vehicle with insurance, road tax, maintenance, 24/7 roadside support, and IoT telematics under one all-inclusive contract. Fleet operators didn't just get a vehicle. They got a running cost they could predict — and a single number to call when anything went wrong.\n\n"Traditional financiers just provide loans," Arora explains. "We go beyond financing to ensure vehicle uptime, lower costs, and complete lifecycle management. That's our differentiation." By 2023, the fleet had crossed 6,500 EVs. Revenues were doubling every year.`
  },
  {
    h: "FleetOS, Drive-to-Own & What's Next",
    b: `At the core of every Alt Mobility lease is FleetOS — the company's proprietary AI and IoT platform. Every leased vehicle carries an IoT device. The data it streams — location, battery health, usage patterns, driver behaviour — feeds into predictive algorithms that can flag a breakdown or payment default before it happens.\n\n"We deploy IoT devices in every vehicle," Arora says. "They send data to our servers, allowing us to monitor asset health in real time." The team is now building Fleet GPT — a conversational AI layer on top of FleetOS that lets fleet managers ask plain-language questions about their entire fleet.\n\nThe Drive-to-Own model takes the social mission further: structured pathways for gig economy drivers to graduate from leasing to full ownership, with no credit history required. By early 2026, Alt Mobility manages 16,000+ vehicles, ₹350 crore+ in AUM, across 37+ cities — and is preparing to expand into buses and trucks.`
  }
]

const PULL_QUOTE = {
  text: "Traditional financiers just provide loans. We go beyond financing to ensure vehicle uptime, lower costs, and complete lifecycle management. That's our differentiation.",
  by: "Dev Arora, Co-Founder & CEO, Alt Mobility"
}

const LESSON = "The best infrastructure businesses solve the same problem twice. Alt Mobility's founders broke the solar adoption barrier in 2014, then applied the same playbook to EVs in 2022 — proving that understanding a financing gap is worth more than any single technology."

const INVESTORS = [
  { name: "Eurazeo (Paris)", type: "PE Lead" },
  { name: "Shell Ventures", type: "CVC" },
  { name: "Twynam Earth Fund", type: "VC" },
  { name: "EV2 Ventures", type: "VC" },
  { name: "UC Inclusive Credit", type: "Debt" },
  { name: "Piper Serica", type: "VC" },
  { name: "PitchRight Ventures", type: "Angel" },
  { name: "LetsVenture", type: "Platform" },
]

const FAQS = [
  { q: "Who are the founders of Alt Mobility?", a: "Alt Mobility was co-founded in 2020 by Dev Arora (CEO), Anuj Gupta (CBO), Harsh Dev Goyal (CPO), Manas Arora (CFO), and Jayant Gupta (CCO) — born out of IIT Delhi's incubator. Four are second-time entrepreneurs who previously deployed 100MW+ of rooftop solar across India." },
  { q: "What does Alt Mobility's all-inclusive lease include?", a: "Alt Mobility's wet lease bundles the vehicle with registration, insurance, maintenance, 24/7 roadside assistance, IoT telematics via FleetOS, and access to 7,000+ charging stations — all under one contract. The model saves fleet operators up to 62% compared to traditional financing." },
  { q: "How does Alt Mobility compare to Zypp Electric and MoEving?", a: "All three offer EV leasing for commercial fleets in India, but Alt Mobility differentiates through its full-stack FleetOS technology platform, Drive-to-Own model for driver ownership, and multi-category fleet spanning 2W, 3W, and 4W vehicles. Alt is also the only player backed by Shell Ventures and Twynam Earth Fund globally." },
  { q: "Is Alt Mobility profitable?", a: "Alt Mobility reported annual revenue of ₹63.4 crore as of March 2025 and has doubled revenues every year since launch. The company is focused on scaling toward profitability as AUM grows toward the ₹500 crore target." },
]

const RELATED = [
  { name: "Ather Energy", slug: "ather-energy-ev", cat: "Electric Vehicles", val: "$1.3B" },
  { name: "Sarvam AI", slug: "sarvam-ai", cat: "Artificial Intelligence", val: "$1B+" },
  { name: "Agnikul Cosmos", slug: "agnikul-cosmos", cat: "Spacetech", val: "$500M" },
]

const accent = "#16a34a"
const accentDark = "#15803d"
const accentBg = "#f0fdf4"
const accentBorder = "#bbf7d0"

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  a { text-decoration: none !important; color: inherit; }
  img { display: block; max-width: 100%; }

  /* Typography utilities */
  .uf-serif { font-family: 'Playfair Display', Georgia, serif !important; }
  .uf-sans  { font-family: 'DM Sans', system-ui, sans-serif !important; }

  /* Drop cap */
  .uf-dropcap::first-letter {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3.8em; font-weight: 900; line-height: .82;
    float: left; margin-right: .1em; margin-top: .06em; margin-bottom: -.04em;
    color: #1A1208;
  }

  /* Fade-up animation */
  @keyframes uf-fu { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
  .uf-fade-up { animation: uf-fu .45s cubic-bezier(.22,1,.36,1) both; }

  /* Outer container */
  .uf-outer { max-width: 1280px; margin: 0 auto; padding: 0 16px 64px; }
  @media (min-width:640px)  { .uf-outer { padding-left: 24px; padding-right: 24px; } }
  @media (min-width:1024px) { .uf-outer { padding-left: 32px; padding-right: 32px; } }

  /* Main 2-col grid */
  .uf-main-grid {
    display: grid;
    grid-template-columns: 1fr;
    border-bottom: 2px solid #1A1208;
  }
  @media (min-width:1024px) { .uf-main-grid { grid-template-columns: 1fr 380px; } }
  @media (min-width:1280px) { .uf-main-grid { grid-template-columns: 1fr 420px; } }

  /* Article */
  .uf-article { padding: 32px 0; }
  @media (min-width:1024px) { .uf-article { border-right: 1px solid #C8C2B4; padding-right: 32px; } }

  /* Sidebar */
  .uf-sidebar { display: none; }
  @media (min-width:1024px) { .uf-sidebar { display: block; padding: 32px 0 32px 32px; } }

  /* Mobile hero */
  .uf-mobile-hero { display: block; margin-bottom: 28px; }
  @media (min-width:1024px) { .uf-mobile-hero { display: none; } }

  /* 3-column newspaper grid */
  .uf-ncols { display: flex; flex-direction: column; gap: 24px; }
  @media (min-width:768px) {
    .uf-ncols { display: grid; grid-template-columns: repeat(3,1fr); gap: 0; }
    .uf-ncols > div { padding: 0 20px; border-right: 1px solid #C8C2B4; }
    .uf-ncols > div:first-child { padding-left: 0; }
    .uf-ncols > div:last-child { border-right: none; padding-right: 0; }
  }

  /* Stats grid — 2 cols, borders between cells */
  .uf-stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .uf-stats-grid > div {
    padding: 12px 16px;
    border-right: 1px solid #D8D2C4;
    border-bottom: 1px solid #D8D2C4;
  }
  .uf-stats-grid > div:nth-child(even)  { border-right: none; }
  .uf-stats-grid > div:nth-last-child(1),
  .uf-stats-grid > div:nth-last-child(2) { border-bottom: none; }

  /* SEO link grid */
  .uf-seo-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; }
  @media (min-width:640px) { .uf-seo-grid { grid-template-columns: repeat(4,1fr); } }

  /* Footer grid */
  .uf-footer-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
  @media (min-width:640px) { .uf-footer-grid { grid-template-columns: 1fr auto; align-items: center; } }

  /* Pull-quote top border */
  .uf-pq-top { border-top: 3px double ${accent}; }

  /* Timeline dot & line */
  .uf-tl-dot  { width:8px; height:8px; border-radius:50%; flex-shrink:0; margin-top:4px; background:${accent}; }
  .uf-tl-line { width:1px; flex:1; margin-top:4px; background:${accentBorder}; min-height:18px; }

  /* Shared link styles */
  .uf-ext-link {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; border: 1.5px solid ${accent};
    transition: opacity .2s;
  }
  .uf-ext-link:hover { opacity: .72; }
  .uf-li-link {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; border: 1.5px solid #0077b5;
    transition: opacity .2s;
  }
  .uf-li-link:hover { opacity: .72; }
  .uf-seo-link {
    display: flex; align-items: center; gap: 4px; padding: 10px 12px;
    border: 1px solid #D8D2C4; background: white; transition: border-color .2s;
  }
  .uf-seo-link:hover { border-color: #1A1208; }
  .uf-rel-link {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 0; border-bottom: 1px solid #EDE9DF; transition: opacity .2s;
  }
  .uf-rel-link:last-child { border-bottom: none; }
  .uf-rel-link:hover { opacity: .65; }

  /* Misc */
  .uf-dot  { display:inline-block; width:6px; height:6px; border-radius:1px; flex-shrink:0; background:${accent}; }
  .uf-faq  { margin-bottom:16px; padding-bottom:16px; border-bottom:1px solid #D8D2C4; }
  .uf-faq:last-child { border-bottom:none; }
  .uf-badge {
    display:inline-block; font-family:'DM Sans',system-ui,sans-serif;
    font-size:8.5px; font-weight:800; letter-spacing:.28em;
    text-transform:uppercase; padding:5px 10px; color:white; background:${accent};
  }

  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-thumb { background:#C8C2B4; border-radius:2px; }
`

export default function AltMobilityPage() {
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
    <div style={{ minHeight: "100vh", background: "#F3EFE5" }}>
      <style>{CSS}</style>
      <h1 className="sr-only">Alt Mobility Founder Story — Dev Arora | India's Full-Stack EV Leasing Platform | FleetOS | UpForge</h1>

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" style={{ background: "#EDE9DF", borderBottom: "1px solid #D8D2C4", padding: "8px 24px" }}>
        <ol style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"6px", listStyle:"none" }}>
          {[{ n:"UpForge",h:"/" },{ n:"Startup Registry",h:"/startup" },{ n:"EV Startups India",h:"/ev-startups-india" },{ n:"Alt Mobility",h:"/startup/alt-mobility" }].map((b,i,arr)=>(
            <li key={i} style={{ display:"flex", alignItems:"center", gap:"6px" }}>
              {i<arr.length-1
                ? <a href={b.h} className="uf-sans" style={{ fontSize:9, color:"#AAA", textTransform:"uppercase", letterSpacing:".14em" }}>{b.n}</a>
                : <span className="uf-sans" style={{ fontSize:9, color:"#1A1208", fontWeight:700, textTransform:"uppercase", letterSpacing:".14em" }}>{b.n}</span>}
              {i<arr.length-1 && <ChevronRight style={{ width:10, height:10, color:"#C8C2B4" }}/>}
            </li>
          ))}
        </ol>
      </nav>

      {/* MASTHEAD */}
      <header style={{ background:"#F3EFE5", borderBottom:"3px solid #1A1208" }}>
        <div style={{ textAlign:"center", padding:"16px 16px 28px", borderBottom:"1px solid #C8C2B4" }}>
          <p className="uf-sans" style={{ fontSize:8, letterSpacing:".44em", color:"#AAA", textTransform:"uppercase", marginBottom:10 }}>UpForge · Startup Registry · Electric Vehicles</p>
          <p className="uf-serif" style={{ fontSize:"clamp(2rem,5.5vw,4.2rem)", fontWeight:900, lineHeight:1, color:"#1A1208" }}>The Founder Chronicle</p>
          <p className="uf-serif" style={{ fontStyle:"italic", marginTop:10, color:"#6B5C40", fontSize:"clamp(12px,1.8vw,15px)" }}>India's independent startup registry — verified, editorial, March 2026</p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginTop:18 }}>
            <div style={{ height:1, width:"clamp(60px,10vw,140px)", background:"#C8C2B4" }}/>
            <span style={{ color:"#C8C2B4", fontSize:13 }}>✦</span>
            <div style={{ height:1, width:"clamp(60px,10vw,140px)", background:"#C8C2B4" }}/>
          </div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", padding:"8px 24px", gap:16, borderBottom:"1px solid #C8C2B4" }}>
          <span className="uf-sans" style={{ fontSize:8, color:"#AAA", textTransform:"uppercase", letterSpacing:".16em" }}>Edition · EV</span>
          <div style={{ width:1, height:12, background:"#C8C2B4" }}/>
          <span className="uf-sans" style={{ fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:".14em", color:accent }}>EV Leasing · March 2026</span>
          <div style={{ width:1, height:12, background:"#C8C2B4" }}/>
          <span className="uf-sans" style={{ fontSize:9, color:"#AAA" }}>New Delhi, India</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="uf-outer uf-fade-up">
        <div className="uf-main-grid">

          {/* ARTICLE */}
          <article className="uf-article">
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <span className="uf-badge">CLEANTECH / EV</span>
              <span className="uf-sans" style={{ fontSize:9, color:"#AAA", textTransform:"uppercase", letterSpacing:".14em" }}>March 2026</span>
            </div>

            <h2 className="uf-serif" style={{ fontSize:"clamp(1.75rem,4vw,3.1rem)", fontWeight:900, lineHeight:1.07, color:"#1A1208", marginBottom:18 }}>
              They fixed India's solar financing problem in 2014.{" "}
              <em style={{ color:accent }}>Then they did it again — for electric vehicles.</em>
            </h2>

            <p className="uf-serif" style={{ fontStyle:"italic", lineHeight:1.75, marginBottom:24, paddingBottom:24, color:"#5A4A30", fontSize:"clamp(14px,1.9vw,17px)", borderBottom:"1px solid #C8C2B4" }}>
              Alt Mobility's founders didn't discover EVs on a whiteboard. They spent six years removing the financing barrier for rooftop solar — then watched the exact same problem kill EV adoption in India. Dev Arora and his team built the solution they already knew worked: a full-stack lease. $17.3M raised. 16,000+ vehicles. ₹350 crore in assets. 37 cities.
            </p>

            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"6px 8px", marginBottom:32 }}>
              {["By UpForge Editorial","New Delhi","Est. 2020","India's EV Fleet OS"].map((t,i,a)=>(
                <span key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span className="uf-sans" style={{ fontSize:9, color:"#AAA", textTransform:"uppercase", letterSpacing:".14em" }}>{t}</span>
                  {i<a.length-1 && <span style={{ color:"#C8C2B4", fontSize:10 }}>·</span>}
                </span>
              ))}
            </div>

            {/* Mobile hero */}
            <div className="uf-mobile-hero">
              <img src="/Upforge-alt-mobility.webp" alt="Dev Arora, Co-Founder & CEO of Alt Mobility"
                style={{ width:"100%", height:"min(300px,60vw)", objectFit:"cover", objectPosition:"top" }} loading="eager"
                onError={e=>{ (e.currentTarget as HTMLImageElement).src='https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800'; }}/>
              <div style={{ padding:"12px 16px", background:"#1A1208" }}>
                <p className="uf-serif" style={{ color:"white", fontWeight:700, fontSize:13 }}>Dev Arora</p>
                <p className="uf-sans" style={{ color:"rgba(255,255,255,.4)", fontSize:9, textTransform:"uppercase", letterSpacing:".14em", marginTop:3 }}>Co-Founder & CEO · Alt Mobility</p>
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
                <img src="/Upforge-alt-mobility.webp" alt="Dev Arora, Co-Founder & CEO of Alt Mobility"
                  style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }} loading="eager"
                  onError={e=>{ (e.currentTarget as HTMLImageElement).src='https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800'; }}/>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"14px 16px", background:"linear-gradient(to top,rgba(12,7,2,.96) 60%,transparent)" }}>
                  <p className="uf-serif" style={{ color:"white", fontWeight:700, fontSize:14 }}>Dev Arora</p>
                  <p className="uf-sans" style={{ color:"rgba(255,255,255,.4)", fontSize:9, textTransform:"uppercase", letterSpacing:".14em", marginTop:2 }}>Co-Founder & CEO · Alt Mobility</p>
                </div>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <a href="https://alt-mobility.com/" target="_blank" rel="noopener noreferrer" className="uf-ext-link" aria-label="Visit Alt Mobility official website">
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>{globeSvg(accent)}<span className="uf-sans" style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:accent }}>alt-mobility.com</span></div>
                  <ArrowUpRight style={{ width:14, height:14, color:accent }}/>
                </a>
                <a href="https://www.linkedin.com/company/altmobility/" target="_blank" rel="noopener noreferrer" className="uf-li-link" aria-label="View Alt Mobility on LinkedIn">
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>{liSvg}<span className="uf-sans" style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:"#0077b5" }}>LinkedIn — Alt Mobility</span></div>
                  <ArrowUpRight style={{ width:14, height:14, color:"#0077b5" }}/>
                </a>
              </div>

              {/* Stats */}
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

              {/* Lesson */}
              <div style={{ padding:16, background:accentBg, border:`1px solid ${accentBorder}` }}>
                <p className="uf-sans" style={{ fontSize:8, fontWeight:800, textTransform:"uppercase", letterSpacing:".26em", color:accent, marginBottom:8 }}>The Lesson</p>
                <p className="uf-serif" style={{ fontStyle:"italic", color:"#1A1208", lineHeight:1.72, fontSize:13 }}>{LESSON}</p>
              </div>

              {/* Investors */}
              <div style={{ border:"1px solid #D8D2C4" }}>
                <div style={{ padding:"8px 16px", background:"#F9F7F2", borderBottom:"1px solid #D8D2C4" }}>
                  <p className="uf-sans" style={{ fontSize:8, fontWeight:800, textTransform:"uppercase", letterSpacing:".24em", color:"#1A1208" }}>Key Investors</p>
                </div>
                <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:7 }}>
                  {INVESTORS.map((inv,i)=>(
                    <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span className="uf-dot"/>
                        <span className="uf-sans" style={{ fontSize:11, color:"#2C2010", fontWeight:500 }}>{inv.name}</span>
                      </div>
                      <span className="uf-sans" style={{ fontSize:8, color:"#AAA", textTransform:"uppercase", letterSpacing:".1em" }}>{inv.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Also Read */}
              <div>
                <p className="uf-sans" style={{ fontSize:8, fontWeight:800, textTransform:"uppercase", letterSpacing:".26em", color:"#AAA", marginBottom:12 }}>Also Read on UpForge</p>
                {RELATED.map(r=>(
                  <a key={r.slug} href={`/startup/${r.slug}`} className="uf-rel-link">
                    <div>
                      <p className="uf-sans" style={{ fontSize:11, fontWeight:700, color:"#1A1208" }}>{r.name}</p>
                      <p className="uf-sans" style={{ fontSize:9, color:"#AAA", textTransform:"uppercase", letterSpacing:".12em", marginTop:2 }}>{r.cat} · {r.val}</p>
                    </div>
                    <ArrowUpRight style={{ width:14, height:14, color:"#AAA", flexShrink:0 }}/>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* SEO LINKS */}
        <section style={{ padding:"32px 0", borderBottom:"1px solid #C8C2B4" }}>
          <p className="uf-sans" style={{ fontSize:9, letterSpacing:".3em", textTransform:"uppercase", color:"#AAA", marginBottom:16 }}>Explore More EV Startups on UpForge</p>
          <div className="uf-seo-grid">
            {[
              { l:"EV Startups India 2026", h:"/ev-startups-india" },
              { l:"Indian Unicorns Full List", h:"/indian-unicorns" },
              { l:"Alt Mobility vs Zypp", h:"/ev-startups/alt-mobility-vs-zypp" },
              { l:"CleanTech Startups India", h:"/cleantech-startups" },
              { l:"Ather Energy Profile", h:"/startup/ather-energy-ev" },
              { l:"EV Leasing India Guide", h:"/ev-leasing-india" },
              { l:"Startup Registry India", h:"/startup" },
              { l:"Submit Your Startup", h:"/submit" },
            ].map(lnk=>(
              <a key={lnk.h} href={lnk.h} className="uf-seo-link">
                <span className="uf-sans" style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"#1A1208" }}>{lnk.l}</span>
                <ChevronRight style={{ width:10, height:10, color:"#AAA", flexShrink:0, marginLeft:"auto" }}/>
              </a>
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
            <a href="/submit" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 24px", background:"#1A1208", color:"white" }} className="uf-sans" aria-label="List your startup">
              <span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em" }}>List Your Startup — Free</span>
              <ArrowRight style={{ width:14, height:14 }}/>
            </a>
          </div>
          <p className="uf-sans" style={{ fontSize:9, lineHeight:1.7, marginTop:16, color:"#BBB0A0" }}>
            * Data sourced from Tracxn, Inc42, YourStory, and Alt Mobility press releases as of March 2026. UpForge is an independent registry — no paid placements, no sponsored rankings.
          </p>
          <nav aria-label="Footer navigation" style={{ marginTop:12 }}>
            <ul style={{ display:"flex", flexWrap:"wrap", gap:"8px 16px", listStyle:"none" }}>
              {[{ l:"EV Startups India",h:"/ev-startups-india" },{ l:"Startup Registry",h:"/startup" },{ l:"Indian Unicorns",h:"/indian-unicorns" },{ l:"Ather Energy",h:"/startup/ather-energy-ev" },{ l:"CleanTech Startups",h:"/cleantech-startups" },{ l:"Submit Startup",h:"/submit" }].map(lnk=>(
                <li key={lnk.h}><a href={lnk.h} className="uf-sans" style={{ fontSize:9, color:"#AAA", textTransform:"uppercase", letterSpacing:".14em" }}>{lnk.l}</a></li>
              ))}
            </ul>
          </nav>
        </footer>
      </main>
    </div>
  )
}
