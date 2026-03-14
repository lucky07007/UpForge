"use client"

// app/startup/cars24-auto/page.tsx
// UpForge — CARS24 · Vikram Chopra, Mehul Agrawal, Gajendra Jangid & Ruchit Agarwal Founder Chronicle
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
      "@id": "https://upforge.in/startup/cars24-auto#article",
      "headline": "CARS24 — How Vikram Chopra, Mehul Agrawal, Gajendra Jangid & Ruchit Agarwal Built India's First Used-Car Unicorn and the $3.3B Auto-Tech Empire",
      "description": "CARS24 founder story — IIT Bombay, IIM Calcutta, Cornell, and McKinsey alumni Vikram Chopra, Mehul Agrawal, Gajendra Jangid, and Ruchit Agarwal founded CARS24 in 2015 in Gurugram after shutting FabFurnish. India's first organised used-car transaction platform. $1.08B raised from DST Global, SoftBank Vision Fund 2, Falcon Edge, Alpha Wave, Tencent. $3.3B peak valuation. India's first auto-tech unicorn (November 2020). ₹6,917 crore revenue FY24. Team-BHP and CarInfo acquisitions. UAE business EBITDA-positive. IPO on the cards 6–12 months out as of January 2026. The definitive story of how four ex-consultants organised India's 6-million used-car market.",
      "url": "https://upforge.in/startup/cars24-auto",
      "datePublished": "2026-03-14T00:00:00+05:30",
      "dateModified": "2026-03-14T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.in/Upforge-cars24-auto.webp",
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
          "name": "Vikram Chopra",
          "jobTitle": "Co-Founder & Group CEO",
          "worksFor": { "@type": "Organization", "name": "CARS24" },
          "alumniOf": [
            { "@type": "CollegeOrUniversity", "name": "IIT Bombay" },
            { "@type": "CollegeOrUniversity", "name": "University of Pennsylvania (Wharton)" }
          ],
          "description": "Vikram Chopra is Co-Founder and Group CEO of CARS24. He holds a BTech and MTech in Engineering from IIT Bombay and an MBA in Finance from the University of Pennsylvania. Before CARS24, he was a Business Analyst at McKinsey & Company, an Investment Analyst at Sequoia Capital India, and co-founded FabFurnish — an online furniture marketplace that merged with Fabfurnish.",
          "sameAs": ["https://www.linkedin.com/in/vikram-chopra-cars24/"]
        },
        {
          "@type": "Person",
          "name": "Mehul Agrawal",
          "jobTitle": "Co-Founder & COO",
          "worksFor": { "@type": "Organization", "name": "CARS24" },
          "alumniOf": { "@type": "CollegeOrUniversity", "name": "IIM Calcutta" },
          "description": "Mehul Agrawal is Co-Founder and COO of CARS24. He holds an MBA from IIM Calcutta and previously worked at the Boston Consulting Group. He co-founded FabFurnish, India's online furniture marketplace, with Vikram Chopra before pivoting to CARS24 in 2015.",
          "sameAs": ["https://www.linkedin.com/in/mehul-agrawal-cars24/"]
        },
        {
          "@type": "Person",
          "name": "Gajendra Jangid",
          "jobTitle": "Co-Founder & CMO",
          "worksFor": { "@type": "Organization", "name": "CARS24" },
          "alumniOf": { "@type": "CollegeOrUniversity", "name": "IIT Bombay" },
          "description": "Gajendra Jangid is Co-Founder and CMO of CARS24. Like Vikram Chopra, he holds a BTech and MTech in Engineering from IIT Bombay. He worked at Schlumberger for approximately nine years before co-founding CARS24 in 2015.",
          "sameAs": ["https://www.linkedin.com/in/gajendra-jangid/"]
        },
        {
          "@type": "Person",
          "name": "Ruchit Agarwal",
          "jobTitle": "Co-Founder & Group CFO",
          "worksFor": { "@type": "Organization", "name": "CARS24" },
          "alumniOf": { "@type": "CollegeOrUniversity", "name": "Cornell University" },
          "description": "Ruchit Agarwal is Co-Founder and Group CFO of CARS24. A Chartered Accountant and Cornell University MBA in Finance, he was VP at Bank of America Merrill Lynch (BofA Securities) before returning to India in 2014 and co-founding CARS24.",
          "sameAs": ["https://www.linkedin.com/in/ruchit-agarwal-cars24/"]
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "CARS24",
        "url": "https://www.cars24.com",
        "legalName": "Global Car Group Limited",
        "foundingDate": "2015",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "Gurugram",
          "addressRegion": "Haryana",
          "addressCountry": "IN"
        },
        "description": "CARS24 is India's largest online used-car marketplace, operated by Global Car Group Limited (Singapore). Founded in 2015, it enables consumers to buy and sell pre-owned cars, bikes, and commercial vehicles in a single visit or online through an AI-powered pricing and inspection platform. CARS24 was India's first auto-tech unicorn (November 2020). It operates across India (230+ cities), UAE, Australia, and Southeast Asia. Revenue: ₹6,917 crore (FY2024). Total funding: $1.08B. Peak valuation: $3.3B. Acquisitions: Team-BHP (April 2025), CarInfo (January 2026). NBFC licence: CARS24 Financial Services. An IPO listing is anticipated within 6–12 months of January 2026.",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 4000, "maxValue": 6000 },
        "sameAs": [
          "https://www.cars24.com",
          "https://www.linkedin.com/company/cars24/",
          "https://en.wikipedia.org/wiki/CARS24"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "Auto Tech Startups India", "item": "https://upforge.in/auto-tech-startups-india" },
        { "@type": "ListItem", "position": 4, "name": "CARS24", "item": "https://upforge.in/startup/cars24-auto" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who are the founders of CARS24 and what were they doing before?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CARS24 was founded in 2015 in Gurugram by four co-founders: Vikram Chopra (CEO) — IIT Bombay BTech/MTech, Wharton MBA, ex-McKinsey Business Analyst, ex-Sequoia Capital India Investment Analyst, FabFurnish co-founder; Mehul Agrawal (COO) — IIM Calcutta MBA, ex-BCG, FabFurnish co-founder; Gajendra Jangid (CMO) — IIT Bombay BTech/MTech, ex-Schlumberger (9 years); and Ruchit Agarwal (Group CFO) — Chartered Accountant, Cornell University MBA in Finance, ex-VP at Bank of America Merrill Lynch. Chopra and Agrawal had previously co-founded FabFurnish, an online furniture marketplace, which gave them direct e-commerce experience before pivoting to the used car market."
          }
        },
        {
          "@type": "Question",
          "name": "When did CARS24 become a unicorn and what is its current valuation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CARS24 became India's first auto-tech unicorn on November 24, 2020, when it raised $200 million in its Series E round led by DST Global at a $1 billion+ valuation. Its peak valuation reached $3.3 billion in December 2021, following a $400 million Series G round led by Alpha Wave Global. Total funding raised is $1.08 billion across 12 rounds. As of early 2026, the company is preparing for an Indian IPO, which co-founder Gajendra Jangid confirmed is expected within 6–12 months, subject to market conditions and regulatory approvals."
          }
        },
        {
          "@type": "Question",
          "name": "What is CARS24's revenue and how does its business model work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CARS24 reported gross revenue of ₹6,917 crore in FY2024 (up 25% YoY) and ₹6,233 crore in FY2025 (a 10% decline attributed to the wholesale-to-retail mix shift). Its business model evolved from a pure C2B (consumer selling to CARS24's dealer network) to a full C2B2C platform: CARS24 now buys cars from sellers, reconditions them, and resells to consumers — earning revenue through transaction margins, service fees, NBFC lending (Loans24, with ₹1,637 crore disbursed in H1 FY26, up 38%), insurance, and ancillary services. In H1 FY26, adjusted net revenue grew 18% YoY to ₹651 crore and EBITDA loss narrowed 36% — signalling operational recovery ahead of the IPO."
          }
        },
        {
          "@type": "Question",
          "name": "Why did CARS24 acquire Team-BHP and CarInfo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Team-BHP (acquired April 2025) is India's most trusted automotive community and editorial platform — with millions of car enthusiasts who trust its reviews, advice, and discussions. CarInfo (acquired January 2026) is a vehicle information and management platform providing data on challans, fitness certificates, and ownership history. Both acquisitions serve CARS24's 'Version 2' strategy: building a comprehensive automotive ownership ecosystem beyond transactions. Team-BHP brings high-intent car buyers at the top of the funnel; CarInfo enables ongoing engagement after purchase, driving repeat revenue from insurance, compliance, and maintenance services. Together they are designed to make CARS24 the first touchpoint for any car-related decision in India."
          }
        },
        {
          "@type": "Question",
          "name": "What countries does CARS24 operate in and how is the international business performing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CARS24 operates in India (230+ cities), the UAE, Australia, and parts of Southeast Asia and the Middle East. The UAE business became CARS24's first international market to deliver a positive adjusted EBITDA — ₹9 crore in H1 FY2026. DP World's National Industrial Park (NIP) in the UAE is hosting a ₹550 million CARS24 auto hub creating 200 jobs (announced November 2025). Australia operates as a transaction platform for pre-owned vehicles. International transactions form part of the 85,000 cars transacted across all markets in H1 FY26."
          }
        },
        {
          "@type": "Question",
          "name": "How does CARS24 compare to CarDekho, Spinny, and OLX Autos in India's used-car market?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CARS24 is India's largest used-car transactional marketplace by funding ($1.08B total) and revenue (₹6,917 crore FY24). Unlike OLX (classifieds-only, no transaction guarantee) and CarDekho (primary classifieds + content), CARS24 is a full-stack transaction platform: it buys, inspects, reconditions, and resells vehicles with paperwork, RC transfer, financing, insurance, and a 30-day/999km return policy (introduced November 2025). Spinny similarly owns inventory and retails directly. CARS24 leads in scale, NBFC lending, and is the furthest advanced toward an IPO, having filed no DRHP yet but with H1 FY26 metrics — 18% revenue growth, 36% EBITDA loss reduction — signalling IPO readiness within the FY26 window."
          }
        }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Total Raised", v: "$1.08B" },
  { l: "Peak Valuation", v: "$3.3B" },
  { l: "Founded", v: "2015" },
  { l: "Revenue FY24", v: "₹6,917 Cr" },
  { l: "Cities", v: "230+" },
  { l: "Unicorn Since", v: "2020" },
]

