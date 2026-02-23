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
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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
      description: "Perfect for testing the waters.",
      features: ["Featured in Top 10 for 24 hours", "1 social media post", "Basic analytics"],
      highlighted: false,
      cta: "Start Trial",
    },
    {
      name: "Weekly",
      duration: "1 Week",
      price: "199",
      description: "Maximum impact for a week.",
      features: [
        "Featured in Top 10 for 7 days",
        "Daily social media posts",
        "Premium analytics",
        "Dedicated support",
      ],
      highlighted: true,
      cta: "Sponsor Now",
    },
    {
      name: "Monthly",
      duration: "1 Month",
      price: "499",
      description: "Sustained visibility and growth.",
      features: [
        "Featured in Top 10 for 30 days",
        "Daily social media posts",
        "Premium analytics",
        "Dedicated support",
        "Exclusive newsletter feature",
      ],
      highlighted: false,
      cta: "Sponsor Now",
    },
  ];

  return (
    <div className="relative bg-white text-black min-h-screen">
      <Navbar />
      <main className="relative pt-20">
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-10 bg-black/20 hidden sm:block"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                  SPONSOR YOUR STARTUP
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-6">
                Get the <br />
                <span className="text-gray-500 italic font-medium">Visibility</span> <br />
                You Deserve.
              </h1>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                Join the Top 10 sponsored startups and reach thousands of investors, founders, and
                decision-makers daily. We amplify your story across our social channels.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {[
                {
                  icon: TrendingUp,
                  title: "Top 10 Placement",
                  desc: "Your startup gets prime placement in our sponsored section, seen by every visitor.",
                },
                {
                  icon: Users,
                  title: "Daily Social Posts",
                  desc: "We feature your startup daily on our Instagram, Twitter, and LinkedIn — reaching 50K+ followers.",
                },
                {
                  icon: Zap,
                  title: "Amplified Growth",
                  desc: "Investors and partners actively browse sponsored startups — get in front of the right people.",
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="h-16 w-16 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center mb-6 group-hover:bg-[#c6a43f]/10 group-hover:text-[#c6a43f] transition-colors">
                    <benefit.icon className="h-8 w-8 text-[#1e3a5f] group-hover:text-[#c6a43f]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.desc}</p>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="mb-24">
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter text-center mb-12">
                Simple, <span className="text-gray-500 italic font-medium">Transparent</span> Pricing.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative bg-white border rounded-2xl p-8 ${
                      plan.highlighted
                        ? "border-[#c6a43f] shadow-lg scale-105 md:scale-110 z-10"
                        : "border-black/5 shadow-sm hover:shadow-lg"
                    } transition-all`}
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c6a43f] text-black text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                        Most Popular
                      </div>
                    )}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                      <div className="flex items-end justify-center gap-1">
                        <span className="text-4xl font-bold text-black">₹{plan.price}</span>
                        <span className="text-gray-400 text-sm mb-1">/{plan.duration.toLowerCase()}</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-[#c6a43f] shrink-0 mt-0.5" />
                          <span className="text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/apply">
                      <Button
                        className={`w-full h-12 rounded-full ${
                          plan.highlighted
                            ? "bg-[#1e3a5f] hover:bg-[#14304a] text-white"
                            : "bg-white border border-black/10 text-black hover:bg-black/5"
                        } text-xs font-bold uppercase tracking-wider transition-all`}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Previously Featured */}
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-12">
                <div className="p-4 rounded-xl bg-[#1e3a5f]/10 text-[#1e3a5f]">
                  <Crown className="h-6 w-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter">
                  Previously <span className="text-gray-500 italic font-medium">Featured</span>
                </h2>
              </div>

              {featured && featured.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {featured.map((startup) => (
                    <div
                      key={startup.id}
                      className="bg-white border border-black/5 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all"
                    >
                      {startup.logo_url ? (
                        <img
                          src={startup.logo_url}
                          alt={startup.name}
                          className="h-12 w-12 object-contain rounded-lg bg-white border border-black/5 p-1 mx-auto mb-3"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-[#1e3a5f]/5 flex items-center justify-center mx-auto mb-3 border border-black/5">
                          <span className="text-xl font-semibold text-[#1e3a5f]/50">
                            {startup.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <h4 className="font-medium text-sm text-black mb-1 line-clamp-1">
                        {startup.name}
                      </h4>
                      {startup.is_sponsored && (
                        <Crown className="h-3 w-3 text-[#c6a43f] mx-auto" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white border border-black/5 rounded-2xl">
                  <p className="text-gray-400 text-sm">No featured startups yet. Be the first!</p>
                </div>
              )}
            </div>

            {/* Social Proof */}
            <div className="bg-white border border-black/5 rounded-2xl p-12 text-center shadow-sm">
              <div className="flex justify-center gap-8 mb-8">
                <Instagram className="h-8 w-8 text-[#c6a43f]" />
                <Twitter className="h-8 w-8 text-[#c6a43f]" />
                <Linkedin className="h-8 w-8 text-[#c6a43f]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tighter mb-4">
                We post about you daily on social media.
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                Your startup reaches our entire network — investors, journalists, and fellow founders.
              </p>
              <Link href="/apply">
                <Button className="h-14 px-12 rounded-full bg-[#1e3a5f] hover:bg-[#14304a] text-white text-xs uppercase tracking-[0.2em] shadow-lg">
                  Sponsor Your Startup
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
