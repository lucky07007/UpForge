"use client"

// app/startup/estatepass/page.tsx
// UpForge — EstatePass · Emma Smith Founder Chronicle
// SEO: AI real estate exam prep, agent tools, practice questions, state-specific licensing
// Designed for maximum crawlability and indexing on Google Search.

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight, GraduationCap, Target, Brain, BarChart3, Users, Calendar, MapPin, TrendingUp, CheckCircle2, AlertCircle, Sparkles, FileText, MessageSquare, Clock, Home, Calculator, BookOpen, Mic, Video, Zap } from "lucide-react"

// ─── ENHANCED JSON-LD WITH ESTATEPASS-SPECIFIC SCHEMA ────────────────────────
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.upforge.org/startup/estatepass#article",
      "headline": "EstatePass — How Emma Smith Built a Free AI Platform to Help 10,000+ Pass Their Real Estate Exam",
      "description": "EstatePass founder story — Emma Smith built a free AI-powered real estate exam prep platform with 2,500+ practice questions, mock exams, and AI tutoring. Trusted by 10,000+ aspiring agents. Includes 75+ free AI agent tools for working professionals.",
      "url": "https://www.upforge.org/startup/estatepass",
      "datePublished": "2026-04-11T00:00:00+05:30",
      "dateModified": "2026-04-11T00:00:00+05:30",
      "inLanguage": "en-US",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.org/Upforge-estatepass.webp",
        "width": 1200,
        "height": 630
      },
      "publisher": {
        "@type": "Organization",
        "name": "UpForge",
        "url": "https://www.upforge.org",
        "logo": { "@type": "ImageObject", "url": "https://www.upforge.org/logo.png" }
      },
      "author": { "@type": "Organization", "name": "UpForge Editorial" },
      "about": [
        {
          "@type": "Person",
          "name": "Emma Smith",
          "jobTitle": "Founder",
          "worksFor": { "@type": "Organization", "name": "EstatePass" },
          "sameAs": ["https://www.linkedin.com/company/estatepass-ai/"]
        }
      ],
      "mentions": [
        {
          "@type": "Organization",
          "name": "EstatePass",
          "url": "https://www.estatepass.ai",
          "foundingDate": "2024",
          "foundingLocation": {
            "@type": "Place",
            "addressCountry": "US"
          },
          "description": "EstatePass is a free AI-powered platform for real estate exam preparation and agent tools, offering 2,500+ practice questions, mock exams, AI tutoring, and 75+ free AI tools for listing generation and marketing.",
          "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 5 },
          "sameAs": [
            "https://www.estatepass.ai",
            "https://www.linkedin.com/company/estatepass-ai/"
          ]
        },
        {
          "@type": "Product",
          "name": "EstatePass Exam Prep",
          "brand": { "@type": "Brand", "name": "EstatePass" },
          "description": "Free AI-powered real estate exam preparation with 2,500+ state-specific questions, timed mock exams, adaptive AI tutoring, and a smart wrong-book feature for all 50 states."
        },
        {
          "@type": "Product",
          "name": "EstatePass AI Agent Tools",
          "brand": { "@type": "Brand", "name": "EstatePass" },
          "description": "75+ free AI tools for licensed agents, including MLS description generator, social media caption writer, buyer email templates, and full listing marketing packages."
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.upforge.org" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://www.upforge.org/startup" },
        { "@type": "ListItem", "position": 3, "name": "EdTech & AI Startups", "item": "https://www.upforge.org/edtech-ai-startups" },
        { "@type": "ListItem", "position": 4, "name": "EstatePass", "item": "https://www.upforge.org/startup/estatepass" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who founded EstatePass?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "EstatePass was founded in 2024 by Emma Smith. She built the platform after noticing that real estate agents are incredibly busy with client work and have little time to study for licensing exams or create marketing content. EstatePass solves both problems with free AI tools."
          }
        },
        {
          "@type": "Question",
          "name": "Is EstatePass really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, EstatePass is 100% free with no credit card required. This includes access to 2,500+ practice questions, timed mock exams, AI tutoring, the smart wrong-book feature, video lessons, podcasts, and 75+ AI agent tools for listing descriptions and marketing."
          }
        },
        {
          "@type": "Question",
          "name": "How many practice questions does EstatePass have?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "EstatePass offers 2,500+ practice questions covering all 11 real estate topic areas including Property Ownership, Financing, Agency Law, Contracts, Real Estate Math, Land Use, Valuation, Transfer of Title, Fair Housing, and State-Specific Law."
          }
        },
        {
          "@type": "Question",
          "name": "Does EstatePass cover all 50 states?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, EstatePass provides state-specific exam prep for all 50 US states. The platform covers both the national portion and the state-specific portion of the real estate licensing exam, with questions written to mirror actual exam wording and difficulty."
          }
        },
        {
          "@type": "Question",
          "name": "What AI tools does EstatePass offer for licensed agents?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "EstatePass offers 75+ free AI tools for real estate agents, including an MLS description generator, social media caption writer, buyer email templates, and the ability to generate full listing marketing packages in under 2 minutes."
          }
        },
        {
          "@type": "Question",
          "name": "What is the EstatePass 'Wrong Book' feature?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Wrong Book is an AI-powered feature that tracks every question a user misses, identifies patterns in their mistakes, and generates targeted practice drills on their weakest topics to help them improve efficiently."
          }
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.estatepass.ai#organization",
      "name": "EstatePass",
      "url": "https://www.estatepass.ai",
      "logo": "https://www.estatepass.ai/logo.png",
      "description": "Free AI-powered real estate exam prep and agent tools trusted by 10,000+ professionals.",
      "address": { "@type": "PostalAddress", "addressCountry": "US" }
    },
    {
      "@type": "WebSite",
      "url": "https://www.estatepass.ai",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.estatepass.ai/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}

