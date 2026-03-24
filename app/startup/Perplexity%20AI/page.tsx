"use client"

// app/startup/perplexity-ai/page.tsx
// UpForge — Perplexity AI · Aravind Srinivas & Team Founder Chronicle
// SEO: Perplexity AI Answer Engine, Aravind Srinivas, AI Search, Jeff Bezos Investor
// Designed for maximum crawlability and indexing on Google Search.

import { useEffect } from "react"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://upforge.in/startup/perplexity-ai#article",
      "headline": "Perplexity AI — How Aravind Srinivas is Building the 'Answer Engine' to Challenge Google's Monopoly",
      "description": "The definitive Perplexity AI founder story. Aravind Srinivas and his team of researchers from OpenAI and Meta built a $9B conversational search engine backed by Jeff Bezos and Nvidia.",
      "url": "https://upforge.in/startup/perplexity-ai",
      "datePublished": "2026-03-25T00:00:00+05:30",
      "dateModified": "2026-03-25T00:00:00+05:30",
      "inLanguage": "en-US",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.in/Upforge-perplexity-ai.webp",
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
          "name": "Aravind Srinivas",
          "jobTitle": "Co-Founder & CEO",
          "worksFor": { "@type": "Organization", "name": "Perplexity AI" },
          "sameAs": ["https://www.linkedin.com/in/aravind-srinivas/"]
        },
        {
          "@type": "Person",
          "name": "Denis Yarats",
          "jobTitle": "Co-Founder & CTO",
          "worksFor": { "@type": "Organization", "name": "Perplexity AI" }
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "Perplexity AI",
        "url": "https://www.perplexity.ai",
        "foundingDate": "2022",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "San Francisco",
          "addressCountry": "US"
        },
        "description": "Perplexity AI is a conversational search engine that provides direct, cited answers to queries using advanced Large Language Models.",
        "sameAs": [
          "https://www.perplexity.ai",
          "https://www.linkedin.com/company/perplexity-ai/",
          "https://twitter.com/perplexity_ai"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "AI Startups", "item": "https://upforge.in/ai-startups" },
        { "@type": "ListItem", "position": 4, "name": "Perplexity AI", "item": "https://upforge.in/startup/perplexity-ai" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How is Perplexity AI different from Google?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike Google, which provides a list of blue links, Perplexity is an 'Answer Engine'. It uses LLMs to browse the web in real-time and provide a concise, cited response to your question, effectively doing the research for you."
          }
        },
        {
          "@type": "Question",
          "name": "Who are the founders of Perplexity AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Perplexity was founded in 2022 by Aravind Srinivas (ex-OpenAI), Denis Yarats (ex-Meta), Johnny Ho (ex-Quora), and Andy Konwinski (co-founder of Databricks)."
          }
        },
        {
          "@type": "Question",
          "name": "Who invested in Perplexity AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The company is backed by major tech figures and institutions, including Jeff Bezos (Bezos Expeditions), Nvidia, IVP, NEA, Andreessen Horowitz, and Naval Ravikant."
          }
        },
        {
          "@type": "Question",
          "name": "What is Perplexity AI's current valuation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As of early 2026, Perplexity AI has achieved a valuation of approximately $9 billion, reflecting its rapid user growth and position as the leading AI-native search alternative."
          }
        }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Total Funding", v: "$1B+" },
  { l: "Valuation", v: "$9B" },
  { l: "Founded", v: "2022" },
  { l: "HQ", v: "San Francisco" },
  { l: "Monthly Queries", v: "500M+" },
  { l: "Investors", v: "Bezos, Nvidia" },
]

