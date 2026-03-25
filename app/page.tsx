// app/page.tsx  ←  SERVER COMPONENT
// CRITICAL: No "use client" here.
// All 10 founder stories render as static HTML — visible to Google on first crawl.
//
// DUAL-DOMAIN SEO STRATEGY:
// upforge.org  → canonical = .org | global authority | Wikipedia/Dataset signals
// upforge.in   → canonical = .in  | India marketing hub | local SEO
// Same page, same content, different canonical + schema signals per domain.

import type { Metadata } from "next"
import { headers } from "next/headers"
// Fixed: Using relative paths to resolve compilation issues in the preview environment
import { FounderChronicleClient } from "../components/founder-chronicle-client"
import { FOUNDERS } from "../data/founders"

// ---------------------------------------------------------------------------
// DOMAIN DETECTION HELPER
// ---------------------------------------------------------------------------
async function getDomain(): Promise<"org" | "in"> {
  const headersList = await headers()
  // Check the context header set by our middleware.ts
  const context = headersList.get("x-upforge-domain")
  if (context === "org" || context === "in") return context as "org" | "in"
  
  // Fallback to hostname check
  const host = headersList.get("host") ?? ""
  return host.includes("upforge.org") ? "org" : "in"
}

// ---------------------------------------------------------------------------
// METADATA — domain-aware
// .org → global authority signals, Dataset, Wikipedia-style
// .in  → India marketing, high-volume Indian startup keywords
// ---------------------------------------------------------------------------
export async function generateMetadata(): Promise<Metadata> {
  const domain = await getDomain()
  const isOrg  = domain === "org"

  const canonicalUrl = isOrg ? "https://www.upforge.org" : "https://www.upforge.in"
  const ogImage      = "https://www.upforge.in/og/founder-chronicle.png"

  if (isOrg) {
    // ── .ORG metadata: global authority, open data, UFRN focus ────────
    return {
      title: "Global Startup Registry — Verified UFRN Database | UpForge",
      description:
        "The official global startup registry. Every listing is manually verified and assigned a unique UpForge Registry Number (UFRN). Access open startup data, verified founder profiles, and global ecosystem intelligence.",
      keywords: [
        "global startup registry",
        "verified startup database",
        "UFRN registry",
        "UpForge Registry Number",
        "open startup data",
        "startup proof of existence",
        "independent startup registry",
        "startup verification",
        "UFRN lookup",
        "global founder database",
      ],
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: "Global Startup Registry — Verified UFRN Database",
        description:
          "The independent global registry for startups. Verified proof of existence via UFRN. Features 5000+ companies and world-class founders.",
        url: canonicalUrl,
        siteName: "UpForge Global Registry",
        locale: "en",
        type: "website",
        images: [{ url: ogImage, width: 1200, height: 630, alt: "UpForge Global Startup Registry", type: "image/png" }],
      },
      twitter: {
        card: "summary_large_image",
        site: "@upforge_in",
        title: "UpForge Global Startup Registry",
        description: "Open, verified registry of startups. Every company gets a unique UFRN.",
        images: [ogImage],
      },
      robots: {
        index: true, follow: true,
        googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
      },
    }
  }

  // ── .IN metadata: India marketing hub, unicorn & founder stories focus ──────────────
  return {
    title: "Indian Startup Founders & Unicorn Stories — The Founder Chronicle 2026",
    description:
      "Explore verified stories of India's greatest startup founders and unicorn success stories — Zepto, CRED, Zerodha, Nykaa, OYO, Groww, Meesho & more. Funding data, valuations, and entrepreneurial lessons for the Indian ecosystem.",
    keywords: [
      "Indian startup founders 2026",
      "India unicorn stories",
      "startup success stories India",
      "Aadit Palicha Zepto story",
      "Kunal Shah CRED profile",
      "Nithin Kamath Zerodha lessons",
      "Falguni Nayar Nykaa journey",
      "Indian unicorn list 2026",
      "how was Zepto built",
      "best startup stories India",
      "startup founder profiles India",
      "Indian entrepreneur stories",
      "UpForge Founder Chronicle",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Indian Startup Founders & Unicorn Stories — The Founder Chronicle 2026",
      description:
        "10 deep-dive profiles of India's most iconic startup founders. Verified funding data, unicorn valuations, and the real stories behind the success. UpForge India.",
      url: canonicalUrl,
      siteName: "UpForge",
      locale: "en_IN",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "UpForge Founder Chronicle 2026", type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@upforge_in",
      creator: "@upforge_in",
      title: "Indian Startup Founders & Unicorn Stories",
      description: "Verified founder profiles: Zepto, CRED, Zerodha, Nykaa, OYO & more. Lessons from India's unicorns.",
      images: [ogImage],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
  }
}

