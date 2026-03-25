// next.config.mjs
/**
 * UPFORGE NEXT.JS CONFIG
 *
 * IMPORTANT CHANGE — Redirects removed:
 * ─────────────────────────────────────────────────────────────────────────────
 * The previous hard redirects (e.g. /registry on .in → .org, /startup on .org → .in)
 * were collapsing SEO authority by preventing Google from building a complete
 * sitemap on either domain.
 *
 * We now use a hreflang / alternates strategy (lib/domain.ts + layout.tsx):
 *   • Both domains serve all routes
 *   • Google is told via hreflang which domain to show for which region
 *   • Internal links use getNavUrl() / getStartupUrl() to stay on the
 *     correct domain — no accidental cross-domain hops for users
 *   • Only the footer provides an explicit "Switch to India / Global" toggle
 *
 * SEO RESULT:
 *   • .in builds authority for Indian queries (Indian founders, Indian unicorns…)
 *   • .org builds authority for global queries (emerging markets, global registry…)
 *   • Google combines link equity from both via hreflang — no duplicate penalty
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vunvjscphatofvsqvofg.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      { protocol: "https", hostname: "images.inc42.com" },
      { protocol: "https", hostname: "assets.inc42.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "www.browserstack.com" },
      { protocol: "https", hostname: "**" },
    ],
  },

  async headers() {
    return [
      // ── Security headers — both domains ─────────────────────────────────
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",        value: "DENY" },
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control",  value: "on" },
        ],
      },

      // ── CORS for API routes ──────────────────────────────────────────────
      // Allows upforge.org to call upforge.in APIs (and vice-versa) without
      // browser CORS errors. Covers both www and bare domains.
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            // NOTE: Access-Control-Allow-Origin does not support comma-separated
            // values in all browsers. Use a middleware-level dynamic origin check
            // for production — this is the permissive dev-safe version.
            // For strict production: set this dynamically in /api/* route handlers
            // by checking the Origin header against an allowlist.
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            // Cache preflight for 2 hours — reduces OPTIONS round-trips
            key: "Access-Control-Max-Age",
            value: "7200",
          },
        ],
      },
    ]
  },

  // ── No redirects ──────────────────────────────────────────────────────────
  // Redirects block intentionally removed.
  // Domain routing is now handled by:
  //   1. lib/domain.ts  — getNavUrl(), getStartupUrl(), getRegistryUrl()
  //   2. app/layout.tsx — hreflang alternates tell Google the right domain
  //   3. Navbar/Footer  — domain-aware links keep users on their domain
  //
  // If you need to add redirects in the future (e.g. legacy URL migrations),
  // add them here WITHOUT domain-switching — only same-domain path changes.

  reactStrictMode: true,
}

export default nextConfig
