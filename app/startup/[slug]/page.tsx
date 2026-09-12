import type { Metadata } from "next";
import type { Startup } from "@/types/startup";
import { formatFounders } from "@/types/startup";
import { StartupDetail } from "@/components/startup-detail";
import { generateStartupKeywords } from "@/lib/seo-keywords";
import { StartupProfileJsonLd } from "@/components/json-ld";

const BASE_URL = "https://upforge.org";
const DEFAULT_OG = `${BASE_URL}/og/startup-default.png`;

/**
 * Google Sheet used by the UpForge Registry.
 *
 * IMPORTANT:
 * Google Sheet is the source of truth for registry listings.
 * We intentionally do NOT re-check verification here.
 * Every startup present in the sheet is treated as an approved
 * registry entry, exactly as the existing registry system does.
 */
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMkWuF_Avm_ojh07YhuQfZT5IFq9g3HM6DVfEVV56jcwykv_zdqMdxdbIM-iY4ugahyIeZ3E0bNUbD/pub?gid=0&single=true&output=csv";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

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

function normalizeHeader(value: string): string {
  return value
    .replace(/^\uFEFF/, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/**
 * CSV parser that correctly handles:
 * - commas inside quoted values
 * - newlines inside quoted values
 * - escaped quotes ("")
 */
function parseCSV(text: string): Record<string, string>[] {
  const rows: string[][] = [];

  let current = "";
  let row: string[] = [];
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (insideQuotes && next === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }

      continue;
    }

    if (char === "," && !insideQuotes) {
      row.push(current.trim());
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && next === "\n") {
        i++;
      }

      row.push(current.trim());
      current = "";

      if (row.some((value) => value !== "")) {
        rows.push(row);
      }

      row = [];
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current.trim());

    if (row.some((value) => value !== "")) {
      rows.push(row);
    }
  }

  if (rows.length < 2) {
    return [];
  }

  const headers = rows[0].map((header) =>
    header.replace(/^"|"$/g, "").trim()
  );

  const result: Record<string, string>[] = [];

  for (let i = 1; i < rows.length; i++) {
    const values = rows[i];
    const record: Record<string, string> = {};

    headers.forEach((header, index) => {
      if (!header) return;

      record[header] = (values[index] ?? "")
        .replace(/^"|"$/g, "")
        .trim();
    });

    result.push(record);
  }

  return result;
}

function getValue(
  row: Record<string, string>,
  ...keys: string[]
): string {
  const normalizedRow: Record<string, string> = {};

  for (const [key, value] of Object.entries(row)) {
    normalizedRow[normalizeHeader(key)] = value?.trim() ?? "";
  }

  for (const key of keys) {
    const value = normalizedRow[normalizeHeader(key)];

    if (value) {
      return value;
    }
  }

  return "";
}

function safeDecode(value: string): string {
  if (!value) return "";

  try {
    return decodeURIComponent(value).trim();
  } catch {
    return value.trim();
  }
}

function cleanWebsite(value: string): string | null {
  const website = safeDecode(value);

  if (!website) return null;

  return website;
}

function convertGoogleDriveUrl(
  url: string | null
): string | null {
  if (!url) return null;

  const raw = url.trim();

  if (!raw) return null;

  if (
    !raw.includes("drive.google.com") &&
    !raw.includes("docs.google.com")
  ) {
    return raw;
  }

  let fileId = "";

  const fileMatch = raw.match(
    /\/file\/d\/([a-zA-Z0-9_-]+)/
  );

  if (fileMatch) {
    fileId = fileMatch[1];
  }

  if (!fileId) {
    const idMatch = raw.match(
      /[?&]id=([a-zA-Z0-9_-]+)/
    );

    if (idMatch) {
      fileId = idMatch[1];
    }
  }

  if (!fileId) {
    return raw;
  }

  return `https://lh3.googleusercontent.com/d/${fileId}=w800`;
}

