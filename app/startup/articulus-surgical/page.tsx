"use client"

// app/startup/articulus-surgical/page.tsx
// UpForge — Articulus Surgical · Saurya Mishra Founder Chronicle
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
      "@id": "https://upforge.in/startup/articulus-surgical#article",
      "headline": "Articulus Surgical — How Saurya Mishra Is Building India's Most Affordable Surgical Robot",
      "description": "Articulus Surgical founder story — IIT Kharagpur alumnus Saurya Mishra left Philips Healthcare to build India's first indigenous, interoperable surgical robotics ecosystem. Backed by Kalaari Capital. 90–95% Made in India. Targeting 5,000 deployments across Tier II and III cities.",
      "url": "https://upforge.in/startup/articulus-surgical",
      "datePublished": "2026-03-14T00:00:00+05:30",
      "dateModified": "2026-03-14T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.in/Upforge-articulus-surgical.webp",
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
          "name": "Saurya Mishra",
          "jobTitle": "Founder & CEO",
          "worksFor": { "@type": "Organization", "name": "Articulus Surgical" },
          "alumniOf": { "@type": "CollegeOrUniversity", "name": "IIT Kharagpur" },
          "sameAs": ["https://www.linkedin.com/company/articulus-surgical/"]
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "Articulus Surgical",
        "url": "https://www.articulussurgical.com",
        "foundingDate": "2021",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        },
        "description": "Articulus Surgical is a deep-tech medical device company building an indigenous, interoperable surgical robotics ecosystem for minimally invasive soft-tissue surgery. Its three-product platform — Pulsar (surgical robot), Galaxi (optics robot), and Nebula (simulation trainer) — is designed for affordability, compactness, and compatibility with existing hospital infrastructure.",
        "sameAs": [
          "https://www.articulussurgical.com",
          "https://www.linkedin.com/company/articulus-surgical/"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "MedTech Startups India", "item": "https://upforge.in/medtech-startups" },
        { "@type": "ListItem", "position": 4, "name": "Articulus Surgical", "item": "https://upforge.in/startup/articulus-surgical" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who founded Articulus Surgical?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Articulus Surgical was founded in 2021 by Saurya Mishra, an IIT Kharagpur alumnus in Mechanical Engineering with a specialisation in robotics and control systems. He spent over a decade at Philips Healthcare India and as head of R&D at Morphle Labs (a YC-funded robotic pathology startup) before founding Articulus in Bengaluru. He is also a Fellow of the Royal Academy of Engineers, UK."
          }
        },
        {
          "@type": "Question",
          "name": "What products does Articulus Surgical make?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Articulus Surgical has built three products: Pulsar — a compact, on-demand surgical robot for minimally invasive procedures, at least 5x more affordable than competing systems in both Capex and Opex; Galaxi — an intelligent surgical optics robot; and Nebula — a surgical robotics simulation and training system, which is already in production and commercial deployment. The complete system is interoperable with existing laparoscopic hospital infrastructure."
          }
        },
        {
          "@type": "Question",
          "name": "Who has invested in Articulus Surgical?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Articulus Surgical raised an initial ₹8.8 crore seed round from IHFC (IIT Delhi), Gaurav Agarwal (Co-founder, Innvolution Healthcare), and Sandeep Daga (Nine Rivers Capital), with early support from Startup India, BIRAC Bio-Innovation Grant, and Yenepoya Medical College. In early 2026, the company raised a further undisclosed seed round led by Kalaari Capital to accelerate hospital rollout."
          }
        },
        {
          "@type": "Question",
          "name": "Is Articulus Surgical approved by CDSCO or FDA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Pulsar system is currently under development and has not yet received CDSCO (India) or FDA (US) approval for clinical use on humans. The company holds CDSCO test licences, with full certification targeted for mid-2026. Preclinical trials are underway, with clinical studies planned to begin in early 2026. Nebula (the training simulator) is already in commercial deployment."
          }
        },
        {
          "@type": "Question",
          "name": "How does Articulus compare to Da Vinci and other surgical robots?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Intuitive Surgical's Da Vinci system costs $1–2 million to install, with high per-procedure consumable costs — making it accessible to only the top 5% of Indian hospitals. Articulus Surgical's Pulsar is designed to be at least 5x more affordable on both capital and operating cost, interoperable with existing laparoscopic setups, and requires a smaller footprint. Articulus also offers a free-device, pay-per-procedure model for smaller hospitals to eliminate upfront cost barriers."
          }
        },
        {
          "@type": "Question",
          "name": "What is Articulus Surgical's Make in India focus?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Articulus Surgical manufactures 90–95% of its components in India, with custom-developed motors, proprietary control software, and embedded electronics all built in-house. The company has been recognised under NASSCOM Emerge 50 (2025), CNBC's Top 100 Startups (2024), and Forbes India's emerging startups edition (December 2023) for its contribution to India's MedTech self-reliance mission."
          }
        }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Lead Investor", v: "Kalaari" },
  { l: "Founded", v: "2021" },
  { l: "HQ", v: "Bengaluru" },
  { l: "Made in India", v: "90–95%" },
  { l: "Products", v: "3" },
  { l: "Target Deploy", v: "5,000+" },
]

