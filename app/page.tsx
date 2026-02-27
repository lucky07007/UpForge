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
      {/* pt-16 accounts for fixed navbar height with minimal extra space */}
      <div className="w-full max-w-[1200px] px-5 md:px-8 pt-16 pb-8 space-y-12">
        
        {/* Hero Section - Fully Centered Alignment */}
        <section className="flex flex-col items-center text-center py-4">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[44px] leading-tight text-[#111111]">
              UpForge
            </h1>
            <p className="font-serif text-xl md:text-2xl text-gray-600 mt-1">
              India's Open Startup Registry
            </p>
            <p className="text-base md:text-[17px] text-gray-700 leading-relaxed mt-5">
              A structured, publicly accessible database documenting emerging Indian startups,
              founders, and early-stage ventures for students, researchers, and the startup ecosystem.
            </p>

            {/* Buttons - Centered */}
            <div className="flex flex-wrap gap-3 justify-center mt-8">
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

            <p className="text-xs text-gray-400 mt-4">
              Updated regularly • Community-submitted • Publicly accessible
            </p>
          </div>
        </section>

        {/* Startup Snapshot - Centered Card Layout */}
        <section className="flex justify-center w-full">
          <div className="w-full max-w-md border border-gray-200 bg-gray-50 p-6">
            <h3 className="font-serif text-xl border-b border-gray-200 pb-2 mb-4 text-center">
              Startup Snapshot
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Startup:</dt>
                <dd className="font-medium text-[#111111]">Nirmaan Energy</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Founded:</dt>
                <dd className="text-[#111111]">2024</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Sector:</dt>
                <dd className="text-[#111111]">ClimateTech / Energy</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Founders:</dt>
                <dd className="text-[#111111]">3</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Location:</dt>
                <dd className="text-[#111111]">Bengaluru</dd>
              </div>
            </dl>
            <div className="mt-5 pt-3 border-t border-gray-200 flex justify-center">
              <Link
                href="/startup/nirmaan-energy"
                className="text-sm text-[#0645AD] hover:underline flex items-center gap-1"
              >
                View Full Entry <ExternalLink className="h-3 w-3" />
              </Link>
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
          <h2 className="font-serif text-2xl border-b border-gray-200 pb-2 mb-6 text-center">
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
        <section className="border-t border-gray-200 pt-8 flex flex-col items-center text-center">
          <h2 className="font-serif text-2xl mb-4">Why UpForge Exists</h2>
          <p className="text-[17px] text-gray-700 leading-relaxed max-w-3xl">
            UpForge documents emerging startups to provide visibility, structured information, 
            and educational exposure for students and early-stage founders. This is a public 
            registry, not a commercial database.
          </p>
        </section>

        {/* Academic Notice */}
        <section className="border-l-4 border-[#0645AD] bg-gray-50 p-5 text-sm text-gray-600">
          <p className="text-center md:text-left">
            Information is based on publicly available or submitted data. Last updated:{' '}
            {new Date().toLocaleDateString('en-IN', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}. 
            UpForge is an independent public registry.
          </p>
        </section>
      </div>
    </div>
  );
}
