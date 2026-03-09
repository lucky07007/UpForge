import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClientLayout } from "@/components/client-layout"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://upforge.in"),

  // ── Title ─────────────────────────────────────────────────────────────────
  title: {
    default: "The Founder Chronicle — India's Greatest Startup Builders 2026 | UpForge",
    template: "%s | UpForge",
  },

  // ── Description ───────────────────────────────────────────────────────────
  description:
    "10 verified stories from the founders behind India's most consequential startups — Zepto, PhysicsWallah, Zomato, Zerodha, Nykaa, OYO, Ola, CRED, Paytm, InternAdda. Independent startup registry. March 2026.",

  // ── Keywords ──────────────────────────────────────────────────────────────
  keywords: [
    "Indian startup founder stories 2026",
    "startup founders India",
    "Indian entrepreneur success story",
    "Aadit Palicha Zepto founder",
    "Alakh Pandey PhysicsWallah founder",
    "Deepinder Goyal Zomato founder",
    "Nithin Kamath Zerodha founder",
    "Falguni Nayar Nykaa founder",
    "Ritesh Agarwal OYO founder",
    "Bhavish Aggarwal Ola founder",
    "Kunal Shah CRED founder",
    "Vijay Shekhar Sharma Paytm founder",
    "Indian startup database",
    "startup registry India",
    "verified Indian startups",
    "Indian unicorns 2026",
    "startup funding India",
    "list your startup India",
    "startup ecosystem India",
    "Indian founders",
    "VC deals India",
    "young startup founders India",
    "bootstrapped unicorn India",
    "first generation entrepreneurs India",
    "best Indian startups 2026",
    "Indian fintech founders",
    "edtech founders India",
    "quick commerce India startup",
    "UpForge founder chronicle",
  ].join(", "),

  // ── Authors ───────────────────────────────────────────────────────────────
  authors: [{ name: "UpForge Editorial", url: "https://upforge.in" }],
  creator: "UpForge",
  publisher: "UpForge",
  category: "Business",

  // ── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: "https://upforge.in",
    languages: { "en-IN": "https://upforge.in" },
  },

  // ── Favicon & Icons ───────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#1C1C1C" },
    ],
  },
  manifest: "/site.webmanifest",

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://upforge.in",
    siteName: "UpForge",
    title: "The Founder Chronicle — India's Greatest Startup Builders 2026 | UpForge",
    description:
      "10 verified stories from the founders behind India's most consequential startups — Zepto, PhysicsWallah, Zomato, Zerodha, Nykaa and more. Free startup registry. March 2026.",
    images: [
      {
        url: "/og/founder-chronicle.png",
        width: 1200,
        height: 630,
        alt: "The Founder Chronicle — India's Greatest Startup Founders 2026 | UpForge",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@upforge_in",
    creator: "@upforge_in",
    title: "The Founder Chronicle — India's Top Startup Founders 2026 | UpForge",
    description:
      "10 verified founder stories — Zepto, PhysicsWallah, Zomato, Zerodha, Nykaa, OYO, Ola, CRED, Paytm, InternAdda. Independent startup registry.",
    images: ["/og/founder-chronicle.png"],
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── MS Tile / Theme ───────────────────────────────────────────────────────
  other: {
    "msapplication-TileColor": "#1C1C1C",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#F3EFE5",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://upforge.in/#website",
      "url": "https://upforge.in",
      "name": "UpForge",
      "description":
        "India's independent startup registry — verified founder profiles, startup data and editorial chronicles.",
      "publisher": { "@id": "https://upforge.in/#organization" },
      "inLanguage": "en-IN",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://upforge.in/startup?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://upforge.in/#organization",
      "name": "UpForge",
      "url": "https://upforge.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://upforge.in/logo.png",
        "width": 200,
        "height": 60,
      },
      "sameAs": [
        "https://twitter.com/upforge_in",
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://upforge.in/#webpage",
      "url": "https://upforge.in",
      "name": "The Founder Chronicle — India's Greatest Startup Builders 2026",
      "isPartOf": { "@id": "https://upforge.in/#website" },
      "about": { "@id": "https://upforge.in/#article" },
      "datePublished": "2026-03-01T00:00:00+05:30",
      "dateModified": "2026-03-08T00:00:00+05:30",
      "description":
        "10 verified stories from the founders behind India's most consequential startups — Zepto, PhysicsWallah, Zomato, Zerodha, Nykaa, OYO, Ola, CRED, Paytm, InternAdda.",
      "inLanguage": "en-IN",
      "breadcrumb": { "@id": "https://upforge.in/#breadcrumb" },
    },
    {
      "@type": "Article",
      "@id": "https://upforge.in/#article",
      "headline": "The Founder Chronicle — India's Greatest Startup Builders 2026",
      "description":
        "10 real stories from the founders behind India's most consequential startups — Zepto, PhysicsWallah, Zomato, Zerodha, Nykaa, OYO, Ola, CRED, Paytm, InternAdda. Verified by UpForge. March 2026.",
      "url": "https://upforge.in",
      "datePublished": "2026-03-01T00:00:00+05:30",
      "dateModified": "2026-03-08T00:00:00+05:30",
      "inLanguage": "en-IN",
      "isPartOf": { "@id": "https://upforge.in/#website" },
      "publisher": { "@id": "https://upforge.in/#organization" },
      "author": { "@id": "https://upforge.in/#organization" },
      "image": {
        "@type": "ImageObject",
        "url": "https://upforge.in/og/founder-chronicle.png",
        "width": 1200,
        "height": 630,
      },
      "about": [
        { "@type": "Person", "name": "Aadit Palicha", "jobTitle": "Co-Founder & CEO, Zepto", "worksFor": { "@type": "Organization", "name": "Zepto" } },
        { "@type": "Person", "name": "Kaivalya Vohra", "jobTitle": "Co-Founder & CTO, Zepto", "worksFor": { "@type": "Organization", "name": "Zepto" } },
        { "@type": "Person", "name": "Alakh Pandey", "jobTitle": "Founder & CEO, PhysicsWallah", "worksFor": { "@type": "Organization", "name": "PhysicsWallah" } },
        { "@type": "Person", "name": "Deepinder Goyal", "jobTitle": "Founder & CEO, Zomato", "worksFor": { "@type": "Organization", "name": "Zomato" } },
        { "@type": "Person", "name": "Nithin Kamath", "jobTitle": "Founder & CEO, Zerodha", "worksFor": { "@type": "Organization", "name": "Zerodha" } },
        { "@type": "Person", "name": "Falguni Nayar", "jobTitle": "Founder & CEO, Nykaa", "worksFor": { "@type": "Organization", "name": "Nykaa" } },
        { "@type": "Person", "name": "Ritesh Agarwal", "jobTitle": "Founder & CEO, OYO", "worksFor": { "@type": "Organization", "name": "OYO" } },
        { "@type": "Person", "name": "Bhavish Aggarwal", "jobTitle": "Co-Founder & CEO, Ola", "worksFor": { "@type": "Organization", "name": "Ola" } },
        { "@type": "Person", "name": "Lucky Tiwari", "jobTitle": "Founder, InternAdda", "worksFor": { "@type": "Organization", "name": "InternAdda" } },
        { "@type": "Person", "name": "Kunal Shah", "jobTitle": "Founder & CEO, CRED", "worksFor": { "@type": "Organization", "name": "CRED" } },
        { "@type": "Person", "name": "Vijay Shekhar Sharma", "jobTitle": "Founder & CEO, Paytm", "worksFor": { "@type": "Organization", "name": "Paytm" } },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://upforge.in/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "UpForge",
          "item": "https://upforge.in",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "The Founder Chronicle",
          "item": "https://upforge.in",
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-background text-foreground flex flex-col min-h-screen antialiased font-sans">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
