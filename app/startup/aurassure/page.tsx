"use client"

// app/startup/aurassure/page.tsx — FIXED CSS VERSION
// UpForge — Aurassure · Akanksha Priyadarshini & Co-Founders Founder Chronicle
// CSS: Unified string-injection approach — no Tailwind class conflicts

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://upforge.in/startup/aurassure#article",
      "headline": "Aurassure — How Akanksha Priyadarshini Built India's Hyperlocal Climate Intelligence Platform",
      "description": "Aurassure founder story — NIT Rourkela graduate Akanksha Priyadarshini co-founded Aurassure in 2022 in Bhubaneswar. 2,000+ sensors. 200+ Indian cities. 100+ cities in Brazil. Google's largest AQ partner for Air View+. ₹29 crore raised from Rainmatter (Zerodha), Unicorn India Ventures, and Maithan Alloys.",
      "url": "https://upforge.in/startup/aurassure",
      "datePublished": "2026-03-14T00:00:00+05:30",
      "dateModified": "2026-03-14T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": { "@type": "ImageObject", "url": "https://www.upforge.in/Upforge-aurassure.webp", "width": 1200, "height": 630 },
      "publisher": { "@type": "Organization", "name": "UpForge", "url": "https://upforge.in", "logo": { "@type": "ImageObject", "url": "https://upforge.in/logo.png" } },
      "author": { "@type": "Organization", "name": "UpForge Editorial" },
      "about": [
        { "@type": "Person", "name": "Akanksha Priyadarshini", "jobTitle": "Co-Founder & CEO", "worksFor": { "@type": "Organization", "name": "Aurassure" }, "alumniOf": { "@type": "CollegeOrUniversity", "name": "National Institute of Technology Rourkela" } },
        { "@type": "Person", "name": "Vamsi Krishna", "jobTitle": "Co-Founder & CTO", "worksFor": { "@type": "Organization", "name": "Aurassure" } },
        { "@type": "Person", "name": "Raviteja Cherukuri", "jobTitle": "Co-Founder & Chief Hardware Engineer", "worksFor": { "@type": "Organization", "name": "Aurassure" } },
        { "@type": "Person", "name": "Omprakash Patra", "jobTitle": "Co-Founder & Chief Embedded System Architect", "worksFor": { "@type": "Organization", "name": "Aurassure" } }
      ],
      "mentions": { "@type": "Organization", "name": "Aurassure", "url": "https://aurassure.com", "foundingDate": "2022" }
    },
    { "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" }, { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" }, { "@type": "ListItem", "position": 3, "name": "Climate Tech Startups India", "item": "https://upforge.in/climate-tech-startups-india" }, { "@type": "ListItem", "position": 4, "name": "Aurassure", "item": "https://upforge.in/startup/aurassure" } ] },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Who founded Aurassure?", "acceptedAnswer": { "@type": "Answer", "text": "Aurassure was co-founded in May 2022 by Akanksha Priyadarshini (CEO), Vamsi Krishna (CTO), Raviteja Cherukuri (Chief Hardware Engineer), and Omprakash Patra (Chief Embedded System Architect), all based in Bhubaneswar, Odisha. Akanksha is a NIT Rourkela graduate who declined a Deloitte offer to pursue hardware and IoT." } },
        { "@type": "Question", "name": "How much has Aurassure raised?", "acceptedAnswer": { "@type": "Answer", "text": "Aurassure has raised approximately ₹29 crore (~$3.5M) in total. The most recent was a ₹25 crore Pre-Series A (December 2025) led by Rainmatter Capital (Zerodha) and Unicorn India Ventures, with Maithan Alloys." } },
        { "@type": "Question", "name": "What does Aurassure's platform do?", "acceptedAnswer": { "@type": "Answer", "text": "Aurassure deploys rugged IoT sensor nodes monitoring PM2.5, PM10, NO₂, SO₂, CO₂, temperature, humidity, rainfall, wind, and water levels in real time. AI-physics fusion models generate hyperlocal predictive analytics — air quality forecasts, urban heat maps, flood risk alerts, and extreme weather warnings." } },
        { "@type": "Question", "name": "What is Aurassure's relationship with Google?", "acceptedAnswer": { "@type": "Answer", "text": "Aurassure is Google's largest AQ partner for the Google Air View+ programme. Google supported the initial sensor network deployment, enabling Aurassure to develop a hyperlocal air quality monitoring system with up to 95% forecast accuracy." } },
        { "@type": "Question", "name": "What cities does Aurassure operate in?", "acceptedAnswer": { "@type": "Answer", "text": "As of early 2026, Aurassure operates 2,000+ sensor nodes across 200+ cities in India and 100+ cities in Brazil, with early projects in Bangladesh, Africa, and Egypt." } }
      ]
    }
  ]
}

