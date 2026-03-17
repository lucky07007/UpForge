// app/startups/[category]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Programmatic SEO category pages: /startups/ai, /startups/fintech, etc.
// • Fully static (ISR 24h) — zero client JS needed for first paint
// • generateStaticParams pre-builds all categories that exist in DB
// • Strong internal linking: startup cards → /startup/[slug], sidebar → hub
// • Structured data: CollectionPage + BreadcrumbList + ItemList schema
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
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// ─────────────────────────────────────────────────────────────────────────────
// CANONICAL CATEGORY REGISTRY
// Add new categories here — slug must match what's stored in DB (lowercased,
// hyphenated). Display name and description live here so they're SEO-tuned.
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_REGISTRY: Record<
  string,
  { display: string; description: string; longDescription: string }
> = {
  "ai": {
    display: "Artificial Intelligence",
    description:
      "Discover AI & ML startups in India building the next generation of intelligent products — from language models to computer vision.",
    longDescription:
      "India's AI ecosystem is among the fastest-growing globally. From Bengaluru-based LLM studios to Mumbai deep-learning companies, Indian AI founders are solving problems at scale. Browse verified AI startup profiles, founding teams, and company details.",
  },
  "fintech": {
    display: "FinTech",
    description:
      "Explore India's leading FinTech startups — payments, lending, insurance, wealth management and financial infrastructure companies.",
    longDescription:
      "India is the world's third-largest FinTech ecosystem. With UPI processing billions of transactions monthly, Indian FinTech startups are redefining how 1.4 billion people interact with money. Find verified profiles of India's top financial technology companies.",
  },
  "edtech": {
    display: "EdTech",
    description:
      "Browse verified EdTech startups in India — from K-12 platforms to upskilling tools and university-alternative programs.",
    longDescription:
      "India's EdTech sector serves over 500 million learners. From test-prep giants to vocational training platforms, Indian education technology startups are democratising quality learning. Explore verified founder profiles and company data.",
  },
  "healthtech": {
    display: "HealthTech",
    description:
      "Find India's top HealthTech startups — telemedicine, diagnostics, hospital management, mental health, and biotech platforms.",
    longDescription:
      "India's healthcare system is being rebuilt from the ground up by a new generation of founders. HealthTech startups are solving access, affordability, and quality gaps for a population of 1.4 billion. Explore verified health technology companies.",
  },
  "saas": {
    display: "SaaS",
    description:
      "Discover India's SaaS startups — B2B software, developer tools, enterprise platforms, and cloud-native companies built for global markets.",
    longDescription:
      "India is the world's third-largest SaaS ecosystem, with Indian-origin companies serving enterprises across North America, Europe, and Southeast Asia. Browse verified SaaS startup profiles from Bengaluru, Hyderabad, Delhi NCR, and beyond.",
  },
  "ecommerce": {
    display: "E-Commerce",
    description:
      "Explore India's e-commerce and D2C startups — marketplaces, direct-to-consumer brands, and supply chain technology companies.",
    longDescription:
      "India's e-commerce market is set to reach $350 billion by 2030. From quick-commerce to luxury D2C brands, Indian e-commerce founders are building for the next 500 million online shoppers. Find verified company profiles here.",
  },
  "agritech": {
    display: "AgriTech",
    description:
      "Discover AgriTech startups solving India's agricultural challenges — precision farming, supply chain, crop insurance, and farmer fintech.",
    longDescription:
      "With over 140 million farming households, India's agricultural sector is a massive opportunity for technology. Indian AgriTech startups are digitising the farm-to-fork chain. Browse verified profiles of founders building for Bharat.",
  },
  "climate-tech": {
    display: "Climate Tech",
    description:
      "Find India's Climate Tech startups — renewable energy, EV infrastructure, carbon markets, sustainable agriculture, and green finance.",
    longDescription:
      "India is the world's largest renewable energy market. Climate Tech founders are building EV charging networks, carbon credit platforms, sustainable packaging solutions, and clean energy infrastructure. Explore verified company profiles.",
  },
  "logistics": {
    display: "Logistics & Supply Chain",
    description:
      "Browse India's logistics startups — last-mile delivery, freight tech, cold chain, port logistics, and supply chain visibility platforms.",
    longDescription:
      "India's logistics market is being transformed by technology. From hyperlocal delivery networks to AI-powered freight matching, Indian logistics startups are building the infrastructure for a $1 trillion economy. Explore verified profiles.",
  },
  "biotech": {
    display: "BioTech",
    description:
      "Discover India's BioTech startups — genomics, drug discovery, diagnostics, synthetic biology, and pharmaceutical technology companies.",
    longDescription:
      "India is emerging as a global biotech hub with world-class research institutions and a growing pool of deep science founders. From CRISPR-based therapeutics to rapid diagnostics, browse verified Indian biotech company profiles.",
  },
  "devtools": {
    display: "Developer Tools",
    description:
      "Find India's developer tool startups — APIs, SDKs, cloud infrastructure, developer productivity, and open-source companies.",
    longDescription:
      "India produces more software engineers than any other country. A growing cohort of these engineers are now building tools for other developers — APIs, infrastructure products, and developer experience platforms. Browse verified profiles.",
  },
  "web3": {
    display: "Web3 & Blockchain",
    description:
      "Explore India's Web3 startups — blockchain infrastructure, DeFi protocols, NFT platforms, crypto exchanges, and decentralised applications.",
    longDescription:
      "Despite regulatory uncertainty, India has one of the world's largest crypto user bases. Web3 founders are building DeFi, gaming, identity, and blockchain infrastructure solutions. Explore verified Web3 startup profiles.",
  },
  "robotics": {
    display: "Robotics",
    description:
      "Discover India's robotics startups — industrial automation, autonomous vehicles, drone technology, and human-robot interaction systems.",
    longDescription:
      "India's robotics ecosystem is growing rapidly, driven by manufacturing sector demand and aerospace ambitions. From agricultural drones to surgical robots, Indian founders are pushing the frontier of physical automation.",
  },
  "gaming": {
    display: "Gaming",
    description:
      "Browse India's gaming startups — mobile games, esports platforms, game development studios, and interactive entertainment companies.",
    longDescription:
      "India is the world's second-largest mobile gaming market with over 500 million gamers. Indian gaming startups are building globally competitive titles, esports infrastructure, and gaming creator platforms. Find verified profiles.",
  },
  "creator-economy": {
    display: "Creator Economy",
    description:
      "Find India's creator economy startups — monetisation tools, content platforms, fan engagement, and media technology companies.",
    longDescription:
      "India's 200 million+ content creators represent one of the world's largest creator economies. Startups building tools for creators — payments, community, analytics, and distribution — are a fast-growing segment. Browse verified profiles.",
  },
}

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
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const PAGE_SIZE = 24

