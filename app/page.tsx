// app/startups/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// /startups — Category hub page. FULLY DYNAMIC — no hardcoded category list.
// Derives every category and its startup count directly from Supabase.
// New categories appear automatically when startups are added to the DB.
// ─────────────────────────────────────────────────────────────────────────────

import { createReadClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import Link from "next/link"
import { BadgeCheck, TrendingUp, Layers, ArrowUpRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  categoryToSlug,
  getDisplayName,
  generateCategoryDescription,
} from "@/lib/categories"

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface CategoryStat {
  dbCategory: string   // raw value from DB, e.g. "AI/ML", "FinTech"
  slug: string         // URL slug, e.g. "ai-ml", "fintech"
  displayName: string  // human-readable, e.g. "AI/ML", "FinTech"
  description: string  // auto-generated SEO description
  count: number        // number of approved startups
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA FETCHER
// Single Supabase query — fetches all category values, aggregates in memory.
// ─────────────────────────────────────────────────────────────────────────────
async function getCategoryStats(): Promise<CategoryStat[]> {
  const supabase = createReadClient()

  const { data } = await supabase
    .from("startups")
    .select("category")
    .eq("status", "approved")
    .not("category", "is", null)

  if (!data) return []

  // Count per raw category value
  const counts: Record<string, number> = {}
  for (const row of data) {
    const cat = row.category as string
    if (cat) counts[cat] = (counts[cat] ?? 0) + 1
  }

  // Build stats — deduplicate by slug (in case two DB strings map to same slug)
  const seenSlugs = new Set<string>()
  const stats: CategoryStat[] = []

  for (const [dbCategory, count] of Object.entries(counts)) {
    const slug = categoryToSlug(dbCategory)
    if (seenSlugs.has(slug)) continue
    seenSlugs.add(slug)

    stats.push({
      dbCategory,
      slug,
      displayName: getDisplayName(dbCategory),
      description: generateCategoryDescription(dbCategory, count),
      count,
    })
  }

  // Sort by count descending (most populated categories first)
  stats.sort((a, b) => b.count - a.count)

  return stats
}

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata(): Promise<Metadata> {
  const supabase = createReadClient()
  const { count } = await supabase
    .from("startups")
    .select("id", { count: "exact", head: true })
    .eq("status", "approved")

  const n = count ? count.toLocaleString() : "1,000+"

  return {
    title: "Browse Indian Startups by Category 2026 | UpForge",
    description: `Explore ${n}+ verified Indian startups organised by category — AI, FinTech, SaaS, EdTech, HealthTech, Climate Tech and more. India's most trusted independent startup registry.`,
    alternates: { canonical: "https://www.upforge.in/startups" },
    openGraph: {
      title: "Indian Startups by Category 2026 | UpForge",
      description: `Discover ${n}+ verified Indian startups across every sector. Browse by category — AI, FinTech, SaaS, EdTech, HealthTech and more.`,
      url: "https://www.upforge.in/startups",
      siteName: "UpForge",
      images: [
        {
          url: "https://www.upforge.in/og/registry.png",
          width: 1200,
          height: 630,
          alt: "UpForge — Indian Startups by Category 2026",
        },
      ],
      locale: "en_IN",
      type: "website",
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

export const revalidate = 86400 // 24h ISR

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURED DATA
// ─────────────────────────────────────────────────────────────────────────────
function buildSchemas(categories: CategoryStat[], total: number) {
  return {
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.upforge.in" },
        { "@type": "ListItem", position: 2, name: "Startup Registry", item: "https://www.upforge.in/startup" },
        { "@type": "ListItem", position: 3, name: "Browse by Category", item: "https://www.upforge.in/startups" },
      ],
    },
    collectionPage: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://www.upforge.in/startups#collectionpage",
      name: "Indian Startups by Category 2026",
      description: `Browse ${total.toLocaleString()}+ verified Indian startups across ${categories.length} sectors.`,
      url: "https://www.upforge.in/startups",
      inLanguage: "en-IN",
      numberOfItems: total,
    },
    itemList: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Indian Startup Categories on UpForge",
      numberOfItems: categories.length,
      itemListElement: categories.map((cat, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${cat.displayName} Startups in India`,
        url: `https://www.upforge.in/startups/${cat.slug}`,
      })),
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY CARD
// ─────────────────────────────────────────────────────────────────────────────
function CategoryCard({
  cat,
  rank,
}: {
  cat: CategoryStat
  rank: number
}) {
  return (
    <Link
      href={`/startups/${cat.slug}`}
      className="group flex flex-col h-full border border-slate-200 bg-white p-5 hover:border-slate-900 hover:shadow-[3px_3px_0_#0f172a] transition-all duration-150"
    >
      {/* Rank + arrow */}
      <div className="flex items-start justify-between mb-3">
        <span
          className="text-3xl font-black text-slate-100 group-hover:text-slate-200 transition-colors leading-none select-none"
          style={{ fontFamily: "Georgia, serif" }}
          aria-hidden="true"
        >
          {String(rank).padStart(2, "0")}
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-slate-300 group-hover:text-slate-800 transition-colors"
          aria-hidden="true"
        />
      </div>

      {/* Name */}
      <h2
        className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:underline"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {cat.displayName}
      </h2>

      {/* Description */}
      <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-4 line-clamp-3">
        {cat.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="flex items-center gap-1.5">
          <BadgeCheck className="h-3 w-3 text-green-600" aria-hidden="true" />
          <span
            className="text-[9px] font-black uppercase tracking-wider text-green-700"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            {cat.count.toLocaleString()} verified
          </span>
        </span>
        <span
          className="text-[9px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-700 transition-colors"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          Explore →
        </span>
      </div>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default async function StartupsHubPage() {
  const categories = await getCategoryStats()
  const total = categories.reduce((sum, c) => sum + c.count, 0)
  const schemas = buildSchemas(categories, total)

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF9]">
      {/* Structured data */}
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
            <li className="text-slate-900 font-medium">Browse by Category</li>
          </ol>
        </div>
      </nav>

      <main className="flex-1">

        {/* ── MASTHEAD ── */}
        <header className="border-b bg-white">
          <div className="max-w-6xl mx-auto px-6 py-10 sm:py-12">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
              <span
                className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                UpForge Registry · India Edition 2026
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Browse Indian Startups by Category
            </h1>

            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              India's independent registry of{" "}
              <strong className="text-slate-700">{total.toLocaleString()}+</strong>{" "}
              verified startups organised across{" "}
              <strong className="text-slate-700">{categories.length} sectors</strong>.
              Every profile is manually verified — free for founders, trusted by investors and press.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mt-7 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                  aria-hidden="true"
                />
                <span className="text-xs text-slate-500">
                  <strong className="text-slate-900">{total.toLocaleString()}+</strong>{" "}
                  verified profiles
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-slate-400" aria-hidden="true" />
                <span className="text-xs text-slate-500">
                  <strong className="text-slate-900">{categories.length}</strong> sectors covered
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-3 w-3 text-green-600" aria-hidden="true" />
                <span className="text-xs text-slate-500">Updated daily</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── CATEGORY GRID ── */}
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* Quick-jump tag strip */}
          <nav
            className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-slate-100"
            aria-label="Jump to category"
          >
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/startups/${cat.slug}`}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900 transition-all"
              >
                {cat.displayName}
                <span
                  className="text-[9px] text-slate-300 font-mono"
                  aria-label={`${cat.count} startups`}
                >
                  {cat.count}
                </span>
              </Link>
            ))}
          </nav>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.slug} cat={cat} rank={i + 1} />
            ))}
          </div>
        </div>

        {/* ── CTA BLOCK ── */}
        <div className="max-w-6xl mx-auto px-6 pb-10">
          <div className="border border-slate-900 bg-slate-900 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p
                className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-400 mb-2"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                UpForge Registry
              </p>
              <p
                className="text-xl font-bold text-white mb-2"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Your founder story starts with a verified profile.
              </p>
              <p className="text-sm text-slate-400">
                Independently verified and indexed in India's most trusted startup registry. Free forever.
              </p>
            </div>
            <Link
              href="/submit"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-xs uppercase tracking-wider px-6 py-3.5 hover:bg-yellow-400 transition-colors"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              List Free →
            </Link>
          </div>
        </div>

        {/* ── INTERNAL LINKING ── */}
        <section className="border-t border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <p
              className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Explore UpForge
            </p>
            <nav aria-label="Explore more on UpForge">
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
                    href="/submit"
                    className="text-sm text-slate-500 hover:text-slate-900 hover:underline transition-colors"
                  >
                    Submit Your Startup
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-slate-500 hover:text-slate-900 hover:underline transition-colors"
                  >
                    Startup Journal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-slate-500 hover:text-slate-900 hover:underline transition-colors"
                  >
                    About UpForge
                  </Link>
                </li>
                {/* Dynamic top-6 category links */}
                {categories.slice(0, 6).map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/startups/${cat.slug}`}
                      className="text-sm text-slate-500 hover:text-slate-900 hover:underline transition-colors"
                    >
                      {cat.displayName} Startups
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
