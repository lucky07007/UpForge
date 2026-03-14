
"use client"

// app/startup/aurassure/page.tsx
// UpForge — Aurassure · Akanksha Priyadarshini & Co-Founders Founder Chronicle
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
      "@id": "https://upforge.in/startup/aurassure#article",
      "headline": "Aurassure — How Akanksha Priyadarshini Built India's Hyperlocal Climate Intelligence Platform From NIT Rourkela to Google, Rainmatter & the Global South",
      "description": "Aurassure founder story — NIT Rourkela graduate Akanksha Priyadarshini co-founded Aurassure in 2022 in Bhubaneswar after her mother's asthma diagnosis exposed India's climate data blind spot. 2,000+ sensors. 200+ Indian cities. 100+ cities in Brazil. Google's largest AQ partner for Air View+. ₹29 crore raised from Rainmatter (Zerodha), Unicorn India Ventures, and Maithan Alloys. Good Air Award 2024. CASCA 2025. India's default climate intelligence platform for the Global South.",
      "url": "https://upforge.in/startup/aurassure",
      "datePublished": "2026-03-14T00:00:00+05:30",
      "dateModified": "2026-03-14T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.in/Upforge-aurassure.webp",
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
          "name": "Akanksha Priyadarshini",
          "jobTitle": "Co-Founder & CEO",
          "worksFor": { "@type": "Organization", "name": "Aurassure" },
          "alumniOf": { "@type": "CollegeOrUniversity", "name": "National Institute of Technology Rourkela" },
          "sameAs": ["https://www.linkedin.com/in/akankshapriyadarshini/"]
        },
        {
          "@type": "Person",
          "name": "Vamsi Krishna",
          "jobTitle": "Co-Founder & CTO",
          "worksFor": { "@type": "Organization", "name": "Aurassure" }
        },
        {
          "@type": "Person",
          "name": "Raviteja Cherukuri",
          "jobTitle": "Co-Founder & Chief Hardware Engineer",
          "worksFor": { "@type": "Organization", "name": "Aurassure" }
        },
        {
          "@type": "Person",
          "name": "Omprakash Patra",
          "jobTitle": "Co-Founder & Chief Embedded System Architect",
          "worksFor": { "@type": "Organization", "name": "Aurassure" }
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "Aurassure",
        "url": "https://aurassure.com",
        "foundingDate": "2022",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "Bhubaneswar",
          "addressRegion": "Odisha",
          "addressCountry": "IN"
        },
        "description": "Aurassure is India's leading climate intelligence platform, deploying hyperlocal IoT sensor networks to provide real-time, AI-powered environmental data on air quality, heat stress, flooding, and extreme weather. With 2,000+ street-level sensors across 200+ Indian cities and 100+ Brazilian cities, Aurassure is Google's largest AQ partner for Air View+, serves 75+ enterprise customers including Google, Tata Realty, L&T Realty, Honeywell, Jindal Steel, and P&G, and is targeting the entire Global South as its climate intelligence backbone. Backed by Rainmatter (Zerodha), Unicorn India Ventures, and Maithan Alloys.",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 35, "maxValue": 50 },
        "award": ["Good Air Award 2024", "CASCA 2025", "FIA Smart Cities Global Start Contest Winner"],
        "sameAs": [
          "https://aurassure.com",
          "https://www.linkedin.com/company/aurassure/"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "Climate Tech Startups India", "item": "https://upforge.in/climate-tech-startups-india" },
        { "@type": "ListItem", "position": 4, "name": "Aurassure", "item": "https://upforge.in/startup/aurassure" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who founded Aurassure and what is the founder's background?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aurassure was co-founded in May 2022 by Akanksha Priyadarshini (CEO), Vamsi Krishna (CTO), Raviteja Cherukuri (Chief Hardware Engineer), and Omprakash Patra (Chief Embedded System Architect), all based in Bhubaneswar, Odisha. Akanksha Priyadarshini is a NIT Rourkela graduate (BTech, 2016) who declined a Deloitte software engineering offer to pursue hardware and IoT. She worked at Phoenix Robotix as a hardware development engineer across supply chain, operations, and installation before conceptualising Aurassure during COVID-19. The founding was rooted in a personal experience: her mother developed asthma while living near Rourkela's steel plant, revealing the near-total absence of hyperlocal environmental data in Indian cities."
          }
        },
        {
          "@type": "Question",
          "name": "How much has Aurassure raised and who are its investors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aurassure has raised approximately ₹29 crore (~$3.5M) in total across multiple rounds. The most recent was a ₹25 crore Pre-Series A round (December 16, 2025) led by Rainmatter Capital (Zerodha's investment arm) and Unicorn India Ventures, with participation from Maithan Alloys Limited. Prior to this, the company raised ₹4 crore in a seed round led by Unicorn India Ventures in 2023. Other institutional supporters include MeitY (Ministry of Electronics & Information Technology), STPI Bhubaneswar, FTBI/NIT Rourkela incubation, Villgro, Startup Odisha, and CII Centre of Excellence for Innovation."
          }
        },
        {
          "@type": "Question",
          "name": "What does Aurassure's platform actually do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aurassure deploys rugged, multi-parameter IoT sensor nodes across urban India and international cities. These sensors monitor PM2.5, PM10, NO₂, SO₂, CO₂, temperature, humidity, rainfall, wind, and water levels in real time. The raw data is processed through Aurassure's proprietary AI-physics fusion models alongside satellite datasets to generate hyperlocal predictive analytics — air quality forecasts, urban heat island maps, flood risk alerts, and extreme weather early warnings. The platform is delivered through dashboards, APIs, and a 'sensing-as-a-service' model, supporting regulatory compliance, ESG reporting, smart city planning, and enterprise risk management. Products include Aurassure Infra (outdoor air/weather/GHG monitoring), Aurassure Care (indoor air quality), and Aurassure Trust (flood monitoring)."
          }
        },
        {
          "@type": "Question",
          "name": "What is Aurassure's relationship with Google?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aurassure is Google's largest AQ (Air Quality) partner for the Google Air View+ programme — a significant validation for a startup from Bhubaneswar. Google supported the initial deployment of Aurassure's sensor network when the company lacked financing to scale independently. Through this partnership, Aurassure developed a hyperlocal air quality monitoring system combining satellite-based information, on-ground sensor data, and an analytics layer capable of forecasting pollution conditions with up to 95% accuracy. The collaboration expanded Aurassure's reach from Bhubaneswar across multiple Indian cities and brought international credibility that helped the company attract enterprise clients and investors."
          }
        },
        {
          "@type": "Question",
          "name": "What cities and countries does Aurassure operate in?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As of early 2026, Aurassure operates a network of 2,000+ sensor nodes with 99% uptime across 200+ cities in India (including Bhubaneswar, Chennai, Rajkot, Aurangabad, Navi Mumbai, Delhi, and major industrial corridors) and 100+ cities in Brazil through its Brazilian subsidiary. The company has initiated early projects in Bangladesh, marking entry into broader South and Southeast Asian markets, and is engaged in projects in Africa and Egypt through development organisation partnerships. Its stated target is to become the default climate resilience platform for the Global South by 2027."
          }
        },
        {
          "@type": "Question",
          "name": "Who are Aurassure's enterprise customers and what awards has it won?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aurassure serves 75+ enterprise customers including Google, Tata Realty, L&T Realty, Honeywell, P&G, Jindal Steel, LTI Mindtree, and IIT Bombay, plus government bodies through environmental organisations including ICLEI, Taru Leading Edge, and IRADE. The company has won the Good Air Award (2024), CASCA 2025 recognition, and was selected as winner of the FIA Smart Cities Global Start Contest (Asian Edition). It has also received a government grant from Karnataka's Chief Minister for water quality monitoring, and collaborated on research with IIT Delhi, IIT Bombay, and Columbia University. Annual revenue reached ₹8.04 crore in FY2025, with 350% YoY growth in a prior period."
          }
        }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Total Raised", v: "₹29 Cr" },
  { l: "Founded", v: "2022" },
  { l: "HQ", v: "Bhubaneswar" },
  { l: "Sensors", v: "2,000+" },
  { l: "Cities", v: "300+" },
  { l: "Revenue FY25", v: "₹8 Cr" },
]