const STATS = [
  { l: "Total Raised", v: "₹29 Cr" },
  { l: "Founded", v: "2022" },
  { l: "HQ", v: "Bhubaneswar" },
  { l: "Sensors", v: "2,000+" },
  { l: "Cities", v: "300+" },
  { l: "Revenue FY25", v: "₹8 Cr" },
]

const TIMELINE = [
  { year: "2016–2021", event: "Akanksha Priyadarshini graduates from NIT Rourkela (BTech, 2016), declines a Deloitte offer, and joins Phoenix Robotix as a hardware development engineer. Her mother develops asthma near Rourkela's steel plant, sharpening her belief that the absence of environmental data is costing lives." },
  { year: "May 2022", event: "Aurassure is co-founded in Bhubaneswar by Akanksha Priyadarshini, Vamsi Krishna, Raviteja Cherukuri, and Omprakash Patra. First revenue: ₹1 crore in year one. The founding product: hyperlocal IoT sensor nodes monitoring PM2.5, NO₂, CO₂, temperature, humidity, and rainfall in real time." },
  { year: "2022–23", event: "Google partnership begins — the game-changer. Aurassure becomes Google's largest AQ partner for Air View+. Pilots expand from Bhubaneswar to Chennai, Rajkot, Aurangabad, and Navi Mumbai. Enterprise customers: Tata Realty, L&T Realty, Honeywell, P&G, IIT Bombay." },
  { year: "Sep 2023", event: "₹4 crore seed round from Unicorn India Ventures — first institutional funding. Revenue hits ₹5.4 crore in year two — 350%+ YoY growth." },
  { year: "2024", event: "Good Air Award 2024 won. FIA Smart Cities Global Start Contest winner. Operations expand to Brazil. Sensor network crosses 1,000 nodes. Customer count reaches 75+. Annual revenue: ₹8.04 crore (FY25)." },
  { year: "Jun 2025", event: "CASCA 2025 recognition. Sensor network at 2,000+ nodes with 99% uptime. 165+ Indian cities covered. Brazil operations at 100+ cities. Named Google's largest AQ partner for Air View+ globally." },
  { year: "Dec 2025", event: "₹25 crore Pre-Series A (December 16, 2025) led by Rainmatter Capital (Zerodha) and Unicorn India Ventures, with Maithan Alloys. Total funding: ₹29 crore. Funds earmarked for global expansion, next-generation sensors, and deeper AI predictive models." },
]

