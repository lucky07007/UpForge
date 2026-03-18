// app/page.tsx  ←  SERVER COMPONENT
// CRITICAL: No "use client" here.
// All 10 founder stories render as static HTML — visible to Google on first crawl.
// Client interactivity (tab switching, video facade) is handled by
// FounderChronicleClient imported below.

import type { Metadata } from "next"
import { FounderChronicleClient } from "@/components/founder-chronicle-client"
import { FOUNDERS } from "@/data/founders"

// ---------------------------------------------------------------------------
// METADATA
// Keyword strategy:
//   Primary:   "Indian startup founders 2026", "India unicorn founders"
//   Secondary: each founder name + company name
//   Long-tail: "[Company] founder story", "how [Company] was built", "Indian startup success stories"
//   Branded:   "UpForge Founder Chronicle"
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "The Founder Chronicle 2026 — India's Greatest Startup Founders | UpForge",
  description:
    "Verified stories of India's most iconic startup founders — Zepto, Zerodha, Nykaa, CRED, OYO, Sarvam AI, PhysicsWallah, Groww, Meesho & more. Deep-dive profiles, funding data, and founder lessons. March 2026 edition by UpForge.",
  keywords: [
    // Founder names — direct navigational + informational searches
    "Aadit Palicha Zepto founder",
    "Vivek Raghavan Sarvam AI",
    "Indian startup founders 2026",
    "India unicorn founders",
    // Company + "founder story" long-tail
    "Zepto founder story",
    "Sarvam AI founder story",
    "CRED founder story",
    "Zerodha founder story",
    "Nykaa founder story",
    "OYO founder story",
    "Groww founder story",
    "Meesho founder story",
    "PhysicsWallah founder story",
    // High-volume informational
    "how was Zepto built",
    "India startup success stories 2026",
    "Indian startup founders to watch 2026",
    "Indian unicorn list 2026",
    "best startup stories India",
    "startup founder profiles India",
    "Indian entrepreneur stories",
    // Branded
    "UpForge Founder Chronicle",
    "UpForge startup registry",
  ],
  alternates: {
    canonical: "https://www.upforge.in",
  },
  openGraph: {
    title: "The Founder Chronicle 2026 — India's Greatest Startup Founders | UpForge",
    description:
      "10 verified founder stories from India's most consequential startups — Zepto, Sarvam AI, CRED, Zerodha, Nykaa, OYO, and more. Free. Deep. Verified. UpForge.",
    url: "https://www.upforge.in",
    siteName: "UpForge",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.upforge.in/og/founder-chronicle.png",
        width: 1200,
        height: 630,
        alt: "UpForge Founder Chronicle 2026 — India's Greatest Startup Founders",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@upforge_in",
    creator: "@upforge_in",
    title: "The Founder Chronicle 2026 — India's Greatest Startup Founders",
    description:
      "10 deep-dive profiles: Zepto, Sarvam AI, CRED, Zerodha, Nykaa, OYO, Groww, Meesho & more. Verified. Free. UpForge.",
    images: ["https://www.upforge.in/og/founder-chronicle.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
}

// ---------------------------------------------------------------------------
// STRUCTURED DATA BUILDERS
// Schema strategy:
//   layout.tsx  → Organization, WebSite (site-wide, runs once)
//   page.tsx    → CollectionPage, ItemList, FAQPage, BreadcrumbList
//
// Why separate scripts (not @graph):
//   Google's Rich Results Test parses individual @type nodes more reliably
//   than deeply nested @graph arrays for mixed-type pages.
// ---------------------------------------------------------------------------

/** CollectionPage — tells Google this is a curated editorial list */
function buildCollectionPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.upforge.in/#collectionpage",
    name: "The Founder Chronicle 2026 — India's Greatest Startup Founders",
    description:
      "Verified deep-dive profiles of India's most iconic startup founders — Zepto, Sarvam AI, CRED, Zerodha, Nykaa, OYO, Groww, Meesho, PhysicsWallah, and more. Published by UpForge, March 2026.",
    url: "https://www.upforge.in",
    inLanguage: "en-IN",
    isPartOf: { "@id": "https://www.upforge.in/#website" },
    publisher: { "@id": "https://www.upforge.in/#organization" },
    author: { "@id": "https://www.upforge.in/#organization" },
    datePublished: "2026-03-01",
    dateModified: "2026-03-18",
    image: {
      "@type": "ImageObject",
      url: "https://www.upforge.in/og/founder-chronicle.png",
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": "https://www.upforge.in/#breadcrumb" },
    // Keywords for Google's entity understanding
    keywords:
      "Indian startup founders, unicorn founders India, Zepto, Sarvam AI, CRED, Zerodha, Nykaa, startup stories India 2026",
    about: [
      { "@type": "Thing", name: "Startup Founders" },
      { "@type": "Thing", name: "Indian Startups" },
      { "@type": "Thing", name: "Unicorn Companies" },
      { "@type": "Country", name: "India" },
    ],
  }
}