const TIMELINE = [
  {
    year: "2013–15",
    event: "Vikram Chopra (IIT Bombay, Wharton MBA, ex-McKinsey, ex-Sequoia) and Mehul Agrawal (IIM Calcutta, ex-BCG) co-found FabFurnish — India's online furniture marketplace — and run it for two years. They observe one key insight: India's largest market failures are in high-value, low-frequency, high-trust consumer transactions. Cars are the next obvious candidate. Ruchit Agarwal (Cornell MBA, VP at BofA Merrill Lynch in the US) returns to India in 2014, meets the group through mutual friends. Gajendra Jangid (IIT Bombay, 9 years at Schlumberger) completes the founding quartet.",
  },
  {
    year: "2015",
    event: "CARS24 is founded in Gurugram. The founding model: a C2B transaction platform where car sellers book an appointment, visit a CARS24 branch, and complete a sale — including price discovery, payment, and RC transfer — in under one hour. This solves a problem everyone had lived: selling a used car in India meant weeks of classifieds listings, untrustworthy buyers, unsafe cash transactions, and incomplete paperwork. DST Global participates in the Series A at launch.",
  },
  {
    year: "2016–18",
    event: "Rapid geographic expansion. Series B and C funding. Exor (the Agnelli family's investment arm, owners of Ferrari and Juventus) invests in the Series C (2018), alongside Ontario Teachers' Pension Plan and KCK Global. CARS24 expands to 100+ cities across India. The used-bike vertical launches. CARS24 obtains its NBFC licence from the RBI in 2019 — creating CARS24 Financial Services and the ability to offer car loans.",
  },
  {
    year: "Oct 2019",
    event: "Series D: $100 million from Sequoia Capital India, KCK Global, Unbound, and Moore Strategic Ventures. CARS24 now present in 130+ cities, 210+ branches. Monthly transactions: 13,500. Annual run-rate: 1.5 lakh vehicles. MS Dhoni makes an undisclosed angel investment. The company begins piloting the C2B2C model — buying cars from consumers, reconditioning them, and reselling directly.",
  },
  {
    year: "Nov 2020",
    event: "India's first auto-tech unicorn. Series E: $200 million led by DST Global at a $1 billion+ valuation. CARS24 becomes the first used-car platform in India to achieve unicorn status. The pandemic had briefly threatened operations — CARS24 introduced home inspections and contactless transactions — but accelerated demand for used cars as consumers avoided public transport and delayed new vehicle purchases.",
  },
  {
    year: "Sep 2021",
    event: "Series F: $450 million — $340M equity + $110M debt. Led by SoftBank Vision Fund 2, Falcon Edge Capital, DST Global. Tencent participates. Valuation: $1.84 billion. CARS24 enters UAE (1,000 cars sold in first six months), Australia, and Thailand. The Singapore holding entity (Global Car Group Pte. Ltd.) converts to a public entity on October 20, 2021 — early IPO preparation.",
  },
  {
    year: "Dec 2021",
    event: "Series G: $400 million led by Alpha Wave Global (Falcon Edge's renamed successor), including $100M debt. Valuation reaches $3.3 billion — the peak. Total funding: $1.08 billion. CARS24 announces ₹75 crore ESOP buyback for employees — one of the largest in Indian startup history at the time. More than 90% market share among online car transaction platforms.",
  },
  {
    year: "FY2024",
    event: "Revenue peaks at ₹6,917 crore (FY2024), representing 25% YoY growth. Net loss: ₹498 crore. The company operates 4,000+ employees. Bengaluru R&D facility (second) opened October 2023. eChallan service launched. AI-powered pricing deployed across the platform. Retail's share of vehicle GMV growing rapidly; Loans24 loan disbursements scaling. Business restructured — Inspare (B2B spare parts), FourDoor (servicing), and AutoPilot (driver-on-demand) shut or wound down; 300+ jobs lost.",
  },
  {
    year: "Apr–Jan 2026",
    event: "Team-BHP acquired (April 2025). CarInfo acquired (January 2026). 30-day/999km return policy introduced (November 2025) — a first for Indian digital auto retail. UAE business becomes EBITDA-positive in H1 FY26. H1 FY26: adjusted revenue ₹651 crore (+18% YoY), EBITDA loss ₹162 crore (−36% YoY), 85,000 cars transacted. IPO confirmed as 'on the cards' within 6–12 months. Franchise-led expansion of India operations underway.",
  },
]