// ─── DATA FOR ESTATEPASS ─────────────────────────────────────────────────────
const STATS = [
  { l: "Founded", v: "2024", icon: Calendar },
  { l: "HQ", v: "United States", icon: MapPin },
  { l: "Trusted Users", v: "10,000+", icon: Users },
  { l: "Practice Questions", v: "2,500+", icon: FileText },
  { l: "US States Covered", v: "50", icon: MapPin },
  { l: "AI Agent Tools", v: "75+", icon: Sparkles },
]

const TIMELINE = [
  { year: "2024", event: "EstatePass is founded by Emma Smith after identifying a gap in real estate exam preparation and agent marketing tools. The vision: make AI-powered exam prep completely free." },
  { year: "Early 2025", event: "Launches with 2,500+ practice questions covering 11 topic areas for the national portion of the real estate exam. Early users praise the question quality and AI explanations." },
  { year: "Mid 2025", event: "Expands to include state-specific question banks for all 50 states. Adds timed mock exams, AI tutoring, and the smart 'Wrong Book' feature for targeted practice." },
  { year: "Late 2025", event: "Adds 120 video lessons, 95 podcast episodes, and spaced-repetition flashcards. Platform reaches 5,000+ registered users." },
  { year: "Early 2026", event: "Launches 75+ free AI tools for licensed agents including MLS description generator, social media captions, buyer emails, and full listing packages. User base surpasses 10,000." },
]