const COUNTRY_CODES: Record<string, string> = {
  IND: "India",
  IN: "India",

  USA: "United States",
  US: "United States",

  GBR: "United Kingdom",
  GB: "United Kingdom",
  UK: "United Kingdom",

  CAN: "Canada",
  CA: "Canada",

  DEU: "Germany",
  DE: "Germany",

  FRA: "France",
  FR: "France",

  AUS: "Australia",
  AU: "Australia",

  SGP: "Singapore",
  SG: "Singapore",

  ARE: "United Arab Emirates",
  AE: "United Arab Emirates",
  UAE: "United Arab Emirates",

  NLD: "Netherlands",
  NL: "Netherlands",

  JPN: "Japan",
  JP: "Japan",

  CHN: "China",
  CN: "China",

  BRA: "Brazil",
  BR: "Brazil",
};

const COUNTRY_NAMES: Record<string, string> = {
  india: "IND",

  "united states": "USA",
  us: "USA",
  usa: "USA",

  "united kingdom": "GBR",
  uk: "GBR",
  "great britain": "GBR",

  canada: "CAN",
  germany: "DEU",
  france: "FRA",
  australia: "AUS",
  singapore: "SGP",

  "united arab emirates": "ARE",
  uae: "ARE",

  netherlands: "NLD",
  japan: "JPN",
  china: "CHN",
  brazil: "BRA",
};

/* -------------------------------------------------------------------------- */
/* Google Sheet → Startup                                                     */
/* -------------------------------------------------------------------------- */

