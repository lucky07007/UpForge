"use client"

// app/startup/alt-mobility/page.tsx
// UpForge — Alt Mobility · Dev Arora & Co-Founders Founder Chronicle
// SEO: Enhanced with FAQPage, Organization, BreadcrumbList, and Article schema
// Target keywords: EV leasing India, Alt Mobility, Dev Arora, electric vehicle fleet management, FleetOS

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight, Zap, MapPin, Calendar, Users, TrendingUp, Shield, Battery, Cloud, BarChart3, Truck, Smartphone } from "lucide-react"

// ─── ENHANCED JSON-LD WITH MORE SCHEMA TYPES ─────────────────────────────────
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://upforge.in/startup/alt-mobility#article",
      "headline": "Alt Mobility — How Dev Arora & Team Built India's Largest Full-Stack EV Leasing Platform",
      "description": "Alt Mobility founder story — Dev Arora, Anuj Gupta, Harsh Dev Goyal, Manas Arora & Jayant Gupta built India's most comprehensive EV leasing and lifecycle management platform from IIT Delhi's incubator. $17.3M raised. 16,000+ vehicles leased. ₹350Cr+ AUM. FleetOS telematics. Drive-to-Own model.",
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
      "author": { "@type": "Organization", "name": "UpForge Editorial" },
      "about": [
        {
          "@type": "Person",
          "name": "Dev Arora",
          "jobTitle": "Co-Founder & CEO",
          "worksFor": { "@type": "Organization", "name": "Alt Mobility" },
          "sameAs": ["https://www.linkedin.com/company/altmobility/"]
        },
        {
          "@type": "Person",
          "name": "Anuj Gupta",
          "jobTitle": "Co-Founder & CBO",
          "worksFor": { "@type": "Organization", "name": "Alt Mobility" }
        },
        {
          "@type": "Person",
          "name": "Harsh Dev Goyal",
          "jobTitle": "Co-Founder & CPO",
          "worksFor": { "@type": "Organization", "name": "Alt Mobility" }
        },
        {
          "@type": "Person",
          "name": "Manas Arora",
          "jobTitle": "Co-Founder & CFO",
          "worksFor": { "@type": "Organization", "name": "Alt Mobility" }
        },
        {
          "@type": "Person",
          "name": "Jayant Gupta",
          "jobTitle": "Co-Founder & CCO",
          "worksFor": { "@type": "Organization", "name": "Alt Mobility" }
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "Alt Mobility",
        "url": "https://alt-mobility.com",
        "foundingDate": "2020",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "New Delhi",
          "addressCountry": "IN"
        },
        "description": "Alt Mobility is India's leading full-stack EV leasing and lifecycle management platform, offering vehicle leasing, FleetOS telematics, insurance, maintenance and charging support for B2B commercial fleets.",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 185, "maxValue": 200 },
        "sameAs": [
          "https://alt-mobility.com",
          "https://www.linkedin.com/company/altmobility/",
          "https://twitter.com/mobilityalt"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "EV Startups India", "item": "https://upforge.in/ev-startups-india" },
        { "@type": "ListItem", "position": 4, "name": "Alt Mobility", "item": "https://upforge.in/startup/alt-mobility" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who founded Alt Mobility?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Alt Mobility was co-founded in 2020 by Dev Arora (CEO), Anuj Gupta (CBO), Harsh Dev Goyal (CPO), Manas Arora (CFO), and Jayant Gupta (CCO). The startup was born out of IIT Delhi's incubator. Four of the co-founders are second-time entrepreneurs with prior experience deploying 100MW+ of solar energy projects across India through their venture 8Minute."
          }
        },
        {
          "@type": "Question",
          "name": "How much funding has Alt Mobility raised?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Alt Mobility has raised $17.3 million in total funding across 5 rounds. Their Series A of $10 million in November 2024 was led by Eurazeo, with Shell Ventures, Twynam Earth Fund, and EV2 Ventures also participating. Earlier rounds included a $6 million round co-led by Shell, Eurazeo, EV2, and Twynam in January 2024."
          }
        },
        {
          "@type": "Question",
          "name": "What is FleetOS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "FleetOS is Alt Mobility's proprietary AI-powered fleet management platform. It provides real-time vehicle tracking, predictive and preemptive maintenance diagnostics, driver behaviour analytics, charging station integration, and roadside assistance. IoT devices fitted in every vehicle send continuous data to the platform, enabling Alt Mobility to predict breakdowns and payment defaults before they occur."
          }
        },
        {
          "@type": "Question",
          "name": "What is Alt Mobility's Drive-to-Own model?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Alt Mobility's Drive-to-Own model enables drivers who lease vehicles to transition into EV ownership over time without requiring a credit history, collateral, or high upfront down payment. It reduces total cost of ownership by 30–40% and is designed to promote financial inclusion for gig economy workers and last-mile delivery drivers."
          }
        },
        {
          "@type": "Question",
          "name": "How many EVs has Alt Mobility leased?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As of early 2026, Alt Mobility has leased over 16,000 electric vehicles and manages ₹350 crore+ in Assets Under Management. It operates across 37+ cities in India with access to 7,000+ charging stations and 150+ service garages. The company works with 70+ B2B customers and over 1,000 drivers."
          }
        },
        {
          "@type": "Question",
          "name": "How does Alt Mobility make EVs affordable for fleet operators?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike banks that require 20–25% down payments, Alt Mobility only takes a three-month deposit. Its all-inclusive wet lease model bundles vehicle leasing with insurance, maintenance, registration, telematics, and 24/7 support under one contract. This can reduce total cost compared to traditional financing by up to 62%, making EV fleet transition economically viable even for small operators."
          }
        },
        {
          "@type": "Question",
          "name": "What is Alt Mobility's current valuation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Alt Mobility is currently valued at approximately ₹461 crore (around $55 million USD) based on its Series A funding round in November 2024, which valued the company at post-money ₹461 crore."
          }
        },
        {
          "@type": "Question",
          "name": "Which cities does Alt Mobility operate in?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Alt Mobility operates across 37+ cities in India including Delhi NCR, Mumbai, Bangalore, Pune, Hyderabad, Chennai, Ahmedabad, Jaipur, Lucknow, Kanpur, and more. The company is actively expanding into Uttar Pradesh, Haryana, Maharashtra, and Karnataka."
          }
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://alt-mobility.com#organization",
      "name": "Alt Mobility",
      "url": "https://alt-mobility.com",
      "logo": "https://alt-mobility.com/logo.png",
      "description": "India's leading full-stack EV leasing and lifecycle management platform",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "Product",
      "@id": "https://upforge.in/startup/alt-mobility#fleetos",
      "name": "FleetOS",
      "brand": { "@type": "Brand", "name": "Alt Mobility" },
      "description": "AI-powered fleet management platform with real-time tracking, predictive maintenance, and driver behaviour analytics",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceSpecification": { "@type": "PriceSpecification", "price": "Contact for pricing" }
      }
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Total Funding", v: "$17.3M", icon: TrendingUp },
  { l: "Valuation", v: "₹461 Cr", icon: TrendingUp },
  { l: "Founded", v: "2020", icon: Calendar },
  { l: "HQ", v: "New Delhi", icon: MapPin },
  { l: "Vehicles Leased", v: "16,000+", icon: Truck },
  { l: "AUM", v: "₹350 Cr+", icon: TrendingUp },
  { l: "Cities", v: "37+", icon: MapPin },
  { l: "Employees", v: "185+", icon: Users },
]