/**
 * Normalise a DB category string → slug.
 * "AI/ML"  → "ai"
 * "FinTech" → "fintech"
 * "Climate Tech" → "climate-tech"
 */
function categoryToSlug(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[/\\]/g, "-") // slashes → hyphens
    .replace(/\s+/g, "-")   // spaces  → hyphens
    .replace(/[^a-z0-9-]/g, "") // strip everything else
    .replace(/-+/g, "-")    // collapse double hyphens
    .trim()
}

/**
 * Given a slug, find the best DB category match.
 * Tries exact slug match, then partial match.
 */
async function resolveDbCategory(slug: string): Promise<string | null> {
  const supabase = createReadClient()
  const { data } = await supabase
    .from("startups")
    .select("category")
    .eq("status", "approved")
    .not("category", "is", null)

  if (!data) return null

  const unique = [...new Set(data.map((r) => r.category as string).filter(Boolean))]
  // Exact slug match
  const exact = unique.find((c) => categoryToSlug(c) === slug)
  if (exact) return exact
  // Partial match (e.g. "AI" matches "ai", "AI/ML" matches "ai")
  return unique.find((c) => c.toLowerCase().startsWith(slug)) ?? null
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA FETCHERS
// ─────────────────────────────────────────────────────────────────────────────
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

  return { startups: (data ?? []) as StartupRow[], total: count ?? 0 }
}

