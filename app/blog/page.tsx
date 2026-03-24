// app/blog/page.tsx
// THE FORGE — Blog Index (www.upforge.in/blog)
// Updated: Hero section now matches registry page style exactly
// — dark overlay background image, Playfair Display, teal accents, live badge, animated rule

import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "The Forge — Startup Intelligence, Founder Stories & Strategy | UpForge",
  description:
    "Deep analysis on Indian startups, founder stories, funding guides, AI startup lists, unicorn profiles, and leadership lessons. Trusted by founders, investors, and builders across India.",
  keywords: [
    "Indian startup blog",
    "startup founder stories India",
    "startup intelligence India",
    "Indian startup analysis 2026",
    "startup funding guide India",
    "Indian unicorns blog",
    "AI startups India blog",
    "how to start startup India",
    "top AI startups India 2026",
  ],
  alternates: { canonical: "https://www.upforge.in/blog" },
  openGraph: {
    title: "The Forge — Startup Intelligence by UpForge",
    description:
      "Deep analysis on Indian startups, AI startup lists, founder stories, funding guides, unicorn profiles, and leadership lessons.",
    url: "https://www.upforge.in/blog",
    siteName: "UpForge",
    images: [{ url: "https://www.upforge.in/og-blog.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": "https://www.upforge.in/blog",
      "name": "The Forge — UpForge Intelligence",
      "url": "https://www.upforge.in/blog",
      "description": "Startup analysis, founder stories, AI startup guides, and business strategy for India's builders.",
      "publisher": {
        "@type": "Organization",
        "name": "UpForge",
        "url": "https://www.upforge.in",
        "logo": { "@type": "ImageObject", "url": "https://www.upforge.in/logo.jpg" },
      },
      "blogPost": [
        { "@type": "BlogPosting", "headline": "India Startup Ecosystem 2026: State of the Nation",              "url": "https://www.upforge.in/blog/india-startup-ecosystem-2026"                   },
        { "@type": "BlogPosting", "headline": "How to Get Startup Funding in India 2026",                       "url": "https://www.upforge.in/blog/how-to-get-startup-funding-india-2026"           },
        { "@type": "BlogPosting", "headline": "Top Indian Unicorns 2026: Ranked & Profiled",                    "url": "https://www.upforge.in/blog/top-indian-unicorns-2026"                       },
        { "@type": "BlogPosting", "headline": "25 Best Indian Startup Founders to Follow 2026",                 "url": "https://www.upforge.in/blog/best-indian-startup-founders-to-follow-2026"    },
        { "@type": "BlogPosting", "headline": "IND vs NZ Final 2026: 7 Leadership Lessons",                     "url": "https://www.upforge.in/blog/leadership-lessons-ind-vs-nz-final-2026"        },
        { "@type": "BlogPosting", "headline": "5 Startup Ideas Inspired by IND vs NZ Final 2026",               "url": "https://www.upforge.in/blog/startup-ideas-inspired-by-ind-vs-nz-final-2026" },
        { "@type": "BlogPosting", "headline": "Top AI Startups in India (2026 Updated List)",                   "url": "https://www.upforge.in/blog/top-ai-startups-india-2026"                     },
        { "@type": "BlogPosting", "headline": "How to Start a Startup in India (Step-by-Step Guide 2026)",      "url": "https://www.upforge.in/blog/how-to-start-startup-india-2026"                 },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "UpForge",          "item": "https://www.upforge.in/"    },
        { "@type": "ListItem", "position": 2, "name": "The Forge — Blog", "item": "https://www.upforge.in/blog" },
      ],
    },
  ],
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const HERO_POST = {
  title:    "India Startup Ecosystem 2026: The Complete State of the Nation Report",
  subtitle: "650,000 startups. 125 unicorns. $3.44B raised in Q1 alone. The definitive data-driven picture of where India's startup ecosystem stands, where it's going, and what every founder and investor must understand right now.",
  slug:     "/blog/india-startup-ecosystem-2026",
  category: "ANNUAL REPORT",
  date:     "March 2026",
  readTime: "20 min",
  img:      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=85&auto=format",
  tag:      "Must Read",
  topics:   ["Funding Trends", "Top Sectors", "City Rankings", "5 Macro Trends", "Policy Landscape"],
  accent:   "#B45309",
  accentBg: "#FEF3C7",
}

const SECONDARY_POSTS = [
  {
    title:    "How to Get Startup Funding in India 2026: Complete Founder's Guide",
    excerpt:  "DPIIT recognition, SISFS grants (₹945Cr corpus), angel networks, VC criteria, 90-day fundraising playbook, and the 7 mistakes that kill Indian fundraises.",
    slug:     "/blog/how-to-get-startup-funding-india-2026",
    category: "FUNDING GUIDE",
    date:     "March 2026",
    readTime: "12 min",
    img:      "https://listunite.com/storage/2025/11/Indias-2026-Startup-Schemes-Funding-Opportunities-360x240.jpeg",
    tag:      "High Traffic",
    accent:   "#15803D",
  },
  {
    title:    "Top Indian Unicorns 2026: Every ₹1B+ Startup Ranked & Profiled",
    excerpt:  "125 Indian startups have crossed the $1 billion mark. Profiles, valuations, moat analysis, and the one founder lesson to extract from each company's rise.",
    slug:     "/blog/top-indian-unicorns-2026",
    category: "UNICORN REPORT",
    date:     "March 2026",
    readTime: "15 min",
    img:      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
    tag:      "Trending",
    accent:   "#D97706",
  },
  {
    title:    "Top AI Startups in India (2026 Updated List)",
    excerpt:  "Sarvam AI, Krutrim, Darwinbox, Qure.ai, Perfios and 8 more — the companies building India's AI future profiled with funding data, founder stories, and verified insights.",
    slug:     "/blog/top-ai-startups-india-2026",
    category: "AI & DEEP TECH",
    date:     "March 2026",
    readTime: "11 min",
    img:      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80&auto=format",
    tag:      "New",
    accent:   "#2563EB",
  },
  {
    title:    "How to Start a Startup in India (Step-by-Step Guide 2026)",
    excerpt:  "From idea validation to DPIIT registration to raising your first round — the complete operational playbook for first-time founders in India, with real examples and actual costs.",
    slug:     "/blog/how-to-start-startup-india-2026",
    category: "FOUNDER PLAYBOOK",
    date:     "March 2026",
    readTime: "14 min",
    img:      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&q=80&auto=format",
    tag:      "New",
    accent:   "#D97706",
  },
]

