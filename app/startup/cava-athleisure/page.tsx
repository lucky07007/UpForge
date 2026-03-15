"use client"

// app/startup/cava-athleisure/page.tsx
// UpForge — Cava Athleisure · Ria Mittal & Shreya Mittal Founder Chronicle
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
      "@id": "https://upforge.in/startup/cava-athleisure#article",
      "headline": "Cava Athleisure — How Sisters Ria & Shreya Mittal Built India's Breakout D2C Athleisure Brand From ₹40 Lakh and a Lockdown Workout Routine to a ₹215 Crore Valuation",
      "description": "Cava Athleisure founder story — University of the Arts London graduate Ria Mittal (CEO) and Warwick University alumna Shreya Mittal (CMO), daughters of a 30-year garment industry family, launched Cava Athleisure in 2020 from Bengaluru with ₹40 lakh in savings during COVID-19. Bootstrapped → ₹1.31 crore FY24 revenue → $1.14M seed (Spring Marketing Capital, Jun 2024) → ₹40 crore Series A (Sharrp Ventures / Harsh Mariwala family office + V3 Ventures, Jan 2026) → ₹215 crore valuation. ₹5.5 crore MRR. Proprietary ADPT™ fabric blend. Zepto partnership. Targeting ₹40 crore FY26 revenue. BCI cotton. Recycled polyester. India's most compelling young women-led D2C fashion startup story.",
      "url": "https://upforge.in/startup/cava-athleisure",
      "datePublished": "2026-03-14T00:00:00+05:30",
      "dateModified": "2026-03-14T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.in/Upforge-cava-athleisure.webp",
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
          "name": "Ria Mittal",
          "jobTitle": "Co-Founder & CEO",
          "worksFor": { "@type": "Organization", "name": "Cava Athleisure" },
          "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "University of the Arts London"
          },
          "description": "Ria Mittal is Co-Founder and CEO of Cava Athleisure. She holds a BSc in Fashion Management from the University of the Arts London and interned at The House of Rare (digital marketing, 2019), tsk design (graphic design and branding, 2018), and Mittal Clothing Company (merchandise, 2016). She co-founded Cava in 2020 at age 20 with her younger sister Shreya, leveraging 30 years of family garment industry knowledge. She oversees design, production, fabric innovation, and operations.",
          "sameAs": ["https://www.linkedin.com/in/riamittal/"]
        },
        {
          "@type": "Person",
          "name": "Shreya Mittal",
          "jobTitle": "Co-Founder & CMO",
          "worksFor": { "@type": "Organization", "name": "Cava Athleisure" },
          "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "University of Warwick"
          },
          "description": "Shreya Mittal is Co-Founder and CMO of Cava Athleisure. She studied at the University of Warwick, UK. She co-founded Cava at age 18 and leads marketing, campaigns, content creation, and social media strategy. Cava's strong community presence and brand identity are attributed to her content and community-building expertise.",
          "sameAs": ["https://www.linkedin.com/company/cava-athleisure/"]
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "Cava Athleisure",
        "url": "https://cavaathleisure.com",
        "legalName": "Cava Athleisure Private Limited",
        "foundingDate": "2020",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        },
        "description": "Cava Athleisure is a Bengaluru-based D2C athleisure and everyday-wear brand founded in 2020 by sisters Ria and Shreya Mittal. It operates a vertically integrated, in-house production model using BCI-certified cotton, recycled polyester, and its proprietary ADPT™ fabric blend. Products include leggings, joggers, sports bras, tops, co-ord sets, hoodies, and activewear essentials for men and women, priced at ₹800–₹2,500. Cava targets Gen Z and millennial consumers (ages 15–35) with a function-first, design-led approach adapted to Indian body types, climate, and lifestyle. Post-Series A (Jan 2026), the brand is valued at ₹215 crore with ₹5.5 crore MRR and FY26 revenue target of ₹40 crore.",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 31, "maxValue": 40 },
        "sameAs": [
          "https://cavaathleisure.com",
          "https://www.linkedin.com/company/cava-athleisure/"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "D2C Startups India", "item": "https://upforge.in/d2c-startups-india" },
        { "@type": "ListItem", "position": 4, "name": "Cava Athleisure", "item": "https://upforge.in/startup/cava-athleisure" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who founded Cava Athleisure and what is their background?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cava Athleisure was founded in 2020 by sisters Ria Mittal (CEO) and Shreya Mittal (CMO), both from Bengaluru. Ria holds a BSc in Fashion Management from the University of the Arts London and interned at The House of Rare, tsk design, and Mittal Clothing Company. Shreya studied at the University of Warwick, UK. Both sisters come from a family with over 30 years of experience in India's garment manufacturing industry — giving them direct access to trusted fabric suppliers, world-class machinery, and manufacturing infrastructure from day one. They launched Cava at ages 20 and 18 respectively, using ₹40 lakh in savings during the COVID-19 lockdown of 2020."
          }
        },
        {
          "@type": "Question",
          "name": "How much has Cava Athleisure raised and who are its investors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cava Athleisure has raised $5.49 million in total across two rounds. The seed round of $1.14 million was raised in June 2024, led by Spring Marketing Capital with 8 participating investors. The Series A of ₹40 crore ($4.4 million) was raised on January 29–30, 2026, led by Sharrp Ventures — the family office of Harsh Mariwala, chairman of FMCG giant Marico — which contributed ₹21 crore. V3 Ventures and existing investor Spring Marketing Capital participated in the Series A. The round valued Cava at ₹215 crore post-money."
          }
        },
        {
          "@type": "Question",
          "name": "What is Cava's ADPT™ fabric blend?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ADPT™ is Cava Athleisure's proprietary fabric blend, launched in January 2025 as a result of in-house R&D. It is designed to be adaptive — combining performance qualities (stretch, moisture-wicking, durability) with everyday comfort and aesthetic finish. Alongside ADPT™, Cava uses BCI-certified cotton (Better Cotton Initiative, a global standard for responsible cotton farming) and recycled polyester across its collections. All garments are tested in-house for fabric strength, pH levels, tear resistance, and colour bleeding before being added to the collection. The ADPT™ launch marked Cava's first step toward proprietary textile intellectual property — a significant differentiator in India's D2C athleisure space."
          }
        },
        {
          "@type": "Question",
          "name": "What is Cava Athleisure's revenue and financial trajectory?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cava Athleisure was bootstrapped until June 2024 with ₹40 lakh in founder savings. Revenue was approximately ₹1.31 crore in FY2024. Following the seed round and subsequent operational scaling, the brand reached a monthly revenue run rate of ₹2.5 crore by December 2024, then ₹5.5 crore MRR by the time of its Series A in January 2026. The company is targeting ₹40 crore in FY2026 revenue. Total funding as of January 2026: $5.49 million (~₹47 crore). Valuation: ₹215 crore ($23.3 million)."
          }
        },
        {
          "@type": "Question",
          "name": "What is Cava's partnership with Zepto and why does it matter?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cava Athleisure partnered with Zepto — India's leading 10-minute grocery and quick-commerce delivery platform — in March 2025, making it one of the first athleisure brands in India to sell through quick-commerce. The partnership allows urban consumers to receive Cava products (leggings, tops, co-ord sets, joggers) within minutes of ordering, treating premium athleisure as an everyday essential rather than a planned purchase. Co-founder Shreya Mittal described the partnership as merging 'the convenience of everyday essential purchases with the rapid delivery of premium athleisure.' The Zepto partnership is central to Cava's omnichannel strategy alongside its D2C website, marketplace presence, and planned offline expansion."
          }
        },
        {
          "@type": "Question",
          "name": "How does Cava Athleisure compete with Blissclub, HRX, and Decathlon in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cava's competitive differentiation rests on three pillars: vertical integration (in-house design, production, pattern-making, and quality control — eliminating outsourcing delays and quality inconsistency), Indian-first fit and fabric design (cut for Indian body types, climate, and lifestyle rather than global templates), and proprietary materials (ADPT™ blend, BCI cotton, recycled polyester). Blissclub targets a similar Gen Z and millennial women segment but does not operate in-house manufacturing. HRX (Hrithik Roshan x Myntra) is a licensed brand dependent on celebrity IP. Decathlon competes on price-value but is not India-first in design or material. Cava's ₹800–₹2,500 price band sits between mass-market and premium, supported by the slow-fashion, durability-first positioning."
          }
        }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Total Raised", v: "$5.49M" },
  { l: "Valuation", v: "₹215 Cr" },
  { l: "Founded", v: "2020" },
  { l: "MRR (Jan 2026)", v: "₹5.5 Cr" },
  { l: "FY26 Target", v: "₹40 Cr" },
  { l: "Team Size", v: "37" },
]

