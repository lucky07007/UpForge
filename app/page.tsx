// app/page.tsx  ←  SERVER COMPONENT
// No "use client" — all 10 founder stories render as static HTML visible to Google on first crawl.
//
// DESIGN: FT.com × The Economist × upforge.org editorial authority
// Theme: Warm cream/ink newspaper — full dark mode via CSS variables
// Responsive: 3-col desktop → 1-col mobile
//
// SCHEMA CHANGES (vs previous):
// 1. Live dateModified in ALL JSON-LD schemas
// 2. Dataset schema on .org includes recordCount
// 3. Organization.numberOfEmployees + contactPoint (E-E-A-T)
// 4. FAQ expanded to 5 questions per domain
// 5. CollectionPage, WebSite, ItemList, BreadcrumbList all retained

import type { Metadata } from "next"
import { headers } from "next/headers"
import { FounderChronicleClient } from "../components/founder-chronicle-client"
import { FOUNDERS } from "../data/founders"
import { createClient } from "@/lib/supabase/server"

// ---------------------------------------------------------------------------
// DOMAIN DETECTION
// ---------------------------------------------------------------------------
async function getDomain(): Promise<"org" | "in"> {
  const headersList = await headers()
  const context = headersList.get("x-upforge-domain")
  if (context === "org" || context === "in") return context as "org" | "in"
  const host = headersList.get("host") ?? ""
  return host.includes("upforge.org") ? "org" : "in"
}

// ---------------------------------------------------------------------------
// LIVE DATA FETCHERS
// ---------------------------------------------------------------------------
async function getLatestDate(): Promise<string> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("startups")
      .select("updated_at")
      .eq("status", "approved")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single()
    if (data?.updated_at) return new Date(data.updated_at).toISOString().split("T")[0]
  } catch (_) {}
  return new Date().toISOString().split("T")[0]
}

async function getStartupCount(): Promise<number> {
  try {
    const supabase = await createClient()
    const { count } = await supabase
      .from("startups")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved")
    return count ?? FOUNDERS.length
  } catch (_) {}
  return 5000
}

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export async function generateMetadata(): Promise<Metadata> {
  const domain = await getDomain()
  const isOrg  = domain === "org"
  const canonicalUrl = isOrg ? "https://www.upforge.org" : "https://www.upforge.in"
  const ogImage      = "https://www.upforge.in/og/founder-chronicle.png"

  if (isOrg) {
    return {
      title: "Global Startup Registry — Verified UFRN Database | UpForge",
      description:
        "The official global startup registry. Every listing is manually verified and assigned a unique UpForge Registry Number (UFRN). Access open startup data, verified founder profiles, and global ecosystem intelligence.",
      keywords: [
        "global startup registry", "verified startup database", "UFRN registry",
        "UpForge Registry Number", "open startup data", "startup proof of existence",
        "independent startup registry", "startup verification", "UFRN lookup",
        "global founder database", "startup identity number", "verified startup number",
      ],
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: "Global Startup Registry — Verified UFRN Database",
        description: "The independent global registry for startups. Verified proof of existence via UFRN. Features 5000+ companies and world-class founders.",
        url: canonicalUrl, siteName: "UpForge Global Registry", locale: "en", type: "website",
        images: [{ url: ogImage, width: 1200, height: 630, alt: "UpForge Global Startup Registry", type: "image/png" }],
      },
      twitter: {
        card: "summary_large_image", site: "@upforge_in",
        title: "UpForge Global Startup Registry",
        description: "Open, verified registry of startups. Every company gets a unique UFRN.",
        images: [ogImage],
      },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 } },
    }
  }

  return {
    title: "Indian Startup Founders & Unicorn Stories — The Founder Chronicle 2026",
    description:
      "Explore verified stories of India's greatest startup founders and unicorn success stories — Zepto, CRED, Zerodha, Nykaa, OYO, Groww, Meesho & more. Funding data, valuations, and entrepreneurial lessons for the Indian ecosystem.",
    keywords: [
      "Indian startup founders 2026", "India unicorn stories", "startup success stories India",
      "Aadit Palicha Zepto story", "Kunal Shah CRED profile", "Nithin Kamath Zerodha lessons",
      "Falguni Nayar Nykaa journey", "Indian unicorn list 2026", "how was Zepto built",
      "best startup stories India", "startup founder profiles India", "Indian entrepreneur stories",
      "UpForge Founder Chronicle", "top founders India 2026", "Indian startup news today",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Indian Startup Founders & Unicorn Stories — The Founder Chronicle 2026",
      description: "10 deep-dive profiles of India's most iconic startup founders. Verified funding data, unicorn valuations, and the real stories behind the success. UpForge India.",
      url: canonicalUrl, siteName: "UpForge", locale: "en_IN", type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "UpForge Founder Chronicle 2026", type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image", site: "@upforge_in", creator: "@upforge_in",
      title: "Indian Startup Founders & Unicorn Stories",
      description: "Verified founder profiles: Zepto, CRED, Zerodha, Nykaa, OYO & more. Lessons from India's unicorns.",
      images: [ogImage],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 } },
  }
}

