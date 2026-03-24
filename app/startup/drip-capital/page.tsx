"use client"

// app/startup/drip-capital/page.tsx
// UpForge — Drip Capital · Pushkar Mukewar & Neil Kothari Founder Chronicle
// SEO: FAQPage ONLY in JSON-LD. Zero microdata on FAQ HTML = no duplicate error.

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://upforge.org/startup/drip-capital#article",
      "headline": "Drip Capital — How Pushkar Mukewar & Neil Kothari Built a Global Trade Finance Fintech from Palo Alto and Mumbai",
      "description": "Drip Capital founder story — Pushkar Mukewar and Neil Kothari, Wharton alums, built a digital trade finance company serving 9,000+ SME exporters across India, the USA, and Mexico. Founded 2015/2016. $640M+ raised. $8B+ in trade financed. Backed by Accel, Y Combinator, Peak XV Partners, Sequoia India, and SMBC.",
      "url": "https://upforge.org/startup/drip-capital",
      "datePublished": "2026-03-24T00:00:00+05:30",
      "dateModified": "2026-03-24T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.org/drip-capital.jpg",
        "width": 1200,
        "height": 630
      },
      "publisher": {
        "@type": "Organization",
        "name": "UpForge",
        "url": "https://upforge.org",
        "logo": { "@type": "ImageObject", "url": "https://upforge.org/logo.png" }
      },
      "author": { "@type": "Organization", "name": "UpForge Editorial" },
      "about": [
        {
          "@type": "Person",
          "name": "Pushkar Mukewar",
          "jobTitle": "Co-Founder & CEO",
          "worksFor": { "@type": "Organization", "name": "Drip Capital" },
          "alumniOf": [
            { "@type": "CollegeOrUniversity", "name": "Wharton School, University of Pennsylvania" },
            { "@type": "CollegeOrUniversity", "name": "Georgia Institute of Technology" },
            { "@type": "CollegeOrUniversity", "name": "Savitribai Phule Pune University" }
          ],
          "sameAs": ["https://www.linkedin.com/in/pushkar-mukewar-0316951/"]
        },
        {
          "@type": "Person",
          "name": "Neil Kothari",
          "jobTitle": "Co-Founder",
          "worksFor": { "@type": "Organization", "name": "Drip Capital" },
          "alumniOf": { "@type": "CollegeOrUniversity", "name": "Wharton School, University of Pennsylvania" }
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "Drip Capital",
        "legalName": "Drip Capital Inc.",
        "url": "https://www.dripcapital.com",
        "foundingDate": "2016",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "Palo Alto",
          "addressRegion": "California",
          "addressCountry": "US"
        },
        "description": "Drip Capital is a digital trade finance and B2B commerce company headquartered in Palo Alto, California, with major operations in Mumbai, Delhi, and Bangalore. Founded in 2016 by Wharton alums Pushkar Mukewar and Neil Kothari, it offers collateral-free working capital to SMEs engaged in cross-border trade across India, the USA, and Mexico. The company has financed over $8 billion in trade transactions and serves 9,000+ businesses. It has raised nearly $640 million in equity and debt funding from investors including Accel, Y Combinator, Peak XV Partners (Sequoia India), and Sumitomo Mitsui Banking Corporation.",
        "sameAs": [
          "https://www.dripcapital.com",
          "https://www.linkedin.com/company/dripcapital",
          "https://en.wikipedia.org/wiki/Drip_Capital"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.org" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.org/startup" },
        { "@type": "ListItem", "position": 3, "name": "Fintech Startups India", "item": "https://upforge.org/startup?sector=Fintech" },
        { "@type": "ListItem", "position": 4, "name": "Drip Capital", "item": "https://upforge.org/startup/drip-capital" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who founded Drip Capital and what is their background?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Drip Capital was co-founded by Pushkar Mukewar and Neil Kothari, both alumni and former roommates at the Wharton School of the University of Pennsylvania (MBA Class of 2011). Pushkar holds a Computer Science degree from Savitribai Phule Pune University and an MS from Georgia Institute of Technology. Before Drip, he worked at Capital One developing credit risk analytics, consulted for financial services clients across the US, UAE, and Switzerland at Oliver Wyman, and was a venture capitalist at Saama Capital where he backed early-stage startups including Paytm, Snapdeal, and Bluestone. Neil Kothari's background spans financial services and computer science, previously based on Wall Street."
          }
        },
        {
          "@type": "Question",
          "name": "What does Drip Capital do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Drip Capital is a digital trade finance and B2B commerce company. It provides collateral-free working capital of up to $3 million to small and medium-sized businesses engaged in cross-border trade across India, the USA, and Mexico. Products include receivables financing (invoice factoring), supply chain financing, payable finance for US buyers, and a B2B commerce platform connecting global buyers and suppliers. The company uses automated risk assessment and electronic data to underwrite transactions within 24 hours, with funds disbursed within 12 hours of invoice submission."
          }
        },
        {
          "@type": "Question",
          "name": "How much has Drip Capital raised in funding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Drip Capital has raised nearly $640 million in a combination of equity and debt funding. Key equity investors include Accel, Y Combinator, Wing Venture Capital, Transpose Platform, Peak XV Partners (Sequoia India), GMO Payment Gateway, and Sumitomo Mitsui Banking Corporation (SMBC). Debt partners include IFC (World Bank Group), Barclays, East West Bank, and TD Bank, which provided a $50 million credit facility in 2025 to accelerate North American expansion. The most recent major round was a $113 million raise (equity + debt) announced in September 2024."
          }
        },
        {
          "@type": "Question",
          "name": "How many businesses has Drip Capital served and how much trade has it financed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As of late 2025, Drip Capital has financed more than $8 billion in trade transactions globally. The company serves 9,000–10,000 businesses, with approximately 60% based in India and the remainder in the United States and Mexico. Drip operates across 100+ countries and targets SMEs in sectors including apparel, processed and packaged food, agro-products, engineering goods, chemicals, and pharmaceuticals."
          }
        },
        {
          "@type": "Question",
          "name": "Where is Drip Capital headquartered and where does it operate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Drip Capital's corporate headquarters is in Palo Alto, California. The company has major operations in India across three offices — Mumbai, Delhi, and Bangalore — and also serves businesses in Mexico. Approximately 90% of its employees are based in India. Drip Capital's Indian subsidiary is registered as Drip Capital Services India LLP."
          }
        },
        {
          "@type": "Question",
          "name": "What awards and recognition has Drip Capital received?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Drip Capital has received multiple recognitions: it was named to the CB Insights Fintech 250 list (September 2020), featured in Y Combinator's Top Companies list (March 2022), selected for the Red Herring Global Top 100 (2022), listed among Forbes India's Top 10 companies, included in D Globalist's DGEMS Select 200, and featured in the ASK Private Wealth Hurun India Unicorn and Future Unicorn Report 2025 as one of India's leading 'soonicorns'."
          }
        }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Founded", v: "2016" },
  { l: "Trade Financed", v: "$8B+" },
  { l: "Total Raised", v: "$640M+" },
  { l: "Businesses Served", v: "9,000+" },
  { l: "CB Insights Rating", v: "Fintech 250" },
  { l: "Markets", v: "India, USA, MX" },
]

