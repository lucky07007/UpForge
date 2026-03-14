"use client"

// app/startup/blue-energy-motors/page.tsx
// UpForge — Blue Energy Motors · Anirudh Bhuwalka Founder Chronicle
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
      "@id": "https://upforge.in/startup/blue-energy-motors#article",
      "headline": "Blue Energy Motors — How Anirudh Bhuwalka Built India's First LNG Truck Company After a Bankruptcy, Backed by Nikhil Kamath and the Essar Group",
      "description": "Blue Energy Motors founder story — Babson College MBA Anirudh Bhuwalka, nephew of Essar Group co-founder Shashi Ruia, built Asia Motor Works to India's #4 truck maker before bankruptcy in 2020. He returned in 2021 with Blue Energy Motors — India's first LNG-powered heavy truck manufacturer — launched India's first LNG truck in September 2022, raised $50M from Nikhil Kamath, Essar, Omnitex, and FPT/Iveco, has deployed 1,000+ LNG trucks on Indian roads, crossed ₹154 crore revenue in FY2024, signed a ₹3,500 crore MoU with Maharashtra for 30,000 EV trucks, and launched India's first battery-swapping electric heavy truck in November 2025. The most consequential second act in Indian commercial vehicles.",
      "url": "https://upforge.in/startup/blue-energy-motors",
      "datePublished": "2026-03-14T00:00:00+05:30",
      "dateModified": "2026-03-14T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.in/Upforge-blue-energy-motors.webp",
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
      "about": {
        "@type": "Person",
        "name": "Anirudh Bhuwalka",
        "jobTitle": "Founder & Managing Director",
        "worksFor": { "@type": "Organization", "name": "Blue Energy Motors" },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "Babson College, Massachusetts"
        },
        "description": "Anirudh Bhuwalka is the Founder and Managing Director of Blue Energy Motors. He holds a Bachelor of Science in Entrepreneurship from Babson College (1993–1996), ranked the world's number one business school for entrepreneurship. He is the nephew of the late Shashi Ruia, co-founder of the Essar Group. He founded Asia Motor Works (AMW) in 2002, grew it to India's fourth-largest truck manufacturer with 25% market share in tippers within six years before bankruptcy in 2020. He launched Blue Energy Motors in 2021 with a technology-agnostic platform for LNG, electric, and hydrogen trucks. India's first LNG truck was unveiled in September 2022 with Union Minister Nitin Gadkari at Chakan, Pune.",
        "sameAs": ["https://in.linkedin.com/in/anirudh-bhuwalka-33790615"]
      },
      "mentions": {
        "@type": "Organization",
        "name": "Blue Energy Motors",
        "url": "https://blueenergymotors.com",
        "legalName": "Blue Energy Commercial Vehicles Pvt. Ltd.",
        "foundingDate": "2021",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "Pune",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "description": "Blue Energy Motors is India's largest manufacturer of LNG-powered heavy trucks and the country's emerging leader in electric commercial vehicles. Founded in 2021 and headquartered in Chakan, Pune (manufacturing) and Mumbai, it launched India's first LNG heavy truck in September 2022, has deployed 1,000+ LNG trucks to Fortune 500 customers including JK Lakshmi Cement, Aditya Birla, and Inland World Logistics, crossed ₹154 crore revenue in FY2024, and launched India's first battery-swapping electric heavy truck on the Mumbai–Pune corridor in November 2025. Its manufacturing facility in Chakan has an installed capacity of 10,000 trucks/year, powered by FPT Industrial (Iveco Group) engines. Blue Energy has raised $50M from Nikhil Kamath, Essar Group, Omnitex Industries, and FPT Industrial, and signed a ₹3,500 crore MoU with the Government of Maharashtra to manufacture 30,000 EV trucks annually.",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 200, "maxValue": 400 },
        "sameAs": [
          "https://blueenergymotors.com",
          "https://www.linkedin.com/company/blueenergymotor/"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "EV Startups India", "item": "https://upforge.in/ev-startups-india" },
        { "@type": "ListItem", "position": 4, "name": "Blue Energy Motors", "item": "https://upforge.in/startup/blue-energy-motors" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who founded Blue Energy Motors and what is the founder's background?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Blue Energy Motors was founded in 2021 by Anirudh Bhuwalka, who serves as Founder and Managing Director. Bhuwalka holds a Bachelor of Science in Entrepreneurship from Babson College, Massachusetts (1993–1996) — ranked the world's top business school for entrepreneurship. He is the nephew of the late Shashi Ruia, co-founder of the Essar Group. Before Blue Energy, Bhuwalka founded Asia Motor Works (AMW) in 2002 in Bhachau, Gujarat, growing it to India's fourth-largest truck manufacturer within six years, with a 25% market share in tipper trucks — ahead of Mahindra Navistar, Force-MAN, and Daimler. AMW filed for bankruptcy in 2020 during a prolonged commercial vehicles downturn. Bhuwalka returned with Blue Energy Motors in 2021 and unveiled India's first LNG truck at Chakan, Pune in September 2022."
          }
        },
        {
          "@type": "Question",
          "name": "How much has Blue Energy Motors raised and who are its investors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Blue Energy Motors has raised $50 million in total across three funding rounds. The first round ($10M) closed in September 2022. The most recent and largest round ($30M Series A, September 18, 2025) was led by Nikhil Kamath (Zerodha co-founder) and Omnitex Industries. Strategic investors include Essar Group (with subsidiaries Ultra Gas and Greenline building India's LNG refuelling ecosystem), and FPT Industrial / Iveco Group (technology partner and investor). Anshuman Ruia, Director at Essar, reaffirmed Essar's ongoing commitment to Blue Energy at the Series A announcement. The company had earlier raised $10M in a 2023 round from Singapore-based investors."
          }
        },
        {
          "@type": "Question",
          "name": "What is the BE 5528 LNG truck and how does it compare to diesel trucks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The BE 5528+ is Blue Energy Motors' flagship LNG-powered heavy tractor unit, launched as India's first in November 2022. It is powered by FPT Industrial's Cursor 13 NGL engine — one of the most powerful natural gas engines commercially available, compatible with LNG, CNG, and biomethane. It delivers 30% lower carbon emissions than diesel, has running costs 10–30% cheaper than diesel (due to LNG's lower price), and matches diesel torque output for long-haul applications. The truck has traversed over 1 crore (10 million) kilometres on Indian roads as of March 2024, reducing over 3,000 tonnes of CO₂. By March 2025, the cumulative CO₂ reduction exceeded 14,000 tonnes — equivalent to the benefit of over 5.5 lakh mature trees."
          }
        },
        {
          "@type": "Question",
          "name": "What is Blue Energy Motors' electric truck and battery-swapping model?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Blue Energy Motors launched India's first battery-swapping electric heavy-duty truck in November 2025 on the Mumbai–Pune corridor — India's busiest freight route. The EV truck uses a proprietary battery-swapping system that eliminates charging downtime entirely, offers unlimited range (batteries swapped rather than charged), the highest payload in its category, and an Energy-as-a-Service (EaaS) model that reduces upfront capital cost for fleet operators and powers trucks on renewable energy for a well-to-wheel green supply chain. This follows the January 2025 MoU with the Government of Maharashtra to invest ₹3,500 crore in a 30,000 EV truck/year manufacturing facility in Maharashtra, including battery-pack production, motor manufacturing, and R&D units."
          }
        },
        {
          "@type": "Question",
          "name": "Who are Blue Energy Motors' enterprise customers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Blue Energy Motors has sold approximately 1,000 LNG trucks to Fortune 500 companies and large Indian conglomerates. Documented customers include JK Lakshmi Cement (first enterprise partner, 2022), CONCUR Logistics (100-truck order, December 2023), Inland World Logistics, and fleet operators across cement, steel, mining, FMCG, and logistics sectors. The company also has Netradyne's Driver·i1 AI Fleet Camera System integrated into its LNG truck fleet for driver behaviour monitoring. Enterprise customers include firms from the Aditya Birla Group and other major conglomerates with long-haul freight requirements."
          }
        },
        {
          "@type": "Question",
          "name": "What is Blue Energy Motors' LNG-to-EV strategy and why did Bhuwalka choose LNG first?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Blue Energy Motors operates a deliberate LNG-today, EV-tomorrow strategy on a technology-agnostic modular platform designed to accommodate LNG, electric, and hydrogen drivetrains. Bhuwalka chose LNG as the entry fuel because it offered immediate, commercially viable emissions reduction (30% lower CO₂ than diesel) and a lower total cost of ownership with existing internal combustion engine manufacturing infrastructure — making decarbonisation accessible to fleet operators now, not in a hypothetical EV-infrastructure-complete future. The Essar Group's Ultra Gas and Greenline subsidiaries are independently building India's LNG refuelling network along national highways. India's Ministry of Petroleum has announced plans for 1,000 LNG stations along major highways. The electric truck launch in November 2025 marks the second phase of the strategy."
          }
        }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Total Raised", v: "$50M" },
  { l: "Founded", v: "2021" },
  { l: "HQ", v: "Pune / Mumbai" },
  { l: "LNG Trucks", v: "1,000+" },
  { l: "Revenue FY24", v: "₹154 Cr" },
  { l: "Plant Capacity", v: "10,000/yr" },
]

