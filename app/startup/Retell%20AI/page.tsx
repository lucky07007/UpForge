"use client"

// app/startup/retell-ai/page.tsx
// UpForge — Retell AI · James Fan & Team Founder Chronicle
// SEO: Retell AI, Conversational Voice AI, Low Latency Voice API, James Fan, AI Voice Agents
// Designed for maximum crawlability and indexing on Google Search.

import { useEffect } from "react"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://upforge.in/startup/retell-ai#article",
      "headline": "Retell AI — How James Fan is Perfecting the Art of the Human-Like AI Conversation",
      "description": "The definitive Retell AI founder story. Discover how James Fan and the Retell AI team built a sub-800ms latency voice API that is redefining customer service and sales automation.",
      "url": "https://upforge.in/startup/retell-ai",
      "datePublished": "2026-03-25T00:00:00+05:30",
      "dateModified": "2026-03-25T00:00:00+05:30",
      "inLanguage": "en-US",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.in/Upforge-retell-ai.webp",
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
          "name": "James Fan",
          "jobTitle": "Co-Founder & CEO",
          "worksFor": { "@type": "Organization", "name": "Retell AI" },
          "sameAs": ["https://www.linkedin.com/in/james-fan-retell/"]
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "Retell AI",
        "url": "https://www.retellai.com",
        "foundingDate": "2023",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "San Francisco",
          "addressRegion": "CA",
          "addressCountry": "US"
        },
        "description": "Retell AI provides a high-performance conversational voice API that allows developers to build human-like AI voice agents with ultra-low latency.",
        "sameAs": [
          "https://www.retellai.com",
          "https://www.linkedin.com/company/retellai/",
          "https://twitter.com/retellai"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "AI Voice Startups", "item": "https://upforge.in/ai-voice-startups" },
        { "@type": "ListItem", "position": 4, "name": "Retell AI", "item": "https://upforge.in/startup/retell-ai" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Retell AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Retell AI is a developer-first platform for building conversational voice AI. It offers an API that handles speech-to-text, LLM processing, and text-to-speech with ultra-low latency, making AI phone calls feel human."
          }
        },
        {
          "@type": "Question",
          "name": "How low is Retell AI's latency?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Retell AI typically achieves an end-to-end latency of under 800ms, which is the threshold required for natural, back-and-forth human conversation without awkward pauses."
          }
        },
        {
          "@type": "Question",
          "name": "Who are the founders of Retell AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Retell AI was founded in 2023 by James Fan (CEO) and his team of AI researchers. The company was part of the Y Combinator Winter 2024 batch."
          }
        },
        {
          "@type": "Question",
          "name": "What can you build with Retell AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Developers use Retell AI to build autonomous agents for appointment scheduling, customer support, outbound sales, and interactive voice response (IVR) systems."
          }
        }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "YC Batch", v: "W24" },
  { l: "Latency", v: "<800ms" },
  { l: "Founded", v: "2023" },
  { l: "HQ", v: "San Francisco" },
  { l: "Minutes/Mo", v: "10M+" },
  { l: "API Uptime", v: "99.9%" },
]

const TIMELINE = [
  { year: "2023", event: "James Fan and team identify the 'Uncanny Valley' of voice AI—where bots are too slow to feel human. Retell AI is founded to solve the latency gap." },
  { year: "Jan 2024", event: "Retell AI joins the Y Combinator W24 batch. Launches its initial developer API focusing on high-fidelity, low-latency voice loops." },
  { year: "Apr 2024", event: "Introduces advanced features like custom LLM integration and dynamic interruption handling, allowing users to cut off the AI naturally." },
  { year: "Oct 2024", event: "Scale-up phase: Retell AI hits a milestone of processing millions of minutes per month for industries ranging from healthcare to real estate." },
  { year: "2025", event: "Launches 'Retell Dash' and white-labeling tools for agencies. Partners with major telcos to integrate AI agents directly into phone networks." },
  { year: "Early 2026", event: "Retell AI becomes the industry standard for Voice-first LLM applications, powering the transition from IVR 'menus' to truly conversational assistants." },
]