const TIMELINE = [
  {
    year: "2016–2021",
    event: "Akanksha Priyadarshini graduates from NIT Rourkela (BTech, 2016), declines a Deloitte offer, and joins Phoenix Robotix as a hardware development engineer. She works across hardware design, supply chain, operations, and field installation — building the technical foundation for what will become Aurassure. Her mother develops asthma near Rourkela's steel plant, sharpening her belief that the absence of environmental data is costing lives.",
  },
  {
    year: "May 2022",
    event: "Aurassure is co-founded in Bhubaneswar by Akanksha Priyadarshini, Vamsi Krishna, Raviteja Cherukuri, and Omprakash Patra. Incubated at FTBI/NIT Rourkela and STPI Bhubaneswar with support from MeitY and Startup Odisha. First revenue: ₹1 crore in year one. The founding product: hyperlocal IoT sensor nodes monitoring PM2.5, NO₂, CO₂, temperature, humidity, and rainfall in real time.",
  },
  {
    year: "2022–23",
    event: "Google partnership begins — the game-changer. Aurassure becomes Google's largest AQ partner for Air View+, receiving deployment support and co-developing a hyperlocal air quality forecasting system with up to 95% accuracy. Pilots expand from Bhubaneswar to Chennai, Rajkot, Aurangabad, and Navi Mumbai. Enterprise customers: Tata Realty, L&T Realty, Honeywell, P&G, IIT Bombay. Research collaborations: IIT Delhi, Columbia University.",
  },
  {
    year: "Sep 2023",
    event: "₹4 crore seed round from Unicorn India Ventures — the first institutional funding. Bikram Mahajan (Partner, UIV): 'Of the 1.4 million air quality monitoring devices needed globally, only 3% are operational — Aurassure is building the rest.' Funds deployed for data analytics team, product certifications, and sales expansion. Revenue hits ₹5.4 crore in year two — 350%+ YoY growth.",
  },
  {
    year: "2024",
    event: "Good Air Award 2024 won. FIA Smart Cities Global Start Contest (Asian Edition) winner. Operations expand to Brazil — first international subsidiary. Sensor network crosses 1,000 nodes. Customer count reaches 75+, including Jindal Steel, LTI Mindtree, and ICLEI-partnered government bodies. Team grows to 40 people. 40% QoQ growth. Annual revenue: ₹8.04 crore (FY25).",
  },
  {
    year: "Jun 2025",
    event: "CASCA 2025 recognition. YourStory covers Aurassure as a climate resilience leader. Sensor network at 2,000+ nodes with 99% uptime. 165+ Indian cities covered. Brazil operations at 100+ cities. Early projects in Bangladesh, Africa, and Egypt underway. Aurassure named Google's largest AQ partner for Air View+ globally.",
  },
  {
    year: "Dec 2025",
    event: "₹25 crore Pre-Series A raised (December 16, 2025) — led by Rainmatter Capital (Zerodha) and Unicorn India Ventures, with Maithan Alloys. Total funding: ₹29 crore (~$3.27M). Funds earmarked: global expansion (Latin America, South Asia, Africa), Brazilian subsidiary strengthening, next-generation sensor hardware, and AI predictive model development. Aurassure targets becoming the default climate intelligence backbone of the Global South by 2027.",
  },
]

