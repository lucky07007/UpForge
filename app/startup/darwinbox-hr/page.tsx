"use client"

// app/startup/darwinbox-hr/page.tsx
// UpForge — Darwinbox · Chaitanya Peddi, Jayant Paleti, Rohit Chennamaneni & Vineet Singh Founder Chronicle
// SEO: FAQPage ONLY in JSON-LD. Zero microdata on FAQ HTML = no duplicate error.
// SEO: mainEntity is a proper JSON array [].

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://upforge.in/startup/darwinbox-hr#article",
      "headline": "Darwinbox — How Chaitanya Peddi, Jayant Paleti & Rohit Chennamaneni Built India's First Global HCM Unicorn and Dethroned SAP, Oracle, and Workday in Asia",
      "description": "Darwinbox founder story — IIT Madras, IIM Lucknow, VIT, and XLRI alumni Jayant Paleti, Rohit Chennamaneni, Chaitanya Peddi, and Vineet Singh founded Darwinbox in Hyderabad in late 2015 with less than ₹30 lakh after consulting careers at McKinsey, EY, and Google. $320M raised from KKR, Partners Group, Microsoft, Salesforce Ventures, TCV, Lightspeed, and Peak XV. $1B+ valuation (unicorn January 2022). ₹534 crore FY25 revenue. 4 million employees. 1,000+ enterprises. 130 countries. India's only Asian-origin player on Gartner's Magic Quadrant for Cloud HCM. Gartner Customers' Choice for 4 consecutive years. First HCM platform to support Model Context Protocol. Challenger in Gartner MQ 2024 and 2025. Customers include Starbucks, Adidas, Nivea, JSW, Adani, Mahindra, Swiggy. The story of how three friends from Hyderabad replaced the world's most entrenched enterprise software from a coffee shop.",
      "url": "https://upforge.in/startup/darwinbox-hr",
      "datePublished": "2026-03-14T00:00:00+05:30",
      "dateModified": "2026-03-14T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.in/Upforge-darwinbox-hr.webp",
        "width": 1200,
        "height": 630
      },
      "publisher": {
        "@type": "Organization",
        "name": "UpForge",
        "url": "https://upforge.in",
        "logo": { "@type": "ImageObject", "url": "https://upforge.in/logo.png" }
      },
      "author": { "@type": "Organization", "name": "UpForge Editorial" },
      "about": [
        {
          "@type": "Person",
          "name": "Chaitanya Peddi",
          "jobTitle": "Co-Founder & CPO (Chief Product Officer)",
          "worksFor": { "@type": "Organization", "name": "Darwinbox" },
          "alumniOf": { "@type": "CollegeOrUniversity", "name": "XLRI Jamshedpur" },
          "description": "Chaitanya Peddi is Co-Founder and CPO of Darwinbox. He holds an MBA in Human Resources from XLRI Jamshedpur, one of India's premier management schools. He worked as an Analyst in Product Development at Verizon Communications, then as an HR Consultant and Business Advisory Services professional at Ernst & Young. His dual expertise in HR processes and technology product development made him Darwinbox's product architect.",
          "sameAs": ["https://www.linkedin.com/in/chaitanyapeddi/"]
        },
        {
          "@type": "Person",
          "name": "Jayant Paleti",
          "jobTitle": "Co-Founder & Head of Sales",
          "worksFor": { "@type": "Organization", "name": "Darwinbox" },
          "alumniOf": [
            { "@type": "CollegeOrUniversity", "name": "IIT Madras" },
            { "@type": "CollegeOrUniversity", "name": "IIM Lucknow" }
          ],
          "description": "Jayant Paleti is Co-Founder and Head of Sales at Darwinbox. He holds a B.Tech from IIT Madras and an MBA in Finance from IIM Lucknow. He worked as an Investment Banker at Ernst & Young, where he advised companies on mergers and acquisitions — an experience that revealed the catastrophic state of HR data in Indian enterprises and directly inspired Darwinbox.",
          "sameAs": ["https://www.linkedin.com/in/jayant-paleti/"]
        },
        {
          "@type": "Person",
          "name": "Rohit Chennamaneni",
          "jobTitle": "Co-Founder & Head of Operations",
          "worksFor": { "@type": "Organization", "name": "Darwinbox" },
          "alumniOf": [
            { "@type": "CollegeOrUniversity", "name": "Vellore Institute of Technology" },
            { "@type": "CollegeOrUniversity", "name": "IIM Lucknow" }
          ],
          "description": "Rohit Chennamaneni is Co-Founder and Head of Operations at Darwinbox. He is a Vellore Institute of Technology (VIT) graduate with an MBA from IIM Lucknow. He worked at Google (India and Ireland offices) before completing his MBA, then joined McKinsey & Company as an Engagement Manager in India, the US, and Africa — consulting organizations on digitisation and technology transformation. He handles operations, investment, customer success, and expansion strategy at Darwinbox.",
          "sameAs": ["https://www.linkedin.com/in/rohit-chennamaneni/"]
        },
        {
          "@type": "Person",
          "name": "Vineet Singh",
          "jobTitle": "Co-Founder & CTO",
          "worksFor": { "@type": "Organization", "name": "Darwinbox" },
          "description": "Vineet Singh is Co-Founder and CTO of Darwinbox, elevated to co-founder status in 2024 after years as the company's Chief Technology Officer. He oversees Darwinbox's engineering, AI platform, and technology architecture — including the Darwinbox Sense AI suite, LLM Gateway, and the first HCM implementation of Model Context Protocol.",
          "sameAs": ["https://www.linkedin.com/company/thedarwinbox/"]
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "Darwinbox",
        "url": "https://darwinbox.com",
        "legalName": "Darwinbox Digital Solutions Private Limited",
        "foundingDate": "2015",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "addressCountry": "IN"
        },
        "description": "Darwinbox is a global AI-powered Human Capital Management (HCM) platform founded in Hyderabad in 2015. It manages the full employee lifecycle — recruitment, onboarding, payroll, attendance, performance, engagement, talent management, and analytics — for 1,000+ enterprises and 4 million employees across 130 countries. India's only Asian-origin player featured on Gartner's Magic Quadrant for Cloud HCM Suites. Gartner Customers' Choice for 4 consecutive years. Named a Challenger in the Gartner Magic Quadrant 2024 and 2025. First HCM to support Model Context Protocol (MCP). Customers include Starbucks, Adidas, Zara, Nivea, Cigna, JSW, Adani, Mahindra, Swiggy, Bigbasket. Revenue: ₹534 crore FY25. Total funding: $320M+. Valuation: $1B+. Backed by KKR, Partners Group, Microsoft, Salesforce Ventures, TCV, Lightspeed, Peak XV, Teachers' Venture Growth.",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 1000, "maxValue": 1100 },
        "award": [
          "Gartner Magic Quadrant for Cloud HCM Suites — Youngest Asian HCM (2022–2025)",
          "Gartner Customers' Choice HCM — 4 Consecutive Years",
          "Gartner Magic Quadrant Challenger 2024 & 2025",
          "Gartner Magic Quadrant for Talent Acquisition Suites — Visionary 2025",
          "BusinessToday Coolest Company 2017"
        ],
        "sameAs": [
          "https://darwinbox.com",
          "https://www.linkedin.com/company/thedarwinbox/",
          "https://en.wikipedia.org/wiki/Darwinbox"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "SaaS Startups India", "item": "https://upforge.in/saas-startups-india" },
        { "@type": "ListItem", "position": 4, "name": "Darwinbox", "item": "https://upforge.in/startup/darwinbox-hr" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who founded Darwinbox and what is the founding story?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Darwinbox was founded in late 2015 in Hyderabad by Chaitanya Peddi (XLRI MBA, ex-Verizon product analyst, ex-EY HR consultant), Jayant Paleti (IIT Madras B.Tech, IIM Lucknow MBA, ex-EY investment banker), and Rohit Chennamaneni (VIT B.Tech, IIM Lucknow MBA, ex-Google, ex-McKinsey Engagement Manager). CTO Vineet Singh was elevated to Co-Founder in 2024. The founding insight came in November 2014 when Jayant, advising on a pharma merger, discovered that a major company had no reliable HR data — three different HR systems, contradictory attrition figures, and no way to value the most important asset in any organisation: its people. The three friends started meeting daily in a Hyderabad coffee shop, studying the HR tech market, and concluded that no existing product offered a comprehensive, integrated, mobile-first HR platform. They launched Darwinbox with less than ₹30 lakh in savings, without external funding, and acquired their first paying customer — Delhivery — before approaching investors."
          }
        },
        {
          "@type": "Question",
          "name": "How much has Darwinbox raised and what is its current valuation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Darwinbox has raised over $320 million in total funding across 12+ rounds. Key rounds include: Seed (Jul 2016, Endiya Partners + 3one4 Capital); Series A ($4M, 2018, Lightspeed India); Series B ($15M, 2019, Sequoia Capital India + Lightspeed); Series C ($30M, Jan 2021, Salesforce Ventures, SCB 10X, JGDEV); Series D ($72M, Jan 2022, TCV — unicorn round, $1B+ valuation); Series D extension ($7.5M, Sep 2022, SBI, Ontario Teachers'); Series E ($140M, Mar 2025, KKR + Partners Group); and a $40M follow-on from Teachers' Venture Growth / Ontario Teachers' Pension Plan (Aug 14, 2025). Microsoft invested at a separate strategic level. Total valuation: approximately $1 billion as of August 2025. Peak XV Partners (Sequoia India) earned a 10x return on their 2019 investment by the August 2025 TVG transaction."
          }
        },
        {
          "@type": "Question",
          "name": "What is Darwinbox's revenue and financial performance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Darwinbox reported ₹534 crore in annual revenue for FY2025 (fiscal year ending March 31, 2025). In FY2024, it grew 58% to ₹393 crore with international revenue growing 87% in a single year. International markets contributed over 50% of new ARR in FY24 — a pivotal shift from India-dominated operations. Net Revenue Retention (NRR) stands at 110%, with 25% of new revenue coming from existing customers expanding their Darwinbox usage. The company has been loss-making due to aggressive R&D and global expansion investment (46% of operating revenue deployed to R&D in FY24). Darwinbox targets surpassing $100 million in annual recurring revenue by December 2025, driven by US market traction — where it has grown 3X year-on-year since entering in 2022."
          }
        },
        {
          "@type": "Question",
          "name": "What makes Darwinbox different from SAP SuccessFactors, Workday, and Oracle HCM?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Darwinbox was built from 2015 with a mobile-first, consumer-grade experience — the opposite of SAP, Oracle, and Workday's desktop-era, configuration-heavy architecture. It offers a full-stack HCM covering the entire employee lifecycle from hire to retire, with deep configurability for complex Asian and Indian organisational structures (multi-entity, multi-currency, multiple labour laws), native AI integration through Darwinbox Sense, and a modern developer-friendly API ecosystem processing 100M+ API calls monthly through its Integration Studio. A third of Darwinbox's new customers are direct migrations from SAP and Oracle — enterprises that used legacy systems and switched. Darwinbox is also the first HCM to support Model Context Protocol (MCP), enabling AI agents to interact securely with HR workflows. It is the youngest and only Asian-origin player on Gartner's Magic Quadrant for Cloud HCM Suites."
          }
        },
        {
          "@type": "Question",
          "name": "What is Darwinbox's global presence and who are its enterprise customers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Darwinbox serves 1,000+ enterprises and 4 million employees across 130 countries from 11 offices in India, Singapore, Malaysia, Thailand, Philippines, Indonesia, UAE, Saudi Arabia, the US, UK, and Canada. In India, clients include JSW, Adani Group, Mahindra, Vedanta, Kotak Mahindra Bank, NSE, SBI General Insurance, TVS, Swiggy, Bigbasket, and Delhivery. International clients include Starbucks, Adidas, Zara, Cigna, WeWork, Nivea, China Bank (Philippines), EXL, and Virtusa. Southeast Asia is Darwinbox's second-largest market; MENA is third and growing fastest. North America has tripled year-on-year since 2022. In 2025, China Bank (Philippines) migrated from a legacy system to Darwinbox for its 10,000+ employees — a landmark enterprise win in Southeast Asia."
          }
        },
        {
          "@type": "Question",
          "name": "What is Darwinbox's AI platform and what is Darwinbox Super Agent?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Darwinbox's AI architecture includes Darwinbox Sense — a comprehensive AI and machine learning suite covering intelligent automation, conversational experiences, and smart HR insights. In 2025, Darwinbox launched Super Agent — an AI teammate that gives every employee a single interface to accomplish tasks across enterprise systems, from applying for leave via voice commands to finding career opportunities through semantic talent search. Darwinbox became the first HCM platform to implement Model Context Protocol (MCP), allowing customer-deployed AI agents to interact securely with HR workflows and data. The company also launched a proprietary LLM Gateway and Native Skills Ontology for intelligent talent matching. Agentic AI is now central to Darwinbox's product roadmap as it positions itself as the AI-first alternative to legacy HCM providers for the next decade."
          }
        }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Total Raised", v: "$320M+" },
  { l: "Valuation", v: "$1B+" },
  { l: "Founded", v: "2015" },
  { l: "Revenue FY25", v: "₹534 Cr" },
  { l: "Enterprises", v: "1,000+" },
  { l: "Countries", v: "130" },
]

