import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { Startup } from "@/types/startup"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StartupDetail } from "@/components/startup-detail"

interface PageProps {
  params: Promise<{ slug: string }>
}

/**
 * GENERATE METADATA
 * Optimized for high-level SEO, professional backlinking, and premium social sharing.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: startup } = await supabase
    .from("startups")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!startup) {
    return { 
      title: "Startup Not Found | UpForge Institutional Network",
      description: "The requested startup profile could not be located in the UpForge verified directory."
    }
  }

  const siteTitle = `${startup.name} | Verified Startup Profile`
  const siteDescription = startup.description || `View the official verification and startup profile of ${startup.name} on UpForge.`
  const profileUrl = `https://www.upforge.in/startup/${slug}`

  return {
    title: siteTitle,
    description: siteDescription,
    alternates: {
      canonical: profileUrl,
    },
    openGraph: {
      title: `${startup.name} - UpForge Official Feature`,
      description: siteDescription,
      url: profileUrl,
      siteName: "UpForge Institutional Network",
      images: [
        {
          url: startup.logo_url || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${startup.name} Recognition Cover`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [startup.logo_url || "/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

/**
 * STARTUP PAGE
 * Server-side data fetching with structured data for professional SEO.
 */
export default async function StartupPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: startup } = await supabase
    .from("startups")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!startup) {
    notFound()
  }

  // JSON-LD Structured Data for Search Engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": startup.name,
    "description": startup.description,
    "url": startup.website || `https://www.upforge.in/startup/${slug}`,
    "logo": startup.logo_url,
    "foundingDate": startup.founded_year?.toString(),
    "knowsAbout": startup.category,
    "memberOf": {
      "@type": "Organization",
      "name": "UpForge Institutional Network"
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Inject Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navbar />
      
      <main className="flex-1">
        <StartupDetail startup={startup as Startup} />
      </main>

      <Footer />
    </div>
  )
}
