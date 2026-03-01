// app/startups/page.tsx

import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface Props {
  searchParams: {
    page?: string;
    search?: string;
  };
}

const ITEMS_PER_PAGE = 12;

export default async function StartupsPage({ searchParams }: Props) {
  const supabase = await createClient();

  const currentPage = Number(searchParams?.page) > 0 ? Number(searchParams.page) : 1;
  const searchQuery = searchParams?.search?.toLowerCase() || "";

  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  let query = supabase
    .from("startups")
    .select(
      "id, name, slug, logo_url, description, founded_year, category",
      { count: "exact" }
    )
    .order("founded_year", { ascending: false });

  if (searchQuery) {
    query = query.or(
      `name.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`
    );
  }

  const { data: startups, count } = await query.range(from, to);

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (searchQuery) params.set("search", searchQuery);
    return `?${params.toString()}`;
  };

  return (
    <div className="bg-[#FCFCFC] min-h-screen pt-32 pb-32">
      <div className="max-w-[1600px] mx-auto px-8">

        {/* Header */}
        <div className="text-center mb-28">
          <h1 className="font-serif text-6xl tracking-tight mb-6">
            Startup Registry
          </h1>
          <p className="text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
            A curated archive of verified Indian ventures.
          </p>
          <div className="mt-8 text-xs tracking-[0.3em] text-neutral-400 uppercase">
            {count || 0} Registered Profiles
          </div>
        </div>

        {/* Search */}
        <form method="GET" className="max-w-xl mx-auto mb-24">
          <div className="relative">
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search startups..."
              className="w-full border border-neutral-300 px-5 py-4 pr-12 text-sm tracking-wide focus:outline-none focus:border-black transition"
            />
            <Search className="absolute right-4 top-4 text-neutral-400 w-5 h-5" />
          </div>
        </form>

        {/* Grid */}
        {startups && startups.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16">
              {startups.map((startup) => (
                <Link
                  key={startup.id}
                  href={`/startup/${startup.slug}`}
                  className="group"
                >
                  <article className="border border-neutral-200 p-8 bg-white transition duration-300 hover:shadow-sm hover:border-neutral-300 h-full flex flex-col">

                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 flex items-center justify-center bg-neutral-50 border border-neutral-200">
                        {startup.logo_url ? (
                          <img
                            src={startup.logo_url}
                            alt={startup.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-2xl font-serif text-neutral-300">
                            {startup.name.charAt(0)}
                          </span>
                        )}
                      </div>

                      <span className="text-xs text-neutral-400 tracking-wide">
                        {startup.founded_year || "—"}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl tracking-tight mb-3 line-clamp-1">
                      {startup.name}
                    </h3>

                    <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3 mb-6 flex-grow">
                      {startup.description || "No description available."}
                    </p>

                    <span className="text-[11px] border border-neutral-200 px-3 py-1 tracking-wide text-neutral-500 self-start">
                      {startup.category || "General"}
                    </span>

                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-28 flex justify-center items-center gap-10">

                <Link
                  href={buildUrl(currentPage - 1)}
                  className={`px-5 py-2 border text-sm tracking-wide ${
                    currentPage === 1
                      ? "pointer-events-none opacity-30"
                      : "hover:border-black"
                  }`}
                >
                  <ChevronLeft size={16} />
                </Link>

                <span className="text-sm tracking-wide text-neutral-500">
                  {currentPage} / {totalPages}
                </span>

                <Link
                  href={buildUrl(currentPage + 1)}
                  className={`px-5 py-2 border text-sm tracking-wide ${
                    currentPage === totalPages
                      ? "pointer-events-none opacity-30"
                      : "hover:border-black"
                  }`}
                >
                  <ChevronRight size={16} />
                </Link>

              </div>
            )}
          </>
        ) : (
          <div className="text-center py-32 border-t border-neutral-200">
            <p className="text-neutral-400 font-serif text-lg">
              No startups found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
