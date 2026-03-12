"use client"

// app/startup/ather-energy-ev/page.tsx
// UpForge — Ather Energy · Tarun Mehta & Swapnil Jain Founder Chronicle
// FIX: FAQPage appears ONLY in JSON-LD. Zero microdata on FAQ HTML = no duplicate error.
// FIX: mainEntity is a proper JSON array [].

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://upforge.in/startup/ather-energy-ev#article",
      "headline": "Ather Energy — How Two IIT Madras Graduates Built India's Smartest Electric Scooter",
      "description": "Ather Energy co-founders Tarun Mehta and Swapnil Jain built India's most intelligent EV brand from an IIT Madras dorm. Hero MotoCorp backed, IPO listed, $1.3B valued.",
      "url": "https://upforge.in/startup/ather-energy-ev",
      "datePublished": "2026-03-01T00:00:00+05:30",
      "dateModified": "2026-03-10T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": { "@type": "ImageObject", "url": "https://upforge.in/og/ather-energy-ev.png", "width": 1200, "height": 630 },
      "publisher": {
        "@type": "Organization", "name": "UpForge", "url": "https://upforge.in",
        "logo": { "@type": "ImageObject", "url": "https://upforge.in/logo.png" }
      },
      "author": { "@type": "Organization", "name": "UpForge Editorial" },
      "about": [
        {
          "@type": "Person", "name": "Tarun Mehta",
          "jobTitle": "Co-Founder & CEO", "worksFor": { "@type": "Organization", "name": "Ather Energy" },
          "sameAs": ["https://www.linkedin.com/in/tarunsmehta/", "https://twitter.com/tarunsmehta"]
        },
        {
          "@type": "Person", "name": "Swapnil Jain",
          "jobTitle": "Co-Founder & CTO", "worksFor": { "@type": "Organization", "name": "Ather Energy" },
          "sameAs": ["https://www.linkedin.com/in/swapniljain/"]
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "Ather Energy",
        "url": "https://www.atherenergy.com",
        "foundingDate": "2013",
        "foundingLocation": { "@type": "Place", "addressLocality": "Bengaluru", "addressCountry": "IN" },
        "description": "Ather Energy designs, develops and manufactures smart electric scooters for India, backed by its own charging network Ather Grid and proprietary software platform.",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 2000 },
        "sameAs": ["https://www.atherenergy.com", "https://twitter.com/atherenergy"]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "EV Startups India", "item": "https://upforge.in/ev-startups-india" },
        { "@type": "ListItem", "position": 4, "name": "Ather Energy", "item": "https://upforge.in/startup/ather-energy-ev" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who founded Ather Energy?",
          "acceptedAnswer": { "@type": "Answer", "text": "Ather Energy was co-founded in 2013 by Tarun Mehta and Swapnil Jain, both IIT Madras graduates. Mehta serves as CEO and Jain as CTO. They began working on Ather while still at IIT Madras, receiving early support from the institute's incubator. Hero MotoCorp subsequently became a major investor." }
        },
        {
          "@type": "Question",
          "name": "How much funding has Ather Energy raised?",
          "acceptedAnswer": { "@type": "Answer", "text": "Ather Energy has raised over $480M in total funding before its IPO. Key investors include Hero MotoCorp (which holds a significant stake), Tiger Global, and Sachin Bansal (Flipkart co-founder). Ather listed on Indian stock exchanges (NSE/BSE) in 2024." }
        },
        {
          "@type": "Question",
          "name": "What is Ather Energy's best-selling product?",
          "acceptedAnswer": { "@type": "Answer", "text": "Ather Energy's flagship product is the Ather 450X — India's most feature-rich electric scooter. It features a 7-inch touchscreen dashboard, over-the-air software updates, fast charging (0 to 80% in 50 minutes), and a connected app ecosystem. The Ather 450 series has been India's highest-rated electric scooter in customer satisfaction surveys." }
        },
        {
          "@type": "Question",
          "name": "Did Ather Energy have an IPO?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Ather Energy completed its IPO and listed on NSE and BSE in 2024, making it one of India's landmark EV public listings. The IPO raised significant capital and made Ather one of the few pure-play electric vehicle companies to be publicly listed in India." }
        }
      ]
    }
  ]
}

const STATS = [
  { l: "Valuation", v: "$1.3B" },
  { l: "Funding", v: "$480M+" },
  { l: "Founded", v: "2013" },
  { l: "HQ", v: "Bengaluru" },
  { l: "Listed", v: "NSE/BSE" },
  { l: "Charging", v: "Ather Grid" },
]

