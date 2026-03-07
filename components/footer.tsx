"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Shield,
  Globe,
} from "lucide-react";

// ─── Column data ────────────────────────────────────────────────────────────

const FOOTER_COLUMNS = [
  {
    heading: "Platform",
    links: [
      { label: "Startup Directory",  href: "/startup" },
      { label: "Reports",            href: "/reports" },
      { label: "Insights",           href: "/insights" },
      { label: "Tools",              href: "/tools" },
      { label: "Indian Unicorns",    href: "/indian-unicorns" },
      { label: "AI Startups",        href: "/top-ai-startups" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Founder Guides",      href: "/founder-stories" },
      { label: "Startup Research",    href: "/research" },
      { label: "Newsletter",          href: "/newsletter" },
      { label: "Funding Tracker",     href: "/top-funded-startups" },
      { label: "Best SaaS",          href: "/best-saas-startups" },
      { label: "Submit a Startup",   href: "/submit" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About UpForge",  href: "/about" },
      { label: "Contact",        href: "/contact" },
      { label: "Careers",        href: "/careers" },
      { label: "Press",          href: "/press" },
      { label: "Advertise",      href: "/advertise" },
      { label: "Sitemap",        href: "/sitemap" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy",       href: "/privacy" },
      { label: "Terms of Service",     href: "/terms" },
      { label: "Cookie Policy",        href: "/cookies" },
      { label: "Editorial Policy",     href: "/editorial" },
      { label: "Verification Policy",  href: "/verification" },
      { label: "Accessibility",        href: "/accessibility" },
    ],
  },
];

// ─── Newsletter sub-form ─────────────────────────────────────────────────────

function NewsletterForm() {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); setEmail(""); }
  };

  return submitted ? (
    <div className="flex items-center gap-2 py-2">
      <BadgeCheck size={14} className="text-emerald-500 flex-shrink-0" />
      <span className="text-[12px] text-[#555555]">
        You're subscribed. Welcome to UpForge Intel.
      </span>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="flex gap-0 mt-3 max-w-[340px]">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="
          flex-1 px-3 py-2.5 text-[12px]
          border border-[#E5E5E5] border-r-0
          text-[#111111] placeholder:text-[#BBBBBB]
          outline-none focus:border-[#AAAAAA]
          transition-colors duration-150
          rounded-l-sm
        "
        aria-label="Email address for newsletter"
      />
      <button
        type="submit"
        className="
          px-4 py-2.5 bg-[#111111] text-white
          text-[11px] font-semibold tracking-[0.06em]
          hover:bg-[#333333] transition-colors duration-150
          flex-shrink-0 rounded-r-sm
          flex items-center gap-1.5
        "
      >
        Subscribe <ArrowRight size={11} strokeWidth={2.5} />
      </button>
    </form>
  );
}

// ─── Ecosystem partner links ─────────────────────────────────────────────────

const ECOSYSTEM_LINKS = [
  {
    name: "InternAdda",
    href: "https://www.internadda.com",
    desc: "India's internship & early-career platform",
  },
  {
    name: "Arjuna AI",
    href: "https://www.arjunaai.in",
    desc: "AI-powered mock interview platform",
  },
];

// ─── Trust signals ───────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  { icon: Shield,     label: "100% Independent" },
  { icon: BadgeCheck, label: "Every listing verified" },
  { icon: Globe,      label: "Open & Google-indexed" },
];

// ─── Footer ─────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-white border-t-2 border-[#111111]"
      aria-label="Site footer"
    >
      {/* ── TRUST STRIP ────────────────────────────────────────────── */}
      <div className="border-b border-[#F0F0F0] bg-[#FAFAFA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-10 py-3">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-6">
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon
                  size={12}
                  strokeWidth={2}
                  className="text-[#F5C542] flex-shrink-0"
                />
                <span className="text-[10px] text-[#888888] tracking-[0.14em] uppercase font-medium">
                  {label}
                </span>
              </div>
            ))}

            <div className="flex items-center gap-2 sm:ml-auto">
              <span className="relative flex h-[6px] w-[6px]">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-emerald-500" />
              </span>
              <span className="text-[10px] text-[#AAAAAA] tracking-[0.14em] uppercase">
                Live Registry
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN BODY ──────────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-10">

        {/* ── TOP: Brand + Newsletter + Nav grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-10 gap-y-10 py-14 sm:py-16 border-b border-[#E5E5E5]">

          {/* Brand column – spans 2 cols on lg */}
          <div className="sm:col-span-2 lg:col-span-2">
            {/* Wordmark */}
            <Link href="/" className="inline-flex items-center gap-2.5 group mb-4 block">
              <div className="relative w-7 h-7 overflow-hidden ring-1 ring-[#E5E5E5] group-hover:ring-[#F5C542] transition-all duration-200">
                <Image src="/logo.jpg" alt="UpForge" fill className="object-cover" />
              </div>
              <span
                className="text-[21px] font-bold tracking-[-0.025em] text-[#111111]"
                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
              >
                UpForge
              </span>
            </Link>

            {/* Mission */}
            <p className="text-[13px] text-[#555555] leading-[1.75] max-w-[260px] mb-5">
              India's independent startup registry — neutral, verified, and
              open. No ads. No paid rankings. Built for founders and
              investors who value truth over noise.
            </p>

            {/* Free listing CTA */}
            <Link
              href="/submit"
              className="
                inline-flex items-center gap-2
                text-[11px] font-semibold tracking-[0.06em]
                text-white bg-[#111111]
                px-4 py-2.5 rounded-sm
                hover:bg-[#333333] transition-colors duration-150
                mb-7
              "
            >
              List Your Startup — Free
              <ArrowRight size={11} strokeWidth={2.5} />
            </Link>

            {/* Newsletter */}
            <div>
              <p
                className="text-[10px] font-semibold text-[#111111] tracking-[0.18em] uppercase mb-0.5"
              >
                UpForge Intel
              </p>
              <p className="text-[12px] text-[#888888] leading-[1.6] mb-0">
                Weekly briefing on India's startup ecosystem.
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_COLUMNS.map(({ heading, links }) => (
            <div key={heading} className="lg:col-span-1">
              <h3 className="text-[10px] font-semibold text-[#111111] tracking-[0.22em] uppercase mb-4 pb-2.5 border-b border-[#E5E5E5]">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[13px] text-[#666666] hover:text-[#111111] hover:translate-x-0.5 inline-block transition-all duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── ECOSYSTEM STRIP ────────────────────────────────────────── */}
        <div className="py-8 border-b border-[#E5E5E5]">
          <p className="text-[10px] text-[#AAAAAA] tracking-[0.22em] uppercase mb-4 font-medium">
            From the same ecosystem
          </p>
          <div className="flex flex-wrap gap-4">
            {ECOSYSTEM_LINKS.map(({ name, href, desc }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center gap-3
                  px-4 py-2.5
                  border border-[#E5E5E5]
                  hover:border-[#CCCCCC] hover:shadow-[0_1px_6px_rgba(0,0,0,0.06)]
                  transition-all duration-200
                  rounded-sm
                "
              >
                <div>
                  <p className="text-[13px] font-semibold text-[#111111] group-hover:text-[#000000] transition-colors">
                    {name}
                  </p>
                  <p className="text-[11px] text-[#888888] leading-tight mt-0.5">
                    {desc}
                  </p>
                </div>
                <ArrowRight
                  size={12}
                  strokeWidth={2}
                  className="text-[#CCCCCC] group-hover:text-[#555555] group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0"
                />
              </a>
            ))}
          </div>
        </div>

        {/* ── DISCLAIMER ──────────────────────────────────────────────── */}
        <div className="py-6 border-b border-[#F0F0F0]">
          <p className="text-[11px] text-[#AAAAAA] leading-[1.8] max-w-[80ch]">
            UpForge is an informational public registry. Listings are compiled from publicly available sources or founder
            submissions and are independently verified. We do not provide investment advice, endorsements, financial ratings,
            or sponsored rankings. Information may change over time and should be independently verified before any business
            or investment decision. UpForge is not affiliated with any VC firm, accelerator, or government body.
          </p>
        </div>

        {/* ── BOTTOM BAR ──────────────────────────────────────────────── */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-[11px] text-[#AAAAAA] text-center sm:text-left">
            <span
              className="font-semibold text-[#555555]"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            >
              UpForge
            </span>{" "}
            &copy; {year}. Built for founders and innovators.{" "}
            <span className="text-[#CCCCCC]">·</span>{" "}
            Est. 2025 · New Delhi, India
          </p>

          {/* Legal links */}
          <nav
            className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 gap-y-1.5"
            aria-label="Legal links"
          >
            {[
              { label: "Privacy",      href: "/privacy" },
              { label: "Terms",        href: "/terms" },
              { label: "Cookies",      href: "/cookies" },
              { label: "Accessibility", href: "/accessibility" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-[11px] text-[#AAAAAA] hover:text-[#555555] transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  );
}
