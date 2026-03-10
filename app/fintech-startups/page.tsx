// app/fintech-startups/page.tsx
// ─── TARGET KEYWORDS ────────────────────────────────────────────────────────
// "fintech startups India"             ~28,000/mo
// "best fintech companies India 2026"  ~11,000/mo
// "fintech unicorns India"             ~7,200/mo
// ────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — exact match to app/page.tsx + blog page:
//   bg: #F3EFE5  breadcrumb: #EDE9DF  ink: #1A1208
//   card-gap: 1.5px #1A1208  card-bg: #FDFCF9
//   sector accent: #2563EB (blue)
//   fonts: Playfair Display · Georgia · system-ui
// ────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight, ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Fintech Startups India 2026 — Top Financial Technology Companies & Founders | UpForge",
  description:
    "Complete guide to India's Fintech startups in 2026 — Zerodha, CRED, Razorpay, PhonePe, Groww, Paytm and more. 23 unicorns, $1.6B raised in 2025. Profiles, playbooks, and lessons from India's most valuable financial technology founders.",
  keywords: "fintech startups India, fintech companies India 2026, Zerodha founder Nithin Kamath, CRED Kunal Shah, Razorpay, PhonePe, Groww, Paytm Vijay Shekhar Sharma, fintech unicorns India, wealthtech India, payments India, UPI startups",
  alternates: { canonical: "https://upforge.in/fintech-startups" },
  openGraph: {
    title: "Fintech Startups India 2026 — Top FinTech Companies | UpForge",
    description: "23 unicorns. $1.6B raised in 2025. Profiles, playbooks, and lessons from India's top Fintech founders — Zerodha, CRED, Razorpay, PhonePe, Groww.",
    url: "https://upforge.in/fintech-startups",
    siteName: "UpForge", locale: "en_IN", type: "article",
    images: [{ url: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&q=85", width: 1200, height: 630, alt: "Fintech startups India 2026" }],
  },
  twitter: { card: "summary_large_image", site: "@upforge_in", title: "Fintech Startups India 2026 | UpForge", images: ["https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&q=85"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
}

const COMPANIES = [
  {
    name: "Zerodha",
    nameShort: "Zerodha",
    founder: "Nithin Kamath",
    role: "Co-founder & CEO",
    city: "Bengaluru",
    founded: "2010",
    valuation: "$8.2B",
    funding: "₹0 VC raised",
    sector: "WealthTech · Bootstrapped",
    accent: "#2563EB",
    accentBg: "#EFF6FF",
    accentBorder: "#BFDBFE",
    slug: "zerodha",
    imgSrc: "https://www.businessoutreach.in/wp-content/uploads/2023/08/Nithin-Kamath-1.jpg",
    initials: "NK",
    philosophy: "Profitability before growth — always",
    quote: "Every rupee we earn, we earn because we deserve it — not because we raised it.",
    why: "The most studied bootstrapped unicorn in Indian startup history. Kamath built India's largest stockbroker with zero outside capital by flipping the brokerage model — ₹20 flat fee vs percentage-based pricing. The anti-VC playbook that every second-generation founder is reading.",
    keyInsight: "Zerodha is proof that the most valuable fintech business in India was built without a single rupee of VC money. Nithin Kamath's posts on unit economics, capital efficiency, and why he never raised money are required reading for every Indian founder — in any sector.",
    tags: ["Bootstrapped", "No VC", "$8.2B Valuation"],
  },
  {
    name: "CRED",
    nameShort: "CRED",
    founder: "Kunal Shah",
    role: "Founder & CEO",
    city: "Bengaluru",
    founded: "2018",
    valuation: "$6.4B",
    funding: "$1.4B",
    sector: "Consumer Fintech",
    accent: "#111827",
    accentBg: "#F3F4F6",
    accentBorder: "#9CA3AF",
    slug: "cred",
    imgSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    initials: "KS",
    philosophy: "Understand psychology before you understand the market",
    quote: "CRED exists because India under-rewards financial discipline. We are fixing that.",
    why: "Kunal Shah built a $6.4B company by paying people to pay their credit card bills on time. The insight — that creditworthy users are under-rewarded by India's financial system — is deceptively simple. His Delta 4 framework is the most shared product philosophy in Indian startup culture.",
    keyInsight: "Shah's thesis: any product that creates a Delta 4 improvement in outcomes (4x better than the status quo) becomes a habit. CRED is not a payments company — it is a trust infrastructure for India's 12M creditworthy consumers. Every fintech founder should understand how he built trust as a moat.",
    tags: ["Delta 4 Framework", "12M+ Members", "Trust-First"],
  },
  {
    name: "Razorpay",
    nameShort: "Razorpay",
    founder: "Harshil Mathur",
    role: "Co-founder & CEO",
    city: "Bengaluru",
    founded: "2014",
    valuation: "$7.5B",
    funding: "$741M",
    sector: "Payments Infrastructure",
    accent: "#3B82F6",
    accentBg: "#EFF6FF",
    accentBorder: "#93C5FD",
    slug: "razorpay",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    initials: "HM",
    philosophy: "Developer experience is a go-to-market strategy",
    quote: "We won SMBs because developers loved us. Developers loved us because we treated them like the actual customer.",
    why: "Harshil Mathur and Shashank Kumar built Razorpay by solving the problem every Indian developer hated: integrating payments. Developer-first API design won the SMB market, then scaled to enterprise. $80B+ in annualised TPV. The playbook for selling to businesses through engineers.",
    keyInsight: "Razorpay's insight is that in B2B software, the technical buyer (the developer) makes or breaks adoption before the business buyer ever gets involved. Build for the developer's delight first. The enterprise sale follows. This applies to every B2B startup — not just fintech.",
    tags: ["Developer-First", "$80B+ TPV", "API-Led Growth"],
  },
  {
    name: "PhonePe",
    nameShort: "PhonePe",
    founder: "Sameer Nigam",
    role: "Co-founder & CEO",
    city: "Bengaluru",
    founded: "2015",
    valuation: "$12B",
    funding: "$850M",
    sector: "Payments · UPI Leader",
    accent: "#7C3AED",
    accentBg: "#F5F3FF",
    accentBorder: "#C4B5FD",
    slug: "phonepe",
    imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    initials: "SN",
    philosophy: "Own the payment moment, own the relationship",
    quote: "UPI is the greatest financial infrastructure gift India has given itself. Our job is to make it magical for every Indian.",
    why: "Sameer Nigam built PhonePe into India's #1 UPI app — handling 50%+ of all UPI transactions. Post-Walmart acquisition of Flipkart, PhonePe spun out independently and is now expanding into broking, insurance, and ONDC. The lesson: owning the payment moment means owning the customer's entire financial life.",
    keyInsight: "PhonePe's strategic insight is that a payment is never just a payment — it is a data point, a trust signal, and a distribution channel for every financial product. Their expansion from UPI into insurance, wealth, and commerce is the most deliberate financial super-app play in India.",
    tags: ["50%+ UPI Share", "$12B Valuation", "Super App Strategy"],
  },
  {
    name: "Groww",
    nameShort: "Groww",
    founder: "Lalit Keshre",
    role: "Co-founder & CEO",
    city: "Bengaluru",
    founded: "2016",
    valuation: "$3B",
    funding: "$592M",
    sector: "WealthTech · IPO Pipeline",
    accent: "#059669",
    accentBg: "#ECFDF5",
    accentBorder: "#6EE7B7",
    slug: "groww",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    initials: "LK",
    philosophy: "Simplicity is the most underrated competitive advantage",
    quote: "Zerodha was brilliant for traders. We built Groww for the person who had never invested before.",
    why: "Lalit Keshre built Groww by making mutual fund investment feel as simple as Instagram — for first-time investors who found Zerodha's interface too complex. They captured 35M+ investors in 8 years. IPO discussions are ongoing for 2026 — the most anticipated fintech listing of the year.",
    keyInsight: "Groww's product lesson is that simplicity is not a feature — it is a market. The 50M Indians who invested for the first time post-COVID did not want power features. They wanted confidence. Groww designed for that confidence, and Zerodha's complexity became their distribution channel.",
    tags: ["35M+ Investors", "IPO 2026", "First-Timer Focus"],
  },
  {
    name: "Paytm",
    nameShort: "Paytm",
    founder: "Vijay Shekhar Sharma",
    role: "Founder & CEO",
    city: "Noida",
    founded: "2010",
    valuation: "NSE Listed",
    funding: "$3B+ raised",
    sector: "Super App · Listed",
    accent: "#0284C7",
    accentBg: "#EFF6FF",
    accentBorder: "#7DD3FC",
    slug: "paytm",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    initials: "VS",
    philosophy: "Build for India before India knew it needed you",
    quote: "I started Paytm when there was no smartphone revolution. I did not wait for the infrastructure. I built it.",
    why: "Vijay Shekhar Sharma built a digital wallet before most Indians had smartphones — and then demonetisation gave Paytm its defining moment. 350M users in months. Post-IPO and RBI action, Paytm is restructuring around its core payments business. The story of India's first payments unicorn is a masterclass in timing, regulatory risk, and resilience.",
    keyInsight: "Paytm's lesson is double-edged: being the first mover on a government-mandated platform shift (demonetisation, UPI) creates explosive growth that cannot be replicated. But it also creates regulatory dependency that no business model can fully hedge. Vijay Shekhar Sharma's resilience through the RBI action is as important as his growth story.",
    tags: ["Listed NSE", "300M+ Users", "First-Mover Story"],
  },
]

const ECOSYSTEM_STATS = [
  { v: "23",     l: "Fintech Unicorns" },
  { v: "$1.6B",  l: "Raised in 2025" },
  { v: "900M+",  l: "UPI Users" },
  { v: "$200B",  l: "Market by 2030" },
]

const TRAITS = [
  { no: "01", trait: "UPI is the Foundation",               desc: "Every fintech that survived the last 5 years has UPI at its core — either as a product (PhonePe, Paytm) or as distribution infrastructure (Razorpay, CRED). The stack matters more than the app." },
  { no: "02", trait: "Trust Compounds Into Valuation",       desc: "CRED, Zerodha, and Groww all built trust before they built features. Their NPS scores are consistently the highest in their categories. In financial services, trust is not soft — it is the competitive moat." },
  { no: "03", trait: "Developer Love Creates B2B Scale",    desc: "Razorpay's developer-first approach is the template for every B2B fintech. The engineer who integrates your API on a side project becomes your enterprise champion three years later." },
  { no: "04", trait: "Bootstrapping Proves the Model",      desc: "Zerodha's $8.2B valuation with zero VC money permanently changed how Indian founders think about capital. Not every company should be bootstrapped — but every founder should be able to articulate why they cannot be." },
  { no: "05", trait: "Regulatory Literacy is a Moat",       desc: "Indian fintech is one of the most regulated sectors in the world. Founders who deeply understand RBI, SEBI, and IRDAI frameworks — and build with them, not around them — outlast every compliance-averse competitor." },
  { no: "06", trait: "The Platform Owns the Relationship",  desc: "PayTm and PhonePe proved that owning the payment moment means owning the customer's financial life. Lending, insurance, investments — all of it flows from the first payment." },
]

const TRENDS = [
  { num: "01", title: "Credit on UPI — India's Next $50B Opportunity",   body: "RBI's credit line on UPI framework is creating an entirely new category of embedded credit products. Every UPI transaction is now a potential lending moment. Fintech companies with NBFC licences and UPI distribution are best positioned for this wave." },
  { num: "02", title: "B2B Fintech Outpacing Consumer in Every Metric",  body: "SMB payments, supply chain lending, payroll fintech, and trade finance are growing faster than consumer apps. The business owner segment has higher LTV, lower churn, and more predictable revenue than any consumer cohort." },
  { num: "03", title: "GIFT City — Cross-Border Fintech Opens Up",       body: "GIFT City's IFSCA framework is becoming India's regulatory sandbox for global fintech ambitions. Startups building cross-border remittance, global accounts, and forex products are finding a dramatically friendlier path through Gujarat." },
  { num: "04", title: "Alternative Credit Scoring Goes Mainstream",      body: "ML models using telecom data, utility payments, and UPI transaction history are approving thin-file customers in under 60 seconds. 400M+ Indians who were invisible to credit bureaus are now lendable — with the right data model." },
  { num: "05", title: "Neobanking Pivots to Profitability",              body: "Every neobank that raised at 2021 valuations is now restructuring around higher-margin products. The 'bank for millennials' brand alone no longer attracts capital. Niyo and Jupiter have both pivoted to SMB banking, where margins are 3x consumer." },
  { num: "06", title: "IPO Supercycle — Fintech Goes Public",            body: "Groww is the most anticipated fintech IPO of 2026. Razorpay and PhonePe are targeting 2026–27 listings. After BYJU's destroyed EdTech valuations, public markets are actually rewarding profitable fintech — the sector's most important credibility moment." },
]

const FAQS = [
  { q: "Which is the most valuable fintech startup in India?",     a: "PhonePe leads at $12B valuation. Zerodha follows at $8.2B, Razorpay at $7.5B, CRED at $6.4B. India has 23 fintech unicorns as of March 2026. The sector's combined value exceeds $80B." },
  { q: "Is Zerodha profitable without VC funding?",                a: "Yes. Zerodha reported net profit of ₹4,700 crore for FY2024 — making it India's most profitable broker. They have never raised external capital in 15 years of operations. Their bootstrapped path to unicorn status is studied in every Indian business school." },
  { q: "What is the fintech market size in India 2026?",           a: "India's fintech market was $110B in 2024 and is projected to reach $200B by 2030. Payments is the largest segment, followed by lending ($25B market) and wealthtech ($15B market). The total addressable market expands further with 400M+ unbanked or thin-file individuals." },
  { q: "Which Indian fintech companies are going public in 2026?", a: "Groww is the most anticipated fintech IPO for 2026. Razorpay and PhonePe are targeting 2026–2027 listings. Zerodha has consistently stated it has no IPO plans, despite persistent market speculation." },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage", "@id": "https://upforge.in/fintech-startups",
      url: "https://upforge.in/fintech-startups",
      name: "Fintech Startups India 2026 — Complete Guide | UpForge",
      dateModified: "2026-03-10",
      isPartOf: { "@type": "WebSite", name: "UpForge", url: "https://upforge.in" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://upforge.in" },
          { "@type": "ListItem", position: 2, name: "Indian Startups", item: "https://upforge.in/indian-startups" },
          { "@type": "ListItem", position: 3, name: "Fintech Startups", item: "https://upforge.in/fintech-startups" },
        ],
      },
    },
    {
      "@type": "Article",
      headline: "Fintech Startups India 2026 — Complete Sector Guide",
      author: { "@type": "Organization", name: "UpForge", url: "https://upforge.in" },
      datePublished: "2026-03-10", dateModified: "2026-03-10",
      about: COMPANIES.map(c => ({ "@type": "Organization", name: c.name, founder: { "@type": "Person", name: c.founder } })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@type": "ItemList",
      name: "Top Fintech Startups India 2026",
      numberOfItems: COMPANIES.length,
      itemListElement: COMPANIES.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: `${c.name} — ${c.sector}`, url: `https://upforge.in/startup/${c.slug}` })),
    },
  ],
}

