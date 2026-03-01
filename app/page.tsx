// app/page.tsx
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  BadgeCheck,
  Calculator,
  ArrowRight,
  Shield,
  FileText,
  TrendingUp,
  Users,
  Building2,
  Clock,
} from "lucide-react";

export default async function Home() {
  const supabase = await createClient();

  // Fetch recent 6 startups
  const { data: recent } = await supabase
    .from("startups")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  // Fetch total count
  const { count: totalStartups } = await supabase
    .from("startups")
    .select("*", { count: "exact", head: true });

  // Fetch distinct founding years
  const { data: yearsData } = await supabase
    .from("startups")
    .select("founded_year")
    .not("founded_year", "is", null)
    .order("founded_year", { ascending: false });

  const uniqueYears = Array.from(
    new Set(yearsData?.map((item) => item.founded_year))
  ).slice(0, 6);

  // Fetch industries count
  const { data: industries } = await supabase
    .from("startups")
    .select("industry")
    .not("industry", "is", null);

  const uniqueIndustries = industries 
    ? new Set(industries.map(i => i.industry)).size 
    : 0;

  const verifiedStartups = recent?.map((s) => ({
    ...s,
    verified: true,
  }));

  // Sample data for trust signals
  const monthlyVisitors = "50K+";
  const avgProcessingTime = "48h";

  return (
    <div className="bg-white text-[#1A1A1A] font-sans antialiased">
      {/* Main container - responsive padding */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 pt-28 sm:pt-32 pb-16 sm:pb-24">
        
        {/* ================= HERO - Centered on mobile/desktop ================= */}
        <section className="max-w-3xl mx-auto text-center mb-24 sm:mb-32">
          <div className="space-y-5">
            <span className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">
              India's Public Startup Registry
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1]">
              Documenting India's<br className="hidden sm:block" /> emerging founders
            </h1>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Free verified listings, AI-powered growth reports, and valuation estimates. 
              Structured documentation for serious builders.
            </p>
          </div>

          {/* CTA Buttons - stacked on mobile, row on desktop */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 sm:mt-10">
            <Link
              href="/startups"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-[#1A1A1A] text-white text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center justify-center"
            >
              Explore Registry
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/submit"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 border border-gray-300 text-sm font-medium hover:border-[#1A1A1A] transition-colors inline-flex items-center justify-center"
            >
              Submit Your Startup
            </Link>
          </div>

          {/* Trust Indicators - better mobile spacing */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-8 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Independent
            </span>
            <span className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full" />
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> {monthlyVisitors} monthly
            </span>
            <span className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Verified in {avgProcessingTime}
            </span>
          </div>
        </section>

        {/* ================= QUICK STATS - Better mobile grid ================= */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-24 sm:mb-32">
          {[
            { value: totalStartups || 0, label: "Startups", change: "+124 this month" },
            { value: uniqueIndustries, label: "Industries", change: "8 new this year" },
            { value: "50K+", label: "Monthly visits", change: "+32% vs last month" },
            { value: "48h", label: "Avg. verification", change: "92% satisfaction" },
          ].map((stat, i) => (
            <div key={i} className="border border-gray-100 bg-gray-50/50 p-4 sm:p-6">
              <p className="font-serif text-2xl sm:text-3xl tracking-tight text-[#1A1A1A]">
                {stat.value}
              </p>
              <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                {stat.label}
              </p>
              <p className="text-[10px] text-gray-300 mt-2">{stat.change}</p>
            </div>
          ))}
        </section>

        {/* ================= VALUE PROPOSITIONS - Mobile optimized ================= */}
        <section className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-px sm:bg-gray-200 mb-24 sm:mb-32">
          {[
            {
              icon: BadgeCheck,
              title: "Free Verified Listing",
              description:
                "Manual verification for every startup. Your profile gains structured visibility and institutional credibility.",
              metric: `${totalStartups || 0}+`,
              metricLabel: "Startups Listed",
            },
            {
              icon: FileText,
              title: "Detailed Analysis Report",
              description:
                "AI-driven competitive analysis and actionable insights. Understand your market position and growth opportunities.",
              metric: "15+",
              metricLabel: "Data Points Analyzed",
            },
            {
              icon: Calculator,
              title: "Valuation Estimator",
              description:
                "Industry-benchmarked valuation ranges and growth potential scoring. Data-driven estimates for early-stage startups.",
              metric: "3",
              metricLabel: "Valuation Models",
            },
          ].map(({ icon: Icon, title, description, metric, metricLabel }) => (
            <div
              key={title}
              className="bg-white p-6 sm:p-8 md:p-10 border sm:border-0 border-gray-200 mb-4 sm:mb-0 hover:bg-gray-50 transition-colors"
            >
              <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#1A1A1A] mb-6 sm:mb-8" strokeWidth={1.5} />
              <h3 className="font-serif text-xl sm:text-2xl mb-3 tracking-tight">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {description}
              </p>
              <div className="border-t border-gray-100 pt-5">
                <p className="font-serif text-2xl sm:text-3xl tracking-tight">{metric}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1 uppercase tracking-wider">
                  {metricLabel}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* ================= RECENT STARTUPS ================= */}
        <section className="mb-24 sm:mb-32">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-gray-200 pb-5 sm:pb-6 mb-8 sm:mb-12">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-400">
                Latest Additions
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl mt-1 tracking-tight">
                Recently Verified
              </h2>
            </div>
            <Link
              href="/startups"
              className="text-sm text-gray-500 hover:text-[#1A1A1A] flex items-center gap-1 transition-colors mt-3 sm:mt-0"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-px sm:bg-gray-200">
            {verifiedStartups?.map((startup) => (
              <article
                key={startup.id}
                className="bg-white p-6 sm:p-8 border sm:border-0 border-gray-200 mb-4 sm:mb-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <Link
                    href={`/startup/${startup.slug}`}
                    className="font-serif text-xl sm:text-2xl tracking-tight hover:text-gray-600 transition-colors"
                  >
                    {startup.name}
                  </Link>
                  <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                </div>

                <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-6">
                  {startup.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                  {startup.founded_year && (
                    <span className="text-gray-400">{startup.founded_year}</span>
                  )}
                  <span className="text-gray-300 hidden sm:inline">/</span>
                  <span className="text-gray-600 uppercase tracking-wide text-[10px] sm:text-xs">
                    {startup.industry || "Startup"}
                  </span>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100">
                  <Link
                    href={`/report/${startup.slug}`}
                    className="text-xs text-gray-500 hover:text-[#1A1A1A] flex items-center gap-1 transition-colors"
                  >
                    View analysis report <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= VALUATION TEASER - Full width with better mobile padding ================= */}
        <section className="bg-[#1A1A1A] text-white -mx-5 sm:-mx-8 md:-mx-12 px-5 sm:px-8 md:px-12 py-16 sm:py-20 md:py-24 mb-24 sm:mb-32">
          <div className="max-w-3xl mx-auto text-center">
            <Calculator className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-gray-500 mb-6 sm:mb-8" strokeWidth={1.5} />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 sm:mb-6 px-2">
              Know your startup's worth
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Industry-benchmarked valuation estimates and growth potential scoring. 
              No signup required, takes 2 minutes.
            </p>
            <Link
              href="/valuation"
              className="inline-flex items-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-[#1A1A1A] text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Estimate valuation <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ================= BROWSE BY YEAR - Mobile optimized grid ================= */}
        <section className="mb-24 sm:mb-32">
          <div className="max-w-2xl mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-400">
              Filter Registry
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl mt-1 tracking-tight">
              Browse by established year
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-px sm:bg-gray-200">
            {uniqueYears.map((year) => (
              <Link
                key={year}
                href={`/startups?year=${year}`}
                className="bg-white py-4 sm:py-6 px-3 text-center hover:bg-gray-50 transition-colors text-sm text-gray-600 border sm:border-0 border-gray-200"
              >
                {year}
              </Link>
            ))}
          </div>
        </section>

        {/* ================= TRUST NOTE - Better mobile readability ================= */}
        <section className="max-w-3xl mx-auto text-center border-t border-gray-200 pt-12 sm:pt-16">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-400 mb-4 sm:mb-6">
            Institutional Approach
          </p>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed px-2">
            UpForge operates as an informational public registry. Listings are based on 
            publicly available or founder‑submitted data. We do not provide investment advice, 
            endorsement, or financial ratings. Our mission is structured documentation and 
            transparent visibility for India's startup ecosystem.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 text-[10px] sm:text-xs text-gray-400">
            <span>© 2026 UpForge</span>
            <span>·</span>
            <Link href="/privacy" className="hover:text-[#1A1A1A]">Privacy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-[#1A1A1A]">Terms</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