const COLS = [
  {
    h: "The Mother's Asthma and the Data That Didn't Exist",
    b: `Akanksha Priyadarshini grew up in defence cantonments — clean air, tree-lined roads, the particular calm of military stations scattered across Ludhiana, Pune, and Siliguri. It was only when she enrolled at NIT Rourkela, a city defined by its steel plant as much as its engineering institute, that she understood what absence of environmental data actually meant at human scale.\n\nHer mother developed asthma. Her college friends developed respiratory problems. These were not anomalies — they were a pattern. But there was no data to prove it, no hyperlocal sensor network to show what was happening to the air a kilometre from the plant, no platform to take that data and turn it into an early warning. The monitoring devices that did exist were expensive, immobile, power-hungry, and so sparse they covered virtually nothing. India had a billion people breathing largely unmeasured air.\n\nPriyadarshini declined a Deloitte software engineering offer in 2016 and joined Phoenix Robotix, where she spent years in the unglamorous but essential work of hardware design, supply chain, and field installation. When COVID-19 arrived and Phoenix pivoted toward healthcare, she used the disruption to design Aurassure — not just a monitoring device, but a full-stack climate intelligence system. In May 2022, she co-founded the company in Bhubaneswar with Vamsi Krishna, Raviteja Cherukuri, and Omprakash Patra. "We started with the idea of building a data analysis platform," she said, "where we can use data collected from our hardware devices to help answer the 'what if' questions in disaster management."`,
  },
  {
    h: "Google, the 2,000-Sensor Network and the Tier-2 Bet",
    b: `The Google partnership was the inflection point that no pitch deck could have planned for. When Google reached out to make Aurassure its largest Air Quality partner for the Air View+ programme, the startup from Bhubaneswar did not have the financing to set up a city-scale sensor network on its own. Google's deployment support changed the trajectory. "We didn't have the financing to set up such a large-scale network ourselves, so their support was crucial," Priyadarshini said.\n\nWhat emerged from that collaboration was a hyperlocal air quality monitoring system that combined Google's satellite data, Aurassure's IoT ground-truth sensors, and a proprietary AI-physics fusion model capable of forecasting pollution conditions with up to 95% accuracy. The data was immediately useful to a city like Bhubaneswar — and scalable to Chennai, Rajkot, Aurangabad, Delhi, and beyond.\n\nThe decision to headquarter in Bhubaneswar, contrary to every piece of startup advice pointing toward Bengaluru or Delhi, turned out to be an advantage. "The approval processes for various compliances are smoother and hiring local talent is easier," Priyadarshini noted. The 40-person company now sets up specialised teams across regions while holding its technical core in Odisha — a structure that makes Aurassure one of the most consequential deep-tech companies to emerge from Tier-2 India. The ₹4 crore seed round from Unicorn India Ventures in 2023 confirmed the institutional conviction: of the 1.4 million air quality devices needed globally, only 3% were operational. Aurassure was building the rest.`,
  },
  {
    h: "Rainmatter, Brazil and the Global South Thesis",
    b: `By December 2025, the numbers had made the thesis undeniable. 2,000+ sensor nodes. 99% uptime. 200+ cities in India. 100+ cities in Brazil. Early projects in Bangladesh, Africa, and Egypt. 75+ enterprise customers: Google, Tata Realty, Honeywell, Jindal Steel, LTI Mindtree. Annual revenue of ₹8.04 crore in FY2025. Good Air Award 2024. CASCA 2025. FIA Smart Cities Global Start Contest winner.\n\nThe ₹25 crore Pre-Series A, led by Rainmatter Capital — Zerodha's investment arm and India's most influential climate-focused VC — arrived on December 16, 2025. Unicorn India Ventures returned. Maithan Alloys, a listed manganese alloys manufacturer, added strategic industrial credibility. Abhinav Singh Negi of Rainmatter articulated the thesis: "We cannot afford to just react to the adverse effects of climate change; we need to take a more proactive approach."\n\nThe capital is earmarked for three things: global expansion across Latin America, South Asia, and Africa; next-generation sensor hardware for accuracy and durability; and deeper AI predictive models for parametric insurance, flood risk APIs, and ESG reporting tools. Priyadarshini's stated goal is unambiguous — to be the default climate intelligence platform for the entire Global South by 2027. From a steel-plant city in Odisha to a ₹29 crore climate infrastructure company with sensors on three continents, Aurassure is already most of the way there.`,
  },
]