const TIMELINE = [
  {
    year: "2020 — COVID-19 Lockdown",
    event: "Ria Mittal (BSc Fashion Management, University of the Arts London, age 20) and Shreya Mittal (University of Warwick, age 18) are home in Bengaluru for the pandemic lockdown, attending classes online. Their daily workout routine — the one thing giving them structure in the chaos — reveals a glaring gap: India has no athleisure brand that matches international quality, style, and versatility. With ₹40 lakh in personal and family savings and 30 years of family garment industry infrastructure, they launch CAVA.",
  },
  {
    year: "2020–22",
    event: "Cava is launched D2C through its own website. The founding model: in-house production using BCI cotton and recycled polyester, direct-to-consumer pricing between ₹800 and ₹2,500, and a community-first content strategy on Instagram and social media built by Shreya. Ria manages design, production, and quality control — leveraging the family's trusted fabric supplier network and state-of-the-art production facility. YourStory features Cava as an emerging women-led brand in February 2022.",
  },
  {
    year: "2022–23",
    event: "Cava formalises as Cava Athleisure Private Limited (incorporated 2022–23, ROC Bengaluru). The brand expands its product range beyond women's activewear to include co-ord sets, hoodies, and beginnings of a men's line. Monthly revenue from select collections reaches ₹15 lakh. Apparel Resources and Images Business of Fashion cover the brand. The founders begin scouting for institutional capital to scale manufacturing and marketing while staying true to the slow-fashion, fabric-quality-first thesis.",
  },
  {
    year: "Jun 2024",
    event: "Seed round closed: $1.14 million from Spring Marketing Capital (lead) and 7 other investors. 8 institutional investors total in the seed. Cava's valuation after seed: approximately ₹60 crore. Funds deployed toward capacity expansion, new product development, and brand marketing. FY2024 revenue: ₹1.31 crore — a small base, but with accelerating MRR growth in the months following the seed.",
  },
  {
    year: "Jan 2025",
    event: "ADPT™ fabric blend launched — Cava's first proprietary material developed through in-house R&D. The launch positions Cava as more than a garment brand: it is becoming a textile innovator. Valuation doubles to approximately ₹120 crore in six months following the seed round. Monthly revenue run rate targets ₹2.5 crore by December 2024, confirmed by Fashion Network.",
  },
  {
    year: "Mar 2025",
    event: "Zepto partnership announced — Cava becomes one of India's first athleisure brands to sell through 10-minute quick-commerce. The collaboration reframes premium athleisure as an everyday essential. Products available for rapid urban delivery across major cities. The partnership signals Cava's shift to omnichannel from pure-play D2C. Plans confirmed for offline retail expansion and a full men's activewear line in 2025.",
  },
  {
    year: "Jan 2026",
    event: "Series A: ₹40 crore ($4.4M) raised on January 29, 2026. Led by Sharrp Ventures — the family office of Marico chairman Harsh Mariwala, contributing ₹21 crore. V3 Ventures and Spring Marketing Capital co-invest. Post-money valuation: ₹215 crore ($23.3M). MRR at time of raise: ₹5.5 crore. FY26 revenue target: ₹40 crore. Rishabh Mariwala of Sharrp Ventures: 'The founders' disciplined execution and strategic acumen despite their relatively young age is exceptional.' Funds earmarked: new product development, leadership hiring, brand building, and omnichannel distribution.",
  },
]

