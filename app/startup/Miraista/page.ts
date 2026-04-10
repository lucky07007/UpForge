"use client"

// app/startup/Miraista/page.tsx
// UpForge — Miraista · Rachit & Bharat Parmar Founder Chronicle

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight, Brain, Calendar, MapPin, Users, TrendingUp, Building2, GraduationCap, Car, MessageSquare, FileText, Activity } from "lucide-react"

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.upforge.org/startup/Miraista#article",
      "headline": "Miraista — How Rachit & Bharat Parmar Are Building a DeepTech AI Powerhouse from India",
      "description": "Miraista founder story — Rachit and Bharat Parmar built a DeepTech product development and consulting company specializing in AI/ML, GenAI, and digital transformation.",
      "url": "https://www.upforge.org/startup/Miraista",
      "datePublished": "2026-04-11",
      "dateModified": "2026-04-11",
      "inLanguage": "en-IN",
      "publisher": {
        "@type": "Organization",
        "name": "UpForge",
        "url": "https://www.upforge.org"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.upforge.org" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://www.upforge.org/startup" },
        { "@type": "ListItem", "position": 3, "name": "Miraista", "item": "https://www.upforge.org/startup/Miraista" }
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
            "text": "Miraista was co-founded by Rachit and Bharat Parmar. The company is a DeepTech product development and consulting firm based in Delhi, India."
          }
        },
        {
          "@type": "Question",
          "name": "What is UKTI by Miraista?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UKTI is an AI and Computer Vision-powered, activity-based learning platform designed for primary school children, aligned with NEP 2020."
          }
        },
        {
          "@type": "Question",
          "name": "What is Miraista's Vehicle Damage Assessment AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Miraista's Vehicle Damage Assessment AI uses RCNN and YOLO models to automate motor damage assessment with 99.8% accuracy."
          }
        }
      ]
    }
  ]
}

const STATS = [
  { l: "Founded", v: "2020", icon: Calendar },
  { l: "HQ", v: "Delhi", icon: MapPin },
  { l: "Team Size", v: "2-10", icon: Users },
  { l: "AI Accuracy", v: "99.8%", icon: TrendingUp },
  { l: "Speed", v: "10x Faster", icon: Activity },
  { l: "Industries", v: "6+", icon: Building2 },
]

const TIMELINE = [
  { year: "2020", event: "Miraista is founded in Delhi by Rachit and Bharat Parmar." },
  { year: "2022-23", event: "Development of core AI capabilities including computer vision and NLP." },
  { year: "2024", event: "Launches Vehicle Damage Assessment AI with 99.8% accuracy." },
  { year: "Early 2025", event: "Accepted into IIM Lucknow's Enterprise Incubation Centre." },
  { year: "Feb 2026", event: "Launches UKTI at Bharat Bodhan AI Conclave at IIT Madras." },
  { year: "Mar 2026", event: "Exhibits at Startup ka Mahakumbh and India AI Impact Summit." },
]

const COLS = [
  {
    h: "From DeepTech Consulting to Product",
    b: "Miraista began as a DeepTech consulting firm, helping enterprises design and scale AI/ML and GenAI solutions. Founders Rachit and Bharat Parmar recognized a gap in the market: while many offered AI as a service, few provided end-to-end ownership.\n\nThe company built a reputation for responsible, scalable AI by design, serving clients in insurance, banking, and healthcare. Their vehicle damage assessment AI became a flagship solution, using RCNN and YOLO models to automate motor claims with 99.8% accuracy, reducing processing time by 70%."
  },
  {
    h: "UKTI: AI for Foundational Learning",
    b: "In February 2026, Miraista launched UKTI at the Bharat Bodhan AI Conclave at IIT Madras. UKTI is an AI and computer vision-powered, activity-based learning platform for primary school children.\n\nIndia faces a foundational learning crisis. UKTI addresses this gap by moving beyond rote memorization. It uses voice, image recognition, and guided classroom workflows to make learning playful, structured, and scalable, aligned with NEP 2020."
  },
  {
    h: "The Vision: Engineering Intelligence",
    b: "Miraista is building an ecosystem of AI-powered solutions across industries. For banking and insurance, their multi-language chatbot provides 24/7 customer support. For healthcare, a patient care assistant handles scheduling and symptom assessment.\n\nAt Miraista, we engineer intelligence, resilience, and long-term value. With incubation support from IIM Lucknow, Miraista is positioning itself as a key player in India's DeepTech revolution."
  }
]

