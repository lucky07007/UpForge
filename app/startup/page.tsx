"use client";

import { useState, useMemo, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { SearchBar } from "@/components/search-bar";
import Link from "next/link";
import { Crown, Search } from "lucide-react";
import type { StartupDirectoryItem } from "@/types/startup";

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
      {/* Navbar and Footer are now in global layout. Calling them here causes double spacing/rendering */}

      <main className="relative pt-2">
        <section className="pt-4 sm:pt-6 pb-16 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-10 bg-[#c6a43f]/20 hidden sm:block"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c6a43f]">
                  UPFORGE · FOUNDER DIRECTORY
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter leading-[0.9] mb-6 text-slate-900">
                Startup <span className="text-slate-400 italic font-medium">Registry.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Search and discover verified Indian startups—curated for serious founders and investors within the UpForge ecosystem.
              </p>

              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-slate-100" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">
                  {total} {total === 1 ? "Profile" : "Profiles"} Documented
                </p>
                <div className="h-px w-8 bg-slate-100" />
              </div>
            </div>

            {/* Search */}
            <div className="max-w-xl mx-auto mb-12">
              <SearchBar query={query} setQuery={setQuery} />
            </div>

            {/* Directory Grid */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-flex items-center gap-3 text-slate-400">
                  <div className="h-4 w-4 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Accessing Registry...</span>
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
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all h-full flex flex-col items-center text-center relative hover:-translate-y-1">
                      {startup.is_sponsored && (
                        <div className="absolute top-4 right-4">
                          <Crown className="h-4 w-4 text-[#c6a43f]" />
                        </div>
                      )}

                      {startup.logo_url ? (
                        <div className="h-20 w-20 rounded-2xl border border-slate-100 bg-white flex items-center justify-center p-3 mb-4 shadow-sm group-hover:border-[#c6a43f]/30 transition-colors">
                          <img
                            src={startup.logo_url}
                            alt={`${startup.name} logo`}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="h-20 w-20 flex items-center justify-center bg-slate-50 rounded-2xl mb-4 border border-slate-100 group-hover:border-[#c6a43f]/30 transition-colors">
                          <span className="text-3xl font-bold text-slate-200">
                            {startup.name.charAt(0)}
                          </span>
                        </div>
                      )}

                      <h3 className="font-bold text-slate-900 group-hover:text-slate-600 transition-colors line-clamp-1 text-sm uppercase tracking-tight">
                        {startup.name}
                      </h3>

                      {startup.short_description && (
                        <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {startup.short_description}
                        </p>
                      )}

                      {startup.is_sponsored && (
                        <div className="mt-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c6a43f]/5 border border-[#c6a43f]/10">
                          <span className="text-[9px] uppercase tracking-widest text-[#c6a43f] font-black">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-white border border-slate-100 mb-4 shadow-sm">
                  <Search className="h-6 w-6 text-slate-300" />
                </div>
                <p className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">
                  Entry not found in registry
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Please refine your search parameters
                </p>
              </div>
            )}
          </div>
        </section>

        <div className="py-12 text-center text-[10px] tracking-[0.5em] uppercase text-slate-400 font-bold border-t border-slate-100">
          UpForge Intelligence Group · Institutional Grade · 2026
        </div>
      </main>
    </div>
  );
}