const COLS = [
  {
    h: "Lockdown Workouts and the Gap That Needed Filling",
    b: `The pandemic gave India many things. One of them, unexpectedly, was Cava Athleisure. In 2020, Ria and Shreya Mittal — 20 and 18 years old, both studying abroad at the University of the Arts London and the University of Warwick respectively — found themselves back in Bengaluru, attending lectures online, and doing what millions of Indians discovered during lockdown: working out at home every day.\n\nThe workout routine was the obvious part. The gap it exposed was the founding insight. India had no athleisure brand that matched what the sisters had grown accustomed to finding internationally — no label that combined premium sustainable fabric, designs calibrated to Indian body types and climate, and the visual sensibility of a brand you'd actually want to be associated with. The market had Jockey and Decathlon at one end and overpriced imports at the other. The middle — premium, Indian-first, community-driven athleisure for Gen Z and millennials — was empty.\n\nWhat made the gap actionable rather than just observable was the family behind the founders. Their parents had been in India's garment manufacturing business for over three decades. As Ria later described it: "Almost all our dinner table conversations revolve around work and the garment industry. We got a foot in the door with the best fabric and trim suppliers because of our goodwill in the industry and all our vendors are known and trusted." The ₹40 lakh in savings — personal and family — was seed capital for a company that already had supply chain access most D2C startups take years to build. They launched with BCI-certified cotton and recycled polyester. They ran every garment through in-house tests: fabric strength, pH, tear resistance, colour bleeding. Nothing shipped until it passed.`,
  },
  {
    h: "The ADPT™ Fabric, the Zepto Partnership and the Marico Family Office",
    b: `The story of Cava from 2020 to the seed round in June 2024 is a story of building in public before anyone was watching. The D2C website. The Instagram community — built by Shreya with the instinct of someone who understood that an athleisure brand is not selling leggings, it is selling a lifestyle identity that its customers want to be associated with. Monthly revenue peaks from select collections. Coverage in YourStory, Apparel Resources, Images Business of Fashion. And, crucially, a manufacturing model — fully vertical, in-house from design to quality control — that gave Cava the consistency and speed advantages that outsourced D2C brands could never match.\n\nThe $1.14 million seed round in June 2024 from Spring Marketing Capital and seven co-investors was the first formal validation from institutional India. But the product innovation that followed told the sharper story. In January 2025, Cava launched ADPT™ — its proprietary fabric blend, developed through in-house R&D. For a brand at this scale to be building textile IP, not just sourcing commodity materials, was rare. The Zepto partnership in March 2025 was the distribution milestone: one of India's first athleisure brands available through 10-minute quick-commerce, repositioning premium activewear from a planned purchase to an everyday essential.\n\nBy January 2026, the MRR had reached ₹5.5 crore. Sharrp Ventures — the family office of Harsh Mariwala, the man who built Marico into a ₹10,000 crore FMCG institution — led the ₹40 crore Series A. Rishabh Mariwala noted what all the investors circling Cava had observed: two founders in their early-to-mid twenties executing with discipline and strategic clarity that belied their age. The post-money valuation: ₹215 crore.`,
  },
  {
    h: "₹40 Crore Target, Offline and the Indian Athleisure Bet",
    b: `The Indian athleisure market's fundamentals are compelling in a way that goes beyond trend. The post-pandemic convergence of work-from-home normalisation, rising gym and yoga culture, social media fitness communities, and Gen Z's refusal to accept the wardrobe split between "active" and "everyday" has created sustained, structural demand for clothing that does both. India's sportswear and athleisure market is estimated to reach $11 billion by 2030. The premium D2C segment — where Cava operates — is early and underpenetrated.\n\nCava's positioning within that market is specific: function-first and design-led, Indian-first in fit and fabric, community-driven in identity, and vertically integrated in operations. It competes with Blissclub (women-focused, VC-backed), HRX (celebrity IP-dependent), Cultsport, Technosport, and Decathlon — none of which combine Cava's combination of in-house manufacturing, proprietary fabric R&D, and the quick-commerce distribution partnership with Zepto.\n\nThe Series A capital is earmarked for four things: new product development (including the full men's activewear line and new ADPT™ variants), leadership team hiring, brand building at scale, and omnichannel expansion — bringing the Cava experience into offline retail after five years as a pure-play digital brand. The FY26 revenue target is ₹40 crore — a 30x jump from the ₹1.31 crore of FY2024. Two sisters from Bengaluru, a family garment business behind them, an ADPT™ fabric under their belt, and the Marico family office behind the next phase. The Indian athleisure story has a new benchmark.`,
  },
]