const PULL_QUOTE = {
  text: "Choose a problem bold enough to matter for the next 50 years. Build with purpose, stay close to the problem, and let data be your compass. Enterprises today need climate intelligence that is immediate, accurate, and hyperlocal. What was earlier a 'nice to have' has now become an absolute necessity.",
  by: "Akanksha Priyadarshini, Co-Founder & CEO, Aurassure (December 2025)",
}

const LESSON =
  "The deepest insights often come from the most personal places. Aurassure was not born in a boardroom or an accelerator — it was born from watching a mother develop asthma in a city with no environmental data. The founders who solve problems they have lived inside build with a conviction that no market research can replicate. Climate tech from Bhubaneswar is now in 300+ cities across two continents."

const INVESTORS = [
  "Rainmatter Capital / Zerodha (Lead, Pre-Series A 2025)",
  "Unicorn India Ventures (Seed 2023 + Pre-Series A 2025)",
  "Maithan Alloys Limited (Strategic, Pre-Series A 2025)",
  "MeitY — Ministry of Electronics & IT (Govt. Grant)",
  "STPI Bhubaneswar (Incubation)",
  "FTBI / NIT Rourkela (Incubation)",
  "Villgro (Social Impact Accelerator)",
  "CII Centre of Excellence for Innovation (Early Support)",
]

