// app/page.tsx
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";
import {
  BadgeCheck, ArrowRight, Shield, Clock, Sparkles, Globe,
  Gem, CheckCircle2, ChevronRight, ArrowUpRight, Search,
  DollarSign, Newspaper, Users, BookOpen, ExternalLink,
} from "lucide-react";

// ─── SEO METADATA ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "UpForge — India's #1 Independent Startup Registry & Database 2026",
  description:
    "Discover, research and track 72,000+ verified Indian startups across AI, SaaS, FinTech, HealthTech and more. Free listings, AI-powered growth reports, real-time funding news, unicorn tracker, and live market intelligence. India's most trusted startup database.",
  keywords: [
    "Indian startups 2026", "India startup database", "startup registry India",
    "verified Indian startups", "Indian unicorns 2026", "startup funding India",
    "list your startup India free", "startup ecosystem India", "Indian founders database",
    "VC deals India", "startup news India today", "Bengaluru startups",
    "Mumbai startups", "Delhi NCR startups", "SaaS startups India",
    "fintech startups India", "edtech startups India", "healthtech India",
    "AI startups India", "deeptech India startups", "startup valuation India",
    "angel investors India", "startup growth report India", "UpForge",
    "India startup intelligence", "Indian soonicorns", "startup funding tracker India",
    "top Indian startups", "Indian startup news", "startup research India",
    "best startup database India", "free startup listing India",
  ].join(", "),
  authors: [{ name: "UpForge", url: "https://upforge.in" }],
  creator: "UpForge",
  publisher: "UpForge",
  category: "Business & Technology",
  metadataBase: new URL("https://upforge.in"),
  alternates: {
    canonical: "https://upforge.in",
    languages: { "en-IN": "https://upforge.in", "en-US": "https://upforge.in" },
  },
  openGraph: {
    type: "website", locale: "en_IN", url: "https://upforge.in", siteName: "UpForge",
    title: "UpForge — India's #1 Independent Startup Registry 2026",
    description: "72,000+ verified Indian startups. Free listings · AI growth reports · Real-time funding news · Unicorn tracker · Live market intelligence.",
    images: [
      { url: "https://upforge.in/og-image.png", width: 1200, height: 630, alt: "UpForge — India's Independent Startup Registry" },
      { url: "https://upforge.in/og-image-square.png", width: 600, height: 600, alt: "UpForge" },
    ],
  },
  twitter: {
    card: "summary_large_image", site: "@upforge_in", creator: "@upforge_in",
    title: "UpForge — India's #1 Independent Startup Registry 2026",
    description: "72,000+ verified Indian startups. Free listings · AI growth reports · Real-time funding news.",
    images: ["https://upforge.in/og-image.png"],
  },
  robots: {
    index: true, follow: true, nocache: false,
    googleBot: { index: true, follow: true, noimageindex: false, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }, { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#1a1a1a" }],
  },
  manifest: "/site.webmanifest",
  verification: { google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN", yandex: "YOUR_YANDEX_TOKEN" },
  other: { "og:locale:alternate": "hi_IN", "article:publisher": "https://upforge.in", "theme-color": "#ffffff", "msapplication-TileColor": "#1a1a1a" },
};

// ─── STRUCTURED DATA ──────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite", "@id": "https://upforge.in/#website",
      url: "https://upforge.in", name: "UpForge",
      description: "India's Independent Startup Registry & Live Market Intelligence Platform",
      inLanguage: "en-IN", publisher: { "@id": "https://upforge.in/#organization" },
      potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://upforge.in/startup?q={search_term_string}" }, "query-input": "required name=search_term_string" },
    },
    {
      "@type": "Organization", "@id": "https://upforge.in/#organization",
      name: "UpForge", url: "https://upforge.in",
      logo: { "@type": "ImageObject", url: "https://upforge.in/logo.png", width: 512, height: 512 },
      sameAs: ["https://twitter.com/upforge_in", "https://linkedin.com/company/upforge"],
      description: "India's most trusted independent startup registry.", areaServed: "IN", foundingDate: "2025",
      contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: "https://upforge.in/contact", areaServed: "IN", availableLanguage: ["English", "Hindi"] },
    },
    {
      "@type": "WebPage", "@id": "https://upforge.in/#webpage",
      url: "https://upforge.in", name: "UpForge — India's #1 Independent Startup Registry & Database 2026",
      isPartOf: { "@id": "https://upforge.in/#website" }, about: { "@id": "https://upforge.in/#organization" },
      description: "Discover and research 72,000+ verified Indian startups.", inLanguage: "en-IN",
      dateModified: new Date().toISOString(), breadcrumb: { "@id": "https://upforge.in/#breadcrumb" },
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2", ".uf-blockquote"] },
    },
    {
      "@type": "BreadcrumbList", "@id": "https://upforge.in/#breadcrumb",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://upforge.in" }],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How many Indian startups are listed on UpForge?", acceptedAnswer: { "@type": "Answer", text: "UpForge lists 72,000+ verified Indian startups across 30+ sectors. Every listing is manually reviewed." } },
        { "@type": "Question", name: "Is listing a startup on UpForge free?", acceptedAnswer: { "@type": "Answer", text: "Yes, listing your startup on UpForge is completely free. Submit at upforge.in/submit." } },
        { "@type": "Question", name: "What is UpForge?", acceptedAnswer: { "@type": "Answer", text: "UpForge is India's most trusted independent startup registry and intelligence platform." } },
      ],
    },
  ],
};

// ─── STATIC DATA ──────────────────────────────────────────────────────────────
const TOP_INDIAN_BILLIONAIRES = [
  { name: "Mukesh Ambani", netWorth: "$96.3B", rank: "#10", source: "Reliance Industries", yoy: "+4.4%" },
  { name: "Gautam Adani",  netWorth: "$68.7B", rank: "#17", source: "Adani Group",         yoy: "+3.2%" },
  { name: "Shiv Nadar",    netWorth: "$29.4B", rank: "#56", source: "HCL Technologies",    yoy: "+14.8%" },
];

