// app/edtech-startups/page.tsx
// ─── TARGET KEYWORDS ────────────────────────────────────────────────────────
// "edtech startups India"              ~18,000/mo
// "best edtech companies India 2026"   ~9,200/mo
// "edtech unicorns India"              ~6,400/mo
// "ed tech India"                      ~22,000/mo
// "online education startups India"    ~8,100/mo
// ────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — exact match to app/page.tsx + blog page:
//   bg: #F3EFE5  breadcrumb: #EDE9DF  ink: #1A1208  secondary: #6B5C40
//   rule: #C8C2B4 / #D8D2C4  gold: #E8C547  gold-link: #B45309
//   card-gap: 1.5px #1A1208  card-bg: #FDFCF9
//   sector accent: #059669 (emerald)
//   fonts: Playfair Display · Georgia · system-ui
// ────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight, ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
  title: "EdTech Startups India 2026 — Top Education Companies, Unicorns & Founders | UpForge",
  description:
    "Complete guide to India's EdTech startups in 2026 — PhysicsWallah, Unacademy, upGrad, Eruditus, BYJU'S, Classplus and more. 7 unicorns, $400M raised in 2025. Profiles, playbooks, and the lessons that define India's education technology sector.",
  keywords: "edtech startups India, best edtech companies India 2026, edtech unicorns India, PhysicsWallah startup story, Alakh Pandey founder, Unacademy, upGrad, Eruditus, BYJU's founder, online education startups India, ed tech India funding",
  alternates: { canonical: "https://upforge.in/edtech-startups" },
  openGraph: {
    title: "EdTech Startups India 2026 — Top Education Companies | UpForge",
    description: "7 unicorns. $400M raised in 2025. Profiles, playbooks, and lessons from India's top EdTech founders — PhysicsWallah, Unacademy, Eruditus, upGrad and more.",
    url: "https://upforge.in/edtech-startups",
    siteName: "UpForge", locale: "en_IN", type: "article",
    images: [{ url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=85", width: 1200, height: 630, alt: "EdTech startups India 2026" }],
  },
  twitter: { card: "summary_large_image", site: "@upforge_in", title: "EdTech Startups India 2026 | UpForge", images: ["https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=85"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
}

// ─── COMPANY DATA ────────────────────────────────────────────────────────────
const COMPANIES = [
  {
    name: "PhysicsWallah",
    nameShort: "PW",
    founder: "Alakh Pandey",
    role: "Founder & CEO",
    city: "Noida",
    founded: "2014",
    valuation: "$2.8B",
    funding: "$210M",
    sector: "K-12 · Test Prep",
    accent: "#059669",
    accentBg: "#ECFDF5",
    accentBorder: "#6EE7B7",
    slug: "physicswallah",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    initials: "PW",
    philosophy: "Price as a feature, not a compromise",
    quote: "I did not build PhysicsWallah for IIT students. I built it for the crore students who cannot afford coaching.",
    why: "The most consequential EdTech story of India's post-BYJU's era. Pandey built PW by solving affordability — ₹999/year for full JEE prep. That price decision is the moat, not the technology.",
    keyInsight: "Pandey's obsession with the Tier-2 student — not the metro aspirant — is what separates PhysicsWallah from every other EdTech platform. Price is not just a business decision. At PW, it is the mission statement.",
    tags: ["Profitable", "Bootstrapped to Unicorn", "Tier-2 Focus"],
  },
  {
    name: "Unacademy",
    nameShort: "Unacademy",
    founder: "Gaurav Munjal",
    role: "Co-founder & CEO",
    city: "Bengaluru",
    founded: "2015",
    valuation: "$3.4B",
    funding: "$860M+",
    sector: "Test Prep · Live Classes",
    accent: "#DC2626",
    accentBg: "#FEF2F2",
    accentBorder: "#FCA5A5",
    slug: "unacademy",
    imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    initials: "GM",
    philosophy: "Build for the student who almost made it",
    quote: "We are not a technology company that teaches. We are an education company that uses technology.",
    why: "Pioneered educator-led live classes and built India's largest test-prep platform before the correction. The company's rebuild story — from a $3.4B valuation to profitability-first operations — is a masterclass in crisis navigation.",
    keyInsight: "Unacademy was the first Indian EdTech to show that a marketplace of educators — not an in-house content factory — could scale to millions of students. The model influenced every platform that followed.",
    tags: ["IPO Pipeline", "UPSC + IIT-JEE", "Educator Marketplace"],
  },
  {
    name: "Eruditus",
    nameShort: "Eruditus",
    founder: "Ashwin Damera",
    role: "Co-founder & CEO",
    city: "Mumbai",
    founded: "2010",
    valuation: "$3.2B",
    funding: "$900M+",
    sector: "Executive Education",
    accent: "#7C3AED",
    accentBg: "#F5F3FF",
    accentBorder: "#C4B5FD",
    slug: "eruditus",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    initials: "AD",
    philosophy: "Partner with the world's best, deliver to everyone",
    quote: "We exist so that a student in Patna can attend an MIT programme without leaving India.",
    why: "The quiet giant of Indian EdTech. Eruditus partners with MIT, Harvard, and Columbia — then delivers their executive programmes to professionals in 80+ countries. Their B2B enterprise model insulates them from consumer EdTech volatility.",
    keyInsight: "Damera identified that the premium segment — senior professionals willing to pay $3,000–$15,000 for global credentials — was completely ignored by every Indian EdTech platform chasing volume. Niche + premium = more durable unit economics.",
    tags: ["B2B Enterprise", "Harvard + MIT Partner", "Global Reach"],
  },
  {
    name: "upGrad",
    nameShort: "upGrad",
    founder: "Ronnie Screwvala",
    role: "Co-founder & Chairman",
    city: "Mumbai",
    founded: "2015",
    valuation: "$2.25B",
    funding: "$600M+",
    sector: "Higher Ed · Upskilling",
    accent: "#D97706",
    accentBg: "#FFFBEB",
    accentBorder: "#FDE68A",
    slug: "upgrad",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    initials: "RS",
    philosophy: "The working professional's hunger for credentials is infinite",
    quote: "Online degrees are not Plan B anymore. They are Plan A for the working professional who cannot pause their career.",
    why: "Screwvala — who sold UTV to Disney for $454M — chose EdTech as his next act at 60. upGrad proved that hybrid campus + digital is the model that survives. Their acquisition of universities has given them infrastructure no pure-play platform can match.",
    keyInsight: "The working adult market in India is massively underserved. 500M people between 22 and 45 want to upskill, retrain, or credential-stack. upGrad is building the infrastructure for that market — not the 18-year-old JEE aspirant.",
    tags: ["Hybrid Campus + Digital", "University Acquisitions", "Working Adults"],
  },
  {
    name: "Classplus",
    nameShort: "Classplus",
    founder: "Mukul Rustagi",
    role: "Co-founder & CEO",
    city: "Noida",
    founded: "2018",
    valuation: "$570M",
    funding: "$185M",
    sector: "Educator Infrastructure",
    accent: "#0284C7",
    accentBg: "#EFF6FF",
    accentBorder: "#7DD3FC",
    slug: "classplus",
    imgSrc: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=80",
    initials: "MR",
    philosophy: "Enable the 10 million educators who teach India",
    quote: "Alakh Pandey did not win because he was smarter. He won because he had the right tools at the right time. Classplus is those tools for every educator in India.",
    why: "The pick-and-shovel play in India's EdTech gold rush. Classplus builds white-label apps, payment processing, and student management tools for India's 200,000+ independent coaching institutes. Infrastructure businesses always outlast consumer platforms.",
    keyInsight: "Every EdTech unicorn is fighting for the same student. Classplus is building for the educator. 200,000+ tutors and coaching institutes run their entire operation on Classplus. They don't compete with PhysicsWallah — they enable the next one.",
    tags: ["B2B SaaS", "200K+ Educators", "Pick-and-Shovel"],
  },
  {
    name: "BYJU'S",
    nameShort: "BYJU'S",
    founder: "Byju Raveendran",
    role: "Founder & former CEO",
    city: "Bengaluru",
    founded: "2011",
    valuation: "Under NCLT",
    funding: "$5.8B raised",
    sector: "K-12 Learning App",
    accent: "#475569",
    accentBg: "#F8FAFC",
    accentBorder: "#CBD5E1",
    slug: "byjus",
    imgSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    initials: "BR",
    philosophy: "Fall in love with learning, not the exam",
    quote: "We were not building a test-prep company. We were building a love for learning. We may have moved too fast, but the mission was never wrong.",
    why: "The most studied cautionary tale in Indian startup history — and the company that proved EdTech's ceiling. BYJU'S raised $5.8B, reached 150M registered users, and then collapsed under governance failures and unsustainable CAC. Every lesson here is as valuable as the success story.",
    keyInsight: "BYJU'S proved the demand ceiling is enormous. It also proved that growth-at-all-costs without financial discipline is not a strategy — it is a delayed crisis. The post-BYJU's EdTech sector is defined entirely by the lessons learned from this failure.",
    tags: ["Cautionary Tale", "150M Users", "NCLT Proceedings"],
  },
]

const ECOSYSTEM_STATS = [
  { v: "7",      l: "EdTech Unicorns" },
  { v: "$400M",  l: "Raised in 2025" },
  { v: "350M+",  l: "Students in India" },
  { v: "$30B",   l: "Market by 2030" },
]

const TRAITS = [
  { no: "01", trait: "Price Sensitivity is the Insight",        desc: "Every winning EdTech product in India found the exact price point that felt like value — not charity. ₹999/year (PW) or ₹0 (YouTube) beats ₹50,000/year (BYJU's) in the long run." },
  { no: "02", trait: "The Educator is the Product",             desc: "Unacademy and Classplus proved that branded educators — not branded content — drive retention. Students follow teachers, not platforms." },
  { no: "03", trait: "Offline is Not the Enemy",                desc: "PhysicsWallah opened 200+ physical centres. upGrad acquired universities. The best EdTech companies are omnichannel, not anti-offline." },
  { no: "04", trait: "Profitability Discipline Post-2022",      desc: "Every funded EdTech platform that survived the 2022-23 correction did so by cutting CAC, reducing headcount, and chasing margin. Profitability became the only metric that mattered." },
  { no: "05", trait: "B2B Always Had Better Unit Economics",    desc: "Eruditus and Classplus — both B2B — have more predictable revenue, lower churn, and higher LTV than any B2C EdTech platform. The market knew this. Founders took time to listen." },
  { no: "06", trait: "Vernacular is the Next Moat",             desc: "The next 100M EdTech users will learn in Hindi, Tamil, Telugu, and Bengali — not English. Platforms building vernacular-first content are compounding a language moat that no metro-born competitor can easily replicate." },
]

const TRENDS = [
  { num: "01", title: "Profitability as the New Product-Market Fit",  body: "The era of chasing MAUs is over. Investors now ask for EBITDA visibility at Series B. PhysicsWallah's profitable model is the sector benchmark. Every board meeting in EdTech now starts with gross margin, not user growth." },
  { num: "02", title: "Vernacular + Regional EdTech",                  body: "Platforms in Hindi, Tamil, Telugu, and Bengali are growing at 3x the rate of English-only peers. The next breakthrough EdTech company will likely be built in Lucknow or Coimbatore, not Bengaluru." },
  { num: "03", title: "AI Tutors — From Demo to Deployment",           body: "Every major platform launched AI-powered tutors in 2025. The differentiation in 2026 is personalisation depth — adapting to a student's specific knowledge gap, not just their topic preference. The generic AI tutor is already a commodity." },
  { num: "04", title: "Skill-to-Job Guarantee Becomes Architecture",   body: "Income share agreements and job-placement guarantees are moving from marketing language to actual product design. Platforms that own the hiring pipeline — not just the learning journey — command premium LTV and dramatically lower churn." },
  { num: "05", title: "Government EdTech — The $2B Opportunity",       body: "NEP 2020 created unprecedented government procurement in EdTech. Startups navigating DPIIT and state education ministry partnerships have access to scale that no consumer CAC budget can match." },
  { num: "06", title: "Offline-Online Hybrid Wins Every Category",     body: "Pure-play online lost. Pure-play offline is too slow. The winners in 2026 — PhysicsWallah, upGrad, Eruditus — all operate hybrid models. The classroom never died. It got a software layer." },
]

const FAQS = [
  { q: "Which is the most valuable EdTech company in India?",     a: "By valuation in 2026: Unacademy ($3.4B) leads, followed by Eruditus ($3.2B) and PhysicsWallah ($2.8B). By active paying users and revenue growth, PhysicsWallah is the most admired platform in the sector today." },
  { q: "How many EdTech unicorns are in India?",                  a: "India has 7 EdTech unicorns as of March 2026: BYJU'S, Unacademy, upGrad, Eruditus, PhysicsWallah, Vedantu, and Classplus. The sector raised $400M in 2025 — modest compared to 2021's peak but capital-efficient by 2026 standards." },
  { q: "Is PhysicsWallah profitable?",                            a: "Yes. PhysicsWallah achieved EBITDA profitability in FY2024 — one of the very few EdTech unicorns to do so. Their low-price, high-volume model with a ₹999/year core product generates sufficient margins through physical centres, merchandise, and premium add-ons." },
  { q: "What killed BYJU'S?",                                     a: "BYJU'S failed due to a combination of governance issues, unsustainable customer acquisition costs (door-to-door sales teams spending ₹20,000 to acquire a ₹40,000 customer), aggressive acquisitions without integration, and a fundamental mismatch between reported metrics and operational reality." },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage", "@id": "https://upforge.in/edtech-startups",
      url: "https://upforge.in/edtech-startups",
      name: "EdTech Startups India 2026 — Complete Guide | UpForge",
      description: "Profiles, playbooks, and lessons from India's top EdTech companies.",
      dateModified: "2026-03-10",
      isPartOf: { "@type": "WebSite", name: "UpForge", url: "https://upforge.in" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://upforge.in" },
          { "@type": "ListItem", position: 2, name: "Indian Startups", item: "https://upforge.in/indian-startups" },
          { "@type": "ListItem", position: 3, name: "EdTech Startups", item: "https://upforge.in/edtech-startups" },
        ],
      },
    },
    {
      "@type": "Article",
      headline: "EdTech Startups India 2026 — Complete Sector Guide",
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
      name: "Top EdTech Startups India 2026",
      numberOfItems: COMPANIES.length,
      itemListElement: COMPANIES.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: `${c.name} — ${c.sector}`, url: `https://upforge.in/startup/${c.slug}` })),
    },
  ],
}