const TIMELINE = [
  {
    year: "2002–2020",
    event: "Anirudh Bhuwalka — Babson College MBA, nephew of Essar Group co-founder Shashi Ruia — founds Asia Motor Works (AMW) in Bhachau, Gujarat. Within six years of production, AMW reaches India's #4 position in trucks, selling 9,000 vehicles/year and achieving 25% market share in tipper trucks. Only Tata Motors ranks above AMW in tippers. AMW files for bankruptcy and is liquidated in 2020 during the sector downturn.",
  },
  {
    year: "2021",
    event: "Before AMW is formally liquidated, Bhuwalka begins work on Blue Energy Motors — applying hard lessons from AMW but with a critical difference: technology-agnostic alternative fuel trucks (LNG, EV, hydrogen) targeting India's commercial freight decarbonisation imperative. The company is incorporated as Blue Energy Commercial Vehicles Pvt. Ltd. Manufacturing facility site secured at Chakan, Pune — adjacent to the Mahindra vehicle plant.",
  },
  {
    year: "Sep 2022",
    event: "Union Minister Nitin Gadkari inaugurates Blue Energy Motors' Chakan plant. India's first LNG-powered heavy truck — the BE 5528+ — is unveiled. Powered by FPT Industrial's Cursor 13 NGL engine (Iveco Group), the truck delivers 30% lower carbon emissions than diesel and 10–30% lower running costs. JK Lakshmi Cement becomes the first enterprise customer. First funding round: $10M from Singapore-based investors.",
  },
  {
    year: "2023",
    event: "CONCUR Logistics places an order for 100 LNG-powered 55-tonne tractor units. Blue Energy crosses 100 trucks deployed. $10M second round raised for manufacturing capacity. Netradyne integrates its Driver·i1 AI Fleet Camera System into BEM's fleet. Essar Group formalises strategic investment — subsidiaries Ultra Gas and Greenline begin building India's LNG highway refuelling infrastructure to support BEM's customers.",
  },
  {
    year: "Mar 2024",
    event: "500+ LNG trucks deployed across cement, steel, mining, and logistics sectors. Fleet has cumulatively travelled over 1 crore kilometres — reducing more than 3,000 tonnes of CO₂. Revenue grows to ₹154.42 crore in FY2024 from near-zero in FY2022. CONCUR, Inland World Logistics, Aditya Birla Group fleet operators among active customers. BEM announces plans to raise $100 million by January 2025.",
  },
  {
    year: "Jan 2025",
    event: "Blue Energy Motors signs MoU with the Government of Maharashtra to establish a ₹3,500 crore manufacturing facility for 30,000 electric trucks annually — to include battery-pack production, motor manufacturing, and R&D. Manufacturing to begin in 2025–26. Company announces plans to triple LNG sales to 3,000 trucks in FY2025–26.",
  },
  {
    year: "Sep 2025",
    event: "$30M Series A raised — led by Nikhil Kamath and Omnitex Industries. Total funding reaches $50M. Essar's Anshuman Ruia reaffirms ongoing commitment. LNG trucks deployed: 1,000+. CO₂ saved vs. diesel: 14,000+ tonnes (annualised). BEM is described as India's largest LNG truck manufacturer. Plans to 'fully unlock' 10,000 trucks/year Chakan capacity.",
  },
  {
    year: "Nov 2025",
    event: "Blue Energy Motors launches India's first battery-swapping electric heavy-duty truck on the Mumbai–Pune corridor. The EV offers unlimited range via battery swapping, highest payload in category, and an Energy-as-a-Service model — renewable energy powering the well-to-wheel supply chain. CMO Prakhar Saxena: 'This is the beginning of the EV revolution in India for heavy-duty trucks.'",
  },
]

