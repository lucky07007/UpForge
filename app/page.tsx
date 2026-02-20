// app/page.tsx
import { createClient } from "@/lib/supabase/server";
import { Hero } from "@/components/hero";
import { WhyUpforge } from "@/components/why-upforge";
import { StartupCard } from "@/components/startup-card";
import { SponsoredCard } from "@/components/sponsored-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  TrendingUp,
  CheckCircle,
  Award,
  Hexagon,
  CircleDot,
  Fingerprint,
} from "lucide-react";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upforge – Elite Ecosystem for India's Ambitious Builders",
  description:
    "Vetted startups, verified founders, and institutional-grade networking. The founder's benchmark.",
  openGraph: {
    title: "Upforge",
    description:
      "The elite ecosystem for India's most ambitious independent builders.",
    images: "/og-upforge.jpg", // ← prepare this image
  },
};

export const revalidate = 1800; // revalidate every 30 min – adjust as needed

// Reusable small component
function PillBadge({
  icon: Icon,
  children,
  gradientFrom = "indigo-600",
  gradientTo = "purple-600",
}: {
  icon: any;
  children: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/50 shadow-sm">
      <Icon className="h-4 w-4 text-indigo-600" aria-hidden="true" />
      <span
        className={`text-[0.7rem] font-semibold uppercase tracking-widest bg-gradient-to-r from-${gradientFrom} to-${gradientTo} bg-clip-text text-transparent`}
      >
        {children}
      </span>
    </div>
  );
}

const partners = ["SEQUOIA", "ACCEL", "BLUME", "Y COMBINATOR", "MATRIX"];

async function FeaturedStartups() {
  const supabase = await createClient();
  const { data: sponsored } = await supabase
    .from("startups")
    .select(
      "id, name, tagline, logo_url, industry, funding_stage, is_featured, website_url, short_description"
    )
    .eq("is_featured", true)
    .limit(3)
    .order("created_at", { ascending: false });

  if (!sponsored?.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {sponsored.map((startup, index) => (
        <div
          key={startup.id}
          className="group relative"
          style={{ transitionDelay: `${index * 60}ms` }}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-b from-indigo-100 via-purple-100 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />
          <div className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-500">
            <SponsoredCard startup={startup} />
          </div>
        </div>
      ))}
    </div>
  );
}

