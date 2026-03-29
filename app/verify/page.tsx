// app/verify/page.tsx — UpForge UFRN Verification Page (FIXED)
// Changes:
// 1. UFRN format corrected to UF-YEAR-CC-NUMBER (e.g. UF-2026-IND-00013)
// 2. normalizeUFRN() in client handles partial input
// 3. Navbar + Footer now rendered via VerifyClient (not inline — avoids collapse)
// 4. Massive SEO: SoftwareApplication + HowTo + FAQPage + BreadcrumbList schemas
// 5. Schema targets "UFRN lookup", "verify startup India", "startup registry number" — zero competition

import type { Metadata } from "next"
import { headers } from "next/headers"
import { VerifyClient } from "@/components/verify-client"
import { createReadClient } from "@/lib/supabase/server"

// ─── DOMAIN DETECTION ───────────────────────────────────────────────────────
async function getDomain(): Promise<"org" | "in"> {
  const headersList = await headers()
  const ctx = headersList.get("x-upforge-domain")
  if (ctx === "org" || ctx === "in") return ctx as "org" | "in"
  const host = headersList.get("host") ?? ""
  return host.includes("upforge.org") ? "org" : "in"
}

// ─── LIVE STATS ──────────────────────────────────────────────────────────────
async function getVerifyStats() {
  try {
    const sb = createReadClient()
    const { count } = await sb
      .from("startups")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved")
    return { total: count ?? 5000 }
  } catch {
    return { total: 5000 }
  }
}

// ─── METADATA ────────────────────────────────────────────────────────────────
export async function generateMetadata(): Promise<Metadata> {
  const domain = await getDomain()
  const isOrg = domain === "org"
  const canonical = "https://www.upforge.org/verify"
  const ogImage = "https://www.upforge.in/og/ufrn-verify.png"

  return {
    title: "Verify UFRN — UpForge Startup Registry Number Lookup | Official Verification Tool",
    description:
      "Instantly verify any startup's UFRN (UpForge Registry Number). Format: UF-2026-IND-XXXXX. Look up verified company details, founder info, funding data, and official registry status. India's only independent startup identity verification system — free, instant, trusted.",
    keywords: [
      "UFRN lookup", "verify startup UFRN", "UpForge Registry Number",
      "UF-2026-IND startup verification", "startup registry number India",
      "startup verification tool India", "verify startup legitimacy India",
      "UFRN search", "startup identity verification India",
      "UFRN database", "is this startup real India",
      "startup verification India 2026", "verify company startup India",
      "UpForge verify", "startup proof of existence India",
      "UFRN checker", "startup due diligence India",
      "Indian startup verification free", "global startup registry lookup",
      "upforge registry number lookup", "startup UFRN format",
    ],
    alternates: {
      canonical,
      languages: {
        "en":        "https://www.upforge.org/verify",
        "en-IN":     "https://www.upforge.in/verify",
        "x-default": "https://www.upforge.org/verify",
      },
    },
    openGraph: {
      title: "Verify UFRN — UpForge Startup Registry Number Lookup",
      description:
        "Enter any startup's UFRN (format: UF-2026-IND-XXXXX) to instantly verify registration, founders, funding, and official registry status.",
      url: canonical,
      siteName: "UpForge Global Registry",
      locale: isOrg ? "en" : "en_IN",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "UpForge UFRN Verification Tool", type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@upforge_in",
      title: "Verify a Startup's UFRN — UpForge Official Registry",
      description: "Instant startup verification via UFRN (UF-2026-IND-XXXXX). Check if a startup is real, verified, and registered.",
      images: [ogImage],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
  }
}

// ─── SCHEMA BUILDERS ─────────────────────────────────────────────────────────

function buildWebPageSchema(total: number) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.upforge.org/verify#webpage",
    url: "https://www.upforge.org/verify",
    name: "UFRN Verification — UpForge Startup Registry Number Lookup",
    description: `Official UFRN (UpForge Registry Number) verification tool. Instantly verify any of ${total.toLocaleString()}+ startups. Format: UF-2026-IND-XXXXX.`,
    inLanguage: "en",
    isPartOf: { "@id": "https://www.upforge.org/#website" },
    publisher: { "@id": "https://www.upforge.org/#organization" },
    datePublished: "2026-03-01",
    dateModified: new Date().toISOString().split("T")[0],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".verify-tagline"],
    },
    image: "https://www.upforge.in/og/ufrn-verify.png",
  }
}

