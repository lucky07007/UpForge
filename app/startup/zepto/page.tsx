"use client"

// app/startup/zepto/page.tsx
// UpForge — Zepto · Aadit Palicha & Kaivalya Vohra Founder Chronicle
// SEO: full structured data, breadcrumbs, FAQ, timeline

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

// Updated video ID from https://youtu.be/nR2jv-r55bg
const VIDEO_ID = "nR2jv-r55bg"

// Founder image
const FOUNDER_IMG = "https://i.ytimg.com/vi/HBSOii00H68/maxresdefault.jpg"

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://upforge.in/startup/zepto#article",
      "headline": "Zepto — How Aadit Palicha & Kaivalya Vohra Built India's Fastest Unicorn at $5.9B",
      "description": "Full founder story of Zepto: how 19-year-old Stanford dropouts Aadit Palicha and Kaivalya Vohra failed with KiranaKart, pivoted to a dark store model, and built India's fastest-ever unicorn valued at $5.9B. $2.5B+ raised. 350+ dark stores. 10-minute delivery. Read on UpForge.",
      "url": "https://upforge.in/startup/zepto",
      "datePublished": "2026-03-01T00:00:00+05:30",
      "dateModified": "2026-03-10T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": { "@type": "ImageObject", "url": FOUNDER_IMG, "width": 1280, "height": 720 },
      "publisher": {
        "@type": "Organization", "name": "UpForge", "url": "https://upforge.in",
        "logo": { "@type": "ImageObject", "url": "https://upforge.in/logo.png" }
      },
      "author": { "@type": "Organization", "name": "UpForge Editorial" },
      "about": [
        {
          "@type": "Person", "name": "Aadit Palicha",
          "jobTitle": "Co-Founder & CEO",
          "worksFor": { "@type": "Organization", "name": "Zepto" },
          "alumniOf": "Stanford University",
          "sameAs": ["https://www.linkedin.com/in/aaditpalicha/"]
        },
        {
          "@type": "Person", "name": "Kaivalya Vohra",
          "jobTitle": "Co-Founder & CTO",
          "worksFor": { "@type": "Organization", "name": "Zepto" },
          "alumniOf": "Stanford University"
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "Zepto",
        "url": "https://www.zeptonow.com",
        "foundingDate": "2021",
        "foundingLocation": { "@type": "Place", "addressLocality": "Bengaluru", "addressCountry": "IN" },
        "description": "Zepto is India's leading quick commerce platform delivering groceries in under 10 minutes via a dark store model. Founded in 2021 by 19-year-old Stanford dropouts, Zepto became India's fastest-ever unicorn.",
        "sameAs": ["https://www.zeptonow.com", "https://twitter.com/zeptonow"]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "Quick Commerce India", "item": "https://upforge.in/quick-commerce-startups" },
        { "@type": "ListItem", "position": 4, "name": "Zepto", "item": "https://upforge.in/startup/zepto" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question", "name": "Who founded Zepto and how old were they?",
          "acceptedAnswer": { "@type": "Answer", "text": "Zepto was co-founded in 2021 by Aadit Palicha (CEO) and Kaivalya Vohra (CTO), both 19 years old at the time. They were Stanford University freshmen who dropped out and returned to India to build the company. They had previously attempted a grocery delivery startup called KiranaKart in 2020, which failed within months, before pivoting to the Zepto dark store model." }
        },
        {
          "@type": "Question", "name": "What is Zepto's current valuation and total funding?",
          "acceptedAnswer": { "@type": "Answer", "text": "As of 2025, Zepto is valued at $5.9 billion after its Series H round of $350 million. The company has raised over $2.5 billion in total funding from investors including Y Combinator, Nexus Venture Partners, Dragon Capital, Glade Brook Capital, and StepStone Group. Zepto achieved unicorn status in August 2023 at a $1.4B valuation — making it India's first unicorn of that year." }
        },
        {
          "@type": "Question", "name": "How does Zepto's dark store model work?",
          "acceptedAnswer": { "@type": "Answer", "text": "Zepto operates micro-fulfillment centers called dark stores — small warehouses placed within 1.5km of dense residential demand zones. Each dark store stocks 3,000–5,000 high-frequency SKUs covering roughly 80% of typical household grocery runs. Orders are picked, packed and dispatched to enable delivery in under 10 minutes. As of 2025, Zepto operates 350+ dark stores across 10+ Indian cities including Mumbai, Bengaluru, Delhi NCR, Hyderabad, Pune, and Chennai." }
        },
        {
          "@type": "Question", "name": "Who are Zepto's main competitors in India?",
          "acceptedAnswer": { "@type": "Answer", "text": "Zepto's primary competitors are Blinkit (owned by Zomato) and Swiggy Instamart. These three platforms together dominate India's quick commerce market, which crossed $3.3 billion in 2025. Zepto holds the second-largest market share. Older players like BigBasket have also expanded into quick delivery to compete." }
        },
        {
          "@type": "Question", "name": "Is Kaivalya Vohra India's youngest billionaire?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. As of 2024, Kaivalya Vohra became India's youngest billionaire at age 22, following Zepto's valuation milestone. Co-founder Aadit Palicha is similarly among India's youngest billionaires. Both founders started Zepto at age 19 after dropping out of Stanford University." }
        }
      ]
    }
  ]
}

