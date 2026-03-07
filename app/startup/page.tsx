// app/startup/page.tsx
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Metadata } from "next";
import PageTransition from "@/components/page-transition";
import { ChevronLeft, ChevronRight, BadgeCheck, ArrowUpRight, MapPin, Calendar } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { count } = await supabase.from("startups").select("*", { count: "exact", head: true });
  return {
    title: `Indian Startup Registry 2026 — ${(count || 72000).toLocaleString()}+ Verified Startups | UpForge`,
    description: `Browse ${(count || 72000).toLocaleString()}+ verified Indian startups across AI, SaaS, FinTech, HealthTech and 30+ sectors.`,
    alternates: { canonical: "https://upforge.in/startup" },
    openGraph: {
      title: `Indian Startup Registry — ${(count || 72000).toLocaleString()}+ Verified | UpForge`,
      description: "Browse India's most comprehensive startup database. Free, verified, updated daily.",
      url: "https://upforge.in/startup",
      siteName: "UpForge",
      images: [{ url: "https://upforge.in/og-registry.png", width: 1200, height: 630 }],
      locale: "en_IN", type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export const revalidate = 0;

interface Props {
  searchParams?: Promise<{ page?: string; sector?: string }>;
}

const SECTORS = [
  { name: "AI/ML", hot: true },
  { name: "FinTech", hot: true },
  { name: "SaaS", hot: true },
  { name: "Space Tech", hot: true },
  { name: "Climate Tech", hot: false },
  { name: "D2C Brands", hot: false },
  { name: "HealthTech", hot: false },
  { name: "EdTech", hot: false },
];

// First page: 3 featured + 15 grid = 18 total
// Other pages: 15 per page
const FIRST_PAGE_ITEMS = 21;
const OTHER_PAGE_ITEMS = 18;

export default async function StartupPage({ searchParams }: Props) {
  const supabase = await createClient();

  const params = await searchParams;
  const sectorFilter = params?.sector?.trim() ?? "";
  const currentPage  = Number(params?.page ?? 1);
  const isFirstPage  = currentPage === 1;

  const itemsForPage = isFirstPage ? FIRST_PAGE_ITEMS : OTHER_PAGE_ITEMS;
  // Offset: page 1 = 0, page 2 = 18, page 3 = 18+15=33, page 4 = 48 ...
  const from = isFirstPage ? 0 : FIRST_PAGE_ITEMS + (currentPage - 2) * OTHER_PAGE_ITEMS;
  const to   = from + itemsForPage - 1;

  let query = supabase.from("startups").select("*", { count: "exact" });
  if (sectorFilter) query = query.or(`industry.ilike.%${sectorFilter}%,category.ilike.%${sectorFilter}%`);

  const { data: startups, count, error } = await query
    .order("name", { ascending: true })
    .range(from, to);

  if (error) console.log("SUPABASE ERROR:", error);

  // Total pages accounting for asymmetric first page
  const totalCount = count || 0;
  const totalPages = totalCount <= FIRST_PAGE_ITEMS
    ? 1
    : 1 + Math.ceil((totalCount - FIRST_PAGE_ITEMS) / OTHER_PAGE_ITEMS);

  const featuredStartups = isFirstPage && !sectorFilter ? (startups || []).slice(0, 3) : [];
  const gridStartups     = isFirstPage && !sectorFilter ? (startups || []).slice(3) : (startups || []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');

        .pf { font-family: 'Playfair Display', Georgia, serif !important; }
        .rp { font-family: 'Georgia', 'Times New Roman', serif; }
        .sf { font-family: system-ui, -apple-system, sans-serif; }

        :root {
          --parch:  #F3EFE5;
          --parch2: #EDE9DF;
          --ink:    #1A1208;
          --ink3:   #5A4A30;
          --ink4:   #8C7D65;
          --ink5:   #BBB0A0;
          --rule:   #C8C2B4;
          --rule2:  #D8D2C4;
          --gold:   #D97706;
          --gold2:  #E8C547;
          --gold3:  #8B6914;
          --white:  #FDFCF9;
        }

        body { background: var(--parch); }

        @keyframes storyIn {
          from { opacity: 0; transform: translateY(7px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a0 { animation: storyIn .38s .00s cubic-bezier(.16,1,.3,1) both; }
        .a1 { animation: storyIn .38s .07s cubic-bezier(.16,1,.3,1) both; }
        .a2 { animation: storyIn .38s .14s cubic-bezier(.16,1,.3,1) both; }
        .a3 { animation: storyIn .38s .20s cubic-bezier(.16,1,.3,1) both; }

        /* live dot */
        .live-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22C55E; flex-shrink: 0; display: inline-block;
        }
        .live-dot::after {
          content: ''; display: block; width: 100%; height: 100%;
          border-radius: 50%; background: rgba(34,197,94,.35);
          animation: lp 2s ease-in-out infinite;
        }
        @keyframes lp { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(2.4);opacity:0} }

        /* sector pill */
        .pill {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 9px; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; padding: 5px 12px;
          border: 1px solid var(--rule2); background: var(--white);
          color: var(--ink4); font-family: system-ui, sans-serif;
          transition: all .15s; white-space: nowrap;
          text-decoration: none; cursor: pointer;
        }
        .pill:hover { border-color: var(--ink); color: var(--ink); }
        .pill.on { background: var(--ink); color: white; border-color: var(--ink); }

        /* scroll strip */
        .strip { overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
        .strip::-webkit-scrollbar { display: none; }

        /* verified badge */
        .vbadge {
          display: inline-flex; align-items: center; gap: 3px;
          font-size: 7.5px; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; color: #15803D;
          border: 1px solid rgba(21,128,61,.3); padding: 2px 6px;
          font-family: system-ui, sans-serif;
        }

        /* ── FEATURED 3 ── */
        .feat-grid {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 0; background: var(--rule2);
          border: 1px solid var(--rule2);
        }
        .feat-card {
          background: var(--white); display: flex; flex-direction: column;
          text-decoration: none; position: relative; overflow: hidden;
        }
        .feat-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: var(--rule2); transition: background .15s;
        }
        .feat-card:hover::before { background: var(--gold); }

        /* ── CARD GRID ── */
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
          gap: 0; background: var(--rule2);
          border: 1px solid var(--rule2);
        }

        /* ── STARTUP CARD ── */
        .s-card {
          background: var(--white); display: flex; flex-direction: column;
          text-decoration: none; position: relative; overflow: hidden;
          transition: transform .15s, box-shadow .15s;
        }
        .s-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: var(--rule2); transition: background .15s;
        }
        .s-card:hover { transform: translate(-1px,-1px); box-shadow: 3px 3px 0 var(--ink); z-index: 1; }
        .s-card:hover::before { background: var(--gold); }

        /* ── PAGINATION ── */
        .pg {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 7px 15px; border: 1px solid var(--rule2);
          background: var(--white); font-size: 10px; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--ink4); font-family: system-ui; transition: all .15s;
          text-decoration: none;
        }
        .pg:hover { border-color: var(--ink); color: var(--ink); }
        .pg.on { background: var(--ink); color: white; border-color: var(--ink); }
        .pg.off { opacity: .28; pointer-events: none; }

        /* mobile list */
        .m-row {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 16px; background: var(--white);
          border-bottom: 1px solid var(--rule2);
          text-decoration: none; transition: background .13s;
        }
        .m-row:hover { background: var(--parch2); }

        /* section head */
        .sh { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .sh-l { font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: .26em; color: var(--ink5); font-family: system-ui; white-space: nowrap; }
        .sh-r { flex: 1; height: 1px; background: var(--rule2); }

        @media (max-width: 768px) {
          .hide-mob { display: none !important; }
          .show-mob { display: flex !important; }
          .feat-grid { grid-template-columns: 1fr; }
          .card-grid  { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .card-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="rp" style={{ minHeight: "100vh", background: "var(--parch)" }}>

        {/* BREADCRUMB */}
        <nav className="sf" style={{ background: "var(--parch2)", borderBottom: "1px solid var(--rule2)", padding: "7px 0" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 clamp(16px,3vw,32px)" }}>
            <ol style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9, color: "var(--ink5)", textTransform: "uppercase", letterSpacing: "0.18em", listStyle: "none", margin: 0, padding: 0 }}>
              <li><Link href="/" style={{ color: "var(--ink5)", textDecoration: "none" }}>UpForge</Link></li>
              <li style={{ color: "var(--rule)" }}>/</li>
              <li style={{ color: "var(--ink4)", fontWeight: 600 }}>Startup Registry</li>
            </ol>
          </div>
        </nav>

        {/* MASTHEAD */}
        <header className="a0" style={{ borderBottom: "3px solid var(--ink)", background: "var(--parch)" }}>
          <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 clamp(16px,3vw,32px)" }}>
            <div style={{ textAlign: "center", padding: "clamp(28px,5vw,52px) 0 clamp(16px,3vw,28px)", borderBottom: "1px solid var(--rule2)" }}>

              {/* Big title — same size/font as homepage */}
              <h1 className="pf" style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", fontWeight: 900, lineHeight: 0.92, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: 18 }}>
                Startup Registry
              </h1>
              <p className="rp" style={{ fontSize: "clamp(13px,2vw,16px)", fontStyle: "italic", color: "var(--ink4)", marginBottom: 18 }}>
                India's independent startup registry — verified, updated daily, free forever
              </p>

              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(10px,2vw,24px)", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="live-dot" />
                  <span className="sf" style={{ fontSize: 9, color: "#15803D", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 700 }}>
                    Live · {totalCount.toLocaleString()} Profiles
                  </span>
                </div>
                <span className="vbadge"><BadgeCheck style={{ width: 9, height: 9 }} /> All Verified</span>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 clamp(16px,3vw,32px) clamp(40px,8vw,80px)" }}>

          {/* SECTOR FILTER PILLS */}
          <div className="a1 strip" style={{ padding: "12px 0", borderBottom: "1px solid var(--rule2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: "max-content" }}>
              <span className="sf" style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--ink5)", flexShrink: 0 }}>Sector:</span>
              <Link href="/startup" className={`pill ${!sectorFilter ? "on" : ""}`}>All</Link>
              {SECTORS.map((s, i) => (
                <Link key={i} href={`?sector=${encodeURIComponent(s.name)}`} className={`pill ${sectorFilter === s.name ? "on" : ""}`}
                  style={sectorFilter !== s.name && s.hot ? { borderColor: "rgba(217,119,6,.35)", color: "var(--gold)" } : {}}>
                  {s.hot && sectorFilter !== s.name && <span style={{ fontSize: 8 }}>🔥</span>}
                  {s.name}
                </Link>
              ))}
              {sectorFilter && (
                <Link href="/startup" className="sf" style={{ fontSize: 10, color: "var(--ink5)", textDecoration: "underline", flexShrink: 0 }}>Clear ×</Link>
              )}
            </div>
          </div>

          {/* RESULTS HEADER */}
          <div className="a1 sh" style={{ marginTop: 20 }}>
            <span className="sh-l">
              {sectorFilter ? `${sectorFilter}` : "All Startups"}
              <span className="rp" style={{ color: "var(--gold)", fontStyle: "italic", textTransform: "none", letterSpacing: 0, fontWeight: 400, fontSize: 11, marginLeft: 6 }}>
                — {totalCount.toLocaleString()} profiles
              </span>
            </span>
            <div className="sh-r" />
            <span className="sf" style={{ fontSize: 8.5, color: "var(--ink5)", flexShrink: 0, fontWeight: 600, letterSpacing: "0.1em" }}>
              Pg. {currentPage}/{totalPages || 1}
            </span>
          </div>

          <PageTransition key={`${sectorFilter}-${currentPage}`}>

            {/* FEATURED TOP 3 */}
            {featuredStartups.length === 3 && (
              <div className="a2">
                <div className="sh" style={{ marginBottom: 10 }}>
                  <span className="sh-l">Featured in This Edition</span>
                  <div className="sh-r" />
                </div>
                <div className="feat-grid" style={{ marginBottom: 1 }}>
                  {featuredStartups.map((startup, fi) => (
                    <Link key={startup.id} href={`/startup/${startup.slug}`} className="feat-card"
                      style={{ borderRight: fi < 2 ? "1px solid var(--rule2)" : "none" }}>
                      {/* Image */}
                      <div style={{ height: 156, background: "var(--parch2)", overflow: "hidden", position: "relative", borderBottom: "1px solid var(--rule2)", flexShrink: 0 }}>
                        {startup.logo_url ? (
                          <img src={startup.logo_url} alt={startup.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: `hsl(${fi * 44 + 30},14%,86%)` }}>
                            <span className="pf" style={{ fontSize: "3.2rem", fontWeight: 900, color: "rgba(26,18,8,0.13)" }}>{startup.name.charAt(0)}</span>
                          </div>
                        )}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(26,18,8,.78) 0%,transparent 55%)" }} />
                        <div className="sf" style={{ position: "absolute", top: 9, left: 10, background: "var(--ink)", color: "white", fontSize: 7, fontWeight: 700, padding: "2px 7px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                          No. {String(fi + 1).padStart(2, "0")}
                        </div>
                        <span className="sf" style={{ position: "absolute", bottom: 10, left: 12, fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--gold2)" }}>
                          {startup.industry || startup.category || "Startup"}
                        </span>
                      </div>
                      {/* Body */}
                      <div style={{ padding: "13px 15px 12px", flex: 1, display: "flex", flexDirection: "column" }}>
                        <h2 className="pf" style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2, marginBottom: 6 }}>{startup.name}</h2>
                        <p className="rp" style={{ fontSize: 11.5, color: "var(--ink3)", lineHeight: 1.8, flex: 1, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                          {startup.description}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid var(--rule2)" }}>
                          <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
                            {startup.founded_year && (
                              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                                <Calendar style={{ width: 8, height: 8, color: "var(--ink5)" }} />
                                <span className="sf" style={{ fontSize: 8, color: "var(--ink5)" }}>{startup.founded_year}</span>
                              </div>
                            )}
                            <span className="vbadge"><BadgeCheck style={{ width: 8, height: 8 }} /> Verified</span>
                          </div>
                          <ArrowUpRight style={{ width: 11, height: 11, color: "var(--ink5)" }} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CARD GRID — desktop */}
            <div className="a3 card-grid hide-mob">
              {gridStartups.map((startup) => (
                <Link key={startup.id} href={`/startup/${startup.slug}`} className="s-card">
                  {/* Card header: circular logo + name */}
                  <div style={{ padding: "14px 14px 10px", display: "flex", alignItems: "center", gap: 11, borderBottom: "1px solid var(--rule2)" }}>
                    {/* Circular logo */}
                    <div style={{
                      width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                      border: "1.5px solid var(--rule2)", background: "var(--parch2)",
                      display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
                    }}>
                      {startup.logo_url ? (
                        <img src={startup.logo_url} alt={startup.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <span className="pf" style={{ fontSize: "1rem", fontWeight: 900, color: "var(--ink4)" }}>
                          {startup.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <h3 className="pf" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.22, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {startup.name}
                      </h3>
                      <div className="sf" style={{ fontSize: 7.5, color: "var(--ink5)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {(startup.industry || startup.category || "Startup").slice(0, 20)}
                      </div>
                    </div>
                    <BadgeCheck style={{ width: 11, height: 11, color: "#15803D", flexShrink: 0 }} />
                  </div>
                  {/* Description */}
                  <div style={{ padding: "10px 14px 11px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <p className="rp" style={{ fontSize: 11, color: "var(--ink3)", lineHeight: 1.75, flex: 1, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                      {startup.description}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        {startup.founded_year && (
                          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <Calendar style={{ width: 7, height: 7, color: "var(--ink5)" }} />
                            <span className="sf" style={{ fontSize: 7.5, color: "var(--ink5)" }}>{startup.founded_year}</span>
                          </div>
                        )}
                        {startup.city && (
                          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <MapPin style={{ width: 7, height: 7, color: "var(--ink5)" }} />
                            <span className="sf" style={{ fontSize: 7.5, color: "var(--ink5)" }}>{startup.city}</span>
                          </div>
                        )}
                      </div>
                      <ArrowUpRight style={{ width: 10, height: 10, color: "var(--ink5)" }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* MOBILE LIST */}
            <div className="show-mob" style={{ display: "none", flexDirection: "column", border: "1px solid var(--rule2)" }}>
              {(startups || []).map((startup) => (
                <Link key={startup.id} href={`/startup/${startup.slug}`} className="m-row">
                  <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, border: "1.5px solid var(--rule2)", background: "var(--parch2)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {startup.logo_url
                      ? <img src={startup.logo_url} alt={startup.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <span className="pf" style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink4)" }}>{startup.name.charAt(0)}</span>
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                      <span className="pf" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{startup.name}</span>
                      <BadgeCheck style={{ width: 9, height: 9, color: "#15803D", flexShrink: 0 }} />
                    </div>
                    <span className="sf" style={{ fontSize: 8, color: "var(--ink5)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                      {startup.industry || startup.category || "Startup"}
                      {startup.founded_year && ` · ${startup.founded_year}`}
                    </span>
                  </div>
                  <ChevronRight style={{ width: 11, height: 11, color: "var(--ink5)", flexShrink: 0 }} />
                </Link>
              ))}
            </div>

            {/* EMPTY STATE */}
            {(!startups || startups.length === 0) && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "72px 24px", textAlign: "center", border: "1px solid var(--rule2)", background: "var(--white)" }}>
                <span className="pf" style={{ fontSize: "3rem", color: "rgba(26,18,8,0.07)", fontWeight: 900, lineHeight: 1, marginBottom: 14 }}>?</span>
                <h3 className="pf" style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", marginBottom: 7 }}>No startups found</h3>
                <p className="rp" style={{ fontSize: 12.5, color: "var(--ink4)", marginBottom: 20, maxWidth: 300, lineHeight: 1.7 }}>
                  No results for {sectorFilter ? `"${sectorFilter}"` : "this filter"}. Try another sector.
                </p>
                <Link href="/startup" style={{ display: "inline-flex", alignItems: "center", gap: 7, border: "2px solid var(--ink)", padding: "9px 20px", fontSize: 10, fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "system-ui", background: "transparent", textDecoration: "none" }}>
                  View all sectors
                </Link>
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="a3" style={{ marginTop: 36, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                <Link
                  href={`?page=${Math.max(1, currentPage - 1)}${sectorFilter ? `&sector=${sectorFilter}` : ""}`}
                  className={`pg ${currentPage === 1 ? "off" : ""}`}
                >
                  <ChevronLeft style={{ width: 10, height: 10 }} /> Prev
                </Link>
                <div style={{ display: "flex", gap: 3 }}>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let p: number;
                    if (totalPages <= 5)                    p = i + 1;
                    else if (currentPage <= 3)              p = i + 1;
                    else if (currentPage >= totalPages - 2) p = totalPages - 4 + i;
                    else                                    p = currentPage - 2 + i;
                    return (
                      <Link key={p}
                        href={`?page=${p}${sectorFilter ? `&sector=${sectorFilter}` : ""}`}
                        className={`pg ${p === currentPage ? "on" : ""}`}
                        style={{ padding: "7px 12px", minWidth: 34, justifyContent: "center" }}
                      >
                        <span className="sf" style={{ fontSize: 11 }}>{p}</span>
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href={`?page=${Math.min(totalPages, currentPage + 1)}${sectorFilter ? `&sector=${sectorFilter}` : ""}`}
                  className={`pg ${currentPage === totalPages ? "off" : ""}`}
                >
                  Next <ChevronRight style={{ width: 10, height: 10 }} />
                </Link>
              </div>
            )}

          </PageTransition>

          {/* INSIGHT STRIP */}
          <div style={{ marginTop: "clamp(40px,6vw,64px)" }}>
            <div className="sh">
              <span className="sh-l">UpForge Registry Insights</span>
              <div className="sh-r" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 1, background: "var(--rule2)", border: "1px solid var(--rule2)" }}>
              {[
                { v: "~80%",  l: "First-gen founders",     b: "India's unicorn builders mostly had no inherited capital — built with pure conviction." },
                { v: "$950B", l: "Value created under 40",  b: "Founders under 40 manage businesses worth more than Switzerland's entire GDP." },
                { v: "126+",  l: "Indian unicorns",          b: "India crossed 126 unicorns. Every founder reading this could build the next one." },
              ].map((item, i) => (
                <div key={i} style={{ padding: "18px 20px", background: "var(--white)", position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 2, background: "var(--gold)" }} />
                  <p className="pf" style={{ fontSize: "2.1rem", fontWeight: 900, color: "var(--ink)", lineHeight: 1, marginBottom: 5 }}>{item.v}</p>
                  <p className="sf" style={{ fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--gold)", marginBottom: 8 }}>{item.l}</p>
                  <p className="rp" style={{ fontSize: 11.5, color: "var(--ink3)", lineHeight: 1.75 }}>{item.b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: "clamp(28px,5vw,48px)", padding: "clamp(22px,4vw,36px)", background: "var(--ink)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,var(--gold3),var(--gold),var(--gold2),var(--gold),var(--gold3))" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
              <div>
                <p className="sf" style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.3em", color: "var(--gold2)", marginBottom: 9 }}>UpForge Registry</p>
                <p className="pf" style={{ fontSize: "clamp(1.1rem,2.8vw,1.65rem)", fontWeight: 700, color: "white", lineHeight: 1.25, marginBottom: 8 }}>
                  Your founder story starts with a verified profile.
                </p>
                <p className="rp" style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>
                  Independently verified and indexed in India's most trusted startup registry. Free forever.
                </p>
              </div>
              <Link href="/submit" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--gold)", color: "var(--ink)", padding: "12px 22px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", fontFamily: "system-ui", whiteSpace: "nowrap", boxShadow: "3px 3px 0 var(--gold3)", textDecoration: "none" }}>
                List Free →
              </Link>
            </div>
          </div>

          {/* FOOTER NAV */}
          <nav aria-label="Registry navigation" style={{ padding: "14px 0", borderTop: "2px solid var(--ink)", marginTop: "clamp(24px,4vw,40px)" }}>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px", listStyle: "none", margin: 0, padding: 0 }}>
              {[
                { l: "Indian Startup Founders 2026", h: "/" },
                { l: "Top AI Startups India",        h: "/top-ai-startups" },
                { l: "Indian Unicorns List",          h: "/indian-unicorns" },
                { l: "Best SaaS Startups",            h: "/best-saas-startups" },
                { l: "Fintech Startups India",        h: "/fintech-startups" },
                { l: "Edtech Founders India",         h: "/edtech-startups" },
                { l: "Submit Your Startup",           h: "/submit" },
              ].map(lnk => (
                <li key={lnk.h}>
                  <Link href={lnk.h} className="sf" style={{ fontSize: 8.5, color: "var(--ink5)", textTransform: "uppercase", letterSpacing: "0.14em", textDecoration: "none" }}>
                    {lnk.l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </div>
    </>
  );
}