const TIMELINE = [
  {
    year: "Pre-2021",
    event: "Saurya Mishra spends 14+ years in medical devices — R&D at Philips Healthcare India, then head of R&D at Morphle Labs (YC-funded robotic pathology). He builds India's first adult humanoid robot project along the way.",
  },
  {
    year: "2021",
    event: "Articulus Surgical founded in Bengaluru. Early support from Startup India, BIRAC Bio-Innovation Grant, and IIT Delhi's incubator IHFC. Mission: make robotic surgery accessible to the next 3 billion people.",
  },
  {
    year: "2022–23",
    event: "₹8.8 crore seed funding raised from IHFC, Gaurav Agarwal (Innvolution Healthcare), and Sandeep Daga (Nine Rivers Capital). Three-product ecosystem — Pulsar, Galaxi, Nebula — takes shape. Nebula (training simulator) enters commercial deployment.",
  },
  {
    year: "2023",
    event: "Featured in Forbes India's emerging startups edition (December 2023). Named CNBC's Top 100 Startups 2024. Saurya awarded Fellowship of the Royal Academy of Engineers, UK — one of the world's most prestigious engineering honours.",
  },
  {
    year: "2024–25",
    event: "CDSCO test licences secured. Preclinical trials commenced. ISO 13485 certification in progress. Full CDSCO certification targeted for mid-2026. Named NASSCOM Emerge 50 (2025). Customer pre-orders received from Indian hospitals.",
  },
  {
    year: "Early 2026",
    event: "Undisclosed seed round led by Kalaari Capital closed. Capital deployed to accelerate hospital rollout across India, establish dedicated surgeon training centres, and expand into general surgery, gynaecology, urology, GI surgery, and surgical oncology.",
  },
]

const COLS = [
  {
    h: "A Surgeon's Family, A Personal Crisis, A Mission",
    b: `Saurya Mishra grew up in Cuttack, Odisha, in a family of surgeons. He saw healthcare inequality not as a statistic but as daily life — the gap between what a patient in a Delhi private hospital could access and what was available to someone in a government ward in Odisha.\n\nThe moment that crystallised everything came when his mother needed a hysterectomy. She underwent open surgery — the standard in most Indian hospitals — and her long recovery interrupted her PhD work. Saurya knew that minimally invasive robotic surgery would have meant a fraction of the recovery time. He knew the technology existed. He knew it was simply unaffordable.\n\n"We aim to make advanced medical technologies, particularly surgical robotics, accessible to everyone, not just the privileged few," he says. It is not a pitch line. It is, quite literally, his mother's story.`,
  },
  {
    h: "14 Years in Medical Devices, Then One Leap",
    b: `Saurya did not walk straight from university into a startup. He spent over a decade building the specific expertise the problem demanded: R&D at Philips Healthcare India, then heading R&D at Morphle Labs — a YC-funded startup building robotic pathology systems.\n\nAt IIT Kharagpur, where he earned his B.Tech and M.Tech in Mechanical Engineering with a focus on robotics and control systems, he had already worked on India's first adult humanoid robot project. He understood, from years of hard experience, that the gap between a prototype and a certified medical device was measured not in months but in years of regulatory rigor.\n\nWhen he founded Articulus Surgical in 2021, he did so with unusual clarity about the full journey ahead — preclinical trials, CDSCO certification, surgeon training, hospital partnerships, and the patient capital needed for all of it. He built the company to last, not to flip.`,
  },
  {
    h: "Pulsar, Galaxi, Nebula — The Three-Robot Ecosystem",
    b: `India performs over 10 million minimally invasive abdominal surgeries annually, yet robotic surgery penetration sits below 1%. The reason is simple: a Da Vinci system costs $1–2 million to install, plus high per-procedure consumable fees. Only the top 5% of Indian hospitals can absorb that cost.\n\nArticulus's answer is Pulsar — a compact, on-demand surgical robot designed to be at least 5x more affordable in both capital and operating cost. It is interoperable with existing laparoscopic infrastructure (compatible with 2,500+ hospitals in India without new investment), requires a small footprint, and allows surgeons to switch between manual and robotic mode on-demand. Each robot contains 6–8 custom-built motors that move in precise synchrony, controlled by proprietary software that filters unintended movements in real time at 10,000 readings per second.\n\nGalaxi is the optics companion — an intelligent camera robot for surgical visibility. Nebula is the training simulator, already commercially deployed, ensuring surgeon adoption from day one. Together, the three form a complete, self-contained robotic surgery ecosystem — 90–95% built in India, targeting 5,000 deployments across Tier II and III cities.`,
  },
]

