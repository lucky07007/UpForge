"use client"

// app/startup/blue-energy-motors/page.tsx — FIXED CSS VERSION
// UpForge — Blue Energy Motors · Anirudh Bhuwalka Founder Chronicle
// CSS: Unified string-injection approach — no Tailwind class conflicts

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://upforge.in/startup/blue-energy-motors#article",
      "headline": "Blue Energy Motors — How Anirudh Bhuwalka Built India's First LNG Truck Company After a Bankruptcy, Backed by Nikhil Kamath and the Essar Group",
      "description": "Blue Energy Motors founder story — Anirudh Bhuwalka built Asia Motor Works to India's #4 truck maker before bankruptcy in 2020, then returned with Blue Energy Motors — India's first LNG-powered heavy truck manufacturer. $50M raised. 1,000+ trucks deployed. ₹154 crore revenue FY2024.",
      "url": "https://upforge.in/startup/blue-energy-motors",
      "datePublished": "2026-03-14T00:00:00+05:30",
      "dateModified": "2026-03-14T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": { "@type": "ImageObject", "url": "https://www.upforge.in/Upforge-blue-energy-motors.webp", "width": 1200, "height": 630 },
      "publisher": { "@type": "Organization", "name": "UpForge", "url": "https://upforge.in", "logo": { "@type": "ImageObject", "url": "https://upforge.in/logo.png" } },
      "author": { "@type": "Organization", "name": "UpForge Editorial" },
      "about": { "@type": "Person", "name": "Anirudh Bhuwalka", "jobTitle": "Founder & Managing Director", "worksFor": { "@type": "Organization", "name": "Blue Energy Motors" }, "alumniOf": { "@type": "CollegeOrUniversity", "name": "Babson College, Massachusetts" } },
      "mentions": { "@type": "Organization", "name": "Blue Energy Motors", "url": "https://blueenergymotors.com", "foundingDate": "2021" }
    },
    { "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" }, { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" }, { "@type": "ListItem", "position": 3, "name": "EV Startups India", "item": "https://upforge.in/ev-startups-india" }, { "@type": "ListItem", "position": 4, "name": "Blue Energy Motors", "item": "https://upforge.in/startup/blue-energy-motors" } ] },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Who founded Blue Energy Motors?", "acceptedAnswer": { "@type": "Answer", "text": "Blue Energy Motors was founded in 2021 by Anirudh Bhuwalka. He holds a BS in Entrepreneurship from Babson College and is the nephew of the late Shashi Ruia, co-founder of the Essar Group. He previously built Asia Motor Works (AMW) to India's 4th-largest truck manufacturer before it went bankrupt in 2020." } },
        { "@type": "Question", "name": "How much has Blue Energy Motors raised?", "acceptedAnswer": { "@type": "Answer", "text": "Blue Energy Motors has raised $50 million total. The most recent $30M Series A (September 2025) was led by Nikhil Kamath and Omnitex Industries. Strategic investors include Essar Group and FPT Industrial / Iveco Group." } },
        { "@type": "Question", "name": "What is the BE 5528 LNG truck?", "acceptedAnswer": { "@type": "Answer", "text": "The BE 5528+ is India's first LNG-powered heavy tractor unit, powered by FPT Industrial's Cursor 13 NGL engine. It delivers 30% lower carbon emissions than diesel, running costs 10–30% cheaper than diesel, and matches diesel torque output for long-haul applications." } },
        { "@type": "Question", "name": "What is Blue Energy Motors' electric truck?", "acceptedAnswer": { "@type": "Answer", "text": "Blue Energy Motors launched India's first battery-swapping electric heavy-duty truck in November 2025 on the Mumbai–Pune corridor. It uses battery swapping to eliminate charging downtime, offers unlimited range, highest payload in its category, and an Energy-as-a-Service model." } },
        { "@type": "Question", "name": "Who are Blue Energy Motors' enterprise customers?", "acceptedAnswer": { "@type": "Answer", "text": "Blue Energy Motors has sold approximately 1,000 LNG trucks to JK Lakshmi Cement, CONCUR Logistics, Inland World Logistics, Aditya Birla Group fleet operators, and firms across cement, steel, mining, and logistics sectors." } }
      ]
    }
  ]
}

