// app/about/page.tsx
import { Shield, Users, TrendingUp, Award, BookOpen } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="relative bg-white text-black min-h-screen">
      <Navbar />
      <main className="relative pt-20">
        <section className="py-20 sm:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* HEADER */}
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-10 bg-black/20 hidden sm:block"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                  UPFORGE REGISTRY
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-6">
                About <span className="text-gray-500 italic font-medium">UpForge.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
                Upforge is an independent founder registry built to document,
                structure, and elevate emerging Indian startups.
                It is not a media platform. It is not a marketplace.
                It is a public record of serious builders.
              </p>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-3 mt-12">
                <div className="h-px w-12 bg-black/10" />
                <div className="h-1 w-1 rounded-full bg-[#c6a43f]" />
                <div className="h-px w-12 bg-black/10" />
              </div>
            </div>

            {/* STATS BANNER - Trust signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 max-w-4xl mx-auto">
              {[
                { value: "3,200+", label: "Verified Startups" },
                { value: "850+", label: "Sponsored" },
                { value: "15,000+", label: "Monthly Visitors" },
                { value: "2025", label: "Founded" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <div className="text-4xl md:text-5xl font-black text-[#1e3a5f] group-hover:text-[#c6a43f] transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CORE PRINCIPLES */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {[
                {
                  icon: Users,
                  title: "Built for Builders",
                  desc: "Every listed startup represents independent execution. We prioritize clarity, structured documentation, and long-term visibility over short-term hype.",
                },
                {
                  icon: Shield,
                  title: "Structured Credibility",
                  desc: "Profiles are designed as institutional records — ensuring founders build digital credibility that compounds over time.",
                },
                {
                  icon: TrendingUp,
                  title: "Independent First",
                  desc: "We spotlight founders before headlines do. Discoverability is structured around substance, not social noise.",
                },
                {
                  icon: Award,
                  title: "Long-Term Vision",
                  desc: "Upforge aims to become India’s most trusted independent founder network — defined by quality, structure, and permanence.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white p-8 rounded-2xl border border-black/5 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-[#1e3a5f]/10 text-[#1e3a5f] group-hover:scale-110 transition-transform">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-black">{item.title}</h3>
                  </div>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CLOSING STATEMENT */}
            <div className="mt-32 max-w-4xl mx-auto text-center">
              <div className="relative inline-block">
                <h3 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-black mb-6">
                  This is not a directory.
                </h3>
              </div>

              <p className="text-gray-400 leading-relaxed text-lg max-w-2xl mx-auto">
                It is a signal that serious founders are building.
                A structured record of India’s emerging companies.
                A quiet infrastructure layer beneath the ecosystem.
              </p>

              {/* Decorative element */}
              <div className="mt-12 flex justify-center">
                <div className="h-1 w-20 bg-[#c6a43f]/30 rounded-full" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