const GRID_POSTS = [
  {
    title:    "10 Best Indian Startup Founders to Follow in 2026",
    excerpt:  "Philosophies, playbooks, and patterns of India's most influential builders — from Alakh Pandey to Nithin Kamath to Kunal Shah.",
    slug:     "/blog/best-indian-startup-founders-to-follow-2026",
    category: "FOUNDER PROFILES",
    date:     "March 2026",
    readTime: "18 min",
    img:      "https://media.licdn.com/dms/image/v2/D5612AQGfFSvn9o_bfQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1696065814097?e=2147483647&v=beta&t=Y1m22xcvOnMrRh33yrvsi5-SwW_0Gdyants9fS5-aAg",
    accent:   "#2563EB",
    accentBg: "#EFF6FF",
  },
  {
    title:    "IND vs NZ Final 2026: 7 Leadership Lessons Every Startup Founder Must Learn",
    excerpt:  "Calm under pressure, team strategy, resilience — seven principles born from the crease that define both great captains and great founders.",
    slug:     "/blog/leadership-lessons-ind-vs-nz-final-2026",
    category: "LEADERSHIP",
    date:     "March 2026",
    readTime: "7 min",
    img:      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80",
    accent:   "#B45309",
    accentBg: "#FEF3C7",
  },
  {
    title:    "5 Startup Ideas Inspired by the IND vs NZ Final 2026",
    excerpt:  "From AI cricket analytics to youth talent discovery — five businesses someone should build right now, born from the most-watched match of 2026.",
    slug:     "/blog/startup-ideas-inspired-by-ind-vs-nz-final-2026",
    category: "STARTUP IDEAS",
    date:     "March 2026",
    readTime: "6 min",
    img:      "https://thecricketshow.com/wp-content/uploads/2026/03/IND-vs-NZ-1.png",
    accent:   "#059669",
    accentBg: "#ECFDF5",
  },
  {
    title:    "How Nithin Kamath Built Zerodha Without Raising a Rupee",
    excerpt:  "India's largest stockbroker was built bootstrapped with calm, contrarian decisions. The story no MBA teaches.",
    slug:     "/startup/zerodha",
    category: "FOUNDER STORY",
    date:     "February 2026",
    readTime: "5 min",
    img:      "https://img.etimg.com/thumb/width-1200,height-900,imgsize-25110,resizemode-75,msid-126562422/markets/stocks/news/indias-biggest-startup-investment-window-is-now-open-despite-pessimism-says-zerodha-ceo-nithin-kamath.jpg",
    accent:   "#2563EB",
    accentBg: "#EFF6FF",
  },
  {
    title:    "India's AI Ecosystem: Why Sarvam & Krutrim Are Not Building ChatGPT",
    excerpt:  "India's AI startups are solving problems that OpenAI was never designed to solve — 22 languages, 400M thin-file borrowers, rural healthcare. The case for a sovereign AI stack.",
    slug:     "/blog/top-ai-startups-india-2026",
    category: "AI & DEEP TECH",
    date:     "March 2026",
    readTime: "11 min",
    img:      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80&auto=format",
    accent:   "#2563EB",
    accentBg: "#EFF6FF",
  },
  {
    title:    "The 10-Step India Startup Checklist Every First-Time Founder Needs",
    excerpt:  "DPIIT recognition, MVP in 8 weeks, Day-7 retention above 25% — the operational checklist behind India's fastest-growing early-stage companies.",
    slug:     "/blog/how-to-start-startup-india-2026",
    category: "FOUNDER PLAYBOOK",
    date:     "March 2026",
    readTime: "14 min",
    img:      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80&auto=format",
    accent:   "#D97706",
    accentBg: "#FFFBEB",
  },
]

