import React from "react";
import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { RegistryClientSearch } from "@/components/registry-client-search";
import type { Startup } from "@/types/startup";
import { DataCatalogJsonLd } from "@/components/json-ld";
import SITE_STATS from "@/public/data/stats.json";

const BASE_URL = "https://upforge.org";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    sector?: string;
    country?: string;
    year?: string;
  }>;
}

function loadStaticRegistryData() {
  try {
    const startupsPath = path.join(process.cwd(), "public", "data", "startups.json");
    const sectorsPath = path.join(process.cwd(), "public", "data", "sectors.json");
    const countriesPath = path.join(process.cwd(), "public", "data", "countries.json");

    const startups: Startup[] = fs.existsSync(startupsPath)
      ? JSON.parse(fs.readFileSync(startupsPath, "utf-8"))
      : [];
    const sectors: string[] = fs.existsSync(sectorsPath)
      ? JSON.parse(fs.readFileSync(sectorsPath, "utf-8")).map((s: any) => s.name || s)
      : [];
    const countries: { code: string; name: string }[] = fs.existsSync(countriesPath)
      ? JSON.parse(fs.readFileSync(countriesPath, "utf-8"))
      : [];

    const yearsSet = new Set<number>();
    startups.forEach((s) => {
      const y = s.founded_year || s.founded;
      if (y && y > 1990) yearsSet.add(y);
    });
    const years = Array.from(yearsSet).sort((a, b) => b - a);

    return { startups, sectors, countries, years };
  } catch (err) {
    console.error("Error reading static registry datasets:", err);
    return { startups: [], sectors: [], countries: [], years: [] };
  }
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const q = sp?.q?.trim();
  const sector = sp?.sector?.trim();
  const country = sp?.country?.trim();

  let title = `Global Startup Registry 2026 — Verified Startup Index | UpForge`;
  if (q) title = `"${q}" Search Results — Global Registry | UpForge`;
  else if (sector) title = `${sector} Startups — Global Registry | UpForge`;
  else if (country) title = `${country} Startups — Global Registry | UpForge`;

  return {
    title,
    description: `Browse verified global startups, founder profiles, UFRN credentials, and trust scores on the open UpForge Global Registry.`,
    alternates: {
      canonical: `${BASE_URL}/registry`,
    },
    openGraph: {
      title,
      description: `Browse verified global startups, founder profiles, UFRN credentials, and trust scores.`,
      url: `${BASE_URL}/registry`,
      siteName: "UpForge",
    },
  };
}

export default async function RegistryPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const { startups, sectors, countries, years } = loadStaticRegistryData();

  return (
    <>
      <Navbar />
      <DataCatalogJsonLd />

      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8 pb-6 text-center flex flex-col items-center">
        <div className="glass-panel w-full rounded-3xl p-8 md:p-12 border border-border/80 shadow-md relative overflow-hidden flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-[0.2em]">
              OPEN MACHINE-READABLE LEDGER
            </span>
          </div>

          <h1
            className="text-3xl md:text-[46px] lg:text-[54px] font-bold leading-[1.05] text-foreground mb-3 max-w-3xl tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Global Startup <span className="text-amber-500">Registry</span>
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-serif italic leading-relaxed">
            Discover verified companies, UFRN identifiers, founders, and trust ratings across {SITE_STATS.countryCount}+ countries.
          </p>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs font-mono text-muted-foreground">
            <div>
              <span className="text-foreground font-bold text-base block">{startups.length}</span>
              Tracked Startups
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <span className="text-foreground font-bold text-base block">{sectors.length}</span>
              Sectors
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <span className="text-foreground font-bold text-base block">{countries.length}</span>
              Countries
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Search Component */}
      <RegistryClientSearch
        initialStartups={startups}
        sectors={sectors}
        countries={countries}
        years={years}
        initialQuery={sp?.q}
        initialSector={sp?.sector}
        initialCountry={sp?.country}
        initialYear={sp?.year}
      />
    </>
  );
}