const COLS = [
  {
    h: "The Furniture Failure That Built the Car Company",
    b: `FabFurnish was not a failure. Not exactly. Vikram Chopra and Mehul Agrawal built it into one of India's larger online furniture platforms before the inevitable consolidation of 2016, when Urban Ladder and Pepperfry's capital advantages made the mid-tier players' margins impossible. But the years inside FabFurnish taught Chopra and Agrawal something that no McKinsey case or BCG deck ever could: what it felt like to run a capital-intensive, inventory-heavy, logistics-dependent e-commerce business in India, where the last mile was never clean and the customer was never quite satisfied with the product she got versus the product she saw on screen.\n\nThe insight that animated CARS24 in 2015 was drawn directly from that experience — and from a parallel observation that Gajendra Jangid had been sitting on through nine years at Schlumberger. Selling a used car in India was genuinely, spectacularly broken. It meant weeks on classifieds, tyre-kickers who never showed up, buyers who offered 40% below value, cash transactions in parking lots, RC transfers that took months, and no assurance of anything. Ruchit Agarwal, arriving back from four years as a VP at Bank of America Merrill Lynch in Los Angeles with a Cornell MBA and a CA behind him, had the financial infrastructure instinct the group needed. The four founders met through mutual friends and started brainstorming. Chopra and Agrawal wanted a market that was large enough. "Auto is very big in India," Ruchit later recalled Vikram saying. "Used cars was very attractive."\n\nCARs24 launched in 2015 in Gurugram. The first product was deceptively simple: book an appointment, drive to a branch, sell your car in under an hour. Everything — inspection, pricing, payment, RC transfer — handled in a single visit. It was not complex technology. It was relentless operational excellence applied to a process that India's 30 million used-car sellers had never once experienced without pain.`,
  },
  {
    h: "DST Global, SoftBank, the $3.3B Peak and India's First Auto Unicorn",
    b: `The investor who got there first was DST Global — Yuri Milner's firm, which had backed Swiggy, Byju's, and Ola, and which had been following the used-car segment globally. DST joined CARS24's Series A in 2015, a bet on both the market and on a founding team whose collective credentials — IIT Bombay twice, IIM Calcutta, Wharton, Cornell, McKinsey, BCG, Sequoia, BofA — were among the strongest assembled for a consumer tech company in India.\n\nThe unicorn moment arrived on November 24, 2020. Series E: $200 million, DST Global leading, valuation $1 billion. CARS24 was India's first auto-tech company to achieve unicorn status — reaching it in the middle of a pandemic that had, counterintuitively, driven demand for used cars as consumers avoided public transport and postponed new vehicle purchases. By September 2021, SoftBank Vision Fund 2, Falcon Edge, and DST came back together for the $450 million Series F. By December 2021, the Series G at $3.3 billion made CARS24 one of India's top twenty most valuable private companies. Exor, the Agnelli family's investment vehicle — owners of Ferrari, Juventus, and The Economist — had been on the cap table since 2018. Tencent joined in 2021. The Fiat family and the SoftBank-DST global tech capital complex backing the same used-car marketplace in Gurugram said something about how seriously the world's most sophisticated automotive and technology money was treating India's pre-owned vehicle market.\n\nAt peak, CARS24 had 90% market share among online transaction platforms, 230+ cities, 10,000+ channel partners, and ₹6,917 crore in gross revenue by FY2024.`,
  },
  {
    h: "Team-BHP, CarInfo, the UAE Pivot and the IPO That's Coming",
    b: `The FY2025 revenue decline — 10% to ₹6,233 crore — was explained by a deliberate strategic shift. CARS24 was moving from low-margin wholesale (B2B auctions to dealer networks) toward higher-margin retail (direct to consumer), and simultaneously shutting non-core businesses: Inspare (B2B spare parts), FourDoor (servicing), and AutoPilot (driver-on-demand). The restructuring cost 300+ jobs and looked painful from outside. Inside the company, it was called Version 2 — the profitable, IPO-ready incarnation of CARS24.\n\nThe acquisitions of Team-BHP (April 2025) and CarInfo (January 2026) were the content and data pillars of that version. Team-BHP is not just a forum — it is the institutional memory of every car ownership decision in India, with a community whose reviews, advice, and buying guides are trusted more than any manufacturer's marketing. CarInfo brings real-time vehicle compliance data — challan status, fitness certificates, ownership history — turning CARS24 into the platform car owners use not just to transact but to manage. In H1 FY26, transactions enabled by CarInfo grew 19x, generating ₹94 crore GMV.\n\nThe UAE, meanwhile, has become CARS24's first profitable international market — EBITDA-positive in H1 FY26. H1 FY26 adjusted revenue: ₹651 crore, up 18%. EBITDA loss: ₹162 crore, down 36%. Loan disbursements: ₹1,637 crore, up 38%. Co-founder Gajendra Jangid told Hindustan Times in September 2025: "We need to gain the confidence of not only customers but also investors." The IPO is on the cards, within 6–12 months of January 2026. Four IIT-IIM-McKinsey founders who started with a furniture company, pivoted to used cars, and built a billion-dollar institution are closing the loop.`,
  },
]