const TIMELINE = [
  { year: "2014–20", event: "Dev Arora & Anuj Gupta build 8Minute, deploying 100MW+ of rooftop solar across India. They connect with Manas Arora, Harsh Dev Goyal, and Jayant Gupta in the solar industry." },
  { year: "2020–21", event: "The team identifies EVs facing the same barriers solar once did — unclear residual values, high upfront costs, fragmented after-sales. Alt Mobility is conceived at IIT Delhi's incubator." },
  { year: "Mar 2022", event: "First deployment: 82 two-wheelers and 10 three-wheelers leased to Lightning Logistics in Delhi. The full-stack leasing model — vehicle + insurance + maintenance + telematics — is proven viable." },
  { year: "2023", event: "Fleet crosses 6,500 EVs across 10+ cities. AUM reaches ₹100 crore. Drive-to-Own model launched in Delhi NCR under the Delhi EV Aggregators Policy." },
  { year: "Jan 2024", event: "$6M raised co-led by Shell Ventures, Eurazeo, EV2 Ventures, and Twynam. FleetOS platform expanded with AI-driven predictive maintenance and Fleet GPT." },
  { year: "Nov 2024", event: "$10M Series A led by Eurazeo. Total funding reaches $17.3M. Target: 30,000 vehicles and ₹500 Cr+ AUM by FY2026. Expansion to buses and trucks begins." },
  { year: "2025–26", event: "16,000+ vehicles leased. 37+ cities. 185 employees. ₹150 crore in fuel savings generated. Annual revenue reaches ₹63.4 crore. Expansion to UP, Haryana, Maharashtra, Karnataka underway." },
]

