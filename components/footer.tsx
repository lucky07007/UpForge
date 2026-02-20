"use client"

import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    registry: [
      { name: "Directory", href: "/startup" },
      { name: "Verification Standards", href: "/verification" },
      { name: "Founder Criteria", href: "/about" },
    ],
    company: [
      { name: "About Upforge", href: "/about" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Use", href: "/terms" },
    ],
    contact: [
      { name: "General Inquiries", href: "mailto:connect@upforge.in" },
      { name: "Founder Submissions", href: "/apply" },
    ],
  }

  return (
    <footer className="bg-[#F8F8F6] border-t border-zinc-200 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">

          {/* BRAND COLUMN */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-zinc-200 bg-white">
                <Image
                  src="/logo.jpg"
                  alt="Upforge Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-semibold tracking-tight">
                  UPFORGE
                </span>
                <span className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 mt-1">
                  Founder Registry
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-600 leading-relaxed max-w-xs">
              Upforge is an independent registry documenting
              verified founders and emerging companies across India.
              Built for long-term credibility and structured discovery.
            </p>
          </div>

          {/* LINKS */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-8">
                {section}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-600 hover:text-black transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-24 pt-10 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500 text-center md:text-left">
            © {currentYear} Upforge Registry. All Rights Reserved.
          </p>

          <p className="text-[11px] text-zinc-400 text-center md:text-right">
            Independent. Verified. Founder-Led.
          </p>

        </div>
      </div>
    </footer>
  )
}
