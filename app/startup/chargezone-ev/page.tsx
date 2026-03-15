"use client"

// app/startup/chargezone-ev/page.tsx
// UpForge — ChargeZone · Kartikey Hariyani, Kinnari Hariyani & Devbrat Hariyani Founder Chronicle
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
      "@id": "https://upforge.in/startup/chargezone-ev#article",
      "headline": "ChargeZone — How Kartikey Hariyani Built India's Largest EV Charging Network From Vadodara, Backed by Macquarie Capital and British International Investment",
      "description": "ChargeZone founder story — L.D. College of Engineering graduate and ex-L&T International Business Manager Kartikey Hariyani co-founded ChargeZone (TecSo Charge Zone Pvt. Ltd.) in 2018 in Vadodara with siblings Kinnari Hariyani and Devbrat Hariyani. $106M raised from Macquarie Capital, British International Investment, BlueOrchard Finance, Venture Catalysts, and 207 investors. 13,500+ EV charging stations. 36,000km of electrified highways. ChargeCloud proprietary CMS. Profitable at balance sheet level since CY2022. OEM partnerships with Audi, Hyundai, Tata, Mahindra, Ashok Leyland, Volvo-Eicher. ₹400 crore invested in infrastructure. $360M capex plan. Target: 1 million charging points by 2030. India's most consequential EV infrastructure founder story.",
      "url": "https://upforge.in/startup/chargezone-ev",
      "datePublished": "2026-03-14T00:00:00+05:30",
      "dateModified": "2026-03-14T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.in/Upforge-chargezone-ev.webp",
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
          "name": "Kartikey Hariyani",
          "jobTitle": "Co-Founder & CEO",
          "worksFor": { "@type": "Organization", "name": "ChargeZone" },
          "alumniOf": [
            { "@type": "CollegeOrUniversity", "name": "L.D. College of Engineering, Gujarat University" },
            { "@type": "CollegeOrUniversity", "name": "Stanford University Graduate School of Business" }
          ],
          "description": "Kartikey Hariyani is Co-Founder and CEO of ChargeZone. He holds a B.E. in Electrical Engineering from L.D. College of Engineering (Gujarat University) and completed the Stanford University Graduate School of Business executive programme (2022–23). He carries a TÜV SÜD ISO 9001:2010 certification. He was a Sales Specialist at Larsen & Toubro Limited (1998–2004) and International Business Manager at L&T, spending time in Japan (BMW AG, Stanley Electric Japan) and Germany before founding TecSo Projects Limited — a project engineering and technology company. He founded ChargeZone in 2018 as a vertically integrated EV charging infrastructure and technology platform.",
          "sameAs": ["https://in.linkedin.com/in/kartikeyhariyani/"]
        },
        {
          "@type": "Person",
          "name": "Kinnari Hariyani",
          "jobTitle": "Co-Founder & Director",
          "worksFor": { "@type": "Organization", "name": "ChargeZone" },
          "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "SNDT Women's University, Mumbai"
          },
          "description": "Kinnari Hariyani is Co-Founder and Director of ChargeZone. She attended SNDT Women's University, Mumbai, and is an active angel investor with stakes in 3 companies. She oversees organisational culture, leadership development, and child development initiatives alongside her directorial responsibilities at ChargeZone.",
          "sameAs": ["https://in.linkedin.com/in/kinnari-hariyani-12873719/"]
        },
        {
          "@type": "Person",
          "name": "Devbrat Hariyani",
          "jobTitle": "Co-Founder",
          "worksFor": { "@type": "Organization", "name": "ChargeZone" }
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "ChargeZone",
        "url": "https://www.chargezone.co.in",
        "legalName": "TecSo Charge Zone Private Limited",
        "foundingDate": "2018",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "Vadodara",
          "addressRegion": "Gujarat",
          "addressCountry": "IN"
        },
        "description": "ChargeZone (TecSo Charge Zone Pvt. Ltd.) is India's largest EV charging network, headquartered at the Notus IT Park, Sarabhai Campus, Subhanpura, Vadodara, Gujarat. Founded in 2018, it operates 13,500+ EV charging stations across India through OCPI-based roaming partnerships and direct deployment, covering 36,000km of highways. Its proprietary ChargeCloud CMS enables unmanned, remote-monitored operations. Charging speeds range from 360kW to 1.2MW. OEM partnerships include Audi, Hyundai, Kia, MG Motors, Tata Motors, Mahindra, Ashok Leyland, Switch Mobility, Volvo-Eicher. 250,000+ EV users. 10 GWh monthly energy sales (April 2025). $106M raised from Macquarie Capital, British International Investment, BlueOrchard Finance, Venture Catalysts, and 207 investors (52 institutional + 155 angels). Profitable at balance sheet level since CY2022. $360M capex plan. Target: 1 million charging points by 2030.",
        "sameAs": [
          "https://www.chargezone.co.in",
          "https://www.linkedin.com/company/chargezone/"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "EV Startups India", "item": "https://upforge.in/ev-startups-india" },
        { "@type": "ListItem", "position": 4, "name": "ChargeZone", "item": "https://upforge.in/startup/chargezone-ev" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who founded ChargeZone and what is the founder's background?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ChargeZone was founded in 2018 in Vadodara, Gujarat by siblings Kartikey Hariyani (CEO), Kinnari Hariyani (Director), and Devbrat Hariyani. Kartikey holds a B.E. in Electrical Engineering from L.D. College of Engineering (Gujarat University), a TÜV SÜD ISO 9001 certification, and completed the Stanford University Graduate School of Business executive programme (2022–23). He spent six years at Larsen & Toubro Limited as a Sales Specialist and International Business Manager — working with BMW AG and Stanley Electric Japan in Germany and Japan — before founding TecSo Projects Limited, a project engineering company. The industrial and international engineering experience directly informed ChargeZone's technology-first, infrastructure-quality approach."
          }
        },
        {
          "@type": "Question",
          "name": "How much has ChargeZone raised and who are its investors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ChargeZone has raised $106 million across 11 funding rounds, with 207 investors — 52 institutional and 155 angels. Key rounds include: Angel round (Sep 2019, $70.2K); Venture Catalysts-led rounds (2020–2022, ~$13M); $54M Series A1 led by BlueOrchard Finance (March 2023, mix of equity and ₹66 crore debt); Macquarie Capital strategic minority stake acquisition (December 2023, undisclosed); $19M Series A from British International Investment / BII (April 30, 2024); and ₹300 crore debt from nationalised banks including SBI. Total ₹400 crore+ invested in infrastructure. In addition to equity/debt, ChargeZone has raised ₹300 crore in debt from SBI and other nationalised banks."
          }
        },
        {
          "@type": "Question",
          "name": "What is ChargeCloud and how does ChargeZone's technology work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ChargeCloud is ChargeZone's proprietary cloud-based Charging Management Software (CMS) — the technology backbone of its entire network. It enables real-time monitoring, remote diagnostics, and unmanned operation of all ChargeZone stations. ChargeCloud uses web-socket-based cloud computing and firmware integration with the hardware to ensure reliability without on-site staff. It also operates as a Platform-as-a-Service (PaaS) and SaaS product — ChargeZone licenses ChargeCloud to operate chargers for third parties, including Abu Dhabi National Oil Company's UAE charging stations. The mobile app integrates with ChargeCloud for session management, payment, and station discovery. RFID cards are also supported for fleet operators."
          }
        },
        {
          "@type": "Question",
          "name": "How does ChargeZone's 13,500+ station network operate at scale?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ChargeZone expanded from direct deployment to a hybrid CPO (Charge Point Operator) aggregation model. In April 2025, it formalised OCPI-based roaming partnerships with Statiq, Pulse Energy, Chargemod, Electreefi, and Ennovator — creating a combined network of 13,500+ EV charging stations, making it the single-largest CPO in India. 80% of ChargeZone's directly owned stations are Company-Owned, ChargeZone-Operated (COCO); the remainder use a proprietary Dealer-Owned, ChargeZone-Operated (DOCO) franchise model. All stations are unmanned — fully managed through ChargeCloud. Monthly energy sales crossed 10 GWh in April 2025. 250,000+ registered EV users. Fleet charging utilisation: 22.5%+. Personal vehicle utilisation: 5%+."
          }
        },
        {
          "@type": "Question",
          "name": "Is ChargeZone profitable and what are its financial metrics?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ChargeZone achieved balance sheet profitability in CY2022 — notable for an infrastructure-heavy EV charging startup at that stage of market development. The company operates with a 5–6 year ROI target per charging station. Revenue is generated through electricity sales to EV users, fleet charging contracts (B2B), ChargeCloud SaaS licensing, and franchise fees. In FY2026, ChargeZone is planning ₹300–400 crore in fresh capital expenditure — doubling down on the stations-as-assets model. Hariyani: 'EV adoption is no longer a question of if — it is already happening. We are seeing 50% year-on-year growth and are aiming for 300% in the coming years.'"
          }
        },
        {
          "@type": "Question",
          "name": "What are ChargeZone's OEM partnerships and charging speeds?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ChargeZone has OEM and eMobility partnerships with Audi, Hyundai, Kia, MG Motors, Tata Motors, Mahindra & Mahindra, Switch Mobility, Ashok Leyland, Volvo-Eicher, SnapE, and Everest Fleet — plus hospitality and commercial partnerships with Marriott, Hyatt, Fortune Hotels, and the Landmark Group. Charging speeds range from standard DC fast chargers to 360kW superchargers and 1.2MW ultra-fast highway chargers — among the highest commercially deployed in India. The network covers all four-wheeler EV segments: personal cars, electric buses, and heavy commercial electric trucks. Volvo Car India launched a 360kW ultra-fast station on the Mumbai–Nashik Highway in partnership with ChargeZone."
          }
        }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Total Raised", v: "$106M" },
  { l: "Founded", v: "2018" },
  { l: "HQ", v: "Vadodara, Gujarat" },
  { l: "Stations", v: "13,500+" },
  { l: "Highways", v: "36,000 km" },
  { l: "Monthly Energy", v: "10 GWh+" },
]