const PULL_QUOTE = {
  text: "Since we come from a family that has been in the garment industry, almost all our dinner table conversations revolve around work. We got a foot in the door with the best fabric and trim suppliers because of our goodwill — and our production facility and machinery are world-class because of the superior technology we use. That head start is real. But the brand? That we had to build from zero.",
  by: "Ria Mittal, Co-Founder & CEO, Cava Athleisure",
}

const LESSON =
  "The unfair advantage is not always capital or credentials — sometimes it is a family that has spent 30 years learning what you need to know. Ria and Shreya Mittal launched with supply chain access, trusted vendors, and manufacturing infrastructure that most D2C founders spend years and crores trying to build. The insight was still theirs. But the execution speed was their family's. The best businesses know which part of the moat they inherited and which part they built."

const INVESTORS = [
  "Sharrp Ventures — Harsh Mariwala / Marico Family Office (Lead, Series A Jan 2026, ₹21 Cr)",
  "V3 Ventures (Series A Jan 2026)",
  "Spring Marketing Capital (Seed Jun 2024 + Series A follow-on)",
  "7 Additional Seed Round Investors (Jun 2024)",
]

const MILESTONES = [
  "Founded 2020 — bootstrapped with ₹40 lakh in savings",
  "BCI cotton + Recycled polyester from Day 1",
  "$1.14M seed — Spring Marketing Capital (Jun 2024)",
  "ADPT™ proprietary fabric blend launched (Jan 2025)",
  "Zepto partnership — quick-commerce launch (Mar 2025)",
  "₹5.5 crore MRR as of Jan 2026",
  "₹40 crore Series A at ₹215 crore valuation (Jan 2026)",
  "FY26 Revenue Target: ₹40 crore",
]

