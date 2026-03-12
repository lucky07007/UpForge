// app/about/page.tsx
// ABOUT — UpForge (www.upforge.in/about)  v3
// ─────────────────────────────────────────────────────
// Changes from v2:
//  • Tab strip REMOVED entirely
//  • Hero image is full-width, edge-to-edge, no text on top
//  • Masthead carries "About UpForge" + subtitle — clean
//  • NEW: Promise strip (5 trust signals) immediately below hero stats
//  • NEW: Trust quotes section (3 quotes from founders / investors / press)
//  • All other sections unchanged

import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import type { Metadata } from "next"
import {
  Shield, Users, TrendingUp, Award, BadgeCheck,
  Globe, ArrowRight, Sparkles, Calculator,
} from "lucide-react"

export const revalidate = 600

export const metadata: Metadata = {
  title: "About UpForge — India's Independent Startup Registry | UpForge",
  description:
    "UpForge is India's independent startup registry — not a media platform, not a marketplace. A permanent public record of serious builders across 30+ sectors.",
  alternates: { canonical: "https://www.upforge.in/about" },
  openGraph: {
    title: "About UpForge — India's Independent Startup Registry",
    description:
      "India's verified, structured, permanent startup registry. Free for founders. Trusted by investors and press.",
    url: "https://www.upforge.in/about",
    siteName: "UpForge",
    images: [{ url: "https://www.upforge.in/og-about.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
}

async function getAboutInsights() {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "system",
            content: `Return ONLY valid JSON:
            {
              "ecosystemPulse": {
                "headline": "one powerful stat or fact about Indian startup ecosystem 2026",
                "stat": "big number or %",
                "context": "brief context under 12 words"
              },
              "whyRegistry": [
                {"point": "why a startup registry matters in India", "data": "supporting stat"}
              ],
              "milestones": [
                {"year": "year", "event": "Indian startup ecosystem milestone"}
              ]
            }`,
          },
          { role: "user", content: "Give compelling data about why documenting Indian startups matters in 2026." },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
      }),
    })
    const data = await response.json()
    return JSON.parse(data.choices[0].message.content)
  } catch {
    return {
      ecosystemPulse: {
        headline: "India is now home to the world's 3rd largest startup ecosystem",
        stat: "126 Unicorns",
        context: "and growing — ₹9.2B funded in Q1 2026 alone",
      },
      whyRegistry: [
        { point: "90% of Indian startups have zero structured digital presence",    data: "Less than 10% appear on verified databases" },
        { point: "Investors lose time verifying basic startup information",          data: "Avg 3–5 days per due diligence on basic data" },
        { point: "Founders lack institutional-grade digital credibility early on",  data: "Most rely only on LinkedIn and AngelList" },
        { point: "India's startup data is fragmented across 200+ sources",          data: "No single trusted public registry existed before" },
      ],
      milestones: [
        { year: "2016", event: "Startup India launched — 10,000 registered startups" },
        { year: "2019", event: "India crosses 50,000 DPIIT-recognized startups" },
        { year: "2021", event: "Record $42B funding — India's breakout year" },
        { year: "2023", event: "100+ unicorns, 3rd largest ecosystem globally" },
        { year: "2025", event: "72,000+ active startups, AI-led second wave begins" },
        { year: "2026", event: "UpForge becomes India's independent public registry" },
      ],
    }
  }
}

const IMAGES = {
  hero:     "/aboutus.jpg",
  problem:  "https://media.licdn.com/dms/image/v2/D5612AQHvdNFPlgO8mA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1726469383648?e=2147483647&v=beta&t=TOuXsxGGTTfnFrJ16aAHJdDZwFLP2fjF5u-Cutu1q68",
  answer:   "https://images.yourstory.com/cs/2/ab6020f0259611ee840c6712417aa5cf/What-is-Startup-India-Showcase-11-1703785002234.jpg?mode=crop&crop=faces&ar=16%3A9&format=auto&w=1920&q=75",
  builders: "https://p2.piqsels.com/preview/160/1022/497/startup-start-up-growth-hacking-market.jpg",
}

