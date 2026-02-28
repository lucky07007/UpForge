// app/page.tsx
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();

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
    <div className="w-full bg-[#FAFAFA] text-[#111111] flex justify-center">
      <div className="w-full max-w-[1280px] px-6 md:px-10 py-16 md:py-24 space-y-32">

        {/* ================= HERO ================= */}
        <section className="text-center space-y-8 max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-tight tracking-tight">
            India’s Structured Public Startup Registry
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            UpForge documents and organizes emerging Indian startups in a
            neutral, structured and publicly accessible format.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/startups"
              className="px-8 py-3 border border-[#111111] text-sm font-medium hover:bg-[#111111] hover:text-white transition-colors"
            >
              Explore Registry
            </Link>

            <Link
              href="/submit"
              className="px-8 py-3 border border-gray-300 text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Submit Startup
            </Link>
          </div>

          <p className="text-xs text-gray-400 pt-2">
            Independent • Neutral • Updated Weekly
          </p>
        </section>


        {/* ================= CREDIBILITY STRIP ================= */}
        <section className="border-y border-gray-200 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-sm">
            <div>
              <p className="font-semibold text-lg">{recent?.length ?? 0}+</p>
              <p className="text-gray-500">Recently Added</p>
            </div>
            <div>
              <p className="font-semibold text-lg">{categories.length}</p>
              <p className="text-gray-500">Industries Covered</p>
            </div>
            <div>
              <p className="font-semibold text-lg">100%</p>
              <p className="text-gray-500">Open Access</p>
            </div>
            <div>
              <p className="font-semibold text-lg">Neutral</p>
              <p className="text-gray-500">Documentation</p>
            </div>
          </div>
        </section>


        {/* ================= WHY WE EXIST ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-serif text-3xl mb-6">Why UpForge Exists</h2>
            <p className="text-[17px] text-gray-600 leading-relaxed">
              India is building thousands of startups every year. Yet structured
              public documentation remains fragmented and inconsistent.
              UpForge exists to organize, archive and present early-stage
              startup information in a clear and standardized format for
              students, researchers, founders and ecosystem participants.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium">Structured Profiles</h3>
              <p className="text-sm text-gray-500">
                Standardized format covering founding year, industry,
                stage and public presence.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Independent Registry</h3>
              <p className="text-sm text-gray-500">
                Informational visibility without promotional bias.
              </p>
            </div>
            <div>
              <h3 className="font-medium">Publicly Accessible</h3>
              <p className="text-sm text-gray-500">
                Designed for open research and ecosystem awareness.
              </p>
            </div>
          </div>
        </section>


        {/* ================= RECENT STARTUPS ================= */}
        <section>
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-10">
            <h2 className="font-serif text-3xl">Recently Added</h2>
            <Link
              href="/startups?recent=true"
              className="text-sm text-[#1C2A39] hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {recent?.map((startup) => (
              <article
                key={startup.id}
                className="bg-white border border-gray-200 p-8 hover:border-gray-400 transition-colors"
              >
                <Link
                  href={`/startup/${startup.slug}`}
                  className="font-serif text-xl text-[#1C2A39] hover:underline"
                >
                  {startup.name}
                </Link>

                <p className="text-sm text-gray-600 mt-4 line-clamp-3 leading-relaxed">
                  {startup.description}
                </p>

                <div className="flex items-center gap-3 mt-6 text-xs text-gray-500">
                  {startup.founded_year && <span>{startup.founded_year}</span>}
                  <span className="bg-gray-100 px-3 py-1 uppercase tracking-wide">
                    {startup.industry}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>


        {/* ================= CATEGORY EXPLORER ================= */}
        <section>
          <h2 className="font-serif text-3xl border-b border-gray-200 pb-4 mb-10">
            Explore by Industry
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/startups?industry=${category
                  .toLowerCase()
                  .replace(/ & /g, "-")
                  .replace(/\s+/g, "-")}`}
                className="block py-4 px-6 bg-white border border-gray-200 text-center text-sm hover:border-gray-400 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>


        {/* ================= STRUCTURED TRANSPARENCY ================= */}
        <section className="border-t border-gray-200 pt-16 max-w-4xl">
          <h2 className="font-serif text-3xl mb-6">
            Built With Structured Transparency
          </h2>
          <p className="text-[17px] text-gray-600 leading-relaxed">
            UpForge presents publicly available and submitted information in a
            standardized registry format. It does not provide investment advice
            or promotional endorsement. The objective is documentation,
            categorization and public awareness.
          </p>
        </section>


        {/* ================= SUBMISSION CTA ================= */}
        <section className="border border-gray-200 bg-white p-12 text-center space-y-6">
          <h2 className="font-serif text-3xl">
            Add Your Startup To The Registry
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Increase structured public visibility and contribute to India’s
            documented startup ecosystem.
          </p>
          <Link
            href="/submit"
            className="inline-block px-8 py-3 border border-[#111111] text-sm font-medium hover:bg-[#111111] hover:text-white transition-colors"
          >
            Submit Startup
          </Link>
        </section>

      </div>
    </div>
  );
}