const COLS = [
  {
    h: "Solar Veterans Who Bet on EVs",
    b: `Dev Arora, a computer science graduate from NIT Kurukshetra, built his first company not in tech — but in rooftop solar. In 2014, he and Anuj Gupta founded 8Minute, deploying over 100MW of clean energy projects across homes and industries. Along the way, they met Manas Arora, Harsh Dev Goyal, and Jayant Gupta.\n\nThe solar industry taught them something few people know from the inside: new energy technologies fail to scale not because of the technology, but because of the financing. Buyers don't understand residual values. Lenders won't take the asset risk. The ecosystem is fragmented. Sound familiar?\n\nWhen Jayant Gupta moved into EV manufacturing around 2020, the team immediately recognised the pattern. "We all realised EVs faced the same challenges as solar in its early days," Arora says. "Lack of resale market, unclear residual values, and technology risks." The solution was the same one that had worked for solar: remove the upfront cost entirely. Offer a lease.`
  },
  {
    h: "The Full-Stack Leasing Bet",
    b: `Alt Mobility launched leasing operations in March 2022 with 82 two-wheelers and 10 three-wheelers for Lightning Logistics in Delhi. The model was deceptively simple from the outside — but radically different from anything else in the market.\n\nWhile banks demanded 20–25% down payments, Alt took only a three-month deposit. While NBFCs just disbursed loans, Alt bundled the vehicle with insurance, road tax, maintenance, 24/7 roadside support, and IoT telematics under one all-inclusive contract. Fleet operators didn't just get a vehicle. They got a running cost they could predict — and a single number to call when anything went wrong.\n\n"Traditional financiers just provide loans," Arora explains. "We go beyond financing to ensure vehicle uptime, lower costs, and complete lifecycle management. That's our differentiation." By 2023, the fleet had crossed 6,500 EVs. Revenues were doubling every year.`
  },
  {
    h: "FleetOS, Drive-to-Own & What's Next",
    b: `At the core of every Alt Mobility lease is FleetOS — the company's proprietary AI and IoT platform. Every leased vehicle carries an IoT device. The data it streams — location, battery health, usage patterns, driver behaviour — feeds into predictive algorithms that can flag a breakdown or payment default before it happens.\n\n"We deploy IoT devices in every vehicle," Arora says. "They send data to our servers, allowing us to monitor asset health in real time." The team is now building Fleet GPT — a conversational AI layer on top of FleetOS that lets fleet managers ask plain-language questions about their fleet.\n\nThe Drive-to-Own model takes the social mission further: structured pathways for gig economy drivers to graduate from leasing to full ownership, with no credit history required. By early 2026, Alt Mobility manages 16,000+ vehicles, ₹350 crore+ in AUM, across 37+ cities — and is preparing to expand into buses and trucks for intercity and corporate use.`
  }
]