const TIMELINE = [
  {
    year: "Nov 2014 — The Merger That Started Everything",
    event: "Jayant Paleti, an EY investment banker advising a Hyderabad pharma company on a global takeover, discovers the company has three different HR systems with contradictory data — no reliable attrition figures, no trustworthy people analytics, no single source of truth for its most important asset. He calls childhood friend Rohit Chennamaneni (McKinsey) and XLRI colleague Chaitanya Peddi (EY HR consulting). The three begin meeting at a Hyderabad coffee shop every day, studying the HR tech market and planning what they want to build.",
  },
  {
    year: "Late 2015 — Launch",
    event: "Darwinbox is founded in Hyderabad with less than ₹30 lakh in founder savings — a remarkably capital-light beginning for an enterprise SaaS company. Delhivery becomes the first paying customer, acquired before any institutional funding. The name is a deliberate pun on Darwin's theory of evolution: a platform to make organisations smarter through better people data. The founding model: SaaS, per-employee-per-month pricing, full-stack from recruitment to separation.",
  },
  {
    year: "Jul 2016 — Seed Round",
    event: "Seed funding raised from Endiya Partners (Hyderabad's leading early-stage VC, backed by Mohandas Pai and Sateesh Andra), 3one4 Capital, and StartupXseed Ventures. Endiya Partners — whose founders were among the most respected angel investors in Hyderabad — became Darwinbox's most vocal early backers. 'Having seasoned entrepreneurs believe in us and back our journey was the highlight,' Rohit said. First 50 enterprise clients onboarded.",
  },
  {
    year: "2017–19 — Series A and B",
    event: "Series A ($4M, 2018): Lightspeed India Partners leads. Series B ($15M, 2019): Sequoia Capital India leads, Lightspeed, 3one4, Endiya participate. With Delhivery, Bisleri, Swiggy, Paytm, and Bigbasket on the client list, Darwinbox is already serving India's fastest-growing consumer tech companies — the cohort that needed scalable HR infrastructure the most. Monthly coffee shop sessions have given way to a 100+ person team. International pilots in Southeast Asia begin.",
  },
  {
    year: "Jan 2021 — Series C and Salesforce",
    event: "$30M Series C led by Salesforce Ventures — the first major US strategic investor, validating Darwinbox's enterprise readiness. SCB 10X (the innovation arm of Siam Commercial Bank, Thailand) and JGDEV (Philippines) join, signalling Southeast Asia as the second theatre of growth. Darwinbox launches in Malaysia, Singapore, Philippines, Indonesia, and Thailand. 300% revenue growth in Southeast Asia in 12 months. Gartner Magic Quadrant recognition: the youngest and only Asian-origin HCM suite to be featured.",
  },
  {
    year: "Jan 2022 — Unicorn",
    event: "$72 million Series D led by TCV — the US investor behind Netflix, Spotify, Airbnb, and Facebook. Total funding crosses $110M. Valuation exceeds $1 billion. Darwinbox becomes India's 84th unicorn. 'We are excited to invest behind an outstanding team doing exactly that in a highly impactful HR technology space,' said Gopi Vaddi, General Partner at TCV. Darwinbox is serving 2.2 million employees across 650+ enterprises. A third of new customers are migrating from SAP and Oracle. IPO target announced for 2025.",
  },
  {
    year: "FY24 — 58% Revenue Growth",
    event: "₹393 crore revenue (FY24) — 58% YoY growth. International revenue grows 87%. International markets contribute 50%+ of new ARR. Microsoft partners with Darwinbox. Vineet Singh elevated to Co-Founder and CTO. Next-generation payroll framework (RIVeR) launched. R&D investment: 46% of operating revenue. Gartner Customers' Choice for 4th year. Named Challenger in Gartner Magic Quadrant for Cloud HCM Suites 2024. NRR: 110%.",
  },
  {
    year: "Mar–Aug 2025 — $180M in Five Months",
    event: "$140M Series E (March 2025) led by KKR and Partners Group. $40M follow-on from Teachers' Venture Growth / Ontario Teachers' Pension Plan (August 14, 2025). Total raised: $320M+. Valuation: ~$1B. Revenue FY25: ₹534 crore. 4 million employees. 1,000+ enterprises. First HCM to support Model Context Protocol. Super Agent — AI HR teammate — launched. 3X North America growth YoY. North American clients include Starbucks, Adidas, Zara, Cigna, WeWork, Nivea. The Hyderabad coffee shop from 2014 now runs HR for 130 countries.",
  },
]

