"use client";

import { useState, useMemo, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { SearchBar } from "@/components/search-bar";
import Link from "next/link";
import { Search, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import type { StartupDirectoryItem } from "@/types/startup";

export default function StartupsPage() {
  const supabase = createClient();

  const [startups, setStartups] = useState<StartupDirectoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 12; // Ek baar mein 12 items load honge (Fast loading ke liye)

  useEffect(() => {
    const fetchStartups = async () => {
      setLoading(true);
      
      // Pagination Logic: range(start, end)
      const from = page * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, error } = await supabase
        .from("startups")
        .select("*")
        .order("founded_year", { ascending: false }) // Year-wise Sort
        .range(from, to); // Sirf zaroorat ka data fetch karega

      if (!error && data) {
        setStartups(data);
      }
      setLoading(false);
    };

    fetchStartups();
  }, [page]); // Jab page badlega, naya data load hoga

  // Search logic (Client side for instant feel)
  const filteredStartups = useMemo(() => {
    if (!query) return startups;
    return startups.filter((startup) =>
      startup.name.toLowerCase().includes(query.toLowerCase()) ||
      startup.industry?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, startups]);

  return (
    <div className="bg-[#FCFCFC] text-[#1A1A1A] font-sans antialiased min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
            Startup Registry
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Verified Indian startups sorted by founding year. Discover the next big thing.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        {/* Directory Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 border border-gray-200" />
            ))}
          </div>
        ) : filteredStartups.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredStartups.map((startup) => (
                <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
                  <article className="bg-white border border-gray-200 p-6 hover:border-gray-900 transition-all h-full flex flex-col items-center text-center relative">
                    
                    {/* Year Tag */}
                    <div className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Est. {startup.founded_year || "—"}
                    </div>

                    {/* Logo Section */}
                    <div className="w-20 h-20 mb-6 flex items-center justify-center border border-gray-100 bg-white p-2 group-hover:scale-105 transition-transform">
                      {startup.logo_url ? (
                        <img
                          src={startup.logo_url}
                          alt={startup.name}
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-3xl font-serif text-gray-300">{startup.name.charAt(0)}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      <h3 className="font-serif text-lg group-hover:underline decoration-1 underline-offset-4">
                        {startup.name}
                      </h3>
                      <BadgeCheck className="w-4 h-4 text-blue-600" />
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                      {startup.short_description}
                    </p>

                    <div className="mt-auto">
                      <span className="text-[10px] bg-gray-900 text-white px-2 py-1 uppercase tracking-tighter">
                        {startup.industry || "General"}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-16 flex items-center justify-center gap-8 border-t border-gray-100 pt-8">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex items-center gap-2 text-sm font-medium disabled:opacity-30 hover:text-gray-600"
              >
                <ChevronLeft size={18} /> Previous
              </button>
              <span className="text-sm font-serif">Page {page + 1}</span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={startups.length < ITEMS_PER_PAGE}
                className="flex items-center gap-2 text-sm font-medium disabled:opacity-30 hover:text-gray-600"
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-32 border border-dashed border-gray-200">
             <Search className="h-8 w-8 text-gray-300 mx-auto mb-4" />
             <p className="text-gray-500 font-serif">No startups found in this range.</p>
             <button onClick={() => setPage(0)} className="text-sm text-blue-600 underline mt-2">Back to first page</button>
          </div>
        )}
      </div>
    </div>
  );
}