// ---------------------------------------------------------------------------
// STRUCTURED DATA BUILDERS
// ---------------------------------------------------------------------------
function buildCollectionPageSchema(isOrg: boolean, liveDate: string) {
  const base = isOrg ? "https://www.upforge.org" : "https://www.upforge.in"
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${base}/#collectionpage`,
    name: isOrg
      ? "UpForge Global Startup Registry — Verified UFRN Database"
      : "The Founder Chronicle 2026 — Indian Startup Founders & Unicorn Stories",
    description: isOrg
      ? "Open, independent, verified database of startups. Every entry is assigned a unique UpForge Registry Number (UFRN)."
      : "Verified deep-dive profiles of India's most iconic startup founders and unicorn companies.",
    url: base,
    inLanguage: isOrg ? "en" : "en-IN",
    isPartOf: { "@id": `${base}/#website` },
    publisher: { "@id": `${base}/#organization` },
    datePublished: "2026-03-01",
    dateModified: liveDate,
    image: { "@type": "ImageObject", url: "https://www.upforge.in/og/founder-chronicle.png", width: 1200, height: 630 },
    breadcrumb: { "@id": `${base}/#breadcrumb` },
  }
}

function buildDatasetSchema(liveDate: string, startupCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": "https://www.upforge.org/#dataset",
    name: "UpForge Global Startup Registry Dataset (UFRN)",
    description: "Open, verified database of global startups. Each startup is manually reviewed and assigned a permanent UpForge Registry Number (UFRN).",
    url: "https://www.upforge.org",
    creator: { "@type": "Organization", "@id": "https://www.upforge.org/#organization", name: "UpForge", url: "https://www.upforge.org" },
    publisher: { "@type": "Organization", name: "UpForge", url: "https://www.upforge.org" },
    license: "https://creativecommons.org/licenses/by/4.0/",
    keywords: ["startups", "UFRN", "startup registry", "verified startups", "global startup database"],
    variableMeasured: [
      { "@type": "PropertyValue", name: "UFRN", description: "UpForge Registry Number" },
      { "@type": "PropertyValue", name: "Status", description: "Verification Status" },
      { "@type": "PropertyValue", name: "Funding", description: "Funding Amount (USD)" },
    ],
    measurementTechnique: "Manual verification by UpForge editorial team",
    recordSet: {
      "@type": "DataFeedItem",
      item: { "@type": "Dataset", name: "Startup records", identifier: "ufrn-dataset" },
    },
    size: `${startupCount}+ verified startup records`,
    isAccessibleForFree: true,
    temporalCoverage: "2020/..",
    dateModified: liveDate,
    datePublished: "2026-03-01",
  }
}

