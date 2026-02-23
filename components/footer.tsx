// components/footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Award } from "lucide-react";
import { Linkedin, Instagram } from "lucide-react";

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
    <footer className="relative bg-gradient-to-br from-[#1e3a5f] to-[#14304a] text-white pt-20 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#c6a43f15,_transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-white/5 group-hover:border-[#c6a43f]/50 transition-all group-hover:scale-105">
                <Image src="/logo.jpg" alt="UpForge" fill className="object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tighter uppercase text-white">UPFORGE</span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-[#c6a43f] font-bold mt-1">Founder Registry</span>
              </div>
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              The definitive ecosystem for India's most ambitious independent builders. Documenting verified founders and high-growth companies with institutional-grade transparency.
            </p>

            {/* Trust badges */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#c6a43f]" />
                <span className="text-xs text-gray-300">Verified Registry</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#c6a43f]" />
                <span className="text-xs text-gray-300">Premium Network</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="lg:col-span-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
              <div className="space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6a43f]/10 text-[#c6a43f] text-[10px] font-bold uppercase tracking-widest border border-[#c6a43f]/20">
                  <Sparkles className="h-3 w-3" /> Growth Opportunity
                </div>

                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white">
                  Scale with UpForge Intelligence.
                </h3>

                <p className="text-gray-300 text-sm max-w-md">
                  Get featured in the Top 10 and reach 50,000+ investors, founders, and decision-makers monthly.
                </p>
              </div>

              <Link href="/sponsor">
                <Button className="group relative h-14 px-8 rounded-full bg-[#c6a43f] hover:bg-[#b08c2e] text-black font-semibold uppercase tracking-wider text-xs transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#c6a43f]/20 overflow-hidden">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  Sponsor Your Startup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-16 pb-16">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#c6a43f] font-black">{section}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors font-medium inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#c6a43f] font-black">Connect</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors font-medium inline-flex items-center gap-1 group">
                  Contact
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-300 hover:text-white transition-colors font-medium inline-flex items-center gap-1 group">
                  FAQ
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-1 transition-all" />
                </Link>
              </li>
              <li className="flex gap-4 pt-2">
                <a
                  href="https://www.linkedin.com/company/upforge-india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#c6a43f] hover:border-[#c6a43f] transition-all group"
                >
                  <Linkedin className="h-4 w-4 text-white group-hover:text-black" />
                </a>
                <a
                  href="#"
                  className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#c6a43f] hover:border-[#c6a43f] transition-all group"
                >
                  <span className="text-xs font-bold text-white group-hover:text-black">X</span>
                </a>
                <a
                  href="#"
                  className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#c6a43f] hover:border-[#c6a43f] transition-all group"
                >
                  <Instagram className="h-4 w-4 text-white group-hover:text-black" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold text-center md:text-left">
            © {currentYear} UpForge Registry Intelligence Group. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-black">
              Network Status: Institutional Grade
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
