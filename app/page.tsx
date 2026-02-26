import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Search } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  
  // Featured logic: Fetching verified featured startups newest first
  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Container scales up to 1440px, but remains liquid */}
      <div className="w-full max-w-[1440px] px-6 md:px-12 lg:px-24 py-12 space-y-32">
        
        {/* Section 1: Hero */}
        <section className="pt-20">
          <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-serif leading-tight max-w-4xl">
            Discover India’s Emerging Founders.
          </h1>
          <p className="text-xl text-gray-500 mt-6 max-w-2xl">
            UpForge is an open founder discovery platform documenting early-stage innovation in India.
          </p>
          <div className="relative max-w-2xl mt-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input type="text" placeholder="Search startups, founders, or years..." 
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-md focus:border-[#0645AD] outline-none text-lg" />
          </div>
        </section>

        {/* Section 2: Featured Startups (Real Data) */}
        <section>
          <h2 className="text-[28px] font-serif border-b border-gray-200 pb-2 mb-8">Featured This Week</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featured?.map((startup) => (
              <div key={startup.id} className="p-6 border border-gray-200 hover:border-gray-400 transition-colors">
                <Link href={`/startup/${startup.slug}`} className="text-xl font-bold text-[#0645AD] hover:underline">
                  {startup.name}
                </Link>
                <p className="text-gray-600 mt-2 line-clamp-2">{startup.description}</p>
                <div className="mt-4 flex gap-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 uppercase tracking-wider">{startup.industry}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Browse by Year (Archive Style) */}
        <section>
          <h2 className="text-[28px] font-serif border-b border-gray-200 pb-2 mb-8">Startup Archive by Year</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {["2026", "2025", "2024", "2023", "2022", "2021"].map((year) => (
              <Link key={year} href={`/startup?year=${year}`} 
                className="py-3 px-4 border border-gray-100 bg-gray-50 text-center font-medium hover:bg-white hover:border-gray-300 transition-all">
                Class of {year}
              </Link>
            ))}
          </div>
        </section>

        {/* Section 4: Academic Verification Notice (Trust Builder) */}
        <section className="bg-gray-50 p-10 border-l-4 border-[#0645AD]">
          <h3 className="font-serif text-xl font-bold mb-4">Verification Standards</h3>
          <p className="text-gray-600 max-w-3xl leading-relaxed">
            Every startup profile in the UpForge Registry undergoes a manual verification process. We confirm MSME registration, founder identity, and operational status to ensure a high-trust database for students and investors.
          </p>
        </section>
      </div>
    </div>
  );
}
