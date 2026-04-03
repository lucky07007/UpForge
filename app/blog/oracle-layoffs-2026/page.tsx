// app/blog/oracle-layoffs-2026/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Target keywords: "oracle layoffs 2026", "oracle layoffs", "oracle news",
//                  "oracle share price", "oracle layoff india", "oracle AI pivot"
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link"
import type { Metadata } from "next"
import {
  buildBlogMetadata,
  buildBlogJsonLd,
  SAFE_BLOG_FOOTER_LINKS,
  ALL_BLOG_SLUGS,
} from "../_config/blog.config"

const POST = {
  slug:          "oracle-layoffs-2026",
  title:         "Oracle Layoffs 2026: 30,000 Jobs Cut in the Biggest Tech Workforce Reduction Ever",
  description:   "Oracle laid off up to 30,000 employees on March 31, 2026 — roughly 18% of its global workforce — to fund a $50 billion AI data centre buildout. Here is everything you need to know: what happened, who was affected, what it means for Oracle's share price, and what comes next.",
  keywords: [
    "oracle layoffs 2026",
    "oracle layoffs",
    "oracle layoff",
    "oracle news 2026",
    "oracle share price 2026",
    "oracle stock ORCL",
    "oracle AI pivot",
    "oracle 30000 jobs cut",
    "oracle india layoffs",
    "oracle DPIIT india employees",
    "oracle restructuring 2026",
    "tech layoffs 2026",
    "oracle data center AI",
    "oracle OpenAI Stargate",
    "oracle termination email",
    "oracle H1B visa layoffs",
    "oracle severance 2026",
  ],
  datePublished: "2026-04-03",
  dateModified:  "2026-04-03",
  readTime:      "11 min",
  category:      "Tech Industry",
  heroImage:     "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=85&auto=format",
  heroImageAlt:  "Oracle Layoffs 2026 — 30,000 Jobs Cut in Biggest Tech Workforce Reduction",
  wordCount:     2900,
}

export const metadata: Metadata = buildBlogMetadata(POST)

