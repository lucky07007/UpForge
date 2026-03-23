// next.config.mjs
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
      {
        // Apply to all routes on both domains
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",        value: "DENY" },
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control",  value: "on" },
        ],
      },
      {
        // CORS for the registry API — allows upforge.org to read upforge.in data
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://www.upforge.org",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // If someone lands on /registry directly on .in, send to .org
      // (handled via middleware rewrite for .org → /registry,
      //  but this covers any accidental direct .in/registry hits)
      {
        source: "/registry/:slug*",
        has: [{ type: "host", value: "www.upforge.in" }],
        destination: "https://www.upforge.org/registry/:slug*",
        permanent: true,
      },
    ];
  },

  reactStrictMode: true,
};

export default nextConfig;
