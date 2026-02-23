import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Crown,
  TrendingUp,
  Users,
  Instagram,
  Twitter,
  Linkedin,
  Zap,
  CheckCircle,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Institutional Sponsorship | UpForge Intelligence",
  description: "Secure high-tier visibility within India’s definitive founder registry. Elite placement for serious builders.",
};

export default async function SponsorPage() {
  const supabase = await createClient();

  const { data: featured } = await supabase
    .from("startups")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(6);

  const pricingPlans = [
    {
      name: "Standard Registry",
      duration: "24 Hours",
      price: "49",
      description: "Immediate ecosystem entry.",
      features: ["Top 10 Spotlight (1 Day)", "Single Network Syndication", "Standard Traffic Metrics"],
      highlighted: false,
      cta: "Acquire Placement",
    },
    {
      name: "Institutional Tier",
      duration: "7 Days",
      price: "199",
      description: "Maximum ecosystem impact.",
      features: [
        "Top 10 Spotlight (7 Days)",
        "Daily Multi-Channel Syndication",
        "Priority Intelligence Support",
        "Verified Member Badge",
      ],
      highlighted: true,
      cta: "Secure Tier",
    },
    {
      name: "Legacy Membership",
      duration: "30 Days",
      price: "499",
      description: "Sustained authority & trust.",
      features: [
        "Top 10 Spotlight (30 Days)",
        "Full Network Syndication",
        "Concierge Profile Updates",
        "Executive Newsletter Spotlight",
        "Monthly Intelligence Report",
      ],
      highlighted: false,
      cta: "Establish Legacy",
    },
  ];

  return (
    <div className="relative bg-white text-black min-h-screen">
      <Navbar />

      <main className="relative pt-2">
        <section className="pt-8 sm:pt-12 pb-20 sm:pb-32 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            
            {/* ========== INSTITUTIONAL HEADER ========== */}
            <div className="text-center max-w-4xl mx-auto mb-24">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="h-px w-12 bg-[#c6a43f]/30"></span>
                <span className="text-[11px] font-black tracking-[0.5em] uppercase text-[#c6a43f]">
                  Capital & Visibility Infrastructure
                </span>
                <span className="h-px w-12 bg-[#c6a43f]/30"></span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-display font-black tracking-tighter leading-[0.8] mb-10 text-slate-950 uppercase">
                Architect <br />
                <span className="text-slate-400 italic">Authority.</span>
              </h1>
              
              <p className="text-lg sm:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
                Position your entity within the elite 1% of the Indian startup ecosystem. 
                UpForge provides the structured visibility required for serious institutional trust.
              </p>
            </div>

            {/* ========== VALUE PROPOSITIONS ========== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-40">
              {[
                {
                  icon: ShieldCheck,
                  title: "Registry Dominance",
                  desc: "Achieve permanent visibility in the Top 10 Vault. Our high-intent audience of investors ensures your profile is never missed.",
                },
                {
                  icon: Globe,
                  title: "Network Syndication",
                  desc: "We syndicate your growth story across a verified network of 50K+ stakeholders on Instagram, X, and LinkedIn daily.",
                },
                {
                  icon: TrendingUp,
                  title: "Elite Discovery",
                  desc: "Move beyond the noise. Our registry is curated for high-growth founders and serious capital allocators.",
                },
              ].map((benefit, idx) => (
                <div key={idx} className="relative group p-10 rounded-[2.5rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="h-14 w-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-slate-950 group-hover:text-white transition-all shadow-sm">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-4 text-slate-900">{benefit.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{benefit.desc}</p>
                </div>
              ))}
            </div>

            {/* ========== PRICING TIERS ========== */}
            <div className="mb-40">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-slate-900 uppercase">
                  Membership <span className="text-slate-400">Structure</span>
                </h2>
                <div className="h-1 w-20 bg-[#c6a43f]/20 mx-auto mt-6 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-end">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative bg-white border rounded-[3rem] p-10 md:p-12 ${
                      plan.highlighted
                        ? "border-[#c6a43f] shadow-[0_40px_80px_-20px_rgba(198,164,63,0.15)] scale-105 z-10"
                        : "border-slate-100 shadow-sm"
                    } transition-all duration-500`}
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-950 text-[#c6a43f] text-[10px] font-black uppercase tracking-[0.4em] py-2 px-8 rounded-full border border-[#c6a43f]/30 shadow-xl">
                        Elite Selection
                      </div>
                    )}
                    
                    <div className="mb-10">
                      <h3 className="text-xs font-black uppercase tracking-[0.5em] text-slate-400 mb-6">{plan.name}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black text-slate-950 tracking-tighter">₹{plan.price}</span>
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">/{plan.duration}</span>
                      </div>
                      <p className="text-slate-400 text-xs mt-4 font-bold uppercase tracking-tight">{plan.description}</p>
                    </div>

                    <ul className="space-y-5 mb-12 pt-10 border-t border-slate-50">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-4 text-[11px] font-black uppercase tracking-wider text-slate-600">
                          <CheckCircle className="h-4 w-4 text-[#c6a43f] shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/apply">
                      <Button
                        className={`w-full h-16 rounded-[1.5rem] ${
                          plan.highlighted
                            ? "bg-slate-950 text-white hover:bg-slate-800"
                            : "bg-white border-2 border-slate-100 text-slate-900 hover:border-slate-950"
                        } text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-lg`}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* ========== PREVIOUSLY FEATURED ========== */}
            <div className="mb-40">
              <div className="flex flex-col items-center mb-16">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-4">Registry Records</p>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Elite Entity History</h2>
              </div>

              {featured && featured.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                  {featured.map((startup) => (
                    <div key={startup.id} className="bg-white border border-slate-50 rounded-3xl p-6 text-center shadow-sm">
                      {startup.logo_url ? (
                        <img src={startup.logo_url} alt={startup.name} className="h-10 w-10 object-contain mx-auto mb-4" />
                      ) : (
                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-4 border border-slate-100">
                          <span className="text-xs font-black text-slate-300 uppercase">{startup.name.charAt(0)}</span>
                        </div>
                      )}
                      <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-900 truncate">{startup.name}</h4>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border border-dashed border-slate-100 rounded-[3rem] bg-slate-50/30">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Institutional Space Available</p>
                </div>
              )}
            </div>

            {/* ========== FINAL CTA ========== */}
            <div className="bg-slate-950 rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#c6a43f]/10 blur-[120px] rounded-full" />
              
              <div className="flex justify-center gap-12 mb-12 relative z-10 opacity-50">
                <Instagram className="h-8 w-8 text-[#c6a43f]" />
                <Twitter className="h-8 w-8 text-[#c6a43f]" />
                <Linkedin className="h-8 w-8 text-[#c6a43f]" />
              </div>
              
              <h3 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-8 text-white relative z-10 uppercase">
                Syndicated <br /> <span className="text-[#c6a43f] italic">Intelligence.</span>
              </h3>
              
              <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg leading-relaxed relative z-10 font-medium">
                Every sponsored entity is syndicate daily through the UpForge Intelligence Group, 
                bridging the gap between independent builders and institutional capital.
              </p>
              
              <Link href="/apply" className="relative z-10">
                <Button className="h-20 px-20 rounded-full bg-[#c6a43f] hover:bg-[#d8b85c] text-black text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl transition-transform hover:scale-105 active:scale-95">
                  Begin Verification
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="py-12 text-center text-[10px] tracking-[0.6em] uppercase text-slate-400 font-black border-t border-slate-100">
          UpForge Intelligence Group · Institutional Grade · 2026
        </div>
      </main>

      <Footer />
    </div>
  );
}
