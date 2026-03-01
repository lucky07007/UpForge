import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  searchParams?: {
    page?: string;
    search?: string;
  };
}

export default async function StartupPage({ searchParams }: Props) {
  const supabase = await createClient();

  const currentPage =
    searchParams?.page && Number(searchParams.page) > 0
      ? Number(searchParams.page)
      : 1;

  const searchQuery = searchParams?.search?.trim() ?? "";

  const ITEMS_PER_PAGE = 12; // Desktop default
  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  let query = supabase
    .from("startups")
    .select(
      "id, name, slug, logo_url, description, founded_year, category",
      { count: "exact" }
    )
    .order("created_at", { ascending: false });

  if (searchQuery) {
    query = query.or(
      `name.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`
    );
  }

  const { data: startups, count } = await query.range(from, to);

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  return (
    <div className="bg-[#FCFCFC] text-[#1A1A1A] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
            Startup Registry
          </h1>
          <p className="text-gray-500">
            India's verified startup database.
          </p>
          <div className="mt-4 text-xs text-gray-400 tracking-widest uppercase">
            {count || 0} Profiles Found
          </div>
        </div>

        {/* Search */}
        <form method="GET" className="max-w-xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search startups..."
              className="w-full border border-gray-300 px-4 py-3 pr-10 focus:outline-none bg-white"
            />
            <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
          </div>
        </form>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {startups?.map((startup) => (
            <Link key={startup.id} href={`/startup/${startup.slug}`}>
              <article className="bg-white border border-gray-200 p-6 hover:border-gray-400 transition-all">

                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 flex items-center justify-center border bg-gray-50">
                    {startup.logo_url ? (
                      <img
                        src={startup.logo_url}
                        alt={startup.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-xl font-serif text-gray-300">
                        {startup.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-gray-400">
                    {startup.founded_year || "—"}
                  </span>
                </div>

                <h3 className="font-serif text-xl mb-3">
                  {startup.name}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {startup.description}
                </p>

                <div className="mt-4 text-xs text-gray-400 uppercase tracking-wide">
                  {startup.category || "General"}
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* MOBILE LIST (Compact, 10 items shown visually) */}
        <div className="md:hidden space-y-6">
          {startups?.slice(0, 10).map((startup) => (
            <Link key={startup.id} href={`/startup/${startup.slug}`}>
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center border bg-gray-50">
                    {startup.logo_url ? (
                      <img
                        src={startup.logo_url}
                        alt={startup.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-sm font-serif text-gray-300">
                        {startup.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="font-medium text-sm">
                      {startup.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {startup.founded_year || ""}
                    </p>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-6">

            <Link
              href={`?page=${Math.max(1, currentPage - 1)}${
                searchQuery ? `&search=${searchQuery}` : ""
              }`}
              className={`p-2 border rounded-full ${
                currentPage === 1 ? "pointer-events-none opacity-30" : ""
              }`}
            >
              <ChevronLeft size={20} />
            </Link>

            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <Link
              href={`?page=${Math.min(totalPages, currentPage + 1)}${
                searchQuery ? `&search=${searchQuery}` : ""
              }`}
              className={`p-2 border rounded-full ${
                currentPage === totalPages
                  ? "pointer-events-none opacity-30"
                  : ""
              }`}
            >
              <ChevronRight size={20} />
            </Link>

          </div>
        )}
      </div>
    </div>
  );
}
