"use client"

// app/startup/nykaa/page.tsx
// UpForge — Nykaa · Falguni Nayar Founder Chronicle

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://upforge.in/startup/nykaa#article",
      "headline": "Nykaa — Falguni Nayar Founder Story on UpForge",
      "url": "https://upforge.in/startup/nykaa",
      "datePublished": "2026-03-01T00:00:00+05:30",
      "dateModified": "2026-03-10T00:00:00+05:30",
      "inLanguage": "en-IN",
      "publisher": { "@type": "Organization", "name": "UpForge", "url": "https://upforge.in" },
      "author": { "@type": "Organization", "name": "UpForge Editorial" },
      "about": {
        "@type": "Person", "name": "Falguni Nayar",
        "jobTitle": "Founder & CEO",
        "worksFor": { "@type": "Organization", "name": "Nykaa" }
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "D2C Startups", "item": "https://upforge.in/d2c-startups" },
        { "@type": "ListItem", "position": 4, "name": "Nykaa", "item": "https://upforge.in/startup/nykaa" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Who founded Nykaa?", "acceptedAnswer": { "@type": "Answer", "text": "Nykaa was founded by Falguni Nayar in 2012. Before founding Nykaa, she spent 20 years at Kotak Mahindra Bank, where she was Managing Director of Investment Banking. She founded Nykaa at age 50 after identifying a gap in the Indian beauty market for an authentic, curated, trustworthy platform." } },
        { "@type": "Question", "name": "When did Nykaa IPO?", "acceptedAnswer": { "@type": "Answer", "text": "Nykaa listed on the BSE and NSE in November 2021. It was India's first profitable consumer internet unicorn to go public, and the first woman-founded Indian company to list on a major stock exchange. The IPO was oversubscribed multiple times." } },
        { "@type": "Question", "name": "What is Nykaa's current valuation?", "acceptedAnswer": { "@type": "Answer", "text": "Nykaa is valued at approximately $2.5 billion as of 2026. While the valuation has moderated from its IPO peak, Nykaa remains India's most trusted beauty and personal care platform and continues to expand into fashion, wellness, and men's grooming." } },
        { "@type": "Question", "name": "Is Nykaa profitable?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Nykaa is one of the few Indian consumer internet companies to have been profitable before its IPO. This profitability was a key part of its IPO story and distinguished it from loss-making peers that listed around the same time." } },
      ]
    }
  ]
}

const accent = "#C026D3"
const accentBg = "#FDF4FF"
const accentBorder = "#E879F9"

const STATS = [
  { l: "Valuation", v: "$2.5B" },
  { l: "IPO Year", v: "2021" },
  { l: "Age at Start", v: "50" },
  { l: "Founded", v: "2012" },
  { l: "Funding", v: "Bootstrapped→IPO" },
  { l: "Listed On", v: "BSE/NSE" },
]

const TIMELINE = [
  { year: "1993–2012", event: "20-year career at Kotak Mahindra Bank. Rises to Managing Director, Investment Banking" },
  { year: "2012", event: "Leaves Kotak at 50. Launches Nykaa — India's first premium, curated beauty e-commerce platform" },
  { year: "2015–2018", event: "Flies to France, Italy, US to personally sign global luxury beauty brands. Editorial-first positioning wins trust" },
  { year: "2019–2020", event: "Expands to physical retail. Nykaa Fashion launched. 2M+ monthly orders" },
  { year: "Nov 2021", event: "IPO on BSE/NSE. First woman-founded Indian company to go public. Falguni's net worth crosses $7B" },
  { year: "2022–2026", event: "Expands into fashion, wellness, men's grooming. Valuation $2.5B. Still India's most trusted beauty destination" },
]

const INVESTORS = [
  "Steadview Capital",
  "Fidelity (post-IPO)",
  "TPG Growth",
  "Lighthouse Advisors",
  "Early Angel Rounds",
]