const accent = "#D97706"
const accentBg = "#FFFBEB"
const accentBorder = "#FDE68A"

const STATS = [
  { l: "Valuation", v: "$5.9B" },
  { l: "Total Raised", v: "$2.5B+" },
  { l: "Dark Stores", v: "350+" },
  { l: "Cities", v: "10+" },
  { l: "Founded", v: "2021" },
  { l: "Age at Start", v: "19" },
]

const TIMELINE = [
  { year: "2020", event: "KiranaKart launched — and fails within months. Palicha & Vohra stay in India, don't return to Stanford" },
  { year: "2021", event: "Zepto founded. Dark store model crystallised: 1.5km radius, sub-10-min delivery, 3,000–5,000 SKUs per store" },
  { year: "Aug 2022", event: "Series D raises $200M. Zepto becomes one of India's most talked-about startups" },
  { year: "Aug 2023", event: "Zepto becomes India's first unicorn of 2023 — valuation $1.4B at just 2 years old" },
  { year: "2024", event: "Crosses 350 dark stores. Kaivalya Vohra, 22, becomes India's youngest billionaire" },
  { year: "2025", event: "Series H closes at $350M. Valuation: $5.9B. India quick commerce market crosses $3.3B" },
]

const RELATED = [
  { name: "Sarvam AI", slug: "sarvam-ai", cat: "Artificial Intelligence", val: "$1B+" },
  { name: "Zerodha", slug: "zerodha", cat: "Fintech", val: "$8.2B" },
  { name: "Zomato", slug: "zomato", cat: "FoodTech", val: "$25B+" },
]

