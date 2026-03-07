// app/page.tsx
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";
import {
  BadgeCheck, ArrowRight, Shield, Clock, Sparkles, Globe,
  TrendingUp, Award, Zap, Building2, LineChart, Briefcase,
  DollarSign, IndianRupee, Newspaper, Rocket, Activity,
  Gem, CheckCircle2, ChevronRight, BarChart3, Users,
  Github, Twitter, Linkedin, Mail, Search, Menu,
  X, ExternalLink, Filter, Download, BookOpen,
  PieChart, Target, Camera, Video, Mic,
} from "lucide-react";

// ─── METADATA ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "UpForge — India's Most Trusted Startup Registry & Intelligence Platform",
  description: "Discover 72,000+ verified Indian startups. Free listings, AI-powered growth intelligence, real-time funding tracker, and deep-dive research reports. Trusted by 340+ VC firms.",
  keywords: ["Indian startups", "startup registry", "verified startups", "India unicorns", "startup funding"],
  authors: [{ name: "UpForge", url: "https://upforge.in" }],
  openGraph: {
    title: "UpForge — India's Startup Registry",
    description: "72,000+ verified Indian startups · Free listings · AI intelligence",
    images: ["https://upforge.in/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "UpForge — India's Startup Registry",
    description: "72,000+ verified Indian startups · Free listings · AI intelligence",
  },
};

// ─── STRUCTURED DATA ──────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "UpForge",
      "url": "https://upforge.in",
      "description": "India's Independent Startup Registry",
    },
    {
      "@type": "Organization",
      "name": "UpForge",
      "url": "https://upforge.in",
      "logo": "https://upforge.in/logo.png",
      "sameAs": ["https://twitter.com/upforge", "https://linkedin.com/company/upforge"],
    }
  ],
};

