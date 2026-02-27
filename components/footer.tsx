// components/footer.tsx
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-300 mt-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Identity Section */}
          <div className="md:col-span-5 text-center md:text-left">
            <h3 className="font-serif text-2xl text-black">
              UpForge
            </h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-sm mx-auto md:mx-0">
              India's Public Registry of Emerging Startups. 
              A structured, independent knowledge platform documenting early-stage ventures.
            </p>

            <p className="text-xs text-gray-400 mt-4">
              Established 2026 • Independently Maintained
            </p>
          </div>

          {/* Registry Links */}
          <div className="md:col-span-3 text-center md:text-left">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Registry
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <Link href="/startups" className="hover:underline">
                  Browse Startups
                </Link>
              </li>
              <li>
                <Link href="/evaluation" className="hover:underline">
                  Startup Evaluation Tool
                </Link>
              </li>
              <li>
                <Link href="/definition" className="hover:underline">
                  Startup Definition
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance / Participation */}
          <div className="md:col-span-4 text-center md:text-left">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Participation
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <Link href="/submit" className="hover:underline">
                  Submit a Startup
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About the Registry
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-12 pt-8">

          {/* Public Notice */}
          <div className="max-w-3xl text-xs text-gray-500 leading-relaxed">
            <p>
              UpForge operates as a public informational registry. 
              Entries are based on publicly available data or founder-submitted information.
              The platform does not provide investment advice, financial ratings, or endorsement.
            </p>
          </div>

          {/* Bottom Line */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between text-xs text-gray-400">
            <p>
              © {currentYear} UpForge Registry. All rights reserved.
            </p>

            <div className="flex gap-4 mt-3 md:mt-0 justify-center md:justify-start">
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
              <Link href="/transparency" className="hover:underline">
                Transparency
              </Link>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