export default function ZeptoPage() {
  useEffect(() => {
    const existing = document.getElementById("zepto-jsonld")
    if (!existing) {
      const s = document.createElement("script")
      s.id = "zepto-jsonld"; s.type = "application/ld+json"
      s.textContent = JSON.stringify(JSON_LD); document.head.appendChild(s)
    }
    return () => { document.getElementById("zepto-jsonld")?.remove() }
  }, [])

  useEffect(() => {
    document.title = "Zepto Founders Aadit Palicha & Kaivalya Vohra — $5.9B Quick Commerce Unicorn | UpForge"
  }, [])

  return (
    <div style={{ minHeight: "100vh", background: "#F3EFE5", fontFamily: "'Georgia','Times New Roman',serif" }} role="main">
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
        ::-webkit-scrollbar { width:3px; } ::-webkit-scrollbar-thumb { background:#C8C2B4; }
      `}</style>

      <h1 className="sr-only">
        Zepto Founder Story — Aadit Palicha &amp; Kaivalya Vohra | India's Fastest Unicorn at $5.9B | Dark Store Quick Commerce | UpForge
      </h1>

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="px-4 sm:px-8 py-2"
        style={{ background: "#EDE9DF", borderBottom: "1px solid #D8D2C4", fontFamily: "system-ui,sans-serif" }}>
        <ol className="flex flex-wrap items-center gap-1.5 text-[9px] text-[#AAA] uppercase tracking-widest">
          {[
            { n: "UpForge", h: "/" }, { n: "Startup Registry", h: "/startup" },
            { n: "Quick Commerce", h: "/quick-commerce-startups" }, { n: "Zepto", h: "/startup/zepto" },
          ].map((b, i, arr) => (
            <li key={i} className="flex items-center gap-1.5">
              {i < arr.length - 1
                ? <Link href={b.h} className="hover:text-[#1A1208] transition-colors">{b.n}</Link>
                : <span className="text-[#1A1208] font-semibold">{b.n}</span>}
              {i < arr.length - 1 && <ChevronRight className="w-2.5 h-2.5 text-[#C8C2B4]" />}
            </li>
          ))}
        </ol>
      </nav>

      {/* MASTHEAD */}
      <header style={{ background: "#F3EFE5", borderBottom: "3px solid #1A1208" }} role="banner">
        <div className="text-center px-4 pt-3 pb-6" style={{ borderBottom: "1px solid #C8C2B4" }}>
          <p className="text-[8px] tracking-[0.44em] text-[#AAA] uppercase mb-2" style={{ fontFamily: "system-ui,sans-serif" }}>
            UpForge · Startup Registry · Quick Commerce
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
        <div className="flex items-center px-4 sm:px-8 py-2 gap-4"
          style={{ fontFamily: "system-ui,sans-serif", borderBottom: "1px solid #C8C2B4" }}>
          <span className="text-[8px] text-[#AAA] uppercase tracking-widest flex-shrink-0">Edition No. 03</span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: accent }}>
            Quick Commerce · March 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">Bengaluru, Karnataka</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="fade-up max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]"
          style={{ borderBottom: "2px solid #1A1208" }}>

          {/* LEFT EDITORIAL */}
          <article className="py-8 lg:pr-8" style={{ borderRight: "1px solid #C8C2B4" }}>
            <div className="flex items-center gap-3 mb-5" style={{ fontFamily: "system-ui,sans-serif" }}>
              <span className="text-[8.5px] font-black tracking-[0.28em] uppercase px-3 py-1.5 text-white"
                style={{ background: accent }}>QUICK COMMERCE</span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">No. 03 · March 2026</span>
            </div>

            <h2 className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}>
              Two Stanford dropouts. One failed startup. Then a $5.9 billion answer to India's grocery problem.
            </h2>

            <p className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}>
              Aadit Palicha and Kaivalya Vohra were 19-year-old Stanford freshmen when they flew back to India
              and tried to solve grocery delivery. KiranaKart failed in months. What they built next —
              Zepto — became India's fastest-ever unicorn, valued at $5.9B, operating 350+ dark stores
              and delivering groceries in under 10 minutes across 10 cities.
            </p>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}>
              {["By UpForge Editorial", "Bengaluru, KA", "Est. 2021", "Dropped out at 19"].map((t, i, a) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-[9px] text-[#AAA] uppercase tracking-wider">{t}</span>
                  {i < a.length - 1 && <span className="text-[#C8C2B4] text-[10px]">·</span>}
                </span>
              ))}
            </div>

            {/* MOBILE PHOTO */}
            <div className="lg:hidden mb-8">
              <img src={FOUNDER_IMG}
                alt="Aadit Palicha and Kaivalya Vohra, co-founders of Zepto — India's fastest-ever unicorn at $5.9B"
                className="w-full object-cover object-top"
                style={{ height: "min(280px,55vw)" }}
                loading="eager" />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>Aadit Palicha & Kaivalya Vohra</p>
                <p className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}>Co-Founders · Zepto</p>
              </div>
            </div>

            {/* 3-COL BODY */}
            <div className="ncols">
              {[
                {
                  h: "The Failed First Act",
                  b: `In 2020, Palicha and Vohra were Stanford freshmen who flew back to India to build KiranaKart — a 45-minute grocery app. It failed in months. Most founders would have returned to California. These two stayed in Bengaluru, rented a room, and dissected every mistake with unusual discipline.\n\nThe pivot they arrived at was specific: dark stores placed within 1.5km of dense demand made 10-minute delivery a pure logistics equation, not a gimmick. Every competitor called it insane. The founders called it math.\n\nWhat separated Zepto from its eventual competitors wasn't marketing — it was the founders' willingness to treat their first failure as a laboratory. KiranaKart showed exactly what the market didn't want. Zepto was the hypothesis that emerged once the wrong answers were eliminated.`
                },
                {
                  h: "The $5.9B Math Problem",
                  b: `Zepto launched in 2021. The model was brutally simple: micro-warehouses (dark stores) densely stocked with the 3,000–5,000 SKUs that constitute 80% of household grocery runs, placed at maximum 1.5km from customers in high-density residential zones.\n\nThe delivery promise — under 10 minutes — was not a marketing claim. It was an engineering constraint that shaped every operational decision: store size, inventory depth, picker workflows, last-mile routing.\n\nBy August 2023, India had its first unicorn of the year — Zepto, at $1.4B. The $350M Series H in 2025 brought the valuation to $5.9B, making Palicha and Vohra among the youngest founders in the world to build a business at that scale. Kaivalya Vohra, at 22, became India's youngest billionaire. Zepto now operates 350+ dark stores across 10 cities.`
                },
                {
                  h: "What the Story Really Is",
                  b: `The Zepto story isn't about being young or lucky. It is about the discipline to treat failure as data, and the intellectual rigour to separate what customers say they want from what the operations can actually deliver.\n\nKiranaKart showed them what didn't work. Zepto was the answer once they knew the right question. That transition — from naive optimism to structured problem-solving — is the part of the story that matters most for the next generation of founders.\n\nIndia's quick commerce market crossed $3.3B in 2025. Zepto commands its second-largest share — earned not by being first, but by being most precise about what '10 minutes' actually requires behind the scenes: real estate logic, inventory science, and a relentless focus on unit economics that most of their peers still haven't cracked.`
                }
              ].map((col, ci) => (
                <div key={ci} className="mb-6 sm:mb-0">
                  <h3 className="font-black uppercase tracking-[0.13em] mb-3 pb-1.5"
                    style={{ fontSize: 11, color: "#1A1208", borderBottom: `1.5px solid ${accent}`, fontFamily: "system-ui,sans-serif" }}>
                    {col.h}
                  </h3>
                  {col.b.split("\n\n").map((p, pi) => (
                    <p key={pi} className={`leading-[1.9] mb-3 text-[#2C2010] ${ci === 0 && pi === 0 ? "dropcap" : ""}`}
                      style={{ fontSize: "clamp(12.5px,1.3vw,13.5px)" }}>{p}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* PULL QUOTE */}
            <div className="mt-10 pt-6 pb-6 text-center"
              style={{ borderTop: `3px solid ${accent}`, borderBottom: "1px solid #C8C2B4" }}>
              <span style={{ display: "block", color: accent, fontSize: 24, marginBottom: 10 }}>❝</span>
              <blockquote className="pf italic text-[#1A1208] leading-[1.7] max-w-2xl mx-auto px-4"
                style={{ fontSize: "clamp(15px,2.1vw,21px)" }}>
                "We failed with KiranaKart in months. Most people would have gone back to Stanford.
                We stayed in Bengaluru and figured out what we got wrong."
              </blockquote>
              <p className="text-[9px] uppercase tracking-[0.24em] text-[#AAA] mt-4"
                style={{ fontFamily: "system-ui,sans-serif" }}>
                — Aadit Palicha, Co-Founder &amp; CEO, Zepto
              </p>
            </div>

            {/* YOUTUBE VIDEO EMBED — fixed: proper embed URL format */}
            <div className="mt-8">
              <p className="text-[8.5px] font-black uppercase tracking-[0.26em] mb-3"
                style={{ color: accent, fontFamily: "system-ui,sans-serif", borderBottom: `1px solid ${accentBorder}`, paddingBottom: 8 }}>
                Watch · Zepto in Conversation
              </p>
              <div className="relative w-full" style={{ paddingBottom: "56.25%", background: "#000" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?si=sEDA8ZSmkd6skaGA`}
                  title="Zepto — Aadit Palicha on Building India's Fastest Unicorn, Dark Stores & Quick Commerce | UpForge Founder Interview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  style={{ border: "none" }}
                />
              </div>
              <p className="text-[10px] text-[#AAA] mt-2 italic" style={{ fontFamily: "system-ui,sans-serif" }}>
                Aadit Palicha on building Zepto — 10-minute delivery, dark stores &amp; India's quick commerce future — UpForge Featured Interview
              </p>
            </div>

            {/* TIMELINE */}
            <div className="mt-8">
              <p className="text-[8.5px] font-black uppercase tracking-[0.26em] mb-4"
                style={{ color: accent, fontFamily: "system-ui,sans-serif", borderBottom: `1px solid ${accentBorder}`, paddingBottom: 8 }}>
                Company Timeline
              </p>
              <ol style={{ fontFamily: "system-ui,sans-serif" }}>
                {TIMELINE.map((t, i) => (
                  <li key={i} className="flex gap-4 mb-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: accent }} />
                      {i < TIMELINE.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: accentBorder, minHeight: 24 }} />}
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: accent }}>{t.year}</span>
                      <p className="text-[12px] text-[#2C2010] mt-0.5 leading-relaxed">{t.event}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* THE LESSON BOX */}
            <div className="mt-8 p-5" style={{ background: accentBg, border: `1.5px solid ${accentBorder}` }}>
              <p className="text-[8px] font-black uppercase tracking-[0.26em] mb-3"
                style={{ color: accent, fontFamily: "system-ui,sans-serif" }}>UpForge Takeaway</p>
              <p className="pf italic text-[#1A1208] leading-[1.7]" style={{ fontSize: "clamp(14px,1.8vw,17px)" }}>
                "The first startup teaches you the question. The second one lets you answer it.
                Zepto didn't succeed despite KiranaKart — it succeeded <em>because</em> of it."
              </p>
            </div>

            {/* FAQ — visual only, NO microdata. JSON-LD above handles schema. */}
            <section className="mt-8">
              <p className="text-[8.5px] font-black uppercase tracking-[0.26em] mb-4"
                style={{ color: accent, fontFamily: "system-ui,sans-serif", borderBottom: `1px solid ${accentBorder}`, paddingBottom: 8 }}>
                Frequently Asked Questions
              </p>
              {[
                { q: "Who are the founders of Zepto and how old were they?", a: "Zepto was co-founded in 2021 by Aadit Palicha (CEO) and Kaivalya Vohra (CTO), both aged 19 at the time. They were Stanford University freshmen who dropped out to return to India. They had previously built KiranaKart in 2020 — a 45-minute grocery delivery app that failed within months — before pivoting to the Zepto dark store model." },
                { q: "What is Zepto's current valuation and total funding raised?", a: "As of 2025, Zepto is valued at $5.9 billion after its $350M Series H round. The company has raised over $2.5 billion in total funding from Y Combinator, Nexus Venture Partners, Dragon Capital, Glade Brook Capital, and StepStone Group. Zepto became India's first unicorn of 2023 at a $1.4B valuation." },
                { q: "How does Zepto's dark store model work?", a: "Zepto operates micro-fulfillment warehouses (dark stores) placed within 1.5km of dense residential demand zones. Each store stocks 3,000–5,000 high-frequency SKUs covering ~80% of household grocery runs. This setup enables sub-10-minute delivery as a pure logistics outcome. Zepto operates 350+ dark stores across 10+ cities including Mumbai, Bengaluru, Delhi NCR, Hyderabad, Pune, and Chennai." },
                { q: "Who are Zepto's main competitors in quick commerce?", a: "Zepto's primary competitors are Blinkit (owned by Zomato) and Swiggy Instamart. These three platforms dominate India's quick commerce market, which crossed $3.3 billion in 2025. Zepto holds the second-largest market share as of 2025. BigBasket has also entered the space with its own rapid delivery offering." },
                { q: "Is Kaivalya Vohra India's youngest billionaire?", a: "Yes. As of 2024, Kaivalya Vohra became India's youngest billionaire at age 22 following Zepto's valuation crossing $5B. Co-founder Aadit Palicha is similarly among India's youngest billionaires. Both started Zepto at 19 years old after dropping out of Stanford University." },
              ].map((faq, i) => (
                <div key={i} className="mb-4 pb-4" style={{ borderBottom: "1px solid #D8D2C4" }}>
                  <h3 className="font-bold text-[#1A1208] mb-1.5" style={{ fontSize: 13, fontFamily: "system-ui,sans-serif" }}>{faq.q}</h3>
                  <p className="text-[12.5px] text-[#5A4A30] leading-relaxed" style={{ fontFamily: "system-ui,sans-serif" }}>{faq.a}</p>
                </div>
              ))}
            </section>
          </article>

          {/* RIGHT SIDEBAR */}
          <aside className="hidden lg:block pl-8 pt-8 pb-8">
            <div className="sticky top-4 flex flex-col gap-5">
              <div className="relative w-full overflow-hidden" style={{ height: 340 }}>
                <img
                  src={FOUNDER_IMG}
                  alt="Aadit Palicha and Kaivalya Vohra, co-founders of Zepto — India's fastest unicorn at $5.9B | UpForge Founder Chronicle"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3.5"
                  style={{ background: "linear-gradient(to top, rgba(12,7,2,0.96) 60%, transparent)" }}>
                  <p className="pf text-white font-bold" style={{ fontSize: 14 }}>Aadit Palicha & Kaivalya Vohra</p>
                  <p className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}>Co-Founders · Zepto</p>
                </div>
              </div>

              {/* VIDEO THUMBNAIL — fixed: now uses correct VIDEO_ID */}
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.26em] mb-2"
                  style={{ color: accent, fontFamily: "system-ui,sans-serif" }}>Featured Watch</p>
                <a href={`https://youtu.be/${VIDEO_ID}`}
                  target="_blank" rel="noopener noreferrer"
                  className="block relative" aria-label="Watch Zepto founder Aadit Palicha interview on YouTube">
                  <img
                    src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                    alt="Zepto — Aadit Palicha on building India's fastest unicorn and the dark store model"
                    className="w-full object-cover"
                    style={{ height: 140, border: `1px solid ${accentBorder}` }}
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.3)" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,0,0,0.9)" }}>
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white ml-0.5"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                </a>
                <p className="text-[9px] text-[#AAA] mt-1.5 italic" style={{ fontFamily: "system-ui,sans-serif" }}>
                  Aadit Palicha on 10-minute delivery, dark stores &amp; India's quick commerce future
                </p>
              </div>

              <div style={{ border: "2px solid #1A1208" }}>
                <div className="px-4 py-2.5" style={{ background: "#1A1208" }}>
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white"
                    style={{ fontFamily: "system-ui,sans-serif" }}>By the Numbers</p>
                </div>
                <dl className="grid grid-cols-2 divide-x divide-y" style={{ borderColor: "#D8D2C4" }}>
                  {STATS.map((s, i) => (
                    <div key={i} className="px-4 py-3" style={{ borderColor: "#D8D2C4" }}>
                      <dt className="text-[7.5px] text-[#AAA] uppercase tracking-[0.16em] mb-1"
                        style={{ fontFamily: "system-ui,sans-serif" }}>{s.l}</dt>
                      <dd className="pf font-black text-[#1A1208] leading-none" style={{ fontSize: "1.25rem" }}>{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="px-4 py-4" style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
                <p className="text-[8px] font-black uppercase tracking-[0.26em] mb-2"
                  style={{ color: accent, fontFamily: "system-ui,sans-serif" }}>The Lesson</p>
                <p className="italic text-[#1A1208] leading-[1.72]" style={{ fontSize: 13 }}>
                  Treat failure as data. The pivot that created Zepto only became visible after
                  the founders spent months understanding exactly why KiranaKart didn't work.
                </p>
              </div>

              <div style={{ border: "1px solid #D8D2C4" }}>
                <div className="px-4 py-2" style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}>
                  <p className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]"
                    style={{ fontFamily: "system-ui,sans-serif" }}>Key Investors</p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {["Y Combinator", "Nexus Venture Partners", "Dragon Capital", "Glade Brook Capital", "StepStone Group"].map((inv, i) => (
                    <p key={i} className="flex items-center gap-2 text-[11px] text-[#2C2010]"
                      style={{ fontFamily: "system-ui,sans-serif" }}>
                      <span style={{ width: 6, height: 6, borderRadius: 1, background: accent, display: "inline-block", flexShrink: 0 }} />
                      {inv}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.26em] mb-3"
                  style={{ color: "#AAA", fontFamily: "system-ui,sans-serif" }}>Also Read on UpForge</p>
                {RELATED.map((r) => (
                  <Link key={r.slug} href={`/startup/${r.slug}`}
                    className="flex items-center justify-between py-2.5 hover:opacity-70 transition-opacity"
                    style={{ borderBottom: "1px solid #EDE9DF" }}>
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

        {/* INTERNAL LINKS */}
        <section className="py-8" style={{ borderBottom: "1px solid #C8C2B4" }}>
          <p className="text-[9px] tracking-[0.3em] uppercase text-[#AAA] mb-4"
            style={{ fontFamily: "system-ui,sans-serif" }}>Explore More on UpForge</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "Quick Commerce India 2026", h: "/quick-commerce-startups" },
              { l: "Indian Unicorns List", h: "/indian-unicorns" },
              { l: "Zepto vs Blinkit vs Swiggy", h: "/comparison/quick-commerce" },
              { l: "D2C Startups India", h: "/d2c-startups" },
              { l: "Logistics Startups", h: "/logistics-startups" },
              { l: "Startup Registry India", h: "/startup" },
              { l: "Zomato / Blinkit Profile", h: "/startup/zomato" },
              { l: "Submit Your Startup", h: "/submit" },
            ].map((lnk) => (
              <Link key={lnk.h} href={lnk.h}
                className="flex items-center gap-1 p-3 hover:border-[#1A1208] transition-all"
                style={{ border: "1px solid #D8D2C4", background: "white" }}>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1208]"
                  style={{ fontFamily: "system-ui,sans-serif" }}>{lnk.l}</span>
                <ChevronRight className="w-2.5 h-2.5 text-[#AAA] flex-shrink-0 ml-auto" />
              </Link>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-8 pb-2">
          <div className="grid sm:grid-cols-2 gap-6 items-center pb-8" style={{ borderBottom: "1px solid #D8D2C4" }}>
            <div>
              <p className="pf font-bold text-[#1A1208] mb-2" style={{ fontSize: "1.2rem" }}>
                Building India's next unicorn? Get verified on UpForge.
              </p>
              <p className="text-[12px] text-[#6B5C40]" style={{ fontFamily: "system-ui,sans-serif" }}>
                Free startup profiles. Independent verification. Indexed by Google.
              </p>
            </div>
            <div className="flex sm:justify-end">
              <Link href="/submit"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-bold uppercase tracking-wider hover:opacity-90"
                style={{ background: "#1A1208", fontSize: 11, fontFamily: "system-ui,sans-serif" }}>
                List Your Startup — Free <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <p className="text-[9px] leading-relaxed mt-4" style={{ color: "#BBB0A0", fontFamily: "system-ui,sans-serif" }}>
            * Data sourced from public filings, Inc42, Forbes India, Tracxn, and Zepto press releases as of March 2026.
            UpForge is an independent registry — no paid placements, no sponsored rankings.
          </p>
          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "Quick Commerce Startups", h: "/quick-commerce-startups" },
                { l: "Indian Unicorns 2026", h: "/indian-unicorns" },
                { l: "Startup Registry", h: "/startup" },
                { l: "Sarvam AI Profile", h: "/startup/sarvam-ai" },
                { l: "Zerodha Profile", h: "/startup/zerodha" },
                { l: "Zomato Profile", h: "/startup/zomato" },
              ].map(lnk => (
                <li key={lnk.h}>
                  <Link href={lnk.h}
                    className="text-[9px] text-[#AAA] hover:text-[#1A1208] uppercase tracking-wider transition-colors"
                    style={{ fontFamily: "system-ui,sans-serif" }}>{lnk.l}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </footer>
      </main>
    </div>
  )
}
