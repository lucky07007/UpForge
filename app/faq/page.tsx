// app/faq/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import { FAQClient } from "@/components/faq-client";
import {
  ArrowRight, BadgeCheck, Shield, Globe, Sparkles,
  Calculator, FileText, Building2, Users, ChevronRight,
} from "lucide-react";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "FAQ — UpForge | India's Independent Startup Registry",
  description:
    "Answers to every question about listing your startup on UpForge — India's free, verified, independent startup registry. How it works, verification, valuation, reports, and more.",
  keywords: [
    "UpForge FAQ",
    "how to list startup India",
    "startup registry India",
    "free startup listing India",
    "startup verification India",
    "startup valuation tool India",
    "Indian startup database",
    "UpForge how it works",
  ],
  openGraph: {
    title: "FAQ — UpForge | India's Independent Startup Registry",
    description:
      "Everything you need to know about UpForge — India's free, verified startup registry. Listing, verification, reports, valuation, and more.",
    type: "website",
    url: "https://upforge.in/faq",
  },
  alternates: {
    canonical: "https://upforge.in/faq",
  },
};

// ─── FAQ Data (used for both UI and JSON-LD schema) ───────────────────────────

export const FAQ_CATEGORIES = [
  {
    id: "listing",
    label: "Listing & Submission",
    icon: "Building2",
    questions: [
      {
        q: "How do I list my startup on UpForge?",
        a: "Go to upforge.in/submit and fill in your startup details — name, founder, industry, description, and founding year are required. The form takes under 5 minutes. Once submitted, our team reviews and verifies your profile within 3–7 business days. Listing is completely free and always will be.",
      },
      {
        q: "Is listing on UpForge really free?",
        a: "Yes — 100% free, forever. There are no hidden fees, no freemium traps, no pay-to-rank mechanics. UpForge is an independent public registry, not a marketplace or media platform. Our mission is to document India's emerging founders, not monetise their visibility.",
      },
      {
        q: "What information is required to submit a startup?",
        a: "Required: startup name, founder name, founding year, industry/sector, and a one-line description. Optional but recommended: website URL, co-founder names, city, team size, funding stage, logo, and a detailed description. The more you provide, the more complete your public profile — and the higher it appears in search.",
      },
      {
        q: "Can I edit my startup profile after it's listed?",
        a: "Yes. Email us at contact@upforge.in with your startup name and the changes you'd like made. We'll update the profile within 48 hours. For major updates (new funding round, rebranding, new product), we also recommend re-requesting verification.",
      },
      {
        q: "How long does the listing approval take?",
        a: "Typically 3–7 business days. Our team manually reviews every submission for accuracy and completeness before publishing. You'll receive a confirmation email when your startup is live. Expedited review is not currently available, but we're working on a self-service option.",
      },
      {
        q: "Can a startup be removed from UpForge?",
        a: "Yes. If a startup has shut down, or a founder requests removal with valid verification, we will delist the profile. Email contact@upforge.in with your request. We maintain corrections and removals as part of our editorial standards.",
      },
    ],
  },
  {
    id: "verification",
    label: "Verification",
    icon: "BadgeCheck",
    questions: [
      {
        q: "What does the UpForge verified badge mean?",
        a: "The verified badge (✓) means our team has manually confirmed: (1) the startup is real and operating, (2) the founder identity matches public records, (3) the information submitted is accurate to the best of our knowledge. Verified profiles rank higher in search and signal institutional credibility to investors and partners.",
      },
      {
        q: "How does UpForge verify a startup?",
        a: "We check a combination of: MCA/ROC registration, founder LinkedIn and public digital presence, website legitimacy, news and media mentions, and any public funding data. For revenue-stage startups, we may also look at App Store listings, LinkedIn company pages, or other public traction signals.",
      },
      {
        q: "Is verification free?",
        a: "Yes — verification is free as part of the standard listing process. We do not charge for the verified badge. Our review is independent and merit-based.",
      },
      {
        q: "My startup is pre-incorporation. Can I still list?",
        a: "Yes. Pre-incorporation startups can be listed as 'Early Stage' without a verified badge. Once you have an incorporation document or any public registration, you can request verification. We believe in documenting founders from day one.",
      },
      {
        q: "Can a verified badge be revoked?",
        a: "Yes. If we find that information provided was materially false, or if a verified startup shuts down without notification, we may revoke the badge or update the profile. We maintain an ongoing corrections policy as part of our editorial standards.",
      },
    ],
  },
  {
    id: "reports",
    label: "Analysis Reports",
    icon: "FileText",
    questions: [
      {
        q: "What is an UpForge Analysis Report?",
        a: "An UpForge Analysis Report is an AI-generated deep-dive into your startup — covering valuation range (floor to ceiling), 7-dimension scoring (market, team, product, traction, moat, financials), risk assessment, competitor mapping, TAM/SAM/SOM analysis, growth levers, investor readiness score, and a 3-phase strategic roadmap. It's designed to be the report you share with investors, post on LinkedIn, or use for your own strategic planning.",
      },
      {
        q: "How accurate is the valuation in the report?",
        a: "The valuation uses industry-standard methodologies: ARR multiples (8–25x) for SaaS, GMV multiples (0.5–3x) for marketplaces, revenue multiples (1–5x) for D2C, and cost-to-build models for pre-revenue startups. Numbers are benchmarked against real Indian deal data from 2024–2026. They represent a directional range, not a definitive figure — and should be used as a starting point for conversations, not a binding valuation.",
      },
      {
        q: "Is the report free?",
        a: "Yes — the UpForge Analysis Report is completely free. Go to upforge.in/reports, fill in your startup details, and receive a full report in under 60 seconds. You can download it as a PDF and share it directly.",
      },
      {
        q: "Can I use the report with investors?",
        a: "Yes — the report is designed to be investor-ready. It uses the same frameworks VCs use internally (market sizing, unit economics benchmarks, competitive moat analysis). Many founders use it as an icebreaker or supporting document in early-stage conversations. Always supplement with your own financial model and data room for formal due diligence.",
      },
      {
        q: "Who generates the report?",
        a: "Reports are generated by Forge, UpForge's AI — built on top of GROQ's Llama 3.3 model, fine-tuned with Indian startup ecosystem data, sector benchmarks, and 2024–2026 funding market context. The system prompt is engineered to replicate analyst-grade logic, not generic AI output.",
      },
    ],
  },
  {
    id: "valuation",
    label: "Valuation Tool",
    icon: "Calculator",
    questions: [
      {
        q: "How does the UpForge valuation estimator work?",
        a: "The free valuation tool at upforge.in/valuation takes inputs like industry, revenue stage, team size, funding raised, and growth metrics — and applies sector-appropriate multiples benchmarked against real Indian startup deals. It gives you a floor, midpoint, and ceiling estimate with methodology explained. The entire process takes under 2 minutes, no signup required.",
      },
      {
        q: "What valuation methods does UpForge use?",
        a: "We use: ARR multiples (8–25x) for SaaS and subscription businesses, GMV multiples (0.5–3x) for marketplace and commerce platforms, revenue multiples (1–5x) for D2C and product companies, and cost-to-duplicate models for pre-revenue startups. All benchmarks are calibrated against Indian deal data from Q1 2024 to Q1 2026.",
      },
      {
        q: "Is the valuation legally binding?",
        a: "No. The UpForge valuation is an indicative estimate for strategic use — not a formal valuation for legal, tax, or fundraising documentation. For statutory valuations (ESOP, FEMA compliance, M&A), you need a SEBI-registered valuer or CA. Our tool helps founders understand their approximate market position before engaging professional valuers.",
      },
    ],
  },
  {
    id: "platform",
    label: "Platform & Data",
    icon: "Globe",
    questions: [
      {
        q: "What is UpForge?",
        a: "UpForge is India's independent, free public startup registry — not a media outlet, not a ranking platform, not an accelerator. We document India's emerging startups in a structured, verified, permanently accessible format. Think of us as the public record layer of India's startup ecosystem: neutral, open, and built to last.",
      },
      {
        q: "Who owns and operates UpForge?",
        a: "UpForge is independently owned and operated. We are not affiliated with any VC firm, accelerator, media house, or government body. Our editorial independence is central to our value — we do not accept payments to rank, feature, or promote any startup over another.",
      },
      {
        q: "How does UpForge make money?",
        a: "UpForge is currently in its growth phase and operates as an independent project. We do not run ads, accept sponsored placements, or charge for listings. We're exploring sustainable models that preserve our editorial independence — including premium tools, API access for researchers, and enterprise data products. Listings will always be free.",
      },
      {
        q: "How often is data updated?",
        a: "Registry data is updated when founders submit changes or when our team identifies material updates. The live ecosystem metrics on the homepage (funding data, sector momentum, market mood) are refreshed every 10 minutes via AI-curated feeds. Static profile data is updated within 48 hours of a verified request.",
      },
      {
        q: "Is UpForge data public and indexable?",
        a: "Yes — all startup profiles on UpForge are publicly accessible and indexed by Google and other search engines. This is intentional: we want founders to have a permanently discoverable presence on the open web, separate from any single platform or social network.",
      },
      {
        q: "Can investors or researchers access UpForge data in bulk?",
        a: "We're building API and bulk data access for verified investors, researchers, and institutions. If you're interested in early access, email us at contact@upforge.in with your use case. Individual profiles are already public and accessible via the registry at upforge.in/startup.",
      },
      {
        q: "Does UpForge have a mobile app?",
        a: "Not yet — UpForge is currently a web-first platform, fully optimised for mobile browsers. A dedicated mobile app is on our roadmap. In the meantime, you can add upforge.in to your home screen for an app-like experience.",
      },
    ],
  },
  {
    id: "forge",
    label: "Forge AI",
    icon: "Sparkles",
    questions: [
      {
        q: "What is Forge?",
        a: "Forge is UpForge's AI assistant — built specifically for India's startup ecosystem. It can answer questions about listing your startup, funding stages, sector trends, valuation methods, UpForge platform features, and more. Access Forge via the chat widget on any UpForge page.",
      },
      {
        q: "What can Forge help me with?",
        a: "Forge can: explain how UpForge works, guide you through the listing process, answer questions about Indian startup funding and sectors, explain valuation concepts, help you understand your analysis report, and direct you to the right resources. It's designed to be a sharp, knowledgeable co-founder — not a generic chatbot.",
      },
      {
        q: "Is Forge powered by ChatGPT?",
        a: "No — Forge is built on GROQ's infrastructure running Llama 3.3 (70B), engineered specifically for UpForge with a custom system prompt covering the Indian startup ecosystem, UpForge platform knowledge, and startup fundamentals. It's faster and more contextually accurate for our use case than general-purpose assistants.",
      },
    ],
  },
];

