import type { Metadata } from "next"
import { notFound } from "next/navigation"

import type { Startup } from "@/types/startup"
import { formatFounders } from "@/types/startup"
import { StartupDetail } from "@/components/startup-detail"
import { StartupProfileJsonLd } from "@/components/json-ld"
import {
  fetchAllStartups,
  findRelatedStartups,
} from "@/lib/google-sheets"
import { generateStartupKeywords } from "@/lib/seo-keywords"

const BASE_URL = "https://upforge.org"
const DEFAULT_OG = `${BASE_URL}/og/startup-default.png`

interface PageProps {
  params: Promise<{ slug: string }>
}

/* -------------------------------------------------------------------------- */
/* Startup lookup                                                             */
/* -------------------------------------------------------------------------- */

/**
 * IMPORTANT:
 *
 * The Google Sheet is already vetted by UpForge before it reaches this page.
 *
 * This page does NOT:
 * - re-verify startups
 * - recalculate trust
 * - call external verification services
 * - fabricate missing startup records
 * - create fake "Global / India" data
 *
 * It simply consumes the canonical Startup records produced by the
 * existing Google Sheets / ETL data layer.
 */
async function getStartupBySlug(
  requestedSlug: string
): Promise<Startup | null> {
  const startups = await fetchAllStartups()

  const decodeSlug = (() => {
    try {
      return decodeURIComponent(requestedSlug)
    } catch {
      return requestedSlug
    }
  })()

  const requested = decodeSlug
    .trim()
    .toLowerCase()

  if (!requested) {
    return null
  }

  /* ---------------------------------------------------------------------- */
  /* 1. Exact slug                                                          */
  /* ---------------------------------------------------------------------- */

  const exact = startups.find(
    (startup) =>
      startup.slug?.trim().toLowerCase() === requested
  )

  if (exact) {
    return exact
  }

  /* ---------------------------------------------------------------------- */
  /* 2. Normalized slug                                                     */
  /* ---------------------------------------------------------------------- */

  const normalizeSlug = (value: string): string =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")

  const normalizedRequested =
    normalizeSlug(requested)

  const normalizedSlugMatch =
    startups.find(
      (startup) =>
        normalizeSlug(startup.slug || "") ===
        normalizedRequested
    )

  if (normalizedSlugMatch) {
    return normalizedSlugMatch
  }

  /* ---------------------------------------------------------------------- */
  /* 3. Startup name fallback                                               */
  /* ---------------------------------------------------------------------- */

  const nameMatch = startups.find(
    (startup) =>
      normalizeSlug(startup.name || "") ===
      normalizedRequested
  )

  if (nameMatch) {
    return nameMatch
  }

  return null
}

/* -------------------------------------------------------------------------- */
/* Static params                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Generate profile routes from the exact same canonical dataset used by
 * the Global Registry.
 *
 * The ETL runs first during npm run build, downloads the Google Sheet,
 * and generates public/data/startups.json.
 */
export async function generateStaticParams() {
  const startups = await fetchAllStartups()

  return startups
    .filter(
      (startup) =>
        startup.status === "approved" &&
        !!startup.slug
    )
    .map((startup) => ({
      slug: startup.slug,
    }))
}

/**
 * Keep the generated profile data reasonably fresh when the deployment
 * platform supports ISR/revalidation.
 */
export const revalidate = 3600

/* -------------------------------------------------------------------------- */
/* SEO helpers                                                                */
/* -------------------------------------------------------------------------- */

function buildTitle(
  startup: Startup
): string {
  let title = startup.name

  if (startup.category) {
    title += ` — ${startup.category}`
  }

  if (startup.city) {
    title += `, ${startup.city}`
  } else if (startup.country_name) {
    title += `, ${startup.country_name}`
  }

  if (startup.ufrn) {
    title += ` · ${startup.ufrn}`
  }

  return `${title} | UpForge Registry`
}