const PULL_QUOTE = {
  text: "Traditionally, car selling or buying has been a tiresome process, and only 2 in 100 people own cars in India. Over the last decade, we have been working continuously toward fulfilling the dreams of millions of Indians to own a car — by transforming the customer's journey into something hassle-free, safe, and transparent. That is the CARS24 way.",
  by: "Vikram Chopra, Co-Founder & Group CEO, CARS24",
}

const LESSON =
  "The best pivot is not a product pivot — it is a problem pivot. Vikram Chopra and Mehul Agrawal failed at furniture and found used cars. The market insight that drove CARS24 — that selling a car in India was humiliating, opaque, and dangerous — came directly from having lived the pain of India's broken high-value consumer markets once before. Failure in one problem domain often produces the sharpest founders in the next."

const INVESTORS = [
  "Alpha Wave Global (Lead, Series G Dec 2021 — $3.3B valuation)",
  "SoftBank Vision Fund 2 (Series F, Sep 2021)",
  "DST Global — Series A (2015), Series E (2020), Series F (2021)",
  "Falcon Edge Capital (Series F co-lead, Sep 2021)",
  "Tencent Holdings (Series F, Sep 2021)",
  "Exor Seeds — Agnelli Family Office (Series C, 2018)",
  "Sequoia Capital India / Peak XV Partners (Series D)",
  "Moore Strategic Ventures (Multiple rounds)",
  "KCK Global Limited (Series C, D)",
  "Ontario Teachers' Pension Plan (Series C)",
]