const COLS = [
  {
    h: "The First Act: India's #4 Truck Maker — and Bankruptcy",
    b: `The story of Blue Energy Motors cannot be told without the story that preceded it. Anirudh Bhuwalka was 36 years old, fresh from Babson College — the Massachusetts business school ranked world number one for entrepreneurship — and armed with the most valuable uncle in Indian industry: Shashi Ruia, co-founder of the Essar Group, the ₹70,000 crore conglomerate that had built steel, oil, ports, and telecoms out of nothing.\n\nIn 2002, Bhuwalka founded Asia Motor Works in Bhachau, Gujarat. The model was borrowed from global assembly practice: source engines from Cummins, gearboxes from ZF, axles from Eaton, cabins fully fitted from China. No manufacturing from scratch — just precision assembly, aggressive pricing, and a tipper truck with air-conditioning and a music system in an era when drivers fought for the chance to sit in one. Within six years of production, AMW had seized India's fourth position in trucks overall and second position in tippers, behind only Tata Motors. BusinessToday ran the headline. Tata Motors, reportedly, bought a few AMW trucks to take apart and study.\n\nBy 2020 it was over. A prolonged commercial vehicles sector downturn, overleveraged balance sheet, and the brutal mathematics of a capital-intensive industry in a demand collapse sent AMW into bankruptcy. The company was liquidated. Bhuwalka had built something real, seen it fail, and was left with the question every entrepreneur dreads: what next?`,
  },
  {
    h: "The Second Act: LNG, Nitin Gadkari and India's First Green Truck",
    b: `The answer Bhuwalka arrived at was both bolder and more specific than AMW had been. Commercial trucks account for just 3% of India's vehicle fleet but contribute 45% of its transportation sector emissions. With India's freight volumes set to double by 2035, the decarbonisation of long-haul trucking was not an environmental choice — it was an economic and regulatory inevitability. The only question was which fuel technology would get there first.\n\nBhuwalka bet on LNG as the immediate answer, with electric and hydrogen to follow on a technology-agnostic modular platform. In September 2022, Union Minister Nitin Gadkari inaugurated Blue Energy Motors' Chakan plant — adjacent to Mahindra's facility, 30 kilometres from Pune. India's first LNG-powered heavy truck, the BE 5528+, rolled out. Powered by FPT Industrial's Cursor 13 NGL engine — the global powertrain of the Iveco Group — the truck matched diesel torque, offered 30% lower carbon emissions, and ran 10–30% cheaper per kilometre. JK Lakshmi Cement took the first fleet.\n\nThe Essar connection proved structural rather than just financial. Essar's subsidiaries Ultra Gas and Greenline began independently building India's LNG highway refuelling network — the critical infrastructure without which LNG trucks cannot operate. Bhuwalka did not just build a truck. He was building into an ecosystem that his family's conglomerate was simultaneously constructing around him. The first $10M came from Singapore-based investors. The strategic picture was already larger than the funding round suggested.`,
  },
  {
    h: "₹154 Crore Revenue, Nikhil Kamath's $30M and the Electric Pivot",
    b: `By September 2025, the numbers justified the thesis — and then some. 1,000 LNG trucks deployed. Revenue at ₹154.42 crore in FY2024, rising from near zero in FY2022. More than 14,000 tonnes of CO₂ avoided. CONCUR Logistics, Inland World Logistics, Aditya Birla fleet operators, and dozens of cement and mining companies running BEM trucks on Indian highways. Nikhil Kamath — who had invested in BioPeak and Bolna — led the $30M Series A alongside Omnitex Industries, bringing total funding to $50M.\n\nThe electric pivot had already been announced in January 2025, when Blue Energy signed a ₹3,500 crore MoU with the Maharashtra government for a 30,000 EV trucks/year facility — including battery-pack and motor manufacturing. In November 2025, the first battery-swapping electric heavy truck launched on the Mumbai–Pune corridor: unlimited range through battery swapping, highest payload in category, Energy-as-a-Service economics, renewable energy supply chain. It was a product the market had not seen before in India's heavy freight segment.\n\nBhuwalka has been asked repeatedly about AMW. His answer is always the same: the lessons from building India's fourth-largest truck manufacturer — the assembly model, the customer relationships, the manufacturing know-how — were never wasted. They were waiting for a problem worth solving again. Decarbonising the Indian truck fleet is that problem. And this time, the fuel ecosystem is being built alongside the vehicle, the investors include the men who understand scale, and the platform is designed for every technology that comes after.`,
  },
]

