// components/StartupRegistry.tsx — CLIENT COMPONENT
"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback, useTransition } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  ArrowUpRight,
  Calendar,
  Star,
  Search,
  X,
  Loader2,
  ChevronDown,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Startup {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  website?: string;
  founders?: string;
  founded_year?: number;
  category?: string;
  is_featured?: boolean;
  created_at?: string;
}

interface Props {
  startups: Startup[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  sectorFilter: string;
  searchQuery: string;
  yearFilter: string;
  sortBy: string;
  uniqueYears: number[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SECTORS = [
  { name: "AI/ML",        hot: true  },
  { name: "FinTech",      hot: true  },
  { name: "SaaS",         hot: true  },
  { name: "Space Tech",   hot: true  },
  { name: "Climate Tech", hot: false },
  { name: "D2C Brands",   hot: false },
  { name: "HealthTech",   hot: false },
  { name: "EdTech",       hot: false },
  { name: "DeepTech",     hot: false },
];

const SORT_OPTIONS = [
  { value: "name",   label: "Name A–Z"     },
  { value: "newest", label: "Newest First" },
  { value: "year",   label: "Founded Year" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function StartupRegistry({
  startups,
  totalCount,
  totalPages,
  currentPage,
  sectorFilter,
  searchQuery,
  yearFilter,
  sortBy,
  uniqueYears,
}: Props) {
  const router   = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();
  const [localSearch,   setLocalSearch]   = useState(searchQuery);
  const [yearOpen,      setYearOpen]      = useState(false);
  const [sortOpen,      setSortOpen]      = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [visible,       setVisible]       = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Page-enter animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  // Sync search input with URL (back/forward)
  useEffect(() => { setLocalSearch(searchQuery); }, [searchQuery]);

  // Build query-string URL — only include non-default values
  const buildUrl = useCallback(
    (overrides: Record<string, string | undefined>): string => {
      const base: Record<string, string | undefined> = {
        sector: sectorFilter  || undefined,
        q:      searchQuery   || undefined,
        year:   yearFilter    || undefined,
        sort:   sortBy !== "name" ? sortBy : undefined,
        page:   currentPage > 1 ? String(currentPage) : undefined,
      };
      const merged = { ...base, ...overrides };
      const p = new URLSearchParams();
      Object.entries(merged).forEach(([k, v]) => { if (v) p.set(k, v); });
      const qs = p.toString();
      return `${pathname}${qs ? `?${qs}` : ""}`;
    },
    [pathname, sectorFilter, searchQuery, yearFilter, sortBy, currentPage]
  );

  // Debounced search → router push
  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (localSearch === searchQuery) return;
    debounceRef.current = setTimeout(() => {
      startTransition(() => {
        router.push(buildUrl({ q: localSearch || undefined, page: undefined }));
      });
    }, 420);
    return () => clearTimeout(debounceRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearch]);

  // Close dropdowns on outside click
  useEffect(() => {
    const close = () => { setYearOpen(false); setSortOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const navigate = (url: string) => startTransition(() => router.push(url));

  const hasActiveFilters = !!(sectorFilter || yearFilter || (sortBy && sortBy !== "name"));
  const showFeatured     = currentPage === 1 && !sectorFilter && !searchQuery && !yearFilter;

  // On page 1 (no filters): first 3 are is_featured=true, rest go to grid
  const featuredStartups = showFeatured ? startups.filter(s => s.is_featured).slice(0, 3) : [];
  const gridStartups     = showFeatured
    ? startups.filter(s => !featuredStartups.includes(s))
    : startups;

  const currentSortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label ?? "Name A–Z";

  return (
    <>
      <style>{CSS}</style>

      <div
        className="registry-root rp"
        style={{
          opacity:    visible ? 1 : 0,
          transform:  visible ? "translateY(0)" : "translateY(14px)",
          transition: "opacity .45s cubic-bezier(.16,1,.3,1), transform .45s cubic-bezier(.16,1,.3,1)",
        }}
      >
        {/* ── BREADCRUMB ────────────────────────────────────────────── */}
        <nav className="sf breadcrumb-bar">
          <div className="container">
            <ol className="breadcrumb-list">
              <li><Link href="/" className="bc-link">UpForge</Link></li>
              <li className="bc-sep">/</li>
              <li className="bc-current">Startup Registry</li>
            </ol>
          </div>
        </nav>

        {/* ── MASTHEAD ──────────────────────────────────────────────── */}
        <header className="masthead">
          <div className="container">
            <div className="masthead-inner">
              <div className="masthead-eyebrow sf">
                <div className="rule-line" />
                <span>India Edition · 2026</span>
                <div className="rule-line" />
              </div>

              <h1 className="pf masthead-title">Startup Registry</h1>

              <p className="rp masthead-sub">
                India's independent registry of verified builders — free, structured, permanent.
              </p>

              <div className="masthead-meta sf">
                <div className="live-pill">
                  <span className="ldot" />
                  <span>Live · {totalCount.toLocaleString()} Profiles</span>
                </div>
                <span className="meta-divider" />
                <span className="vbadge">
                  <BadgeCheck style={{ width: 9, height: 9 }} />
                  All Verified
                </span>
                <span className="meta-divider" />
                <span className="meta-muted">Updated Daily</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── CONTROLS ──────────────────────────────────────────────── */}
        <div className="controls-zone">
          <div className="container">

            {/* Search row */}
            <div className="search-row">
              <div
                className={`search-wrap${searchFocused ? " focused" : ""}`}
                onMouseDown={e => e.stopPropagation()}
              >
                {isPending
                  ? <Loader2 className="search-icon spin" />
                  : <Search  className="search-icon" />
                }
                <input
                  type="text"
                  className="search-input sf"
                  placeholder="Search startups, founders, categories…"
                  value={localSearch}
                  onChange={e => setLocalSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={()  => setSearchFocused(false)}
                  aria-label="Search startups"
                />
                {localSearch && (
                  <button
                    className="search-clear"
                    onClick={() => {
                      setLocalSearch("");
                      navigate(buildUrl({ q: undefined, page: undefined }));
                    }}
                    aria-label="Clear search"
                  >
                    <X style={{ width: 10, height: 10 }} />
                  </button>
                )}
                {isPending && <div className="scan-line" />}
              </div>

              {/* Sort dropdown */}
              <div
                className="dropdown-wrap"
                onMouseDown={e => {
                  e.stopPropagation();
                  setSortOpen(s => !s);
                  setYearOpen(false);
                }}
              >
                <button className={`ctrl-btn sf${sortOpen ? " open" : ""}`}>
                  <span className="ctrl-label">{currentSortLabel}</span>
                  <ChevronDown
                    style={{ width: 10, height: 10, transition: "transform .2s", transform: sortOpen ? "rotate(180deg)" : "none" }}
                  />
                </button>
                {sortOpen && (
                  <div className="dropdown-menu" onMouseDown={e => e.stopPropagation()}>
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        className={`drop-item sf${sortBy === opt.value ? " active" : ""}`}
                        onClick={() => {
                          setSortOpen(false);
                          navigate(buildUrl({ sort: opt.value !== "name" ? opt.value : undefined, page: undefined }));
                        }}
                      >
                        {opt.label}
                        {sortBy === opt.value && <span className="check-mark">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Year dropdown */}
              <div
                className="dropdown-wrap"
                onMouseDown={e => {
                  e.stopPropagation();
                  setYearOpen(s => !s);
                  setSortOpen(false);
                }}
              >
                <button className={`ctrl-btn sf${yearOpen ? " open" : ""}${yearFilter ? " has-value" : ""}`}>
                  <span className="ctrl-label">{yearFilter ? `Est. ${yearFilter}` : "Year"}</span>
                  <ChevronDown
                    style={{ width: 10, height: 10, transition: "transform .2s", transform: yearOpen ? "rotate(180deg)" : "none" }}
                  />
                </button>
                {yearOpen && (
                  <div className="dropdown-menu dropdown-year" onMouseDown={e => e.stopPropagation()}>
                    <button
                      className={`drop-item sf${!yearFilter ? " active" : ""}`}
                      onClick={() => { setYearOpen(false); navigate(buildUrl({ year: undefined, page: undefined })); }}
                    >
                      Any Year
                      {!yearFilter && <span className="check-mark">✓</span>}
                    </button>
                    {uniqueYears.slice(0, 16).map(yr => (
                      <button
                        key={yr}
                        className={`drop-item sf${yearFilter === String(yr) ? " active" : ""}`}
                        onClick={() => { setYearOpen(false); navigate(buildUrl({ year: String(yr), page: undefined })); }}
                      >
                        {yr}
                        {yearFilter === String(yr) && <span className="check-mark">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sector pills */}
            <div className="sector-row strip">
              <span className="sector-label sf">Sector</span>
              <Link
                href={buildUrl({ sector: undefined, page: undefined })}
                className={`pill sf${!sectorFilter ? " on" : ""}`}
                onClick={() => navigate(buildUrl({ sector: undefined, page: undefined }))}
              >
                All
              </Link>
              {SECTORS.map(s => (
                <Link
                  key={s.name}
                  href={buildUrl({ sector: s.name, page: undefined })}
                  className={`pill sf${sectorFilter === s.name ? " on" : ""}${s.hot && sectorFilter !== s.name ? " hot" : ""}`}
                  onClick={() => navigate(buildUrl({ sector: s.name, page: undefined }))}
                >
                  {s.hot && sectorFilter !== s.name && <span className="hot-dot" />}
                  {s.name}
                </Link>
              ))}
            </div>

            {/* Active filter tags */}
            {hasActiveFilters && (
              <div className="active-filters sf">
                <span className="af-label">Active:</span>
                {sectorFilter && (
                  <span className="af-tag">
                    {sectorFilter}
                    <button
                      className="af-x"
                      onClick={() => navigate(buildUrl({ sector: undefined, page: undefined }))}
                    >×</button>
                  </span>
                )}
                {yearFilter && (
                  <span className="af-tag">
                    Est. {yearFilter}
                    <button
                      className="af-x"
                      onClick={() => navigate(buildUrl({ year: undefined, page: undefined }))}
                    >×</button>
                  </span>
                )}
                {sortBy !== "name" && (
                  <span className="af-tag">
                    {currentSortLabel}
                    <button
                      className="af-x"
                      onClick={() => navigate(buildUrl({ sort: undefined, page: undefined }))}
                    >×</button>
                  </span>
                )}
                <Link href="/startup" className="af-clear">Clear all</Link>
              </div>
            )}
          </div>
        </div>

        {/* ── RESULTS META ──────────────────────────────────────────── */}
        <div className="results-meta container">
          <span className="sf results-context">
            {sectorFilter
              ? sectorFilter
              : searchQuery
              ? `"${searchQuery}"`
              : "All Startups"}
          </span>
          <span className="rp results-count">— {totalCount.toLocaleString()} profiles</span>
          <div className="rule-flex" />
          {isPending && (
            <span className="sf searching-label">
              <Loader2 style={{ width: 9, height: 9, animation: "spin .8s linear infinite" }} />
              Searching…
            </span>
          )}
          <span className="sf page-label">Pg. {currentPage} / {totalPages || 1}</span>
        </div>

        {/* ── CONTENT ───────────────────────────────────────────────── */}
        <div className={`content-area container${isPending ? " fading" : ""}`}>

          {/* Featured top 3 (page 1, no filters, is_featured=true) */}
          {featuredStartups.length > 0 && (
            <section className="featured-section">
              <div className="section-head">
                <Star style={{ width: 10, height: 10, color: "var(--gold2)" }} />
                <span className="sh-label sf">Featured This Edition</span>
                <div className="sh-rule" />
              </div>
              <div className="feat-grid">
                {featuredStartups.map((s, fi) => (
                  <Link key={s.id} href={`/startup/${s.slug}`} className="feat-card">
                    <div className="feat-img">
                      {s.logo_url ? (
                        <img src={s.logo_url} alt={s.name} />
                      ) : (
                        <div className="feat-placeholder">
                          <span className="pf feat-initial">{s.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="feat-overlay" />
                      <span className="feat-number sf">No.{String(fi + 1).padStart(2, "0")}</span>
                      <BadgeCheck className="feat-verified" />
                      <div className="feat-caption">
                        <span className="sf feat-sector">{s.category || "Startup"}</span>
                        <h2 className="pf feat-name">{s.name}</h2>
                      </div>
                    </div>
                    <div className="feat-body">
                      <p className="rp feat-desc">{s.description || "Building for India's next decade."}</p>
                      {s.founders && (
                        <p className="sf feat-founders">
                          <span className="founders-label">Founders — </span>{s.founders}
                        </p>
                      )}
                      <div className="feat-footer">
                        <div className="feat-meta">
                          {s.founded_year && (
                            <span className="sf meta-chip">
                              <Calendar style={{ width: 9, height: 9 }} />{s.founded_year}
                            </span>
                          )}
                        </div>
                        <div className="feat-actions">
                          <span className="vbadge">
                            <BadgeCheck style={{ width: 8, height: 8 }} /> Verified
                          </span>
                          <ArrowUpRight style={{ width: 13, height: 13, color: "var(--ink4)" }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* All startups grid */}
          {gridStartups.length > 0 && (
            <section>
              {showFeatured && (
                <div className="section-head">
                  <span className="sh-label sf">All Startups</span>
                  <div className="sh-rule" />
                </div>
              )}

              {/* Desktop grid */}
              <div className="card-grid hide-mob">
                {gridStartups.map((s, idx) => (
                  <Link
                    key={s.id}
                    href={`/startup/${s.slug}`}
                    className="s-card"
                    style={{ animationDelay: `${Math.min(idx, 11) * 0.035}s` }}
                  >
                    <div className="card-head">
                      <div className="logo-circle">
                        {s.logo_url
                          ? <img src={s.logo_url} alt={s.name} />
                          : <span className="pf logo-initial">{s.name.charAt(0)}</span>
                        }
                      </div>
                      <div className="card-title-wrap">
                        <h3 className="pf card-name">{s.name}</h3>
                        <span className="sf card-sector">{(s.category || "Startup").slice(0, 24)}</span>
                      </div>
                      <BadgeCheck className="card-badge" />
                    </div>
                    <div className="card-body">
                      <p className="rp card-desc">{s.description || "Building for India's next decade."}</p>
                      {s.founders && (
                        <p className="sf card-founders">↳ {s.founders}</p>
                      )}
                      <div className="card-footer">
                        {s.founded_year && (
                          <span className="sf meta-chip">
                            <Calendar style={{ width: 7, height: 7 }} />{s.founded_year}
                          </span>
                        )}
                        <ArrowUpRight className="card-arrow" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile list */}
              <div className="mob-list show-mob">
                {startups.map((s, idx) => (
                  <Link
                    key={s.id}
                    href={`/startup/${s.slug}`}
                    className="mob-row"
                    style={{ borderBottom: idx < startups.length - 1 ? "1px solid var(--rule2)" : "none" }}
                  >
                    <div className="mob-logo">
                      {s.logo_url
                        ? <img src={s.logo_url} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : <span className="pf" style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink4)" }}>{s.name.charAt(0)}</span>
                      }
                    </div>
                    <div className="mob-info">
                      <div className="mob-name-row">
                        <span className="pf mob-name">{s.name}</span>
                        <BadgeCheck style={{ width: 9, height: 9, color: "#15803D", flexShrink: 0 }} />
                      </div>
                      <span className="sf mob-meta">
                        {s.category || "Startup"}
                        {s.founded_year && ` · ${s.founded_year}`}
                      </span>
                    </div>
                    <ChevronRight style={{ width: 11, height: 11, color: "var(--ink5)", flexShrink: 0 }} />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Empty state */}
          {startups.length === 0 && !isPending && (
            <div className="empty-state">
              <span className="pf empty-glyph">∅</span>
              <h3 className="pf empty-title">No startups found</h3>
              <p className="rp empty-body">
                {searchQuery
                  ? <>No results for &ldquo;{searchQuery}&rdquo;. Try a different term.</>
                  : <>Nothing matched your filters. Try adjusting them.</>
                }
              </p>
              <Link href="/startup" className="sf empty-btn">Clear filters</Link>
            </div>
          )}

          {/* Skeleton while loading with no prior data */}
          {isPending && startups.length === 0 && (
            <div className="card-grid">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="skel-card">
                  <div className="skel-head">
                    <div className="skel skel-circle" />
                    <div style={{ flex: 1 }}>
                      <div className="skel" style={{ height: 11, marginBottom: 7, width: "68%" }} />
                      <div className="skel" style={{ height: 8,  width: "44%" }} />
                    </div>
                  </div>
                  <div className="skel-body">
                    <div className="skel" style={{ height: 8, marginBottom: 6 }} />
                    <div className="skel" style={{ height: 8, marginBottom: 6, width: "84%" }} />
                    <div className="skel" style={{ height: 8, width: "60%" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="pagination" aria-label="Pagination">
              <Link
                href={buildUrl({ page: currentPage > 2 ? String(currentPage - 1) : undefined })}
                className={`pg-btn sf${currentPage === 1 ? " disabled" : ""}`}
                aria-disabled={currentPage === 1}
              >
                <ChevronLeft style={{ width: 10, height: 10 }} />
                Prev
              </Link>

              <div className="pg-numbers">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let p: number;
                  if (totalPages <= 5)                    p = i + 1;
                  else if (currentPage <= 3)              p = i + 1;
                  else if (currentPage >= totalPages - 2) p = totalPages - 4 + i;
                  else                                    p = currentPage - 2 + i;
                  return (
                    <Link
                      key={p}
                      href={buildUrl({ page: p === 1 ? undefined : String(p) })}
                      className={`pg-num sf${p === currentPage ? " on" : ""}`}
                    >
                      {p}
                    </Link>
                  );
                })}
              </div>

              <Link
                href={buildUrl({ page: String(Math.min(totalPages, currentPage + 1)) })}
                className={`pg-btn sf${currentPage === totalPages ? " disabled" : ""}`}
                aria-disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight style={{ width: 10, height: 10 }} />
              </Link>
            </nav>
          )}
        </div>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <div className="cta-block container">
          <div className="cta-inner">
            <div className="cta-text">
              <p className="sf cta-eyebrow">UpForge Registry</p>
              <p className="pf cta-headline">Your founder story starts with a verified profile.</p>
              <p className="rp cta-sub">Independently verified and indexed in India's most trusted startup registry. Free forever.</p>
            </div>
            <Link href="/submit" className="sf cta-btn">List Free →</Link>
          </div>
        </div>

        {/* ── FOOTER NAV ────────────────────────────────────────────── */}
        <nav className="footer-nav container" aria-label="Registry navigation">
          <ul className="footer-links sf">
            {[
              { l: "Indian Startup Founders 2026", h: "/"                    },
              { l: "Top AI Startups India",        h: "/top-ai-startups"     },
              { l: "Indian Unicorns List",          h: "/indian-unicorns"     },
              { l: "Best SaaS Startups",            h: "/best-saas-startups" },
              { l: "Fintech Startups India",        h: "/fintech-startups"   },
              { l: "Edtech Founders India",         h: "/edtech-startups"    },
              { l: "Submit Your Startup",           h: "/submit"             },
            ].map(lnk => (
              <li key={lnk.h}>
                <Link href={lnk.h} className="footer-link">{lnk.l}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');

  .pf { font-family: 'Playfair Display', Georgia, serif !important; }
  .rp { font-family: Georgia, 'Times New Roman', serif; }
  .sf { font-family: system-ui, -apple-system, sans-serif; }

  :root {
    --parch:  #F5F1E8;
    --parch2: #EDE9DF;
    --parch3: #E6E1D6;
    --ink:    #1A1208;
    --ink2:   #2C2010;
    --ink3:   #5A4A30;
    --ink4:   #8C7D65;
    --ink5:   #BBB0A0;
    --rule:   #C8C2B4;
    --rule2:  #D8D2C4;
    --gold:   #B45309;
    --gold2:  #D97706;
    --gold3:  #92400E;
    --goldlt: #FEF3C7;
    --white:  #FDFCF9;
    --green:  #15803D;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--parch); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  @keyframes scanMove {
    0%   { transform: translateX(-120%); }
    100% { transform: translateX(520%);  }
  }
  @keyframes lp {
    0%, 100% { transform: scale(1);   opacity: 1; }
    50%       { transform: scale(2.2); opacity: 0; }
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(7px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .spin { animation: spin .8s linear infinite; }

  .registry-root { min-height: 100vh; background: var(--parch); }
  .container { max-width: 1340px; margin: 0 auto; padding: 0 clamp(16px, 3vw, 36px); }

  /* ── Breadcrumb ── */
  .breadcrumb-bar {
    background: var(--parch2);
    border-bottom: 1px solid var(--rule2);
    padding: 9px 0;
  }
  .breadcrumb-list {
    display: flex; align-items: center; gap: 7px;
    font-size: 9px; color: var(--ink5);
    text-transform: uppercase; letter-spacing: .18em;
    list-style: none;
  }
  .bc-link    { color: var(--ink5); text-decoration: none; }
  .bc-link:hover { color: var(--ink4); }
  .bc-sep     { color: var(--rule); }
  .bc-current { color: var(--ink4); font-weight: 700; }

  /* ── Masthead ── */
  .masthead {
    background: var(--parch);
    border-bottom: 3px solid var(--ink);
  }
  .masthead-inner {
    text-align: center;
    padding: clamp(20px,3vw,36px) 0 clamp(16px,2vw,24px);
    border-bottom: 1px solid var(--rule2);
  }
  .masthead-eyebrow {
    display: flex; align-items: center; justify-content: center;
    gap: 14px; margin-bottom: 14px;
    font-size: 8.5px; letter-spacing: .36em; text-transform: uppercase; color: var(--ink5); font-weight: 700;
  }
  .rule-line { height: 1px; width: 44px; background: var(--rule); }
  .masthead-title {
    font-size: clamp(2.8rem, 7.5vw, 6rem);
    font-weight: 900; line-height: .9;
    color: var(--ink); letter-spacing: -.025em;
    margin-bottom: 14px;
  }
  .masthead-sub {
    font-size: clamp(13px, 1.6vw, 15.5px);
    font-style: italic; color: var(--ink4);
    margin-bottom: 16px; line-height: 1.55;
  }
  .masthead-meta {
    display: flex; justify-content: center; align-items: center;
    gap: 14px; flex-wrap: wrap;
    font-size: 9px; text-transform: uppercase; letter-spacing: .14em;
  }
  .live-pill { display: flex; align-items: center; gap: 7px; color: #15803D; font-weight: 700; }
  .meta-divider { width: 1px; height: 12px; background: var(--rule); }
  .meta-muted { color: var(--ink5); font-weight: 600; }
  .ldot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #22C55E; display: inline-block; flex-shrink: 0; position: relative;
  }
  .ldot::after {
    content: ''; position: absolute; inset: -3px; border-radius: 50%;
    background: rgba(34,197,94,.25); animation: lp 2.2s ease-in-out infinite;
  }
  .vbadge {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 7.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    color: var(--green); border: 1px solid rgba(21,128,61,.28);
    padding: 2px 8px; font-family: system-ui;
  }

  /* ── Controls zone ── */
  .controls-zone {
    border-bottom: 1px solid var(--rule2);
    padding: 14px 0;
  }
  .search-row {
    display: flex; gap: 8px; align-items: center;
    margin-bottom: 12px;
  }

  /* Search */
  .search-wrap {
    flex: 1; position: relative; display: flex; align-items: center;
  }
  .search-icon {
    position: absolute; left: 13px; width: 13px; height: 13px;
    color: var(--ink5); pointer-events: none; z-index: 1; flex-shrink: 0;
    transition: color .2s;
  }
  .search-wrap.focused .search-icon { color: var(--gold2); }
  .search-input {
    width: 100%; height: 40px; padding: 0 36px 0 36px;
    border: 1.5px solid var(--rule2); background: var(--parch2);
    color: var(--ink); font-size: 12px; font-weight: 500;
    letter-spacing: .01em; outline: none;
    transition: border-color .2s, background .2s, box-shadow .2s;
  }
  .search-input::placeholder { color: var(--ink5); }
  .search-wrap.focused .search-input {
    border-color: var(--ink);
    background: var(--white);
    box-shadow: 0 0 0 3px rgba(217,119,6,.1);
  }
  .search-clear {
    position: absolute; right: 11px;
    background: none; border: none; cursor: pointer;
    padding: 4px; display: flex; align-items: center; color: var(--ink5);
  }
  .scan-line {
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px; overflow: hidden; pointer-events: none;
  }
  .scan-line::after {
    content: ''; position: absolute; top: 0; left: 0; height: 2px; width: 40%;
    background: linear-gradient(90deg, transparent, var(--gold2), transparent);
    animation: scanMove 1s ease-in-out infinite;
  }

  /* Dropdowns */
  .dropdown-wrap { position: relative; }
  .ctrl-btn {
    display: inline-flex; align-items: center; gap: 6px;
    height: 40px; padding: 0 13px;
    border: 1.5px solid var(--rule2); background: var(--parch2);
    font-size: 9px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
    color: var(--ink4); cursor: pointer; white-space: nowrap;
    transition: border-color .15s, color .15s, background .15s;
  }
  .ctrl-btn:hover, .ctrl-btn.open {
    border-color: var(--ink); color: var(--ink); background: var(--white);
  }
  .ctrl-btn.has-value { border-color: var(--gold); color: var(--gold); }
  .ctrl-label { font-size: 9px; }
  .dropdown-menu {
    position: absolute; top: calc(100% + 4px); right: 0; z-index: 50;
    background: var(--white); border: 1.5px solid var(--ink);
    box-shadow: 3px 3px 0 rgba(26,18,8,.08);
    min-width: 150px;
    animation: fadeUp .16s cubic-bezier(.16,1,.3,1) both;
  }
  .dropdown-year { min-width: 120px; max-height: 280px; overflow-y: auto; }
  .drop-item {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; padding: 9px 13px;
    background: none; border: none;
    font-size: 9px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    color: var(--ink4); cursor: pointer; text-align: left;
    transition: background .1s, color .1s;
  }
  .drop-item:hover { background: var(--parch2); color: var(--ink); }
  .drop-item.active { color: var(--gold3); background: var(--goldlt); }
  .check-mark { font-size: 10px; }

  /* Sector pills */
  .sector-row {
    display: flex; align-items: center; gap: 6px;
    overflow-x: auto; scrollbar-width: none;
    padding-bottom: 2px;
  }
  .sector-row::-webkit-scrollbar { display: none; }
  .sector-label {
    font-size: 8px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .22em; color: var(--ink5); flex-shrink: 0;
    white-space: nowrap;
  }
  .pill {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 9px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
    padding: 5px 12px;
    border: 1px solid var(--rule2); background: var(--white);
    color: var(--ink4);
    transition: border-color .15s, color .15s, background .15s;
    white-space: nowrap; text-decoration: none; cursor: pointer; flex-shrink: 0;
  }
  .pill:hover { border-color: var(--ink4); color: var(--ink); }
  .pill.on { background: var(--ink); color: white; border-color: var(--ink); }
  .pill.hot { border-color: rgba(180,83,9,.28); color: var(--gold); }
  .pill.hot:hover { border-color: var(--gold); }
  .hot-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--gold2); flex-shrink: 0;
  }

  /* Active filters */
  .active-filters {
    display: flex; align-items: center; gap: 7px; flex-wrap: wrap;
    margin-top: 10px; padding-top: 10px;
    border-top: 1px dashed var(--rule2);
    font-size: 8.5px;
  }
  .af-label { color: var(--ink5); text-transform: uppercase; letter-spacing: .16em; font-weight: 700; }
  .af-tag {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 8.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    color: var(--gold3); background: var(--goldlt);
    border: 1px solid rgba(180,83,9,.2); padding: 3px 9px;
  }
  .af-x {
    background: none; border: none; cursor: pointer;
    color: var(--gold3); font-size: 12px; padding: 0; line-height: 1; font-weight: 700;
  }
  .af-clear {
    font-size: 8.5px; color: var(--ink4); text-decoration: underline;
    font-weight: 700; letter-spacing: .1em; margin-left: 4px;
  }

  /* Results meta */
  .results-meta {
    display: flex; align-items: center; gap: 10px;
    margin: 16px 0 14px;
  }
  .results-context {
    font-size: 8px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .28em; color: var(--ink5); white-space: nowrap;
  }
  .results-count {
    font-size: 11px; font-style: italic; color: var(--gold2);
  }
  .rule-flex { flex: 1; height: 1px; background: var(--rule2); }
  .searching-label {
    font-size: 8px; color: var(--gold2); text-transform: uppercase;
    letter-spacing: .14em; display: flex; align-items: center; gap: 4px; white-space: nowrap;
  }
  .page-label {
    font-size: 8.5px; color: var(--ink5); font-weight: 700;
    letter-spacing: .12em; white-space: nowrap;
  }

  /* Content area */
  .content-area { transition: opacity .22s ease; padding-bottom: clamp(32px,5vw,56px); }
  .content-area.fading { opacity: .3; pointer-events: none; }

  /* Section head */
  .section-head {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 14px;
  }
  .sh-label {
    font-size: 8px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .28em; color: var(--ink5); white-space: nowrap;
  }
  .sh-rule { flex: 1; height: 1px; background: var(--rule2); }
  .featured-section { margin-bottom: 32px; }

  /* Featured grid */
  .feat-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    border: 1.5px solid var(--ink); background: var(--ink); gap: 1.5px;
  }
  .feat-card {
    background: var(--white); display: flex; flex-direction: column;
    text-decoration: none; position: relative; overflow: hidden;
    transition: background .18s;
  }
  .feat-card:hover { background: #FEFCF6; }
  .feat-card::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 3px; background: transparent; transition: background .18s;
  }
  .feat-card:hover::after { background: var(--gold2); }
  .feat-img {
    height: 168px; position: relative; overflow: hidden;
    background: var(--parch2); flex-shrink: 0;
    border-bottom: 1.5px solid var(--ink);
  }
  .feat-img img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform .5s ease;
  }
  .feat-card:hover .feat-img img { transform: scale(1.04); }
  .feat-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    background: var(--parch3);
  }
  .feat-initial { font-size: 3.5rem; font-weight: 900; color: rgba(26,18,8,.09); }
  .feat-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(26,18,8,.84) 0%, rgba(26,18,8,.08) 55%, transparent 100%);
  }
  .feat-number {
    position: absolute; top: 11px; left: 11px;
    background: var(--ink); color: white;
    font-size: 7px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase;
    padding: 3px 8px; border: 1px solid rgba(255,255,255,.12);
  }
  .feat-verified {
    position: absolute; top: 11px; right: 11px;
    width: 14px; height: 14px; color: #4ADE80;
  }
  .feat-caption {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 0 13px 12px;
  }
  .feat-sector {
    display: block; font-size: 7.5px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .2em;
    color: rgba(255,255,255,.5); margin-bottom: 4px;
  }
  .feat-name {
    font-size: 1.12rem; font-weight: 700; color: white; line-height: 1.15;
  }
  .feat-body {
    padding: 16px 16px 15px; flex: 1; display: flex; flex-direction: column;
  }
  .feat-desc {
    font-size: 12px; color: var(--ink3); line-height: 1.82; flex: 1;
    margin-bottom: 12px;
    display: -webkit-box; -webkit-line-clamp: 3;
    -webkit-box-orient: vertical; overflow: hidden;
  }
  .feat-founders {
    font-size: 8.5px; color: var(--ink5); margin-bottom: 10px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .founders-label { font-weight: 700; color: var(--ink4); }
  .feat-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 11px; border-top: 1px solid var(--rule2);
  }
  .feat-meta { display: flex; gap: 10px; align-items: center; }
  .feat-actions { display: flex; align-items: center; gap: 7px; }

  /* Meta chip */
  .meta-chip {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 8.5px; color: var(--ink5);
  }

  /* Card grid */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    border: 1.5px solid var(--ink); background: var(--ink); gap: 1.5px;
  }
  .s-card {
    background: var(--white); display: flex; flex-direction: column;
    text-decoration: none; position: relative;
    transition: background .14s, transform .14s, box-shadow .14s;
    animation: cardIn .36s cubic-bezier(.16,1,.3,1) both;
  }
  .s-card:hover {
    background: #FEFCF6;
    transform: translate(-2px,-2px);
    box-shadow: 4px 4px 0 var(--ink);
    z-index: 2;
  }
  .s-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 2.5px; background: transparent; transition: background .14s;
  }
  .s-card:hover::before { background: var(--gold2); }
  .card-head {
    padding: 14px 14px 11px;
    display: flex; align-items: center; gap: 11px;
    border-bottom: 1px solid var(--rule2);
  }
  .logo-circle {
    width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
    border: 1.5px solid var(--rule2); background: var(--parch2);
    display: flex; align-items: center; justify-content: center; overflow: hidden;
    transition: border-color .14s;
  }
  .s-card:hover .logo-circle { border-color: var(--ink5); }
  .logo-circle img { width: 100%; height: 100%; object-fit: cover; }
  .logo-initial { font-size: 1rem; font-weight: 900; color: var(--ink4); }
  .card-title-wrap { min-width: 0; flex: 1; }
  .card-name {
    font-size: .88rem; font-weight: 700; color: var(--ink);
    line-height: 1.2; margin-bottom: 3px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .card-sector {
    font-size: 7.5px; color: var(--ink5);
    text-transform: uppercase; letter-spacing: .12em; font-weight: 700;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block;
  }
  .card-badge { width: 11px; height: 11px; color: #15803D; flex-shrink: 0; }
  .card-body { padding: 11px 14px 13px; flex: 1; display: flex; flex-direction: column; }
  .card-desc {
    font-size: 11.5px; color: var(--ink3); line-height: 1.78; flex: 1;
    margin-bottom: 10px;
    display: -webkit-box; -webkit-line-clamp: 3;
    -webkit-box-orient: vertical; overflow: hidden;
  }
  .card-founders {
    font-size: 8px; color: var(--ink5); margin-bottom: 8px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .card-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 9px; border-top: 1px solid var(--rule2);
  }
  .card-arrow { width: 11px; height: 11px; color: var(--ink5); }

  /* Mobile list */
  .mob-list { display: none; flex-direction: column; border: 1.5px solid var(--ink); }
  .mob-row {
    display: flex; align-items: center; gap: 12px;
    padding: 13px 16px; background: var(--white);
    text-decoration: none; transition: background .12s;
  }
  .mob-row:hover { background: var(--parch2); }
  .mob-logo {
    width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
    border: 1.5px solid var(--rule2); background: var(--parch2);
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  .mob-info { flex: 1; min-width: 0; }
  .mob-name-row { display: flex; align-items: center; gap: 5px; margin-bottom: 3px; }
  .mob-name {
    font-size: .88rem; font-weight: 700; color: var(--ink);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .mob-meta { font-size: 8px; color: var(--ink5); text-transform: uppercase; letter-spacing: .1em; font-weight: 600; }

  /* Empty state */
  .empty-state {
    display: flex; flex-direction: column; align-items: center;
    padding: 80px 24px; text-align: center;
    border: 1.5px solid var(--ink); background: var(--white);
  }
  .empty-glyph { font-size: 3rem; color: rgba(26,18,8,.06); font-weight: 900; margin-bottom: 16px; }
  .empty-title { font-size: 1.25rem; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
  .empty-body { font-size: 13px; color: var(--ink4); line-height: 1.75; max-width: 280px; margin-bottom: 22px; }
  .empty-btn {
    display: inline-flex; align-items: center; gap: 7px;
    border: 2px solid var(--ink); padding: 9px 22px;
    font-size: 9px; font-weight: 700; color: var(--ink);
    text-transform: uppercase; letter-spacing: .14em;
    background: transparent; text-decoration: none;
  }

  /* Skeleton */
  .skel-card { background: var(--white); }
  .skel-head {
    padding: 14px; display: flex; align-items: center; gap: 11px;
    border-bottom: 1px solid var(--rule2);
  }
  .skel-body { padding: 11px 14px 13px; }
  .skel-circle { width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; }
  .skel {
    background: linear-gradient(90deg, var(--parch2) 25%, var(--parch3) 50%, var(--parch2) 75%);
    background-size: 400px 100%;
    animation: shimmer 1.4s ease-in-out infinite;
    border-radius: 2px;
  }

  /* Pagination */
  .pagination {
    display: flex; align-items: center; justify-content: center;
    gap: 6px; margin-top: 40px;
  }
  .pg-numbers { display: flex; gap: 4px; }
  .pg-btn {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 8px 15px; border: 1.5px solid var(--rule2); background: var(--white);
    font-size: 9px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
    color: var(--ink4); transition: all .14s; text-decoration: none;
  }
  .pg-btn:hover { border-color: var(--ink); color: var(--ink); }
  .pg-btn.disabled { opacity: .22; pointer-events: none; }
  .pg-num {
    display: inline-flex; align-items: center; justify-content: center;
    width: 34px; height: 34px; border: 1.5px solid var(--rule2); background: var(--white);
    font-size: 11px; font-weight: 700; color: var(--ink4);
    transition: all .14s; text-decoration: none;
  }
  .pg-num:hover { border-color: var(--ink4); color: var(--ink); }
  .pg-num.on { background: var(--ink); color: white; border-color: var(--ink); }

  /* CTA */
  .cta-block { margin-top: clamp(32px,5vw,52px); margin-bottom: 0; }
  .cta-inner {
    display: grid; grid-template-columns: 1fr auto;
    gap: 24px; align-items: center;
    padding: clamp(24px,4vw,40px);
    background: var(--ink); border: 1.5px solid var(--ink);
    position: relative; overflow: hidden;
  }
  .cta-inner::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2.5px;
    background: linear-gradient(90deg, var(--gold3), var(--gold2), #E8C547, var(--gold2), var(--gold3));
  }
  .cta-eyebrow {
    font-size: 7.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .32em;
    color: rgba(232,197,71,.75); margin-bottom: 9px;
  }
  .cta-headline {
    font-size: clamp(1.05rem,2.6vw,1.65rem);
    font-weight: 700; color: white; line-height: 1.22; margin-bottom: 8px;
  }
  .cta-sub {
    font-size: 12px; color: rgba(255,255,255,.38); line-height: 1.75;
  }
  .cta-btn {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--gold2); color: var(--ink);
    padding: 12px 22px;
    font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .14em;
    white-space: nowrap; box-shadow: 3px 3px 0 var(--gold3); text-decoration: none;
    transition: box-shadow .14s, transform .14s;
  }
  .cta-btn:hover { transform: translate(-1px,-1px); box-shadow: 4px 4px 0 var(--gold3); }

  /* Footer nav */
  .footer-nav {
    padding: 16px 0;
    border-top: 2px solid var(--ink);
    margin-top: clamp(24px,4vw,40px);
    margin-bottom: clamp(24px,4vw,48px);
  }
  .footer-links { display: flex; flex-wrap: wrap; gap: 8px 20px; list-style: none; }
  .footer-link {
    font-size: 8px; color: var(--ink5);
    text-transform: uppercase; letter-spacing: .14em; text-decoration: none;
    transition: color .14s;
  }
  .footer-link:hover { color: var(--ink4); }

  /* Responsive */
  @media (max-width: 900px) {
    .feat-grid { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 640px) {
    .feat-grid   { grid-template-columns: 1fr !important; }
    .hide-mob    { display: none !important; }
    .mob-list    { display: flex !important; }
    .card-grid   { grid-template-columns: 1fr 1fr !important; }
    .cta-inner   { grid-template-columns: 1fr !important; }
    .cta-btn     { width: 100%; justify-content: center; }
  }
  @media (max-width: 420px) {
    .card-grid { grid-template-columns: 1fr !important; }
  }
`;