const PULL_QUOTE = {
  text: "At Miraista, we don't just build technology — we engineer intelligence, resilience, and long-term value.",
  by: "Rachit & Bharat Parmar, Co-Founders, Miraista"
}

const LESSON = "Miraista's journey shows that DeepTech consulting can be a launchpad for proprietary AI products. By mastering enterprise-grade AI for clients, they built the technical depth to create UKTI — a socially impactful EdTech platform."

const INVESTORS = [
  { name: "IIM Lucknow Enterprise Incubation Centre", type: "Incubator" },
  { name: "Bharat Bodhan AI Conclave", type: "Partner" },
  { name: "Startup ka Mahakumbh", type: "Exhibitor" },
  { name: "India AI Impact Summit", type: "Exhibitor" },
]

const PRODUCTS = [
  { name: "UKTI (EdTech)", desc: "AI + CV activity-based learning", icon: GraduationCap },
  { name: "Vehicle Damage AI", desc: "RCNN/YOLO claims automation", icon: Car },
  { name: "Multi-Language Chatbot", desc: "24/7 customer support", icon: MessageSquare },
  { name: "Document Processing", desc: "OCR with 99.8% accuracy", icon: FileText },
]

const FAQS = [
  {
    q: "What AI models does Miraista use for vehicle damage assessment?",
    a: "Miraista uses RCNN for damage assessment and YOLO for object detection, processing images in 2.3 seconds with 99.8% accuracy."
  },
  {
    q: "How does UKTI align with NEP 2020?",
    a: "UKTI supports Foundational Literacy and Numeracy (FLN) using activity-based learning and real-time AI interaction."
  },
  {
    q: "Is Miraista open to collaborations?",
    a: "Yes. Contact them at coo@miraista.com for partnerships and collaborations."
  }
]

const RELATED = [
  { name: "Sarvam AI", slug: "sarvam-ai", cat: "Generative AI", val: "$1B+" },
  { name: "Alt Mobility", slug: "alt-mobility", cat: "EV Leasing", val: "Rs 461 Cr" },
]

