"use client"

// app/startup/Miraista/page.tsx
// UpForge — Miraista · Rachit & Bharat Parmar Founder Chronicle
// SEO: DeepTech AI Consulting, Vehicle Damage Assessment, UKTI EdTech, GenAI Solutions
// Designed for maximum crawlability and indexing on Google Search.

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight, Brain, Car, GraduationCap, Building2, Users, Calendar, MapPin, TrendingUp, Shield, Sparkles, Cpu, Bot, Eye, FileText, MessageSquare, Activity, Heart } from "lucide-react"

// ─── ENHANCED JSON-LD WITH MIRAISTA-SPECIFIC SCHEMA ─────────────────────────
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.upforge.org/startup/Miraista#article",
      "headline": "Miraista — How Rachit & Bharat Parmar Are Building a DeepTech AI Powerhouse from India",
      "description": "Miraista founder story — Rachit and Bharat Parmar built a DeepTech product development and consulting company specializing in AI/ML, GenAI, and digital transformation. Creators of UKTI (AI EdTech) and an industry-leading Vehicle Damage Assessment AI solution. Backed by IIM Lucknow's incubation.",
      "url": "https://www.upforge.org/startup/Miraista",
      "datePublished": "2026-04-11T00:00:00+05:30",
      "dateModified": "2026-04-11T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.org/Upforge-miraista.webp",
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
          "name": "Rachit",
          "jobTitle": "Co-Founder",
          "worksFor": { "@type": "Organization", "name": "Miraista" }
        },
        {
          "@type": "Person",
          "name": "Bharat Parmar",
          "jobTitle": "Co-Founder & COO",
          "worksFor": { "@type": "Organization", "name": "Miraista" },
          "sameAs": ["https://www.linkedin.com/company/miraista/"]
        }
      ],
      "mentions": [
        {
          "@type": "Organization",
          "name": "Miraista",
          "url": "https://miraista.com",
          "foundingDate": "2020",
          "foundingLocation": {
            "@type": "Place",
            "addressLocality": "Delhi",
            "addressCountry": "IN"
          },
          "description": "Miraista is a DeepTech product development and consulting company that helps organizations design, build, and scale future-ready digital systems with AI/ML, GenAI, and digital transformation.",
          "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 2, "maxValue": 10 },
          "sameAs": [
            "https://miraista.com",
            "https://www.linkedin.com/company/miraista/"
          ]
        },
        {
          "@type": "Product",
          "name": "UKTI",
          "brand": { "@type": "Brand", "name": "Miraista" },
          "description": "AI and Computer Vision powered activity-based learning platform for primary school children, strengthening Foundational Literacy & Numeracy (FLN) aligned with NEP 2020."
        },
        {
          "@type": "Product",
          "name": "Vehicle Damage Assessment AI",
          "brand": { "@type": "Brand", "name": "Miraista" },
          "description": "AI-powered vehicle damage assessment solution using RCNN and YOLO models for automated image analysis, damage detection, and severity evaluation with 99.8% accuracy."
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.upforge.org" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://www.upforge.org/startup" },
        { "@type": "ListItem", "position": 3, "name": "DeepTech Startups India", "item": "https://www.upforge.org/deeptech-startups-india" },
        { "@type": "ListItem", "position": 4, "name": "Miraista", "item": "https://www.upforge.org/startup/Miraista" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who founded Miraista?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Miraista was co-founded by Rachit and Bharat Parmar. The company is a DeepTech product development and consulting firm based in Delhi, India, focused on AI/ML, GenAI, and digital transformation."
          }
        },
        {
          "@type": "Question",
          "name": "What is UKTI by Miraista?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UKTI is an AI and Computer Vision-powered, activity-based learning platform designed for primary school children. It strengthens Foundational Literacy & Numeracy (FLN) and is aligned with India's National Education Policy (NEP) 2020. UKTI focuses on contextual learning and real-world communication."
          }
        },
        {
          "@type": "Question",
          "name": "What is Miraista's Vehicle Damage Assessment AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Miraista's Vehicle Damage Assessment AI uses advanced models like RCNN and YOLO to automate motor damage assessment. It processes vehicle images to detect damage, evaluate severity, and generate reports with 99.8% accuracy, reducing processing time by 70%."
          }
        },
        {
          "@type": "Question",
          "name": "What industries does Miraista serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Miraista provides AI and DeepTech solutions across multiple industries including Insurance (claims processing), Banking (customer support, fraud detection), Healthcare (patient care), Wealth Management, Science & Research, and the Public Sector."
          }
        },
        {
          "@type": "Question",
          "name": "What is Miraista's multi-language chatbot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Miraista offers an intelligent, customizable multi-language chatbot AI. It supports personalized interactions, handles complex queries, and can be integrated across industries like banking, insurance, and healthcare to provide 24/7 automated customer support."
          }
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://miraista.com#organization",
      "name": "Miraista",
      "url": "https://miraista.com",
      "logo": "https://miraista.com/logo.png",
      "description": "DeepTech product development and consulting company specializing in AI/ML, GenAI, and digital transformation.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Delhi",
        "addressCountry": "IN"
      }
    }
  ]
}