const TIMELINE = [
  {
    year: "2014–15",
    event: "Pushkar Mukewar and Neil Kothari, Wharton MBA classmates and roommates, quit their Wall Street and finance jobs to pursue entrepreneurship in fintech. Mukewar moves back to India; both commit to solving the $1.7 trillion global trade finance gap for SMEs. Y Combinator accepts them with just an idea and two founders, investing $120,000 in the seed round.",
  },
  {
    year: "2016",
    event: "Drip Capital is formally incorporated in Palo Alto, California in November 2016. Mukewar moves to Mumbai and begins cold-calling Indian exporters. The company's first client — Dhara Foods, a Gujarat-based packaged food exporter — discounts its first invoice, generating Drip's very first revenue. The proof of concept is validated.",
  },
  {
    year: "2017–18",
    event: "Accel leads Drip Capital's Series A. The company scales its India operations, building a client base of 400+ exporters across 70+ Indian cities. It also begins operations in Mexico, offering supplier financing and domestic factoring services for small businesses. The team expands to include engineers, data scientists, and trade finance veterans.",
  },
  {
    year: "2019–20",
    event: "Drip Capital surpasses $500 million in trade financed from Indian exporters alone. The company is named to the CB Insights Fintech 250 list. Accel, Wing VC, and Peak XV Partners (Sequoia India) back further growth rounds. Drip establishes itself as the leading collateral-free trade finance platform for Indian SME exporters.",
  },
  {
    year: "2021–22",
    event: "Series C closes with participation from TI Platform Management, Accel, and Barclays — one of Drip's debt partners taking an equity stake. The company is featured in Y Combinator's Top Companies list and selected for the Red Herring Global Top 100. Total trade financed crosses $2 billion. Team grows to 250+ employees.",
  },
  {
    year: "2023–24",
    event: "$6 billion in trade financed. A landmark $113 million fundraise is announced in September 2024 — $23 million equity from Japanese institutional investors GMO Payment Gateway and SMBC, alongside $90 million in debt from IFC and East West Bank. Drip quadruples revenue and doubles its customer base in two years. The company turns profitable.",
  },
  {
    year: "2025–26",
    event: "$8 billion+ in trade financed. TD Bank provides a $50 million credit facility to accelerate North American expansion. Drip is named a 'soonicorn' in the Hurun India Future Unicorn Report 2025. With 9,000+ active clients, offices across Palo Alto, Mumbai, Delhi, and Bangalore, and 90% of its workforce in India, Drip Capital defines the future of global trade finance.",
  },
]

