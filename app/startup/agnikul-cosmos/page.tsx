// app/startup/agnikul-cosmos/page.tsx
// UpForge — Agnikul Cosmos Founder Story
// Srinath Ravichandran | India's Private Space Revolution
// SEO: Full metadata export, JSON-LD, OG, Twitter, Breadcrumb, FAQPage, Organization schemas

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, ArrowRight, ExternalLink } from "lucide-react"

// ─── METADATA (App Router) ────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Agnikul Cosmos — Srinath Ravichandran | India's 3D-Printed Rocket Startup | UpForge",
  description:
    "Agnikul Cosmos founder story — Srinath Ravichandran built the world's first single-piece 3D-printed rocket engine from IIT Madras. Raised $72.8M, valued at $500M. India's private space revolution.",
  keywords: [
    "Agnikul Cosmos",
    "Srinath Ravichandran",
    "3D printed rocket engine India",
    "India space startup",
    "Agnibaan rocket",
    "private space launch India",
    "IIT Madras startup",
    "Indian spacetech",
    "Agnilet engine",
    "UpForge startup registry",
  ],
  alternates: {
    canonical: "https://www.upforge.in/startup/agnikul-cosmos",
  },
  openGraph: {
    type: "article",
    title: "Agnikul Cosmos — Srinath Ravichandran | India's 3D-Printed Rocket Startup | UpForge",
    description:
      "From IIT Madras to India's first private launchpad — how Srinath Ravichandran built the world's first single-piece 3D-printed rocket engine and launched Agnikul Cosmos into the global space race.",
    url: "https://www.upforge.in/startup/agnikul-cosmos",
    siteName: "UpForge",
    images: [
      {
        url: "https://www.upforge.in/Upforge-Agnikul.webp",
        width: 1200,
        height: 630,
        alt: "Srinath Ravichandran — Co-Founder & CEO, Agnikul Cosmos | UpForge Founder Chronicle",
      },
    ],
    locale: "en_IN",
    authors: ["UpForge Editorial"],
    section: "Spacetech",
    publishedTime: "2026-03-14T00:00:00+05:30",
    modifiedTime: "2026-03-14T00:00:00+05:30",
  },
  twitter: {
    card: "summary_large_image",
    site: "@upforge_in",
    title: "Agnikul Cosmos — Srinath Ravichandran | India's 3D-Printed Rocket Startup",
    description:
      "World's first single-piece 3D-printed rocket. India's first private launchpad. $72.8M raised. This is the Agnikul Cosmos story.",
    images: ["https://www.upforge.in/Upforge-Agnikul.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

// ─── JSON-LD SCHEMAS ──────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // Article
    {
      "@type": "Article",
      "@id": "https://www.upforge.in/startup/agnikul-cosmos#article",
      headline:
        "Agnikul Cosmos Founder Story — Srinath Ravichandran & India's Private Space Revolution",
      description:
        "How Srinath Ravichandran co-founded Agnikul Cosmos at IIT Madras, invented the world's first single-piece 3D-printed rocket engine, and launched India's private space era.",
      image: {
        "@type": "ImageObject",
        url: "https://www.upforge.in/Upforge-Agnikul.webp",
        width: 1200,
        height: 630,
      },
      author: {
        "@type": "Organization",
        name: "UpForge Editorial",
        url: "https://www.upforge.in/about",
      },
      publisher: {
        "@type": "Organization",
        name: "UpForge",
        logo: {
          "@type": "ImageObject",
          url: "https://www.upforge.in/logo.jpg",
        },
      },
      datePublished: "2026-03-14T00:00:00+05:30",
      dateModified: "2026-03-14T00:00:00+05:30",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.upforge.in/startup/agnikul-cosmos",
      },
      inLanguage: "en-IN",
      isPartOf: { "@id": "https://www.upforge.in/#website" },
    },
    // Organization
    {
      "@type": "Organization",
      "@id": "https://www.upforge.in/startup/agnikul-cosmos#organization",
      name: "Agnikul Cosmos",
      url: "https://agnikul.in",
      logo: "https://agnikul.in/wp-content/uploads/2024/07/Group-94826.webp",
      foundingDate: "2017",
      foundingLocation: {
        "@type": "Place",
        name: "IIT Madras, Chennai, Tamil Nadu, India",
      },
      description:
        "Agnikul Cosmos is an Indian private aerospace company building customizable orbital launch vehicles powered by the world's first single-piece 3D-printed semi-cryogenic rocket engine.",
      numberOfEmployees: { "@type": "QuantitativeValue", value: 200 },
      sameAs: [
        "https://www.linkedin.com/company/agnikul-cosmos/",
        "https://twitter.com/agnikulcosmos",
        "https://en.wikipedia.org/wiki/AgniKul_Cosmos",
      ],
      founder: [
        {
          "@type": "Person",
          name: "Srinath Ravichandran",
          jobTitle: "Co-Founder & CEO",
        },
        { "@type": "Person", name: "Moin SPM", jobTitle: "Co-Founder & COO" },
        {
          "@type": "Person",
          name: "Satyanarayanan Chakravarthy",
          jobTitle: "Co-Founder",
        },
        {
          "@type": "Person",
          name: "Janardhana Raju",
          jobTitle: "Co-Founder",
        },
      ],
    },
    // BreadcrumbList
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "UpForge",
          item: "https://www.upforge.in/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Startup Registry",
          item: "https://www.upforge.in/startup",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Spacetech Startups",
          item: "https://www.upforge.in/spacetech-startups",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Agnikul Cosmos",
          item: "https://www.upforge.in/startup/agnikul-cosmos",
        },
      ],
    },
    // FAQPage
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who founded Agnikul Cosmos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Agnikul Cosmos was co-founded in 2017 by Srinath Ravichandran (CEO), Moin SPM (COO), Prof. Satyanarayanan Chakravarthy, and Janardhana Raju at IIT Madras, Chennai.",
          },
        },
        {
          "@type": "Question",
          name: "What is the world's first single-piece 3D-printed rocket engine?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Agnilet, developed by Agnikul Cosmos, is the world's first single-piece 3D-printed semi-cryogenic rocket engine — printed in one continuous process with no assembled parts. It runs on LOX and Kerosene, was first test-fired in February 2021, and first flown in May 2024 aboard Agnibaan SOrTeD.",
          },
        },
        {
          "@type": "Question",
          name: "How much funding has Agnikul Cosmos raised?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Agnikul Cosmos has raised $72.8 million across 10 rounds as of November 2025. Their Series C of ₹150 crore ($17M) was raised at a $500 million valuation, with investors including HDFC Bank, Artha Select Fund, 100X.VC, and Advenza Global.",
          },
        },
        {
          "@type": "Question",
          name: "What was the Agnibaan SOrTeD launch?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "On May 30, 2024, Agnikul Cosmos launched Agnibaan SOrTeD (SubOrbital Technological Demonstrator) from India's first private launchpad at Sriharikota — the world's first flight with a single-piece 3D-printed engine and India's first semi-cryo engine launch.",
          },
        },
        {
          "@type": "Question",
          name: "What is Agnibaan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Agnibaan is Agnikul's orbital launch vehicle — 18 metres tall, two-stage, designed to carry 100 kg to a 700 km orbit powered by clustered Agnilet engines. It launches from a fully mobile launchpad, enabling deployment from any geographic location.",
          },
        },
        {
          "@type": "Question",
          name: "What is Agnikul Cosmos's valuation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "As of November 2025, Agnikul Cosmos is valued at approximately $500 million, following their Series C funding round.",
          },
        },
      ],
    },
  ],
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Valuation", v: "$500M" },
  { l: "Total Funding", v: "$72.8M" },
  { l: "Funding Rounds", v: "10" },
  { l: "Founded", v: "2017" },
  { l: "Payload Capacity", v: "100 kg LEO" },
  { l: "Engine Type", v: "3D Semi-Cryo" },
  { l: "Launch Target", v: "50/yr by 2028" },
  { l: "Base", v: "Chennai, TN" },
]

