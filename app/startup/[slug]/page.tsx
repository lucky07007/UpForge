// app/startup/[slug]/page.tsx
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

  // .org is the canonical authority URL
  const canonicalUrl = `https://www.upforge.org/startup/${slug}`
  // .in is used for social / OG (higher traffic, marketing site)
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
    // Canonical points to .org — authority signal to Google
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: marketingUrl,
      images: [{ url: ogImage, width: 1200, height: 630, type: "image/png" }],
    },
    twitter: { card: "summary_large_image", images: [ogImage] },
    // Extra meta for UFRN discoverability
    other: startup.ufrn
      ? { "upforge:registry-id": startup.ufrn }
      : undefined,
  }
}

// ---------------------------------------------------------------------------
// STRUCTURED DATA BUILDERS
// ── Organization schema now includes UFRN as an official identifier
// ── Dataset schema tells Google this is structured, citable data
// ---------------------------------------------------------------------------
function buildOrganizationSchema(startup: Startup, canonicalUrl: string) {
  const sameAs = [
    startup.linkedin_url,
    startup.twitter_url,
    startup.instagram_url,
    startup.website,
  ].filter((url): url is string => typeof url === "string" && url.length > 0)

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
    // UFRN as a PropertyValue identifier — Google Knowledge Graph signal
    ...(startup.ufrn && {
      identifier: {
        "@type": "PropertyValue",
        propertyID: "UFRN",
        name: "UpForge Registry Number",
        value: startup.ufrn,
        url: canonicalUrl,
      },
    }),
  }
}

function buildDatasetSchema(startup: Startup, canonicalUrl: string) {
  // Dataset schema → Google treats this as a "Scientific Database" entry,
  // which ranks above standard blog posts in SGE / AI Overviews.
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${canonicalUrl}#dataset`,
    name: `${startup.name} — UpForge Registry Profile`,
    description:
      startup.description ??
      `Verified startup data record for ${startup.name} in the UpForge Global Startup Registry.`,
    url: canonicalUrl,
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
    ].filter(Boolean),
    license: "https://creativecommons.org/licenses/by/4.0/",
    ...(startup.ufrn && {
      identifier: startup.ufrn,
    }),
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.upforge.org" },
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

  // Canonical always points to .org
  const canonicalUrl = `https://www.upforge.org/startup/${slug}`
  const relatedStartups = startup.category
    ? await getRelatedStartups(startup.category, slug)
    : []

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF9]">
      {/* Structured Data — 4 schemas for maximum Knowledge Graph coverage */}
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