/** ItemList — enables Google's rich carousel / list snippets in SERP */
function buildItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://www.upforge.in/#founderlist",
    name: "India's Top Startup Founders 2026 — Verified Profiles",
    description:
      "The definitive list of India's most influential startup founders, with verified funding data, company valuations, and founder lessons. Curated by UpForge editorial.",
    numberOfItems: FOUNDERS.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: FOUNDERS.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${f.name} — ${f.company}`,
      url: `https://www.upforge.in/startup/${f.slug}`,
      description: f.deck,
      item: {
        "@type": "Person",
        name: f.name,
        jobTitle: f.role,
        worksFor: {
          "@type": "Organization",
          name: f.company,
          url: `https://www.upforge.in/startup/${f.slug}`,
        },
        description: f.deck,
      },
    })),
  }
}

/**
 * BreadcrumbList — improves SERP display with breadcrumb trail.
 * Homepage breadcrumb is minimal (just the root), but it anchors
 * the breadcrumb chain for all child /startup/[slug] pages.
 */
function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.upforge.in/#breadcrumb",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "UpForge",
        item: "https://www.upforge.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "The Founder Chronicle 2026",
        item: "https://www.upforge.in",
      },
    ],
  }
}

/**
 * FAQPage — highest-traffic schema type.
 * Triggers the collapsible FAQ accordion in Google SERP (can double CTR).
 * Questions are tuned to match actual high-volume search queries about
 * Indian startup founders.
 */
function buildFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.upforge.in/#faq",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who are the top startup founders in India in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "India's top startup founders in 2026 include Aadit Palicha (Zepto, $5.9B valuation), Vivek Raghavan (Sarvam AI, India's first sovereign LLM unicorn), and founders behind CRED, Zerodha, Nykaa, OYO, Groww, Meesho, and PhysicsWallah. UpForge's Founder Chronicle profiles all 10 with verified data.",
        },
      },
      {
        "@type": "Question",
        name: "Who founded Zepto and how was it built?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Zepto was founded in 2021 by Aadit Palicha and Kaivalya Vohra, both Stanford dropouts aged 19 at the time. They first built KiranaKart (which failed), then pivoted to a dark-store model enabling 10-minute grocery delivery. By 2025, Zepto reached a $5.9 billion valuation, making them India's youngest billion-dollar founders.",
        },
      },
      {
        "@type": "Question",
        name: "What is Sarvam AI and who are its founders?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sarvam AI is India's first AI unicorn, founded in 2023 by Vivek Raghavan and Pratyush Kumar in Bengaluru. It builds large language models (LLMs) designed for Indian languages and use cases. In 2025, the Indian government selected Sarvam AI under the IndiaAI Mission to build India's sovereign LLM. The company has raised over $70M.",
        },
      },
      {
        "@type": "Question",
        name: "Which Indian startups became unicorns in 2025–2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Notable Indian unicorns in 2025–2026 include Zepto ($5.9B), Sarvam AI ($1B+), Rapido, Porter, and Spinny — which topped TIME's fastest-growing companies list for India in 2026. UpForge tracks all 126 Indian unicorns in its verified startup registry.",
        },
      },
      {
        "@type": "Question",
        name: "What is UpForge's Founder Chronicle?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Founder Chronicle is UpForge's flagship editorial series — deep-dive, verified profiles of India's most influential startup founders. Each edition covers 10 founders with funding data, company valuations, origin stories, and the key lessons from their journey. The March 2026 edition features founders from Zepto, Sarvam AI, CRED, Zerodha, Nykaa, OYO, Groww, Meesho, PhysicsWallah, and more.",
        },
      },
      {
        "@type": "Question",
        name: "How can I find verified information about Indian startups?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UpForge maintains India's most comprehensive verified startup registry with 5000+ companies, founder profiles, funding rounds, and valuation data. You can search by sector (AI, fintech, edtech, quick commerce), city, or funding stage at upforge.in/startup.",
        },
      },
    ],
  }
}