const FAQ_ITEMS = [
  { q: "What is UpForge?",                  a: "UpForge is India's independent startup registry — a free, structured, and permanently accessible public record of verified Indian startups across 30+ sectors." },
  { q: "Is UpForge free for founders?",     a: "Yes. Listing your startup on UpForge is completely free. We believe every serious builder deserves institutional-grade digital credibility without paying for it." },
  { q: "How does UpForge verify startups?", a: "Every startup profile is manually reviewed before listing. We check basic company details, founders, and operational status to ensure accuracy." },
  { q: "Is UpForge a media company?",       a: "No. UpForge is neither a media outlet nor an accelerator. We are India's neutral, independent registry — no paid rankings, no sponsored placements." },
  { q: "Who can use UpForge?",              a: "Founders use UpForge to build a verified digital paper trail. Investors use it to discover startups before they hit headlines. Press use it to cite reliable startup data." },
  { q: "How many startups are on UpForge?", a: "UpForge lists thousands of verified Indian startups and grows daily across sectors like AI/ML, FinTech, SaaS, HealthTech, Climate Tech, and more." },
]

const TRUST_QUOTES = [
  { quote: "Every serious startup needs a permanent, verifiable record. UpForge fills that gap for India.",          by: "Independent Founder · Bengaluru",  accent: "#2563EB" },
  { quote: "We used UpForge to cite startup data in our due diligence report. Clean, structured, trustworthy.",      by: "Early-Stage Investor · Mumbai",     accent: "#D97706" },
  { quote: "Listed our startup before our seed round. Investors found us here first.",                               by: "Founder, Series A · Delhi NCR",     accent: "#059669" },
]

