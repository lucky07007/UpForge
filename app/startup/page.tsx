"use client";

import { useState, useMemo, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { SearchBar } from "@/components/search-bar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Search, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import type { StartupDirectoryItem } from "@/types/startup";

export default function StartupsPage() {
  const supabase = createClient();

  const [allStartups, setAllStartups] = useState<StartupDirectoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // 1. Initial Data Fetch (Sorted by Year)
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const { data, error } = await supabase
        .from("startups")
        .select("*")
        .order("founded_year", { ascending: false, nullsFirst: false });

      if (!error && data) {
        setAllStartups(data);
      }
      setLoading(false);
    }
    fetchAll();
  }, []);

  // 2. Instant Search Filter
  const filteredStartups = useMemo(() => {
    setCurrentPage(1); // Search badalne par page 1 par reset karein
    if (!query) return allStartups;
    return allStartups.filter((s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.industry?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, allStartups]);

  // 3. Instant Pagination
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStartups.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredStartups, currentPage]);

  const totalPages = Math.ceil(filteredStartups.length / ITEMS_PER_PAGE);

  return (
    <div className="bg-[#FCFCFC] text-[#1A1A1A] font-sans antialiased min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
            Startup Registry
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Search and discover India's top startups. Sorted by foundation year for relevance.
          </p>
          <div className="mt-6 text-xs text-gray-400 tracking-widest uppercase">
            {filteredStartups.length} Profiles Found
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-16">
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        {/* Grid View */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-[280px] w-full" />
            ))}
          </div>
        ) : paginatedItems.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedItems.map((startup) => (
                <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
                  <article className="bg-white border border-gray-200 p-6 hover:border-black transition-all h-full flex flex-col items-center text-center relative">
                    <div className="absolute top-3 right-3 text-[10px] font-bold bg-gray-50 px-2 py-1 border">
                      {startup.founded_year || "N/A"}
                    </div>

                    <div className="w-20 h-20 mb-6 flex items-center justify-center border border-gray-100 bg-white p-2 group-hover:scale-105 transition-transform duration-300">
                      {startup.logo_url ? (
                        <img src={startup.logo_url} alt={startup.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-3xl font-serif text-gray-200">{startup.name.charAt(0)}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      <h3 className="font-serif text-lg line-clamp-1">{startup.name}</h3>
                      <BadgeCheck className="w-4 h-4 text-blue-600" />
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                      {startup.short_description}
                    </p>

                    <div className="mt-auto pt-4">
                      <span className="text-[10px] border border-gray-200 px-2 py-1 uppercase tracking-widest text-gray-400 group-hover:text-black group-hover:border-black transition-colors">
                        {startup.industry || "General"}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Instant Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-full disabled:opacity-30 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-200 rounded-full disabled:opacity-30 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-100">
            <Search className="h-10 w-10 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-serif">Afsos! Koi match nahi mila.</p>
          </div>
        )}
      </div>
    </div>
  );
}
