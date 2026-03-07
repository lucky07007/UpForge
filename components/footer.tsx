//components/footer.tsx
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, Shield, Globe, ExternalLink, CheckCircle2, Award } from "lucide-react";

// ─── TOP 3 INDIA BILLIONAIRES — Forbes-verified, trust + SEO signal ───────────
// Source: Forbes Real-Time Billionaires, March 2025
const INDIA_LEADERS = [
  {
    name: "Mukesh Ambani",
    title: "Chairman, Reliance Industries",
    netWorth: "$96.3B",
    rank: "Global #10",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/thirty/Mukesh_Ambani.jpg/240px-Mukesh_Ambani.jpg",
    // fallback initials if image fails
    initials: "MA",
    ventures: ["Jio Platforms", "Reliance Retail"],
  },
  {
    name: "Gautam Adani",
    title: "Chairman, Adani Group",
    netWorth: "$68.7B",
    rank: "Global #17",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gautam_Adani_cropped.jpg/240px-Gautam_Adani_cropped.jpg",
    initials: "GA",
    ventures: ["Adani Green", "Adani Digital Labs"],
  },
  {
    name: "Shiv Nadar",
    title: "Founder, HCL Technologies",
    netWorth: "$29.4B",
    rank: "Global #56",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Shiv_Nadar.jpg/240px-Shiv_Nadar.jpg",
    initials: "SN",
    ventures: ["HCL Software", "Shiv Nadar Foundation"],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#1A1208",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        borderTop: "3px solid #C9A84C",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Libre+Baskerville:ital,wght@0,400;1,400&display=swap');
        .ft-pf  { font-family: 'Playfair Display', Georgia, serif !important; }
        .ft-bsk { font-family: 'Libre Baskerville', Georgia, serif !important; }
        .ft-sys { font-family: system-ui, sans-serif !important; }
        .ft-link:hover { color: #C9A84C !important; }
        .ft-card:hover { border-color: rgba(201,168,76,.35) !important; background: rgba(255,255,255,.04) !important; }
        .ft-avatar-img { transition: filter .2s ease; }
        .ft-avatar-img:hover { filter: sepia(20%) contrast(110%) !important; }
        @keyframes ftPing {
          0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.9);opacity:0}
        }
        .ft-ping { animation: ftPing 2.2s ease-in-out infinite; }
        .ft-orn::before,.ft-orn::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,.35),rgba(201,168,76,.6),rgba(201,168,76,.35),transparent)}
        .ft-orn{display:flex;align-items:center;gap:10px;color:rgba(201,168,76,.5);font-size:10px;letter-spacing:.28em}
      `}</style>

      {/* ── GOLD TOP RULE STRIP ── */}
      <div
        className="ft-sys"
        style={{ background: "#0F0B06", borderBottom: "1px solid rgba(201,168,76,.18)" }}
      >
        <div
          className="max-w-[1480px] mx-auto px-5 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3"
        >
          <div className="flex items-center gap-5">
            {[
              { icon: Shield, text: "100% Independent" },
              { icon: BadgeCheck, text: "Every listing verified" },
              { icon: Globe, text: "Open & Google-indexed" },
            ].map((item, i) => (
              <div key={i} className="hidden sm:flex items-center gap-1.5">
                <item.icon style={{ width: 10, height: 10, color: "#C9A84C" }} />
                <span style={{ fontSize: 9, color: "rgba(255,255,255,.35)", letterSpacing: ".18em", textTransform: "uppercase" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex" style={{ width: 7, height: 7 }}>
              <span className="ft-ping absolute inline-flex rounded-full"
                style={{ inset: 0, background: "#22c55e", opacity: .6 }} />
              <span className="relative inline-flex rounded-full"
                style={{ width: 7, height: 7, background: "#22c55e" }} />
            </span>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)", letterSpacing: ".18em", textTransform: "uppercase" }}>
              Live Registry · India's Startup Database
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1480px] mx-auto px-5 sm:px-8">

        {/* ── MASTHEAD BRAND BLOCK ── */}
        <div
          className="py-10 sm:py-12 text-center"
          style={{ borderBottom: "1px solid rgba(201,168,76,.18)" }}
        >
          <div className="ft-orn mb-5">INDIA'S INDEPENDENT STARTUP REGISTRY</div>
          <p className="ft-pf font-black leading-none" style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)", color: "#fff", letterSpacing: "-.02em" }}>
            UpForge
          </p>
          <p className="ft-bsk italic mt-2" style={{ fontSize: "clamp(13px,1.8vw,16px)", color: "rgba(255,255,255,.35)" }}>
            Est. 2025 · New Delhi, India · Registry of Record
          </p>
        </div>

        {/* ── INDIA'S LEADING VOICES — trust + SEO ── */}
        <div
          className="py-10"
          style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Award style={{ width: 13, height: 13, color: "#C9A84C" }} />
              <span className="ft-sys" style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(255,255,255,.35)" }}>
                India's Business Leaders — Forbes 2025
              </span>
            </div>
            <a
              href="https://www.forbes.com/billionaires/"
              target="_blank"
              rel="noopener noreferrer"
              className="ft-sys"
              style={{ fontSize: 8, color: "rgba(255,255,255,.2)", letterSpacing: ".14em", textTransform: "uppercase" }}
            >
              Forbes ↗
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {INDIA_LEADERS.map((person, i) => (
              <div
                key={i}
                className="ft-card"
                style={{
                  border: "1px solid rgba(255,255,255,.08)",
                  background: "rgba(255,255,255,.025)",
                  padding: "16px",
                  transition: "border-color .2s ease, background .2s ease",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 52, height: 52, flexShrink: 0, overflow: "hidden",
                    border: "1.5px solid rgba(201,168,76,.3)",
                    background: "#2A1F0E",
                    position: "relative",
                  }}
                >
                  {/* We use img tag for reliability with external URLs */}
                  <img
                    src={person.img}
                    alt={person.name}
                    className="ft-avatar-img"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                    onError={(e) => {
                      // Fallback to initials on image error
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                      const parent = (e.currentTarget as HTMLImageElement).parentElement;
                      if (parent) {
                        parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:900;font-size:16px;color:#C9A84C">${person.initials}</div>`;
                      }
                    }}
                  />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="ft-pf font-bold leading-tight" style={{ fontSize: "14px", color: "#fff" }}>
                      {person.name}
                    </p>
                    <span
                      className="ft-sys flex-shrink-0"
                      style={{ fontSize: 8, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,.35)", padding: "1px 6px" }}
                    >
                      {person.rank}
                    </span>
                  </div>
                  <p className="ft-sys mb-2" style={{ fontSize: 9.5, color: "rgba(255,255,255,.35)", lineHeight: 1.4 }}>
                    {person.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="ft-pf font-black" style={{ fontSize: "1.15rem", color: "#C9A84C" }}>
                      {person.netWorth}
                    </p>
                    <div className="flex gap-1 flex-wrap justify-end">
                      {person.ventures.slice(0, 1).map((v, j) => (
                        <span key={j} className="ft-sys" style={{ fontSize: 8, color: "rgba(255,255,255,.25)", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", padding: "1px 6px" }}>
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="ft-bsk italic mt-4" style={{ fontSize: 9.5, color: "rgba(255,255,255,.18)", textAlign: "right" }}>
            * Forbes Real-Time Billionaires, March 2025. Net worth figures fluctuate daily.
          </p>
        </div>

        {/* ── MAIN FOOTER GRID ── */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-10 py-10"
          style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}
        >
          {/* Brand col */}
          <div className="col-span-2 sm:col-span-1">
            <p className="ft-pf font-black mb-1" style={{ fontSize: "1.35rem", color: "#fff" }}>UpForge</p>
            <p className="ft-bsk italic mb-4" style={{ fontSize: 11.5, color: "rgba(255,255,255,.35)" }}>
              India's Registry of Record
            </p>
            <p className="ft-sys mb-5" style={{ fontSize: 11, color: "rgba(255,255,255,.3)", lineHeight: 1.7, maxWidth: 240 }}>
              India's structured public registry — neutral, open, and independently maintained. No ads, no paid rankings. Ever.
            </p>
            {/* Trust chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {[
                { icon: CheckCircle2, text: "Free Forever" },
                { icon: BadgeCheck, text: "Verified" },
                { icon: Shield, text: "Independent" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5"
                  style={{ border: "1px solid rgba(201,168,76,.25)", padding: "4px 10px" }}>
                  <item.icon style={{ width: 10, height: 10, color: "#C9A84C" }} />
                  <span className="ft-sys" style={{ fontSize: 8.5, color: "rgba(255,255,255,.4)", letterSpacing: ".14em", textTransform: "uppercase" }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/submit"
              className="ft-sys inline-flex items-center gap-2"
              style={{
                fontSize: 10, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase",
                background: "#C9A84C", color: "#1A1208", padding: "10px 20px",
              }}
            >
              List Your Startup →
            </Link>
          </div>

          {/* Registry */}
          <div>
            <h4 className="ft-sys mb-4"
              style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", borderBottom: "1px solid rgba(255,255,255,.08)", paddingBottom: 8 }}>
              Registry
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { label: "Browse Startups", href: "/startup" },
                { label: "Indian Unicorns", href: "/indian-unicorns" },
                { label: "AI Startups", href: "/top-ai-startups" },
                { label: "Best SaaS", href: "/best-saas-startups" },
                { label: "Top Funded", href: "/top-funded-startups" },
                { label: "Founder Stories", href: "/founder-stories" },
              ].map((link) => (
                <li key={link.href} style={{ marginBottom: 10 }}>
                  <Link href={link.href} className="ft-link ft-sys transition-colors"
                    style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Standards */}
          <div>
            <h4 className="ft-sys mb-4"
              style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", borderBottom: "1px solid rgba(255,255,255,.08)", paddingBottom: 8 }}>
              Standards
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { label: "Verification Policy", href: "/verification" },
                { label: "Editorial Policy", href: "/editorial" },
                { label: "Data Policy", href: "/data-policy" },
                { label: "Corrections", href: "/corrections" },
                { label: "Reports", href: "/reports" },
                { label: "About", href: "/about" },
              ].map((link) => (
                <li key={link.href} style={{ marginBottom: 10 }}>
                  <Link href={link.href} className="ft-link ft-sys transition-colors"
                    style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="ft-sys mb-4"
              style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", borderBottom: "1px solid rgba(255,255,255,.08)", paddingBottom: 8 }}>
              Company
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { label: "About UpForge", href: "/about" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
                { label: "Feedback", href: "/feedback" },
                { label: "Submit a Startup", href: "/submit" },
                { label: "Sitemap", href: "/sitemap" },
              ].map((link) => (
                <li key={link.href} style={{ marginBottom: 10 }}>
                  <Link href={link.href} className="ft-link ft-sys transition-colors"
                    style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── SISTER PRODUCTS — compact, no logos ── */}
        <div
          className="py-7"
          style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}
        >
          <p className="ft-sys mb-5"
            style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(255,255,255,.22)" }}>
            From the Same Ecosystem
          </p>
          <div className="grid sm:grid-cols-2 gap-3 max-w-xl">
            {[
              {
                name: "InternAdda",
                href: "https://www.internadda.com",
                desc: "India's internship & early-career platform for students and fresh graduates",
              },
              {
                name: "Arjuna AI",
                href: "https://www.arjunaai.in",
                desc: "AI-powered mock interview platform — practice, get feedback, land the role",
              },
            ].map((product) => (
              <a
                key={product.href}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ft-card flex items-start gap-3 transition-all"
                style={{ border: "1px solid rgba(255,255,255,.07)", background: "rgba(255,255,255,.02)", padding: "12px 14px" }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="ft-pf font-bold" style={{ fontSize: 13.5, color: "rgba(255,255,255,.75)" }}>
                      {product.name}
                    </p>
                    <ExternalLink style={{ width: 10, height: 10, color: "rgba(255,255,255,.2)", flexShrink: 0 }} />
                  </div>
                  <p className="ft-sys" style={{ fontSize: 10.5, color: "rgba(255,255,255,.28)", lineHeight: 1.55 }}>
                    {product.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── LEGAL DISCLAIMER ── */}
        <div className="py-6" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <p className="ft-sys" style={{ fontSize: 10.5, color: "rgba(255,255,255,.2)", lineHeight: 1.75, maxWidth: "72ch" }}>
            UpForge is an informational public registry. Listings are compiled from publicly available sources or founder submissions. We do not provide investment advice, endorsements, rankings, or financial ratings. Information may change over time and should be independently verified before any business or investment decision. Billionaire data sourced from Forbes Real-Time Billionaires, March 2025.
          </p>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="ft-pf font-black" style={{ fontSize: "1rem", color: "rgba(255,255,255,.5)" }}>UpForge</span>
            <span style={{ width: 1, height: 12, background: "rgba(255,255,255,.12)", display: "inline-block" }} />
            <p className="ft-sys" style={{ fontSize: 9.5, color: "rgba(255,255,255,.22)" }}>
              © {year} UpForge Registry. All rights reserved. · Est. 2025 · New Delhi, India
            </p>
          </div>
          <div className="flex flex-wrap gap-5">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Use", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
              { label: "Accessibility", href: "/accessibility" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="ft-link ft-sys transition-colors"
                style={{ fontSize: 9.5, color: "rgba(255,255,255,.22)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