const INVESTORS = [
  "Pi Ventures",
  "Speciale Invest",
  "Artha Venture Fund",
  "Mayfield",
  "HDFC Bank",
  "100X.VC",
  "Celesta Capital",
  "Anand Mahindra (personal)",
]

const TIMELINE = [
  {
    year: "2017",
    title: "Founded at IIT Madras",
    body: "Srinath Ravichandran, Moin SPM, Prof. Satyanarayanan Chakravarthy, and Janardhana Raju co-found Agnikul Cosmos. ₹3 crore seed funding raised.",
  },
  {
    year: "2019",
    title: "First Institutional Round",
    body: "Early investors including Pi Ventures and Speciale Invest back the company. Anand Mahindra invests in personal capacity.",
  },
  {
    year: "Feb 2021",
    title: "Agnilet — World First",
    body: "World's first single-piece 3D-printed semi-cryogenic rocket engine test-fired. Framework agreement signed with the Department of Space for ISRO facility access.",
  },
  {
    year: "2022",
    title: "VSSC Test & Launchpad",
    body: "Agnilet successfully tested at Vikram Sarabhai Space Centre, Thumba. Construction begins on India's first private launchpad at Sriharikota.",
  },
  {
    year: "2023",
    title: "Series B · $26.7M",
    body: "Raises $26.7M Series B, taking total funding to $40M. 35 Letters of Intent signed with global customers across India, the Middle East, and Australia.",
  },
  {
    year: "May 2024",
    title: "Historic Agnibaan SOrTeD Launch",
    body: "After four failed attempts, Agnikul successfully launches Agnibaan SOrTeD from India's first private launchpad — world's first 3D-printed engine flight, India's first semi-cryo launch.",
  },
  {
    year: "Nov 2025",
    title: "Series C · $500M Valuation",
    body: "Raises ₹150 crore ($17M) at $500M valuation. Total funding: $72.8M. Tamil Nadu allocates 350 acres for integrated space campus. Reusability patent granted.",
  },
  {
    year: "Feb 2026",
    title: "Space-Based AI Data Centre",
    body: "Partners with Neevcloud to build a proof-of-concept space-based AI data centre to be launched aboard Agnibaan — signalling Agnikul's expansion beyond launch services.",
  },
]

const FAQS = [
  {
    q: "Who founded Agnikul Cosmos?",
    a: "Agnikul Cosmos was co-founded in 2017 by Srinath Ravichandran (CEO), Moin SPM (COO), Prof. Satyanarayanan Chakravarthy, and Janardhana Raju — all based at or connected to IIT Madras, Chennai.",
  },
  {
    q: "What is the world's first single-piece 3D-printed rocket engine?",
    a: "The Agnilet engine is the world's first single-piece 3D-printed semi-cryogenic rocket engine — manufactured in a single continuous process with no assembled parts. It runs on LOX and Kerosene and was first test-fired in February 2021, then first flown in May 2024 aboard Agnibaan SOrTeD.",
  },
  {
    q: "How much has Agnikul Cosmos raised and what is its valuation?",
    a: "As of November 2025, Agnikul Cosmos has raised $72.8 million across 10 rounds and is valued at $500 million. Their Series C featured HDFC Bank, Artha Select Fund, 100X.VC, Advenza Global, and Prathithi Ventures.",
  },
  {
    q: "What was significant about the Agnibaan SOrTeD launch?",
    a: "The Agnibaan SOrTeD launch on May 30, 2024 achieved three simultaneous firsts: the world's first flight with a single-piece 3D-printed engine, India's first semi-cryogenic engine launch, and the first launch from a private launchpad in India — all from Agnikul's own facility at Sriharikota.",
  },
  {
    q: "What is Agnibaan?",
    a: "Agnibaan (meaning 'Arrow of Fire') is Agnikul's primary orbital launch vehicle — 18 metres tall, two-stage, capable of placing 100 kg into 700 km orbit. It uses clustered Agnilet engines and launches from a fully mobile launchpad, enabling deployment from any geographic location.",
  },
  {
    q: "Where is Agnikul Cosmos based?",
    a: "Agnikul is headquartered at IIT Madras Research Park, Chennai, with operations in Thiruvananthapuram, Kerala. The Tamil Nadu government has allocated 350 acres for an upcoming integrated space manufacturing and testing campus.",
  },
]