function buildOrganizationSchema(isOrg: boolean, liveDate: string) {
  const base = isOrg ? "https://www.upforge.org" : "https://www.upforge.in"
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: "UpForge",
    url: base,
    logo: { "@type": "ImageObject", url: "https://www.upforge.in/logo.jpg", width: 512, height: 512 },
    sameAs: [
      "https://www.upforge.in",
      "https://www.upforge.org",
      "https://www.linkedin.com/company/upforge-india",
    ],
    description: isOrg
      ? "The global open startup registry — independent, verified, and free. Creator of the UFRN system."
      : "India's independent startup registry and discovery platform tracking 5000+ companies and founder stories.",
    foundingDate: "2024",
    areaServed: isOrg ? "Worldwide" : "India",
    // E-E-A-T signals
    numberOfEmployees: { "@type": "QuantitativeValue", value: "10+" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "editorial",
      url: `${base}/contact`,
      availableLanguage: "English",
    },
    dateModified: liveDate,
  }
}

function buildWebsiteSchema(isOrg: boolean) {
  const base = isOrg ? "https://www.upforge.org" : "https://www.upforge.in"
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: base,
    name: isOrg ? "UpForge Global Registry" : "UpForge",
    publisher: { "@id": `${base}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${base}/startup?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
    inLanguage: isOrg ? "en" : "en-IN",
  }
}

function buildItemListSchema(isOrg: boolean) {
  const base = isOrg ? "https://www.upforge.org" : "https://www.upforge.in"
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${base}/#founderlist`,
    name: "Top Startup Founders & Unicorn Profiles",
    numberOfItems: FOUNDERS.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: FOUNDERS.map((f, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: f.name,
        jobTitle: f.role,
        worksFor: { "@type": "Organization", name: f.company },
        url: `${base}/startup/${f.slug}`,
      },
    })),
  }
}

function buildBreadcrumbSchema(isOrg: boolean) {
  const base = isOrg ? "https://www.upforge.org" : "https://www.upforge.in"
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${base}/#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "UpForge", item: base },
      { "@type": "ListItem", position: 2, name: isOrg ? "Global Registry" : "The Founder Chronicle 2026", item: base },
    ],
  }
}

function buildFAQSchema(isOrg: boolean) {
  const base = isOrg ? "https://www.upforge.org" : "https://www.upforge.in"
  const questions = isOrg
    ? [
        { q: "What is the UFRN (UpForge Registry Number)?", a: "The UFRN is a unique permanent identifier assigned to every verified startup in the UpForge global registry. It serves as proof of existence and allows anyone to look up a startup's official listing at upforge.org/ufrn/[UFRN]." },
        { q: "How do I look up a startup's UFRN?", a: "Visit upforge.org/ufrn/[UFRN-ID] with the company's registry number, or search for the company at upforge.org/startup. Every approved listing displays its UFRN prominently." },
        { q: "Is UpForge free to use?", a: "Yes. UpForge is a free, independent startup registry. Both browsing and submitting a startup are completely free." },
        { q: "How does UpForge verify startups?", a: "Each submission is manually reviewed by the UpForge editorial team for legitimacy, active operations, and accurate data before being approved and assigned a UFRN." },
        { q: "Which countries are included in the UpForge global registry?", a: "UpForge covers startups from all major emerging markets including India, Southeast Asia, Africa, Latin America, and the Middle East, as well as global tech hubs worldwide." },
      ]
    : [
        { q: "Who are the top startup founders in India in 2026?", a: "India's top startup founders in 2026 include Aadit Palicha (Zepto), Kunal Shah (CRED), Nithin Kamath (Zerodha), Falguni Nayar (Nykaa), and Ritesh Agarwal (OYO). UpForge profiles all of these founders with verified funding and valuation data." },
        { q: "Which Indian startups are unicorns in 2026?", a: "Top Indian unicorns include Zepto, CRED, Groww, Meesho, Nykaa, PhysicsWallah, Rapido, and Zerodha. UpForge tracks all verified Indian unicorns with real funding data." },
        { q: "How do I find verified startups in India?", a: "Browse UpForge's verified Indian startup registry at upforge.in/startup. Filter by sector, city, funding stage, or founding year. All 5000+ listings are manually verified." },
        { q: "Which cities have the most startups in India?", a: "Bangalore leads India's startup ecosystem, followed by Mumbai, Delhi NCR, Hyderabad, and Pune. UpForge lets you filter startups by city to find companies in your region." },
        { q: "How do I submit my Indian startup to UpForge?", a: "Submit your startup for free at upforge.in/submit. The editorial team reviews each application and assigns a UFRN (UpForge Registry Number) upon approval." },
      ]

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${base}/#faq`,
    mainEntity: questions.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  }
}