const FAQS = [
  {
    q: "What products does Cava Athleisure make and at what price points?",
    a: "Cava Athleisure makes leggings, joggers, sports bras, tops, co-ord sets, hoodies, shorts, and activewear essentials for both women and men. Products are priced between ₹800 and ₹2,500 — positioning Cava in the premium affordable segment, significantly below international athleisure brands (Nike, Lululemon) but above mass-market Indian brands. All garments are made using BCI-certified cotton, recycled polyester, or the proprietary ADPT™ blend. The brand operates in-house production from design and pattern-making through quality testing and fulfilment — allowing consistent quality control that outsourced manufacturing cannot guarantee.",
  },
  {
    q: "What does 'vertically integrated' mean for Cava and why does it matter?",
    a: "Cava owns its production process end-to-end — from fabric sourcing and design to pattern-making, quality testing, and packaging. This means Cava does not outsource manufacturing to third-party factories, which eliminates quality inconsistency, speeds up product development, allows proprietary fabric R&D (like ADPT™), and enables rapid response to trends. In India's D2C fashion space, most brands contract external manufacturers and sacrifice control over quality and lead times. Cava's vertical integration is possible because the founders' family has operated garment manufacturing infrastructure for 30+ years, giving Cava state-of-the-art machinery and trusted supply-chain relationships from inception.",
  },
  {
    q: "Who is Rishabh Mariwala and why did Sharrp Ventures invest in Cava?",
    a: "Rishabh Mariwala is the Managing Director of Sharrp Ventures, the family office of his father Harsh Mariwala — the founder and chairman of Marico Ltd., the FMCG company behind Parachute, Saffola, and Set Wet. Sharrp Ventures focuses on early-stage consumer and D2C companies in India. Rishabh Mariwala commented on the Cava investment: 'The founders' disciplined execution and strategic acumen despite their relatively young age is exceptional.' Sharrp Ventures contributed ₹21 crore of the ₹40 crore Series A, making it the lead and most committed institutional backer. The Mariwala family's deep experience in scaling Indian consumer brands to category leadership is a strategic asset for Cava beyond the capital.",
  },
  {
    q: "Is Cava Athleisure available in offline stores in India?",
    a: "As of early 2026, Cava Athleisure is primarily a D2C digital brand — selling through its own website (cavaathleisure.com) and online marketplaces, with a Zepto quick-commerce partnership launched in March 2025. The company has confirmed offline retail expansion as a key use of its Series A proceeds. Cava has historically done pop-ups and experience-centre events to bring the brand to customers directly. Full offline store or large-format retail distribution is part of the planned omnichannel expansion in FY2026–27. GST registrations in Delhi and Haryana (both active) indicate national distribution ambitions beyond Karnataka.",
  },
]