const COLS = [
  {
    h: "The Mother's Asthma and the Data That Didn't Exist",
    b: `Akanksha Priyadarshini grew up in defence cantonments — clean air, tree-lined roads, the particular calm of military stations scattered across Ludhiana, Pune, and Siliguri. It was only when she enrolled at NIT Rourkela, a city defined by its steel plant as much as its engineering institute, that she understood what absence of environmental data actually meant at human scale.\n\nHer mother developed asthma. Her college friends developed respiratory problems. These were not anomalies — they were a pattern. But there was no data to prove it, no hyperlocal sensor network to show what was happening to the air a kilometre from the plant, no platform to take that data and turn it into an early warning. The monitoring devices that did exist were expensive, immobile, power-hungry, and so sparse they covered virtually nothing. India had a billion people breathing largely unmeasured air.\n\nPriyadarshini declined a Deloitte software engineering offer in 2016 and joined Phoenix Robotix, where she spent years in the unglamorous but essential work of hardware design, supply chain, and field installation. When COVID-19 arrived and Phoenix pivoted toward healthcare, she used the disruption to design Aurassure — not just a monitoring device, but a full-stack climate intelligence system. In May 2022, she co-founded the company in Bhubaneswar with Vamsi Krishna, Raviteja Cherukuri, and Omprakash Patra.`,
  },
  {
    h: "Google, the 2,000-Sensor Network and the Tier-2 Bet",
    b: `The Google partnership was the inflection point that no pitch deck could have planned for. When Google reached out to make Aurassure its largest Air Quality partner for the Air View+ programme, the startup from Bhubaneswar did not have the financing to set up a city-scale sensor network on its own. Google's deployment support changed the trajectory. "We didn't have the financing to set up such a large-scale network ourselves, so their support was crucial," Priyadarshini said.\n\nWhat emerged from that collaboration was a hyperlocal air quality monitoring system that combined Google's satellite data, Aurassure's IoT ground-truth sensors, and a proprietary AI-physics fusion model capable of forecasting pollution conditions with up to 95% accuracy. The data was immediately useful to a city like Bhubaneswar — and scalable to Chennai, Rajkot, Aurangabad, Delhi, and beyond.\n\nThe decision to headquarter in Bhubaneswar, contrary to every piece of startup advice pointing toward Bengaluru or Delhi, turned out to be an advantage. "The approval processes for various compliances are smoother and hiring local talent is easier," Priyadarshini noted. The 40-person company now sets up specialised teams across regions while holding its technical core in Odisha — making Aurassure one of the most consequential deep-tech companies to emerge from Tier-2 India.`,
  },
  {
    h: "Rainmatter, Brazil and the Global South Thesis",
    b: `By December 2025, the numbers had made the thesis undeniable. 2,000+ sensor nodes. 99% uptime. 200+ cities in India. 100+ cities in Brazil. Early projects in Bangladesh, Africa, and Egypt. 75+ enterprise customers: Google, Tata Realty, Honeywell, Jindal Steel, LTI Mindtree. Annual revenue of ₹8.04 crore in FY2025. Good Air Award 2024. CASCA 2025. FIA Smart Cities Global Start Contest winner.\n\nThe ₹25 crore Pre-Series A, led by Rainmatter Capital — Zerodha's investment arm and India's most influential climate-focused VC — arrived on December 16, 2025. Unicorn India Ventures returned. Maithan Alloys, a listed manganese alloys manufacturer, added strategic industrial credibility. Abhinav Singh Negi of Rainmatter articulated the thesis: "We cannot afford to just react to the adverse effects of climate change; we need to take a more proactive approach."\n\nThe capital is earmarked for global expansion across Latin America, South Asia, and Africa; next-generation sensor hardware; and deeper AI predictive models for parametric insurance, flood risk APIs, and ESG reporting tools. Priyadarshini's stated goal is unambiguous — to be the default climate intelligence platform for the entire Global South by 2027.`,
  },
]

const PULL_QUOTE = {
  text: "Choose a problem bold enough to matter for the next 50 years. Build with purpose, stay close to the problem, and let data be your compass. What was earlier a 'nice to have' has now become an absolute necessity.",
  by: "Akanksha Priyadarshini, Co-Founder & CEO, Aurassure (December 2025)",
}

const LESSON = "The deepest insights often come from the most personal places. Aurassure was not born in a boardroom or an accelerator — it was born from watching a mother develop asthma in a city with no environmental data. The founders who solve problems they have lived inside build with a conviction that no market research can replicate."

const INVESTORS = [
  "Rainmatter Capital / Zerodha (Lead, Pre-Series A 2025)",
  "Unicorn India Ventures (Seed 2023 + Pre-Series A)",
  "Maithan Alloys Limited (Strategic, Pre-Series A)",
  "MeitY — Ministry of Electronics & IT (Grant)",
  "STPI Bhubaneswar (Incubation)",
  "FTBI / NIT Rourkela (Incubation)",
  "Villgro (Social Impact Accelerator)",
  "CII Centre of Excellence for Innovation",
]

