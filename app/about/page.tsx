// app/about/page.tsx


import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import type { Metadata } from "next"
import {
  Shield, Users, TrendingUp, Award, BadgeCheck,
  Globe, ArrowRight, Sparkles, Calculator, ArrowUpRight,
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

const FAQ_ITEMS = [
  { q: "What is UpForge?",                  a: "UpForge is India's independent startup registry — a free, structured, and permanently accessible public record of verified Indian startups across 30+ sectors." },
  { q: "Is UpForge free for founders?",     a: "Yes. Listing your startup on UpForge is completely free. We believe every serious builder deserves institutional-grade digital credibility without paying for it." },
  { q: "How does UpForge verify startups?", a: "Every startup profile is manually reviewed before listing. We check basic company details, founders, and operational status to ensure accuracy." },
  { q: "Is UpForge a media company?",       a: "No. UpForge is neither a media outlet nor an accelerator. We are India's neutral, independent registry — no paid rankings, no sponsored placements." },
  { q: "Who can use UpForge?",              a: "Founders use UpForge to build a verified digital paper trail. Investors use it to discover startups before they hit headlines. Press use it to cite reliable startup data." },
  { q: "How many startups are on UpForge?", a: "UpForge lists thousands of verified Indian startups and grows daily across sectors like AI/ML, FinTech, SaaS, HealthTech, Climate Tech, and more." },
]

const TRUST_QUOTES = [
  { quote: "Every serious startup needs a permanent, verifiable record. UpForge fills that gap for India.",        by: "Independent Founder · Bengaluru",  accent: "#2563EB" },
  { quote: "We used UpForge to cite startup data in our due diligence report. Clean, structured, trustworthy.",    by: "Early-Stage Investor · Mumbai",     accent: "#D97706" },
  { quote: "Listed our startup before our seed round. Investors found us here first.",                             by: "Founder, Series A · Delhi NCR",     accent: "#059669" },
]

const PROMISE_ITEMS = [
  { icon: BadgeCheck, label: "Manually Verified",    desc: "Every profile reviewed before listing",        color: "#15803D" },
  { icon: Shield,     label: "No Paid Rankings",     desc: "Zero sponsored placements, ever",              color: "#2563EB" },
  { icon: Globe,      label: "Permanently Indexed",  desc: "Public, structured, always accessible",        color: "#7C3AED" },
  { icon: Sparkles,   label: "AI-Powered Analysis",  desc: "Growth insights for every listed startup",     color: "#D97706" },
  { icon: Calculator, label: "Free for Founders",    desc: "Listing, reports, and tools — always free",   color: "#DC2626" },
]

const PRINCIPLES = [
  { icon: Users,      title: "Built for Builders",    desc: "Every listed startup represents independent execution — no accelerator required, no VC needed to get listed." },
  { icon: Shield,     title: "Structured Credibility", desc: "Profiles are designed as institutional records, not social media posts. Data-first, editorial-grade." },
  { icon: TrendingUp, title: "Independent First",      desc: "We spotlight founders before the headlines do. UpForge is where a startup's story starts." },
  { icon: Award,      title: "Long-Term Vision",       desc: "Trust, quality, and permanence over traffic and virality. Built to last decades, not quarters." },
]

const AUDIENCE = [
  { type: "Founders",  headline: "Build your paper trail",    dark: true,  href: "/submit",  desc: "Get independently verified and indexed in India's most trusted startup registry." },
  { type: "Investors", headline: "Discover before the crowd", dark: false, href: "/startup", desc: "Search verified startup data across 30+ sectors before they hit headlines." },
  { type: "Press",     headline: "Cite with confidence",      dark: false, href: "/startup", desc: "Reliable startup data — manually verified, permanently accessible, always citable." },
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

        /* ── Design tokens — identical to startup/page.tsx ── */
        :root {
          --saffron:      #FF9933;
          --green:        #138808;
          --ink:          #1A1208;
          --parch:        #FDFAF5;
          --parch-dark:   #F5F0E6;
          --rule:         #E2D9CC;
          --rule2:        #D8D2C4;
          --muted:        #8B7355;
          --accent:       #D97706;
          --accent-light: #F59E0B;
          --gold:         #C59A2E;
        }

        /* ── Reset ── */
        .ab-root { min-height: 100vh; background: var(--parch); font-family: 'Georgia','Times New Roman',serif; }

        /* ── Animations ── */
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: none; }
        }
        .ri-0 { animation: riseIn 0.5s 0.00s ease both; }
        .ri-1 { animation: riseIn 0.5s 0.08s ease both; }
        .ri-2 { animation: riseIn 0.5s 0.16s ease both; }
        .ri-3 { animation: riseIn 0.5s 0.24s ease both; }
        .ri-4 { animation: riseIn 0.5s 0.32s ease both; }

        /* ══════════════════════════════════════════════
           HERO — exact match to startup/page.tsx
        ══════════════════════════════════════════════ */
        .ab-hero {
          position: relative;
          background: linear-gradient(135deg, rgba(26,18,8,0.88) 0%, rgba(26,18,8,0.75) 100%);
          overflow: hidden;
          border-bottom: 1px solid var(--rule);
        }
        /* Tricolor strip — top of hero */
        .ab-hero::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%);
          z-index: 2;
        }
        .ab-hero-bg {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background-image: url('/aboutus.jpg');
          background-size: cover; background-position: center 30%;
          opacity: 0.22; z-index: 0;
        }
        .ab-hero-bg::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg,
            rgba(26,18,8,0.85) 0%,
            rgba(26,18,8,0.50) 50%,
            rgba(26,18,8,0.85) 100%
          );
        }
        /* Eyebrow breadcrumb */
        .ab-hero-eyebrow {
          position: relative; z-index: 10;
          display: flex; align-items: center; gap: 8px;
          padding: 18px 24px 0;
          font-size: 9px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.2em; color: rgba(255,255,255,0.4);
          font-family: system-ui, sans-serif;
        }
        .ab-hero-eyebrow a { color: rgba(255,255,255,0.4); text-decoration: none; }
        .ab-hero-eyebrow a:hover { color: rgba(255,255,255,0.7); }
        .ab-hero-eyebrow span { color: rgba(255,255,255,0.25); }

        /* Centred content block — mirrors startup mast-content */
        .ab-mast-content {
          position: relative; z-index: 10;
          text-align: center;
          padding: 72px 24px 80px;
        }
        .ab-h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 900;
          letter-spacing: -0.02em;
          color: white;
          line-height: 1.1;
          text-shadow: 0 2px 12px rgba(0,0,0,0.3);
          margin-bottom: 8px;
        }
        .ab-h1-sub {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(18px, 2.5vw, 28px);
          font-weight: 700;
          font-style: italic;
          color: var(--saffron);
          margin-bottom: 20px;
          letter-spacing: 0.01em;
        }
        .ab-mast-rule {
          display: block; width: 200px; height: 2px;
          background: linear-gradient(90deg, transparent, var(--saffron), var(--accent), var(--saffron), transparent);
          margin: 0 auto 24px;
        }
        .ab-tagline {
          font-family: Georgia, serif;
          font-size: 16px;
          color: rgba(255,255,255,0.92);
          font-style: italic;
          line-height: 1.7;
          max-width: 580px;
          margin: 0 auto 32px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }

        /* Live badge — identical to startup page */
        .live-badge {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.12); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.25); padding: 10px 28px; border-radius: 100px;
        }
        .live-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #22c55e;
          animation: pulse 2s infinite;
        }
        .live-text {
          font-family: system-ui, sans-serif;
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.2em; color: white;
        }
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          70%  { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }

        /* Stats dark band — flush below hero */
        .ab-stats-band {
          background: var(--ink);
          border-bottom: 3px solid rgba(255,255,255,0.06);
        }
        .ab-stats-inner {
          max-width: 1300px; margin: 0 auto;
          display: flex;
        }
        .ab-stat-cell {
          flex: 1; padding: 28px 0; text-align: center;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .ab-stat-cell:last-child { border-right: none; }
        .ab-stat-val {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 900; color: white; line-height: 1; margin-bottom: 8px;
        }
        .ab-stat-label {
          font-size: 8.5px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.18em; color: rgba(255,255,255,0.35);
          font-family: system-ui, sans-serif;
        }
        @media (max-width: 640px) {
          .ab-stats-inner { flex-direction: column; }
          .ab-stat-cell { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .ab-stat-cell:last-child { border-bottom: none; }
        }

        /* ══════════════════════════════════════════════
           MAIN LAYOUT
        ══════════════════════════════════════════════ */
        .ab-main { max-width: 1300px; margin: 0 auto; padding: 0 24px 64px; }

        /* Section divider + header */
        .ab-section { padding: 36px 0; border-bottom: 1px solid var(--rule2); }
        .ab-section:last-child { border-bottom: none; }
        .sh { display: flex; align-items: center; gap: 10px; margin-bottom: 22px; }
        .sh-l { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3em; color: #BBB; font-family: system-ui,sans-serif; white-space: nowrap; }
        .sh-r { flex: 1; height: 1px; background: var(--rule2); }

        /* ── PROMISE STRIP ── */
        .promise-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          border: 1px solid var(--rule2);
          background: var(--rule2);
          gap: 1px;
        }
        @media (max-width: 900px) { .promise-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 560px) { .promise-grid { grid-template-columns: 1fr 1fr; } }
        .promise-cell {
          background: white;
          padding: 22px 18px;
          display: flex; flex-direction: column; gap: 10px;
          transition: background 0.2s;
        }
        .promise-cell:hover { background: var(--parch-dark); }
        .promise-icon {
          width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;
          background: var(--parch-dark); border-radius: 8px;
          transition: background 0.2s;
        }
        .promise-cell:hover .promise-icon { background: var(--ink); }
        .promise-cell:hover .promise-icon svg { color: var(--saffron) !important; }
        .promise-icon svg { transition: color 0.2s; }
        .promise-label {
          font-size: 10px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: var(--ink); font-family: system-ui, sans-serif;
        }
        .promise-desc {
          font-size: 12px; color: #5A4A30; font-style: italic; line-height: 1.55;
        }

        /* ── TRUST QUOTES ── */
        .trust-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 768px) { .trust-grid { grid-template-columns: 1fr; } }
        .trust-card {
          background: white; border: 1px solid var(--rule2);
          border-radius: 16px; padding: 24px 22px;
          display: flex; flex-direction: column; gap: 16px;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .trust-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -8px rgba(0,0,0,0.10);
          border-color: var(--accent);
        }
        .trust-accent-row { display: flex; align-items: center; gap: 10px; }
        .trust-accent-dot { width: 30px; height: 30px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .trust-accent-line { height: 2px; flex: 1; }
        .trust-quote-text {
          font-family: 'Playfair Display', serif; font-style: italic;
          font-size: clamp(13px, 1.3vw, 14.5px); color: var(--ink); line-height: 1.72; flex: 1;
        }
        .trust-by {
          font-size: 8.5px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.18em; color: #AAA; font-family: system-ui, sans-serif;
          border-top: 1px solid var(--rule2); padding-top: 10px;
        }

        /* ── WHY SECTION ── */
        .why-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0;
          border: 1px solid var(--rule2); background: var(--rule2);
        }
        @media (max-width: 860px) { .why-grid { grid-template-columns: 1fr; } }
        .why-col { background: white; padding: 32px; }
        .why-col:first-child { border-right: 1px solid var(--rule2); }
        @media (max-width: 860px) { .why-col:first-child { border-right: none; border-bottom: 1px solid var(--rule2); } }

        /* Image block used in why section */
        .why-img {
          position: relative; overflow: hidden; margin-bottom: 22px;
          height: clamp(160px, 22vw, 220px);
        }
        .why-img img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; filter: sepia(14%) contrast(107%);
          transition: transform 0.5s ease;
        }
        .why-img:hover img { transform: scale(1.025); }
        .why-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(26,18,8,0.72) 0%, transparent 55%);
        }
        .why-img-label {
          position: absolute; bottom: 12px; left: 14px;
          font-size: 7.5px; font-weight: 900; text-transform: uppercase;
          letter-spacing: 0.2em; color: white;
          padding: 2px 8px; font-family: system-ui, sans-serif;
        }
        .why-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.1rem, 2.2vw, 1.55rem);
          font-weight: 700; color: var(--ink); line-height: 1.22; margin-bottom: 20px;
        }
        .why-row {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 0; border-bottom: 1px solid var(--rule2);
        }
        .why-row:last-child { border-bottom: none; }
        .why-num {
          width: 20px; height: 20px; flex-shrink: 0;
          background: var(--ink); color: white;
          font-size: 8.5px; font-weight: 700; font-family: system-ui, sans-serif;
          display: flex; align-items: center; justify-content: center; margin-top: 1px;
        }
        .why-point { font-size: 13px; font-weight: 600; color: var(--ink); line-height: 1.4; margin-bottom: 3px; }
        .why-data  { font-size: 10.5px; color: #AAA; font-family: system-ui, sans-serif; }

        /* Answer col features */
        .answer-feat {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 0; border-bottom: 1px solid var(--rule2);
        }
        .answer-feat:last-child { border-bottom: none; }
        .answer-feat-text { font-size: 13px; color: #5A4A30; font-style: italic; }

        /* ── PRINCIPLES ── */
        .principles-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: var(--rule2);
          border: 1px solid var(--rule2);
        }
        @media (max-width: 768px) { .principles-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .principles-grid { grid-template-columns: 1fr; } }
        .principle-cell {
          background: white; padding: 26px 22px;
          transition: background 0.2s;
        }
        .principle-cell:hover { background: var(--parch-dark); }
        .principle-icon {
          width: 36px; height: 36px; background: var(--parch-dark);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px; transition: background 0.2s;
        }
        .principle-cell:hover .principle-icon { background: var(--ink); }
        .principle-cell:hover .principle-icon svg { color: var(--saffron) !important; }
        .principle-icon svg { transition: color 0.2s; }
        .principle-title {
          font-family: 'Playfair Display', serif; font-size: 1rem;
          font-weight: 700; color: var(--ink); margin-bottom: 8px;
        }
        .principle-desc { font-size: 12px; color: #5A4A30; font-style: italic; line-height: 1.72; }

        /* ── ECOSYSTEM PULSE ── */
        .pulse-wrap {
          display: grid; grid-template-columns: 1fr 220px;
          border: 1px solid var(--rule2); background: var(--rule2); gap: 1px;
        }
        @media (max-width: 640px) { .pulse-wrap { grid-template-columns: 1fr; } }
        .pulse-left  { background: white; padding: 32px; }
        .pulse-right {
          background: var(--ink); padding: 32px 24px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; gap: 8px;
        }
        .pulse-stat-val {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 900; color: white; line-height: 1;
        }
        .pulse-stat-note {
          font-size: 8.5px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.18em; color: rgba(255,255,255,0.35);
          font-family: system-ui, sans-serif;
        }
        .pulse-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.1rem, 2.5vw, 1.75rem);
          font-weight: 700; color: var(--ink); line-height: 1.25; margin-bottom: 12px;
        }
        .pulse-context { font-size: 13px; color: #5A4A30; font-style: italic; line-height: 1.7; }

        /* ── MILESTONES ── */
        .milestone-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          gap: 1px; background: var(--rule2); border: 1px solid var(--rule2);
        }
        @media (max-width: 480px) { .milestone-grid { grid-template-columns: 1fr 1fr; } }
        .milestone-cell { background: white; padding: 20px 18px; transition: background 0.2s; }
        .milestone-cell:hover { background: var(--parch-dark); }
        .milestone-cell.dark { background: var(--ink); }
        .milestone-year {
          font-family: 'Playfair Display', serif;
          font-size: 1.55rem; font-weight: 900; line-height: 1; margin-bottom: 8px;
          color: var(--ink);
        }
        .milestone-cell.dark .milestone-year { color: var(--saffron); }
        .milestone-event { font-size: 11.5px; color: #5A4A30; font-style: italic; line-height: 1.6; }
        .milestone-cell.dark .milestone-event { color: rgba(255,255,255,0.6); }

        /* ── WHO WE SERVE ── */
        .serve-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--rule2); border: 1px solid var(--rule2);
        }
        @media (max-width: 640px) { .serve-grid { grid-template-columns: 1fr; } }
        .serve-cell { background: white; padding: 28px 24px; }
        .serve-cell.dark { background: var(--ink); }
        .serve-eyebrow {
          font-size: 8px; font-weight: 900; text-transform: uppercase;
          letter-spacing: 0.16em; font-family: system-ui, sans-serif;
          margin-bottom: 8px;
        }
        .serve-headline {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700; margin-bottom: 12px;
          color: var(--ink);
        }
        .serve-cell.dark .serve-headline { color: white; }
        .serve-desc { font-size: 12.5px; font-style: italic; line-height: 1.7; color: #5A4A30; margin-bottom: 16px; }
        .serve-cell.dark .serve-desc { color: rgba(255,255,255,0.5); }
        .serve-link {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 9.5px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.12em; font-family: system-ui, sans-serif;
          color: var(--ink); text-decoration: none; transition: opacity 0.2s;
        }
        .serve-cell.dark .serve-link { color: var(--saffron); }
        .serve-link:hover { opacity: 0.6; }

        /* ── FAQ ── */
        .faq-wrap { border: 1px solid var(--rule2); background: white; }
        .faq-item { border-bottom: 1px solid var(--rule2); padding: 0 28px; }
        .faq-item:last-child { border-bottom: none; }
        details[open] .faq-chevron { transform: rotate(180deg); }
        .faq-chevron { transition: transform 0.22s; flex-shrink: 0; }
        .faq-summary {
          list-style: none; display: flex; align-items: center;
          justify-content: space-between; gap: 12px;
          padding: 18px 0; cursor: pointer;
        }
        .faq-q {
          font-size: clamp(13px, 1.5vw, 14.5px); font-weight: 600;
          color: #5A4A30; font-style: italic; line-height: 1.4;
        }
        .faq-a { padding-bottom: 16px; font-size: 13px; color: #5A4A30; font-style: italic; line-height: 1.82; }

        /* ── QUICK LINKS ── */
        .links-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
        }
        @media (max-width: 768px) { .links-grid { grid-template-columns: repeat(2, 1fr); } }
        .link-card {
          padding: 14px 16px; border: 1px solid var(--rule2);
          background: white; text-decoration: none;
          border-radius: 12px;
          transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
        }
        .link-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          border-color: var(--accent);
        }
        .link-card-title {
          font-size: 9.5px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--ink); display: flex;
          align-items: center; gap: 5px; margin-bottom: 4px;
          font-family: system-ui, sans-serif;
        }
        .link-card-desc { font-size: 10px; color: #AAA; font-family: system-ui, sans-serif; }

        /* ── CTA BLOCK ── */
        .ab-cta {
          background: linear-gradient(135deg, var(--ink) 0%, #2A2012 100%);
          border-radius: 20px; padding: 40px 44px;
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: space-between; gap: 24px;
          margin-top: 48px;
        }
        .ab-cta-ey {
          font-size: 8.5px; font-weight: 900; text-transform: uppercase;
          letter-spacing: 0.3em; color: rgba(232,197,71,0.7);
          margin-bottom: 8px; font-family: system-ui, sans-serif;
        }
        .ab-cta-h {
          font-family: 'Playfair Display', serif; font-size: 20px;
          font-weight: 700; color: white; margin-bottom: 6px;
        }
        .ab-cta-p { font-size: 12px; color: rgba(255,255,255,0.45); font-style: italic; }
        .ab-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--accent); color: white;
          padding: 14px 30px; font-size: 10px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.1em;
          text-decoration: none; border-radius: 40px;
          transition: background 0.2s, transform 0.2s; flex-shrink: 0;
        }
        .ab-cta-btn:hover { background: var(--accent-light); transform: translateY(-2px); }

        /* ── FOOTER NAV ── */
        .ab-footer {
          padding-top: 20px; margin-top: 24px;
          border-top: 1px solid var(--rule2);
        }
        .ab-footer-note {
          font-size: 8.5px; color: #BBB0A0; line-height: 1.7;
          font-family: system-ui, sans-serif; margin-bottom: 14px;
        }
        .ab-footer-nav { display: flex; flex-wrap: wrap; gap: 16px 24px; list-style: none; padding: 0; margin: 0; }
        .ab-footer-nav a {
          font-size: 8.5px; text-transform: uppercase; letter-spacing: 0.14em;
          color: #AAA; text-decoration: none; font-family: system-ui, sans-serif;
          transition: color 0.18s;
        }
        .ab-footer-nav a:hover { color: var(--ink); }

        /* ── RESPONSIVE TWEAKS ── */
        @media (max-width: 768px) {
          .ab-mast-content { padding: 80px 20px 60px !important; }
          .ab-tagline br { display: none; }
          .ab-main { padding: 0 16px 48px; }
          .ab-cta { padding: 28px 22px; }
          .why-col { padding: 22px 18px; }
          .faq-item { padding: 0 18px; }
        }
        @media (max-width: 480px) {
          .ab-h1 { font-size: 36px; }
          .ab-cta { border-radius: 12px; }
        }
      `}</style>

      <div className="ab-root">

        {/* ══════════════════════════════════════
            HERO — matches startup/page.tsx exactly
        ══════════════════════════════════════ */}
        <section className="ab-hero ri-0" aria-label="About UpForge">
          {/* Bg image */}
          <div className="ab-hero-bg" role="presentation" />

          {/* Breadcrumb eyebrow */}
          <div className="ab-hero-eyebrow">
            <a href="/">UpForge</a>
            <span>›</span>
            <span style={{ color: "rgba(255,255,255,0.6)" }}>About</span>
          </div>

          {/* Centred masthead */}
          <div className="ab-mast-content">
            <h1 className="ab-h1">About UpForge</h1>
            <p className="ab-h1-sub">India's Independent Startup Registry</p>
            <span className="ab-mast-rule" />
            <p className="ab-tagline">
              Not a media platform. Not a marketplace.<br />
              A permanent public record of serious builders.
            </p>
            <div className="live-badge">
              <span className="live-dot" />
              <span className="live-text">
                Live · {(totalStartups || 0).toLocaleString()}+ Verified Profiles
              </span>
            </div>
          </div>
        </section>

        {/* ── Stats dark band ── */}
        <div className="ab-stats-band ri-1">
          <div className="ab-stats-inner">
            {[
              { v: `${(totalStartups       || 0).toLocaleString()}+`, l: "Verified Profiles"  },
              { v: `${(startupsWithReports || 30)}+`,                 l: "Reports Generated"  },
              { v: `${uniqueIndustries     || 20}+`,                  l: "Industries Covered" },
              { v: "Free",                                             l: "Always & Forever"   },
            ].map((s, i, arr) => (
              <div key={i} className="ab-stat-cell" style={{ borderRight: i < arr.length - 1 ? undefined : "none" }}>
                <p className="ab-stat-val">{s.v}</p>
                <p className="ab-stat-label">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════ */}
        <main className="ab-main ri-2">

          {/* ── PROMISE STRIP ── */}
          <section className="ab-section" aria-label="Our commitments">
            <div className="sh">
              <span style={{ color: "var(--accent)", fontSize: 12 }}>✦</span>
              <span className="sh-l">What We Stand For</span>
              <div className="sh-r" />
            </div>
            <div className="promise-grid">
              {PROMISE_ITEMS.map((item, i) => (
                <div key={i} className="promise-cell">
                  <div className="promise-icon">
                    <item.icon style={{ width: 15, height: 15, color: item.color }} />
                  </div>
                  <div>
                    <p className="promise-label">{item.label}</p>
                    <p className="promise-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── ECOSYSTEM PULSE ── */}
          <section className="ab-section" aria-label="Ecosystem pulse">
            <div className="sh">
              <span className="sh-l">Ecosystem Pulse · March 2026</span>
              <div className="sh-r" />
            </div>
            <div className="pulse-wrap">
              <div className="pulse-left">
                <p className="pulse-headline">{insights.ecosystemPulse.headline}</p>
                <p className="pulse-context">{insights.ecosystemPulse.context}</p>
              </div>
              <div className="pulse-right">
                <p className="pulse-stat-val">{insights.ecosystemPulse.stat}</p>
                <p className="pulse-stat-note">& counting in India</p>
              </div>
            </div>
          </section>

          {/* ── TRUST QUOTES ── */}
          <section className="ab-section" aria-label="What people say">
            <div className="sh">
              <span className="sh-l">Trusted by Founders, Investors &amp; Press</span>
              <div className="sh-r" />
            </div>
            <div className="trust-grid">
              {TRUST_QUOTES.map((tq, i) => (
                <div key={i} className="trust-card">
                  <div className="trust-accent-row">
                    <div className="trust-accent-dot" style={{ background: tq.accent }}>
                      <span
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1.2rem", fontWeight: 900,
                          color: "white", lineHeight: 1, marginTop: -2,
                        }}
                        aria-hidden="true"
                      >"</span>
                    </div>
                    <div className="trust-accent-line" style={{ background: tq.accent }} />
                  </div>
                  <p className="trust-quote-text">"{tq.quote}"</p>
                  <p className="trust-by">— {tq.by}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── WHY THIS EXISTS ── */}
          <section className="ab-section" aria-label="Why UpForge exists">
            <div className="sh">
              <span className="sh-l">Why UpForge Exists</span>
              <div className="sh-r" />
            </div>
            <div className="why-grid">

              {/* Left — the problem */}
              <div className="why-col">
                <div className="why-img">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5612AQHvdNFPlgO8mA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1726469383648?e=2147483647&v=beta&t=TOuXsxGGTTfnFrJ16aAHJdDZwFLP2fjF5u-Cutu1q68"
                    alt="The fragmented startup data problem in India"
                    loading="lazy"
                  />
                  <div className="why-img-overlay" />
                  <span className="why-img-label" style={{ background: "#DC2626" }}>The Problem</span>
                </div>
                <h2 className="why-h2">India's startup data was fragmented, unverified, and buried.</h2>
                <div>
                  {insights.whyRegistry.map((item: { point: string; data: string }, i: number) => (
                    <div key={i} className="why-row">
                      <div className="why-num">{i + 1}</div>
                      <div>
                        <p className="why-point">{item.point}</p>
                        <p className="why-data">{item.data}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — the answer */}
              <div className="why-col">
                <div className="why-img">
                  <img
                    src="https://images.yourstory.com/cs/2/ab6020f0259611ee840c6712417aa5cf/What-is-Startup-India-Showcase-11-1703785002234.jpg?mode=crop&crop=faces&ar=16%3A9&format=auto&w=1920&q=75"
                    alt="UpForge — India's answer to the startup registry gap"
                    loading="lazy"
                  />
                  <div className="why-img-overlay" />
                  <span className="why-img-label" style={{ background: "#2563EB" }}>Our Answer</span>
                </div>
                <h2 className="why-h2">One independent record. Neutral, free, permanent.</h2>
                <p style={{ fontSize: 13, color: "#5A4A30", fontStyle: "italic", lineHeight: 1.82, marginBottom: 18 }}>
                  UpForge is India's independent startup registry — not a media outlet, not an accelerator. We document startup data in a neutral, permanently accessible format.
                </p>
                <div>
                  {[
                    { icon: BadgeCheck, text: "Every profile manually verified before listing",  c: "#15803D" },
                    { icon: Shield,     text: "No paid rankings, no sponsored placements",        c: "#2563EB" },
                    { icon: Globe,      text: "Publicly indexed and permanently accessible",      c: "#7C3AED" },
                    { icon: Sparkles,   text: "AI-powered growth analysis for every startup",     c: "#D97706" },
                    { icon: Calculator, text: "Free valuation tool for early-stage founders",     c: "#DC2626" },
                  ].map((item, i) => (
                    <div key={i} className="answer-feat">
                      <item.icon style={{ width: 13, height: 13, color: item.c, flexShrink: 0 }} />
                      <span className="answer-feat-text">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── CORE PRINCIPLES ── */}
          <section className="ab-section" aria-label="Core principles">
            <div className="sh">
              <span className="sh-l">Core Principles</span>
              <div className="sh-r" />
            </div>
            <div className="principles-grid">
              {PRINCIPLES.map((item, i) => (
                <div key={i} className="principle-cell">
                  <div className="principle-icon">
                    <item.icon style={{ width: 15, height: 15, color: "#8C7D65" }} />
                  </div>
                  <p className="principle-title">{item.title}</p>
                  <p className="principle-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── ECOSYSTEM MILESTONES ── */}
          <section className="ab-section" aria-label="Ecosystem milestones">
            {/* Full-width image band */}
            <div style={{ position: "relative", overflow: "hidden", height: "clamp(160px,22vw,280px)", marginBottom: 22, borderRadius: 16 }}>
              <img
                src="https://p2.piqsels.com/preview/160/1022/497/startup-start-up-growth-hacking-market.jpg"
                alt="Indian startup builders — from 10,000 to a global ecosystem"
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "sepia(14%) contrast(107%)" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,18,8,.85) 0%, rgba(26,18,8,.2) 60%, transparent 100%)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 clamp(20px,4vw,52px)" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.2rem,3vw,2.4rem)", fontWeight: 900, color: "white", lineHeight: 1.18 }}>
                  From 10,000 startups<br />to a global ecosystem.
                </p>
              </div>
            </div>
            <div className="sh">
              <span className="sh-l">Ecosystem Milestones</span>
              <div className="sh-r" />
            </div>
            <div className="milestone-grid">
              {insights.milestones.map((m: { year: string; event: string }, i: number) => {
                const isLast = i === insights.milestones.length - 1
                return (
                  <div key={i} className={`milestone-cell${isLast ? " dark" : ""}`}>
                    <p className="milestone-year">{m.year}</p>
                    <p className="milestone-event">{m.event}</p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ── WHO WE SERVE ── */}
          <section className="ab-section" aria-label="Who uses UpForge">
            <div className="sh">
              <span className="sh-l">Who Uses UpForge</span>
              <div className="sh-r" />
            </div>
            <div className="serve-grid">
              {AUDIENCE.map((aud, i) => (
                <div key={i} className={`serve-cell${aud.dark ? " dark" : ""}`}>
                  <p className="serve-eyebrow" style={{ color: aud.dark ? "rgba(255,200,50,0.7)" : "#AAA" }}>
                    {aud.type}
                  </p>
                  <h3 className="serve-headline">{aud.headline}</h3>
                  <p className="serve-desc">{aud.desc}</p>
                  <Link href={aud.href} className="serve-link">
                    Explore <ArrowRight style={{ width: 11, height: 11 }} />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="ab-section" aria-label="Frequently asked questions">
            <div className="sh">
              <span className="sh-l">Frequently Asked Questions</span>
              <div className="sh-r" />
            </div>
            <div className="faq-wrap">
              {FAQ_ITEMS.map((faq, i) => (
                <details key={i} className="faq-item">
                  <summary className="faq-summary">
                    <span className="faq-q">{faq.q}</span>
                    <svg className="faq-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4L6 8L10 4" stroke="#8C7D65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <p className="faq-a">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* ── QUICK LINKS ── */}
          <section className="ab-section" aria-label="Explore UpForge">
            <div className="sh">
              <span className="sh-l">Everything on UpForge</span>
              <div className="sh-r" />
            </div>
            <div className="links-grid">
              {[
                { l: "Startup Registry",      h: "/startup",                desc: "Verified Indian startups" },
                { l: "Submit Your Startup",   h: "/submit",                 desc: "Get listed free"          },
                { l: "The Forge — Blog",      h: "/blog",                   desc: "Startup intelligence"     },
                { l: "Indian Unicorns",       h: "/indian-unicorns",        desc: "All 126 unicorns"         },
                { l: "AI Startups India",     h: "/startup?sector=AI%2FML", desc: "India's AI builders"      },
                { l: "FinTech Startups",      h: "/startup?sector=FinTech", desc: "Zerodha, CRED & more"     },
                { l: "Valuation Tool",        h: "/report",                 desc: "Free AI estimate"         },
                { l: "Founder Chronicle",     h: "/",                       desc: "10 founder stories"       },
              ].map(lnk => (
                <Link key={lnk.h + lnk.l} href={lnk.h} className="link-card">
                  <span className="link-card-title">
                    {lnk.l}
                    <ArrowUpRight style={{ width: 10, height: 10, flexShrink: 0 }} />
                  </span>
                  <span className="link-card-desc">{lnk.desc}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── CTA BLOCK ── */}
          <div className="ab-cta ri-4">
            <div>
              <p className="ab-cta-ey">🚀 UpForge Registry</p>
              <p className="ab-cta-h">Your founder story starts with a verified profile.</p>
              <p className="ab-cta-p">Free forever. Trusted by investors across India.</p>
            </div>
            <Link href="/submit" className="ab-cta-btn">
              List Free <ArrowRight size={13} />
            </Link>
          </div>

          {/* ── FOOTER ── */}
          <footer className="ab-footer ri-4">
            <p className="ab-footer-note">
              * Registry data sourced from DPIIT, Tracxn, Inc42, Forbes India, Hurun India 2025, and company announcements as of March 2026.
              UpForge is an independent registry — no paid placements, no sponsored rankings.
            </p>
            <nav aria-label="Footer navigation">
              <ul className="ab-footer-nav">
                {[
                  { l: "The Founder Chronicle",  h: "/"                },
                  { l: "Startup Registry India", h: "/startup"         },
                  { l: "Indian Unicorns 2026",   h: "/indian-unicorns" },
                  { l: "The Forge — Blog",        h: "/blog"            },
                  { l: "Valuation Tool",          h: "/report"          },
                  { l: "Submit Startup",          h: "/submit"          },
                ].map(lnk => (
                  <li key={lnk.h + lnk.l}>
                    <Link href={lnk.h}>{lnk.l}</Link>
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