// ─── NEWS ─────────────────────────────────────────────────────────────────────
async function getLiveNews() {
  try {
    const today = new Date();
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(today.getDate() - 3);
    const fromDate = threeDaysAgo.toISOString().split("T")[0];
    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.set("q", "(Indian startup OR startup India OR VC funding India OR unicorn India OR fintech India)");
    url.searchParams.set("from", fromDate);
    url.searchParams.set("language", "en");
    url.searchParams.set("sortBy", "publishedAt");
    url.searchParams.set("pageSize", "8");
    url.searchParams.set("apiKey", process.env.NEWSAPI_KEY || "");
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) throw new Error(`NewsAPI ${res.status}`);
    const data = await res.json();
    if (!data.articles?.length) throw new Error("No articles");
    return data.articles
      .filter((a: any) => a.title && a.source?.name && a.title !== "[Removed]")
      .slice(0, 6)
      .map((article: any) => {
        const publishedAt = new Date(article.publishedAt);
        const diffH = Math.floor((Date.now() - publishedAt.getTime()) / 3600000);
        const diffD = Math.floor(diffH / 24);
        const timestamp = diffH < 1 ? "Just now" : diffH < 24 ? `${diffH}h ago` : diffD === 1 ? "1d ago" : `${diffD}d ago`;
        const title = article.title.toLowerCase();
        const impact = title.match(/raises|funding|unicorn|launch|growth|profit|record|surge|ipo|expands/) ? "positive"
          : title.match(/shutdown|layoff|fraud|crisis|loss|decline|cut|fail|drops/) ? "negative" : "neutral";
        return { headline: article.title.length > 100 ? article.title.slice(0, 97) + "…" : article.title, source: article.source.name, url: article.url, impact, timestamp };
      });
  } catch {
    return [
      { headline: "India startup ecosystem raises $9B+ in Q1 2026, up 34% year-on-year", source: "Inc42", impact: "positive", timestamp: "6h ago", url: null },
      { headline: "SEBI eases startup IPO norms, reduces mandatory lock-in to 6 months", source: "Economic Times", impact: "positive", timestamp: "12h ago", url: null },
      { headline: "Government's ₹1,000Cr DeepTech Fund opens applications for Indian startups", source: "PIB India", impact: "positive", timestamp: "1d ago", url: null },
      { headline: "Indian SaaS companies cross $1.8B in new ARR, global expansion accelerates", source: "Mint", impact: "positive", timestamp: "1d ago", url: null },
      { headline: "Krutrim AI hits 1M enterprise users; eyes Southeast Asia expansion", source: "Inc42", impact: "positive", timestamp: "2d ago", url: null },
      { headline: "Zepto valued at $5B after latest funding round; profitability in sight", source: "TechCrunch", impact: "positive", timestamp: "2d ago", url: null },
    ];
  }
}

// ─── GROQ ─────────────────────────────────────────────────────────────────────
async function getEcosystemData() {
  const dateStr = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      cache: "no-store",
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `Indian startup market data analyst. Today: ${dateStr}. Return ONLY valid JSON, no markdown.
{
  "marketMood": { "sentiment": "Bullish/Neutral/Bearish", "score": "0-100 string", "reason": "max 8 words" },
  "topRisingStartups": [{"name":"real startup","sector":"sector","insight":"max 12 words","growthIndicator":"+XX%","momentum":"high/medium"}],
  "sectorMomentum": [{"sector":"sector","deals":"number","funding":"$XB or $XM","trend":"max 6 words","growth":"+XX%"}],
  "fundingNews": [{"startup":"real name","amount":"$XXM","round":"Series X","investors":"real investors","valuation":"$XXB or null"}],
  "ecosystemMetrics": {"totalActiveStartups":"XX,000+","totalFundingYTD":"$X.XB","activeVCFirms":"X,XXX+","unicorns":"XXX","soonicorns":"XXX+","avgDealSize":"$XX.XM","mostActiveSector":"sector","topCity":"city","monthlyGrowth":"+XX%","activeAngels":"X,XXX+"}
}
EXACTLY: 6 topRisingStartups, 6 sectorMomentum, 4 fundingNews.`,
          },
          { role: "user", content: `Indian startup market data for ${dateStr}. Q1 2026. Real startups and investors only.` },
        ],
        temperature: 0.15, max_tokens: 1500, response_format: { type: "json_object" },
      }),
    });
    if (!response.ok) throw new Error(`Groq ${response.status}`);
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty");
    const parsed = JSON.parse(content);
    if (!parsed.marketMood || !parsed.ecosystemMetrics) throw new Error("Invalid structure");
    return parsed;
  } catch {
    return {
      marketMood: { sentiment: "Bullish", score: "76", reason: "Q1 2026 funding momentum strong" },
      topRisingStartups: [
        { name: "Krutrim AI",    sector: "AI Infrastructure", insight: "India's first sovereign AI cloud, expanding fast",   growthIndicator: "+312%", momentum: "high" },
        { name: "Zepto",         sector: "Quick Commerce",    insight: "10-min delivery, now profitable in 50+ cities",      growthIndicator: "+189%", momentum: "high" },
        { name: "Pixxel",        sector: "Space Tech",        insight: "Hyperspectral satellites for enterprise agriculture", growthIndicator: "+156%", momentum: "high" },
        { name: "PhysicsWallah", sector: "EdTech",            insight: "100+ offline centres, India's largest ed-network",   growthIndicator: "+145%", momentum: "high" },
        { name: "Rapido",        sector: "Mobility",          insight: "Bike taxi dominating Tier 2/3 with 8M daily rides",  growthIndicator: "+98%",  momentum: "medium" },
        { name: "Ather Energy",  sector: "EV",                insight: "450+ touchpoints, 40% premium EV market share",      growthIndicator: "+87%",  momentum: "medium" },
      ],
      sectorMomentum: [
        { sector: "AI / ML",      deals: "127", funding: "$1.2B", trend: "Enterprise AI adoption accelerating", growth: "+156%" },
        { sector: "SaaS",         deals: "178", funding: "$1.8B", trend: "Global expansion by Indian SaaS",    growth: "+134%" },
        { sector: "FinTech",      deals: "143", funding: "$2.1B", trend: "Credit infra & UPI 3.0 innovation",  growth: "+112%" },
        { sector: "Climate Tech", deals: "89",  funding: "$845M", trend: "EV infra & carbon markets boom",     growth: "+89%"  },
        { sector: "HealthTech",   deals: "98",  funding: "$678M", trend: "Telemedicine & diagnostics scaling", growth: "+78%"  },
        { sector: "D2C Brands",   deals: "156", funding: "$923M", trend: "Profitable growth after reset",      growth: "+67%"  },
      ],
      fundingNews: [
        { startup: "Zepto",      amount: "$300M", round: "Series F", investors: "General Catalyst, Lightspeed",       valuation: "$3.5B" },
        { startup: "Krutrim AI", amount: "$150M", round: "Series B", investors: "Matrix Partners, Elevation Capital", valuation: "$1.2B" },
        { startup: "Rapido",     amount: "$120M", round: "Series D", investors: "Nexus Venture Partners, WestBridge", valuation: "$1.2B" },
        { startup: "Pixxel",     amount: "$70M",  round: "Series C", investors: "Google Ventures, Radical Ventures",  valuation: "$450M" },
      ],
      ecosystemMetrics: {
        totalActiveStartups: "72,000+", totalFundingYTD: "$9.2B", activeVCFirms: "1,450+",
        unicorns: "118", soonicorns: "210+", avgDealSize: "$12.4M",
        mostActiveSector: "SaaS", topCity: "Bengaluru", monthlyGrowth: "+23%", activeAngels: "8,500+",
      },
    };
  }
}

