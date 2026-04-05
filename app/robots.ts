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
          "Amazonbot",
          "Google-Extended",
          "meta-externalagent",
          "Bytespider",
          "Applebot-Extended",
        ],
        disallow: ["/"],
      },
      {
        userAgent: "*",
        allow: ["/"],
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
    sitemap: [`${BASE}/sitemap.xml`],
    host: BASE,
  }
}