const STATS = [
  { l: "Total Raised", v: "$50M" },
  { l: "Founded", v: "2021" },
  { l: "HQ", v: "Pune / Mumbai" },
  { l: "LNG Trucks", v: "1,000+" },
  { l: "Revenue FY24", v: "₹154 Cr" },
  { l: "Plant Capacity", v: "10,000/yr" },
]

const TIMELINE = [
  { year: "2002–2020", event: "Anirudh Bhuwalka — Babson College, nephew of Essar Group co-founder Shashi Ruia — founds Asia Motor Works (AMW) in Bhachau, Gujarat. Within six years, AMW reaches India's #4 in trucks, 25% market share in tippers. AMW files for bankruptcy in 2020 during the sector downturn." },
  { year: "2021", event: "Before AMW is formally liquidated, Bhuwalka begins work on Blue Energy Motors — technology-agnostic alternative fuel trucks (LNG, EV, hydrogen). Manufacturing facility secured at Chakan, Pune." },
  { year: "Sep 2022", event: "Union Minister Nitin Gadkari inaugurates Blue Energy Motors' Chakan plant. India's first LNG truck — the BE 5528+ — is unveiled, powered by FPT Industrial's Cursor 13 NGL engine. JK Lakshmi Cement becomes the first enterprise customer. First funding round: $10M." },
  { year: "2023", event: "CONCUR Logistics places an order for 100 LNG tractor units. Blue Energy crosses 100 trucks deployed. $10M second round raised. Netradyne integrates its Driver·i1 AI Fleet Camera System into BEM's fleet. Essar Group formalises strategic investment." },
  { year: "Mar 2024", event: "500+ LNG trucks deployed. Fleet has cumulatively travelled over 1 crore kilometres — reducing 3,000+ tonnes of CO₂. Revenue grows to ₹154.42 crore in FY2024. BEM announces plans to raise $100 million." },
  { year: "Jan 2025", event: "Blue Energy Motors signs MoU with the Government of Maharashtra for ₹3,500 crore manufacturing facility for 30,000 electric trucks annually — including battery-pack and motor manufacturing." },
  { year: "Sep 2025", event: "$30M Series A led by Nikhil Kamath and Omnitex Industries. Total funding reaches $50M. LNG trucks deployed: 1,000+. CO₂ saved vs. diesel: 14,000+ tonnes. BEM described as India's largest LNG truck manufacturer." },
  { year: "Nov 2025", event: "Blue Energy Motors launches India's first battery-swapping electric heavy-duty truck on the Mumbai–Pune corridor — unlimited range via swapping, highest payload in category, Energy-as-a-Service economics, renewable energy supply chain." },
]

