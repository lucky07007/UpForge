"use client";

import { useState, useMemo, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { SearchBar } from "@/components/search-bar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { BadgeCheck, ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { StartupDirectoryItem } from "@/types/startup";

export default function StartupsPage() {
  const supabase = createClient();

  const [allStartups, setAllStartups] = useState<StartupDirectoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // 1. Fetch data once (Sorted by Year)
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const { data, error } = await supabase
        .from("startups")
        .select("id, name, slug, logo_url, short_description, founded_year, industry")
        .order("founded_year", { ascending: false, nullsFirst: false });

      if (!error && data) setAllStartups(data);
      setLoading(false);
    }
    loadData();
  }, []);

  // 2. Instant Search Filter (No network lag)
  const filtered = useMemo(() => {
    setCurrentPage(1);
    if (!query) return allStartups;
    return allStartups.filter(s => 
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.industry?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, allStartups]);

  // 3. Client-side Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  return (
    <div className="bg-[#FCFCFC] min-h-screen pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Header Area */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl tracking-tight mb-4">Startup Registry</h1>
          <p className="text-gray-500 max-w-xl mx-auto">India's verified startup database, sorted by year.</p>
        </div>

        {/* Instant Search */}
        <div className="max-w-xl mx-auto mb-16">
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-64" />)}
          </div>
        ) : currentItems.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {currentItems.map((startup) => (
                <Link key={startup.id} href={`/startup/${startup.slug}`} className="group">
                  <article className="bg-white border border-gray-200 p-6 hover:border-black transition-all h-full relative flex flex-col items-center text-center">
                    <span className="absolute top-2 right-2 text-[10px] font-bold text-gray-400">
                      {startup.founded_year || "N/A"}
                    </span>
                    <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gray-50 border border-gray-100 group-hover:scale-105 transition-transform">
                      {startup.logo_url ? (
                        <img src={startup.logo_url} alt={startup.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-2xl font-serif text-gray-200">{startup.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <h3 className="font-serif text-lg line-clamp-1">{startup.name}</h3>
                      <BadgeCheck className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-widest mt-auto">
                      {startup.industry || "General"}
                    </p>
                  </article>
                </Link>
              ))}
            </div>

            {/* Instant Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border rounded-full disabled:opacity-20"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border rounded-full disabled:opacity-20"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-100">
            <Search className="mx-auto text-gray-200 mb-4" size={40} />
            <p className="text-gray-400 font-serif">Afsos! Kuch nahi mila.</p>
          </div>
        )}
      </div>
    </div>
  );
}