const TIMELINE = [
  { year: "Aug 2022", event: "Perplexity AI is founded in San Francisco by Aravind Srinivas and Denis Yarats. The early focus: SQL-based search for databases." },
  { year: "Dec 2022", event: "The team pivots to a conversational search engine. Launch of the initial Perplexity web product during the height of the ChatGPT boom." },
  { year: "Jan 2024", event: "Raises $73.6M Series B led by IVP, valuing the company at $520M. Jeff Bezos joins the round as a key strategic investor." },
  { year: "Apr 2024", event: "Hits 'Unicorn' status with a $62.7M round led by Daniel Gross, valuing the company at over $1B. Launch of 'Pro Search' and 'Pages'." },
  { year: "Late 2024", event: "Massive growth in query volume. Reports reaching over 100 million monthly active users. Valuation rumors climb to $3B+." },
  { year: "Early 2026", event: "Valuation surges to $9B in latest funding round led by institutional giants. Becomes the primary AI search partner for top smartphone manufacturers." },
]

const COLS = [
  {
    h: "The Death of the Blue Link",
    b: `For 25 years, search meant typing a keyword and sifting through a graveyard of blue links. Aravind Srinivas, a former OpenAI researcher, saw a different future. He realized that the world didn't want links—it wanted answers.\n\nPerplexity AI was born from the insight that LLMs could act as research assistants rather than just creative writers. By combining real-time web indexing with natural language processing, Perplexity doesn't just find information; it synthesizes it into a single, cited narrative. This shift from "search" to "answer engine" has created the first genuine threat to Google's search monopoly since its inception.`
  },
  {
    h: "From OpenAI to Challenging a Giant",
    b: `Srinivas's journey is a Silicon Valley masterclass in timing. After stints at DeepMind and OpenAI, he co-founded Perplexity with Denis Yarats, Johnny Ho, and Andy Konwinski. Their advantage? They weren't burdened by the legacy ad-revenue models that haunt Google.\n\n"Google is a giant, but giants have blind spots," Srinivas has noted. Perplexity’s "Pro Search" feature acts as an interactive dialogue, asking the user clarifying questions to narrow down intent. This high-utility focus has attracted a loyal base of knowledge workers, researchers, and tech enthusiasts who have abandoned traditional search for Perplexity's citation-backed precision.`
  },
  {
    h: "The Bezos & Nvidia Endorsement",
    b: `When Jeff Bezos invests in a search startup, the world listens. Bezos, along with Nvidia and IVP, has bet heavily on Perplexity as the UI of the future. The company's valuation reaching $9B in 2026 is a testament to its scalability. \n\nBeyond just search, Perplexity is building an ecosystem. "Perplexity Pages" allows users to turn search results into beautifully formatted articles, while its Publisher Program aims to share revenue with content creators—a direct response to criticisms of AI data scraping. As search becomes increasingly conversational and integrated into our devices, Perplexity is positioned as the neutral, high-accuracy layer of the internet.`
  }
]

const PULL_QUOTE = {
  text: "The future of search is not about ranking pages. It's about providing the best possible answer to the user's question, instantly and with evidence.",
  by: "Aravind Srinivas, Co-Founder & CEO, Perplexity AI"
}

const LESSON = "Perplexity proves that agility beats scale. By focusing on a superior user experience—no ads, direct answers, and transparency—they have built a multibillion-dollar moat in a space where everyone thought Google was unbeatable."

const INVESTORS = [
  "Jeff Bezos (Bezos Expeditions)",
  "Nvidia",
  "IVP",
  "NEA",
  "Andreessen Horowitz",
  "Naval Ravikant",
  "Elad Gil",
  "Nat Friedman",
]

const FAQS = [
  {
    q: "How does Perplexity AI make money?",
    a: "Perplexity uses a 'Freemium' model. While the basic search is free, 'Perplexity Pro' ($20/mo) offers access to more advanced models like GPT-4o, Claude 3.5, and unlimited Pro Search queries."
  },
  {
    q: "Does Perplexity AI use its own AI models?",
    a: "Perplexity is 'model agnostic'. It fine-tunes its own proprietary models but also allows Pro users to toggle between top models from OpenAI, Anthropic, and Meta to get the best results for their specific query."
  },
  {
    q: "Is Perplexity AI better than ChatGPT for search?",
    a: "While ChatGPT is a general-purpose assistant, Perplexity is built specifically for search. It prioritizes real-time web access, accuracy, and providing verifiable citations for every claim it makes."
  },
  {
    q: "How can I access Perplexity AI?",
    a: "Perplexity is available via its website (perplexity.ai), iOS and Android apps, and a popular Chrome extension that allows you to 'ask' about any webpage you are currently viewing."
  },
]