const FAQS = [
  {
    q: "What is Aurassure and how is it different from traditional pollution monitoring?",
    a: "Aurassure is a climate intelligence platform that deploys rugged, hyperlocal IoT sensor nodes to monitor air quality (PM2.5, PM10, NO₂, SO₂, CO₂), weather parameters, and flood conditions in real time. Traditional government monitoring relies on large, expensive, immobile CPCB stations — often one per city. Aurassure deploys dozens to hundreds of nodes per city, generating street-level data processed through proprietary AI-physics fusion models to produce forecasts, alerts, and risk indices. It is sensor-based, AI-powered, and designed as 'sensing-as-a-service' rather than hardware sales — making it continuously valuable to enterprise clients.",
  },
  {
    q: "Who are Aurassure's co-founders and what is their technical background?",
    a: "Akanksha Priyadarshini (CEO) is a NIT Rourkela BTech graduate who worked at Phoenix Robotix in hardware design and field deployment before founding Aurassure. Vamsi Krishna is CTO. Raviteja Cherukuri is Chief Hardware Engineer. Omprakash Patra is Chief Embedded System Architect. The leadership team also includes Satyanarayan Bishoyi as COO and Dr. Asutosh Acharya as Chief Climate Scientist. All are based in Bhubaneswar — Aurassure is one of India's most significant deep-tech companies built outside a Tier-1 city.",
  },
  {
    q: "What sectors does Aurassure serve and what are its products?",
    a: "Aurassure serves construction and real estate (project delay and heat risk), insurance (parametric trigger APIs), logistics and manufacturing (operational climate risk), healthcare (air quality health advisories), urban governance and smart cities (CPCB compliance, flood management), and ESG reporting for listed companies. Products include Aurassure Infra (outdoor air quality, weather, and GHG monitoring), Aurassure Care (indoor air quality integrated with BMS and air purifiers), and Aurassure Trust (flood monitoring with real-time risk alerts).",
  },
  {
    q: "What is Aurassure's international expansion strategy?",
    a: "Aurassure has a fully operational Brazilian subsidiary covering 100+ cities — its most advanced international market. The Pre-Series A capital is focused on consolidating Brazil, entering new markets in South Asia (Bangladesh, Sri Lanka), Africa, and selected G20 markets. New products for international markets include flood risk maps and insurance APIs designed for climate-vulnerable regions. Aurassure's stated goal is to become the default climate resilience infrastructure layer for the Global South by 2027 — a market with far fewer established competitors than the US or European climate tech space.",
  },
]