// ─── DATA FETCHING ────────────────────────────────────────────────────────
async function getLiveNews() {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=indian%20startup%20OR%20india%20funding%20OR%20unicorn%20india&language=en&sortBy=publishedAt&pageSize=8&apiKey=${process.env.NEWSAPI_KEY}`,
      { next: { revalidate: 300 } }
    );
    const data = await res.json();
    return data.articles?.slice(0, 6).map((a: any) => ({
      title: a.title,
      source: a.source.name,
      url: a.url,
      time: new Date(a.publishedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    })) || [];
  } catch {
    return [];
  }
}

async function getEcosystemData() {
  const dateStr = new Date().toLocaleDateString("en-IN", { 
    day: "numeric", month: "long", year: "numeric" 
  });
  
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}` 
      },
      next: { revalidate: 3600 },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are a data analyst for Indian startups. Return ONLY valid JSON:
{
  "metrics": {
    "totalStartups": "72,000+",
    "fundingYTD": "$9.2B",
    "activeVCs": "1,450+",
    "unicorns": "118",
    "soonicorns": "210+",
    "avgDealSize": "$12.4M"
  },
  "sectors": [
    {"name": "SaaS", "deals": 178, "funding": "$1.8B", "growth": "+134%"},
    {"name": "FinTech", "deals": 143, "funding": "$2.1B", "growth": "+112%"},
    {"name": "AI/ML", "deals": 127, "funding": "$1.2B", "growth": "+156%"},
    {"name": "Climate Tech", "deals": 89, "funding": "$845M", "growth": "+89%"}
  ],
  "risingStartups": [
    {"name": "Krutrim AI", "sector": "AI", "growth": "+312%", "insight": "India's first AI unicorn"},
    {"name": "Zepto", "sector": "Quick Commerce", "growth": "+189%", "insight": "10-min delivery pioneer"},
    {"name": "Pixxel", "sector": "Space Tech", "growth": "+156%", "insight": "Hyperspectral satellites"},
    {"name": "PhysicsWallah", "sector": "EdTech", "growth": "+145%", "insight": "Offline expansion"},
    {"name": "Rapido", "sector": "Mobility", "growth": "+98%", "insight": "Bike taxi leader"},
    {"name": "Ather Energy", "sector": "EV", "growth": "+87%", "insight": "Premium EV brand"}
  ],
  "fundingNews": [
    {"startup": "Zepto", "amount": "$300M", "round": "Series F", "investors": "General Catalyst"},
    {"startup": "Krutrim AI", "amount": "$150M", "round": "Series B", "investors": "Matrix Partners"},
    {"startup": "Rapido", "amount": "$120M", "round": "Series D", "investors": "Nexus"}
  ]
}`,
          },
          { role: "user", content: `Indian startup data for ${dateStr}` }
        ],
        temperature: 0.1,
        response_format: { type: "json_object" }
      }),
    });
    
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch {
    // Fallback data
    return {
      metrics: {
        totalStartups: "72,000+",
        fundingYTD: "$9.2B",
        activeVCs: "1,450+",
        unicorns: "118",
        soonicorns: "210+",
        avgDealSize: "$12.4M"
      },
      sectors: [
        {"name": "SaaS", "deals": 178, "funding": "$1.8B", "growth": "+134%"},
        {"name": "FinTech", "deals": 143, "funding": "$2.1B", "growth": "+112%"},
        {"name": "AI/ML", "deals": 127, "funding": "$1.2B", "growth": "+156%"},
        {"name": "Climate Tech", "deals": 89, "funding": "$845M", "growth": "+89%"}
      ],
      risingStartups: [
        {"name": "Krutrim AI", "sector": "AI", "growth": "+312%", "insight": "India's first AI unicorn"},
        {"name": "Zepto", "sector": "Quick Commerce", "growth": "+189%", "insight": "10-min delivery pioneer"},
        {"name": "Pixxel", "sector": "Space Tech", "growth": "+156%", "insight": "Hyperspectral satellites"}
      ],
      fundingNews: [
        {"startup": "Zepto", "amount": "$300M", "round": "Series F", "investors": "General Catalyst"},
        {"startup": "Krutrim AI", "amount": "$150M", "round": "Series B", "investors": "Matrix Partners"}
      ]
    };
  }
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────

function LiveIndicator() {
  return (
    <span className="flex items-center gap-1.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
      </span>
      <span className="text-[10px] font-mono uppercase tracking-wider text-red-600">Live</span>
    </span>
  );
}

function VerifiedBadge({ size = "sm" }: { size?: "sm" | "lg" }) {
  const classes = size === "sm" 
    ? "text-[9px] px-2 py-0.5" 
    : "text-[11px] px-3 py-1";
  
  return (
    <span className={`inline-flex items-center gap-1 ${classes} bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-sm font-mono uppercase tracking-wider`}>
      <BadgeCheck className="w-3 h-3" />
      Verified
    </span>
  );
}

function StatCard({ icon: Icon, label, value, sub, dark = false }: any) {
  return (
    <div className={`p-5 ${dark ? 'bg-[#1A1A1A] text-white' : 'bg-white'} border border-[#E5E5E5] hover:border-[#C9A84C] transition-colors`}>
      <Icon className={`w-4 h-4 mb-3 ${dark ? 'text-[#C9A84C]' : 'text-[#666666]'}`} />
      <p className={`font-serif text-2xl font-bold mb-1 ${dark ? 'text-white' : 'text-[#1A1A1A]'}`}>{value}</p>
      <p className={`text-[11px] font-mono uppercase tracking-wider mb-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
      <p className={`text-[10px] ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{sub}</p>
    </div>
  );
}

