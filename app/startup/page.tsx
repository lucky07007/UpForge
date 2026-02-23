// app/startup/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { SearchBar } from "@/components/search-bar";
import Link from "next/link";
import { Crown, Search, Sparkles } from "lucide-react";
import type { StartupDirectoryItem } from "@/types/startup";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function StartupsPage() {
  const supabase = createClient();

  const [startups, setStartups] = useState<StartupDirectoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchStartups = async () => {
      const { data, error } = await supabase
        .from("startups")
        .select("*")
        .order("name", { ascending: true });

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
      startup.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, startups]);

  const total = startups.length;

  return (
    <div className="relative bg-white text-black min-h-screen">
      <Navbar />
      <main className="relative pt-20">
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-10 bg-black/20 hidden sm:block"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                  UPFORGE · FOUNDER DIRECTORY
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-6">
                Startup <span className="text-gray-500 italic font-medium">Registry.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                Search and discover verified Indian startups—curated for serious founders and investors.
              </p>

              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-black/10" />
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-medium">
                  {total} {total === 1 ? "Startup" : "Startups"} Listed
                </p>
                <div className="h-px w-8 bg-black/10" />
              </div>
            </div>

            {/* Search */}
            <div className="max-w-xl mx-auto mb-12">
              <SearchBar query={query} setQuery={setQuery} />
            </div>

            {/* Directory Grid */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center gap-3 text-gray-400">
                  <div className="h-4 w-4 rounded-full border-2 border-[#1e3a5f] border-t-transparent animate-spin" />
                  <span className="text-sm uppercase tracking-wider">Loading directory...</span>
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
                    <div className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all h-full flex flex-col items-center text-center relative">
                      {startup.is_sponsored && (
                        <div className="absolute top-3 right-3">
                          <Crown className="h-4 w-4 text-[#c6a43f]" />
                        </div>
                      )}

                      {startup.logo_url ? (
                        <img
                          src={startup.logo_url}
                          alt={`${startup.name} logo`}
                          className="h-16 w-16 object-contain rounded-xl bg-white border border-black/5 p-2 mb-3"
                        />
                      ) : (
                        <div className="h-16 w-16 flex items-center justify-center bg-[#1e3a5f]/5 rounded-xl mb-3 border border-black/5">
                          <span className="text-2xl font-semibold text-[#1e3a5f]/30">
                            {startup.name.charAt(0)}
                          </span>
                        </div>
                      )}

                      <h3 className="font-bold text-black group-hover:text-[#1e3a5f] transition-colors line-clamp-1">
                        {startup.name}
                      </h3>

                      {startup.short_description && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {startup.short_description}
                        </p>
                      )}

                      {startup.is_sponsored && (
                        <span className="mt-2 text-[10px] uppercase tracking-wider text-[#c6a43f] font-medium">
                          Sponsored
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-black/10 rounded-2xl bg-white">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-black/5 mb-4">
                  <Search className="h-6 w-6 text-black/20" />
                </div>
                <p className="text-gray-400 uppercase tracking-widest text-xs">
                  No startups found
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Try adjusting your search
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
