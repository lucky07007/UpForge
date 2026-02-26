// components/footer.tsx
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          <div className="md:col-span-6">
            <h3 className="font-serif text-xl font-bold mb-2">UpForge</h3>
            <p className="text-sm text-gray-500">Open Founder Discovery Platform</p>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/startup">Startups</Link></li>
              <li><Link href="/newsletter">Newsletter</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/apply">Submit Startup</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/definition">Startup Definition</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <p className="text-[13px] text-gray-400">
            © {currentYear} UpForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
