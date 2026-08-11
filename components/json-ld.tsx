import React from "react";
import type { Startup } from "@/types/startup";

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "UpForge",
    "url": "https://upforge.org",
    "description": "Global Startup Registry & Trust Index",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://upforge.org/registry?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function DataCatalogJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    "name": "UpForge Global Startup Registry",
    "url": "https://upforge.org/registry",
    "description": "Public dataset of verified global startups, founders, sector taxonomy, and trust scores.",
    "dataset": [
      {
        "@type": "Dataset",
        "name": "UpForge Verified Startups",
        "description": "Machine-readable JSON dataset of active global startups.",
        "url": "https://upforge.org/data/startups.json",
        "fileFormat": "application/json",
        "license": "https://creativecommons.org/licenses/by/4.0/"
      },
      {
        "@type": "Dataset",
        "name": "UpForge Sector Taxonomy",
        "description": "Normalized industry sectors and technology clusters.",
        "url": "https://upforge.org/data/sectors.json",
        "fileFormat": "application/json"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function StartupProfileJsonLd({ startup }: { startup: Startup }) {
  const sameAs: string[] = [];
  if (startup.website) sameAs.push(startup.website);
  if (startup.linkedin_url) sameAs.push(startup.linkedin_url);
  if (startup.twitter_url) sameAs.push(startup.twitter_url);

  const orgJsonLd: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": startup.name,
    "url": startup.website || `https://upforge.org/startup/${startup.slug}`,
    "logo": startup.logo_url || undefined,
    "description": startup.description || undefined,
    "foundingDate": startup.founded ? String(startup.founded) : undefined,
    "sameAs": sameAs.length > 0 ? sameAs : undefined,
    "address": startup.location ? {
      "@type": "PostalAddress",
      "addressLocality": startup.location.city,
      "addressRegion": startup.location.state,
      "addressCountry": startup.location.country
    } : undefined
  };

  if (typeof startup.founders === "string" && startup.founders) {
    orgJsonLd.founder = {
      "@type": "Person",
      "name": startup.founders
    };
  }

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": `${startup.name} — UpForge Registry Profile`,
    "mainEntity": orgJsonLd
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://upforge.org"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Registry",
        "item": "https://upforge.org/registry"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": startup.name,
        "item": `https://upforge.org/startup/${startup.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
