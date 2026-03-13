// app/blog/how-to-get-startup-funding-india-2026/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Get Startup Funding in India 2026: The Complete Guide | UpForge Blog",
  description:
    "A step-by-step guide to raising startup funding in India in 2026 — from angel rounds and seed funding to Series A and beyond. Learn the stages, investors, pitch strategies, and common mistakes that founders make.",
  keywords: [
    "how to get startup funding india 2026",
    "startup funding india guide",
    "how to raise seed funding india",
    "angel investors india 2026",
    "venture capital india startup",
    "startup pitch deck india",
    "series a funding india",
    "indian startup investor list",
    "how to approach vc india",
    "startup funding stages india",
  ].join(", "),
  alternates: { canonical: "https://upforge.in/blog/how-to-get-startup-funding-india-2026" },
  openGraph: {
    title: "How to Get Startup Funding in India 2026: The Complete Guide",
    description: "From your first angel cheque to Series A — a practical, no-fluff guide to raising startup capital in India in 2026.",
    url: "https://upforge.in/blog/how-to-get-startup-funding-india-2026",
    siteName: "UpForge",
    images: [{ url: "https://upforge.in/og-blog-funding.png", width: 1200, height: 630 }],
    locale: "en_IN", type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Get Startup Funding in India 2026 | UpForge",
    description: "Angel to Series A — a practical guide to raising startup capital in India. What investors want, how to pitch, and what founders get wrong.",
  },
};

const IMGS = {
  hero:     "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=85&auto=format",
  angel:    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80&auto=format",
  seed:     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format",
  seriesA:  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&auto=format",
  pitch:    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=80&auto=format",
  mistakes: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=900&q=80&auto=format",
  govt:     "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=900&q=80&auto=format",
  closing:  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80&auto=format",
};