const COLS = [
  {
    h: "The First Act: India's #4 Truck Maker — and Bankruptcy",
    b: `The story of Blue Energy Motors cannot be told without the story that preceded it. Anirudh Bhuwalka was 36 years old, fresh from Babson College — the Massachusetts business school ranked world number one for entrepreneurship — and armed with the most valuable uncle in Indian industry: Shashi Ruia, co-founder of the Essar Group, the ₹70,000 crore conglomerate that had built steel, oil, ports, and telecoms out of nothing.\n\nIn 2002, Bhuwalka founded Asia Motor Works in Bhachau, Gujarat. The model was borrowed from global assembly practice: source engines from Cummins, gearboxes from ZF, axles from Eaton, cabins fully fitted from China. No manufacturing from scratch — just precision assembly, aggressive pricing, and a tipper truck with air-conditioning and a music system in an era when drivers fought for the chance to sit in one. Within six years of production, AMW had seized India's fourth position in trucks overall and second position in tippers, behind only Tata Motors. BusinessToday ran the headline.\n\nBy 2020 it was over. A prolonged commercial vehicles sector downturn, overleveraged balance sheet, and the brutal mathematics of a capital-intensive industry in a demand collapse sent AMW into bankruptcy. The company was liquidated. Bhuwalka had built something real, seen it fail, and was left with the question every entrepreneur dreads: what next?`,
  },
  {
    h: "The Second Act: LNG, Nitin Gadkari and India's First Green Truck",
    b: `The answer Bhuwalka arrived at was both bolder and more specific than AMW had been. Commercial trucks account for just 3% of India's vehicle fleet but contribute 45% of its transportation sector emissions. With India's freight volumes set to double by 2035, the decarbonisation of long-haul trucking was not an environmental choice — it was an economic and regulatory inevitability.\n\nBhuwalka bet on LNG as the immediate answer, with electric and hydrogen to follow on a technology-agnostic modular platform. In September 2022, Union Minister Nitin Gadkari inaugurated Blue Energy Motors' Chakan plant — adjacent to Mahindra's facility, 30 kilometres from Pune. India's first LNG-powered heavy truck, the BE 5528+, rolled out. Powered by FPT Industrial's Cursor 13 NGL engine — the global powertrain of the Iveco Group — the truck matched diesel torque, offered 30% lower carbon emissions, and ran 10–30% cheaper per kilometre.\n\nThe Essar connection proved structural rather than just financial. Essar's subsidiaries Ultra Gas and Greenline began independently building India's LNG highway refuelling network — the critical infrastructure without which LNG trucks cannot operate. Bhuwalka did not just build a truck. He was building into an ecosystem that his family's conglomerate was simultaneously constructing around him.`,
  },
  {
    h: "₹154 Crore Revenue, Nikhil Kamath's $30M and the Electric Pivot",
    b: `By September 2025, the numbers justified the thesis — and then some. 1,000 LNG trucks deployed. Revenue at ₹154.42 crore in FY2024, rising from near zero in FY2022. More than 14,000 tonnes of CO₂ avoided. CONCUR Logistics, Inland World Logistics, Aditya Birla fleet operators, and dozens of cement and mining companies running BEM trucks on Indian highways. Nikhil Kamath led the $30M Series A alongside Omnitex Industries, bringing total funding to $50M.\n\nThe electric pivot had already been announced in January 2025, when Blue Energy signed a ₹3,500 crore MoU with the Maharashtra government for a 30,000 EV trucks/year facility. In November 2025, the first battery-swapping electric heavy truck launched on the Mumbai–Pune corridor: unlimited range through battery swapping, highest payload in category, Energy-as-a-Service economics, renewable energy supply chain.\n\nBhuwalka has been asked repeatedly about AMW. His answer is always the same: the lessons from building India's fourth-largest truck manufacturer — the assembly model, the customer relationships, the manufacturing know-how — were never wasted. They were waiting for a problem worth solving again. And this time, the fuel ecosystem is being built alongside the vehicle.`,
  },
]

const PULL_QUOTE = {
  text: "Commercial trucks are just 3% of all vehicles but account for nearly half of all transportation emissions. LNG today is not a compromise — it is a 30% reduction in carbon, commercially viable, right now. Electric and hydrogen come next. That is the strategy.",
  by: "Anirudh Bhuwalka, Founder & MD, Blue Energy Motors (2024)",
}

const LESSON = "A bankruptcy is not a verdict on the founder — it is often a verdict on the timing and the cycle. Bhuwalka built India's fourth-largest truck maker, watched it fail in a downturn, and came back with a cleaner thesis, a better technology bet, and a deeper understanding of the infrastructure dependencies that determine whether a truck company lives or dies."

const INVESTORS = [
  "Nikhil Kamath / NKSquared (Lead, $30M Series A, Sep 2025)",
  "Omnitex Industries (Series A co-lead, Sep 2025)",
  "Essar Group — Anshuman Ruia (Strategic Investor)",
  "Essar Ultra Gas & Greenline (LNG Infrastructure Partners)",
  "FPT Industrial / Iveco Group (Technology Partner & Investor)",
  "Singapore-based Angel Investors (Seed 2022, Follow-on 2023)",
]

const CUSTOMERS = [
  "JK Lakshmi Cement — Founding Enterprise Customer (2022)",
  "CONCUR Logistics — 100-truck order (Dec 2023)",
  "Inland World Logistics — Fleet Deployment (2025)",
  "Aditya Birla Group Fleet Operators",
  "Fortune 500 Cement & Mining Companies",
  "Netradyne — AI Fleet Camera System Integration",
]

