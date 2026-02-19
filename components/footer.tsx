"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Linkedin, ArrowUpRight, ShieldCheck, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    platform: [
      { name: "Startups", href: "/#startups" },
      { name: "Categories", href: "/#categories" },
      { name: "Leaderboard", href: "/#leaderboard" },
    ],
    company: [
      { name: "About Us", href: "/#about" },
      { name: "Why UpForge?", href: "/#why" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
    resources: [
      { name: "Founder Guide", href: "/docs" },
      { name: "Verification Process", href: "/verification" },
      { name: "Partners", href: "/partners" },
    ]
  }

  return (
    <footer className="border-t border-white/5 bg-background pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          
          {/* Column 1: Brand & Mission */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-primary/20 bg-white">
                <Image src="/logo.jpg" alt="Logo" fill className="object-cover" />
              </div>
              <span className="text-xl font-black tracking-tighter text-foreground">
                UP<span className="text-muted-foreground/40">FORGE</span>
              </span>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground max-w-xs">
              India's premier independent founder network. Building the most trusted ecosystem for high-growth ventures and institutional builders.
            </p>
            <div className="mt-6 flex items-center gap-4 text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Github className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Column 2 & 3: Links */}
          <div className="grid grid-cols-2 gap-8 col-span-1 lg:col-span-2">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">Platform</h4>
              <ul className="mt-6 space-y-4">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary flex items-center group">
                      {link.name}
                      <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">Network</h4>
              <ul className="mt-6 space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Trust Card */}
          <div className="col-span-1 rounded-2xl border border-white/5 bg-secondary/30 p-6">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Network Status</span>
            </div>
            <p className="mt-4 text-xs font-medium text-muted-foreground leading-relaxed">
              Institutional verification systems are currently <span className="text-emerald-500 font-bold">Operational</span>.
            </p>
            <Link 
              href="mailto:connect@upforge.in" 
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 py-3 text-xs font-bold text-foreground hover:bg-white/10 transition-all border border-white/5"
            >
              <Mail className="h-3.5 w-3.5" />
              Contact Support
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col items-center justify-between border-t border-white/5 pt-10 md:flex-row">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/30">
            © {currentYear} UPFORGE NETWORK • ALL RIGHTS RESERVED
          </p>
          <div className="mt-4 flex items-center gap-6 md:mt-0">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
              Mainnet 2.0.4
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
