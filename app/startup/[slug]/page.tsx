import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import type { Startup } from "@/types/startup";
import { formatFounders } from "@/types/startup";
import { StartupDetail } from "@/components/startup-detail";
import { generateStartupKeywords } from "@/lib/seo-keywords";
import { StartupProfileJsonLd } from "@/components/json-ld";

const BASE_URL = "https://upforge.org";
const DEFAULT_OG = `${BASE_URL}/og/startup-default.png`;

interface PageProps {
  params: Promise<{ slug: string }>;
}

function loadAllStaticStartups(): Startup[] {
  try {
    const jsonPath = path.join(process.cwd(), "public", "data", "startups.json");
    if (fs.existsSync(jsonPath)) {
      return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    }
  } catch (err) {
    console.error("Error reading startups.json:", err);
  }
  return [];
}

function getStartupBySlug(slug: string): Startup | null {
  const startups = loadAllStaticStartups();
  return startups.find((s) => s.slug === slug) || null;
}

function getRelatedStartups(category: string, currentSlug: string) {
  const startups = loadAllStaticStartups();
  return startups
    .filter((s) => s.slug !== currentSlug && (s.category === category || s.sector_id === category))
    .slice(0, 4)
    .map((s) => ({
      name: s.name,
      slug: s.slug,
      description: s.description,
      logo_url: s.logo_url,
      category: s.category,
    }));
}

export async function generateStaticParams() {
  const startups = loadAllStaticStartups();
  return startups
    .filter((s) => s.slug)
    .map((s) => ({ slug: s.slug }));
}

function slugToName(slug: string): string {
  try {
    return decodeURIComponent(slug)
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  } catch {
    return slug
      .replace(/-/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
}

function buildTitle(startup: Startup): string {
  const sector = startup.category ?? "Startup";
  const location = startup.city
    ? `, ${startup.city}`
    : startup.country_name
    ? `, ${startup.country_name}`
    : "";
  const ufrn = startup.ufrn ? ` · ${startup.ufrn}` : "";
  return `${startup.name} — ${sector}${location}${ufrn} | UpForge Registry`;
}

function buildDescription(startup: Startup): string {
  if (startup.description && startup.description.length > 60) {
    const base = startup.description.slice(0, 200).trimEnd();
    const suffix = startup.ufrn ? ` Registry ID: ${startup.ufrn}.` : "";
    return `${base}${base.endsWith(".") ? "" : "."}${suffix}`;
  }
  const parts: string[] = [];
  parts.push(`${startup.name} is a verified startup`);
  if (startup.category) parts[0] += ` in the ${startup.category} sector`;
  if (startup.city) parts[0] += `, based in ${startup.city}`;
  if (startup.country_name && startup.country_name !== startup.city)
    parts[0] += `, ${startup.country_name}`;
  parts[0] += ".";
  if (startup.founders) parts.push(`Founded by ${startup.founders}.`);
  if (startup.founded_year) parts.push(`Established ${startup.founded_year}.`);
  if (startup.ufrn) parts.push(`UpForge Registry Number: ${startup.ufrn}.`);
  parts.push("Listed on the UpForge Global Startup Registry.");
  return parts.join(" ");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let startup = getStartupBySlug(slug);

  if (!startup) {
    const fallbackName = slugToName(slug);
    startup = {
      id: "index-" + slug,
      name: fallbackName,
      slug,
      description: `${fallbackName} is currently being indexed by the UpForge Global Registry.`,
      category: "Pending Review",
      city: "Global",
      country_name: "Unlisted",
      ufrn: "PENDING-VERIFICATION",
    } as Startup;
  }

  const canonicalUrl = `${BASE_URL}/startup/${slug}`;
  const title = buildTitle(startup);
  const description = buildDescription(startup);
  const keywords = generateStartupKeywords({
    name: startup.name,
    category: startup.category,
    city: startup.city,
    country: startup.country_name,
    founders: formatFounders(startup.founders),
    year: startup.founded_year,
  });
  const ogImage =
    startup.logo_url && startup.logo_url.startsWith("http")
      ? startup.logo_url
      : DEFAULT_OG;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "UpForge Global Registry",
      type: "profile",
      images: [
        { url: ogImage, width: 1200, height: 630, alt: `${startup.name} — UpForge Registry` },
      ],
    },
    other: {
      ...(startup.ufrn && {
        "upforge:registry-id": startup.ufrn,
        "upforge:ufrn-url": `${BASE_URL}/verify/${startup.ufrn}`,
      }),
    },
  };
}

export default async function StartupPage({ params }: PageProps) {
  const { slug } = await params;
  let startup = getStartupBySlug(slug);

  if (!startup) {
    const fallbackName = slugToName(slug);
    startup = {
      id: "index-" + slug,
      name: fallbackName,
      slug,
      description: `${fallbackName} is currently being indexed by the UpForge Global Registry. Full corporate details, verifiable UFRN, and founder metadata will be populated shortly.`,
      category: "Pending Review",
      city: "Global",
      country_name: "Unlisted",
      ufrn: "PENDING-VERIFICATION",
      is_sponsored: false,
      is_featured: false,
    } as Startup;
  }

  const canonicalUrl = `${BASE_URL}/startup/${slug}`;
  const relatedStartups = startup.category
    ? getRelatedStartups(startup.category, slug)
    : [];

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Schema.org Profile Structured Data */}
      <StartupProfileJsonLd startup={startup} />

      <main className="flex-1 w-full">
        <StartupDetail
          startup={startup}
          relatedStartups={relatedStartups}
          profileUrl={canonicalUrl}
        />
      </main>

      <footer className="border-t border-border/80 bg-muted/20 py-6 px-4 text-center text-xs text-muted-foreground font-serif">
        <p className="line-relaxed">
          Listed on the{" "}
          <a href={`${BASE_URL}/registry`} className="text-amber-600 dark:text-amber-400 font-bold hover:underline">
            UpForge Global Startup Registry
          </a>{" "}
          · Verifiable Machine-Readable Ledger ·{" "}
          <a href={`${BASE_URL}/submit`} className="text-amber-600 dark:text-amber-400 font-bold hover:underline">
            Submit Startup →
          </a>
        </p>
        {startup.ufrn && (
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">
            UFRN: {startup.ufrn}
          </p>
        )}
      </footer>
    </div>
  );
}