const RELATED = [
  { name: "Bolna", slug: "bolna", cat: "AI / Voice Automation", val: "$6.92M raised" },
  { name: "BharatPe", slug: "bharatpe-fintech", cat: "Fintech / Payments", val: "$604M raised" },
  { name: "Ather Energy", slug: "ather-energy-ev", cat: "Electric Vehicles", val: "$502M raised" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AurassurePage() {
  const accent = "#059669"
  const accentDark = "#047857"
  const accentBg = "#ecfdf5"
  const accentBorder = "#a7f3d0"

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
        Aurassure Founder Story — Akanksha Priyadarshini | India's Hyperlocal Climate Intelligence Platform | Google Air View+ Partner | ₹29 Crore Raised | UpForge
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
            { n: "Climate Tech India", h: "/climate-tech-startups-india" },
            { n: "Aurassure", h: "/startup/aurassure" },
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
            UpForge · Startup Registry · Climate Technology
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
            Edition · Climate Tech
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span
            className="text-[9px] font-black uppercase tracking-wider"
            style={{ color: accent }}
          >
            IoT · Climate Intelligence · March 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">Bhubaneswar, Odisha</span>
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
                CLIMATE TECH / IoT
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">March 2026</span>
            </div>

            {/* Headline */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              Her mother's asthma in a steel city.{" "}
              <em style={{ color: accent }}>
                Now 2,000 sensors across 300 cities — and Google's largest climate data partner.
              </em>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              Akanksha Priyadarshini grew up watching India's cities fill with unmeasured, untracked
              pollution. When her mother developed asthma near Rourkela's steel plant, she decided
              to build the data layer that India's climate infrastructure was missing. From NIT
              Rourkela to Bhubaneswar to 300+ cities in two continents — Aurassure is the most
              consequential climate intelligence company to emerge from Tier-2 India.
            </p>

            {/* Byline */}
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}
            >
              {[
                "By UpForge Editorial",
                "Bhubaneswar, Odisha",
                "Est. 2022",
                "India's Climate Intelligence Layer",
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
                src="/Upforge-aurassure.webp"
                alt="Akanksha Priyadarshini, Co-Founder & CEO of Aurassure — UpForge Founder Chronicle"
                className="w-full object-cover object-top"
                style={{ height: "min(300px,60vw)", display: "block" }}
                loading="eager"
              />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>
                  Akanksha Priyadarshini
                </p>
                <p
                  className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  Co-Founder & CEO · Aurassure
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

            {/* FAQ — visual only, NO microdata */}
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
                  src="/Upforge-aurassure.webp"
                  alt="Akanksha Priyadarshini, Co-Founder & CEO of Aurassure — UpForge Founder Chronicle"
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
                    Akanksha Priyadarshini
                  </p>
                  <p
                    className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Co-Founder & CEO · Aurassure
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://aurassure.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: `1.5px solid ${accent}`, textDecoration: "none" }}
                  aria-label="Visit Aurassure official website"
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
                      aurassure.com — Official Website
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/aurassure/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View Aurassure on LinkedIn"
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
                      LinkedIn — Aurassure
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

              {/* Awards & Recognition */}
              <div style={{ border: "1px solid #D8D2C4" }}>
                <div
                  className="px-4 py-2"
                  style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}
                >
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Awards & Recognition
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {[
                    "Good Air Award 2024",
                    "CASCA 2025 Recognition",
                    "FIA Smart Cities Global Start — Asian Edition Winner",
                    "Google Air View+ — Largest AQ Partner",
                    "Inc42 BIGShift — Top Startup Discovery",
                    "YourStory 100 Emerging Women Leaders",
                  ].map((award, i) => (
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
                      {award}
                    </p>
                  ))}
                </div>
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
                    Key Investors & Supporters
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
            Explore More Climate Tech Startups on UpForge
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "Climate Tech Startups India 2026", h: "/climate-tech-startups-india" },
              { l: "Indian Unicorns Full List", h: "/indian-unicorns" },
              { l: "IoT Startups India", h: "/iot-startups-india" },
              { l: "NIT Rourkela Startups", h: "/nit-startups" },
              { l: "Women Founders India", h: "/women-founders-india" },
              { l: "Odisha Startups", h: "/odisha-startups" },
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
              <p className="pf font-bold text-[#1A1208] mb-2" style={{ fontSize: "1.2rem" }}>
                Building India's next unicorn? Get verified on UpForge.
              </p>
              <p className="text-[12px] text-[#6B5C40]" style={{ fontFamily: "system-ui,sans-serif" }}>
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
            * Data sourced from YourStory, Inc42, Tracxn, Entrackr, Outlook Business, OrissaPOST,
            DealStreetAsia, PV Magazine India, and Aurassure press releases as of March 2026.
            UpForge is an independent registry — no paid placements, no sponsored rankings. Funding
            figures, sensor counts, and revenue metrics reflect latest available public data including
            company announcements and DRHP-equivalent filings.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "Climate Tech India", h: "/climate-tech-startups-india" },
                { l: "Startup Registry", h: "/startup" },
                { l: "Indian Unicorns", h: "/indian-unicorns" },
                { l: "Bolna Profile", h: "/startup/bolna" },
                { l: "BharatPe Profile", h: "/startup/bharatpe-fintech" },
                { l: "Ather Energy Profile", h: "/startup/ather-energy-ev" },
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
