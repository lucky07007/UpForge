import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Search } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();

  // Fetch featured startups (verified, newest first)
  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  // Fetch recently added startups
  const { data: recent } = await supabase
    .from("startups")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  // Static categories (from design brief)
  const categories = [
    "FinTech",
    "AI",
    "EdTech",
    "HealthTech",
    "Climate",
    "SaaS",
    "Consumer",
    "DeepTech",
  ];

  // Static years (archive style)
  const years = ["2026", "2025", "2024", "2023", "2022", "2021"];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Container: max-width 1280px, responsive padding */}
      <div className="w-full max-w-[1280px] px-4 md:px-8 lg:px-16 py-8 space-y-16">
        {/* Section 1: Hero (compact, left-aligned on desktop, centered on mobile) */}
        <section className="text-center md:text-left pt-8">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl mx-auto md:mx-0">
            UpForge
            <span className="block text-2xl md:text-3xl font-normal text-gray-600 mt-2">
              The Public Registry of Emerging Indian Startups
            </span>
          </h1>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto md:mx-0">
            An independent, neutral documentation of early‑stage innovation in India.
            Information is submitted by founders and manually verified where possible.
          </p>

          {/* Search bar */}
          <div className="relative max-w-[600px] mx-auto md:mx-0 mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search startups, founders, or locations..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-sm focus:border-[#0645AD] outline-none text-base"
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-8">
            <Link
              href="/startups"
              className="px-6 py-2 border border-[#0645AD] text-[#0645AD] hover:bg-[#0645AD] hover:text-white transition-colors text-sm font-medium"
            >
              Browse Startups
            </Link>
            <Link
              href="/submit"
              className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              Submit Startup
            </Link>
            <Link
              href="/evaluation"
              className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              Startup Evaluation Tool
            </Link>
          </div>
        </section>

        {/* Section 2: Featured Startups (editorial grid with bottom borders) */}
        <section>
          <h2 className="font-serif text-2xl border-b border-gray-200 pb-2 mb-6">
            Featured Startups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {featured?.map((startup, idx) => (
              <article
                key={startup.id}
                className={`pb-4 ${idx < (featured?.length ?? 0) - 1 ? "border-b border-gray-100" : ""}`}
              >
                <Link
                  href={`/startup/${startup.slug}`}
                  className="text-lg font-serif text-[#0645AD] hover:underline"
                >
                  {startup.name}
                </Link>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {startup.description}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  {startup.founded_year && (
                    <span>{startup.founded_year}</span>
                  )}
                  <span className="bg-gray-100 px-2 py-0.5 uppercase tracking-wider">
                    {startup.industry}
                  </span>
                </div>
              </article>
            ))}
            {(!featured || featured.length === 0) && (
              <p className="text-gray-500 text-sm col-span-3">No featured startups at the moment.</p>
            )}
          </div>
        </section>

        {/* Section 3: Recently Added (simple list format) */}
        <section>
          <h2 className="font-serif text-2xl border-b border-gray-200 pb-2 mb-6">
            Recently Added
          </h2>
          <div className="space-y-4">
            {recent?.map((startup) => (
              <article key={startup.id} className="border-b border-gray-100 pb-3">
                <Link
                  href={`/startup/${startup.slug}`}
                  className="text-base font-serif text-[#0645AD] hover:underline"
                >
                  {startup.name}
                </Link>
                <p className="text-sm text-gray-600 mt-0.5 line-clamp-1">
                  {startup.description}
                </p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span>Added {new Date(startup.created_at).toLocaleDateString("en-IN", { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="bg-gray-100 px-2 py-0.5 uppercase tracking-wider">
                    {startup.industry}
                  </span>
                </div>
              </article>
            ))}
            {(!recent || recent.length === 0) && (
              <p className="text-gray-500 text-sm">No startups have been added recently.</p>
            )}
          </div>
        </section>

        {/* Section 4: Browse by Category */}
        <section>
          <h2 className="font-serif text-2xl border-b border-gray-200 pb-2 mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/startups?industry=${category.toLowerCase()}`}
                className="block py-2 px-3 border border-gray-200 text-center text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>

        {/* Section 5: Archive by Year */}
        <section>
          <h2 className="font-serif text-2xl border-b border-gray-200 pb-2 mb-6">
            Archive by Year
          </h2>
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm">
            {years.map((year, i) => (
              <span key={year}>
                <Link
                  href={`/startups?year=${year}`}
                  className="text-[#0645AD] hover:underline"
                >
                  Class of {year}
                </Link>
                {i < years.length - 1 && <span className="text-gray-300 ml-3">|</span>}
              </span>
            ))}
          </div>
        </section>

        {/* Section 6: Evaluation Tool Integration */}
        <section className="border border-gray-200 p-6">
          <h3 className="font-serif text-xl mb-2">Startup Evaluation Estimator</h3>
          <p className="text-gray-600 text-sm max-w-2xl">
            A neutral, data‑informed indicator of your startup’s visibility and documentation readiness.
            Not a valuation — just an exposure score based on public signals.
          </p>
          <Link
            href="/evaluation"
            className="inline-block mt-4 px-5 py-2 border border-[#0645AD] text-[#0645AD] hover:bg-[#0645AD] hover:text-white transition-colors text-sm font-medium"
          >
            Open Evaluation Tool →
          </Link>
        </section>

        {/* Section 7: Academic Notice (Wikipedia‑style info box) */}
        <section className="border-l-4 border-[#0645AD] bg-gray-50 p-5 text-sm text-gray-600">
          <p>
            UpForge is an independent public registry documenting early‑stage innovation in India.
            Information is submitted by founders and verified manually where possible.
            We do not endorse or guarantee the accuracy of unverified entries.
          </p>
        </section>
      </div>
    </div>
  );
}
