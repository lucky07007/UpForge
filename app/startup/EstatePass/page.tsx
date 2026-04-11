"use client"

// app/startup/sarvam-ai/page.tsx
// UpForge — Sarvam AI · Vivek Raghavan & Pratyush Kumar Founder Chronicle
// SEO: FAQPage ONLY in JSON-LD. Zero microdata on FAQ HTML = no duplicate error.

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://upforge.org/startup/sarvam-ai#article",
      "headline": "Sarvam AI — How Vivek Raghavan & Pratyush Kumar Are Building India's Sovereign AI from Bengaluru",
      "description": "Sarvam AI founder story — The architects of Aadhaar and AI4Bharat founded Sarvam AI in 2023 to build India's indigenous foundational large language models. From $41M seed to a $350M raise at $1.5B valuation. Selected by MeitY for India's sovereign AI mission. Sarvam-105B, Sarvam Kaze smart glasses, and 25,000+ developers on Sarvam Cloud.",
      "url": "https://upforge.org/startup/sarvam-ai",
      "datePublished": "2026-04-11T00:00:00+05:30",
      "dateModified": "2026-04-11T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.org/sarvam-ai-founder-upforge.webp",
        "width": 1200,
        "height": 630
      },
      "publisher": {
        "@type": "Organization",
        "name": "UpForge",
        "url": "https://upforge.org",
        "logo": { "@type": "ImageObject", "url": "https://upforge.org/logo.png" }
      },
      "author": { "@type": "Organization", "name": "UpForge Editorial" },
      "about": [
        {
          "@type": "Person",
          "name": "Vivek Raghavan",
          "jobTitle": "Co-Founder & CEO",
          "worksFor": { "@type": "Organization", "name": "Sarvam AI" },
          "description": "Former Chief Product Manager and Biometric Architect for Aadhaar at UIDAI. Co-founder of Sarvam AI.",
          "sameAs": ["https://www.linkedin.com/company/sarvam-ai/"]
        },
        {
          "@type": "Person",
          "name": "Pratyush Kumar",
          "jobTitle": "Co-Founder & CTO",
          "worksFor": { "@type": "Organization", "name": "Sarvam AI" },
          "alumniOf": { "@type": "CollegeOrUniversity", "name": "IIT Madras" },
          "description": "Co-founder of AI4Bharat at IIT Madras. Microsoft Research alumnus. Built India's first open-source Indic NLP models."
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "Sarvam AI",
        "url": "https://www.sarvam.ai",
        "foundingDate": "2023",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        },
        "description": "Sarvam AI is an Indian artificial intelligence company headquartered in Bengaluru, building foundational large language models and multimodal AI systems with a focus on Indian languages, voice-first interfaces, and sovereign AI infrastructure. Selected by MeitY under the IndiaAI Mission.",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 114 },
        "sameAs": [
          "https://www.sarvam.ai",
          "https://www.linkedin.com/company/sarvam-ai/",
          "https://en.wikipedia.org/wiki/Sarvam_AI"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.org" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.org/startup" },
        { "@type": "ListItem", "position": 3, "name": "AI Startups India", "item": "https://upforge.org/ai-startups-india" },
        { "@type": "ListItem", "position": 4, "name": "Sarvam AI", "item": "https://upforge.org/startup/sarvam-ai" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who founded Sarvam AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sarvam AI was co-founded in August 2023 by Vivek Raghavan and Pratyush Kumar. Vivek Raghavan spent over a decade as Chief Product Manager and Biometric Architect for Aadhaar at UIDAI, overseeing the enrollment of over a billion Indians. Pratyush Kumar co-founded AI4Bharat at IIT Madras — India's foremost open-source Indic NLP research lab — and was previously a researcher at Microsoft Research. Both founders were driven by the conviction that India needed its own sovereign foundational AI models."
          }
        },
        {
          "@type": "Question",
          "name": "How much funding has Sarvam AI raised?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sarvam AI raised $41 million in a combined seed and Series A round in December 2023, led by Lightspeed Venture Partners with participation from Peak XV Partners and Khosla Ventures. In April 2026, the company is reported to be closing a $300–350 million round at a $1.5–1.55 billion valuation, led by Bessemer Venture Partners with Nvidia, Amazon, and Prosperity7 Ventures also participating. Total funding to date is approximately $391–400 million."
          }
        },
        {
          "@type": "Question",
          "name": "What is the IndiaAI Mission and Sarvam AI's role?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The IndiaAI Mission is the Indian government's initiative under MeitY (Ministry of Electronics and Information Technology) to build indigenous foundational AI models. In April 2025, Sarvam AI was selected as one of five companies to develop a sovereign LLM under the Mission, receiving access to government-supported GPU compute at concessional rates. The mission enabled Sarvam to train its Sarvam-30B and Sarvam-105B models at a fraction of typical global compute costs."
          }
        },
        {
          "@type": "Question",
          "name": "What are Sarvam AI's foundational models?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sarvam AI released two foundational models in February 2026: Sarvam-30B, a 30-billion parameter model using a mixture-of-experts (MoE) architecture with a 32,000-token context window; and Sarvam-105B, a 105-billion parameter model activating approximately 9 billion parameters per token with a 128,000-token context window. Sarvam-105B, also released in beta as 'Indus', is designed for complex reasoning and enterprise applications and outperforms ChatGPT and Gemini on Indic language and OCR benchmarks."
          }
        },
        {
          "@type": "Question",
          "name": "What is Sarvam Kaze?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sarvam Kaze is an AI-powered wearable smart glass developed by Sarvam AI that listens, understands, and processes what users see in real time. It supports 10+ Indian languages via voice-based interaction and is designed for real-time translation and accessibility. Prime Minister Narendra Modi was seen wearing Sarvam Kaze at the India AI Impact Summit 2026. Commercial launch is planned for mid-2026."
          }
        },
        {
          "@type": "Question",
          "name": "Is Sarvam AI profitable?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sarvam AI is pre-profitability but growing rapidly. The company reported revenue of ₹29.1 crore ($3.45 million) for FY2025 — its first significant commercial revenue from enterprise API integrations and pilot projects. Burn rate is estimated at $1.5–2.5 million per month, primarily on GPU compute for model training. With the incoming $300–350 million round, the company has a runway of 48+ months. Sarvam Cloud hosts over 25,000 developers and Indian language processing is 2–4x cheaper than GPT-4 equivalents."
          }
        }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Total Funding", v: "~$400M" },
  { l: "Valuation", v: "$1.5B" },
  { l: "Founded", v: "2023" },
  { l: "HQ", v: "Bengaluru" },
  { l: "Models", v: "30B & 105B" },
  { l: "Developers", v: "25,000+" },
]

