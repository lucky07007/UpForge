// app/page.tsx  ←  SERVER COMPONENT
// CRITICAL: No "use client" here.
// All 10 founder stories render as static HTML — visible to Google on first crawl.

import type { Metadata } from "next"
import { headers } from "next/headers"
import { FounderChronicleClient } from "../components/founder-chronicle-client"
import { TopVideosSection } from "../components/top-videos"
import { ReviewsSection } from "../components/reviews"
import { GlobalRegistryPromo } from "../components/global-registry-promo"
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
    if (data?.updated_at) {
      return new Date(data.updated_at).toISOString().split("T")[0]
    }
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
        description: "The independent global registry for startups. Verified proof of existence via UFRN.",
        url: canonicalUrl,
        siteName: "UpForge Global Registry",
        locale: "en",
        type: "website",
        images: [{ url: ogImage, width: 1200, height: 630, alt: "UpForge Global Startup Registry" }],
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

  return {
    title: "Indian Startup Founders & Unicorn Stories — The Founder Chronicle 2026",
    description:
      "Explore verified stories of India's greatest startup founders and unicorn success stories — Zepto, CRED, Zerodha, Nykaa, OYO, Groww, Meesho & more.",
    keywords: [
      "Indian startup founders 2026", "India unicorn stories", "startup success stories India",
      "Aadit Palicha Zepto story", "Kunal Shah CRED profile", "Nithin Kamath Zerodha lessons",
      "Falguni Nayar Nykaa journey", "Indian unicorn list 2026",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: "Indian Startup Founders & Unicorn Stories — The Founder Chronicle 2026",
      description: "10 deep-dive profiles of India's most iconic startup founders. Verified funding data and unicorn valuations.",
      url: canonicalUrl,
      siteName: "UpForge",
      locale: "en_IN",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "UpForge Founder Chronicle 2026" }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@upforge_in",
      creator: "@upforge_in",
      title: "Indian Startup Founders & Unicorn Stories",
      description: "Verified founder profiles: Zepto, CRED, Zerodha, Nykaa, OYO & more.",
      images: [ogImage],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
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
    description: "Open, verified database of global startups with unique UFRN identifiers.",
    url: "https://www.upforge.org/registry",
    creator: { "@id": "https://www.upforge.org/#organization" },
    license: "https://creativecommons.org/licenses/by/4.0/",
    measurementTechnique: "Manual verification by UpForge editorial team",
    size: `${startupCount}+ verified startup records`,
    isAccessibleForFree: true,
    dateModified: liveDate,
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
    sameAs: ["https://www.linkedin.com/company/upforge-india"],
    description: "Independent global startup registry with verified UFRN system.",
    foundingDate: "2024",
    areaServed: isOrg ? "Worldwide" : "India",
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
      target: { "@type": "EntryPoint", urlTemplate: `${base}/registry?q={search_term_string}` },
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
      { "@type": "ListItem", position: 2, name: isOrg ? "Global Registry" : "Founder Chronicle", item: base },
    ],
  }
}

function buildFAQSchema(isOrg: boolean) {
  const base = isOrg ? "https://www.upforge.org" : "https://www.upforge.in"
  const questions = isOrg
    ? [
        { q: "What is the UFRN?", a: "The UpForge Registry Number is a unique permanent identifier for verified startups." },
        { q: "How do I verify a UFRN?", a: "Visit upforge.org/verify and enter the UFRN to check registration status." },
        { q: "Is UpForge free?", a: "Yes, completely free for browsing and submitting startups." },
      ]
    : [
        { q: "Who are India's top founders?", a: "Aadit Palicha (Zepto), Kunal Shah (CRED), Nithin Kamath (Zerodha), and more." },
        { q: "Which Indian startups are unicorns?", a: "Zepto, CRED, Groww, Meesho, Nykaa, PhysicsWallah, and Zerodha." },
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
// Layout: Founder Chronicle → Watch & Learn → Global Registry Promo → Reviews
// ---------------------------------------------------------------------------
export default async function HomePage() {
  const domain = await getDomain()
  const isOrg  = domain === "org"

  const [liveDate, startupCount] = await Promise.all([
    getLatestDate(),
    getStartupCount(),
  ])

  return (
    <>
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

      {/* Founder Chronicle Content */}
      <FounderChronicleClient
        founders={FOUNDERS}
        internalLinks={[
          { l: "Global Registry",      h: "/registry", desc: `${startupCount}+ verified startups` },
          { l: "Verify UFRN",          h: "/verify",   desc: "Check registration" },
          { l: "Submit Your Startup",  h: "/submit",   desc: "Get listed free" },
          { l: "The Forge — Blog",     h: "/blog",     desc: "Intelligence & analysis" },
          { l: "About UpForge",        h: "/about",    desc: "Our mission" },
        ]}
        footerLinks={[
          { l: "Founder Chronicle", h: "/" },
          { l: "Global Registry",   h: "/registry" },
          { l: "Verify UFRN",       h: "/verify" },
          { l: "Blog",              h: "/blog" },
          { l: "Submit Startup",    h: "/submit" },
          { l: "About",             h: "/about" },
        ]}
      />

      {/* Watch & Learn — Video Gallery */}
      <TopVideosSection />

      {/* Global Registry Promo — Heavy prominence, redirects to /registry */}
      <GlobalRegistryPromo startupCount={startupCount} isOrg={isOrg} />

      {/* Trusted by the Ecosystem — Reviews */}
      <ReviewsSection />

      {/* SEO Content Layer */}
      <div className="sr-only" aria-label="SEO content">
        <section>
          <h1>{isOrg ? "Global Startup Registry — Verified UFRN Database" : "Indian Startup Founders — The Founder Chronicle 2026"}</h1>
          <nav aria-label="Founder profiles">
            <ul>
              {FOUNDERS.map((f) => (
                <li key={f.slug}><a href={`/startup/${f.slug}`}>{f.name} — {f.role} at {f.company}</a></li>
              ))}
            </ul>
          </nav>
        </section>
      </div>
    </>
  )
}
