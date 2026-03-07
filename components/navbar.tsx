//components/navbar.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, BadgeCheck, Shield } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const links = [
    { name: "Registry", href: "/startup" },
    { name: "Unicorns", href: "/indian-unicorns" },
    { name: "Founders", href: "/founder-stories" },
    { name: "Reports", href: "/reports" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        .nav-playfair { font-family: 'Playfair Display', Georgia, serif; }
        .nav-bask { font-family: 'Libre Baskerville', Georgia, serif; }
        .nav-sys { font-family: system-ui, sans-serif; }
        @keyframes navPing {
          0%, 100% { transform: scale(1); opacity: .75; }
          50% { transform: scale(1.8); opacity: 0; }
        }
        .live-ping { animation: navPing 2s ease-in-out infinite; }
      `}</style>

      <header
        className={`fixed top-0 w-full z-50 transition-all duration-200 ${
          scrolled
            ? "shadow-[0_2px_20px_rgba(26,18,8,.10)]"
            : ""
        }`}
        style={{
          background: scrolled ? "rgba(245,240,232,.97)" : "#F5F0E8",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: "2px solid #1A1208",
        }}
      >
        {/* ── TOP DATELINE STRIP ── */}
        <div
          className="nav-sys hidden sm:flex items-center justify-between px-5 lg:px-10 py-1"
          style={{ borderBottom: "1px solid #C8BCA8", background: "#EDE7DA" }}
        >
          <div className="flex items-center gap-5">
            {[
              { icon: Shield, text: "100% Independent" },
              { icon: BadgeCheck, text: "Manually Verified" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <item.icon style={{ width: 10, height: 10, color: "#8B7355" }} />
                <span style={{ fontSize: 9, color: "#8B7355", letterSpacing: ".18em", textTransform: "uppercase" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Pulse live indicator */}
          <div className="flex items-center gap-4">
            <span style={{ fontSize: 9, color: "#B0A090", letterSpacing: ".18em", textTransform: "uppercase" }}>
              Est. 2025 · New Delhi, India
            </span>
            <div className="flex items-center gap-1.5">
              <span className="relative flex" style={{ width: 7, height: 7 }}>
                <span className="live-ping absolute inline-flex rounded-full"
                  style={{ inset: 0, background: "#22c55e", opacity: .6 }} />
                <span className="relative inline-flex rounded-full"
                  style={{ width: 7, height: 7, background: "#22c55e" }} />
              </span>
              <span style={{ fontSize: 9, color: "#8B7355", letterSpacing: ".18em", textTransform: "uppercase" }}>
                Live Registry
              </span>
            </div>
          </div>
        </div>

        {/* ── MAIN NAV ROW ── */}
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between gap-6">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            {/* Monogram block — matches page masthead style */}
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: 32, height: 32, background: "#1A1208" }}
            >
              <span className="nav-playfair font-black" style={{ color: "#C9A84C", fontSize: 13, lineHeight: 1 }}>
                UF
              </span>
            </div>
            <div>
              <span
                className="nav-playfair font-black leading-none block transition-colors group-hover:text-[#8B5E3C]"
                style={{ fontSize: "1.25rem", color: "#1A1208", letterSpacing: "-.02em" }}
              >
                UpForge
              </span>
              <span
                className="nav-sys hidden sm:block"
                style={{ fontSize: 8, color: "#B0A090", letterSpacing: ".22em", textTransform: "uppercase", lineHeight: 1.2 }}
              >
                India's Startup Registry
              </span>
            </div>
          </Link>

          {/* Desktop nav — separator-rule style like newspaper section tabs */}
          <nav className="hidden md:flex items-stretch flex-1 justify-center">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="nav-sys relative px-4 flex items-center transition-colors"
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: active ? "#1A1208" : "#8B7355",
                    borderBottom: active ? "2px solid #C9A84C" : "2px solid transparent",
                    borderRight: "1px solid #DDD9CF",
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "#1A1208"; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = "#8B7355"; }}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <Link
              href="/submit"
              className="nav-sys flex items-center gap-1.5 transition-colors"
              style={{
                fontSize: 10, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase",
                background: "#1A1208", color: "#C9A84C", padding: "8px 16px",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#C9A84C";
                (e.currentTarget as HTMLElement).style.color = "#1A1208";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "#1A1208";
                (e.currentTarget as HTMLElement).style.color = "#C9A84C";
              }}
            >
              + List Free
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-1.5 transition-colors"
            style={{ color: "#1A1208" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(26,18,8,.35)", backdropFilter: "blur(3px)" }}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-14 left-0 right-0 transition-transform duration-200 ${
            isOpen ? "translate-y-0" : "-translate-y-2"
          }`}
          style={{
            background: "#F5F0E8",
            borderBottom: "3px solid #1A1208",
            borderTop: "1px solid #C8BCA8",
          }}
        >
          {/* Links */}
          <div style={{ borderBottom: "1px solid #C8BCA8" }}>
            {[{ name: "Home", href: "/" }, ...links].map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="nav-sys flex items-center justify-between px-6 py-4 transition-colors"
                  style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase",
                    color: active ? "#1A1208" : "#8B7355",
                    background: active ? "#EDE7DA" : "transparent",
                    borderBottom: "1px solid #E8E2D8",
                  }}
                >
                  {link.name}
                  {active && (
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A84C", display: "block" }} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Bottom bar */}
          <div
            className="px-6 py-4 flex items-center justify-between gap-3"
            style={{ background: "#EDE7DA" }}
          >
            <div className="flex items-center gap-2">
              <span className="relative flex" style={{ width: 7, height: 7 }}>
                <span className="live-ping absolute inline-flex rounded-full"
                  style={{ inset: 0, background: "#22c55e", opacity: .6 }} />
                <span className="relative inline-flex rounded-full"
                  style={{ width: 7, height: 7, background: "#22c55e" }} />
              </span>
              <span className="nav-sys" style={{ fontSize: 9, color: "#8B7355", letterSpacing: ".16em", textTransform: "uppercase" }}>
                Live Registry
              </span>
            </div>
            <Link
              href="/submit"
              onClick={() => setIsOpen(false)}
              className="nav-sys flex items-center gap-1.5"
              style={{
                fontSize: 10, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase",
                background: "#1A1208", color: "#C9A84C", padding: "8px 16px",
              }}
            >
              List Free <ChevronRight style={{ width: 12, height: 12 }} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