export default function FintechStartupsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F3EFE5", fontFamily: "'Georgia','Times New Roman',serif", color: "#1A1208" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap');
        .pf { font-family: 'Playfair Display', Georgia, serif !important; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
        .fu  { animation: fadeUp .5s ease both; }
        .fu1 { animation-delay:.04s } .fu2 { animation-delay:.12s } .fu3 { animation-delay:.2s }
        .fu4 { animation-delay:.28s } .fu5 { animation-delay:.36s } .fu6 { animation-delay:.44s }
        .dropcap::first-letter {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 4rem; font-weight: 900; line-height: 0.82;
          float: left; margin-right: 0.07em; margin-top: 0.07em; color: #1A1208;
        }
        @media (max-width:639px) {
          .dropcap::first-letter { font-size: 3rem; }
          .company-grid { grid-template-columns: 1fr !important; }
          .hero-rule { display:none; }
        }
        .company-card:hover .card-inner { transform:translateY(-2px); box-shadow:0 8px 32px rgba(26,18,8,.10); transition:all .22s ease; }
        .card-inner { transition: all .22s ease; }
        .tag-pill { display:inline-block; font-family:system-ui,sans-serif; font-size:8px; font-weight:800; letter-spacing:.24em; text-transform:uppercase; padding:3px 10px; border:1px solid currentColor; }
        .nbtn:hover { background:#1A1208 !important; color:white !important; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:#C8C2B4; }
        details summary::-webkit-details-marker { display:none; }
        details[open] .faq-chev { transform:rotate(90deg); }
        .faq-chev { transition:transform .2s ease; }
      `}</style>

      {/* BREADCRUMB */}
      <nav style={{ background: "#EDE9DF", borderBottom: "1px solid #C8C2B4", fontFamily: "system-ui,sans-serif" }} aria-label="Breadcrumb">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-2.5">
          <ol className="flex flex-wrap items-center gap-1.5" itemScope itemType="https://schema.org/BreadcrumbList">
            {[["Home", "/"], ["Indian Startups", "/indian-startups"], ["Fintech Startups", "#"]].map(([label, href], i) => (
              <li key={label} className="flex items-center gap-1.5" itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                {href === "#"
                  ? <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#1A1208" }} itemProp="name">{label}</span>
                  : <Link href={href} className="text-[10px] uppercase tracking-wider hover:text-[#1A1208] transition-colors" style={{ color: "#AAA" }} itemProp="item"><span itemProp="name">{label}</span></Link>}
                <meta itemProp="position" content={String(i + 1)} />
                {i < 2 && <ChevronRight className="w-3 h-3" style={{ color: "#C8C2B4" }} />}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* MASTHEAD */}
      <header className="fu fu1" style={{ background: "#F3EFE5", borderBottom: "3px solid #1A1208" }}>
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between flex-wrap gap-3 py-3" style={{ borderBottom: "1px solid #C8C2B4" }}>
            <div className="flex items-center gap-2" style={{ fontFamily: "system-ui,sans-serif" }}>
              <span className="w-6 h-px" style={{ background: "#2563EB" }} />
              <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "#AAA" }}>UpForge Intelligence · March 2026 · Fintech Sector</span>
            </div>
            <span className="text-[8.5px] font-black uppercase tracking-[0.2em] px-3 py-1.5 border" style={{ color: "#2563EB", borderColor: "#2563EB", fontFamily: "system-ui,sans-serif" }}>Sector Guide</span>
          </div>
          <div className="text-center py-10 sm:py-14" style={{ borderBottom: "1px solid #C8C2B4" }}>
            <h1 className="pf font-black leading-[1.04] tracking-tight text-[#1A1208]" style={{ fontSize: "clamp(2rem,5.5vw,4.4rem)", marginBottom: 16 }}>
              Fintech Startups India
              <br />
              <em className="pf italic" style={{ color: "#2563EB" }}>The Complete Guide</em> — 2026
            </h1>
            <p className="italic leading-[1.72] max-w-2xl mx-auto" style={{ fontSize: "clamp(14px,2vw,17px)", color: "#5A4A30", marginBottom: 20 }}>
              The companies, founders, playbooks, and hard lessons that define India's financial technology sector — from Zerodha's ₹0 VC playbook to Paytm's demonetisation moment and everything built on UPI in between.
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 sm:w-28" style={{ background: "#C8C2B4" }} />
              <span style={{ color: "#C8C2B4", fontSize: 14 }}>✦</span>
              <div className="h-px w-16 sm:w-28" style={{ background: "#C8C2B4" }} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 py-3" style={{ fontFamily: "system-ui,sans-serif" }}>
            {["By UpForge Editorial", "24 min read", "Updated March 2026", "6 company profiles"].map((item, i, arr) => (
              <span key={i} className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-wider" style={{ color: "#AAA" }}>{item}</span>
                {i < arr.length - 1 && <span style={{ color: "#C8C2B4", fontSize: 12 }}>·</span>}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* BODY */}
      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 pb-24" itemScope itemType="https://schema.org/Article">
        <meta itemProp="headline" content="Fintech Startups India 2026 — Complete Sector Guide" />
        <meta itemProp="datePublished" content="2026-03-10" />
        <meta itemProp="author" content="UpForge Editorial" />

        {/* Hero image */}
        <figure className="fu fu1" style={{ margin: "clamp(20px,4vw,36px) 0", borderBottom: "1px solid #C8C2B4", paddingBottom: "clamp(20px,4vw,36px)" }}>
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&q=85"
              alt="India fintech payments UPI digital transactions — the infrastructure that built 23 unicorns"
              style={{ width: "100%", height: "clamp(200px,32vw,400px)", objectFit: "cover", display: "block", filter: "sepia(18%) contrast(105%)" }}
              loading="eager"
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(243,239,229,0) 60%, rgba(243,239,229,0.55) 100%)" }} />
          </div>
          <figcaption className="mt-2 italic" style={{ fontSize: 10, color: "#BBB0A0", fontFamily: "system-ui,sans-serif" }}>
            India's UPI stack processes more digital transactions than the US and Europe combined — the infrastructure advantage that every fintech company below is built upon.
          </figcaption>
        </figure>

        {/* Intro */}
        <section className="fu fu2" style={{ maxWidth: 780, marginBottom: "clamp(24px,4vw,40px)", paddingBottom: "clamp(20px,4vw,36px)", borderBottom: "1px solid #C8C2B4" }} itemProp="articleBody">
          <p className="dropcap leading-[1.88]" style={{ fontSize: "clamp(14px,1.6vw,16px)", marginBottom: 16, color: "#2C2010", fontFamily: "'Georgia','Times New Roman',serif" }}>
            India built the world's most sophisticated digital payment infrastructure — Aadhaar, UPI, DigiLocker — and then handed it to a generation of founders who understood how to use it. The result is 23 fintech unicorns, a $200B market by 2030, and a set of companies that have more combined users than the entire population of the United States. What makes Indian fintech exceptional is not the technology. It is the founders' understanding of the Indian customer — their relationship with money, their distrust of legacy institutions, and their aspirational hunger for financial inclusion.
          </p>
          <p style={{ fontSize: "clamp(14px,1.6vw,16px)", lineHeight: 1.88, color: "#2C2010", fontFamily: "'Georgia','Times New Roman',serif" }}>
            The companies profiled below represent the full spectrum of that story — from the bootstrapped contrarian (Zerodha) to the trust-first consumer brand (CRED), the developer-first infrastructure play (Razorpay), and the government-infrastructure surfer (Paytm). Each one teaches a different lesson about what it means to build a financial product for India.
          </p>
        </section>

        {/* Why strip */}
        <div className="fu fu2 grid sm:grid-cols-3" style={{ marginBottom: "clamp(28px,4vw,48px)", border: "2px solid #1A1208", gap: "1.5px", background: "#1A1208" }}>
          {[
            ["The UPI Advantage", "India's UPI stack is the world's most advanced payment infrastructure — and it is free, open-source, and available to every startup. The startups that understood this early built the most defensible businesses."],
            ["Trust as the Moat", "CRED, Zerodha, and Groww all prioritised trust over growth. In financial services, trust is not a brand attribute — it is the product. Losing it is an existential event. Building it is a decades-long moat."],
            ["700M Unserved Indians", "India has 700M people without formal credit scores. The most valuable fintech opportunity in the world is not competing with Zerodha — it is lending to the thin-file customer that every traditional bank ignores."],
          ].map(([t, d]) => (
            <div key={String(t)} style={{ background: "#FDFCF9", padding: "clamp(14px,2.5vw,24px)", borderTop: "3px solid #2563EB" }}>
              <p className="pf" style={{ fontSize: 13.5, fontWeight: 700, color: "#1A1208", margin: "0 0 8px", lineHeight: 1.4 }}>{t}</p>
              <p style={{ fontSize: 11.5, color: "#5A4A30", margin: 0, fontFamily: "system-ui,sans-serif", lineHeight: 1.65 }}>{d}</p>
            </div>
          ))}
        </div>

        {/* Ecosystem stats */}
        <div className="fu fu2 grid grid-cols-2 sm:grid-cols-4" style={{ border: "2px solid #1A1208", background: "#1A1208", gap: "1.5px", marginBottom: "clamp(28px,4vw,48px)" }}>
          {ECOSYSTEM_STATS.map((s, i) => (
            <div key={i} style={{ background: "#FDFCF9", padding: "clamp(12px,2.5vw,20px)" }}>
              <p className="pf font-black leading-none" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#2563EB", marginBottom: 6 }}>{s.v}</p>
              <p className="text-[9px] uppercase tracking-[0.18em]" style={{ color: "#AAA", fontFamily: "system-ui,sans-serif", margin: 0 }}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Section rule */}
        <div className="fu fu3 flex items-center gap-3 mb-8" style={{ paddingTop: "clamp(16px,3vw,24px)", borderTop: "2px solid #1A1208" }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: "#B45309", letterSpacing: ".2em", fontFamily: "system-ui,sans-serif" }}>§01</span>
          <h2 className="pf" style={{ fontSize: "clamp(1.2rem,2.5vw,1.8rem)", fontWeight: 900, margin: 0 }}>India's Top Fintech Companies — Profiles & Playbooks</h2>
          <div className="hero-rule flex-1 h-px" style={{ background: "#C8C2B4" }} />
        </div>

        {/* Company profiles */}
        <div className="fu fu3 space-y-0" role="list">
          {COMPANIES.map((c, i) => (
            <div key={i} className="company-card" role="listitem" itemScope itemType="https://schema.org/Organization">
              <meta itemProp="name" content={c.name} />
              <meta itemProp="foundingDate" content={c.founded} />

              <div className="card-inner company-grid grid" style={{ gridTemplateColumns: "1fr clamp(160px,20%,200px)", border: "1.5px solid #1A1208", marginBottom: "1.5px", background: "#1A1208", gap: "1.5px" }}>
                <div style={{ background: "#FDFCF9", padding: "clamp(16px,3vw,28px)", order: i % 2 === 0 ? 0 : 1 }}>
                  <div className="flex flex-wrap items-baseline gap-3 mb-1" style={{ paddingBottom: 10, borderBottom: `2px solid ${c.accent}` }}>
                    <h3 className="pf" style={{ fontSize: "clamp(1.2rem,2.5vw,1.55rem)", fontWeight: 900, color: "#1A1208", margin: 0, lineHeight: 1.1 }}>{c.name}</h3>
                    <span className="tag-pill" style={{ color: c.accent, borderColor: c.accent }}>{c.sector}</span>
                    <span style={{ fontSize: 10, color: "#AAA", fontFamily: "system-ui,sans-serif" }}>{c.city} · Est. {c.founded}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-3 mb-4" style={{ fontFamily: "system-ui,sans-serif" }}>
                    <span style={{ fontSize: 9, color: "#AAA", textTransform: "uppercase", letterSpacing: ".12em" }}>Founder</span>
                    <span style={{ color: "#C8C2B4" }}>·</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1208" }}>{c.founder}</span>
                    {c.tags.map(t => (
                      <span key={t} style={{ fontSize: 8, color: c.accent, border: `1px solid ${c.accentBorder}`, background: c.accentBg, padding: "1px 7px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", fontFamily: "system-ui,sans-serif" }}>{t}</span>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#AAA", fontFamily: "system-ui,sans-serif", marginBottom: 5 }}>Why It Matters</p>
                      <p style={{ fontSize: 12.5, color: "#5A4A30", lineHeight: 1.7, marginBottom: 14, fontFamily: "'Georgia',serif" }}>{c.why}</p>
                      <blockquote style={{ background: "#F3EFE5", borderLeft: `3px solid ${c.accent}`, padding: "10px 14px", margin: 0 }}>
                        <p className="pf italic" style={{ fontSize: 13, color: "#2C2010", margin: 0, lineHeight: 1.68 }}>"{c.quote}"</p>
                        <p style={{ fontSize: 9, color: "#AAA", fontFamily: "system-ui,sans-serif", margin: "6px 0 0", textTransform: "uppercase", letterSpacing: ".14em" }}>— {c.founder}, {c.name}</p>
                      </blockquote>
                    </div>
                    <div>
                      <div style={{ background: "#FEF3C7", border: "1px solid #FDE68A", padding: "10px 12px", marginBottom: 12 }}>
                        <p style={{ fontSize: 9, fontWeight: 700, color: "#92400E", fontFamily: "system-ui,sans-serif", textTransform: "uppercase", letterSpacing: ".14em", margin: "0 0 5px" }}>Key Insight</p>
                        <p style={{ fontSize: 12, color: "#78350F", margin: 0, fontFamily: "system-ui,sans-serif", lineHeight: 1.65 }}>{c.keyInsight}</p>
                      </div>
                      <div style={{ marginBottom: 14 }}>
                        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#AAA", fontFamily: "system-ui,sans-serif", marginBottom: 4 }}>Core Philosophy</p>
                        <p className="pf italic" style={{ fontSize: 13, color: c.accent, fontWeight: 700, margin: 0, lineHeight: 1.4 }}>{c.philosophy}</p>
                      </div>
                      <div className="grid grid-cols-2" style={{ border: "1px solid #D8D2C4", marginBottom: 14 }}>
                        {[{ l: "Valuation", v: c.valuation }, { l: "Founded", v: c.founded }].map((s, si) => (
                          <div key={si} style={{ padding: "8px 10px", borderRight: si === 0 ? "1px solid #D8D2C4" : "none" }}>
                            <p style={{ fontSize: 8, color: "#AAA", fontFamily: "system-ui,sans-serif", textTransform: "uppercase", letterSpacing: ".12em", margin: "0 0 2px" }}>{s.l}</p>
                            <p className="pf" style={{ fontSize: "1.1rem", fontWeight: 900, color: "#1A1208", margin: 0, lineHeight: 1 }}>{s.v}</p>
                          </div>
                        ))}
                      </div>
                      <Link href={`/startup/${c.slug}`} className="inline-flex items-center gap-1.5" style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: c.accent, textDecoration: "none", fontFamily: "system-ui,sans-serif", borderBottom: `1px solid ${c.accentBorder}`, paddingBottom: 1 }}>
                        View {c.name} Profile <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div style={{ background: c.accent, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", textAlign: "center", padding: "clamp(16px,3vw,28px) clamp(10px,2vw,18px)", order: i % 2 === 0 ? 1 : 0, position: "relative", overflow: "hidden", minHeight: 180 }}>
                  <div style={{ width: "100%", flex: 1, position: "relative", marginBottom: 12, overflow: "hidden" }}>
                    <img
                      src={c.imgSrc}
                      alt={`${c.founder}, ${c.name} founder`}
                      style={{ width: "100%", height: "clamp(100px,15vw,180px)", objectFit: "cover", objectPosition: "top", display: "block", opacity: 0.88, filter: "contrast(108%) saturate(85%)" }}
                      onError={(e) => {
                        const t = e.target as HTMLImageElement
                        t.style.display = "none"
                        const fb = t.nextSibling as HTMLElement
                        if (fb) fb.style.display = "flex"
                      }}
                    />
                    <div style={{ display: "none", width: "100%", height: "clamp(100px,15vw,180px)", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,.15)", fontSize: "2rem", fontFamily: "Georgia,serif", fontWeight: 900, color: "#fff" }}>{c.initials}</div>
                  </div>
                  <div>
                    <p className="pf font-black" style={{ fontSize: "clamp(.95rem,1.8vw,1.2rem)", color: "#FDFCF9", lineHeight: 1.15, margin: "0 0 3px" }}>{c.name}</p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,.65)", margin: "0 0 5px", fontFamily: "system-ui,sans-serif" }}>{c.founder}</p>
                    <p style={{ fontSize: 9, color: "rgba(255,255,255,.45)", fontFamily: "system-ui,sans-serif", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>{c.funding}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Traits */}
        <div className="fu fu4 flex items-center gap-3 mb-6 mt-14" style={{ paddingTop: "clamp(16px,3vw,24px)", borderTop: "2px solid #1A1208" }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: "#B45309", letterSpacing: ".2em", fontFamily: "system-ui,sans-serif" }}>§02</span>
          <h2 className="pf" style={{ fontSize: "clamp(1.2rem,2.5vw,1.8rem)", fontWeight: 900, margin: 0 }}>6 Patterns Every Great Indian Fintech Shares</h2>
          <div className="hero-rule flex-1 h-px" style={{ background: "#C8C2B4" }} />
        </div>
        <div className="fu fu4 grid sm:grid-cols-2 lg:grid-cols-3" style={{ border: "1.5px solid #1A1208", background: "#1A1208", gap: "1.5px", marginBottom: "clamp(28px,4vw,48px)" }}>
          {TRAITS.map(({ no, trait, desc }) => (
            <div key={no} style={{ background: "#FDFCF9", padding: "clamp(14px,2.5vw,22px)" }}>
              <div className="flex items-baseline gap-2.5" style={{ marginBottom: 8 }}>
                <span className="pf" style={{ fontSize: "1.6rem", fontWeight: 900, color: "#E8C547", lineHeight: 1, flexShrink: 0 }}>{no}</span>
                <p className="pf" style={{ fontSize: 13, fontWeight: 700, color: "#1A1208", margin: 0, lineHeight: 1.3 }}>{trait}</p>
              </div>
              <p style={{ fontSize: 11.5, color: "#5A4A30", margin: 0, fontFamily: "system-ui,sans-serif", lineHeight: 1.68 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Trends */}
        <div className="fu fu4 flex items-center gap-3 mb-6" style={{ paddingTop: "clamp(16px,3vw,24px)", borderTop: "2px solid #1A1208" }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: "#B45309", letterSpacing: ".2em", fontFamily: "system-ui,sans-serif" }}>§03</span>
          <h2 className="pf" style={{ fontSize: "clamp(1.2rem,2.5vw,1.8rem)", fontWeight: 900, margin: 0 }}>Key Trends Shaping Indian Fintech in 2026</h2>
          <div className="hero-rule flex-1 h-px" style={{ background: "#C8C2B4" }} />
        </div>
        <div className="fu fu4 space-y-[1.5px]" style={{ border: "1.5px solid #1A1208", background: "#1A1208", marginBottom: "clamp(28px,4vw,48px)" }}>
          {TRENDS.map(t => (
            <div key={t.num} style={{ background: "#FDFCF9", padding: "clamp(14px,2.5vw,22px)", display: "flex", gap: 16 }}>
              <span style={{ fontSize: 11, color: "#C8C2B4", fontFamily: "system-ui,sans-serif", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{t.num}</span>
              <div>
                <h3 className="pf font-bold" style={{ fontSize: 14, color: "#1A1208", marginBottom: 6 }}>{t.title}</h3>
                <p style={{ fontSize: 12.5, color: "#5A4A30", lineHeight: 1.72, fontFamily: "system-ui,sans-serif", margin: 0 }}>{t.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial note */}
        <div className="fu fu5" style={{ background: "#1A1208", padding: "clamp(20px,4vw,40px)", margin: "clamp(24px,4vw,40px) 0" }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: "#E8C547", fontFamily: "system-ui,sans-serif", margin: "0 0 14px" }}>✦ UpForge Editorial Note</p>
          <p className="pf italic" style={{ fontSize: "clamp(1rem,2vw,1.22rem)", color: "rgba(253,252,249,.88)", lineHeight: 1.78, margin: 0 }}>
            "The most important lesson from Indian fintech is not about the technology — it is about trust. Zerodha never spent on marketing. CRED never acquired users through discount codes. Groww never bought paid reviews. They won by being the most trustworthy financial product their customers had ever used. In a country where banks have spent 100 years being distrusted by half the population, trust is not a soft brand attribute. It is the entire product."
          </p>
          <div className="flex items-center gap-2 mt-5" style={{ borderTop: "1px solid rgba(255,255,255,.12)", paddingTop: 14 }}>
            <span style={{ color: "#E8C547", fontSize: 12 }}>❧</span>
            <p style={{ fontSize: 9, color: "rgba(255,255,255,.35)", fontFamily: "system-ui,sans-serif", textTransform: "uppercase", letterSpacing: ".18em", margin: 0 }}>UpForge Editorial · March 2026</p>
          </div>
        </div>

        {/* Pull quote */}
        <div className="fu fu5 text-center py-8 my-8" style={{ borderTop: "3px solid #1A1208", borderBottom: "1px solid #C8C2B4" }}>
          <span style={{ display: "block", color: "#C8C2B4", fontSize: 18, marginBottom: 12 }}>❧</span>
          <blockquote className="pf italic max-w-2xl mx-auto" style={{ fontSize: "clamp(15px,2.2vw,21px)", color: "#1A1208", lineHeight: 1.7 }}>
            "We never raised money because we didn't need to. Build something people actually want, charge them fairly — that's the whole playbook."
          </blockquote>
          <span style={{ display: "block", color: "#C8C2B4", fontSize: 18, margin: "12px 0 8px" }}>❧</span>
          <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: ".24em", color: "#AAA", fontFamily: "system-ui,sans-serif" }}>— Nithin Kamath, Zerodha</p>
        </div>

        {/* FAQ */}
        <div className="fu fu5 flex items-center gap-3 mb-6" style={{ paddingTop: "clamp(16px,3vw,24px)", borderTop: "2px solid #1A1208" }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: "#B45309", letterSpacing: ".2em", fontFamily: "system-ui,sans-serif" }}>§04</span>
          <h2 className="pf" style={{ fontSize: "clamp(1.2rem,2.5vw,1.8rem)", fontWeight: 900, margin: 0 }}>Frequently Asked Questions</h2>
          <div className="hero-rule flex-1 h-px" style={{ background: "#C8C2B4" }} />
        </div>
        <div className="fu fu5 space-y-[1.5px]" style={{ border: "1.5px solid #1A1208", background: "#1A1208", marginBottom: "clamp(28px,4vw,48px)" }}>
          {FAQS.map((f, i) => (
            <details key={i} style={{ background: "#FDFCF9" }}>
              <summary className="flex items-center justify-between cursor-pointer" style={{ padding: "clamp(12px,2vw,18px) clamp(14px,2.5vw,22px)", listStyle: "none" }}>
                <span className="pf font-bold" style={{ fontSize: 13.5, color: "#1A1208" }}>{f.q}</span>
                <ChevronRight className="faq-chev w-4 h-4 flex-shrink-0 ml-3" style={{ color: "#C8C2B4" }} />
              </summary>
              <div style={{ padding: "0 clamp(14px,2.5vw,22px) clamp(12px,2vw,18px)", borderTop: "1px solid #EDE9DF" }}>
                <p style={{ fontSize: 12.5, color: "#5A4A30", lineHeight: 1.72, paddingTop: 12, fontFamily: "system-ui,sans-serif", margin: 0 }}>{f.a}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Internal links */}
        <nav className="fu fu5 py-8" style={{ borderBottom: "1px solid #C8C2B4" }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".28em", textTransform: "uppercase", color: "#AAA", fontFamily: "system-ui,sans-serif", marginBottom: 16 }}>Continue Exploring</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: "Indian Startups Guide",     href: "/indian-startups" },
              { label: "EdTech Startups India",     href: "/edtech-startups" },
              { label: "D2C Startups India",        href: "/d2c-startups" },
              { label: "Indian Unicorns 2026",      href: "/indian-unicorns" },
              { label: "Top AI Startups India",     href: "/top-ai-startups" },
              { label: "Founder Chronicles",        href: "/" },
              { label: "Startup Registry India",   href: "/startup" },
              { label: "Submit Your Startup",       href: "/submit" },
            ].map(l => (
              <Link key={l.href} href={l.href} className="flex items-center gap-1.5 transition-all nbtn" style={{ padding: "10px 12px", background: "white", border: "1px solid #D8D2C4", textDecoration: "none", color: "#1A1208", fontSize: 10.5, fontFamily: "system-ui,sans-serif", fontWeight: 600 }}>
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
                <span>{l.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* CTA */}
        <div className="fu fu6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mt-8 p-7 sm:p-10" style={{ background: "#1A1208" }}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)", fontFamily: "system-ui,sans-serif", textTransform: "uppercase", letterSpacing: ".22em" }}>UpForge Registry</span>
            </div>
            <p className="pf font-bold text-white leading-snug mb-2" style={{ fontSize: "clamp(1rem,2.5vw,1.5rem)" }}>Your Fintech startup belongs in this list.</p>
            <p style={{ fontSize: 12.5, color: "rgba(255,255,255,.5)", maxWidth: 380, fontFamily: "system-ui,sans-serif", lineHeight: 1.65 }}>Get independently verified and listed in India's most trusted startup registry. Free forever. Google-indexed. Trusted by founders and investors.</p>
          </div>
          <Link href="/submit" className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 font-bold tracking-wide hover:opacity-90 transition-opacity" style={{ background: "#E8C547", color: "#111", fontSize: 11, fontFamily: "system-ui,sans-serif", textDecoration: "none" }}>
            List Your Startup — Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <footer className="mt-6">
          <p style={{ fontSize: 9.5, color: "#BBB0A0", lineHeight: 1.65, fontFamily: "system-ui,sans-serif", borderTop: "1px solid #D8D2C4", paddingTop: 14 }}>
            * Profile details sourced from Tracxn, Inc42, RBI, Forbes India, and company disclosures as of March 2026. UpForge is an independent registry — no paid placements, no sponsored rankings.
          </p>
          <nav aria-label="Footer navigation" className="mt-4">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "Founder Chronicles", h: "/" }, { l: "Indian Startups", h: "/indian-startups" },
                { l: "EdTech Startups", h: "/edtech-startups" }, { l: "D2C Startups", h: "/d2c-startups" },
                { l: "Startup Registry", h: "/startup" }, { l: "Submit Startup", h: "/submit" },
              ].map(lnk => (
                <li key={lnk.h}><Link href={lnk.h} className="text-[9px] hover:text-[#1A1208] uppercase tracking-wider transition-colors" style={{ color: "#AAA", fontFamily: "system-ui,sans-serif" }}>{lnk.l}</Link></li>
              ))}
            </ul>
          </nav>
        </footer>
      </main>
    </div>
  )
}