const FAQS = [
  { q: "What happened to Asia Motor Works (AMW) and how does it relate to Blue Energy Motors?", a: "Asia Motor Works was Anirudh Bhuwalka's first truck company, founded in 2002 in Bhachau, Gujarat. Using a modular assembly model, AMW grew to India's 4th-largest truck manufacturer within six years — 9,000 vehicles/year, 25% tipper market share. A prolonged sector downturn sent it into bankruptcy by 2020. Before AMW was fully liquidated, Bhuwalka had already begun work on Blue Energy Motors, applying AMW's assembly model and customer relationships to alternative fuel heavy trucks." },
  { q: "Why is the Essar Group's involvement strategically important?", a: "Essar's involvement is structural, not just financial. Bhuwalka is the nephew of the late Shashi Ruia, Essar's co-founder. More critically, Essar's subsidiaries Ultra Gas and Greenline are independently building India's LNG highway refuelling network — the physical infrastructure without which LNG trucks cannot scale commercially. BEM's growth and the LNG fuelling network are being constructed in parallel by aligned parties." },
  { q: "What is Blue Energy Motors' revenue and financial trajectory?", a: "From near-zero revenue in FY2022, Blue Energy Motors scaled to ₹154.42 crore in FY2024. The company plans to triple LNG truck sales to 3,000 units in FY2025–26 and fully unlock its Chakan facility's 10,000 trucks/year capacity. The ₹3,500 crore Maharashtra EV plant investment signals revenue ambition well beyond the current LNG base." },
  { q: "How does the battery-swapping EV truck work?", a: "The BEM battery-swapping EV heavy truck (November 2025) solves charging downtime by allowing drivers to exchange a depleted battery pack for a charged one in minutes — comparable to refuelling time — enabling unlimited effective range. The Energy-as-a-Service pricing removes the high upfront battery cost from fleet operators. Combined with renewable energy supply, this delivers a well-to-wheel zero-emission freight chain." },
]

const RELATED = [
  { name: "Ather Energy", slug: "ather-energy-ev", cat: "Electric Vehicles / IPO", val: "$502M raised" },
  { name: "BioPeak", slug: "biopeak", cat: "Longevity / Precision Health", val: "$6.2M raised" },
  { name: "Aurassure", slug: "aurassure", cat: "Climate Tech / IoT", val: "₹29 Cr raised" },
]

const accent = "#0369a1"
const accentDark = "#075985"
const accentBg = "#f0f9ff"
const accentBorder = "#bae6fd"

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

