// app/sponsor/page.tsx
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Crown,
  Sparkles,
  TrendingUp,
  Users,
  Instagram,
  Twitter,
  Linkedin,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsor Your Startup | UpForge",
  description:
    "Increase your startup's visibility with UpForge sponsorship. Get featured in our Top 10, daily social media posts, and more.",
};

export default async function SponsorPage() {
  const supabase = await createClient();

  // Fetch featured startups to showcase
  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(6);

  const pricingPlans = [
    {
      name: "Trial",
      duration: "1 Day",
      price: "49",
      description: "Ideal for an immediate visibility spike.",
      features: ["Featured in Top 10 for 24 hours", "1 institutional social post", "Standard analytics"],
      highlighted: false,
      cta: "Start Trial",
    },
    {
      name: "Weekly",
      duration: "1 Week",
      price: "199",
      description: "Maximum ecosystem impact.",
      features: [
        "Featured in Top 10 for 7 days",
        "Daily social media features",
        "Premium insight analytics",
        "Priority registry support",
      ],
      highlighted: true,
      cta: "Sponsor Now",
    },
    {
      name: "Monthly",
      duration: "1 Month",
      price: "499",
      description: "Long-term legacy and authority.",
      features: [
        "Featured in Top 10 for 30 days",
        "Daily social media features",
        "Full-suite growth analytics",
        "Concierge registry support",
        "Exclusive newsletter spotlight",
      ],
      highlighted: false,
      cta: "Sponsor Now",
    },
  ];

  return (
    <div className="relative bg-white text-black min-h-screen">
      {/* Navbar and Footer are in global layout. Calling them here causes double rendering */}

      <main className="relative pt-2">
        <section className="pt-4 sm:pt-6 pb-16 sm:pb-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-10 bg-[#c6a43f]/20 hidden sm:block"></span>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#c6a43f]">
                  INSTITUTIONAL SPONSORSHIP
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-black tracking-tighter leading-[0.85] mb-8 text-slate-900">
                Architect your <br />
                <span className="text-slate-400 italic font-medium">Visibility.</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Join the elite tier of sponsored startups. Reach a curated network of investors, 
                high-growth founders, and institutional decision-makers daily.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
              {[
                {
                  icon: TrendingUp,
                  title: "Top 10 Placement",
                  desc: "Your startup achieves high-tier placement in our premium registry, ensuring visibility for every ecosystem visitor.",
                },
                {
                  icon: Users,
                  title: "Social Distribution",
                  desc: "We syndicate your profile daily across our official channels, reaching a verified network of 50K+ stakeholders.",
                },
                {
                  icon: Zap,
                  title: "Accelerated Growth",
                  desc: "Institutional members actively monitor sponsored profiles. Position your startup where decisions are made.",
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-[#c6a43f]/10 transition-all">
                    <benefit.icon className="h-8 w-8 text-slate-900 group-hover:text-[#c6a43f]" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-4">{benefit.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="mb-32">
              <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-center mb-16 text-slate-900 uppercase">
                Access <span className="text-slate-400 italic font-medium">Registry</span> Tiers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative bg-white border rounded-3xl p-10 ${
                      plan.highlighted
                        ? "border-[#c6a43f] shadow-2xl scale-105 md:scale-105 z-10"
                        : "border-slate-100 shadow-sm hover:shadow-xl"
                    } transition-all`}
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c6a43f] text-black text-[9px] font-black uppercase tracking-[0.3em] py-1.5 px-6 rounded-full">
                        Ecosystem Choice
                      </div>
                    )}
                    <div className="text-center mb-10">
                      <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-4">{plan.name}</h3>
                      <div className="flex items-end justify-center gap-1">
                        <span className="text-5xl font-black text-slate-900">₹{plan.price}</span>
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">/{plan.duration}</span>
                      </div>
                    </div>
                    <ul className="space-y-4 mb-10 border-t border-slate-50 pt-10">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          <CheckCircle className="h-4 w-4 text-[#c6a43f] shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/apply">
                      <Button
                        className={`w-full h-14 rounded-full ${
                          plan.highlighted
                            ? "bg-black text-white hover:bg-slate-800"
                            : "bg-white border border-slate-200 text-slate-900 hover:border-black"
                        } text-[10px] font-black uppercase tracking-[0.2em] transition-all`}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Previously Featured */}
            <div className="mb-32">
              <div className="flex items-center justify-center gap-4 mb-16">
                <div className="h-px w-12 bg-slate-100" />
                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-slate-400 text-center">
                  Registry History
                </h2>
                <div className="h-px w-12 bg-slate-100" />
              </div>

              {featured && featured.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {featured.map((startup) => (
                    <div
                      key={startup.id}
                      className="bg-white border border-slate-50 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all"
                    >
                      {startup.logo_url ? (
                        <img
                          src={startup.logo_url}
                          alt={startup.name}
                          className="h-12 w-12 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all mx-auto mb-4"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-4 border border-slate-100">
                          <span className="text-xl font-black text-slate-200 uppercase">
                            {startup.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900 line-clamp-1">
                        {startup.name}
                      </h4>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border border-dashed border-slate-100 rounded-3xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Registry space available</p>
                </div>
              )}
            </div>

            {/* Social Proof */}
            <div className="bg-slate-950 rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#c6a43f]/10 blur-[120px] rounded-full" />
              <div className="flex justify-center gap-12 mb-12 relative z-10">
                <Instagram className="h-10 w-10 text-[#c6a43f] opacity-50" />
                <Twitter className="h-10 w-10 text-[#c6a43f] opacity-50" />
                <Linkedin className="h-10 w-10 text-[#c6a43f] opacity-50" />
              </div>
              <h3 className="text-4xl md:text-5xl font-display font-black tracking-tighter mb-8 text-white relative z-10">
                Unified Network Syndication.
              </h3>
              <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-sm leading-relaxed relative z-10">
                Your profile is syndicate daily across the UpForge Intelligence network, 
                reaching our entire ecosystem of verified stakeholders.
              </p>
              <Link href="/apply" className="relative z-10">
                <Button className="h-16 px-16 rounded-full bg-[#c6a43f] hover:bg-[#b08c2e] text-black text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">
                  Secure Your Sponsorship
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="py-12 text-center text-[10px] tracking-[0.5em] uppercase text-slate-400 font-bold border-t border-slate-100">
          UpForge Intelligence Group · Institutional Grade · 2026
        </div>
      </main>
    </div>
  );
}