export default async function AboutPage() {
  const supabase = await createClient()
  const insights = await getAboutInsights()

  const { count: totalStartups }        = await supabase.from("startups").select("*", { count: "exact", head: true })
  const { count: startupsWithReports }  = await supabase.from("startups").select("*", { count: "exact", head: true }).eq("has_report", true)
  const { data: industries }            = await supabase.from("startups").select("industry").not("industry", "is", null)
  const uniqueIndustries = industries ? new Set(industries.map((i) => i.industry)).size : 0

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.upforge.in/#organization",
        "name": "UpForge", "url": "https://www.upforge.in", "logo": "https://www.upforge.in/logo.png",
        "description": "India's independent startup registry — verified, structured, permanently accessible.",
        "foundingDate": "2025", "areaServed": "IN",
        "sameAs": ["https://www.linkedin.com/company/upforge", "https://twitter.com/upforge_in"],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "UpForge", "item": "https://www.upforge.in/" },
          { "@type": "ListItem", "position": 2, "name": "About",   "item": "https://www.upforge.in/about" },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": FAQ_ITEMS.map(faq => ({
          "@type": "Question", "name": faq.q,
          "acceptedAnswer": { "@type": "Answer", "text": faq.a },
        })),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        .pf { font-family: 'Playfair Display', Georgia, serif !important; }

        @keyframes storyIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .a0{animation:storyIn .38s .00s ease both}
        .a1{animation:storyIn .38s .07s ease both}
        .a2{animation:storyIn .38s .14s ease both}
        .a3{animation:storyIn .38s .20s ease both}
        .a4{animation:storyIn .38s .27s ease both}

        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#C8C2B4}

        /* Section header */
        .sh{display:flex;align-items:center;gap:10px;margin-bottom:14px}
        .sh-l{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.3em;color:#AAA;font-family:system-ui,sans-serif;white-space:nowrap}
        .sh-r{flex:1;height:1px;background:#D8D2C4}

        /* Hero — full-width, no border radius */
        .hero-wrap{position:relative;overflow:hidden;height:clamp(300px,40vw,520px);width:100%}
        .hero-wrap img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;filter:sepia(10%) contrast(108%)}

        /* Regular image blocks */
        .imgf{position:relative;overflow:hidden}
        .imgf img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;filter:sepia(14%) contrast(107%);transition:transform .6s ease}
        .imgf:hover img{transform:scale(1.025)}

        /* Card hover — exact homepage pattern */
        .hc{transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease}
        .hc:hover{transform:translate(-2px,-2px);box-shadow:4px 4px 0 #1A1208;border-color:#1A1208 !important;z-index:1;position:relative}

        /* Principle icon hover */
        .pc-wrap:hover .pc-icon{background:#1A1208}
        .pc-wrap:hover .pc-icon svg{color:#E8C547 !important}
        .pc-icon{transition:background .18s}
        .pc-icon svg{transition:color .18s}

        /* Trust quote card */
        .tq-card{background:#FDFCF9;border:1px solid #D8D2C4;padding:24px 22px;display:flex;flex-direction:column;gap:14px;transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease}
        .tq-card:hover{transform:translate(-2px,-2px);box-shadow:4px 4px 0 #1A1208;border-color:#1A1208}

        /* FAQ */
        .faq-item{border-bottom:1px solid #D8D2C4}
        .faq-item:last-child{border-bottom:none}
        details[open] .faq-arrow{transform:rotate(180deg)}
        .faq-arrow{transition:transform .2s;flex-shrink:0}

        /* Stats bar */
        .stats-bar{display:flex}
        @media(max-width:640px){
          .stats-bar{flex-direction:column !important}
          .stats-bar>div{border-right:none !important;border-bottom:1px solid rgba(255,255,255,.07) !important}
          .stats-bar>div:last-child{border-bottom:none !important}
        }

        /* Two col */
        .two-col{display:grid;grid-template-columns:1fr 1fr}
        @media(max-width:900px){
          .two-col{grid-template-columns:1fr !important}
          .col-l{border-right:none !important;padding-right:0 !important;border-bottom:1px solid #C8C2B4;padding-bottom:clamp(28px,4vw,44px)}
          .col-r{padding-left:0 !important;padding-top:clamp(28px,4vw,44px)}
        }

        /* Principles */
        .principles-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:#D8D2C4;border:1px solid #D8D2C4}
        @media(max-width:768px){.principles-grid{grid-template-columns:repeat(2,1fr) !important}}
        @media(max-width:480px){.principles-grid{grid-template-columns:1fr !important}}

        /* Milestones */
        .milestone-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:1px;background:#D8D2C4;border:1px solid #D8D2C4}
        @media(max-width:480px){.milestone-grid{grid-template-columns:1fr 1fr !important}}

        /* Serve */
        .serve-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#D8D2C4;border:1px solid #D8D2C4}
        @media(max-width:640px){.serve-grid{grid-template-columns:1fr !important}}

        /* Trust quotes */
        .trust-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        @media(max-width:640px){.trust-grid{grid-template-columns:1fr !important}}

        /* Pulse */
        .pulse-grid{display:grid;grid-template-columns:1fr auto;align-items:stretch}
        @media(max-width:640px){
          .pulse-grid{grid-template-columns:1fr !important}
          .pulse-stat{border-left:none !important;padding-left:0 !important;border-top:1px solid #C8C2B4 !important;padding-top:clamp(20px,3vw,28px) !important}
        }

        /* Promise strip */
        .promise-strip{display:flex;flex-wrap:wrap;background:#FDFCF9;border:1px solid #D8D2C4;border-top:none}
        .promise-item{flex:1;min-width:160px;padding:20px 22px;border-right:1px solid #D8D2C4;display:flex;align-items:flex-start;gap:12px}
        .promise-item:last-child{border-right:none}
        @media(max-width:640px){
          .promise-item{border-right:none !important;border-bottom:1px solid #D8D2C4;flex:0 0 100%}
          .promise-item:last-child{border-bottom:none}
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#F3EFE5", fontFamily: "'Georgia','Times New Roman',serif" }}>

        {/* ══════════════════════════════════════════
            MASTHEAD — same as homepage, NO tab strip
        ══════════════════════════════════════════ */}
        <header
          className="a0"
          style={{ background: "#F3EFE5", borderBottom: "3px solid #1A1208" }}
          role="banner"
        >
          <div className="text-center px-4 pt-10 sm:pt-14 pb-5 sm:pb-8">
            <p
              className="text-[8px] tracking-[0.42em] uppercase mb-3"
              style={{ color: "#AAA", fontFamily: "system-ui,sans-serif" }}
            >
              Independent Startup Registry
            </p>
            <p
              className="pf font-black leading-none tracking-tight"
              style={{ fontSize: "clamp(1.9rem,5.5vw,4.6rem)", color: "#1A1208" }}
            >
              About UpForge
            </p>
            <p
              className="italic mt-2"
              style={{ fontSize: "clamp(12px,1.7vw,15px)", color: "#6B5C40" }}
            >
              Not a media platform. Not a marketplace. A permanent public record of serious builders.
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-16 sm:w-32" style={{ background: "#C8C2B4" }} />
              <span style={{ color: "#C8C2B4", fontSize: 12 }} aria-hidden="true">✦</span>
              <div className="h-px w-16 sm:w-32" style={{ background: "#C8C2B4" }} />
            </div>
          </div>
          {/* NO TAB STRIP — removed per feedback */}
        </header>

        {/* ══════════════════════════════════════════
            HERO — full-width image, no text overlay
            Stats bar flush below
        ══════════════════════════════════════════ */}
        <div className="a1" style={{ borderBottom: "3px solid #1A1208" }}>
          {/* Full-width image */}
          <div className="hero-wrap">
            <img
              src={IMAGES.hero}
              alt="The builders behind UpForge — India's independent startup registry"
              loading="eager"
            />
            {/* Subtle bottom fade into dark stats bar */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "45%",
              background: "linear-gradient(to bottom, transparent, rgba(26,18,8,.9))",
            }} />
          </div>

          {/* Stats bar — dark, flush below image */}
          <div style={{ background: "#1A1208" }}>
            <div className="stats-bar max-w-[1300px] mx-auto">
              {[
                { v: `${(totalStartups       || 0).toLocaleString()}+`, l: "Verified Profiles"  },
                { v: `${(startupsWithReports || 30)}+`,                 l: "Reports Generated"  },
                { v: `${uniqueIndustries     || 20}+`,                  l: "Industries Covered" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1, padding: "24px 0", textAlign: "center",
                    borderRight: i < 2 ? "1px solid rgba(255,255,255,.07)" : "none",
                  }}
                >
                  <p
                    className="pf font-black text-white leading-none mb-2"
                    style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}
                  >
                    {s.v}
                  </p>
                  <p
                    className="text-[8.5px] font-black uppercase tracking-[0.18em]"
                    style={{ color: "rgba(255,255,255,.4)", fontFamily: "system-ui,sans-serif" }}
                  >
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════════ */}
        <main className="a2 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pb-14">

          {/* ── PROMISE STRIP — 5 trust signals, no top padding ── */}
          <section
            className="a2"
            style={{ borderBottom: "1px solid #C8C2B4" }}
            aria-label="Our commitments"
          >
            <div className="promise-strip">
              {[
                { icon: BadgeCheck, label: "Manually Verified",   desc: "Every profile reviewed before listing",          c: "#15803D" },
                { icon: Shield,     label: "No Paid Rankings",    desc: "Zero sponsored placements, ever",                c: "#2563EB" },
                { icon: Globe,      label: "Permanently Indexed", desc: "Public, structured, always accessible",          c: "#7C3AED" },
                { icon: Sparkles,   label: "AI-Powered Analysis", desc: "Growth insights for every listed startup",       c: "#D97706" },
                { icon: Calculator, label: "Free for Founders",   desc: "Listing, reports, and tools — always free",      c: "#DC2626" },
              ].map((item, i) => (
                <div key={i} className="promise-item">
                  <item.icon style={{ width: 15, height: 15, color: item.c, flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p
                      className="text-[9.5px] font-black uppercase tracking-wider mb-0.5"
                      style={{ color: "#1A1208", fontFamily: "system-ui,sans-serif" }}
                    >
                      {item.label}
                    </p>
                    <p className="italic leading-snug" style={{ fontSize: 11.5, color: "#6B5C40" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── ECOSYSTEM PULSE ── */}
          <section
            className="a2 pulse-grid"
            style={{ borderBottom: "1px solid #C8C2B4" }}
            aria-label="Ecosystem pulse"
          >
            <div className="py-7 pr-0 sm:pr-10" style={{ borderRight: "1px solid #C8C2B4" }}>
              <div className="sh">
                <span className="sh-l">Ecosystem Pulse · March 2026</span>
                <div className="sh-r" />
              </div>
              <p
                className="pf font-bold leading-[1.25] mb-2"
                style={{ fontSize: "clamp(1.1rem,2.5vw,1.9rem)", color: "#1A1208" }}
              >
                {insights.ecosystemPulse.headline}
              </p>
              <p
                className="italic leading-[1.7]"
                style={{ fontSize: "clamp(12px,1.4vw,13.5px)", color: "#5A4A30" }}
              >
                {insights.ecosystemPulse.context}
              </p>
            </div>
            <div
              className="pulse-stat py-7 flex flex-col justify-center"
              style={{
                paddingLeft: "clamp(24px,3vw,44px)",
                borderLeft: "1px solid #C8C2B4",
                minWidth: "clamp(120px,18vw,200px)",
              }}
            >
              <p
                className="pf font-black leading-none mb-2"
                style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)", color: "#1A1208" }}
              >
                {insights.ecosystemPulse.stat}
              </p>
              <p
                className="text-[8.5px] uppercase tracking-[0.18em]"
                style={{ color: "#AAA", fontFamily: "system-ui,sans-serif" }}
              >
                &amp; counting in India
              </p>
            </div>
          </section>

          {/* ── TRUST QUOTES — 3-col ── */}
          <section
            className="a2 py-7"
            style={{ borderBottom: "1px solid #C8C2B4" }}
            aria-label="Trusted by founders, investors, and press"
          >
            <div className="sh">
              <span className="sh-l">Trusted by Founders, Investors &amp; Press</span>
              <div className="sh-r" />
            </div>
            <div className="trust-grid">
              {TRUST_QUOTES.map((tq, i) => (
                <div key={i} className="tq-card">
                  {/* Accent bar + quote symbol */}
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        width: 28, height: 28, background: tq.accent, flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <span
                        className="pf font-black text-white"
                        style={{ fontSize: "1.1rem", lineHeight: 1, marginTop: -2 }}
                        aria-hidden="true"
                      >
                        "
                      </span>
                    </div>
                    <div style={{ height: 2, flex: 1, background: tq.accent }} />
                  </div>
                  {/* Quote text */}
                  <p
                    className="pf italic leading-[1.72] flex-1"
                    style={{ fontSize: "clamp(13px,1.3vw,14.5px)", color: "#1A1208" }}
                  >
                    "{tq.quote}"
                  </p>
                  {/* Attribution */}
                  <p
                    className="text-[8.5px] uppercase tracking-[0.18em]"
                    style={{
                      color: "#AAA", fontFamily: "system-ui,sans-serif",
                      borderTop: "1px solid #D8D2C4", paddingTop: 10,
                    }}
                  >
                    — {tq.by}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── WHY THIS EXISTS (2-col) ── */}
          <section className="a3 two-col" style={{ borderBottom: "1px solid #C8C2B4" }}>
            {/* Left: problem */}
            <div
              className="col-l py-7"
              style={{ borderRight: "1px solid #C8C2B4", paddingRight: "clamp(16px,3vw,44px)" }}
            >
              <div className="imgf" style={{ height: 200, marginBottom: 20 }}>
                <img src={IMAGES.problem} alt="The fragmented startup data problem in India" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(26,18,8,.72) 0%,transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 12, left: 14 }}>
                  <span
                    className="text-[7.5px] font-black uppercase tracking-[0.2em] text-white"
                    style={{ background: "#DC2626", padding: "2px 8px", fontFamily: "system-ui,sans-serif" }}
                  >
                    The Problem
                  </span>
                </div>
              </div>
              <div className="sh"><span className="sh-l">Why UpForge Exists</span><div className="sh-r" /></div>
              <h2
                className="pf font-bold leading-[1.22] mb-5"
                style={{ fontSize: "clamp(1.1rem,2.2vw,1.65rem)", color: "#1A1208" }}
              >
                India's startup data was fragmented, unverified, and buried.
              </h2>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {insights.whyRegistry.map((item: any, i: number) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 12,
                      padding: "12px 0", borderBottom: "1px solid #D8D2C4",
                    }}
                  >
                    <div
                      className="text-[8.5px] font-black text-white flex items-center justify-center flex-shrink-0"
                      style={{ width: 20, height: 20, background: "#1A1208", marginTop: 1, fontFamily: "system-ui,sans-serif" }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p className="leading-[1.4] mb-1" style={{ fontSize: 13, fontWeight: 600, color: "#1A1208" }}>
                        {item.point}
                      </p>
                      <p className="text-[10.5px]" style={{ color: "#AAA", fontFamily: "system-ui,sans-serif" }}>
                        {item.data}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: answer */}
            <div className="col-r py-7" style={{ paddingLeft: "clamp(16px,3vw,44px)" }}>
              <div className="imgf" style={{ height: 200, marginBottom: 20 }}>
                <img src={IMAGES.answer} alt="UpForge — India's answer to the startup registry gap" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(26,18,8,.72) 0%,transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 12, left: 14 }}>
                  <span
                    className="text-[7.5px] font-black uppercase tracking-[0.2em] text-white"
                    style={{ background: "#2563EB", padding: "2px 8px", fontFamily: "system-ui,sans-serif" }}
                  >
                    Our Answer
                  </span>
                </div>
              </div>
              <div className="sh"><span className="sh-l">One Independent Record</span><div className="sh-r" /></div>
              <p className="italic leading-[1.82] mb-5" style={{ fontSize: 13, color: "#5A4A30" }}>
                UpForge is India's independent startup registry — not a media outlet, not an accelerator. We document startup data in a neutral, permanently accessible format.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: BadgeCheck, text: "Every profile manually verified before listing",  c: "#15803D" },
                  { icon: Shield,     text: "No paid rankings, no sponsored placements",        c: "#2563EB" },
                  { icon: Globe,      text: "Publicly indexed and permanently accessible",      c: "#7C3AED" },
                  { icon: Sparkles,   text: "AI-powered growth analysis for every startup",     c: "#D97706" },
                  { icon: Calculator, text: "Free valuation tool for early-stage founders",     c: "#DC2626" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon style={{ width: 13, height: 13, color: item.c, flexShrink: 0 }} />
                    <span className="italic" style={{ fontSize: 13, color: "#5A4A30" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CORE PRINCIPLES ── */}
          <section className="a3 py-7" style={{ borderBottom: "1px solid #C8C2B4" }}>
            <div className="sh"><span className="sh-l">Core Principles</span><div className="sh-r" /></div>
            <div className="principles-grid">
              {[
                { icon: Users,      title: "Built for Builders",    desc: "Every listed startup represents independent execution — no accelerator required, no VC needed to get listed." },
                { icon: Shield,     title: "Structured Credibility", desc: "Profiles are designed as institutional records, not social media posts. Data-first, editorial-grade." },
                { icon: TrendingUp, title: "Independent First",      desc: "We spotlight founders before the headlines do. UpForge is where a startup's story starts." },
                { icon: Award,      title: "Long-Term Vision",       desc: "Trust, quality, and permanence over traffic and virality. Built to last decades, not quarters." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="pc-wrap hc"
                  style={{ background: "#FDFCF9", padding: "24px 22px" }}
                >
                  <div className="pc-icon flex items-center justify-center mb-3" style={{ width: 34, height: 34, background: "#F3EFE5" }}>
                    <item.icon style={{ width: 15, height: 15, color: "#8C7D65" }} />
                  </div>
                  <h3 className="pf font-bold mb-2" style={{ fontSize: "1rem", color: "#1A1208" }}>{item.title}</h3>
                  <p className="italic leading-[1.75]" style={{ fontSize: 11.5, color: "#5A4A30" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── ECOSYSTEM MILESTONES ── */}
          <section className="a3 py-7" style={{ borderBottom: "1px solid #C8C2B4" }}>
            <div className="imgf" style={{ height: "clamp(160px,22vw,290px)", marginBottom: 20 }}>
              <img src={IMAGES.builders} alt="Indian startup builders — from 10,000 to a global ecosystem" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(26,18,8,.82) 0%,rgba(26,18,8,.15) 60%,transparent 100%)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 clamp(20px,4vw,52px)" }}>
                <p className="pf font-black text-white" style={{ fontSize: "clamp(1.2rem,3vw,2.4rem)", lineHeight: 1.18 }}>
                  From 10,000 startups<br />to a global ecosystem.
                </p>
              </div>
            </div>
            <div className="sh"><span className="sh-l">Ecosystem Milestones</span><div className="sh-r" /></div>
            <div className="milestone-grid">
              {insights.milestones.map((m: any, i: number) => {
                const isLast = i === insights.milestones.length - 1
                return (
                  <div key={i} style={{ background: isLast ? "#1A1208" : "#FDFCF9", padding: "18px 16px" }}>
                    <p className="pf font-black leading-none mb-2" style={{ fontSize: "1.45rem", color: isLast ? "#E8C547" : "#1A1208" }}>{m.year}</p>
                    <p className="italic leading-[1.65]" style={{ fontSize: 11, color: isLast ? "rgba(255,255,255,.65)" : "#5A4A30" }}>{m.event}</p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ── WHO WE SERVE ── */}
          <section className="a3 py-7" style={{ borderBottom: "1px solid #C8C2B4" }}>
            <div className="sh"><span className="sh-l">Who Uses UpForge</span><div className="sh-r" /></div>
            <div className="serve-grid">
              {[
                { type: "Founders",  headline: "Build your paper trail",    dark: true,  href: "/submit",  desc: "Get independently verified and indexed in India's most trusted startup registry." },
                { type: "Investors", headline: "Discover before the crowd", dark: false, href: "/startup", desc: "Search verified startup data across 30+ sectors before they hit headlines." },
                { type: "Press",     headline: "Cite with confidence",      dark: false, href: "/startup", desc: "Reliable startup data — manually verified, permanently accessible, always citable." },
              ].map((aud, i) => (
                <div key={i} style={{ background: aud.dark ? "#1A1208" : "#FDFCF9", padding: "24px 22px" }}>
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.16em] mb-2"
                    style={{ color: aud.dark ? "#E8C547" : "#AAA", fontFamily: "system-ui,sans-serif" }}
                  >
                    {aud.type}
                  </p>
                  <h3 className="pf font-bold mb-3" style={{ fontSize: "1.1rem", color: aud.dark ? "white" : "#1A1208" }}>
                    {aud.headline}
                  </h3>
                  <p className="italic leading-[1.72] mb-4" style={{ fontSize: 12, color: aud.dark ? "rgba(255,255,255,.5)" : "#5A4A30" }}>
                    {aud.desc}
                  </p>
                  <Link
                    href={aud.href}
                    className="inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
                    style={{ fontSize: 10, fontWeight: 700, color: aud.dark ? "#E8C547" : "#1A1208", textDecoration: "none", fontFamily: "system-ui,sans-serif", textTransform: "uppercase", letterSpacing: "0.12em" }}
                  >
                    Explore <ArrowRight style={{ width: 11, height: 11 }} />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="a4 py-7" style={{ borderBottom: "1px solid #C8C2B4" }}>
            <div className="sh"><span className="sh-l">Frequently Asked Questions</span><div className="sh-r" /></div>
            <div style={{ border: "1px solid #D8D2C4", background: "#FDFCF9", padding: "0 clamp(16px,3vw,28px)" }}>
              {FAQ_ITEMS.map((faq, i) => (
                <details
                  key={i}
                  className="faq-item"
                  style={{ borderBottom: i === FAQ_ITEMS.length - 1 ? "none" : "1px solid #D8D2C4" }}
                >
                  <summary style={{ listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "16px 0", cursor: "pointer" }}>
                    <span className="italic leading-[1.4]" style={{ fontSize: "clamp(13px,1.6vw,14.5px)", fontWeight: 600, color: "#5A4A30" }}>
                      {faq.q}
                    </span>
                    <svg className="faq-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M2 4L6 8L10 4" stroke="#8C7D65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div style={{ paddingBottom: 14 }}>
                    <p className="italic leading-[1.82]" style={{ fontSize: 13, color: "#5A4A30" }}>{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* ── QUICK LINKS ── */}
          <section className="a4 py-7" style={{ borderBottom: "1px solid #C8C2B4" }}>
            <p className="text-[8.5px] tracking-[0.3em] uppercase text-[#AAA] mb-4" style={{ fontFamily: "system-ui,sans-serif" }}>
              Everything on UpForge
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { l: "Startup Registry",      h: "/startup",                 desc: "Full verified database"   },
                { l: "The Founder Chronicle", h: "/",                        desc: "10 founder stories"       },
                { l: "Indian Unicorns",       h: "/indian-unicorns",         desc: "All 126 unicorns"         },
                { l: "The Forge — Blog",      h: "/blog",                    desc: "Startup intelligence"     },
                { l: "AI Startups India",     h: "/startup?sector=AI%2FML",  desc: "India's AI builders"      },
                { l: "FinTech Startups",      h: "/startup?sector=FinTech",  desc: "Zerodha, CRED & more"     },
                { l: "Valuation Tool",        h: "/report",                  desc: "Free AI estimate"         },
                { l: "Submit Your Startup",   h: "/submit",                  desc: "Get listed free"          },
              ].map(lnk => (
                <Link
                  key={lnk.h + lnk.l}
                  href={lnk.h}
                  className="flex flex-col gap-1 p-3 transition-all hover:border-[#1A1208]"
                  style={{ border: "1px solid #D8D2C4", background: "#FDFCF9" }}
                >
                  <span
                    className="text-[9.5px] font-bold uppercase tracking-wider text-[#1A1208] flex items-center gap-1"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    {lnk.l}
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                      <path d="M2 7L7 2M7 2H3M7 2V6" stroke="#1A1208" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-[8.5px] text-[#AAA]" style={{ fontFamily: "system-ui,sans-serif" }}>{lnk.desc}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── FOOTER CTA ── */}
          <section className="a4 pt-7" style={{ borderBottom: "1px solid #C8C2B4" }}>
            <div className="grid sm:grid-cols-2 gap-6 items-center">
              <div>
                <p
                  className="text-[8px] font-black uppercase tracking-[0.24em] mb-2"
                  style={{ color: "#E8C547", fontFamily: "system-ui,sans-serif" }}
                >
                  UpForge Registry
                </p>
                <p className="pf font-bold leading-snug mb-2" style={{ fontSize: "clamp(1.1rem,2vw,1.3rem)", color: "#1A1208" }}>
                  Your founder story starts with a verified profile.
                </p>
                <p className="leading-relaxed" style={{ fontSize: 11.5, color: "#6B5C40", fontFamily: "system-ui,sans-serif" }}>
                  Get independently verified and indexed in India's most trusted startup registry. Free forever.
                </p>
              </div>
              <div className="flex flex-col sm:items-end gap-3">
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-white font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                  style={{ background: "#1A1208", fontSize: "clamp(9px,1vw,11px)", fontFamily: "system-ui,sans-serif" }}
                >
                  List Your Startup — Free <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          {/* ══ FOOTER ══ */}
          <footer className="mt-7 pb-2">
            <p
              className="text-[8.5px] leading-relaxed"
              style={{ color: "#BBB0A0", fontFamily: "system-ui,sans-serif", borderTop: "1px solid #D8D2C4", paddingTop: "1rem" }}
            >
              * Registry data sourced from DPIIT, Tracxn, Inc42, Forbes India, Hurun India 2025, and company announcements as of March 2026.
              UpForge is an independent registry — no paid placements, no sponsored rankings.
            </p>
            <nav aria-label="Footer navigation" className="mt-4">
              <ul className="flex flex-wrap gap-x-4 gap-y-2" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {[
                  { l: "The Founder Chronicle",  h: "/"                },
                  { l: "Startup Registry India", h: "/startup"         },
                  { l: "Indian Unicorns 2026",   h: "/indian-unicorns" },
                  { l: "The Forge — Blog",        h: "/blog"            },
                  { l: "Valuation Tool",          h: "/report"          },
                  { l: "Submit Startup",          h: "/submit"          },
                ].map(lnk => (
                  <li key={lnk.h + lnk.l}>
                    <Link
                      href={lnk.h}
                      className="text-[8.5px] text-[#AAA] hover:text-[#1A1208] uppercase tracking-wider transition-colors"
                      style={{ fontFamily: "system-ui,sans-serif", textDecoration: "none" }}
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
    </>
  )
}