const TIMELINE = [
  { year: "2013", event: "Ather Energy founded at IIT Madras by Tarun Mehta & Swapnil Jain. First seed funding from IIT Madras's incubator" },
  { year: "2016", event: "Hero MotoCorp invests ₹205 Cr — a landmark validation from India's largest two-wheeler company" },
  { year: "2018", event: "Ather 340 and 450 launched. First electric scooter with a touchscreen dashboard and OTA updates in India" },
  { year: "2020–22", event: "Ather 450X launched. Ather Grid charging network expanded to 100+ cities. Series D raises $128M" },
  { year: "2024", event: "Ather Energy IPO on NSE/BSE. Total funding crosses $480M. Ather 450S launched for mass-market price points" },
]

const COLS = [
  {
    h: "The IIT Madras Dorm Bet",
    b: `In 2013, Tarun Mehta and Swapnil Jain were final-year students at IIT Madras. The rest of their batch was preparing for placements at McKinsey, Goldman Sachs, and Google. They were designing a battery management system for electric vehicles in the institute's incubator.\n\nTheir starting insight was technical, not commercial. Electric scooters in India at the time were glorified bicycles with lead-acid batteries — slow, range-limited, and embarrassing to ride. Mehta and Jain believed that a scooter built around a lithium-ion battery and intelligent software could outperform petrol bikes on every dimension that mattered to Indian urban riders: acceleration, convenience, and cost per kilometre.\n\nWhat made their bet unconventional was the scope. They weren't going to build a product. They were going to build a platform — hardware, software, charging infrastructure, and a service network — all owned and controlled by Ather.`
  },
  {
    h: "Hero, Hardware and the 450X",
    b: `The Hero MotoCorp investment in 2016 was more than capital — it was credibility. India's largest two-wheeler company had looked at the electric space and chosen to back a two-year-old startup over any of the established EV players. The message to the market was unambiguous: Ather was building something worth taking seriously.\n\nThe Ather 450X, launched in 2020, delivered on that promise. It was the first scooter in India with a capacitive touchscreen, real-time navigation, ride history analytics, and over-the-air software updates. It could go from 0 to 40 km/h in 3.3 seconds. It was water resistant, app-connected, and received new features every few months via software updates — a product philosophy borrowed from Tesla and applied to urban India.\n\nThe Ather Grid — the company's own fast-charging network — solved the range anxiety problem with a vertical integration play. By controlling charging infrastructure alongside the vehicle, Ather could guarantee the user experience end-to-end.`
  },
  {
    h: "IPO and the Next Gear",
    b: `Ather's 2024 IPO was India's most anticipated EV listing. After a decade of patient, engineering-first building — resisting the temptation to chase volume at the expense of quality — the company had earned a differentiated position: India's most trusted electric scooter brand among premium urban buyers.\n\nBut the IPO wasn't the finish line. It was the starting gun for the next phase. Ather's challenge is now scale: how to bring the intelligence and quality of the 450X to price points that reach beyond premium urban buyers into mass India.\n\nThe Ather 450S — a more accessible variant — was the first move. The Ather Rizta, a family scooter, followed. The pattern is clear: Ather built credibility at the top and is now moving down the price pyramid, carrying its software and brand reputation with it.\n\nFor Tarun Mehta and Swapnil Jain, the original IIT Madras bet — that India deserved a world-class electric scooter — is now a public company worth over a billion dollars. The next bet is whether that scooter can be built for everyone.`
  }
]

const PULL_QUOTE = {
  text: "We wanted to prove that India could design and build a world-class electric vehicle — not assemble one from Chinese kits, but genuinely engineer it from first principles.",
  by: "Tarun Mehta, Co-Founder & CEO, Ather Energy"
}

const LESSON = "Vertical integration is painful and expensive — until it isn't. Ather owned hardware, software, and charging because shortcuts would have compromised the experience. That patience built a moat no fast-follower can easily replicate."

const INVESTORS = ["Hero MotoCorp", "Tiger Global Management", "Sachin Bansal (Flipkart Co-Founder)", "Caladium Investment Pte", "NIIF"]