const MILESTONES = [
  "India's First Auto-Tech Unicorn — November 2020",
  "90%+ market share — online car transaction platforms",
  "₹6,917 crore revenue — FY2024 (peak)",
  "Team-BHP acquired — April 2025 (India's #1 auto community)",
  "CarInfo acquired — January 2026 (vehicle data platform)",
  "UAE EBITDA-positive — H1 FY2026 (first intl. profit)",
  "30-day/999km return policy — November 2025 (India first)",
  "IPO in 6–12 months — confirmed January 2026",
]

const FAQS = [
  {
    q: "What is the story of FabFurnish and why did Vikram Chopra and Mehul Agrawal leave it to start CARS24?",
    a: "FabFurnish was an online furniture marketplace co-founded by Vikram Chopra and Mehul Agrawal that operated from approximately 2012–2016 before consolidation pressure from better-capitalised rivals. The experience gave both founders deep operational knowledge of high-value, logistics-intensive Indian e-commerce — and, crucially, a first-hand understanding of the structural problems in India's high-ticket, low-frequency consumer markets. When they identified that selling a used car in India was a problem even more broken than furniture, they pivoted. CARS24's founding model — guaranteed transactions, pricing transparency, single-visit sale — was a direct application of the customer obsession they had been forced to develop at FabFurnish.",
  },
  {
    q: "What is CARS24 Financial Services and how big is the lending business?",
    a: "CARS24 Financial Services is CARS24's NBFC (non-banking financial company), licenced by the RBI in 2019. It operates as the Loans24 vertical, providing used car loans to buyers on the CARS24 platform — both for vehicles purchased from CARS24 and, in some cases, from other sources. In H1 FY2026, Loans24 disbursed ₹1,637 crore in loans, up 38% YoY. Income from financial services stood at ₹215 crore in FY2025. The lending business is a core profitability driver for the IPO narrative — it carries higher margins than the vehicle trading business and creates ongoing customer relationships with car owners.",
  },
  {
    q: "What happened to CARS24's international expansion — especially in Southeast Asia?",
    a: "CARS24 launched in UAE (April 2021), Australia (September 2021), and Thailand. The UAE business has become the most mature international market and achieved EBITDA profitability in H1 FY2026 — its first international positive EBITDA. DP World's National Industrial Park in the UAE is hosting a ₹550 million CARS24 auto hub (announced November 2025) creating 200 jobs. Australia continues to operate as a marketplace for pre-owned vehicles. Thailand operations have been scaled back as CARS24 consolidates focus on higher-performing markets. The company transacted 85,000 cars across all markets combined in H1 FY2026.",
  },
  {
    q: "Why did MS Dhoni invest in CARS24 and what happened to his stake?",
    a: "MS Dhoni made an undisclosed angel investment in CARS24 as part of the Series D round (2019), becoming a brand ambassador and early endorser at a time when CARS24 was using celebrity trust to overcome consumer hesitance about online used-car transactions. Dhoni later made a partial exit from CARS24 — reported in the context of CARS24's Singapore entity conversion to a public entity in October 2021. His involvement helped CARS24 at a key brand-building phase in its history, particularly in Tier 2 and Tier 3 cities where his credibility carries exceptional weight.",
  },
]

