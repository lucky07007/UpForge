import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const BASE = "https://www.upforge.org"

  return {
    rules: [
      {
        userAgent: [
          "Googlebot",
          "Googlebot-News",
          "Googlebot-Image",
          "Google-Extended",
          "AdsBot-Google",
        ],
        allow: [
          "/",
          "/startup/",
          "/startups/",
          "/blog/",
          "/ufrn/",
          "/founders/",
          "/indian-unicorns/",
          "/about",
          "/submit",
          "/contact",
          "/sitemap.xml",
        ],
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/private/",
          "/*?preview=",
          "/*?draft=",
          "/*?token=",
        ],
      },

      {
        userAgent: [
          "GPTBot",
          "CCBot",
          "ClaudeBot",
          "PerplexityBot",
          "Amazonbot",
        ],
        allow: [
          "/startup/",
          "/startups/",
          "/blog/",
          "/ufrn/",
          "/founders/",
        ],
        disallow: [
          "/admin/",
          "/api/",
          "/private/",
        ],
      },

      {
        userAgent: "*",
        allow: [
          "/",
        ],
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/private/",
          "/*?preview=",
          "/*?draft=",
          "/*?token=",
        ],
      },
    ],

    sitemap: [
      `${BASE}/sitemap.xml`,
    ],

    host: BASE,
  }
}
