"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { SearchBar } from "@/components/search-bar";
import Link from "next/link";
import { Search, BadgeCheck, Loader2 } from "lucide-react";
import type { StartupDirectoryItem } from "@/types/startup";

export default function StartupsPage() {
  const supabase = createClient();

  const [startups, setStartups] = useState<StartupDirectoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const ITEMS_PER_PAGE = 12;

  const fetchStartups = useCallback(async (isInitial = false) => {
    setLoading(true);
    const currentOffset = isInitial ? 0 : offset;

    // Fast Fetch Logic: Year-wise sort and range limit
    let supabaseQuery = supabase
      .from("startups")
      .select("*")
      .order("founded_year", { ascending: false, nullsFirst: false })
      .range(currentOffset, currentOffset + ITEMS_PER_PAGE - 1);

    if (query) {
      supabaseQuery = supabaseQuery.ilike('name', `%${query}%`);
    }

    const { data, error } = await supabaseQuery;

    if (!error && data) {
      if (isInitial) {
        setStartups(data);
      } else {
        setStartups((prev) => [...prev, ...data]);
      }
      setHasMore(data.length === ITEMS_PER_PAGE);
      setOffset(currentOffset + data.length);
    }
    setLoading(false);
  }, [offset, query, supabase]);

  useEffect(() => {
    fetchStartups(true);
  }, [query]);

  return (
    <div className="bg-[#FCFCFC] text-[#1A1A1A] font-sans antialiased min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
            Startup Registry
          </h1>
          <p className="text-lg text-gray-600">
            Verified Indian startups, sorted by founding year.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-16">
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {startups.map((startup) => (
            <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
              <article className="bg-white border border-gray-200 p-6 hover:border-black transition-all h-full flex flex-col items-center text-center relative">
                <div className="absolute top-2 right-2 bg-gray-50 px-2 py-1 text-[10px] font-bold border border-gray-100">
                  {startup.founded_year || "N/A"}
                </div>

                <div className="w-20 h-20 mb-4 flex items-center justify-center bg-gray-50 border border-gray-100 overflow-hidden">
                  {startup.logo_url ? (
                    <img src={startup.logo_url} alt={startup.name} className="max-h-full max-w-full object-contain p-2" />
                  ) : (
                    <span className="text-3xl font-serif text-gray-200">{startup.name.charAt(0)}</span>
                  )}
                </div>

                <div className="flex items-center gap-1 mb-2">
                  <h3 className="font-serif text-lg line-clamp-1">{startup.name}</h3>
                  <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                </div>

                <p className="text-[11px] text-gray-400 uppercase tracking-widest mt-auto">
                  {startup.industry || "General"}
                </p>
              </article>
            </Link>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center mt-12">
            <Loader2 className="animate-spin text-gray-400" size={32} />
          </div>
        )}

        {/* Error/Empty State */}
        {!loading && startups.length === 0 && (
          <div className="text-center py-20 border border-dashed border-gray-200">
            <Search className="mx-auto text-gray-200 mb-4" size={48} />
            <p className="text-gray-500 font-serif">Koi startup nahi mila. Please search refresh karein.</p>
          </div>
        )}

        {/* Load More Button (Fixed Tag Error) */}
        {hasMore && !loading && startups.length > 0 && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => fetchStartups()}
              className="px-8 py-3 border border-black text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all font-medium"
            >
              Load More Startups
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
