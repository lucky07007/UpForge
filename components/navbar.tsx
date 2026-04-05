"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, ShieldCheck, Search, Moon, Sun } from "lucide-react";

type NavLink = {
  name: string;
  href: string;
  external?: boolean;
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("upforge-theme") as "light" | "dark" | null;
    const preferred = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferred);
    document.documentElement.setAttribute("data-theme", preferred);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); setSearchOpen(false); }, [pathname]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("upforge-theme", next);
  };

  const links: NavLink[] = [
    { name: "Chronicle",        href: "/"         },
    { name: "Startup Registry", href: "/startup"  },
    { name: "Indian Unicorns",  href: "/indian-unicorns" },
    { name: "Reports",          href: "/reports"  },
    { name: "The Forge",        href: "/blog"     },
    { name: "About",            href: "/about"    },
  ];

  const isActive = (link: NavLink) => {
    if (link.external) return false;
    if (link.href === "/") return pathname === "/";
    return pathname === link.href || pathname.startsWith(link.href + "/");
  };

  return (
    <>
      {/* ── EDITION RIBBON ── */}
      <div
        style={{
          background: "var(--uf-ink)",
          color: "var(--uf-paper)",
          fontFamily: "var(--uf-sans)",
          fontSize: "10px",
          fontWeight: 400,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          padding: "5px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          opacity: 1,
        }}
      >
        <span style={{ opacity: .65 }}>
          {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · India Edition
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "18px", opacity: .75 }}>
          <span>⬡ 5,247 Verified Startups</span>
          <span className="hidden-xs">Open Registry · upforge.org</span>
        </div>
      </div>

      {/* ── MASTHEAD ── */}
      <div
        style={{
          background: "var(--uf-paper)",
          borderBottom: "1px solid var(--uf-rule-light)",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 0",
            gap: "16px",
          }}
        >
          {/* Left meta */}
          <div
            style={{
              fontFamily: "var(--uf-sans)",
              fontSize: "10px",
              color: "var(--uf-ink4)",
              lineHeight: 1.6,
              minWidth: "120px",
            }}
            className="masthead-meta-left"
          >
            <div style={{ fontWeight: 700, color: "var(--uf-gold)", textTransform: "uppercase", letterSpacing: ".14em", fontSize: "9px" }}>
              Global Registry
            </div>
            <div style={{ marginTop: "2px" }}>upforge.in · upforge.org</div>
          </div>

          {/* Center brand */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", flex: "0 0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ position: "relative", width: "32px", height: "32px", overflow: "hidden", flexShrink: 0 }}>
                <Image src="/logo.jpg" alt="UpForge" fill style={{ objectFit: "cover" }} />
              </div>
              <span
                style={{
                  fontFamily: "var(--uf-serif)",
                  fontSize: "clamp(22px, 4vw, 42px)",
                  fontWeight: 900,
                  letterSpacing: "-.02em",
                  color: "var(--uf-ink)",
                  lineHeight: 1,
                }}
              >
                UpForge
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--uf-sans)",
                fontSize: "8.5px",
                letterSpacing: ".26em",
                textTransform: "uppercase",
                color: "var(--uf-ink4)",
                borderTop: "1px solid var(--uf-rule-light)",
                borderBottom: "1px solid var(--uf-rule-light)",
                padding: "3px 8px",
                whiteSpace: "nowrap",
              }}
            >
              The Independent Global Startup Registry
            </div>
          </Link>

          {/* Right meta */}
          <div
            style={{
              fontFamily: "var(--uf-sans)",
              fontSize: "10px",
              color: "var(--uf-ink4)",
              lineHeight: 1.6,
              textAlign: "right",
              minWidth: "120px",
            }}
            className="masthead-meta-right"
          >
            <div style={{ fontWeight: 600, color: "var(--uf-gold)", textTransform: "uppercase", letterSpacing: ".12em", fontSize: "9px" }}>
              UFRN-Verified
            </div>
            <div style={{ marginTop: "2px" }}>Est. 2024 · Vol. II, Issue 14</div>
          </div>
        </div>
      </div>

      {/* ── STICKY NAV BAR ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled ? "var(--uf-paper-scrolled)" : "var(--uf-paper)",
          borderBottom: "2px solid var(--uf-ink)",
          borderTop: "1px solid var(--uf-rule-light)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "background .2s, box-shadow .2s",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,.08)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            height: "44px",
            gap: "0",
          }}
        >
          {/* Desktop Nav links */}
          <nav style={{ display: "flex", alignItems: "center", flex: 1, overflow: "hidden" }} aria-label="Main navigation">
            {links.map((link) => {
              const active = isActive(link);
              const El = link.external ? "a" : Link;
              return (
                <El
                  key={link.name}
                  href={link.href}
                  style={{
                    display: "block",
                    padding: "0 14px",
                    height: "44px",
                    lineHeight: "44px",
                    fontFamily: "var(--uf-sans)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    color: active ? "var(--uf-ink)" : "var(--uf-ink3)",
                    textDecoration: "none",
                    borderBottom: active ? "2px solid var(--uf-ink)" : "2px solid transparent",
                    borderRight: "1px solid var(--uf-rule-light)",
                    whiteSpace: "nowrap",
                    transition: "color .15s, border-color .15s",
                  }}
                  className="nav-link-desktop"
                >
                  {link.name}
                </El>
              );
            })}
          </nav>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              style={{
                background: "none",
                border: "1px solid var(--uf-rule)",
                padding: "5px 8px",
                cursor: "pointer",
                color: "var(--uf-ink3)",
                display: "flex",
                alignItems: "center",
                transition: "border-color .15s, color .15s",
              }}
              className="icon-btn"
            >
              <Search size={13} />
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                background: "none",
                border: "1px solid var(--uf-rule)",
                padding: "5px 8px",
                cursor: "pointer",
                color: "var(--uf-ink3)",
                display: "flex",
                alignItems: "center",
                transition: "border-color .15s, color .15s",
              }}
              className="icon-btn"
            >
              {theme === "light" ? <Moon size={13} /> : <Sun size={13} />}
            </button>

            {/* Verify UFRN */}
            <Link
              href="/verify"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "5px 12px",
                border: "1px solid var(--uf-rule)",
                fontFamily: "var(--uf-sans)",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "var(--uf-ink3)",
                textDecoration: "none",
                transition: "border-color .15s, color .15s",
                whiteSpace: "nowrap",
              }}
              className="btn-verify nav-desktop-only"
            >
              <ShieldCheck size={11} />
              Verify UFRN
            </Link>

            {/* List Startup */}
            <Link
              href="/submit"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "5px 14px",
                background: "var(--uf-ink)",
                border: "none",
                fontFamily: "var(--uf-sans)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "var(--uf-paper)",
                textDecoration: "none",
                transition: "background .15s",
                whiteSpace: "nowrap",
              }}
              className="btn-list nav-desktop-only"
            >
              List Startup <ChevronRight size={11} />
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              style={{
                background: "none",
                border: "1px solid var(--uf-rule)",
                padding: "5px 8px",
                cursor: "pointer",
                color: "var(--uf-ink)",
                display: "none",
                alignItems: "center",
              }}
              className="hamburger-btn"
            >
              {isOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Search Bar dropdown */}
        {searchOpen && (
          <div
            style={{
              borderTop: "1px solid var(--uf-rule-light)",
              padding: "10px 20px",
              background: "var(--uf-paper2)",
            }}
          >
            <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
              <input
                autoFocus
                type="search"
                placeholder="Search startups, founders, UFRN numbers…"
                style={{
                  width: "100%",
                  border: "1px solid var(--uf-ink3)",
                  padding: "9px 14px",
                  fontFamily: "var(--uf-body)",
                  fontSize: "15px",
                  background: "var(--uf-paper)",
                  color: "var(--uf-ink)",
                  outline: "none",
                }}
              />
            </div>
          </div>
        )}
      </header>

      {/* ── MOBILE MENU OVERLAY ── */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
          }}
        >
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.3)", backdropFilter: "blur(2px)" }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              background: "var(--uf-paper)",
              borderBottom: "2px solid var(--uf-ink)",
              paddingTop: "120px", // below ribbon + masthead + nav
            }}
          >
            <div style={{ borderTop: "1px solid var(--uf-rule-light)" }}>
              {links.map((link) => {
                const active = isActive(link);
                const El = link.external ? "a" : Link;
                return (
                  <El
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 20px",
                      fontFamily: "var(--uf-sans)",
                      fontSize: "12px",
                      fontWeight: active ? 600 : 400,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: active ? "var(--uf-ink)" : "var(--uf-ink3)",
                      textDecoration: "none",
                      background: active ? "var(--uf-paper2)" : "none",
                      borderBottom: "1px solid var(--uf-rule-light)",
                    }}
                  >
                    {link.name}
                    {active && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--uf-gold)" }} />}
                  </El>
                );
              })}
            </div>
            <div
              style={{
                padding: "14px 20px",
                display: "flex",
                gap: "10px",
                background: "var(--uf-paper2)",
                borderTop: "1px solid var(--uf-rule)",
              }}
            >
              <Link
                href="/verify"
                onClick={() => setIsOpen(false)}
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "10px 12px",
                  border: "1px solid var(--uf-rule)",
                  fontFamily: "var(--uf-sans)",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "var(--uf-ink3)",
                  textDecoration: "none",
                }}
              >
                <ShieldCheck size={11} /> Verify UFRN
              </Link>
              <Link
                href="/submit"
                onClick={() => setIsOpen(false)}
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "10px 12px",
                  background: "var(--uf-ink)",
                  fontFamily: "var(--uf-sans)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "var(--uf-paper)",
                  textDecoration: "none",
                }}
              >
                List Startup <ChevronRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── GLOBAL CSS VARIABLES + RESPONSIVE ── */}
      <style>{`
        :root {
          --uf-serif: 'Playfair Display', 'Georgia', 'Times New Roman', serif;
          --uf-body: 'EB Garamond', 'Georgia', serif;
          --uf-sans: 'DM Sans', system-ui, sans-serif;

          --uf-ink:  #111008;
          --uf-ink2: #2a2820;
          --uf-ink3: #555248;
          --uf-ink4: #888480;
          --uf-paper: #FAFAF6;
          --uf-paper-scrolled: rgba(250,250,246,.94);
          --uf-paper2: #F3F2EC;
          --uf-gold: #A07D10;
          --uf-accent: #8B1A1A;
          --uf-rule: rgba(0,0,0,.18);
          --uf-rule-light: rgba(0,0,0,.1);
        }
        [data-theme="dark"] {
          --uf-ink:  #F0EDE3;
          --uf-ink2: #D6D2C6;
          --uf-ink3: #9A9690;
          --uf-ink4: #666360;
          --uf-paper: #141410;
          --uf-paper-scrolled: rgba(20,20,16,.94);
          --uf-paper2: #1C1C18;
          --uf-gold: #D4A90E;
          --uf-accent: #E05050;
          --uf-rule: rgba(255,255,255,.14);
          --uf-rule-light: rgba(255,255,255,.08);
        }
        .nav-link-desktop:hover {
          color: var(--uf-ink) !important;
          border-bottom-color: var(--uf-ink4) !important;
        }
        .icon-btn:hover { border-color: var(--uf-ink) !important; color: var(--uf-ink) !important; }
        .btn-verify:hover { border-color: var(--uf-ink) !important; color: var(--uf-ink) !important; }
        .btn-list:hover { background: var(--uf-ink2) !important; }
        @media (max-width: 768px) {
          .nav-link-desktop { display: none !important; }
          .nav-desktop-only { display: none !important; }
          .hamburger-btn { display: inline-flex !important; }
          .masthead-meta-left, .masthead-meta-right { display: none !important; }
        }
        @media (max-width: 480px) {
          .hidden-xs { display: none !important; }
        }
      `}</style>
    </>
  );
}