export default function EdtechStartupsPage() {
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

      {/* ══ BREADCRUMB ══ */}
      <nav style={{ background: "#EDE9DF", borderBottom: "1px solid #C8C2B4", fontFamily: "system-ui,sans-serif" }} aria-label="Breadcrumb">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-2.5">
          <ol className="flex flex-wrap items-center gap-1.5" itemScope itemType="https://schema.org/BreadcrumbList">
            {[["Home", "/"], ["Indian Startups", "/indian-startups"], ["EdTech Startups", "#"]].map(([label, href], i) => (
              <li key={label} className="flex items-center gap-1.5" itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
                {href === "#"
                  ? <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#1A1208" }} itemProp="name">{label}</span>
                  : <Link href={href} className="text-[10px] uppercase tracking-wider hover:text-[#1A1208] transition-colors" style={{ color: "#AAA" }} itemProp="item"><span itemProp="name">{label}</span></Link>
                }
                <meta itemProp="position" content={String(i + 1)} />
                {i < 2 && <ChevronRight className="w-3 h-3" style={{ color: "#C8C2B4" }} />}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* ══ MASTHEAD ══ */}
      <header className="fu fu1" style={{ background: "#F3EFE5", borderBottom: "3px solid #1A1208" }}>
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          {/* Top rule */}
          <div className="flex items-center justify-between flex-wrap gap-3 py-3" style={{ borderBottom: "1px solid #C8C2B4" }}>
            <div className="flex items-center gap-2" style={{ fontFamily: "system-ui,sans-serif" }}>
              <span className="w-6 h-px" style={{ background: "#059669" }} />
              <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "#AAA" }}>UpForge Intelligence · March 2026 · EdTech Sector</span>
            </div>
            <span className="text-[8.5px] font-black uppercase tracking-[0.2em] px-3 py-1.5 border" style={{ color: "#059669", borderColor: "#059669", fontFamily: "system-ui,sans-serif" }}>Sector Guide</span>
          </div>

          {/* Headline */}
          <div className="text-center py-10 sm:py-14" style={{ borderBottom: "1px solid #C8C2B4" }}>
            <h1 className="pf font-black leading-[1.04] tracking-tight text-[#1A1208]" style={{ fontSize: "clamp(2rem,5.5vw,4.4rem)", marginBottom: 16 }}>
              EdTech Startups India
              <br />
              <em className="pf italic" style={{ color: "#059669" }}>The Complete Guide</em> — 2026
            </h1>
            <p className="italic leading-[1.72] max-w-2xl mx-auto" style={{ fontSize: "clamp(14px,2vw,17px)", color: "#5A4A30", marginBottom: 20 }}>
              The companies, founders, playbooks, and hard lessons that define India's education technology sector — from PhysicsWallah's ₹999 revolution to BYJU'S $5.8B cautionary tale.
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 sm:w-28" style={{ background: "#C8C2B4" }} />
              <span style={{ color: "#C8C2B4", fontSize: 14 }} aria-hidden="true">✦</span>
              <div className="h-px w-16 sm:w-28" style={{ background: "#C8C2B4" }} />
            </div>
          </div>

          {/* Byline */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 py-3" style={{ fontFamily: "system-ui,sans-serif" }}>
            {["By UpForge Editorial", "22 min read", "Updated March 2026", "6 company profiles"].map((item, i, arr) => (
              <span key={i} className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-wider" style={{ color: "#AAA" }}>{item}</span>
                {i < arr.length - 1 && <span style={{ color: "#C8C2B4", fontSize: 12 }}>·</span>}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ══ BODY ══ */}
      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 pb-24" itemScope itemType="https://schema.org/Article">
        <meta itemProp="headline" content="EdTech Startups India 2026 — Complete Sector Guide" />
        <meta itemProp="datePublished" content="2026-03-10" />
        <meta itemProp="author" content="UpForge Editorial" />

        {/* Hero image */}
        <figure className="fu fu1" style={{ margin: "clamp(20px,4vw,36px) 0", borderBottom: "1px solid #C8C2B4", paddingBottom: "clamp(20px,4vw,36px)" }}>
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=85"
              alt="Indian students in a classroom — the market that EdTech startups are building for"
              style={{ width: "100%", height: "clamp(200px,32vw,400px)", objectFit: "cover", display: "block", filter: "sepia(18%) contrast(105%)" }}
              loading="eager"
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(243,239,229,0) 60%, rgba(243,239,229,0.55) 100%)" }} />
          </div>
          <figcaption className="mt-2 italic" style={{ fontSize: 10, color: "#BBB0A0", fontFamily: "system-ui,sans-serif" }}>
            India's 350M+ students represent the largest addressable education market in the world. The founders below are building the infrastructure to serve them.
          </figcaption>
        </figure>

        {/* Intro prose */}
        <section className="fu fu2" style={{ maxWidth: 780, marginBottom: "clamp(24px,4vw,40px)", paddingBottom: "clamp(20px,4vw,36px)", borderBottom: "1px solid #C8C2B4" }} itemProp="articleBody">
          <p className="dropcap leading-[1.88]" style={{ fontSize: "clamp(14px,1.6vw,16px)", marginBottom: 16, color: "#2C2010", fontFamily: "'Georgia','Times New Roman',serif" }}>
            The Indian EdTech sector has lived more in five years than most industries experience in two decades. It saw the largest startup funding rounds, the most audacious valuations, the most public collapse, and the most important reset. The lesson from this era is not that EdTech does not work in India. It is that India's education market rewards honesty about the customer — their income, their aspirations, their relationship with price — and punishes every fantasy borrowed from Silicon Valley.
          </p>
          <p style={{ fontSize: "clamp(14px,1.6vw,16px)", lineHeight: 1.88, color: "#2C2010", fontFamily: "'Georgia','Times New Roman',serif" }}>
            The companies profiled here represent the full spectrum of that story. Some are cautionary. Some are inspiring. All of them are instructive. Study how each one defined its customer, how it priced its product, and how it navigated the 2022–23 correction. Those decisions — more than any technology or marketing strategy — explain who survived and who did not.
          </p>
        </section>

        {/* Why this matters strip */}
        <div className="fu fu2 grid sm:grid-cols-3" style={{ marginBottom: "clamp(28px,4vw,48px)", border: "2px solid #1A1208", gap: "1.5px", background: "#1A1208" }}>
          {[
            ["₹999 vs ₹50,000", "The price gap between PhysicsWallah and BYJU'S tells you everything about what Indian students will actually pay — and what they won't. Price discovery is EdTech's most important experiment."],
            ["350M Students, 7 Unicorns", "The demand is not the constraint. India has the world's largest student population. The companies that cracked monetisation, not just user acquisition, are the ones still standing."],
            ["B2B Outlasts B2C", "Eruditus and Classplus — both B2B — have more predictable revenue and lower churn than any B2C EdTech platform. This pattern repeats across every sector in Indian startup history."],
          ].map(([t, d]) => (
            <div key={String(t)} style={{ background: "#FDFCF9", padding: "clamp(14px,2.5vw,24px)", borderTop: "3px solid #059669" }}>
              <p className="pf" style={{ fontSize: 13.5, fontWeight: 700, color: "#1A1208", margin: "0 0 8px", lineHeight: 1.4 }}>{t}</p>
              <p style={{ fontSize: 11.5, color: "#5A4A30", margin: 0, fontFamily: "system-ui,sans-serif", lineHeight: 1.65 }}>{d}</p>
            </div>
          ))}
        </div>

        {/* Ecosystem stats */}
        <div className="fu fu2 grid grid-cols-2 sm:grid-cols-4" style={{ border: "2px solid #1A1208", background: "#1A1208", gap: "1.5px", marginBottom: "clamp(28px,4vw,48px)" }}>
          {ECOSYSTEM_STATS.map((s, i) => (
            <div key={i} style={{ background: "#FDFCF9", padding: "clamp(12px,2.5vw,20px)" }}>
              <p className="pf font-black leading-none" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#059669", marginBottom: 6 }}>{s.v}</p>
              <p className="text-[9px] uppercase tracking-[0.18em]" style={{ color: "#AAA", fontFamily: "system-ui,sans-serif", margin: 0 }}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Section rule */}
        <div className="fu fu3 flex items-center gap-3 mb-8" style={{ paddingTop: "clamp(16px,3vw,24px)", borderTop: "2px solid #1A1208" }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: "#B45309", letterSpacing: ".2em", fontFamily: "system-ui,sans-serif" }}>§01</span>
          <h2 className="pf hero-rule" style={{ fontSize: "clamp(1.2rem,2.5vw,1.8rem)", fontWeight: 900, margin: 0 }}>India's Top EdTech Companies — Profiles & Playbooks</h2>
          <div className="hero-rule flex-1 h-px" style={{ background: "#C8C2B4" }} />
        </div>

        {/* Company profiles */}
        <div className="fu fu3 space-y-0" role="list">
          {COMPANIES.map((c, i) => (
            <div key={i} className="company-card" role="listitem" itemScope itemType="https://schema.org/Organization">
              <meta itemProp="name" content={c.name} />
              <meta itemProp="foundingDate" content={c.founded} />
              <meta itemProp="address" content={c.city} />

              <div className="card-inner company-grid grid" style={{ gridTemplateColumns: "1fr clamp(160px,20%,200px)", border: "1.5px solid #1A1208", marginBottom: "1.5px", background: "#1A1208", gap: "1.5px" }}>
                {/* Content panel */}
                <div style={{ background: "#FDFCF9", padding: "clamp(16px,3vw,28px)", order: i % 2 === 0 ? 0 : 1 }}>
                  {/* Header */}
                  <div className="flex flex-wrap items-baseline gap-3 mb-1" style={{ paddingBottom: 10, borderBottom: `2px solid ${c.accent}` }}>
                    <h3 className="pf" style={{ fontSize: "clamp(1.2rem,2.5vw,1.55rem)", fontWeight: 900, color: "#1A1208", margin: 0, lineHeight: 1.1 }}>{c.name}</h3>
                    <span className="tag-pill" style={{ color: c.accent, borderColor: c.accent }}>{c.sector}</span>
                    <span style={{ fontSize: 10, color: "#AAA", fontFamily: "system-ui,sans-serif" }}>{c.city} · Est. {c.founded}</span>
                  </div>

                  {/* Founder byline */}
                  <div className="flex flex-wrap items-center gap-2 mt-3 mb-4" style={{ fontFamily: "system-ui,sans-serif" }}>
                    <span style={{ fontSize: 9, color: "#AAA", textTransform: "uppercase", letterSpacing: ".12em" }}>Founder</span>
                    <span style={{ color: "#C8C2B4", fontSize: 10 }}>·</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1208" }}>{c.founder}</span>
                    <span style={{ color: "#C8C2B4", fontSize: 10 }}>·</span>
                    <span style={{ fontSize: 10, color: "#6B5C40" }}>{c.role}</span>
                    {c.tags.map(t => (
                      <span key={t} style={{ fontSize: 8, color: c.accent, border: `1px solid ${c.accentBorder}`, background: c.accentBg, padding: "1px 7px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", fontFamily: "system-ui,sans-serif" }}>{t}</span>
                    ))}
                  </div>

                  {/* Body columns */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Left: Why Follow + Quote */}
                    <div>
                      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#AAA", fontFamily: "system-ui,sans-serif", marginBottom: 5 }}>Why It Matters</p>
                      <p style={{ fontSize: 12.5, color: "#5A4A30", lineHeight: 1.7, marginBottom: 14, fontFamily: "'Georgia',serif" }}>{c.why}</p>
                      <blockquote style={{ background: "#F3EFE5", borderLeft: `3px solid ${c.accent}`, padding: "10px 14px", margin: 0 }}>
                        <p className="pf italic" style={{ fontSize: 13, color: "#2C2010", margin: 0, lineHeight: 1.68 }}>"{c.quote}"</p>
                        <p style={{ fontSize: 9, color: "#AAA", fontFamily: "system-ui,sans-serif", margin: "6px 0 0", textTransform: "uppercase", letterSpacing: ".14em" }}>— {c.founder}, {c.name}</p>
                      </blockquote>
                    </div>

                    {/* Right: Key Insight + Philosophy + Stats + Link */}
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

                {/* Accent panel */}
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
                    <div style={{ display: "none", width: "100%", height: "clamp(100px,15vw,180px)", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,.15)", fontSize: "2rem", fontFamily: "Georgia,serif", fontWeight: 900, color: "#fff" }}>
                      {c.initials}
                    </div>
                  </div>
                  <div>
                    <p className="pf font-black" style={{ fontSize: "clamp(.95rem,1.8vw,1.2rem)", color: "#FDFCF9", lineHeight: 1.15, margin: "0 0 3px" }}>{c.name}</p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,.65)", margin: "0 0 5px", fontFamily: "system-ui,sans-serif" }}>{c.founder}</p>
                    <p style={{ fontSize: 9, color: "rgba(255,255,255,.45)", fontFamily: "system-ui,sans-serif", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>{c.funding} raised</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Traits section */}
        <div className="fu fu4 flex items-center gap-3 mb-6 mt-14" style={{ paddingTop: "clamp(16px,3vw,24px)", borderTop: "2px solid #1A1208" }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: "#B45309", letterSpacing: ".2em", fontFamily: "system-ui,sans-serif" }}>§02</span>
          <h2 className="pf" style={{ fontSize: "clamp(1.2rem,2.5vw,1.8rem)", fontWeight: 900, margin: 0 }}>6 Patterns Every Surviving EdTech Shares</h2>
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
          <h2 className="pf" style={{ fontSize: "clamp(1.2rem,2.5vw,1.8rem)", fontWeight: 900, margin: 0 }}>Key Trends Shaping EdTech in 2026</h2>
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
            "The BYJU's collapse is the most important event in Indian EdTech history — not because of its scale, but because of what it reveals about the customer. The Indian student and their parents will pay for outcomes, not for content. Build for the outcome, price it honestly, and deliver it at a price that works in Tier-2 India. Everything else is just technology."
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
            "Price is not a number. In India, price is a statement about who you believe your customer is."
          </blockquote>
          <span style={{ display: "block", color: "#C8C2B4", fontSize: 18, margin: "12px 0 8px" }}>❧</span>
          <p style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: ".24em", color: "#AAA", fontFamily: "system-ui,sans-serif" }}>— A recurring observation across every EdTech founder profiled</p>
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
        <nav className="fu fu5 py-8" style={{ borderBottom: "1px solid #C8C2B4" }} aria-label="Continue exploring">
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".28em", textTransform: "uppercase", color: "#AAA", fontFamily: "system-ui,sans-serif", marginBottom: 16 }}>Continue Exploring</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: "Indian Startups Guide",     href: "/indian-startups" },
              { label: "Fintech Startups India",    href: "/fintech-startups" },
              { label: "D2C Startups India",        href: "/d2c-startups" },
              { label: "Indian Unicorns 2026",      href: "/indian-unicorns" },
              { label: "Top AI Startups India",     href: "/top-ai-startups" },
              { label: "Founder Chronicles",        href: "/" },
              { label: "Startup Registry India",   href: "/startup" },
              { label: "Submit Your Startup",       href: "/submit" },
            ].map(l => (
              <Link key={l.href} href={l.href} className="flex items-center gap-1.5 transition-all nbtn" style={{ padding: "10px 12px", background: "white", border: "1px solid #D8D2C4", textDecoration: "none", color: "#1A1208", fontSize: 10.5, fontFamily: "system-ui,sans-serif", fontWeight: 600, letterSpacing: ".04em" }}>
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
            <p className="pf font-bold text-white leading-snug mb-2" style={{ fontSize: "clamp(1rem,2.5vw,1.5rem)" }}>Your EdTech startup belongs in this list.</p>
            <p style={{ fontSize: 12.5, color: "rgba(255,255,255,.5)", maxWidth: 380, fontFamily: "system-ui,sans-serif", lineHeight: 1.65 }}>Get independently verified and listed in India's most trusted startup registry. Free forever. Google-indexed. Trusted by founders and investors.</p>
          </div>
          <Link href="/submit" className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 font-bold tracking-wide hover:opacity-90 transition-opacity" style={{ background: "#E8C547", color: "#111", fontSize: 11, fontFamily: "system-ui,sans-serif", textDecoration: "none" }}>
            List Your Startup — Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <footer className="mt-6">
          <p style={{ fontSize: 9.5, color: "#BBB0A0", lineHeight: 1.65, fontFamily: "system-ui,sans-serif", borderTop: "1px solid #D8D2C4", paddingTop: 14 }}>
            * Profile details sourced from Tracxn, Inc42, Forbes India, company disclosures, and public interviews as of March 2026. UpForge is an independent registry — no paid placements, no sponsored rankings. Valuations are approximate and reflect latest available public data.
          </p>
          <nav aria-label="Footer navigation" className="mt-4">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "Founder Chronicles", h: "/" }, { l: "Indian Startups", h: "/indian-startups" },
                { l: "Fintech Startups", h: "/fintech-startups" }, { l: "D2C Startups", h: "/d2c-startups" },
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