// ---------------------------------------------------------------------------
// STRUCTURED DATA BUILDERS — domain-aware
// ---------------------------------------------------------------------------

function buildCollectionPageSchema(isOrg: boolean) {
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
    dateModified: new Date().toISOString().split("T")[0],
    image: { "@type": "ImageObject", url: "https://www.upforge.in/og/founder-chronicle.png", width: 1200, height: 630 },
    breadcrumb: { "@id": `${base}/#breadcrumb` },
  }
}

function buildDatasetSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": "https://www.upforge.org/#dataset",
    name: "UpForge Global Startup Registry Dataset (UFRN)",
    description:
      "Open, verified database of global startups. Each startup is manually reviewed and assigned a permanent UpForge Registry Number (UFRN).",
    url: "https://www.upforge.org",
    creator: {
      "@type": "Organization",
      "@id": "https://www.upforge.org/#organization",
      name: "UpForge",
      url: "https://www.upforge.org",
    },
    publisher: {
      "@type": "Organization",
      name: "UpForge",
      url: "https://www.upforge.org",
    },
    license: "https://creativecommons.org/licenses/by/4.0/",
    keywords: ["startups", "UFRN", "startup registry", "verified startups", "global startup database"],
    variableMeasured: [
      { "@type": "PropertyValue", name: "UFRN", description: "UpForge Registry Number" },
      { "@type": "PropertyValue", name: "Status", description: "Verification Status" }
    ],
    isAccessibleForFree: true,
    temporalCoverage: "2020/..",
  }
}

function buildOrganizationSchema(isOrg: boolean) {
  const base = isOrg ? "https://www.upforge.org" : "https://www.upforge.in"
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: "UpForge",
    url: base,
    logo: { "@type": "ImageObject", url: "https://www.upforge.in/logo.jpg" },
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
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${base}/#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "Who are the top startup founders in India in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "India's top startup founders in 2026 include Aadit Palicha (Zepto), Kunal Shah (CRED), and Nithin Kamath (Zerodha). UpForge profiles these founders with verified funding and valuation data.",
        },
      },
      {
        "@type": "Question",
        name: isOrg ? "What is the UFRN?" : "Which Indian startups are unicorns?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isOrg
            ? "The UFRN (UpForge Registry Number) is a unique identity assigned to verified startups in our global registry."
            : "Top Indian unicorns include Zepto, CRED, Groww, and Meesho. UpForge tracks all verified Indian unicorns.",
        },
      },
    ],
  }
}

// ---------------------------------------------------------------------------
// PAGE COMPONENT — SERVER RENDERED
// ---------------------------------------------------------------------------
export default async function HomePage() {
  const domain = await getDomain()
  const isOrg  = domain === "org"

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationSchema(isOrg)) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebsiteSchema(isOrg)) }} />
      
      {/* ── Dataset schema — ONLY on .org — High authority signal ── */}
      {isOrg && (
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildDatasetSchema()) }} />
      )}

      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCollectionPageSchema(isOrg)) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildItemListSchema(isOrg)) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(isOrg)) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(isOrg)) }} />

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

      {/* SEO CONTENT LAYER */}
      <div className="sr-only" aria-label="SEO content">
        <section>
          <h1>
            {isOrg
              ? "Global Startup Registry — Verified UFRN Database"
              : "Indian Startup Founders & Unicorn Stories — The Founder Chronicle 2026"}
          </h1>
          <p>
            {isOrg
              ? "UpForge Global Registry provides verified proof of existence for startups worldwide through the UFRN system."
              : "Explore the journey of India's unicorn founders and the stories behind their multi-billion dollar startups."}
          </p>
          <ul>
            {FOUNDERS.map((f) => (
              <li key={f.slug}>
                <a href={`/startup/${f.slug}`}>{f.name} — {f.company}</a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
