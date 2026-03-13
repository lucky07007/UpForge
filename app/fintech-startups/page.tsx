// app/fintech-startups/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top FinTech Startups in India 2026: Best Financial Technology Companies | UpForge",
  description:
    "India's top FinTech startups in 2026 — Zerodha, Razorpay, CRED, PhonePe, Groww and the new generation of financial technology companies. Funding, valuations, founder stories, and the future of Indian fintech.",
  keywords: [
    "top fintech startups India 2026",
    "best financial technology companies India",
    "Indian fintech unicorns 2026",
    "fintech startup funding India",
    "Zerodha Razorpay CRED PhonePe Groww",
    "digital payments startup India",
    "neobank startup India",
    "wealthtech insurtech India",
  ].join(", "),
  alternates: { canonical: "https://upforge.in/fintech-startups" },
  openGraph: {
    title: "Top FinTech Startups in India 2026: Best Financial Technology Companies",
    description:
      "India's fintech sector is the second largest in the world. These are the startups leading it — profiled, ranked, and analysed.",
    url: "https://upforge.in/fintech-startups",
    siteName: "UpForge",
    images: [{ url: "https://upforge.in/og-fintech-startups.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top FinTech Startups India 2026 | UpForge",
    description: "Zerodha, Razorpay, CRED, PhonePe — India's FinTech giants profiled alongside the next generation of challengers.",
  },
};

const IMGS = {
  hero: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=85&auto=format",
  zerodha: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80&auto=format",
  razorpay: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&auto=format",
  cred: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80&auto=format",
  groww: "https://images.unsplash.com/photo-1642543348745-03b1f75e7e4b?w=900&q=80&auto=format",
  jupiter: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=900&q=80&auto=format",
  banner: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1600&q=80&auto=format",
};

const STARTUPS = [
  {
    rank: "01",
    name: "Zerodha",
    founder: "Nithin & Nikhil Kamath",
    sector: "Stock Broking · WealthTech",
    city: "Bengaluru",
    founded: 2010,
    metric1: { label: "Active Clients", val: "13M+" },
    metric2: { label: "Revenue FY24", val: "₹8,320Cr" },
    stage: "Bootstrapped · Profitable",
    slug: "zerodha",
    img: IMGS.zerodha,
    what: "Zerodha is India's largest stockbroker — built without a single rupee of external funding. They disrupted an industry dominated by legacy players by offering zero brokerage on delivery trades and a superior trading experience.",
    why: "In an industry where everyone charged 0.5% brokerage, Zerodha charged ₹0. That single decision made them India's largest broker by active clients within seven years. Nithin Kamath's greatest product insight: the fee is the product.",
    tags: ["Bootstrapped", "Profitable", "Zero Brokerage"],
  },
  {
    rank: "02",
    name: "Razorpay",
    founder: "Harshil Mathur & Shashank Kumar",
    sector: "Payments Infrastructure · B2B FinTech",
    city: "Bengaluru",
    founded: 2014,
    metric1: { label: "TPV Processed", val: "$150B+" },
    metric2: { label: "Businesses", val: "8M+" },
    stage: "Series F · $7.5B Valuation",
    slug: "razorpay",
    img: IMGS.razorpay,
    what: "Razorpay is the payments and banking infrastructure for Indian businesses — processing $150B+ in annual TPV for 8M+ businesses through its payments gateway, neobanking, payroll, and lending stack.",
    why: "The founders applied to YC when India's payment infrastructure was broken and complex. They built developer-first APIs that made integrating payments as simple as copying 5 lines of code. That simplicity created a moat no bank could replicate.",
    tags: ["Payments", "B2B", "Banking Infrastructure"],
  },
  {
    rank: "03",
    name: "CRED",
    founder: "Kunal Shah",
    sector: "Credit Card · Premium FinTech",
    city: "Bengaluru",
    founded: 2018,
    metric1: { label: "Members", val: "12M+" },
    metric2: { label: "Valuation", val: "$6.4B" },
    stage: "Series F · Unicorn",
    slug: "cred",
    img: IMGS.cred,
    what: "CRED is a members-only platform for India's most creditworthy individuals — rewarding credit card bill payments, offering exclusive commerce, and building financial products for a segment every bank ignores with delight.",
    why: "Kunal Shah's insight: India's 25M+ credit card holders are underserved by banks. CRED built a premium brand around that underserved identity — creating extreme member loyalty while quietly becoming a $6.4B lending and commerce business.",
    tags: ["Premium FinTech", "Credit Cards", "Brand-Led"],
  },
  {
    rank: "04",
    name: "Groww",
    founder: "Lalit Keshre, Harsh Jain & team",
    sector: "Mutual Funds · Stocks · WealthTech",
    city: "Bengaluru",
    founded: 2016,
    metric1: { label: "Users", val: "10M+" },
    metric2: { label: "AUM", val: "₹1.1L Cr" },
    stage: "Unicorn · $3B Valuation",
    slug: "groww",
    img: IMGS.groww,
    what: "Groww made investing in mutual funds and stocks as simple as ordering on Swiggy — clean design, zero account opening fees, zero commissions, and an onboarding flow that takes 4 minutes. They democratised wealth creation for first-time investors.",
    why: "India has 1.4 billion people and 30 million mutual fund investors. Groww looked at that gap and built for it relentlessly — starting with millennials in Tier 2 cities who had never invested before because the process was too complicated.",
    tags: ["WealthTech", "Mutual Funds", "First-Time Investors"],
  },
  {
    rank: "05",
    name: "Jupiter",
    founder: "Jitendra Gupta",
    sector: "Neobanking · Personal Finance",
    city: "Mumbai",
    founded: 2019,
    metric1: { label: "Users", val: "2.5M+" },
    metric2: { label: "Funding", val: "$186M" },
    stage: "Series C",
    slug: "jupiter",
    img: IMGS.jupiter,
    what: "Jupiter is India's most sophisticated neobank — offering a premium savings account, intelligent spending analytics, smart savings tools, and mutual fund investments in one beautifully designed app.",
    why: "Jitendra Gupta sold his previous fintech company to PayU for $125M, then started Jupiter to solve the problem he'd seen firsthand: Indian banks have terrible apps and zero understanding of their customers. Jupiter is the bank India's urban professional deserves.",
    tags: ["Neobanking", "Personal Finance", "Premium UX"],
  },
];

const STATS = [
  { val: "$150B+", label: "India FinTech Market Size 2025" },
  { val: "22+", label: "FinTech Unicorns in India" },
  { val: "#3", label: "India's Global Rank in FinTech Adoption" },
  { val: "₹200Cr", label: "Processed via UPI Every Minute" },
];

const SEGMENTS = [
  { name: "Payments & Wallets", color: "#B45309", pct: 45 },
  { name: "WealthTech & Investing", color: "#D97706", pct: 22 },
  { name: "Lending & Credit", color: "#1D4ED8", pct: 18 },
  { name: "InsurTech", color: "#7C3AED", pct: 10 },
  { name: "Neobanking", color: "#059669", pct: 5 },
];

export default function FinTechStartupsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');

        .pf  { font-family: 'Playfair Display', Georgia, serif !important; }
        .rp  { font-family: 'Georgia', 'Times New Roman', serif; }
        .sf  { font-family: system-ui, -apple-system, sans-serif; }

        :root {
          --parch:  #F5F1E8;
          --parch2: #EDE9DF;
          --ink:    #1A1208;
          --ink3:   #5A4A30;
          --ink4:   #8C7D65;
          --ink5:   #BBB0A0;
          --rule:   #C8C2B4;
          --rule2:  #D8D2C4;
          --gold:   #B45309;
          --gold2:  #D97706;
          --gold3:  #92400E;
          --accent: #B45309;
          --accentlt: #FEF3C7;
          --white:  #FDFCF9;
        }

        body { background: var(--parch); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes barGrow {
          from { width: 0; }
          to   { width: var(--w); }
        }
        .a0 { animation: fadeUp .44s .00s cubic-bezier(.16,1,.3,1) both; }
        .a1 { animation: fadeUp .44s .10s cubic-bezier(.16,1,.3,1) both; }
        .a2 { animation: fadeUp .44s .20s cubic-bezier(.16,1,.3,1) both; }

        .imgf { position: relative; overflow: hidden; }
        .imgf img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          filter: sepia(14%) contrast(110%);
          transition: transform .6s ease;
        }
        .imgf:hover img { transform: scale(1.04); }

        .startup-card {
          border: 1.5px solid var(--ink);
          background: var(--white);
          overflow: hidden; position: relative;
          transition: transform .15s, box-shadow .15s;
        }
        .startup-card:hover { transform: translate(-2px,-2px); box-shadow: 4px 4px 0 var(--ink); }
        .startup-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--gold3), var(--gold), var(--gold2), #E8C547);
        }

        .stat-box {
          border: 1.5px solid var(--ink); background: var(--white);
          padding: 22px 18px; text-align: center; position: relative; overflow: hidden;
        }
        .stat-box::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: linear-gradient(90deg, var(--gold3), var(--gold2));
        }

        .seg-bar-track { background: var(--rule2); height: 8px; width: 100%; position: relative; overflow: hidden; border-radius: 0; }
        .seg-bar-fill {
          height: 100%;
          animation: barGrow 1.2s cubic-bezier(.16,1,.3,1) .4s both;
        }

        .tag {
          display: inline-block; padding: 2px 8px;
          border: 1px solid rgba(180,83,9,.3); background: var(--accentlt);
          font-size: 8px; font-weight: 700; text-transform: uppercase;
          letter-spacing: .12em; color: var(--gold3); font-family: system-ui;
        }

        .sh { display: flex; align-items: center; gap: 10px; }
        .sh-l { font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: .28em; color: var(--ink5); font-family: system-ui; white-space: nowrap; }
        .sh-r { flex: 1; height: 1px; background: var(--rule2); }

        @media (max-width: 900px) { .card-grid { grid-template-columns: 1fr !important; } .stat-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px) { .stat-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <main
        itemScope
        itemType="https://schema.org/CollectionPage"
        style={{ minHeight: "100vh", background: "var(--parch)" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Top FinTech Startups in India 2026",
              description: "India's top financial technology startups — ranked by innovation, scale, and market impact.",
              url: "https://upforge.in/fintech-startups",
              publisher: { "@type": "Organization", name: "UpForge", url: "https://upforge.in" },
              dateModified: new Date().toISOString().split("T")[0],
            }),
          }}
        />

        {/* BREADCRUMB */}
        <nav className="sf a0" style={{ background: "var(--parch2)", borderBottom: "1px solid var(--rule2)", padding: "8px 0" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(16px,3vw,36px)" }}>
            <ol style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9, color: "var(--ink5)", textTransform: "uppercase", letterSpacing: "0.18em", listStyle: "none", margin: 0, padding: 0 }}>
              <li><Link href="/" style={{ color: "var(--ink5)", textDecoration: "none" }}>UpForge</Link></li>
              <li style={{ color: "var(--rule)" }}>/</li>
              <li style={{ color: "var(--ink4)", fontWeight: 700 }}>FinTech Startups</li>
            </ol>
          </div>
        </nav>

        {/* HERO */}
        <div className="a0" style={{ borderBottom: "3px solid var(--ink)" }}>
          <div className="imgf" style={{ height: "clamp(280px,38vw,480px)" }}>
            <img src={IMGS.hero} alt="Top FinTech Startups India 2026" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,18,8,.4) 0%, rgba(26,18,8,.88) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 clamp(16px,5vw,64px)", textAlign: "center" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap", justifyContent: "center" }}>
                {["FinTech", "Financial Technology", "India 2026"].map(tag => (
                  <span key={tag} className="sf" style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.2)", padding: "3px 10px" }}>{tag}</span>
                ))}
              </div>
              <h1 className="pf" itemProp="name" style={{ fontSize: "clamp(1.8rem,5.5vw,4.2rem)", fontWeight: 900, lineHeight: 1.02, color: "white", letterSpacing: "-0.02em", marginBottom: 18, maxWidth: 860 }}>
                Top FinTech Startups in India 2026:{" "}
                <em style={{ color: "#E8C547", fontStyle: "italic" }}>The Companies Reinventing Money</em>
              </h1>
              <p className="rp" style={{ fontSize: "clamp(13px,1.8vw,16px)", color: "rgba(255,255,255,0.62)", fontStyle: "italic", maxWidth: 560, lineHeight: 1.6 }}>
                UPI processed more transactions in 2024 than Visa and Mastercard combined. India's financial revolution is not coming — it is here.
              </p>
            </div>
            <div className="sf" style={{ position: "absolute", top: 18, right: 18, background: "rgba(26,18,8,.7)", border: "1px solid rgba(255,255,255,.1)", padding: "5px 12px", fontSize: 8, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>
              UpForge · FinTech Intelligence
            </div>
          </div>
          <div style={{ background: "var(--ink)" }}>
            <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(16px,3vw,36px)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                {[
                  { l: "Updated", v: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
                  { l: "Companies Ranked", v: "5 Featured · 22+ Unicorns Tracked" },
                  { l: "Category", v: "FinTech · Financial Technology" },
                  { l: "Coverage", v: "Payments · WealthTech · Lending" },
                ].map((m, i) => (
                  <div key={i} style={{ padding: "12px 20px", borderRight: "1px solid rgba(255,255,255,.07)" }}>
                    <p className="sf" style={{ fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,.3)", marginBottom: 3 }}>{m.l}</p>
                    <p className="sf" style={{ fontSize: 11, color: "rgba(255,255,255,.6)", fontWeight: 600 }}>{m.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(16px,3vw,36px) clamp(48px,8vw,96px)" }}>

          {/* INTRO */}
          <div className="a1" style={{ padding: "clamp(28px,4vw,48px) 0", borderBottom: "1px solid var(--rule2)" }}>
            <div className="sh" style={{ marginBottom: 18 }}><span className="sh-l">The FinTech Opportunity</span><div className="sh-r" /></div>
            <p className="pf" itemProp="description" style={{ fontSize: "clamp(1.05rem,2.2vw,1.35rem)", fontWeight: 400, lineHeight: 1.72, color: "var(--ink)", marginBottom: 18, maxWidth: 760 }}>
              India has built the world's most ambitious financial infrastructure — UPI, Aadhaar, Account Aggregator, ONDC. On top of that infrastructure, a generation of founders is building the financial products that 1.4 billion people deserve.
            </p>
            <p className="rp" style={{ fontSize: 13.5, color: "var(--ink3)", lineHeight: 1.85, maxWidth: 720 }}>
              This is UpForge's ranking of India's best FinTech startups — evaluated on technology depth, financial inclusion impact, unit economics, and founder track record. Not the most funded. The most significant.
            </p>
          </div>

          {/* STATS */}
          <div className="a2" style={{ padding: "clamp(24px,4vw,40px) 0", borderBottom: "1px solid var(--rule2)" }}>
            <div className="sh" style={{ marginBottom: 20 }}><span className="sh-l">India FinTech by the Numbers</span><div className="sh-r" /></div>
            <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {STATS.map((s, i) => (
                <div key={i} className="stat-box">
                  <p className="pf" style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 900, color: "var(--ink)", marginBottom: 6, lineHeight: 1 }}>{s.val}</p>
                  <p className="sf" style={{ fontSize: 9.5, color: "var(--ink4)", lineHeight: 1.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SEGMENT BARS */}
          <div className="a2" style={{ padding: "clamp(24px,4vw,40px) 0", borderBottom: "1px solid var(--rule2)" }}>
            <div className="sh" style={{ marginBottom: 20 }}><span className="sh-l">India FinTech Market Share by Segment</span><div className="sh-r" /></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {SEGMENTS.map((seg, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span className="sf" style={{ fontSize: 10, fontWeight: 700, color: "var(--ink3)" }}>{seg.name}</span>
                    <span className="sf" style={{ fontSize: 9, color: "var(--ink5)", fontWeight: 700 }}>{seg.pct}%</span>
                  </div>
                  <div className="seg-bar-track">
                    <div className="seg-bar-fill" style={{ width: `${seg.pct}%`, background: seg.color, "--w": `${seg.pct}%` } as React.CSSProperties} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STARTUPS */}
          <div style={{ marginTop: "clamp(32px,5vw,56px)" }}>
            <div className="sh" style={{ marginBottom: 20 }}><span className="sh-l">Featured FinTech Startups · India 2026</span><div className="sh-r" /></div>

            {STARTUPS.map((s, idx) => (
              <div key={idx} className="startup-card" style={{ marginBottom: 20 }}>
                <div className="card-grid" style={{ display: "grid", gridTemplateColumns: idx % 2 === 0 ? "1fr 300px" : "300px 1fr", gap: 0, minHeight: 300 }}>
                  {idx % 2 !== 0 && (
                    <div className="imgf" style={{ borderRight: "1.5px solid var(--ink)", minHeight: 280 }}>
                      <img src={s.img} alt={s.name} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,18,8,.65) 0%, transparent 60%)" }} />
                      <div style={{ position: "absolute", bottom: 20, left: 20 }}>
                        <span className="pf" style={{ fontSize: "4rem", fontWeight: 900, color: "rgba(255,255,255,0.1)", lineHeight: 1 }}>{s.rank}</span>
                      </div>
                    </div>
                  )}

                  <div style={{ padding: "clamp(20px,3vw,32px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                        <span className="sf" style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold2)" }}>Rank {s.rank}</span>
                        <div style={{ flex: 1, height: 1, background: "var(--rule2)" }} />
                        <span className="sf" style={{ fontSize: 8, color: "var(--ink5)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.city} · Est. {s.founded}</span>
                      </div>
                      <h2 className="pf" style={{ fontSize: "clamp(1.3rem,2.5vw,1.9rem)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.1, marginBottom: 6 }}>{s.name}</h2>
                      <p className="sf" style={{ fontSize: 10, color: "var(--ink4)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600 }}>{s.sector}</p>
                      <p className="rp" style={{ fontSize: 13.5, color: "var(--ink3)", lineHeight: 1.85, marginBottom: 12 }}>{s.what}</p>
                      <p className="rp" style={{ fontSize: 13, color: "var(--ink4)", lineHeight: 1.8, fontStyle: "italic" }}>{s.why}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                        {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
                      </div>
                    </div>

                    <div style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                      <div style={{ display: "flex", gap: 16 }}>
                        <div>
                          <p className="sf" style={{ fontSize: 7.5, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--ink5)", marginBottom: 2 }}>{s.metric1.label}</p>
                          <p className="sf" style={{ fontSize: 13, fontWeight: 800, color: "var(--gold2)" }}>{s.metric1.val}</p>
                        </div>
                        <div>
                          <p className="sf" style={{ fontSize: 7.5, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--ink5)", marginBottom: 2 }}>{s.metric2.label}</p>
                          <p className="sf" style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>{s.metric2.val}</p>
                        </div>
                      </div>
                      <Link href={`/startup/${s.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--ink)", color: "white", padding: "8px 16px", textDecoration: "none", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", fontFamily: "system-ui" }}>
                        Full Profile →
                      </Link>
                    </div>
                  </div>

                  {idx % 2 === 0 && (
                    <div className="imgf" style={{ borderLeft: "1.5px solid var(--ink)", minHeight: 280 }}>
                      <img src={s.img} alt={s.name} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(26,18,8,.65) 0%, transparent 60%)" }} />
                      <div style={{ position: "absolute", bottom: 20, right: 20, textAlign: "right" }}>
                        <span className="pf" style={{ fontSize: "4rem", fontWeight: 900, color: "rgba(255,255,255,0.1)", lineHeight: 1 }}>{s.rank}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CLOSING */}
          <div style={{ marginTop: "clamp(36px,6vw,64px)", border: "1.5px solid var(--ink)", background: "var(--ink)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--gold3), var(--gold), var(--gold2), #E8C547, var(--gold2), var(--gold3))" }} />
            <div className="imgf" style={{ height: 180 }}>
              <img src={IMGS.banner} alt="India FinTech ecosystem" style={{ filter: "sepia(40%) brightness(0.35) contrast(1.1)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 clamp(20px,5vw,60px)", textAlign: "center" }}>
                <p className="pf" style={{ fontSize: "clamp(1.2rem,2.8vw,2rem)", fontWeight: 700, color: "white", lineHeight: 1.25, fontStyle: "italic" }}>
                  "India's FinTech story is not about disrupting banks. It is about{" "}
                  <em style={{ color: "#E8C547" }}>building the financial system the banks never built.</em>"
                </p>
              </div>
            </div>
            <div style={{ padding: "clamp(20px,3vw,36px)" }}>
              <p className="rp" style={{ fontSize: 13.5, color: "rgba(255,255,255,.7)", lineHeight: 1.85, maxWidth: 720 }}>
                UpForge tracks India's FinTech landscape from payments to wealth to insurance — every unicorn, every challenger, every founder building the infrastructure for 1.4 billion people's financial lives.
              </p>
            </div>
          </div>

          {/* FOOTER NAV */}
          <nav aria-label="Page navigation" style={{ padding: "16px 0", borderTop: "2px solid var(--ink)", marginTop: "clamp(32px,5vw,52px)" }}>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", listStyle: "none", margin: 0, padding: 0 }}>
              {[
                { l: "Top AI Startups", h: "/top-ai-startups" },
                { l: "Best SaaS Startups", h: "/best-saas-startups" },
                { l: "EdTech Startups", h: "/edtech-startups" },
                { l: "Indian Unicorns 2026", h: "/indian-unicorns" },
                { l: "All Startups", h: "/startup" },
                { l: "Submit Startup", h: "/submit" },
              ].map(lnk => (
                <li key={lnk.h}><Link href={lnk.h} className="sf" style={{ fontSize: 8.5, color: "var(--ink5)", textTransform: "uppercase", letterSpacing: "0.14em", textDecoration: "none" }}>{lnk.l}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
    </>
  );
}