const TIMELINE = [
  {
    year: "1998–2018",
    event: "Kartikey Hariyani completes B.E. Electrical Engineering at L.D. College of Engineering, Gujarat University, and joins Larsen & Toubro Limited as a Sales Specialist (1998–2004). He works as International Business Manager at L&T, spending extended time in Japan working with BMW AG and Stanley Electric Japan, and in Germany. He earns TÜV SÜD ISO 9001 certification. He then founds TecSo Projects Limited — a project engineering and technology solutions company — building industrial and energy infrastructure expertise over a decade.",
  },
  {
    year: "Jul 2018",
    event: "ChargeZone (TecSo Charge Zone Pvt. Ltd.) is founded in Vadodara, Gujarat by siblings Kartikey Hariyani (CEO), Kinnari Hariyani (Director), and Devbrat Hariyani. The founding thesis: India's EV revolution will be bottlenecked by charging infrastructure. The solution must be technology-driven, unmanned, and scalable across both highways and urban corridors. ChargeZone begins building its proprietary ChargeCloud CMS platform from day one — a decision that will define its competitive moat.",
  },
  {
    year: "Sep 2019 – 2022",
    event: "First funding: $70.2K angel round (September 2019). Venture Catalysts leads a bridge round in December 2021 ($10M). Total raised by 2022: ~$13M. ChargeZone deploys fast-charging stations across Gujarat and major highway corridors. ChargeCloud goes live — enabling the company's first unmanned, remotely monitored charging stations. 80% COCO (Company-Owned, ChargeZone-Operated). DOCO (Dealer-Owned, ChargeZone-Operated) franchise model introduced. Balance sheet profitability achieved in CY2022.",
  },
  {
    year: "Mar 2023",
    event: "$54 million Series A1 raised — led by BlueOrchard Finance (global impact investment manager) — mix of equity and $8M debt. ChargeZone crosses 3,500 charging points across 1,500+ stations in 37 cities and 20,000+ km of Indian highways. OEM partnerships active with Hyundai, Mahindra, Tata Motors, Ashok Leyland, Volvo-Eicher, Marriott, Hyatt, Landmark Group. Target announced: 3,000 high-speed DC stations by 2025. 1 million charging points by 2030.",
  },
  {
    year: "Dec 2023",
    event: "Macquarie Capital — the principal investment arm of Macquarie Group, one of the world's largest infrastructure fund managers — acquires a strategic minority stake in ChargeZone. DNV (the Norwegian technical assurance firm) conducts full technical due diligence. Macquarie Board Member Maheep Jain joins ChargeZone's board. Macquarie's infrastructure expertise and global network adds operational and capital market credibility that no India-only VC could provide.",
  },
  {
    year: "Apr 2024",
    event: "$19 million from British International Investment (BII) — the UK government's development finance institution (April 30, 2024). Total raised reaches $106M. BII's mandate: accelerate climate finance for India's EV infrastructure. ChargeZone announces plans for 1,500+ supercharging stations in next 18 months. ₹300 crore in debt raised from SBI and nationalised banks. $360M capex investment plan announced — targeting 500 supercharging stations ranging 360kW to 1.2MW.",
  },
  {
    year: "Apr 2025",
    event: "OCPI-based roaming partnerships signed with Statiq, Pulse Energy, Chargemod, Electreefi, and Ennovator — creating a combined network of 13,500+ charging stations, making ChargeZone the single-largest CPO in India. Monthly energy sales cross 10 GWh. 250,000+ registered users. Fleet charging utilisation: 22.5%+. 36,000km of Indian highways electrified. ₹400 crore total invested in infrastructure since founding. FY26 capex: ₹300–400 crore planned.",
  },
  {
    year: "Sep 2025",
    event: "ChargeZone acquires Zerovolt's Wadala Charging Facility in Mumbai (September 8, 2025) — adding a strategic urban charging asset on one of India's most high-volume freight and personal EV corridors. Stanford GSB-certified, ex-L&T engineer Kartikey Hariyani has built India's largest EV charging company from Vadodara — the city most associated with Baroda's industrialist tradition — without relocating to Bengaluru, Delhi, or Mumbai. The infrastructure thesis is proving correct.",
  },
]

