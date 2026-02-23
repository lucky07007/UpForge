"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Award,
  Linkedin,
  Instagram,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Registry: [
      { name: "Live Directory", href: "/startup" },
      { name: "Verification Standards", href: "/verification" },
      { name: "Elite Founder Criteria", href: "/about" },
    ],
    Intelligence: [
      { name: "Market Reports", href: "/reports" },
      { name: "Sponsorship Deck", href: "/sponsor" },
      { name: "API Access", href: "/docs" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Trust & Safety", href: "/trust" },
    ],
  };

  return (
    <footer className="relative bg-[#0f1c2e] text-white pt-24 pb-14 overflow-hidden">

      {/* Premium Gradient Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/40 via-[#0f1c2e] to-black" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#c6a43f]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#1e3a5f]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">

          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-7">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 rounded-xl border border-white/10 bg-white/5 group-hover:border-[#c6a43f]/60 transition-all group-hover:scale-105">
                <Image src="/logo.jpg" alt="UpForge" fill className="object-contain" />
              </div>
              <div className="leading-none">
                <span className="text-xl font-black tracking-tight uppercase">
                  UPFORGE
                </span>
                <div className="text-[9px] tracking-[0.35em] text-[#c6a43f] font-bold mt-1">
                  Founder Registry
                </div>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              India's premium founder intelligence infrastructure. Verified,
              documented, and curated for institutional transparency.
            </p>

            <div className="flex gap-6 pt-2">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Shield className="h-4 w-4 text-[#c6a43f]" />
                Verified Registry
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Award className="h-4 w-4 text-[#c6a43f]" />
                Premium Network
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="lg:col-span-8">
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-10">

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c6a43f]/10 text-[#c6a43f] text-[10px] tracking-widest uppercase font-bold border border-[#c6a43f]/30">
                  <Sparkles className="h-3 w-3" />
                  Growth Opportunity
                </div>

                <h3 className="text-2xl md:text-3xl font-light tracking-tight">
                  Scale with UpForge Intelligence.
                </h3>

                <p className="text-gray-400 text-sm max-w-md">
                  Reach verified founders, decision-makers and investors with institutional visibility.
                </p>
              </div>

              <Link href="/sponsor">
                <Button className="relative h-14 px-9 rounded-full bg-[#c6a43f] hover:bg-[#b08c2e] text-black font-semibold uppercase tracking-wider text-xs transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#c6a43f]/20 overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
                  Sponsor Your Startup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider Glow */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16" />

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-14 pb-16">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="space-y-6">
              <h4 className="text-[10px] tracking-[0.4em] text-[#c6a43f] font-black uppercase">
                {section}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="relative text-sm text-gray-400 hover:text-white transition-colors duration-300 group"
                    >
                      {link.name}
                      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#c6a43f] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(198,164,63,0.7)]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect */}
          <div className="space-y-6">
            <h4 className="text-[10px] tracking-[0.4em] text-[#c6a43f] font-black uppercase">
              Connect
            </h4>

            <div className="flex gap-4 pt-3">
              {[Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#c6a43f] hover:border-[#c6a43f] transition-all hover:scale-110"
                >
                  <Icon className="h-4 w-4 text-white hover:text-black transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] tracking-[0.35em] uppercase text-gray-500 font-bold text-center md:text-left">
            © {currentYear} UpForge Registry Intelligence Group
          </p>

          <div className="flex items-center gap-3 text-gray-500 text-[10px] tracking-[0.35em] uppercase font-bold">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            Institutional Grade Network
          </div>
        </div>
      </div>
    </footer>
  );
}
