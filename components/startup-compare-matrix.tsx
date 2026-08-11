"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X, Plus, Search, Check, ExternalLink, Share2, Copy } from "lucide-react";
import type { Startup } from "@/types/startup";
import { formatFounders } from "@/types/startup";
import { searchEngine } from "@/lib/search-client";

interface StartupCompareMatrixProps {
  initialSlugs: string[];
  allStartups: Startup[];
}

export function StartupCompareMatrix({
  initialSlugs,
  allStartups,
}: StartupCompareMatrixProps) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(
    initialSlugs.slice(0, 4)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchResults, setSearchResults] = useState<Startup[]>([]);

  useEffect(() => {
    searchEngine.loadDataset();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const res = searchEngine.query({ query: searchQuery.trim() });
    // Exclude already selected
    setSearchResults(res.filter((s) => !selectedSlugs.includes(s.slug)).slice(0, 6));
  }, [searchQuery, selectedSlugs]);

  const selectedStartups = selectedSlugs
    .map((slug) => allStartups.find((s) => s.slug === slug))
    .filter(Boolean) as Startup[];

  const addStartup = (slug: string) => {
    if (selectedSlugs.length < 4 && !selectedSlugs.includes(slug)) {
      const next = [...selectedSlugs, slug];
      setSelectedSlugs(next);
      updateUrl(next);
      setIsAdding(false);
      setSearchQuery("");
    }
  };

  const removeStartup = (slug: string) => {
    const next = selectedSlugs.filter((s) => s !== slug);
    setSelectedSlugs(next);
    updateUrl(next);
  };

  const updateUrl = (slugs: string[]) => {
    if (typeof window !== "undefined") {
      const newUrl = slugs.length > 0
        ? `/compare?slugs=${slugs.join(",")}`
        : "/compare";
      window.history.replaceState(null, "", newUrl);
    }
  };

  const copyShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Action bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-card border border-border/80 rounded-3xl p-4 md:p-6 shadow-sm">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 block">
            COMPARISON ENGINE
          </span>
          <h2 className="text-xl font-bold text-foreground">
            Comparing {selectedStartups.length} of 4 Startups
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {selectedSlugs.length < 4 && (
            <button
              type="button"
              onClick={() => setIsAdding(!isAdding)}
              className="inline-flex items-center gap-2 bg-foreground text-background hover:bg-amber-500 hover:text-black rounded-2xl px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Startup
            </button>
          )}

          <button
            type="button"
            onClick={copyShareLink}
            className="inline-flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground border border-border/80 rounded-2xl px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied Link!" : "Share Matrix"}
          </button>
        </div>
      </div>

      {/* Search Modal / Inline Add Selector */}
      {isAdding && (
        <div className="bg-card border border-amber-500/30 rounded-3xl p-6 shadow-md relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Select Startup to Compare
            </h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-muted-foreground hover:text-foreground p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, category, city, or UFRN..."
              className="w-full bg-background border border-border/80 rounded-xl pl-10 pr-4 py-3 text-sm text-foreground focus:outline-none focus:border-amber-500"
              autoFocus
            />
          </div>

          {searchResults.length > 0 && (
            <div className="mt-3 divide-y divide-border/60 bg-background border border-border/80 rounded-2xl max-h-60 overflow-y-auto">
              {searchResults.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => addStartup(s.slug)}
                  className="w-full text-left p-3 hover:bg-muted/50 flex items-center justify-between text-sm transition-colors cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-foreground block">{s.name}</span>
                    <span className="text-xs text-muted-foreground font-serif italic">{s.category} • {s.city || s.country_name || "Global"}</span>
                  </div>
                  <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold">+ Add</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Comparison Grid Table */}
      {selectedStartups.length === 0 ? (
        <div className="bg-card border border-border/80 rounded-3xl p-16 text-center">
          <p className="text-muted-foreground font-serif italic text-lg mb-4">No startups selected for comparison.</p>
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 bg-amber-500 text-black hover:bg-amber-400 rounded-2xl px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Select Startups to Compare
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse bg-card border border-border/80 rounded-3xl overflow-hidden shadow-sm">
            <thead>
              <tr className="border-b border-border/80 bg-muted/30">
                <th className="p-4 text-left font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground w-48">
                  Entity Profile
                </th>
                {selectedStartups.map((s) => (
                  <th key={s.id} className="p-4 text-left border-l border-border/80 relative">
                    <button
                      type="button"
                      onClick={() => removeStartup(s.slug)}
                      className="absolute top-3 right-3 text-muted-foreground hover:text-red-500 p-1 transition-colors"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="pr-6">
                      <h3 className="font-bold text-foreground text-lg leading-tight">{s.name}</h3>
                      <Link
                        href={`/startup/${s.slug}`}
                        className="inline-flex items-center gap-1 font-mono text-[10px] text-amber-600 dark:text-amber-400 hover:underline mt-1"
                      >
                        View Full Profile <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-sm">
              {/* UFRN */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/10">
                  UFRN Identifier
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-border/80 font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                    {s.ufrn || "Pending"}
                  </td>
                ))}
              </tr>

              {/* Trust Score & Status */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/10">
                  Trust Score & Status
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-border/80">
                    {s.verification ? (
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-foreground">
                          {s.verification.score}/100
                        </span>
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          s.verification.status === "verified"
                            ? "bg-green-500/10 text-green-600 border border-green-500/20"
                            : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                        }`}>
                          {s.verification.status}
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground font-serif italic">Unverified</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Category & Sector */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/10">
                  Category / Sector
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-border/80 font-serif">
                    {s.category || s.industry_cluster || "N/A"}
                  </td>
                ))}
              </tr>

              {/* Location */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/10">
                  Location
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-border/80 font-serif">
                    {[s.city || s.location?.city, s.country_name || s.location?.country]
                      .filter(Boolean)
                      .join(", ") || "Global"}
                  </td>
                ))}
              </tr>

              {/* Founded Year */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/10">
                  Founded Year
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-border/80 font-mono text-xs font-bold">
                    {s.founded_year || s.founded || "N/A"}
                  </td>
                ))}
              </tr>

              {/* Business Model */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/10">
                  Business Model
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-border/80 font-serif">
                    {s.business_model || "B2B / SaaS"}
                  </td>
                ))}
              </tr>

              {/* Founders */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/10">
                  Founders
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-border/80 font-serif">
                    {formatFounders(s.founders) || "N/A"}
                  </td>
                ))}
              </tr>

              {/* Website */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/10">
                  Official Website
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-border/80 font-mono text-xs">
                    {s.website ? (
                      <a
                        href={s.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                      >
                        {new URL(s.website).hostname} <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground italic font-serif">N/A</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Provenance Evidence Count */}
              <tr>
                <td className="p-4 font-mono text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/10">
                  Provenance Evidence
                </td>
                {selectedStartups.map((s) => (
                  <td key={s.id} className="p-4 border-l border-border/80 font-mono text-xs">
                    <span className="inline-flex items-center gap-1 text-foreground font-bold">
                      <ShieldCheck className="w-4 h-4 text-amber-500" />
                      {s.provenance ? s.provenance.length : 0} Corroborated Records
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

