// components/footer.tsx
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Registry",
      links: [
        { name: "Browse Registry", href: "/startup" },
        { name: "Verification Standards", href: "/verification" },
        { name: "API", href: "/docs" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Reports", href: "/reports" },
        { name: "Sponsorship", href: "/sponsor" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Trust", href: "/trust" },
      ],
    },
    {
      title: "Connect",
      links: [
        { name: "Contact", href: "/contact" },
        { name: "LinkedIn", href: "https://linkedin.com/company/upforge-india", external: true },
        { name: "X", href: "https://x.com/upforge_in", external: true },
      ],
    },
  ]

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Logo and brief */}
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-12 border-b border-gray-100">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.jpg"
                alt="UpForge"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-sm font-medium text-gray-900">UpForge</span>
            </div>
            <p className="text-sm text-gray-500">
              India’s Independent Founder Registry. A public, verified record of founders and startups.
            </p>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <div>© {currentYear} UpForge. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-600">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-600">Terms</Link>
            <Link href="/trust" className="hover:text-gray-600">Trust</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
