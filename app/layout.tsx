// app/layout.tsx
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ClientLayout } from "@/components/client-layout"
import Script from "next/script"

// Body font — clean, fast, legible
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
})

// Display font — matches your parchment/newspaper aesthetic
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
})

// ---------------------------------------------------------------------------
// VIEWPORT
// NOTE: Do NOT set maximumScale — it breaks accessibility (WCAG 1.4.4)
// ---------------------------------------------------------------------------
export const viewport: Viewport = {
  themeColor: "#F3EFE5",
  width: "device-width",
  initialScale: 1,
}

// ---------------------------------------------------------------------------
// GLOBAL METADATA
// CRITICAL: Do NOT set alternates.canonical here.
// Setting it on layout causes EVERY page without its own canonical override
// to point back to the homepage — this is the root cause of your
// "Alternative page with proper canonical tag" errors in Search Console.
// Each page/route sets its own canonical via generateMetadata().
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL("https://www.upforge.in"),

  title: {
    default: "UpForge — India's Verified Startup Registry 2026",
    template: "%s | UpForge",
  },

  description:
    "UpForge is India's independent, verified startup registry. Discover 5000+ Indian startups, founder stories, funding data, and deep-tech insights — all in one place.",

  keywords: [
    // Brand
    "UpForge",
    "UpForge startup registry",
    // Core vertical
    "Indian startup registry",
    "Indian startup database 2026",
    "verified Indian startups",
    "startup directory India",
    // Discovery intent
    "discover Indian startups",
    "Indian unicorn list 2026",
    "funded Indian startups",
    "Indian deep-tech startups",
    "Indian fintech startups",
    "Indian edtech startups",
    // Founder intent
    "Indian startup founders",
    "founder stories India",
    "Indian entrepreneur profiles",
  ],

  authors: [{ name: "UpForge Editorial", url: "https://www.upforge.in" }],
  creator: "UpForge",
  publisher: "UpForge",
  category: "Business",

  // Google Search Console verification
  // Replace the content value with your actual GSC verification token
  verification: {
    google: "g7JT-FIdylY2-2Pq4axQcEP8q_4tuG1fogKPWdWuF1Y",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.upforge.in",
    siteName: "UpForge",
    title: "UpForge — India's Verified Startup Registry 2026",
    description:
      "Discover verified stories and data behind India's most influential startups. The Founder Chronicle — 5000+ startups, funded rounds, and founder profiles.",
    images: [
      {
        url: "https://www.upforge.in/og/founder-chronicle.png",
        width: 1200,
        height: 630,
        alt: "UpForge — India's Startup Registry 2026",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@upforge_in",
    creator: "@upforge_in",
    title: "UpForge — India's Verified Startup Registry 2026",
    description:
      "5000+ Indian startups. Verified founder profiles. The definitive startup registry for the Indian ecosystem.",
    images: ["https://www.upforge.in/og/founder-chronicle.png"],
  },

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
}

// ---------------------------------------------------------------------------
// STRUCTURED DATA (JSON-LD)
// Scope: Site-wide Organization + WebSite nodes only.
// Page-specific schema (BreadcrumbList, Article, etc.) goes in each route.
// SearchAction now correctly targets /startups which is your hub page.
// ---------------------------------------------------------------------------
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.upforge.in/#organization",
  name: "UpForge",
  url: "https://www.upforge.in",
  logo: {
    "@type": "ImageObject",
    "@id": "https://www.upforge.in/#logo",
    url: "https://www.upforge.in/logo.png",
    width: 512,
    height: 512,
    caption: "UpForge",
  },
  description:
    "UpForge is India's independent, verified startup registry and discovery platform.",
  foundingDate: "2024",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  sameAs: [
    "https://twitter.com/upforge_in",
    "https://www.linkedin.com/company/upforge",
  ],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.upforge.in/#website",
  url: "https://www.upforge.in",
  name: "UpForge",
  description: "India's Verified Startup Registry 2026",
  inLanguage: "en-IN",
  publisher: {
    "@id": "https://www.upforge.in/#organization",
  },
  // SearchAction targets your startups hub page.
  // Update the target URL when /startups route is live.
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://www.upforge.in/startups?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
}

// ---------------------------------------------------------------------------
// ROOT LAYOUT
// ---------------------------------------------------------------------------
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {/* WebSite structured data with Sitelinks SearchBox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>

      <body
        className="bg-background text-foreground flex flex-col min-h-screen antialiased font-sans"
      >
        {/*
          Google Ads Conversion Tag (AW-18011511989)
          MOVED to afterInteractive so it does not block paint.
          IMPORTANT: For accurate conversion tracking, fire this tag
          only on your actual conversion confirmation page (e.g. /submit/success),
          not site-wide. Loading it globally wastes budget and skews data.
          If you need GTM for analytics, replace AW- tag with a GTM-XXXXXX
          container and manage all tags inside GTM.
        */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18011511989"
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18011511989', { send_page_view: false });
          `}
        </Script>

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