const COLS = [
  {
    h: "Why 40% Fail — And How AI Fixes It",
    b: `Only 61% of aspiring real estate agents pass their licensing exam on the first attempt. Emma Smith, founder of EstatePass, saw the problem clearly. Most prep materials are expensive, poorly matched to the actual exam, and fail to address the biggest obstacle: state-specific content.\n\n"The questions were worded totally different from my prep app," students told her. Others passed the national portion but failed their state portion twice. The second biggest problem? No guidance on which topics to focus on. Students studied everything equally, spent weeks on material they already knew, and still failed at 68%.\n\nEstatePass's AI solves each of these failures. Questions mirror actual exam wording, difficulty, and traps. State-specific banks cover all 50 states. And the AI identifies each user's weakest topics, building a targeted study plan that adapts in real time. No more guessing. No more expensive prep books that don't match the real test.`
  },
  {
    h: "From Exam Prep to Agent Toolkit",
    b: `While building the exam platform, Emma made another observation. Licensed agents don't stop needing help after they pass. They're buried in showings, client calls, negotiations, and paperwork. Somewhere in between, they're supposed to write compelling listing descriptions, post on Instagram, send emails to their buyer list, and find time to study for continuing education.\n\n"Most of them don't have a marketing team," Emma notes. "They are the marketing team." So she built a solution for that too.\n\nEstatePass now includes 75+ free AI tools for licensed agents. An MLS description generator. Social media caption writer. Buyer email templates. The ability to generate a full listing marketing package — descriptions, social posts, email campaigns — in under 2 minutes. What used to take hours now takes seconds. And it's still free.`
  },
  {
    h: "The Product Suite: Study Smarter, Not Harder",
    b: `EstatePass's exam prep is structured around proven learning science. Students start with a diagnostic — 10 questions covering contracts, financing, agency law, and property ownership. The AI instantly identifies which of the 11 topic areas are weakest, so students focus on what matters.\n\nPractice questions are state-specific, mirroring the exact wording and difficulty of the real exam. Every wrong answer triggers an AI explanation that teaches the "why," not just the memorized answer. The Wrong Book tracks every mistake, finds patterns, and generates targeted drills. Spaced-repetition flashcards ensure key terms — fiduciary duty, escheat, encumbrance — stick for exam day.\n\nTimed mock exams simulate the real test: 100–150 questions, national and state portions, matching each state's format. The Readiness Tracker shows real-time accuracy across all 11 topics. When students consistently score 75%+ on both portions, they're ready. And because everything is free, there's no barrier to entry.`
  }
]

const PULL_QUOTE = {
  text: "What if AI could handle the content side, so agents could focus on what they actually do best — building relationships and closing deals? That's EstatePass.",
  by: "Emma Smith, Founder, EstatePass"
}

const LESSON = "EstatePass proves that freemium doesn't have to mean 'limited.' By offering a genuinely complete product at zero cost — 2,500+ questions, AI tutoring, mock exams, and 75+ agent tools — Emma Smith built trust and word-of-mouth growth. When your product is this good and this free, users become evangelists. The real business model can come later; solving a painful problem first is what matters."

const TOPICS = [
  "Property Ownership (280+ Qs)",
  "Financing (310+ Qs)",
  "Agency Law (250+ Qs)",
  "Contracts (300+ Qs)",
  "Real Estate Math (220+ Qs)",
  "Land Use & Zoning (180+ Qs)",
  "Valuation & Appraisal (200+ Qs)",
  "Transfer of Title (190+ Qs)",
  "Practice of RE (170+ Qs)",
  "Fair Housing (210+ Qs)",
  "State-Specific Law (190+ Qs)",
]

const FEATURES = [
  { name: "AI-Powered Practice", desc: "Adaptive questions with AI tutoring on weak topics", icon: Brain },
  { name: "Timed Mock Exams", desc: "Simulates real exam with state-specific formats", icon: Clock },
  { name: "Smart Wrong Book", desc: "AI tracks mistakes and generates targeted drills", icon: Target },
  { name: "Flashcard Study", desc: "Spaced repetition for key terms", icon: BookOpen },
  { name: "Audio & Video Lessons", desc: "120 videos + 95 podcasts", icon: Video },
  { name: "Readiness Tracker", desc: "Real-time accuracy across 11 topics", icon: BarChart3 },
]

const FAQS = [
  {
    q: "Is EstatePass really 100% free forever?",
    a: "Yes. EstatePass is completely free with no credit card required. This includes all 2,500+ practice questions, timed mock exams, AI tutoring, the Wrong Book feature, video lessons, podcasts, flashcards, and all 75+ AI agent tools. Emma Smith built EstatePass to remove financial barriers to entering the real estate profession."
  },
  {
    q: "Which exams does EstatePass cover?",
    a: "EstatePass covers the real estate salesperson and broker licensing exams for all 50 US states. The platform includes both the national portion and state-specific content. Each state's question bank is tailored to that state's laws, regulations, and exam format."
  },
  {
    q: "How does the AI Wrong Book work?",
    a: "Every time you miss a practice question, the AI logs it. Over time, it identifies patterns — maybe you consistently miss proration questions or struggle with agency law. The AI then generates targeted practice drills focused specifically on your weakest areas, so you're not wasting time on topics you've already mastered."
  },
  {
    q: "What AI tools are available for licensed agents?",
    a: "EstatePass offers 75+ free AI tools including an MLS description generator, social media caption writer for Instagram and Facebook, buyer and seller email templates, open house announcement generators, and a full listing marketing package builder that creates descriptions, social posts, and email campaigns in under 2 minutes."
  },
  {
    q: "How does EstatePass compare to paid prep like Kaplan or PrepAgent?",
    a: "Unlike paid competitors that can cost hundreds of dollars, EstatePass is completely free. Many users report that EstatePass's question quality matches or exceeds paid options, and features like the AI Wrong Book and adaptive tutoring aren't available in most paid products. EstatePass also includes 75+ free agent tools that competitors don't offer at all."
  },
]