const PULL_QUOTE = {
  text: "The numbers are staggering. Commercial trucks are just 3% of all vehicles but account for nearly half of all transportation emissions. With India's economy poised for further growth, this pollution is set to double. LNG today is not a compromise — it is a 30% reduction in carbon, commercially viable, right now. Electric and hydrogen come next. That is the strategy.",
  by: "Anirudh Bhuwalka, Founder & MD, Blue Energy Motors (2024)",
}

const LESSON =
  "A bankruptcy is not a verdict on the founder — it is often a verdict on the timing and the cycle. Bhuwalka built India's fourth-largest truck maker, watched it fail in a downturn, and came back with a cleaner thesis, a better technology bet, and a deeper understanding of the infrastructure dependencies that determine whether a truck company lives or dies. The second attempt is always better informed. The question is whether the founder has the conviction to make it."

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
  "Multiple Fortune 500 Cement & Mining Companies",
  "Netradyne — AI Fleet Camera System Integration",
]

const FAQS = [
  {
    q: "What happened to Asia Motor Works (AMW) and how does it relate to Blue Energy Motors?",
    a: "Asia Motor Works was Anirudh Bhuwalka's first truck company, founded in 2002 in Bhachau, Gujarat. Using a modular assembly model sourcing best-in-class global components, AMW grew to India's fourth-largest truck manufacturer within six years — 9,000 vehicles/year, 25% tipper market share, overtaking Mahindra Navistar and Daimler-Benz. A prolonged sector downturn, overleverage, and demand collapse sent it into bankruptcy by 2020. Before AMW was fully liquidated, Bhuwalka had already begun work on Blue Energy Motors — applying AMW's assembly model, component-sourcing expertise, and customer relationships to a new category: alternative fuel heavy trucks for India's decarbonisation.",
  },
  {
    q: "Why is the Essar Group's involvement in Blue Energy Motors strategically important?",
    a: "Essar's involvement is structural, not just financial. Bhuwalka is the nephew of the late Shashi Ruia, Essar's co-founder, and Essar's Anshuman Ruia sits as a strategic investor in BEM. More critically, Essar's subsidiaries Ultra Gas and Greenline are independently building India's LNG highway refuelling network — the physical infrastructure without which LNG trucks cannot scale commercially. This means BEM's growth and the LNG fuelling network are being constructed in parallel by aligned parties, solving the chicken-and-egg problem that has hampered every alternative fuel vehicle market in India.",
  },
  {
    q: "What is Blue Energy Motors' revenue and financial trajectory?",
    a: "From near-zero revenue in FY2022 (first year of production), Blue Energy Motors scaled to ₹154.42 crore in FY2024 — a trajectory reflecting the rapid adoption of LNG trucks across cement, steel, mining, and logistics sectors. The company plans to triple LNG truck sales to 3,000 units in FY2025–26 using the proceeds of its $30M Series A, and to fully unlock its Chakan facility's 10,000 trucks/year capacity. The ₹3,500 crore Maharashtra EV plant investment signals a revenue ambition that extends well beyond the current LNG base.",
  },
  {
    q: "How does Blue Energy Motors' battery-swapping EV truck work and why is it significant?",
    a: "The BEM battery-swapping EV heavy truck, launched November 2025 on the Mumbai–Pune corridor, solves the single biggest barrier to EV adoption in long-haul freight: charging downtime and range anxiety. Battery swapping allows a driver to exchange a depleted battery pack for a fully charged one in minutes — comparable to refuelling time — enabling unlimited effective range. The Energy-as-a-Service pricing model removes the high upfront battery cost from the fleet operator. Combined with renewable energy supply, the model delivers a well-to-wheel zero-emission freight chain. This is the first battery-swapping heavy truck in India's commercial vehicle segment.",
  },
]

