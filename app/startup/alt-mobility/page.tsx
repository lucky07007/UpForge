"use client"

// app/startup/alt-mobility/page.tsx
// UpForge — Alt Mobility · Dev Arora & Co-Founders Founder Chronicle

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight, Calendar, Users, TrendingUp, MapPin, Truck } from "lucide-react"

// ─── JSON-LD (same as before, keeping it) ─────────────────────────────────
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://upforge.in/startup/alt-mobility#article",
      "headline": "Alt Mobility — How Dev Arora & Team Built India's Largest Full-Stack EV Leasing Platform",
      "description": "Alt Mobility founder story — Dev Arora, Anuj Gupta, Harsh Dev Goyal, Manas Arora & Jayant Gupta built India's most comprehensive EV leasing platform. $17.3M raised. 16,000+ vehicles leased.",
      "url": "https://upforge.in/startup/alt-mobility",
      "datePublished": "2026-03-14T00:00:00+05:30",
      "dateModified": "2026-03-14T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.in/Upforge-alt-mobility.webp",
        "width": 1200,
        "height": 630
      },
      "publisher": {
        "@type": "Organization",
        "name": "UpForge",
        "url": "https://upforge.in",
        "logo": { "@type": "ImageObject", "url": "https://upforge.in/logo.png" }
      },
      "author": { "@type": "Organization", "name": "UpForge Editorial" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "EV Startups India", "item": "https://upforge.in/ev-startups-india" },
        { "@type": "ListItem", "position": 4, "name": "Alt Mobility", "item": "https://upforge.in/startup/alt-mobility" }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────
const STATS = [
  { l: "Total Funding", v: "$17.3M", icon: TrendingUp },
  { l: "Valuation", v: "₹461 Cr", icon: TrendingUp },
  { l: "Founded", v: "2020", icon: Calendar },
  { l: "HQ", v: "New Delhi", icon: MapPin },
  { l: "Vehicles", v: "16,000+", icon: Truck },
  { l: "AUM", v: "₹350 Cr+", icon: TrendingUp },
  { l: "Cities", v: "37+", icon: MapPin },
  { l: "Employees", v: "185+", icon: Users },
]

const TIMELINE = [
  { year: "2014–20", event: "Dev Arora & Anuj Gupta build 8Minute, deploying 100MW+ of rooftop solar across India." },
  { year: "2020–21", event: "Alt Mobility is conceived at IIT Delhi's incubator." },
  { year: "Mar 2022", event: "First deployment: 82 two-wheelers and 10 three-wheelers leased in Delhi." },
  { year: "2023", event: "Fleet crosses 6,500 EVs across 10+ cities. AUM reaches ₹100 crore." },
  { year: "Jan 2024", event: "$6M raised co-led by Shell Ventures, Eurazeo." },
  { year: "Nov 2024", event: "$10M Series A led by Eurazeo. Total funding: $17.3M." },
]

const COLS = [
  {
    h: "Solar Veterans Who Bet on EVs",
    b: `Dev Arora built his first company in rooftop solar. In 2014, he and Anuj Gupta founded 8Minute, deploying over 100MW of clean energy projects. The solar industry taught them: new energy technologies fail to scale not because of technology, but because of financing.\n\nWhen the team looked at EVs in 2020, they recognised the same pattern. "We realised EVs faced the same challenges as solar," Arora says. The solution was the same: remove the upfront cost entirely. Offer a lease.`
  },
  {
    h: "The Full-Stack Leasing Bet",
    b: `Alt Mobility launched in March 2022. While banks demanded 20–25% down payments, Alt took only a three-month deposit. Alt bundled the vehicle with insurance, maintenance, roadside support, and IoT telematics under one contract.\n\n"Traditional financiers just provide loans," Arora explains. "We go beyond financing to ensure vehicle uptime, lower costs, and complete lifecycle management." By 2023, the fleet crossed 6,500 EVs.`
  },
  {
    h: "FleetOS & What's Next",
    b: `At the core of every Alt Mobility lease is FleetOS — proprietary AI and IoT platform. Every leased vehicle carries an IoT device. The data streams into predictive algorithms that flag breakdowns before they happen.\n\nThe Drive-to-Own model lets gig economy drivers graduate from leasing to ownership, with no credit history required. By 2026: 16,000+ vehicles, ₹350 crore+ AUM, across 37+ cities.`
  }
]