const RELATED = [
  { name: "Blue Energy Motors", slug: "blue-energy-motors", cat: "Green Trucks / EV", val: "$50M raised" },
  { name: "Ather Energy", slug: "ather-energy-ev", cat: "Electric Vehicles / IPO", val: "$502M raised" },
  { name: "BharatPe", slug: "bharatpe-fintech", cat: "Fintech / Payments", val: "$604M raised" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Cars24Page() {
  const accent = "#c2410c"
  const accentDark = "#9a3412"
  const accentBg = "#fff7ed"
  const accentBorder = "#fed7aa"

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
        CARS24 Founder Story — Vikram Chopra, Mehul Agrawal, Gajendra Jangid & Ruchit Agarwal | India's First Auto-Tech Unicorn | $1.08B Raised | IPO Bound | UpForge
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
            { n: "Auto Tech India", h: "/auto-tech-startups-india" },
            { n: "CARS24", h: "/startup/cars24-auto" },
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
            UpForge · Startup Registry · Auto Technology
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
            Edition · Auto Tech
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span
            className="text-[9px] font-black uppercase tracking-wider"
            style={{ color: accent }}
          >
            Used Cars &amp; Auto-Tech · March 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">Gurugram, Haryana</span>
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
                AUTO TECH / USED CARS
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">March 2026</span>
            </div>

            {/* Headline */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              They failed at furniture. They found used cars.{" "}
              <em style={{ color: accent }}>
                Four IIT–IIM founders, $1.08 billion, and India's first auto-tech unicorn — now IPO-bound.
              </em>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              In 2015, Vikram Chopra and Mehul Agrawal left a furniture startup with one conviction:
              India's most broken consumer market was used cars. With IIT Bombay classmate
              Gajendra Jangid and Cornell-trained CFO Ruchit Agarwal, they built CARS24 — the
              platform that organised 230+ cities, attracted SoftBank, DST, and the Agnelli family,
              reached ₹6,917 crore in revenue, and is now preparing to list on India's stock
              exchanges. The decade-long story of India's most consequential auto-tech company.
            </p>

            {/* Byline */}
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}
            >
              {[
                "By UpForge Editorial",
                "Gurugram, Haryana",
                "Est. 2015",
                "India's First Auto-Tech Unicorn",
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
                src="/Upforge-cars24-auto.webp"
                alt="Vikram Chopra, Mehul Agrawal, Gajendra Jangid, and Ruchit Agarwal — Co-Founders of CARS24 — UpForge Founder Chronicle"
                className="w-full object-cover object-top"
                style={{ height: "min(300px,60vw)", display: "block" }}
                loading="eager"
              />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>
                  Vikram Chopra, Mehul Agrawal, Gajendra Jangid & Ruchit Agarwal
                </p>
                <p
                  className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  Co-Founders · CARS24
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
                  src="/Upforge-cars24-auto.webp"
                  alt="Vikram Chopra, Mehul Agrawal, Gajendra Jangid, and Ruchit Agarwal — Co-Founders of CARS24 — UpForge Founder Chronicle"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3.5"
                  style={{
                    background: "linear-gradient(to top, rgba(12,7,2,0.96) 60%, transparent)",
                  }}
                >
                  <p className="pf text-white font-bold" style={{ fontSize: 13 }}>
                    Vikram Chopra, Mehul Agrawal, Gajendra Jangid & Ruchit Agarwal
                  </p>
                  <p
                    className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Co-Founders · CARS24
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.cars24.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: `1.5px solid ${accent}`, textDecoration: "none" }}
                  aria-label="Visit CARS24 official website"
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
                      cars24.com — Official Website
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/cars24/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View CARS24 on LinkedIn"
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
                      LinkedIn — CARS24
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
            Explore More Auto Tech & Indian Unicorns on UpForge
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "Auto Tech Startups India 2026", h: "/auto-tech-startups-india" },
              { l: "Indian Unicorns Full List", h: "/indian-unicorns" },
              { l: "CARS24 vs Spinny vs CarDekho", h: "/auto-tech-startups-india/cars24-vs-spinny-cardekho" },
              { l: "IIT Bombay Startups", h: "/iit-startups" },
              { l: "Indian Startup IPO Pipeline 2026", h: "/indian-startup-ipo-2026" },
              { l: "Used Car Market India Guide", h: "/auto-tech-startups-india/used-cars-india" },
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
            * Data sourced from Entrackr, Inc42, Tracxn, IPO Central, AIM Group, BusinessToday,
            Wikipedia, StartupTalky, TechStory, Indian Startup News, and CARS24 press releases and
            ROC filings as of March 2026. UpForge is an independent registry — no paid placements,
            no sponsored rankings. Revenue, valuation, and funding figures reflect the latest
            available public data including company announcements and regulatory filings.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "Auto Tech India", h: "/auto-tech-startups-india" },
                { l: "Indian Unicorns", h: "/indian-unicorns" },
                { l: "Startup Registry", h: "/startup" },
                { l: "Blue Energy Motors Profile", h: "/startup/blue-energy-motors" },
                { l: "Ather Energy Profile", h: "/startup/ather-energy-ev" },
                { l: "BharatPe Profile", h: "/startup/bharatpe-fintech" },
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