const RELATED = [
  { name: "OpenAI", slug: "openai-profile", cat: "Generative AI", val: "$100B+" },
  { name: "Claude (Anthropic)", slug: "anthropic-ai", cat: "AI Safety", val: "$18B" },
  { name: "Grok (xAI)", slug: "xai-elon-musk", cat: "Real-time AI", val: "$24B" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function PerplexityAIPage() {
  const accent = "#21a0a0" // Perplexity Teal/Green
  const accentDark = "#1a7f7f"
  const accentBg = "#f0f9f9"
  const accentBorder = "#bfe5e5"

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
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:#C8C2B4; }
      `}</style>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        Perplexity AI Founder Story — Aravind Srinivas | The AI Answer Engine Challenging Google | UpForge
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
            { n: "AI Startups", h: "/ai-startups" },
            { n: "Perplexity AI", h: "/startup/perplexity-ai" },
          ].map((b, i, arr) => (
            <li key={i} className="flex items-center gap-1.5">
              {i < arr.length - 1 ? (
                <a href={b.h} className="hover:text-[#1A1208] transition-colors">{b.n}</a>
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
          <p
            className="text-[8px] tracking-[0.44em] text-[#AAA] uppercase mb-2"
            style={{ fontFamily: "system-ui,sans-serif" }}
          >
            UpForge · Global Startup Registry · Artificial Intelligence
          </p>
          <p
            className="pf font-black leading-none text-[#1A1208]"
            style={{ fontSize: "clamp(2rem,5.5vw,4.2rem)" }}
          >
            The Founder Chronicle
          </p>
          <p className="italic mt-2 text-[#6B5C40]" style={{ fontSize: "clamp(12px,1.8vw,15px)" }}>
            Documenting the architects of the Answer Engine — March 2026
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
          <span className="text-[8px] text-[#AAA] uppercase tracking-widest flex-shrink-0">Edition · Search 2.0</span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: accent }}>
            AI Answer Engine · March 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">San Francisco, CA</span>
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
                AI / SEARCH ENGINE
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">March 2026</span>
            </div>

            {/* Headline */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              The End of the Search Box: How Perplexity 
              is Building the World's First <em style={{ color: accent }}>Answer Engine.</em>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              Google dominated the world by organizing links. Aravind Srinivas is betting that 
              we no longer want links—we want direct knowledge. Perplexity AI has evolved from a 
              scrappy lab project into a $9B contender for the search crown. Backed by Jeff Bezos 
              and the chips of Nvidia, this San Francisco startup is redefining how we navigate 
              human knowledge in the age of intelligence.
            </p>

            {/* Byline */}
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}
            >
              {[
                "By UpForge Editorial",
                "San Francisco",
                "Est. 2022",
                "The Google Killer?",
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
                src="/perplexity-ai.jpg"
                alt="Aravind Srinivas, Co-Founder & CEO of Perplexity AI — UpForge Founder Chronicle"
                className="w-full object-cover object-top"
                style={{ height: "min(300px,60vw)", display: "block" }}
                loading="eager"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=800'; }}
              />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>Aravind Srinivas</p>
                <p
                  className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  Co-Founder & CEO · Perplexity AI
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
                      <p className="text-[12px] text-[#2C2010] mt-0.5 leading-relaxed">{t.event}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* FAQ */}
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
                  src="/perplexity-ai.jpg"
                  alt="Aravind Srinivas, Co-Founder & CEO of Perplexity AI — UpForge Founder Chronicle"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=800'; }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3.5"
                  style={{ background: "linear-gradient(to top, rgba(12,7,2,0.96) 60%, transparent)" }}
                >
                  <p className="pf text-white font-bold" style={{ fontSize: 14 }}>Aravind Srinivas</p>
                  <p
                    className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Co-Founder & CEO · Perplexity AI
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn links */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.perplexity.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: `1.5px solid ${accent}`, textDecoration: "none" }}
                  aria-label="Visit Perplexity AI official website"
                >
                  <div className="flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: accent, fontFamily: "system-ui,sans-serif" }}
                    >
                      perplexity.ai — Official Website
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/perplexity-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View Perplexity AI on LinkedIn"
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
                      LinkedIn — Perplexity AI
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
                    Perplexity AI Scale
                  </p>
                </div>
                <dl className="grid grid-cols-2 divide-x divide-y" style={{ borderColor: "#D8D2C4" }}>
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

              {/* Also Read */}
              <div>
                <p
                  className="text-[8px] font-black uppercase tracking-[0.26em] mb-3"
                  style={{ color: "#AAA", fontFamily: "system-ui,sans-serif" }}
                >
                  Also Read on UpForge
                </p>
                {RELATED.map((r) => (
                  <a
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
                  </a>
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
            Explore the Search & AI Ecosystem
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "AI Search Guide 2026", h: "/ai-search-guide" },
              { l: "Google vs Perplexity", h: "/vs/google-vs-perplexity" },
              { l: "Nvidia AI Portfolio", h: "/nvidia-investments" },
              { l: "Jeff Bezos Ventures", h: "/bezos-expeditions-list" },
              { l: "Top AI Models Ranked", h: "/ai-models-2026" },
              { l: "Future of SEO", h: "/seo-ai-impact" },
              { l: "Startup Registry", h: "/startup" },
              { l: "Submit Profile", h: "/submit" },
            ].map((lnk) => (
              <a
                key={lnk.h}
                href={lnk.h}
                className="flex items-center gap-1 p-3 hover:border-[#1A1208] transition-all"
                style={{ border: "1px solid #D8D2C4", background: "white", textDecoration: "none" }}
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-wider text-[#1A1208]"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  {lnk.l}
                </span>
                <ChevronRight className="w-2.5 h-2.5 text-[#AAA] flex-shrink-0 ml-auto" />
              </a>
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
                Challenging a monopoly? Get verified on UpForge.
              </p>
              <p
                className="text-[12px] text-[#6B5C40]"
                style={{ fontFamily: "system-ui,sans-serif" }}
              >
                Independent verification. Global search authority. Google Indexed.
              </p>
            </div>
            <div className="flex sm:justify-end">
              <a
                href="/submit"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-bold uppercase tracking-wider hover:opacity-90"
                style={{
                  background: "#1A1208",
                  fontSize: 11,
                  fontFamily: "system-ui,sans-serif",
                  textDecoration: "none",
                }}
              >
                List Your Startup — Free <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <p
            className="text-[9px] leading-relaxed mt-4"
            style={{ color: "#BBB0A0", fontFamily: "system-ui,sans-serif" }}
          >
            * Data sourced from public filings, Crunchbase, Reuters, and Perplexity AI official
            announcements as of March 2026. UpForge is an independent registry. No paid 
            placements or sponsored rankings. Valuations are estimates based on latest market cycles.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "AI Startup List", h: "/ai-startups" },
                { l: "Registry Home", h: "/startup" },
                { l: "Unicorn List", h: "/unicorns" },
                { l: "OpenAI Profile", h: "/startup/openai-profile" },
                { l: "Claude Profile", h: "/startup/anthropic-ai" },
                { l: "Search Guide", h: "/ai-search-guide" },
                { l: "Submit Profile", h: "/submit" },
              ].map((lnk) => (
                <li key={lnk.h}>
                  <a
                    href={lnk.h}
                    className="text-[9px] text-[#AAA] hover:text-[#1A1208] uppercase tracking-wider transition-colors"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    {lnk.l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </footer>
      </main>
    </div>
  )
}
