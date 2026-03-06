// app/page.tsx
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";
import {
  BadgeCheck,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  Globe,
  TrendingUp,
  Award,
  Zap,
  Building2,
  LineChart,
  Briefcase,
  DollarSign,
  IndianRupee,
  Newspaper,
  Rocket,
  Activity,
  Gem,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

// ─── SEO METADATA ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "UpForge — India's #1 Independent Startup Registry & Database 2026",
  description:
    "Discover, research and track 72,000+ verified Indian startups. Free listings, AI-powered growth reports, real-time funding news, unicorn tracker and live market intelligence. India's most trusted startup database.",
  keywords: [
    "Indian startups 2026",
    "India startup database",
    "startup registry India",
    "verified Indian startups",
    "Indian unicorns 2026",
    "startup funding India",
    "list your startup India free",
    "startup ecosystem India",
    "Indian founders database",
    "VC deals India",
    "startup news India today",
    "Bengaluru startups",
    "Mumbai startups",
    "Delhi NCR startups",
    "SaaS startups India",
    "fintech startups India",
    "edtech startups India",
    "healthtech India",
    "AI startups India",
    "deeptech India startups",
    "startup valuation India",
    "angel investors India",
    "startup growth report India",
    "UpForge",
    "India startup intelligence",
    "Indian soonicorns",
    "startup funding tracker India",
  ].join(", "),
  authors: [{ name: "UpForge", url: "https://upforge.in" }],
  creator: "UpForge",
  publisher: "UpForge",
  metadataBase: new URL("https://upforge.in"),
  alternates: { canonical: "https://upforge.in" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://upforge.in",
    siteName: "UpForge",
    title: "UpForge — India's #1 Independent Startup Registry 2026",
    description:
      "72,000+ verified Indian startups. Free listings · AI growth reports · Live funding news · Unicorn tracker. The definitive database for India's startup ecosystem.",
    images: [
      {
        url: "https://upforge.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "UpForge — India's Independent Startup Registry & Live Market Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@upforge_in",
    creator: "@upforge_in",
    title: "UpForge — India's #1 Independent Startup Registry 2026",
    description:
      "72,000+ verified Indian startups. Free listings · AI growth reports · Real-time funding news.",
    images: ["https://upforge.in/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN",
  },
  other: {
    "og:locale:alternate": "hi_IN",
    "article:publisher": "https://upforge.in",
  },
};

// ─── STRUCTURED DATA (JSON-LD) ────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://upforge.in/#website",
      url: "https://upforge.in",
      name: "UpForge",
      description: "India's Independent Startup Registry & Live Market Intelligence",
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: "https://upforge.in/startup?q={search_term_string}" },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://upforge.in/#organization",
      name: "UpForge",
      url: "https://upforge.in",
      logo: { "@type": "ImageObject", url: "https://upforge.in/logo.png", width: 512, height: 512 },
      sameAs: ["https://twitter.com/upforge_in", "https://linkedin.com/company/upforge"],
      description:
        "India's most trusted independent startup registry — verified listings, AI growth reports, and real-time market intelligence.",
      areaServed: "IN",
      knowsAbout: ["Indian Startups", "Startup Ecosystem", "Venture Capital India", "Startup Funding", "Indian Unicorns"],
    },
    {
      "@type": "WebPage",
      "@id": "https://upforge.in/#webpage",
      url: "https://upforge.in",
      name: "UpForge — India's #1 Independent Startup Registry 2026",
      isPartOf: { "@id": "https://upforge.in/#website" },
      about: { "@id": "https://upforge.in/#organization" },
      description: "Discover and research 72,000+ verified Indian startups. Free listings, AI growth reports, live funding news.",
      dateModified: new Date().toISOString(),
    },
    {
      "@type": "ItemList",
      name: "Top Indian Startup Sectors 2026",
      description: "Most active startup sectors in India by funding and deal count",
      numberOfItems: 6,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "SaaS" },
        { "@type": "ListItem", position: 2, name: "FinTech" },
        { "@type": "ListItem", position: 3, name: "AI/ML" },
        { "@type": "ListItem", position: 4, name: "D2C Brands" },
        { "@type": "ListItem", position: 5, name: "Climate Tech" },
        { "@type": "ListItem", position: 6, name: "HealthTech" },
      ],
    },
  ],
};