const OPINION_POSTS = [
  { num: "I",    title: "Why India's Startup Valuations Are Being Re-Set — and What It Means for Founders",  category: "Opinion",          date: "Mar 2026", slug: "/blog/india-startup-ecosystem-2026" },
  { num: "II",   title: "The Bootstrapped Advantage: Why 2026 May Be the Best Year to Build Without VC",    category: "Analysis",         date: "Mar 2026", slug: "/blog/how-to-get-startup-funding-india-2026" },
  { num: "III",  title: "Sports Tech in India: The ₹50,000Cr Market That Doesn't Exist Yet",                category: "Sector Deep Dive", date: "Feb 2026", slug: "/blog/startup-ideas-inspired-by-ind-vs-nz-final-2026" },
  { num: "IV",   title: "What the IND vs NZ Final Tells Us About Indian Consumer Attention in 2026",        category: "Trend Watch",      date: "Mar 2026", slug: "/blog/leadership-lessons-ind-vs-nz-final-2026" },
  { num: "V",    title: "Founder-Market Fit: Why Domain Obsession Beats MBA Strategy Every Time",           category: "Strategy",         date: "Mar 2026", slug: "/blog/best-indian-startup-founders-to-follow-2026" },
  { num: "VI",   title: "Bharat Is the New Engine: Why Tier 2 Startups Will Define India's Next Decade",   category: "Trend Watch",      date: "Mar 2026", slug: "/blog/india-startup-ecosystem-2026" },
  { num: "VII",  title: "India Cannot Be a Consumer of AI Built Elsewhere — the Case for Sarvam & Krutrim", category: "AI Opinion",       date: "Mar 2026", slug: "/blog/top-ai-startups-india-2026" },
  { num: "VIII", title: "Why Most First-Time Indian Founders Fail — and the Exact Steps to Avoid It",       category: "Founder Playbook", date: "Mar 2026", slug: "/blog/how-to-start-startup-india-2026" },
]

const ALL_POSTS = [
  { title: "India Startup Ecosystem 2026: State of the Nation",      slug: "/blog/india-startup-ecosystem-2026",                   category: "Annual Report",    date: "Mar 2026", readTime: "20 min" },
  { title: "How to Get Startup Funding in India 2026",               slug: "/blog/how-to-get-startup-funding-india-2026",           category: "Funding Guide",    date: "Mar 2026", readTime: "12 min" },
  { title: "Top Indian Unicorns 2026: Ranked & Profiled",            slug: "/blog/top-indian-unicorns-2026",                       category: "Unicorn Report",   date: "Mar 2026", readTime: "15 min" },
  { title: "25 Best Indian Startup Founders to Follow 2026",         slug: "/blog/best-indian-startup-founders-to-follow-2026",    category: "Founder Profiles", date: "Mar 2026", readTime: "18 min" },
  { title: "IND vs NZ Final 2026: 7 Leadership Lessons",             slug: "/blog/leadership-lessons-ind-vs-nz-final-2026",        category: "Leadership",       date: "Mar 2026", readTime: "7 min"  },
  { title: "5 Startup Ideas Inspired by IND vs NZ Final 2026",       slug: "/blog/startup-ideas-inspired-by-ind-vs-nz-final-2026", category: "Startup Ideas",    date: "Mar 2026", readTime: "6 min"  },
  { title: "Top AI Startups in India (2026 Updated List)",           slug: "/blog/top-ai-startups-india-2026",                     category: "AI & Deep Tech",   date: "Mar 2026", readTime: "11 min" },
  { title: "How to Start a Startup in India (Step-by-Step 2026)",    slug: "/blog/how-to-start-startup-india-2026",                category: "Founder Playbook", date: "Mar 2026", readTime: "14 min" },
]

