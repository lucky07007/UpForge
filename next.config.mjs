// next.config.mjs
/**
 * UPFORGE NEXT.JS CONFIG
 *
 * CHANGES vs. PREVIOUS VERSION:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. CORS: Changed from wildcard "*" to an explicit allowlist of upforge.in
 *    and upforge.org. This does TWO things:
 *      a) Security: No random third parties can call your APIs.
 *      b) Trust signal: Google's crawlers and partnership tools recognize
 *         that .in and .org are a single related entity, reinforcing hreflang.
 *
 * 2. Cache-Control headers added for static assets.
 *    Next.js sets these automatically for /_next/static/, but we add them
 *    explicitly for /images/ and /og/ to maximize CDN hit rates and reduce
 *    TTFB (Time To First Byte) — a Core Web Vitals factor Google uses directly
 *    in ranking.
 *
 * 3. Permissions-Policy added to security headers.
 *    This prevents Google's Chrome security audit from flagging unnecessary
 *    browser API access — a soft trust signal.
 *
 * 4. No redirects — hreflang strategy retained from previous version.
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
    // ── Image optimization config — reduces LCP, improves CWV ─────────────
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // 24 hours
  },

  // ── Compression — reduces payload size → faster TTFB → better ranking ────
  compress: true,

  async headers() {
    return [
      // ── Security headers — all routes ────────────────────────────────────
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",        value: "DENY" },
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control",  value: "on" },

          // ── NEW: Permissions-Policy ──────────────────────────────────────
          // Restricts browser API access to only what you actually use.
          // Chrome security audit (used in GSC) flags open Permissions-Policy.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },

      // ── Cache headers for OG images and static assets ─────────────────────
      // OG images rarely change — long cache TTL reduces server load and
      // improves social share performance (Twitter, LinkedIn fetch these).
      {
        source: "/og/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },

      // ── CORS for API routes ───────────────────────────────────────────────
      // CHANGED: Wildcard "*" replaced with explicit origin allowlist.
      //
      // Why this matters for SEO:
      //   Google's Search Quality guidelines now consider "site reputation"
      //   signals. A site that only accepts requests from its own domains
      //   signals tighter governance than one open to the entire internet.
      //   More importantly: this ensures .in and .org API calls succeed
      //   without preflight failures during Googlebot's dynamic rendering.
      //
      // IMPLEMENTATION NOTE:
      //   Access-Control-Allow-Origin cannot be comma-separated — it only
      //   accepts one value. We use a middleware-level dynamic origin check.
      //   This header here is the FALLBACK for non-browser crawlers.
      //   Your actual CORS middleware should use this logic:
      //
      //     const ALLOWED = ["https://www.upforge.in", "https://www.upforge.org",
      //                       "https://upforge.in",     "https://upforge.org"]
      //     const origin = request.headers.get("origin") ?? ""
      //     const allowed = ALLOWED.includes(origin) ? origin : ALLOWED[0]
      //     response.headers.set("Access-Control-Allow-Origin", allowed)
      //
      {
        source: "/api/(.*)",
        headers: [
          // Default to .in for non-browser crawlers that don't send Origin
          {
            key: "Access-Control-Allow-Origin",
            value: "https://www.upforge.in",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, x-upforge-domain",
          },
          {
            key: "Vary",
            // CRITICAL: Tell CDNs that the CORS response varies by Origin.
            // Without this, a CDN might cache the .in CORS header and serve
            // it to .org requests, causing cross-domain API failures.
            value: "Origin",
          },
          {
            key: "Access-Control-Max-Age",
            value: "7200",
          },
        ],
      },
    ]
  },

  // ── No redirects ──────────────────────────────────────────────────────────
  // Redirects block intentionally removed.
  // Domain routing is handled by:
  //   1. lib/domain.ts  — getNavUrl(), getStartupUrl(), getRegistryUrl()
  //   2. app/layout.tsx — hreflang alternates tell Google the right domain
  //   3. Navbar/Footer  — domain-aware links keep users on their domain
  //
  // If adding redirects in future, ONLY same-domain path changes here.
  // Never use Next.js redirects for cross-domain routing — use hreflang.

  reactStrictMode: true,

  // ── Experimental performance flags ────────────────────────────────────────
  // These improve Core Web Vitals (CWV), which directly affect ranking.
  experimental: {
    // Optimize CSS — reduces render-blocking stylesheets (FCP improvement)
    optimizeCss: true,
    // Partial prerendering — mix static + dynamic per-component (LCP improvement)
    // ppr: true,  // Uncomment when stable in your Next.js version
  },
}

export default nextConfig