const COLS = [
  {
    h: "The L&T Engineer Who Saw the Bottleneck Clearly",
    b: `Kartikey Hariyani spent six years at Larsen & Toubro watching how infrastructure gets built from the inside. He was a Sales Specialist at L&T from 1998 to 2004, then an International Business Manager — spending time in Japan with BMW AG and Stanley Electric Japan, and in Germany — before returning to Gujarat and founding TecSo Projects Limited, a project engineering company. For over a decade, he studied how large-scale industrial infrastructure projects succeeded and failed: the supply chains, the commissioning challenges, the technology integration, and the gap between what was promised and what was delivered.\n\nIn 2018, that knowledge pointed at one obvious gap. India's electric vehicle policy was advancing — GST reductions, FAME II subsidies, OEM commitments. But the charging infrastructure was near-absent. A few slow AC chargers in parking lots. Almost nothing on highways. No cloud management platform that could run unmanned stations at scale. No company that had approached EV charging as infrastructure — not as a consumer app, not as a side business, but as the electrical equivalent of building a petrol bunk network.\n\nHariyani founded ChargeZone in July 2018 with his siblings Kinnari and Devbrat. He had earned a TÜV SÜD ISO 9001 certification. He built ChargeCloud — the proprietary cloud-based charging management software — before deploying a single station, because he understood that at network scale, every charging station that required a human to operate it was a business model that could never work.`,
  },
  {
    h: "BlueOrchard, Macquarie, BII and the Infrastructure Capital Stack",
    b: `The investor lineup that assembled around ChargeZone is, in itself, a proof of thesis. It is not a consumer tech investor stack — it is an infrastructure capital stack. BlueOrchard Finance, the global impact investment manager that led the $54 million Series A1 in March 2023, specialises in deploying capital into sustainable infrastructure in emerging markets. Macquarie Capital — the principal investment arm of Macquarie Group, which manages $900 billion in assets globally and built much of Australia's, Europe's, and Asia's toll roads, airports, and utilities — acquired a strategic minority stake in December 2023. British International Investment, the UK government's development finance institution with a mandate for climate-aligned infrastructure in emerging markets, committed $19 million in April 2024.\n\nNone of these are investors who back product launches or growth hacks. They are investors who back decade-long infrastructure compounding. They backed ChargeZone because Macquarie's DNV-led technical due diligence confirmed what Hariyani had been saying: ChargeCloud is genuinely differentiated — a CMS that enables fully unmanned, remote-monitored operations across thousands of charging points, scalable without linear cost increases. It also operates as a SaaS and PaaS product — ChargeZone already licenses ChargeCloud to run the Abu Dhabi National Oil Company's UAE charging stations. The infrastructure is the product, and the software makes it possible.\n\nSBI and other nationalised banks have contributed ₹300 crore in debt. Total invested in infrastructure since founding: ₹400 crore. The mix of development finance, infrastructure capital, and state bank debt is the capital structure of a utility — not a startup.`,
  },
  {
    h: "13,500 Stations, 36,000 km and the Million-Point Target",
    b: `The April 2025 network announcement changed the scale of the story entirely. By formalising OCPI-based roaming partnerships with Statiq, Pulse Energy, Chargemod, Electreefi, and Ennovator, ChargeZone created India's largest combined EV charging network: 13,500+ stations accessible through a single platform. Monthly energy sales crossed 10 GWh — a metric that tracks the actual electricity delivered to Indian EVs, not just station counts. Fleet charging utilisation across the network exceeded 22.5%; personal vehicle utilisation is growing past 5% with 50% year-on-year growth.\n\n36,000 kilometres of Indian highways have been electrified by ChargeZone infrastructure. Corridors include Bengaluru–Chennai, Bengaluru–Hyderabad, Bengaluru–Pune–Mumbai, and Mumbai–Ahmedabad — the arteries of India's most EV-active commercial freight and personal mobility markets. Charging speeds range from standard DC fast chargers to 1.2MW ultra-fast stations — the highest commercially deployed in India. Volvo Car India's 360kW ultra-fast station on the Mumbai–Nashik Highway is a ChargeZone installation.\n\nHariyani's FY26 capex plan — ₹300–400 crore in fresh infrastructure investment, targeting 300% growth in utilisation — is the plan of a company that turned profitable at balance sheet level in 2022 and is now deploying capital to compound. The target remains one million charging points by 2030. From Vadodara's Notus IT Park, an electrical engineer who spent years in Japan and Germany learning how industrial infrastructure works has built the company that will determine whether India's EV decade actually functions.`,
  },
]

