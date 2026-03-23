// app/startup/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// UPGRADE from previous version:
//   1. Organisation schema now has THREE identifier PropertyValues:
//      - UFRN (primary)
//      - serialNumber (Google Knowledge Graph signal)
//      - shortCode (last segment — for abbreviated lookups)
//   2. DefinedTerm schema added — tells Google UFRN is a controlled vocabulary ID
//      (same schema type used by ISBN, ISSN, DOI registries)
//   3. Dataset schema now includes `isPartOf` DataCatalog — makes Google treat
//      this as part of a "Scientific Database" rather than a blog post
//   4. sameAs on Dataset now includes the /ufrn/[id] canonical lookup URL
// ─────────────────────────────────────────────────────────────────────────────

import { createReadClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { Startup } from "@/types/startup"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StartupDetail } from "@/components/startup-detail"

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
interface PageProps {
  params: Promise<{ slug: string }>
}

// ---------------------------------------------------------------------------
// DATA FETCHER
// ---------------------------------------------------------------------------
async function getApprovedStartup(slug: string): Promise<Startup | null> {
  const supabase = createReadClient()
  const { data, error } = await supabase
    .from("startups")
    .select(`
      id,
      name,
      slug,
      description,
      website,
      logo_url,
      founders,
      founded_year,
      category,
      city,
      status,
      is_featured,
      is_sponsored,
      linkedin_url,
      twitter_url,
      instagram_url,
      ufrn,
      country_code,
      country_name
    `)
    .eq("slug", slug)
    .eq("status", "approved")
    .single()

  if (error || !data) return null
  return data as Startup
}

// ---------------------------------------------------------------------------
// RELATED STARTUPS FETCHER
// ---------------------------------------------------------------------------
async function getRelatedStartups(
  category: string,
  currentSlug: string
): Promise<Pick<Startup, "name" | "slug" | "description" | "logo_url" | "category">[]> {
  const supabase = createReadClient()
  const { data } = await supabase
    .from("startups")
    .select("name, slug, description, logo_url, category")
    .eq("category", category)
    .eq("status", "approved")
    .neq("slug", currentSlug)
    .limit(4)

  return data ?? []
}

// ---------------------------------------------------------------------------
// STATIC PARAMS
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  const supabase = createReadClient()
  const { data } = await supabase
    .from("startups")
    .select("slug")
    .eq("status", "approved")

  return (data ?? []).map((row) => ({ slug: row.slug }))
}

export const revalidate = 86400

// ---------------------------------------------------------------------------
// METADATA
// ── Canonical → upforge.org  (tells Google .org is the master record)
// ── OG / Twitter  → upforge.in  (social sharing stays on the marketing site)
// ---------------------------------------------------------------------------
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const startup = await getApprovedStartup(slug)

  if (!startup) {
    return {
      title: "Startup Not Found | UpForge",
      description: "The requested startup profile could not be found.",
      robots: { index: false, follow: false },
    }
  }

  const canonicalUrl = `https://www.upforge.org/startup/${slug}`
  const marketingUrl = `https://www.upforge.in/startup/${slug}`

  const ufrnSuffix = startup.ufrn ? ` · ${startup.ufrn}` : ""
  const title = `${startup.name} — ${startup.category ?? "Indian Startup"}${ufrnSuffix} | UpForge`
  const description =
    startup.description ??
    `Verified profile of ${startup.name} on UpForge Global Registry.${startup.ufrn ? ` Registry ID: ${startup.ufrn}.` : ""}`
  const ogImage = `https://www.upforge.in/og/startup-default.png`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      // Also include the UFRN lookup URL as an alternate — helps Google
      // understand that /ufrn/[id] and /startup/[slug] are the same entity
      ...(startup.ufrn && {
        other: {
          "ufrn-lookup": `https://www.upforge.org/ufrn/${startup.ufrn}`,
        },
      }),
    },
    openGraph: {
      title,
      description,
      url: marketingUrl,
      images: [{ url: ogImage, width: 1200, height: 630, type: "image/png" }],
    },
    twitter: { card: "summary_large_image", images: [ogImage] },
    other: {
      ...(startup.ufrn && {
        "upforge:registry-id": startup.ufrn,
        "upforge:ufrn-url": `https://www.upforge.org/ufrn/${startup.ufrn}`,
      }),
    },
  }
}

// ---------------------------------------------------------------------------
// STRUCTURED DATA BUILDERS
// ---------------------------------------------------------------------------

/**
 * DefinedTerm schema for the UFRN itself.
 * Tells Google: "UFRN is a controlled vocabulary term, like ISBN or ISSN."
 * This is a NEW addition — not in the previous version.
 */
function buildDefinedTermSchema(startup: Startup, canonicalUrl: string) {
  if (!startup.ufrn) return null
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `https://www.upforge.org/ufrn/${startup.ufrn}#term`,
    name: startup.ufrn,
    termCode: startup.ufrn,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": "https://www.upforge.org/registry#ufrn-system",
      name: "UpForge Registry Number System",
      url: "https://www.upforge.org/registry",
      description:
        "UFRN (UpForge Registry Number) is a globally unique identifier assigned to every verified startup in the UpForge Global Registry.",
    },
    url: `https://www.upforge.org/ufrn/${startup.ufrn}`,
    description: `${startup.ufrn} is the UpForge Registry Number for ${startup.name}.`,
  }
}