const COLS = [
  {
    h: "Solving the 800ms Barrier",
    b: `In human conversation, a delay of more than 800 milliseconds feels like a glitch. Most AI voice systems struggle with a "robotic pause" while the server thinks. James Fan and the Retell AI team built their platform around a single obsession: speed. By optimizing every layer of the voice stack—from the socket connection to the inference engine—they achieved a sub-second loop that makes talking to an AI feel like talking to a friend.\n\n"Latency is the feature," Fan explains. "If the bot takes two seconds to reply, the user has already lost interest." Retell’s infrastructure allows developers to plug in any LLM (like GPT-4o or Claude 3.5) while maintaining the lightning-fast response times needed for real-world interactions.`
  },
  {
    h: "Beyond Text: The Nuance of Voice",
    b: `Retell AI isn't just about speed; it's about emotional intelligence. Their API handles complex conversational cues that traditional systems miss—like knowing when a user has stopped for breath versus when they've actually finished their sentence. Their interruption handling is particularly advanced, allowing the AI to stop speaking instantly and listen when the user interjects.\n\nThis nuance has made them a favorite for Y Combinator startups building the next generation of sales and support tools. Instead of a rigid script, Retell agents can handle "off-script" questions, empathize with frustrated callers, and manage tone, making them significantly more effective than the "press 1 for sales" systems of the past.`
  },
  {
    h: "The New Backbone of Customer Service",
    b: `The business impact of human-like voice AI is staggering. Companies using Retell have reported 40% increases in appointment booking rates compared to traditional web forms. By providing a developer-first platform, Retell has enabled a whole ecosystem of agencies to build custom voice solutions for local businesses, clinics, and law firms.\n\nAs LLMs continue to become more capable, Retell AI is positioning itself as the "connective tissue" between the brain of the AI and the ear of the customer. Their vision is a world where no one ever has to wait on hold again. With ultra-low latency and hyper-realistic voices, that world is arriving much faster than expected.`
  }
]

const PULL_QUOTE = {
  text: "The phone call is the most human way to communicate. We are giving AI the ability to participate in that humanity without the robotic lag.",
  by: "James Fan, Co-Founder & CEO, Retell AI"
}

const LESSON = "Retell AI proves that in specialized tech, one metric can define a company. By winning the 'latency war,' they created a moat that general-purpose AI providers struggle to cross, making them the default choice for voice-first developers."

const INVESTORS = [
  "Y Combinator (W24)",
  "Soma Capital",
  "Pioneer Fund",
  "Various Silicon Valley Angels",
  "VentureSouq",
  "Translink Capital",
]

const FAQS = [
  {
    q: "Can I use my own LLM with Retell AI?",
    a: "Yes. Retell AI is designed to be flexible. You can use their built-in models or connect your own custom LLM (like OpenAI, Anthropic, or Groq) via a simple WebSocket connection."
  },
  {
    q: "Does Retell AI handle phone numbers?",
    a: "Retell offers integrated phone number management. You can purchase numbers directly through their dashboard or bring your own via Twilio or other SIP providers."
  },
  {
    q: "How does Retell handle interruptions?",
    a: "Retell has a sophisticated 'interruption sensitivity' setting. It can detect when a user starts speaking and instantly stop the AI's output, allowing for a natural flow of conversation."
  },
  {
    q: "What voices does Retell AI support?",
    a: "Retell integrates with top-tier voice providers like ElevenLabs, Deepgram, and OpenAI to offer hundreds of hyper-realistic voices in dozens of languages."
  },
]