const PULL_QUOTE = {
  text: "Traditional financiers just provide loans. We go beyond financing to ensure vehicle uptime, lower costs, and complete lifecycle management. That's our differentiation.",
  by: "Dev Arora, Co-Founder & CEO, Alt Mobility"
}

const LESSON = "The best infrastructure businesses solve the same problem twice. Alt Mobility's founders broke the solar adoption barrier in 2014, then applied the same playbook to EVs in 2022 — proving that understanding a financing gap is worth more than any single technology."

const INVESTORS = [
  { name: "Eurazeo (Paris)", location: "France", type: "PE" },
  { name: "Shell Ventures", location: "Netherlands", type: "CVC" },
  { name: "Twynam Earth Fund (Australia)", location: "Australia", type: "VC" },
  { name: "EV2 Ventures", location: "India", type: "VC" },
  { name: "UC Inclusive Credit", location: "India", type: "Debt" },
  { name: "Piper Serica", location: "India", type: "VC" },
  { name: "PitchRight Ventures", location: "India", type: "Angel" },
  { name: "LetsVenture", location: "India", type: "Platform" },
]

const FAQS = [
  {
    q: "Who are the founders of Alt Mobility?",
    a: "Alt Mobility was co-founded in 2020 by Dev Arora (CEO), Anuj Gupta (CBO), Harsh Dev Goyal (CPO), Manas Arora (CFO), and Jayant Gupta (CCO) — born out of IIT Delhi's incubator. Four are second-time entrepreneurs who previously deployed 100MW+ of rooftop solar across India through their venture 8Minute."
  },
  {
    q: "What does Alt Mobility's all-inclusive lease include?",
    a: "Alt Mobility's wet lease bundles the vehicle with vehicle registration, insurance, maintenance, 24/7 roadside assistance, IoT telematics via FleetOS, and access to 7,000+ charging stations — all under one contract and one monthly payment. The model saves fleet operators up to 62% compared to traditional vehicle financing with a bank loan."
  },
  {
    q: "How does Alt Mobility compare to Zypp Electric and MoEving?",
    a: "All three offer EV leasing for commercial fleets in India, but Alt Mobility differentiates through its full-stack FleetOS technology platform, Drive-to-Own model for driver ownership, and its multi-category fleet spanning 2W, 3W, and 4W vehicles. Alt is also the only player in its segment backed by global energy majors Shell Ventures and Twynam Earth Fund."
  },
  {
    q: "Is Alt Mobility profitable?",
    a: "Alt Mobility reported annual revenue of ₹63.4 crore as of March 2025 and has doubled revenues every year since launch. The company is focused on scaling toward profitability as AUM grows toward the ₹500 crore target. Dev Arora has stated that maintaining a lean cost structure has been key to earning investor trust."
  },
]

