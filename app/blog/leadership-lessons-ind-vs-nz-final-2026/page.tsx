// app/blog/leadership-lessons-ind-vs-nz-final-2026/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IND vs NZ Final 2026: 7 Leadership Lessons Every Startup Founder Must Learn | UpForge",
  description: "The IND vs NZ Final 2026 was more than just cricket. Discover 7 powerful leadership and startup lessons founders can learn from the high-pressure final match.",
  keywords: [
    "leadership lessons from ind vs nz final 2026",
    "startup lessons from cricket final",
    "ind vs nz final business lessons",
    "what founders can learn from cricket",
    "ind vs nz final analysis 2026",
    "decision making under pressure cricket",
  ].join(", "),
  alternates: { canonical: "https://upforge.in/blog/leadership-lessons-ind-vs-nz-final-2026" },
  openGraph: {
    title: "IND vs NZ Final 2026: 7 Leadership Lessons Every Startup Founder Must Learn",
    description: "The IND vs NZ Final 2026 was more than just cricket. Discover 7 powerful leadership and startup lessons founders can learn from the high-pressure final match.",
    url: "https://upforge.in/blog/leadership-lessons-ind-vs-nz-final-2026",
    siteName: "UpForge",
    images: [{ url: "https://upforge.in/og-blog-cricket.png", width: 1200, height: 630 }],
    locale: "en_IN", type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "IND vs NZ Final 2026: 7 Leadership Lessons Every Startup Founder Must Learn",
    description: "7 powerful startup lessons from the IND vs NZ Final 2026 — calm decisions, team strategy, adaptability under pressure.",
  },
};

// Curated Unsplash images
const IMGS = {
  hero:        "data:image/jpeg;base64,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",
  pressure:    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80&auto=format",
  team:        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format",
  strategy:    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80&auto=format",
  adapt:       "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80&auto=format",
  leadership:  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80&auto=format",
  resilience:  "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=900&q=80&auto=format",
  execution:   "data:image/jpeg;base64,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",
};