const RELATED = [
  { name: "CARS24", slug: "cars24-auto", cat: "Auto Tech / Used Cars", val: "$1.08B raised" },
  { name: "Barsys", slug: "barsys", cat: "Consumer Hardware / Mixology", val: "$3.8M ARR" },
  { name: "Bolna", slug: "bolna", cat: "AI / Voice Automation", val: "$6.92M raised" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function CavaAthleisurePage() {
  const accent = "#be185d"
  const accentDark = "#9d174d"
  const accentBg = "#fdf2f8"
  const accentBorder = "#fbcfe8"

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
        Cava Athleisure Founder Story — Ria Mittal &amp; Shreya Mittal | India's D2C Athleisure Brand | Sharrp Ventures Series A | ₹215 Cr Valuation | UpForge
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
            { n: "D2C Startups India", h: "/d2c-startups-india" },
            { n: "Cava Athleisure", h: "/startup/cava-athleisure" },
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
            UpForge · Startup Registry · D2C Fashion
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
            Edition · D2C / Apparel
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span
            className="text-[9px] font-black uppercase tracking-wider"
            style={{ color: accent }}
          >
            Athleisure &amp; Activewear · March 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">Bengaluru, Karnataka</span>
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
                D2C / ATHLEISURE / WOMEN-LED
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">March 2026</span>
            </div>

            {/* Headline */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              ₹40 lakh. A lockdown workout. A 30-year garment family.{" "}
              <em style={{ color: accent }}>
                Now ₹215 crore — the Marico family office just bet on India's fastest-rising athleisure brand.
              </em>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              In 2020, sisters Ria (20) and Shreya Mittal (18) were stuck at home in Bengaluru,
              working out in clothes that didn't exist yet — premium Indian athleisure that matched
              international quality. Their family had 30 years of garment manufacturing behind them.
              They had ₹40 lakh in savings and a clear idea. Five years later: proprietary ADPT™
              fabric, a Zepto partnership, ₹5.5 crore MRR, and Harsh Mariwala's family office
              leading a ₹40 crore Series A at ₹215 crore valuation.
            </p>

            {/* Byline */}
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}
            >
              {[
                "By UpForge Editorial",
                "Bengaluru, Karnataka",
                "Est. 2020",
                "India's D2C Athleisure Benchmark",
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
                src="/Upforge-cava-athleisure.webp"
                alt="Ria Mittal and Shreya Mittal, Co-Founders of Cava Athleisure — UpForge Founder Chronicle"
                className="w-full object-cover object-top"
                style={{ height: "min(300px,60vw)", display: "block" }}
                loading="eager"
              />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>
                  Ria Mittal &amp; Shreya Mittal
                </p>
                <p
                  className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  Co-Founders · Cava Athleisure
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
                  src="/Upforge-cava-athleisure.webp"
                  alt="Ria Mittal and Shreya Mittal, Co-Founders of Cava Athleisure — UpForge Founder Chronicle"
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
                    Ria Mittal &amp; Shreya Mittal
                  </p>
                  <p
                    className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Co-Founders · Cava Athleisure
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://cavaathleisure.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: `1.5px solid ${accent}`, textDecoration: "none" }}
                  aria-label="Visit Cava Athleisure official website"
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
                      cavaathleisure.com — Official Website
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/cava-athleisure/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View Cava Athleisure on LinkedIn"
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
                      LinkedIn — Cava Athleisure
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

              {/* Company Milestones */}
              <div style={{ border: "1px solid #D8D2C4" }}>
                <div
                  className="px-4 py-2"
                  style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}
                >
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Company Milestones
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {MILESTONES.map((m, i) => (
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
                      {m}
                    </p>
                  ))}
                </div>
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
            Explore More D2C &amp; Fashion Startups on UpForge
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "D2C Startups India 2026", h: "/d2c-startups-india" },
              { l: "Indian Unicorns Full List", h: "/indian-unicorns" },
              { l: "Women Founders India", h: "/women-founders-india" },
              { l: "Athleisure Brands India Guide", h: "/d2c-startups-india/athleisure-brands-india" },
              { l: "Sharrp Ventures Portfolio", h: "/sharrp-ventures-portfolio" },
              { l: "Bengaluru D2C Startups", h: "/bengaluru-startups" },
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
                Building India's next D2C brand? Get verified on UpForge.
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
            * Data sourced from Entrepreneur India, Inc42, YourStory HerStory, Apparel Resources,
            Images Business of Fashion, Indian Retailer, Tracxn, IPO Platform, Fashion Network,
            Fibre2Fashion, and Cava Athleisure press releases as of March 2026. UpForge is an
            independent registry — no paid placements, no sponsored rankings. Revenue, valuation,
            and funding figures reflect latest available public data including company announcements
            and media reports.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "D2C Startups India", h: "/d2c-startups-india" },
                { l: "Startup Registry", h: "/startup" },
                { l: "Women Founders India", h: "/women-founders-india" },
                { l: "CARS24 Profile", h: "/startup/cars24-auto" },
                { l: "Barsys Profile", h: "/startup/barsys" },
                { l: "Bolna Profile", h: "/startup/bolna" },
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