const FAQS = [
  { q: "Who are the founders of Ather Energy?", a: "Ather Energy was co-founded in 2013 by Tarun Mehta (CEO) and Swapnil Jain (CTO), both IIT Madras graduates. They started Ather in the IIT Madras Research Park incubator and received early institutional backing from the institute before Hero MotoCorp's landmark investment in 2016." },
  { q: "What is Ather Grid?", a: "Ather Grid is Ather Energy's proprietary fast-charging network. It provides 450W DC fast charging, bringing the Ather 450X to 80% charge in approximately 50 minutes. Ather Grid is installed across 100+ cities in India at Ather Experience Centres, cafes, and public locations — and is free for Ather owners in many markets." },
  { q: "How does Ather compare to Ola Electric and TVS iQube?", a: "Ather positions as the premium, software-first electric scooter. The 450X is typically priced higher than equivalent Ola S1 variants but competes on build quality, touchscreen interface, OTA updates, and brand trust. TVS iQube targets a similar urban premium segment. Ather's differentiation is its 10+ years of pure EV focus and vertically integrated experience." },
  { q: "Is Ather Energy profitable?", a: "Ather Energy has been loss-making as it invested heavily in manufacturing, Ather Grid expansion, and R&D. Post-IPO, the company has been focused on improving unit economics and moving towards profitability as scale increases and component costs reduce. The Ather 450S was specifically designed to improve margins at accessible price points." },
]

const RELATED = [
  { name: "Blue Energy Motors", slug: "blue-energy-motors", cat: "CleanTech", val: "Series B" },
  { name: "Spinny", slug: "spinny-cars", cat: "AutoTech", val: "$1.8B" },
  { name: "Sarvam AI", slug: "sarvam-ai", cat: "Artificial Intelligence", val: "$1B+" },
]

