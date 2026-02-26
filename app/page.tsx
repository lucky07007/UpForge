import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Search } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();

  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div className="w-full flex justify-center bg-white">
      <div className="w-full max-w-[1200px] px-6 md:px-10 lg:px-16 py-12 space-y-20">

        {/* HERO */}
        <section className="space-y-6">
          <h1 className="text-[32px] md:text-[42px] lg:text-[48px] font-serif leading-snug max-w-3xl">
            Discover India’s Emerging Founders
          </h1>

          <p className="text-[16px] text-gray-600 max-w-2xl">
            UpForge is an open founder discovery platform documenting early-stage startups across India. Built for students, builders, and curious minds.
          </p>

          {/* Search */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search startups or founders..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 text-[15px] focus:border-[#0645AD] outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-6 pt-2">
            <Link
              href="/startup"
              className="text-[#0645AD] hover:underline text-[15px]"
            >
              Browse Startups
            </Link>

            <Link
              href="/submit"
              className="border border-[#0645AD] text-[#0645AD] px-4 py-2 text-[14px] hover:bg-[#0645AD] hover:text-white transition-colors"
            >
              Submit Startup
            </Link>
          </div>
        </section>

        {/* FEATURED */}
        <section>
          <h2 className="text-[22px] font-serif border-b border-gray-200 pb-2 mb-6">
            Featured This Week
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured?.map((startup) => (
              <div
                key={startup.id}
                className="p-5 border border-gray-200 hover:border-gray-400 transition-colors"
              >
                <Link
                  href={`/startup/${startup.slug}`}
                  className="text-[18px] font-semibold text-[#0645AD] hover:underline"
                >
                  {startup.name}
                </Link>

                <p className="text-gray-600 mt-2 text-[14px] line-clamp-2">
                  {startup.description}
                </p>

                <div className="mt-4 text-[12px] text-gray-500 uppercase tracking-wide">
                  {startup.industry}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ARCHIVE */}
        <section>
          <h2 className="text-[22px] font-serif border-b border-gray-200 pb-2 mb-6">
            Startup Archive by Year
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {["2026", "2025", "2024", "2023", "2022", "2021"].map((year) => (
              <Link
                key={year}
                href={`/startup?year=${year}`}
                className="py-2 px-3 border border-gray-200 text-center text-[14px] hover:border-gray-400 transition-colors"
              >
                {year}
              </Link>
            ))}
          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="border-l-4 border-[#0645AD] bg-gray-50 p-6">
          <h3 className="font-serif text-[18px] font-semibold mb-2">
            Editorial Standards
          </h3>

          <p className="text-gray-600 text-[14px] leading-relaxed max-w-3xl">
            Startup profiles on UpForge are structured using publicly available
            information, founder disclosures, and direct submissions. Our goal is
            to maintain a transparent and structured founder discovery archive.
          </p>
        </section>

      </div>
    </div>
  );
}
