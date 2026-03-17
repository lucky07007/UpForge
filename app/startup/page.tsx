// app/startup/page.tsx  ←  SERVER COMPONENT
// NOTE: This file serves /startup (current route).
// When you create /startups, duplicate this file there and update
// all canonical URLs, JSON-LD, and breadcrumb references below.
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import StartupRegistry from "@/components/StartupRegistry"

// ---------------------------------------------------------------------------
// PAGINATION CONSTANTS
// Page 1: 3 featured cards + 15 grid = 18 total
// Other pages: 18 per page (consistent)
// ---------------------------------------------------------------------------
const PAGE_SIZE = 18

// ---------------------------------------------------------------------------
// DATA FETCHER
// Single function used by both generateMetadata and the page.
// Filters by status = approved on every query.
// ---------------------------------------------------------------------------
interface RegistryData {
  startups: StartupRow[]
  totalCount: number
  uniqueYears: number[]
}

interface StartupRow {
  id: string
  name: string
  slug: string
  description?: string
  logo_url?: string
  website?: string
  founders?: string
  founded_year?: number
  category?: string
  city?: string
  is_featured?: boolean
  status: string
}

interface QueryParams {
  searchQuery: string
  yearFilter: string
  sortBy: string
  currentPage: number
}

async function getRegistryData(qp: QueryParams): Promise<RegistryData> {
  const supabase = await createClient()
  const { searchQuery, yearFilter, sortBy, currentPage } = qp

  const from = (currentPage - 1) * PAGE_SIZE
  const to   = from + PAGE_SIZE - 1

  // Main paginated query — ALWAYS filter by approved status
  let query = supabase
    .from("startups")
    .select(
      "id, name, slug, description, logo_url, website, founders, founded_year, category, city, is_featured, status",
      { count: "exact" }
    )
    .eq("status", "approved")

  if (searchQuery) {
    query = query.or(
      `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,founders.ilike.%${searchQuery}%`
    )
  }

  if (yearFilter) {
    query = query.eq("founded_year", Number(yearFilter))
  }

  const orderCol =
    sortBy === "year"   ? "founded_year" :
    sortBy === "newest" ? "created_at"   :
    "name"
  const orderAsc = sortBy !== "newest"

  const { data: startups, count, error } = await query
    .order(orderCol, { ascending: orderAsc })
    .range(from, to)

  if (error) console.error("[StartupRegistry] Supabase error:", error.message)

  // Year filter options — approved startups only, 2010 onwards
  const { data: yearRows } = await supabase
    .from("startups")
    .select("founded_year")
    .eq("status", "approved")
    .not("founded_year", "is", null)
    .gte("founded_year", 2010)
    .order("founded_year", { ascending: false })

  const uniqueYears: number[] = [
    ...new Set(
      (yearRows ?? [])
        .map((r: { founded_year: number | null }) => r.founded_year)
        .filter((y): y is number => y !== null)
    ),
  ]

  return {
    startups: (startups ?? []) as StartupRow[],
    totalCount: count ?? 0,
    uniqueYears,
  }
}

// ---------------------------------------------------------------------------
// METADATA
// Reuses getRegistryData — no second Supabase round trip
// ---------------------------------------------------------------------------
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams
  const { totalCount } = await getRegistryData({
    searchQuery: "",
    yearFilter:  "",
    sortBy:      "name",
    currentPage: 1,
  })

  const n = totalCount > 0 ? totalCount.toLocaleString() : "1,000+"

  // Paginated/filtered pages should not be indexed
  const isFiltered = !!(params?.q || params?.year || params?.sort)
  const page       = Number(params?.page ?? 1)
  const isIndexable = !isFiltered && page <= 1

  return {
    title: `Indian Startup Registry 2026 — ${n}+ Verified Startups | UpForge`,
    description: `Browse ${n}+ verified Indian startups across AI, SaaS, FinTech, HealthTech and 30+ sectors. India's most trusted free startup database, updated daily.`,
    alternates: {
      // This is the canonical for the current /startup route.
      // Update to /startups when that route goes live.
      canonical: "https://www.upforge.in/startup",
    },
    openGraph: {
      title: `Indian Startup Registry — ${n}+ Verified | UpForge`,
      description:
        "Browse India's most comprehensive startup database. Free, verified, updated daily.",
      url: "https://www.upforge.in/startup",
      siteName: "UpForge",
      images: [
        {
          url: "https://www.upforge.in/og/registry.png",
          width: 1200,
          height: 630,
          alt: "UpForge Indian Startup Registry 2026",
          type: "image/png",
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    robots: {
      index: isIndexable,
      follow: true,
      googleBot: {
        index: isIndexable,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
  }
}

// Revalidate every 5 minutes — balances freshness with performance
// revalidate = 0 disables ALL caching and destroys TTFB at scale
export const revalidate = 300

// ---------------------------------------------------------------------------
// PAGE PROPS
// ---------------------------------------------------------------------------
interface PageProps {
  searchParams?: Promise<{
    page?: string
    q?: string
    year?: string
    sort?: string
  }>
}

// ---------------------------------------------------------------------------
// STRUCTURED DATA
// Split into two scripts — cleaner Google parsing
// ---------------------------------------------------------------------------
function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.upforge.in/startup#breadcrumb",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.upforge.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Startup Registry",
        item: "https://www.upforge.in/startup",
      },
    ],
  }
}

function buildCollectionPageSchema(totalCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.upforge.in/startup#collectionpage",
    name: "Indian Startup Registry 2026",
    description: `India's independent registry of ${totalCount.toLocaleString()}+ verified startups across 30+ sectors.`,
    url: "https://www.upforge.in/startup",
    inLanguage: "en-IN",
    isPartOf: {
      "@id": "https://www.upforge.in/#website",
    },
    breadcrumb: {
      "@id": "https://www.upforge.in/startup#breadcrumb",
    },
    publisher: {
      "@id": "https://www.upforge.in/#organization",
    },
  }
}

// ---------------------------------------------------------------------------
// PAGE COMPONENT
// ---------------------------------------------------------------------------
export default async function StartupPage({ searchParams }: PageProps) {
  const params = await searchParams

  const searchQuery = params?.q?.trim()    ?? ""
  const yearFilter  = params?.year?.trim() ?? ""
  const sortBy      = params?.sort?.trim() ?? "name"
  const currentPage = Math.max(1, Number(params?.page ?? 1))

  const { startups, totalCount, uniqueYears } = await getRegistryData({
    searchQuery,
    yearFilter,
    sortBy,
    currentPage,
  })

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildCollectionPageSchema(totalCount)),
        }}
      />

      <StartupRegistry
        startups={startups}
        totalCount={totalCount}
        totalPages={totalPages}
        currentPage={currentPage}
        searchQuery={searchQuery}
        yearFilter={yearFilter}
        sortBy={sortBy}
        uniqueYears={uniqueYears}
      />
    </>
  )
}