export default function MiraistaPage() {
  const accent = "#3B82F6"
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
    return () => {
      const el = document.getElementById("page-jsonld")
      if (el) el.remove()
    }
  }, [])

  return React.createElement("div", {
    style: { minHeight: "100vh", background: "#F3EFE5", fontFamily: "'Georgia', 'Times New Roman', serif" }
  },
    React.createElement("style", null, `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
      .pf { font-family: 'Playfair Display', Georgia, serif !important; }
      .dropcap::first-letter {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 4em; font-weight: 900; line-height: 0.82;
        float: left; margin-right: 0.08em; margin-top: 0.06em;
        color: #1A1208;
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-up { animation: fadeUp 0.4s ease both; }
      @media (min-width: 640px) {
        .ncols { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; }
        .ncols > div { padding: 0 1.5rem; border-right: 1px solid #C8C2B4; }
        .ncols > div:first-child { padding-left: 0; }
        .ncols > div:last-child { border-right: none; padding-right: 0; }
      }
      .gradient-text {
        background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    `),

    React.createElement("h1", { className: "sr-only" }, "Miraista Founder Story — Rachit and Bharat Parmar | DeepTech AI | UpForge"),

    // Breadcrumb
    React.createElement("nav", {
      className: "px-4 sm:px-8 py-2",
      style: { background: "#EDE9DF", borderBottom: "1px solid #D8D2C4", fontFamily: "system-ui, sans-serif" }
    },
      React.createElement("ol", { className: "flex flex-wrap items-center gap-1.5 text-[9px] text-[#AAA] uppercase tracking-widest" },
        React.createElement("li", { className: "flex items-center gap-1.5" },
          React.createElement(Link, { href: "/", className: "hover:text-[#1A1208] transition-colors" }, "UpForge"),
          React.createElement(ChevronRight, { className: "w-2.5 h-2.5 text-[#C8C2B4]" })),
        React.createElement("li", { className: "flex items-center gap-1.5" },
          React.createElement(Link, { href: "/startup", className: "hover:text-[#1A1208] transition-colors" }, "Startup Registry"),
          React.createElement(ChevronRight, { className: "w-2.5 h-2.5 text-[#C8C2B4]" })),
        React.createElement("li", { className: "flex items-center gap-1.5" },
          React.createElement("span", { className: "text-[#1A1208] font-semibold" }, "Miraista")))
    ),

    // Header
    React.createElement("header", { style: { background: "#F3EFE5", borderBottom: "3px solid #1A1208" } },
      React.createElement("div", { className: "text-center px-4 pt-3 pb-6", style: { borderBottom: "1px solid #C8C2B4" } },
        React.createElement("p", { className: "text-[8px] tracking-[0.44em] text-[#AAA] uppercase mb-2", style: { fontFamily: "system-ui, sans-serif" } }, "UpForge · Startup Registry · DeepTech and AI"),
        React.createElement("p", { className: "pf font-black leading-none text-[#1A1208]", style: { fontSize: "clamp(2rem, 5.5vw, 4.2rem)" } }, "The Founder Chronicle"),
        React.createElement("p", { className: "italic mt-2 text-[#6B5C40]", style: { fontSize: "clamp(12px, 1.8vw, 15px)" } }, "India's independent startup registry — April 2026"),
        React.createElement("div", { className: "flex items-center justify-center gap-3 mt-4" },
          React.createElement("div", { className: "h-px w-20 sm:w-36", style: { background: "#C8C2B4" } }),
          React.createElement("span", { style: { color: "#C8C2B4", fontSize: 12 } }, "\u2726"),
          React.createElement("div", { className: "h-px w-20 sm:w-36", style: { background: "#C8C2B4" } }))),
      React.createElement("div", { className: "flex items-center px-4 sm:px-8 py-2 gap-4", style: { fontFamily: "system-ui, sans-serif", borderBottom: "1px solid #C8C2B4" } },
        React.createElement("span", { className: "text-[8px] text-[#AAA] uppercase tracking-widest" }, "Edition · DeepTech AI"),
        React.createElement("div", { className: "h-3 w-px bg-[#C8C2B4]" }),
        React.createElement("span", { className: "text-[9px] font-black uppercase tracking-wider", style: { color: accent } }, "AI Consulting · April 2026"),
        React.createElement("div", { className: "h-3 w-px bg-[#C8C2B4]" }),
        React.createElement("span", { className: "text-[9px] text-[#AAA]" }, "Delhi, India"))
    ),

    // Main
    React.createElement("main", { className: "fade-up max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16" },
      React.createElement("div", { className: "grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]", style: { borderBottom: "2px solid #1A1208" } },
        // Left column
        React.createElement("article", { className: "py-8 lg:pr-8", style: { borderRight: "1px solid #C8C2B4" } },
          React.createElement("div", { className: "flex items-center gap-3 mb-5", style: { fontFamily: "system-ui, sans-serif" } },
            React.createElement("span", { className: "text-[8.5px] font-black tracking-[0.28em] uppercase px-3 py-1.5 text-white", style: { background: accent } }, "DEEPTECH / AI"),
            React.createElement("span", { className: "text-[9px] text-[#AAA] uppercase tracking-wider" }, "April 2026")),
          React.createElement("h2", { className: "pf font-black leading-[1.05] text-[#1A1208] mb-5", style: { fontSize: "clamp(1.8rem, 4vw, 3.2rem)" } },
            "From building AI for enterprises to launching ",
            React.createElement("span", { className: "gradient-text" }, "India's most thoughtful EdTech platform.")),
          React.createElement("p", { className: "italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]", style: { fontSize: "clamp(14px, 1.9vw, 17px)", borderBottom: "1px solid #C8C2B4" } },
            "Miraista started as a DeepTech consulting firm, helping insurers automate vehicle damage assessment with 99.8% accurate AI. Then they built UKTI — an activity-based learning platform launched at IIT Madras."),
          React.createElement("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 mb-8", style: { fontFamily: "system-ui, sans-serif" } },
            ["By UpForge Editorial", "Delhi", "Est. 2020", "DeepTech AI Studio"].map((t, i) =>
              React.createElement("span", { key: i, className: "flex items-center gap-2" },
                React.createElement("span", { className: "text-[9px] text-[#AAA] uppercase tracking-wider" }, t),
                i < 3 && React.createElement("span", { className: "text-[#C8C2B4] text-[10px]" }, "\u00b7")))),
          // Mobile image
          React.createElement("div", { className: "lg:hidden mb-8" },
            React.createElement("div", { className: "w-full flex items-center justify-center", style: { height: "min(300px, 60vw)", background: "#E0E7FF" } },
              React.createElement(Brain, { className: "w-16 h-16 text-[#3B82F6] opacity-50" })),
            React.createElement("div", { className: "px-4 py-3", style: { background: "#1A1208" } },
              React.createElement("p", { className: "pf text-white font-bold", style: { fontSize: 13 } }, "Rachit & Bharat Parmar"),
              React.createElement("p", { className: "text-white/40 text-[9px] uppercase tracking-wide mt-0.5", style: { fontFamily: "system-ui, sans-serif" } }, "Co-Founders · Miraista"))),
          // 3 columns
          React.createElement("div", { className: "ncols" },
            COLS.map((col, ci) =>
              React.createElement("div", { key: ci, className: "mb-6 sm:mb-0" },
                React.createElement("h3", { className: "font-black uppercase tracking-[0.13em] mb-3 pb-1.5", style: { fontSize: 11, color: "#1A1208", borderBottom: "1.5px solid " + accent, fontFamily: "system-ui, sans-serif" } }, col.h),
                col.b.split("\n\n").map((p, pi) =>
                  React.createElement("p", { key: pi, className: "leading-[1.9] mb-3 text-[#2C2010]", style: { fontSize: "clamp(12.5px, 1.3vw, 13.5px)" } }, p)))),
          // Pull quote
          React.createElement("div", { className: "mt-10 pt-6 pb-6 text-center", style: { borderTop: "3px double " + accent, borderBottom: "1px solid #C8C2B4" } },
            React.createElement("span", { style: { display: "block", color: accentDark, fontSize: 24, marginBottom: 10 } }, "\u275d"),
            React.createElement("blockquote", { className: "pf italic text-[#1A1208] leading-[1.7] max-w-2xl mx-auto px-4", style: { fontSize: "clamp(16px, 2.2vw, 22px)" } }, "\"" + PULL_QUOTE.text + "\""),
            React.createElement("p", { className: "text-[9px] uppercase tracking-[0.24em] text-[#AAA] mt-4", style: { fontFamily: "system-ui, sans-serif" } }, "\u2014 " + PULL_QUOTE.by)),
          // Timeline
          React.createElement("div", { className: "mt-8" },
            React.createElement("p", { className: "text-[8.5px] font-black uppercase tracking-[0.26em] mb-4", style: { color: accent, fontFamily: "system-ui, sans-serif", borderBottom: "1px solid " + accentBorder, paddingBottom: 8 } }, "Company Timeline"),
            React.createElement("ol", { style: { fontFamily: "system-ui, sans-serif" } },
              TIMELINE.map((t, i) =>
                React.createElement("li", { key: i, className: "flex gap-4 mb-4" },
                  React.createElement("div", { className: "flex flex-col items-center flex-shrink-0" },
                    React.createElement("div", { className: "w-2.5 h-2.5 rounded-full mt-1.5", style: { background: accent } }),
                    i < TIMELINE.length - 1 && React.createElement("div", { className: "w-px flex-1 mt-1", style: { background: accentBorder, minHeight: 24 } })),
                  React.createElement("div", null,
                    React.createElement("span", { className: "text-[9px] font-black uppercase tracking-wider", style: { color: accent } }, t.year),
                    React.createElement("p", { className: "text-[12px] text-[#2C2010] mt-0.5 leading-relaxed" }, t.event))))),
          // FAQ
          React.createElement("section", { className: "mt-8" },
            React.createElement("p", { className: "text-[8.5px] font-black uppercase tracking-[0.26em] mb-4", style: { color: accent, fontFamily: "system-ui, sans-serif", borderBottom: "1px solid " + accentBorder, paddingBottom: 8 } }, "Frequently Asked Questions"),
            FAQS.map((faq, i) =>
              React.createElement("div", { key: i, className: "mb-4 pb-4", style: { borderBottom: "1px solid #D8D2C4" } },
                React.createElement("h3", { className: "font-bold text-[#1A1208] mb-1.5", style: { fontSize: 13, fontFamily: "system-ui, sans-serif" } }, faq.q),
                React.createElement("p", { className: "text-[12.5px] text-[#5A4A30] leading-relaxed", style: { fontFamily: "system-ui, sans-serif" } }, faq.a))))),

        // Right sidebar
        React.createElement("aside", { className: "hidden lg:block pl-8 pt-8 pb-8" },
          React.createElement("div", { className: "sticky top-4 flex flex-col gap-5" },
            React.createElement("div", { className: "relative w-full overflow-hidden rounded-sm shadow-md", style: { height: 340, background: "#E0E7FF" } },
              React.createElement("div", { className: "w-full h-full flex items-center justify-center" },
                React.createElement(Brain, { className: "w-20 h-20 text-[#3B82F6] opacity-30" })),
              React.createElement("div", { className: "absolute bottom-0 left-0 right-0 px-4 py-3.5", style: { background: "linear-gradient(to top, rgba(12,7,2,0.96) 60%, transparent)" } },
                React.createElement("p", { className: "pf text-white font-bold", style: { fontSize: 14 } }, "Rachit & Bharat Parmar"),
                React.createElement("p", { className: "text-white/40 text-[9px] uppercase tracking-wide mt-0.5", style: { fontFamily: "system-ui, sans-serif" } }, "Co-Founders · Miraista"))),
            // Links
            React.createElement("div", { className: "flex flex-col gap-2" },
              React.createElement("a", { href: "https://miraista.com", target: "_blank", rel: "noopener noreferrer", className: "flex items-center justify-between px-4 py-2.5 rounded-sm", style: { border: "1.5px solid " + accent, textDecoration: "none" } },
                React.createElement("div", { className: "flex items-center gap-2" },
                  React.createElement("svg", { width: 13, height: 13, viewBox: "0 0 24 24", fill: "none", stroke: accent, strokeWidth: 2 },
                    React.createElement("circle", { cx: 12, cy: 12, r: 10 }),
                    React.createElement("line", { x1: 2, y1: 12, x2: 22, y2: 12 }),
                    React.createElement("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })),
                  React.createElement("span", { className: "text-[10px] font-bold uppercase tracking-wider", style: { color: accent, fontFamily: "system-ui, sans-serif" } }, "miraista.com")),
                React.createElement(ArrowUpRight, { className: "w-3.5 h-3.5", style: { color: accent } })),
              React.createElement("a", { href: "https://www.linkedin.com/company/miraista", target: "_blank", rel: "noopener noreferrer", className: "flex items-center justify-between px-4 py-2.5 rounded-sm", style: { border: "1.5px solid #0077b5", textDecoration: "none" } },
                React.createElement("div", { className: "flex items-center gap-2" },
                  React.createElement("svg", { width: 13, height: 13, viewBox: "0 0 24 24", fill: "#0077b5" },
                    React.createElement("path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }),
                    React.createElement("rect", { x: 2, y: 9, width: 4, height: 12 }),
                    React.createElement("circle", { cx: 4, cy: 4, r: 2 })),
                  React.createElement("span", { className: "text-[10px] font-bold uppercase tracking-wider", style: { color: "#0077b5", fontFamily: "system-ui, sans-serif" } }, "LinkedIn — Miraista")),
                React.createElement(ArrowUpRight, { className: "w-3.5 h-3.5", style: { color: "#0077b5" } }))),
            // Stats
            React.createElement("div", { style: { border: "2px solid #1A1208" }, className: "rounded-sm overflow-hidden" },
              React.createElement("div", { className: "px-4 py-2.5", style: { background: "#1A1208" } },
                React.createElement("p", { className: "text-[8px] font-black uppercase tracking-[0.3em] text-white", style: { fontFamily: "system-ui, sans-serif" } }, "Miraista at a Glance")),
              React.createElement("dl", { className: "grid grid-cols-2 divide-x divide-y", style: { borderColor: "#D8D2C4" } },
                STATS.map((s, i) => {
                  const IconComponent = s.icon
                  return React.createElement("div", { key: i, className: "px-4 py-3", style: { borderColor: "#D8D2C4" } },
                    React.createElement("dt", { className: "text-[7.5px] text-[#AAA] uppercase tracking-[0.16em] mb-1 flex items-center gap-1", style: { fontFamily: "system-ui, sans-serif" } },
                      React.createElement(IconComponent, { className: "w-2.5 h-2.5", style: { color: accent } }), s.l),
                    React.createElement("dd", { className: "pf font-black text-[#1A1208] leading-none", style: { fontSize: "1.25rem" } }, s.v))
                }))),
            // Products
            React.createElement("div", { style: { border: "1px solid #D8D2C4" }, className: "rounded-sm overflow-hidden" },
              React.createElement("div", { className: "px-4 py-2", style: { background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" } },
                React.createElement("p", { className: "text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]", style: { fontFamily: "system-ui, sans-serif" } }, "Flagship Products")),
              React.createElement("div", { className: "px-4 py-3 space-y-2" },
                PRODUCTS.map((product, i) => {
                  const IconComponent = product.icon
                  return React.createElement("div", { key: i, className: "flex items-start gap-2" },
                    React.createElement(IconComponent, { className: "w-3 h-3 mt-0.5", style: { color: accent } }),
                    React.createElement("div", null,
                      React.createElement("p", { className: "text-[10px] font-bold text-[#1A1208]" }, product.name),
                      React.createElement("p", { className: "text-[8px] text-[#6B5C40]" }, product.desc)))
                }))),
            // Lesson
            React.createElement("div", { className: "px-4 py-4 rounded-sm", style: { background: accentBg, border: "1px solid " + accentBorder } },
              React.createElement("p", { className: "text-[8px] font-black uppercase tracking-[0.26em] mb-2", style: { color: accent, fontFamily: "system-ui, sans-serif" } }, "The Lesson"),
              React.createElement("p", { className: "italic text-[#1A1208] leading-[1.72]", style: { fontSize: 13 } }, LESSON)),
            // Investors
            React.createElement("div", { style: { border: "1px solid #D8D2C4" }, className: "rounded-sm overflow-hidden" },
              React.createElement("div", { className: "px-4 py-2", style: { background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" } },
                React.createElement("p", { className: "text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]", style: { fontFamily: "system-ui, sans-serif" } }, "Recognition")),
              React.createElement("div", { className: "px-4 py-3 space-y-1.5" },
                INVESTORS.map((inv, i) =>
                  React.createElement("div", { key: i, className: "flex items-center justify-between text-[11px] text-[#2C2010]", style: { fontFamily: "system-ui, sans-serif" } },
                    React.createElement("div", { className: "flex items-center gap-2" },
                      React.createElement("span", { style: { width: 6, height: 6, borderRadius: 1, background: accent, display: "inline-block" } }),
                      React.createElement("span", { className: "font-medium" }, inv.name)),
                    React.createElement("span", { className: "text-[8px] text-[#AAA] uppercase tracking-wider" }, inv.type))))),
            // Related
            React.createElement("div", null,
              React.createElement("p", { className: "text-[8px] font-black uppercase tracking-[0.26em] mb-3", style: { color: "#AAA", fontFamily: "system-ui, sans-serif" } }, "Also Read on UpForge"),
              RELATED.map((r) =>
                React.createElement(Link, { key: r.slug, href: "/startup/" + r.slug, className: "flex items-center justify-between py-2.5", style: { borderBottom: "1px solid #EDE9DF", textDecoration: "none" } },
                  React.createElement("div", null,
                    React.createElement("p", { className: "text-[11px] font-bold text-[#1A1208]", style: { fontFamily: "system-ui, sans-serif" } }, r.name),
                    React.createElement("p", { className: "text-[9px] text-[#AAA] uppercase tracking-wider" }, r.cat + " · " + r.val)),
                  React.createElement(ArrowUpRight, { className: "w-3.5 h-3.5 text-[#AAA]" }))))))),

      // Footer links section
      React.createElement("section", { className: "py-8", style: { borderBottom: "1px solid #C8C2B4" } },
        React.createElement("p", { className: "text-[9px] tracking-[0.3em] uppercase text-[#AAA] mb-4", style: { fontFamily: "system-ui, sans-serif" } }, "Explore More DeepTech & AI Startups"),
        React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3" },
          [
            { l: "DeepTech Startups India", h: "/deeptech-startups-india" },
            { l: "Indian Unicorns List", h: "/indian-unicorns" },
            { l: "AI in Education", h: "/ai-edtech-startups" },
            { l: "Sarvam AI Profile", h: "/startup/sarvam-ai" },
            { l: "Startup Registry", h: "/startup" },
            { l: "Submit Your Startup", h: "/submit" },
          ].map((lnk) =>
            React.createElement(Link, { key: lnk.h, href: lnk.h, className: "flex items-center justify-between gap-1 p-3 rounded-sm", style: { border: "1px solid #D8D2C4", background: "white", textDecoration: "none" } },
              React.createElement("span", { className: "text-[10px] font-bold uppercase tracking-wider text-[#1A1208]", style: { fontFamily: "system-ui, sans-serif" } }, lnk.l),
              React.createElement(ChevronRight, { className: "w-2.5 h-2.5 text-[#AAA]" }))))),

      // Footer
      React.createElement("footer", { className: "pt-8 pb-2" },
        React.createElement("div", { className: "grid sm:grid-cols-2 gap-6 items-center pb-8", style: { borderBottom: "1px solid #D8D2C4" } },
          React.createElement("div", null,
            React.createElement("p", { className: "pf font-bold text-[#1A1208] mb-2", style: { fontSize: "1.2rem" } }, "Building India's next DeepTech unicorn? Get verified on UpForge."),
            React.createElement("p", { className: "text-[12px] text-[#6B5C40]", style: { fontFamily: "system-ui, sans-serif" } }, "Free startup profiles. Independent verification. Indexed by Google.")),
          React.createElement("div", { className: "flex sm:justify-end" },
            React.createElement(Link, { href: "/submit", className: "inline-flex items-center gap-2 px-6 py-3.5 text-white font-bold uppercase tracking-wider rounded-sm", style: { background: "#1A1208", fontSize: 11, fontFamily: "system-ui, sans-serif", textDecoration: "none" } },
              "List Your Startup — Free",
              React.createElement(ArrowRight, { className: "w-3.5 h-3.5" })))),
        React.createElement("p", { className: "text-[9px] leading-relaxed mt-4", style: { color: "#BBB0A0", fontFamily: "system-ui, sans-serif" } },
          "* Data sourced from Miraista's official website, LinkedIn, and event participations as of April 2026. UpForge is an independent registry."),
        React.createElement("nav", { "aria-label": "Footer navigation", className: "mt-3" },
          React.createElement("ul", { className: "flex flex-wrap gap-x-4 gap-y-2" },
            [
              { l: "DeepTech Startups", h: "/deeptech-startups-india" },
              { l: "Startup Registry", h: "/startup" },
              { l: "Submit Startup", h: "/submit" },
            ].map((lnk) =>
              React.createElement("li", { key: lnk.h },
                React.createElement(Link, { href: lnk.h, className: "text-[9px] text-[#AAA] hover:text-[#1A1208] uppercase tracking-wider transition-colors", style: { fontFamily: "system-ui, sans-serif" } }, lnk.l)))))))
    )
  )
}
