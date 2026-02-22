// components/footer.tsx
import Link from "next/link"

export function Footer() {
  const footerLinks = {
    registry: [
      { label: "Explore Registry", href: "/registry" },
      { label: "Verification Process", href: "/verify" },
      { label: "Sponsorship", href: "/sponsor" },
      { label: "API Documentation", href: "/docs" },
    ],
    about: [
      { label: "Purpose", href: "/about" },
      { label: "Principles", href: "/principles" },
      { label: "Team", href: "/team" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Terms of Use", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Verification Standards", href: "/standards" },
    ],
    trust: [
      { label: "Verification Status", href: "/status" },
      { label: "Report an Issue", href: "/report" },
      { label: "Transparency Report", href: "/transparency" },
    ],
  }

  return (
    <footer className="bg-[#050A12] border-t border-[#1E2A3A]">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-[#EAEAEA] text-xl font-medium tracking-tight">
              UpForge
            </Link>
            <p className="text-[#9CA3AF] text-sm mt-4">
              India's Independent Founder Registry
            </p>
            <p className="text-[#4A5A6E] text-xs mt-8">
              Established 2025
            </p>
          </div>

          {/* Links */}
          <div className="col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-[#EAEAEA] text-xs uppercase tracking-[0.2em] mb-4">Registry</h4>
              <ul className="space-y-3">
                {footerLinks.registry.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[#9CA3AF] text-sm hover:text-[#EAEAEA] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#EAEAEA] text-xs uppercase tracking-[0.2em] mb-4">About</h4>
              <ul className="space-y-3">
                {footerLinks.about.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[#9CA3AF] text-sm hover:text-[#EAEAEA] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#EAEAEA] text-xs uppercase tracking-[0.2em] mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[#9CA3AF] text-sm hover:text-[#EAEAEA] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#EAEAEA] text-xs uppercase tracking-[0.2em] mb-4">Trust</h4>
              <ul className="space-y-3">
                {footerLinks.trust.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[#9CA3AF] text-sm hover:text-[#EAEAEA] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1E2A3A] mt-16 pt-8 flex justify-between items-center">
          <p className="text-[#4A5A6E] text-xs">
            © {new Date().getFullYear()} UpForge. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="https://twitter.com/upforge_in" className="text-[#4A5A6E] hover:text-[#EAEAEA] text-xs transition-colors">
              Twitter
            </Link>
            <Link href="https://linkedin.com/company/upforge" className="text-[#4A5A6E] hover:text-[#EAEAEA] text-xs transition-colors">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