const RELATED = [
  { name: "Ather Energy", slug: "ather-energy-ev", cat: "Electric Vehicles", val: "$1.3B" },
  { name: "Sarvam AI", slug: "sarvam-ai", cat: "Artificial Intelligence", val: "$1B+" },
  { name: "Agnikul Cosmos", slug: "agnikul-cosmos", cat: "Spacetech", val: "$500M" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AltMobilityPage() {
  const accent = "#16a34a"
  const accentDark = "#15803d"
  const accentBg = "#f0fdf4"
  const accentBorder = "#bbf7d0"

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
    <div className="min-h-screen bg-[#F3EFE5] font-serif">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
        .font-sans { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        .dropcap::first-letter {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 4.2em;
          font-weight: 900;
          line-height: 0.8;
          float: left;
          margin-right: 0.12em;
          margin-top: 0.05em;
          margin-bottom: -0.05em;
          color: #1A1208;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards; }
        .hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px -12px rgba(0, 0, 0, 0.15);
        }
        .gradient-text {
          background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .timeline-dot {
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .timeline-item:hover .timeline-dot {
          transform: scale(1.3);
          background-color: #16a34a !important;
        }
        @media (min-width: 768px) {
          .three-column-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
          .three-column-grid > div {
            border-right: 1px solid #D8D2C4;
            padding-right: 2rem;
          }
          .three-column-grid > div:last-child {
            border-right: none;
            padding-right: 0;
          }
        }
      `}</style>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        Alt Mobility Founder Story — Dev Arora | India's Full-Stack EV Leasing Platform | FleetOS | UpForge
      </h1>

      {/* ── BREADCRUMB ── */}
      <nav
        className="px-4 sm:px-8 py-2.5 bg-[#EDE9DF] border-b border-[#D8D2C4] font-sans"
        aria-label="Breadcrumb"
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-[9px] text-[#AAA] uppercase tracking-widest">
          {[
            { n: "UpForge", h: "/" },
            { n: "Startup Registry", h: "/startup" },
            { n: "EV Startups India", h: "/ev-startups-india" },
            { n: "Alt Mobility", h: "/startup/alt-mobility" },
          ].map((b, i, arr) => (
            <li key={i} className="flex items-center gap-1.5">
              {i < arr.length - 1 ? (
                <Link href={b.h} className="hover:text-[#1A1208] transition-colors duration-200">
                  {b.n}
                </Link>
              ) : (
                <span className="text-[#1A1208] font-semibold">{b.n}</span>
              )}
              {i < arr.length - 1 && <ChevronRight className="w-2.5 h-2.5 text-[#C8C2B4]" />}
            </li>
          ))}
        </ol>
      </nav>

      {/* ── MASTHEAD ── */}
      <header className="bg-[#F3EFE5] border-b-3 border-[#1A1208]">
        <div className="text-center px-4 pt-6 pb-8 border-b border-[#C8C2B4]">
          <p className="text-[8px] tracking-[0.44em] text-[#AAA] uppercase mb-3 font-sans">
            UpForge · Startup Registry · Electric Vehicles
          </p>
          <h2 className="font-serif font-black leading-[1.1] text-[#1A1208] text-[clamp(2rem,5.5vw,4.2rem)]">
            The Founder Chronicle
          </h2>
          <p className="italic mt-3 text-[#6B5C40] text-[clamp(12px,1.8vw,15px)]">
            India's independent startup registry — verified, editorial, March 2026
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-20 sm:w-36 bg-[#C8C2B4]" />
            <span className="text-[#C8C2B4] text-sm">✦</span>
            <div className="h-px w-20 sm:w-36 bg-[#C8C2B4]" />
          </div>
        </div>
        <div className="flex items-center px-4 sm:px-8 py-2.5 gap-4 font-sans border-b border-[#C8C2B4]">
          <span className="text-[8px] text-[#AAA] uppercase tracking-widest flex-shrink-0">Edition · EV</span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: accent }}>
            EV Leasing · March 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">New Delhi, India</span>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="animate-fade-up max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] border-b-2 border-[#1A1208]">

          {/* ────── LEFT: EDITORIAL ────── */}
          <article className="py-10 lg:pr-10 border-r border-[#C8C2B4]">

            {/* Category tag */}
            <div className="flex items-center gap-4 mb-6 font-sans">
              <span
                className="text-[8.5px] font-black tracking-[0.28em] uppercase px-3 py-1.5 text-white"
                style={{ background: accent }}
              >
                CLEANTECH / EV
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">March 2026</span>
            </div>

            {/* Headline with gradient accent */}
            <h2 className="font-serif font-black leading-[1.1] text-[#1A1208] mb-6 text-[clamp(1.8rem,4vw,3.2rem)]">
              They fixed India's solar financing problem in 2014.
              Then they did it again —{" "}
              <span className="gradient-text">for electric vehicles.</span>
            </h2>

            {/* Deck */}
            <p className="italic leading-[1.75] mb-8 pb-6 text-[#5A4A30] text-[clamp(14px,1.9vw,17px)] border-b border-[#C8C2B4]">
              Alt Mobility's founders didn't discover EVs on a whiteboard. They spent six years removing
              the financing barrier for rooftop solar — then watched the exact same problem kill EV
              adoption in India. Dev Arora and his team built the solution they already knew worked:
              a full-stack lease. $17.3M raised. 16,000+ vehicles. ₹350 crore in assets.
              37 cities. India's EV logistics revolution, quietly assembled in New Delhi.
            </p>

            {/* Byline */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-10 font-sans">
              {[
                "By UpForge Editorial",
                "New Delhi",
                "Est. 2020",
                "India's EV Fleet OS",
              ].map((t, i, a) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-[9px] text-[#AAA] uppercase tracking-wider">{t}</span>
                  {i < a.length - 1 && <span className="text-[#C8C2B4] text-[10px]">·</span>}
                </span>
              ))}
            </div>

            {/* Mobile hero image */}
            <div className="lg:hidden mb-10">
              <img
                src="/Upforge-alt-mobility.webp"
                alt="Dev Arora, Co-Founder & CEO of Alt Mobility — UpForge Founder Chronicle"
                className="w-full object-cover object-top"
                style={{ height: "min(320px,60vw)" }}
                loading="eager"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800'; }}
              />
              <div className="px-5 py-4 bg-[#1A1208]">
                <p className="font-serif text-white font-bold text-sm">Dev Arora</p>
                <p className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5 font-sans">
                  Co-Founder & CEO · Alt Mobility
                </p>
              </div>
            </div>

            {/* 3-col newspaper body */}
            <div className="three-column-grid">
              {COLS.map((col, ci) => (
                <div key={ci} className="mb-8 sm:mb-0">
                  <h3
                    className="font-sans font-black uppercase tracking-[0.13em] mb-4 pb-1.5 text-[11px] text-[#1A1208]"
                    style={{ borderBottom: `1.5px solid ${accent}` }}
                  >
                    {col.h}
                  </h3>
                  {col.b.split("\n\n").map((p, pi) => (
                    <p
                      key={pi}
                      className={`leading-[1.85] mb-4 text-[#2C2010] text-[clamp(12.5px,1.3vw,13.5px)] ${ci === 0 && pi === 0 ? "dropcap" : ""}`}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Pull quote - enhanced */}
            <div className="mt-12 pt-8 pb-8 text-center border-t-3 border-b border-[#C8C2B4]" style={{ borderTopColor: accent }}>
              <span className="block text-3xl mb-3" style={{ color: accentDark }}>❝</span>
              <blockquote className="font-serif italic text-[#1A1208] leading-[1.7] max-w-2xl mx-auto px-4 text-[clamp(16px,2.2vw,22px)]">
                "{PULL_QUOTE.text}"
              </blockquote>
              <p className="text-[9px] uppercase tracking-[0.24em] text-[#AAA] mt-5 font-sans">
                — {PULL_QUOTE.by}
              </p>
            </div>

            {/* Company Timeline - enhanced */}
            <div className="mt-10">
              <p
                className="font-sans text-[8.5px] font-black uppercase tracking-[0.26em] mb-5 pb-2"
                style={{ color: accent, borderBottom: `1px solid ${accentBorder}` }}
              >
                Company Timeline
              </p>
              <ol className="font-sans">
                {TIMELINE.map((t, i) => (
                  <li key={i} className="flex gap-5 mb-5 timeline-item group">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="timeline-dot w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: accent }}
                      />
                      {i < TIMELINE.length - 1 && (
                        <div className="w-px flex-1 mt-1.5" style={{ background: accentBorder, minHeight: 28 }} />
                      )}
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: accent }}>
                        {t.year}
                      </span>
                      <p className="text-[12px] text-[#2C2010] mt-1 leading-relaxed">{t.event}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* FAQ — visual only, NO microdata (schema is in JSON-LD) */}
            <section className="mt-10">
              <p
                className="font-sans text-[8.5px] font-black uppercase tracking-[0.26em] mb-5 pb-2"
                style={{ color: accent, borderBottom: `1px solid ${accentBorder}` }}
              >
                Frequently Asked Questions
              </p>
              {FAQS.map((faq, i) => (
                <div key={i} className="mb-5 pb-5 border-b border-[#D8D2C4] last:border-0">
                  <h3 className="font-sans font-bold text-[#1A1208] mb-2 text-sm">
                    {faq.q}
                  </h3>
                  <p className="font-sans text-[12.5px] text-[#5A4A30] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </section>
          </article>

          {/* ────── RIGHT: SIDEBAR ────── */}
          <aside className="hidden lg:block pl-9 pt-10 pb-10">
            <div className="sticky top-6 flex flex-col gap-6">

              {/* Founder image with enhanced overlay */}
              <div className="relative w-full overflow-hidden rounded-sm shadow-md" style={{ height: 360 }}>
                <img
                  src="/Upforge-alt-mobility.webp"
                  alt="Dev Arora, Co-Founder & CEO of Alt Mobility — UpForge Founder Chronicle"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800'; }}
                />
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-[rgba(12,7,2,0.96)] via-[rgba(12,7,2,0.7)] to-transparent">
                  <p className="font-serif text-white font-bold text-base">Dev Arora</p>
                  <p className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5 font-sans">
                    Co-Founder & CEO · Alt Mobility
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn links */}
              <div className="flex flex-col gap-2.5">
                <a
                  href="https://alt-mobility.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-3 transition-all duration-200 hover:opacity-80 rounded-sm border-2"
                  style={{ borderColor: accent, textDecoration: "none" }}
                  aria-label="Visit Alt Mobility official website"
                >
                  <div className="flex items-center gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>
                      alt-mobility.com — Official Website
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/altmobility/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-3 transition-all duration-200 hover:opacity-80 rounded-sm border-2"
                  style={{ borderColor: "#0077b5", textDecoration: "none" }}
                  aria-label="View Alt Mobility on LinkedIn"
                >
                  <div className="flex items-center gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#0077b5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider" style={{ color: "#0077b5" }}>
                      LinkedIn — Alt Mobility
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "#0077b5" }} />
                </a>
              </div>

              {/* By the Numbers - enhanced with icons */}
              <div className="border-2 border-[#1A1208] rounded-sm overflow-hidden">
                <div className="px-5 py-3 bg-[#1A1208]">
                  <p className="font-sans text-[8px] font-black uppercase tracking-[0.3em] text-white">
                    By the Numbers
                  </p>
                </div>
                <dl className="grid grid-cols-2 divide-x divide-y border-collapse" style={{ borderColor: "#D8D2C4" }}>
                  {STATS.map((s, i) => {
                    const IconComponent = s.icon
                    return (
                      <div key={i} className="px-5 py-3.5" style={{ borderColor: "#D8D2C4" }}>
                        <dt className="font-sans text-[7.5px] text-[#AAA] uppercase tracking-[0.16em] mb-1.5 flex items-center gap-1.5">
                          <IconComponent className="w-3 h-3" style={{ color: accent }} />
                          {s.l}
                        </dt>
                        <dd className="font-serif font-black text-[#1A1208] leading-none text-xl">
                          {s.v}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              </div>

              {/* The Lesson */}
              <div
                className="px-5 py-4 rounded-sm"
                style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
              >
                <p
                  className="font-sans text-[8px] font-black uppercase tracking-[0.26em] mb-2.5"
                  style={{ color: accent }}
                >
                  The Lesson
                </p>
                <p className="font-serif italic text-[#1A1208] leading-[1.72] text-sm">
                  {LESSON}
                </p>
              </div>

              {/* Key Investors - enhanced */}
              <div className="border border-[#D8D2C4] rounded-sm overflow-hidden">
                <div className="px-5 py-2.5 bg-[#F9F7F2] border-b border-[#D8D2C4]">
                  <p className="font-sans text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]">
                    Key Investors
                  </p>
                </div>
                <div className="px-5 py-3.5 space-y-2">
                  {INVESTORS.map((inv, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between font-sans text-[11px] text-[#2C2010]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-sm flex-shrink-0"
                          style={{ background: accent }}
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
                <p className="font-sans text-[8px] font-black uppercase tracking-[0.26em] mb-3.5 text-[#AAA]">
                  Also Read on UpForge
                </p>
                {RELATED.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/startup/${r.slug}`}
                    className="flex items-center justify-between py-3 transition-all duration-200 hover:opacity-70 border-b border-[#EDE9DF] last:border-0"
                  >
                    <div>
                      <p className="font-sans text-[11px] font-bold text-[#1A1208]">
                        {r.name}
                      </p>
                      <p className="font-sans text-[9px] text-[#AAA] uppercase tracking-wider">
                        {r.cat} · {r.val}
                      </p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#AAA] flex-shrink-0" />
                  </Link>
                ))}
              </div>

            </div>
          </aside>
        </div>

        {/* ── SEO INTERNAL LINKS - Enhanced ── */}
        <section className="py-10 border-b border-[#C8C2B4]">
          <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#AAA] mb-5">
            Explore More EV Startups on UpForge
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { l: "EV Startups India 2026", h: "/ev-startups-india", desc: "Complete directory" },
              { l: "Indian Unicorns Full List", h: "/indian-unicorns", desc: "Valuations & growth" },
              { l: "Alt Mobility vs Zypp Electric", h: "/ev-startups/alt-mobility-vs-zypp", desc: "Comparison" },
              { l: "CleanTech Startups India", h: "/cleantech-startups", desc: "Sustainability" },
              { l: "Ather Energy Profile", h: "/startup/ather-energy-ev", desc: "EV two-wheeler" },
              { l: "EV Leasing India Guide", h: "/ev-leasing-india", desc: "Market analysis" },
              { l: "Startup Registry India", h: "/startup", desc: "All startups" },
              { l: "Submit Your Startup", h: "/submit", desc: "Free listing" },
            ].map((lnk) => (
              <Link
                key={lnk.h}
                href={lnk.h}
                className="flex items-center justify-between gap-2 p-3.5 transition-all duration-200 rounded-sm hover-lift border border-[#D8D2C4] bg-white"
              >
                <div>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#1A1208] block">
                    {lnk.l}
                  </span>
                  <span className="font-sans text-[7px] text-[#AAA] uppercase tracking-wider hidden sm:inline-block">{lnk.desc}</span>
                </div>
                <ChevronRight className="w-2.5 h-2.5 text-[#AAA] flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="pt-10 pb-4">
          <div className="grid sm:grid-cols-2 gap-8 items-center pb-8 border-b border-[#D8D2C4]">
            <div>
              <p className="font-serif font-bold text-[#1A1208] mb-2 text-xl">
                Building India's next unicorn? Get verified on UpForge.
              </p>
              <p className="font-sans text-sm text-[#6B5C40]">
                Free startup profiles. Independent verification. Indexed by Google.
              </p>
            </div>
            <div className="flex sm:justify-end">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-white font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90 rounded-sm bg-[#1A1208] text-[11px] font-sans"
                aria-label="List your Indian startup on UpForge for free"
              >
                List Your Startup — Free <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <p className="font-sans text-[9px] leading-relaxed mt-5 text-[#BBB0A0]">
            * Data sourced from public filings, Tracxn, Inc42, YourStory, and Alt Mobility press
            releases as of March 2026. UpForge is an independent registry — no paid placements,
            no sponsored rankings. Funding figures and valuations are approximate and reflect
            latest available public data.
          </p>

          <nav aria-label="Footer navigation" className="mt-4">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                { l: "EV Startups India", h: "/ev-startups-india" },
                { l: "Startup Registry", h: "/startup" },
                { l: "Indian Unicorns", h: "/indian-unicorns" },
                { l: "Ather Energy Profile", h: "/startup/ather-energy-ev" },
                { l: "Agnikul Cosmos Profile", h: "/startup/agnikul-cosmos" },
                { l: "CleanTech Startups", h: "/cleantech-startups" },
                { l: "Submit Startup", h: "/submit" },
              ].map((lnk) => (
                <li key={lnk.h}>
                  <Link
                    href={lnk.h}
                    className="font-sans text-[9px] text-[#AAA] hover:text-[#1A1208] uppercase tracking-wider transition-colors duration-200"
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