const PULL_QUOTE = {
  text: "Our business model has been about investing and building charging stations — building gas stations of the future by delivering electricity for EVs. Our infrastructure and technology have been our differentiators since the beginning, as all our charging points are unmanned. EV adoption is no longer a question of 'if' — it is already happening.",
  by: "Kartikey Hariyani, Founder & CEO, ChargeZone (Autocar Professional, 2025)",
}

const LESSON =
  "EV charging infrastructure is not a product business — it is a utility business that requires infrastructure capital, not venture capital. Hariyani understood this before most: he raised from Macquarie (infrastructure specialist), BII (development finance), and SBI (debt), not from consumer tech VCs chasing DAU growth. ChargeCloud — built before the first station — is what turns a capital-heavy physical network into a scalable, profitable platform. Build the software for the infrastructure first."

const INVESTORS = [
  "Macquarie Capital — Strategic Minority Stake (Dec 2023, Largest Institutional Investor)",
  "British International Investment / BII — UK Government DFI ($19M, Apr 2024)",
  "BlueOrchard Finance — Series A1 Lead ($54M, Mar 2023)",
  "Venture Catalysts — Bridge Round Lead ($10M, Dec 2021)",
  "SBI + Nationalised Banks — ₹300 Crore Debt",
  "52 Institutional Investors Total",
  "155 Angel Investors",
  "GI Ventures, Samarthya Investment Advisors, Sprint VC",
]