const RELATED = [
  { name: "ElevenLabs", slug: "elevenlabs-voice", cat: "AI Audio", val: "$1B+" },
  { name: "Vapi", slug: "vapi-ai", cat: "Voice AI", val: "Seed" },
  { name: "Hume AI", slug: "hume-ai", cat: "Empathic AI", val: "$50M+" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function RetellAIPage() {
  const accent = "#6366f1" // Retell Indigo
  const accentDark = "#4f46e5"
  const accentBg = "#f5f3ff"
  const accentBorder = "#ddd6fe"

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
        Retell AI Founder Story — James Fan | Building the Fastest Conversational Voice AI API | UpForge
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
            { n: "AI Voice", h: "/ai-voice-startups" },
            { n: "Retell AI", h: "/startup/retell-ai" },
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
            UpForge · Global Startup Registry · Conversational AI
          </p>
          <p
            className="pf font-black leading-none text-[#1A1208]"
            style={{ fontSize: "clamp(2rem,5.5vw,4.2rem)" }}
          >
            The Founder Chronicle
          </p>
          <p className="italic mt-2 text-[#6B5C40]" style={{ fontSize: "clamp(12px,1.8vw,15px)" }}>
            Documenting the architects of the sub-second Voice Loop — March 2026
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
          <span className="text-[8px] text-[#AAA] uppercase tracking-widest flex-shrink-0">Edition · Voice Intelligence</span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: accent }}>
            API Infrastructure · March 2026
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
                AI / VOICE API
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">March 2026</span>
            </div>

            {/* Headline */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              The 800-Millisecond Race: How Retell AI 
              is Making Robots Sound <em style={{ color: accent }}>Human.</em>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              For decades, talking to a computer was a clunky, delayed experience. James Fan and 
              the team at Retell AI set out to fix the one thing that ruins conversation: lag. 
              By building a sub-800ms voice engine, Retell has become the go-to infrastructure 
              for a new wave of AI agents that can handle sales, support, and scheduling 
              without missing a beat. From Y Combinator to millions of minutes, the 
              future of communication is finally talking back.
            </p>

            {/* Byline */}
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}
            >
              {[
                "By UpForge Editorial",
                "San Francisco",
                "Est. 2023",
                "Voice Infrastructure",
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
                src="/retell-ai.jpg"
                alt="James Fan, Co-Founder & CEO of Retell AI — UpForge Founder Chronicle"
                className="w-full object-cover object-top"
                style={{ height: "min(300px,60vw)", display: "block" }}
                loading="eager"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800'; }}
              />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>James Fan</p>
                <p
                  className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  Founder & CEO · Retell AI
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
                className="pf italic text-[#1A1208] text-balance leading-[1.7] max-w-2xl mx-auto px-4"
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
                  src="/retell-ai.jpg"
                  alt="James Fan, Co-Founder & CEO of Retell AI — UpForge Founder Chronicle"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800'; }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3.5"
                  style={{ background: "linear-gradient(to top, rgba(12,7,2,0.96) 60%, transparent)" }}
                >
                  <p className="pf text-white font-bold" style={{ fontSize: 14 }}>James Fan</p>
                  <p
                    className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Founder & CEO · Retell AI
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn links */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.retellai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: `1.5px solid ${accent}`, textDecoration: "none" }}
                  aria-label="Visit Retell AI official website"
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
                      retellai.com — Official Website
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/retellai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View Retell AI on LinkedIn"
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
                      LinkedIn — Retell AI
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
                    Retell AI Scale
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
            Explore the Conversational AI Ecosystem
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "Voice AI Guide 2026", h: "/voice-ai-guide" },
              { l: "Retell AI vs Vapi", h: "/vs/retell-vs-vapi" },
              { l: "Y Combinator Startups", h: "/yc-startups-list" },
              { l: "ElevenLabs Profile", h: "/startup/elevenlabs-voice" },
              { l: "AI Support Trends", h: "/customer-service-ai-impact" },
              { l: "Future of Phone Calls", h: "/conversational-ai-future" },
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
                Building the future of voice? Get verified on UpForge.
              </p>
              <p
                className="text-[12px] text-[#6B5C40]"
                style={{ fontFamily: "system-ui,sans-serif" }}
              >
                Independent verification. Global authority. Indexed by Google.
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
            * Data sourced from public filings, Y Combinator, and Retell AI official
            announcements as of March 2026. UpForge is an independent registry. No paid 
            placements or sponsored rankings. Valuations are estimates based on latest market cycles.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "AI Startup List", h: "/ai-startups" },
                { l: "Registry Home", h: "/startup" },
                { l: "Unicorn List", h: "/unicorns" },
                { l: "Voice Guide", h: "/voice-ai-guide" },
                { l: "OpenAI Profile", h: "/startup/openai-profile" },
                { l: "YC Startups", h: "/yc-startups-list" },
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