async function getRelatedCategories(currentSlug: string): Promise<string[]> {
  const supabase = createReadClient()
  const { data } = await supabase
    .from("startups")
    .select("category")
    .eq("status", "approved")
    .not("category", "is", null)

  const unique = [...new Set((data ?? []).map((r) => r.category as string))]
  return unique
    .filter((c) => categoryToSlug(c) !== currentSlug)
    .slice(0, 8)
}

// ─────────────────────────────────────────────────────────────────────────────
// STATIC PARAMS — pre-build all category pages at deploy time
// ─────────────────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const supabase = createReadClient()
  const { data } = await supabase
    .from("startups")
    .select("category")
    .eq("status", "approved")
    .not("category", "is", null)

  const unique = [...new Set((data ?? []).map((r) => r.category as string))]
  return unique.map((c) => ({ category: categoryToSlug(c) }))
}

export const revalidate = 86400 // 24h ISR

// ─────────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params
  const meta = CATEGORY_REGISTRY[slug]
  const displayName = meta?.display ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

  const title = `${displayName} Startups in India 2026 | UpForge`
  const description =
    meta?.description ??
    `Discover verified ${displayName} startups in India. Browse founder profiles, company details, and funding data on UpForge — India's independent startup registry.`
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
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURED DATA
// ─────────────────────────────────────────────────────────────────────────────
function buildSchemas(
  slug: string,
  displayName: string,
  description: string,
  startups: StartupRow[],
  total: number
) {
  const url = `https://www.upforge.in/startups/${slug}`

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.upforge.in" },
      { "@type": "ListItem", position: 2, name: "Startup Registry", item: "https://www.upforge.in/startup" },
      { "@type": "ListItem", position: 3, name: `${displayName} Startups`, item: url },
    ],
  }

  const collectionPage = {
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
  }

  const itemList = {
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
  }

  return { breadcrumb, collectionPage, itemList }
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO COMPONENT
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

