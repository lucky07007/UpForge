// app/robots.ts
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [

      // ── GOOGLEBOT ──
      // Most permissive — Googlebot needs JS/CSS access to render pages
      // for Core Web Vitals. Do NOT block /_next/static/ for Googlebot.
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/_next/static/",   // Googlebot needs this to render pages
          "/_next/image/",    // Next.js image optimization endpoint
        ],
        disallow: [
          "/admin/",
          "/api/",
          "/submit/success",
          "/submit/confirm",
          "/verification",

          // Block all URL parameter combinations on the registry.
          // These are filtered/paginated views — duplicate content.
          // Startup profile pages (/startup/[slug]) remain crawlable.
          "/startup?*",
          "/registry?*",

          // Block future /startups hub filtered URLs when that route goes live
          "/startups?*",
        ],
      },

      // ── BINGBOT ──
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow: [
          "/admin/",
          "/api/",
          "/submit/success",
          "/submit/confirm",
          "/verification",
          "/startup?*",
          "/registry?*",
          "/startups?*",
        ],
      },

      // ── AI TRAINING CRAWLERS ──
      // Block OpenAI, Common Crawl, and Anthropic from using
      // your verified startup data as AI training material.
      // This protects the commercial value of your database.
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "ChatGPT-User",
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",          // Common Crawl — used for LLM training
        disallow: ["/"],
      },
      {
        userAgent: "anthropic-ai",
        disallow: ["/"],
      },
      {
        userAgent: "Claude-Web",
        disallow: ["/"],
      },
      {
        userAgent: "cohere-ai",
        disallow: ["/"],
      },

      // ── SEO TOOL BOTS ──
      // Allow crawling for SEO monitoring but rate-limit to protect
      // Supabase from query spikes. These bots ignore crawl-delay
      // in robots.txt but declaring it signals intent.
      {
        userAgent: "AhrefsBot",
        allow: ["/"],
        disallow: [
          "/admin/",
          "/api/",
          "/startup?*",
          "/startups?*",
        ],
      },
      {
        userAgent: "SemrushBot",
        allow: ["/"],
        disallow: [
          "/admin/",
          "/api/",
          "/startup?*",
          "/startups?*",
        ],
      },

      // ── ALL OTHER BOTS ──
      // Permissive default — unknown bots get standard rules
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/admin/",
          "/api/",
          "/submit/success",
          "/submit/confirm",
          "/verification",
          "/startup?*",
          "/registry?*",
          "/startups?*",

          // Block Next.js internals from all non-Googlebot crawlers
          "/_next/",
        ],
      },

    ],

    // ── SITEMAP ──
    // Always www — matches metadataBase in layout.tsx
    sitemap: "https://www.upforge.in/sitemap.xml",
  }
