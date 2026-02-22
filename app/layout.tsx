// app/layout.tsx
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "UpForge | India's Independent Founder Registry",
    template: "%s | UpForge",
  },
  description: "A structured public registry of verified founders and startups in India, built for long-term credibility and signal transparency.",
  keywords: ["founder registry", "verified startups", "India founders", "startup verification", "credibility infrastructure"],
  authors: [{ name: "UpForge" }],
  creator: "UpForge",
  publisher: "UpForge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://upforge.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "UpForge | India's Independent Founder Registry",
    description: "A structured public registry of verified founders and startups in India, built for long-term credibility and signal transparency.",
    url: "https://upforge.in",
    siteName: "UpForge",
    images: [
      {
        url: "/og-registry.jpg",
        width: 1200,
        height: 630,
        alt: "UpForge - India's Independent Founder Registry",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UpForge | India's Independent Founder Registry",
    description: "A structured public registry of verified founders and startups in India, built for long-term credibility and signal transparency.",
    images: ["/og-registry.jpg"],
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B1420",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#0B1420]`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "UpForge",
              url: "https://upforge.in",
              logo: "https://upforge.in/logo.png",
              foundingDate: "2025",
              description: "India's Independent Founder Registry",
              areaServed: "India",
              knowsAbout: ["Startup Verification", "Founder Registry", "Credibility Infrastructure"],
              sameAs: [
                "https://twitter.com/upforge_in",
                "https://linkedin.com/company/upforge"
              ]
            })
          }}
        />
      </body>
    </html>
  )
}
