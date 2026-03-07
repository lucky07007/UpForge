// app/founder-stories/page.tsx
// TARGET KEYWORDS: "Indian startup founder stories" ~12K | "Indian entrepreneur success story" ~22K
// "startup founders India 2026" ~9.4K | "young founders India" ~6.1K | "founder insights India" ~4.2K

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Founder Stories — India's Greatest Startup Builders 2026 | UpForge",
  description:
    "The stories behind India's most consequential startups — Zepto, PhysicsWallah, Nykaa, OYO, BrowserStack. Short, verified, editorial. Funding, key lessons, and what actually happened. Updated March 2026.",
  keywords:
    "Indian startup founder stories, startup founders India 2026, Indian entrepreneur success story, young founders India, Zepto founder story, Alakh Pandey PhysicsWallah, Falguni Nayar Nykaa, Ritesh Agarwal OYO, BrowserStack founder, startup founder insights India, first generation entrepreneurs India",
  alternates: { canonical: "https://upforge.in/founder-stories" },
  openGraph: {
    title: "Founder Stories — India's Greatest Startup Builders 2026 | UpForge",
    description:
      "5 real stories from the people behind India's most consequential startups. Short, verified, editorial. Zepto, PhysicsWallah, Nykaa, OYO, BrowserStack.",
    url: "https://upforge.in/founder-stories",
    siteName: "UpForge",
    locale: "en_IN",
    type: "article",
    images: [{ url: "https://upforge.in/og/founder-stories.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@upforge_in",
    title: "Founder Stories India 2026 | UpForge",
    images: ["https://upforge.in/og/founder-stories.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
// founderImg: publicly indexed press/editorial images from Inc42, Wikipedia, etc.
const FOUNDERS = [
  {
    no: "01",
    name: "Aadit Palicha & Kaivalya Vohra",
    company: "Zepto",
    slug: "zepto",
    role: "Co-Founders — CEO & CTO",
    city: "Bengaluru",
    founded: "2021",
    valuation: "$5.9B",
    funding: "$2.5B+",
    context: "Dropped out of Stanford at 19",
    founderImg: "https://images.inc42.com/uploads/2023/08/Zepto-Co-Founders-Aadit-Palicha-and-Kaivalya-Vohra.jpg",
    logoText: "Z",
    logoBg: "#F59E0B",
    accentColor: "#D97706",
    accentBg: "#FFFBEB",
    accentBorder: "#FDE68A",
    headline: "Two 19-year-olds dropped out of Stanford to solve a problem. The problem was groceries. The answer was 10 minutes.",
    pull: "We failed with our first startup. KiranaKart shut down in months. The lesson we carried into Zepto made it a $5B company.",
    body: "In 2020, Aadit Palicha and Kaivalya Vohra were Stanford freshmen when they flew back to India and built KiranaKart — a 45-minute grocery platform that failed. Rather than return to California, they sat with the failure, rebuilt the thesis from scratch, and arrived at one conviction: if dark stores were placed within 2km of demand, 10-minute delivery was a pure logistics equation.\n\nZepto launched in 2021. By August 2023, it became India's first unicorn of the year at $1.4B. By 2025, a $350M Series H pushed the valuation to $5.9B — making them the youngest founders in India to build a business at that scale.",
    lesson: "The first startup teaches you the question. The second one lets you answer it.",
    stats: [
      { l: "Valuation", v: "$5.9B" },
      { l: "Dark Stores", v: "350+" },
      { l: "Founded", v: "2021" },
      { l: "Total Raised", v: "$2.5B+" },
    ],
  },
  {
    no: "02",
    name: "Alakh Pandey",
    company: "PhysicsWallah",
    slug: "physicswallah",
    role: "Founder & CEO",
    city: "Prayagraj, UP",
    founded: "2014",
    valuation: "$2.8B",
    funding: "$700M",
    context: "YouTube teacher turned unicorn founder",
    founderImg: "https://assets.inc42.com/uploads/2022/06/alakh-pandey-feature.jpg",
    logoText: "PW",
    logoBg: "#10B981",
    accentColor: "#059669",
    accentBg: "#F0FDF4",
    accentBorder: "#A7F3D0",
    headline: "BYJU's charged ₹80,000 for what he taught for ₹2,000. That wasn't a mission — it was just obviously the right thing to do.",
    pull: "I grew up watching my parents struggle with fees. I was never going to be the person who made education unaffordable.",
    body: "Alakh Pandey started filming Physics lessons in his bedroom in Prayagraj while preparing for his own engineering entrance exams. He wasn't funded. He had no studio — just a camera and the ability to teach like he was talking to a friend, not performing for a camera.\n\nBy 2020, his YouTube channel had 5M subscribers. In 2021 he launched the PW app at ₹2,000/year — a fraction of BYJU's ₹80,000 fee. Six million students enrolled within months. He raised $100M, reached unicorn status, and built India's most impactful EdTech story while BYJU's collapsed. By 2025, PW served 10M+ learners — profitably.",
    lesson: "Affordability is not a positioning strategy. It can be the entire moat.",
    stats: [
      { l: "Valuation", v: "$2.8B" },
      { l: "Students", v: "10M+" },
      { l: "Course Fee", v: "₹2,000/yr" },
      { l: "Founded", v: "2014" },
    ],
  },
  {
    no: "03",
    name: "Falguni Nayar",
    company: "Nykaa",
    slug: "nykaa",
    role: "Founder & CEO",
    city: "Mumbai",
    founded: "2012",
    valuation: "$2.5B",
    funding: "Bootstrapped to IPO",
    context: "Left investment banking at 50 to build a unicorn",
    founderImg: "https://assets.inc42.com/uploads/2021/11/Falguni-Nayar-Nykaa.jpg",
    logoText: "N",
    logoBg: "#EC4899",
    accentColor: "#DB2777",
    accentBg: "#FDF2F8",
    accentBorder: "#FBCFE8",
    headline: "She left Kotak Mahindra Bank at 50 to build India's first profitable unicorn. Everyone told her she was too old and the market was too fragmented.",
    pull: "The fact that everyone told me it couldn't be done was the clearest signal that there was space to build something real.",
    body: "Falguni Nayar spent 20 years at Kotak Mahindra Bank, rising to Managing Director. In 2012, at 50, she quit to build an e-commerce beauty platform. Her insight was curation over discounting — while every platform competed on price, Falguni competed on trust and authenticity.\n\nShe personally flew to brand offices in France, Italy, and the US to guarantee quality. In 2021, Nykaa listed on the BSE — the first woman-founded Indian company to IPO, and India's first profitable unicorn to go public. Falguni became India's wealthiest self-made woman with a net worth crossing $7B at listing.",
    lesson: "There is no age requirement for building something consequential.",
    stats: [
      { l: "Valuation", v: "$2.5B" },
      { l: "IPO Year", v: "2021" },
      { l: "Age at Founding", v: "50" },
      { l: "Brands", v: "4,500+" },
    ],
  },
  {
    no: "04",
    name: "Ritesh Agarwal",
    company: "OYO Rooms",
    slug: "oyo",
    role: "Founder & CEO",
    city: "Titilagarh, Odisha",
    founded: "2013",
    valuation: "$9B",
    funding: "$3.7B",
    context: "Started a company in small-town India at 19",
    founderImg: "https://assets.inc42.com/uploads/2023/09/Ritesh-Agarwal-OYO.jpg",
    logoText: "OYO",
    logoBg: "#EF4444",
    accentColor: "#DC2626",
    accentBg: "#FFF5F5",
    accentBorder: "#FECACA",
    headline: "From a small town in Odisha with no IIT degree and no connections — to building the world's third-largest hotel chain at 19.",
    pull: "I came from a town where dreaming big was unusual. That was the advantage, not the problem.",
    body: "Ritesh Agarwal grew up in Titilagarh, a small town in Odisha, with no startup ecosystem and no family business. At 17, he coded Oravel Stays — a budget travel site. At 19, he pivoted it into OYO with one insight: India's budget hotels all looked different, smelled different, promised different things every night. Standardize them and you could build trust at scale.\n\nHe won the Thiel Fellowship, raised from SoftBank, and expanded to 80 countries. COVID hit hard — revenues fell 60%, 5,000 jobs were cut. Ritesh restructured debt personally, refocused on cash flows, and by 2025 restored profitability. OYO is now preparing for IPO.",
    lesson: "Geography is not destiny. Neither is your starting point.",
    stats: [
      { l: "Valuation", v: "$9B" },
      { l: "Countries", v: "80+" },
      { l: "Founded", v: "2013" },
      { l: "Total Raised", v: "$3.7B" },
    ],
  },
  {
    no: "05",
    name: "Ritesh Arora & Nakul Aggarwal",
    company: "BrowserStack",
    slug: "browserstack",
    role: "Co-Founders",
    city: "Mumbai",
    founded: "2011",
    valuation: "$3.4B",
    funding: "$200M+",
    context: "7 years bootstrapped, zero sales team",
    founderImg: "https://assets.inc42.com/uploads/2021/06/BrowserStack-founders.jpg",
    logoText: "BS",
    logoBg: "#3B82F6",
    accentColor: "#2563EB",
    accentBg: "#EFF6FF",
    accentBorder: "#BFDBFE",
    headline: "They bootstrapped for 7 years, turned down every investor, and built the world's leading browser testing platform without a single sales hire.",
    pull: "We said no to investors for seven years. The product needed to be right first. That decision compounded into everything.",
    body: "Ritesh Arora and Nakul Aggarwal were developers in Mumbai who faced the same daily frustration as every web engineer: testing across browsers was slow, expensive, and broken. In 2011, they built BrowserStack for themselves — and quietly opened it to the internet.\n\nFor seven years, they turned down every VC term sheet and reinvested every rupee into the product. No sales team. No marketing budget. By the time Insight Partners led a $200M round in 2021, BrowserStack had 50,000 customers in 135 countries — Microsoft, Spotify, Twitter — all acquired entirely through word of mouth. One of the cleanest product-led stories in Indian SaaS.",
    lesson: "A truly great product is the only distribution strategy you can never outspend.",
    stats: [
      { l: "Valuation", v: "$3.4B" },
      { l: "Customers", v: "50,000+" },
      { l: "Years Bootstrapped", v: "7" },
      { l: "Founded", v: "2011" },
    ],
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": "https://upforge.in/founder-stories", url: "https://upforge.in/founder-stories", name: "Founder Stories — India's Greatest Startup Builders 2026 | UpForge", dateModified: "2026-03-07", isPartOf: { "@type": "WebSite", name: "UpForge", url: "https://upforge.in" }, breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://upforge.in" }, { "@type": "ListItem", position: 2, name: "Founder Stories", item: "https://upforge.in/founder-stories" }] } },
    { "@type": "Article", headline: "Founder Stories — India's Greatest Startup Builders 2026", author: { "@type": "Organization", name: "UpForge", url: "https://upforge.in" }, publisher: { "@type": "Organization", name: "UpForge", logo: { "@type": "ImageObject", url: "https://upforge.in/logo.png" } }, datePublished: "2026-01-01", dateModified: "2026-03-07", image: "https://upforge.in/og/founder-stories.png" },
    { "@type": "ItemList", name: "Top Indian Startup Founder Stories 2026", numberOfItems: 5, itemListElement: FOUNDERS.map((f, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Person", name: f.name, jobTitle: f.role, worksFor: { "@type": "Organization", name: f.company }, description: f.headline } })) },
  ],
}

export default function FounderStoriesPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0]" style={{ fontFamily: "'Georgia','Times New Roman',serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .fu  { animation:fadeUp .5s ease both; }
        .fu1 { animation-delay:.05s; } .fu2 { animation-delay:.12s; } .fu3 { animation-delay:.22s; }
        .fc  { transition:box-shadow .18s ease; }
        .fc:hover { box-shadow:0 6px 32px rgba(0,0,0,.08); }
        .arr { transition:transform .14s ease; }
        .arr-link:hover .arr { transform:translateX(3px); }
      `}</style>

      {/* BREADCRUMB */}
      <div className="border-b border-[#D5D0C8]">
        <div className="max-w-[1060px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-1.5" style={{ fontFamily: "system-ui,sans-serif" }}>
          <Link href="/" className="text-[10px] text-[#999] hover:text-[#1C1C1C] uppercase tracking-wider transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#CCC]" />
          <span className="text-[10px] text-[#1C1C1C] font-semibold uppercase tracking-wider">Founder Stories</span>
        </div>
      </div>

      <div className="max-w-[1060px] mx-auto px-4 sm:px-6 pb-24">

        {/* ══ MASTHEAD ══ */}
        <header className="border-b-2 border-[#1C1C1C] pt-10 pb-10 sm:pt-14 sm:pb-12 fu fu1">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-[#1C1C1C]" />
            <span className="text-[9px] tracking-[0.3em] text-[#888] uppercase" style={{ fontFamily: "system-ui,sans-serif" }}>
              UpForge · Founder Series — March 2026
            </span>
          </div>
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <h1 className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4.2rem] font-bold leading-[1.0] tracking-tight text-[#1C1C1C] mb-5">
                Founder<br />
                <span className="italic text-[#A89060]">Stories</span>
              </h1>
              <p className="text-[14.5px] sm:text-[15.5px] text-[#555] max-w-xl leading-relaxed" style={{ fontFamily: "system-ui,sans-serif" }}>
                Five founders. Five different starting points. What they built, how they started, and the single insight that defines their journey.
              </p>
            </div>
            <div className="flex gap-8 lg:flex-col lg:gap-4 lg:text-right flex-shrink-0" style={{ fontFamily: "system-ui,sans-serif" }}>
              {[{ v: "5", l: "Founders" }, { v: "$23B+", l: "Combined Value" }, { v: "~80%", l: "First-Gen" }].map((s, i) => (
                <div key={i}>
                  <p className="text-[1.8rem] font-bold text-[#1C1C1C] leading-none">{s.v}</p>
                  <p className="text-[8.5px] text-[#AAA] uppercase tracking-[0.18em] mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ══ STORY CARDS ══ */}
        <section className="pt-8 space-y-5 fu fu2" aria-label="Indian startup founder stories 2026">
          {FOUNDERS.map((f) => (
            <article key={f.no} className="fc bg-white border border-[#E2DDD5] overflow-hidden">

              {/* Accent top bar */}
              <div className="h-[3px]" style={{ background: f.accentColor }} />

              <div className="grid lg:grid-cols-[240px_1fr]">

                {/* ── LEFT: PHOTO COLUMN ── */}
                <div className="lg:border-r lg:border-[#F0EDE8]">
                  {/* Founder photo — tall on desktop, wide on mobile */}
                  <div className="relative w-full h-[200px] lg:h-[320px] bg-[#F0EDE8] overflow-hidden">
                    <Image
                      src={f.founderImg}
                      alt={`${f.name} — founder of ${f.company}`}
                      fill
                      className="object-cover object-top"
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 240px"
                    />
                    {/* Issue number overlay */}
                    <div
                      className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center text-white text-[10px] font-black"
                      style={{ background: f.accentColor, fontFamily: "system-ui,sans-serif" }}
                    >
                      {f.no}
                    </div>
                  </div>

                  {/* Company + stats below photo */}
                  <div className="p-4 sm:p-5 border-t border-[#F0EDE8]">
                    {/* Company row */}
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className="w-7 h-7 flex items-center justify-center text-white text-[9px] font-black flex-shrink-0"
                        style={{ background: f.logoBg, fontFamily: "system-ui,sans-serif" }}
                      >
                        {f.logoText}
                      </div>
                      <span className="text-[12px] font-bold text-[#1C1C1C]">{f.company}</span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                      {f.stats.map((s, i) => (
                        <div key={i}>
                          <p className="text-[7.5px] text-[#CCC] uppercase tracking-[0.16em] mb-0.5" style={{ fontFamily: "system-ui,sans-serif" }}>{s.l}</p>
                          <p className="text-[12px] font-bold text-[#1C1C1C]" style={{ fontFamily: "system-ui,sans-serif" }}>{s.v}</p>
                        </div>
                      ))}
                    </div>

                    {/* Context label */}
                    <div className="mt-4 pt-3 border-t border-[#F0EDE8]">
                      <p className="text-[10px] italic text-[#AAA] leading-snug" style={{ fontFamily: "system-ui,sans-serif" }}>{f.context}</p>
                    </div>
                  </div>
                </div>

                {/* ── RIGHT: STORY COLUMN ── */}
                <div className="p-5 sm:p-7 flex flex-col">

                  {/* Role label */}
                  <p
                    className="text-[8.5px] font-black uppercase tracking-[0.22em] mb-2"
                    style={{ color: f.accentColor, fontFamily: "system-ui,sans-serif" }}
                  >
                    {f.role}
                  </p>

                  {/* Name */}
                  <h2 className="text-[1.2rem] sm:text-[1.4rem] font-bold text-[#1C1C1C] leading-tight mb-4">
                    {f.name}
                  </h2>

                  {/* Headline — the editorial hook */}
                  <p className="text-[14px] sm:text-[15px] font-semibold text-[#1C1C1C] leading-[1.6] mb-5" style={{ fontFamily: "'Georgia',serif" }}>
                    {f.headline}
                  </p>

                  {/* Pull quote */}
                  <div className="border-l-[3px] pl-4 py-0.5 mb-5" style={{ borderColor: f.accentColor }}>
                    <p className="text-[12.5px] italic text-[#555] leading-relaxed" style={{ fontFamily: "'Georgia',serif" }}>
                      "{f.pull}"
                    </p>
                    <p className="text-[8px] text-[#AAA] mt-1.5 uppercase tracking-wider not-italic" style={{ fontFamily: "system-ui,sans-serif" }}>
                      — {f.name.split(" ")[0]}, {f.company}
                    </p>
                  </div>

                  {/* Story paragraphs */}
                  <div className="space-y-3 mb-6 flex-1">
                    {f.body.split("\n\n").map((para, i) => (
                      <p key={i} className="text-[12.5px] text-[#444] leading-[1.85]" style={{ fontFamily: "system-ui,sans-serif" }}>
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Key lesson box */}
                  <div
                    className="flex gap-3 px-4 py-3.5 mb-5"
                    style={{ background: f.accentBg, border: `1px solid ${f.accentBorder}` }}
                  >
                    <div className="w-0.5 flex-shrink-0 self-stretch rounded-full" style={{ background: f.accentColor, minHeight: 16 }} />
                    <div>
                      <p className="text-[7.5px] font-black uppercase tracking-[0.22em] mb-1" style={{ color: f.accentColor, fontFamily: "system-ui,sans-serif" }}>Key Lesson</p>
                      <p className="text-[12.5px] font-semibold italic text-[#1C1C1C] leading-relaxed" style={{ fontFamily: "'Georgia',serif" }}>{f.lesson}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#F0EDE8]">
                    <Link
                      href={`/startup/${f.slug}`}
                      className="arr-link inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-opacity hover:opacity-70"
                      style={{ color: f.accentColor, fontFamily: "system-ui,sans-serif" }}
                    >
                      View {f.company} on UpForge
                      <ArrowRight className="arr w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[9px] text-[#DDD] uppercase tracking-wider" style={{ fontFamily: "system-ui,sans-serif" }}>
                      {f.city}
                    </span>
                  </div>

                </div>
              </div>
            </article>
          ))}
        </section>

        {/* ══ INSIGHT STRIP ══ */}
        <aside className="mt-14 border-t-2 border-[#1C1C1C] pt-10 fu fu3">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-6 h-px bg-[#1C1C1C]" />
            <span className="text-[9px] tracking-[0.28em] text-[#888] uppercase" style={{ fontFamily: "system-ui,sans-serif" }}>UpForge Founder Insights</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { stat: "~80%", label: "First-generation founders", body: "India's under-40 unicorn builders mostly did not inherit wealth or networks. They built in public. That's exactly why their stories are worth reading." },
              { stat: "$950B", label: "Value created by under-40s", body: "Avendus-Hurun 2025: India's under-40 founders manage businesses worth more than Switzerland's entire GDP — and most started with nothing." },
              { stat: "126", label: "Unicorns — and counting", body: "India just crossed 126 unicorns. The founders reading these stories today will build the next 126. UpForge exists to help them get discovered." },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#E2DDD5] p-5">
                <p className="text-[2.2rem] font-bold text-[#1C1C1C] leading-none mb-1">{item.stat}</p>
                <p className="text-[8.5px] font-black uppercase tracking-[0.18em] text-[#E8C547] mb-3" style={{ fontFamily: "system-ui,sans-serif" }}>{item.label}</p>
                <p className="text-[11.5px] text-[#666] leading-relaxed" style={{ fontFamily: "system-ui,sans-serif" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </aside>

        {/* ── INTERNAL LINKS ── */}
        <nav className="mt-12 border-t border-[#D5D0C8] pt-8" aria-label="Related UpForge content">
          <p className="text-[9px] tracking-[0.24em] uppercase text-[#AAA] mb-4" style={{ fontFamily: "system-ui,sans-serif" }}>Explore More on UpForge</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Top AI Startups India", href: "/top-ai-startups" },
              { label: "Best SaaS Startups", href: "/best-saas-startups" },
              { label: "Indian Unicorns 2026", href: "/indian-unicorns" },
              { label: "Indian Startups Guide", href: "/indian-startups" },
              { label: "Top Funded Startups", href: "/top-funded-startups" },
              { label: "Browse All Startups", href: "/startup" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#D5D0C8] bg-white text-[10px] text-[#666] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors" style={{ fontFamily: "system-ui,sans-serif" }}>
                {l.label} <ChevronRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </nav>

        {/* ── CTA ── */}
        <div className="mt-8 bg-[#1C1C1C] p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-[8.5px] text-[#E8C547] font-black uppercase tracking-[0.24em] mb-3" style={{ fontFamily: "system-ui,sans-serif" }}>UpForge Registry</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Your founder story starts with a profile.</h2>
            <p className="text-[12.5px] text-white/50 max-w-sm" style={{ fontFamily: "system-ui,sans-serif" }}>
              Get your startup independently verified and listed in India's most trusted registry. Free forever. Indexed on Google.
            </p>
          </div>
          <Link href="/submit" className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-[#E8C547] text-[#111] text-sm font-bold tracking-wide hover:bg-[#F5D55A] transition-colors" style={{ fontFamily: "system-ui,sans-serif" }}>
            List Your Startup — Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="mt-6 text-[9.5px] text-[#C8C3BC] leading-relaxed" style={{ fontFamily: "system-ui,sans-serif" }}>
          * Story details sourced from public interviews, Inc42, Forbes India, Tracxn, and company announcements as of March 2026. Founder images used from publicly indexed press coverage. UpForge is an independent registry — no paid placements.
        </p>
      </div>
    </div>
  )
}
