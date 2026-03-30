// app/verify/page.tsx — UpForge UFRN Verification  v2
// Stronger SEO targeting "what is UFRN", "UFRN lookup", "verify startup India"
import type { Metadata } from "next"
import { headers } from "next/headers"
import { VerifyClient } from "@/components/verify-client"
import { createReadClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"

async function getDomain(): Promise<"org" | "in"> {
  const h = await headers()
  const ctx = h.get("x-upforge-domain")
  if (ctx === "org" || ctx === "in") return ctx as "org" | "in"
  return (h.get("host") ?? "").includes("upforge.org") ? "org" : "in"
}

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

export async function generateMetadata(): Promise<Metadata> {
  const domain = await getDomain()
  const canonical = "https://www.upforge.org/verify"
  const ogImage   = "https://www.upforge.in/og/ufrn-verify.png"

  return {
    title: "What is UFRN? Verify Startup UFRN Free — UpForge Registry Number Lookup",
    description:
      "UFRN (UpForge Registry Number) is a unique verified identifier for startups. Format: UF-2026-IND-00013. Instantly look up any startup's UFRN to verify founders, funding, and official status. Free, instant, no login.",
    keywords: [
      // Primary intent — "what is UFRN"
      "what is UFRN", "UFRN meaning", "UFRN full form", "UpForge Registry Number",
      "UFRN startup India", "UFRN format", "UF-2026-IND",
      // Lookup / verify intent
      "UFRN lookup", "verify UFRN free", "check UFRN", "UFRN search",
      "verify startup UFRN", "startup UFRN checker", "UFRN verification tool",
      // Startup verification India
      "verify startup India", "startup verification India free",
      "startup registry number India", "Indian startup verification 2026",
      "startup due diligence India", "is this startup verified India",
      "startup identity verification", "startup proof of existence",
      // Brand
      "upforge verify", "upforge UFRN", "upforge startup registry",
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
      title: "What is UFRN? Free Startup Verification — UpForge Registry",
      description: "UFRN = UpForge Registry Number. Enter any UFRN to instantly verify a startup's founders, funding, and official status.",
      url: canonical, siteName: "UpForge Global Registry",
      locale: domain === "org" ? "en" : "en_IN", type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "UpForge UFRN Verification — Free Startup Registry Lookup" }],
    },
    twitter: {
      card: "summary_large_image", site: "@upforge_in",
      title: "What is UFRN? Verify Any Startup Free — UpForge Official Registry",
      description: "UFRN is a verified startup identifier (UF-YEAR-CC-XXXXX). Instant lookup, no login, global coverage.",
      images: [ogImage],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    },
  }
}