const TIMELINE = [
  {
    year: "Aug 2023",
    event: "Vivek Raghavan and Pratyush Kumar found Sarvam AI in Bengaluru. The name 'Sarvam' — Sanskrit for 'everything' — signals the ambition: AI infrastructure for all of India, in all of India's languages.",
  },
  {
    year: "Dec 2023",
    event: "Sarvam raises $41 million in a combined seed and Series A round. Lightspeed Venture Partners leads; Peak XV Partners and Khosla Ventures participate. Peak XV and Lightspeed reportedly committed in under a week — a reflex, not due diligence.",
  },
  {
    year: "2024",
    event: "Sarvam joins the AI Alliance, a global consortium with Meta and IBM. Sarvam AI achieves unicorn valuation markers in discussions. DRHP-equivalent disclosures show founders Raghavan and Kumar holding 51.34% combined stake.",
  },
  {
    year: "Apr 2025",
    event: "MeitY selects Sarvam AI under the IndiaAI Mission to develop India's sovereign foundational model — one of five companies chosen. Government-backed GPU compute at concessional rates enables training Sarvam-105B at a fraction of global cost.",
  },
  {
    year: "Mar 2025",
    event: "Sarvam AI partners with UIDAI (Aadhaar authority) to deploy AI-driven voice-based interactions for Aadhaar users — a full-circle moment for co-founder Vivek Raghavan, who spent a decade building Aadhaar from the inside.",
  },
  {
    year: "Feb 2026",
    event: "Sarvam releases Sarvam-30B and Sarvam-105B foundational models. PM Modi wears Sarvam Kaze smart glasses at India AI Impact Summit 2026 at Bharat Mandapam, New Delhi — India's most-watched AI product moment.",
  },
  {
    year: "Apr 2026",
    event: "Sarvam AI reported closing a $300–350 million round led by Bessemer Venture Partners, with Nvidia, Amazon, and Prosperity7 Ventures participating — at a $1.5–1.55 billion valuation. India's largest AI startup funding round to date.",
  },
]

