import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-border mt-32">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

          {/* Identity */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-serif text-[22px]">UpForge</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto md:mx-0">
              A structured public registry documenting emerging Indian startups
              and founders in a neutral and standardized format.
            </p>
          </div>

          {/* Registry */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground">
              Registry
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/startups">Browse Startups</Link>
              </li>
              <li>
                <Link href="/evaluation">Evaluation Tool</Link>
              </li>
              <li>
                <Link href="/transparency">Transparency</Link>
              </li>
            </ul>
          </div>

          {/* Participation */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground">
              Participation
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/submit">Submit Startup</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-16 pt-10 text-xs text-muted-foreground space-y-6">

          <p className="max-w-3xl leading-relaxed">
            UpForge operates as an informational public registry. Entries are
            based on publicly available or founder-submitted data. The platform
            does not provide investment advice, endorsement or financial rating.
          </p>

          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <p>© {year} UpForge Registry. All rights reserved.</p>

            <div className="flex gap-6">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