// ─────────────────────────────────────────────────────────────────────────────
// STARTUP CARD
// ─────────────────────────────────────────────────────────────────────────────
function StartupCard({ startup, index }: { startup: StartupRow; index: number }) {
  const citySlug = startup.city
    ? startup.city.toLowerCase().replace(/\s+/g, "-")
    : null

  return (
    <Link
      href={`/startup/${startup.slug}`}
      className="group flex flex-col h-full border border-slate-200 bg-white hover:border-slate-800 hover:shadow-[3px_3px_0_#1e293b] transition-all duration-150"
      style={{ animationDelay: `${Math.min(index, 11) * 0.04}s` }}
    >
      {/* Card header */}
      <div className="p-5 pb-3 flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
          <StartupLogo name={startup.name} logo_url={startup.logo_url} size={48} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3
              className="text-sm font-semibold text-slate-900 truncate group-hover:underline"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {startup.name}
            </h3>
            {startup.is_featured && (
              <BadgeCheck className="h-3.5 w-3.5 text-green-600 flex-shrink-0" aria-label="Featured" />
            )}
          </div>
          <div className="flex items-center gap-3 mt-1">
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
        <ArrowUpRight
          className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-800 flex-shrink-0 transition-colors mt-0.5"
          aria-hidden="true"
        />
      </div>

      {/* Description */}
      <div className="px-5 pb-5 flex-1">
        {startup.description ? (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
            {startup.description}
          </p>
        ) : (
          <p className="text-xs text-slate-300 italic">Building for India's next decade.</p>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
        <span className="flex items-center gap-1 text-[9px] font-semibold text-green-700 uppercase tracking-wider">
          <BadgeCheck className="h-2.5 w-2.5" aria-hidden="true" />
          Verified
        </span>
        <span className="text-[9px] text-slate-400 uppercase tracking-wider">
          View Profile →
        </span>
      </div>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGINATION LINKS (server-rendered)
// ─────────────────────────────────────────────────────────────────────────────
function Pagination({
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

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-12"
      aria-label="Category pagination"
    >
      {currentPage > 1 && (
        <Link
          href={makeHref(currentPage - 1)}
          className="px-4 py-2 text-xs font-semibold border border-slate-200 text-slate-600 hover:border-slate-800 hover:text-slate-900 transition-colors"
        >
          ← Prev
        </Link>
      )}

      <div className="flex gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let p: number
          if (totalPages <= 5) p = i + 1
          else if (currentPage <= 3) p = i + 1
          else if (currentPage >= totalPages - 2) p = totalPages - 4 + i
          else p = currentPage - 2 + i

          return (
            <Link
              key={p}
              href={makeHref(p)}
              aria-current={p === currentPage ? "page" : undefined}
              className={`w-9 h-9 flex items-center justify-center text-xs font-semibold border transition-colors ${
                p === currentPage
                  ? "bg-slate-900 text-white border-slate-900"
                  : "border-slate-200 text-slate-500 hover:border-slate-800 hover:text-slate-900"
              }`}
            >
              {p}
            </Link>
          )
        })}
      </div>

      {currentPage < totalPages && (
        <Link
          href={makeHref(currentPage + 1)}
          className="px-4 py-2 text-xs font-semibold border border-slate-200 text-slate-600 hover:border-slate-800 hover:text-slate-900 transition-colors"
        >
          Next →
        </Link>
      )}
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

  // Resolve slug → actual DB category string
  const dbCategory = await resolveDbCategory(slug)
  if (!dbCategory) notFound()

  const meta = CATEGORY_REGISTRY[slug]
  const displayName =
    meta?.display ??
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  const description =
    meta?.description ??
    `Discover verified ${displayName} startups in India on UpForge — India's independent startup registry.`
  const longDescription =
    meta?.longDescription ??
    `Browse ${displayName} startups from across India. UpForge maintains verified, structured profiles for founders, investors and press.`

  const [{ startups, total }, relatedCategories] = await Promise.all([
    getCategoryStartups(dbCategory, currentPage),
    getRelatedCategories(slug),
  ])

  if (total === 0) notFound()

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
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
      <nav
        className="border-b bg-slate-50"
        aria-label="Breadcrumb"
      >
        <div className="max-w-6xl mx-auto px-6 h-10 flex items-center">
          <ol className="flex items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li>
              <Link href="/startup" className="hover:text-slate-900 transition-colors">Startup Registry</Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li>
              <Link href="/startups" className="hover:text-slate-900 transition-colors">Categories</Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li className="text-slate-900 font-medium">{displayName}</li>
          </ol>
        </div>
      </nav>

      <main className="flex-1">
        {/* ── MASTHEAD ── */}
        <header className="border-b bg-white">
          <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Back link */}
            <Link
              href="/startup"
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-slate-700 transition-colors mb-6"
            >
              <ArrowLeft className="h-3 w-3" aria-hidden="true" />
              All Startups
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                {/* Eyebrow */}
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                  <span
                    className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Category · UpForge Registry
                  </span>
                </div>

                {/* H1 */}
                <h1
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {displayName} Startups in India
                </h1>

                <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Stats pill */}
              <div className="flex-shrink-0 flex items-center gap-4 border border-slate-200 bg-slate-50 px-5 py-4 self-start sm:self-auto">
                <div className="text-center">
                  <p
                    className="text-2xl font-black text-slate-900"
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
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                    <p
                      className="text-[9px] font-bold uppercase tracking-wider text-green-600"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      All Verified
                    </p>
                  </div>
                  <p
                    className="text-[9px] text-slate-400 mt-1"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Updated Daily
                  </p>
                </div>
              </div>
            </div>

            {/* Long description */}
            <p className="mt-6 text-sm text-slate-500 leading-relaxed max-w-3xl border-t border-slate-100 pt-6">
              {longDescription}
            </p>
          </div>
        </header>

        {/* ── CONTENT ── */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid lg:grid-cols-12 gap-10">

            {/* ── STARTUP GRID ── */}
            <div className="lg:col-span-9">
              {/* Results bar */}
              <div className="flex items-center justify-between mb-6">
                <p
                  className="text-xs text-slate-500"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  Showing{" "}
                  <span className="font-semibold text-slate-900">
                    {(currentPage - 1) * PAGE_SIZE + 1}–
                    {Math.min(currentPage * PAGE_SIZE, total)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-900">
                    {total.toLocaleString()}
                  </span>{" "}
                  {displayName} startups
                  {totalPages > 1 && (
                    <span className="ml-2 text-slate-400">
                      · Page {currentPage} of {totalPages}
                    </span>
                  )}
                </p>
                <Link
                  href="/startup"
                  className="text-xs text-slate-400 hover:text-slate-700 transition-colors"
                >
                  View all categories →
                </Link>
              </div>

              {/* Grid */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {startups.map((startup, i) => (
                  <StartupCard key={startup.id} startup={startup} index={i} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                slug={slug}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>

            {/* ── SIDEBAR ── */}
            <aside className="lg:col-span-3">
              <div className="sticky top-24 space-y-6">

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
                    Get your verified profile on India's most trusted startup registry. Free forever.
                  </p>
                  <Link
                    href="/submit"
                    className="block text-center text-xs font-bold uppercase tracking-wider bg-white text-slate-900 py-2.5 px-4 hover:bg-yellow-400 transition-colors"
                    style={{ fontFamily: "system-ui, sans-serif" }}
                  >
                    Submit Startup →
                  </Link>
                </div>

                {/* Related Categories */}
                {relatedCategories.length > 0 && (
                  <div className="border border-slate-200 bg-white p-5 space-y-3">
                    <p
                      className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      Explore Categories
                    </p>
                    <ul className="space-y-1">
                      {relatedCategories.map((cat) => {
                        const catSlug = categoryToSlug(cat)
                        const catMeta = CATEGORY_REGISTRY[catSlug]
                        return (
                          <li key={cat}>
                            <Link
                              href={`/startups/${catSlug}`}
                              className="flex items-center justify-between py-1.5 text-xs text-slate-600 hover:text-slate-900 group transition-colors"
                            >
                              <span className="group-hover:underline">
                                {catMeta?.display ?? cat}
                              </span>
                              <ChevronRight
                                className="h-3 w-3 text-slate-300 group-hover:text-slate-600 transition-colors"
                                aria-hidden="true"
                              />
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                    <Link
                      href="/startups"
                      className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 transition-colors pt-2 border-t border-slate-100"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      All categories →
                    </Link>
                  </div>
                )}

                {/* Trending in category */}
                <div className="border border-slate-100 bg-slate-50 p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                    <p
                      className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      Top in {displayName}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {startups.slice(0, 5).map((s, i) => (
                      <li key={s.id}>
                        <Link
                          href={`/startup/${s.slug}`}
                          className="flex items-center gap-3 group"
                        >
                          <span
                            className="text-[10px] font-black text-slate-300 w-4 flex-shrink-0"
                            style={{ fontFamily: "Georgia, serif" }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-xs text-slate-600 group-hover:text-slate-900 group-hover:underline transition-colors truncate">
                            {s.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </aside>
          </div>
        </div>

        {/* ── BOTTOM INTERNAL LINKING ── */}
        <section className="border-t border-slate-100 bg-white">
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
                  <Link href="/startup" className="text-sm text-slate-500 hover:text-slate-900 hover:underline transition-colors">
                    All Indian Startups
                  </Link>
                </li>
                <li>
                  <Link href="/startups" className="text-sm text-slate-500 hover:text-slate-900 hover:underline transition-colors">
                    Browse by Category
                  </Link>
                </li>
                {relatedCategories.slice(0, 5).map((cat) => {
                  const catSlug = categoryToSlug(cat)
                  const catMeta = CATEGORY_REGISTRY[catSlug]
                  return (
                    <li key={cat}>
                      <Link
                        href={`/startups/${catSlug}`}
                        className="text-sm text-slate-500 hover:text-slate-900 hover:underline transition-colors"
                      >
                        {catMeta?.display ?? cat} Startups
                      </Link>
                    </li>
                  )
                })}
                <li>
                  <Link href="/submit" className="text-sm text-slate-500 hover:text-slate-900 hover:underline transition-colors">
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