const CATEGORIES = [
  "All", "Annual Report", "Funding Guide", "Unicorn Report",
  "Founder Profiles", "Leadership", "Startup Ideas",
  "AI & Deep Tech", "Founder Playbook", "Analysis", "Opinion",
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function BlogIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

        /* ─── SHARED TOKENS (mirrors registry) ─── */
        :root {
          --teal: #0D9488;
          --teal-dark: #0F766E;
          --teal-light: #5EEAD4;
          --ink: #0F1A1C;
          --parch: #F2F4F3;
          --parch-dark: #E8EDEC;
          --rule: #C4CCCB;
          --rule2: #D4DCDA;
          --muted: #4A6360;
          --gold: #C59A2E;
        }

        .pf  { font-family: 'Playfair Display', Georgia, serif !important; }

        @keyframes riseIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: none; }
        }
        .ri-0 { animation: riseIn 0.5s 0.00s ease both; }
        .ri-1 { animation: riseIn 0.5s 0.08s ease both; }
        .ri-2 { animation: riseIn 0.5s 0.16s ease both; }
        .ri-3 { animation: riseIn 0.5s 0.24s ease both; }
        .ri-4 { animation: riseIn 0.5s 0.32s ease both; }

        /* ─── HERO — exact registry pattern ─── */
        .blog-hero {
          position: relative;
          background: linear-gradient(135deg, rgba(15,26,28,0.88) 0%, rgba(15,26,28,0.75) 100%);
          overflow: hidden;
          border-bottom: 1px solid var(--rule);
        }
        .blog-hero-bg {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background-image: url('https://img.freepik.com/free-vector/hand-drawn-twitch-banner-template-school-graduation_23-2150237117.jpg?semt=ais_hybrid&w=740&q=80');
          background-size: cover; background-position: center 40%;
          opacity: 0.22; z-index: 0;
        }
        .blog-hero-bg::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(15,26,28,0.85) 0%, rgba(15,26,28,0.5) 50%, rgba(15,26,28,0.85) 100%);
        }
        .blog-hero::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #0F766E 0%, #0D9488 50%, #5EEAD4 100%); z-index: 2;
        }
        .blog-mast { position: relative; z-index: 2; }
        .blog-mast-content {
          position: relative; z-index: 10; text-align: center;
          padding: 100px 24px 80px;
        }
        .blog-eyebrow {
          font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.32em;
          color: rgba(94,234,212,0.85); margin-bottom: 16px; font-family: system-ui, sans-serif;
          display: block;
        }
        .blog-mast-h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(40px, 6vw, 68px); font-weight: 900;
          letter-spacing: -0.02em; color: white; line-height: 1.05;
          text-shadow: 0 2px 12px rgba(0,0,0,0.3); margin-bottom: 20px;
        }
        .blog-mast-h1 em {
          font-style: italic; color: var(--teal-light);
        }
        .blog-mast-rule {
          display: block; width: 200px; height: 2px;
          background: linear-gradient(90deg, transparent, var(--teal), var(--teal-light), var(--teal), transparent);
          margin: 20px auto 24px;
        }
        .blog-mast-tagline {
          font-family: Georgia, serif; font-size: 16px; color: rgba(255,255,255,0.88);
          font-style: italic; line-height: 1.7; max-width: 600px; margin: 0 auto 28px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        .blog-live-badge {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.12); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.25); padding: 10px 28px; border-radius: 100px;
        }
        .blog-live-dot {
          width: 8px; height: 8px; border-radius: 50%; background: var(--teal-light);
          animation: pulse 2s infinite;
        }
        .blog-live-text {
          font-family: system-ui, sans-serif; font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.2em; color: white;
        }
        @keyframes pulse {
          0%   { box-shadow: 0 0 0 0 rgba(94,234,212,0.4); }
          70%  { box-shadow: 0 0 0 8px rgba(94,234,212,0); }
          100% { box-shadow: 0 0 0 0 rgba(94,234,212,0); }
        }

        /* ─── CATEGORY TABS (mirrors registry nav) ─── */
        .cat-tabs {
          display: flex; overflow-x: auto; border-bottom: 1px solid var(--rule2);
          scrollbar-width: none; background: white; padding: 0 24px;
        }
        .cat-tabs::-webkit-scrollbar { display: none; }
        .cat-tab {
          flex-shrink: 0; padding: 14px 20px; font-family: system-ui, sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: #999; text-decoration: none; border-bottom: 2px solid transparent;
          transition: all 0.2s; white-space: nowrap; cursor: pointer;
        }
        .cat-tab:hover { color: var(--ink); }
        .cat-tab.on { color: var(--teal); border-bottom-color: var(--teal); }

        /* ─── PAGE SHELL ─── */
        .page-root {
          min-height: 100vh;
          background: var(--parch);
          font-family: 'Georgia', 'Times New Roman', serif;
        }

        /* ─── SECTION HEADERS ─── */
        .sh { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
        .sh-l {
          font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3em;
          color: #AAA; font-family: system-ui, sans-serif; white-space: nowrap;
        }
        .sh-r { flex: 1; height: 1px; background: var(--rule2); }

        /* ─── IMAGE ZOOM ─── */
        .imgf { position: relative; overflow: hidden; }
        .imgf img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center; transition: transform .6s ease;
        }
        .imgf:hover img { transform: scale(1.04); }

        /* ─── CARD HOVER ─── */
        .card-hover { transition: transform .15s ease, box-shadow .15s ease; text-decoration: none; display: block; }
        .card-hover:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0 var(--ink); z-index: 1; position: relative; }

        /* ─── HERO POST GRID ─── */
        .hero-grid {
          display: grid; grid-template-columns: 1fr 420px;
          border: 1.5px solid var(--ink); overflow: hidden; background: #FDFCF9;
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-img-col { height: 220px !important; border-left: none !important; border-top: 1.5px solid var(--ink) !important; order: -1; }
        }

        /* ─── SECONDARY GRID ─── */
        .sec-grid {
          display: grid; grid-template-columns: repeat(4,1fr);
          border: 1.5px solid var(--ink); background: var(--ink); gap: 1.5px;
        }
        @media (max-width: 1100px) { .sec-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px)  { .sec-grid { grid-template-columns: 1fr !important; } }

        /* ─── MAIN 2-COL ─── */
        .main-grid {
          display: grid; grid-template-columns: 1fr 320px;
          gap: clamp(14px, 2vw, 22px); align-items: start;
        }
        @media (max-width: 900px) { .main-grid { grid-template-columns: 1fr !important; } }

        /* ─── ARTICLE GRID 3×2 ─── */
        .grid-6 {
          display: grid; grid-template-columns: repeat(3,1fr);
          border: 1.5px solid var(--ink); background: var(--ink); gap: 1.5px;
        }
        @media (max-width: 900px) { .grid-6 { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px) { .grid-6 { grid-template-columns: 1fr !important; } }

        /* ─── ARCHIVE TABLE ─── */
        .arch-row {
          display: grid; grid-template-columns: 1fr 145px 85px 70px;
          align-items: center; gap: 16px; padding: 13px 16px;
          border-bottom: 1px solid var(--rule2); text-decoration: none;
          background: #FDFCF9; transition: background .12s, padding-left .15s;
        }
        .arch-row:last-child { border-bottom: none; }
        .arch-row:hover { background: #EDE9DF; padding-left: 22px; }
        @media (max-width: 640px) { .arch-row { grid-template-columns: 1fr !important; } .arch-meta { display: none !important; } }

        /* ─── OPINION ROWS ─── */
        .op-row {
          display: flex; align-items: flex-start; gap: 14px; padding: 14px 0;
          border-bottom: 1px solid var(--rule2); text-decoration: none; transition: padding-left .15s;
        }
        .op-row:last-child { border-bottom: none; padding-bottom: 0; }
        .op-row:hover { padding-left: 6px; }

        /* ─── TAGS ─── */
        .tag-badge {
          display: inline-block; font-size: 7px; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase; padding: 2px 8px; font-family: system-ui, sans-serif;
        }
        .tag-trending    { background: #FEFCE8; color: #854D0E; border: 1px solid rgba(133,77,14,.25); }
        .tag-new         { background: #EFF6FF; color: #1D4ED8; border: 1px solid rgba(29,78,216,.25); }
        .tag-mustread    { background: #FEF3C7; color: #92400E; border: 1px solid rgba(180,83,9,.30); }
        .tag-hightraffic { background: #F0FDF4; color: #15803D; border: 1px solid rgba(21,128,61,.25); }

        /* ─── DARK NL BOX ─── */
        .nl-box {
          background: linear-gradient(135deg, var(--ink) 0%, #1A2A2C 100%);
          position: relative; overflow: hidden;
          padding: clamp(16px, 2.8vw, 28px);
        }
        .nl-box::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #0F766E, #0D9488, #5EEAD4, #0D9488, #0F766E);
        }

        /* ─── STATS TICKER ─── */
        .ticker-wrap {
          display: flex; overflow: hidden; flex-wrap: wrap;
          border: 1.5px solid var(--ink); background: var(--ink);
        }
        .ticker-item {
          padding: 14px 24px; border-right: 1px solid rgba(255,255,255,.07);
          flex: 1; text-align: center; min-width: 90px;
        }

        /* ─── CTA BLOCK (mirrors registry) ─── */
        .cta-block {
          background: linear-gradient(135deg, var(--ink) 0%, #1A2A2C 100%);
          border-radius: 20px; padding: 36px 44px;
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: space-between; gap: 24px; margin-top: 48px;
          position: relative; overflow: hidden;
        }
        .cta-block::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #0F766E, #0D9488, #5EEAD4, #0D9488, #0F766E);
        }
        .cta-ey {
          font-size: 8.5px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.3em;
          color: rgba(94,234,212,0.7); margin-bottom: 8px; font-family: system-ui, sans-serif;
        }
        .cta-h {
          font-family: 'Playfair Display', Georgia, serif; font-size: 19px;
          font-weight: 700; color: white; margin-bottom: 6px;
        }
        .cta-p { font-size: 12px; color: rgba(255,255,255,0.45); font-style: italic; }
        .cta-btn {
          flex-shrink: 0; display: inline-flex; align-items: center; gap: 10px;
          background: var(--teal); color: white; padding: 13px 28px;
          font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;
          text-decoration: none; border-radius: 40px; transition: all 0.2s;
        }
        .cta-btn:hover { background: var(--teal-dark); transform: translateY(-2px); }

        /* ─── LINKS GRID ─── */
        .links-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
          margin-top: 36px; padding-top: 36px; border-top: 1px solid var(--rule2);
        }
        @media (max-width: 700px) { .links-grid { grid-template-columns: repeat(2, 1fr); } }
        .link-card {
          padding: 12px 14px; border-radius: 12px; border: 1px solid var(--rule2);
          background: white; text-decoration: none; transition: all 0.2s;
        }
        .link-card:hover { border-color: var(--teal); transform: translateY(-1px); }
        .link-title {
          font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--ink); display: flex; align-items: center; gap: 5px;
          margin-bottom: 4px; font-family: system-ui, sans-serif;
        }
        .link-desc { font-size: 10px; color: #AAA; font-family: system-ui, sans-serif; }

        /* ─── MAIN WRAP ─── */
        .main-wrap { max-width: 1300px; margin: 0 auto; padding: 32px 24px 56px; }

        @media (max-width: 768px) {
          .blog-mast-content { padding: 120px 20px 70px !important; }
          .blog-mast-tagline br { display: none; }
          .main-wrap { padding: 24px 16px 40px; }
          .cta-block { padding: 24px 20px; }
        }
        @media (max-width: 480px) {
          .blog-mast-content { padding: 100px 16px 60px !important; }
          .blog-mast-h1 { font-size: 36px; }
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: var(--rule); }
      `}</style>

      <div className="page-root">

        {/* ── HERO — exact registry pattern ── */}
        <div className="blog-hero">
          <div className="blog-hero-bg" />
          <div className="blog-mast">
            <div className="blog-mast-content ri-0">
              <span className="blog-eyebrow">UpForge · Independent Startup Intelligence</span>
              <h1 className="blog-mast-h1">
                The <em>Forge</em>
              </h1>
              <span className="blog-mast-rule" />
              <p className="blog-mast-tagline">
                Startup analysis, founder stories &amp; strategy<br />for India's builders — March 2026
              </p>
              <div className="blog-live-badge">
                <span className="blog-live-dot" />
                <span className="blog-live-text">Live · 8 Articles · Updated March 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CATEGORY TABS ── */}
        <nav className="cat-tabs" aria-label="Browse by category">
          <span style={{ fontSize: 9, color: "#CCC", textTransform: "uppercase", letterSpacing: ".2em", padding: "14px 8px 14px 0", flexShrink: 0, fontFamily: "system-ui, sans-serif" }}>
            Browse:
          </span>
          {CATEGORIES.map((cat, i) => (
            <span key={i} className={`cat-tab${i === 0 ? " on" : ""}`}>{cat}</span>
          ))}
        </nav>

        {/* ── MAIN CONTENT ── */}
        <main className="main-wrap">

          {/* ── HERO POST ── */}
          <section aria-label="Cover story" className="ri-1">
            <div className="sh">
              <span style={{ color: "var(--teal)", fontSize: 12 }}>◆</span>
              <span className="sh-l">Cover Story · Most Comprehensive</span>
              <div className="sh-r" />
            </div>
            <Link href={HERO_POST.slug} className="card-hover" style={{ display: "block" }}>
              <div className="hero-grid">
                <div style={{ padding: "clamp(16px,2.4vw,30px)", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#FDFCF9" }}>
                  <div>
                    <div style={{ height: 3, background: `linear-gradient(90deg,#0F766E,${HERO_POST.accent},#E8C547,${HERO_POST.accent},#0F766E)`, marginBottom: 14 }} />
                    <div className="flex items-center gap-3 mb-3" style={{ fontFamily: "system-ui,sans-serif" }}>
                      <span className="text-[8px] font-black tracking-[0.26em] uppercase px-3 py-1.5 text-white" style={{ background: HERO_POST.accent }}>{HERO_POST.category}</span>
                      <span className="tag-badge tag-mustread">{HERO_POST.tag}</span>
                      <span className="text-[8.5px] text-[#AAA] uppercase tracking-wider" style={{ fontFamily: "system-ui,sans-serif" }}>{HERO_POST.date}</span>
                    </div>
                    <h2 className="pf font-black leading-[1.06] mb-4" style={{ fontSize: "clamp(1.5rem,3.2vw,2.6rem)", color: "var(--ink)" }}>{HERO_POST.title}</h2>
                    <div style={{ width: 40, height: 3, background: HERO_POST.accent, marginBottom: 12 }} />
                    <p className="italic leading-[1.78] mb-4" style={{ fontSize: "clamp(13px,1.6vw,15px)", color: "#5A4A30", maxWidth: 520 }}>{HERO_POST.subtitle}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {HERO_POST.topics.map(t => (
                        <span key={t} className="text-[8px] uppercase tracking-wider" style={{ color: "#6B5C40", border: "1px solid var(--rule2)", padding: "3px 9px", background: "var(--parch)", fontFamily: "system-ui,sans-serif" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: "1px solid var(--rule2)", fontFamily: "system-ui,sans-serif" }}>
                    <div className="flex gap-4 items-center">
                      <span className="text-[8.5px] text-[#AAA] uppercase tracking-wider">{HERO_POST.date}</span>
                      <span style={{ color: "var(--rule)", fontSize: 10 }}>·</span>
                      <span className="text-[8.5px] text-[#AAA] uppercase tracking-wider">{HERO_POST.readTime} read</span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider flex items-center gap-1" style={{ color: HERO_POST.accent, fontFamily: "system-ui,sans-serif" }}>
                      Read Report <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                    </span>
                  </div>
                </div>
                <div className="hero-img-col imgf" style={{ minHeight: 340, borderLeft: "1.5px solid var(--ink)" }}>
                  <img src={HERO_POST.img} alt={HERO_POST.title} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, transparent 55%, rgba(15,26,28,.1) 100%)" }} />
                </div>
              </div>
            </Link>
          </section>

          {/* ── SECONDARY — 4-col ── */}
          <section aria-label="Essential reads" className="ri-2" style={{ marginTop: "clamp(14px,2vw,20px)" }}>
            <div className="sh">
              <span className="sh-l">Essential Reads · High Traffic · New</span>
              <div className="sh-r" />
            </div>
            <div className="sec-grid">
              {SECONDARY_POSTS.map((post, i) => (
                <Link key={i} href={post.slug} className="card-hover" style={{ background: "#FDFCF9", display: "flex", flexDirection: "column" }}>
                  <div className="imgf" style={{ height: "clamp(110px,12vw,150px)", borderBottom: "1px solid var(--rule2)", flexShrink: 0 }}>
                    <img src={post.img} alt={post.title} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,26,28,.65) 0%, transparent 55%)" }} />
                    <div style={{ position: "absolute", top: 12, left: 14, display: "flex", gap: 7, alignItems: "center" }}>
                      <span className="text-[7.5px] font-black tracking-[0.18em] uppercase px-2 py-1 text-white" style={{ background: post.accent, fontFamily: "system-ui,sans-serif" }}>{post.category}</span>
                      <span className={`tag-badge ${post.tag === "New" ? "tag-new" : post.tag === "Trending" ? "tag-trending" : "tag-hightraffic"}`}>{post.tag}</span>
                    </div>
                    <div style={{ position: "absolute", bottom: 10, right: 14 }}>
                      <span className="text-[8px] text-white/50 uppercase tracking-wider" style={{ fontFamily: "system-ui,sans-serif" }}>{post.readTime} read</span>
                    </div>
                  </div>
                  <div style={{ padding: "clamp(10px,1.4vw,14px)", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 className="pf font-bold leading-[1.2] mb-2" style={{ fontSize: "clamp(.9rem,1.5vw,1.1rem)", color: "var(--ink)" }}>{post.title}</h3>
                    <p className="italic leading-[1.72] flex-1 mb-3" style={{ fontSize: "clamp(11px,1.1vw,12.5px)", color: "#5A4A30", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid var(--rule2)", fontFamily: "system-ui,sans-serif" }}>
                      <span className="text-[8.5px] text-[#AAA] uppercase tracking-wider">{post.date}</span>
                      <span className="text-[8.5px] font-black uppercase tracking-wider flex items-center gap-1" style={{ color: post.accent }}>
                        Read <ArrowRight className="w-2.5 h-2.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── MAIN 2-COL ── */}
          <div className="main-grid ri-3" style={{ marginTop: "clamp(14px,2.2vw,22px)" }}>

            {/* LEFT: 6-card grid */}
            <div>
              <div className="sh">
                <span className="sh-l">Latest Articles — {GRID_POSTS.length} Articles</span>
                <div className="sh-r" />
              </div>
              <div className="grid-6">
                {GRID_POSTS.map((post, i) => (
                  <Link key={i} href={post.slug} className="card-hover" style={{ background: "#FDFCF9", display: "flex", flexDirection: "column" }}>
                    <div className="imgf" style={{ height: 110, borderBottom: "1px solid var(--rule2)", flexShrink: 0 }}>
                      <img src={post.img} alt={post.title} />
                      <div style={{ position: "absolute", inset: 0, background: "rgba(15,26,28,.1)" }} />
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: post.accent }} />
                      <div style={{ position: "absolute", bottom: 8, left: 10 }}>
                        <span className="text-[7px] font-black tracking-[0.18em] uppercase" style={{ color: "#E8C547", fontFamily: "system-ui,sans-serif" }}>{post.category}</span>
                      </div>
                    </div>
                    <div style={{ padding: "10px 12px 12px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <h4 className="pf font-bold leading-[1.22] mb-2 flex-1" style={{ fontSize: "clamp(0.82rem,1.1vw,0.92rem)", color: "var(--ink)" }}>{post.title}</h4>
                      <p className="leading-[1.6] mb-3" style={{ fontSize: 11, color: "#5A4A30", fontFamily: "'Georgia',serif", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{post.excerpt}</p>
                      <div className="flex items-center justify-between" style={{ fontFamily: "system-ui,sans-serif" }}>
                        <span className="text-[8px] text-[#AAA] uppercase tracking-wider">{post.readTime}</span>
                        <span className="text-[8px] font-black" style={{ color: post.accent }}>→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT: opinion + CTA */}
            <div>
              <div className="sh">
                <span className="sh-l">Analysis &amp; Opinion</span>
                <div className="sh-r" />
              </div>
              <div style={{ border: "1.5px solid var(--ink)", background: "#FDFCF9" }}>
                <div style={{ background: "linear-gradient(135deg, var(--ink) 0%, #1A2A2C 100%)", padding: "14px 18px", position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #0F766E, #0D9488, #5EEAD4)" }} />
                  <p className="pf font-bold text-white italic" style={{ fontSize: "1rem", lineHeight: 1.25 }}>The UpForge<br />Perspective</p>
                  <p className="text-[8px] uppercase tracking-[0.16em] mt-1.5" style={{ color: "rgba(94,234,212,.5)", fontFamily: "system-ui,sans-serif" }}>India · Startups · 2026</p>
                </div>
                <div style={{ padding: "6px 18px 18px" }}>
                  {OPINION_POSTS.map((op, i) => (
                    <Link key={i} href={op.slug} className="op-row">
                      <span className="pf font-black italic flex-shrink-0" style={{ fontSize: "1.05rem", color: "var(--rule)", lineHeight: 1, width: 28, marginTop: 2 }}>{op.num}</span>
                      <div style={{ flex: 1 }}>
                        <span className="text-[7.5px] font-black uppercase tracking-[0.14em] block mb-1" style={{ color: "var(--teal)", fontFamily: "system-ui,sans-serif" }}>{op.category}</span>
                        <p className="pf font-bold leading-[1.28] mb-1" style={{ fontSize: "0.84rem", color: "var(--ink)" }}>{op.title}</p>
                        <span className="text-[8px] uppercase tracking-wider" style={{ color: "#AAA", fontFamily: "system-ui,sans-serif" }}>{op.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar CTA — mirrors registry sidebar dark box */}
              <div style={{ marginTop: 12, background: "linear-gradient(135deg, var(--ink) 0%, #1A2A2C 100%)", padding: "20px 18px", border: "1.5px solid transparent", borderRadius: 16, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #0F766E, #0D9488, #5EEAD4)" }} />
                <p className="text-[8px] font-black uppercase tracking-[0.24em] mb-2" style={{ color: "rgba(94,234,212,.6)", fontFamily: "system-ui,sans-serif" }}>Free AI Tool</p>
                <p className="pf font-bold text-white leading-[1.3] mb-2" style={{ fontSize: "1rem" }}>Startup Valuation<br /><em style={{ color: "var(--teal-light)" }}>Report — Free</em></p>
                <p className="leading-relaxed mb-4" style={{ fontSize: 10.5, color: "rgba(255,255,255,.4)", fontFamily: "system-ui,sans-serif" }}>AI-powered analysis benchmarked against 500+ Indian startups. Takes 3 minutes.</p>
                <Link href="/report" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "var(--teal)", padding: "10px", fontFamily: "system-ui,sans-serif", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "white", textDecoration: "none", borderRadius: 10 }}>
                  Generate Free Report <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* ── ALL PUBLISHED ARTICLES ── */}
          <section aria-label="All published articles" className="ri-4" style={{ marginTop: "clamp(18px,2.8vw,30px)" }}>
            <div className="sh">
              <span style={{ color: "var(--teal)", fontSize: 12 }}>◆</span>
              <span className="sh-l">All Published Articles — {ALL_POSTS.length} Articles · March 2026</span>
              <div className="sh-r" />
            </div>
            <div style={{ border: "1.5px solid var(--ink)", background: "var(--ink)", display: "flex", flexDirection: "column", gap: "1.5px" }}>
              <div style={{ background: "var(--ink)", padding: "8px 16px", display: "grid", gridTemplateColumns: "1fr 145px 85px 70px", gap: 16, fontFamily: "system-ui,sans-serif" }}>
                {["Article", "Category", "Published", "Read Time"].map(h => (
                  <span key={h} className="text-[7.5px] font-black uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,.28)" }}>{h}</span>
                ))}
              </div>
              {ALL_POSTS.map((post, i) => (
                <Link key={i} href={post.slug} className="arch-row">
                  <p className="pf font-bold leading-[1.3]" style={{ fontSize: 13, color: "var(--ink)", margin: 0 }}>{post.title}</p>
                  <span className="arch-meta text-[9px] uppercase tracking-wider text-center" style={{ color: "var(--teal-dark)", border: "1px solid rgba(13,148,136,.3)", padding: "2px 8px", fontFamily: "system-ui,sans-serif" }}>{post.category}</span>
                  <span className="arch-meta text-[9px] text-[#6B5C40]" style={{ fontFamily: "system-ui,sans-serif" }}>{post.date}</span>
                  <span className="arch-meta text-[9px] text-[#AAA]" style={{ fontFamily: "system-ui,sans-serif" }}>{post.readTime}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── STATS TICKER ── */}
          <section aria-label="UpForge key statistics" style={{ marginTop: "clamp(14px,2.5vw,24px)" }}>
            <div className="ticker-wrap">
              {[
                { v: "8",      l: "Articles Published" },
                { v: "650K+",  l: "Registered Startups" },
                { v: "125+",   l: "Indian Unicorns"      },
                { v: "₹950B",  l: "Value Tracked"        },
                { v: "$3.44B", l: "Q1 2026 Funding"      },
              ].map((s, i) => (
                <div key={i} className="ticker-item">
                  <p className="pf font-black text-white leading-none mb-1" style={{ fontSize: "1.4rem" }}>{s.v}</p>
                  <p className="text-[7.5px] font-black uppercase tracking-[0.16em]" style={{ color: "rgba(255,255,255,.3)", fontFamily: "system-ui,sans-serif" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA BLOCK (mirrors registry) ── */}
          <div className="cta-block">
            <div>
              <p className="cta-ey">🌍 UpForge · The Forge Blog</p>
              <p className="cta-h">India's most-read startup analysis. Free. Forever.</p>
              <p className="cta-p">8 in-depth articles — AI guides, funding playbooks, unicorn profiles, and ecosystem reports.</p>
            </div>
            <Link href="/submit" className="cta-btn">
              Submit Your Startup <ArrowRight size={13} />
            </Link>
          </div>

          {/* ── INTERNAL LINKS ── */}
          <div className="links-grid">
            {[
              { l: "Global Registry →",         h: "https://www.upforge.org/registry", desc: "Full verified database"     },
              { l: "Indian Unicorns 2026 →",     h: "/blog/top-indian-unicorns-2026",   desc: "All 125 unicorns profiled"  },
              { l: "Top AI Startups 2026 →",     h: "/blog/top-ai-startups-india-2026", desc: "Sarvam, Krutrim & more"    },
              { l: "Submit Your Startup →",      h: "/submit",                          desc: "Get listed + UFRN free"    },
            ].map(lnk => (
              <Link key={lnk.h} href={lnk.h} className="link-card">
                <span className="link-title">{lnk.l}</span>
                <span className="link-desc">{lnk.desc}</span>
              </Link>
            ))}
          </div>

          {/* ── FOOTER ── */}
          <footer style={{ borderTop: "1px solid var(--rule2)", paddingTop: "1rem", marginTop: 32 }}>
            <p style={{ fontSize: "8.5px", lineHeight: 1.7, color: "#AAA", fontFamily: "system-ui,sans-serif" }}>
              * Article data sourced from Inc42, Forbes India, Hurun India 2025, Tracxn, and company announcements as of March 2026.
              UpForge is an independent registry — no paid placements, no sponsored rankings.
            </p>
            <nav aria-label="Footer navigation" style={{ marginTop: 16 }}>
              <ul style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", listStyle: "none", margin: 0, padding: 0 }}>
                {[
                  { l: "The Founder Chronicle",       h: "/"                                                      },
                  { l: "Global Registry",             h: "https://www.upforge.org/registry"                       },
                  { l: "Indian Unicorns 2026",        h: "/blog/top-indian-unicorns-2026"                         },
                  { l: "Startup Funding Guide",       h: "/blog/how-to-get-startup-funding-india-2026"            },
                  { l: "Founders to Follow 2026",     h: "/blog/best-indian-startup-founders-to-follow-2026"      },
                  { l: "Top AI Startups India 2026",  h: "/blog/top-ai-startups-india-2026"                       },
                  { l: "How to Start a Startup",      h: "/blog/how-to-start-startup-india-2026"                  },
                  { l: "Free Valuation Tool",         h: "/report"                                                 },
                  { l: "Submit Startup",              h: "/submit"                                                 },
                ].map(lnk => (
                  <li key={lnk.h}>
                    <Link href={lnk.h} style={{ fontSize: "8.5px", color: "#AAA", textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none", fontFamily: "system-ui,sans-serif", transition: "color 0.2s" }}>
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