export default function BlueEnergyMotorsPage() {
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
      <h1 className="sr-only">Blue Energy Motors Founder Story — Anirudh Bhuwalka | India's First LNG Truck Company | Nikhil Kamath Backed | $50M Raised | UpForge</h1>

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" style={{ background:"#EDE9DF", borderBottom:"1px solid #D8D2C4", padding:"8px 24px" }}>
        <ol style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"6px", listStyle:"none" }}>
          {[{ n:"UpForge",h:"/" },{ n:"Startup Registry",h:"/startup" },{ n:"EV Startups India",h:"/ev-startups-india" },{ n:"Blue Energy Motors",h:"/startup/blue-energy-motors" }].map((b,i,arr)=>(
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
          <p className="uf-sans" style={{ fontSize:8, letterSpacing:".44em", color:"#AAA", textTransform:"uppercase", marginBottom:10 }}>UpForge · Startup Registry · Electric & Green Vehicles</p>
          <p className="uf-serif" style={{ fontSize:"clamp(2rem,5.5vw,4.2rem)", fontWeight:900, lineHeight:1, color:"#1A1208" }}>The Founder Chronicle</p>
          <p className="uf-serif" style={{ fontStyle:"italic", marginTop:10, color:"#6B5C40", fontSize:"clamp(12px,1.8vw,15px)" }}>India's independent startup registry — verified, editorial, March 2026</p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginTop:18 }}>
            <div style={{ height:1, width:"clamp(60px,10vw,140px)", background:"#C8C2B4" }}/>
            <span style={{ color:"#C8C2B4", fontSize:13 }}>✦</span>
            <div style={{ height:1, width:"clamp(60px,10vw,140px)", background:"#C8C2B4" }}/>
          </div>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", padding:"8px 24px", gap:16, borderBottom:"1px solid #C8C2B4" }}>
          <span className="uf-sans" style={{ fontSize:8, color:"#AAA", textTransform:"uppercase", letterSpacing:".16em" }}>Edition · Green Commercial Vehicles</span>
          <div style={{ width:1, height:12, background:"#C8C2B4" }}/>
          <span className="uf-sans" style={{ fontSize:9, fontWeight:800, textTransform:"uppercase", letterSpacing:".14em", color:accent }}>LNG & EV Trucks · March 2026</span>
          <div style={{ width:1, height:12, background:"#C8C2B4" }}/>
          <span className="uf-sans" style={{ fontSize:9, color:"#AAA" }}>Chakan, Pune · Maharashtra</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="uf-outer uf-fade-up">
        <div className="uf-main-grid">
          <article className="uf-article">
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <span className="uf-badge">GREEN TRUCKING / COMMERCIAL EV</span>
              <span className="uf-sans" style={{ fontSize:9, color:"#AAA", textTransform:"uppercase", letterSpacing:".14em" }}>March 2026</span>
            </div>

            <h2 className="uf-serif" style={{ fontSize:"clamp(1.75rem,4vw,3.1rem)", fontWeight:900, lineHeight:1.07, color:"#1A1208", marginBottom:18 }}>
              He built India's fourth-largest truck company. Then came bankruptcy.{" "}
              <em style={{ color:accent }}>Now $50M, 1,000 LNG trucks, and India's first EV battery-swapping heavy truck.</em>
            </h2>

            <p className="uf-serif" style={{ fontStyle:"italic", lineHeight:1.75, marginBottom:24, paddingBottom:24, color:"#5A4A30", fontSize:"clamp(14px,1.9vw,17px)", borderBottom:"1px solid #C8C2B4" }}>
              Anirudh Bhuwalka built Asia Motor Works into India's #4 truck maker by the time he was 42. By 2020, it was bankrupt. He came back with Blue Energy Motors — India's first LNG heavy truck — unveiled the product before Nitin Gadkari in September 2022, signed Nikhil Kamath for $30M in 2025, and launched India's first battery-swapping electric heavy truck in November 2025. India's most consequential second act in commercial vehicles.
            </p>

            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"6px 8px", marginBottom:32 }}>
              {["By UpForge Editorial","Chakan, Pune","Est. 2021","India's Green Truck Pioneer"].map((t,i,a)=>(
                <span key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span className="uf-sans" style={{ fontSize:9, color:"#AAA", textTransform:"uppercase", letterSpacing:".14em" }}>{t}</span>
                  {i<a.length-1 && <span style={{ color:"#C8C2B4", fontSize:10 }}>·</span>}
                </span>
              ))}
            </div>

            {/* Mobile hero */}
            <div className="uf-mobile-hero">
              <img src="/Upforge-blue-energy-motors.webp" alt="Anirudh Bhuwalka, Founder & MD of Blue Energy Motors"
                style={{ width:"100%", height:"min(300px,60vw)", objectFit:"cover", objectPosition:"top" }} loading="eager"/>
              <div style={{ padding:"12px 16px", background:"#1A1208" }}>
                <p className="uf-serif" style={{ color:"white", fontWeight:700, fontSize:13 }}>Anirudh Bhuwalka</p>
                <p className="uf-sans" style={{ color:"rgba(255,255,255,.4)", fontSize:9, textTransform:"uppercase", letterSpacing:".14em", marginTop:3 }}>Founder & MD · Blue Energy Motors</p>
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
                <img src="/Upforge-blue-energy-motors.webp" alt="Anirudh Bhuwalka, Founder & MD of Blue Energy Motors"
                  style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }} loading="eager"/>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"14px 16px", background:"linear-gradient(to top,rgba(12,7,2,.96) 60%,transparent)" }}>
                  <p className="uf-serif" style={{ color:"white", fontWeight:700, fontSize:14 }}>Anirudh Bhuwalka</p>
                  <p className="uf-sans" style={{ color:"rgba(255,255,255,.4)", fontSize:9, textTransform:"uppercase", letterSpacing:".14em", marginTop:2 }}>Founder & MD · Blue Energy Motors</p>
                </div>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <a href="https://blueenergymotors.com/" target="_blank" rel="noopener noreferrer" className="uf-ext-link" aria-label="Visit Blue Energy Motors official website">
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>{globeSvg(accent)}<span className="uf-sans" style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:accent }}>blueenergymotors.com</span></div>
                  <ArrowUpRight style={{ width:14, height:14, color:accent }}/>
                </a>
                <a href="https://www.linkedin.com/company/blueenergymotor/" target="_blank" rel="noopener noreferrer" className="uf-li-link" aria-label="View Blue Energy Motors on LinkedIn">
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>{liSvg}<span className="uf-sans" style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em", color:"#0077b5" }}>LinkedIn — Blue Energy Motors</span></div>
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
                  <p className="uf-sans" style={{ fontSize:8, fontWeight:800, textTransform:"uppercase", letterSpacing:".24em", color:"#1A1208" }}>Key Investors & Partners</p>
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

              <div style={{ border:"1px solid #D8D2C4" }}>
                <div style={{ padding:"8px 16px", background:"#F9F7F2", borderBottom:"1px solid #D8D2C4" }}>
                  <p className="uf-sans" style={{ fontSize:8, fontWeight:800, textTransform:"uppercase", letterSpacing:".24em", color:"#1A1208" }}>Enterprise Customers</p>
                </div>
                <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:7 }}>
                  {CUSTOMERS.map((c,i)=>(
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span className="uf-dot"/>
                      <span className="uf-sans" style={{ fontSize:11, color:"#2C2010" }}>{c}</span>
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
          <p className="uf-sans" style={{ fontSize:9, letterSpacing:".3em", textTransform:"uppercase", color:"#AAA", marginBottom:16 }}>Explore More EV & Green Transport Startups on UpForge</p>
          <div className="uf-seo-grid">
            {[{ l:"EV Startups India 2026",h:"/ev-startups-india" },{ l:"Indian Unicorns Full List",h:"/indian-unicorns" },{ l:"LNG Trucks India Guide",h:"/ev-startups-india/lng-trucks-india" },{ l:"Clean Mobility India",h:"/clean-mobility-startups-india" },{ l:"Nikhil Kamath Portfolio",h:"/nksquared-portfolio" },{ l:"Maharashtra EV Manufacturing",h:"/maharashtra-ev-startups" },{ l:"Startup Registry India",h:"/startup" },{ l:"Submit Your Startup",h:"/submit" }].map(lnk=>(
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
              <p className="uf-serif" style={{ fontWeight:700, color:"#1A1208", marginBottom:8, fontSize:"1.2rem" }}>Building India's next frontier company? Get verified on UpForge.</p>
              <p className="uf-sans" style={{ fontSize:12, color:"#6B5C40" }}>Free startup profiles. Independent verification. Indexed by Google.</p>
            </div>
            <Link href="/submit" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 24px", background:"#1A1208", color:"white" }} className="uf-sans" aria-label="List your startup">
              <span style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:".12em" }}>List Your Startup — Free</span>
              <ArrowRight style={{ width:14, height:14 }}/>
            </Link>
          </div>
          <p className="uf-sans" style={{ fontSize:9, lineHeight:1.7, marginTop:16, color:"#BBB0A0" }}>
            * Data sourced from Autocar Professional, Business Standard, The Ken, Tracxn, and Blue Energy Motors press releases as of March 2026. UpForge is an independent registry — no paid placements, no sponsored rankings.
          </p>
          <nav aria-label="Footer navigation" style={{ marginTop:12 }}>
            <ul style={{ display:"flex", flexWrap:"wrap", gap:"8px 16px", listStyle:"none" }}>
              {[{ l:"EV Startups India",h:"/ev-startups-india" },{ l:"Startup Registry",h:"/startup" },{ l:"Indian Unicorns",h:"/indian-unicorns" },{ l:"Ather Energy Profile",h:"/startup/ather-energy-ev" },{ l:"Aurassure Profile",h:"/startup/aurassure" },{ l:"Submit Startup",h:"/submit" }].map(lnk=>(
                <li key={lnk.h}><Link href={lnk.h} className="uf-sans" style={{ fontSize:9, color:"#AAA", textTransform:"uppercase", letterSpacing:".14em" }}>{lnk.l}</Link></li>
              ))}
            </ul>
          </nav>
        </footer>
      </main>
    </div>
  )
}