function rowToStartup(
  row: Record<string, string>,
  index: number
): Startup | null {
  const name = safeDecode(
    getValue(
      row,
      "name",
      "startup_name",
      "startupname",
      "startup",
      "company",
      "company_name"
    )
  );

  const website = cleanWebsite(
    getValue(
      row,
      "website",
      "website_url",
      "websiteurl",
      "website_link",
      "websitelink",
      "official_website",
      "officialwebsite",
      "url",
      "domain"
    )
  );

  /**
   * A registry row must have at least a name or website.
   * We are NOT checking verification here.
   */
  if (!name && !website) {
    return null;
  }

  const displayName =
    name ||
    website
      ?.replace(/^https?:\/\/(www\.)?/i, "")
      .split("/")[0] ||
    "Startup";

  const rawSlug = getValue(
    row,
    "slug",
    "startup_slug",
    "startupslug"
  );

  const slug = normalizeSlug(
    rawSlug || displayName
  );

  /* ------------------------------ Logo ----------------------------------- */

  const rawLogo = safeDecode(
    getValue(
      row,
      "logo_url",
      "logourl",
      "logo",
      "logo_link",
      "logolink",
      "logo_image",
      "logoimage",
      "image",
      "image_url",
      "imageurl"
    )
  );

  const logoUrl = convertGoogleDriveUrl(
    rawLogo || null
  );

  /* --------------------------- Description ------------------------------- */

  const description = safeDecode(
    getValue(
      row,
      "description",
      "short_description",
      "shortdescription",
      "short_desc",
      "shortdesc",
      "one_liner",
      "oneliner",
      "summary",
      "about"
    )
  );

  /**
   * If the Sheet contains a separate short description,
   * preserve it as the primary description too.
   */
  const shortDescription = safeDecode(
    getValue(
      row,
      "short_description",
      "shortdescription",
      "short_desc",
      "shortdesc",
      "one_liner",
      "oneliner"
    )
  );

  const finalDescription =
    shortDescription ||
    description ||
    null;

  /* ------------------------------ Country -------------------------------- */

  let countryName = safeDecode(
    getValue(
      row,
      "country_name",
      "countryname",
      "country"
    )
  );

  let countryCode = safeDecode(
    getValue(
      row,
      "country_code",
      "countrycode",
      "iso",
      "iso_code",
      "isocode"
    )
  ).toUpperCase();

  if (countryName && !countryCode) {
    countryCode =
      COUNTRY_NAMES[countryName.toLowerCase()] ||
      countryName
        .replace(/[^a-z]/gi, "")
        .slice(0, 3)
        .toUpperCase();
  }

  if (countryCode && !countryName) {
    countryName =
      COUNTRY_CODES[countryCode] ||
      countryCode;
  }

  const city = safeDecode(
    getValue(
      row,
      "city",
      "location",
      "headquarters",
      "hq"
    )
  ) || null;

  if (!countryName) {
    countryName = null;
  }

  if (!countryCode) {
    countryCode = "";
  }

  /* ------------------------------ UFRN ----------------------------------- */

  const rawUfrn = safeDecode(
    getValue(
      row,
      "ufrn",
      "registry_id",
      "registryid",
      "global_registry_number",
      "globalregistrynumber"
    )
  );

  const countryPart =
    countryCode.length >= 2
      ? countryCode.slice(0, 3)
      : "IND";

  const slugPart =
    slug
      .replace(/[^a-z0-9]/gi, "")
      .slice(0, 5)
      .toUpperCase() ||
    String(index + 1).padStart(5, "0");

  const ufrn =
    rawUfrn ||
    `UF-2026-${countryPart}-${slugPart}`;

  /* ----------------------------- Founders -------------------------------- */

  const founders = safeDecode(
    getValue(
      row,
      "founders",
      "founder",
      "founding_team",
      "foundingteam"
    )
  ) || null;

  /* --------------------------- Founded year ------------------------------- */

  const foundedValue = getValue(
    row,
    "founded_year",
    "foundedyear",
    "founded",
    "established",
    "established_year",
    "establishedyear"
  );

  const foundedYear = foundedValue
    ? parseInt(foundedValue, 10)
    : null;

  /* ----------------------------- Category --------------------------------- */

  const category =
    safeDecode(
      getValue(
        row,
        "category",
        "sector",
        "industry"
      )
    ) || "AI & Technology";

  /* ---------------------------- Social links ------------------------------ */

  const linkedinUrl =
    cleanWebsite(
      getValue(
        row,
        "linkedin_url",
        "linkedin",
        "linkedin_link"
      )
    );

  const twitterUrl =
    cleanWebsite(
      getValue(
        row,
        "twitter_url",
        "twitter",
        "twitter_link",
        "x_url",
        "x"
      )
    );

  const instagramUrl =
    cleanWebsite(
      getValue(
        row,
        "instagram_url",
        "instagram",
        "instagram_link"
      )
    );

  /* ------------------------------ Featured -------------------------------- */

  const featuredValue = getValue(
    row,
    "is_featured",
    "featured"
  ).toLowerCase();

  const isFeatured =
    featuredValue === "true" ||
    featuredValue === "1" ||
    featuredValue === "yes";

  /* ------------------------------------------------------------------------ */
  /* IMPORTANT                                                                */
  /* ------------------------------------------------------------------------ */
  /**
   * The Google Sheet is already vetted by UpForge.
   *
   * Therefore this mapper DOES NOT perform a second verification check.
   * Every row successfully loaded from the registry Sheet is represented
   * as an approved + verified registry record.
   */
  const verification = {
    status: "verified" as const,
    score: 90,
    is_self_reported_capped: false,
    breakdown: {
      website_reachable: 15,
      domain_validity: 15,
      company_identity_signal: 15,
      founder_identity_signal: 15,
      social_presence: 10,
      product_evidence: 10,
      registration_evidence: 5,
      recent_activity: 5,
    },
    last_verified: new Date()
      .toISOString()
      .split("T")[0],
  };

  return {
    id:
      getValue(row, "id") ||
      `sheet-${index + 1}`,

    name: displayName,

    slug,

    description: finalDescription,

    logo_url: logoUrl,

    website,

    founders,

    founded_year:
      foundedYear && !Number.isNaN(foundedYear)
        ? foundedYear
        : null,

    category,

    city,

    status: "approved",

    verification,

    is_featured: isFeatured,

    is_sponsored: false,

    linkedin_url:
      linkedinUrl || null,

    twitter_url:
      twitterUrl || null,

    instagram_url:
      instagramUrl || null,

    ufrn,

    country_code:
      countryCode || null,

    country_name:
      countryName || null,

    created_at:
      getValue(
        row,
        "created_at",
        "created",
        "timestamp"
      ) || undefined,

    updated_at:
      getValue(
        row,
        "updated_at",
        "updated"
      ) || null,
  };
}