// ─────────────────────────────────────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    num:     "01",
    title:   "What Happened: The 6 AM Email That Changed 30,000 Lives",
    keyword: "Oracle Layoffs March 2026",
    img:     "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=900&q=80&auto=format",
    imgAlt:  "Oracle layoffs March 31 2026 termination email employees",
    body: `On March 31, 2026 — the last day of Q1 — Oracle sent termination emails to thousands of employees across the United States, India, Canada, Mexico, and Uruguay. The emails arrived at approximately 6 AM local time from "Oracle Leadership." No prior warning from HR. No conversation with a manager. Access to company systems was cut immediately after the email was opened.

The subject line was clinical: an organisational change. The body informed recipients that their roles had been eliminated and that the day of the email was their final working day. Employees confirmed the cuts in real time on Reddit's r/employeesOfOracle and on the professional forum Blind — entire teams at Oracle's Revenue and Health Sciences (RHS) division and SaaS and Virtual Operations Services (SVOS) unit reported cuts of at least 30%.

Investment bank TD Cowen estimates the total workforce reduction will reach 20,000 to 30,000 employees — roughly 18% of Oracle's global workforce of approximately 162,000 people. Oracle has not officially confirmed the final number, and declined all media requests to comment. What is not in dispute: this is the largest layoff in Oracle's 48-year history, and it is happening while the company has never been more financially valuable on paper.`,
    stat: { val: "30,000", label: "Employees Cut — 18% of Oracle's Global Workforce of 162,000" },
    insight: "The 6 AM termination email with immediate system lockout is now a pattern in Big Tech layoffs. What made Oracle's notable: it arrived while the company was simultaneously reporting a 22% revenue increase and a $553 billion order backlog.",
    internal: null,
  },
  {
    num:     "02",
    title:   "Why Oracle Cut 30,000 Jobs While Revenue Was Growing",
    keyword: "Oracle AI Pivot Data Centre Funding 2026",
    img:     "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80&auto=format",
    imgAlt:  "Oracle AI data centre infrastructure funding 2026",
    body: `The apparent contradiction at the heart of Oracle's layoffs is this: the company just reported quarterly revenue of $17.2 billion — up 22% year on year — and its remaining performance obligations (contracted future revenue not yet recognised) stood at a staggering $553 billion, up 325% year over year. Oracle Cloud Infrastructure revenue alone surged 84% to $4.9 billion in the same quarter. This is not a company in distress.

It is a company that has made an extraordinarily expensive bet — and is cannibalising its present to fund its future. Oracle has committed approximately $50 billion in capital expenditure for fiscal 2026 to build out AI data centres capable of handling the AI training workloads of customers including OpenAI, Meta, Cohere, and xAI. The $300 billion Stargate contract with OpenAI alone requires infrastructure Oracle does not yet have. To close the gap between its ambitious build programme and its available cash, Oracle has taken on $58 billion in new debt in just two months — including a $50 billion bond offering in February — and is now eliminating tens of thousands of employees to free up an estimated $8 to $10 billion in annual cash flow.

TD Cowen analysts put it plainly in a January note: cutting 20,000 to 30,000 employees would generate that free cash flow increment needed to fund the data centre buildout without issuing further debt. Oracle disclosed a $2.1 billion restructuring budget in its March 2026 SEC 10-Q filing, with $982 million already recorded. The bulk of what remains — roughly $1.1 billion — is earmarked for severance. The company is not shrinking. It is restructuring its cost base to become a different kind of company: not a legacy software vendor but an AI infrastructure hyperscaler that competes directly with Amazon Web Services, Microsoft Azure, and Google Cloud.`,
    stat: { val: "$553B", label: "Oracle's Remaining Performance Obligations — 325% YoY Jump" },
    insight: "This is the defining tension of the AI era: companies with record backlogs and surging demand are cutting their existing workforces to fund the infrastructure required to actually fulfil that demand. Oracle is the starkest example yet.",
    internal: null,
  },
  {
    num:     "03",
    title:   "India: 12,000 Jobs Cut — The Highest Per-Country Impact",
    keyword: "Oracle India Layoffs 2026 Bengaluru Hyderabad",
    img:     "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=900&q=80&auto=format",
    imgAlt:  "Oracle India layoffs 2026 Bengaluru Hyderabad tech jobs",
    body: `India has emerged as the country most severely impacted by Oracle's global restructuring. Approximately 12,000 employees in India received termination notices on March 31 — representing roughly 40% of Oracle's Indian workforce of around 30,000. A second round of layoffs is expected within a month, according to employees including one from Oracle's HR department who confirmed the timeline to Business Standard.

The cuts span Oracle's India operations comprehensively. NetSuite's India Development Centre saw reductions across project management and engineering roles at multiple seniority levels. Technical teams in cloud and database units, support, sales, and operations functions were all affected. Recently promoted employees — some promoted weeks before the layoff — were among those let go, according to multiple affected employees who shared their experiences on LinkedIn and Reddit.

The ripple effects extend beyond the individuals directly terminated. For the thousands of Indian professionals working in the United States on H-1B visas who are now unemployed, the situation is acutely precarious: US immigration law typically gives H-1B holders a 60-day grace period to find new employment or leave the country. For those with pending green card applications — particularly those in the decades-long India-specific EB-2 and EB-3 queues — losing employment can mean losing years of position in line. The returning wave of Indian tech professionals will also intensify competition in Bengaluru and Hyderabad's already pressured job markets. Cybersecurity, cloud architecture, and AI infrastructure roles are currently the most sought after by displaced Oracle employees globally, according to recruiters.`,
    stat: { val: "12,000", label: "Oracle Employees Cut in India — Another Round Expected Within 30 Days" },
    insight: "The H-1B crisis within Oracle's layoffs is an under-reported story. Tens of thousands of Indian professionals in the US, many with long-pending green card applications, now face not just unemployment but an immigration clock that starts the moment their employment ends.",
    internal: "/blog/india-startup-ecosystem-2026",
  },
  {
    num:     "04",
    title:   "Oracle Share Price: From ₹28,000 to ₹12,000 — and What Happens Next",
    keyword: "Oracle ORCL Share Price 2026 Stock Analysis",
    img:     "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80&auto=format",
    imgAlt:  "Oracle ORCL share price stock market 2026 analysis",
    body: `Oracle's stock (NYSE: ORCL) peaked at $345.72 in September 2025, briefly making it one of the most valuable software companies in the world as investors priced in the AI infrastructure opportunity. By March 31, 2026, the stock had lost nearly 57% of its value — falling to around $140 per share — as investors worried about the company's rising debt load, negative free cash flow, and the reliability of its largest customers.

The layoff announcement on March 31 initially pushed the stock up 5%, as markets interpreted the workforce reduction as evidence that management was taking decisive action to improve cash flow. By April 2, Oracle shares were trading at approximately $145.94. The stock is now at its cheapest valuation relative to earnings since before the AI boom began in early 2023, which has prompted some analysts to call it a buying opportunity — and others to flag that the structural challenges remain unresolved.

The core bull case: Oracle's $553 billion RPO backlog is real contracted revenue. OCI's 84% revenue growth is accelerating. The company has signed over $29 billion of new contracts since its Q3 earnings call using a "bring your own hardware" model that requires major customers to front the cost of GPU clusters — limiting Oracle's own capex exposure. The bear case: Oracle's free cash flow is deeply negative (negative $24.7 billion trailing), its debt load exceeds $124 billion, and its largest single contract — the $300 billion Stargate deal with OpenAI — carries execution risk that Wall Street has not fully modelled. Oracle's fiscal 2027 revenue target of $90 billion requires the company to nearly double revenue in 18 months while simultaneously completing the largest infrastructure buildout in its history.`,
    stat: { val: "-57%", label: "Oracle Stock Decline From Sept 2025 Peak of $345 to ~$145 Today" },
    insight: "The market is treating Oracle as a company in transition, not a company in decline. The question is whether its $553 billion backlog represents gold or a mirage — and the answer will become clear as data centres come online through 2026 and 2027.",
    internal: null,
  },
  {
    num:     "05",
    title:   "Who Got Cut — and What Roles Survived",
    keyword: "Oracle Layoffs Which Teams Departments 2026",
    img:     "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format",
    imgAlt:  "Oracle layoffs 2026 which departments teams were cut",
    body: `Oracle's restructuring was not random. The cuts followed a clear logic: roles in traditional business areas not aligned with AI, cloud infrastructure, or data centre operations faced the deepest reductions, while technical talent in cloud architecture, AI, and security was largely retained.

The hardest-hit divisions were Oracle's Revenue and Health Sciences (RHS) unit and its SaaS and Virtual Operations Services (SVOS) group — both saw at least 30% workforce reductions, according to employee reports corroborated by multiple outlets. Support, sales, and operations functions tied to legacy on-premise database products also saw significant cuts. NetSuite's India Development Centre lost employees across project management and engineering. The Health Sciences division — which serves pharmaceutical, biotech, and clinical research organisations — saw cuts despite being a high-growth segment, suggesting Oracle is willing to sacrifice revenue-generating headcount to hit cash flow targets.

What survived: Oracle's OCI (Oracle Cloud Infrastructure) engineering teams, data centre operations, AI platform development, and security divisions were largely protected. Oracle's security portfolio — which includes Identity Management, Cloud Guard, and database security products — is considered a strategic asset in the current market, where the global cybersecurity talent gap stands at 4.8 million unfilled positions. If you were laid off from Oracle's security stack, recruiters are already reaching out. The WARN Act, which requires 60 days advance notice for qualifying mass layoffs in the United States, may provide additional legal recourse for some affected employees — several have already noted on Blind and LinkedIn that Oracle classified them as remote workers, which Oracle may argue exempts certain locations from WARN requirements.`,
    stat: { val: "30%+", label: "Workforce Reduction in Oracle's RHS and SVOS Divisions" },
    insight: "Oracle is not becoming a smaller company. It is becoming a different company — one where cloud infrastructure engineers and AI platform builders are the core headcount, and legacy software and operations roles are managed down. The question is whether it can execute that transition at $50 billion in capex per year.",
    internal: null,
  },
  {
    num:     "06",
    title:   "The Bigger Picture: What Oracle's Layoffs Say About the AI Economy",
    keyword: "Tech Layoffs AI Economy 2026 Oracle Meta Amazon",
    img:     "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80&auto=format",
    imgAlt:  "AI economy tech layoffs 2026 automation workforce impact",
    body: `Oracle's mass layoff did not happen in isolation. It is part of a coherent pattern across the technology industry in 2026: companies are simultaneously reporting record revenues, announcing record AI infrastructure investments, and cutting tens of thousands of jobs. Meta, Amazon, and Block have all made significant cuts this year. The common thread is not financial distress — it is the belief that AI will replace significant portions of traditional white-collar technology work, combined with the capital demands of building the infrastructure to make that replacement possible.

Oracle's cuts are particularly revealing because of what they say about the economics of the AI transition. The company is not cutting because it has fewer customers or less revenue. It is cutting because the work required to serve its new customers — building and operating AI data centres at hyperscale — is fundamentally different from the work required to maintain legacy enterprise software, and because AI itself is beginning to reduce the headcount needed for support, sales, and operations functions.

For workers, the message is uncomfortable but clear: roles in traditional enterprise software support, on-premise infrastructure management, and non-technical operations face structural pressure across the entire industry. Roles in cloud infrastructure, cybersecurity, AI platform development, and data engineering face growing demand that the industry cannot currently supply. The skill gap between what companies need and what their existing workforces provide is widening — and the pace of that widening is accelerating.

For India specifically, Oracle's layoffs are a stress test for an economy that has bet heavily on technology services employment. The returning wave of H-1B workers, the re-entry of 12,000 domestic Oracle employees into an already competitive market, and the broader slowdown in traditional IT services hiring are converging simultaneously. The Indian startups that will absorb some of this talent displacement — and the opportunities that emerge from it — are a story that UpForge will be tracking closely.`,
    stat: { val: "$8–10B", label: "Annual Cash Flow Freed by Oracle Layoffs — Redirected to AI Data Centres" },
    insight: "The most important question is not whether Oracle's AI bet will pay off — it is what happens to the 30,000 people who built the company that generated the cash Oracle is now deploying. The answer matters for every technology worker, in India and globally.",
    internal: "/blog/top-ai-startups-india-2026",
  },
  {
    num:     "07",
    title:   "What Displaced Oracle Employees Should Do Right Now",
    keyword: "Oracle Layoff 2026 Next Steps Jobs Severance",
    img:     "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=900&q=80&auto=format",
    imgAlt:  "Oracle laid off employees next steps jobs 2026",
    body: `If you received the Oracle termination email, the first 72 hours matter disproportionately — access expires, recruiter attention peaks, and the most actively hiring roles fill first. Here is what the evidence from previous large tech layoffs suggests you should do immediately.

Review your severance agreement carefully before signing. Oracle's severance offer is contingent on signing separation paperwork, according to screenshots shared by multiple affected employees. The standard WARN Act in the US requires 60 days advance notice (or equivalent pay) for qualifying mass layoffs. If Oracle classified you as a remote worker to avoid WARN requirements and your office was a qualifying site, consult an employment attorney before signing — the potential back pay is significant.

File for unemployment benefits the day after your last paycheck. Do not wait until severance runs out. California EDD processing is slow — filing immediately maximises your timeline. If you are in the US on an H-1B visa, your 60-day grace period begins at the end of your last day of employment, not when your severance ends. Use that time actively: update your LinkedIn profile immediately, set your profile to "Open to Work", and reach out to recruiters in cybersecurity, cloud infrastructure, and AI platform development — the roles with the highest demand for Oracle-experienced professionals right now.

For Indian professionals returning to India: the Bengaluru and Hyderabad markets are absorbing significant Oracle talent right now. Indian startups building cloud infrastructure, enterprise SaaS, and AI tools are actively hiring — and Oracle's operational and engineering experience is genuinely valued. The Indian startup ecosystem in 2026 is more open to experienced professionals from large tech companies than at any previous point, and the DPIIT-recognised startup ecosystem has never been better funded.`,
    stat: { val: "4.8M", label: "Global Cybersecurity Roles Unfilled — Highest Demand Segment for Oracle Alumni" },
    insight: "Oracle's security, cloud infrastructure, and database engineering talent is walking into a seller's market. The worst thing a displaced Oracle employee can do is wait. Update your profile today. Recruiters are already looking.",
    internal: "/blog/how-to-start-startup-india-2026",
  },
]