const COLS = [
  {
    h: "The Architects of Aadhaar Come for AI",
    b: `Vivek Raghavan's career had already produced one of the most consequential pieces of digital infrastructure in human history. As Chief Product Manager and Biometric Architect at UIDAI, he helped design and roll out Aadhaar — a unified biometric identity system that enrolled over a billion Indians at a speed and cost the rest of the world still studies and cannot replicate.\n\nPratyush Kumar's biography ran in a parallel channel. At IIT Madras, he co-founded AI4Bharat — the open-source research lab that produced IndicBERT, IndicNLP, and the datasets that would become the foundation of serious Indian-language NLP. He understood, better than almost anyone in India, why models trained on English internet data consistently failed Hindi, Tamil, Telugu, and the other major languages that nine hundred million Indians speak as their first.\n\nWhen they met and decided, in 2023, to found Sarvam AI, the thesis was not a hypothesis. It was an observation: that India, as a civilisational and economic force, was going to be profoundly shaped by AI — and that the models doing the shaping were built on data that had almost nothing to do with India. "Sarvam" means everything in Sanskrit. The name was a claim about scope.`,
  },
  {
    h: "Sovereign AI and the IndiaAI Mission",
    b: `The Indian government's IndiaAI Mission — run through MeitY — had a problem that looked familiar to Raghavan: how do you build something of national infrastructure importance without surrendering the architecture to foreign vendors?\n\nIn April 2025, the Ministry selected Sarvam AI as one of five companies chosen to build India's sovereign foundational model — alongside Gnani.ai, the IIT Bombay-led BharatGen consortium, Fractal, and Tech Mahindra. The selection came with something worth more than a grant: access to GPU compute at concessional rates, with an equity-based structure rather than upfront cash payments.\n\n"I don't think we would have been able to build this model without support from the India AI Mission," co-founder Pratyush Kumar told Business Today. The total compute cost for Sarvam-105B was in the range of $25–30 million — a fraction of what US frontier labs spend per quarter. That efficiency, achieved under genuine constraint, is the point. Jaspreet Bindra of AI & Beyond called it "a significant achievement" — precisely because the constraints were real and the result was not.\n\nSarvam-105B, released in February 2026, runs a 128,000-token context window and activates approximately 9 billion parameters per token using a mixture-of-experts architecture. On Indic OCR, document layout understanding, and Indic language processing benchmarks, it outperforms GPT-4 and Gemini.`,
  },
  {
    h: "Kaze, the Developers and What Comes Next",
    b: `The India AI Impact Summit 2026 produced the image that travelled. Prime Minister Narendra Modi, at Bharat Mandapam in New Delhi, was photographed wearing a pair of slim black AI glasses. The wearable was Sarvam Kaze — built by a three-year-old startup from Bengaluru.\n\nKaze supports 10+ Indian languages via voice, is designed for real-time translation, and its accessibility potential — for the visually impaired, for industrial workers, for farmers in fields with no keyboard — is the product of thinking about distribution that is native to India. Full commercial launch is planned for mid-2026.\n\nOn the developer side, Sarvam Cloud has attracted 25,000+ developers since launch. Indian language processing on Sarvam's APIs runs 2–4x cheaper than GPT-4 equivalents, which matters enormously in a market where per-token economics determine what gets built. In March 2025, a pilot of Sarvam's voice-AI technology reached 45 million people across 28 Indian states in ten days — primarily in Tier-2 and Tier-3 locations.\n\nThe $300–350 million round closing in April 2026 — led by Bessemer Venture Partners, with Nvidia and Amazon as strategic backers — funds the next phase: scaling Sarvam-105B, expanding the Kaze hardware programme, and deepening the government and enterprise integrations that make Sarvam not a product but infrastructure.`,
  },
]

const PULL_QUOTE = {
  text: "When we started Aadhaar, all the standards for identity were proprietary and foreign companies owned them. We built something indigenous, on open standards, and it led to the India Stack. We should not evaluate this by where a model stands today. That is a short-term perspective.",
  by: "Vivek Raghavan, Co-Founder & CEO, Sarvam AI",
}

const LESSON =
  "Sovereign infrastructure wins on constraints, not compute. Sarvam built India's most capable Indic AI under capital, hardware, and talent limits that would have stopped most teams — and produced something that global giants cannot easily replicate because they lack the data, the context, and the decade of government infrastructure experience the founders carry."

const INVESTORS = [
  "Lightspeed Venture Partners (Series A lead)",
  "Peak XV Partners (Sequoia India)",
  "Khosla Ventures",
  "Bessemer Venture Partners (2026 lead)",
  "Nvidia Corporation (strategic)",
  "Amazon (strategic)",
  "Prosperity7 Ventures (Aramco)",
  "IndiaAI Mission / MeitY (govt. compute support)",
]

const FAQS = [
  {
    q: "What makes Sarvam AI different from OpenAI or Anthropic?",
    a: "Sarvam AI is not attempting to build a general-purpose frontier model competing with GPT-5 or Claude. It is building India-specific foundational AI: models trained on Indian languages, culture, and real-world data (government documents, textbooks, Indic scripts, court judgments), optimised for India's infrastructure constraints (low bandwidth, voice-first, basic devices), and governed under Indian data sovereignty. Sarvam-105B beats GPT-4 and Gemini specifically on Indic OCR and multilingual benchmarks. The categories are different.",
  },
  {
    q: "What is Vivek Raghavan's background before Sarvam AI?",
    a: "Vivek Raghavan spent over a decade at UIDAI as Chief Product Manager and Biometric Architect for Aadhaar — enrolling over a billion Indians into a digital identity system. He also contributed to GSTN fraud detection AI, advised NPCI, contributed to the DEPA data framework, and was part of the Supreme Court's AI committee. He oversaw SUVAS, which translates Supreme Court judgments into Indian languages. He was also volunteer CTO for Team Indus, India's Google Lunar X Prize entry.",
  },
  {
    q: "What is Pratyush Kumar's background before Sarvam AI?",
    a: "Pratyush Kumar co-founded AI4Bharat at IIT Madras — India's leading open-source Indic NLP lab, which produced IndicBERT, IndicNLP suites, and the datasets underlying most serious Indian-language AI research. He was previously a researcher at Microsoft Research and has founded five companies including Padh.ai and OpenHathi. His work with AI4Bharat provided the data and research foundation that Sarvam's models are built on.",
  },
  {
    q: "How does Sarvam AI make money?",
    a: "Sarvam AI generated ₹29.1 crore ($3.45 million) in revenue in FY2025 through enterprise API integrations, government pilot projects (including the UIDAI partnership), and early Sarvam Cloud developer subscriptions. Revenue is growing as Sarvam Cloud's 25,000+ developer ecosystem matures, government contracts deepen, and Kaze hardware enters commercial production in mid-2026.",
  },
]

