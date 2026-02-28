import Link from "next/link";
import { BadgeCheck, Calculator, FileText } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-border mt-24 sm:mt-32">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">

          {/* Identity + Value Props */}
          <div className="md:col-span-1 space-y-6">
            <h3 className="font-serif text-2xl tracking-tight">UpForge</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              India’s independent startup registry. Free verified listings,
              AI‑powered growth reports, and valuation estimates.
            </p>
            <div className="flex gap-4 text-muted-foreground">
              <BadgeCheck className="w-5 h-5" />
              <Calculator className="w-5 h-5" />
              <FileText className="w-5 h-5" />
            </div>
          </div>

          {/* Registry */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              Registry
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/startups" className="hover:text-foreground transition-colors">
                  Browse Startups
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-foreground transition-colors">
                  Sample Report
                </Link>
              </li>
              <li>
                <Link href="/valuation" className="hover:text-foreground transition-colors">
                  Valuation Estimator
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-foreground transition-colors">
                  Industries
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/transparency" className="hover:text-foreground transition-colors">
                  Transparency
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Participate */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              Participate
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/submit" className="hover:text-foreground transition-colors">
                  Submit Startup
                </Link>
              </li>
              <li>
                <Link href="/claim" className="hover:text-foreground transition-colors">
                  Claim Listing
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-foreground transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-16 pt-8 text-xs text-muted-foreground space-y-6">

          <p className="max-w-3xl leading-relaxed">
            UpForge is an informational public registry. Listings are based on
            publicly available or founder‑submitted data. We do not provide
            investment advice, endorsement, or financial ratings.
          </p>

          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <p>© {year} UpForge Registry. All rights reserved.</p>

            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
            </div>
          </div>

          {/* Optional small badge or version */}
          <p className="text-xs text-muted-foreground/50">
            v1.0 · Independent registry
          </p>
        </div>

      </div>
    </footer>
  );
}
