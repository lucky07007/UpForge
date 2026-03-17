// app/startups/[category]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Programmatic SEO category pages — FULLY DYNAMIC, zero hardcoded categories.
// Every category is derived from whatever `category` values exist in Supabase.
// To add a new category: just insert startups with that category in the DB.
//
// Architecture:
//   generateStaticParams() → queries DB for distinct categories → builds slugs
//   Page component         → resolves slug back to DB string → fetches startups
//   Metadata               → generated from DB data + auto-generated copy
//
// Routes: /startups/fintech, /startups/ai-ml, /startups/climate-tech, etc.
// ISR: revalidate every 24h
// ─────────────────────────────────────────────────────────────────────────────

import { createReadClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  MapPin,
  Tag,
  ChevronRight,
  TrendingUp,
  LayoutGrid,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  categoryToSlug,
  getDisplayName,
  slugToDbCategory,
  generateCategoryDescription,
  generateCategoryLongDescription,
} from "@/lib/categories"

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const PAGE_SIZE = 24

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface PageProps {
  params: Promise<{ category: string }>
  searchParams?: Promise<{ page?: string }>
}

interface StartupRow {
  id: string
  name: string
  slug: string
  description?: string | null
  logo_url?: string | null
  founded_year?: number | null
  city?: string | null
  category?: string | null
  is_featured?: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// DB HELPERS
// All category queries fetch the distinct category list once, then operate on
// it in memory — avoids N+1 Supabase calls.
// ─────────────────────────────────────────────────────────────────────────────

/** Fetch every distinct approved category value from the DB. */
async function getAllDbCategories(): Promise<string[]> {
  const supabase = createReadClient()
  const { data } = await supabase
    .from("startups")
    .select("category")
    .eq("status", "approved")
    .not("category", "is", null)

  const unique = [...new Set((data ?? []).map((r) => r.category as string))]
  return unique.filter(Boolean)
}

/** Fetch paginated startups for a given DB category string. */
async function getCategoryStartups(
  dbCategory: string,
  page: number
): Promise<{ startups: StartupRow[]; total: number }> {
  const supabase = createReadClient()
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, count } = await supabase
    .from("startups")
    .select(
      "id, name, slug, description, logo_url, founded_year, city, category, is_featured",
      { count: "exact" }
    )
    .eq("status", "approved")
    .eq("category", dbCategory)
    .order("is_featured", { ascending: false })
    .order("name", { ascending: true })
    .range(from, to)

  return {
    startups: (data ?? []) as StartupRow[],
    total: count ?? 0,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// generateStaticParams — called at build time
// Derives every possible [category] param from the DB.
// ─────────────────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const dbCategories = await getAllDbCategories()
  // Deduplicate slugs in case two DB strings map to the same slug
  const seen = new Set<string>()
  const params: { category: string }[] = []
  for (const cat of dbCategories) {
    const slug = categoryToSlug(cat)
    if (!seen.has(slug)) {
      seen.add(slug)
      params.push({ category: slug })
    }
  }
  return params
}

export const revalidate = 86400 // 24h ISR

// ─────────────────────────────────────────────────────────────────────────────
// METADATA — fully automatic, no hardcoded copy
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params

  const allDbCategories = await getAllDbCategories()
  const dbCategory = slugToDbCategory(slug, allDbCategories)

  if (!dbCategory) {
    return {
      title: "Category Not Found | UpForge",
      robots: { index: false, follow: false },
    }
  }

  // Get count for description
  const supabase = createReadClient()
  const { count } = await supabase
    .from("startups")
    .select("id", { count: "exact", head: true })
    .eq("status", "approved")
    .eq("category", dbCategory)

  const displayName = getDisplayName(dbCategory)
  const total = count ?? 0
  const description = generateCategoryDescription(dbCategory, total)
  const title = `${displayName} Startups in India 2026 | UpForge`
  const url = `https://www.upforge.in/startups/${slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "UpForge",
      images: [
        {
          url: "https://www.upforge.in/og/registry.png",
          width: 1200,
          height: 630,
          alt: `${displayName} Startups in India — UpForge`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.upforge.in/og/registry.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURED DATA — all values dynamic
// ─────────────────────────────────────────────────────────────────────────────
function buildSchemas(
  slug: string,
  displayName: string,
  description: string,
  startups: StartupRow[],
  total: number
) {
  const url = `https://www.upforge.in/startups/${slug}`