const COLS = [
  {
    h: "The Pharma Merger, the Missing Data and the Coffee Shop",
    b: `In November 2014, Jayant Paleti was advising a Hyderabad pharma company on a global merger. The international acquirer wanted a picture of the company's people — headcount, attrition rate, grade structure, performance distribution. The pharma company had no coherent answer. Three different HR software systems were running simultaneously, each capturing different data, each contradicting the others. The attrition rate the founders had reported to the board was wrong. By how much, nobody knew.\n\nPaleti called his childhood friend Rohit Chennamaneni, who was then an Engagement Manager at McKinsey advising large organisations on digitisation in India, the US, and Africa after his years at Google. He also called Chaitanya Peddi — an HR consultant at EY who had previously built software at Verizon — his colleague from the same consulting world. He had one question: how had nothing been built to solve this?\n\nThe three had grown up in Guntur, Vijayawada, and Karimnagar — small cities in the Telugu districts of Andhra Pradesh and Telangana — before IIT Madras, IIM Lucknow, XLRI, and VIT took them to the top tier of Indian consulting and technology. They started meeting at a local Hyderabad restaurant every day — over many rounds of tea and coffee, as the founding lore goes — studying every HR product available in India and globally. They found what Jayant had already sensed: a massive gap between what enterprises needed and what existed. Not a module-by-module gap. A fundamental, architectural gap. What was lacking was a comprehensive, integrated, mobile-first product that could run the entire HR function — from the first job posting to the last exit interview — on a single platform. They decided to build it themselves.`,
  },
  {
    h: "Delhivery First, Then Salesforce, Then TCV and the Unicorn",
    b: `The discipline that defined Darwinbox's early years was uncommon in the Indian startup ecosystem of 2015–16: the founders acquired a paying customer — Delhivery, the fast-growing logistics unicorn — before approaching a single investor. "Our biggest trigger for fund-raising was to build credibility amongst clients that we are in it for the long run," Rohit said. The seed round from Endiya Partners and 3one4 Capital followed, backed by Mohandas Pai and Sateesh Andra — two of Hyderabad's most trusted institutional angels.\n\nThe Salesforce Ventures Series C in January 2021 was the hinge point. Salesforce — the world's largest CRM company — does not invest in direct competitors, but it does invest in enterprise platforms that make its customers' employees more productive. Its bet on Darwinbox was a validation that the product had crossed the quality threshold that global enterprise investors use to separate serious SaaS from Indian SaaS with aspirations. SCB 10X and the Philippines' JGDEV followed the same logic for Southeast Asia. 300% revenue growth in the region within 12 months of those investments.\n\nThe January 2022 unicorn round — $72 million from TCV, the US firm that backed Netflix, Spotify, and Airbnb — was a different signal entirely. TCV's Gopi Vaddi did not invest in Indian HR software because it was an attractive domestic market. He invested because Darwinbox had become the platform that Asia's most sophisticated enterprises — Adani, Mahindra, Vedanta, Swiggy, Bigbasket, and hundreds more — were using to replace SAP and Oracle. A third of Darwinbox's customers at the time of the unicorn round had migrated from established legacy players. That metric, more than any valuation, told the real story.`,
  },
  {
    h: "₹534 Crore, KKR, MCP and the US Bet",
    b: `The FY2025 revenue of ₹534 crore represents a company that has, in a decade, gone from three friends in a coffee shop to the operator of a global HR platform trusted by Starbucks, Adidas, Zara, Cigna, WeWork, and China Bank. The $140 million Series E from KKR and Partners Group in March 2025 — followed by $40 million from Ontario Teachers' Pension Plan's Teachers' Venture Growth in August 2025 — is the capital stack of a company preparing to win the $30 billion global HCM market.\n\nThe product decisions of 2024–25 reflect the ambition clearly. Darwinbox became the first HCM platform in the world to support Model Context Protocol — the emerging standard for AI agents to interact with enterprise systems — giving its customers the ability to connect their AI deployments directly to HR workflows. Darwinbox Sense, the company's AI suite, delivers conversational HR interactions, intelligent talent matching through a native skills ontology, and agentic automation across the full employee lifecycle. The Super Agent, launched in 2025, acts as a single AI interface for every HR task — from leave applications via voice to career development plans generated from real-time skills data.\n\nThe company has grown 3X year-on-year in North America since entering in 2022. Peak XV Partners (Sequoia India) earned a 10x return on their 2019 investment through the Teachers' Venture Growth transaction. Jayant Paleti said it most simply in August 2025: "The old guard of HCM vendors still falls short. Darwinbox exists to change that story — global by design, AI-first at the core." From a Hyderabad coffee shop where the tea was better than the SAP implementation, the change is already underway.`,
  },
]