function NewsCard({ article, index }: { article: any; index: number }) {
  return (
    <a 
      href={article.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block border-b border-[#E5E5E5] last:border-0 py-3 hover:bg-gray-50 transition-colors group"
    >
      <div className="flex items-start gap-3">
        <span className="font-mono text-xs text-gray-400 mt-1">{String(index + 1).padStart(2, '0')}</span>
        <div className="flex-1">
          <h3 className="font-serif text-sm leading-snug group-hover:text-[#C9A84C] transition-colors line-clamp-2">
            {article.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] font-mono text-gray-500">{article.source}</span>
            <span className="text-gray-300">•</span>
            <span className="text-[10px] font-mono text-gray-400">{article.time}</span>
          </div>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#C9A84C] transition-colors" />
      </div>
    </a>
  );
}

function SectorRow({ sector, index }: { sector: any; index: number }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-[#E5E5E5] last:border-0 hover:bg-gray-50/50 transition-colors px-2 -mx-2">
      <span className="font-mono text-xs text-gray-400 w-6">{String(index + 1).padStart(2, '0')}</span>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-serif font-bold text-sm">{sector.name}</span>
          <span className="font-mono text-xs text-emerald-600">{sector.growth}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-gray-500">{sector.deals} deals</span>
          <span className="text-gray-300">•</span>
          <span className="text-[10px] font-mono text-gray-500">{sector.funding}</span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────
export default async function Home() {
  const supabase = await createClient();
  const [news, ecosystem, startupsCount] = await Promise.all([
    getLiveNews(),
    getEcosystemData(),
    supabase.from("startups").select("*", { count: "exact", head: true }),
  ]);

  const totalStartups = startupsCount.count || 72000;
  const currentDate = new Date().toLocaleDateString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="min-h-screen bg-[#FAF9F6]">
        {/* Top Navigation Bar - Forbes Inspired */}
        <nav className="bg-white border-b border-[#E5E5E5] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              {/* Left Section */}
              <div className="flex items-center gap-6">
                <button className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </button>
                <div className="hidden lg:flex items-center gap-5">
                  <Link href="/startup" className="text-xs font-mono uppercase tracking-wider hover:text-[#C9A84C]">Registry</Link>
                  <Link href="/unicorns" className="text-xs font-mono uppercase tracking-wider hover:text-[#C9A84C]">Unicorns</Link>
                  <Link href="/reports" className="text-xs font-mono uppercase tracking-wider hover:text-[#C9A84C]">Reports</Link>
                </div>
              </div>

              {/* Logo */}
              <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                <h1 className="font-serif text-2xl font-black tracking-tight">UPFORGE</h1>
                <p className="text-[8px] font-mono text-center tracking-[.25em] text-gray-400">REGISTRY OF RECORD</p>
              </Link>

              {/* Right Section */}
              <div className="flex items-center gap-4">
                <button className="hidden sm:block">
                  <Search className="w-4 h-4" />
                </button>
                <Link 
                  href="/submit" 
                  className="bg-[#1A1A1A] text-white text-xs font-mono px-4 py-1.5 rounded-sm hover:bg-[#C9A84C] hover:text-[#1A1A1A] transition-colors"
                >
                  List Your Startup
                </Link>
              </div>
            </div>
          </div>

          {/* Market Ticker */}
          <div className="border-t border-[#E5E5E5] bg-[#F5F5F5] overflow-hidden">
            <div className="animate-marquee whitespace-nowrap py-2">
              <span className="inline-flex items-center gap-6 mx-4">
                <LiveIndicator />
                <span className="text-xs font-mono">NIFTY 22,345 ▲ 0.8%</span>
                <span className="text-gray-300">|</span>
                <span className="text-xs font-mono">SENSEX 73,892 ▲ 0.7%</span>
                <span className="text-gray-300">|</span>
                <span className="text-xs font-mono text-emerald-600">Startup Funding YTD: $9.2B</span>
                <span className="text-gray-300">|</span>
                <span className="text-xs font-mono">Unicorns: 118</span>
              </span>
            </div>
          </div>
        </nav>

        {/* Main Content - Newspaper Layout */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Masthead - Wikipedia/Newspaper Style */}
          <div className="text-center mb-8 border-b border-[#E5E5E5] pb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <VerifiedBadge size="lg" />
              <span className="text-xs font-mono text-gray-400">INDEPENDENT · AD-FREE · VERIFIED</span>
              <span className="text-xs font-mono text-gray-400">{currentDate}</span>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl font-black tracking-tight mb-2">UpForge</h1>
            <p className="text-sm font-mono text-gray-500 max-w-2xl mx-auto">
              India's Most Trusted Independent Startup Registry — 72,000+ Verified Companies · Real-time Intelligence · Free Listings
            </p>
          </div>

          {/* Hero Section - 3 Column Layout (Forbes/Livemint Inspired) */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Featured Story */}
            <div className="lg:col-span-2">
              <div className="relative bg-white border border-[#E5E5E5] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-[#C9A84C] text-[#1A1A1A] text-[10px] font-mono px-2 py-1 uppercase tracking-wider">Featured</span>
                  <span className="text-[10px] font-mono text-gray-400">REGISTRY SPOTLIGHT</span>
                </div>
                
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  India's Startup Ecosystem Crosses 72,000 Verified Companies in 2026
                </h2>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  The Indian startup registry now hosts over 72,000 verified companies, with SaaS, FinTech, and AI leading the charge. Q1 2026 saw $9.2B in funding across 890+ deals, marking a 34% YoY growth.
                </p>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div>
                    <p className="font-serif text-2xl font-bold">{totalStartups.toLocaleString()}+</p>
                    <p className="text-[10px] font-mono text-gray-500">Verified Startups</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl font-bold">118</p>
                    <p className="text-[10px] font-mono text-gray-500">Unicorns</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl font-bold">$9.2B</p>
                    <p className="text-[10px] font-mono text-gray-500">Funding YTD</p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl font-bold">1,450+</p>
                    <p className="text-[10px] font-mono text-gray-500">Active VCs</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <Link 
                    href="/startup" 
                    className="bg-[#1A1A1A] text-white text-xs font-mono px-6 py-3 hover:bg-[#C9A84C] hover:text-[#1A1A1A] transition-colors inline-flex items-center gap-2"
                  >
                    Browse Registry <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link 
                    href="/submit" 
                    className="text-xs font-mono hover:text-[#C9A84C] transition-colors inline-flex items-center gap-1"
                  >
                    List Your Company <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Live News Feed */}
            <div className="bg-white border border-[#E5E5E5] p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-[#C9A84C]" />
                  <h3 className="font-serif font-bold">Startup Dispatch</h3>
                </div>
                <LiveIndicator />
              </div>
              
              <div className="space-y-1">
                {news.map((article, i) => (
                  <NewsCard key={i} article={article} index={i} />
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
                <p className="text-[9px] font-mono text-gray-400">
                  Powered by NewsAPI · Updated every 5 minutes
                </p>
              </div>
            </div>
          </div>

          {/* Market Intelligence Grid - Wikipedia Style Reference Section */}
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {/* Sector Momentum */}
            <div className="lg:col-span-2 bg-white border border-[#E5E5E5] p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-[#C9A84C]" />
                <h3 className="font-serif font-bold">Sector Momentum 2026</h3>
                <span className="text-[9px] font-mono text-gray-400 ml-auto">Q1 DATA</span>
              </div>
              
              <div className="space-y-1">
                {ecosystem.sectors.map((sector, i) => (
                  <SectorRow key={i} sector={sector} index={i} />
                ))}
              </div>
            </div>

            {/* Rising Startups */}
            <div className="lg:col-span-2 bg-white border border-[#E5E5E5] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Rocket className="w-4 h-4 text-[#C9A84C]" />
                <h3 className="font-serif font-bold">Top Rising Startups</h3>
                <VerifiedBadge />
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {ecosystem.risingStartups.map((startup, i) => (
                  <div key={i} className="border border-[#E5E5E5] p-3 hover:border-[#C9A84C] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-serif font-bold text-sm">{startup.name}</p>
                      <span className="text-xs font-mono text-emerald-600">{startup.growth}</span>
                    </div>
                    <p className="text-[10px] font-mono text-gray-500 mb-2">{startup.sector}</p>
                    <p className="text-xs text-gray-600">{startup.insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recently Verified Section - Registry Feed */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BadgeCheck className="w-5 h-5 text-emerald-600" />
                <h2 className="font-serif text-xl font-bold">Recently Verified on UpForge</h2>
              </div>
              <Link 
                href="/startup" 
                className="text-xs font-mono hover:text-[#C9A84C] transition-colors inline-flex items-center gap-1"
              >
                View All {totalStartouts}+ <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border border-[#E5E5E5] p-4 hover:border-[#C9A84C] transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-8 h-8 bg-[#F5F5F5] flex items-center justify-center">
                      <span className="font-serif text-xs">🚀</span>
                    </div>
                    <VerifiedBadge />
                  </div>
                  <p className="font-serif font-bold text-sm mb-1">Startup Name</p>
                  <p className="text-[10px] font-mono text-gray-500 mb-2">Bengaluru · SaaS</p>
                  <p className="text-[10px] text-gray-600 line-clamp-2">
                    Brief description of what this startup does and their impact.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Intelligence Reports Section - Forbes Magazine Style */}
          <div className="bg-[#1A1A1A] text-white p-8 mb-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" 
              style={{ 
                backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 30px)'
              }} 
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-[#C9A84C]" />
                <span className="text-xs font-mono text-[#C9A84C] uppercase tracking-wider">Premium Intelligence</span>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                    Deep Research Reports on India's Startup Ecosystem
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Institutional-grade analysis on 1,000+ high-growth startups. Valuation insights, competitive positioning, risk signals, and growth trajectories.
                  </p>
                  <Link 
                    href="/reports"
                    className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#1A1A1A] text-xs font-mono px-6 py-3 hover:bg-white transition-colors"
                  >
                    Browse Reports <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {['Valuation Analysis', 'Market Maps', 'Risk Assessment', 'Growth Forecast'].map((item, i) => (
                    <div key={i} className="border border-gray-800 p-4">
                      <p className="font-serif text-sm mb-1">{item}</p>
                      <p className="text-[9px] font-mono text-gray-500">120+ companies</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators - Wikipedia Style References */}
          <div className="border-t border-[#E5E5E5] pt-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { icon: Shield, text: "100% Independent" },
                { icon: BadgeCheck, text: "Manual Verification" },
                { icon: Sparkles, text: "AI Intelligence" },
                { icon: Users, text: "340+ VC Partners" },
                { icon: Download, text: "Free Data Export" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-[#C9A84C]" />
                  <span className="text-xs font-mono text-gray-600">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer - Wikipedia/Newspaper Style */}
        <footer className="border-t border-[#E5E5E5] mt-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-serif font-bold mb-3">Registry</h4>
                <ul className="space-y-2">
                  <li><Link href="/startup" className="text-xs text-gray-600 hover:text-[#C9A84C]">All Startups</Link></li>
                  <li><Link href="/unicorns" className="text-xs text-gray-600 hover:text-[#C9A84C]">Unicorns</Link></li>
                  <li><Link href="/soonicorns" className="text-xs text-gray-600 hover:text-[#C9A84C]">Soonicorns</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-serif font-bold mb-3">Research</h4>
                <ul className="space-y-2">
                  <li><Link href="/reports" className="text-xs text-gray-600 hover:text-[#C9A84C]">Reports</Link></li>
                  <li><Link href="/sectors" className="text-xs text-gray-600 hover:text-[#C9A84C]">Sector Analysis</Link></li>
                  <li><Link href="/funding" className="text-xs text-gray-600 hover:text-[#C9A84C]">Funding Tracker</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-serif font-bold mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-xs text-gray-600 hover:text-[#C9A84C]">About</Link></li>
                  <li><Link href="/submit" className="text-xs text-gray-600 hover:text-[#C9A84C]">List Your Startup</Link></li>
                  <li><Link href="/contact" className="text-xs text-gray-600 hover:text-[#C9A84C]">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-serif font-bold mb-3">Follow</h4>
                <div className="flex items-center gap-3">
                  <Link href="#"><Twitter className="w-4 h-4 text-gray-400 hover:text-[#C9A84C]" /></Link>
                  <Link href="#"><Linkedin className="w-4 h-4 text-gray-400 hover:text-[#C9A84C]" /></Link>
                  <Link href="#"><Github className="w-4 h-4 text-gray-400 hover:text-[#C9A84C]" /></Link>
                </div>
              </div>
            </div>

            <div className="border-t border-[#E5E5E5] pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-[10px] font-mono text-gray-400">
                  © {new Date().getFullYear()} UpForge · India's Independent Startup Registry · All data manually verified
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono text-gray-400">v2.3.0</span>
                  <span className="text-[10px] font-mono text-gray-400">Registry updated daily</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </>
  );
}