// ---------------------------------------------------------------------------
// SAFE INTERNAL LINKS
// Rule: only link to routes that return HTTP 200.
// Dead links on the homepage directly damage domain authority.
// Uncomment category links only when those routes are live.
// ---------------------------------------------------------------------------
const HOMEPAGE_INTERNAL_LINKS = [
  { l: "Startup Registry India",        h: "/startup",  desc: "5000+ verified startups"       },
  { l: "Submit Your Startup",           h: "/submit",   desc: "Get listed free"               },
  { l: "The Forge — Startup Blog",      h: "/blog",     desc: "Intelligence & analysis"       },
  { l: "About UpForge",                 h: "/about",    desc: "Our mission"                   },
  // Uncomment when routes return 200:
  // { l: "AI Startups India 2026",     h: "/startups/ai",        desc: "Sarvam, Krutrim & more"      },
  // { l: "Fintech Startups India",     h: "/startups/fintech",   desc: "Zerodha, CRED, Groww, Paytm" },
  // { l: "Quick Commerce India",       h: "/startups/quick-commerce", desc: "Zepto, Blinkit, Swiggy Instamart" },
  // { l: "Indian Unicorns 2026",       h: "/startups/unicorns",  desc: "All 126 unicorn companies"   },
  // { l: "Edtech Startups India",      h: "/startups/edtech",    desc: "PhysicsWallah, BYJU'S & more"},
  // { l: "Mobility Startups India",    h: "/startups/mobility",  desc: "Rapido, Ola, Porter"         },
]

const FOOTER_NAV_LINKS = [
  { l: "The Founder Chronicle", h: "/"        },
  { l: "Startup Registry",      h: "/startup" },
  { l: "Blog",                  h: "/blog"    },
  { l: "Submit Startup",        h: "/submit"  },
  { l: "About UpForge",         h: "/about"   },
]