// ---------------------------------------------------------------------------
// PAGE COMPONENT
// ---------------------------------------------------------------------------
export default async function HomePage() {
  const domain = await getDomain()
  const isOrg  = domain === "org"

  const [liveDate, startupCount] = await Promise.all([getLatestDate(), getStartupCount()])

  return (
    <>
      {/* ── GLOBAL DESIGN TOKENS ── injected once at root */}
      <style>{`
        :root {
          --uf-serif: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
          --uf-body:  'EB Garamond', 'Georgia', serif;
          --uf-sans:  'DM Sans', system-ui, sans-serif;

          --uf-ink:   #111008;
          --uf-ink2:  #2a2820;
          --uf-ink3:  #555248;
          --uf-ink4:  #888480;
          --uf-ink5:  #b8b4b0;

          --uf-paper:          #FAFAF6;
          --uf-paper-scrolled: rgba(250,250,246,.94);
          --uf-paper2:         #F3F2EC;
          --uf-paper3:         #EAE9E2;
          --uf-paper4:         #DDDACE;

          --uf-gold:   #A07D10;
          --uf-gold2:  #C59A2E;
          --uf-accent: #8B1A1A;

          --uf-rule:       rgba(0,0,0,.16);
          --uf-rule-light: rgba(0,0,0,.09);
        }

        [data-theme="dark"] {
          --uf-ink:   #F0EDE3;
          --uf-ink2:  #D6D2C6;
          --uf-ink3:  #9A9690;
          --uf-ink4:  #666360;
          --uf-ink5:  #444140;

          --uf-paper:          #141410;
          --uf-paper-scrolled: rgba(20,20,16,.94);
          --uf-paper2:         #1C1C18;
          --uf-paper3:         #222220;
          --uf-paper4:         #2E2E2A;

          --uf-gold:   #D4A90E;
          --uf-gold2:  #F0C520;
          --uf-accent: #E05050;

          --uf-rule:       rgba(255,255,255,.13);
          --uf-rule-light: rgba(255,255,255,.07);
        }

        /* Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { background: var(--uf-paper); color: var(--uf-ink); font-family: var(--uf-body); font-size: 16px; line-height: 1.65; scroll-behavior: smooth; transition: background .25s, color .25s; }

        /* ── EDITION BAR ── */
        .uf-edition-bar {
          display: flex;
          align-items: baseline;
          gap: 0;
          border-bottom: 1px solid var(--uf-rule-light);
          padding: 14px 0;
          font-family: var(--uf-sans);
        }
        .uf-edition-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--uf-gold);
          padding-right: 18px;
          border-right: 1px solid var(--uf-rule-light);
          margin-right: 18px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .uf-edition-desc {
          font-size: 13px;
          color: var(--uf-ink4);
          font-style: italic;
          font-family: var(--uf-body);
          flex: 1;
        }
        .uf-edition-count {
          font-size: 10px;
          color: var(--uf-ink5);
          white-space: nowrap;
          flex-shrink: 0;
          margin-left: 16px;
        }

        /* ── FRONT GRID ── */
        .uf-front-grid {
          display: grid;
          grid-template-columns: 1fr 1px 1.8fr 1px 1fr;
          gap: 0;
          padding: 28px 0 0;
          align-items: start;
        }
        .uf-col-divider {
          background: var(--uf-ink4);
          opacity: .2;
          width: 1px;
          align-self: stretch;
        }
        .uf-col-left    { padding-right: 26px; }
        .uf-col-center  { padding: 0 26px; }
        .uf-col-right   { padding-left: 26px; }

        /* ── SECTION LABELS ── */
        .uf-section-label {
          font-family: var(--uf-sans);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--uf-gold);
          border-bottom: 1px solid var(--uf-gold);
          padding-bottom: 5px;
          margin-bottom: 16px;
          display: inline-block;
        }
        .uf-section-label-plain {
          font-family: var(--uf-sans);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--uf-ink4);
          border-bottom: 1px solid var(--uf-rule-light);
          padding-bottom: 5px;
          margin-bottom: 16px;
          display: block;
        }

        /* ── LEAD STORY ── */
        .uf-lead-eyebrow {
          font-family: var(--uf-sans);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--uf-accent);
          margin-bottom: 10px;
        }
        .uf-lead-headline {
          font-family: var(--uf-serif);
          font-size: clamp(22px, 3.5vw, 40px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -.02em;
          color: var(--uf-ink);
          margin-bottom: 14px;
        }
        .uf-lead-deck {
          font-family: var(--uf-body);
          font-size: 16px;
          line-height: 1.7;
          color: var(--uf-ink3);
          margin-bottom: 16px;
          font-style: italic;
        }
        .uf-lead-byline {
          font-family: var(--uf-sans);
          font-size: 10px;
          color: var(--uf-ink4);
          letter-spacing: .06em;
          text-transform: uppercase;
          border-top: 1px solid var(--uf-rule-light);
          padding-top: 10px;
          margin-bottom: 20px;
        }
        .uf-img-placeholder {
          width: 100%;
          aspect-ratio: 16 / 8;
          background: var(--uf-paper3);
          border: 1px solid var(--uf-rule-light);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }
        .uf-img-caption {
          font-family: var(--uf-sans);
          font-size: 10px;
          color: var(--uf-ink4);
          margin-bottom: 16px;
          font-style: italic;
          line-height: 1.5;
        }
        .uf-lead-body {
          font-family: var(--uf-body);
          font-size: 15px;
          line-height: 1.8;
          color: var(--uf-ink2);
        }
        .uf-lead-body p { margin-bottom: 14px; }
        .uf-lead-body p:last-child { margin-bottom: 0; }
        .uf-drop-cap::first-letter {
          font-family: var(--uf-serif);
          font-size: 54px;
          font-weight: 900;
          float: left;
          line-height: .85;
          margin: 4px 8px 0 0;
          color: var(--uf-ink);
        }

        /* ── PULL QUOTE ── */
        .uf-pull-quote {
          border-left: 3px solid var(--uf-accent);
          padding: 12px 18px;
          margin: 20px 0;
          background: var(--uf-paper2);
        }
        .uf-pull-quote-text {
          font-family: var(--uf-body);
          font-size: 16px;
          font-style: italic;
          line-height: 1.65;
          color: var(--uf-ink2);
        }
        .uf-pull-quote-attr {
          font-family: var(--uf-sans);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--uf-ink4);
          margin-top: 8px;
        }

        /* ── SIDEBAR STORIES ── */
        .uf-sidebar-story {
          border-bottom: 1px solid var(--uf-rule-light);
          padding-bottom: 18px;
          margin-bottom: 18px;
        }
        .uf-sidebar-story:last-child { border-bottom: none; margin-bottom: 0; }
        .uf-sidebar-label {
          font-family: var(--uf-sans);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--uf-gold);
          margin-bottom: 6px;
        }
        .uf-sidebar-hed {
          font-family: var(--uf-serif);
          font-size: 15px;
          font-weight: 700;
          line-height: 1.25;
          color: var(--uf-ink);
          margin-bottom: 7px;
        }
        .uf-sidebar-deck {
          font-family: var(--uf-body);
          font-size: 13px;
          line-height: 1.6;
          color: var(--uf-ink3);
          font-style: italic;
        }
        .uf-sidebar-meta {
          font-family: var(--uf-sans);
          font-size: 10px;
          color: var(--uf-ink4);
          margin-top: 8px;
          letter-spacing: .04em;
        }

        /* ── DATA TICKER ── */
        .uf-data-ticker {
          background: var(--uf-paper2);
          border: 1px solid var(--uf-rule-light);
          padding: 16px 18px;
          margin-bottom: 22px;
        }
        .uf-data-ticker-label {
          font-family: var(--uf-sans);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--uf-ink4);
          margin-bottom: 12px;
          border-bottom: 1px solid var(--uf-rule-light);
          padding-bottom: 8px;
        }
        .uf-data-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 6px 0;
          border-bottom: 1px solid var(--uf-rule-light);
          font-family: var(--uf-sans);
        }
        .uf-data-row:last-child { border-bottom: none; }
        .uf-data-company { font-size: 12px; font-weight: 500; color: var(--uf-ink2); }
        .uf-data-sector  { font-size: 10px; color: var(--uf-ink5); margin-left: 5px; }
        .uf-data-val     { font-size: 12px; font-weight: 700; color: var(--uf-ink); }
        .uf-data-up      { color: #2d7a3a; }

        /* ── UFRN WIDGET ── */
        .uf-registry-widget {
          border: 2px solid var(--uf-ink);
          padding: 18px;
          margin-bottom: 24px;
        }
        .uf-registry-title {
          font-family: var(--uf-serif);
          font-size: 14px;
          font-weight: 700;
          color: var(--uf-ink);
          margin-bottom: 3px;
        }
        .uf-registry-sub {
          font-family: var(--uf-sans);
          font-size: 10px;
          color: var(--uf-ink4);
          margin-bottom: 14px;
          letter-spacing: .06em;
        }
        .uf-ufrn-row { display: flex; gap: 0; }
        .uf-ufrn-input {
          flex: 1;
          border: 1px solid var(--uf-ink3);
          border-right: none;
          padding: 8px 10px;
          font-family: var(--uf-sans);
          font-size: 12px;
          background: var(--uf-paper);
          color: var(--uf-ink);
          outline: none;
          min-width: 0;
        }
        .uf-ufrn-btn {
          padding: 8px 14px;
          background: var(--uf-ink);
          color: var(--uf-paper);
          font-family: var(--uf-sans);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .uf-ufrn-stats {
          margin-top: 10px;
          display: flex;
          gap: 18px;
          font-family: var(--uf-sans);
          font-size: 10px;
          color: var(--uf-ink4);
        }
        .uf-ufrn-stats span { color: var(--uf-gold); font-weight: 700; }

        /* ── TAGS ── */
        .uf-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
        .uf-tag {
          font-family: var(--uf-sans);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          border: 1px solid var(--uf-rule);
          padding: 3px 9px;
          color: var(--uf-ink4);
        }

        /* ── BOTTOM FOUNDERS SECTION ── */
        .uf-bottom-section {
          border-top: 2px solid var(--uf-ink);
          margin-top: 32px;
          padding: 24px 0 36px;
        }
        .uf-bottom-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 22px;
          gap: 12px;
        }
        .uf-bottom-headline {
          font-family: var(--uf-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--uf-ink);
        }
        .uf-bottom-see-all {
          font-family: var(--uf-sans);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--uf-gold);
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .uf-founders-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
        }
        .uf-founder-card {
          border-right: 1px solid var(--uf-rule-light);
          padding: 0 20px 18px 0;
        }
        .uf-founder-card:last-child { border-right: none; padding-right: 0; }
        .uf-founder-card + .uf-founder-card { padding-left: 20px; }
        .uf-founder-num {
          font-family: var(--uf-serif);
          font-size: 30px;
          font-weight: 900;
          color: var(--uf-paper4);
          line-height: 1;
          margin-bottom: 6px;
        }
        .uf-founder-company {
          font-family: var(--uf-sans);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--uf-gold);
          margin-bottom: 5px;
        }
        .uf-founder-name {
          font-family: var(--uf-serif);
          font-size: 14px;
          font-weight: 700;
          line-height: 1.25;
          color: var(--uf-ink);
          margin-bottom: 6px;
        }
        .uf-founder-tagline {
          font-family: var(--uf-body);
          font-size: 12px;
          line-height: 1.55;
          color: var(--uf-ink3);
          font-style: italic;
        }
        .uf-founder-val {
          font-family: var(--uf-sans);
          font-size: 10px;
          font-weight: 600;
          color: var(--uf-ink4);
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid var(--uf-rule-light);
        }

        /* ── PAGE WRAPPER ── */
        .uf-page { max-width: 1440px; margin: 0 auto; padding: 0 24px; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .uf-front-grid {
            grid-template-columns: 1fr 1px 1.6fr !important;
          }
          .uf-col-right-hidden { display: none !important; }
        }
        @media (max-width: 768px) {
          .uf-front-grid {
            grid-template-columns: 1fr !important;
            padding-top: 20px;
          }
          .uf-col-divider { display: none !important; }
          .uf-col-left, .uf-col-center, .uf-col-right {
            padding: 0 !important;
            border-bottom: 1px solid var(--uf-rule-light);
            padding-bottom: 24px !important;
            margin-bottom: 8px !important;
          }
          .uf-founders-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
          .uf-founder-card {
            border-right: none !important;
            border-bottom: 1px solid var(--uf-rule-light) !important;
            padding: 0 0 16px !important;
          }
          .uf-founder-card:last-child { border-bottom: none !important; }
          .uf-founder-card + .uf-founder-card { padding-left: 0 !important; }
          .uf-edition-bar { flex-wrap: wrap; gap: 6px; }
          .uf-edition-count { margin-left: 0; }
          .uf-page { padding: 0 16px; }
        }
        @media (max-width: 480px) {
          .uf-founders-grid { grid-template-columns: 1fr !important; }
          .uf-lead-headline { font-size: 22px !important; }
        }
      `}</style>

      {/* ── JSON-LD SCHEMAS ── */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationSchema(isOrg, liveDate)) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebsiteSchema(isOrg)) }} />
      {isOrg && (
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildDatasetSchema(liveDate, startupCount)) }} />
      )}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCollectionPageSchema(isOrg, liveDate)) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildItemListSchema(isOrg)) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(isOrg)) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(isOrg)) }} />

      {/* ── FOUNDER CHRONICLE CLIENT (your existing component) ── */}
      <FounderChronicleClient
        founders={FOUNDERS}
        internalLinks={[
          { l: "Startup Registry India",   h: "/startup", desc: "5000+ verified startups" },
          { l: "Submit Your Startup",      h: "/submit",  desc: "Get listed free"         },
          { l: "The Forge — Startup Blog", h: "/blog",    desc: "Intelligence & analysis" },
          { l: "About UpForge",            h: "/about",   desc: "Our mission"             },
        ]}
        footerLinks={[
          { l: "The Founder Chronicle", h: "/"        },
          { l: "Startup Registry",      h: "/startup" },
          { l: "Blog",                  h: "/blog"    },
          { l: "Submit Startup",        h: "/submit"  },
          { l: "About UpForge",         h: "/about"   },
        ]}
      />

      {/* ── SEO CONTENT LAYER — static HTML for crawlers ── */}
      <div className="sr-only" aria-label="SEO content">
        <section>
          <h1>
            {isOrg
              ? "Global Startup Registry — Verified UFRN Database"
              : "Indian Startup Founders & Unicorn Stories — The Founder Chronicle 2026"}
          </h1>
          <p>
            {isOrg
              ? "UpForge Global Registry provides verified proof of existence for startups worldwide through the UFRN system. Every startup receives a unique UpForge Registry Number upon manual verification."
              : "Explore the verified stories of India's unicorn founders and the journeys behind their multi-billion dollar companies. Updated daily with real funding data."}
          </p>
          <nav aria-label="Founder profiles">
            <ul>
              {FOUNDERS.map((f) => (
                <li key={f.slug}>
                  <a href={`/startup/${f.slug}`}>
                    {f.name} — {f.role} at {f.company}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Startup categories">
            <ul>
              <li><a href="/startups/fintech">Fintech Startups India</a></li>
              <li><a href="/startups/edtech">Edtech Startups India</a></li>
              <li><a href="/startups/ai">AI Startups India</a></li>
              <li><a href="/startups/saas">SaaS Startups India</a></li>
              <li><a href="/startups/d2c">D2C Startups India</a></li>
              <li><a href="/startups/logistics">Logistics Startups India</a></li>
            </ul>
          </nav>
        </section>
      </div>
    </>
  )
}