// ─── JSON-LD Schema ───────────────────────────────────────────────────────────

function generateFAQSchema() {
  const allQAs = FAQ_CATEGORIES.flatMap((cat) => cat.questions);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQAs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function FAQPage() {
  const totalQuestions = FAQ_CATEGORIES.reduce((acc, c) => acc + c.questions.length, 0);

  return (
    <>
      {/* JSON-LD for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema()) }}
      />

      <div className="bg-[#F7F5F0] min-h-screen" style={{ fontFamily: "system-ui, sans-serif" }}>
        <style>{`
          @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
          .fu-1 { animation: fadeUp 0.5s 0.05s ease both; }
          .fu-2 { animation: fadeUp 0.5s 0.15s ease both; }
          .fu-3 { animation: fadeUp 0.5s 0.25s ease both; }
        `}</style>

        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">

          {/* ── MASTHEAD ── */}
          <div className="border-b-2 border-[#1C1C1C] pb-6 mb-0 fu-1">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <p className="text-[9px] tracking-[0.28em] text-[#AAA] uppercase mb-3">UpForge · Help & FAQ</p>
                <h1
                  className="text-[2.4rem] sm:text-[3.2rem] lg:text-[4rem] tracking-tight leading-[1.0] text-[#1C1C1C]"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  Frequently Asked<br />
                  <em className="text-[#A89060] not-italic">Questions</em>
                </h1>
              </div>
              <div className="pb-1 flex flex-col gap-2 lg:items-end">
                <div className="flex items-center gap-2 border border-[#DDD] bg-white px-3 py-1.5 w-fit">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] font-semibold text-[#555] tracking-wide uppercase">
                    {totalQuestions} Questions · {FAQ_CATEGORIES.length} Topics
                  </span>
                </div>
                <p className="text-[11px] text-[#888] lg:text-right">
                  Can't find your answer?{" "}
                  <Link href="/contact" className="text-[#1C1C1C] underline underline-offset-2 hover:text-[#A89060] transition-colors">
                    Contact us
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* ── CATEGORY QUICK STATS ── */}
          <div className="grid grid-cols-3 sm:grid-cols-6 border-b border-[#D5D0C8] fu-2">
            {FAQ_CATEGORIES.map((cat, i) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="py-4 px-3 sm:px-5 border-r border-[#D5D0C8] last:border-r-0 hover:bg-white transition-colors group text-center"
              >
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#AAA] group-hover:text-[#888] transition-colors mb-1">
                  {cat.questions.length} Q
                </p>
                <p className="text-[11px] font-semibold text-[#555] group-hover:text-[#1C1C1C] transition-colors leading-tight">
                  {cat.label}
                </p>
              </a>
            ))}
          </div>

          {/* ── MAIN CONTENT GRID ── */}
          <div className="grid lg:grid-cols-4 gap-0 fu-3">

            {/* ── SIDEBAR (sticky nav) ── */}
            <div className="hidden lg:block border-r border-[#D5D0C8] py-8 pr-6">
              <div className="sticky top-24 space-y-1">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AAA] mb-4">Jump to section</p>
                {FAQ_CATEGORIES.map((cat) => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="flex items-center justify-between py-2.5 px-3 group hover:bg-white transition-colors border border-transparent hover:border-[#E2DDD5]"
                  >
                    <span className="text-[12px] text-[#666] group-hover:text-[#1C1C1C] transition-colors font-medium">
                      {cat.label}
                    </span>
                    <span className="text-[9px] text-[#BBB] group-hover:text-[#888]">{cat.questions.length}</span>
                  </a>
                ))}

                {/* CTA box */}
                <div className="mt-8 border border-[#D5D0C8] bg-white p-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#AAA] mb-3">Still have questions?</p>
                  <div className="space-y-2">
                    <Link
                      href="/contact"
                      className="flex items-center gap-2 text-[11px] text-[#555] hover:text-[#1C1C1C] transition-colors"
                    >
                      <ChevronRight className="w-3 h-3" /> Contact us
                    </Link>
                    <Link
                      href="/submit"
                      className="flex items-center gap-2 text-[11px] text-[#555] hover:text-[#1C1C1C] transition-colors"
                    >
                      <ChevronRight className="w-3 h-3" /> List your startup
                    </Link>
                    <Link
                      href="/reports"
                      className="flex items-center gap-2 text-[11px] text-[#555] hover:text-[#1C1C1C] transition-colors"
                    >
                      <ChevronRight className="w-3 h-3" /> Get a free report
                    </Link>
                  </div>
                </div>

                {/* Trust */}
                <div className="mt-4 space-y-2 pt-4 border-t border-[#E8E4DC]">
                  {[
                    { icon: Shield, text: "Independent registry" },
                    { icon: BadgeCheck, text: "Free, always" },
                    { icon: Globe, text: "Publicly indexed" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <item.icon className="w-3 h-3 text-[#CCC]" />
                      <span className="text-[10px] text-[#AAA]">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── FAQ ACCORDION ── */}
            <div className="lg:col-span-3 lg:pl-8 py-8">
              <FAQClient categories={FAQ_CATEGORIES} />
            </div>
          </div>

          {/* ── BOTTOM CTA ── */}
          <div className="border-t border-[#D5D0C8] pt-10 mt-4">
            <div className="bg-[#1C1C1C] text-white p-8 sm:p-10 relative overflow-hidden">
              {/* Decorative grid */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 80px)",
                }}
              />
              <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div>
                  <p className="text-[9px] text-[#E8C547] font-bold uppercase tracking-[0.25em] mb-3">Ready to get started?</p>
                  <h2
                    className="text-2xl sm:text-3xl tracking-tight text-white mb-2"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    List your startup — free, forever.
                  </h2>
                  <p className="text-sm text-white/50 max-w-md">
                    Join India's independent startup registry. Verified profile, AI growth report,
                    and permanent public presence — in under 5 minutes.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                  <Link
                    href="/submit"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#E8C547] text-[#1C1C1C] text-[11px] font-bold tracking-wider uppercase hover:bg-[#F5D55A] transition-colors"
                  >
                    List Your Startup <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/reports"
                    className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-[11px] font-bold tracking-wider uppercase hover:border-white/40 transition-colors"
                  >
                    Free Report <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