const LESSONS = [
  {
    num: "01",
    title: "Calm Decision Making Under Pressure",
    keyword: "Decision Making Under Pressure",
    img: IMGS.pressure,
    body: `In a high-pressure final, captains must make decisions within seconds — who bowls the death overs, when to review a dismissal, whether to attack or defend with 10 runs needed off 12 balls. There is no time to overthink. The mind must be clear, the instincts sharp, and the ego silent.

Startup founders face the same crucible. When a key engineer resigns three weeks before launch, when a competitor raises ₹100Cr out of nowhere, when a product you shipped quietly starts bleeding users — the quality of your decision in that moment defines the trajectory of your company.`,
    founder: {
      name: "Nithin Kamath",
      company: "Zerodha",
      quote: "Nithin Kamath built Zerodha into India's largest stockbroker by making calm, contrarian decisions during volatile market conditions — choosing to stay bootstrapped when every investor said raise, choosing to be transparent when peers were opaque.",
      link: "/startup/zerodha",
      linkText: "See how Nithin Kamath built Zerodha →",
    },
    insight: "Pressure is not an obstacle. It is the filter that separates good founders from great ones.",
  },
  {
    num: "02",
    title: "Team Wins Championships",
    keyword: "Team Strategy",
    img: IMGS.team,
    body: `No cricket team wins a final with one star player. Kohli can score a century but if the middle order collapses, the innings ends. Bumrah can bowl a perfect spell but if the fielders drop catches, the match is lost. Championships are collective. They are won in practice sessions at 6am, in quiet conversations in the dressing room, in the unglamorous contributions of the number seven batsman.

Startups are no different. Founders who try to be the only star rarely build lasting companies. The ones who build great teams — and then trust those teams — build the ones that last.`,
    founder: {
      name: "Alakh Pandey",
      company: "PhysicsWallah",
      quote: "PhysicsWallah grew into a unicorn because Alakh Pandey built a strong educator and operations team around his content vision. He was the anchor, but the team was the innings.",
      link: "/startup/physicswallah",
      linkText: "Read the story of PhysicsWallah founder Alakh Pandey →",
    },
    insight: "The founder is the captain. But the team wins or loses the match.",
  },
  {
    num: "03",
    title: "Strategy Beats Raw Talent",
    keyword: "Startup Lessons from Cricket Final",
    img: IMGS.strategy,
    body: `New Zealand rarely has the most talented squad in world cricket. But they consistently punch above their weight — because they play as a unit with a clear, disciplined strategy. They study opponents. They identify weaknesses. They execute with ruthless consistency.

Many funded Indian startups have burned crores chasing talent — expensive engineers, star executives, premium offices — only to collapse because their strategy was unclear. A well-structured startup with a lean, aligned team will outlast a talent-heavy one with no coherent direction every single time.`,
    founder: null,
    insight: "Strategy is your field placement. Talent is your pace. You need both — but strategy sets the field first.",
  },
  {
    num: "04",
    title: "Adaptability Wins the Game",
    keyword: "India vs New Zealand Final 2026",
    img: IMGS.adapt,
    body: `Pitch conditions change. A surface that was playing low in the morning becomes a run-fest by afternoon. A team that cannot adapt its game plan to changing conditions — even mid-innings — loses. The best teams in world cricket hold their strategy loosely enough to abandon it when reality demands something different.

The market is your pitch. Consumer behaviour, regulatory environment, competitor moves, macroeconomic conditions — all of these change, often without warning. The founders who treat their initial business plan as sacred are the ones who get eliminated in the group stage.`,
    founder: {
      name: "Palicha & Vohra",
      company: "Zepto",
      quote: "Aadit Palicha and Kaivalya Vohra pivoted from a university carpooling app to 10-minute grocery delivery in a matter of weeks when they saw what the pandemic had done to consumer habits. That one adaptation turned into a multi-billion dollar company.",
      link: "/startup/zepto",
      linkText: "Read Zepto's story on UpForge →",
    },
    insight: "The plan you started with is not the plan you finish with. And that's exactly as it should be.",
  },
  {
    num: "05",
    title: "Leadership Creates Momentum",
    keyword: "Leadership Lessons from IND vs NZ Final 2026",
    img: IMGS.leadership,
    body: `A great captain does not just set fields and make bowling changes. They manage the energy of eleven human beings under enormous pressure. They know who needs a word of encouragement, who needs to be left alone, who needs to be pulled off the field before they lose confidence. Leadership in cricket is fundamentally emotional intelligence applied under competitive pressure.

The same is true in startups. When a company is going through a difficult quarter — delayed product, missed targets, team conflict — the founder's demeanour sets the ceiling for how the team responds. Panic at the top creates panic everywhere. Calm at the top creates resilience everywhere.`,
    founder: {
      name: "Deepinder Goyal",
      company: "Zomato",
      quote: "Deepinder Goyal led Zomato through near-bankruptcy, a failed acquisition, multiple pivots, and a public listing that initially disappointed markets — and kept building. That stubborn, calm leadership is why Zomato is still standing while most of its early competitors are not.",
      link: "/startup/zomato",
      linkText: "Read Zomato's founder story on UpForge →",
    },
    insight: "Momentum is manufactured. Great leaders manufacture it every single day.",
  },
  {
    num: "06",
    title: "Process Over Brilliance",
    keyword: "What Founders Can Learn from Cricket",
    img: IMGS.resilience,
    body: `The IND vs NZ Final was not won on one brilliant shot or one unplayable delivery. It was won through hundreds of small, correct decisions compounded over five hours. Running hard between wickets. Communicating clearly. Maintaining field intensity in the 30th over as in the first. Cricket at the highest level is primarily a game of process discipline, not sporadic brilliance.

India's best startups — Zerodha, CRED, Zepto — are not built on one brilliant product idea alone. They are built on repeatable processes: how they hire, how they ship product, how they talk to customers, how they make decisions. The boring infrastructure of excellence.`,
    founder: null,
    insight: "Brilliant ideas open doors. Reliable process is what you build once you're inside.",
  },
  {
    num: "07",
    title: "Resilience is the Only Unfair Advantage",
    keyword: "IND vs NZ Final Business Lessons",
    img: IMGS.execution,
    body: `Cricket finals are long. They are exhausting. There are moments — often multiple moments — when a team looks beaten. When the required run rate crosses 12, when a wicket falls at the worst possible time, when the opposition gets three boundaries in a row. The teams that win finals are the ones that do not let those moments end the innings early.

Every startup goes through its version of a collapse. Product fails. Key hires leave. Funding falls through. The market moves in the wrong direction. Resilience — the stubborn refusal to let those moments become the final score — is the only advantage that cannot be copied, cannot be funded into existence, cannot be faked.`,
    founder: {
      name: "Ritesh Agarwal",
      company: "OYO",
      quote: "Ritesh Agarwal started OYO at 17, dropped out of college, was rejected by dozens of investors, and built India's largest hospitality brand. The resilience required to keep building through that kind of adversity is what makes the story worth reading.",
      link: "/startup/oyo",
      linkText: "Read OYO's founder story on UpForge →",
    },
    insight: "You cannot buy resilience. You can only earn it — one difficult day at a time.",
  },
];