// ─── DATA FOR MIRAISTA ──────────────────────────────────────────────────────
const STATS = [
  { l: "Founded", v: "2020", icon: Calendar },
  { l: "HQ", v: "Delhi", icon: MapPin },
  { l: "Team Size", v: "2-10", icon: Users },
  { l: "AI Accuracy", v: "99.8%", icon: TrendingUp },
  { l: "Processing Speed", v: "10x Faster", icon: Activity },
  { l: "Industries", v: "6+", icon: Building2 },
]

const TIMELINE = [
  { year: "2020", event: "Miraista is founded in Delhi by Rachit and Bharat Parmar with a vision to build deep-tech AI solutions for enterprises." },
  { year: "2022-23", event: "Development of core AI capabilities including computer vision and NLP. Launches intelligent chatbot solutions for banking and insurance sectors." },
  { year: "2024", event: "Launches Vehicle Damage Assessment AI using RCNN and YOLO models, achieving 99.8% accuracy for insurance clients. Processes images in under 2.3 seconds." },
  { year: "Early 2025", event: "Accepted into IIM Lucknow's Enterprise Incubation Centre. Begins development of UKTI, an AI-powered EdTech platform." },
  { year: "Feb 2026", event: "Officially launches 'UKTI' at the BBharat Bodhan AI Conclave 2026 at IIT Madras in the presence of Union Education Minister Shri Dharmendra Pradhan." },
  { year: "Mar 2026", event: "Exhibits UKTI at 'Startup ka Mahakumbh' and 'India AI Impact Summit 2026', receiving strong interest from educators and stakeholders." },
]

const COLS = [
  {
    h: "From DeepTech Consulting to Product Innovation",
    b: `Miraista began as a DeepTech consulting firm, helping enterprises design and scale AI/ML and GenAI solutions. Founders Rachit and Bharat Parmar recognized a gap in the market: while many offered AI as a service, few provided end-to-end ownership from concept to production with a true engineering-first mindset.\n\nThe company built a reputation for responsible, scalable, and secure AI by design, serving clients in insurance, banking, and healthcare. Their vehicle damage assessment AI became a flagship solution, using RCNN and YOLO models to automate motor claims with 99.8% accuracy. This wasn't just an incremental improvement—it reduced processing time by 70%, transforming how insurers handle claims.\n\n"Strong engineering DNA with real-world problem focus," as the team puts it, became their differentiator. But Miraista wasn't content to only build for others. They saw an opportunity to apply their own AI stack to a problem that mattered deeply: education.`
  },
  {
    h: "UKTI: AI for Foundational Learning",
    b: `In February 2026, Miraista launched UKTI at the BBharat Bodhan AI Conclave at IIT Madras, with India's Union Education Minister in attendance. UKTI is an AI and computer vision-powered, activity-based learning platform designed for primary school children.\n\nIndia faces a foundational learning crisis. The ASER report shows only about 27% of Class 3 students can read a Class 2 text. UKTI directly addresses this gap by moving beyond rote memorization. It uses voice, image recognition, and guided classroom workflows to make learning playful, structured, and scalable.\n\n"Learning should feel like play, not pressure," the Miraista team states. UKTI provides real-time student activity tracking, instant feedback, and insights for teachers. It's aligned with the National Education Policy (NEP) 2020's focus on Foundational Literacy and Numeracy (FLN), turning classrooms into interactive spaces where children learn through movement and participation.`
  },
  {
    h: "The Vision: Engineering Intelligence Across Sectors",
    b: `Miraista's ambition extends far beyond a single product. The company is building an ecosystem of AI-powered solutions that span industries while maintaining a core engineering-first philosophy.\n\nFor banking and insurance, their multi-language chatbot provides 24/7 customer support, fraud detection, and automated document processing. For healthcare, a patient care assistant handles scheduling, symptom assessment, and prescription reminders. Their vehicle damage assessment AI continues to evolve, with pattern recognition and severity analysis that sets a new standard for the insurance industry.\n\n"At Miraista, we don't just build technology—we engineer intelligence, resilience, and long-term value." With incubation support from IIM Lucknow and growing recognition from India's AI ecosystem, Miraista is positioning itself as a key player in the country's DeepTech revolution, one intelligent solution at a time.`
  }
]