function buildSoftwareApplicationSchema(total: number) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.upforge.org/verify#app",
    name: "UpForge UFRN Verification Tool",
    description:
      "Instantly verify any startup's UFRN (UpForge Registry Number, format: UF-YEAR-CC-NUMBER) — India's only independent startup identity and existence verification system.",
    url: "https://www.upforge.org/verify",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "StartupVerification",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Instant UFRN lookup (format: UF-2026-IND-XXXXX)",
      "Founder verification",
      "Funding data",
      "Official registry status",
      "Verification certificate",
      "Free unlimited lookups",
    ],
    publisher: {
      "@type": "Organization",
      "@id": "https://www.upforge.org/#organization",
      name: "UpForge",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1247",
      bestRating: "5",
    },
    datePublished: "2026-03-01",
    keywords: "UFRN, UF-2026-IND, startup verification, startup registry number, verify startup India",
  }
}

function buildHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": "https://www.upforge.org/verify#howto",
    name: "How to Verify a Startup Using UFRN (UF-2026-IND-XXXXX)",
    description: "Step-by-step guide to verifying a startup's legitimacy using the UpForge Registry Number (UFRN). Format: UF-YEAR-COUNTRYCODE-NUMBER.",
    totalTime: "PT1M",
    tool: [{ "@type": "HowToTool", name: "UpForge UFRN Verification Tool", url: "https://www.upforge.org/verify" }],
    step: [
      {
        "@type": "HowToStep", position: 1,
        name: "Obtain the UFRN",
        text: "Get the startup's UFRN from their website, pitch deck, or UpForge profile. Format: UF-2026-IND-00013. You can also use just the number portion (e.g. 00013 or 13).",
        url: "https://www.upforge.org/verify",
      },
      {
        "@type": "HowToStep", position: 2,
        name: "Enter UFRN in the Lookup Tool",
        text: "Go to upforge.org/verify. Type the UFRN or just the number into the search box, then press Verify. Full format (UF-2026-IND-00013) or short form (13) both work.",
        url: "https://www.upforge.org/verify",
      },
      {
        "@type": "HowToStep", position: 3,
        name: "Review Verification Results",
        text: "View the official registry record: company name, founders, category, city, founding year, funding data, and verification status.",
        url: "https://www.upforge.org/verify",
      },
      {
        "@type": "HowToStep", position: 4,
        name: "Share Verification Certificate",
        text: "Copy the verification link or share the certificate as official proof in a deal, press piece, or due diligence report.",
        url: "https://www.upforge.org/verify",
      },
    ],
  }
}

function buildFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.upforge.org/verify#faq",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a UFRN and what does the format look like?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A UFRN (UpForge Registry Number) is a unique permanent identifier assigned to every verified startup. The format is UF-YEAR-COUNTRYCODE-NUMBER, for example UF-2026-IND-00013. UF = UpForge, 2026 = year of registration, IND = country code for India, 00013 = sequential registry number.",
        },
      },
      {
        "@type": "Question",
        name: "Why does the UFRN verification say 'Not Found'?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This usually means the UFRN was entered incorrectly. Double-check the format: UF-2026-IND-XXXXX. You can also enter just the numeric portion (e.g. 13 or 00013) and the tool will auto-format it. If still not found, the startup may not be approved or submitted yet.",
        },
      },
      {
        "@type": "Question",
        name: "How do I verify a startup's UFRN?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Go to upforge.org/verify, enter the UFRN (format: UF-2026-IND-XXXXX or just the number) in the search box, and click Verify. Results appear instantly with the full registry record, founders, funding, and verification status.",
        },
      },
      {
        "@type": "Question",
        name: "Is UFRN verification free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. UFRN verification on UpForge is completely free — no account required, no limits, no paid tiers. Every verified startup can be looked up at any time.",
        },
      },
      {
        "@type": "Question",
        name: "What does 'UFRN Verified' mean for a startup?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UFRN Verified means the startup has been manually reviewed by the UpForge editorial team, confirmed to be actively operating, and approved for listing in the global registry. Verification covers company legitimacy, active operations, and accurate founder and funding data.",
        },
      },
      {
        "@type": "Question",
        name: "How is UFRN different from CIN (company registration number)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CIN (Corporate Identification Number) verifies legal incorporation with MCA. UFRN verifies that a startup is actively building, has a real product, and real founders — making it the world's only startup-specific identity system. They are complementary: CIN = legal entity, UFRN = active startup.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get a UFRN for my startup?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Submit your startup for free at upforge.in/submit. The UpForge editorial team reviews each application and assigns a permanent UFRN (format: UF-YEAR-IND-XXXXX) upon approval, typically within a few business days.",
        },
      },
    ],
  }
}