const RELATED = [
  { name: "Zerodha",       slug: "zerodha",        sector: "FinTech"  },
  { name: "PhysicsWallah", slug: "physicswallah",  sector: "EdTech"   },
  { name: "Zepto",         slug: "zepto",          sector: "D2C"      },
  { name: "Zomato",        slug: "zomato",         sector: "FoodTech" },
];

export default function BlogPage() {
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
          --white:  #FDFCF9;
          --green:  #15803D;
        }

        body { background: var(--parch); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a0 { animation: fadeUp .44s .00s cubic-bezier(.16,1,.3,1) both; }
        .a1 { animation: fadeUp .44s .08s cubic-bezier(.16,1,.3,1) both; }
        .a2 { animation: fadeUp .44s .16s cubic-bezier(.16,1,.3,1) both; }
        .a3 { animation: fadeUp .44s .24s cubic-bezier(.16,1,.3,1) both; }

        /* image frame */
        .imgf { position: relative; overflow: hidden; }
        .imgf img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          filter: sepia(14%) contrast(108%);
          transition: transform .6s ease;
        }
        .imgf:hover img { transform: scale(1.03); }

        /* lesson card */
        .lesson-card {
          border: 1.5px solid var(--ink);
          background: var(--white);
          overflow: hidden;
          position: relative;
        }
        .lesson-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold3), var(--gold2), #E8C547);
        }

        /* quote block */
        .qblock {
          background: var(--ink);
          border-left: 4px solid var(--gold2);
          padding: 18px 20px;
          position: relative;
        }

        /* insight pill */
        .insight {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--goldlt, #FEF3C7);
          border: 1px solid rgba(180,83,9,.25);
          padding: 9px 14px;
          width: 100%;
        }

        /* section rule */
        .sh { display: flex; align-items: center; gap: 10px; }
        .sh-l { font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: .28em; color: var(--ink5); font-family: system-ui; white-space: nowrap; }
        .sh-r { flex: 1; height: 1px; background: var(--rule2); }

        /* related card */
        .rel-card {
          display: flex; flex-direction: column;
          background: var(--white);
          text-decoration: none;
          border: none;
          transition: transform .15s, box-shadow .15s, background .15s;
          position: relative;
        }
        .rel-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2.5px; background: transparent; transition: background .15s;
        }
        .rel-card:hover { transform: translate(-2px,-2px); box-shadow: 4px 4px 0 var(--ink); z-index: 1; }
        .rel-card:hover::before { background: var(--gold2); }

        /* drop cap */
        .dropcap::first-letter {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 3.8em; font-weight: 900;
          float: left; line-height: .82;
          margin-right: 8px; margin-top: 6px;
          color: var(--ink);
        }

        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; }
          .lesson-two { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .lesson-two { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <article
        className="rp"
        itemScope
        itemType="https://schema.org/Article"
        style={{ minHeight: "100vh", background: "var(--parch)" }}
      >
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "IND vs NZ Final 2026: 7 Leadership Lessons Every Startup Founder Must Learn",
            "description": "The IND vs NZ Final 2026 was more than just cricket. Discover 7 powerful leadership and startup lessons founders can learn from the high-pressure final match.",
            "author": { "@type": "Organization", "name": "UpForge" },
            "publisher": { "@type": "Organization", "name": "UpForge", "url": "https://upforge.in" },
            "datePublished": new Date().toISOString().split("T")[0],
            "url": "https://upforge.in/blog/leadership-lessons-ind-vs-nz-final-2026",
            "keywords": "leadership lessons ind vs nz final 2026, startup lessons from cricket, decision making under pressure",
          })}}
        />

        {/* BREADCRUMB */}
        <nav className="sf a0" style={{ background: "var(--parch2)", borderBottom: "1px solid var(--rule2)", padding: "8px 0" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(16px,3vw,36px)" }}>
            <ol style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9, color: "var(--ink5)", textTransform: "uppercase", letterSpacing: "0.18em", listStyle: "none", margin: 0, padding: 0 }}>
              <li><Link href="/" style={{ color: "var(--ink5)", textDecoration: "none" }}>UpForge</Link></li>
              <li style={{ color: "var(--rule)" }}>/</li>
              <li><Link href="/blog" style={{ color: "var(--ink5)", textDecoration: "none" }}>Blog</Link></li>
              <li style={{ color: "var(--rule)" }}>/</li>
              <li style={{ color: "var(--ink4)", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>
                IND vs NZ Final 2026
              </li>
            </ol>
          </div>
        </nav>

        {/* ══════════════════════════════
            HERO IMAGE MASTHEAD
        ══════════════════════════════ */}
        <div className="a0" style={{ borderBottom: "3px solid var(--ink)" }}>

          {/* Full-bleed hero */}
          <div className="imgf" style={{ height: "clamp(280px,38vw,480px)" }}>
            <img src={IMGS.hero} alt="IND vs NZ Final 2026 — leadership lessons for startup founders" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,18,8,.3) 0%, rgba(26,18,8,.85) 100%)" }} />

            {/* Centered hero content */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "0 clamp(16px,5vw,64px)", textAlign: "center",
            }}>
              {/* Category tags */}
              <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap", justifyContent: "center" }}>
                {["IND vs NZ Final", "Leadership", "Startup Strategy"].map(tag => (
                  <span key={tag} className="sf" style={{
                    fontSize: 8, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.2)",
                    padding: "3px 10px",
                  }}>{tag}</span>
                ))}
              </div>

              <h1 className="pf" itemProp="headline" style={{
                fontSize: "clamp(1.8rem, 5.5vw, 4.2rem)",
                fontWeight: 900, lineHeight: 1.02,
                color: "white", letterSpacing: "-0.02em",
                marginBottom: 18, maxWidth: 820,
              }}>
                IND vs NZ Final 2026:{" "}
                <em style={{ color: "#E8C547", fontStyle: "italic" }}>7 Leadership Lessons</em>{" "}
                Every Startup Founder Must Learn
              </h1>

              <p className="rp" style={{
                fontSize: "clamp(13px,1.8vw,16px)",
                color: "rgba(255,255,255,0.62)", fontStyle: "italic",
                maxWidth: 560, lineHeight: 1.6,
              }}>
                The match was cricket. The lessons are for builders.
              </p>
            </div>

            {/* UpForge badge */}
            <div className="sf" style={{
              position: "absolute", top: 18, right: 18,
              background: "rgba(26,18,8,.7)", border: "1px solid rgba(255,255,255,.1)",
              padding: "5px 12px", fontSize: 8, fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,.55)",
            }}>
              UpForge · Intelligence
            </div>
          </div>

          {/* Meta strip */}
          <div style={{ background: "var(--ink)" }}>
            <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(16px,3vw,36px)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0 }}>
                {[
                  { l: "Published", v: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
                  { l: "Reading Time", v: "~7 min" },
                  { l: "Category", v: "Leadership · Strategy" },
                  { l: "Keywords", v: "IND vs NZ Final 2026" },
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

        {/* ══════════════════════════════
            MAIN CONTENT
        ══════════════════════════════ */}
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(16px,3vw,36px) clamp(48px,8vw,96px)" }}>

          {/* ── INTRO ── */}
          <div className="a1" style={{
            display: "grid", gridTemplateColumns: "1fr auto",
            gap: 0, borderBottom: "1px solid var(--rule2)",
            alignItems: "start",
          }}>
            <div style={{ padding: "clamp(28px,4vw,48px) clamp(16px,3vw,40px) clamp(28px,4vw,48px) 0", borderRight: "1px solid var(--rule2)" }}>
              <div className="sh" style={{ marginBottom: 18 }}>
                <span className="sh-l">Introduction</span>
                <div className="sh-r" />
              </div>
              <p className="pf" itemProp="description" style={{
                fontSize: "clamp(1.05rem,2.2vw,1.35rem)",
                fontWeight: 400, lineHeight: 1.72,
                color: "var(--ink)", marginBottom: 18,
              }}>
                The India vs New Zealand Final 2026 captured millions of searches worldwide. But beyond the cricket field, the match revealed powerful lessons about leadership, strategy, and decision-making under pressure — the same qualities required to build successful startups.
              </p>
              <p className="rp" style={{ fontSize: 13.5, color: "var(--ink3)", lineHeight: 1.85 }}>
                This is not a match report. It is a breakdown of seven principles that the finest cricketers and the finest founders share — principles that will still matter long after the scorecard is forgotten.
              </p>
            </div>

            {/* Aside: what you'll learn */}
            <div style={{ padding: "clamp(24px,3vw,40px) 0 clamp(24px,3vw,40px) clamp(16px,3vw,32px)", minWidth: "clamp(200px,26vw,280px)" }}>
              <div className="sh" style={{ marginBottom: 14 }}>
                <span className="sh-l">In This Article</span>
                <div className="sh-r" />
              </div>
              {LESSONS.map((l, i) => (
                <a key={i} href={`#lesson-${l.num}`} style={{
                  display: "flex", alignItems: "baseline", gap: 8, marginBottom: 9,
                  textDecoration: "none",
                }}>
                  <span className="sf" style={{ fontSize: 8, fontWeight: 700, color: "var(--gold2)", flexShrink: 0, minWidth: 18 }}>
                    {l.num}
                  </span>
                  <span className="rp" style={{ fontSize: 11.5, color: "var(--ink4)", lineHeight: 1.4 }}>
                    {l.title}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* ── 7 LESSONS ── */}
          <div style={{ marginTop: "clamp(32px,5vw,56px)" }}>
            {LESSONS.map((lesson, idx) => (
              <div
                key={idx}
                id={`lesson-${lesson.num}`}
                className="lesson-card"
                style={{ marginBottom: idx < LESSONS.length - 1 ? 20 : 0 }}
              >
                <div
                  className="lesson-two"
                  style={{
                    display: "grid",
                    gridTemplateColumns: idx % 2 === 0 ? "1fr 340px" : "340px 1fr",
                    gap: 0,
                    minHeight: 340,
                  }}
                >
                  {/* IMAGE — alternating sides */}
                  {idx % 2 !== 0 && (
                    <div className="imgf" style={{ borderRight: "1.5px solid var(--ink)", minHeight: 300 }}>
                      <img src={lesson.img} alt={lesson.title} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,18,8,.6) 0%, transparent 60%)" }} />
                      {/* Lesson number */}
                      <div style={{ position: "absolute", bottom: 20, left: 20 }}>
                        <span className="pf" style={{ fontSize: "4rem", fontWeight: 900, color: "rgba(255,255,255,0.12)", lineHeight: 1 }}>
                          {lesson.num}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* CONTENT */}
                  <div style={{ padding: "clamp(20px,3vw,36px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    {/* Lesson header */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <span className="sf" style={{
                          fontSize: 9, fontWeight: 800, letterSpacing: "0.2em",
                          textTransform: "uppercase", color: "var(--gold2)",
                        }}>
                          Lesson {lesson.num}
                        </span>
                        <div style={{ flex: 1, height: 1, background: "var(--rule2)" }} />
                        <span className="sf" style={{ fontSize: 8, color: "var(--ink5)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          {lesson.keyword}
                        </span>
                      </div>

                      <h2 className="pf" style={{
                        fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)",
                        fontWeight: 700, color: "var(--ink)",
                        lineHeight: 1.15, marginBottom: 18,
                      }}>
                        {lesson.title}
                      </h2>

                      {/* Body text */}
                      {lesson.body.split("\n\n").map((para, pi) => (
                        <p key={pi} className={`rp ${pi === 0 ? "dropcap" : ""}`} style={{
                          fontSize: 13.5, color: "var(--ink3)", lineHeight: 1.88,
                          marginBottom: 14,
                        }}>
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Founder quote + insight */}
                    <div style={{ marginTop: 20 }}>
                      {lesson.founder && (
                        <div className="qblock" style={{ marginBottom: 12 }}>
                          <p className="sf" style={{
                            fontSize: 8, fontWeight: 700, textTransform: "uppercase",
                            letterSpacing: "0.2em", color: "rgba(232,197,71,0.7)",
                            marginBottom: 8,
                          }}>
                            {lesson.founder.company} · {lesson.founder.name}
                          </p>
                          <p className="rp" style={{
                            fontSize: 12.5, color: "rgba(255,255,255,.75)",
                            lineHeight: 1.75, marginBottom: 12, fontStyle: "italic",
                          }}>
                            {lesson.founder.quote}
                          </p>
                          <Link href={lesson.founder.link} style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            fontSize: 9.5, fontWeight: 700, textTransform: "uppercase",
                            letterSpacing: "0.14em", color: "#E8C547",
                            textDecoration: "none", fontFamily: "system-ui",
                          }}>
                            {lesson.founder.linkText}
                          </Link>
                        </div>
                      )}

                      {/* Insight strip */}
                      <div className="insight">
                        <div style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--gold2)", flexShrink: 0 }} />
                        <p className="rp" style={{
                          fontSize: 12, color: "var(--gold3)", fontStyle: "italic", lineHeight: 1.6,
                        }}>
                          {lesson.insight}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* IMAGE — even-indexed lessons */}
                  {idx % 2 === 0 && (
                    <div className="imgf" style={{ borderLeft: "1.5px solid var(--ink)", minHeight: 300 }}>
                      <img src={lesson.img} alt={lesson.title} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(26,18,8,.6) 0%, transparent 60%)" }} />
                      <div style={{ position: "absolute", bottom: 20, right: 20, textAlign: "right" }}>
                        <span className="pf" style={{ fontSize: "4rem", fontWeight: 900, color: "rgba(255,255,255,0.12)", lineHeight: 1 }}>
                          {lesson.num}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── CLOSING STATEMENT ── */}
          <div style={{ marginTop: "clamp(36px,6vw,64px)", border: "1.5px solid var(--ink)", background: "var(--ink)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--gold3), var(--gold2), #E8C547, var(--gold2), var(--gold3))" }} />

            {/* Image background */}
            <div className="imgf" style={{ height: 200, position: "relative" }}>
              <img src={IMGS.resilience} alt="Resilience under pressure" style={{ filter: "sepia(40%) brightness(0.4) contrast(1.1)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 clamp(20px,5vw,60px)", textAlign: "center" }}>
                <p className="pf" style={{
                  fontSize: "clamp(1.3rem,3vw,2.2rem)", fontWeight: 700,
                  color: "white", lineHeight: 1.22, fontStyle: "italic",
                }}>
                  "Cricket finals and startup journeys share the same core principle: <em style={{ color: "#E8C547" }}>resilience under pressure.</em>"
                </p>
              </div>
            </div>

            <div style={{ padding: "clamp(24px,4vw,40px)" }}>
              <p className="rp" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", lineHeight: 1.88, maxWidth: 760 }}>
                Whether it's building Zerodha, PhysicsWallah, or the next big Indian startup, success often depends on the same leadership qualities displayed in high-stakes matches like the IND vs NZ Final. The pitch changes. The opposition changes. The scoreboard pressure changes. But the principles — calm decisions, trusted teams, clear strategy, relentless adaptability — stay constant.
              </p>
              <p className="rp" style={{ fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.88, marginTop: 16, maxWidth: 760 }}>
                The next Indian unicorn is being built by someone reading this. The final over is still being bowled.
              </p>
            </div>
          </div>

          {/* ── RELATED FOUNDER STORIES ── */}
          <div style={{ marginTop: "clamp(44px,6vw,72px)" }}>
            <div className="sh" style={{ marginBottom: 16 }}>
              <span className="sh-l">Related Founder Stories on UpForge</span>
              <div className="sh-r" />
            </div>
            <p className="rp" style={{ fontSize: 12.5, color: "var(--ink4)", marginBottom: 18, fontStyle: "italic" }}>
              Meet the founders who embody these seven principles — building India's most important companies.
            </p>

            {/* Founder cards — SEO internal links */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
              border: "1.5px solid var(--ink)", background: "var(--ink)", gap: 1.5,
            }}>
              {RELATED.map((r, i) => (
                <Link key={i} href={`/startup/${r.slug}`} className="rel-card">
                  {/* Logo placeholder */}
                  <div style={{
                    height: 100, background: ["#E8E0D0","#E0D8CC","#D8D0C4","#D0C8BC"][i],
                    display: "flex", alignItems: "center", justifyContent: "center",
                    borderBottom: "1px solid var(--rule2)",
                  }}>
                    <span className="pf" style={{ fontSize: "3rem", fontWeight: 900, color: "rgba(26,18,8,0.1)" }}>
                      {r.name.charAt(0)}
                    </span>
                  </div>
                  <div style={{ padding: "13px 14px 12px" }}>
                    <h3 className="pf" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", marginBottom: 4, lineHeight: 1.2 }}>
                      {r.name}
                    </h3>
                    <span className="sf" style={{ fontSize: 8, color: "var(--ink5)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700 }}>
                      {r.sector}
                    </span>
                    <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 4 }}>
                      <span className="sf" style={{ fontSize: 8.5, color: "var(--gold2)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        Read Story →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── FOOTER NAV ── */}
          <nav aria-label="Blog navigation" style={{ padding: "16px 0", borderTop: "2px solid var(--ink)", marginTop: "clamp(32px,5vw,52px)" }}>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", listStyle: "none", margin: 0, padding: 0 }}>
              {[
                { l: "Startup Registry",           h: "/startup" },
                { l: "Indian Startup Founders",    h: "/"        },
                { l: "Indian Unicorns 2026",       h: "/indian-unicorns" },
                { l: "Submit Your Startup",        h: "/submit"  },
                { l: "Valuation Tool",             h: "/valuation" },
                { l: "Back to Blog",               h: "/blog"    },
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
      </article>
    </>
  );
}