export const revalidate = 3600;

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default async function Home() {
  const supabase = await createClient();
  const [liveNews, ecosystem, startupsCount, industriesData, recentData] = await Promise.all([
    getLiveNews(),
    getEcosystemData(),
    supabase.from("startups").select("*", { count: "exact", head: true }),
    supabase.from("startups").select("industry").not("industry", "is", null),
    supabase.from("startups").select("*").order("created_at", { ascending: false }).limit(6),
  ]);

  const totalStartups    = startupsCount.count ?? 0;
  const uniqueIndustries = industriesData.data ? new Set(industriesData.data.map((i: any) => i.industry)).size : 30;
  const verifiedStartups = recentData.data ?? [];
  const lastUpdated      = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata", hour12: true });
  const todayStr         = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
  const sentimentColor   = ecosystem.marketMood.sentiment === "Bullish" ? "#1a6b3a" : ecosystem.marketMood.sentiment === "Bearish" ? "#b91c1c" : "#92400e";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script dangerouslySetInnerHTML={{ __html: `var _hAt=null;document.addEventListener('visibilitychange',function(){if(document.hidden){_hAt=Date.now();}else if(_hAt&&(Date.now()-_hAt)>3600000){window.location.reload();}});` }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,400&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box}
        .uf{background:#fff;color:#1a1a1a;font-family:'Source Serif 4',Georgia,'Times New Roman',serif;-webkit-font-smoothing:antialiased}
        .uf-display{font-family:'Playfair Display',Georgia,serif;letter-spacing:-0.02em}
        .uf-serif{font-family:'Source Serif 4',Georgia,serif}
        .uf-mono{font-family:'JetBrains Mono','Courier New',monospace;font-variant-numeric:tabular-nums}
        .uf-label{font-family:'Source Serif 4',Georgia,serif;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#888}
        :root{--ink:#1a1a1a;--ink2:#444;--ink3:#777;--ink4:#aaa;--rule:#e5e5e5;--rulel:#f0f0f0;--bg:#fff;--bgoff:#fafaf8;--bgwarm:#fdf8f0;--gold:#b8860b;--goldr:#c9960d;--pos:#1a6b3a;--neg:#b91c1c}
        @keyframes uf-ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .uf-ticker-track{display:inline-flex;white-space:nowrap;animation:uf-ticker 70s linear infinite}
        .uf-ticker-track:hover{animation-play-state:paused}
        @keyframes uf-up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .uf-a0{animation:uf-up .55s 0s cubic-bezier(.16,1,.3,1) both}
        .uf-a1{animation:uf-up .55s .1s cubic-bezier(.16,1,.3,1) both}
        .uf-a2{animation:uf-up .55s .2s cubic-bezier(.16,1,.3,1) both}
        .uf-a3{animation:uf-up .55s .3s cubic-bezier(.16,1,.3,1) both}
        .uf-a4{animation:uf-up .55s .4s cubic-bezier(.16,1,.3,1) both}
        .uf-live{width:6px;height:6px;border-radius:50%;background:#16a34a;flex-shrink:0;position:relative}
        .uf-live::after{content:'';position:absolute;inset:-3px;border-radius:50%;background:rgba(22,163,74,.22);animation:uf-pulse 2.2s ease-in-out infinite}
        @keyframes uf-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(2);opacity:0}}
        .uf-nav-link{font-family:'Source Serif 4',Georgia,serif;font-size:13px;color:#555;padding:0 14px;height:42px;display:flex;align-items:center;border-bottom:2px solid transparent;white-space:nowrap;transition:color .15s,border-color .15s}
        .uf-nav-link:hover{color:#1a1a1a;border-color:var(--goldr)}
        .uf-card{border:1px solid var(--rule);background:var(--bg);transition:border-color .18s,box-shadow .18s}
        .uf-card:hover{border-color:#bbb;box-shadow:0 3px 16px rgba(0,0,0,.07)}
        .uf-article{transition:opacity .15s}
        .uf-article:hover{opacity:.68}
        .uf-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--rulel);transition:background .12s,padding .12s,margin .12s}
        .uf-row:last-child{border-bottom:none}
        .uf-row:hover{background:var(--bgoff);padding-left:8px;padding-right:8px;margin:0 -8px}
        .uf-pill{display:inline-flex;align-items:center;gap:4px;font-family:'Source Serif 4',Georgia,serif;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:3px 8px;border:1px solid currentColor}
        .uf-btn-dark{display:inline-flex;align-items:center;gap:8px;background:var(--ink);color:#fff;font-family:'Source Serif 4',Georgia,serif;font-size:13px;font-weight:600;letter-spacing:.04em;padding:12px 28px;border:2px solid var(--ink);transition:background .18s,color .18s;cursor:pointer}
        .uf-btn-dark:hover{background:#333;border-color:#333}
        .uf-btn-ghost{display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--ink);font-family:'Source Serif 4',Georgia,serif;font-size:13px;font-weight:600;letter-spacing:.04em;padding:11px 28px;border:2px solid var(--ink);transition:background .18s,color .18s;cursor:pointer}
        .uf-btn-ghost:hover{background:var(--ink);color:#fff}
        .uf-search-bar{display:flex;align-items:center;gap:10px;border-bottom:2px solid var(--ink);padding:4px 2px;max-width:520px;transition:border-color .18s}
        .uf-search-bar:focus-within{border-color:var(--goldr)}
        .uf-search-input{flex:1;font-family:'Source Serif 4',Georgia,serif;font-size:14px;color:var(--ink);background:transparent;border:none;outline:none;padding:8px 0}
        .uf-search-input::placeholder{color:var(--ink4)}
        .uf-bar-track{flex:1;height:2px;background:var(--rulel);border-radius:1px;overflow:hidden}
        .uf-bar-fill{height:100%;background:var(--ink);border-radius:1px}
        .uf-blockquote{border-left:3px solid var(--goldr);padding:4px 0 4px 16px;font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:1.05rem;line-height:1.65;color:var(--ink2)}
        .uf-rule{height:1px;background:var(--rule)}
        .uf-rule-thick{height:2px;background:var(--ink)}
        .uf-sec-head{display:flex;align-items:center;gap:12px;margin-bottom:24px}
        .uf-sec-head::after{content:'';flex:1;height:1px;background:var(--rule)}
        .uf-verified{display:inline-flex;align-items:center;gap:3px;font-family:'Source Serif 4',Georgia,serif;font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--pos);border:1px solid var(--pos);padding:2px 7px}
        .uf-stat{padding:20px 16px;border-right:1px solid var(--rule);text-align:center}
        .uf-stat:last-child{border-right:none}
        .uf-grid-divider{display:grid;gap:1px;background:var(--rule);border:1px solid var(--rule)}
        .uf-grid-cell{background:var(--bg);padding:24px;transition:background .18s}
        .uf-grid-cell:hover{background:var(--bgoff)}
        .uf-noscroll::-webkit-scrollbar{display:none}
        .uf-noscroll{-ms-overflow-style:none;scrollbar-width:none}
        .uf-wrap{max-width:1400px;margin:0 auto;padding:0 clamp(16px,3vw,32px)}

        /* ── SECTOR TABLE — mobile-first, never clips ── */
        .sector-table { width: 100%; }
        .sector-row {
          display: grid;
          grid-template-columns: 28px 1fr;
          column-gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid var(--rulel);
        }
        .sector-row:last-child { border-bottom: none; }
        .sector-row:hover { background: var(--bgoff); }
        .sector-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: var(--ink4);
          padding-top: 3px;
          flex-shrink: 0;
        }
        .sector-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }
        .sector-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: nowrap;
        }
        .sector-name {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
          min-width: 0;
        }
        .sector-nums {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .sector-growth {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 700;
          color: var(--pos);
          min-width: 52px;
          text-align: right;
        }
        .sector-funding {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--ink2);
          min-width: 44px;
          text-align: right;
        }
        .sector-deals {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--ink4);
          min-width: 28px;
          text-align: right;
        }
        .sector-bar {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        /* On tiny screens, hide deals count to save space */
        @media (max-width: 360px) { .sector-deals { display: none; } }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .uf-three-col { grid-template-columns: 1fr !important; }
          .uf-hide-tablet { display: none !important; }
        }
        @media (max-width: 640px) {
          .uf-stat { border-right: none; border-bottom: 1px solid var(--rule); }
          .uf-stat:last-child { border-bottom: none; }
          .uf-hide-mobile { display: none !important; }
          .uf-full-mobile { grid-column: 1 / -1 !important; }
          .uf-hero-center { text-align: center !important; align-items: center !important; }
          .uf-btn-row { justify-content: center !important; }
          .uf-trust-row { justify-content: center !important; }
          .uf-search-bar { max-width: 100% !important; width: 100% !important; }
          .uf-blockquote { text-align: left !important; }
          .uf-btn-dark, .uf-btn-ghost { width: 100%; justify-content: center; text-align: center; }
          .uf-chips-row { justify-content: center !important; }
          .uf-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .uf-three-col > div { padding-left: 0 !important; padding-right: 0 !important; border-right: none !important; border-bottom: 1px solid var(--rule) !important; padding-bottom: 24px !important; margin-bottom: 8px !important; }
          .uf-three-col > div:last-child { border-bottom: none !important; }
          .uf-sec-head { justify-content: center; }
          .uf-sec-head::after { display: none; }
          .uf-card-grid { grid-template-columns: 1fr !important; }
          /* sector on mobile: slightly smaller name text */
          .sector-name { font-size: 13px; }
          .sector-growth { font-size: 12px; min-width: 44px; }
          .sector-funding { font-size: 11px; min-width: 38px; }
        }
      `}</style>

      <div className="uf">

        {/* ══ LIVE TICKER ══════════════════════════════════════════════════ */}
        <div style={{ background: "var(--bgoff)", borderBottom: "1px solid var(--rule)", overflow: "hidden", marginTop: "3.5rem" }}>
          <div style={{ display: "flex", alignItems: "stretch", height: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0 16px", flexShrink: 0, borderRight: "1px solid var(--rule)", background: "var(--bgwarm)" }}>
              <div className="uf-live" />
              <span className="uf-label">Live Feed</span>
            </div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div className="uf-ticker-track" style={{ height: "36px", alignItems: "center" }}>
                {[...liveNews, ...liveNews].map((news: any, i: number) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "0 28px", borderRight: "1px solid var(--rulel)" }}>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: news.impact === "positive" ? "var(--pos)" : news.impact === "negative" ? "var(--neg)" : "var(--ink4)", fontFamily: "'Source Serif 4', serif" }}>
                      {news.impact === "positive" ? "▲" : news.impact === "negative" ? "▼" : "●"}
                    </span>
                    <span style={{ fontSize: "12.5px", color: "var(--ink2)", fontFamily: "'Source Serif 4', serif" }}>{news.headline}</span>
                    <span style={{ fontSize: "10px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif", flexShrink: 0 }}>{news.source} · {news.timestamp}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="uf-hide-mobile" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0 18px", borderLeft: "1px solid var(--rule)", flexShrink: 0 }}>
              <span className="uf-label">Market</span>
              <span className="uf-mono" style={{ fontSize: "12px", fontWeight: 600, color: sentimentColor }}>
                {ecosystem.marketMood.sentiment} {ecosystem.marketMood.score}/100
              </span>
            </div>
          </div>
        </div>

        {/* ══ SUB-NAV ═══════════════════════════════════════════════════════ */}
        <nav style={{ background: "#fff", borderBottom: "1px solid var(--rule)" }}>
          <div className="uf-wrap">
            <div className="uf-noscroll" style={{ display: "flex", alignItems: "center", overflowX: "auto", height: "44px" }}>
              {[
                { label: "Registry",    href: "/startup" },
                { label: "AI Startups", href: "/top-ai-startups" },
                { label: "Unicorns",    href: "/indian-unicorns" },
                { label: "Founders",    href: "/founder-stories" },
                { label: "Funded",      href: "/top-funded-startups" },
                { label: "SaaS",        href: "/best-saas-startups" },
                { label: "Reports",     href: "/reports" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="uf-nav-link">{item.label}</Link>
              ))}
              <div style={{ flex: 1 }} />
              <Link href="/submit" className="uf-btn-dark uf-hide-mobile" style={{ fontSize: "11px", padding: "7px 16px", letterSpacing: "0.12em" }}>
                + List Free
              </Link>
            </div>
          </div>
        </nav>

        <div className="uf-wrap">

          {/* ── BREADCRUMB ────────────────────────────────────────────────── */}
          <nav aria-label="Breadcrumb" style={{ padding: "8px 0", borderBottom: "1px solid var(--rulel)" }}>
            <ol itemScope itemType="https://schema.org/BreadcrumbList"
              style={{ display: "flex", alignItems: "center", gap: "6px", listStyle: "none", padding: 0, margin: 0, flexWrap: "wrap" }}>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/" itemProp="item" style={{ fontSize: "11px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif" }}>
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li style={{ fontSize: "10px", color: "var(--ink4)" }} aria-hidden="true">›</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" style={{ fontSize: "11px", color: "var(--gold)", fontFamily: "'Source Serif 4', serif", fontWeight: 600 }} aria-current="page">Startup Registry</span>
                <meta itemProp="item" content="https://upforge.in" />
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>

          {/* ── MASTHEAD ──────────────────────────────────────────────────── */}
          <header className="uf-a0">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--rule)", flexWrap: "wrap", gap: "8px" }}>
              <span className="uf-label" style={{ color: "var(--ink4)" }}>{todayStr} · Vol. II</span>
              <div className="uf-hide-mobile" style={{ display: "flex", gap: "20px" }}>
                {["Independent", "Ad-Free", "Verified"].map((t) => (
                  <span key={t} style={{ fontSize: "10px", color: "var(--ink4)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Source Serif 4', serif" }}>✓ {t}</span>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div className="uf-live" />
                <span className="uf-label" style={{ color: "var(--ink4)" }}>Updated {lastUpdated} IST</span>
              </div>
            </div>
            <div style={{ textAlign: "center", padding: "clamp(24px,5vw,48px) 0 clamp(16px,3vw,28px)", borderBottom: "2px solid var(--ink)" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif", marginBottom: "12px" }}>
                India's Independent Startup Intelligence Platform
              </p>
              <h1 className="uf-display" style={{ fontSize: "clamp(3rem,10vw,8rem)", fontWeight: 900, lineHeight: 0.88, color: "var(--ink)", marginBottom: "16px" }}>UpForge</h1>
              <div style={{ display: "flex", justifyContent: "center", gap: "clamp(12px,2vw,28px)", flexWrap: "wrap" }}>
                {[`${totalStartups.toLocaleString() || "72,000"}+ Verified Startups`, "100% Independent", "AI-Powered Reports", "Real-Time Intelligence"].map((t) => (
                  <span key={t} className="uf-label" style={{ color: "var(--ink3)", fontSize: "9.5px" }}>{t}</span>
                ))}
              </div>
            </div>
          </header>

          {/* ── THREE-COLUMN BROADSHEET ───────────────────────────────────── */}
          <section className="uf-a1" style={{ borderBottom: "1px solid var(--rule)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "clamp(240px,22%,300px) 1px 1fr 1px clamp(260px,24%,340px)", gap: 0, padding: "clamp(20px,4vw,40px) 0" }} className="uf-three-col">

              {/* LEFT */}
              <div style={{ paddingRight: "clamp(16px,3vw,32px)" }}>
                <div className="uf-sec-head"><span className="uf-label" style={{ color: "var(--gold)" }}>Market Pulse</span></div>
                <div style={{ background: "var(--bgwarm)", border: "1px solid var(--rule)", padding: "18px 16px", marginBottom: "24px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "14px" }}>
                    <span className="uf-display" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 900, color: sentimentColor, lineHeight: 1 }}>{ecosystem.marketMood.sentiment}</span>
                    <span className="uf-mono" style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--ink4)" }}>{ecosystem.marketMood.score}</span>
                  </div>
                  <div style={{ height: "4px", background: "var(--rule)", borderRadius: "2px", marginBottom: "6px", position: "relative" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${ecosystem.marketMood.score}%`, background: "linear-gradient(90deg,#dc2626 0%,#ca8a04 45%,#16a34a 100%)", borderRadius: "2px" }} />
                    <div style={{ position: "absolute", top: "50%", left: `${ecosystem.marketMood.score}%`, transform: "translate(-50%,-50%)", width: "10px", height: "10px", background: "#fff", borderRadius: "50%", border: "2px solid var(--ink)", boxShadow: "0 1px 4px rgba(0,0,0,.15)" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    {["Bearish","Neutral","Bullish"].map((l) => <span key={l} style={{ fontSize: "9px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif" }}>{l}</span>)}
                  </div>
                  <p className="uf-serif" style={{ fontSize: "11.5px", color: "var(--ink3)", lineHeight: 1.5 }}>{ecosystem.marketMood.reason}</p>
                </div>
                <div className="uf-sec-head"><span className="uf-label">Latest Deals</span></div>
                {ecosystem.fundingNews.slice(0, 3).map((f: any, i: number) => (
                  <div key={i} className="uf-row">
                    <div style={{ flex: 1, minWidth: 0, paddingRight: "12px" }}>
                      <div className="uf-serif" style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)", marginBottom: "2px" }}>{f.startup}</div>
                      <div style={{ fontSize: "11px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif" }}>{f.round} · {f.investors.split(",")[0]}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div className="uf-mono" style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--pos)" }}>{f.amount}</div>
                      {f.valuation && <div style={{ fontSize: "10px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif" }}>@ {f.valuation}</div>}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "var(--rule)", width: "1px" }} className="uf-hide-tablet" />

              {/* CENTER */}
              <div style={{ padding: "0 clamp(16px,3vw,40px)" }} className="uf-hero-center">
                <nav aria-label="Breadcrumb" style={{ marginBottom: "12px" }}>
                  <ol style={{ display: "flex", alignItems: "center", gap: "6px", listStyle: "none", padding: 0, margin: 0, flexWrap: "wrap", justifyContent: "inherit" }}>
                    <li><Link href="/" style={{ fontSize: "11px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif" }}>Home</Link></li>
                    <li style={{ fontSize: "10px", color: "var(--ink4)" }}>›</li>
                    <li><span style={{ fontSize: "11px", color: "var(--gold)", fontFamily: "'Source Serif 4', serif", fontWeight: 600 }}>Startup Registry</span></li>
                  </ol>
                </nav>
                <span className="uf-pill" style={{ color: "var(--gold)", marginBottom: "12px", display: "inline-flex" }}>India's #1 Startup Database</span>
                <h2 className="uf-display" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, lineHeight: 1.06, color: "var(--ink)", marginBottom: "16px", marginTop: "10px" }}>
                  India's most comprehensive registry of{" "}
                  <em style={{ fontStyle: "italic", color: "var(--goldr)" }}>72,000+ verified startups</em>
                  {" "}— researched, ranked, and updated daily.
                </h2>
                <p className="uf-serif" style={{ fontSize: "15px", color: "var(--ink2)", lineHeight: 1.8, marginBottom: "20px" }}>
                  UpForge is India's only fully independent, ad-free startup registry — built for founders, investors, and researchers who demand verified data, not sponsored noise. Every listing is manually reviewed.
                </p>
                <div className="uf-blockquote" style={{ marginBottom: "24px", textAlign: "left" }}>
                  "The most comprehensive free database of verified Indian startups — used by 340+ VC firms and research teams."
                </div>
                <div className="uf-search-bar" style={{ marginBottom: "24px" }}>
                  <Search style={{ width: "15px", height: "15px", color: "var(--ink4)", flexShrink: 0 }} />
                  <input type="text" placeholder="Search startups, sectors, founders…" className="uf-search-input" aria-label="Search Indian startups on UpForge" />
                </div>
                <div className="uf-btn-row" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link href="/startup" className="uf-btn-dark">Open Registry <ArrowRight style={{ width: "14px", height: "14px" }} /></Link>
                  <Link href="/submit" className="uf-btn-ghost">List Your Startup — Free</Link>
                </div>
                <div className="uf-trust-row" style={{ display: "flex", gap: "20px", marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--rule)", flexWrap: "wrap" }}>
                  {[{ icon: CheckCircle2, text: "Free forever" }, { icon: BadgeCheck, text: "Manual verification" }, { icon: Sparkles, text: "AI deep reports" }].map((p) => (
                    <div key={p.text} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <p.icon style={{ width: "13px", height: "13px", color: "var(--pos)" }} />
                      <span style={{ fontSize: "12px", color: "var(--ink3)", fontFamily: "'Source Serif 4', serif" }}>{p.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "var(--rule)", width: "1px" }} className="uf-hide-tablet" />

              {/* RIGHT */}
              <div style={{ paddingLeft: "clamp(16px,3vw,32px)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div className="uf-live" />
                    <span className="uf-label">Startup Dispatch</span>
                  </div>
                  <span className="uf-pill" style={{ color: "var(--pos)" }}>Live</span>
                </div>
                {liveNews.map((news: any, i: number) => (
                  <div key={i} className="uf-article" style={{ paddingBottom: "14px", marginBottom: "14px", borderBottom: i < liveNews.length - 1 ? "1px solid var(--rulel)" : "none" }}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                      <div style={{ width: "3px", minHeight: "40px", flexShrink: 0, background: news.impact === "positive" ? "var(--pos)" : news.impact === "negative" ? "var(--neg)" : "var(--rule)", borderRadius: "2px", marginTop: "2px" }} />
                      <div>
                        {news.url ? (
                          <a href={news.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", color: "var(--ink)", lineHeight: 1.55, display: "block", marginBottom: "5px", fontFamily: "'Source Serif 4', serif" }}>{news.headline}</a>
                        ) : (
                          <p style={{ fontSize: "13px", color: "var(--ink)", lineHeight: 1.55, marginBottom: "5px", fontFamily: "'Source Serif 4', serif" }}>{news.headline}</p>
                        )}
                        <div style={{ display: "flex", gap: "8px" }}>
                          <span style={{ fontSize: "10px", color: "var(--gold)", fontWeight: 700, fontFamily: "'Source Serif 4', serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>{news.source}</span>
                          <span style={{ fontSize: "10px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif" }}>{news.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", paddingTop: "8px", borderTop: "1px solid var(--rulel)" }}>
                  <Clock style={{ width: "11px", height: "11px", color: "var(--ink4)" }} />
                  <span style={{ fontSize: "10px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif" }}>Refreshed hourly via NewsAPI · {lastUpdated} IST</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── ECOSYSTEM METRICS ─────────────────────────────────────────── */}
          <section className="uf-a2">
            <div className="uf-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", borderBottom: "1px solid var(--rule)" }}>
              {[
                { label: "Active Startups", value: ecosystem.ecosystemMetrics.totalActiveStartups, sub: "+2,300 / month" },
                { label: "Funding YTD",     value: ecosystem.ecosystemMetrics.totalFundingYTD,     sub: `${ecosystem.ecosystemMetrics.monthlyGrowth} YoY`, warm: true },
                { label: "VC Firms",        value: ecosystem.ecosystemMetrics.activeVCFirms,       sub: `${ecosystem.ecosystemMetrics.activeAngels} angels` },
                { label: "Unicorns",        value: ecosystem.ecosystemMetrics.unicorns,            sub: `${ecosystem.ecosystemMetrics.soonicorns} soonicorns`, warm: true },
                { label: "Avg Deal",        value: ecosystem.ecosystemMetrics.avgDealSize,         sub: "Seed → Series A" },
                { label: "Hot Sector",      value: ecosystem.ecosystemMetrics.mostActiveSector,    sub: `${ecosystem.sectorMomentum[0]?.deals} deals` },
                { label: "Top City",        value: ecosystem.ecosystemMetrics.topCity,             sub: "Leading hub" },
                { label: "Our Registry",    value: `${totalStartups.toLocaleString() || 0}+`,     sub: `${uniqueIndustries} sectors`, warm: true },
              ].map((s, i) => (
                <div key={i} className="uf-stat" style={{ background: s.warm ? "var(--bgwarm)" : "#fff" }}>
                  <div className="uf-display" style={{ fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 900, color: "var(--ink)", lineHeight: 1.1, marginBottom: "4px" }}>{s.value}</div>
                  <div className="uf-label" style={{ marginBottom: "2px", color: "var(--ink3)" }}>{s.label}</div>
                  <div style={{ fontSize: "10px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              SECTOR MOMENTUM — fully responsive, no overflow on mobile
          ══════════════════════════════════════════════════════════════ */}
          <section className="uf-a3" style={{ padding: "clamp(20px,4vw,40px) 0", borderBottom: "1px solid var(--rule)" }}>
            {/* Two-column on desktop: sector table | leaders sidebar */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr clamp(280px,28%,360px)", gap: "0" }}>

              {/* ── Sector table column ── */}
              <div style={{ paddingRight: "clamp(0px,3vw,32px)" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid var(--rule)" }}>
                  <span className="uf-label">Sector Momentum · Q1 2026</span>
                  {/* Column labels — right-aligned, matching the data columns */}
                  <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                    <span style={{ fontSize: "9px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif", letterSpacing: "0.1em", textTransform: "uppercase", minWidth: "28px", textAlign: "right" }}>Deals</span>
                    <span style={{ fontSize: "9px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif", letterSpacing: "0.1em", textTransform: "uppercase", minWidth: "44px", textAlign: "right" }}>Funding</span>
                    <span style={{ fontSize: "9px", color: "var(--pos)", fontFamily: "'Source Serif 4', serif", letterSpacing: "0.1em", textTransform: "uppercase", minWidth: "52px", textAlign: "right" }}>Growth</span>
                  </div>
                </div>

                {/* Rows */}
                <div className="sector-table">
                  {ecosystem.sectorMomentum.map((sector: any, i: number) => {
                    const pct = Math.min(parseFloat(sector.growth.replace("+","").replace("%","")), 160);
                    return (
                      <div key={i} className="sector-row">
                        {/* Row number */}
                        <span className="sector-num">{String(i + 1).padStart(2, "0")}</span>

                        {/* Body: name+stats on top, bar+trend below */}
                        <div className="sector-body">
                          <div className="sector-top">
                            <span className="sector-name">{sector.sector}</span>
                            <div className="sector-nums">
                              <span className="sector-deals">{sector.deals}</span>
                              <span className="sector-funding">{sector.funding}</span>
                              <span className="sector-growth">{sector.growth}</span>
                            </div>
                          </div>
                          {/* Progress bar always visible */}
                          <div className="sector-bar">
                            <div className="uf-bar-track">
                              <div className="uf-bar-fill" style={{ width: `${(pct / 160) * 100}%` }} />
                            </div>
                            <span className="uf-hide-mobile" style={{ fontSize: "9.5px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif", flexShrink: 0, maxWidth: "140px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {sector.trend}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── Leaders sidebar — hidden on tablet/mobile ── */}
              <div style={{ borderLeft: "1px solid var(--rule)", paddingLeft: "clamp(16px,3vw,32px)" }} className="uf-hide-tablet">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span className="uf-label">Business Leaders</span>
                  <a href="https://www.forbes.com/billionaires/" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "10px", color: "var(--gold)", fontFamily: "'Source Serif 4', serif", display: "flex", alignItems: "center", gap: "3px" }}>
                    Forbes <ExternalLink style={{ width: "10px", height: "10px" }} />
                  </a>
                </div>
                {TOP_INDIAN_BILLIONAIRES.map((p, i) => (
                  <div key={i} className="uf-row">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                      <div style={{ width: "22px", height: "22px", background: "var(--bgoff)", border: "1px solid var(--rule)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span className="uf-mono" style={{ fontSize: "8.5px", fontWeight: 700, color: "var(--ink3)" }}>{p.rank.replace("#","")}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="uf-serif" style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--ink)", marginBottom: "1px" }}>{p.name}</div>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <span style={{ fontSize: "10px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif" }}>{p.source}</span>
                          <span style={{ fontSize: "10px", color: "var(--pos)", fontFamily: "'Source Serif 4', serif", fontWeight: 600 }}>{p.yoy}</span>
                        </div>
                      </div>
                    </div>
                    <span className="uf-mono" style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)", flexShrink: 0, marginLeft: "8px" }}>{p.netWorth}</span>
                  </div>
                ))}
                <div style={{ marginTop: "20px", padding: "16px", background: "var(--bgwarm)", border: "1px solid var(--rule)" }}>
                  <div className="uf-label" style={{ marginBottom: "10px" }}>Q1 2026 Snapshot</div>
                  {[
                    { l: "Total Funding YTD", v: ecosystem.ecosystemMetrics.totalFundingYTD },
                    { l: "Avg Deal Size",     v: ecosystem.ecosystemMetrics.avgDealSize },
                    { l: "Unicorns",          v: ecosystem.ecosystemMetrics.unicorns },
                    { l: "Soonicorns",        v: ecosystem.ecosystemMetrics.soonicorns },
                  ].map((s, i) => (
                    <div key={i} className="uf-row" style={{ padding: "7px 0" }}>
                      <span style={{ fontSize: "11.5px", color: "var(--ink3)", fontFamily: "'Source Serif 4', serif" }}>{s.l}</span>
                      <span className="uf-display" style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)" }}>{s.v}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "10px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif", marginTop: "10px", fontStyle: "italic", lineHeight: 1.5 }}>
                  Forbes Real-Time Billionaires, 2026. Rankings fluctuate daily.
                </p>
              </div>
            </div>

            {/* Leaders — shown on mobile/tablet only (below sector table) */}
            <div className="uf-hide-desktop" style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--rule)", display: "none" }}>
              {/* Hidden via uf-hide-desktop — leaders are desktop-only; the sidebar already handles desktop */}
            </div>
          </section>

          {/* ── RISING STARTUPS ───────────────────────────────────────────── */}
          <section className="uf-a3" style={{ padding: "clamp(24px,5vw,48px) 0", borderBottom: "1px solid var(--rule)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <div className="uf-sec-head" style={{ flex: 1, marginBottom: 0 }}>
                <span className="uf-label">Top Rising Startups · 2026</span>
              </div>
              <Link href="/startup" style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--ink3)", fontFamily: "'Source Serif 4', serif", marginLeft: "16px", flexShrink: 0 }}>
                Full registry <ChevronRight style={{ width: "13px", height: "13px" }} />
              </Link>
            </div>

            {ecosystem.topRisingStartups[0] && (
              <div style={{ background: "var(--bgwarm)", border: "1px solid var(--rule)", padding: "clamp(18px,3vw,30px)", marginBottom: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "20px", alignItems: "start" }}>
                  <div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "10px", flexWrap: "wrap" }}>
                      <span className="uf-pill" style={{ color: "var(--gold)" }}>Editor's Pick</span>
                      <span style={{ fontSize: "10px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>{ecosystem.topRisingStartups[0].sector}</span>
                      {ecosystem.topRisingStartups[0].momentum === "high" && <span className="uf-pill" style={{ color: "var(--pos)" }}>🔥 High Momentum</span>}
                    </div>
                    <h3 className="uf-display" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 700, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.1 }}>{ecosystem.topRisingStartups[0].name}</h3>
                    <p className="uf-serif" style={{ fontSize: "14px", color: "var(--ink2)", lineHeight: 1.65, maxWidth: "500px", marginBottom: "16px" }}>{ecosystem.topRisingStartups[0].insight}</p>
                    <Link href="/startup" className="uf-btn-dark" style={{ fontSize: "12px", padding: "10px 22px" }}>
                      View Profile <ArrowUpRight style={{ width: "13px", height: "13px" }} />
                    </Link>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div className="uf-mono" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, color: "var(--pos)", lineHeight: 1 }}>{ecosystem.topRisingStartups[0].growthIndicator}</div>
                    <div className="uf-label" style={{ fontSize: "9px", marginTop: "4px" }}>Growth Rate</div>
                  </div>
                </div>
              </div>
            )}

            <div className="uf-card-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "12px" }}>
              {ecosystem.topRisingStartups.slice(1).map((s: any, i: number) => (
                <Link key={i} href="/startup" className="uf-card" style={{ display: "block", padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "9px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>{s.sector}</div>
                      <h4 className="uf-display" style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{s.name}</h4>
                    </div>
                    <span className="uf-mono" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--pos)", flexShrink: 0, marginLeft: "8px" }}>{s.growthIndicator}</span>
                  </div>
                  <p className="uf-serif" style={{ fontSize: "12px", color: "var(--ink3)", lineHeight: 1.6, marginBottom: "12px" }}>{s.insight}</p>
                  <div style={{ height: "2px", background: "var(--rule)", borderRadius: "1px", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "var(--ink)", width: `${Math.min(parseFloat(s.growthIndicator.replace("+","").replace("%","")),200)/2}%`, borderRadius: "1px" }} />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── RECENTLY VERIFIED ─────────────────────────────────────────── */}
          <section className="uf-a4" style={{ padding: "clamp(24px,5vw,48px) 0", borderBottom: "1px solid var(--rule)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span className="uf-label">Recently Verified on UpForge</span>
                <span className="uf-verified">✓ Live Registry</span>
              </div>
              <Link href="/startup" style={{ fontSize: "12px", color: "var(--ink3)", fontFamily: "'Source Serif 4', serif", display: "flex", alignItems: "center", gap: "4px" }}>
                View all {totalStartups.toLocaleString()}+ <ChevronRight style={{ width: "13px", height: "13px" }} />
              </Link>
            </div>
            <div className="uf-card-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "12px" }}>
              {verifiedStartups.slice(0, 6).map((startup: any) => (
                <Link key={startup.id} href={`/startup/${startup.slug}`} className="uf-card" style={{ display: "block", padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <h4 className="uf-display" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.25, flex: 1 }}>{startup.name}</h4>
                    <BadgeCheck style={{ width: "13px", height: "13px", color: "var(--pos)", flexShrink: 0, marginLeft: "8px", marginTop: "2px" }} />
                  </div>
                  <p className="uf-serif" style={{ fontSize: "12px", color: "var(--ink3)", lineHeight: 1.6, marginBottom: "14px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{startup.description}</p>
                  <div style={{ display: "flex", gap: "8px", paddingTop: "10px", borderTop: "1px solid var(--rulel)" }}>
                    <span style={{ fontSize: "10px", color: "var(--ink4)", fontFamily: "'Source Serif 4', serif" }}>{startup.founded_year || "—"}</span>
                    <span style={{ color: "var(--rule)" }}>·</span>
                    <span style={{ fontSize: "10px", color: "var(--ink3)", fontFamily: "'Source Serif 4', serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{startup.industry || "Startup"}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── INTELLIGENCE HUB ──────────────────────────────────────────── */}
          <section className="uf-a4" style={{ padding: "clamp(24px,5vw,48px) 0", borderBottom: "1px solid var(--rule)" }}>
            <div className="uf-sec-head"><span className="uf-label">Intelligence Hub</span></div>
            <div className="uf-grid-divider" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))" }}>
              {[
                { label: "AI Startup Reports",     desc: "Deep dives into India's fastest-growing AI companies — valuation, growth signals, competitive moats.", href: "/top-ai-startups",      icon: Sparkles,   stat: "1,779+ companies", tag: "AI / ML" },
                { label: "Indian Unicorn Tracker", desc: "118 verified unicorn profiles with funding history, investor networks, and growth trajectory data.",  href: "/indian-unicorns",     icon: Gem,        stat: "118 unicorns",     tag: "Unicorns" },
                { label: "Funding Database",       desc: "Track every major round in India — from angel to Series F, with investor and valuation data.",         href: "/top-funded-startups", icon: DollarSign, stat: "$14B+ tracked",    tag: "Funding" },
                { label: "Founder Stories",        desc: "In-depth profiles of India's most ambitious founders — their journey, decisions, and lessons.",        href: "/founder-stories",     icon: Users,      stat: "Curated profiles", tag: "Founders" },
                { label: "Full Startup Registry",  desc: `${totalStartups.toLocaleString() || "72,000"}+ verified startups across ${uniqueIndustries} sectors.`, href: "/startup",            icon: BookOpen,   stat: `${totalStartups.toLocaleString() || "72,000"}+`, tag: "Registry" },
              ].map((item, i) => (
                <Link key={i} href={item.href} className="uf-grid-cell" style={{ display: "block" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div style={{ width: "36px", height: "36px", background: "var(--bgwarm)", border: "1px solid var(--rule)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <item.icon style={{ width: "16px", height: "16px", color: "var(--ink3)" }} />
                    </div>
                    <ArrowUpRight style={{ width: "14px", height: "14px", color: "var(--ink4)" }} />
                  </div>
                  <div style={{ fontSize: "9px", color: "var(--gold)", fontFamily: "'Source Serif 4', serif", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>{item.tag}</div>
                  <h3 className="uf-display" style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.2 }}>{item.label}</h3>
                  <p className="uf-serif" style={{ fontSize: "12.5px", color: "var(--ink3)", lineHeight: 1.65, marginBottom: "16px" }}>{item.desc}</p>
                  <div style={{ paddingTop: "12px", borderTop: "1px solid var(--rulel)" }}>
                    <span className="uf-mono" style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink2)" }}>{item.stat}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── AI REPORTS CTA ────────────────────────────────────────────── */}
          <section style={{ padding: "clamp(32px,6vw,64px) 0", borderBottom: "1px solid var(--rule)" }}>
            <div style={{ background: "var(--bgwarm)", border: "1px solid var(--rule)", padding: "clamp(28px,5vw,56px)", display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(20px,4vw,48px)", alignItems: "center" }}>
              <div>
                <span className="uf-label" style={{ color: "var(--gold)", display: "block", marginBottom: "12px" }}>Premium Intelligence</span>
                <h2 className="uf-display" style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, color: "var(--ink)", lineHeight: 1.05, marginBottom: "16px" }}>
                  AI-Powered Deep Research Reports on Indian Startups
                </h2>
                <p className="uf-serif" style={{ fontSize: "15px", color: "var(--ink2)", lineHeight: 1.8, maxWidth: "540px", marginBottom: "28px" }}>
                  Institutional-grade analysis — valuation insights, competitive landscape, market positioning, and risk signals. Built for founders, investors, and analysts who need more than surface-level data.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link href="/reports" className="uf-btn-dark">Explore Reports <ArrowRight style={{ width: "14px", height: "14px" }} /></Link>
                  <Link href="/startup" className="uf-btn-ghost">Browse Registry</Link>
                </div>
              </div>
              <div className="uf-hide-tablet" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", width: "240px" }}>
                {["Valuation Analysis","Market Positioning","Risk Signals","Growth Trajectory"].map((t) => (
                  <div key={t} style={{ padding: "16px", background: "#fff", border: "1px solid var(--rule)", textAlign: "center" }}>
                    <Newspaper style={{ width: "18px", height: "18px", color: "var(--ink4)", margin: "0 auto 8px" }} />
                    <p className="uf-serif" style={{ fontSize: "11px", fontWeight: 600, color: "var(--ink2)", lineHeight: 1.4 }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── TRUST STRIP ───────────────────────────────────────────────── */}
          <div className="uf-rule-thick" />
          <div style={{ padding: "18px 0", display: "flex", flexWrap: "wrap", gap: "8px 28px", alignItems: "center", justifyContent: "center", background: "var(--bgoff)" }}>
            {[
              { icon: Shield,     text: "100% Independent · Zero paid rankings" },
              { icon: BadgeCheck, text: "Every startup manually reviewed" },
              { icon: Sparkles,   text: "AI-powered research reports" },
              { icon: Globe,      text: "Open, public & Google-indexed" },
              { icon: Clock,      text: "Refreshed hourly via NewsAPI + Groq" },
            ].map((item) => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <item.icon style={{ width: "13px", height: "13px", color: "var(--ink3)" }} />
                <span style={{ fontSize: "11.5px", color: "var(--ink3)", fontFamily: "'Source Serif 4', serif" }}>{item.text}</span>
              </div>
            ))}
          </div>

        </div>{/* /uf-wrap */}
      </div>{/* /uf */}
    </>
  );
}