const PARTNERSHIPS = [
  "Audi India — OEM Charging Partner",
  "Hyundai Motor India — OEM Charging Partner",
  "Tata Motors — Fleet & OEM Partner",
  "Mahindra & Mahindra — Fleet & OEM Partner",
  "Ashok Leyland & Volvo-Eicher — Commercial EV Partner",
  "Statiq, Pulse Energy, Chargemod (OCPI Roaming)",
  "Marriott, Hyatt, Fortune Hotels — Location Partners",
  "ADNOC (Abu Dhabi) — ChargeCloud SaaS Client",
]

const FAQS = [
  {
    q: "What is ChargeZone's COCO and DOCO model?",
    a: "ChargeZone operates 80% of its directly deployed charging stations on a COCO (Company-Owned, ChargeZone-Operated) model — ChargeZone owns the hardware, land lease or installation, and operates the station via ChargeCloud. The remaining 20% use the proprietary DOCO (Dealer-Owned, ChargeZone-Operated) franchise model — a third party (dealer, property owner, fleet operator) owns the physical station investment while ChargeZone operates it through ChargeCloud and handles all technology, maintenance, and billing. DOCO allows rapid network expansion with reduced capital requirement, while COCO ensures quality control and profitability on premium corridors.",
  },
  {
    q: "What is the BillionE platform and how does it relate to ChargeZone?",
    a: "BillionE is a separate e-mobility platform co-founded by Kartikey Hariyani in October 2022, focused on the digital experience layer of the EV market — aggregating data, services, and user experiences beyond the physical charging transaction. ChargeZone (hardware, infrastructure, ChargeCloud CMS) and BillionE (digital platform, user experience) operate as complementary parts of Hariyani's broader e-mobility ecosystem. BillionE raised $10M in seed funding in 2023.",
  },
  {
    q: "How does ChargeZone compare to Tata Power EV Charging, BOLT Earth, and Statiq?",
    a: "ChargeZone is the largest independent EV charging network in India by combined station count (13,500+) and the deepest in highway infrastructure (36,000km). Tata Power EZ Charge is strong in urban and residential charging with the parent group's balance sheet advantage. Bolt Earth (BOLT) is urban-focused and integrates two-wheeler charging. Statiq is a VC-backed player with aggressive urban deployment. The key differentiators for ChargeZone are: proprietary ChargeCloud CMS (enabling unmanned scale), highway corridor depth, heavy commercial vehicle charging capability (buses and trucks alongside cars), and institutional-quality investor backing (Macquarie + BII + state bank debt).",
  },
  {
    q: "What is ChargeZone's renewable energy integration plan?",
    a: "ChargeZone has committed to integrating solar and wind power generation at charging stations wherever permitted under state electricity regulations. The goal is to have a significant portion of its charging network powered by renewable energy by 2030, aligning the charging stations with India's clean energy targets. The company's $360M capex plan explicitly includes renewable energy integration as part of its supercharging station build-out. Macquarie Capital's interest in ChargeZone was partly driven by this renewable integration pathway, which aligns with the infrastructure giant's global clean energy investment mandate.",
  },
]