const STEPS = [
  {
    num: "01",
    title: "Understand the Funding Stages",
    keyword: "Startup Funding Stages India",
    img: IMGS.angel,
    body: `Before approaching any investor, you need to understand which stage of funding is appropriate for where your company actually is — not where you hope it will be.

Pre-seed (₹25L–₹1Cr) is for idea validation and building an MVP. Seed (₹1Cr–₹5Cr) is for proving product-market fit with early paying customers. Series A (₹15Cr–₹100Cr) is for scaling a model that demonstrably works. Series B and beyond is for accelerating growth you have already validated.

The most common mistake Indian founders make is raising the wrong stage for their maturity — either approaching VCs with a pre-revenue idea, or under-raising at seed when they need more capital to reach a meaningful Series A milestone. Know your stage. Raise for that stage. Do not let ambition or impatience move you up the funding stack prematurely.`,
    tip: {
      label: "Funding Stage Quick Reference",
      items: [
        { stage: "Pre-Seed", range: "₹25L–₹1Cr",   from: "Friends, family, accelerators, angels" },
        { stage: "Seed",     range: "₹1Cr–₹5Cr",   from: "Angel networks, micro-VCs, incubators" },
        { stage: "Series A", range: "₹15Cr–₹100Cr", from: "Institutional VCs (Sequoia, Accel, etc)" },
        { stage: "Series B+",range: "₹100Cr+",      from: "Growth VCs, PE, strategic investors" },
      ],
    },
    insight: "The stage you are at is determined by your traction, not your ambition. Investors know the difference immediately.",
  },
  {
    num: "02",
    title: "Build Traction Before Approaching Investors",
    keyword: "How to Raise Seed Funding India",
    img: IMGS.seed,
    body: `The single most effective way to raise funding in India is to not need it. Every investor — from a Mumbai angel to a Bengaluru VC — responds to the same signal: a founder who has already demonstrated something real with little or no capital.

Revenue is the clearest signal. But for pre-revenue companies, traction can mean daily active users, a letter of intent from a credible enterprise customer, a waitlist of 5,000 people, or even a product demo that causes every person who sees it to say "I would pay for this."

The founders who raise seed rounds quickly in India are not the ones with the best pitch decks. They are the ones who built something real before asking for money — and then used the fundraise to accelerate something already working. Build first. Pitch second.`,
    tip: null,
    insight: "The best way to get a term sheet is to not need one. Traction is the most persuasive pitch deck ever written.",
  },
  {
    num: "03",
    title: "Build Your Investor Target List",
    keyword: "Angel Investors India 2026",
    img: IMGS.pitch,
    body: `Fundraising in India is a relationship business. Cold emails to VCs convert at less than 1%. Warm introductions convert at 20–40%. The most important strategic decision in your fundraise is not your valuation — it is how you build your way to the investors most likely to fund companies like yours.

Start with angels who have invested in your sector before. In India, key angel networks include Indian Angel Network (IAN), Mumbai Angels, Lead Angels, and Ah! Ventures. For seed and pre-Series A, look at micro-VCs: Titan Capital, Gemba Capital, Antler India, 100x.vc, and Better Capital.

For Series A and beyond, the Indian VC landscape is dominated by Sequoia (Peak XV), Accel India, Matrix Partners India, Elevation Capital, Kalaari, Lightspeed India, and Nexus Venture Partners. Each of these funds has sector preferences, check size norms, and partner-specific thesis areas. Research before reaching out. A warm intro from a portfolio founder is worth ten cold emails to the managing partner.`,
    tip: null,
    insight: "Research the portfolio of every investor you approach. If they have never invested in your sector, they are unlikely to start with you.",
  },
  {
    num: "04",
    title: "Build a Pitch Deck That Actually Works",
    keyword: "Startup Pitch Deck India",
    img: IMGS.seriesA,
    body: `Indian investors see hundreds of pitch decks every month. The ones that get a meeting are not the most beautifully designed — they are the ones that answer the five questions every investor is asking before they even open the deck.

Those five questions are: What is the problem and why does it matter? What is your solution and why is it better? How big is the market? Why are you the right team to win this? And what specifically will you do with this money?

A strong Indian startup pitch deck for seed stage is 10–14 slides: Problem, Solution, Market Size (TAM/SAM/SOM), Traction & Metrics, Business Model, Competitive Landscape, Team, Use of Funds, and Ask. The traction slide is the one that will be scrutinised most carefully — make it honest, specific, and recent. Investors in India have seen enough optimistic projections. Real numbers from the last 90 days are worth more than 5-year projections.`,
    tip: null,
    insight: "Your traction slide is the most important slide in the deck. Make it undeniable.",
  },
  {
    num: "05",
    title: "Government Funding: DPIIT, SIDBI & Grants",
    keyword: "Government Startup Funding India DPIIT",
    img: IMGS.govt,
    body: `India's government has created a significant non-dilutive funding infrastructure for early-stage startups that many founders underutilise.

DPIIT recognition is the entry point. Once recognised, startups become eligible for the ₹10,000Cr Fund of Funds operated by SIDBI — which deploys capital through registered AIFs (Alternative Investment Funds) into DPIIT-recognised companies. This is not a grant; it is equity funding through registered VCs, but the government backstops risk.

Beyond SIDBI, BIRAC (Biotechnology Industry Research Assistance Council) funds HealthTech and biotech startups up to ₹50L through its BIRAC BIG scheme. MEITY's Software Technology Parks offer grants and infrastructure to SaaS and technology startups. State governments — particularly Karnataka, Telangana, Tamil Nadu, and Maharashtra — run their own startup grant schemes with allocations between ₹10L–₹50L per company.

This non-dilutive capital does not replace VC funding. But for early-stage founders who want to retain more equity while reaching their seed round milestone, it is worth the application effort.`,
    tip: {
      label: "Government Funding Sources — Quick Reference",
      items: [
        { stage: "DPIIT Recognition", range: "Free",         from: "Tax benefits, Fund of Funds eligibility" },
        { stage: "SIDBI FFS",         range: "Via AIFs",     from: "VC-deployed, government de-risked" },
        { stage: "BIRAC BIG",         range: "Up to ₹50L",  from: "HealthTech, biotech founders" },
        { stage: "State Schemes",     range: "₹10L–₹50L",   from: "Karnataka, Telangana, Tamil Nadu, MH" },
      ],
    },
    insight: "Non-dilutive capital is the most founder-friendly capital. Use government schemes before you dilute your equity.",
  },
  {
    num: "06",
    title: "5 Mistakes That Kill Indian Startup Fundraises",
    keyword: "Startup Funding Mistakes India",
    img: IMGS.mistakes,
    body: `After analysing hundreds of Indian startup fundraise attempts, five mistakes appear with damaging frequency.

First: raising too early. Investors fund traction, not ideas. An MVP with 10 paying customers is infinitely more fundable than a beautifully presented idea. Second: targeting the wrong investors. A consumer brand founder approaching an enterprise SaaS VC is wasting both parties' time. Research matters.

Third: over-valuing at seed. Inflated seed valuations create series A bridging problems that can kill otherwise excellent companies. Take what you need to reach the next milestone, not what your ego suggests you deserve. Fourth: ignoring the warm intro requirement. The Indian VC ecosystem is relationship-driven. A cold email to a partner gets filtered out. A referral from a portfolio founder gets a meeting.

Fifth — and most fatally: raising instead of building. The founders who raise quickly are almost always the ones who did not need to raise. Build the product. Get the customer. Then raise the money.`,
    tip: null,
    insight: "The fastest way to get a term sheet in India is to look like you don't need one.",
  },
];