const RELATED = [
  { cat: "Artificial Intelligence", title: "Sarvam AI — India's Sovereign LLM", slug: "sarvam-ai" },
  { cat: "Quick Commerce", title: "Zepto — The $5.9B Delivery Startup", slug: "zepto" },
  { cat: "Fintech", title: "Zerodha — India's Largest Stockbroker", slug: "zerodha" },
  { cat: "Consumer Tech", title: "boAt — The $1.3B Audio Brand", slug: "boat" },
]

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────
export default function AgnikulCosmosPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        style={{
          minHeight: "100vh",
          background: "#F3EFE5",
          fontFamily: "'Georgia','Times New Roman',serif",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
          .pf { font-family: 'Playfair Display', Georgia, serif !important; }

          .newspaper-cols {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
          }
          @media (min-width: 640px) {
            .newspaper-cols {
              grid-template-columns: 1fr 1fr 1fr;
            }
            .newspaper-cols > div {
              padding: 0 1.15rem;
              border-right: 1px solid #C8C2B4;
            }
            .newspaper-cols > div:first-child { padding-left: 0; }
            .newspaper-cols > div:last-child { border-right: none; padding-right: 0; }
          }

          .dropcap::first-letter {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 3.4em;
            font-weight: 900;
            line-height: 0.82;
            float: left;
            margin-right: 0.07em;
            margin-top: 0.06em;
            color: #1A1208;
          }

          @media (min-width: 1024px) {
            .right-sticky {
              position: sticky;
              top: 0;
              max-height: 100vh;
              overflow-y: auto;
              scrollbar-width: none;
            }
            .right-sticky::-webkit-scrollbar { display: none; }
          }

          .founder-link-btn:hover {
            border-color: #1a2744 !important;
            color: #1a2744 !important;
            background: #edf2fc !important;
          }

          .tag-hover:hover {
            background: #1A1208 !important;
            color: white !important;
            border-color: #1A1208 !important;
          }

          .related-hover:hover .related-title-text {
            color: #8b2e12;
          }
        `}</style>

        {/* ══ SECTION BANNER ══ */}
        <div
          style={{
            background: "#EDE8DC",
            borderBottom: "1px solid #C8C2B4",
            padding: "7px 24px",
          }}
        >
          <div
            className="max-w-[1300px] mx-auto flex items-center justify-between flex-wrap gap-2"
            style={{ fontFamily: "system-ui,sans-serif" }}
          >
            <span
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#6b6560",
              }}
            >
              The Founder Chronicle · India's Independent Startup Registry
            </span>
            <span
              style={{
                fontFamily: "'Georgia',serif",
                fontStyle: "italic",
                fontSize: "0.82rem",
                color: "#9e9993",
              }}
            >
              March 2026 Edition — Spacetech
            </span>
          </div>
        </div>

        {/* ══ BREADCRUMB ══ */}
        <nav
          aria-label="Breadcrumb"
          className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            padding: "14px 24px",
            fontFamily: "system-ui,sans-serif",
            fontSize: "0.72rem",
            color: "#6b6560",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ color: "#6b6560", textDecoration: "none" }}>
            UpForge
          </Link>
          <span style={{ color: "#a09890" }}>›</span>
          <Link
            href="/startup"
            style={{ color: "#6b6560", textDecoration: "none" }}
          >
            Startup Registry
          </Link>
          <span style={{ color: "#a09890" }}>›</span>
          <Link
            href="/spacetech-startups"
            style={{ color: "#6b6560", textDecoration: "none" }}
          >
            Spacetech
          </Link>
          <span style={{ color: "#a09890" }}>›</span>
          <span style={{ color: "#3a3632", fontWeight: 500 }}>
            Agnikul Cosmos
          </span>
        </nav>

        {/* ══ EDITION TAG ══ */}
        <div
          className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            paddingTop: 0,
            paddingBottom: "20px",
            borderBottom: "3px double #a09890",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                fontFamily: "system-ui,sans-serif",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                background: "#1a2744",
                color: "#a8bde8",
                padding: "3px 10px",
                borderRadius: "2px",
              }}
            >
              Spacetech
            </span>
            <span
              style={{
                fontFamily: "system-ui,sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
                color: "#9e9993",
              }}
            >
              March 2026 · Chennai, Tamil Nadu
            </span>
          </div>
        </div>

        {/* ══ HERO HEADLINE ══ */}
        <header
          className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8"
          style={{ paddingTop: "28px", paddingBottom: "0" }}
        >
          <p
            style={{
              fontFamily: "system-ui,sans-serif",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8b2e12",
              marginBottom: "12px",
            }}
          >
            Agnikul Cosmos · India's Private Space Revolution
          </p>

          <h1
            className="pf"
            style={{
              fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)",
              fontWeight: 900,
              lineHeight: 1.12,
              color: "#1A1208",
              maxWidth: "820px",
              marginBottom: "18px",
            }}
          >
            Space should be accessible to everyone — not just billionaires.{" "}
            <em style={{ color: "#8b2e12" }}>India proved it.</em>
          </h1>

          <p
            style={{
              fontFamily: "'Georgia',serif",
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              lineHeight: 1.65,
              color: "#3a3632",
              maxWidth: "680px",
              marginBottom: "16px",
            }}
          >
            From a lab at IIT Madras to India's first private launchpad —
            Srinath Ravichandran built the world's first single-piece
            3D-printed rocket engine and launched a new era for Indian
            spacetech. With $72.8M raised and a $500M valuation, Agnikul
            Cosmos is rewriting the rules of orbital access.
          </p>

          <div
            style={{
              fontFamily: "system-ui,sans-serif",
              fontSize: "0.72rem",
              color: "#9e9993",
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              marginBottom: "24px",
            }}
          >
            {[
              "By UpForge Editorial",
              "Chennai, Tamil Nadu",
              "Est. 2017",
              "India's Rocket Factory",
            ].map((item, i, arr) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span>{item}</span>
                {i < arr.length - 1 && (
                  <span style={{ color: "#c8c2b5" }}>·</span>
                )}
              </span>
            ))}
          </div>

          <div
            style={{
              borderTop: "3px double #a09890",
              marginBottom: "0",
            }}
          />
        </header>

        {/* ══ MAIN LAYOUT ══ */}
        <div
          className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "0",
            paddingTop: "32px",
            paddingBottom: "40px",
          }}
        >
          <div
            className="grid lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]"
            style={{ gap: "0" }}
          >
            {/* ── LEFT: EDITORIAL ── */}
            <article
              style={{ paddingRight: "0" }}
              className="lg:pr-8"
              itemScope
              itemType="https://schema.org/Article"
            >
              <meta
                itemProp="headline"
                content="Agnikul Cosmos Founder Story — Srinath Ravichandran & India's Private Space Revolution"
              />
              <meta itemProp="datePublished" content="2026-03-14" />
              <meta itemProp="author" content="UpForge Editorial" />
              <meta
                itemProp="description"
                content="How Srinath Ravichandran co-founded Agnikul Cosmos at IIT Madras, invented the world's first single-piece 3D-printed rocket engine, and launched India's private space era."
              />

              {/* Hero image */}
              <div
                style={{
                  marginBottom: "28px",
                  paddingBottom: "20px",
                  borderBottom: "1px solid #C8C2B4",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    background: "#1a2744",
                    border: "1px solid #a09890",
                    overflow: "hidden",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/Upforge-Agnikul.webp"
                    alt="Srinath Ravichandran, Co-Founder & CEO of Agnikul Cosmos — UpForge Founder Chronicle"
                    width={720}
                    height={440}
                    style={{
                      width: "100%",
                      maxHeight: "460px",
                      objectFit: "cover",
                      objectPosition: "center top",
                      display: "block",
                    }}
                    itemProp="image"
                  />
                </div>
                <div
                  style={{
                    paddingTop: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "6px",
                    borderTop: "1px solid #C8C2B4",
                    marginTop: "8px",
                    fontFamily: "system-ui,sans-serif",
                    fontSize: "0.7rem",
                    color: "#6b6560",
                  }}
                >
                  <span>
                    <strong style={{ color: "#3a3632" }}>
                      Srinath Ravichandran
                    </strong>{" "}
                    — Co-Founder &amp; CEO, Agnikul Cosmos
                  </span>
                  <span>UpForge Founder Chronicle, March 2026</span>
                </div>
              </div>

              {/* ── ARTICLE BODY ── */}
              <div itemProp="articleBody">

                {/* Section 1 */}
                <h2
                  className="pf"
                  style={{
                    fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                    fontWeight: 700,
                    color: "#1A1208",
                    marginBottom: "12px",
                    paddingBottom: "8px",
                    borderBottom: "1.5px solid #1a2744",
                  }}
                >
                  The Wall Street Trader Who Chose Rockets
                </h2>

                <div className="newspaper-cols" style={{ marginBottom: "28px" }}>
                  <div>
                    <p
                      className="dropcap"
                      style={{
                        fontSize: "clamp(12px,1.2vw,13.5px)",
                        lineHeight: 1.88,
                        color: "#2C2010",
                        marginBottom: "12px",
                      }}
                    >
                      Srinath Ravichandran did not take the obvious path. After
                      studying engineering, he spent years on Wall Street as a
                      trader — the kind of career most people settle into for
                      life. But somewhere between the trading screens and the
                      spreadsheets, the engineer in him refused to stay quiet.
                    </p>
                    <p
                      style={{
                        fontSize: "clamp(12px,1.2vw,13.5px)",
                        lineHeight: 1.88,
                        color: "#2C2010",
                        marginBottom: "12px",
                      }}
                    >
                      In 2017, Ravichandran returned to what he had always loved
                      — and co-founded{" "}
                      <strong>Agnikul Cosmos</strong> inside IIT Madras,
                      alongside <strong>Moin SPM</strong>, Professor{" "}
                      <strong>Satyanarayanan Chakravarthy</strong>, and{" "}
                      <strong>Janardhana Raju</strong>.
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "clamp(12px,1.2vw,13.5px)",
                        lineHeight: 1.88,
                        color: "#2C2010",
                        marginBottom: "12px",
                      }}
                    >
                      The name was intentional:{" "}
                      <em>Agni</em> for fire, <em>Gurukula</em> for a place of
                      learning. A school of fire — built inside one of India's
                      most respected technical institutions.
                    </p>
                    <p
                      style={{
                        fontSize: "clamp(12px,1.2vw,13.5px)",
                        lineHeight: 1.88,
                        color: "#2C2010",
                        marginBottom: "12px",
                      }}
                    >
                      The founding vision was deceptively simple: if you want to
                      put a satellite in orbit, you should be able to book a
                      launch the way you book an Uber. Dedicated. On-demand.
                      Affordable. From anywhere.
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "clamp(12px,1.2vw,13.5px)",
                        lineHeight: 1.88,
                        color: "#2C2010",
                        marginBottom: "12px",
                      }}
                    >
                      "All the big startup stories in the US for space still
                      seem to be driven by billionaires," Ravichandran told
                      reporters. "Here in India, none of us had that kind of
                      money to start." That constraint became a design
                      philosophy — build lean, build smart, build precisely.
                    </p>
                  </div>
                </div>

                {/* Pull quote 1 */}
                <div
                  style={{
                    margin: "28px 0",
                    padding: "20px 24px 20px 28px",
                    borderLeft: "4px solid #1a2744",
                    borderRight: "1px solid #C8C2B4",
                    background: "#EDE8DC",
                  }}
                >
                  <blockquote
                    className="pf"
                    style={{
                      fontStyle: "italic",
                      fontSize: "clamp(1rem, 1.5vw, 1.18rem)",
                      lineHeight: 1.55,
                      color: "#1A1208",
                    }}
                    cite="https://www.upforge.in/startup/agnikul-cosmos"
                  >
                    "All the big startup stories in the US for space still seem
                    to be driven by billionaires. Here in India, none of us had
                    that kind of money to start."
                  </blockquote>
                  <cite
                    style={{
                      display: "block",
                      marginTop: "10px",
                      fontFamily: "system-ui,sans-serif",
                      fontSize: "0.7rem",
                      fontStyle: "normal",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: "#6b6560",
                    }}
                  >
                    — Srinath Ravichandran, Co-Founder &amp; CEO, Agnikul Cosmos
                  </cite>
                </div>

                {/* Section 2 */}
                <h2
                  className="pf"
                  style={{
                    fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                    fontWeight: 700,
                    color: "#1A1208",
                    marginTop: "28px",
                    marginBottom: "12px",
                    paddingBottom: "8px",
                    borderBottom: "1.5px solid #1a2744",
                  }}
                >
                  The Technology That Changed Everything
                </h2>

                <div className="newspaper-cols" style={{ marginBottom: "28px" }}>
                  <div>
                    <p
                      style={{
                        fontSize: "clamp(12px,1.2vw,13.5px)",
                        lineHeight: 1.88,
                        color: "#2C2010",
                        marginBottom: "12px",
                      }}
                    >
                      India's private space story needed a technology bet that
                      was genuinely defensible — something no one else had done.
                      Agnikul chose{" "}
                      <strong>3D-printed rocket engines</strong> — not as a
                      gimmick, but as a fundamental manufacturing philosophy.
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "clamp(12px,1.2vw,13.5px)",
                        lineHeight: 1.88,
                        color: "#2C2010",
                        marginBottom: "12px",
                      }}
                    >
                      In February 2021, the team test-fired{" "}
                      <strong>Agnilet</strong> — the world's first single-piece
                      3D-printed semi-cryogenic rocket engine, built without any
                      assembled parts. A single continuous print. Agnikul
                      claimed it cut engine production time by 60%.
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "clamp(12px,1.2vw,13.5px)",
                        lineHeight: 1.88,
                        color: "#2C2010",
                        marginBottom: "12px",
                      }}
                    >
                      The rocket they are building around Agnilet is called{" "}
                      <strong>Agnibaan</strong> — 18 metres tall, two-stage,
                      capable of placing 100 kg into a 700 km orbit. It is
                      the sweet spot for the booming small-satellite market.
                    </p>
                  </div>
                </div>

                {/* Milestone banner */}
                <div
                  style={{
                    background: "#1a2744",
                    color: "#c8d8f0",
                    margin: "24px 0",
                    padding: "20px 24px",
                    border: "1px solid #2d3f6b",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "system-ui,sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#8aa5d8",
                      marginBottom: "8px",
                    }}
                  >
                    World First · May 30, 2024
                  </p>
                  <p
                    className="pf"
                    style={{
                      fontSize: "clamp(1rem,1.4vw,1.15rem)",
                      fontWeight: 700,
                      color: "#e2ecff",
                      marginBottom: "4px",
                    }}
                  >
                    Agnibaan SOrTeD — India's Most Historic Private Space Launch
                  </p>
                  <p
                    style={{
                      fontFamily: "'Georgia',serif",
                      fontSize: "0.88rem",
                      color: "#8aa5d8",
                    }}
                  >
                    World's first flight with a single-piece 3D-printed engine ·
                    India's first semi-cryo engine launch · India's first
                    private launchpad launch
                  </p>
                </div>

                {/* Section 3 */}
                <h2
                  className="pf"
                  style={{
                    fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                    fontWeight: 700,
                    color: "#1A1208",
                    marginTop: "28px",
                    marginBottom: "12px",
                    paddingBottom: "8px",
                    borderBottom: "1.5px solid #1a2744",
                  }}
                >
                  Four Failures Before the Flight
                </h2>

                <div className="newspaper-cols" style={{ marginBottom: "28px" }}>
                  <div>
                    <p
                      style={{
                        fontSize: "clamp(12px,1.2vw,13.5px)",
                        lineHeight: 1.88,
                        color: "#2C2010",
                        marginBottom: "12px",
                      }}
                    >
                      Before the breakthrough May 30 launch, Agnikul endured{" "}
                      <strong>four failed launch attempts</strong>. Each abort
                      was public. Each one tested founder resolve and investor
                      confidence in equal measure.
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "clamp(12px,1.2vw,13.5px)",
                        lineHeight: 1.88,
                        color: "#2C2010",
                        marginBottom: "12px",
                      }}
                    >
                      When Agnibaan SOrTeD finally rose from India's first
                      private launchpad, it carried more than a test vehicle.
                      It carried proof that India's private space era had
                      truly arrived — built by a team with no billionaire
                      backer and no margin for error.
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "clamp(12px,1.2vw,13.5px)",
                        lineHeight: 1.88,
                        color: "#2C2010",
                        marginBottom: "12px",
                      }}
                    >
                      "It is still surreal," Ravichandran admitted afterward.
                      "I sometimes play the video at night, and it still
                      doesn't feel like it actually happened, even though it
                      did."
                    </p>
                  </div>
                </div>

                {/* Pull quote 2 */}
                <div
                  style={{
                    margin: "28px 0",
                    padding: "20px 24px 20px 28px",
                    borderLeft: "4px solid #1a2744",
                    borderRight: "1px solid #C8C2B4",
                    background: "#EDE8DC",
                  }}
                >
                  <blockquote
                    className="pf"
                    style={{
                      fontStyle: "italic",
                      fontSize: "clamp(1rem, 1.5vw, 1.18rem)",
                      lineHeight: 1.55,
                      color: "#1A1208",
                    }}
                  >
                    "We have consistently designed our vehicles to ensure that
                    affordability and flexibility are never afterthoughts —
                    they are built in from day one."
                  </blockquote>
                  <cite
                    style={{
                      display: "block",
                      marginTop: "10px",
                      fontFamily: "system-ui,sans-serif",
                      fontSize: "0.7rem",
                      fontStyle: "normal",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: "#6b6560",
                    }}
                  >
                    — Srinath Ravichandran, after the Agnibaan SOrTeD launch
                  </cite>
                </div>

                {/* Section 4 */}
                <h2
                  className="pf"
                  style={{
                    fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                    fontWeight: 700,
                    color: "#1A1208",
                    marginTop: "28px",
                    marginBottom: "12px",
                    paddingBottom: "8px",
                    borderBottom: "1.5px solid #1a2744",
                  }}
                >
                  Building India's Rocket Factory
                </h2>

                <div className="newspaper-cols" style={{ marginBottom: "28px" }}>
                  <div>
                    <p
                      style={{
                        fontSize: "clamp(12px,1.2vw,13.5px)",
                        lineHeight: 1.88,
                        color: "#2C2010",
                        marginBottom: "12px",
                      }}
                    >
                      Post-launch, the Tamil Nadu government allocated{" "}
                      <strong>350 acres</strong> for an integrated space campus
                      — end-to-end manufacturing and testing that will anchor
                      India's private launch infrastructure in the south.
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "clamp(12px,1.2vw,13.5px)",
                        lineHeight: 1.88,
                        color: "#2C2010",
                        marginBottom: "12px",
                      }}
                    >
                      The company launched a new Large Format Metal Additive
                      Manufacturing Unit to extend 3D printing beyond engines —
                      to pumps, structures, and propulsion sub-systems. A
                      reusability patent was also granted for extending upper
                      stage operational life.
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "clamp(12px,1.2vw,13.5px)",
                        lineHeight: 1.88,
                        color: "#2C2010",
                        marginBottom: "12px",
                      }}
                    >
                      In November 2025, Agnikul closed a{" "}
                      <strong>₹150 crore Series C</strong> at a{" "}
                      <strong>$500 million valuation</strong>. Total capital
                      raised: $72.8M across 10 rounds. Customers now span
                      India, the Middle East, and Australia.
                    </p>
                  </div>
                </div>

                {/* ── TIMELINE ── */}
                <div
                  style={{
                    margin: "28px 0",
                    borderTop: "2px solid #1A1208",
                    borderBottom: "1px solid #C8C2B4",
                    padding: "20px 0",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "system-ui,sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#6b6560",
                      marginBottom: "16px",
                    }}
                  >
                    Company Timeline
                  </p>
                  {TIMELINE.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "72px 1fr",
                        gap: "16px",
                        padding: "12px 0",
                        borderBottom:
                          i < TIMELINE.length - 1
                            ? "1px dotted #C8C2B4"
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "system-ui,sans-serif",
                          fontSize: "0.76rem",
                          fontWeight: 700,
                          color: "#8b2e12",
                          paddingTop: "2px",
                        }}
                      >
                        {item.year}
                      </div>
                      <div>
                        <strong
                          style={{
                            display: "block",
                            fontFamily: "system-ui,sans-serif",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            color: "#1A1208",
                            marginBottom: "3px",
                          }}
                        >
                          {item.title}
                        </strong>
                        <p
                          style={{
                            fontFamily: "'Georgia',serif",
                            fontSize: "0.92rem",
                            color: "#3a3632",
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Lesson box */}
                <div
                  style={{
                    margin: "28px 0",
                    padding: "20px 24px",
                    background: "#1A1208",
                    color: "#EDE8DC",
                    borderLeft: "4px solid #b8922a",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "system-ui,sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#b8922a",
                      marginBottom: "10px",
                    }}
                  >
                    The Lesson
                  </p>
                  <p
                    className="pf"
                    style={{
                      fontStyle: "italic",
                      fontSize: "clamp(1rem,1.4vw,1.1rem)",
                      lineHeight: 1.55,
                      color: "#e8e2d8",
                    }}
                  >
                    In the new space economy, the advantage goes to whoever can
                    manufacture fastest, iterate hardest, and launch from
                    anywhere. Agnikul printed its way to the front of the queue
                    — one engine at a time.
                  </p>
                </div>

                {/* Ornament */}
                <div
                  style={{
                    textAlign: "center",
                    color: "#a09890",
                    fontSize: "1.1rem",
                    letterSpacing: "0.5em",
                    margin: "24px 0",
                  }}
                >
                  ✦ &nbsp; ✦ &nbsp; ✦
                </div>

                {/* ── FAQ ── */}
                <div
                  id="faq"
                  style={{
                    marginTop: "32px",
                    borderTop: "2px solid #1A1208",
                    paddingTop: "20px",
                  }}
                >
                  <h2
                    className="pf"
                    style={{
                      fontSize: "clamp(1.1rem,1.6vw,1.3rem)",
                      fontWeight: 700,
                      color: "#1A1208",
                      marginBottom: "20px",
                    }}
                  >
                    Frequently Asked Questions
                  </h2>

                  {FAQS.map((faq, i) => (
                    <div
                      key={i}
                      style={{
                        borderBottom: "1px solid #C8C2B4",
                        padding: "14px 0",
                      }}
                      itemScope
                      itemType="https://schema.org/Question"
                    >
                      <p
                        style={{
                          fontFamily: "system-ui,sans-serif",
                          fontSize: "0.88rem",
                          fontWeight: 600,
                          color: "#1A1208",
                          marginBottom: "8px",
                        }}
                        itemProp="name"
                      >
                        {faq.q}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Georgia',serif",
                          fontSize: "0.95rem",
                          color: "#3a3632",
                          lineHeight: 1.72,
                          margin: 0,
                        }}
                        itemScope
                        itemType="https://schema.org/Answer"
                        itemProp="acceptedAnswer"
                      >
                        <span itemProp="text">{faq.a}</span>
                      </p>
                    </div>
                  ))}
                </div>

              </div>
              {/* end articleBody */}
            </article>

            {/* ── RIGHT: SIDEBAR ── */}
            <aside
              className="hidden lg:block"
              aria-label="Agnikul Cosmos quick facts"
              style={{ borderLeft: "1px solid #C8C2B4" }}
              itemScope
              itemType="https://schema.org/Person"
            >
              <meta itemProp="name" content="Srinath Ravichandran" />
              <meta itemProp="jobTitle" content="Co-Founder & CEO" />
              <meta itemProp="worksFor" content="Agnikul Cosmos" />

              <div
                className="right-sticky"
                style={{
                  paddingLeft: "28px",
                  paddingTop: "0",
                  paddingBottom: "28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Founder card */}
                <div
                  style={{
                    border: "1px solid #C8C2B4",
                    background: "#EDE8DC",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "230px",
                      overflow: "hidden",
                      background: "#1a2744",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/Upforge-Agnikul.webp"
                      alt="Srinath Ravichandran, Co-Founder & CEO of Agnikul Cosmos"
                      width={340}
                      height={230}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center top",
                        display: "block",
                      }}
                      itemProp="image"
                    />
                  </div>
                  <div style={{ padding: "14px" }}>
                    <p
                      className="pf"
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "#1A1208",
                        marginBottom: "2px",
                      }}
                    >
                      Srinath Ravichandran
                    </p>
                    <p
                      style={{
                        fontFamily: "system-ui,sans-serif",
                        fontSize: "0.68rem",
                        color: "#6b6560",
                        marginBottom: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Co-Founder &amp; CEO · Agnikul Cosmos
                    </p>
                    <p
                      style={{
                        fontFamily: "'Georgia',serif",
                        fontSize: "0.86rem",
                        color: "#3a3632",
                        lineHeight: 1.6,
                        marginBottom: "14px",
                      }}
                    >
                      Former Wall Street trader turned rocket builder. Left
                      finance to co-found Agnikul at IIT Madras — to make
                      orbital launches as accessible as booking a cab.
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "7px",
                      }}
                    >
                      <a
                        href="https://agnikul.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="founder-link-btn"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontFamily: "system-ui,sans-serif",
                          fontSize: "0.72rem",
                          fontWeight: 500,
                          color: "#3a3632",
                          textDecoration: "none",
                          padding: "7px 10px",
                          border: "1px solid #C8C2B4",
                          borderRadius: "2px",
                          background: "#F3EFE5",
                          transition: "all 0.18s",
                        }}
                      >
                        <ExternalLink size={13} />
                        agnikul.in — Official Website
                      </a>
                      <a
                        href="https://www.linkedin.com/company/agnikul-cosmos/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="founder-link-btn"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontFamily: "system-ui,sans-serif",
                          fontSize: "0.72rem",
                          fontWeight: 500,
                          color: "#3a3632",
                          textDecoration: "none",
                          padding: "7px 10px",
                          border: "1px solid #C8C2B4",
                          borderRadius: "2px",
                          background: "#F3EFE5",
                          transition: "all 0.18s",
                        }}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                        LinkedIn — Agnikul Cosmos
                      </a>
                    </div>
                  </div>
                </div>

                {/* By the Numbers */}
                <div
                  style={{
                    border: "2px solid #1A1208",
                    background: "#EDE8DC",
                    overflow: "hidden",
                  }}
                  role="region"
                  aria-label="Key metrics"
                >
                  <div
                    style={{
                      background: "#1A1208",
                      padding: "8px 14px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "system-ui,sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "white",
                        margin: 0,
                      }}
                    >
                      By the Numbers
                    </p>
                  </div>
                  <dl
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                    }}
                  >
                    {STATS.map((s, si) => (
                      <div
                        key={si}
                        style={{
                          padding: "10px 12px",
                          borderRight:
                            si % 2 === 0 ? "1px solid #D8D2C4" : "none",
                          borderBottom:
                            si < STATS.length - 2
                              ? "1px solid #D8D2C4"
                              : "none",
                        }}
                      >
                        <dt
                          style={{
                            fontFamily: "system-ui,sans-serif",
                            fontSize: "0.62rem",
                            color: "#9e9993",
                            textTransform: "uppercase",
                            letterSpacing: "0.14em",
                            marginBottom: "3px",
                          }}
                        >
                          {s.l}
                        </dt>
                        <dd
                          className="pf"
                          style={{
                            fontSize: "clamp(0.95rem,1.1vw,1.1rem)",
                            fontWeight: 900,
                            color:
                              si === 0
                                ? "#8b2e12"
                                : si === 4 || si === 5
                                ? "#1a2744"
                                : "#1A1208",
                            lineHeight: 1,
                            margin: 0,
                          }}
                        >
                          {s.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Investors */}
                <div
                  style={{
                    border: "1px solid #C8C2B4",
                    background: "#EDE8DC",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{ background: "#1A1208", padding: "8px 14px" }}
                  >
                    <p
                      style={{
                        fontFamily: "system-ui,sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "white",
                        margin: 0,
                      }}
                    >
                      Key Investors
                    </p>
                  </div>
                  <ul style={{ listStyle: "none", padding: "8px 14px", margin: 0 }}>
                    {INVESTORS.map((inv, i) => (
                      <li
                        key={i}
                        style={{
                          fontFamily: "system-ui,sans-serif",
                          fontSize: "0.78rem",
                          color: "#3a3632",
                          padding: "6px 0",
                          borderBottom:
                            i < INVESTORS.length - 1
                              ? "1px dotted #C8C2B4"
                              : "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "7px",
                        }}
                      >
                        <span style={{ color: "#8b2e12", fontWeight: 700 }}>›</span>
                        {inv}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div
                  style={{
                    border: "1px solid #C8C2B4",
                    background: "#EDE8DC",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{ background: "#1A1208", padding: "8px 14px" }}
                  >
                    <p
                      style={{
                        fontFamily: "system-ui,sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "white",
                        margin: 0,
                      }}
                    >
                      Filed Under
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      padding: "12px 14px",
                    }}
                  >
                    {[
                      { l: "Spacetech", h: "/spacetech-startups" },
                      { l: "Deep Tech", h: "/deep-tech-startups" },
                      { l: "IIT Madras", h: "/startup" },
                      { l: "3D Printing", h: "/startup" },
                      { l: "Chennai", h: "/startup" },
                      { l: "Private Launch", h: "/startup" },
                      { l: "Series C", h: "/startup" },
                      { l: "Aerospace", h: "/startup" },
                    ].map((tag) => (
                      <Link
                        key={tag.l}
                        href={tag.h}
                        className="tag-hover"
                        style={{
                          fontFamily: "system-ui,sans-serif",
                          fontSize: "0.63rem",
                          fontWeight: 500,
                          letterSpacing: "0.06em",
                          padding: "4px 9px",
                          border: "1px solid #a09890",
                          color: "#3a3632",
                          textDecoration: "none",
                          borderRadius: "2px",
                          transition: "all 0.15s",
                        }}
                      >
                        {tag.l}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Related */}
                <div
                  style={{
                    border: "1px solid #C8C2B4",
                    background: "#EDE8DC",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{ background: "#1A1208", padding: "8px 14px" }}
                  >
                    <p
                      style={{
                        fontFamily: "system-ui,sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "white",
                        margin: 0,
                      }}
                    >
                      Also on UpForge
                    </p>
                  </div>
                  {RELATED.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/startup/${r.slug}`}
                      className="related-hover"
                      style={{
                        padding: "10px 14px",
                        borderBottom: "1px solid #C8C2B4",
                        textDecoration: "none",
                        display: "block",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "system-ui,sans-serif",
                          fontSize: "0.6rem",
                          fontWeight: 600,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#8b2e12",
                          marginBottom: "3px",
                        }}
                      >
                        {r.cat}
                      </p>
                      <p
                        className="pf related-title-text"
                        style={{
                          fontSize: "0.9rem",
                          color: "#1A1208",
                          lineHeight: 1.3,
                          transition: "color 0.15s",
                          margin: 0,
                        }}
                      >
                        {r.title}
                      </p>
                    </Link>
                  ))}
                </div>

              </div>
            </aside>
          </div>
        </div>

        {/* ══ CTA STRIP ══ */}
        <div
          style={{
            background: "#E2DCC F",
            borderTop: "2px solid #1A1208",
            borderBottom: "1px solid #C8C2B4",
          }}
        >
          <div
            className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8"
            style={{
              padding: "28px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3
                className="pf"
                style={{
                  fontSize: "clamp(1rem,1.5vw,1.2rem)",
                  fontWeight: 700,
                  color: "#1A1208",
                  marginBottom: "4px",
                }}
              >
                Building India's next deep-tech company?
              </h3>
              <p
                style={{
                  fontFamily: "'Georgia',serif",
                  fontSize: "0.9rem",
                  color: "#3a3632",
                }}
              >
                Get independently verified and indexed in India's most trusted
                startup registry. Free forever.
              </p>
            </div>
            <Link
              href="/submit"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#1A1208",
                color: "#F3EFE5",
                fontFamily: "system-ui,sans-serif",
                fontSize: "0.76rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "11px 24px",
                textDecoration: "none",
                borderRadius: "2px",
                whiteSpace: "nowrap",
              }}
              aria-label="List your Indian startup on UpForge for free"
            >
              List Your Startup — Free{" "}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* ══ EXPLORE GRID ══ */}
        <section
          className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8"
          style={{ padding: "32px 24px", borderBottom: "1px solid #C8C2B4" }}
          aria-label="Explore more on UpForge"
        >
          <p
            style={{
              fontFamily: "system-ui,sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6b6560",
              marginBottom: "16px",
            }}
          >
            Explore More on UpForge
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "8px",
            }}
          >
            {[
              {
                title: "Spacetech Startups India",
                sub: "Agnikul, Skyroot & the new wave",
                href: "/spacetech-startups",
              },
              {
                title: "Deep Tech Startups",
                sub: "India's frontier technology builders",
                href: "/deep-tech-startups",
              },
              {
                title: "Top AI Startups India 2026",
                sub: "Sarvam, Krutrim & more",
                href: "/top-ai-startups",
              },
              {
                title: "Indian Unicorns List",
                sub: "All 126 verified unicorns",
                href: "/indian-unicorns",
              },
              {
                title: "Fintech Startups India",
                sub: "Zerodha, CRED, Paytm",
                href: "/fintech-startups",
              },
              {
                title: "Full Startup Registry",
                sub: "Browse all verified startups",
                href: "/startup",
              },
              {
                title: "Funding Tracker",
                sub: "Latest rounds & investors",
                href: "/top-funded-startups",
              },
              {
                title: "Submit Your Startup",
                sub: "Get listed free on UpForge",
                href: "/submit",
              },
            ].map((lnk) => (
              <Link
                key={lnk.href + lnk.title}
                href={lnk.href}
                style={{
                  fontFamily: "system-ui,sans-serif",
                  fontSize: "0.76rem",
                  color: "#3a3632",
                  textDecoration: "none",
                  padding: "10px 12px",
                  border: "1px solid #C8C2B4",
                  borderRadius: "2px",
                  background: "#EDE8DC",
                  display: "block",
                  transition: "all 0.15s",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    color: "#1A1208",
                    marginBottom: "2px",
                  }}
                >
                  {lnk.title}
                </strong>
                <span style={{ fontSize: "0.72rem", color: "#9e9993" }}>
                  {lnk.sub}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer
          role="contentinfo"
          style={{ background: "#1A1208", color: "#a09890", padding: "32px 24px 20px" }}
        >
          <div className="max-w-[1300px] mx-auto">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "28px",
                paddingBottom: "24px",
                borderBottom: "1px solid #2a2018",
                marginBottom: "20px",
              }}
            >
              <div>
                <p
                  className="pf"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#F3EFE5",
                    marginBottom: "6px",
                  }}
                >
                  UpForge
                </p>
                <p
                  style={{
                    fontFamily: "'Georgia',serif",
                    fontSize: "0.82rem",
                    color: "#6b6560",
                    lineHeight: 1.6,
                    marginBottom: "12px",
                  }}
                >
                  India's independent startup intelligence platform — tracking
                  emerging companies, founder insights, and ecosystem trends.
                </p>
              </div>
              {[
                {
                  title: "Platform",
                  links: [
                    { l: "Startup Registry", h: "/startup" },
                    { l: "Reports", h: "/reports" },
                    { l: "Indian Unicorns", h: "/indian-unicorns" },
                    { l: "Funding Tracker", h: "/top-funded-startups" },
                  ],
                },
                {
                  title: "Resources",
                  links: [
                    { l: "Founder Stories", h: "/founder-stories" },
                    { l: "Journal", h: "/blog" },
                    { l: "Newsletter", h: "/newsletter" },
                    { l: "Submit Startup", h: "/submit" },
                  ],
                },
                {
                  title: "Company",
                  links: [
                    { l: "About", h: "/about" },
                    { l: "Contact", h: "/contact" },
                    { l: "Careers", h: "/careers" },
                    { l: "Privacy", h: "/privacy" },
                    { l: "Terms", h: "/terms" },
                  ],
                },
              ].map((col) => (
                <div key={col.title}>
                  <p
                    style={{
                      fontFamily: "system-ui,sans-serif",
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#EDE8DC",
                      marginBottom: "10px",
                    }}
                  >
                    {col.title}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {col.links.map((lnk) => (
                      <li key={lnk.h} style={{ marginBottom: "6px" }}>
                        <Link
                          href={lnk.h}
                          style={{
                            fontFamily: "system-ui,sans-serif",
                            fontSize: "0.74rem",
                            color: "#6b6560",
                            textDecoration: "none",
                          }}
                        >
                          {lnk.l}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <p
                style={{
                  fontFamily: "system-ui,sans-serif",
                  fontSize: "0.66rem",
                  color: "#4a4038",
                }}
              >
                © 2026 UpForge · Independent Startup Intelligence Platform ·
                Verified Data · Updated Daily
              </p>
              <nav aria-label="Footer SEO links">
                <ul
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {[
                    { l: "Indian Spacetech Startups", h: "/spacetech-startups" },
                    { l: "Startup Registry India", h: "/startup" },
                    { l: "Indian Unicorns 2026", h: "/indian-unicorns" },
                    { l: "Deep Tech India", h: "/deep-tech-startups" },
                  ].map((lnk) => (
                    <li key={lnk.h}>
                      <Link
                        href={lnk.h}
                        style={{
                          fontFamily: "system-ui,sans-serif",
                          fontSize: "0.63rem",
                          color: "#4a4038",
                          textDecoration: "none",
                        }}
                      >
                        {lnk.l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <p
              style={{
                fontFamily: "system-ui,sans-serif",
                fontSize: "0.63rem",
                color: "#3a3028",
                lineHeight: 1.6,
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: "1px solid #2a2018",
              }}
            >
              * Data sourced from public filings, Wikipedia, Tracxn, Inc42,
              YourStory, and Agnikul Cosmos press releases as of March 2026.
              UpForge is an independent registry — no paid placements, no
              sponsored rankings. Funding figures and valuations are
              approximate and reflect latest available public data.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