const FAST_FACTS = [
  { label: "Date of Layoffs",       value: "March 31, 2026"                        },
  { label: "Estimated Jobs Cut",    value: "20,000 – 30,000 (TD Cowen est.)"        },
  { label: "% of Global Workforce", value: "~18% of 162,000 employees"              },
  { label: "India Impact",          value: "~12,000 cut; another round expected"    },
  { label: "Restructuring Budget",  value: "$2.1B (SEC 10-Q, March 2026)"           },
  { label: "Cash Flow Freed",       value: "$8B – $10B annually (TD Cowen)"         },
  { label: "Oracle Stock (ORCL)",   value: "~$145 (down 57% from $345 Sept 2025)"  },
  { label: "Revenue Q3 FY2026",     value: "$17.2B (+22% YoY)"                     },
  { label: "RPO Backlog",           value: "$553B (+325% YoY)"                     },
  { label: "AI Capex FY2026",       value: "~$50B committed"                       },
]

const RELATED_SLUGS = [
  "india-startup-ecosystem-2026",
  "top-ai-startups-india-2026",
  "how-to-start-startup-india-2026",
  "how-to-get-startup-funding-india-2026",
]
const RELATED = ALL_BLOG_SLUGS.filter((b) => RELATED_SLUGS.includes(b.slug))