const RELATED = [
  { name: "India Startup Ecosystem 2026", slug: "/blog/india-startup-ecosystem-2026",          sector: "Ecosystem" },
  { name: "Indian Unicorns 2026",         slug: "/indian-unicorns",                             sector: "Rankings"  },
  { name: "Top Indian Founders 2026",     slug: "/blog/best-indian-startup-founders-to-follow-2026", sector: "People" },
  { name: "FinTech Startups India",       slug: "/fintech-startups",                            sector: "FinTech"   },
];

export default function BlogFunding() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');
        .pf{font-family:'Playfair Display',Georgia,serif!important}
        .rp{font-family:'Georgia','Times New Roman',serif}
        .sf{font-family:system-ui,-apple-system,sans-serif}
        :root{
          --parch:#F5F1E8;--parch2:#EDE9DF;--ink:#1A1208;--ink3:#5A4A30;
          --ink4:#8C7D65;--ink5:#BBB0A0;--rule:#C8C2B4;--rule2:#D8D2C4;
          --gold:#B45309;--gold2:#D97706;--gold3:#92400E;--white:#FDFCF9;
          --blue:#1D4ED8;--bluelt:#EFF6FF;
        }
        body{background:var(--parch)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .a0{animation:fadeUp .44s .00s cubic-bezier(.16,1,.3,1) both}
        .a1{animation:fadeUp .44s .08s cubic-bezier(.16,1,.3,1) both}
        .imgf{position:relative;overflow:hidden}
        .imgf img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;filter:sepia(14%) contrast(108%);transition:transform .6s ease}
        .imgf:hover img{transform:scale(1.03)}
        .lesson-card{border:1.5px solid var(--ink);background:var(--white);overflow:hidden;position:relative}
        .lesson-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--blue),#3B82F6,#93C5FD)}
        .tip-table{background:var(--parch2);border:1px solid var(--rule);padding:14px;margin:14px 0}
        .insight{display:inline-flex;align-items:center;gap:8px;background:var(--bluelt);border:1px solid rgba(29,78,216,.25);padding:9px 14px;width:100%}
        .sh{display:flex;align-items:center;gap:10px}
        .sh-l{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.28em;color:var(--ink5);font-family:system-ui;white-space:nowrap}
        .sh-r{flex:1;height:1px;background:var(--rule2)}
        .rel-card{display:flex;flex-direction:column;background:var(--white);text-decoration:none;transition:transform .15s,box-shadow .15s;position:relative}
        .rel-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2.5px;background:transparent;transition:background .15s}
        .rel-card:hover{transform:translate(-2px,-2px);box-shadow:4px 4px 0 var(--ink);z-index:1}
        .rel-card:hover::before{background:#3B82F6}
        .dropcap::first-letter{font-family:'Playfair Display',Georgia,serif;font-size:3.8em;font-weight:900;float:left;line-height:.82;margin-right:8px;margin-top:6px;color:var(--ink)}
        @media(max-width:900px){.lesson-two{grid-template-columns:1fr!important}}
      `}</style>

      <article itemScope itemType="https://schema.org/Article" style={{ minHeight:"100vh", background:"var(--parch)" }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context":"https://schema.org","@type":"Article",
          headline:"How to Get Startup Funding in India 2026: The Complete Guide",
          description:"A step-by-step guide to raising startup funding in India in 2026 — angel rounds, seed, Series A, pitch strategy, and the five mistakes that kill Indian startup fundraises.",
          author:{"@type":"Organization","name":"UpForge"},
          publisher:{"@type":"Organization","name":"UpForge","url":"https://upforge.in"},
          datePublished:new Date().toISOString().split("T")[0],
          url:"https://upforge.in/blog/how-to-get-startup-funding-india-2026",
          keywords:"how to get startup funding india 2026, angel investors india, venture capital india, startup pitch deck india",
        })}} />

        {/* BREADCRUMB */}
        <nav className="sf a0" style={{ background:"var(--parch2)", borderBottom:"1px solid var(--rule2)", padding:"8px 0" }}>
          <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 clamp(16px,3vw,36px)" }}>
            <ol style={{ display:"flex", alignItems:"center", gap:6, fontSize:9, color:"var(--ink5)", textTransform:"uppercase", letterSpacing:"0.18em", listStyle:"none", margin:0, padding:0 }}>
              <li><Link href="/" style={{ color:"var(--ink5)", textDecoration:"none" }}>UpForge</Link></li>
              <li style={{ color:"var(--rule)" }}>/</li>
              <li><Link href="/blog" style={{ color:"var(--ink5)", textDecoration:"none" }}>Blog</Link></li>
              <li style={{ color:"var(--rule)" }}>/</li>
              <li style={{ color:"var(--ink4)", fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:220 }}>Startup Funding Guide 2026</li>
            </ol>
          </div>
        </nav>

        {/* HERO */}
        <div className="a0" style={{ borderBottom:"3px solid var(--ink)" }}>
          <div className="imgf" style={{ height:"clamp(280px,38vw,480px)" }}>
            <img src={IMGS.hero} alt="How to Get Startup Funding India 2026" />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(10,20,50,.4) 0%,rgba(10,20,50,.88) 100%)" }} />
            <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 clamp(16px,5vw,64px)", textAlign:"center" }}>
              <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap", justifyContent:"center" }}>
                {["Fundraising","Angel to Series A","India 2026"].map(t=>(
                  <span key={t} className="sf" style={{ fontSize:8, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.65)", border:"1px solid rgba(255,255,255,0.2)", padding:"3px 10px" }}>{t}</span>
                ))}
              </div>
              <h1 className="pf" itemProp="headline" style={{ fontSize:"clamp(1.8rem,5.5vw,4.2rem)", fontWeight:900, lineHeight:1.02, color:"white", letterSpacing:"-0.02em", marginBottom:18, maxWidth:860 }}>
                How to Get Startup Funding in India 2026:{" "}
                <em style={{ color:"#93C5FD", fontStyle:"italic" }}>The Complete Founder's Guide</em>
              </h1>
              <p className="rp" style={{ fontSize:"clamp(13px,1.8vw,16px)", color:"rgba(255,255,255,0.62)", fontStyle:"italic", maxWidth:560, lineHeight:1.6 }}>
                From your first ₹25L angel cheque to a ₹100Cr Series A — a practical, no-fluff guide to raising capital in India.
              </p>
            </div>
            <div className="sf" style={{ position:"absolute", top:18, right:18, background:"rgba(10,20,50,.7)", border:"1px solid rgba(255,255,255,.1)", padding:"5px 12px", fontSize:8, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,.55)" }}>
              UpForge · Blog
            </div>
          </div>
          <div style={{ background:"var(--ink)" }}>
            <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 clamp(16px,3vw,36px)" }}>
              <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center" }}>
                {[
                  { l:"Published", v:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}) },
                  { l:"Reading Time", v:"~9 min" },
                  { l:"Category", v:"Fundraising · Strategy" },
                  { l:"For", v:"Early-Stage Indian Founders" },
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

        {/* MAIN */}
        <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 clamp(16px,3vw,36px) clamp(48px,8vw,96px)" }}>

          {/* INTRO + TOC */}
          <div className="a1" style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:0, borderBottom:"1px solid var(--rule2)", alignItems:"start" }}>
            <div style={{ padding:"clamp(28px,4vw,48px) clamp(16px,3vw,40px) clamp(28px,4vw,48px) 0", borderRight:"1px solid var(--rule2)" }}>
              <div className="sh" style={{ marginBottom:18 }}><span className="sh-l">Introduction</span><div className="sh-r" /></div>
              <p className="pf" itemProp="description" style={{ fontSize:"clamp(1.05rem,2.2vw,1.35rem)", fontWeight:400, lineHeight:1.72, color:"var(--ink)", marginBottom:18 }}>
                Raising startup funding in India in 2026 is simultaneously easier and harder than it has ever been. Easier — because the ecosystem is deeper, the investors are more numerous, and the playbooks are more documented. Harder — because the bar for what constitutes "fundable traction" has risen sharply after the 2021–2022 correction.
              </p>
              <p className="rp" style={{ fontSize:13.5, color:"var(--ink3)", lineHeight:1.85 }}>
                This guide covers everything an Indian founder needs to know about raising capital in 2026 — from the first angel cheque to Series A institutional funding. No fluff. No motivational content. Just the practical knowledge that determines whether your fundraise succeeds.
              </p>
            </div>
            <div style={{ padding:"clamp(24px,3vw,40px) 0 clamp(24px,3vw,40px) clamp(16px,3vw,32px)", minWidth:"clamp(200px,26vw,280px)" }}>
              <div className="sh" style={{ marginBottom:14 }}><span className="sh-l">In This Guide</span><div className="sh-r" /></div>
              {STEPS.map((s,i)=>(
                <a key={i} href={`#step-${s.num}`} style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:9, textDecoration:"none" }}>
                  <span className="sf" style={{ fontSize:8, fontWeight:700, color:"#3B82F6", flexShrink:0, minWidth:18 }}>{s.num}</span>
                  <span className="rp" style={{ fontSize:11.5, color:"var(--ink4)", lineHeight:1.4 }}>{s.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* STEPS */}
          <div style={{ marginTop:"clamp(32px,5vw,56px)" }}>
            {STEPS.map((step,idx)=>(
              <div key={idx} id={`step-${step.num}`} className="lesson-card" style={{ marginBottom:20 }}>
                <div className="lesson-two" style={{ display:"grid", gridTemplateColumns:idx%2===0?"1fr 340px":"340px 1fr", gap:0, minHeight:340 }}>
                  {idx%2!==0&&(
                    <div className="imgf" style={{ borderRight:"1.5px solid var(--ink)", minHeight:300 }}>
                      <img src={step.img} alt={step.title} />
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(10,20,50,.6) 0%,transparent 60%)" }} />
                      <div style={{ position:"absolute", bottom:20, left:20 }}>
                        <span className="pf" style={{ fontSize:"4rem", fontWeight:900, color:"rgba(255,255,255,0.12)", lineHeight:1 }}>{step.num}</span>
                      </div>
                    </div>
                  )}

                  <div style={{ padding:"clamp(20px,3vw,36px)", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                        <span className="sf" style={{ fontSize:9, fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase", color:"#3B82F6" }}>Step {step.num}</span>
                        <div style={{ flex:1, height:1, background:"var(--rule2)" }} />
                        <span className="sf" style={{ fontSize:8, color:"var(--ink5)", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" }}>{step.keyword}</span>
                      </div>
                      <h2 className="pf" style={{ fontSize:"clamp(1.2rem,2.5vw,1.75rem)", fontWeight:700, color:"var(--ink)", lineHeight:1.15, marginBottom:18 }}>{step.title}</h2>
                      {step.body.split("\n\n").map((para,pi)=>(
                        <p key={pi} className={`rp${pi===0?" dropcap":""}`} style={{ fontSize:13.5, color:"var(--ink3)", lineHeight:1.88, marginBottom:14 }}>{para}</p>
                      ))}
                      {step.tip&&(
                        <div className="tip-table">
                          <p className="sf" style={{ fontSize:8, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.18em", color:"var(--ink5)", marginBottom:10 }}>{step.tip.label}</p>
                          {step.tip.items.map((item,i)=>(
                            <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 2fr", gap:8, padding:"6px 0", borderBottom:`1px solid ${i<step.tip.items.length-1?"var(--rule2)":"transparent"}` }}>
                              <span className="sf" style={{ fontSize:10, fontWeight:800, color:"var(--ink)" }}>{item.stage}</span>
                              <span className="sf" style={{ fontSize:10, color:"#3B82F6", fontWeight:700 }}>{item.range}</span>
                              <span className="rp" style={{ fontSize:10.5, color:"var(--ink4)", fontStyle:"italic" }}>{item.from}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="insight" style={{ marginTop:16 }}>
                      <div style={{ width:3, height:3, borderRadius:"50%", background:"#3B82F6", flexShrink:0 }} />
                      <p className="rp" style={{ fontSize:12, color:"var(--blue)", fontStyle:"italic", lineHeight:1.6 }}>{step.insight}</p>
                    </div>
                  </div>

                  {idx%2===0&&(
                    <div className="imgf" style={{ borderLeft:"1.5px solid var(--ink)", minHeight:300 }}>
                      <img src={step.img} alt={step.title} />
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to left,rgba(10,20,50,.6) 0%,transparent 60%)" }} />
                      <div style={{ position:"absolute", bottom:20, right:20, textAlign:"right" }}>
                        <span className="pf" style={{ fontSize:"4rem", fontWeight:900, color:"rgba(255,255,255,0.12)", lineHeight:1 }}>{step.num}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CLOSING */}
          <div style={{ marginTop:"clamp(36px,6vw,64px)", border:"1.5px solid var(--ink)", background:"var(--ink)", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#1D4ED8,#3B82F6,#93C5FD,#3B82F6,#1D4ED8)" }} />
            <div className="imgf" style={{ height:190 }}>
              <img src={IMGS.closing} alt="India startup funding" style={{ filter:"sepia(30%) brightness(0.32) contrast(1.1)" }} />
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 clamp(20px,5vw,60px)", textAlign:"center" }}>
                <p className="pf" style={{ fontSize:"clamp(1.3rem,3vw,2.2rem)", fontWeight:700, color:"white", lineHeight:1.22, fontStyle:"italic" }}>
                  "The best pitch deck is a business that clearly works.{" "}
                  <em style={{ color:"#93C5FD" }}>Build that first. Write the deck second.</em>"
                </p>
              </div>
            </div>
            <div style={{ padding:"clamp(24px,4vw,40px)" }}>
              <p className="rp" style={{ fontSize:14, color:"rgba(255,255,255,.75)", lineHeight:1.88, maxWidth:760 }}>
                India's venture capital ecosystem deployed ₹14B+ in 2024 and is accelerating in 2025–26 led by AI, D2C, and FinTech. The capital is there. The investors are active. The companies that raise are the ones that have done the work — building real products, finding real customers, and then going to market with numbers that make the story obvious.
              </p>
            </div>
          </div>

          {/* RELATED */}
          <div style={{ marginTop:"clamp(44px,6vw,72px)" }}>
            <div className="sh" style={{ marginBottom:16 }}><span className="sh-l">Related Reading on UpForge</span><div className="sh-r" /></div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", border:"1.5px solid var(--ink)", background:"var(--ink)", gap:1.5 }}>
              {RELATED.map((r,i)=>(
                <Link key={i} href={r.slug} className="rel-card">
                  <div style={{ height:80, background:["#E8E0D0","#E0D8CC","#D8D0C4","#D0C8BC"][i], display:"flex", alignItems:"center", justifyContent:"center", borderBottom:"1px solid var(--rule2)" }}>
                    <span className="pf" style={{ fontSize:"2.8rem", fontWeight:900, color:"rgba(26,18,8,0.1)" }}>{r.name.charAt(0)}</span>
                  </div>
                  <div style={{ padding:"13px 14px 12px" }}>
                    <h3 className="pf" style={{ fontSize:"0.9rem", fontWeight:700, color:"var(--ink)", marginBottom:4, lineHeight:1.2 }}>{r.name}</h3>
                    <span className="sf" style={{ fontSize:8, color:"var(--ink5)", textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:700 }}>{r.sector}</span>
                    <div style={{ marginTop:8 }}><span className="sf" style={{ fontSize:8.5, color:"#3B82F6", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em" }}>Read →</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <nav aria-label="Blog navigation" style={{ padding:"16px 0", borderTop:"2px solid var(--ink)", marginTop:"clamp(32px,5vw,52px)" }}>
            <ul style={{ display:"flex", flexWrap:"wrap", gap:"8px 20px", listStyle:"none", margin:0, padding:0 }}>
              {[
                { l:"Indian Startups",      h:"/indian-startups"   },
                { l:"Indian Unicorns 2026", h:"/indian-unicorns"   },
                { l:"FinTech Startups",     h:"/fintech-startups"  },
                { l:"Top AI Startups",      h:"/top-ai-startups"   },
                { l:"Submit Startup",       h:"/submit"            },
                { l:"Back to Blog",         h:"/blog"              },
              ].map(lnk=>(
                <li key={lnk.h}><Link href={lnk.h} className="sf" style={{ fontSize:8.5, color:"var(--ink5)", textTransform:"uppercase", letterSpacing:"0.14em", textDecoration:"none" }}>{lnk.l}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </article>
    </>
  );
}