const COLS = [
        {
          h: "Twenty Years at Kotak",
          b: `Falguni Nayar spent two decades at Kotak Mahindra Bank, rising to Managing Director of Investment Banking — one of the most senior positions in India's financial services industry. She was good at it. But in 2012, at 50, she left.

Her network was uniformly sceptical. Global beauty brands, they said, would never trust an Indian startup with their products. The Indian consumer wasn't ready for premium beauty. Physical retail was dominant. The internet was too small.

She flew personally to brand offices in France, Italy, and the United States to guarantee authenticity and explain the Indian consumer. She earned trust one brand at a time — with the patience and credibility of someone who had spent twenty years doing exactly that in banking.`
        },
        {
          h: "Curation Over Discounting",
          b: `While every other e-commerce platform competed on price — discount codes, cashback, flash sales — Falguni competed on trust. Nykaa launched with editorial curation, authenticated products, and an experience that felt like a premium store, not a warehouse sale.

Customers returned because they knew what they were buying was genuine. The beauty market in India had a deep authenticity problem — counterfeit products were widespread. Nykaa's editorial voice and verified supply chain solved that in a way discounts never could.

By 2020, Nykaa crossed 2 million orders per month. No splashy VC backing. No celebrity campaigns in the early years. Just a product built around a conviction: that Indian women deserved a trustworthy beauty destination, not another deal aggregator.`
        },
        {
          h: "India's First Woman-Led IPO",
          b: `In November 2021, Nykaa listed on the BSE — the first woman-founded Indian company to IPO, and the first profitable Indian unicorn to go public in the consumer internet era. Falguni Nayar's net worth crossed $7 billion at listing, making her India's wealthiest self-made woman.

The IPO was oversubscribed. The story resonated not just as a business narrative but as a cultural one: a woman, at 50, with no family startup legacy, had built something that outperformed every VC-backed competitor in the same category.

She has since expanded into fashion, wellness, and men's grooming. Nykaa remains a masterclass in patience, domain expertise, and the radical idea that serving your customer well — not raising money — is the primary job of a founder. At 50, she was just getting started.`
        },
]

const RELATED = [
  { name: "OYO", slug: "oyo", cat: "TRAVEL / HOSPITALITY", val: "$10B+" },
  { name: "Ola", slug: "ola", cat: "MOBILITY / EV", val: "$7B+" },
  { name: "InternAdda", slug: "internadda", cat: "CAREER / EDTECH", val: "InternAdda" },

]