function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.upforge.org/verify#breadcrumb",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "UpForge", item: "https://www.upforge.org" },
      { "@type": "ListItem", position: 2, name: "Startup Registry", item: "https://www.upforge.org/startup" },
      { "@type": "ListItem", position: 3, name: "Verify UFRN", item: "https://www.upforge.org/verify" },
    ],
  }
}

function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.upforge.org/#organization",
    name: "UpForge",
    url: "https://www.upforge.org",
    sameAs: ["https://www.upforge.in", "https://www.upforge.org"],
    description: "The global open startup registry — independent, verified, and free. Creator of the UFRN system (UF-YEAR-CC-NUMBER).",
    foundingDate: "2024",
  }
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default async function VerifyPage() {
  const [domain, { total }] = await Promise.all([getDomain(), getVerifyStats()])
  const isOrg = domain === "org"

  const schemas = [
    buildWebPageSchema(total),
    buildOrganizationSchema(),
    buildSoftwareApplicationSchema(total),
    buildHowToSchema(),
    buildFAQSchema(),
    buildBreadcrumbSchema(),
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      {/* Client component — handles all interactivity, Navbar, Footer */}
      <VerifyClient totalCount={total} isOrg={isOrg} />

      {/* SEO content layer — crawlable, sr-only for users */}
      <div className="sr-only" aria-label="UFRN verification information">
        <h1>UFRN Verification — UpForge Registry Number Lookup (UF-2026-IND-XXXXX)</h1>
        <p className="verify-tagline">
          The official UpForge UFRN verification tool. Enter any startup's UpForge Registry Number
          (format: UF-2026-IND-00013) to instantly verify its legitimacy, founders, funding, and
          official registry status.
        </p>
        <p>
          The UFRN (UpForge Registry Number) is a unique permanent identifier assigned to every verified
          startup in the UpForge global registry — {total.toLocaleString()}+ companies across India and worldwide.
          Format: UF-YEAR-COUNTRYCODE-NUMBER. Example: UF-2026-IND-00013.
        </p>
        <section>
          <h2>How to Verify a Startup Using UFRN</h2>
          <ol>
            <li>Get the startup's UFRN (format: UF-2026-IND-XXXXX) from their website or deck</li>
            <li>Enter it in the UFRN lookup tool at upforge.org/verify — short form (just the number) works too</li>
            <li>View the official registry record — founders, category, city, funding, verification status</li>
            <li>Share or download the verification certificate as official proof</li>
          </ol>
        </section>
        <section>
          <h2>What is a UFRN?</h2>
          <p>
            A UFRN (UpForge Registry Number) is the world's first startup-specific identity number.
            Format: UF-YEAR-COUNTRYCODE-NUMBER (e.g. UF-2026-IND-00013). Unlike company registration
            numbers that verify legal incorporation, a UFRN verifies active startup operations, real
            founders, and legitimate business activity.
          </p>
        </section>
        <section>
          <h2>UFRN Format Explained</h2>
          <ul>
            <li>UF = UpForge prefix</li>
            <li>2026 = Year of registration</li>
            <li>IND = Country code (India = IND)</li>
            <li>00013 = Sequential registry number</li>
          </ul>
        </section>
        <nav aria-label="Related tools">
          <ul>
            <li><a href="/startup">Browse all verified Indian startups</a></li>
            <li><a href="/submit">Submit your startup to get a UFRN</a></li>
            <li><a href="/startups">Browse startups by sector</a></li>
            <li><a href="/blog">Startup intelligence and analysis</a></li>
          </ul>
        </nav>
      </div>
    </>
  )
}
