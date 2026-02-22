import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UpForge | India’s Independent Founder Registry",
  description:
    "UpForge is a structured public registry of verified founders and startups in India, built for long-term credibility and signal transparency.",
  metadataBase: new URL("https://upforge.in"),
  openGraph: {
    title: "UpForge | India’s Independent Founder Registry",
    description:
      "A structured public registry of verified founders and startups in India.",
    url: "https://upforge.in",
    siteName: "UpForge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "UpForge – India’s Independent Founder Registry",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UpForge | India’s Independent Founder Registry",
    description:
      "A structured public registry of verified founders and startups in India.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://upforge.in",
  },
}

export default async function Home() {
  const supabase = await createClient()

  const { data: sponsorOfWeek } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(1)

  const { data: sponsored } = await supabase
    .from("startups")
    .select("*")
    .eq("is_sponsored", true)
    .order("created_at", { ascending: false })
    .limit(8)

  return (
    <main className="bg-[#0B1420] text-[#EAEAEA]">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-28 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-[#9CA3AF] mb-6">
          Est. 2025 · Public Registry
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
          India’s Independent
          <span className="block">Founder Registry</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-[#9CA3AF] text-lg">
          A structured public registry for verified founders and startups.
          Built for long-term credibility, transparency, and signal integrity.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            href="/apply"
            className="px-8 h-12 flex items-center justify-center bg-[#BFA14A] text-black text-sm uppercase tracking-widest font-medium"
          >
            Apply for Verification
          </Link>

          <Link
            href="/startup"
            className="px-8 h-12 flex items-center justify-center border border-[#1F2937] text-sm uppercase tracking-widest text-[#EAEAEA]"
          >
            Explore Registry
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <p className="text-2xl font-semibold">3,000+</p>
            <p className="text-xs uppercase tracking-widest text-[#9CA3AF] mt-2">
              Verified Startups
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold">10,000+</p>
            <p className="text-xs uppercase tracking-widest text-[#9CA3AF] mt-2">
              Monthly Observers
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold">500+</p>
            <p className="text-xs uppercase tracking-widest text-[#9CA3AF] mt-2">
              Sponsored Profiles
            </p>
          </div>
          <div>
            <p className="text-2xl font-semibold">2025</p>
            <p className="text-xs uppercase tracking-widest text-[#9CA3AF] mt-2">
              Established
            </p>
          </div>
        </div>
      </section>

      {/* SPONSOR OF THE WEEK */}
      {sponsorOfWeek && sponsorOfWeek.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-28">
          <h2 className="text-xs uppercase tracking-[0.4em] text-[#9CA3AF] mb-10">
            Registry Highlight
          </h2>

          <Link href={`/startup/${sponsorOfWeek[0].slug}`}>
            <div className="border border-[#1F2937] p-10 flex flex-col md:flex-row items-center gap-10 hover:border-[#BFA14A] transition">
              <img
                src={sponsorOfWeek[0].logo_url || "/placeholder-logo.svg"}
                alt={sponsorOfWeek[0].name}
                className="h-20 w-20 object-contain"
              />

              <div className="flex-1">
                <h3 className="text-2xl font-medium">
                  {sponsorOfWeek[0].name}
                </h3>

                <p className="text-[#9CA3AF] mt-3 max-w-xl">
                  {sponsorOfWeek[0].short_description ||
                    "Verified startup profile listed within the UpForge public registry."}
                </p>
              </div>

              <div className="text-xs uppercase tracking-widest text-[#BFA14A]">
                View Profile
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* TOP SPONSORED */}
      {sponsored && sponsored.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-32">
          <h2 className="text-xs uppercase tracking-[0.4em] text-[#9CA3AF] mb-10">
            Sponsored Registry Profiles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sponsored.map((startup) => (
              <Link key={startup.id} href={`/startup/${startup.slug}`}>
                <div className="border border-[#1F2937] p-6 h-full hover:border-[#BFA14A] transition">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={startup.logo_url || "/placeholder-logo.svg"}
                      alt={startup.name}
                      className="h-10 w-10 object-contain"
                    />
                    <h3 className="font-medium">{startup.name}</h3>
                  </div>

                  {startup.short_description && (
                    <p className="text-sm text-[#9CA3AF] line-clamp-3">
                      {startup.short_description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* PRINCIPLES */}
      <section className="border-t border-[#1F2937] py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-xs uppercase tracking-[0.4em] text-[#9CA3AF] mb-10">
            Registry Principles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-[#9CA3AF]">
            <p>Verified Identities</p>
            <p>Structured Public Profiles</p>
            <p>Signal Over Noise</p>
            <p>Long-Term Credibility</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1F2937] py-10 text-center text-xs tracking-[0.4em] uppercase text-[#6B7280]">
        UpForge · Independent Registry · India
      </footer>
    </main>
  )
}