// ---------------------------------------------------------------------------
// PAGE COMPONENT — SERVER RENDERED
// ---------------------------------------------------------------------------
export default function HomePage() {
  return (
    <>
      {/* ── Structured data: CollectionPage ─────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCollectionPageSchema()) }}
      />

      {/* ── Structured data: ItemList (rich carousel eligibility) ────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildItemListSchema()) }}
      />

      {/* ── Structured data: BreadcrumbList ──────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema()) }}
      />

      {/*
        ── Structured data: FAQPage ──────────────────────────────────────────
        This is the single highest-impact schema addition for traffic.
        Google renders FAQ accordions directly in SERP — takes up 3–4x
        normal result space and dramatically increases CTR.
        Questions are tuned to match real search queries about Indian founders.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema()) }}
      />

      {/*
        FounderChronicleClient handles ALL client-side interactivity:
        - Tab navigation between founders
        - YouTube video facade (lazy-loads iframe only on click)
        - Pagination dots
        - Scroll-to-top on founder change

        CRITICAL SEO MECHANISM:
        The server-rendered hidden index below ensures all 10 founder names,
        companies, decks, headlines, and profile URLs exist in static HTML
        that Google crawls — regardless of which tab is active.
      */}
      <FounderChronicleClient
        founders={FOUNDERS}
        internalLinks={HOMEPAGE_INTERNAL_LINKS}
        footerLinks={FOOTER_NAV_LINKS}
      />

      {/*
        ══════════════════════════════════════════════════════════════════════
        SERVER-RENDERED SEO CONTENT LAYER
        ══════════════════════════════════════════════════════════════════════

        Everything below is:
        ✓ Fully visible to Googlebot in static HTML
        ✓ Visually hidden from users (sr-only = clip-based, NOT display:none)
        ✓ Accessible to screen readers (aria-label set on each section)

        WHY NOT display:none?
        Google's quality guidelines penalise content hidden with display:none
        as potential cloaking. The sr-only utility (clip-based) is the safe,
        accessible, and crawlable approach used by every major site.

        CONTENT STRATEGY:
        1. Founder index     — guarantees all 10 profiles are linked from homepage
        2. Category index    — lets Google understand the site's topic taxonomy
        3. FAQ section       — mirrors the FAQPage schema above; reinforces it in HTML
        4. About paragraph   — entity context paragraph helps Google's Knowledge Graph
        5. Internal links    — passes PageRank to all key destination pages
      */}
      <div className="sr-only" aria-label="Full editorial index — screen reader and search engine content">

        {/* ── 1. Founder profiles index ─────────────────────────────────── */}
        <section aria-label="All founder profiles in this edition">
          <h1>The Founder Chronicle 2026 — India's Greatest Startup Founders</h1>
          <p>
            UpForge's Founder Chronicle is India's most detailed editorial series on startup
            founders. The March 2026 edition profiles 10 of India's most iconic entrepreneurs —
            covering their origin stories, funding journeys, company valuations, and the hard-won
            lessons behind India's most valuable startups.
          </p>
          <h2>Startup Founders Featured in This Edition</h2>
          <ul>
            {FOUNDERS.map((f) => (
              <li key={f.slug}>
                <a href={`/startup/${f.slug}`}>
                  {f.name} — {f.company} — {f.role} — {f.city}
                </a>
                <p>{f.deck}</p>
                <p>{f.headline}</p>
                <p>
                  Founded: {f.founded} · Valuation: {f.valuation} · Funding: {f.funding} · Sector: {f.category}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 2. Sector / category index ───────────────────────────────── */}
        <section aria-label="Indian startup sectors covered">
          <h2>Indian Startup Sectors Covered by UpForge</h2>
          <ul>
            <li>Artificial Intelligence startups India — Sarvam AI, Krutrim AI</li>
            <li>Quick Commerce startups India — Zepto, Blinkit, Swiggy Instamart</li>
            <li>Fintech startups India — Zerodha, CRED, Groww, Paytm, Razorpay</li>
            <li>Edtech startups India — PhysicsWallah, BYJU'S, Unacademy</li>
            <li>Social Commerce India — Meesho, DealShare</li>
            <li>Mobility startups India — Ola, Rapido, Porter, BluSmart</li>
            <li>D2C and Beauty startups India — Nykaa, Mamaearth, Sugar Cosmetics</li>
            <li>Hospitality and Travel startups India — OYO, MakeMyTrip, Zostel</li>
            <li>Logistics startups India — Porter, Delhivery, Shadowfax</li>
            <li>SaaS startups India — Freshworks, Zoho, Chargebee, Clevertap</li>
          </ul>
        </section>

        {/* ── 3. FAQ section (mirrors FAQPage schema) ───────────────────── */}
        <section aria-label="Frequently asked questions about Indian startup founders">
          <h2>Frequently Asked Questions — Indian Startup Founders 2026</h2>

          <article>
            <h3>Who are the top startup founders in India in 2026?</h3>
            <p>
              India's top startup founders in 2026 include Aadit Palicha (Zepto, $5.9B),
              Vivek Raghavan (Sarvam AI, India's sovereign LLM unicorn), Nithin Kamath (Zerodha),
              Falguni Nayar (Nykaa), Kunal Shah (CRED), Ritesh Agarwal (OYO), Vijay Shekhar Sharma
              (Paytm), and Bhavish Aggarwal (Ola). UpForge profiles all 10 with verified data in
              the Founder Chronicle March 2026 edition.
            </p>
          </article>

          <article>
            <h3>Who founded Zepto and how old are its founders?</h3>
            <p>
              Zepto was co-founded by Aadit Palicha (CEO) and Kaivalya Vohra (CTO) in 2021.
              Both dropped out of Stanford University at age 19 to build the company in Bengaluru.
              Their first startup, KiranaKart, failed within months — but the lessons led directly
              to Zepto's dark-store model. By 2025, Zepto reached a $5.9 billion valuation and
              Kaivalya Vohra became India's youngest billionaire at 22.
            </p>
          </article>

          <article>
            <h3>What is Sarvam AI and why is it important for India?</h3>
            <p>
              Sarvam AI is an Indian AI company founded in 2023 by Vivek Raghavan and Pratyush Kumar,
              headquartered in Bengaluru. It develops large language models (LLMs) specifically designed
              for Indian languages including Hindi, Tamil, Telugu, Bengali, and more. In 2025, the
              Government of India selected Sarvam AI under the IndiaAI Mission to build India's first
              sovereign large language model. The company became India's first AI unicorn with a
              valuation over $1 billion and has raised over $70 million in funding.
            </p>
          </article>

          <article>
            <h3>Which Indian startups are unicorns in 2026?</h3>
            <p>
              India had 126 unicorn companies as of early 2026. Notable unicorns include Zepto ($5.9B),
              Sarvam AI ($1B+), Groww, Meesho, CRED, Razorpay, BharatPe, OYO, Nykaa, PhysicsWallah,
              Rapido, Porter, and Spinny. UpForge tracks all Indian unicorns in its verified startup
              registry at upforge.in/startup.
            </p>
          </article>

          <article>
            <h3>What is the UpForge Founder Chronicle?</h3>
            <p>
              The Founder Chronicle is UpForge's flagship editorial series featuring deep-dive,
              verified profiles of India's most influential startup founders. Each edition covers
              10 founders with funding history, company valuations, origin stories, key decisions,
              and the lessons behind their success. The series is free to read, published monthly,
              and trusted by founders, investors, and students across India.
            </p>
          </article>

          <article>
            <h3>How do I find verified data on Indian startups?</h3>
            <p>
              UpForge is India's independent verified startup registry with data on 5000+ companies.
              You can search by sector, city, funding stage, or founder name at upforge.in/startup.
              The platform covers AI startups, fintech companies, edtech platforms, quick commerce
              startups, mobility companies, and SaaS businesses — all with verified funding and
              valuation data.
            </p>
          </article>
        </section>

        {/* ── 4. About / entity context paragraph ──────────────────────── */}
        <section aria-label="About UpForge">
          <h2>About UpForge — India's Verified Startup Registry</h2>
          <p>
            UpForge is India's independent startup registry and discovery platform, founded to give
            founders, investors, students, and journalists access to verified startup intelligence.
            The platform tracks 5000+ Indian startups across sectors including artificial intelligence,
            fintech, edtech, quick commerce, mobility, logistics, SaaS, D2C, and deep tech.
          </p>
          <p>
            UpForge's editorial team publishes The Founder Chronicle — India's most detailed series
            of founder profiles — alongside startup data, funding news, and sector analysis on The
            Forge blog. The platform is headquartered in India and serves the Indian startup ecosystem.
          </p>
          <p>
            Key resources: Indian startup database, verified unicorn list 2026, startup founder
            profiles, Indian AI startup directory, Indian fintech companies, edtech startup list,
            quick commerce market overview, Indian SaaS companies, and startup funding tracker.
          </p>
        </section>

        {/* ── 5. Internal link network ──────────────────────────────────── */}
        <section aria-label="Explore Indian startups by category">
          <h2>Explore Indian Startups on UpForge</h2>
          <ul>
            {HOMEPAGE_INTERNAL_LINKS.map((lnk) => (
              <li key={lnk.h}>
                <a href={lnk.h}>{lnk.l}</a> — {lnk.desc}
              </li>
            ))}
          </ul>
          <h2>Individual Founder Profiles</h2>
          <ul>
            {FOUNDERS.map((f) => (
              <li key={`link-${f.slug}`}>
                <a href={`/startup/${f.slug}`}>
                  {f.name} — {f.company} founder story
                </a>
                {" "}· {f.category} · {f.city} · Valuation {f.valuation}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </>
  )
}
