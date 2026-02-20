"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    registry: [
      { name: "Live Directory", href: "/startup" },
      { name: "Verification Standards", href: "/verification" },
      { name: "Elite Founder Criteria", href: "/about" },
    ],
    intelligence: [
      { name: "Market Reports", href: "/reports" },
      { name: "Sponsorship Deck", href: "/sponsor" },
      { name: "API Access", href: "/docs" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Trust & Safety", href: "/trust" },
    ],
  }

  return (
    <footer className="bg-zinc-950 text-white pt-28 pb-12 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-96 w-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP GRID: BRAND & CALL TO ACTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/5 group-hover:border-indigo-500/50 transition-colors">
                <Image
                  src="/logo.jpg"
                  alt="UpForge Intelligence"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tighter italic">
                  UPFORGE
                </span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-indigo-400 font-bold mt-1">
                  Founder Registry
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              The definitive ecosystem for India's most ambitious independent builders. 
              Documenting verified founders and high-growth companies with institutional-grade transparency.
            </p>
          </div>

          {/* COLORFUL SPONSORSHIP CTA */}
          <div className="lg:col-span-8">
            <div className="relative group p-1 rounded-[2.5rem] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-indigo-500/20">
              <div className="bg-zinc-900 rounded-[2.4rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest border border-indigo-500/20">
                    <Sparkles className="h-3 w-3" /> Growth Opportunity
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight">
                    Scale with UpForge Intelligence.
                  </h3>
                  <p className="text-zinc-400 text-sm max-w-md">
                    Get featured in the "Top 10" and reach 50,000+ investors, founders, and decision-makers monthly.
                  </p>
                </div>
                
                <Link href="/sponsor">
                  <Button size="lg" className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-zinc-200 transition-all group/btn font-black uppercase tracking-widest text-xs">
                    Sponsor with Us
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE GRID: LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/5 pt-20 pb-20">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="space-y-8">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black">
                {section}
              </h4>
              <ul className="space-y-5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CONTACT/SOCIAL */}
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black">
              Connect
            </h4>
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 font-medium italic">General Inquiries:</p>
              <a href="mailto:connect@upforge.in" className="text-sm text-white hover:text-indigo-400 transition-colors font-bold">
                connect@upforge.in
              </a>
            </div>
            <div className="flex gap-4 pt-2">
               {/* Placeholders for Social Icons */}
               <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all">
                 <span className="text-[10px] font-black italic">X</span>
               </div>
               <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all">
                 <span className="text-[10px] font-black italic">in</span>
               </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold text-center md:text-left">
            © {currentYear} Upforge Registry Intelligence Group. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-black">
              Network Status: Institutional Grade
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
