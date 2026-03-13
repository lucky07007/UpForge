// app/d2c-startups/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top D2C Startups in India 2026: Best Direct-to-Consumer Brands Ranked | UpForge",
  description:
    "India's best D2C startups in 2026 — Mamaearth, boAt, Lenskart, Sugar Cosmetics, Wakefit, Noise, and the next generation of direct-to-consumer brands. Explore valuations, revenue, founder journeys, and what makes each brand exceptional.",
  keywords: [
    "top D2C startups India 2026",
    "best direct to consumer brands India",
    "Indian D2C unicorns 2026",
    "D2C startup funding India",
    "Mamaearth boAt Lenskart Sugar Cosmetics",
    "Indian consumer brands 2026",
    "D2C founders India",
    "direct to consumer startup India ranking",
    "D2C brand building India",
  ].join(", "),
  alternates: { canonical: "https://upforge.in/d2c-startups" },
  openGraph: {
    title: "Top D2C Startups in India 2026: Best Direct-to-Consumer Brands Ranked",
    description:
      "India's D2C revolution is creating globally competitive consumer brands at internet speed. These are the companies leading it.",
    url: "https://upforge.in/d2c-startups",
    siteName: "UpForge",
    images: [{ url: "https://upforge.in/og-d2c-startups.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top D2C Startups India 2026 | UpForge",
    description:
      "Mamaearth, boAt, Lenskart, Sugar Cosmetics — India's D2C revolution, ranked and profiled on UpForge.",
  },
};

const IMGS = {
  hero:       "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=85&auto=format",
  mamaearth:  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=900&q=80&auto=format",
  boat:       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80&auto=format",
  lenskart:   "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=900&q=80&auto=format",
  sugar:      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80&auto=format",
  wakefit:    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80&auto=format",
  noise:      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&q=80&auto=format",
  zepto:      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80&auto=format",
  banner:     "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80&auto=format",
};

const STARTUPS = [
  {
    rank: "01",
    name: "Mamaearth",
    founder: "Varun & Ghazal Alagh",
    sector: "Personal Care · Beauty · FMCG",
    city: "Gurugram",
    founded: 2016,
    metric1: { label: "Revenue FY24", val: "₹1,923Cr" },
    metric2: { label: "Stage", val: "BSE/NSE Listed" },
    img: IMGS.mamaearth,
    slug: "mamaearth",
    what: "Mamaearth is India's first profitable D2C unicorn to go public — building a portfolio of toxin-free personal care brands (Mamaearth, The Derma Co., Aqualogica, Bblunt) sold through both digital and 1.5L+ offline touchpoints.",
    why: "Varun and Ghazal started by solving their own problem as new parents — finding a safe baby shampoo. That authenticity became a brand moat. In a market dominated by HUL and P&G for decades, Mamaearth captured the trust of 12M+ households.",
    insight: "The best D2C brands start with a genuine consumer problem, not a marketing brief.",
    tags: ["Beauty", "FMCG", "Public Company", "Profitable"],
  },
  {
    rank: "02",
    name: "boAt",
    founder: "Aman Gupta & Sameer Mehta",
    sector: "Consumer Electronics · Audio",
    city: "New Delhi",
    founded: 2016,
    metric1: { label: "Annual Revenue", val: "₹3,402Cr" },
    metric2: { label: "Stage", val: "Pre-IPO · $1.6B Val" },
    img: IMGS.boat,
    slug: "boat",
    what: "boAt is India's #1 audio and wearables brand — selling headphones, earbuds, smartwatches, and speakers to 80M+ customers through aggressive D2C channels, backed by celebrity co-marketing and India-first product design.",
    why: "Aman Gupta entered a market owned by Sony and Skullcandy with a simple thesis: young Indians want premium-looking audio gear at a price they can actually afford. At ₹999–₹2,999, boAt cracked the most valuable consumer segment in India — and then defended it ruthlessly.",
    insight: "Aspirational design at accessible prices is the most durable D2C moat in India.",
    tags: ["Consumer Electronics", "Audio", "Wearables"],
  },
  {
    rank: "03",
    name: "Lenskart",
    founder: "Peyush Bansal",
    sector: "Eyewear · Phygital Retail",
    city: "New Delhi",
    founded: 2010,
    metric1: { label: "Annual Revenue", val: "₹3,788Cr" },
    metric2: { label: "Stage", val: "Unicorn · $4.5B Val" },
    img: IMGS.lenskart,
    slug: "lenskart",
    what: "Lenskart is India's largest eyewear brand — combining online convenience with 2,000+ physical stores, an owned prescription lens manufacturing facility, and an AI-powered virtual try-on that has been adopted by Warby Parker and others globally.",
    why: "Peyush Bansal saw an industry with poor penetration, zero brand loyalty, and broken retail. He built Lenskart as a phygital business before that term existed — owning manufacturing, retail, and the customer relationship. No competitor could copy all three at once.",
    insight: "Vertical integration in D2C creates the kind of margin structure that pure-play online brands can never achieve.",
    tags: ["Eyewear", "Phygital", "Manufacturing"],
  },
  {
    rank: "04",
    name: "Sugar Cosmetics",
    founder: "Vineeta Singh & Kaushik Mukherjee",
    sector: "Beauty · Cosmetics · D2C",
    city: "Mumbai",
    founded: 2015,
    metric1: { label: "Annual Revenue", val: "₹500Cr+" },
    metric2: { label: "Stage", val: "Series D · $500M Val" },
    img: IMGS.sugar,
    slug: "sugar-cosmetics",
    what: "Sugar Cosmetics is India's boldest homegrown cosmetics brand — built for the Indian skin tone, Indian climate, and Indian woman who refused to settle for products designed for Western consumers.",
    why: "Vineeta Singh turned down a ₹1Cr salary offer to build Sugar. She understood something most founders miss: Indian women wanted products that actually worked on morena skin in 35°C humidity. International brands failed them. Sugar didn't.",
    insight: "Building for an underserved consumer — not a broad market — creates the sharpest product-market fit.",
    tags: ["Cosmetics", "India-First", "Women's Beauty"],
  },
  {
    rank: "05",
    name: "Wakefit",
    founder: "Ankit Garg & Chaitanya Ramalingegowda",
    sector: "Sleep & Home Furniture · D2C",
    city: "Bengaluru",
    founded: 2016,
    metric1: { label: "Annual Revenue", val: "₹900Cr+" },
    metric2: { label: "Stage", val: "Series B · $350M Val" },
    img: IMGS.wakefit,
    slug: "wakefit",
    what: "Wakefit is India's leading sleep and home solutions brand — selling mattresses, pillows, bed frames, and study furniture directly to consumers with a 100-night free trial that eliminated the biggest friction in high-ticket online furniture buying.",
    why: "The mattress industry in India was dominated by offline retailers with 40%+ margins. Wakefit cut out every middleman and passed the savings to consumers while offering better quality. The 100-night trial was the trust mechanism that made large-ticket D2C actually work.",
    insight: "In high-ticket D2C, the return policy IS the product. Remove the risk and the conversion follows.",
    tags: ["Sleep Tech", "Home Furniture", "Trial-First"],
  },
  {
    rank: "06",
    name: "Noise",
    founder: "Gaurav Khatri & Amit Khatri",
    sector: "Wearables · Consumer Tech",
    city: "Gurugram",
    founded: 2014,
    metric1: { label: "Annual Revenue", val: "₹1,500Cr+" },
    metric2: { label: "Stage", val: "Series A · Bootstrapped Origins" },
    img: IMGS.noise,
    slug: "noise",
    what: "Noise is India's #2 wearables brand — selling smartwatches, earbuds, and fitness trackers to 30M+ customers through a relentless innovation cycle that brings 4–6 new products to market every month.",
    why: "The Khatri brothers started by reselling phone cases in college. They pivoted into wearables when they noticed a gap: Indians wanted fitness tracking but all options were either too expensive (Apple) or too cheap to trust (no-name). Noise owns the ₹2,000–₹5,000 sweet spot.",
    insight: "Speed of product iteration — not depth of any single product — is the defensible moat in consumer electronics.",
    tags: ["Wearables", "Smartwatches", "High Velocity"],
  },
  {
    rank: "07",
    name: "Zepto",
    founder: "Aadit Palicha & Kaivalya Vohra",
    sector: "Quick Commerce · Grocery D2C",
    city: "Mumbai",
    founded: 2021,
    metric1: { label: "GMV Run Rate", val: "$1.4B+" },
    metric2: { label: "Stage", val: "Unicorn · $5B Val" },
    img: IMGS.zepto,
    slug: "zepto",
    what: "Zepto reinvented grocery retail in India — delivering 10,000+ SKUs in under 10 minutes through a network of dark stores, running on a unit economics model that has beaten both Blinkit and Swiggy Instamart in key markets.",
    why: "Aadit and Kaivalya were 19-year-old Stanford dropouts when they bet that Indian consumers would pay a small premium for instant delivery. They were right. More importantly, they built the supply chain ops and dark store network fast enough that by the time everyone believed them, Zepto was already unreachable.",
    insight: "In quick commerce, logistics density is the product. Build the network first — the brand follows.",
    tags: ["Quick Commerce", "Grocery", "10-Min Delivery"],
  },
];

const STATS = [
  { val: "$60B+", label: "India D2C Market by 2027" },
  { val: "800+", label: "Funded D2C Brands in India" },
  { val: "190M+", label: "Online Shoppers by 2025" },
  { val: "5x", label: "D2C Growth vs Offline FMCG (2020–24)" },
];

const CATEGORIES = [
  { name: "Beauty & Personal Care", brands: 220, color: "#EC4899" },
  { name: "Fashion & Apparel",      brands: 185, color: "#8B5CF6" },
  { name: "Consumer Electronics",   brands: 130, color: "#3B82F6" },
  { name: "Food & Nutrition",        brands: 115, color: "#F59E0B" },
  { name: "Home & Furniture",        brands: 90,  color: "#10B981" },
  { name: "Quick Commerce",          brands: 60,  color: "#EF4444" },
];

const PLAYBOOK = [
  { step: "01", title: "Own Your Data", body: "D2C brands control first-party customer data — purchase history, preferences, feedback — that marketplace sellers never access. Data compounds." },
  { step: "02", title: "Control the Narrative", body: "No algorithm decides your shelf placement. D2C brands own their story, their aesthetic, and their customer relationship end-to-end." },
  { step: "03", title: "Iterate at Speed", body: "Without retail buyers and long lead times, D2C brands can test, launch, and iterate products in 90-day cycles instead of 18-month cycles." },
  { step: "04", title: "Build LTV, Not Just GMV", body: "The best D2C brands obsess over repeat purchase rate — the metric that turns a customer acquisition cost into a long-term profit centre." },
];

export default function D2CStartupsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');

        .pf  { font-family: 'Playfair Display', Georgia, serif !important; }
        .rp  { font-family: 'Georgia','Times New Roman', serif; }
        .sf  { font-family: system-ui,-apple-system,sans-serif; }

        :root {
          --parch:   #F5F1E8;
          --parch2:  #EDE9DF;
          --ink:     #1A1208;
          --ink3:    #5A4A30;
          --ink4:    #8C7D65;
          --ink5:    #BBB0A0;
          --rule:    #C8C2B4;
          --rule2:   #D8D2C4;
          --gold:    #B45309;
          --gold2:   #D97706;
          --gold3:   #92400E;
          --accent:  #DB2777;
          --accentlt:#FDF2F8;
          --white:   #FDFCF9;
        }

        body { background: var(--parch); }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes barGrow {
          from { width:0; }
          to   { width:var(--w); }
        }
        .a0 { animation:fadeUp .44s .00s cubic-bezier(.16,1,.3,1) both; }
        .a1 { animation:fadeUp .44s .10s cubic-bezier(.16,1,.3,1) both; }
        .a2 { animation:fadeUp .44s .20s cubic-bezier(.16,1,.3,1) both; }

        .imgf { position:relative; overflow:hidden; }
        .imgf img {
          position:absolute; inset:0; width:100%; height:100%;
          object-fit:cover; object-position:center;
          filter:sepia(10%) contrast(110%);
          transition:transform .6s ease;
        }
        .imgf:hover img { transform:scale(1.04); }

        .startup-card {
          border:1.5px solid var(--ink);
          background:var(--white);
          overflow:hidden; position:relative;
          transition:transform .15s,box-shadow .15s;
        }
        .startup-card:hover { transform:translate(-2px,-2px); box-shadow:4px 4px 0 var(--ink); }
        .startup-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:3px;
          background:linear-gradient(90deg,#9D174D,var(--accent),#F472B6,#FB7185);
        }

        .stat-box {
          border:1.5px solid var(--ink); background:var(--white);
          padding:22px 18px; text-align:center; position:relative; overflow:hidden;
        }
        .stat-box::after {
          content:''; position:absolute; bottom:0; left:0; right:0;
          height:2px; background:linear-gradient(90deg,#9D174D,#F472B6);
        }

        .cat-bar-track { height:6px; background:var(--rule2); overflow:hidden; }
        .cat-bar-fill { height:100%; animation:barGrow 1.2s cubic-bezier(.16,1,.3,1) .4s both; }

        .playbook-card {
          border:1.5px solid var(--rule2); background:var(--white);
          padding:20px 18px; position:relative;
          transition:transform .15s,box-shadow .15s;
        }
        .playbook-card:hover { transform:translate(-2px,-2px); box-shadow:3px 3px 0 var(--ink); }

        .insight-strip {
          background:var(--ink); border-left:4px solid var(--accent);
          padding:12px 16px; margin-top:14px;
        }

        .tag {
          display:inline-block; padding:2px 8px;
          border:1px solid rgba(219,39,119,.3); background:var(--accentlt);
          font-size:8px; font-weight:700; text-transform:uppercase;
          letter-spacing:.12em; color:#9D174D; font-family:system-ui;
        }

        .sh { display:flex; align-items:center; gap:10px; }
        .sh-l { font-size:8px; font-weight:700; text-transform:uppercase; letter-spacing:.28em; color:var(--ink5); font-family:system-ui; white-space:nowrap; }
        .sh-r { flex:1; height:1px; background:var(--rule2); }

        @media (max-width:900px) {
          .card-grid  { grid-template-columns:1fr !important; }
          .stat-grid  { grid-template-columns:repeat(2,1fr) !important; }
          .play-grid  { grid-template-columns:repeat(2,1fr) !important; }
        }
        @media (max-width:600px) {
          .stat-grid  { grid-template-columns:1fr !important; }
          .play-grid  { grid-template-columns:1fr !important; }
        }
      `}</style>

      <main
        itemScope
        itemType="https://schema.org/CollectionPage"
        style={{ minHeight:"100vh", background:"var(--parch)" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Top D2C Startups in India 2026",
            description: "India's top direct-to-consumer startups — ranked by revenue, brand strength, and long-term consumer impact.",
            url: "https://upforge.in/d2c-startups",
            publisher: { "@type":"Organization", name:"UpForge", url:"https://upforge.in" },
            dateModified: new Date().toISOString().split("T")[0],
          })}}
        />

        {/* BREADCRUMB */}
        <nav className="sf a0" style={{ background:"var(--parch2)", borderBottom:"1px solid var(--rule2)", padding:"8px 0" }}>
          <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 clamp(16px,3vw,36px)" }}>
            <ol style={{ display:"flex", alignItems:"center", gap:6, fontSize:9, color:"var(--ink5)", textTransform:"uppercase", letterSpacing:"0.18em", listStyle:"none", margin:0, padding:0 }}>
              <li><Link href="/" style={{ color:"var(--ink5)", textDecoration:"none" }}>UpForge</Link></li>
              <li style={{ color:"var(--rule)" }}>/</li>
              <li style={{ color:"var(--ink4)", fontWeight:700 }}>D2C Startups</li>
            </ol>
          </div>
        </nav>

        {/* ── HERO ── */}
        <div className="a0" style={{ borderBottom:"3px solid var(--ink)" }}>
          <div className="imgf" style={{ height:"clamp(280px,38vw,480px)" }}>
            <img src={IMGS.hero} alt="Top D2C Startups India 2026" />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(100,10,50,.4) 0%,rgba(100,10,50,.88) 100%)" }} />
            <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 clamp(16px,5vw,64px)", textAlign:"center" }}>
              <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap", justifyContent:"center" }}>
                {["D2C","Direct-to-Consumer","India 2026"].map(t=>(
                  <span key={t} className="sf" style={{ fontSize:8, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.65)", border:"1px solid rgba(255,255,255,0.2)", padding:"3px 10px" }}>{t}</span>
                ))}
              </div>
              <h1 className="pf" itemProp="name" style={{ fontSize:"clamp(1.8rem,5.5vw,4.2rem)", fontWeight:900, lineHeight:1.02, color:"white", letterSpacing:"-0.02em", marginBottom:18, maxWidth:880 }}>
                Top D2C Startups in India 2026:{" "}
                <em style={{ color:"#F9A8D4", fontStyle:"italic" }}>Indian Brands Built for a Billion Consumers</em>
              </h1>
              <p className="rp" style={{ fontSize:"clamp(13px,1.8vw,16px)", color:"rgba(255,255,255,0.62)", fontStyle:"italic", maxWidth:580, lineHeight:1.6 }}>
                From ₹999 earbuds to toxin-free baby shampoo — India's D2C era is creating brands that will outlast the startups that built them.
              </p>
            </div>
            <div className="sf" style={{ position:"absolute", top:18, right:18, background:"rgba(100,10,50,.75)", border:"1px solid rgba(255,255,255,.1)", padding:"5px 12px", fontSize:8, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,.55)" }}>
              UpForge · D2C Intelligence
            </div>
          </div>

          <div style={{ background:"var(--ink)" }}>
            <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 clamp(16px,3vw,36px)" }}>
              <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center" }}>
                {[
                  { l:"Updated",   v:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}) },
                  { l:"Brands Ranked", v:"7 Featured · 800+ Tracked" },
                  { l:"Category",  v:"D2C · Consumer Brands" },
                  { l:"Coverage",  v:"Beauty · Electronics · Home · Commerce" },
                ].map((m,i)=>(
                  <div key={i} style={{ padding:"12px 20px", borderRight:"1px solid rgba(255,255,255,.07)" }}>
                    <p className="sf" style={{ fontSize:7.5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.18em", color:"rgba(255,255,255,.3)", marginBottom:3 }}>{m.l}</p>
                    <p className="sf" style={{ fontSize:11, color:"rgba(255,255,255,.6)", fontWeight:600 }}>{m.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 clamp(16px,3vw,36px) clamp(48px,8vw,96px)" }}>

          {/* INTRO */}
          <div className="a1" style={{ padding:"clamp(28px,4vw,48px) 0", borderBottom:"1px solid var(--rule2)" }}>
            <div className="sh" style={{ marginBottom:18 }}><span className="sh-l">The D2C Opportunity</span><div className="sh-r" /></div>
            <p className="pf" itemProp="description" style={{ fontSize:"clamp(1.05rem,2.2vw,1.35rem)", fontWeight:400, lineHeight:1.72, color:"var(--ink)", marginBottom:18, maxWidth:760 }}>
              India's D2C revolution is not a trend. It is a structural shift driven by three forces arriving simultaneously: 600M+ smartphone users, Jio-era cheap data, and a generation of consumers who trust Instagram over television.
            </p>
            <p className="rp" style={{ fontSize:13.5, color:"var(--ink3)", lineHeight:1.85, maxWidth:720 }}>
              The brands on this page were not built in a legacy factory with a 50-year distribution network. They were built in the age of paid social, warehouse management APIs, and direct customer relationships. And they are beating the old guard on their own turf.
            </p>
          </div>

          {/* STATS */}
          <div className="a2" style={{ padding:"clamp(24px,4vw,40px) 0", borderBottom:"1px solid var(--rule2)" }}>
            <div className="sh" style={{ marginBottom:20 }}><span className="sh-l">India D2C by the Numbers</span><div className="sh-r" /></div>
            <div className="stat-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
              {STATS.map((s,i)=>(
                <div key={i} className="stat-box">
                  <p className="pf" style={{ fontSize:"clamp(1.4rem,2.5vw,2rem)", fontWeight:900, color:"var(--ink)", marginBottom:6, lineHeight:1 }}>{s.val}</p>
                  <p className="sf" style={{ fontSize:9.5, color:"var(--ink4)", lineHeight:1.5, textTransform:"uppercase", letterSpacing:"0.1em" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CATEGORY BARS */}
          <div className="a2" style={{ padding:"clamp(24px,4vw,40px) 0", borderBottom:"1px solid var(--rule2)" }}>
            <div className="sh" style={{ marginBottom:20 }}><span className="sh-l">Top D2C Categories · India 2026</span><div className="sh-r" /></div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px 36px" }}>
              {CATEGORIES.map((c,i)=>(
                <div key={i}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span className="sf" style={{ fontSize:10, fontWeight:700, color:"var(--ink3)" }}>{c.name}</span>
                    <span className="sf" style={{ fontSize:9, color:"var(--ink5)" }}>{c.brands} brands</span>
                  </div>
                  <div className="cat-bar-track">
                    <div className="cat-bar-fill" style={{ background:c.color, width:`${Math.round(c.brands/220*100)}%`, "--w":`${Math.round(c.brands/220*100)}%` } as React.CSSProperties} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* D2C PLAYBOOK */}
          <div className="a2" style={{ padding:"clamp(24px,4vw,40px) 0", borderBottom:"1px solid var(--rule2)" }}>
            <div className="sh" style={{ marginBottom:20 }}><span className="sh-l">The India D2C Playbook · 4 Principles</span><div className="sh-r" /></div>
            <div className="play-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
              {PLAYBOOK.map((p,i)=>(
                <div key={i} className="playbook-card">
                  <span className="pf" style={{ fontSize:"2.2rem", fontWeight:900, color:"rgba(219,39,119,0.12)", lineHeight:1, display:"block", marginBottom:8 }}>{p.step}</span>
                  <h3 className="sf" style={{ fontSize:11, fontWeight:800, color:"var(--ink)", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.08em" }}>{p.title}</h3>
                  <p className="rp" style={{ fontSize:12, color:"var(--ink4)", lineHeight:1.7 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── 7 STARTUPS ── */}
          <div style={{ marginTop:"clamp(32px,5vw,56px)" }}>
            <div className="sh" style={{ marginBottom:20 }}><span className="sh-l">Featured D2C Startups · India 2026</span><div className="sh-r" /></div>

            {STARTUPS.map((s,idx)=>(
              <div key={idx} className="startup-card" style={{ marginBottom:20 }}>
                <div className="card-grid" style={{ display:"grid", gridTemplateColumns:idx%2===0?"1fr 320px":"320px 1fr", gap:0, minHeight:320 }}>

                  {idx%2!==0&&(
                    <div className="imgf" style={{ borderRight:"1.5px solid var(--ink)", minHeight:300 }}>
                      <img src={s.img} alt={s.name} />
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(100,10,50,.65) 0%,transparent 60%)" }} />
                      <div style={{ position:"absolute", bottom:20, left:20 }}>
                        <span className="pf" style={{ fontSize:"4rem", fontWeight:900, color:"rgba(255,255,255,0.1)", lineHeight:1 }}>{s.rank}</span>
                      </div>
                    </div>
                  )}

                  <div style={{ padding:"clamp(20px,3vw,32px)", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                        <span className="sf" style={{ fontSize:9, fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--accent)" }}>Rank {s.rank}</span>
                        <div style={{ flex:1, height:1, background:"var(--rule2)" }} />
                        <span className="sf" style={{ fontSize:8, color:"var(--ink5)", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" }}>{s.city} · Est. {s.founded}</span>
                      </div>

                      <h2 className="pf" style={{ fontSize:"clamp(1.3rem,2.5vw,1.9rem)", fontWeight:700, color:"var(--ink)", lineHeight:1.1, marginBottom:6 }}>{s.name}</h2>
                      <p className="sf" style={{ fontSize:10, color:"var(--ink4)", marginBottom:14, textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:600 }}>{s.sector}</p>

                      <p className="rp" style={{ fontSize:13.5, color:"var(--ink3)", lineHeight:1.85, marginBottom:12 }}>{s.what}</p>
                      <p className="rp" style={{ fontSize:13, color:"var(--ink4)", lineHeight:1.8, fontStyle:"italic" }}>{s.why}</p>

                      <div className="insight-strip">
                        <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                          <div style={{ width:3, height:3, borderRadius:"50%", background:"var(--accent)", flexShrink:0, marginTop:6 }} />
                          <p className="rp" style={{ fontSize:12, color:"rgba(255,255,255,.8)", fontStyle:"italic", lineHeight:1.65 }}>{s.insight}</p>
                        </div>
                      </div>

                      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:14 }}>
                        {s.tags.map(t=><span key={t} className="tag">{t}</span>)}
                      </div>
                    </div>

                    <div style={{ marginTop:20, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
                      <div style={{ display:"flex", gap:16 }}>
                        <div>
                          <p className="sf" style={{ fontSize:7.5, textTransform:"uppercase", letterSpacing:"0.15em", color:"var(--ink5)", marginBottom:2 }}>{s.metric1.label}</p>
                          <p className="sf" style={{ fontSize:13, fontWeight:800, color:"var(--accent)" }}>{s.metric1.val}</p>
                        </div>
                        <div>
                          <p className="sf" style={{ fontSize:7.5, textTransform:"uppercase", letterSpacing:"0.15em", color:"var(--ink5)", marginBottom:2 }}>{s.metric2.label}</p>
                          <p className="sf" style={{ fontSize:12, fontWeight:700, color:"var(--ink)" }}>{s.metric2.val}</p>
                        </div>
                      </div>
                      <Link href={`/startup/${s.slug}`} style={{ display:"inline-flex", alignItems:"center", gap:6, background:"var(--ink)", color:"white", padding:"8px 16px", textDecoration:"none", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.14em", fontFamily:"system-ui" }}>
                        Full Profile →
                      </Link>
                    </div>
                  </div>

                  {idx%2===0&&(
                    <div className="imgf" style={{ borderLeft:"1.5px solid var(--ink)", minHeight:300 }}>
                      <img src={s.img} alt={s.name} />
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to left,rgba(100,10,50,.65) 0%,transparent 60%)" }} />
                      <div style={{ position:"absolute", bottom:20, right:20, textAlign:"right" }}>
                        <span className="pf" style={{ fontSize:"4rem", fontWeight:900, color:"rgba(255,255,255,0.1)", lineHeight:1 }}>{s.rank}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CLOSING */}
          <div style={{ marginTop:"clamp(36px,6vw,64px)", border:"1.5px solid var(--ink)", background:"var(--ink)", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#9D174D,var(--accent),#F472B6,#FB7185,#F472B6,var(--accent))" }} />
            <div className="imgf" style={{ height:190 }}>
              <img src={IMGS.banner} alt="India D2C ecosystem" style={{ filter:"sepia(30%) brightness(0.35) contrast(1.1)" }} />
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 clamp(20px,5vw,60px)", textAlign:"center" }}>
                <p className="pf" style={{ fontSize:"clamp(1.2rem,2.8vw,2rem)", fontWeight:700, color:"white", lineHeight:1.25, fontStyle:"italic" }}>
                  "The best Indian D2C brands are not copies of Western brands.{" "}
                  <em style={{ color:"#F9A8D4" }}>They are built for Indian skin, Indian taste, Indian wallets — and Indian pride.</em>"
                </p>
              </div>
            </div>
            <div style={{ padding:"clamp(20px,3vw,36px)" }}>
              <p className="rp" style={{ fontSize:13.5, color:"rgba(255,255,255,.7)", lineHeight:1.85, maxWidth:720 }}>
                UpForge tracks every significant D2C brand in India — from seed-stage challenger brands to listed consumer companies. Explore founder stories, revenue milestones, and the brand-building principles that separate India's best consumer companies from the rest.
              </p>
            </div>
          </div>

          {/* FOOTER NAV */}
          <nav aria-label="Page navigation" style={{ padding:"16px 0", borderTop:"2px solid var(--ink)", marginTop:"clamp(32px,5vw,52px)" }}>
            <ul style={{ display:"flex", flexWrap:"wrap", gap:"8px 20px", listStyle:"none", margin:0, padding:0 }}>
              {[
                { l:"Top AI Startups",    h:"/top-ai-startups"    },
                { l:"Best SaaS Startups", h:"/best-saas-startups" },
                { l:"EdTech Startups",    h:"/edtech-startups"    },
                { l:"FinTech Startups",   h:"/fintech-startups"   },
                { l:"Indian Unicorns",    h:"/indian-unicorns"    },
                { l:"All Startups",       h:"/startup"            },
              ].map(lnk=>(
                <li key={lnk.h}><Link href={lnk.h} className="sf" style={{ fontSize:8.5, color:"var(--ink5)", textTransform:"uppercase", letterSpacing:"0.14em", textDecoration:"none" }}>{lnk.l}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
    </>
  );
}
