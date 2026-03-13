// app/startup/page.tsx  ←  SERVER COMPONENT
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import StartupRegistry from "@/components/StartupRegistry";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { count } = await supabase
    .from("startups")
    .select("*", { count: "exact", head: true });
  const n = (count || 72000).toLocaleString();
  return {
    title: `Indian Startup Registry 2026 — ${n}+ Verified Startups | UpForge`,
    description: `Browse ${n}+ verified Indian startups across AI, SaaS, FinTech, HealthTech and 30+ sectors. India's most trusted free startup database, updated daily.`,
    alternates: { canonical: "https://www.upforge.in/startup" },
    openGraph: {
      title: `Indian Startup Registry — ${n}+ Verified | UpForge`,
      description: "Browse India's most comprehensive startup database. Free, verified, updated daily.",
      url: "https://www.upforge.in/startup",
      siteName: "UpForge",
      images: [{ url: "https://www.upforge.in/og-registry.png", width: 1200, height: 630 }],
      locale: "en_IN",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export const revalidate = 0;

interface PageProps {
  searchParams?: Promise<{
    page?: string;
    q?: string;
    year?: string;
    sort?: string;
  }>;
}

const FIRST_PAGE_SIZE = 23; // 3 featured (is_featured=true) + 20 grid
const OTHER_PAGE_SIZE = 20;

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "UpForge",          item: "https://www.upforge.in/" },
        { "@type": "ListItem", position: 2, name: "Startup Registry", item: "https://www.upforge.in/startup" },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": "https://www.upforge.in/startup",
      name: "Indian Startup Registry 2026",
      description: "India's independent registry of verified startups across 30+ sectors.",
      url: "https://www.upforge.in/startup",
      publisher: { "@type": "Organization", name: "UpForge", url: "https://www.upforge.in" },
    },
  ],
};

export default async function StartupPage({ searchParams }: PageProps) {
  const supabase = await createClient();

  const params      = await searchParams;
  const searchQuery = params?.q?.trim() ?? "";
  const yearFilter  = params?.year?.trim() ?? "";
  const sortBy      = params?.sort?.trim() ?? "name";
  const currentPage = Math.max(1, Number(params?.page ?? 1));
  const isFirstPage = currentPage === 1;

  const pageSize = isFirstPage ? FIRST_PAGE_SIZE : OTHER_PAGE_SIZE;
  const from     = isFirstPage
    ? 0
    : FIRST_PAGE_SIZE + (currentPage - 2) * OTHER_PAGE_SIZE;
  const to = from + pageSize - 1;

  // Build query
  let query = supabase.from("startups").select("*", { count: "exact" });

  if (searchQuery) {
    query = query.or(
      `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,founders.ilike.%${searchQuery}%`
    );
  }
  if (yearFilter) {
    query = query.eq("founded_year", Number(yearFilter));
  }

  const orderCol = sortBy === "year"   ? "founded_year"
                 : sortBy === "newest" ? "created_at"
                 : "name";
  const orderAsc = sortBy !== "newest";

  const { data: startups, count, error } = await query
    .order(orderCol, { ascending: orderAsc })
    .range(from, to);

  if (error) console.error("Supabase error:", error);

  // Get distinct years from 2016 onwards for the year filter
  const { data: yearRows } = await supabase
    .from("startups")
    .select("founded_year")
    .not("founded_year", "is", null)
    .gte("founded_year", 2016)
    .order("founded_year", { ascending: false });

  const uniqueYears: number[] = [
    ...new Set(
      (yearRows ?? [])
        .map((r: { founded_year: number | null }) => r.founded_year)
        .filter((y): y is number => y !== null)
    ),
  ];

  const totalCount = count ?? 0;
  const totalPages =
    totalCount <= FIRST_PAGE_SIZE
      ? 1
      : 1 + Math.ceil((totalCount - FIRST_PAGE_SIZE) / OTHER_PAGE_SIZE);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <StartupRegistry
        startups={startups ?? []}
        totalCount={totalCount}
        totalPages={totalPages}
        currentPage={currentPage}
        searchQuery={searchQuery}
        yearFilter={yearFilter}
        sortBy={sortBy}
        uniqueYears={uniqueYears}
      />
    </>
  );
}
