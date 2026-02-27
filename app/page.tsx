// app/page.tsx
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();

  // Fetch recently added startups
  const { data: recent } = await supabase
    .from("startups")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  const categories = [
    "FinTech",
    "EdTech",
    "AI & ML",
    "HealthTech",
    "D2C",
    "SaaS",
    "ClimateTech",
    "Web3",
  ];

  return (
    <div className="w-full flex flex-col items-center bg-white">
      {/* Outer container: only bottom padding, top padding handled by layout */}
      <div className="w-full max-w-[1200px] px-5 md:px-8 pb-8 space-y-16">
        {/* Hero Section - Split Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[44px] leading-tight text-[#111111]">
              
            </h1>
            <p className="font-serif text-xl md:text-2xl text-gray-600 mt-2">
              India's Open Startup Registry
            </p>
            <p className="text-base md:text-[17px] text-gray-700 leading-relaxed mt-5 max-w-2xl mx-auto lg:mx-0">
              A structured, publicly accessible database documenting emerging Indian startups,
              founders, and early-stage ventures for students, researchers, and the startup ecosystem.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-8">
              <Link
                href="/startups"
                className="px-6 py-2.5 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors text-sm font-medium"
              >
                Browse Startups
              </Link>
              <Link
                href="/submit"
                className="px-6 py-2.5 bg-gray-100 text-[#111111] hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Submit Startup
              </Link>
            </div>

            {/* Small meta line */}
            <p className="text-xs text-gray-400 mt-4">
              Updated regularly • Community-submitted • Publicly accessible
            </p>
          </div>

          {/* Right Column - Sponsored Startup Preview */}
          <div className="lg:col-span-5">
            <div className="border border-gray-200 bg-gray-50 p-6">
              <h3 className="font-serif text-xl border-b border-gray-200 pb-2 mb-4">
                Sponsored Startup
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Startup:</dt>
                  <dd className="font-medium text-[#111111]">Internadda</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Founded:</dt>
                  <dd className="text-[#111111]">2020</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Sector:</dt>
                  <dd className="text-[#111111]">EdTech / HR Tech</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Founders:</dt>
                  <dd className="text-[#111111]">2</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Location:</dt>
                  <dd className="text-[#111111]">Delhi</dd>
                </div>
              </dl>
              <div className="mt-5 pt-3 border-t border-gray-200">
                <Link
                  href="/startup/internadda"
                  className="text-sm text-[#0645AD] hover:underline flex items-center gap-1"
                >
                  View Full Entry <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Valuation Tool Integration - With subtle chart */}
        <section className="border border-gray-200 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Text and button */}
            <div>
              <h2 className="font-serif text-2xl mb-2">Estimate Startup Valuation</h2>
              <p className="text-[17px] text-gray-700 leading-relaxed">
                Use our structured evaluation tool to estimate an early-stage startup's 
                indicative market value based on available public data.
              </p>
              <Link
                href="/evaluation"
                className="inline-block mt-5 px-6 py-2.5 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors text-sm font-medium"
              >
                Open Evaluation Tool →
              </Link>
            </div>

            {/* Right: Minimal academic chart */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[280px]">
                <div className="text-xs text-gray-400 mb-2 flex justify-between">
                  <span>Visibility Score</span>
                  <span>← recent</span>
                </div>
                {/* Simple line chart SVG */}
                <svg
                  viewBox="0 0 200 80"
                  className="w-full h-auto stroke-gray-500 stroke-1 fill-none"
                  style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
                >
                  {/* Axes */}
                  <line x1="10" y1="70" x2="190" y2="70" stroke="#ccc" strokeWidth="0.5" />
                  <line x1="10" y1="10" x2="10" y2="70" stroke="#ccc" strokeWidth="0.5" />

                  {/* Data line */}
                  <polyline
                    points="30,60 60,45 90,50 120,30 150,40 180,25"
                    stroke="#0645AD"
                    strokeWidth="1.2"
                    fill="none"
                  />

                  {/* Data points */}
                  <circle cx="30" cy="60" r="2" fill="#0645AD" />
                  <circle cx="60" cy="45" r="2" fill="#0645AD" />
                  <circle cx="90" cy="50" r="2" fill="#0645AD" />
                  <circle cx="120" cy="30" r="2" fill="#0645AD" />
                  <circle cx="150" cy="40" r="2" fill="#0645AD" />
                  <circle cx="180" cy="25" r="2" fill="#0645AD" />

                  {/* Subtle grid lines (optional) */}
                  <line x1="10" y1="50" x2="190" y2="50" stroke="#eee" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="10" y1="30" x2="190" y2="30" stroke="#eee" strokeWidth="0.5" strokeDasharray="2,2" />
                </svg>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Illustrative exposure trend
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recently Added Startups */}
        <section>
          <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-6">
            <h2 className="font-serif text-2xl">Recently Added</h2>
            <Link href="/startups?recent=true" className="text-sm text-[#0645AD] hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent?.map((startup) => (
              <article key={startup.id} className="border border-gray-200 p-5 hover:border-gray-300 transition-colors">
                <Link
                  href={`/startup/${startup.slug}`}
                  className="font-serif text-xl text-[#0645AD] hover:underline"
                >
                  {startup.name}
                </Link>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                  {startup.description}
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs">
                  {startup.founded_year && (
                    <span className="text-gray-500">{startup.founded_year}</span>
                  )}
                  <span className="bg-gray-100 px-2 py-0.5 text-gray-700 uppercase tracking-wider">
                    {startup.industry}
                  </span>
                </div>
              </article>
            ))}
            {(!recent || recent.length === 0) && (
              <p className="text-gray-500 text-sm col-span-3">No startups added recently.</p>
            )}
          </div>
        </section>

        {/* Browse by Category */}
        <section>
          <h2 className="font-serif text-2xl border-b border-gray-200 pb-2 mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/startups?industry=${category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`}
                className="block py-3 px-3 border border-gray-200 text-center text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>

        {/* Why UpForge Exists */}
        <section className="border-t border-gray-200 pt-8">
          <h2 className="font-serif text-2xl mb-4">Why UpForge Exists</h2>
          <p className="text-[17px] text-gray-700 leading-relaxed max-w-3xl">
            UpForge documents emerging startups to provide visibility, structured information, 
            and educational exposure for students and early-stage founders. This is a public 
            registry, not a commercial database.
          </p>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="font-serif text-2xl border-b border-gray-200 pb-2 mb-6">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <span className="text-3xl font-serif text-gray-300">01</span>
              <h3 className="font-medium text-lg mt-2">Startup submits details</h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Founders provide basic information through our structured submission form.
              </p>
            </div>
            <div>
              <span className="text-3xl font-serif text-gray-300">02</span>
              <h3 className="font-medium text-lg mt-2">Information is structured</h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                We format and organize the data according to our registry standards.
              </p>
            </div>
            <div>
              <span className="text-3xl font-serif text-gray-300">03</span>
              <h3 className="font-medium text-lg mt-2">Entry is added to registry</h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                The startup profile becomes publicly accessible in the database.
              </p>
            </div>
          </div>
        </section>

        {/* Academic Notice */}
        <section className="border-l-4 border-[#0645AD] bg-gray-50 p-5 text-sm text-gray-600">
          <p>
            Information is based on publicly available or submitted data. Last updated:{' '}
            {new Date().toLocaleDateString('en-IN', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}. 
            UpForge is an independent public registry. Entries are assigned a unique ID (e.g., UF-2026-0012) for reference.
          </p>
        </section>
      </div>
    </div>
  );
}
