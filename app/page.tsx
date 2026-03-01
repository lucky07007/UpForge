// app/page.tsx
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  BadgeCheck,
  BarChart3,
  Calculator,
  ArrowRight,
  Shield,
  FileText,
  Users,
  TrendingUp,
  Award,
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

  // Fetch total count of startups
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
  ).slice(0, 8);

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

  return (
    <div className="bg-white text-[#1A1A1A] font-sans antialiased">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-16 md:pb-24">
        {/* ================= HERO ================= */}
        <section className="max-w-3xl mx-auto text-center space-y-8 mb-32">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] text-gray-400 font-medium">
              Public Registry · Est. 2025
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.1]">
              India's Startup Registry
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Free verified listings, AI‑powered growth reports, and valuation estimates.
              Structured documentation for India's emerging founders.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/startups"
              className="group px-8 py-4 bg-[#1A1A1A] text-white text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center justify-center"
            >
              Explore Registry
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/submit"
              className="px-8 py-4 border border-gray-300 text-sm font-medium hover:border-[#1A1A1A] transition-colors inline-flex items-center justify-center"
            >
              Submit Your Startup
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 pt-6 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Independent
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Updated Weekly
            </span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <span>Free Access</span>
          </div>
        </section>

        {/* ================= VALUE PROPOSITIONS ================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 mb-32">
          {[
            {
              icon: BadgeCheck,
              title: "Free Verified Listing",
              description:
                "Every startup undergoes manual verification. Your profile gains structured visibility and institutional credibility.",
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
          ].map(({ icon: Icon, title, description, metric, metricLabel }, index) => (
            <div
              key={title}
              className="bg-white p-10 hover:bg-gray-50 transition-colors"
            >
              <Icon className="w-8 h-8 text-[#1A1A1A] mb-8" strokeWidth={1.5} />
              <h3 className="font-serif text-2xl mb-4 tracking-tight">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                {description}
              </p>
              <div className="border-t border-gray-200 pt-6">
                <p className="font-serif text-3xl tracking-tight">{metric}</p>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                  {metricLabel}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* ================= RECENT VERIFIED STARTUPS ================= */}
        <section className="mb-32">
          <div className="flex justify-between items-end border-b border-gray-200 pb-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Latest Additions
              </span>
              <h2 className="font-serif text-3xl mt-2 tracking-tight">
                Recently Verified
              </h2>
            </div>
            <Link
              href="/startups"
              className="text-sm text-gray-500 hover:text-[#1A1A1A] flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {verifiedStartups?.map((startup) => (
              <article
                key={startup.id}
                className="bg-white p-8 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <Link
                    href={`/startup/${startup.slug}`}
                    className="font-serif text-2xl tracking-tight hover:text-gray-600 transition-colors"
                  >
                    {startup.name}
                  </Link>
                  <BadgeCheck className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>

                <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-6">
                  {startup.description}
                </p>

                <div className="flex items-center gap-3 text-xs">
                  {startup.founded_year && (
                    <span className="text-gray-400">{startup.founded_year}</span>
                  )}
                  <span className="text-gray-300">/</span>
                  <span className="text-gray-600 uppercase tracking-wide">
                    {startup.industry || "Startup"}
                  </span>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
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

        {/* ================= PROCESS ================= */}
        <section className="mb-32">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
              How It Works
            </span>
            <h2 className="font-serif text-3xl mt-2 tracking-tight">
              From listing to insights in three steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                step: "01",
                title: "Submit",
                description:
                  "Complete a simple form with your startup's basic information and public presence.",
              },
              {
                step: "02",
                title: "Verification",
                description:
                  "Our team manually reviews your submission to ensure accuracy and authenticity.",
              },
              {
                step: "03",
                title: "Analysis",
                description:
                  "Receive a detailed report with competitor analysis and valuation estimates.",
              },
            ].map(({ step, title, description }) => (
              <div key={step} className="border-t border-gray-200 pt-8">
                <span className="text-sm text-gray-400 font-mono">{step}</span>
                <h3 className="font-serif text-xl mt-3 mb-4 tracking-tight">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= VALUATION ESTIMATOR ================= */}
        <section className="bg-[#1A1A1A] text-white -mx-6 sm:-mx-8 lg:-mx-12 px-6 sm:px-8 lg:px-12 py-24 mb-32">
          <div className="max-w-3xl mx-auto text-center">
            <Calculator className="w-10 h-10 mx-auto text-gray-500 mb-8" strokeWidth={1.5} />
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-6">
              Know your startup's worth
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Industry-benchmarked valuation estimates and growth potential scoring.
              No signup required.
            </p>
            <Link
              href="/valuation"
              className="inline-flex items-center px-8 py-4 bg-white text-[#1A1A1A] text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Estimate valuation <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-600 mt-6">
              Takes approximately 2 minutes
            </p>
          </div>
        </section>

        {/* ================= BROWSE BY YEAR ================= */}
        <section className="mb-32">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
              Filter Registry
            </span>
            <h2 className="font-serif text-3xl mt-2 tracking-tight">
              Browse by established year
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-gray-200">
            {uniqueYears.map((year) => (
              <Link
                key={year}
                href={`/startups?year=${year}`}
                className="bg-white py-6 px-4 text-center hover:bg-gray-50 transition-colors text-sm text-gray-600"
              >
                {year}
              </Link>
            ))}
          </div>
        </section>

        {/* ================= TRUST NOTE ================= */}
        <section className="max-w-2xl mx-auto text-center border-t border-gray-200 pt-16">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">
            Institutional Approach
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            UpForge operates as an informational public registry. Listings are based on 
            publicly available or founder‑submitted data. We do not provide investment advice, 
            endorsement, or financial ratings. Our mission is structured documentation and 
            transparent visibility for India's startup ecosystem.
          </p>
        </section>
      </div>
    </div>
  );
}