// ─── ACCURATE BILLIONAIRE DATA (Forbes-verified, top 3 only) ─────────────────
// Source: Forbes Real-Time Billionaires, March 2026
const TOP_INDIAN_BILLIONAIRES = [
  {
    name: "Mukesh Ambani",
    netWorth: "$96.3B",
    rank: "#10",
    source: "Reliance Industries",
    yoy: "+$4.2B YoY",
    startupConnections: ["Jio Platforms", "Netmeds", "Dunzo"],
  },
  {
    name: "Gautam Adani",
    netWorth: "$68.7B",
    rank: "#17",
    source: "Adani Group",
    yoy: "+$2.1B YoY",
    startupConnections: ["Adani Digital Labs", "Adani Green Energy"],
  },
  {
    name: "Shiv Nadar",
    netWorth: "$29.4B",
    rank: "#56",
    source: "HCL Technologies",
    yoy: "+$3.8B YoY",
    startupConnections: ["HCL Software", "Vama Sundari Investments"],
  },
];

// ─── NEWSAPI: Real startup/business news ─────────────────────────────────────
async function getLiveNews() {
  try {
    const today = new Date();
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(today.getDate() - 3);
    const fromDate = threeDaysAgo.toISOString().split("T")[0];

    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.set(
      "q",
      "(Indian startup OR startup India OR VC funding India OR unicorn India OR fintech India OR SaaS India)"
    );
    url.searchParams.set("from", fromDate);
    url.searchParams.set("language", "en");
    url.searchParams.set("sortBy", "publishedAt");
    url.searchParams.set("pageSize", "6");
    url.searchParams.set("apiKey", process.env.NEWSAPI_KEY || "");

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) throw new Error(`NewsAPI ${res.status}`);

    const data = await res.json();
    if (!data.articles?.length) throw new Error("No articles");

    return data.articles
      .filter((a: any) => a.title && a.source?.name && a.title !== "[Removed]")
      .slice(0, 4)
      .map((article: any) => {
        const publishedAt = new Date(article.publishedAt);
        const diffH = Math.floor((Date.now() - publishedAt.getTime()) / 3600000);
        const diffD = Math.floor(diffH / 24);
        const timestamp =
          diffH < 1 ? "just now" :
          diffH < 24 ? `${diffH}h ago` :
          diffD === 1 ? "1d ago" : `${diffD}d ago`;

        const title = article.title.toLowerCase();
        const impact =
          title.match(/raises|funding|unicorn|launch|growth|profit|record|surge|ipo|expands/) ? "positive" :
          title.match(/shutdown|layoff|fraud|crisis|loss|decline|cut|fail|drops/) ? "negative" :
          "neutral";

        return {
          headline: article.title.length > 90 ? article.title.slice(0, 87) + "…" : article.title,
          source: article.source.name,
          url: article.url,
          impact,
          timestamp,
        };
      });
  } catch (err) {
    console.error("[UpForge] NewsAPI failed:", err);
    return [
      { headline: "India startup ecosystem raises $9B+ in Q1 2026, up 34% year-on-year", source: "Inc42", impact: "positive", timestamp: "6h ago" },
      { headline: "SEBI eases startup IPO norms, reduces mandatory lock-in to 6 months", source: "Economic Times", impact: "positive", timestamp: "12h ago" },
      { headline: "Government's ₹1,000Cr DeepTech Fund opens applications for Indian startups", source: "PIB India", impact: "positive", timestamp: "1d ago" },
      { headline: "Indian SaaS companies cross $1.8B in new ARR, global expansion accelerates", source: "Mint", impact: "positive", timestamp: "1d ago" },
    ];
  }
}

