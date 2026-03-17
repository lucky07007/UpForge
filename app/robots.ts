// app/robots.ts
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",               // Allow full site crawling
          "/_next/static/",  // Required for rendering (JS/CSS)
          "/_next/image/",   // Next.js image optimization
        ],
        disallow: [
          "/admin/",         // Admin dashboard
          "/api/",           // Backend APIs
          "/submit/success", // Form confirmation pages
          "/submit/confirm",
        ],
      },
    ],

    sitemap: "https://www.upforge.in/sitemap.xml",
  }
}