const TESTIMONIALS = [
  { name: "Rodman A.", location: "Florida", quote: "I failed my first attempt with a 68%. Found EstatePass, spent 2 weeks on the wrong-book feature, and passed with an 82% on my second try. The AI explanations made the difference.", result: "Failed → Passed" },
  { name: "Sarah M.", location: "California", quote: "I was TERRIFIED of the math section — prorations, cap rates, GRM. The math drill broke everything into steps. I went from guessing to solving in seconds. Passed California on the first try.", result: "Math Anxiety → Conquered" },
  { name: "Michael R.", location: "Texas", quote: "Everyone told me the Texas exam was brutal. I did 6 mock exams on EstatePass and scored 85%+ on all of them. On test day, the questions felt familiar. Passed first try.", result: "Passed First Try" },
]

const RELATED = [
  { name: "Sarvam AI", slug: "sarvam-ai", cat: "Generative AI", val: "$1B+" },
  { name: "Alt Mobility", slug: "alt-mobility", cat: "EV Leasing", val: "₹461 Cr" },
  { name: "Miraista", slug: "Miraista", cat: "DeepTech AI", val: "Early Stage" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function EstatePassPage() {
  // Brand colors - professional real estate blue/gold
  const accent = "#1E3A5F" // Deep real estate blue
  const accentDark = "#152C47"
  const accentBg = "#EBF0F6"
  const accentBorder = "#D0DCE8"

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
        .hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .hover-lift:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
        .gradient-text { background: linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        EstatePass Founder Story — Emma Smith | Free AI Real Estate Exam Prep & Agent Tools | UpForge
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
            { n: "EdTech & AI Startups", h: "/edtech-ai-startups" },
            { n: "EstatePass", h: "/startup/estatepass" },
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
          <p
            className="text-[8px] tracking-[0.44em] text-[#AAA] uppercase mb-2"
            style={{ fontFamily: "system-ui,sans-serif" }}
          >
            UpForge · Startup Registry · EdTech & AI
          </p>
          <p
            className="pf font-black leading-none text-[#1A1208]"
            style={{ fontSize: "clamp(2rem,5.5vw,4.2rem)" }}
          >
            The Founder Chronicle
          </p>
          <p className="italic mt-2 text-[#6B5C40]" style={{ fontSize: "clamp(12px,1.8vw,15px)" }}>
            Global startup registry — verified, editorial, April 2026
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
          <span className="text-[8px] text-[#AAA] uppercase tracking-widest flex-shrink-0">Edition · EdTech AI</span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: accent }}>
            AI Exam Prep · April 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">United States</span>
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
                EDTECH / AI AGENTS
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">April 2026</span>
            </div>

            {/* Headline with gradient accent */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              She saw 40% fail the real estate exam. So she built{" "}
              <span className="gradient-text">a free AI platform to fix it.</span>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              Emma Smith noticed something broken. Real estate agents are the busiest professionals
              she knew — showings, client calls, negotiations, paperwork — yet they're expected to
              study for a licensing exam with a 40% fail rate, then magically become marketing experts.
              So she built EstatePass: a completely free AI platform with 2,500+ practice questions,
              mock exams, adaptive tutoring, and 75+ agent tools for listing descriptions and social
              media. In under two years, 10,000+ users have trusted it to launch or grow their careers.
              No credit card. No catch. Just better AI for real estate.
            </p>

            {/* Byline */}
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}
            >
              {[
                "By UpForge Editorial",
                "United States",
                "Est. 2024",
                "100% Free",
              ].map((t, i, a) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-[9px] text-[#AAA] uppercase tracking-wider">{t}</span>
                  {i < a.length - 1 && <span className="text-[#C8C2B4] text-[10px]">·</span>}
                </span>
              ))}
            </div>

            {/* Mobile hero image placeholder */}
            <div className="lg:hidden mb-8">
              <div
                className="w-full flex items-center justify-center"
                style={{ height: "min(300px,60vw)", background: "#EBF0F6" }}
              >
                <GraduationCap className="w-16 h-16 text-[#1E3A5F] opacity-50" />
              </div>
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>Emma Smith</p>
                <p
                  className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  Founder · EstatePass
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

            {/* Pull quote - enhanced */}
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

            {/* Company Timeline - enhanced */}
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
                  <li key={i} className="flex gap-4 mb-4 group">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 transition-all duration-200 group-hover:scale-125"
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

              {/* Founder image placeholder */}
              <div className="relative w-full overflow-hidden rounded-sm shadow-md" style={{ height: 340, background: "#EBF0F6" }}>
                <div className="w-full h-full flex items-center justify-center">
                  <GraduationCap className="w-20 h-20 text-[#1E3A5F] opacity-30" />
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3.5"
                  style={{ background: "linear-gradient(to top, rgba(12,7,2,0.96) 60%, transparent)" }}
                >
                  <p className="pf text-white font-bold" style={{ fontSize: 14 }}>Emma Smith</p>
                  <p
                    className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Founder · EstatePass
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn links */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.estatepass.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80 rounded-sm"
                  style={{ border: `1.5px solid ${accent}`, textDecoration: "none" }}
                  aria-label="Visit EstatePass official website"
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
                      estatepass.ai — Free Exam Prep
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/estatepass-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80 rounded-sm"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View EstatePass on LinkedIn"
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
                      LinkedIn — EstatePass
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "#0077b5" }} />
                </a>
              </div>

              {/* By the Numbers - enhanced with icons */}
              <div style={{ border: "2px solid #1A1208" }} className="rounded-sm overflow-hidden">
                <div className="px-4 py-2.5" style={{ background: "#1A1208" }}>
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.3em] text-white"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    EstatePass by the Numbers
                  </p>
                </div>
                <dl className="grid grid-cols-2 divide-x divide-y" style={{ borderColor: "#D8D2C4" }}>
                  {STATS.map((s, i) => {
                    const IconComponent = s.icon
                    return (
                      <div key={i} className="px-4 py-3" style={{ borderColor: "#D8D2C4" }}>
                        <dt
                          className="text-[7.5px] text-[#AAA] uppercase tracking-[0.16em] mb-1 flex items-center gap-1"
                          style={{ fontFamily: "system-ui,sans-serif" }}
                        >
                          <IconComponent className="w-2.5 h-2.5" style={{ color: accent }} />
                          {s.l}
                        </dt>
                        <dd
                          className="pf font-black text-[#1A1208] leading-none"
                          style={{ fontSize: "1.25rem" }}
                        >
                          {s.v}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              </div>

              {/* Key Features */}
              <div style={{ border: "1px solid #D8D2C4" }} className="rounded-sm overflow-hidden">
                <div
                  className="px-4 py-2"
                  style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}
                >
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Core Features
                  </p>
                </div>
                <div className="px-4 py-3 space-y-2">
                  {FEATURES.map((feature, i) => {
                    const IconComponent = feature.icon
                    return (
                      <div key={i} className="flex items-start gap-2">
                        <IconComponent className="w-3 h-3 mt-0.5" style={{ color: accent }} />
                        <div>
                          <p className="text-[10px] font-bold text-[#1A1208]">{feature.name}</p>
                          <p className="text-[8px] text-[#6B5C40]">{feature.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* The Lesson */}
              <div
                className="px-4 py-4 rounded-sm"
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

              {/* Topic Areas Covered */}
              <div style={{ border: "1px solid #D8D2C4" }} className="rounded-sm overflow-hidden">
                <div
                  className="px-4 py-2"
                  style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}
                >
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    11 Topic Areas Covered
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1">
                  {TOPICS.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-2.5 h-2.5" style={{ color: accent }} />
                      <p className="text-[9px] text-[#2C2010]">{topic}</p>
                    </div>
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

        {/* ── SEO INTERNAL LINKS - Enhanced ── */}
        <section className="py-8" style={{ borderBottom: "1px solid #C8C2B4" }}>
          <p
            className="text-[9px] tracking-[0.3em] uppercase text-[#AAA] mb-4"
            style={{ fontFamily: "system-ui,sans-serif" }}
          >
            Explore More EdTech & AI Startups on UpForge
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "EdTech AI Startups 2026", h: "/edtech-ai-startups", desc: "Complete directory" },
              { l: "AI Exam Prep Platforms", h: "/ai-exam-prep", desc: "Test preparation" },
              { l: "Free AI Tools Directory", h: "/free-ai-tools", desc: "Agent resources" },
              { l: "Real Estate Tech", h: "/real-estate-tech", desc: "PropTech AI" },
              { l: "Sarvam AI Profile", h: "/startup/sarvam-ai", desc: "GenAI" },
              { l: "Startup Registry", h: "/startup", desc: "All startups" },
              { l: "Submit Your Startup", h: "/submit", desc: "Free listing" },
              { l: "AI Agent Tools Guide", h: "/ai-agent-tools-guide", desc: "Marketing AI" },
            ].map((lnk) => (
              <Link
                key={lnk.h}
                href={lnk.h}
                className="flex items-center justify-between gap-1 p-3 hover:border-[#1A1208] transition-all rounded-sm hover-lift"
                style={{ border: "1px solid #D8D2C4", background: "white", textDecoration: "none" }}
              >
                <div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider text-[#1A1208] block"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    {lnk.l}
                  </span>
                  <span className="text-[7px] text-[#AAA] uppercase tracking-wider hidden sm:inline-block">{lnk.desc}</span>
                </div>
                <ChevronRight className="w-2.5 h-2.5 text-[#AAA] flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS SECTION ── */}
        <section className="py-8" style={{ borderBottom: "1px solid #C8C2B4" }}>
          <p
            className="text-[8.5px] font-black uppercase tracking-[0.26em] mb-6"
            style={{ color: accent, fontFamily: "system-ui,sans-serif" }}
          >
            From Failed to Licensed — Real Student Stories
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-5" style={{ background: "white", border: "1px solid #D8D2C4" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5" style={{ background: accentBg, color: accent }}>{t.result}</span>
                </div>
                <p className="text-[12px] italic text-[#2C2010] leading-relaxed">"{t.quote}"</p>
                <div className="mt-3 pt-2 border-t border-[#EDE9DF]">
                  <p className="text-[11px] font-bold text-[#1A1208]">{t.name}</p>
                  <p className="text-[8px] text-[#AAA] uppercase tracking-wider">{t.location}</p>
                </div>
              </div>
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
                Building the future of professional exam prep? Get verified on UpForge.
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
                className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-bold uppercase tracking-wider hover:opacity-90 transition-all rounded-sm"
                style={{
                  background: "#1A1208",
                  fontSize: 11,
                  fontFamily: "system-ui,sans-serif",
                  textDecoration: "none",
                }}
                aria-label="List your startup on UpForge for free"
              >
                List Your Startup — Free <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <p
            className="text-[9px] leading-relaxed mt-4"
            style={{ color: "#BBB0A0", fontFamily: "system-ui,sans-serif" }}
          >
            * Data sourced from EstatePass's official website, LinkedIn page, and user testimonials
            as of April 2026. UpForge is an independent registry — no paid placements, no sponsored rankings.
            EstatePass is 100% free with no credit card required.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "EdTech AI Startups", h: "/edtech-ai-startups" },
                { l: "Startup Registry", h: "/startup" },
                { l: "AI Exam Prep Guide", h: "/ai-exam-prep" },
                { l: "Free AI Tools", h: "/free-ai-tools" },
                { l: "Real Estate Tech", h: "/real-estate-tech" },
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