export default function AtherEnergyPage() {
  const accent = "#7C3AED"
  const accentBg = "#F5F3FF"
  const accentBorder = "#DDD6FE"

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
    <div style={{ minHeight: "100vh", background: "#F3EFE5", fontFamily: "'Georgia','Times New Roman',serif" }}>
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

      <h1 className="sr-only">Ather Energy Founder Story — Tarun Mehta & Swapnil Jain | India's Smart EV Pioneer | UpForge</h1>

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="px-4 sm:px-8 py-2"
        style={{ background: "#EDE9DF", borderBottom: "1px solid #D8D2C4", fontFamily: "system-ui,sans-serif" }}>
        <ol className="flex flex-wrap items-center gap-1.5 text-[9px] text-[#AAA] uppercase tracking-widest">
          {[
            { n: "UpForge", h: "/" }, { n: "Startup Registry", h: "/startup" },
            { n: "EV Startups India", h: "/ev-startups-india" }, { n: "Ather Energy", h: "/startup/ather-energy-ev" },
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
      <header style={{ background: "#F3EFE5", borderBottom: "3px solid #1A1208" }}>
        <div className="text-center px-4 pt-3 pb-6" style={{ borderBottom: "1px solid #C8C2B4" }}>
          <p className="text-[8px] tracking-[0.44em] text-[#AAA] uppercase mb-2" style={{ fontFamily: "system-ui,sans-serif" }}>
            UpForge · Startup Registry · Electric Vehicles
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
          <span className="text-[8px] text-[#AAA] uppercase tracking-widest flex-shrink-0">Edition No. 05</span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: accent }}>
            Electric Vehicles · March 2026
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
                style={{ background: accent }}>ELECTRIC VEHICLES</span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">No. 05 · March 2026</span>
            </div>
            <h2 className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}>
              India deserved a world-class electric scooter. Two IIT Madras students decided to build it themselves.
            </h2>
            <p className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}>
              Ather Energy built the most intelligent electric scooter in India — not by importing technology,
              but by engineering it from first principles in Bengaluru. Touchscreen dashboard. OTA updates.
              Proprietary charging network. A decade of patient, vertical integration.
              Tarun Mehta and Swapnil Jain proved that India could build a world-class EV.
              Then they took it public.
            </p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8" style={{ fontFamily: "system-ui,sans-serif" }}>
              {["By UpForge Editorial", "Bengaluru, Karnataka", "Est. 2013", "India's Smart EV Pioneer"].map((t, i, a) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-[9px] text-[#AAA] uppercase tracking-wider">{t}</span>
                  {i < a.length - 1 && <span className="text-[#C8C2B4] text-[10px]">·</span>}
                </span>
              ))}
            </div>

            {/* MOBILE PHOTO */}
            <div className="lg:hidden mb-8">
              <img src="https://images.yourstory.com/cs/1/fba06920d5f511e9aa4b5178b9b9e6ab/Ather-Energy-Founders-Tarun-Mehta-Swapnil-Jain.jpg"
                alt="Tarun Mehta and Swapnil Jain, Co-Founders of Ather Energy"
                className="w-full object-cover object-top" style={{ height: "min(300px,60vw)" }} loading="eager" />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>Tarun Mehta & Swapnil Jain</p>
                <p className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5" style={{ fontFamily: "system-ui,sans-serif" }}>Co-Founders · Ather Energy</p>
              </div>
            </div>

            {/* 3-COL BODY */}
            <div className="ncols">
              {COLS.map((col, ci) => (
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
              style={{ borderTop: `3px double ${accent}`, borderBottom: "1px solid #C8C2B4" }}>
              <span style={{ display: "block", color: accent, fontSize: 24, marginBottom: 10 }}>❝</span>
              <blockquote className="pf italic text-[#1A1208] leading-[1.7] max-w-2xl mx-auto px-4"
                style={{ fontSize: "clamp(16px,2.2vw,22px)" }}>
                "{PULL_QUOTE.text}"
              </blockquote>
              <p className="text-[9px] uppercase tracking-[0.24em] text-[#AAA] mt-4" style={{ fontFamily: "system-ui,sans-serif" }}>
                — {PULL_QUOTE.by}
              </p>
            </div>

            {/* YOUTUBE EMBED */}
            <div className="mt-8">
              <p className="text-[8.5px] font-black uppercase tracking-[0.26em] mb-3"
                style={{ color: accent, fontFamily: "system-ui,sans-serif", borderBottom: `1px solid ${accentBorder}`, paddingBottom: 8 }}>
                Watch · Ather Energy Founders in Conversation
              </p>
              <div className="relative w-full" style={{ paddingBottom: "56.25%", background: "#000" }}>
                <iframe src="https://www.youtube.com/embed/l7pDuakyskI?si=ldN2OI7y4ciehvsq"
                  title="Ather Energy — Tarun Mehta on Building India's Smartest Electric Scooter | UpForge"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen className="absolute inset-0 w-full h-full" loading="lazy"
                  style={{ border: "none" }} />
              </div>
              <p className="text-[10px] text-[#AAA] mt-2 italic" style={{ fontFamily: "system-ui,sans-serif" }}>
                Tarun Mehta on Ather Energy's decade of building India's EV future — UpForge Featured Interview
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
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: accent }} />
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

            {/* FAQ — visual only, NO microdata */}
            <section className="mt-8">
              <p className="text-[8.5px] font-black uppercase tracking-[0.26em] mb-4"
                style={{ color: accent, fontFamily: "system-ui,sans-serif", borderBottom: `1px solid ${accentBorder}`, paddingBottom: 8 }}>
                Frequently Asked Questions
              </p>
              {FAQS.map((faq, i) => (
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
                <img src="https://images.yourstory.com/cs/1/fba06920d5f511e9aa4b5178b9b9e6ab/Ather-Energy-Founders-Tarun-Mehta-Swapnil-Jain.jpg"
                  alt="Tarun Mehta and Swapnil Jain, Co-Founders of Ather Energy — UpForge Founder Chronicle"
                  className="w-full h-full object-cover object-top" loading="eager" />
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3.5"
                  style={{ background: "linear-gradient(to top, rgba(12,7,2,0.96) 60%, transparent)" }}>
                  <p className="pf text-white font-bold" style={{ fontSize: 14 }}>Tarun Mehta & Swapnil Jain</p>
                  <p className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5" style={{ fontFamily: "system-ui,sans-serif" }}>Co-Founders · Ather Energy</p>
                </div>
              </div>

              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.26em] mb-2" style={{ color: accent, fontFamily: "system-ui,sans-serif" }}>Featured Watch</p>
                <a href="https://youtu.be/l7pDuakyskI" target="_blank" rel="noopener noreferrer"
                  className="block relative" aria-label="Watch Ather Energy founders interview on YouTube">
                  <img src="https://img.youtube.com/vi/l7pDuakyskI/maxresdefault.jpg"
                    alt="Ather Energy — Tarun Mehta and Swapnil Jain interview"
                    className="w-full object-cover" style={{ height: 140, border: `1px solid ${accentBorder}` }}
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://img.youtube.com/vi/l7pDuakyskI/hqdefault.jpg" }} />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,0,0,0.9)" }}>
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white ml-0.5"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                </a>
                <p className="text-[9px] text-[#AAA] mt-1.5 italic" style={{ fontFamily: "system-ui,sans-serif" }}>Tarun Mehta on Ather's decade of building India's EV future</p>
              </div>

              <div style={{ border: "2px solid #1A1208" }}>
                <div className="px-4 py-2.5" style={{ background: "#1A1208" }}>
                  <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white" style={{ fontFamily: "system-ui,sans-serif" }}>By the Numbers</p>
                </div>
                <dl className="grid grid-cols-2 divide-x divide-y" style={{ borderColor: "#D8D2C4" }}>
                  {STATS.map((s, i) => (
                    <div key={i} className="px-4 py-3" style={{ borderColor: "#D8D2C4" }}>
                      <dt className="text-[7.5px] text-[#AAA] uppercase tracking-[0.16em] mb-1" style={{ fontFamily: "system-ui,sans-serif" }}>{s.l}</dt>
                      <dd className="pf font-black text-[#1A1208] leading-none" style={{ fontSize: "1.25rem" }}>{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="px-4 py-4" style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
                <p className="text-[8px] font-black uppercase tracking-[0.26em] mb-2" style={{ color: accent, fontFamily: "system-ui,sans-serif" }}>The Lesson</p>
                <p className="italic text-[#1A1208] leading-[1.72]" style={{ fontSize: 13 }}>{LESSON}</p>
              </div>

              <div style={{ border: "1px solid #D8D2C4" }}>
                <div className="px-4 py-2" style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}>
                  <p className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]" style={{ fontFamily: "system-ui,sans-serif" }}>Key Investors</p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {INVESTORS.map((inv, i) => (
                    <p key={i} className="flex items-center gap-2 text-[11px] text-[#2C2010]" style={{ fontFamily: "system-ui,sans-serif" }}>
                      <span style={{ width: 6, height: 6, borderRadius: 1, background: accent, display: "inline-block", flexShrink: 0 }} />
                      {inv}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.26em] mb-3" style={{ color: "#AAA", fontFamily: "system-ui,sans-serif" }}>Also Read on UpForge</p>
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

        {/* SEO INTERNAL LINKS */}
        <section className="py-8" style={{ borderBottom: "1px solid #C8C2B4" }}>
          <p className="text-[9px] tracking-[0.3em] uppercase text-[#AAA] mb-4" style={{ fontFamily: "system-ui,sans-serif" }}>Explore More EV Startups on UpForge</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "EV Startups India 2026", h: "/ev-startups-india" },
              { l: "Indian Unicorns Full List", h: "/indian-unicorns" },
              { l: "Ather vs Ola Electric", h: "/ev-startups/ather-vs-ola" },
              { l: "Electric Scooter India Guide", h: "/electric-scooter-india" },
              { l: "Blue Energy Motors Profile", h: "/startup/blue-energy-motors" },
              { l: "CleanTech Startups India", h: "/cleantech-startups" },
              { l: "Startup Registry India", h: "/startup" },
              { l: "Submit Your Startup", h: "/submit" },
            ].map((lnk) => (
              <Link key={lnk.h} href={lnk.h}
                className="flex items-center gap-1 p-3 hover:border-[#1A1208] transition-all"
                style={{ border: "1px solid #D8D2C4", background: "white" }}>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1208]" style={{ fontFamily: "system-ui,sans-serif" }}>{lnk.l}</span>
                <ChevronRight className="w-2.5 h-2.5 text-[#AAA] flex-shrink-0 ml-auto" />
              </Link>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-8 pb-2">
          <div className="grid sm:grid-cols-2 gap-6 items-center pb-8" style={{ borderBottom: "1px solid #D8D2C4" }}>
            <div>
              <p className="pf font-bold text-[#1A1208] mb-2" style={{ fontSize: "1.2rem" }}>Building India's next unicorn? Get verified on UpForge.</p>
              <p className="text-[12px] text-[#6B5C40]" style={{ fontFamily: "system-ui,sans-serif" }}>Free startup profiles. Independent verification. Indexed by Google.</p>
            </div>
            <div className="flex sm:justify-end">
              <Link href="/submit" className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-bold uppercase tracking-wider hover:opacity-90"
                style={{ background: "#1A1208", fontSize: 11, fontFamily: "system-ui,sans-serif" }}>
                List Your Startup — Free <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <p className="text-[9px] leading-relaxed mt-4" style={{ color: "#BBB0A0", fontFamily: "system-ui,sans-serif" }}>
            * Data sourced from public filings, Tracxn, Inc42, Forbes India, and Ather Energy press releases as of March 2026.
            UpForge is an independent registry — no paid placements, no sponsored rankings.
          </p>
          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "EV Startups India", h: "/ev-startups-india" },
                { l: "Startup Registry", h: "/startup" },
                { l: "Indian Unicorns", h: "/indian-unicorns" },
                { l: "Blue Energy Motors", h: "/startup/blue-energy-motors" },
                { l: "Spinny Profile", h: "/startup/spinny-cars" },
                { l: "boAt Profile", h: "/startup/boat" },
                { l: "Sarvam AI Profile", h: "/startup/sarvam-ai" },
              ].map(lnk => (
                <li key={lnk.h}>
                  <Link href={lnk.h} className="text-[9px] text-[#AAA] hover:text-[#1A1208] uppercase tracking-wider transition-colors"
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