const COLS = [
  {
    h: "Two Wharton Roommates, One $1.7 Trillion Problem",
    b: `Pushkar Mukewar and Neil Kothari were not the typical Silicon Valley founders. They had no consumer app idea, no viral product, and no venture capital connections when they quit their jobs in 2014. What they had was a shared obsession: the staggering injustice of the global trade finance gap.\n\nMukewar's career had taken him from Pune to Atlanta, where he earned a master's in Computer Science and Computational Biology at Georgia Tech on a full scholarship. He then moved into financial services — first at Capital One, where he built credit risk analytics for subprime consumer loans, then as a management consultant at Oliver Wyman advising banks in the United States, Middle East, and Europe. A Wharton MBA brought him together with Kothari, a computer science and Wall Street veteran. They graduated together in 2011, wanted to start a company, but didn't yet have the idea.\n\nThe idea came later — through lived experience. Mukewar had gone into venture capital at Saama Capital, backing early-stage companies including Paytm, Snapdeal, and Bluestone. He saw firsthand how founders with strong businesses were choked by working capital. He also saw something starker: the global trade finance gap was estimated at $1.7 trillion annually, with SME exporters bearing the brunt.`,
  },
  {
    h: "Cold Calls to Gujarat, Code in Palo Alto",
    b: `After Y Combinator accepted them with just two founders and an idea, Mukewar moved back to India. He started cold-calling exporters from Mumbai. When an exporter from Anand, Gujarat showed interest, Mukewar boarded a train to meet him. The client — Dhara Foods, a packaged food exporter selling to US grocery stores — needed working capital but had no collateral. Every bank had turned him away.\n\nDrip Capital financed his first export invoice. The exporter got paid within hours, instead of waiting 60–90 days. That transaction proved the entire thesis: technology could replace collateral as the underwriting input. Electronic invoices, shipping documents, and buyer track records were all the data needed to price risk faster and better than any bank.\n\nThe Drip model was elegant in its simplicity. An exporter submits a two-minute application. Drip analyses eligibility within 24 hours using automated risk assessment across multiple data sources. Once approved, the exporter uploads invoice and shipping documents to the portal. Funds are disbursed within 12 hours. No collateral required. No lengthy bank process. Just data, technology, and speed.`,
  },
  {
    h: "From $120,000 Seed to $8 Billion in Trade",
    b: `Y Combinator invested $120,000 at inception. That modest seed funded a pivot that would define Drip's trajectory. After discovering that US-based SMBs were not a differentiated customer acquisition opportunity, Mukewar and Kothari doubled down on emerging markets — starting with Indian exporters, then expanding to Mexico.\n\nThe bet paid off spectacularly. Accel backed Drip's Series A. Peak XV Partners (Sequoia India), Wing VC, and Barclays followed. By 2024, Drip had raised nearly $640 million in equity and debt funding — from Y Combinator and Accel to the IFC (World Bank Group) and Japanese banking giants SMBC and GMO Payment Gateway. The company turned profitable and was targeting 40% year-on-year growth.\n\nAs of late 2025, Drip has financed more than $8 billion in trade transactions and serves 9,000–10,000 businesses across India, the US, and Mexico. TD Bank's $50 million credit facility is accelerating North American expansion. The Hurun India report has recognised Drip as one of India's leading soonicorns — a future unicorn in the making. Two Wharton roommates with a trade finance thesis have built one of the world's most consequential fintech platforms.`,
  },
]