const AWARDS = [
  "Good Air Award 2024",
  "CASCA 2025 Recognition",
  "FIA Smart Cities Global Start — Asian Edition Winner",
  "Google Air View+ — Largest AQ Partner",
  "Inc42 BIGShift — Top Startup Discovery",
  "YourStory 100 Emerging Women Leaders",
]

const FAQS = [
  { q: "What is Aurassure and how is it different from traditional pollution monitoring?", a: "Aurassure is a climate intelligence platform that deploys rugged, hyperlocal IoT sensor nodes to monitor air quality (PM2.5, PM10, NO₂, SO₂, CO₂), weather parameters, and flood conditions in real time. Traditional government monitoring relies on large, expensive, immobile CPCB stations — often one per city. Aurassure deploys dozens to hundreds of nodes per city, processed through proprietary AI-physics fusion models." },
  { q: "Who are Aurassure's co-founders and what is their technical background?", a: "Akanksha Priyadarshini (CEO) is a NIT Rourkela BTech graduate who worked at Phoenix Robotix in hardware design and field deployment. Vamsi Krishna is CTO, Raviteja Cherukuri is Chief Hardware Engineer, and Omprakash Patra is Chief Embedded System Architect. All are based in Bhubaneswar." },
  { q: "What sectors does Aurassure serve?", a: "Aurassure serves construction and real estate (project delay and heat risk), insurance (parametric trigger APIs), logistics and manufacturing (operational climate risk), healthcare (air quality health advisories), urban governance (CPCB compliance, flood management), and ESG reporting for listed companies." },
  { q: "What is Aurassure's international expansion strategy?", a: "Aurassure has a fully operational Brazilian subsidiary covering 100+ cities. The Pre-Series A capital focuses on consolidating Brazil, entering South Asia (Bangladesh, Sri Lanka), Africa, and G20 markets. Aurassure's goal is to become the default climate resilience infrastructure layer for the Global South by 2027." },
]

const RELATED = [
  { name: "Bolna", slug: "bolna", cat: "AI / Voice Automation", val: "$6.92M raised" },
  { name: "BharatPe", slug: "bharatpe-fintech", cat: "Fintech / Payments", val: "$604M raised" },
  { name: "Ather Energy", slug: "ather-energy-ev", cat: "Electric Vehicles", val: "$502M raised" },
]

const accent = "#059669"
const accentDark = "#047857"
const accentBg = "#ecfdf5"
const accentBorder = "#a7f3d0"