const PULL_QUOTE = {
  text: "HR tech, when done right, can unlock outsized value for every enterprise, yet the old guard of HCM vendors still falls short of that leap. Darwinbox exists to change that story — building the next-gen HCM company, global by design, AI-first at the core, and relentlessly focused on customer outcomes.",
  by: "Jayant Paleti, Co-Founder, Darwinbox (August 2025)",
}

const LESSON =
  "The most durable enterprise SaaS companies earn their first customer before raising their first rupee. Darwinbox launched with Delhivery paying before any VC cheque arrived — a discipline that forced the product to earn its validation in the market, not the boardroom. The enterprise software market punishes products built for fundraising and rewards products built for users. Darwinbox was always built for the HR teams who had to use it every day."

const INVESTORS = [
  "KKR & Partners Group — Series E Lead ($140M, Mar 2025)",
  "Teachers' Venture Growth / Ontario Teachers' — $40M (Aug 2025)",
  "Microsoft — Strategic Investment (2024)",
  "TCV — Series D Lead ($72M, Jan 2022, Unicorn Round)",
  "Salesforce Ventures — Series C Lead ($30M, Jan 2021)",
  "Peak XV Partners / Sequoia India — Series B + Series D",
  "Lightspeed India Partners — Series A + multiple follow-ons",
  "3one4 Capital — Seed + multiple follow-ons",
  "Endiya Partners — Seed (First institutional investor, 2016)",
  "SCB 10X (Siam Commercial Bank) — Series C, Series D",
]