const PULL_QUOTE = {
  text: "Globally, there is a $1.7 trillion trade finance gap. SMBs don't get access to credit because banks ask for collateral and have a long-drawn process. That is the problem we really had to solve.",
  by: "Pushkar Mukewar, Co-Founder & CEO, Drip Capital",
}

const LESSON =
  "The largest fintech opportunities are not in consumer apps — they're in replacing broken infrastructure. Drip Capital found a $1.7 trillion gap that banks ignored, built automated underwriting around electronic trade data, and turned SME exporters into a profitable, scalable asset class. First-principles thinking beats feature competition every time."

const SERVICES = [
  "Receivables Financing (Invoice Factoring)",
  "Export Finance for Indian SMEs",
  "Supply Chain Financing (US Buyers)",
  "Payable Finance (Up to 120-day terms)",
  "Domestic Factoring Services",
  "B2B Commerce Platform (Global Sourcing)",
  "Automated Risk Assessment & Underwriting",
  "Working Capital (Up to $3M credit limit)",
]

const FAQS = [
  {
    q: "Who are the founders of Drip Capital and what is their background?",
    a: "Drip Capital was co-founded by Pushkar Mukewar (CEO) and Neil Kothari, former roommates at Wharton School, University of Pennsylvania (MBA 2011). Mukewar holds a CS degree from Savitribai Phule Pune University and an MS from Georgia Tech. He previously worked at Capital One, Oliver Wyman (finance consulting across US, UAE, and Switzerland), and Saama Capital (VC, backing Paytm, Snapdeal, Bluestone). Neil Kothari's background is in computer science and Wall Street finance.",
  },
  {
    q: "What makes Drip Capital different from traditional trade finance companies?",
    a: "Drip Capital is entirely collateral-free. Traditional banks require physical collateral and extensive documentation, making them inaccessible to most SME exporters. Drip uses automated risk assessment of the buyer's creditworthiness and the seller's track record — using electronic data from invoices, shipping documents, and trade histories — to approve credit limits of up to $3 million within 24 hours and disburse funds within 12 hours of invoice submission. This tech-first approach lets Drip serve the 'missing middle' of global trade.",
  },
  {
    q: "Which countries does Drip Capital operate in?",
    a: "Drip Capital operates primarily in India, the United States, and Mexico. Its corporate headquarters is in Palo Alto, California, with operations across Mumbai, Delhi, and Bangalore. The company facilitates trade across 100+ countries. Around 60% of its 9,000–10,000 active business clients are in India, with the remainder in the US and Mexico. Its North American operations have financed nearly $1 billion for US and Canadian SMBs.",
  },
  {
    q: "Who are Drip Capital's investors and how much has it raised?",
    a: "Drip Capital has raised nearly $640 million in equity and debt. Equity investors include Y Combinator, Accel, Wing Venture Capital, Peak XV Partners (Sequoia India), Transpose Platform, GMO Payment Gateway, and Sumitomo Mitsui Banking Corporation (SMBC). Debt partners include IFC (World Bank Group), Barclays, East West Bank, and TD Bank. The company's most recent equity round was a Series C with GMO and SMBC in September 2024 ($23M equity, $90M debt).",
  },
]