const makeCSS = (ac: string, ab: string) => `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  a { text-decoration: none !important; color: inherit; }
  img { display: block; max-width: 100%; }
  .uf-serif { font-family: 'Playfair Display', Georgia, serif !important; }
  .uf-sans  { font-family: 'DM Sans', system-ui, sans-serif !important; }
  .uf-dropcap::first-letter { font-family: 'Playfair Display', Georgia, serif; font-size: 3.8em; font-weight: 900; line-height: .82; float: left; margin-right: .1em; margin-top: .06em; margin-bottom: -.04em; color: #1A1208; }
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
  .uf-stats-grid > div:nth-child(even) { border-right: none; }
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

export default function AurassurePage() {
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
      <h1 className="sr-only">Aurassure Founder Story — Akanksha Priyadarshini | India's Hyperlocal Climate Intelligence Platform | Google Air View+ Partner | UpForge</h1>

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" style={{ background:"#EDE9DF", borderBottom:"1px solid #D8D2C4", padding:"8px 24px" }}>
        <ol style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"6px", listStyle:"none" }}>
          {[{ n:"UpForge",h:"/" },{ n:"Startup Registry",h:"/startup" },{ n:"Climate Tech India",h:"/climate-tech-startups-india" },{ n:"Aurassure",h:"/startup/aurassure" }].map((b,i,arr)=>(
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
          <p className="uf-sans" style={{ fontSize:8, letterSpacing:".44em", color:"#AAA", textTransform:"uppercase", marginBottom:10 }}>UpForge · Startup Registry · Climate Technology</p>
          <p className="uf-serif" style={{ fontSize:"clamp(2rem,5.5vw,4.2rem)", fontWeight:900, lineHeight:1, color:"#1A1208" }}>The Founder Chronicle</p>
          <p className="uf-serif" style={{ fontStyle:"italic", marginTop:10, color:"#6B5C40", fontSize:"clamp(12px,1.8vw,15px)" }}>India's independent startup registry — verified, editorial, March 2026</p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginTop:18 }}>
            <div style={{ height:1, width:"clamp(60px,10vw,140px)", background:"#C8C2B4" }}/>
            <span style={{ color:"#C8C2B4", fontSize:13 }}>✦</span>
            <div style={{ height:1, width:"clamp(60px,10vw,140px)", background:"#C8C2B4" }}/>
          </div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", padding:"8px 24px", gap:16, borderBottom:"1px solid #C8C2B4" }}>
          <span className="uf-sans" style={{ fontSize:8, color:"#AAA", textTransform:"uppercase", letterSpacing:".16em" }}>Edition · Climate Tech</span>
          <div style={{ width:1, height:12, background:"#C8C2B4" }}/>
          <span className="uf-sans" style={{ fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:".14em", color:accent }}>IoT · Climate Intelligence · March 2026</span>
          <div style={{ width:1, height:12, background:"#C8C2B4" }}/>
          <span className="uf-sans" style={{ fontSize:9, color:"#AAA" }}>Bhubaneswar, Odisha</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="uf-outer uf-fade-up">
        <div className="uf-main-grid">
          <article className="uf-article">
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <span className="uf-badge">CLIMATE TECH / IoT</span>
              <span className="uf-sans" style={{ fontSize:9, color:"#AAA", textTransform:"uppercase", letterSpacing:".14em" }}>March 2026</span>
            </div>

            <h2 className="uf-serif" style={{ fontSize:"clamp(1.75rem,4vw,3.1rem)", fontWeight:900, lineHeight:1.07, color:"#1A1208", marginBottom:18 }}>
              Her mother's asthma in a steel city.{" "}
              <em style={{ color:accent }}>Now 2,000 sensors across 300 cities — and Google's largest climate data partner.</em>
            </h2>

            <p className="uf-serif" style={{ fontStyle:"italic", lineHeight:1.75, marginBottom:24, paddingBottom:24, color:"#5A4A30", fontSize:"clamp(14px,1.9vw,17px)", borderBottom:"1px solid #C8C2B4" }}>
              Akanksha Priyadarshini grew up watching India's cities fill with unmeasured, untracked pollution. When her mother developed asthma near Rourkela's steel plant, she decided to build the data layer that India's climate infrastructure was missing. From NIT Rourkela to Bhubaneswar to 300+ cities in two continents — Aurassure is the most consequential climate intelligence company to emerge from Tier-2 India.
            </p>

            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"6px 8px", marginBottom:32 }}>
              {["By UpForge Editorial","Bhubaneswar, Odisha","Est. 2022","India's Climate Intelligence Layer"].map((t,i,a)=>(
                <span key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span className="uf-sans" style={{ fontSize:9, color:"#AAA", textTransform:"uppercase", letterSpacing:".14em" }}>{t}</span>
                  {i<a.length-1 && <span style={{ color:"#C8C2B4", fontSize:10 }}>·</span>}
                </span>
              ))}
            </div>

            {/* Mobile hero */}
            <div className="uf-mobile-hero">
              <img src="/Upforge-aurassure.webp" alt="Akanksha Priyadarshini, Co-Founder & CEO of Aurassure"
                style={{ width:"100%", height:"min(300px,60vw)", objectFit:"cover", objectPosition:"top" }} loading="eager"/>
              <div style={{ padding:"12px 16px", background:"#1A1208" }}>
                <p className="uf-serif" style={{ color:"white", fontWeight:700, fontSize:13 }}>Akanksha Priyadarshini</p>
                <p className="uf-sans" style={{ color:"rgba(255,255,255,.4)", fontSize:9, textTransform:"uppercase", letterSpacing:".14em", marginTop:3 }}>Co-Founder & CEO · Aurassure</p>
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
                <img src="/Upforge-aurassure.webp" alt="Akanksha Priyadarshini, Co-Founder & CEO of Aurassure"
                  style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }} loading="eager"/>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"14px 16px", background:"linear-gradient(to top,rgba(12,7,2,.96) 60%,transparent)" }}>
                  <p className="uf-serif" style={{ color:"white", fontWeight:700, fontSize:14 }}>Akanksha Priyadarshini</p>
                  <p className="uf-sans" style={{ color:"rgba(255,255,255,.4)", fontSize:9, textTransform:"uppercase", letterSpacing:".14em", marginTop:2 }}>Co-Founder & CEO · Aurassure</p>
                </div>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <a href="https://aurassure.com/" target="_blank" rel="noopener noreferrer" className="uf-ext-link" aria-label="Visit Aurassure official website">
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>{globeSvg(accent)}<span className="uf-sans" style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:accent }}>aurassure.com — Official Website</span></div>
                  <ArrowUpRight style={{ width:14, height:14, color:accent }}/>
                </a>
                <a href="https://www.linkedin.com/company/aurassure/" target="_blank" rel="noopener noreferrer" className="uf-li-link" aria-label="View Aurassure on LinkedIn">
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>{liSvg}<span className="uf-sans" style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:"#0077b5" }}>LinkedIn — Aurassure</span></div>
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

              {/* Awards */}
              <div style={{ border:"1px solid #D8D2C4" }}>
                <div style={{ padding:"8px 16px", background:"#F9F7F2", borderBottom:"1px solid #D8D2C4" }}>
                  <p className="uf-sans" style={{ fontSize:8, fontWeight:800, textTransform:"uppercase", letterSpacing:".24em", color:"#1A1208" }}>Awards & Recognition</p>
                </div>
                <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:7 }}>
                  {AWARDS.map((award,i)=>(
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span className="uf-dot"/>
                      <span className="uf-sans" style={{ fontSize:11, color:"#2C2010" }}>{award}</span>
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
                  <p className="uf-sans" style={{ fontSize:8, fontWeight:800, textTransform:"uppercase", letterSpacing:".24em", color:"#1A1208" }}>Key Investors & Supporters</p>
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
          <p className="uf-sans" style={{ fontSize:9, letterSpacing:".3em", textTransform:"uppercase", color:"#AAA", marginBottom:16 }}>Explore More Climate Tech Startups on UpForge</p>
          <div className="uf-seo-grid">
            {[{ l:"Climate Tech Startups India 2026",h:"/climate-tech-startups-india" },{ l:"Indian Unicorns Full List",h:"/indian-unicorns" },{ l:"IoT Startups India",h:"/iot-startups-india" },{ l:"NIT Rourkela Startups",h:"/nit-startups" },{ l:"Women Founders India",h:"/women-founders-india" },{ l:"Odisha Startups",h:"/odisha-startups" },{ l:"Startup Registry India",h:"/startup" },{ l:"Submit Your Startup",h:"/submit" }].map(lnk=>(
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
            * Data sourced from YourStory, Inc42, Tracxn, Entrackr, and Aurassure press releases as of March 2026. UpForge is an independent registry — no paid placements, no sponsored rankings.
          </p>
          <nav aria-label="Footer navigation" style={{ marginTop:12 }}>
            <ul style={{ display:"flex", flexWrap:"wrap", gap:"8px 16px", listStyle:"none" }}>
              {[{ l:"Climate Tech India",h:"/climate-tech-startups-india" },{ l:"Startup Registry",h:"/startup" },{ l:"Indian Unicorns",h:"/indian-unicorns" },{ l:"Ather Energy Profile",h:"/startup/ather-energy-ev" },{ l:"Submit Startup",h:"/submit" }].map(lnk=>(
                <li key={lnk.h}><Link href={lnk.h} className="uf-sans" style={{ fontSize:9, color:"#AAA", textTransform:"uppercase", letterSpacing:".14em" }}>{lnk.l}</Link></li>
              ))}
            </ul>
          </nav>
        </footer>
      </main>
    </div>
  )
}
