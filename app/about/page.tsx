// app/about/page.tsx
import { Shield, Users, TrendingUp, Award } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  return (
    <div className="relative bg-white text-black min-h-screen">
      <Navbar />
      
      <main className="relative pt-2">
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* HEADER */}
            <div className="max-w-4xl mx-auto text-center mb-20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-10 bg-[#c6a43f]/20 hidden sm:block"></span>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#c6a43f]">
                  UPFORGE REGISTRY
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black tracking-tighter leading-[0.85] mb-8 text-slate-900">
                About <span className="text-slate-400 italic font-medium">UpForge.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
                Upforge is an independent founder registry built to document,
                structure, and elevate emerging Indian startups.
                It is not a media platform. It is not a marketplace.
                It is a public record of serious builders.
              </p>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-3 mt-12">
                <div className="h-px w-12 bg-slate-100" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#c6a43f]" />
                <div className="h-px w-12 bg-slate-100" />
              </div>
            </div>

            {/* STATS BANNER - Trust signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 max-w-5xl mx-auto">
              {[
                { value: "3,200+", label: "Verified Startups" },
                { value: "850+", label: "Sponsored" },
                { value: "15,000+", label: "Monthly Visitors" },
                { value: "2025", label: "Founded" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center group p-8 rounded-[2rem] border border-transparent hover:border-slate-50 hover:bg-slate-50/50 transition-all duration-500">
                  <div className="text-4xl md:text-5xl font-black text-slate-900 group-hover:text-[#c6a43f] transition-colors tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-3">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CORE PRINCIPLES */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-32">
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
                  className="group bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex items-center gap-5 mb-8">
                    <div className="p-4 rounded-2xl bg-slate-50 text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-all duration-500 shadow-sm">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-slate-500 leading-relaxed text-sm font-medium">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CLOSING STATEMENT */}
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-slate-900 mb-8 uppercase">
                This is not a <span className="text-slate-400 italic">Directory.</span>
              </h3>

              <p className="text-slate-500 leading-relaxed text-lg max-w-2xl mx-auto font-medium">
                It is a signal that serious founders are building.
                A structured record of India’s emerging companies.
                A quiet infrastructure layer beneath the ecosystem.
              </p>

              {/* Decorative element */}
              <div className="mt-16 flex justify-center">
                <div className="h-1 w-24 bg-[#c6a43f]/20 rounded-full" />
              </div>
            </div>
          </div>
        </section>

        <div className="py-12 text-center text-[10px] tracking-[0.5em] uppercase text-slate-400 font-bold border-t border-slate-100">
          UpForge Intelligence Group · Institutional Grade · 2026
        </div>
      </main>

      <Footer />
    </div>
  );
}