const RECOGNITIONS = [
  "Gartner Magic Quadrant — Youngest & Only Asian HCM (2022–25)",
  "Gartner Customers' Choice HCM — 4 Consecutive Years",
  "Gartner MQ Challenger 2024 & 2025 (Cloud HCM Suites)",
  "Gartner MQ Visionary 2025 (Talent Acquisition Suites)",
  "First HCM Platform to Support Model Context Protocol",
  "Forrester Recognised for AI Innovation in HCM",
  "BusinessToday Coolest Company 2017",
  "Inc42 Top HR Tech Startup India (Multiple Years)",
]

const FAQS = [
  {
    q: "Why did Darwinbox's founders start with less than ₹30 lakh and no VC funding?",
    a: "The founding team made a deliberate choice not to raise external capital before acquiring a paying customer. 'We wanted to validate our proposition with a paying client before bringing on investors,' Rohit Chennamaneni said. Their first breakthrough was Delhivery — a fast-growing logistics startup that became Darwinbox's first enterprise customer. This approach gave the founders real product feedback, a reference customer for investor conversations, and the discipline to build for users rather than for decks. The ₹30 lakh came from personal savings across the three founders.",
  },
  {
    q: "What is Darwinbox's pricing model and which company sizes does it serve?",
    a: "Darwinbox follows a SaaS subscription model — per-employee-per-month pricing that scales with the customer's headcount without large upfront licences or infrastructure costs. It primarily serves enterprises with 2,000 to 100,000+ employees, across manufacturing, BFSI, pharma, retail, technology, fast-growing startups, and government-linked organisations. The pay-as-you-go model was a deliberate departure from SAP and Oracle's upfront licence + customisation + implementation billing structure, which locked customers into multi-year contracts with high switching costs. Darwinbox's 110% NRR (net revenue retention) indicates that customers consistently expand their usage once on the platform.",
  },
  {
    q: "When will Darwinbox have an IPO?",
    a: "Darwinbox first announced an IPO target for 2025 at the time of its Series D round in January 2022. As of the August 2025 $40M TVG raise, no DRHP has been filed with SEBI. The $140M KKR + Partners Group round in March 2025 and the TVG follow-on in August 2025 suggest the company is building toward an IPO but prioritising revenue scale and US market penetration first. The company targets surpassing $100M ARR by December 2025. A Hyderabad or dual-listing (India + US) IPO is widely anticipated within 18–24 months of the KKR investment, based on investor portfolio timelines.",
  },
  {
    q: "How does Darwinbox handle India's complex payroll and labour law requirements?",
    a: "India's payroll complexity — 28 state-specific labour laws, multiple PF/ESI compliance requirements, income tax regimes, and diverse allowance structures — is one reason Western HCMs never fully penetrated the Indian market. Darwinbox was built from the ground up for this complexity. Its RIVeR payroll framework (launched 2024) enables 100% digital payroll processing with automated tax calculations, statutory filings, and multi-entity payroll management. The platform handles multi-currency payroll for international subsidiaries alongside Indian payroll in the same interface — a key capability for the conglomerates (Adani, Mahindra, JSW, Vedanta) that make up a significant portion of Darwinbox's India book.",
  },
]