const PULL_QUOTE = {
  text: "Robot plus surgeon is better than robot alone, and better than surgeon alone. We are not replacing the surgeon. We are making every surgeon's hands more precise.",
  by: "Saurya Mishra, Founder & CEO, Articulus Surgical",
}

const LESSON =
  "The most important MedTech companies are not built on moonshot science — they are built on the unshakeable conviction that what already exists in elite hospitals should exist everywhere. Articulus is not inventing robotic surgery. It is making it Indian, affordable, and universal."

const SUPPORTERS = [
  "Kalaari Capital (Lead, 2026 Seed)",
  "IHFC — IIT Delhi",
  "Gaurav Agarwal, Innvolution Healthcare",
  "Sandeep Daga, Nine Rivers Capital",
  "BIRAC Bio-Innovation Grant",
  "Startup India",
  "Yenepoya Medical College",
  "Royal Academy of Engineers, UK",
]

const FAQS = [
  {
    q: "Who founded Articulus Surgical and what is his background?",
    a: "Saurya Mishra founded Articulus Surgical in 2021 in Bengaluru. He is an IIT Kharagpur alumnus with B.Tech and M.Tech in Mechanical Engineering (robotics focus). He spent 14+ years in medical devices — R&D at Philips Healthcare India and as head of R&D at Morphle Labs (YC-funded). He is a Fellow of the Royal Academy of Engineers, UK, and is inspired by a personal family experience with surgical inequality.",
  },
  {
    q: "What makes Pulsar different from Da Vinci or CMR Surgical?",
    a: "Pulsar is designed to be at least 5x more affordable than existing systems on both Capex (purchase cost) and Opex (per-procedure cost). It is interoperable with existing laparoscopic hospital infrastructure, has a compact footprint for smaller ORs, and offers on-demand switching between manual and robotic modes. Articulus also offers a free-device, pay-per-procedure model for smaller hospitals — removing the upfront cost barrier entirely.",
  },
  {
    q: "What recognition has Articulus Surgical received?",
    a: "Articulus has been named in NASSCOM Emerge 50 (2025), CNBC's Top 100 Startups (2024), and Forbes India's emerging startups (December 2023). Founder Saurya Mishra has been awarded a Fellowship from the Royal Academy of Engineers, UK — one of the most prestigious international engineering honours. The company has also been backed by BIRAC's Bio-Innovation Grant and Startup India.",
  },
  {
    q: "When will Articulus Surgical's Pulsar receive regulatory approval?",
    a: "Articulus holds CDSCO test licences and full certification is targeted for mid-2026. Preclinical trials are underway. Clinical studies are planned to begin in early 2026. The Nebula simulation and training system is already in commercial deployment. Pulsar has not yet received CDSCO (India) or FDA (US) approval for clinical use on humans.",
  },
]