export default function NykaaPage() {
  useEffect(() => {
    const s = document.getElementById("nykaa-jsonld")
    if (!s) {
      const el = document.createElement("script")
      el.id = "nykaa-jsonld"; el.type = "application/ld+json"
      el.textContent = JSON.stringify(JSON_LD); document.head.appendChild(el)
    }
    return () => { document.getElementById("nykaa-jsonld")?.remove() }
  }, [])

  useEffect(() => {
    document.title = "Falguni Nayar — Nykaa Founder | India's First Woman-Led IPO | UpForge"
  }, [])

  return (
    <div style={{ minHeight: "100vh", background: "#F3EFE5", fontFamily: "'Georgia','Times New Roman',serif" }} role="main">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        .pf { font-family: 'Playfair Display', Georgia, serif !important; }
        .dropcap::first-letter { font-family: 'Playfair Display', Georgia, serif; font-size: 4em; font-weight: 900; line-height: 0.82; float: left; margin-right: 0.08em; margin-top: 0.06em; color: #1A1208; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp .4s ease both; }
        @media (min-width:640px) { .ncols { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0; } .ncols > div { padding:0 1.5rem; border-right:1px solid #C8C2B4; } .ncols > div:first-child { padding-left:0; } .ncols > div:last-child { border-right:none; padding-right:0; } }
        ::-webkit-scrollbar { width:3px; } ::-webkit-scrollbar-thumb { background:#C8C2B4; }
      `}</style>

      <h1 className="sr-only">Falguni Nayar — Nykaa Founder Story | D2C / BEAUTY India | UpForge</h1>

      <nav aria-label="Breadcrumb" className="px-4 sm:px-8 py-2" style={{ background: "#EDE9DF", borderBottom: "1px solid #D8D2C4", fontFamily: "system-ui,sans-serif" }}>
        <ol className="flex flex-wrap items-center gap-1.5 text-[9px] text-[#AAA] uppercase tracking-widest" itemScope itemType="https://schema.org/BreadcrumbList">
          {[{ n: "UpForge", h: "/" }, { n: "Startup Registry", h: "/startup" }, { n: "D2C Startups", h: "/d2c-startups" }, { n: "Nykaa", h: "/startup/nykaa" }].map((b, i, arr) => (
            <li key={i} className="flex items-center gap-1.5" itemScope itemProp="itemListElement" itemType="https://schema.org/ListItem">
              {i < arr.length - 1 ? <Link href={b.h} itemProp="item" className="hover:text-[#1A1208] transition-colors"><span itemProp="name">{b.n}</span></Link> : <span itemProp="name" className="text-[#1A1208] font-semibold">{b.n}</span>}
              <meta itemProp="position" content={String(i + 1)} />
              {i < arr.length - 1 && <ChevronRight className="w-2.5 h-2.5 text-[#C8C2B4]" />}
            </li>
          ))}
        </ol>
      </nav>

      <header style={{ background: "#F3EFE5", borderBottom: "3px solid #1A1208" }}>
        <div className="text-center px-4 pt-3 pb-6" style={{ borderBottom: "1px solid #C8C2B4" }}>
          <p className="text-[8px] tracking-[0.44em] text-[#AAA] uppercase mb-2" style={{ fontFamily: "system-ui,sans-serif" }}>UpForge · Startup Registry · D2C / Beauty</p>
          <p className="pf font-black leading-none text-[#1A1208]" style={{ fontSize: "clamp(2rem,5.5vw,4.2rem)" }}>The Founder Chronicle</p>
          <p className="italic mt-2 text-[#6B5C40]" style={{ fontSize: "clamp(12px,1.8vw,15px)" }}>India's independent startup registry — verified, editorial, March 2026</p>
          <div className="flex items-center justify-center gap-3 mt-4"><div className="h-px w-20 sm:w-36" style={{ background: "#C8C2B4" }} /><span style={{ color: "#C8C2B4", fontSize: 12 }}>✦</span><div className="h-px w-20 sm:w-36" style={{ background: "#C8C2B4" }} /></div>
        </div>
        <div className="flex items-center px-4 sm:px-8 py-2 gap-4" style={{ fontFamily: "system-ui,sans-serif", borderBottom: "1px solid #C8C2B4" }}>
          <span className="text-[8px] text-[#AAA] uppercase tracking-widest">Edition No. 05</span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: accent }}>D2C / BEAUTY · March 2026</span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">Mumbai, Maharashtra</span>
        </div>
      </header>

      <main className="fade-up max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]" style={{ borderBottom: "2px solid #1A1208" }} itemScope itemType="https://schema.org/Article">
          <meta itemProp="headline" content="She left a 20-year banking career at 50 to build India's first profitable unicorn. Everyone told her she was too old." />
          <meta itemProp="datePublished" content="2026-03-01" />
          <meta itemProp="author" content="UpForge Editorial" />
          <link itemProp="url" href="https://upforge.in/startup/nykaa" />

          <article className="py-8 lg:pr-8" style={{ borderRight: "1px solid #C8C2B4" }}>
            <div className="flex items-center gap-3 mb-5" style={{ fontFamily: "system-ui,sans-serif" }}>
              <span className="text-[8.5px] font-black tracking-[0.28em] uppercase px-3 py-1.5 text-white" style={{ background: accent }}>D2C / BEAUTY</span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">No. 05 · March 2026</span>
            </div>

            <h2 className="pf font-black leading-[1.05] text-[#1A1208] mb-5" style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}>
              She left a 20-year banking career at 50 to build India's first profitable unicorn. Everyone told her she was too old.
            </h2>

            <p className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]" style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }} itemProp="description">
              Falguni Nayar built India's first woman-founded company to IPO — and proved the best founders sometimes take the longest to begin. From Kotak Mahindra MD to India's wealthiest self-made woman, the Nykaa story is about patience, conviction, and refusing to accept that experience has an expiry date.
            </p>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8" style={{ fontFamily: "system-ui,sans-serif" }}>
              {["By UpForge Editorial", "Mumbai, Maharashtra", "Est. 2012", "Left investment banking at 50"].map((t, i, a) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-[9px] text-[#AAA] uppercase tracking-wider">{t}</span>
                  {i < a.length - 1 && <span className="text-[#C8C2B4] text-[10px]">·</span>}
                </span>
              ))}
            </div>

            <div className="lg:hidden mb-8">
              <img src="https://i.cdn.newsbytesapp.com/images/l12420211110152610.jpeg" alt="Falguni Nayar, Founder & CEO at Nykaa" className="w-full object-cover object-top" style={{ height: "min(280px,55vw)" }} loading="eager" />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>Falguni Nayar</p>
                <p className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5" style={{ fontFamily: "system-ui,sans-serif" }}>Founder & CEO · Nykaa</p>
              </div>
            </div>

            <div className="ncols" itemProp="articleBody">
              {COLS.map((col, ci) => (
                <div key={ci} className="mb-6 sm:mb-0">
                  <h3 className="font-black uppercase tracking-[0.13em] mb-3 pb-1.5" style={{ fontSize: 11, color: "#1A1208", borderBottom: `1.5px solid ${accent}`, fontFamily: "system-ui,sans-serif" }}>{col.h}</h3>
                  {col.b.split("\n\n").map((para, pi) => (
                    <p key={pi} className={`leading-[1.9] mb-3 text-[#2C2010] ${ci === 0 && pi === 0 ? "dropcap" : ""}`} style={{ fontSize: "clamp(12.5px,1.3vw,13.5px)" }}>{para}</p>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 pb-6 text-center" style={{ borderTop: `3px solid ${accent}`, borderBottom: "1px solid #C8C2B4" }}>
              <span style={{ display: "block", color: accent, fontSize: 24, marginBottom: 10 }}>❝</span>
              <blockquote className="pf italic text-[#1A1208] leading-[1.7] max-w-2xl mx-auto px-4" style={{ fontSize: "clamp(15px,2.1vw,21px)" }}>
                "Everyone told me I was too old to start and the market was too fragmented. That was the business case — not a reason to stop."
              </blockquote>
              <p className="text-[9px] uppercase tracking-[0.24em] text-[#AAA] mt-4" style={{ fontFamily: "system-ui,sans-serif" }}>— Falguni Nayar, Founder & CEO, Nykaa</p>
            </div>

            <div className="mt-8">
              <p className="text-[8.5px] font-black uppercase tracking-[0.26em] mb-3" style={{ color: accent, fontFamily: "system-ui,sans-serif", borderBottom: `1px solid ${accentBorder}`, paddingBottom: 8 }}>Watch · Nykaa in Conversation</p>
              <div className="relative w-full" style={{ paddingBottom: "56.25%", background: "#000" }}>
                <iframe src="https://www.youtube.com/embed/l7pDuakyskI?si=zAxsfi7fsPWKKrrQ" title="Nykaa — Falguni Nayar Founder Interview | UpForge" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" loading="lazy" style={{ border: "none" }} />
              </div>
              <p className="text-[10px] text-[#AAA] mt-2 italic" style={{ fontFamily: "system-ui,sans-serif" }}>Falguni Nayar on building Nykaa — UpForge Featured Interview</p>
            </div>

            <div className="mt-8">
              <p className="text-[8.5px] font-black uppercase tracking-[0.26em] mb-4" style={{ color: accent, fontFamily: "system-ui,sans-serif", borderBottom: `1px solid ${accentBorder}`, paddingBottom: 8 }}>Company Timeline</p>
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

            <div className="mt-8 p-5" style={{ background: accentBg, border: `1.5px solid ${accentBorder}` }}>
              <p className="text-[8px] font-black uppercase tracking-[0.26em] mb-3" style={{ color: accent, fontFamily: "system-ui,sans-serif" }}>UpForge Takeaway</p>
              <p className="pf italic text-[#1A1208] leading-[1.7]" style={{ fontSize: "clamp(14px,1.8vw,17px)" }}>There is no age requirement for building something consequential. Experience compounds — it never expires.</p>
            </div>

            <section className="mt-8" itemScope itemType="https://schema.org/FAQPage">
              <p className="text-[8.5px] font-black uppercase tracking-[0.26em] mb-4" style={{ color: accent, fontFamily: "system-ui,sans-serif", borderBottom: `1px solid ${accentBorder}`, paddingBottom: 8 }}>Frequently Asked Questions</p>
              {[
              { q: "Who founded Nykaa?", a: "Nykaa was founded by Falguni Nayar in 2012. Before founding Nykaa, she spent 20 years at Kotak Mahindra Bank, where she was Managing Director of Investment Banking. She founded Nykaa at age 50 after identifying a gap in the Indian beauty market for an authentic, curated, trustworthy platform." },
              { q: "When did Nykaa IPO?", a: "Nykaa listed on the BSE and NSE in November 2021. It was India's first profitable consumer internet unicorn to go public, and the first woman-founded Indian company to list on a major stock exchange. The IPO was oversubscribed multiple times." },
              { q: "What is Nykaa's current valuation?", a: "Nykaa is valued at approximately $2.5 billion as of 2026. While the valuation has moderated from its IPO peak, Nykaa remains India's most trusted beauty and personal care platform and continues to expand into fashion, wellness, and men's grooming." },
              { q: "Is Nykaa profitable?", a: "Yes. Nykaa is one of the few Indian consumer internet companies to have been profitable before its IPO. This profitability was a key part of its IPO story and distinguished it from loss-making peers that listed around the same time." },
              ].map((faq, i) => (
                <div key={i} className="mb-4 pb-4" style={{ borderBottom: "1px solid #D8D2C4" }} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <h3 className="font-bold text-[#1A1208] mb-1.5" style={{ fontSize: 13, fontFamily: "system-ui,sans-serif" }} itemProp="name">{faq.q}</h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"><p className="text-[12.5px] text-[#5A4A30] leading-relaxed" style={{ fontFamily: "system-ui,sans-serif" }} itemProp="text">{faq.a}</p></div>
                </div>
              ))}
            </section>
          </article>

          <aside className="hidden lg:block pl-8 pt-8 pb-8">
            <div className="sticky top-4 flex flex-col gap-5">
              <div className="relative w-full overflow-hidden" style={{ height: 340 }}>
                <img src="https://i.cdn.newsbytesapp.com/images/l12420211110152610.jpeg" alt="Falguni Nayar, Nykaa — UpForge Founder Chronicle" className="w-full h-full object-cover object-top" loading="eager" itemProp="image" />
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3.5" style={{ background: "linear-gradient(to top, rgba(12,7,2,0.96) 60%, transparent)" }}>
                  <p className="pf text-white font-bold" style={{ fontSize: 14 }}>Falguni Nayar</p>
                  <p className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5" style={{ fontFamily: "system-ui,sans-serif" }}>Founder & CEO · Nykaa</p>
                </div>
              </div>

              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.26em] mb-2" style={{ color: accent, fontFamily: "system-ui,sans-serif" }}>Featured Watch</p>
                <a href="https://youtu.be/l7pDuakyskI?si=zAxsfi7fsPWKKrrQ" target="_blank" rel="noopener noreferrer" className="block relative group" aria-label="Watch Nykaa founder interview on YouTube">
                  <img src="https://img.youtube.com/vi/l7pDuakyskI/maxresdefault.jpg" alt="Falguni Nayar — Nykaa founder interview" className="w-full object-cover" style={{ height: 140, border: `1px solid ${accentBorder}` }} loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = "https://img.youtube.com/vi/l7pDuakyskI/hqdefault.jpg" }} />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,0,0,0.9)" }}>
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white ml-0.5"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                </a>
                <p className="text-[9px] text-[#AAA] mt-1.5 italic" style={{ fontFamily: "system-ui,sans-serif" }}>Falguni Nayar on building Nykaa — UpForge Featured</p>
              </div>

              <div style={{ border: "2px solid #1A1208" }}>
                <div className="px-4 py-2.5" style={{ background: "#1A1208" }}><p className="text-[8px] font-black uppercase tracking-[0.3em] text-white" style={{ fontFamily: "system-ui,sans-serif" }}>By the Numbers</p></div>
                <dl className="grid grid-cols-2 divide-x divide-y" style={{ borderColor: "#D8D2C4" }}>
                  {STATS.map((s, i) => (
                    <div key={i} className="px-4 py-3" style={{ borderColor: "#D8D2C4" }}>
                      <dt className="text-[7.5px] text-[#AAA] uppercase tracking-[0.16em] mb-1" style={{ fontFamily: "system-ui,sans-serif" }}>{s.l}</dt>
                      <dd className="pf font-black text-[#1A1208] leading-none" style={{ fontSize: "1.1rem" }}>{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="px-4 py-4" style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
                <p className="text-[8px] font-black uppercase tracking-[0.26em] mb-2" style={{ color: accent, fontFamily: "system-ui,sans-serif" }}>The Lesson</p>
                <p className="italic text-[#1A1208] leading-[1.72]" style={{ fontSize: 13 }}>There is no age requirement for building something consequential. Experience compounds — it never expires.</p>
              </div>

              <div style={{ border: "1px solid #D8D2C4" }}>
                <div className="px-4 py-2" style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}><p className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]" style={{ fontFamily: "system-ui,sans-serif" }}>Key Investors</p></div>
                <div className="px-4 py-3 space-y-1.5">
                  {INVESTORS.map((inv, i) => (
                    <p key={i} className="flex items-center gap-2 text-[11px] text-[#2C2010]" style={{ fontFamily: "system-ui,sans-serif" }}>
                      <span style={{ width: 6, height: 6, borderRadius: 1, background: accent, display: "inline-block", flexShrink: 0 }} />{inv}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.26em] mb-3" style={{ color: "#AAA", fontFamily: "system-ui,sans-serif" }}>Also Read on UpForge</p>
                {RELATED.map((r) => (
                  <Link key={r.slug} href={`/startup/${r.slug}`} className="flex items-center justify-between py-2.5 hover:opacity-70 transition-opacity" style={{ borderBottom: "1px solid #EDE9DF" }}>
                    <div><p className="text-[11px] font-bold text-[#1A1208]" style={{ fontFamily: "system-ui,sans-serif" }}>{r.name}</p><p className="text-[9px] text-[#AAA] uppercase tracking-wider">{r.cat} · {r.val}</p></div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#AAA]" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <section className="py-8" style={{ borderBottom: "1px solid #C8C2B4" }}>
          <p className="text-[9px] tracking-[0.3em] uppercase text-[#AAA] mb-4" style={{ fontFamily: "system-ui,sans-serif" }}>Explore More on UpForge</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "D2C Startups India 2026", h: "/d2c-startups" },
              { l: "Indian Woman Founders", h: "/woman-founders-india" },
              { l: "Nykaa vs Purplle", h: "/comparison/nykaa-purplle" },
              { l: "Beauty Startups India", h: "/beauty-startups" },
              { l: "Indian IPOs 2021", h: "/indian-ipos" },
              { l: "Startup Registry", h: "/startup" },
              { l: "Zerodha Profile", h: "/startup/zerodha" },
              { l: "Submit Your Startup", h: "/submit" },
            ].map((lnk) => (
              <Link key={lnk.h} href={lnk.h} className="flex items-center gap-1 p-3 hover:border-[#1A1208] transition-all" style={{ border: "1px solid #D8D2C4", background: "white" }}>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1208]" style={{ fontFamily: "system-ui,sans-serif" }}>{lnk.l}</span>
                <ChevronRight className="w-2.5 h-2.5 text-[#AAA] flex-shrink-0 ml-auto" />
              </Link>
            ))}
          </div>
        </section>

        <footer className="pt-8 pb-2">
          <div className="grid sm:grid-cols-2 gap-6 items-center pb-8" style={{ borderBottom: "1px solid #D8D2C4" }}>
            <div><p className="pf font-bold text-[#1A1208] mb-2" style={{ fontSize: "1.2rem" }}>Building India's next unicorn? Get verified on UpForge.</p><p className="text-[12px] text-[#6B5C40]" style={{ fontFamily: "system-ui,sans-serif" }}>Free startup profiles. Independent verification. Indexed by Google.</p></div>
            <div className="flex sm:justify-end"><Link href="/submit" className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-bold uppercase tracking-wider hover:opacity-90" style={{ background: "#1A1208", fontSize: 11, fontFamily: "system-ui,sans-serif" }}>List Your Startup — Free <ArrowRight className="w-3.5 h-3.5" /></Link></div>
          </div>
          <p className="text-[9px] leading-relaxed mt-4" style={{ color: "#BBB0A0", fontFamily: "system-ui,sans-serif" }}>* Data sourced from public sources and press releases as of March 2026. UpForge is an independent registry — no paid placements, no sponsored rankings.</p>
          <nav aria-label="Footer navigation" className="mt-3"><ul className="flex flex-wrap gap-x-4 gap-y-2">{[
              { l: "D2C Startups India 2026", h: "/d2c-startups" },
              { l: "Indian Woman Founders", h: "/woman-founders-india" },
              { l: "Nykaa vs Purplle", h: "/comparison/nykaa-purplle" },
              { l: "Beauty Startups India", h: "/beauty-startups" },
              { l: "Indian IPOs 2021", h: "/indian-ipos" },
              { l: "Startup Registry", h: "/startup" },
          ].map(lnk => (<li key={lnk.h}><Link href={lnk.h} className="text-[9px] text-[#AAA] hover:text-[#1A1208] uppercase tracking-wider transition-colors" style={{ fontFamily: "system-ui,sans-serif" }}>{lnk.l}</Link></li>))}</ul></nav>
        </footer>
      </main>
    </div>
  )
}
