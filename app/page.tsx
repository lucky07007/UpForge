// app/page.tsx
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Metadata } from "next"
import { RegistryMetrics } from "@/components/registry-metrics"
import { RegistryPrinciples } from "@/components/registry-principles"

export const metadata: Metadata = {
  title: "UpForge | India's Independent Founder Registry",
  description: "A structured public registry of verified founders and startups in India, built for long-term credibility and signal transparency.",
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
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UpForge | India's Independent Founder Registry",
    description: "A structured public registry of verified founders and startups in India, built for long-term credibility and signal transparency.",
  },
}

export default async function Home() {
  const supabase = await createClient()

  const { count: verifiedCount } = await supabase
    .from("startups")
    .select("*", { count: "exact", head: true })
    .eq("status", "verified")

  return (
      <div className="bg-[#0B1420] min-h-screen">
        {/* Registry Header */}
        <section className="pt-32 pb-16 px-6 border-b border-[#1E2A3A]">
          <div className="max-w-[1200px] mx-auto">
            <div className="max-w-3xl">
              <span className="text-[#BFA14A] text-xs uppercase tracking-[0.2em] font-medium">
                ESTABLISHED 2025
              </span>
              
              <h1 className="text-5xl md:text-6xl font-light text-[#EAEAEA] mt-6 leading-tight">
                India's Independent
                <span className="block font-medium">Founder Registry</span>
              </h1>
              
              <p className="text-xl text-[#9CA3AF] mt-6 max-w-2xl">
                A structured public registry for verified founders and startups.
                Built for long-term credibility and signal integrity.
              </p>

              <div className="flex gap-4 mt-10">
                <Link href="/apply">
                  <Button className="h-12 px-8 bg-transparent border border-[#BFA14A] text-[#BFA14A] hover:bg-[#BFA14A] hover:text-[#0B1420] transition-all duration-200 text-sm uppercase tracking-[0.1em] font-medium rounded-none">
                    Apply for Verification
                  </Button>
                </Link>
                
                <Link href="/registry">
                  <Button className="h-12 px-8 bg-[#1E2A3A] text-[#EAEAEA] hover:bg-[#2A3747] transition-all duration-200 text-sm uppercase tracking-[0.1em] font-medium rounded-none">
                    Explore Registry
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Registry Principles */}
        <section className="py-24 px-6 border-b border-[#1E2A3A]">
          <div className="max-w-[1200px] mx-auto">
            <RegistryPrinciples />
          </div>
        </section>

        {/* Registry Metrics */}
        <section className="py-24 px-6 border-b border-[#1E2A3A]">
          <div className="max-w-[1200px] mx-auto">
            <RegistryMetrics verifiedCount={verifiedCount || 0} />
          </div>
        </section>

        {/* Verified Entries Preview */}
        <section className="py-24 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-[#EAEAEA] text-2xl font-light">Recent Verifications</h2>
                <p className="text-[#9CA3AF] text-sm mt-2">Newly added founder profiles</p>
              </div>
              <Link 
                href="/registry" 
                className="text-[#BFA14A] text-sm uppercase tracking-[0.2em] hover:opacity-80 transition-opacity"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#1E2A3A]" />
          </div>
        </section>

        {/* CTA - Verification */}
        <section className="py-24 px-6 bg-[#050A12] border-t border-[#1E2A3A]">
          <div className="max-w-[1200px] mx-auto text-center">
            <h2 className="text-[#EAEAEA] text-3xl font-light mb-4">
              Submit for Verification
            </h2>
            <p className="text-[#9CA3AF] text-lg max-w-xl mx-auto mb-10">
              Join India's most structured registry of verified founders and startups.
            </p>
            <Link href="/apply">
              <Button className="h-14 px-10 bg-[#BFA14A] text-[#0B1420] hover:bg-[#D4B55C] transition-all duration-200 text-sm uppercase tracking-[0.2em] font-medium rounded-none">
                Apply for Verification
              </Button>
            </Link>
          </div>
        </section>
      </div>
  )
}