const RELATED = [
  { name: "Agnikul Cosmos", slug: "agnikul-cosmos", cat: "Spacetech", val: "$500M" },
  { name: "Alt Mobility", slug: "alt-mobility", cat: "EV Leasing", val: "$17.3M" },
  { name: "Sarvam AI", slug: "sarvam-ai", cat: "Artificial Intelligence", val: "$1B+" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ArticulusSurgicalPage() {
  const accent = "#9f1239"
  const accentDark = "#881337"
  const accentBg = "#fff1f2"
  const accentBorder = "#fecdd3"

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
        Articulus Surgical Founder Story — Saurya Mishra | India's Affordable Surgical Robot | Pulsar | Kalaari Capital | UpForge
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
            { n: "MedTech Startups India", h: "/medtech-startups" },
            { n: "Articulus Surgical", h: "/startup/articulus-surgical" },
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
            UpForge · Startup Registry · MedTech
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
            Edition · MedTech
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span
            className="text-[9px] font-black uppercase tracking-wider"
            style={{ color: accent }}
          >
            Surgical Robotics · March 2026
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
                MEDTECH / DEEPTECH
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">March 2026</span>
            </div>

            {/* Headline */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              His mother's surgery changed everything.{" "}
              <em style={{ color: accent }}>
                Now he's making robotic surgery affordable for 3 billion people.
              </em>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              Saurya Mishra left Philips Healthcare, led R&D at a YC startup, and spent 14 years
              mastering medical devices — all to build what India's hospitals can't afford to buy
              from Intuitive Surgical. Articulus Surgical's Pulsar robot is 5x cheaper than a
              Da Vinci, 90–95% Made in India, and backed by Kalaari Capital.
              India's surgical robotics revolution starts here.
            </p>

            {/* Byline */}
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}
            >
              {[
                "By UpForge Editorial",
                "Bengaluru, Karnataka",
                "Est. 2021",
                "Make in India · MedTech",
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
                src="/Upforge-articulus-surgical.webp"
                alt="Saurya Mishra, Founder & CEO of Articulus Surgical — UpForge Founder Chronicle"
                className="w-full object-cover object-top"
                style={{ height: "min(300px,60vw)", display: "block" }}
                loading="eager"
              />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>
                  Saurya Mishra
                </p>
                <p
                  className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  Founder & CEO · Articulus Surgical
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

            {/* FAQ — visual only, NO microdata (schema is in JSON-LD) */}
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
                  src="/Upforge-articulus-surgical.webp"
                  alt="Saurya Mishra, Founder & CEO of Articulus Surgical — UpForge Founder Chronicle"
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
                    Saurya Mishra
                  </p>
                  <p
                    className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Founder & CEO · Articulus Surgical
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.articulussurgical.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: `1.5px solid ${accent}`, textDecoration: "none" }}
                  aria-label="Visit Articulus Surgical official website"
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
                      articulussurgical.com
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/articulus-surgical/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View Articulus Surgical on LinkedIn"
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
                      LinkedIn — Articulus Surgical
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

              {/* Supporters & Backers */}
              <div style={{ border: "1px solid #D8D2C4" }}>
                <div
                  className="px-4 py-2"
                  style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}
                >
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Investors & Supporters
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {SUPPORTERS.map((inv, i) => (
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
            Explore More MedTech Startups on UpForge
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "MedTech Startups India 2026", h: "/medtech-startups" },
              { l: "Indian Unicorns Full List", h: "/indian-unicorns" },
              { l: "DeepTech Startups India", h: "/deep-tech-startups" },
              { l: "IIT Startups India", h: "/iit-startups" },
              { l: "Surgical Robotics India", h: "/medtech-startups/surgical-robotics-india" },
              { l: "Kalaari Capital Portfolio", h: "/investors/kalaari-capital" },
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
              <p
                className="pf font-bold text-[#1A1208] mb-2"
                style={{ fontSize: "1.2rem" }}
              >
                Building India's next unicorn? Get verified on UpForge.
              </p>
              <p
                className="text-[12px] text-[#6B5C40]"
                style={{ fontFamily: "system-ui,sans-serif" }}
              >
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
            * Data sourced from YourStory, Inc42, Tracxn, Royal Academy of Engineers, Kalaari
            Capital press releases, and Articulus Surgical public statements as of March 2026.
            UpForge is an independent registry — no paid placements, no sponsored rankings.
            Funding figures are approximate and reflect latest available public data. The Articulus
            Pulsar system is under development and not yet approved by CDSCO or FDA for clinical use.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "MedTech Startups India", h: "/medtech-startups" },
                { l: "DeepTech Startups", h: "/deep-tech-startups" },
                { l: "Startup Registry", h: "/startup" },
                { l: "Indian Unicorns", h: "/indian-unicorns" },
                { l: "Agnikul Cosmos Profile", h: "/startup/agnikul-cosmos" },
                { l: "Alt Mobility Profile", h: "/startup/alt-mobility" },
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