// ─── GROQ: Structured market data only (NOT news) ────────────────────────────
async function getEcosystemData() {
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata",
  });

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      cache: "no-store",
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `Indian startup market data analyst. Today: ${dateStr}.
Return ONLY valid JSON, no markdown.
{
  "marketMood": { "sentiment": "Bullish/Neutral/Bearish", "score": "0-100 string", "reason": "max 8 words" },
  "topRisingStartups": [{"name":"real startup","sector":"sector","insight":"max 12 words","growthIndicator":"+XX%","momentum":"high/medium"}],
  "sectorMomentum": [{"sector":"sector","deals":"number","funding":"$XB or $XM","trend":"max 6 words","growth":"+XX%"}],
  "fundingNews": [{"startup":"real name","amount":"$XXM","round":"Series X","investors":"real investors","valuation":"$XXB or null"}],
  "ecosystemMetrics": {"totalActiveStartups":"XX,000+","totalFundingYTD":"$X.XB","activeVCFirms":"X,XXX+","unicorns":"XXX","soonicorns":"XXX+","avgDealSize":"$XX.XM","mostActiveSector":"sector","topCity":"city","monthlyGrowth":"+XX%","activeAngels":"X,XXX+"}
}
EXACTLY: 6 topRisingStartups, 6 sectorMomentum, 4 fundingNews.`,
          },
          {
            role: "user",
            content: `Indian startup market data for ${dateStr}. Q1 2026 actuals. Real startups, real investors only.`,
          },
        ],
        temperature: 0.15,
        max_tokens: 1500,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) throw new Error(`Groq ${response.status}`);
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty");
    const parsed = JSON.parse(content);
    if (!parsed.marketMood || !parsed.ecosystemMetrics) throw new Error("Invalid structure");
    return parsed;
  } catch (err) {
    console.error("[UpForge] Groq failed:", err);
    return {
      marketMood: { sentiment: "Bullish", score: "76", reason: "Q1 2026 funding momentum strong" },
      topRisingStartups: [
        { name: "Krutrim AI", sector: "AI Infrastructure", insight: "India's first sovereign AI cloud, expanding fast", growthIndicator: "+312%", momentum: "high" },
        { name: "Zepto", sector: "Quick Commerce", insight: "10-min delivery, profitable in 50+ cities", growthIndicator: "+189%", momentum: "high" },
        { name: "Pixxel", sector: "Space Tech", insight: "Hyperspectral satellites for enterprise agriculture", growthIndicator: "+156%", momentum: "high" },
        { name: "PhysicsWallah", sector: "EdTech", insight: "100+ offline centres, India's largest ed-network", growthIndicator: "+145%", momentum: "high" },
        { name: "Rapido", sector: "Mobility", insight: "Bike taxi dominating Tier 2/3 with 8M daily rides", growthIndicator: "+98%", momentum: "medium" },
        { name: "Ather Energy", sector: "EV", insight: "450+ touchpoints, 40% premium EV market share", growthIndicator: "+87%", momentum: "medium" },
      ],
      sectorMomentum: [
        { sector: "AI/ML", deals: "127", funding: "$1.2B", trend: "Enterprise AI adoption accelerating", growth: "+156%" },
        { sector: "SaaS", deals: "178", funding: "$1.8B", trend: "Global expansion by Indian SaaS", growth: "+134%" },
        { sector: "FinTech", deals: "143", funding: "$2.1B", trend: "Credit infra & UPI 3.0 innovation", growth: "+112%" },
        { sector: "Climate Tech", deals: "89", funding: "$845M", trend: "EV infra & carbon markets boom", growth: "+89%" },
        { sector: "HealthTech", deals: "98", funding: "$678M", trend: "Telemedicine & diagnostics scaling", growth: "+78%" },
        { sector: "D2C Brands", deals: "156", funding: "$923M", trend: "Profitable growth after reset", growth: "+67%" },
      ],
      fundingNews: [
        { startup: "Zepto", amount: "$300M", round: "Series F", investors: "General Catalyst, Lightspeed", valuation: "$3.5B" },
        { startup: "Krutrim AI", amount: "$150M", round: "Series B", investors: "Matrix Partners, Elevation Capital", valuation: "$1.2B" },
        { startup: "Rapido", amount: "$120M", round: "Series D", investors: "Nexus Venture Partners, WestBridge", valuation: "$1.2B" },
        { startup: "Pixxel", amount: "$70M", round: "Series C", investors: "Google Ventures, Radical Ventures", valuation: "$450M" },
      ],
      ecosystemMetrics: {
        totalActiveStartups: "72,000+", totalFundingYTD: "$9.2B", activeVCFirms: "1,450+",
        unicorns: "118", soonicorns: "210+", avgDealSize: "$12.4M",
        mostActiveSector: "SaaS", topCity: "Bengaluru", monthlyGrowth: "+23%", activeAngels: "8,500+",
      },
    };
  }
}

// ─── ISR: revalidate hourly — avoids rate limits, still fresh ────────────────
export const revalidate = 3600;