const RELATED = [
  { name: "Ather Energy", slug: "ather-energy-ev", cat: "Electric Vehicles", val: "$502M" },
  { name: "Zepto", slug: "zepto", cat: "Quick Commerce", val: "$1.36B" },
  { name: "Darwinbox", slug: "darwinbox-hr", cat: "HR SaaS", val: "$950M" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function SarvamAIPage() {
  const accent = "#0f4c81"
  const accentDark = "#0a3560"
  const accentMid = "#1a6cb5"
  const accentBg = "#f0f5fb"
  const accentBorder = "#c5d8ef"
  const accentOrange = "#e8640c"

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
        background: "#F2F0EC",
        fontFamily: "'Georgia','Times New Roman',serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        .pf { font-family: 'Playfair Display', Georgia, serif !important; }
        .dropcap::first-letter {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 4em; font-weight: 900; line-height: 0.82;
          float: left; margin-right: 0.09em; margin-top: 0.06em; color: #0f4c81;
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp .45s ease both; }
        @media (min-width:640px) {
          .ncols { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0; }
          .ncols > div { padding:0 1.5rem; border-right:1px solid #C6C0B5; }
          .ncols > div:first-child { padding-left:0; }
          .ncols > div:last-child { border-right:none; padding-right:0; }
        }
        a { text-decoration: none; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:#C6C0B5; }
        .stat-card:nth-child(odd) { border-right: 1px solid #D5D0C8; }
        .stat-card { border-bottom: 1px solid #D5D0C8; }
        .tag-ai {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 8px; letter-spacing: 0.26em; text-transform: uppercase;
          font-family: system-ui, sans-serif; font-weight: 800;
          padding: 5px 10px; color: white;
        }
        .ruling-line {
          display: flex; align-items: center; gap: 10px; margin: 28px 0 24px;
        }
        .ruling-line::before, .ruling-line::after {
          content: ''; flex: 1; height: 1px; background: #C6C0B5;
        }
        .ruling-line span { color: #C6C0B5; font-size: 11px; }
      `}</style>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        Sarvam AI Founder Story — Vivek Raghavan &amp; Pratyush Kumar | India's Sovereign AI | $400M Raised | $1.5B Valuation | UpForge
      </h1>

      {/* ── BREADCRUMB ── */}
      <nav
        aria-label="Breadcrumb"
        style={{
          background: "#E8E4DC",
          borderBottom: "1px solid #D0CAC0",
          fontFamily: "system-ui,sans-serif",
          padding: "8px 24px",
        }}
      >
        <ol style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px", listStyle: "none", margin: 0, padding: 0 }}>
          {[
            { n: "UpForge", h: "/" },
            { n: "Startup Registry", h: "/startup" },
            { n: "AI Startups India", h: "/ai-startups-india" },
            { n: "Sarvam AI", h: "/startup/sarvam-ai" },
          ].map((b, i, arr) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {i < arr.length - 1 ? (
                <Link href={b.h} style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: "#999", fontWeight: 600 }}>
                  {b.n}
                </Link>
              ) : (
                <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: "#1A1208", fontWeight: 700 }}>{b.n}</span>
              )}
              {i < arr.length - 1 && (
                <ChevronRight style={{ width: 10, height: 10, color: "#C6C0B5" }} />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* ── MASTHEAD ── */}
      <header style={{ background: "#F2F0EC", borderBottom: "3px solid #0f4c81" }}>
        {/* Top rule */}
        <div style={{ background: "#0f4c81", height: 4, width: "100%" }} />

        <div
          style={{
            textAlign: "center",
            padding: "20px 16px 24px",
            borderBottom: "1px solid #C6C0B5",
          }}
        >
          <p
            style={{
              fontSize: 8,
              letterSpacing: "0.46em",
              color: "#999",
              textTransform: "uppercase",
              fontFamily: "system-ui,sans-serif",
              marginBottom: 10,
            }}
          >
            UpForge · Startup Registry · Artificial Intelligence
          </p>
          <p
            className="pf"
            style={{
              fontWeight: 900,
              lineHeight: 1,
              color: "#12100E",
              fontSize: "clamp(2rem,5.5vw,4rem)",
              margin: 0,
            }}
          >
            The Founder Chronicle
          </p>
          <p
            style={{
              fontStyle: "italic",
              marginTop: 8,
              color: "#6B5C40",
              fontSize: "clamp(12px,1.7vw,14px)",
              fontFamily: "Georgia, serif",
            }}
          >
            India's independent startup registry — verified, editorial, April 2026
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 16 }}>
            <div style={{ height: 1, width: 80, background: "#C6C0B5" }} />
            <span style={{ color: "#0f4c81", fontSize: 13 }}>✦</span>
            <div style={{ height: 1, width: 80, background: "#C6C0B5" }} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 24px",
            gap: 16,
            fontFamily: "system-ui,sans-serif",
            borderBottom: "1px solid #C6C0B5",
          }}
        >
          <span style={{ fontSize: 8, color: "#999", textTransform: "uppercase", letterSpacing: "0.3em" }}>
            Edition · AI
          </span>
          <div style={{ height: 12, width: 1, background: "#C6C0B5" }} />
          <span style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em", color: accent }}>
            Artificial Intelligence · April 2026
          </span>
          <div style={{ height: 12, width: 1, background: "#C6C0B5" }} />
          <span style={{ fontSize: 9, color: "#999" }}>Bengaluru, Karnataka</span>
          <div style={{ marginLeft: "auto" }}>
            <span
              style={{
                background: accentOrange,
                color: "white",
                fontSize: 8,
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "4px 10px",
              }}
            >
              🇮🇳 Sovereign AI
            </span>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main
        className="fade-up"
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px 64px", boxSizing: "border-box" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            borderBottom: "2px solid #12100E",
          }}
          className="layout-grid"
        >
          <style>{`
            @media (min-width: 1024px) {
              .layout-grid {
                grid-template-columns: 1fr 400px !important;
              }
            }
            @media (min-width: 1280px) {
              .layout-grid {
                grid-template-columns: 1fr 440px !important;
              }
            }
          `}</style>

          {/* ────── LEFT: EDITORIAL ────── */}
          <article style={{ padding: "32px 0", borderRight: "1px solid #C6C0B5" }} className="article-pad">
            <style>{`.article-pad { padding-right: 0; } @media(min-width:1024px){.article-pad{padding-right:32px;}}`}</style>

            {/* Category tag */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, fontFamily: "system-ui,sans-serif" }}>
              <span className="tag-ai" style={{ background: accent }}>
                Artificial Intelligence
              </span>
              <span style={{ fontSize: 9, color: "#999", textTransform: "uppercase", letterSpacing: "0.2em" }}>April 2026</span>
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 800,
                  color: accentOrange,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  fontFamily: "system-ui,sans-serif",
                  border: `1px solid ${accentOrange}`,
                  padding: "3px 8px",
                }}
              >
                Unicorn
              </span>
            </div>

            {/* Headline */}
            <h2
              className="pf"
              style={{
                fontWeight: 900,
                lineHeight: 1.06,
                color: "#12100E",
                marginBottom: 20,
                fontSize: "clamp(1.8rem,3.8vw,3.1rem)",
              }}
            >
              The architects of Aadhaar came for AI.{" "}
              <em style={{ color: accentMid }}>
                Now they are building the mind of a billion-person nation.
              </em>
            </h2>

            {/* Deck */}
            <p
              style={{
                fontStyle: "italic",
                lineHeight: 1.78,
                marginBottom: 24,
                paddingBottom: 24,
                color: "#4A3C28",
                fontSize: "clamp(14px,1.85vw,16.5px)",
                borderBottom: "1px solid #C6C0B5",
              }}
            >
              Vivek Raghavan built the identity infrastructure for a billion Indians. Pratyush Kumar
              built the open-source NLP datasets that launched Indian-language AI. Together, they
              founded Sarvam AI in 2023 — not to compete with OpenAI, but to do something harder:
              build sovereign AI that works in Hindi, Tamil, Telugu, and the languages that most of
              India actually speaks.
            </p>

            {/* Byline */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "6px 10px",
                marginBottom: 32,
                fontFamily: "system-ui,sans-serif",
              }}
            >
              {[
                "By UpForge Editorial",
                "Bengaluru, Karnataka",
                "Est. 2023",
                "India's Sovereign AI Pioneer",
              ].map((t, i, a) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 9, color: "#999", textTransform: "uppercase", letterSpacing: "0.14em" }}>{t}</span>
                  {i < a.length - 1 && <span style={{ color: "#C6C0B5", fontSize: 10 }}>·</span>}
                </span>
              ))}
            </div>

            {/* Mobile hero image */}
            <div className="mobile-img" style={{ marginBottom: 32 }}>
              <style>{`.mobile-img { display: block; } @media(min-width:1024px){.mobile-img{display:none;}}`}</style>
              <img
                src="/sarvam-ai-founder-upforge.webp"
                alt="Vivek Raghavan and Pratyush Kumar, Co-Founders of Sarvam AI — UpForge Founder Chronicle"
                style={{ width: "100%", objectFit: "cover", objectPosition: "top", height: "min(300px, 60vw)", display: "block" }}
                loading="eager"
              />
              <div style={{ background: "#12100E", padding: "12px 16px" }}>
                <p className="pf" style={{ color: "white", fontWeight: 700, fontSize: 13, margin: 0 }}>
                  Vivek Raghavan & Pratyush Kumar
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    marginTop: 4,
                    fontFamily: "system-ui,sans-serif",
                    margin: "4px 0 0",
                  }}
                >
                  Co-Founders · Sarvam AI
                </p>
              </div>
            </div>

            {/* 3-col newspaper body */}
            <div className="ncols">
              {COLS.map((col, ci) => (
                <div key={ci} style={{ marginBottom: ci < 2 ? 24 : 0 }}>
                  <h3
                    style={{
                      fontSize: 10.5,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      marginBottom: 12,
                      paddingBottom: 8,
                      color: "#12100E",
                      borderBottom: `1.5px solid ${accent}`,
                      fontFamily: "system-ui,sans-serif",
                    }}
                  >
                    {col.h}
                  </h3>
                  {col.b.split("\n\n").map((p, pi) => (
                    <p
                      key={pi}
                      className={ci === 0 && pi === 0 ? "dropcap" : ""}
                      style={{
                        lineHeight: 1.9,
                        marginBottom: 12,
                        color: "#28200F",
                        fontSize: "clamp(12.5px,1.25vw,13.5px)",
                      }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Pull quote */}
            <div
              style={{
                marginTop: 40,
                paddingTop: 24,
                paddingBottom: 24,
                textAlign: "center",
                borderTop: `3px double ${accent}`,
                borderBottom: "1px solid #C6C0B5",
              }}
            >
              <span style={{ display: "block", color: accentDark, fontSize: 22, marginBottom: 10 }}>❝</span>
              <blockquote
                className="pf"
                style={{
                  fontStyle: "italic",
                  color: "#12100E",
                  lineHeight: 1.72,
                  maxWidth: 680,
                  margin: "0 auto",
                  padding: "0 16px",
                  fontSize: "clamp(15px,2.1vw,21px)",
                }}
              >
                "{PULL_QUOTE.text}"
              </blockquote>
              <p
                style={{
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: "0.24em",
                  color: "#999",
                  marginTop: 16,
                  fontFamily: "system-ui,sans-serif",
                }}
              >
                — {PULL_QUOTE.by}
              </p>
            </div>

            {/* Company Timeline */}
            <div style={{ marginTop: 36 }}>
              <p
                style={{
                  fontSize: 8.5,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  color: accent,
                  fontFamily: "system-ui,sans-serif",
                  borderBottom: `1px solid ${accentBorder}`,
                  paddingBottom: 8,
                  marginBottom: 20,
                }}
              >
                Company Timeline
              </p>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, fontFamily: "system-ui,sans-serif" }}>
                {TIMELINE.map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: 16, marginBottom: 18 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent, marginTop: 6, flexShrink: 0 }} />
                      {i < TIMELINE.length - 1 && (
                        <div style={{ width: 1, flex: 1, marginTop: 4, background: accentBorder, minHeight: 20 }} />
                      )}
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.2em",
                          color: accent,
                        }}
                      >
                        {t.year}
                      </span>
                      <p style={{ fontSize: 12, color: "#28200F", marginTop: 4, lineHeight: 1.7 }}>
                        {t.event}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* FAQ */}
            <section style={{ marginTop: 36 }}>
              <p
                style={{
                  fontSize: 8.5,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  color: accent,
                  fontFamily: "system-ui,sans-serif",
                  borderBottom: `1px solid ${accentBorder}`,
                  paddingBottom: 8,
                  marginBottom: 20,
                }}
              >
                Frequently Asked Questions
              </p>
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: 20,
                    paddingBottom: 20,
                    borderBottom: "1px solid #D5D0C8",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#12100E",
                      marginBottom: 8,
                      fontFamily: "system-ui,sans-serif",
                    }}
                  >
                    {faq.q}
                  </h3>
                  <p
                    style={{
                      fontSize: 12.5,
                      color: "#4A3C28",
                      lineHeight: 1.75,
                      fontFamily: "system-ui,sans-serif",
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </section>
          </article>

          {/* ────── RIGHT: SIDEBAR ────── */}
          <aside className="sidebar-hide" style={{ paddingLeft: 32, paddingTop: 32, paddingBottom: 32 }}>
            <style>{`.sidebar-hide { display: none; } @media(min-width:1024px){.sidebar-hide{display:block;}}`}</style>
            <div style={{ position: "sticky", top: 16, display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Founder image */}
              <div style={{ position: "relative", width: "100%", height: 360, overflow: "hidden" }}>
                <img
                  src="/sarvam-ai-founder-upforge.webp"
                  alt="Vivek Raghavan and Pratyush Kumar, Co-Founders of Sarvam AI — UpForge Founder Chronicle"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                  loading="eager"
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "14px 16px",
                    background: "linear-gradient(to top, rgba(10,5,2,0.97) 55%, transparent)",
                  }}
                >
                  <p className="pf" style={{ color: "white", fontWeight: 700, fontSize: 14, margin: 0 }}>
                    Vivek Raghavan & Pratyush Kumar
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.38)",
                      fontSize: 9,
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      marginTop: 4,
                      fontFamily: "system-ui,sans-serif",
                    }}
                  >
                    Co-Founders · Sarvam AI
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a
                  href="https://www.sarvam.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    border: `1.5px solid ${accent}`,
                  }}
                  aria-label="Visit Sarvam AI official website"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: accent,
                        fontFamily: "system-ui,sans-serif",
                      }}
                    >
                      sarvam.ai — Official Website
                    </span>
                  </div>
                  <ArrowUpRight style={{ width: 14, height: 14, color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/sarvam-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    border: "1.5px solid #0077b5",
                  }}
                  aria-label="View Sarvam AI on LinkedIn"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#0077b5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: "#0077b5",
                        fontFamily: "system-ui,sans-serif",
                      }}
                    >
                      LinkedIn — Sarvam AI
                    </span>
                  </div>
                  <ArrowUpRight style={{ width: 14, height: 14, color: "#0077b5" }} />
                </a>
              </div>

              {/* By the Numbers */}
              <div style={{ border: "2px solid #12100E" }}>
                <div style={{ background: "#12100E", padding: "10px 16px" }}>
                  <p
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.3em",
                      color: "white",
                      fontFamily: "system-ui,sans-serif",
                      margin: 0,
                    }}
                  >
                    By the Numbers
                  </p>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                  }}
                >
                  {STATS.map((s, i) => (
                    <div
                      key={i}
                      className="stat-card"
                      style={{ padding: "12px 16px" }}
                    >
                      <dt
                        style={{
                          fontSize: 7.5,
                          color: "#999",
                          textTransform: "uppercase",
                          letterSpacing: "0.18em",
                          marginBottom: 4,
                          fontFamily: "system-ui,sans-serif",
                          display: "block",
                        }}
                      >
                        {s.l}
                      </dt>
                      <dd
                        className="pf"
                        style={{
                          fontWeight: 900,
                          color: "#12100E",
                          lineHeight: 1,
                          fontSize: "1.2rem",
                          margin: 0,
                        }}
                      >
                        {s.v}
                      </dd>
                    </div>
                  ))}
                </div>
              </div>

              {/* The Lesson */}
              <div
                style={{
                  padding: "16px",
                  background: accentBg,
                  border: `1px solid ${accentBorder}`,
                }}
              >
                <p
                  style={{
                    fontSize: 8,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.28em",
                    color: accent,
                    fontFamily: "system-ui,sans-serif",
                    marginBottom: 8,
                  }}
                >
                  The Lesson
                </p>
                <p
                  style={{
                    fontStyle: "italic",
                    color: "#12100E",
                    lineHeight: 1.74,
                    fontSize: 13,
                  }}
                >
                  {LESSON}
                </p>
              </div>

              {/* Key Investors */}
              <div style={{ border: "1px solid #D5D0C8" }}>
                <div
                  style={{
                    background: "#F5F2EE",
                    borderBottom: "1px solid #D5D0C8",
                    padding: "8px 16px",
                  }}
                >
                  <p
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.26em",
                      color: "#12100E",
                      fontFamily: "system-ui,sans-serif",
                      margin: 0,
                    }}
                  >
                    Key Investors
                  </p>
                </div>
                <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {INVESTORS.map((inv, i) => (
                    <p
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 11,
                        color: "#28200F",
                        fontFamily: "system-ui,sans-serif",
                        margin: 0,
                      }}
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

              {/* IndiaAI Mission Badge */}
              <div
                style={{
                  background: "linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)",
                  padding: "2px",
                  borderRadius: 0,
                }}
              >
                <div
                  style={{
                    background: "#F2F0EC",
                    padding: "12px 16px",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.26em",
                      color: "#0f4c81",
                      fontFamily: "system-ui,sans-serif",
                      marginBottom: 6,
                    }}
                  >
                    🇮🇳 Selected Under
                  </p>
                  <p
                    className="pf"
                    style={{ fontWeight: 900, color: "#12100E", fontSize: 14, margin: 0 }}
                  >
                    IndiaAI Mission
                  </p>
                  <p
                    style={{
                      fontSize: 9,
                      color: "#666",
                      fontFamily: "system-ui,sans-serif",
                      marginTop: 4,
                    }}
                  >
                    MeitY · Sovereign Foundational Model
                  </p>
                </div>
              </div>

              {/* Also Read */}
              <div>
                <p
                  style={{
                    fontSize: 8,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.28em",
                    color: "#AAA",
                    fontFamily: "system-ui,sans-serif",
                    marginBottom: 12,
                  }}
                >
                  Also Read on UpForge
                </p>
                {RELATED.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/startup/${r.slug}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid #EDE9DF",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#12100E",
                          fontFamily: "system-ui,sans-serif",
                          margin: 0,
                        }}
                      >
                        {r.name}
                      </p>
                      <p
                        style={{
                          fontSize: 9,
                          color: "#999",
                          textTransform: "uppercase",
                          letterSpacing: "0.14em",
                          marginTop: 2,
                          fontFamily: "system-ui,sans-serif",
                        }}
                      >
                        {r.cat} · {r.val}
                      </p>
                    </div>
                    <ArrowUpRight style={{ width: 14, height: 14, color: "#AAA" }} />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* ── SEO INTERNAL LINKS ── */}
        <section style={{ padding: "32px 0", borderBottom: "1px solid #C6C0B5" }}>
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#999",
              fontFamily: "system-ui,sans-serif",
              marginBottom: 16,
            }}
          >
            Explore More Startups on UpForge
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 10,
            }}
          >
            {[
              { l: "AI Startups India 2026", h: "/ai-startups-india" },
              { l: "Indian Unicorns Full List", h: "/indian-unicorns" },
              { l: "Zepto Profile", h: "/startup/zepto" },
              { l: "Zerodha Profile", h: "/startup/zerodha" },
              { l: "Ola Electric Profile", h: "/startup/ola-electric-mobility" },
              { l: "Zomato Profile", h: "/startup/zomato" },
              { l: "CRED Profile", h: "/startup/cred" },
              { l: "Scale AI Profile", h: "/startup/Scale%20AI" },
              { l: "Perplexity AI Profile", h: "/startup/Perplexity%20AI" },
              { l: "Darwinbox Profile", h: "/startup/darwinbox-hr" },
              { l: "Startup Registry India", h: "/startup" },
              { l: "Submit Your Startup", h: "/submit" },
            ].map((lnk) => (
              <Link
                key={lnk.h}
                href={lnk.h}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 12px",
                  border: "1px solid #D5D0C8",
                  background: "white",
                }}
              >
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#12100E",
                    fontFamily: "system-ui,sans-serif",
                    flex: 1,
                  }}
                >
                  {lnk.l}
                </span>
                <ChevronRight style={{ width: 10, height: 10, color: "#AAA", flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ paddingTop: 32, paddingBottom: 8 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 24,
              alignItems: "center",
              paddingBottom: 32,
              borderBottom: "1px solid #D5D0C8",
            }}
            className="footer-grid"
          >
            <style>{`@media(min-width:640px){.footer-grid{grid-template-columns:1fr auto!important;}}`}</style>
            <div>
              <p className="pf" style={{ fontWeight: 700, color: "#12100E", marginBottom: 8, fontSize: "1.15rem" }}>
                Building India's next unicorn? Get verified on UpForge.
              </p>
              <p style={{ fontSize: 12, color: "#6B5C40", fontFamily: "system-ui,sans-serif" }}>
                Free startup profiles. Independent verification. Indexed by Google.
              </p>
            </div>
            <Link
              href="/submit"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                background: "#12100E",
                color: "white",
                fontSize: 10.5,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                fontFamily: "system-ui,sans-serif",
                whiteSpace: "nowrap",
              }}
              aria-label="List your Indian startup on UpForge for free"
            >
              List Your Startup — Free <ArrowRight style={{ width: 14, height: 14 }} />
            </Link>
          </div>

          <p
            style={{
              fontSize: 9,
              lineHeight: 1.8,
              marginTop: 16,
              color: "#BBB0A0",
              fontFamily: "system-ui,sans-serif",
            }}
          >
            * Data sourced from Wikipedia, Inc42, Tracxn, Business Standard, Business World, Bloomberg,
            BusinessToday, founderpin.com, and Sarvam AI press releases as of April 2026. UpForge is an
            independent registry — no paid placements, no sponsored rankings. Funding figures, valuations,
            and shareholding percentages reflect latest available public data. The $300–350M round is
            reported but not publicly confirmed as closed at time of publication.
          </p>

          <nav aria-label="Footer navigation" style={{ marginTop: 16 }}>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { l: "AI Startups India", h: "/ai-startups-india" },
                { l: "Startup Registry", h: "/startup" },
                { l: "Indian Unicorns", h: "/indian-unicorns" },
                { l: "Ather Energy Profile", h: "/startup/ather-energy-ev" },
                { l: "Zepto Profile", h: "/startup/zepto" },
                { l: "Agnikul Cosmos Profile", h: "/startup/agnikul-cosmos" },
                { l: "Nykaa Profile", h: "/startup/nykaa" },
                { l: "Submit Startup", h: "/submit" },
              ].map((lnk) => (
                <li key={lnk.h}>
                  <Link
                    href={lnk.h}
                    style={{
                      fontSize: 9,
                      color: "#AAA",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      fontFamily: "system-ui,sans-serif",
                    }}
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