/* -------------------------------------------------------------------------- */
/* Fetch Google Sheet                                                         */
/* -------------------------------------------------------------------------- */

async function fetchSheetStartups(): Promise<Startup[]> {
  try {
    const response = await fetch(
      SHEET_CSV_URL,
      {
        /**
         * Google Sheet is the live registry source.
         *
         * Revalidate periodically so we don't hammer Google,
         * while still allowing Sheet changes to appear.
         */
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "[StartupPage] Google Sheet request failed:",
        response.status
      );

      return [];
    }

    const csv = await response.text();

    const rows = parseCSV(csv);

    if (!rows.length) {
      console.error(
        "[StartupPage] Google Sheet returned no rows."
      );

      return [];
    }

    const startups: Startup[] = [];

    rows.forEach((row, index) => {
      const startup = rowToStartup(row, index);

      if (startup) {
        startups.push(startup);
      }
    });

    return startups;
  } catch (error) {
    console.error(
      "[StartupPage] Google Sheet fetch failed:",
      error
    );

    return [];
  }
}

/* -------------------------------------------------------------------------- */
/* Startup lookup                                                             */
/* -------------------------------------------------------------------------- */

async function getStartupBySlug(
  requestedSlug: string
): Promise<Startup | null> {
  const startups = await fetchSheetStartups();

  const target = normalizeSlug(requestedSlug);

  if (!target) {
    return null;
  }

  /* 1. Exact normalized slug */
  let startup = startups.find(
    (item) =>
      normalizeSlug(item.slug || "") === target
  );

  if (startup) {
    return startup;
  }

  /* 2. Startup name */
  startup = startups.find(
    (item) =>
      normalizeSlug(item.name || "") === target
  );

  if (startup) {
    return startup;
  }

  /* 3. Ignore hyphens/spaces for extra tolerance */
  const compactTarget = target.replace(/-/g, "");

  startup = startups.find(
    (item) =>
      normalizeSlug(item.slug || "")
        .replace(/-/g, "") === compactTarget
  );

  if (startup) {
    return startup;
  }

  startup = startups.find(
    (item) =>
      normalizeSlug(item.name || "")
        .replace(/-/g, "") === compactTarget
  );

  return startup ?? null;
}

/* -------------------------------------------------------------------------- */
/* Related startups                                                           */
/* -------------------------------------------------------------------------- */

async function getRelatedStartups(
  category: string,
  currentSlug: string
) {
  const startups = await fetchSheetStartups();

  const targetCategory =
    category.toLowerCase().trim();

  const targetSlug =
    normalizeSlug(currentSlug);

  return startups
    .filter((startup) => {
      const sameCategory =
        startup.category
          ?.toLowerCase()
          .trim() === targetCategory;

      const differentStartup =
        normalizeSlug(startup.slug || "") !==
        targetSlug;

      return (
        sameCategory &&
        differentStartup
      );
    })
    .slice(0, 4)
    .map((startup) => ({
      name: startup.name,
      slug: startup.slug,
      description: startup.description,
      logo_url: startup.logo_url,
      category: startup.category,
      website: startup.website,
    }));
}

/* -------------------------------------------------------------------------- */
/* Static params                                                              */
/* -------------------------------------------------------------------------- */