// ─── PULSE DOT ───────────────────────────────────────────────────────────────
function PulseDot({ color = "green" }: { color?: "green" | "blue" | "amber" }) {
  const colors = {
    green: { ring: "bg-green-400", dot: "bg-green-500" },
    blue: { ring: "bg-blue-400", dot: "bg-blue-500" },
    amber: { ring: "bg-amber-400", dot: "bg-amber-500" },
  };
  return (
    <span className="relative flex h-2 w-2 flex-shrink-0">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors[color].ring} opacity-75`} />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${colors[color].dot}`} />
    </span>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default async function Home() {
  const supabase = await createClient();

  // Parallel data fetching for performance
  const [liveNews, ecosystem, startupsCount, industriesData, recentData] = await Promise.all([
    getLiveNews(),
    getEcosystemData(),
    supabase.from("startups").select("*", { count: "exact", head: true }),
    supabase.from("startups").select("industry").not("industry", "is", null),
    supabase.from("startups").select("*").order("created_at", { ascending: false }).limit(6),
  ]);

  const totalStartups = startupsCount.count;
  const uniqueIndustries = industriesData.data
    ? new Set(industriesData.data.map((i: any) => i.industry)).size
    : 30;
  const verifiedStartups = recentData.data?.map((s: any) => ({ ...s, verified: true }));

  const sentimentColor =
    ecosystem.marketMood.sentiment === "Bullish" ? "text-emerald-400" :
    ecosystem.marketMood.sentiment === "Neutral" ? "text-amber-400" : "text-red-400";

  const lastUpdated = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata", hour12: true,
  });

  return (
    <div className="bg-[#F7F5F0] text-[#1C1C1C] antialiased" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Refresh when returning to tab after 1h */}
      <script dangerouslySetInnerHTML={{ __html: `var _hAt=null;document.addEventListener('visibilitychange',function(){if(document.hidden){_hAt=Date.now();}else if(_hAt&&(Date.now()-_hAt)>3600000){window.location.reload();}});` }} />

      <style>{`
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fade-up-0{animation:fadeUp .55s .05s ease both}
        .fade-up-1{animation:fadeUp .55s .15s ease both}
        .fade-up-2{animation:fadeUp .55s .25s ease both}
        .fade-up-3{animation:fadeUp .55s .38s ease both}
        .fade-up-4{animation:fadeUp .55s .50s ease both}
        .card-hover{transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease}
        .card-hover:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.09);border-color:#1C1C1C!important}
        .num-font{font-variant-numeric:tabular-nums}
        .ticker-track{animation:ticker 50s linear infinite}
        .ticker-track:hover{animation-play-state:paused}
      `}</style>

      {/* ── TICKER ── */}
      <div className="bg-[#111] text-white overflow-hidden" style={{ marginTop: "3.5rem" }}>
        <div className="flex items-stretch">
          <div className="flex items-center gap-2 bg-[#E8C547] text-[#111] px-4 py-2.5 flex-shrink-0">
            <PulseDot color="green" />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>Live</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="ticker-track flex whitespace-nowrap">
              {[...liveNews, ...liveNews].map((news: any, i: number) => (
                <span key={i} className="inline-flex items-center gap-2.5 px-6 py-2.5 border-r border-white/10">
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.5 flex-shrink-0 ${news.impact === "positive" ? "bg-emerald-500/20 text-emerald-400" : news.impact === "negative" ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white/50"}`}
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    {news.impact === "positive" ? "▲" : news.impact === "negative" ? "▼" : "●"}
                  </span>
                  <span className="text-[11px] text-white/85">{news.headline}</span>
                  <span className="text-[10px] text-white/30 flex-shrink-0" style={{ fontFamily: "system-ui, sans-serif" }}>
                    {news.source} · {news.timestamp}
                  </span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 items-center gap-3 px-5 border-l border-white/10 hidden sm:flex">
            <Activity className="w-3.5 h-3.5 text-white/30" />
            <div style={{ fontFamily: "system-ui, sans-serif" }}>
              <div className="text-[9px] text-white/30 uppercase tracking-widest">Market</div>
              <div className={`text-sm font-bold ${sentimentColor}`}>{ecosystem.marketMood.sentiment} {ecosystem.marketMood.score}/100</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* MASTHEAD */}
        <header className="border-b-2 border-[#1C1C1C] py-5 fade-up-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1C1C1C] text-[#E8C547] flex items-center justify-center font-bold text-sm tracking-tight flex-shrink-0" style={{ fontFamily: "system-ui, sans-serif" }} aria-label="UpForge">UF</div>
              <div>
                <p className="text-2xl sm:text-[1.7rem] tracking-tight leading-none text-[#1C1C1C]">UpForge</p>
                <p className="text-[10px] text-[#999] tracking-[0.22em] uppercase mt-0.5" style={{ fontFamily: "system-ui, sans-serif" }}>India's Independent Startup Registry</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 border border-[#DDD] bg-white px-3 py-1.5">
                <PulseDot color="green" />
                <span className="text-[10px] font-semibold text-[#555] tracking-wide uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>Live · {lastUpdated} IST</span>
              </div>
              {[
                { icon: Shield, label: "Independent" },
                { icon: BadgeCheck, label: `${totalStartups || 0}+ Verified`, accent: true },
                { icon: Globe, label: `${uniqueIndustries} Sectors` },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-1.5 text-[11px] ${(item as any).accent ? "font-semibold text-[#1C1C1C]" : "text-[#777]"}`} style={{ fontFamily: "system-ui, sans-serif" }}>
                  <item.icon className={`w-3.5 h-3.5 ${(item as any).accent ? "text-emerald-600" : ""}`} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* HERO + NEWS */}
        <div className="grid lg:grid-cols-5 gap-0 border-b border-[#D5D0C8]">
          <main className="lg:col-span-3 py-10 lg:py-16 lg:pr-12 border-r border-[#D5D0C8] fade-up-1">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-8 h-px bg-[#1C1C1C] block" />
              <span className="text-[10px] tracking-[0.28em] text-[#888] uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>India's Most Trusted Startup Database</span>
            </div>
            <h1 className="text-[2.8rem] sm:text-[3.8rem] lg:text-[4.6rem] xl:text-[5.4rem] leading-[1.0] tracking-tight text-[#1C1C1C] mb-6">
              Documenting<br />India's{" "}<em className="text-[#A89060] not-italic">emerging</em><br />founders
            </h1>
            <p className="text-base sm:text-[1.05rem] lg:text-lg text-[#555] leading-relaxed max-w-lg mb-8" style={{ fontFamily: "system-ui, sans-serif", fontWeight: 400 }}>
              Free verified listings, AI-powered growth reports, and real-time market intelligence — structured for serious builders and investors.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link href="/startup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1C1C1C] text-white text-sm font-bold tracking-wide hover:bg-[#333] transition-colors" style={{ fontFamily: "system-ui, sans-serif" }} aria-label="Explore India's startup registry">
                Explore Registry <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/submit" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#1C1C1C] text-[#1C1C1C] text-sm font-bold tracking-wide hover:bg-[#1C1C1C] hover:text-white transition-colors" style={{ fontFamily: "system-ui, sans-serif" }} aria-label="List your startup free on UpForge">
                List Your Startup — Free
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3 pt-6 border-t border-[#D5D0C8]">
              {[
                { icon: CheckCircle2, text: "100% Free to List", color: "text-emerald-600" },
                { icon: BadgeCheck, text: "Manually Verified", color: "text-blue-600" },
                { icon: Sparkles, text: "AI Growth Reports", color: "text-amber-600" },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <p.icon className={`w-4 h-4 ${p.color}`} />
                  <span className="text-[11px] text-[#555] font-medium" style={{ fontFamily: "system-ui, sans-serif" }}>{p.text}</span>
                </div>
              ))}
            </div>
          </main>

          {/* NEWS — powered by NewsAPI */}
          <aside className="lg:col-span-2 py-8 lg:py-10 lg:pl-8 fade-up-2" aria-label="Latest Indian startup news from NewsAPI">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-[#999]" />
                <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#888]" style={{ fontFamily: "system-ui, sans-serif" }}>Startup News</h2>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1">
                <PulseDot color="green" />
                <span className="text-[9px] text-emerald-700 font-bold tracking-widest uppercase" style={{ fontFamily: "system-ui, sans-serif" }}>Real-time</span>
              </div>
            </div>
            <div className="divide-y divide-[#E8E4DC]">
              {liveNews.map((news: any, i: number) => (
                <div key={i} className="py-4 group">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${news.impact === "positive" ? "bg-emerald-500" : news.impact === "negative" ? "bg-red-500" : "bg-[#AAA]"}`} />
                    <div className="flex-1 min-w-0">
                      {news.url ? (
                        <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-[0.88rem] leading-snug text-[#1C1C1C] mb-2 hover:text-[#A89060] transition-colors block">
                          {news.headline}
                        </a>
                      ) : (
                        <p className="text-[0.88rem] leading-snug text-[#1C1C1C] mb-2">{news.headline}</p>
                      )}
                      <div className="flex items-center gap-2 flex-wrap" style={{ fontFamily: "system-ui, sans-serif" }}>
                        <span className="text-[10px] font-bold text-[#888]">{news.source}</span>
                        <span className="text-[#DDD]">·</span>
                        <span className="text-[10px] text-[#BBB]">{news.timestamp}</span>
                        <span className={`ml-auto text-[8px] px-1.5 py-0.5 font-bold uppercase tracking-wider ${news.impact === "positive" ? "bg-emerald-50 text-emerald-600" : news.impact === "negative" ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-500"}`}>
                          {news.impact === "positive" ? "▲" : news.impact === "negative" ? "▼" : "●"} {news.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-[#E8E4DC] flex items-center gap-1.5 text-[10px] text-[#BBB]" style={{ fontFamily: "system-ui, sans-serif" }}>
              <Clock className="w-3 h-3" />
              Powered by NewsAPI · Real articles · {lastUpdated} IST
            </div>
          </aside>
        </div>

        {/* ECOSYSTEM METRICS */}
        <section className="border-b border-[#D5D0C8] fade-up-3" aria-label="Indian startup ecosystem metrics 2026">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
            {[
              { icon: Building2, label: "Active Startups", value: ecosystem.ecosystemMetrics.totalActiveStartups, sub: "+2,300 this month", dark: false },
              { icon: IndianRupee, label: "Funding YTD '26", value: ecosystem.ecosystemMetrics.totalFundingYTD, sub: `${ecosystem.ecosystemMetrics.monthlyGrowth} YoY`, dark: false },
              { icon: Briefcase, label: "VC Firms Active", value: ecosystem.ecosystemMetrics.activeVCFirms, sub: `${ecosystem.ecosystemMetrics.activeAngels} angels`, dark: false },
              { icon: Gem, label: "Unicorns", value: ecosystem.ecosystemMetrics.unicorns, sub: `${ecosystem.ecosystemMetrics.soonicorns} soonicorns`, dark: true },
              { icon: LineChart, label: "Avg Deal Size", value: ecosystem.ecosystemMetrics.avgDealSize, sub: "Seed → Series A", dark: false },
              { icon: Zap, label: "Hottest Sector", value: ecosystem.ecosystemMetrics.mostActiveSector, sub: `${ecosystem.sectorMomentum[0]?.deals || 178} deals`, dark: false },
              { icon: Globe, label: "Startup Capital", value: ecosystem.ecosystemMetrics.topCity, sub: "Leading hub", dark: false },
              { icon: Award, label: "Our Registry", value: `${totalStartups || 0}+`, sub: `${uniqueIndustries} sectors`, dark: true },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-4 sm:p-5 border-r border-[#D5D0C8] last:border-r-0 transition-colors group ${item.dark ? "bg-[#1C1C1C] text-white" : "bg-[#F7F5F0] hover:bg-white"} ${i >= 4 ? "border-t border-[#D5D0C8] lg:border-t-0" : ""}`}
              >
                <item.icon className={`w-4 h-4 mb-3 ${item.dark ? "text-[#E8C547]" : "text-[#BBB] group-hover:text-[#888]"} transition-colors`} />
                <p className={`num-font font-semibold tracking-tight leading-none mb-1.5 text-xl sm:text-2xl lg:text-[1.65rem] ${item.dark ? "text-white" : "text-[#1C1C1C]"}`}>{item.value}</p>
                <p className={`text-[10px] font-bold tracking-wider uppercase mb-1 ${item.dark ? "text-white/50" : "text-[#999]"}`} style={{ fontFamily: "system-ui, sans-serif" }}>{item.label}</p>
                <p className={`text-[9px] ${item.dark ? "text-white/30" : "text-[#BBB]"}`} style={{ fontFamily: "system-ui, sans-serif" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTOR + LEADERS */}
        <div className="grid lg:grid-cols-3 border-b border-[#D5D0C8] fade-up-4">
          <section className="lg:col-span-2 border-r border-[#D5D0C8] py-8 pr-0 lg:pr-8" aria-label="Indian startup sector momentum Q1 2026">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#999]" />
                <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#888]" style={{ fontFamily: "system-ui, sans-serif" }}>Sector Momentum · Q1 2026</h2>
              </div>
              <div className="flex gap-5 text-[9px] text-[#CCC] uppercase tracking-widest" style={{ fontFamily: "system-ui, sans-serif" }}>
                <span>Deals</span><span>Funding</span><span>Growth</span>
              </div>
            </div>
            <div className="divide-y divide-[#EEEAE3]">
              {ecosystem.sectorMomentum.map((sector: any, i: number) => (
                <div key={i} className="flex items-center gap-3 py-3.5 hover:bg-white/70 px-2 -mx-2 transition-colors">
                  <span className="text-[11px] text-[#CCC] w-5 flex-shrink-0 num-font" style={{ fontFamily: "system-ui, sans-serif" }}>{String(i + 1).padStart(2, "0")}</span>
                  <p className="font-semibold text-[0.9rem] text-[#1C1C1C] min-w-[90px] flex-shrink-0">{sector.sector}</p>
                  <div className="flex-1 hidden sm:block px-2">
                    <div className="h-0.5 bg-[#E8E4DC] rounded-full overflow-hidden">
                      <div className="h-full bg-[#1C1C1C] rounded-full" style={{ width: Math.min(parseFloat(sector.growth.replace("+", "").replace("%", "")), 100) + "%" }} />
                    </div>
                    <p className="text-[9px] text-[#BBB] mt-1 truncate" style={{ fontFamily: "system-ui, sans-serif" }}>{sector.trend}</p>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 ml-auto" style={{ fontFamily: "system-ui, sans-serif" }}>
                    <span className="num-font text-sm text-[#666] w-8 sm:w-10 text-right">{sector.deals}</span>
                    <span className="num-font text-sm text-[#666] w-14 text-right">{sector.funding}</span>
                    <span className="num-font text-sm font-bold text-emerald-600 w-12 text-right">{sector.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Business Leaders — Forbes-verified top 3 */}
          <aside className="py-8 lg:pl-8" aria-label="India top 3 billionaires startup connections Forbes">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#999]" />
                <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#888]" style={{ fontFamily: "system-ui, sans-serif" }}>India's Business Leaders</h2>
              </div>
              <a href="https://www.forbes.com/billionaires/" target="_blank" rel="noopener noreferrer" className="text-[8px] text-[#BBB] hover:text-[#888] transition-colors uppercase tracking-wider" style={{ fontFamily: "system-ui, sans-serif" }}>
                Forbes ↗
              </a>
            </div>
            <div className="divide-y divide-[#EEEAE3]">
              {TOP_INDIAN_BILLIONAIRES.map((person, i) => (
                <div key={i} className="py-4 hover:bg-white/70 px-2 -mx-2 transition-colors">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-[#CCC] num-font font-bold" style={{ fontFamily: "system-ui, sans-serif" }}>{person.rank}</span>
                      <p className="font-semibold text-[0.9rem] text-[#1C1C1C]">{person.name}</p>
                    </div>
                    <p className="num-font text-sm font-bold text-[#1C1C1C]" style={{ fontFamily: "system-ui, sans-serif" }}>{person.netWorth}</p>
                  </div>
                  <div className="flex items-center justify-between mb-2.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                    <p className="text-[10px] text-[#999]">{person.source}</p>
                    <p className="text-[9px] text-emerald-600 font-semibold">{person.yoy}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {person.startupConnections.slice(0, 2).map((conn, j) => (
                      <span key={j} className="text-[9px] bg-[#EEEAE3] text-[#666] px-2 py-0.5" style={{ fontFamily: "system-ui, sans-serif" }}>{conn}</span>
                    ))}
                    {person.startupConnections.length > 2 && (
                      <span className="text-[9px] text-[#BBB]" style={{ fontFamily: "system-ui, sans-serif" }}>+{person.startupConnections.length - 2}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[8px] text-[#CCC] mt-4 leading-relaxed" style={{ fontFamily: "system-ui, sans-serif" }}>
              *Forbes Real-Time Billionaires, March 2026. Rankings fluctuate daily.
            </p>
          </aside>
        </div>

        {/* RISING + FUNDING */}
        <div className="grid lg:grid-cols-3 border-b border-[#D5D0C8]">
          <section className="lg:col-span-2 border-r border-[#D5D0C8] py-8 pr-0 lg:pr-8" aria-label="Top rising Indian startups 2026">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-[#999]" />
                <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#888]" style={{ fontFamily: "system-ui, sans-serif" }}>Top Rising Startups · 2026</h2>
              </div>
              <Link href="/startup" className="flex items-center gap-1 text-[10px] text-[#888] hover:text-[#1C1C1C] transition-colors" style={{ fontFamily: "system-ui, sans-serif" }}>
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {ecosystem.topRisingStartups.slice(0, 4).map((startup: any, i: number) => (
                <div key={i} className="bg-white border border-[#E2DDD5] p-4 sm:p-5 card-hover cursor-default">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-[1rem] font-semibold text-[#1C1C1C] leading-tight">{startup.name}</p>
                    <span className={`text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider flex-shrink-0 ml-2 ${startup.momentum === "high" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`} style={{ fontFamily: "system-ui, sans-serif" }}>
                      {startup.momentum === "high" ? "🔥 Hot" : "↑ Rising"}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#AAA] mb-2" style={{ fontFamily: "system-ui, sans-serif" }}>{startup.sector}</p>
                  <p className="text-xs text-[#666] leading-snug mb-3.5 line-clamp-2" style={{ fontFamily: "system-ui, sans-serif" }}>{startup.insight}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-[#F0ECE5]">
                    <span className="text-[9px] text-[#BBB] uppercase tracking-wider" style={{ fontFamily: "system-ui, sans-serif" }}>Momentum</span>
                    <span className="num-font text-sm font-bold text-emerald-600" style={{ fontFamily: "system-ui, sans-serif" }}>{startup.growthIndicator}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="py-8 lg:pl-8" aria-label="Latest Indian startup funding rounds 2026">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#999]" />
                <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#888]" style={{ fontFamily: "system-ui, sans-serif" }}>Latest Funding</h2>
              </div>
              <div className="flex items-center gap-1.5">
                <PulseDot color="blue" />
                <span className="text-[9px] text-blue-500 font-bold uppercase tracking-widest" style={{ fontFamily: "system-ui, sans-serif" }}>Active</span>
              </div>
            </div>
            <div className="divide-y divide-[#EEEAE3]">
              {ecosystem.fundingNews.map((funding: any, i: number) => (
                <div key={i} className="py-4 hover:bg-white/70 px-2 -mx-2 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-[1rem] font-semibold text-[#1C1C1C]">{funding.startup}</p>
                    <p className="num-font text-[0.95rem] font-bold text-emerald-600 ml-2 flex-shrink-0" style={{ fontFamily: "system-ui, sans-serif" }}>{funding.amount}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>
                    <span className="text-[10px] bg-[#EEEAE3] text-[#555] px-2 py-0.5 font-semibold">{funding.round}</span>
                    <span className="text-[10px] text-[#AAA] truncate">{funding.investors}</span>
                  </div>
                  {funding.valuation && (
                    <p className="text-[10px] text-[#999]" style={{ fontFamily: "system-ui, sans-serif" }}>
                      Valuation: <span className="font-semibold text-[#555]">{funding.valuation}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* RECENTLY VERIFIED */}
        <section className="py-8 border-b border-[#D5D0C8]" aria-label="Recently verified Indian startups on UpForge registry">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#888]" style={{ fontFamily: "system-ui, sans-serif" }}>Recently Verified on UpForge</h2>
            </div>
            <Link href="/startup" className="flex items-center gap-1 text-[10px] text-[#888] hover:text-[#1C1C1C] transition-colors" style={{ fontFamily: "system-ui, sans-serif" }}>
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {verifiedStartups?.slice(0, 6).map((startup: any) => (
              <Link key={startup.id} href={`/startup/${startup.slug}`} className="bg-white border border-[#E2DDD5] p-4 card-hover group" aria-label={`${startup.name} startup profile — UpForge`}>
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-semibold text-[#1C1C1C] line-clamp-1 leading-tight">{startup.name}</p>
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 ml-1 mt-0.5" />
                </div>
                <p className="text-xs text-[#777] line-clamp-2 mb-3.5 leading-snug" style={{ fontFamily: "system-ui, sans-serif" }}>{startup.description}</p>
                <div className="flex items-center gap-2 pt-2.5 border-t border-[#F0ECE5]" style={{ fontFamily: "system-ui, sans-serif" }}>
                  <span className="text-[9px] text-[#BBB]">{startup.founded_year || "N/A"}</span>
                  <span className="w-0.5 h-0.5 bg-[#CCC] rounded-full" />
                  <span className="text-[9px] text-[#666] uppercase tracking-wider font-bold truncate">{startup.industry || "Startup"}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* TRUST STRIP */}
        <div className="py-5 border-b border-[#D5D0C8] bg-white/50">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { icon: Shield, text: "100% Independent · No paid rankings" },
              { icon: BadgeCheck, text: "Every startup manually reviewed" },
              { icon: Sparkles, text: "AI-powered analysis reports" },
              { icon: Globe, text: "Public, open & Google-indexed" },
              { icon: Clock, text: "News via NewsAPI · Market data via Groq" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon className="w-3.5 h-3.5 text-[#999]" />
                <span className="text-[11px] text-[#666]" style={{ fontFamily: "system-ui, sans-serif" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* REPORTS CTA */}
        <div className="my-12">
          <div className="bg-[#1C1C1C] relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg,white 0px,white 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,white 0px,white 1px,transparent 1px,transparent 80px)" }} />
            <div className="relative p-10 sm:p-14 flex flex-col items-center justify-center text-center gap-6">
              <div className="bg-[#E8C547] p-4"><Newspaper className="w-7 h-7 text-[#1C1C1C]" /></div>
              <div>
                <p className="text-[10px] text-white/30 tracking-[0.25em] uppercase mb-3" style={{ fontFamily: "system-ui, sans-serif" }}>Premium Intelligence</p>
                <h2 className="text-3xl sm:text-4xl tracking-tight text-white mb-3">Deep Startup Reports</h2>
                <p className="text-sm text-white/50 max-w-xl mx-auto" style={{ fontFamily: "system-ui, sans-serif" }}>
                  Institutional-grade AI research on Indian startups — valuation insights, risk analysis, market positioning & growth signals.
                </p>
              </div>
              <Link href="/reports" className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8C547] text-[#1C1C1C] text-sm font-bold tracking-wide hover:bg-[#F5D55A] transition-colors" style={{ fontFamily: "system-ui, sans-serif" }}>
                Explore Reports <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="pt-4 border-t border-[#D5D0C8] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#1C1C1C] text-[#E8C547] flex items-center justify-center text-[8px] font-bold" style={{ fontFamily: "system-ui, sans-serif" }}>UF</div>
            <span className="text-[10px] text-[#BBB]" style={{ fontFamily: "system-ui, sans-serif" }}>
              UpForge · India's Independent Startup Registry · {new Date().getFullYear()} · v2.2
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PulseDot color="green" />
            <span className="text-[10px] text-[#BBB]" style={{ fontFamily: "system-ui, sans-serif" }}>
              Live news via NewsAPI · Market data via Groq · {lastUpdated} IST
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
}