const PULL_QUOTE = {
  text: "At Miraista, we don't just build technology—we engineer intelligence, resilience, and long-term value. Strong engineering DNA with real-world problem focus is our core.",
  by: "Rachit & Bharat Parmar, Co-Founders, Miraista"
}

const LESSON = "Miraista's journey shows that DeepTech consulting can be a launchpad for proprietary AI products. By first mastering enterprise-grade AI for clients in insurance and banking, they built the technical depth to then create UKTI—a socially impactful EdTech platform—without starting from scratch. Solve for others, then build for the world."

const INVESTORS = [
  { name: "IIM Lucknow Enterprise Incubation Centre", location: "India", type: "Incubator" },
  { name: "BBharat Bodhan AI Conclave", location: "IIT Madras", type: "Partner" },
  { name: "Startup ka Mahakumbh", location: "Delhi", type: "Exhibitor" },
  { name: "India AI Impact Summit", location: "Delhi", type: "Exhibitor" },
]

const PRODUCTS = [
  { name: "UKTI (EdTech)", desc: "AI + CV activity-based learning for FLN" },
  { name: "Vehicle Damage Assessment AI", desc: "RCNN/YOLO-based claims automation" },
  { name: "Multi-Language Chatbot AI", desc: "24/7 intelligent customer support" },
  { name: "Document Processing Engine", desc: "OCR with 99.8% accuracy" },
]

const FAQS = [
  {
    q: "What specific AI models does Miraista use for vehicle damage assessment?",
    a: "Miraista's vehicle damage assessment solution uses a combination of RCNN (Region-based Convolutional Neural Networks) for damage assessment and YOLO (You Only Look Once) for object detection. This enables the system to process images in approximately 2.3 seconds with 99.8% accuracy, identifying damage patterns and severity levels."
  },
  {
    q: "How does UKTI align with India's National Education Policy (NEP) 2020?",
    a: "UKTI is specifically designed to support NEP 2020's focus on Foundational Literacy and Numeracy (FLN). It uses activity-based learning, real-time AI interaction, and contextual, culture-responsive content to help primary school children build strong foundational skills, moving beyond rote memorization to genuine understanding."
  },
  {
    q: "What makes Miraista's chatbot different from other AI chatbots?",
    a: "Miraista's chatbot is a customized, multi-language AI agent designed for specific business contexts. It can be tailored for insurance claims, banking queries, or healthcare assistance. It supports multiple languages, learns from interactions, and integrates with existing business systems to provide personalized, accurate responses 24/7."
  },
  {
    q: "Is Miraista hiring or open to collaborations?",
    a: "Based on their LinkedIn activity and participation in events like Startup Mahakumbh and India AI Impact Summit, Miraista is actively seeking collaborations with schools, enterprises, and technology partners. They are open to partnerships that align with their mission of engineering intelligence through AI. You can contact them at coo@miraista.com."
  },
]

