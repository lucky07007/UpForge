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
    <div className="w-full flex justify-center bg-white text-[#111111]">
      <div className="w-full max-w-[1080px] px-5 md:px-8 py-12 lg:py-16 space-y-24">

        {/* ================= HERO ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT */}
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[48px] leading-tight tracking-tight">
              UpForge
            </h1>

            <p className="font-serif text-xl md:text-2xl text-gray-700">
              The Public Registry of Emerging Indian Startups
            </p>

            <p className="text-[17px] leading-relaxed text-gray-700 max-w-2xl mx-auto lg:mx-0">
              An independent, structured, and publicly accessible documentation platform 
              recording early-stage Indian startups and founders for students, researchers, 
              and the national startup ecosystem.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="/startups"
                className="px-6 py-2.5 border border-[#111111] text-sm font-medium hover:bg-[#111111] hover:text-white transition-colors"
              >
                Browse Registry
              </Link>

              <Link
                href="/submit"
                className="px-6 py-2.5 border border-gray-300 text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Submit Startup
              </Link>

              <Link
                href="/evaluation"
                className="px-6 py-2.5 border border-gray-300 text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Evaluation Tool
              </Link>
            </div>

            <p className="text-xs text-gray-400">
              Open Access • Community Contributed • Structured Documentation
            </p>
          </div>

          {/* RIGHT - REGISTRY SNAPSHOT */}
          <div className="lg:col-span-4 border-l border-gray-200 pl-8 hidden lg:block">
            <h3 className="font-serif text-lg mb-4">Registry Snapshot</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>Total Startups Listed: {recent?.length ?? 0}+</li>
              <li>Categories Covered: {categories.length}</li>
              <li>Independent & Neutral</li>
              <li>Updated Weekly</li>
            </ul>
          </div>
        </section>


        {/* ================= EVALUATION TOOL SECTION ================= */}
        <section className="border-t border-b border-gray-200 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="space-y-4 text-center lg:text-left">
              <h2 className="font-serif text-2xl">
                Startup Evaluation Tool
              </h2>
              <p className="text-[17px] leading-relaxed text-gray-700">
                Estimate an early-stage startup’s indicative valuation using structured 
                parameters based on publicly available inputs.
              </p>
              <Link
                href="/evaluation"
                className="inline-block px-6 py-2.5 border border-[#111111] text-sm font-medium hover:bg-[#111111] hover:text-white transition-colors"
              >
                Open Evaluation →
              </Link>
            </div>

            {/* Minimal Institutional Chart */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[300px]">
                <svg
                  viewBox="0 0 200 80"
                  className="w-full h-auto stroke-gray-500 fill-none"
                >
                  <line x1="10" y1="70" x2="190" y2="70" stroke="#ccc" strokeWidth="0.5" />
                  <line x1="10" y1="10" x2="10" y2="70" stroke="#ccc" strokeWidth="0.5" />
                  <polyline
                    points="30,60 60,45 90,50 120,30 150,40 180,25"
                    stroke="#0645AD"
                    strokeWidth="1.2"
                  />
                </svg>
                <p className="text-xs text-gray-400 text-center mt-2">
                  Illustrative registry exposure pattern
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ================= RECENT STARTUPS ================= */}
        <section>
          <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-8">
            <h2 className="font-serif text-2xl">Recently Added</h2>
            <Link href="/startups?recent=true" className="text-sm text-[#0645AD] hover:underline">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recent?.map((startup) => (
              <article
                key={startup.id}
                className="border border-gray-200 p-6 hover:border-gray-400 transition-colors"
              >
                <Link
                  href={`/startup/${startup.slug}`}
                  className="font-serif text-xl text-[#0645AD] hover:underline"
                >
                  {startup.name}
                </Link>

                <p className="text-sm text-gray-600 mt-3 line-clamp-3 leading-relaxed">
                  {startup.description}
                </p>

                <div className="flex items-center gap-3 mt-4 text-xs text-gray-500">
                  {startup.founded_year && <span>{startup.founded_year}</span>}
                  <span className="bg-gray-100 px-2 py-0.5 uppercase tracking-wide">
                    {startup.industry}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>


        {/* ================= CATEGORIES ================= */}
        <section>
          <h2 className="font-serif text-2xl border-b border-gray-200 pb-3 mb-8">
            Browse by Category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/startups?industry=${category
                  .toLowerCase()
                  .replace(/ & /g, "-")
                  .replace(/\s+/g, "-")}`}
                className="block py-3 px-4 border border-gray-200 text-center text-sm hover:bg-gray-50 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>


        {/* ================= ABOUT PURPOSE ================= */}
        <section className="border-t border-gray-200 pt-12">
          <h2 className="font-serif text-2xl mb-4">Why UpForge Exists</h2>
          <p className="text-[17px] leading-relaxed text-gray-700 max-w-3xl">
            UpForge exists to document and archive early-stage startups in India 
            in a structured, neutral format. It provides informational visibility 
            rather than investment advice or promotional endorsement.
          </p>
        </section>


        {/* ================= FOOTNOTE ================= */}
        <section className="border-l-4 border-[#0645AD] bg-gray-50 p-6 text-sm text-gray-600">
          <p>
            Information is based on submitted and publicly available data. 
            Last updated{" "}
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}.
            UpForge is an independent public registry.
          </p>
        </section>

      </div>
    </div>
  );
}