  return {
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.upforge.in" },
        { "@type": "ListItem", position: 2, name: "Startup Registry", item: "https://www.upforge.in/startup" },
        { "@type": "ListItem", position: 3, name: "Categories", item: "https://www.upforge.in/startups" },
        { "@type": "ListItem", position: 4, name: `${displayName} Startups`, item: url },
      ],
    },
    collectionPage: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#collectionpage`,
      name: `${displayName} Startups in India 2026`,
      description,
      url,
      inLanguage: "en-IN",
      numberOfItems: total,
      isPartOf: { "@id": "https://www.upforge.in/#website" },
      publisher: { "@id": "https://www.upforge.in/#organization" },
    },
    itemList: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${displayName} Startups in India`,
      numberOfItems: startups.length,
      itemListElement: startups.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.name,
        url: `https://www.upforge.in/startup/${s.slug}`,
      })),
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function StartupLogo({
  name,
  logo_url,
  size = 48,
}: {
  name: string
  logo_url?: string | null
  size?: number
}) {
  if (logo_url) {
    return (
      <Image
        src={logo_url}
        alt={`${name} logo`}
        width={size}
        height={size}
        className="object-contain"
        loading="lazy"
      />
    )
  }
  return (
    <span
      className="text-xl font-bold text-slate-400"
      aria-hidden="true"
      style={{ fontFamily: "Georgia, serif" }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}

function StartupCard({
  startup,
  index,
}: {
  startup: StartupRow
  index: number
}) {
  return (
    <Link
      href={`/startup/${startup.slug}`}
      className="group flex flex-col h-full border border-slate-200 bg-white hover:border-slate-900 hover:shadow-[3px_3px_0_#0f172a] transition-all duration-150"
      style={{ animationDelay: `${Math.min(index, 11) * 0.04}s` }}
    >
      {/* Header */}
      <div className="p-5 pb-3 flex items-start gap-3">
        <div className="h-11 w-11 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
          <StartupLogo name={startup.name} logo_url={startup.logo_url} size={44} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-1">
            <h3
              className="text-sm font-semibold text-slate-900 leading-snug group-hover:underline"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {startup.name}
            </h3>
            <ArrowUpRight
              className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-700 flex-shrink-0 transition-colors mt-0.5"
              aria-hidden="true"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2.5 mt-1">
            {startup.city && (
              <span className="flex items-center gap-1 text-[10px] text-slate-400">
                <MapPin className="h-2.5 w-2.5" aria-hidden="true" />
                {startup.city}
              </span>
            )}
            {startup.founded_year && (
              <span className="flex items-center gap-1 text-[10px] text-slate-400">
                <Calendar className="h-2.5 w-2.5" aria-hidden="true" />
                Est. {startup.founded_year}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 pb-4 flex-1">
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
          {startup.description || "Building for India's next decade."}
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
        <span className="flex items-center gap-1 text-[9px] font-semibold text-green-700 uppercase tracking-wider">
          <BadgeCheck className="h-2.5 w-2.5" aria-hidden="true" />
          Verified
        </span>
        {startup.is_featured && (
          <span
            className="text-[8px] font-black uppercase tracking-wider text-amber-600"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Featured
          </span>
        )}
      </div>
    </Link>
  )
}

function PaginationNav({
  slug,
  currentPage,
  totalPages,
}: {
  slug: string
  currentPage: number
  totalPages: number
}) {
  if (totalPages <= 1) return null

  const makeHref = (p: number) =>
    p === 1 ? `/startups/${slug}` : `/startups/${slug}?page=${p}`

  // Build window of up to 5 page numbers centred on currentPage
  const windowSize = Math.min(5, totalPages)
  let start: number
  if (currentPage <= 3 || totalPages <= 5) start = 1
  else if (currentPage >= totalPages - 2) start = totalPages - 4
  else start = currentPage - 2
  const pages = Array.from({ length: windowSize }, (_, i) => start + i)

  return (
    <nav
      className="flex items-center justify-center gap-1.5 mt-12"
      aria-label="Category pagination"
    >
      <Link
        href={makeHref(currentPage - 1)}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : 0}
        className={`px-4 py-2 text-xs font-semibold border transition-colors ${
          currentPage === 1
            ? "border-slate-100 text-slate-300 pointer-events-none"
            : "border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900"
        }`}
      >
        ← Prev
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={makeHref(p)}
          aria-current={p === currentPage ? "page" : undefined}
          className={`w-9 h-9 flex items-center justify-center text-xs font-semibold border transition-colors ${
            p === currentPage
              ? "bg-slate-900 text-white border-slate-900"
              : "border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900"
          }`}
        >
          {p}
        </Link>
      ))}

      <Link
        href={makeHref(currentPage + 1)}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : 0}
        className={`px-4 py-2 text-xs font-semibold border transition-colors ${
          currentPage === totalPages
            ? "border-slate-100 text-slate-300 pointer-events-none"
            : "border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900"
        }`}
      >
        Next →
      </Link>
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category: slug } = await params
  const sp = await searchParams
  const currentPage = Math.max(1, Number(sp?.page ?? 1))

  // ── Resolve slug → DB category ───────────────────────────────────────────
  const allDbCategories = await getAllDbCategories()
  const dbCategory = slugToDbCategory(slug, allDbCategories)
  if (!dbCategory) notFound()

  // ── Fetch page data in parallel ──────────────────────────────────────────
  const [{ startups, total }, relatedDbCategories] = await Promise.all([
    getCategoryStartups(dbCategory, currentPage),
    // Related = all other categories, sorted by name
    Promise.resolve(
      allDbCategories
        .filter((c) => categoryToSlug(c) !== slug)
        .sort((a, b) => a.localeCompare(b))
        .slice(0, 10)
    ),
  ])

  if (total === 0) notFound()

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const displayName = getDisplayName(dbCategory)
  const description = generateCategoryDescription(dbCategory, total)
  const longDescription = generateCategoryLongDescription(dbCategory, total)
  const profileUrl = `https://www.upforge.in/startups/${slug}`
  const schemas = buildSchemas(slug, displayName, description, startups, total)

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF9]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.collectionPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.itemList) }}
      />

      <Navbar />

      {/* ── BREADCRUMB ── */}
      <nav className="border-b bg-slate-50" aria-label="Breadcrumb">
        <div className="max-w-6xl mx-auto px-6 h-10 flex items-center">
          <ol className="flex items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-slate-900 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li>
              <Link href="/startup" className="hover:text-slate-900 transition-colors">
                Startup Registry
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li>
              <Link href="/startups" className="hover:text-slate-900 transition-colors">
                Categories
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li className="text-slate-900 font-medium truncate max-w-[160px]">
              {displayName}
            </li>
          </ol>
        </div>
      </nav>

      <main className="flex-1">

        {/* ── MASTHEAD ── */}
        <header className="border-b bg-white">
          <div className="max-w-6xl mx-auto px-6 py-10 sm:py-12">
            <Link
              href="/startup"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors mb-6"
            >
              <ArrowLeft className="h-3 w-3" aria-hidden="true" />
              All Startups
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              {/* Left: heading + desc */}
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-3 w-3 text-slate-400" aria-hidden="true" />
                  <span
                    className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Category · UpForge Registry India 2026
                  </span>
                </div>

                <h1
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {displayName} Startups in India
                </h1>

                <p className="text-sm text-slate-500 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Right: live count pill */}
              <div className="flex-shrink-0 border border-slate-200 bg-slate-50 px-6 py-4 flex items-center gap-5 self-start sm:self-auto">
                <div className="text-center">
                  <p
                    className="text-2xl font-black text-slate-900 leading-none mb-1"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {total.toLocaleString()}
                  </p>
                  <p
                    className="text-[9px] font-bold uppercase tracking-wider text-slate-400"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Verified Startups
                  </p>
                </div>
                <div className="w-px h-10 bg-slate-200" aria-hidden="true" />
                <div className="flex flex-col items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                    aria-hidden="true"
                  />
                  <p
                    className="text-[9px] font-bold uppercase tracking-wider text-green-600"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    All Verified
                  </p>
                </div>
              </div>
            </div>

            {/* Long description */}
            <p className="mt-6 pt-6 border-t border-slate-100 text-sm text-slate-500 leading-relaxed max-w-3xl">
              {longDescription}
            </p>
          </div>
        </header>

        {/* ── CONTENT AREA ── */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid lg:grid-cols-12 gap-10">

            {/* ── STARTUP GRID (9 cols) ── */}
            <section className="lg:col-span-9" aria-label={`${displayName} startups`}>

              {/* Results bar */}
              <div className="flex items-center justify-between mb-5">
                <p
                  className="text-xs text-slate-500"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                  aria-live="polite"
                >
                  Showing{" "}
                  <strong className="text-slate-900">
                    {(currentPage - 1) * PAGE_SIZE + 1}–
                    {Math.min(currentPage * PAGE_SIZE, total)}
                  </strong>{" "}
                  of{" "}
                  <strong className="text-slate-900">{total.toLocaleString()}</strong>{" "}
                  {displayName} startups
                  {totalPages > 1 && (
                    <span className="text-slate-400">
                      {" "}· Page {currentPage} / {totalPages}
                    </span>
                  )}
                </p>
                <Link
                  href="/startups"
                  className="hidden sm:inline text-xs text-slate-400 hover:text-slate-700 transition-colors"
                >
                  All categories →
                </Link>
              </div>

              {/* Grid */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {startups.map((startup, i) => (
                  <StartupCard key={startup.id} startup={startup} index={i} />
                ))}
              </div>

              <PaginationNav
                slug={slug}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </section>

            {/* ── SIDEBAR (3 cols) ── */}
            <aside className="lg:col-span-3">
              <div className="sticky top-24 space-y-5">

                {/* Submit CTA */}
                <div className="border border-slate-900 bg-slate-900 p-5 space-y-3">
                  <p
                    className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-400"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    List Free
                  </p>
                  <p
                    className="text-sm font-bold text-white leading-snug"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Building a {displayName} startup?
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Get verified and indexed in India's most trusted startup registry. Free forever.
                  </p>
                  <Link
                    href="/submit"
                    className="block text-center text-xs font-bold uppercase tracking-wider bg-white text-slate-900 py-2.5 hover:bg-yellow-400 transition-colors"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Submit Your Startup →
                  </Link>
                </div>

                {/* Top startups in this category */}
                {startups.slice(0, 6).length > 0 && (
                  <div className="border border-slate-200 bg-white p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3 w-3 text-slate-400" aria-hidden="true" />
                      <p
                        className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400"
                        style={{ fontFamily: "system-ui, sans-serif" }}
                      >
                        Top in {displayName}
                      </p>
                    </div>
                    <ul className="space-y-2.5">
                      {startups.slice(0, 6).map((s, i) => (
                        <li key={s.id}>
                          <Link
                            href={`/startup/${s.slug}`}
                            className="flex items-center gap-3 group"
                          >
                            <span
                              className="text-[10px] font-black text-slate-300 w-5 flex-shrink-0 tabular-nums"
                              style={{ fontFamily: "Georgia, serif" }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-xs text-slate-600 group-hover:text-slate-900 group-hover:underline transition-colors truncate leading-snug">
                              {s.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related categories */}
                {relatedDbCategories.length > 0 && (
                  <div className="border border-slate-100 bg-slate-50 p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <LayoutGrid className="h-3 w-3 text-slate-400" aria-hidden="true" />
                      <p
                        className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400"
                        style={{ fontFamily: "system-ui, sans-serif" }}
                      >
                        Other Categories
                      </p>
                    </div>
                    <ul className="space-y-0.5">
                      {relatedDbCategories.map((cat) => {
                        const catSlug = categoryToSlug(cat)
                        return (
                          <li key={cat}>
                            <Link
                              href={`/startups/${catSlug}`}
                              className="flex items-center justify-between py-1.5 text-xs text-slate-600 hover:text-slate-900 group transition-colors"
                            >
                              <span className="group-hover:underline truncate pr-2">
                                {getDisplayName(cat)}
                              </span>
                              <ChevronRight
                                className="h-3 w-3 text-slate-300 group-hover:text-slate-600 flex-shrink-0 transition-colors"
                                aria-hidden="true"
                              />
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                    <Link
                      href="/startups"
                      className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 transition-colors pt-2 border-t border-slate-200"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      View all categories →
                    </Link>
                  </div>
                )}

              </div>
            </aside>
          </div>
        </div>

        {/* ── INTERNAL LINKING FOOTER ── */}
        <section className="border-t border-slate-100 bg-white mt-4">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <p
              className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Explore UpForge Registry
            </p>
            <nav aria-label="Explore more startup categories">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                <li>
                  <Link
                    href="/startup"
                    className="text-sm text-slate-500 hover:text-slate-900 hover:underline transition-colors"
                  >
                    All Indian Startups
                  </Link>
                </li>
                <li>
                  <Link
                    href="/startups"
                    className="text-sm text-slate-500 hover:text-slate-900 hover:underline transition-colors"
                  >
                    Browse by Category
                  </Link>
                </li>
                {relatedDbCategories.slice(0, 6).map((cat) => (
                  <li key={cat}>
                    <Link
                      href={`/startups/${categoryToSlug(cat)}`}
                      className="text-sm text-slate-500 hover:text-slate-900 hover:underline transition-colors"
                    >
                      {getDisplayName(cat)} Startups
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/submit"
                    className="text-sm text-slate-500 hover:text-slate-900 hover:underline transition-colors"
                  >
                    Submit Your Startup
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