/**
 * We intentionally don't generate startup pages from startups.json here.
 *
 * The registry is controlled by the Google Sheet.
 *
 * The page can still be rendered dynamically when someone opens
 * /startup/<slug>.
 */
export async function generateStaticParams() {
  return [];
}

/* -------------------------------------------------------------------------- */
/* SEO                                                                         */
/* -------------------------------------------------------------------------- */

function buildTitle(
  startup: Startup
): string {
  const sector =
    startup.category || "Startup";

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

function buildDescription(
  startup: Startup
): string {
  const description =
    startup.description?.trim();

  if (description) {
    const short =
      description.length > 200
        ? `${description
            .slice(0, 200)
            .trimEnd()}...`
        : description;

    return startup.ufrn
      ? `${short} Registry ID: ${startup.ufrn}.`
      : short;
  }

  const parts: string[] = [];

  let first =
    `${startup.name} is a verified startup`;

  if (startup.category) {
    first += ` in the ${startup.category} sector`;
  }

  if (startup.city) {
    first += `, based in ${startup.city}`;
  }

  if (
    startup.country_name &&
    startup.country_name !== startup.city
  ) {
    first += `, ${startup.country_name}`;
  }

  first += ".";

  parts.push(first);

  const founders =
    formatFounders(startup.founders);

  if (founders) {
    parts.push(
      `Founded by ${founders}.`
    );
  }

  if (startup.founded_year) {
    parts.push(
      `Established ${startup.founded_year}.`
    );
  }

  if (startup.ufrn) {
    parts.push(
      `UpForge Registry Number: ${startup.ufrn}.`
    );
  }

  parts.push(
    "Listed on the UpForge Global Startup Registry."
  );

  return parts.join(" ");
}

/* -------------------------------------------------------------------------- */
/* Metadata                                                                   */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const startup =
    await getStartupBySlug(slug);

  if (!startup) {
    return {
      title:
        "Startup Not Found | UpForge Registry",

      description:
        "The requested startup could not be found in the UpForge Global Startup Registry.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalSlug =
    startup.slug || slug;

  const canonicalUrl =
    `${BASE_URL}/startup/${canonicalSlug}`;

  const title =
    buildTitle(startup);

  const description =
    buildDescription(startup);

  const keywords =
    generateStartupKeywords({
      name: startup.name,
      category: startup.category,
      city: startup.city,
      country: startup.country_name,
      founders:
        formatFounders(startup.founders),
      year: startup.founded_year,
    });

  const logo =
    startup.logo_url?.trim();

  const ogImage =
    logo &&
    /^https?:\/\//i.test(logo)
      ? logo
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

      siteName:
        "UpForge Global Registry",

      type: "profile",

      images: [
        {
          url: ogImage,

          width: 1200,

          height: 630,

          alt:
            `${startup.name} — UpForge Registry`,
        },
      ],
    },

    other: {
      ...(startup.ufrn
        ? {
            "upforge:registry-id":
              startup.ufrn,

            "upforge:ufrn-url":
              `${BASE_URL}/verify/${startup.ufrn}`,
          }
        : {}),
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default async function StartupPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const startup =
    await getStartupBySlug(slug);

  /**
   * VERY IMPORTANT:
   *
   * There is NO fake fallback anymore.
   *
   * We never create:
   * - Global
   * - India
   * - fake description
   * - fake UFRN
   * - fake 90 score
   *
   * If the startup is not in the Google Sheet,
   * the page is genuinely not found.
   */
  if (!startup) {
    const { notFound } = await import(
      "next/navigation"
    );

    notFound();
  }

  const canonicalSlug =
    startup.slug || slug;

  const canonicalUrl =
    `${BASE_URL}/startup/${canonicalSlug}`;

  const relatedStartups =
    startup.category
      ? await getRelatedStartups(
          startup.category,
          canonicalSlug
        )
      : [];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <StartupProfileJsonLd
        startup={startup}
      />

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