// ─────────────────────────────────────────────────────────────────────────────
// CSS — UpForge parchment palette, red/crimson accent for breaking news
// ─────────────────────────────────────────────────────────────────────────────
const PAGE_CSS = `
  .pf  { font-family: var(--font-display), Georgia, serif !important; }
  .rp  { font-family: Georgia, 'Times New Roman', serif; }
  .sf  { font-family: system-ui, -apple-system, sans-serif; }

  :root {
    --parch: #F5F1E8; --parch2: #EDE9DF; --ink: #1A1208;
    --ink3: #5A4A30; --ink4: #8C7D65; --ink5: #BBB0A0;
    --rule: #C8C2B4; --rule2: #D8D2C4;
    --white: #FDFCF9;
    --red: #B91C1C; --red2: #DC2626; --red3: #991B1B;
    --red-pale: #FEF2F2;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .a0 { animation: fadeUp .44s .00s cubic-bezier(.16,1,.3,1) both; }
  .a1 { animation: fadeUp .44s .08s cubic-bezier(.16,1,.3,1) both; }
  .a2 { animation: fadeUp .44s .16s cubic-bezier(.16,1,.3,1) both; }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; } 50% { opacity: .35; }
  }
  .live-dot { animation: pulse-dot 1.4s infinite; }

  .imgf { position: relative; overflow: hidden; }
  .imgf img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    filter: sepia(14%) contrast(108%);
    transition: transform .6s ease;
  }
  .imgf:hover img { transform: scale(1.03); }

  .blog-card {
    border: 1.5px solid var(--ink);
    background: var(--white);
    overflow: hidden; position: relative;
  }
  .blog-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--red3), var(--red2), #F87171);
  }

  .stat-pill {
    display: flex; align-items: center; gap: 14px;
    background: var(--ink); padding: 14px 18px; margin: 16px 0;
  }
  .insight {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--red-pale); border: 1px solid rgba(185,28,28,.2);
    padding: 9px 14px; width: 100%;
  }
  .sh { display: flex; align-items: center; gap: 10px; }
  .sh-l {
    font-size: 8px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .28em; color: var(--ink5);
    font-family: system-ui; white-space: nowrap;
  }
  .sh-r { flex: 1; height: 1px; background: var(--rule2); }

  .toc-link {
    display: flex; align-items: baseline; gap: 8px;
    margin-bottom: 9px; text-decoration: none;
  }
  .toc-link:hover span { color: var(--red); }

  .fact-row {
    display: flex; justify-content: space-between; align-items: baseline;
    padding: 10px 0; border-bottom: 1px solid var(--rule2); gap: 16px;
  }
  .fact-row:last-child { border-bottom: none; }

  .rel-card {
    display: flex; flex-direction: column;
    background: var(--white); text-decoration: none;
    transition: transform .15s, box-shadow .15s; position: relative;
  }
  .rel-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 2.5px; background: transparent; transition: background .15s;
  }
  .rel-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 var(--ink); z-index: 1;
  }
  .rel-card:hover::before { background: var(--red); }

  .dropcap::first-letter {
    font-family: var(--font-display), Georgia, serif;
    font-size: 3.8em; font-weight: 900;
    float: left; line-height: .82;
    margin-right: 8px; margin-top: 6px; color: var(--ink);
  }

  .breaking-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--red); padding: 4px 14px;
    font-family: system-ui; font-size: 8px; font-weight: 900;
    text-transform: uppercase; letter-spacing: .2em; color: white;
    margin-bottom: 10px;
  }

  @media (max-width: 900px) {
    .section-grid { grid-template-columns: 1fr !important; }
    .toc-grid     { grid-template-columns: 1fr !important; }
  }
`

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function BlogOracleLayoffs2026() {
  const jsonLd = buildBlogJsonLd(POST)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article
        itemScope
        itemType="https://schema.org/NewsArticle"
        style={{ minHeight: "100vh", background: "var(--parch)" }}
      >

        {/* ── BREADCRUMB ── */}
        <nav
          className="sf a0"
          aria-label="Breadcrumb"
          style={{ background: "var(--parch2)", borderBottom: "1px solid var(--rule2)", padding: "8px 0" }}
        >
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(16px,3vw,36px)" }}>
            <ol
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9, color: "var(--ink5)", textTransform: "uppercase", letterSpacing: "0.18em", listStyle: "none", margin: 0, padding: 0 }}
              itemScope itemType="https://schema.org/BreadcrumbList"
            >
              {[
                { href: "/",     label: "UpForge",  pos: "1" },
                { href: "/blog", label: "Blog",     pos: "2" },
              ].map((b) => (
                <li key={b.pos} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link href={b.href} style={{ color: "var(--ink5)", textDecoration: "none" }} itemProp="item">
                    <span itemProp="name">{b.label}</span>
                  </Link>
                  <meta itemProp="position" content={b.pos} />
                  <span style={{ color: "var(--rule)", marginLeft: 6 }}>/</span>
                </li>
              ))}
              <li style={{ color: "var(--ink4)", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 280 }}
                itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem"
              >
                <span itemProp="name">Oracle Layoffs 2026</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </nav>

        {/* ── BREAKING BANNER ── */}
        <div style={{ background: "var(--red)", padding: "8px 0" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(16px,3vw,36px)", display: "flex", alignItems: "center", gap: 12 }}>
            <span className="live-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "white", display: "inline-block", flexShrink: 0 }} />
            <p className="sf" style={{ fontSize: 10, color: "white", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", margin: 0 }}>
              Breaking News — Updated April 3, 2026 · Oracle layoffs ongoing; second India round expected within 30 days
            </p>
          </div>
        </div>

        {/* ── HERO ── */}
        <div className="a0" style={{ borderBottom: "3px solid var(--ink)" }}>
          <div className="imgf" style={{ height: "clamp(280px,38vw,480px)" }}>
            <img src={POST.heroImage} alt={POST.heroImageAlt} loading="eager" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(26,18,8,.25) 0%,rgba(26,18,8,.92) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 clamp(16px,5vw,64px)", textAlign: "center" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap", justifyContent: "center" }}>
                {["Tech Industry", "Breaking News", "April 2026"].map((t) => (
                  <span key={t} className="sf" style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.2)", padding: "3px 10px" }}>
                    {t}
                  </span>
                ))}
              </div>
              <h1
                className="pf"
                itemProp="headline"
                style={{ fontSize: "clamp(1.8rem,5.5vw,4rem)", fontWeight: 900, lineHeight: 1.02, color: "white", letterSpacing: "-0.02em", marginBottom: 18, maxWidth: 860 }}
              >
                Oracle Layoffs 2026:{" "}
                <em style={{ color: "#FCA5A5" }}>30,000 Jobs, One Email, No Warning</em>
              </h1>
              <p className="rp" style={{ fontSize: "clamp(13px,1.8vw,16px)", color: "rgba(255,255,255,0.62)", fontStyle: "italic", maxWidth: 560, lineHeight: 1.6 }}>
                The biggest workforce reduction in Oracle's history — and what it reveals about the real cost of the AI era.
              </p>
            </div>
          </div>

          {/* Meta bar */}
          <div style={{ background: "var(--ink)" }}>
            <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(16px,3vw,36px)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                {[
                  { l: "Published",     v: "3 April 2026"         },
                  { l: "Reading Time",  v: POST.readTime          },
                  { l: "Category",      v: POST.category          },
                  { l: "Jobs Affected", v: "Up to 30,000"         },
                  { l: "ORCL Today",    v: "~$145 (−57% YTD)"     },
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

        {/* ── MAIN ── */}
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(16px,3vw,36px) clamp(48px,8vw,96px)" }}>

          {/* Intro + TOC */}
          <div
            className="a1 toc-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 0, borderBottom: "1px solid var(--rule2)", alignItems: "start" }}
          >
            <div style={{ padding: "clamp(28px,4vw,48px) clamp(16px,3vw,40px) clamp(28px,4vw,48px) 0", borderRight: "1px solid var(--rule2)" }}>
              <div className="sh" style={{ marginBottom: 18 }}>
                <span className="sh-l">The Story</span>
                <div className="sh-r" />
              </div>
              <p
                className="pf"
                itemProp="description"
                style={{ fontSize: "clamp(1.05rem,2.2vw,1.35rem)", fontWeight: 400, lineHeight: 1.72, color: "var(--ink)", marginBottom: 18 }}
              >
                On March 31, 2026, Oracle sent termination emails to up to 30,000 employees before breakfast. The company had never cut this many people in its 48-year history. It also had never had a $553 billion order backlog before.
              </p>
              <p className="rp" style={{ fontSize: 13.5, color: "var(--ink3)", lineHeight: 1.88, marginBottom: 14 }}>
                This is the full story: what happened on the day of the layoffs, why Oracle made the decision, what it means for its share price, and what 30,000 displaced employees — including 12,000 in India — should do right now. It is also the story of a much larger transformation: the moment the AI economy made its true cost visible.
              </p>
              <p className="rp" style={{ fontSize: 13.5, color: "var(--ink3)", lineHeight: 1.88 }}>
                UpForge covers the Indian startup ecosystem, the global forces that shape it, and the founders who navigate both. The Oracle layoffs are one of the most significant labour events in India's technology sector in years. We are covering it with the same rigour we apply to everything else: facts first, analysis second, no hype.
              </p>
            </div>

            {/* TOC */}
            <nav
              aria-label="Article sections"
              style={{ padding: "clamp(24px,3vw,40px) 0 clamp(24px,3vw,40px) clamp(16px,3vw,32px)", minWidth: "clamp(200px,26vw,280px)" }}
            >
              <div className="sh" style={{ marginBottom: 14 }}>
                <span className="sh-l">In This Article</span>
                <div className="sh-r" />
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {SECTIONS.map((s, i) => (
                  <li key={i}>
                    <a href={`#section-${s.num}`} className="toc-link">
                      <span className="sf" style={{ fontSize: 8, fontWeight: 700, color: "var(--red)", flexShrink: 0, minWidth: 18 }}>{s.num}</span>
                      <span className="rp" style={{ fontSize: 11.5, color: "var(--ink4)", lineHeight: 1.4 }}>{s.title}</span>
                    </a>
                  </li>
                ))}
                <li style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--rule2)" }}>
                  <a href="#fast-facts" className="toc-link">
                    <span className="sf" style={{ fontSize: 8, fontWeight: 700, color: "var(--red)", flexShrink: 0, minWidth: 18 }}>→</span>
                    <span className="rp" style={{ fontSize: 11.5, color: "var(--ink4)", lineHeight: 1.4, fontWeight: 700 }}>Fast Facts Table</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* ── SECTIONS ── */}
          <div style={{ marginTop: "clamp(32px,5vw,56px)" }}>
            {SECTIONS.map((sec, idx) => (
              <div
                key={idx}
                id={`section-${sec.num}`}
                className="blog-card"
                style={{ marginBottom: 20 }}
              >
                <div
                  className="section-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: idx % 2 === 0 ? "1fr 340px" : "340px 1fr",
                    gap: 0,
                    minHeight: 340,
                  }}
                >
                  {idx % 2 !== 0 && (
                    <div className="imgf" style={{ borderRight: "1.5px solid var(--ink)", minHeight: 300 }}>
                      <img src={sec.img} alt={sec.imgAlt} loading="lazy" />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(26,18,8,.6) 0%,transparent 60%)" }} />
                      <div style={{ position: "absolute", bottom: 20, left: 20 }}>
                        <span className="pf" style={{ fontSize: "4rem", fontWeight: 900, color: "rgba(255,255,255,0.12)", lineHeight: 1 }}>{sec.num}</span>
                      </div>
                    </div>
                  )}

                  <div style={{ padding: "clamp(20px,3vw,36px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                        <span className="sf" style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red)" }}>
                          Section {sec.num}
                        </span>
                        <div style={{ flex: 1, height: 1, background: "var(--rule2)" }} />
                        <span className="sf" style={{ fontSize: 8, color: "var(--ink5)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          {sec.keyword}
                        </span>
                      </div>
                      <div className="breaking-badge">Breaking</div>
                      <h2
                        className="pf"
                        style={{ fontSize: "clamp(1.2rem,2.5vw,1.75rem)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.15, marginBottom: 18 }}
                      >
                        {sec.title}
                      </h2>
                      {sec.body.split("\n\n").map((para, pi) => (
                        <p
                          key={pi}
                          className={`rp${pi === 0 ? " dropcap" : ""}`}
                          style={{ fontSize: 13.5, color: "var(--ink3)", lineHeight: 1.88, marginBottom: 14 }}
                        >
                          {para}
                        </p>
                      ))}
                      {sec.internal && (
                        <Link
                          href={sec.internal}
                          style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, fontFamily: "system-ui", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".18em", color: "var(--red)", textDecoration: "none" }}
                        >
                          Related: Read on UpForge →
                        </Link>
                      )}
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <div className="stat-pill">
                        <p className="pf" style={{ fontSize: "1.8rem", fontWeight: 900, color: "#FCA5A5", lineHeight: 1, flexShrink: 0 }}>
                          {sec.stat.val}
                        </p>
                        <p className="sf" style={{ fontSize: 10, color: "rgba(255,255,255,.6)", textTransform: "uppercase", letterSpacing: "0.1em", lineHeight: 1.5 }}>
                          {sec.stat.label}
                        </p>
                      </div>
                      <div className="insight">
                        <div style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--red2)", flexShrink: 0 }} aria-hidden="true" />
                        <p className="rp" style={{ fontSize: 12, color: "var(--red3)", fontStyle: "italic", lineHeight: 1.6 }}>
                          {sec.insight}
                        </p>
                      </div>
                    </div>
                  </div>

                  {idx % 2 === 0 && (
                    <div className="imgf" style={{ borderLeft: "1.5px solid var(--ink)", minHeight: 300 }}>
                      <img src={sec.img} alt={sec.imgAlt} loading="lazy" />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left,rgba(26,18,8,.6) 0%,transparent 60%)" }} />
                      <div style={{ position: "absolute", bottom: 20, right: 20, textAlign: "right" }}>
                        <span className="pf" style={{ fontSize: "4rem", fontWeight: 900, color: "rgba(255,255,255,0.12)", lineHeight: 1 }}>{sec.num}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── FAST FACTS TABLE ── */}
          <div id="fast-facts" style={{ marginTop: "clamp(44px,6vw,72px)" }}>
            <div className="sh" style={{ marginBottom: 16 }}>
              <span className="sh-l" style={{ color: "var(--red)" }}>⚡ Fast Facts</span>
              <div className="sh-r" />
            </div>
            <h2
              className="pf"
              style={{ fontSize: "clamp(1.3rem,2.5vw,1.8rem)", fontWeight: 700, color: "var(--ink)", marginBottom: 6, lineHeight: 1.15 }}
            >
              Oracle Layoffs 2026: Key Numbers at a Glance
            </h2>
            <p className="rp" style={{ fontSize: 13, color: "var(--ink4)", fontStyle: "italic", marginBottom: 20, lineHeight: 1.65 }}>
              Everything you need to know about Oracle's historic workforce reduction, sourced from SEC filings, TD Cowen analysis, and reporting by CNBC, TNW, and Business Standard.
            </p>
            <div style={{ border: "1.5px solid var(--ink)", background: "var(--white)", padding: "4px 20px 4px" }}>
              {FAST_FACTS.map((item, i) => (
                <div key={i} className="fact-row">
                  <p className="sf" style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)", flexShrink: 0 }}>{item.label}</p>
                  <p className="rp" style={{ fontSize: 12, color: "var(--ink3)", textAlign: "right", lineHeight: 1.5 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RELATED POSTS ── */}
          <div style={{ marginTop: "clamp(44px,6vw,72px)" }}>
            <div className="sh" style={{ marginBottom: 16 }}>
              <span className="sh-l">Related Reading on UpForge</span>
              <div className="sh-r" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", border: "1.5px solid var(--ink)", background: "var(--ink)", gap: 1.5 }}>
              {RELATED.map((r, i) => (
                <Link key={i} href={`/blog/${r.slug}`} className="rel-card">
                  <div style={{ height: 80, background: ["#E8E0D0","#E0D8CC","#D8D0C4","#D0C8BC"][i % 4], display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--rule2)" }}>
                    <span className="pf" style={{ fontSize: "2.8rem", fontWeight: 900, color: "rgba(26,18,8,0.1)" }} aria-hidden="true">
                      {r.title.charAt(0)}
                    </span>
                  </div>
                  <div style={{ padding: "13px 14px 12px" }}>
                    <h3 className="pf" style={{ fontSize: ".9rem", fontWeight: 700, color: "var(--ink)", marginBottom: 4, lineHeight: 1.2 }}>{r.title}</h3>
                    <span className="sf" style={{ fontSize: 8, color: "var(--ink5)", textTransform: "uppercase", letterSpacing: ".12em", fontWeight: 700 }}>{r.category}</span>
                    <div style={{ marginTop: 8 }}>
                      <span className="sf" style={{ fontSize: 8.5, color: "var(--red)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em" }}>Read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── FOOTER NAV ── */}
          <nav
            aria-label="Explore UpForge"
            style={{ padding: "16px 0", borderTop: "2px solid var(--ink)", marginTop: "clamp(32px,5vw,52px)" }}
          >
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", listStyle: "none", margin: 0, padding: 0 }}>
              {SAFE_BLOG_FOOTER_LINKS.map((lnk) => (
                <li key={lnk.h}>
                  <Link
                    href={lnk.h}
                    className="sf"
                    style={{ fontSize: 8.5, color: "var(--ink5)", textTransform: "uppercase", letterSpacing: "0.14em", textDecoration: "none" }}
                  >
                    {lnk.l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </article>
    </>
  )
}