async function TrendingStartups() {
  const supabase = await createClient();
  const { data: trending } = await supabase
    .from("startups")
    .select(
      "id, name, tagline, logo_url, industry, funding_stage, website_url, short_description"
    )
    .eq("is_featured", false)
    .limit(6)
    .order("created_at", { ascending: false });

  if (!trending?.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {trending.map((startup) => (
        <div key={startup.id} className="group">
          <div className="relative bg-white rounded-xl border border-slate-100 p-5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300">
            <StartupCard startup={startup} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <div className="relative bg-white overflow-hidden font-sans antialiased">
      {/* Premium gradient orbs */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50/30 rounded-full blur-3xl" />

      {/* HERO */}
      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              <PillBadge icon={Fingerprint}>The Founder's Benchmark</PillBadge>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-slate-900 leading-[1.1]">
                The elite ecosystem for India's most
                <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                  ambitious builders.
                </span>
              </h1>

              <p className="text-base md:text-lg text-slate-500 max-w-xl leading-relaxed">
                Vetted startups, verified founders, and institutional‑grade networking.
                <span className="block mt-2 text-indigo-600 font-medium">
                  Every status symbol dreams of being listed here.
                </span>
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className="group h-12 px-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-semibold uppercase tracking-[0.15em] shadow-lg shadow-indigo-200 transition-all duration-300">
                  Join the registry
                  <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  className="h-12 px-8 rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-indigo-200 text-xs font-semibold uppercase tracking-[0.15em] transition-all"
                >
                  View featured
                </Button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent rounded-3xl" />
              <div className="grid grid-cols-2 gap-4 p-6 bg-white/70 backdrop-blur-md rounded-3xl border border-white/50 shadow-2xl shadow-indigo-500/10">
                {[
                  { label: "Vetted startups", value: "500+", icon: Shield, color: "indigo" },
                  { label: "Verified founders", value: "850+", icon: Users, color: "purple" },
                  { label: "Capital tracked", value: "$2.4B", icon: TrendingUp, color: "blue" },
                  { label: "Network events", value: "48/yr", icon: Zap, color: "pink" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col p-5 rounded-2xl bg-white border border-slate-100 hover:border-indigo-200 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                        <stat.icon className={`h-4 w-4 text-${stat.color}-600`} aria-hidden="true" />
                      </div>
                      <span className="text-lg font-bold text-slate-900">{stat.value}</span>
                    </div>
                    <span className="text-[0.7rem] font-medium text-slate-400 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-200/30 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="border-y border-slate-100 bg-gradient-to-r from-indigo-50/30 via-white to-purple-50/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex items-center gap-3 text-xs font-medium text-slate-500 uppercase tracking-widest">
              <CheckCircle className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              <span>Live verification · Updated daily</span>
            </div>

            <div className="flex items-center gap-8 opacity-40 hover:opacity-70 transition">
              {partners.slice(0, 4).map((p) => (
                <span key={p} className="text-sm font-black tracking-tight">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED SECTION */}
      <section className="py-28 px-6 max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/20 via-transparent to-transparent pointer-events-none" />
        <div className="text-center mb-16">
          <PillBadge icon={Award} gradientFrom="amber-600" gradientTo="orange-600">
            The Vetted Few
          </PillBadge>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900 max-w-2xl mx-auto mt-6">
            Hand‑picked startups leading the next
            <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block mt-1">
              wave of innovation.
            </span>
          </h2>
        </div>

        <Suspense
          fallback={
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-96 bg-slate-100/70 animate-pulse rounded-2xl" />
              ))}
            </div>
          }
        >
          <FeaturedStartups />
        </Suspense>
      </section>

      {/* WHY UPFORGE */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-indigo-50/20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <WhyUpforge />
        </div>
      </div>

      {/* TRENDING SECTION */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Real‑time index
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900">
              Trending
              <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block mt-1">
                networks today.
              </span>
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              The most influential startups in our ecosystem, updated in real time.
            </p>
          </div>
          <Link
            href="/startup"
            className="group inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition"
          >
            View full directory
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="grid lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-slate-100/70 animate-pulse rounded-xl" />
              ))}
            </div>
          }
        >
          <TrendingStartups />
        </Suspense>

        <div className="mt-20 text-center">
          <Link href="/startup">
            <Button className="group h-11 px-7 rounded-full bg-gradient-to-r from-slate-900 to-indigo-900 hover:from-indigo-900 hover:to-purple-900 text-white text-[0.7rem] font-semibold uppercase tracking-[0.2em] shadow-lg shadow-indigo-200 transition-all duration-300">
              Explore entire registry
              <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <p className="mt-6 text-[0.65rem] font-medium text-slate-400 uppercase tracking-wider">
            Data verified · February 2026
          </p>
        </div>
      </section>

      {/* PARTNER MARQUEE */}
      <div className="border-t border-slate-100 bg-gradient-to-r from-indigo-50/20 via-white to-purple-50/20 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-10">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-slate-400">
              Trusted by leading capital firms
            </span>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 opacity-30 hover:opacity-60 transition">
              {partners.map((p) => (
                <span key={p} className="text-lg md:text-xl font-black tracking-tight">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="border-t border-slate-100 bg-gradient-to-r from-indigo-50/30 via-white to-purple-50/30 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2">
            <Hexagon className="h-3 w-3 text-indigo-400" aria-hidden="true" />
            <p className="text-[0.65rem] font-medium text-slate-400 uppercase tracking-widest">
              Invite‑only for verified founders · 850+ members and growing
            </p>
            <CircleDot className="h-3 w-3 text-purple-400" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