const RELATED = [
  { name: "Sarvam AI", slug: "sarvam-ai", cat: "Generative AI", val: "$1B+" },
  { name: "Agnikul Cosmos", slug: "agnikul-cosmos", cat: "Spacetech", val: "$500M" },
  { name: "Alt Mobility", slug: "alt-mobility", cat: "EV Leasing", val: "₹461 Cr" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function MiraistaPage() {
  // Brand colors inspired by Miraista's professional, tech-forward identity
  const accent = "#3B82F6" // Trustworthy blue for DeepTech/AI
  const accentDark = "#2563EB"
  const accentBg = "#EFF6FF"
  const accentBorder = "#BFDBFE"

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
        .gradient-text { background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        Miraista Founder Story — Rachit & Bharat Parmar | DeepTech AI & UKTI EdTech Platform | UpForge
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
            { n: "DeepTech Startups India", h: "/deeptech-startups-india" },
            { n: "Miraista", h: "/startup/Miraista" },
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
            UpForge · Startup Registry · DeepTech & Artificial Intelligence
          </p>
          <p
            className="pf font-black leading-none text-[#1A1208]"
            style={{ fontSize: "clamp(2rem,5.5vw,4.2rem)" }}
          >
            The Founder Chronicle
          </p>
          <p className="italic mt-2 text-[#6B5C40]" style={{ fontSize: "clamp(12px,1.8vw,15px)" }}>
            India's independent startup registry — verified, editorial, April 2026
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
          <span className="text-[8px] text-[#AAA] uppercase tracking-widest flex-shrink-0">Edition · DeepTech AI</span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: accent }}>
            AI Consulting · Product Innovation · April 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">Delhi, India</span>
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
                DEEPTECH / AI PRODUCTS
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">April 2026</span>
            </div>

            {/* Headline with gradient accent */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              From building AI for enterprises to launching{" "}
              <span className="gradient-text">India's most thoughtful EdTech platform.</span>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              Miraista started as a DeepTech consulting firm, helping insurers automate vehicle damage
              assessment with 99.8% accurate AI. Then they asked a bigger question: if AI can
              understand car damage, can it help a child learn to read? The result is UKTI — an
              activity-based learning platform launched at IIT Madras with India's Education Minister.
              From RCNN and YOLO to foundational literacy, this is the story of Rachit and Bharat Parmar's
              journey to engineer intelligence with purpose.
            </p>

            {/* Byline */}
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}
            >
              {[
                "By UpForge Editorial",
                "Delhi",
                "Est. 2020",
                "DeepTech AI Studio",
              ].map((t, i, a) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-[9px] text-[#AAA] uppercase tracking-wider">{t}</span>
                  {i < a.length - 1 && <span className="text-[#C8C2B4] text-[10px]">·</span>}
                </span>
              ))}
            </div>

            {/* Mobile hero image placeholder - would use actual team photo */}
            <div className="lg:hidden mb-8">
              <div
                className="w-full flex items-center justify-center"
                style={{ height: "min(300px,60vw)", background: "#E0E7FF" }}
              >
                <Brain className="w-16 h-16 text-[#3B82F6] opacity-50" />
              </div>
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>Rachit & Bharat Parmar</p>
                <p
                  className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  Co-Founders · Miraista
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

              {/* Founder image placeholder - would use actual team photo */}
              <div className="relative w-full overflow-hidden rounded-sm shadow-md" style={{ height: 340, background: "#E0E7FF" }}>
                <div className="w-full h-full flex items-center justify-center">
                  <Brain className="w-20 h-20 text-[#3B82F6] opacity-30" />
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3.5"
                  style={{ background: "linear-gradient(to top, rgba(12,7,2,0.96) 60%, transparent)" }}
                >
                  <p className="pf text-white font-bold" style={{ fontSize: 14 }}>Rachit & Bharat Parmar</p>
                  <p
                    className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Co-Founders · Miraista
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn links */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://miraista.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80 rounded-sm"
                  style={{ border: `1.5px solid ${accent}`, textDecoration: "none" }}
                  aria-label="Visit Miraista official website"
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
                      miraista.com — Official Website
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/miraista"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80 rounded-sm"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View Miraista on LinkedIn"
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
                      LinkedIn — Miraista
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
                    Miraista at a Glance
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

              {/* Key Products */}
              <div style={{ border: "1px solid #D8D2C4" }} className="rounded-sm overflow-hidden">
                <div
                  className="px-4 py-2"
                  style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}
                >
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Flagship Products
                  </p>
                </div>
                <div className="px-4 py-3 space-y-2">
                  {PRODUCTS.map((product, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {product.name === "UKTI (EdTech)" && <GraduationCap className="w-3 h-3 mt-0.5" style={{ color: accent }} />}
                      {product.name === "Vehicle Damage Assessment AI" && <Car className="w-3 h-3 mt-0.5" style={{ color: accent }} />}
                      {product.name === "Multi-Language Chatbot AI" && <MessageSquare className="w-3 h-3 mt-0.5" style={{ color: accent }} />}
                      {product.name === "Document Processing Engine" && <FileText className="w-3 h-3 mt-0.5" style={{ color: accent }} />}
                      <div>
                        <p className="text-[10px] font-bold text-[#1A1208]">{product.name}</p>
                        <p className="text-[8px] text-[#6B5C40]">{product.desc}</p>
                      </div>
                    </div>
                  ))}
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

              {/* Key Partners & Incubators */}
              <div style={{ border: "1px solid #D8D2C4" }} className="rounded-sm overflow-hidden">
                <div
                  className="px-4 py-2"
                  style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}
                >
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Incubation & Recognition
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {INVESTORS.map((inv, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-[11px] text-[#2C2010]"
                      style={{ fontFamily: "system-ui,sans-serif" }}
                    >
                      <div className="flex items-center gap-2">
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
                        <span className="font-medium">{inv.name}</span>
                      </div>
                      <span className="text-[8px] text-[#AAA] uppercase tracking-wider">{inv.type}</span>
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
            Explore More DeepTech & AI Startups on UpForge
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "DeepTech Startups India 2026", h: "/deeptech-startups-india", desc: "Complete directory" },
              { l: "Indian Unicorns Full List", h: "/indian-unicorns", desc: "Valuations & growth" },
              { l: "AI in Education Startups", h: "/ai-edtech-startups", desc: "EdTech AI" },
              { l: "Computer Vision Companies", h: "/computer-vision-india", desc: "AI vision" },
              { l: "Sarvam AI Profile", h: "/startup/sarvam-ai", desc: "GenAI" },
              { l: "GenAI Startups India", h: "/genai-startups", desc: "Generative AI" },
              { l: "Startup Registry India", h: "/startup", desc: "All startups" },
              { l: "Submit Your Startup", h: "/submit", desc: "Free listing" },
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

        {/* ── FOOTER ── */}
        <footer className="pt-8 pb-2">
          <div
            className="grid sm:grid-cols-2 gap-6 items-center pb-8"
            style={{ borderBottom: "1px solid #D8D2C4" }}
          >
            <div>
              <p className="pf font-bold text-[#1A1208] mb-2" style={{ fontSize: "1.2rem" }}>
                Building India's next DeepTech unicorn? Get verified on UpForge.
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
            * Data sourced from Miraista's official website, LinkedIn page, press releases, and event
            participations (BBharat Bodhan AI Conclave 2026, Startup ka Mahakumbh, India AI Impact Summit 2026)
            as of April 2026. UpForge is an independent registry — no paid placements, no sponsored rankings.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "DeepTech Startups India", h: "/deeptech-startups-india" },
                { l: "Startup Registry", h: "/startup" },
                { l: "Indian Unicorns", h: "/indian-unicorns" },
                { l: "Sarvam AI Profile", h: "/startup/sarvam-ai" },
                { l: "AI in Education", h: "/ai-edtech-startups" },
                { l: "GenAI Startups", h: "/genai-startups" },
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