const RELATED = [
  { name: "Ather Energy", slug: "ather-energy-ev", cat: "Electric Vehicles / IPO", val: "$502M raised" },
  { name: "Blue Energy Motors", slug: "blue-energy-motors", cat: "LNG & EV Trucks", val: "$50M raised" },
  { name: "Aurassure", slug: "aurassure", cat: "Climate Tech / IoT", val: "₹29 Cr raised" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ChargeZonePage() {
  const accent = "#0f766e"
  const accentDark = "#0d6460"
  const accentBg = "#f0fdfa"
  const accentBorder = "#99f6e4"

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
        ChargeZone Founder Story — Kartikey Hariyani | India's Largest EV Charging Network | Macquarie Capital & BII Backed | $106M Raised | UpForge
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
            { n: "ChargeZone", h: "/startup/chargezone-ev" },
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
            UpForge · Startup Registry · EV Infrastructure
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
            Edition · EV Charging Infrastructure
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span
            className="text-[9px] font-black uppercase tracking-wider"
            style={{ color: accent }}
          >
            Clean Mobility · March 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">Vadodara, Gujarat</span>
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
                EV CHARGING / CLEAN INFRASTRUCTURE
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">March 2026</span>
            </div>

            {/* Headline */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              An ex-L&T engineer, a sibling team, and the city of Vadodara.{" "}
              <em style={{ color: accent }}>
                $106M, 13,500 stations, 36,000 km of highways — India's EV charging backbone is built.
              </em>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              Kartikey Hariyani spent years at L&T watching how industrial infrastructure gets
              built — including time with BMW AG and Stanley Electric in Japan. In 2018, he used
              that knowledge to found ChargeZone in Vadodara with siblings Kinnari and Devbrat.
              He built ChargeCloud before he built a single station. Today: Macquarie Capital,
              British International Investment, $106M raised, 13,500+ stations, and the ambition
              of one million charging points. India's EV decade runs through Vadodara.
            </p>

            {/* Byline */}
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}
            >
              {[
                "By UpForge Editorial",
                "Vadodara, Gujarat",
                "Est. 2018",
                "India's EV Charging Backbone",
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
                src="/Upforge-chargezone-ev.webp"
                alt="Kartikey Hariyani, Co-Founder & CEO of ChargeZone — UpForge Founder Chronicle"
                className="w-full object-cover object-top"
                style={{ height: "min(300px,60vw)", display: "block" }}
                loading="eager"
              />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>
                  Kartikey Hariyani
                </p>
                <p
                  className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  Co-Founder & CEO · ChargeZone
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
                  src="/Upforge-chargezone-ev.webp"
                  alt="Kartikey Hariyani, Co-Founder & CEO of ChargeZone — UpForge Founder Chronicle"
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
                    Kartikey Hariyani
                  </p>
                  <p
                    className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Co-Founder & CEO · ChargeZone
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.chargezone.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: `1.5px solid ${accent}`, textDecoration: "none" }}
                  aria-label="Visit ChargeZone official website"
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
                      chargezone.co.in — Official Website
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/chargezone/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View ChargeZone on LinkedIn"
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
                      LinkedIn — ChargeZone
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

              {/* OEM & Network Partnerships */}
              <div style={{ border: "1px solid #D8D2C4" }}>
                <div
                  className="px-4 py-2"
                  style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}
                >
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    OEM &amp; Network Partnerships
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {PARTNERSHIPS.map((p, i) => (
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
                      {p}
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
            Explore More EV &amp; Clean Energy Startups on UpForge
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "EV Startups India 2026", h: "/ev-startups-india" },
              { l: "Indian Unicorns Full List", h: "/indian-unicorns" },
              { l: "EV Charging Network India Guide", h: "/ev-startups-india/ev-charging-india" },
              { l: "Gujarat Startups", h: "/gujarat-startups" },
              { l: "Clean Mobility Startups India", h: "/clean-mobility-startups-india" },
              { l: "Tier-2 City Founders India", h: "/tier-2-founders-india" },
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
                Building India's next infrastructure company? Get verified on UpForge.
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
            * Data sourced from Autocar Professional, Inc42, YourStory, Renewable Watch,
            EVReporter, Macquarie Group press releases, BII press releases, Tracxn, PitchBook,
            DNV advisory disclosures, and ChargeZone press releases as of March 2026. UpForge
            is an independent registry — no paid placements, no sponsored rankings. Funding
            figures, station counts, and energy metrics reflect latest available public data
            including company announcements and investor press releases.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "EV Startups India", h: "/ev-startups-india" },
                { l: "Startup Registry", h: "/startup" },
                { l: "Indian Unicorns", h: "/indian-unicorns" },
                { l: "Ather Energy Profile", h: "/startup/ather-energy-ev" },
                { l: "Blue Energy Motors Profile", h: "/startup/blue-energy-motors" },
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