const PULL_QUOTE = {
  text: "Traditional financiers just provide loans. We go beyond financing to ensure vehicle uptime, lower costs, and complete lifecycle management.",
  by: "Dev Arora, Co-Founder & CEO, Alt Mobility"
}

const INVESTORS = [
  "Eurazeo (Paris)", "Shell Ventures", "Twynam Earth Fund", "EV2 Ventures",
  "UC Inclusive Credit", "Piper Serica", "PitchRight Ventures", "LetsVenture"
]

const FAQS = [
  { q: "Who founded Alt Mobility?", a: "Dev Arora (CEO), Anuj Gupta (CBO), Harsh Dev Goyal (CPO), Manas Arora (CFO), and Jayant Gupta (CCO) — born out of IIT Delhi's incubator." },
  { q: "How much funding has Alt Mobility raised?", a: "$17.3 million across 5 rounds. Series A of $10 million in Nov 2024 led by Eurazeo." },
  { q: "What is FleetOS?", a: "AI-powered fleet management platform with real-time tracking, predictive maintenance, and driver behaviour analytics." },
  { q: "What is Drive-to-Own?", a: "Enables drivers to transition into EV ownership without credit history or high down payment." },
]

// ─── PAGE ─────────────────────────────────────────────────────────────
export default function AltMobilityPage() {
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
    <div className="min-h-screen bg-[#F3EFE5]">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        .dropcap::first-letter {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 4em;
          font-weight: 900;
          line-height: 0.8;
          float: left;
          margin-right: 0.1em;
          margin-top: 0.05em;
          color: #1A1208;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.5s ease-out forwards;
        }
        @media (min-width: 768px) {
          .three-col-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
          .three-col-grid > div {
            border-right: 1px solid #D8D2C4;
            padding-right: 2rem;
          }
          .three-col-grid > div:last-child {
            border-right: none;
            padding-right: 0;
          }
        }
      `}</style>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Alt Mobility — Dev Arora | India's EV Leasing Platform | UpForge</h1>

      {/* ── BREADCRUMB ── */}
      <nav className="px-4 sm:px-8 py-2 bg-[#EDE9DF] border-b border-[#D8D2C4] font-sans text-[9px]">
        <ol className="flex flex-wrap items-center gap-1.5 text-[#AAA] uppercase tracking-widest">
          <li><Link href="/" className="hover:text-[#1A1208]">UpForge</Link></li>
          <ChevronRight className="w-2.5 h-2.5" />
          <li><Link href="/startup" className="hover:text-[#1A1208]">Startup Registry</Link></li>
          <ChevronRight className="w-2.5 h-2.5" />
          <li><Link href="/ev-startups-india" className="hover:text-[#1A1208]">EV Startups India</Link></li>
          <ChevronRight className="w-2.5 h-2.5" />
          <li><span className="text-[#1A1208] font-semibold">Alt Mobility</span></li>
        </ol>
      </nav>

      {/* ── MASTHEAD ── */}
      <header className="border-b-2 border-[#1A1208]">
        <div className="text-center px-4 py-6 border-b border-[#C8C2B4]">
          <p className="text-[8px] tracking-[0.44em] text-[#AAA] uppercase mb-2 font-sans">UpForge · Startup Registry · Electric Vehicles</p>
          <h2 className="font-serif font-black text-[#1A1208] text-4xl sm:text-5xl md:text-6xl">The Founder Chronicle</h2>
          <p className="italic mt-2 text-[#6B5C40] text-sm sm:text-base">India's independent startup registry — verified, editorial, March 2026</p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 sm:w-24 bg-[#C8C2B4]" />
            <span className="text-[#C8C2B4] text-sm">✦</span>
            <div className="h-px w-16 sm:w-24 bg-[#C8C2B4]" />
          </div>
        </div>
        <div className="flex flex-wrap items-center px-4 sm:px-8 py-2 gap-3 font-sans text-[9px] border-b border-[#C8C2B4]">
          <span className="text-[#AAA] uppercase tracking-widest">Edition · EV</span>
          <span className="text-[#C8C2B4]">|</span>
          <span className="font-black uppercase tracking-wider text-green-600">EV Leasing · March 2026</span>
          <span className="text-[#C8C2B4]">|</span>
          <span className="text-[#AAA]">New Delhi, India</span>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="animate-fade-up max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        
        {/* Desktop Layout: 2 columns */}
        <div className="flex flex-col lg:flex-row gap-8 border-b-2 border-[#1A1208] pb-8">
          
          {/* LEFT COLUMN - Article */}
          <article className="flex-1 lg:pr-8">
            
            {/* Category Tag */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[8.5px] font-black tracking-[0.28em] uppercase px-3 py-1.5 text-white bg-green-600">CLEANTECH / EV</span>
              <span className="text-[9px] text-[#AAA] uppercase">March 2026</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif font-black text-[#1A1208] text-3xl sm:text-4xl md:text-5xl leading-tight mb-5">
              They fixed India's solar financing problem in 2014.
              Then they did it again —{" "}
              <span className="text-green-600">for electric vehicles.</span>
            </h2>

            {/* Deck */}
            <p className="italic text-[#5A4A30] text-base sm:text-lg leading-relaxed mb-6 pb-4 border-b border-[#C8C2B4]">
              Alt Mobility's founders spent six years removing the financing barrier for rooftop solar — 
              then watched the same problem kill EV adoption in India. $17.3M raised. 16,000+ vehicles. 
              ₹350 crore in assets. 37 cities.
            </p>

            {/* Byline */}
            <div className="flex flex-wrap items-center gap-2 text-[9px] text-[#AAA] uppercase font-sans mb-8">
              <span>By UpForge Editorial</span>
              <span>·</span>
              <span>New Delhi</span>
              <span>·</span>
              <span>Est. 2020</span>
              <span>·</span>
              <span>India's EV Fleet OS</span>
            </div>

            {/* Mobile Hero Image */}
            <div className="lg:hidden mb-8">
              <img src="/Upforge-alt-mobility.webp" alt="Dev Arora" className="w-full h-64 object-cover object-top" />
              <div className="px-4 py-3 bg-[#1A1208]">
                <p className="font-serif text-white font-bold">Dev Arora</p>
                <p className="text-white/40 text-[9px] uppercase font-sans">Co-Founder & CEO · Alt Mobility</p>
              </div>
            </div>

            {/* 3 Column Grid for Desktop */}
            <div className="three-col-grid">
              {COLS.map((col, idx) => (
                <div key={idx} className="mb-6">
                  <h3 className="font-sans font-black uppercase text-[11px] mb-3 pb-1 border-b border-green-600">{col.h}</h3>
                  {col.b.split('\n\n').map((p, i) => (
                    <p key={i} className={`text-[13px] leading-relaxed text-[#2C2010] mb-3 ${idx === 0 && i === 0 ? 'dropcap' : ''}`}>{p}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* Pull Quote */}
            <div className="my-8 py-6 text-center border-t-2 border-b border-[#C8C2B4] border-t-green-600">
              <span className="text-3xl text-green-700 block mb-2">❝</span>
              <blockquote className="font-serif italic text-[#1A1208] text-lg sm:text-xl max-w-2xl mx-auto px-4">"{PULL_QUOTE.text}"</blockquote>
              <p className="text-[9px] uppercase tracking-wide text-[#AAA] mt-3 font-sans">— {PULL_QUOTE.by}</p>
            </div>

            {/* Timeline */}
            <div className="mt-8">
              <h4 className="font-sans text-[8.5px] font-black uppercase tracking-wide mb-4 text-green-600 border-b border-green-100 pb-2">Company Timeline</h4>
              <div className="space-y-4">
                {TIMELINE.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-green-600 mt-1.5" />
                      {idx < TIMELINE.length - 1 && <div className="w-px flex-1 bg-green-100 min-h-[24px] mt-1" />}
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase text-green-600">{item.year}</span>
                      <p className="text-xs text-[#2C2010] mt-0.5">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-8">
              <h4 className="font-sans text-[8.5px] font-black uppercase tracking-wide mb-4 text-green-600 border-b border-green-100 pb-2">Frequently Asked Questions</h4>
              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="pb-3 border-b border-[#D8D2C4] last:border-0">
                    <h5 className="font-sans font-bold text-[#1A1208] text-sm mb-1">{faq.q}</h5>
                    <p className="font-sans text-xs text-[#5A4A30]">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* RIGHT COLUMN - Sidebar (Desktop only) */}
          <aside className="hidden lg:block w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-4 space-y-5">
              
              {/* Founder Image */}
              <div className="relative h-80 overflow-hidden">
                <img src="/Upforge-alt-mobility.webp" alt="Dev Arora" className="w-full h-full object-cover object-top" />
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/95 to-transparent">
                  <p className="font-serif text-white font-bold">Dev Arora</p>
                  <p className="text-white/40 text-[9px] uppercase font-sans">Co-Founder & CEO · Alt Mobility</p>
                </div>
              </div>

              {/* Links */}
              <div className="space-y-2">
                <a href="https://alt-mobility.com" target="_blank" rel="noopener" className="flex items-center justify-between px-4 py-2.5 border-2 border-green-600 rounded-sm hover:opacity-80">
                  <span className="font-sans text-[10px] font-bold uppercase text-green-600">alt-mobility.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-green-600" />
                </a>
                <a href="https://linkedin.com/company/altmobility" target="_blank" rel="noopener" className="flex items-center justify-between px-4 py-2.5 border-2 border-[#0077b5] rounded-sm hover:opacity-80">
                  <span className="font-sans text-[10px] font-bold uppercase text-[#0077b5]">LinkedIn — Alt Mobility</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0077b5]" />
                </a>
              </div>

              {/* Stats Box */}
              <div className="border-2 border-[#1A1208]">
                <div className="px-4 py-2 bg-[#1A1208]">
                  <p className="font-sans text-[8px] font-black uppercase tracking-wide text-white">By the Numbers</p>
                </div>
                <div className="grid grid-cols-2 divide-x divide-y">
                  {STATS.map((stat, idx) => (
                    <div key={idx} className="px-3 py-2.5">
                      <div className="flex items-center gap-1 text-[7px] text-[#AAA] uppercase mb-1">
                        <stat.icon className="w-2.5 h-2.5 text-green-600" />
                        {stat.l}
                      </div>
                      <div className="font-serif font-black text-[#1A1208] text-lg">{stat.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investors */}
              <div className="border border-[#D8D2C4]">
                <div className="px-4 py-2 bg-[#F9F7F2] border-b border-[#D8D2C4]">
                  <p className="font-sans text-[8px] font-black uppercase text-[#1A1208]">Key Investors</p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {INVESTORS.map((inv, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-[#2C2010] font-sans">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-sm" />
                      {inv}
                    </div>
                  ))}
                </div>
              </div>

              {/* Also Read */}
              <div>
                <p className="font-sans text-[8px] font-black uppercase tracking-wide text-[#AAA] mb-2">Also Read on UpForge</p>
                <Link href="/startup/ather-energy-ev" className="flex justify-between items-center py-2 border-b border-[#EDE9DF]">
                  <div>
                    <p className="font-sans text-[11px] font-bold text-[#1A1208]">Ather Energy</p>
                    <p className="font-sans text-[9px] text-[#AAA] uppercase">Electric Vehicles · $1.3B</p>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-[#AAA]" />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* ── BOTTOM SEO LINKS ── */}
        <div className="py-8 border-b border-[#C8C2B4]">
          <p className="font-sans text-[9px] tracking-wide uppercase text-[#AAA] mb-4">Explore More EV Startups on UpForge</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "EV Startups India 2026", h: "/ev-startups-india" },
              { l: "Indian Unicorns List", h: "/indian-unicorns" },
              { l: "CleanTech Startups", h: "/cleantech-startups" },
              { l: "Ather Energy Profile", h: "/startup/ather-energy-ev" },
              { l: "EV Leasing Guide", h: "/ev-leasing-india" },
              { l: "Startup Registry", h: "/startup" },
              { l: "Submit Your Startup", h: "/submit" },
            ].map((link) => (
              <Link key={link.h} href={link.h} className="flex items-center justify-between p-3 border border-[#D8D2C4] bg-white hover:border-[#1A1208] transition-all">
                <span className="font-sans text-[10px] font-bold uppercase text-[#1A1208]">{link.l}</span>
                <ChevronRight className="w-2.5 h-2.5 text-[#AAA]" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer className="pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#D8D2C4]">
            <div>
              <p className="font-serif font-bold text-[#1A1208] text-xl">Building India's next unicorn? Get verified on UpForge.</p>
              <p className="font-sans text-sm text-[#6B5C40]">Free startup profiles. Independent verification. Indexed by Google.</p>
            </div>
            <Link href="/submit" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1208] text-white font-bold uppercase text-[11px] font-sans hover:opacity-90">
              List Your Startup — Free <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="font-sans text-[9px] text-[#BBB0A0] mt-4">* Data sourced from public filings, Tracxn, Inc42, and Alt Mobility press releases as of March 2026.</p>
        </footer>
      </main>
    </div>
  )
}