const RELATED = [
  { name: "Razorpay", slug: "razorpay", cat: "Fintech / Payments", val: "$7.5B" },
  { name: "Codeair Software", slug: "codeair-software-solutions", cat: "AI / IT Services", val: "Bootstrapped" },
  { name: "Atomberg Technologies", slug: "atomberg-fans", cat: "Consumer Tech / D2C", val: "$119M" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function DripCapitalPage() {
  const accent = "#1d4ed8"       // Deep cobalt blue — fintech, trustworthy, global
  const accentDark = "#1e3a8a"
  const accentBg = "#eff6ff"
  const accentBorder = "#bfdbfe"

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
        Drip Capital Founder Story — Pushkar Mukewar &amp; Neil Kothari | Trade Finance Fintech | $8B+ Financed | $640M Raised | Y Combinator, Accel, Peak XV | UpForge
      </h1>

      {/* ── BREADCRUMB ── */}
      <nav
        aria-label="Breadcrumb"
        className="px-4 sm:px-8 py-2"
        style={{ background: "#EDE9DF", borderBottom: "1px solid #D8D2C4", fontFamily: "system-ui,sans-serif" }}
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-[9px] text-[#AAA] uppercase tracking-widest">
          {[
            { n: "UpForge", h: "/" },
            { n: "Startup Registry", h: "/startup" },
            { n: "Fintech Startups India", h: "/startup?sector=Fintech" },
            { n: "Drip Capital", h: "/startup/drip-capital" },
          ].map((b, i, arr) => (
            <li key={i} className="flex items-center gap-1.5">
              {i < arr.length - 1 ? (
                <Link href={b.h} className="hover:text-[#1A1208] transition-colors">{b.n}</Link>
              ) : (
                <span className="text-[#1A1208] font-semibold">{b.n}</span>
              )}
              {i < arr.length - 1 && <ChevronRight className="w-2.5 h-2.5 text-[#C8C2B4]" />}
            </li>
          ))}
        </ol>
      </nav>

      {/* ── MASTHEAD ── */}
      <header style={{ background: "#F3EFE5", borderBottom: "3px solid #1A1208" }}>
        <div className="text-center px-4 pt-3 pb-6" style={{ borderBottom: "1px solid #C8C2B4" }}>
          <p className="text-[8px] tracking-[0.44em] text-[#AAA] uppercase mb-2" style={{ fontFamily: "system-ui,sans-serif" }}>
            UpForge · Startup Registry · Fintech & Trade Finance
          </p>
          <p className="pf font-black leading-none text-[#1A1208]" style={{ fontSize: "clamp(2rem,5.5vw,4.2rem)" }}>
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
          <span className="text-[8px] text-[#AAA] uppercase tracking-widest flex-shrink-0">Edition · Fintech</span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: accent }}>
            Trade Finance · March 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">Palo Alto, CA · Mumbai, India</span>
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
                FINTECH / TRADE FINANCE
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">March 2026</span>
            </div>

            {/* Headline */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              They found a $1.7 trillion gap that banks ignored —{" "}
              <em style={{ color: accent }}>
                then financed $8 billion of global trade to fix it.
              </em>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              Pushkar Mukewar and Neil Kothari met as Wharton roommates and graduated with MBAs
              but without a startup idea. A decade later, their company Drip Capital has financed
              more than $8 billion in cross-border trade, raised nearly $640 million from Y Combinator,
              Accel, Sequoia India, and the IFC, and serves 9,000+ SME exporters across three
              continents — all by doing what every bank refused to: lend without collateral.
            </p>

            {/* Byline */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8" style={{ fontFamily: "system-ui,sans-serif" }}>
              {[
                "By UpForge Editorial",
                "Palo Alto · Mumbai",
                "Est. 2016",
                "Trade Finance · Fintech",
              ].map((t, i, a) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-[9px] text-[#AAA] uppercase tracking-wider">{t}</span>
                  {i < a.length - 1 && <span className="text-[#C8C2B4] text-[10px]">·</span>}
                </span>
              ))}
            </div>

            {/* Mobile hero image */}
            <div className="lg:hidden mb-8">
              <img
                src="/drip-capital.jpg"
                alt="Pushkar Mukewar, Co-Founder & CEO of Drip Capital — UpForge Founder Chronicle"
                className="w-full object-cover object-top"
                style={{ height: "min(300px,60vw)", display: "block" }}
                loading="eager"
              />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>Pushkar Mukewar</p>
                <p className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5" style={{ fontFamily: "system-ui,sans-serif" }}>
                  Co-Founder & CEO · Drip Capital
                </p>
              </div>
            </div>

            {/* 3-col newspaper body */}
            <div className="ncols">
              {COLS.map((col, ci) => (
                <div key={ci} className="mb-6 sm:mb-0">
                  <h3
                    className="font-black uppercase tracking-[0.13em] mb-3 pb-1.5"
                    style={{ fontSize: 11, color: "#1A1208", borderBottom: `1.5px solid ${accent}`, fontFamily: "system-ui,sans-serif" }}
                  >
                    {col.h}
                  </h3>
                  {col.b.split("\n\n").map((p, pi) => (
                    <p
                      key={pi}
                      className={`leading-[1.9] mb-3 text-[#2C2010] ${ci === 0 && pi === 0 ? "dropcap" : ""}`}
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
              style={{ borderTop: `3px double ${accent}`, borderBottom: "1px solid #C8C2B4" }}
            >
              <span style={{ display: "block", color: accentDark, fontSize: 24, marginBottom: 10 }}>❝</span>
              <blockquote
                className="pf italic text-[#1A1208] leading-[1.7] max-w-2xl mx-auto px-4"
                style={{ fontSize: "clamp(16px,2.2vw,22px)" }}
              >
                "{PULL_QUOTE.text}"
              </blockquote>
              <p className="text-[9px] uppercase tracking-[0.24em] text-[#AAA] mt-4" style={{ fontFamily: "system-ui,sans-serif" }}>
                — {PULL_QUOTE.by}
              </p>
            </div>

            {/* Company Timeline */}
            <div className="mt-8">
              <p
                className="text-[8.5px] font-black uppercase tracking-[0.26em] mb-4"
                style={{ color: accent, fontFamily: "system-ui,sans-serif", borderBottom: `1px solid ${accentBorder}`, paddingBottom: 8 }}
              >
                Company Timeline
              </p>
              <ol style={{ fontFamily: "system-ui,sans-serif" }}>
                {TIMELINE.map((t, i) => (
                  <li key={i} className="flex gap-4 mb-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: accent }} />
                      {i < TIMELINE.length - 1 && (
                        <div className="w-px flex-1 mt-1" style={{ background: accentBorder, minHeight: 24 }} />
                      )}
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: accent }}>
                        {t.year}
                      </span>
                      <p className="text-[12px] text-[#2C2010] mt-0.5 leading-relaxed">{t.event}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* FAQ — visual only, NO microdata (schema is in JSON-LD) */}
            <section className="mt-8">
              <p
                className="text-[8.5px] font-black uppercase tracking-[0.26em] mb-4"
                style={{ color: accent, fontFamily: "system-ui,sans-serif", borderBottom: `1px solid ${accentBorder}`, paddingBottom: 8 }}
              >
                Frequently Asked Questions
              </p>
              {FAQS.map((faq, i) => (
                <div key={i} className="mb-4 pb-4" style={{ borderBottom: "1px solid #D8D2C4" }}>
                  <h3 className="font-bold text-[#1A1208] mb-1.5" style={{ fontSize: 13, fontFamily: "system-ui,sans-serif" }}>
                    {faq.q}
                  </h3>
                  <p className="text-[12.5px] text-[#5A4A30] leading-relaxed" style={{ fontFamily: "system-ui,sans-serif" }}>
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
                  src="/drip-capital.jpg"
                  alt="Pushkar Mukewar, Co-Founder & CEO of Drip Capital — UpForge Founder Chronicle"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3.5"
                  style={{ background: "linear-gradient(to top, rgba(12,7,2,0.96) 60%, transparent)" }}
                >
                  <p className="pf text-white font-bold" style={{ fontSize: 14 }}>Pushkar Mukewar</p>
                  <p className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5" style={{ fontFamily: "system-ui,sans-serif" }}>
                    Co-Founder & CEO · Drip Capital
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.dripcapital.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: `1.5px solid ${accent}`, textDecoration: "none" }}
                  aria-label="Visit Drip Capital official website"
                >
                  <div className="flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent, fontFamily: "system-ui,sans-serif" }}>
                      dripcapital.com — Official Website
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/dripcapital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View Drip Capital on LinkedIn"
                >
                  <div className="flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#0077b5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#0077b5", fontFamily: "system-ui,sans-serif" }}>
                      LinkedIn — Drip Capital
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "#0077b5" }} />
                </a>
                <a
                  href="https://www.linkedin.com/in/pushkar-mukewar-0316951/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View Pushkar Mukewar on LinkedIn"
                >
                  <div className="flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#0077b5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#0077b5", fontFamily: "system-ui,sans-serif" }}>
                      Pushkar Mukewar — Co-Founder & CEO
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "#0077b5" }} />
                </a>
              </div>

              {/* By the Numbers */}
              <div style={{ border: "2px solid #1A1208" }}>
                <div className="px-4 py-2.5" style={{ background: "#1A1208" }}>
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white" style={{ fontFamily: "system-ui,sans-serif" }}>
                    By the Numbers
                  </p>
                </div>
                <dl className="grid grid-cols-2 divide-x divide-y" style={{ borderColor: "#D8D2C4" }}>
                  {STATS.map((s, i) => (
                    <div key={i} className="px-4 py-3" style={{ borderColor: "#D8D2C4" }}>
                      <dt className="text-[7.5px] text-[#AAA] uppercase tracking-[0.16em] mb-1" style={{ fontFamily: "system-ui,sans-serif" }}>
                        {s.l}
                      </dt>
                      <dd className="pf font-black text-[#1A1208] leading-none" style={{ fontSize: "1.25rem" }}>
                        {s.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* The Lesson */}
              <div className="px-4 py-4" style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
                <p className="text-[8px] font-black uppercase tracking-[0.26em] mb-2" style={{ color: accent, fontFamily: "system-ui,sans-serif" }}>
                  The Lesson
                </p>
                <p className="italic text-[#1A1208] leading-[1.72]" style={{ fontSize: 13 }}>
                  {LESSON}
                </p>
              </div>

              {/* Services */}
              <div style={{ border: "1px solid #D8D2C4" }}>
                <div className="px-4 py-2" style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}>
                  <p className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]" style={{ fontFamily: "system-ui,sans-serif" }}>
                    Products & Services
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {SERVICES.map((svc, i) => (
                    <p key={i} className="flex items-center gap-2 text-[11px] text-[#2C2010]" style={{ fontFamily: "system-ui,sans-serif" }}>
                      <span style={{ width: 6, height: 6, borderRadius: 1, background: accent, display: "inline-block", flexShrink: 0 }} />
                      {svc}
                    </p>
                  ))}
                </div>
              </div>

              {/* Key Investors */}
              <div style={{ border: "1px solid #D8D2C4" }}>
                <div className="px-4 py-2" style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}>
                  <p className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]" style={{ fontFamily: "system-ui,sans-serif" }}>
                    Key Investors
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {["Y Combinator", "Accel", "Peak XV Partners (Sequoia India)", "Wing Venture Capital", "IFC (World Bank Group)", "Sumitomo Mitsui Banking Corp.", "GMO Payment Gateway", "Barclays · East West Bank · TD Bank"].map((inv, i) => (
                    <p key={i} className="flex items-center gap-2 text-[11px] text-[#2C2010]" style={{ fontFamily: "system-ui,sans-serif" }}>
                      <span style={{ width: 6, height: 6, borderRadius: 1, background: accentDark, display: "inline-block", flexShrink: 0 }} />
                      {inv}
                    </p>
                  ))}
                </div>
              </div>

              {/* Also Read */}
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.26em] mb-3" style={{ color: "#AAA", fontFamily: "system-ui,sans-serif" }}>
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
                      <p className="text-[11px] font-bold text-[#1A1208]" style={{ fontFamily: "system-ui,sans-serif" }}>{r.name}</p>
                      <p className="text-[9px] text-[#AAA] uppercase tracking-wider">{r.cat} · {r.val}</p>
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
          <p className="text-[9px] tracking-[0.3em] uppercase text-[#AAA] mb-4" style={{ fontFamily: "system-ui,sans-serif" }}>
            Explore More on UpForge
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "Fintech Startups India 2026", h: "/startup?sector=Fintech" },
              { l: "Trade Finance Companies India", h: "/startup?sector=Trade+Finance" },
              { l: "Y Combinator India Startups", h: "/startup?investor=Y+Combinator" },
              { l: "Accel Portfolio India", h: "/startup?investor=Accel" },
              { l: "SME Fintech India", h: "/startup?sector=SME+Finance" },
              { l: "Indian Unicorns Full List", h: "/indian-unicorns" },
              { l: "Startup Registry India", h: "/startup" },
              { l: "Submit Your Startup", h: "/submit" },
            ].map((lnk) => (
              <Link
                key={lnk.h}
                href={lnk.h}
                className="flex items-center gap-1 p-3 hover:border-[#1A1208] transition-all"
                style={{ border: "1px solid #D8D2C4", background: "white", textDecoration: "none" }}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1208]" style={{ fontFamily: "system-ui,sans-serif" }}>
                  {lnk.l}
                </span>
                <ChevronRight className="w-2.5 h-2.5 text-[#AAA] flex-shrink-0 ml-auto" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="pt-8 pb-2">
          <div className="grid sm:grid-cols-2 gap-6 items-center pb-8" style={{ borderBottom: "1px solid #D8D2C4" }}>
            <div>
              <p className="pf font-bold text-[#1A1208] mb-2" style={{ fontSize: "1.2rem" }}>
                Building India's next fintech success? Get verified on UpForge.
              </p>
              <p className="text-[12px] text-[#6B5C40]" style={{ fontFamily: "system-ui,sans-serif" }}>
                Free startup profiles. Independent verification. Indexed by Google.
              </p>
            </div>
            <div className="flex sm:justify-end">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-bold uppercase tracking-wider hover:opacity-90"
                style={{ background: "#1A1208", fontSize: 11, fontFamily: "system-ui,sans-serif", textDecoration: "none" }}
                aria-label="List your Indian startup on UpForge for free"
              >
                List Your Startup — Free <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <p className="text-[9px] leading-relaxed mt-4" style={{ color: "#BBB0A0", fontFamily: "system-ui,sans-serif" }}>
            * Data sourced from Drip Capital official website (dripcapital.com), LinkedIn company profile, Wikipedia, Crunchbase, Tracxn, TechCrunch, Business Standard, YourStory, PR Newswire, and public sources as of March 2026.
            UpForge is an independent registry — no paid placements, no sponsored rankings.
            Funding figures are based on publicly available company disclosures and press releases.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "Fintech Startups India", h: "/startup?sector=Fintech" },
                { l: "Trade Finance Startups", h: "/startup?sector=Trade+Finance" },
                { l: "Startup Registry", h: "/startup" },
                { l: "Codeair Profile", h: "/startup/codeair-software-solutions" },
                { l: "Razorpay Profile", h: "/startup/razorpay" },
                { l: "Indian Unicorns", h: "/indian-unicorns" },
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