/**
 * Organisation schema — upgraded from PropertyValue to three-identifier pattern.
 * Google Knowledge Graph uses serialNumber and shortCode as supplementary signals.
 */
function buildOrganizationSchema(startup: Startup, canonicalUrl: string) {
  const sameAs = [
    startup.linkedin_url,
    startup.twitter_url,
    startup.instagram_url,
    startup.website,
    // Include the UFRN lookup page as a sameAs — links the two URLs as one entity
    startup.ufrn ? `https://www.upforge.org/ufrn/${startup.ufrn}` : null,
  ].filter((url): url is string => typeof url === "string" && url.length > 0)

  const identifiers = startup.ufrn
    ? [
        {
          "@type": "PropertyValue",
          propertyID: "UFRN",
          name: "UpForge Registry Number",
          value: startup.ufrn,
          url: `https://www.upforge.org/ufrn/${startup.ufrn}`,
        },
        {
          // serialNumber → Google treats this similarly to ISBN/ISSN
          "@type": "PropertyValue",
          propertyID: "serialNumber",
          name: "Serial Number",
          value: startup.ufrn,
        },
        {
          // shortCode → last segment of UFRN e.g. "00001"
          // Enables partial UFRN searches to still resolve
          "@type": "PropertyValue",
          propertyID: "shortCode",
          name: "Short Registry Code",
          value: startup.ufrn.split("-").pop(),
          url: canonicalUrl,
        },
      ]
    : undefined

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${canonicalUrl}#organization`,
    name: startup.name,
    url: startup.website ?? canonicalUrl,
    logo: startup.logo_url,
    foundingDate: startup.founded_year?.toString(),
    industry: startup.category,
    sameAs,
    ...(identifiers && { identifier: identifiers }),
  }
}

/**
 * Dataset schema — upgraded with isPartOf DataCatalog.
 * Google Dataset Search ranks DataCatalog entries higher than standalone datasets.
 */
function buildDatasetSchema(startup: Startup, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${canonicalUrl}#dataset`,
    name: `${startup.name} — UpForge Registry Profile`,
    description:
      startup.description ??
      `Verified startup data record for ${startup.name} in the UpForge Global Startup Registry.`,
    url: canonicalUrl,
    // sameAs includes the UFRN lookup URL — double-parks Google on both URLs
    ...(startup.ufrn && {
      sameAs: `https://www.upforge.org/ufrn/${startup.ufrn}`,
    }),
    creator: {
      "@type": "Organization",
      name: "UpForge",
      url: "https://www.upforge.org",
    },
    keywords: [
      startup.name,
      startup.category ?? "",
      startup.city ?? "",
      "Indian startup",
      "startup registry",
      startup.ufrn ?? "",
      "UFRN",
    ].filter(Boolean),
    license: "https://creativecommons.org/licenses/by/4.0/",
    ...(startup.ufrn && { identifier: startup.ufrn }),
    // isPartOf makes Google treat this as a Scientific Database entry
    isPartOf: {
      "@type": "DataCatalog",
      "@id": "https://www.upforge.org/registry#catalog",
      name: "UpForge Global Startup Registry",
      url: "https://www.upforge.org/registry",
      description:
        "The UpForge Global Startup Registry is an independent, CC-BY-4.0 licensed database of verified startup profiles, each assigned a unique UFRN identifier.",
    },
  }
}

function buildWebPageSchema(startup: Startup, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: `${startup.name} Profile | UpForge`,
    dateModified: new Date().toISOString(),
    mainEntity: { "@id": `${canonicalUrl}#organization` },
  }
}

function buildBreadcrumbSchema(startup: Startup, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",     item: "https://www.upforge.org" },
      { "@type": "ListItem", position: 2, name: "Registry", item: "https://www.upforge.org/registry" },
      { "@type": "ListItem", position: 3, name: startup.name, item: canonicalUrl },
    ],
  }
}

// ---------------------------------------------------------------------------
// PAGE COMPONENT
// ---------------------------------------------------------------------------
export default async function StartupPage({ params }: PageProps) {
  const { slug } = await params
  const startup = await getApprovedStartup(slug)
  if (!startup) notFound()

  const canonicalUrl = `https://www.upforge.org/startup/${slug}`
  const relatedStartups = startup.category
    ? await getRelatedStartups(startup.category, slug)
    : []

  const definedTermSchema = buildDefinedTermSchema(startup, canonicalUrl)

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF9]">
      {/* Structured Data — up to 5 schemas for maximum Knowledge Graph coverage */}

      {/* NEW: DefinedTerm — only injected if startup has a UFRN */}
      {definedTermSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganizationSchema(startup, canonicalUrl)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildDatasetSchema(startup, canonicalUrl)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildWebPageSchema(startup, canonicalUrl)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema(startup, canonicalUrl)),
        }}
      />

      <Navbar />
      <main className="flex-1">
        {startup.is_sponsored && (
          <div className="bg-black text-white text-center py-3 text-xs uppercase tracking-[0.3em]">
            Sponsored Startup · Featured by UpForge
          </div>
        )}
        <StartupDetail
          startup={startup}
          relatedStartups={relatedStartups}
          profileUrl={canonicalUrl}
        />
      </main>
      <Footer />
    </div>
  )
}