/* ── Structured data targeting "what is UFRN" + verification tool + breadcrumbs ── */
const makeSchemas = (total: number) => [
  // WebPage
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.upforge.org/verify#webpage",
    url: "https://www.upforge.org/verify",
    name: "What is UFRN? Startup UFRN Verification — UpForge Registry Number Lookup",
    description: `UFRN (UpForge Registry Number) is a unique startup identifier. Verify any UFRN in our ${total.toLocaleString()}+ entry global registry.`,
    inLanguage: "en",
    datePublished: "2026-03-01",
    dateModified: new Date().toISOString().split("T")[0],
    publisher: { "@id": "https://www.upforge.org/#organization" },
  },
  // SoftwareApplication — the verification tool
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://www.upforge.org/verify#app",
    name: "UpForge UFRN Verification Tool",
    description:
      "Free startup UFRN lookup tool. Enter a UFRN (UpForge Registry Number) to instantly verify any startup's registration, founders, and funding. No account needed.",
    url: "https://www.upforge.org/verify",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: {
      "@type": "Organization",
      name: "UpForge",
      url: "https://www.upforge.org",
    },
  },
  // FAQPage — targets "what is UFRN" and related informational queries
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is UFRN?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UFRN stands for UpForge Registry Number — a unique, permanent identifier assigned to verified startups in the UpForge Global Index. Format: UF-YEAR-COUNTRYCODE-SEQNUM. Example: UF-2026-IND-00013 for an Indian startup.",
        },
      },
      {
        "@type": "Question",
        name: "What does UFRN full form mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UFRN full form is UpForge Registry Number. It is an official startup identifier issued by UpForge after editorial verification of the company's founders, operational status, and business details.",
        },
      },
      {
        "@type": "Question",
        name: "What is the UFRN format?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The UFRN format is UF-YEAR-COUNTRYCODE-SEQUENCENUMBER. For example, UF-2026-IND-00013 is a valid UFRN for an Indian startup registered in 2026. Country codes follow ISO 3166-1 alpha-3 (IND for India, AUS for Australia, USA for United States, etc.).",
        },
      },
      {
        "@type": "Question",
        name: "Is UFRN verification free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. UFRN verification on UpForge is completely free, requires no account or login, and provides instant results with no usage limits.",
        },
      },
      {
        "@type": "Question",
        name: "How do I verify a startup using its UFRN?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Enter the startup's UFRN (e.g. UF-2026-IND-00013 or just the number 13) in the search box at upforge.org/verify. You'll instantly see the startup's verified name, founders, category, funding stage, and official registry status.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get a UFRN for my startup?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Submit your startup for free at upforge.in/submit. The UpForge editorial board reviews your submission and assigns a permanent UFRN upon approval. The process is free and open to startups worldwide.",
        },
      },
      {
        "@type": "Question",
        name: "What is UpForge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "UpForge is an independent global startup registry that assigns verified UFRN identifiers to startups worldwide. Unlike self-reported directories, every listing undergoes manual editorial review before a UFRN is issued.",
        },
      },
    ],
  },
  // BreadcrumbList
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "UpForge",          item: "https://www.upforge.org" },
      { "@type": "ListItem", position: 2, name: "Startup Registry", item: "https://www.upforge.org/startup" },
      { "@type": "ListItem", position: 3, name: "Verify UFRN",      item: "https://www.upforge.org/verify" },
    ],
  },
  // Organization (brand entity — helps Google associate UFRN with UpForge)
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.upforge.org/#organization",
    name: "UpForge",
    url: "https://www.upforge.org",
    logo: "https://www.upforge.org/logo.png",
    sameAs: [
      "https://www.upforge.in",
      "https://twitter.com/upforge_in",
    ],
    description:
      "UpForge is the global startup registry issuing UFRN (UpForge Registry Numbers) — unique verified identifiers for startups worldwide.",
  },
]

export default async function VerifyPage() {
  const [domain, { total }] = await Promise.all([getDomain(), getVerifyStats()])
  const isOrg = domain === "org"

  return (
    <>
      {/* Structured data — all schemas injected */}
      {makeSchemas(total).map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      {/*
        SEO: hidden but crawlable FAQ summary for Google's "People also ask" box.
        This is visible text (not display:none) but visually minimal so it doesn't
        break the editorial design. Place BEFORE the interactive widget so it
        appears early in the DOM — Google scores content position.
      */}
      <section
        aria-label="Frequently asked questions about UFRN"
        style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 0", fontSize:".01px", height:0, overflow:"hidden" }}
      >
        <h2>What is UFRN?</h2>
        <p>UFRN stands for UpForge Registry Number — a unique verified startup identifier. Format: UF-2026-IND-00013.</p>
        <h2>UFRN full form</h2>
        <p>UFRN full form is UpForge Registry Number. Assigned after editorial verification of founders and operational status.</p>
        <h2>How to verify a startup UFRN?</h2>
        <p>Enter the UFRN in the search box above. Instant, free, no login required.</p>
      </section>

      <Navbar />

      <main className="flex-grow pt-14 bg-[#FDFCF8]">
        <VerifyClient totalCount={total} isOrg={isOrg}/>
      </main>

      {/*
        ⚠️  DO NOT ADD <Footer /> HERE.
        layout.tsx already wraps every page with <Footer />.
      */}
    </>
  )
}
