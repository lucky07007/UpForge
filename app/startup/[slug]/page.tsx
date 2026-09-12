import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

import type { Startup } from "@/types/startup";
import { formatFounders } from "@/types/startup";
import { StartupDetail } from "@/components/startup-detail";
import {
  findStartupBySlug,
  fetchAllStartups,
} from "@/lib/google-sheets";
import { generateStartupKeywords } from "@/lib/seo-keywords";
import { StartupProfileJsonLd } from "@/components/json-ld";

const BASE_URL = "https://upforge.org";
const DEFAULT_OG = `${BASE_URL}/og/startup-default.png`;

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Load the build-time/static dataset.
 *
 * This is kept as a fast first lookup, but IMPORTANT:
 * if the startup isn't present here, we fall back to the
 * Google Sheets data layer.
 */
function loadAllStaticStartups(): Startup[] {
  try {
    const jsonPath = path.join(
      process.cwd(),
      "public",
      "data",
      "startups.json"
    );

    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, "utf-8");
      const parsed = JSON.parse(raw);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("[StartupPage] Failed to read startups.json:", error);
  }

  return [];
}

/**
 * Normalize a slug so:
 *
 * Agilemd
 * agilemd
 * AgileMD
 * agile-md
 *
 * can be compared safely.
 */
function normalizeSlug(value: string): string {
  try {
    return decodeURIComponent(value)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  } catch {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
}

/**
 * Find a startup from:
 *
 * 1. Static build JSON
 * 2. Google Sheets live data
 *
 * This is the IMPORTANT fix.
 *
 * Previously the page stopped after #1 and created
 * a fake verified fallback when nothing was found.
 */
async function getStartupBySlug(slug: string): Promise<Startup | null> {
  const target = normalizeSlug(slug);

  // ---------------------------------------------------------
  // 1. Try static build data first
  // ---------------------------------------------------------
  const staticStartups = loadAllStaticStartups();

  let startup =
    staticStartups.find(
      (item) => normalizeSlug(item.slug || "") === target
    ) ??
    staticStartups.find(
      (item) => normalizeSlug(item.name || "") === target
    );

  if (startup) {
    return startup;
  }

  // ---------------------------------------------------------
  // 2. IMPORTANT: fallback to the SAME Google Sheets source
  // used by the Registry page.
  // ---------------------------------------------------------
  try {
    startup = await findStartupBySlug(slug);

    if (startup) {
      return startup;
    }

    // Extra robust lookup in case the slug differs slightly.
    const allSheetStartups = await fetchAllStartups();

    startup =
      allSheetStartups.find(
        (item) => normalizeSlug(item.slug || "") === target
      ) ??
      allSheetStartups.find(
        (item) => normalizeSlug(item.name || "") === target
      ) ??
      allSheetStartups.find(
        (item) =>
          normalizeSlug(item.name || "").replace(/-/g, "") ===
          target.replace(/-/g, "")
      );

    if (startup) {
      return startup;
    }
  } catch (error) {
    console.error(
      "[StartupPage] Google Sheets startup lookup failed:",
      error
    );
  }

  // ---------------------------------------------------------
  // 3. DO NOT fabricate a verified startup.
  // ---------------------------------------------------------
  return null;
}

/**
 * Related startups should also come from the same data source.
 */
async function getRelatedStartups(
  category: string,
  currentSlug: string
) {
  try {
    const startups = await fetchAllStartups();

    const normalizedCurrentSlug = normalizeSlug(currentSlug);
    const normalizedCategory = category.toLowerCase().trim();

    return startups
      .filter((startup) => {
        const sameCategory =
          startup.category?.toLowerCase().trim() === normalizedCategory;

        const differentStartup =
          normalizeSlug(startup.slug || "") !== normalizedCurrentSlug;

        return sameCategory && differentStartup;
      })
      .slice(0, 4)
      .map((startup) => ({
        name: startup.name,
        slug: startup.slug,
        description:
          startup.description_short ||
          startup.description ||
          null,
        logo_url: startup.logo_url,
        category: startup.category,
        website: startup.website,
      }));
  } catch (error) {
    console.error(
      "[StartupPage] Failed to load related startups:",
      error
    );

    return [];
  }
}

export async function generateStaticParams() {
  const startups = loadAllStaticStartups();

  return startups
    .filter((startup) => startup.slug)
    .map((startup) => ({
      slug: startup.slug,
    }));
}

/**
 * Better fallback description for SEO.
 */
function buildDescription(startup: Startup): string {
  const description =
    startup.description_short ||
    startup.description ||
    startup.description_long ||
    "";

  if (description.length > 60) {
    const base = description.slice(0, 200).trimEnd();
    const suffix = startup.ufrn
      ? ` Registry ID: ${startup.ufrn}.`
      : "";

    return `${base}${base.endsWith(".") ? "" : "."}${suffix}`;
  }

  const parts: string[] = [];

  let firstPart = `${startup.name} is a verified startup`;

  if (startup.category) {
    firstPart += ` in the ${startup.category} sector`;
  }

  if (startup.city) {
    firstPart += `, based in ${startup.city}`;
  }

  if (
    startup.country_name &&
    startup.country_name !== startup.city
  ) {
    firstPart += `, ${startup.country_name}`;
  }

  firstPart += ".";

  parts.push(firstPart);

  const founders = formatFounders(startup.founders);

  if (founders) {
    parts.push(`Founded by ${founders}.`);
  }

  if (startup.founded_year) {
    parts.push(`Established ${startup.founded_year}.`);
  }

  if (startup.ufrn) {
    parts.push(`UpForge Registry Number: ${startup.ufrn}.`);
  }

  parts.push("Listed on the UpForge Global Startup Registry.");

  return parts.join(" ");
}

function buildTitle(startup: Startup): string {
  const sector = startup.category ?? "Startup";

  const location = startup.city
    ? `, ${startup.city}`
    : startup.country_name
      ? `, ${startup.country_name}`
      : "";

  const ufrn = startup.ufrn
    ? ` · ${startup.ufrn}`
    : "";

  return `${startup.name} — ${sector}${location}${ufrn} | UpForge Registry`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const startup = await getStartupBySlug(slug);

  /**
   * IMPORTANT:
   * Never create fake metadata for a startup that doesn't exist.
   */
  if (!startup) {
    return {
      title: "Startup Not Found | UpForge Registry",
      description:
        "The requested startup could not be found in the UpForge Global Startup Registry.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalSlug = startup.slug || slug;
  const canonicalUrl =
    `${BASE_URL}/startup/${canonicalSlug}`;

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

  const logoUrl = startup.logo_url?.trim();

  const ogImage =
    logoUrl && /^https?:\/\//i.test(logoUrl)
      ? logoUrl
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
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${startup.name} — UpForge Registry`,
        },
      ],
    },

    other: {
      ...(startup.ufrn
        ? {
            "upforge:registry-id": startup.ufrn,
            "upforge:ufrn-url":
              `${BASE_URL}/verify/${startup.ufrn}`,
          }
        : {}),
    },
  };
}

export default async function StartupPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const startup = await getStartupBySlug(slug);

  /**
   * IMPORTANT:
   * No more fake:
   * "Global"
   * "India"
   * 90/100
   * "verified"
   *
   * if the actual startup isn't found.
   */
  if (!startup) {
    notFound();
  }

  const canonicalSlug = startup.slug || slug;

  const canonicalUrl =
    `${BASE_URL}/startup/${canonicalSlug}`;

  const relatedStartups = startup.category
    ? await getRelatedStartups(
        startup.category,
        canonicalSlug
      )
    : [];

  return (
    <div className="flex flex-col min-h-screen w-full">
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
          <a
            href={`${BASE_URL}/registry`}
            className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
          >
            UpForge Global Startup Registry
          </a>{" "}
          · Verifiable Machine-Readable Ledger ·{" "}
          <a
            href={`${BASE_URL}/submit`}
            className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
          >
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