function buildDescription(
  startup: Startup
): string {
  /*
   * Prefer the actual Google Sheet description.
   *
   * ETL already maps the Sheet description into `description`,
   * `description_short`, and `description_long`.
   */
  const description =
    startup.description_short?.trim() ||
    startup.description?.trim() ||
    startup.description_long?.trim()

  if (description) {
    if (description.length <= 200) {
      return description
    }

    return `${description
      .slice(0, 197)
      .trimEnd()}...`
  }

  /*
   * This is ONLY an SEO fallback for a real startup record.
   * It does NOT create a startup record or fake registry data.
   */
  const location = [
    startup.city,
    startup.country_name,
  ]
    .filter(Boolean)
    .join(", ")

  const sector =
    startup.category || "technology"

  let text =
    `${startup.name} is a verified startup in the ${sector} sector`

  if (location) {
    text += ` based in ${location}`
  }

  text +=
    ". Listed on the UpForge Global Startup Registry."

  const founders =
    formatFounders(startup.founders)

  if (founders) {
    text += ` Founded by ${founders}.`
  }

  return text
}

/* -------------------------------------------------------------------------- */
/* Metadata                                                                   */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  const startup =
    await getStartupBySlug(slug)

  if (!startup) {
    return {
      title:
        "Startup Not Found | UpForge Registry",

      description:
        "The requested startup could not be found in the UpForge Global Startup Registry.",

      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const canonicalSlug =
    startup.slug || slug

  const canonicalUrl =
    `${BASE_URL}/startup/${canonicalSlug}`

  const title =
    buildTitle(startup)

  const description =
    buildDescription(startup)

  const keywords =
    generateStartupKeywords({
      name: startup.name,
      category: startup.category,
      city: startup.city,
      country: startup.country_name,
      founders:
        formatFounders(startup.founders),
      year: startup.founded_year,
    })

  /*
   * Use the startup's real logo for OG when available.
   * Otherwise use the existing UpForge default.
   */
  const ogImage =
    startup.logo_url &&
    /^https?:\/\//i.test(
      startup.logo_url
    )
      ? startup.logo_url
      : DEFAULT_OG

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName:
        "UpForge Global Registry",
      type: "profile",

      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt:
            `${startup.name} — UpForge Registry`,
        },
      ],
    },

    other: startup.ufrn
      ? {
          "upforge:registry-id":
            startup.ufrn,

          "upforge:ufrn-url":
            `${BASE_URL}/verify/${startup.ufrn}`,
        }
      : undefined,
  }
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default async function StartupPage({
  params,
}: PageProps) {
  const { slug } = await params

  const startup =
    await getStartupBySlug(slug)

  /*
   * IMPORTANT:
   *
   * Never create a fake record here.
   *
   * If a startup doesn't exist in the canonical registry dataset,
   * show the real Next.js 404 instead of inventing:
   *
   * Global
   * India
   * fake description
   * fake UFRN
   * fake verification data
   */
  if (!startup) {
    notFound()
  }

  const canonicalSlug =
    startup.slug || slug

  const canonicalUrl =
    `${BASE_URL}/startup/${canonicalSlug}`

  /*
   * Related startups come from the same canonical dataset.
   */
  const relatedStartups =
    startup.category
      ? await findRelatedStartups(
          startup.category,
          canonicalSlug,
          4
        )
      : []

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Structured data uses the REAL startup record */}
      <StartupProfileJsonLd
        startup={startup}
      />

      <main className="flex-1 w-full">
        <StartupDetail
          startup={startup}
          relatedStartups={
            relatedStartups
          }
          profileUrl={
            canonicalUrl
          }
        />
      </main>

      <footer className="border-t border-border/80 bg-muted/20 py-6 px-4 text-center text-xs text-muted-foreground font-serif">
        <p className="line-relaxed">
          Listed on the{" "}
          <a
            href={`${BASE_URL}/registry`}
            className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
          >
            UpForge Global Startup Registry
          </a>{" "}
          · Verifiable Machine-Readable Ledger ·{" "}
          <a
            href={`${BASE_URL}/submit`}
            className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
          >
            Submit Startup →
          </a>
        </p>

        {startup.ufrn && (
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">
            UFRN: {startup.ufrn}
          </p>
        )}
      </footer>
    </div>
  )
}
