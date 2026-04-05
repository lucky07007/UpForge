"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, ShieldCheck, Search, Moon, Sun } from "lucide-react";

type NavLink = { name: string; href: string; external?: boolean };

const LINKS: NavLink[] = [
  { name: "Chronicle",        href: "/"                },
  { name: "Startup Registry", href: "/startup"         },
  { name: "Global Unicorns",  href: "/indian-unicorns" },
  { name: "Reports",          href: "/reports"         },
  { name: "The Forge",        href: "/blog"            },
  { name: "About",            href: "/about"           },
];

export function Navbar() {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [searching, setSearching] = useState(false);
  const [theme,     setTheme]     = useState<"light" | "dark">("light");
  const searchRef = useRef<HTMLInputElement>(null);
  const pathname  = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem("uf-theme") as "light" | "dark" | null;
    const t = stored ?? (window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
    applyTheme(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); setSearching(false); }, [pathname]);
  useEffect(() => { if (searching) searchRef.current?.focus(); }, [searching]);

  function applyTheme(t: "light" | "dark") {
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("uf-theme", t);
  }

  const isActive = (l: NavLink) => {
    if (l.external) return false;
    return l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
  };

  return (
    <>
      {/* ── RIBBON ── */}
      <div className="uf-ribbon">
        <span className="uf-ribbon-date">
          {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </span>
        <div className="uf-ribbon-right">
          <span>⬡&nbsp;5,247 Verified Startups</span>
          <span className="uf-ribbon-sep">·</span>
          <span className="uf-ribbon-hide-sm">Open Registry&nbsp;·&nbsp;</span>
          <span>upforge.org</span>
        </div>
      </div>

      {/* ── MASTHEAD ── */}
      <div className="uf-masthead">
        <div className="uf-masthead-inner">
          <div className="uf-mast-meta uf-mast-left">
            <div className="uf-mast-label">Global Registry</div>
            <div className="uf-mast-sub">upforge.org · upforge.in</div>
          </div>

          <Link href="/" className="uf-brand" aria-label="UpForge Home">
            <div className="uf-brand-logo">
              <Image src="/logo.jpg" alt="UpForge" fill style={{ objectFit: "cover" }} priority />
            </div>
            <div className="uf-brand-wordmark">UpForge</div>
            <div className="uf-brand-tagline">The Independent Global Startup Registry</div>
          </Link>

          <div className="uf-mast-meta uf-mast-right">
            <div className="uf-mast-label uf-mast-gold">UFRN-Verified</div>
            <div className="uf-mast-sub">Est. 2024 · Vol. II, Issue 14</div>
          </div>
        </div>
      </div>

      {/* ── STICKY NAV ── */}
      <header className={`uf-navbar${scrolled ? " uf-navbar--scrolled" : ""}`}>
        <div className="uf-navbar-inner">
          <nav className="uf-nav-links" aria-label="Main navigation">
            {LINKS.map((l) => {
              const active = isActive(l);
              const El = (l.external ? "a" : Link) as any;
              return (
                <El
                  key={l.name}
                  href={l.href}
                  className={`uf-nav-link${active ? " uf-nav-link--active" : ""}`}
                >
                  {l.name}
                </El>
              );
            })}
          </nav>

          <div className="uf-nav-controls">
            <button className="uf-icon-btn" onClick={() => setSearching((s) => !s)} aria-label="Search">
              {searching ? <X size={14} /> : <Search size={14} />}
            </button>
            <button className="uf-icon-btn" onClick={() => applyTheme(theme === "light" ? "dark" : "light")} aria-label="Toggle theme">
              {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
            </button>
            <Link href="/verify" className="uf-btn-outline uf-desktop-only">
              <ShieldCheck size={11} /> Verify UFRN
            </Link>
            <Link href="/submit" className="uf-btn-solid uf-desktop-only">
              List Startup <ChevronRight size={11} />
            </Link>
            <button className="uf-icon-btn uf-mobile-only" onClick={() => setOpen((o) => !o)} aria-label="Menu">
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {searching && (
          <div className="uf-search-bar">
            <div className="uf-search-inner">
              <Search size={14} style={{ color: "var(--uf-ink4)", flexShrink: 0 }} />
              <input
                ref={searchRef}
                type="search"
                placeholder="Search startups, founders, UFRN numbers…"
                className="uf-search-input"
              />
              <kbd className="uf-kbd">ESC</kbd>
            </div>
          </div>
        )}
      </header>

      {/* ── MOBILE MENU ── */}
      {open && (
        <div className="uf-mobile-overlay">
          <div className="uf-mobile-backdrop" onClick={() => setOpen(false)} />
          <div className="uf-mobile-panel">
            {LINKS.map((l) => {
              const active = isActive(l);
              const El = (l.external ? "a" : Link) as any;
              return (
                <El
                  key={l.name}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`uf-mobile-link${active ? " uf-mobile-link--active" : ""}`}
                >
                  <span>{l.name}</span>
                  {active && <span className="uf-mobile-dot" />}
                </El>
              );
            })}
            <div className="uf-mobile-ctas">
              <Link href="/verify" onClick={() => setOpen(false)} className="uf-btn-outline uf-mobile-cta">
                <ShieldCheck size={11} /> Verify UFRN
              </Link>
              <Link href="/submit" onClick={() => setOpen(false)} className="uf-btn-solid uf-mobile-cta">
                List Startup <ChevronRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        :root {
          --uf-serif:  'Playfair Display','Georgia','Times New Roman',serif;
          --uf-body:   'EB Garamond','Georgia',serif;
          --uf-sans:   'DM Sans',system-ui,sans-serif;
          --uf-ink:    #0E0D08; --uf-ink2: #27261E; --uf-ink3: #4F4D44; --uf-ink4: #888580; --uf-ink5: #BAB7B0;
          --uf-paper:  #F8F7F2; --uf-paper2: #F0EFE8; --uf-paper3: #E6E4DC; --uf-paper4: #D8D5CA;
          --uf-gold:   #A87C0C; --uf-gold2: #C9980F; --uf-accent: #8B1A1A;
          --uf-rule:       rgba(0,0,0,.13);
          --uf-rule-light: rgba(0,0,0,.07);
          --uf-navbar-h: 46px;
        }
        [data-theme="dark"] {
          --uf-ink:    #EDE9DC; --uf-ink2: #D0CCB8; --uf-ink3: #9A9688; --uf-ink4: #625E54; --uf-ink5: #3E3B34;
          --uf-paper:  #131210; --uf-paper2: #1A1916; --uf-paper3: #22201C; --uf-paper4: #2C2A24;
          --uf-gold:   #D4A90E; --uf-gold2: #F0C520; --uf-accent: #D94040;
          --uf-rule:       rgba(255,255,255,.11);
          --uf-rule-light: rgba(255,255,255,.05);
        }

        .uf-ribbon {
          background: var(--uf-ink); color: rgba(255,255,255,.5);
          font-family: var(--uf-sans); font-size: 10px; letter-spacing: .15em; text-transform: uppercase;
          padding: 5px 24px; display: flex; align-items: center; justify-content: space-between; gap: 12px;
        }
        .uf-ribbon-right { display:flex; align-items:center; gap:7px; }
        .uf-ribbon-sep   { opacity:.25; }

        .uf-masthead { background: var(--uf-ink); padding: 0 24px; border-bottom: 1px solid rgba(255,255,255,.05); }
        .uf-masthead-inner {
          max-width: 1440px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: center; padding: 18px 0; gap: 12px;
        }
        .uf-mast-meta  { font-family: var(--uf-sans); font-size: 10px; line-height: 1.65; }
        .uf-mast-left  { text-align: left; }
        .uf-mast-right { text-align: right; }
        .uf-mast-label { font-weight:700; letter-spacing:.18em; text-transform:uppercase; font-size:9px; color:rgba(255,255,255,.38); }
        .uf-mast-gold  { color: var(--uf-gold2) !important; }
        .uf-mast-sub   { color:rgba(255,255,255,.25); margin-top:2px; }

        .uf-brand { display:flex; flex-direction:column; align-items:center; gap:5px; text-decoration:none; }
        .uf-brand-logo {
          position:relative; width:38px; height:38px; overflow:hidden; border-radius:2px; flex-shrink:0;
          border: 1px solid rgba(255,255,255,.12);
        }
        .uf-brand-wordmark {
          font-family: var(--uf-serif); font-size: clamp(28px,4.5vw,52px);
          font-weight: 900; letter-spacing: -.02em; color: #fff; line-height: 1;
        }
        .uf-brand-tagline {
          font-family: var(--uf-sans); font-size: 8.5px; letter-spacing: .26em; text-transform: uppercase;
          color: rgba(255,255,255,.32); border-top:1px solid rgba(255,255,255,.1); border-bottom:1px solid rgba(255,255,255,.1);
          padding: 3px 14px; white-space: nowrap;
        }

        .uf-navbar {
          position:sticky; top:0; z-index:50;
          background: var(--uf-paper);
          border-top: 1px solid var(--uf-rule-light);
          border-bottom: 2px solid var(--uf-ink);
          transition: background .2s, box-shadow .2s;
        }
        .uf-navbar--scrolled {
          background: color-mix(in srgb,var(--uf-paper) 92%,transparent);
          backdrop-filter: blur(14px) saturate(1.4);
          box-shadow: 0 2px 28px rgba(0,0,0,.08);
        }
        .uf-navbar-inner {
          max-width:1440px; margin:0 auto; padding:0 24px;
          display:flex; align-items:center; height:var(--uf-navbar-h);
        }
        .uf-nav-links { display:flex; align-items:center; flex:1; overflow:hidden; }
        .uf-nav-link {
          display:block; padding:0 15px; height:var(--uf-navbar-h); line-height:var(--uf-navbar-h);
          font-family:var(--uf-sans); font-size:11px; font-weight:500; letter-spacing:.12em; text-transform:uppercase;
          color:var(--uf-ink4); text-decoration:none;
          border-bottom:2px solid transparent; border-right:1px solid var(--uf-rule-light);
          white-space:nowrap; transition:color .15s, border-color .15s;
        }
        .uf-nav-link:hover      { color:var(--uf-ink); }
        .uf-nav-link--active    { color:var(--uf-ink); border-bottom-color:var(--uf-ink); }

        .uf-nav-controls { display:flex; align-items:center; gap:6px; padding-left:14px; flex-shrink:0; }
        .uf-icon-btn {
          display:inline-flex; align-items:center; justify-content:center;
          width:32px; height:32px; background:none;
          border:1px solid var(--uf-rule); color:var(--uf-ink4); cursor:pointer;
          transition:border-color .15s,color .15s;
        }
        .uf-icon-btn:hover { border-color:var(--uf-ink); color:var(--uf-ink); }
        .uf-btn-outline {
          display:inline-flex; align-items:center; gap:5px; padding:6px 12px;
          border:1px solid var(--uf-rule);
          font-family:var(--uf-sans); font-size:10px; font-weight:600; letter-spacing:.12em; text-transform:uppercase;
          color:var(--uf-ink3); text-decoration:none; white-space:nowrap;
          transition:border-color .15s,color .15s;
        }
        .uf-btn-outline:hover { border-color:var(--uf-ink); color:var(--uf-ink); }
        .uf-btn-solid {
          display:inline-flex; align-items:center; gap:5px; padding:6px 15px;
          background:var(--uf-ink); border:none;
          font-family:var(--uf-sans); font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
          color:var(--uf-paper); text-decoration:none; white-space:nowrap; cursor:pointer;
          transition:background .15s;
        }
        .uf-btn-solid:hover { background:var(--uf-ink3); }

        .uf-search-bar  { background:var(--uf-paper2); border-top:1px solid var(--uf-rule-light); padding:10px 24px; }
        .uf-search-inner {
          max-width:1440px; margin:0 auto;
          display:flex; align-items:center; gap:10px;
          border:1px solid var(--uf-ink3); padding:9px 14px; background:var(--uf-paper);
        }
        .uf-search-input {
          flex:1; border:none; outline:none; background:transparent;
          font-family:var(--uf-body); font-size:15px; color:var(--uf-ink);
        }
        .uf-search-input::placeholder { color:var(--uf-ink5); }
        .uf-kbd {
          font-family:var(--uf-sans); font-size:9px; letter-spacing:.1em; text-transform:uppercase;
          color:var(--uf-ink5); border:1px solid var(--uf-rule); padding:2px 6px; flex-shrink:0;
        }

        .uf-mobile-overlay  { position:fixed; inset:0; z-index:40; }
        .uf-mobile-backdrop { position:absolute; inset:0; background:rgba(0,0,0,.38); backdrop-filter:blur(3px); }
        .uf-mobile-panel    {
          position:absolute; top:0; left:0; right:0;
          background:var(--uf-paper); border-bottom:2px solid var(--uf-ink);
          padding-top:136px;
        }
        .uf-mobile-link {
          display:flex; align-items:center; justify-content:space-between;
          padding:14px 20px;
          font-family:var(--uf-sans); font-size:11px; font-weight:500; letter-spacing:.14em; text-transform:uppercase;
          color:var(--uf-ink3); text-decoration:none;
          border-bottom:1px solid var(--uf-rule-light);
        }
        .uf-mobile-link--active { color:var(--uf-ink); background:var(--uf-paper2); }
        .uf-mobile-dot  { width:6px; height:6px; border-radius:50%; background:var(--uf-gold); flex-shrink:0; }
        .uf-mobile-ctas { display:flex; gap:10px; padding:14px 20px; background:var(--uf-paper2); border-top:1px solid var(--uf-rule); }
        .uf-mobile-cta  { flex:1; justify-content:center; }

        .uf-desktop-only { display:inline-flex !important; }
        .uf-mobile-only  { display:none !important; }

        @media (max-width:900px) {
          .uf-nav-links    { display:none !important; }
          .uf-desktop-only { display:none !important; }
          .uf-mobile-only  { display:inline-flex !important; }
          .uf-mast-meta    { display:none !important; }
          .uf-masthead-inner { grid-template-columns:1fr; justify-items:center; padding:14px 0; }
        }
        @media (max-width:480px) {
          .uf-ribbon-hide-sm   { display:none; }
          .uf-brand-tagline    { display:none; }
          .uf-brand-wordmark   { font-size:28px; }
          .uf-ribbon           { font-size:9px; padding:4px 16px; }
          .uf-navbar-inner     { padding:0 16px; }
          .uf-search-bar       { padding:8px 16px; }
        }
      `}</style>
    </>
  );
}
