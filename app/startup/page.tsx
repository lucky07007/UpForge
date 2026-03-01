"use client";

import { useState, useMemo, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { SearchBar } from "@/components/search-bar";
import Link from "next/link";
import { Search, BadgeCheck } from "lucide-react";
import type { StartupDirectoryItem } from "@/types/startup";

export default function StartupsPage() {
  const supabase = createClient();

  const [startups, setStartups] = useState<StartupDirectoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchStartups = async () => {
      setLoading(true);
      // OPTIMIZATION: 
      // 1. .order("founded_year") se year-wise short kiya gaya hai.
      // 2. .limit(50) add kiya hai taaki page jaldi load ho aur browser hang na ho.
      const { data, error } = await supabase
        .from("startups")
        .select("*")
        .order("founded_year", { ascending: false }) // Newest startups first
        .order("name", { ascending: true })
        .limit(50); 

      if (!error && data) {
        setStartups(data);
      }

      setLoading(false);
    };

    fetchStartups();
  }, []);

  const filteredStartups = useMemo(() => {
    if (!query) return startups;
    return startups.filter((startup) =>
      startup.name.toLowerCase().includes(query.toLowerCase()) ||
      startup.industry?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, startups]);

  const total = startups.length;

  return (
    <div className="bg-[#FCFCFC] text-[#1A1A1A] font-sans antialiased min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
            Startup Registry
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Search and discover verified Indian startups—sorted by founding year for better insights.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-400">
            <span className="h-px w-12 bg-gray-200" />
            <span>Showing {total} Recent Profiles</span>
            <span className="h-px w-12 bg-gray-200" />
          </div>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-16">
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        {/* Directory Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-3 text-gray-400">
              <div className="h-4 w-4 rounded-full border-2 border-[#1A1A1A] border-t-transparent animate-spin" />
              <span className="text-xs uppercase tracking-widest">Optimizing Registry...</span>
            </div>
          </div>
        ) : filteredStartups.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredStartups.map((startup) => (
              <Link
                key={startup.id}
                href={`/startup/${startup.slug}`}
                className="group"
              >
                <article className="bg-white border border-gray-200 p-6 hover:border-gray-400 transition-all h-full flex flex-col items-center text-center relative">
                  {/* Year Badge for Quick View */}
                  {startup.founded_year && (
                    <div className="absolute top-2 right-2 bg-gray-100 text-[10px] px-2 py-0.5 font-bold rounded-sm">
                      {startup.founded_year}
                    </div>
                  )}

                  {/* Logo or initial */}
                  {startup.logo_url ? (
                    <div className="w-20 h-20 mb-4 flex items-center justify-center border border-gray-100 bg-white p-2 group-hover:border-gray-300 transition-colors">
                      <img
                        src={startup.logo_url}
                        alt={`${startup.name} logo`}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy" // Loading speed improve karne ke liye
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 mb-4 flex items-center justify-center bg-gray-50 border border-gray-100 group-hover:border-gray-300 transition-colors">
                      <span className="text-3xl font-serif text-gray-300">
                        {startup.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Name and verification */}
                  <div className="flex items-center gap-1 justify-center mb-2">
                    <h3 className="font-serif text-lg text-[#1A1A1A] group-hover:text-gray-600 transition-colors line-clamp-1">
                      {startup.name}
                    </h3>
                    <BadgeCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  </div>

                  {/* Short description */}
                  {startup.short_description && (
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                      {startup.short_description}
                    </p>
                  )}

                  {/* Metadata: industry and year */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto">
                    {startup.industry && (
                      <span className="bg-gray-100 px-2 py-1 uppercase tracking-wide">
                        {startup.industry}
                      </span>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-none bg-gray-50/50">
            <Search className="h-6 w-6 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 uppercase tracking-widest text-xs font-medium">No matching entries</p>
          </div>
        )}
      </div>
    </div>
  );
}