const RELATED = [
  { name: "Ather Energy", slug: "ather-energy-ev", cat: "Electric Vehicles / IPO", val: "$502M raised" },
  { name: "BioPeak", slug: "biopeak", cat: "Longevity / Precision Health", val: "$6.2M raised" },
  { name: "Aurassure", slug: "aurassure", cat: "Climate Tech / IoT", val: "₹29 Cr raised" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function BlueEnergyMotorsPage() {
  const accent = "#0369a1"
  const accentDark = "#075985"
  const accentBg = "#f0f9ff"
  const accentBorder = "#bae6fd"

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
        Blue Energy Motors Founder Story — Anirudh Bhuwalka | India's First LNG Truck Company | Nikhil Kamath Backed | $50M Raised | UpForge
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
            { n: "EV Startups India", h: "/ev-startups-india" },
            { n: "Blue Energy Motors", h: "/startup/blue-energy-motors" },
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
            UpForge · Startup Registry · Electric &amp; Green Vehicles
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
            Edition · Green Commercial Vehicles
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span
            className="text-[9px] font-black uppercase tracking-wider"
            style={{ color: accent }}
          >
            LNG &amp; EV Trucks · March 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">Chakan, Pune · Maharashtra</span>
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
                GREEN TRUCKING / COMMERCIAL EV
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">March 2026</span>
            </div>

            {/* Headline */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              He built India's fourth-largest truck company. Then came bankruptcy.{" "}
              <em style={{ color: accent }}>
                Now $50M, 1,000 LNG trucks, and India's first EV battery-swapping heavy truck.
              </em>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              Anirudh Bhuwalka built Asia Motor Works into India's #4 truck maker by the time he
              was 42. By 2020, it was bankrupt. He came back with Blue Energy Motors — India's
              first LNG heavy truck — unveiled the product before Nitin Gadkari in September 2022,
              signed Nikhil Kamath for $30M in 2025, and launched India's first battery-swapping
              electric heavy truck in November 2025. India's most consequential second act in
              commercial vehicles.
            </p>

            {/* Byline */}
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}
            >
              {[
                "By UpForge Editorial",
                "Chakan, Pune",
                "Est. 2021",
                "India's Green Truck Pioneer",
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
                src="/Upforge-blue-energy-motors.webp"
                alt="Anirudh Bhuwalka, Founder & MD of Blue Energy Motors — UpForge Founder Chronicle"
                className="w-full object-cover object-top"
                style={{ height: "min(300px,60vw)", display: "block" }}
                loading="eager"
              />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>
                  Anirudh Bhuwalka
                </p>
                <p
                  className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  Founder & MD · Blue Energy Motors
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
                  src="/Upforge-blue-energy-motors.webp"
                  alt="Anirudh Bhuwalka, Founder & MD of Blue Energy Motors — UpForge Founder Chronicle"
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
                    Anirudh Bhuwalka
                  </p>
                  <p
                    className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Founder & MD · Blue Energy Motors
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://blueenergymotors.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: `1.5px solid ${accent}`, textDecoration: "none" }}
                  aria-label="Visit Blue Energy Motors official website"
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
                      blueenergymotors.com
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/blueenergymotor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View Blue Energy Motors on LinkedIn"
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
                      LinkedIn — Blue Energy Motors
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
                    Key Investors & Partners
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

              {/* Enterprise Customers */}
              <div style={{ border: "1px solid #D8D2C4" }}>
                <div
                  className="px-4 py-2"
                  style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}
                >
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Enterprise Customers
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {CUSTOMERS.map((c, i) => (
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
                      {c}
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
            Explore More EV & Green Transport Startups on UpForge
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "EV Startups India 2026", h: "/ev-startups-india" },
              { l: "Indian Unicorns Full List", h: "/indian-unicorns" },
              { l: "LNG Trucks India Guide", h: "/ev-startups-india/lng-trucks-india" },
              { l: "Clean Mobility India Startups", h: "/clean-mobility-startups-india" },
              { l: "Nikhil Kamath Portfolio Companies", h: "/nksquared-portfolio" },
              { l: "Maharashtra EV Manufacturing", h: "/maharashtra-ev-startups" },
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
                Building India's next frontier company? Get verified on UpForge.
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
            * Data sourced from Autocar Professional, Business Standard, The Ken, Motor India,
            PrivateCircle, Tracxn, Essar Group press releases, BusinessToday, CNBC-TV18, News18,
            and Blue Energy Motors press releases as of March 2026. UpForge is an independent
            registry — no paid placements, no sponsored rankings. Revenue, funding, and deployment
            figures reflect latest available public data including company announcements.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "EV Startups India", h: "/ev-startups-india" },
                { l: "Startup Registry", h: "/startup" },
                { l: "Indian Unicorns", h: "/indian-unicorns" },
                { l: "Ather Energy Profile", h: "/startup/ather-energy-ev" },
                { l: "BioPeak Profile", h: "/startup/biopeak" },
                { l: "Aurassure Profile", h: "/startup/aurassure" },
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