const RELATED = [
  { name: "Bolna", slug: "bolna", cat: "AI / Voice Automation", val: "$6.92M raised" },
  { name: "CARS24", slug: "cars24-auto", cat: "Auto Tech / Used Cars", val: "$1.08B raised" },
  { name: "BharatPe", slug: "bharatpe-fintech", cat: "Fintech / Payments", val: "$604M raised" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function DarwinboxPage() {
  const accent = "#1d4ed8"
  const accentDark = "#1e3a8a"
  const accentBg = "#eff6ff"
  const accentBorder = "#bfdbfe"

  useEffect(() => {
    const existing = document.getElementById("page-jsonld")
    if (!existing) {
      const s = document.createElement("script")
      s.id = "page-jsonld"
      s.type = "application/ld+json"
      s.textContent = JSON.stringify(JSON_LD)
      document.head.appendChild(s)
    }
    return () => {
      document.getElementById("page-jsonld")?.remove()
    }
  }, [])

  return (
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
        .dropcap::first-letter {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 4em; font-weight: 900; line-height: 0.82;
          float: left; margin-right: 0.08em; margin-top: 0.06em; color: #1A1208;
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp .4s ease both; }
        @media (min-width:640px) {
          .ncols { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0; }
          .ncols > div { padding:0 1.5rem; border-right:1px solid #C8C2B4; }
          .ncols > div:first-child { padding-left:0; }
          .ncols > div:last-child { border-right:none; padding-right:0; }
        }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:#C8C2B4; }
      `}</style>

      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">
        Darwinbox Founder Story — Chaitanya Peddi, Jayant Paleti, Rohit Chennamaneni &amp; Vineet Singh | India's HCM Unicorn | $320M Raised | KKR-Backed | UpForge
      </h1>

      {/* ── BREADCRUMB ── */}
      <nav
        aria-label="Breadcrumb"
        className="px-4 sm:px-8 py-2"
        style={{
          background: "#EDE9DF",
          borderBottom: "1px solid #D8D2C4",
          fontFamily: "system-ui,sans-serif",
        }}
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-[9px] text-[#AAA] uppercase tracking-widest">
          {[
            { n: "UpForge", h: "/" },
            { n: "Startup Registry", h: "/startup" },
            { n: "SaaS Startups India", h: "/saas-startups-india" },
            { n: "Darwinbox", h: "/startup/darwinbox-hr" },
          ].map((b, i, arr) => (
            <li key={i} className="flex items-center gap-1.5">
              {i < arr.length - 1 ? (
                <Link href={b.h} className="hover:text-[#1A1208] transition-colors">
                  {b.n}
                </Link>
              ) : (
                <span className="text-[#1A1208] font-semibold">{b.n}</span>
              )}
              {i < arr.length - 1 && (
                <ChevronRight className="w-2.5 h-2.5 text-[#C8C2B4]" />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* ── MASTHEAD ── */}
      <header style={{ background: "#F3EFE5", borderBottom: "3px solid #1A1208" }}>
        <div
          className="text-center px-4 pt-3 pb-6"
          style={{ borderBottom: "1px solid #C8C2B4" }}
        >
          <p
            className="text-[8px] tracking-[0.44em] text-[#AAA] uppercase mb-2"
            style={{ fontFamily: "system-ui,sans-serif" }}
          >
            UpForge · Startup Registry · Enterprise SaaS
          </p>
          <p
            className="pf font-black leading-none text-[#1A1208]"
            style={{ fontSize: "clamp(2rem,5.5vw,4.2rem)" }}
          >
            The Founder Chronicle
          </p>
          <p className="italic mt-2 text-[#6B5C40]" style={{ fontSize: "clamp(12px,1.8vw,15px)" }}>
            India's independent startup registry — verified, editorial, March 2026
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-20 sm:w-36" style={{ background: "#C8C2B4" }} />
            <span style={{ color: "#C8C2B4", fontSize: 12 }}>✦</span>
            <div className="h-px w-20 sm:w-36" style={{ background: "#C8C2B4" }} />
          </div>
        </div>
        <div
          className="flex items-center px-4 sm:px-8 py-2 gap-4"
          style={{ fontFamily: "system-ui,sans-serif", borderBottom: "1px solid #C8C2B4" }}
        >
          <span className="text-[8px] text-[#AAA] uppercase tracking-widest flex-shrink-0">
            Edition · HR Tech / SaaS
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span
            className="text-[9px] font-black uppercase tracking-wider"
            style={{ color: accent }}
          >
            HCM &amp; Enterprise AI · March 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">Hyderabad, Telangana</span>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="fade-up max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div
          className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]"
          style={{ borderBottom: "2px solid #1A1208" }}
        >
          {/* ────── LEFT: EDITORIAL ────── */}
          <article className="py-8 lg:pr-8" style={{ borderRight: "1px solid #C8C2B4" }}>

            {/* Category tag */}
            <div className="flex items-center gap-3 mb-5" style={{ fontFamily: "system-ui,sans-serif" }}>
              <span
                className="text-[8.5px] font-black tracking-[0.28em] uppercase px-3 py-1.5 text-white"
                style={{ background: accent }}
              >
                HR TECH / ENTERPRISE SAAS / AI HCM
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">March 2026</span>
            </div>

            {/* Headline */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              Three IIT–IIM–XLRI friends. A pharma merger gone wrong. ₹30 lakh.{" "}
              <em style={{ color: accent }}>
                Now SAP and Oracle are on the back foot — and KKR just wrote a $140M cheque.
              </em>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              In November 2014, Jayant Paleti found a major Indian company with three different HR
              systems and no reliable people data. He called McKinsey's Rohit Chennamaneni and
              EY's Chaitanya Peddi. They spent a year in a Hyderabad coffee shop. In late 2015,
              they launched Darwinbox with less than ₹30 lakh and no investors. A decade later:
              $320M raised, ₹534 crore revenue, KKR and Microsoft on the cap table, and Asia's
              only HCM in the Gartner Magic Quadrant.
            </p>

            {/* Byline */}
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}
            >
              {[
                "By UpForge Editorial",
                "Hyderabad, Telangana",
                "Est. 2015",
                "India's Only Global HCM Unicorn",
              ].map((t, i, a) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="text-[9px] text-[#AAA] uppercase tracking-wider">{t}</span>
                  {i < a.length - 1 && (
                    <span className="text-[#C8C2B4] text-[10px]">·</span>
                  )}
                </span>
              ))}
            </div>

            {/* Mobile hero image */}
            <div className="lg:hidden mb-8">
              <img
                src="/Upforge-darwinbox-hr.webp"
                alt="Chaitanya Peddi, Jayant Paleti, and Rohit Chennamaneni — Co-Founders of Darwinbox — UpForge Founder Chronicle"
                className="w-full object-cover object-top"
                style={{ height: "min(300px,60vw)", display: "block" }}
                loading="eager"
              />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>
                  Chaitanya Peddi, Jayant Paleti &amp; Rohit Chennamaneni
                </p>
                <p
                  className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  Co-Founders · Darwinbox
                </p>
              </div>
            </div>

            {/* 3-col newspaper body */}
            <div className="ncols">
              {COLS.map((col, ci) => (
                <div key={ci} className="mb-6 sm:mb-0">
                  <h3
                    className="font-black uppercase tracking-[0.13em] mb-3 pb-1.5"
                    style={{
                      fontSize: 11,
                      color: "#1A1208",
                      borderBottom: `1.5px solid ${accent}`,
                      fontFamily: "system-ui,sans-serif",
                    }}
                  >
                    {col.h}
                  </h3>
                  {col.b.split("\n\n").map((p, pi) => (
                    <p
                      key={pi}
                      className={`leading-[1.9] mb-3 text-[#2C2010] ${
                        ci === 0 && pi === 0 ? "dropcap" : ""
                      }`}
                      style={{ fontSize: "clamp(12.5px,1.3vw,13.5px)" }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Pull quote */}
            <div
              className="mt-10 pt-6 pb-6 text-center"
              style={{
                borderTop: `3px double ${accent}`,
                borderBottom: "1px solid #C8C2B4",
              }}
            >
              <span
                style={{ display: "block", color: accentDark, fontSize: 24, marginBottom: 10 }}
              >
                ❝
              </span>
              <blockquote
                className="pf italic text-[#1A1208] leading-[1.7] max-w-2xl mx-auto px-4"
                style={{ fontSize: "clamp(16px,2.2vw,22px)" }}
              >
                "{PULL_QUOTE.text}"
              </blockquote>
              <p
                className="text-[9px] uppercase tracking-[0.24em] text-[#AAA] mt-4"
                style={{ fontFamily: "system-ui,sans-serif" }}
              >
                — {PULL_QUOTE.by}
              </p>
            </div>

            {/* Company Timeline */}
            <div className="mt-8">
              <p
                className="text-[8.5px] font-black uppercase tracking-[0.26em] mb-4"
                style={{
                  color: accent,
                  fontFamily: "system-ui,sans-serif",
                  borderBottom: `1px solid ${accentBorder}`,
                  paddingBottom: 8,
                }}
              >
                Company Timeline
              </p>
              <ol style={{ fontFamily: "system-ui,sans-serif" }}>
                {TIMELINE.map((t, i) => (
                  <li key={i} className="flex gap-4 mb-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: accent }}
                      />
                      {i < TIMELINE.length - 1 && (
                        <div
                          className="w-px flex-1 mt-1"
                          style={{ background: accentBorder, minHeight: 24 }}
                        />
                      )}
                    </div>
                    <div>
                      <span
                        className="text-[9px] font-black uppercase tracking-wider"
                        style={{ color: accent }}
                      >
                        {t.year}
                      </span>
                      <p className="text-[12px] text-[#2C2010] mt-0.5 leading-relaxed">
                        {t.event}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* FAQ — visual only, NO microdata */}
            <section className="mt-8">
              <p
                className="text-[8.5px] font-black uppercase tracking-[0.26em] mb-4"
                style={{
                  color: accent,
                  fontFamily: "system-ui,sans-serif",
                  borderBottom: `1px solid ${accentBorder}`,
                  paddingBottom: 8,
                }}
              >
                Frequently Asked Questions
              </p>
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="mb-4 pb-4"
                  style={{ borderBottom: "1px solid #D8D2C4" }}
                >
                  <h3
                    className="font-bold text-[#1A1208] mb-1.5"
                    style={{ fontSize: 13, fontFamily: "system-ui,sans-serif" }}
                  >
                    {faq.q}
                  </h3>
                  <p
                    className="text-[12.5px] text-[#5A4A30] leading-relaxed"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </section>
          </article>

          {/* ────── RIGHT: SIDEBAR ────── */}
          <aside className="hidden lg:block pl-8 pt-8 pb-8">
            <div className="sticky top-4 flex flex-col gap-5">

              {/* Founder image */}
              <div className="relative w-full overflow-hidden" style={{ height: 340 }}>
                <img
                  src="/Upforge-darwinbox-hr.webp"
                  alt="Chaitanya Peddi, Jayant Paleti, and Rohit Chennamaneni — Co-Founders of Darwinbox — UpForge Founder Chronicle"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3.5"
                  style={{
                    background: "linear-gradient(to top, rgba(12,7,2,0.96) 60%, transparent)",
                  }}
                >
                  <p className="pf text-white font-bold" style={{ fontSize: 13 }}>
                    Chaitanya Peddi, Jayant Paleti &amp; Rohit Chennamaneni
                  </p>
                  <p
                    className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Co-Founders · Darwinbox
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://darwinbox.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: `1.5px solid ${accent}`, textDecoration: "none" }}
                  aria-label="Visit Darwinbox official website"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={accent}
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: accent, fontFamily: "system-ui,sans-serif" }}
                    >
                      darwinbox.com — Official Website
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/thedarwinbox/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View Darwinbox on LinkedIn"
                >
                  <div className="flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#0077b5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: "#0077b5", fontFamily: "system-ui,sans-serif" }}
                    >
                      LinkedIn — Darwinbox
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "#0077b5" }} />
                </a>
              </div>

              {/* By the Numbers */}
              <div style={{ border: "2px solid #1A1208" }}>
                <div className="px-4 py-2.5" style={{ background: "#1A1208" }}>
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.3em] text-white"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    By the Numbers
                  </p>
                </div>
                <dl
                  className="grid grid-cols-2 divide-x divide-y"
                  style={{ borderColor: "#D8D2C4" }}
                >
                  {STATS.map((s, i) => (
                    <div key={i} className="px-4 py-3" style={{ borderColor: "#D8D2C4" }}>
                      <dt
                        className="text-[7.5px] text-[#AAA] uppercase tracking-[0.16em] mb-1"
                        style={{ fontFamily: "system-ui,sans-serif" }}
                      >
                        {s.l}
                      </dt>
                      <dd
                        className="pf font-black text-[#1A1208] leading-none"
                        style={{ fontSize: "1.25rem" }}
                      >
                        {s.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* The Lesson */}
              <div
                className="px-4 py-4"
                style={{ background: accentBg, border: `1px solid ${accentBorder}` }}
              >
                <p
                  className="text-[8px] font-black uppercase tracking-[0.26em] mb-2"
                  style={{ color: accent, fontFamily: "system-ui,sans-serif" }}
                >
                  The Lesson
                </p>
                <p className="italic text-[#1A1208] leading-[1.72]" style={{ fontSize: 13 }}>
                  {LESSON}
                </p>
              </div>

              {/* Key Investors */}
              <div style={{ border: "1px solid #D8D2C4" }}>
                <div
                  className="px-4 py-2"
                  style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}
                >
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Key Investors
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {INVESTORS.map((inv, i) => (
                    <p
                      key={i}
                      className="flex items-center gap-2 text-[11px] text-[#2C2010]"
                      style={{ fontFamily: "system-ui,sans-serif" }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 1,
                          background: accent,
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                      {inv}
                    </p>
                  ))}
                </div>
              </div>

              {/* Awards & Recognitions */}
              <div style={{ border: "1px solid #D8D2C4" }}>
                <div
                  className="px-4 py-2"
                  style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}
                >
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Awards &amp; Recognition
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {RECOGNITIONS.map((r, i) => (
                    <p
                      key={i}
                      className="flex items-center gap-2 text-[11px] text-[#2C2010]"
                      style={{ fontFamily: "system-ui,sans-serif" }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 1,
                          background: accent,
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                      {r}
                    </p>
                  ))}
                </div>
              </div>

              {/* Also Read */}
              <div>
                <p
                  className="text-[8px] font-black uppercase tracking-[0.26em] mb-3"
                  style={{ color: "#AAA", fontFamily: "system-ui,sans-serif" }}
                >
                  Also Read on UpForge
                </p>
                {RELATED.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/startup/${r.slug}`}
                    className="flex items-center justify-between py-2.5 hover:opacity-70 transition-opacity"
                    style={{ borderBottom: "1px solid #EDE9DF", textDecoration: "none" }}
                  >
                    <div>
                      <p
                        className="text-[11px] font-bold text-[#1A1208]"
                        style={{ fontFamily: "system-ui,sans-serif" }}
                      >
                        {r.name}
                      </p>
                      <p className="text-[9px] text-[#AAA] uppercase tracking-wider">
                        {r.cat} · {r.val}
                      </p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#AAA]" />
                  </Link>
                ))}
              </div>

            </div>
          </aside>
        </div>

        {/* ── SEO INTERNAL LINKS ── */}
        <section className="py-8" style={{ borderBottom: "1px solid #C8C2B4" }}>
          <p
            className="text-[9px] tracking-[0.3em] uppercase text-[#AAA] mb-4"
            style={{ fontFamily: "system-ui,sans-serif" }}
          >
            Explore More SaaS &amp; HR Tech Startups on UpForge
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "SaaS Startups India 2026", h: "/saas-startups-india" },
              { l: "Indian Unicorns Full List", h: "/indian-unicorns" },
              { l: "HR Tech Startups India", h: "/hr-tech-startups-india" },
              { l: "IIT Madras Startups", h: "/iit-startups" },
              { l: "Hyderabad Startups", h: "/hyderabad-startups" },
              { l: "Indian Startup IPO Pipeline 2026", h: "/indian-startup-ipo-2026" },
              { l: "Startup Registry India", h: "/startup" },
              { l: "Submit Your Startup", h: "/submit" },
            ].map((lnk) => (
              <Link
                key={lnk.h}
                href={lnk.h}
                className="flex items-center gap-1 p-3 hover:border-[#1A1208] transition-all"
                style={{
                  border: "1px solid #D8D2C4",
                  background: "white",
                  textDecoration: "none",
                }}
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-wider text-[#1A1208]"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  {lnk.l}
                </span>
                <ChevronRight className="w-2.5 h-2.5 text-[#AAA] flex-shrink-0 ml-auto" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="pt-8 pb-2">
          <div
            className="grid sm:grid-cols-2 gap-6 items-center pb-8"
            style={{ borderBottom: "1px solid #D8D2C4" }}
          >
            <div>
              <p className="pf font-bold text-[#1A1208] mb-2" style={{ fontSize: "1.2rem" }}>
                Building India's next SaaS unicorn? Get verified on UpForge.
              </p>
              <p className="text-[12px] text-[#6B5C40]" style={{ fontFamily: "system-ui,sans-serif" }}>
                Free startup profiles. Independent verification. Indexed by Google.
              </p>
            </div>
            <div className="flex sm:justify-end">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-bold uppercase tracking-wider hover:opacity-90"
                style={{
                  background: "#1A1208",
                  fontSize: 11,
                  fontFamily: "system-ui,sans-serif",
                  textDecoration: "none",
                }}
                aria-label="List your Indian startup on UpForge for free"
              >
                List Your Startup — Free <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <p
            className="text-[9px] leading-relaxed mt-4"
            style={{ color: "#BBB0A0", fontFamily: "system-ui,sans-serif" }}
          >
            * Data sourced from TechCrunch, Inc42, BusinessToday, YourStory, BusinessWire,
            Startup Story Media, Tracxn, Crunchbase, Ontario Teachers' Pension Plan press releases,
            Avendus Capital, Gartner Peer Insights, Darwinbox newsroom, and company filings as of
            March 2026. UpForge is an independent registry — no paid placements, no sponsored
            rankings. Revenue, valuation, and funding figures reflect latest available public data
            including company announcements and third-party data platforms.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "SaaS Startups India", h: "/saas-startups-india" },
                { l: "Indian Unicorns", h: "/indian-unicorns" },
                { l: "Startup Registry", h: "/startup" },
                { l: "Bolna Profile", h: "/startup/bolna" },
                { l: "CARS24 Profile", h: "/startup/cars24-auto" },
                { l: "BharatPe Profile", h: "/startup/bharatpe-fintech" },
                { l: "Submit Startup", h: "/submit" },
              ].map((lnk) => (
                <li key={lnk.h}>
                  <Link
                    href={lnk.h}
                    className="text-[9px] text-[#AAA] hover:text-[#1A1208] uppercase tracking-wider transition-colors"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    {lnk.l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </footer>
      </main>
    </div>
  )
}
