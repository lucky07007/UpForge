"use client"

// app/startup/ditto-insurance/page.tsx
// UpForge — Ditto Insurance · Shrehith Karkera, Pawan Kumar Rai, Bhanu Harish Gurram & Lokesh Gurram Founder Chronicle
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
      "@id": "https://upforge.in/startup/ditto-insurance#article",
      "headline": "Ditto Insurance — How IIM Ahmedabad Batchmates Who Skipped Placements Built India's Most Trusted Insurance Advisory Platform From a Financial Newsletter",
      "description": "Ditto Insurance founder story — IIM Ahmedabad batchmates Shrehith Karkera (NMAMIT B.E. Computer Science), Bhanu Harish Gurram, and Pawan Kumar Rai skipped campus placements in 2018, founded Finception, launched Finshots (500,000+ subscribers, India's leading 3-minute daily finance newsletter), and in February 2021 launched Ditto Insurance — India's first advisory-first, no-spam, no-upselling insurance platform. Zerodha/Rainmatter-backed with ₹4 crore seed investment. Lokesh Gurram (IIT Delhi) joined as fourth co-founder. ₹52.3 crore revenue FY24. Profitable. 1,055 employees as of August 2025. 201–500+ advisors. Partners: Max Life, HDFC Ergo, Bajaj Allianz, Bharti AXA. The startup that replaced spam calls with expert conversations — and turned insurance into something Indians actually want to buy.",
      "url": "https://upforge.in/startup/ditto-insurance",
      "datePublished": "2026-03-14T00:00:00+05:30",
      "dateModified": "2026-03-14T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.in/Upforge-ditto-insurance.webp",
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
          "name": "Shrehith Karkera",
          "jobTitle": "Co-Founder & CEO",
          "worksFor": { "@type": "Organization", "name": "Ditto Insurance" },
          "alumniOf": [
            { "@type": "CollegeOrUniversity", "name": "NMAM Institute of Technology (NITTE)" },
            { "@type": "CollegeOrUniversity", "name": "IIM Ahmedabad" }
          ],
          "description": "Shrehith Karkera is Co-Founder and CEO of Ditto Insurance and Finshots. He holds a B.E. in Computer Science from NMAM Institute of Technology (NITTE University) and an MBA in Marketing Strategy from IIM Ahmedabad. He previously taught part-time at coaching institutes (T.I.M.E. and Career Launcher) to fund Finshots' early growth, and handles content strategy and overall company leadership at Ditto.",
          "sameAs": ["https://www.linkedin.com/in/shrehith-karkera-257b0911b/"]
        },
        {
          "@type": "Person",
          "name": "Bhanu Harish Gurram",
          "jobTitle": "Co-Founder",
          "worksFor": { "@type": "Organization", "name": "Ditto Insurance" },
          "alumniOf": { "@type": "CollegeOrUniversity", "name": "IIM Ahmedabad" },
          "description": "Bhanu Harish Gurram is Co-Founder of Ditto Insurance and Finshots. An IIM Ahmedabad graduate, he received a pre-placement offer from Amazon during his summer internship but chose to start Finception with his batchmates. He leads business strategy, marketing, and operations at Ditto. His personal experience being hospitalised for 15 days reinforced his conviction in the advisory-first insurance model — a proper policy would have saved him from near-bankruptcy.",
          "sameAs": ["https://www.linkedin.com/company/ditto-insurance/"]
        },
        {
          "@type": "Person",
          "name": "Pawan Kumar Rai",
          "jobTitle": "Co-Founder & CEO (Finshots)",
          "worksFor": { "@type": "Organization", "name": "Ditto Insurance" },
          "alumniOf": { "@type": "CollegeOrUniversity", "name": "IIM Ahmedabad" },
          "description": "Pawan Kumar Rai is Co-Founder of Ditto Insurance and Finshots. An IIM Ahmedabad MBA graduate, he previously worked at Trident Group India as a Manager before the entrepreneurial path. He is focused on editorial strategy and the wider Finshots content ecosystem.",
          "sameAs": ["https://www.linkedin.com/in/pawan-kumar-rai-2a437a61/"]
        },
        {
          "@type": "Person",
          "name": "Lokesh Gurram",
          "jobTitle": "Co-Founder (Product & Technology)",
          "worksFor": { "@type": "Organization", "name": "Ditto Insurance" },
          "alumniOf": { "@type": "CollegeOrUniversity", "name": "IIT Delhi" },
          "description": "Lokesh Gurram is Co-Founder of Ditto Insurance responsible for product and technology. An IIT Delhi graduate, he worked for Samsung in South Korea for two years before joining Finshots and Ditto. He joined as the fourth co-founder approximately six months after Ditto's launch. He manages the technology platform, advisor tooling, and product infrastructure at Ditto.",
          "sameAs": ["https://www.linkedin.com/company/ditto-insurance/"]
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "Ditto Insurance",
        "url": "https://joinditto.in",
        "legalName": "Tacterial Consulting Private Limited",
        "foundingDate": "2021",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "addressCountry": "IN"
        },
        "description": "Ditto Insurance (Tacterial Consulting Pvt. Ltd.) is India's leading advisory-first digital insurance platform, founded in February 2021 by the team behind Finshots — India's most popular financial newsletter with 500,000+ subscribers. Ditto connects users to expert insurance advisors for personalised guidance on term life and health insurance — with zero spam calls, zero upselling, and zero sales pressure. Backed by Zerodha and Rainmatter with a ₹4 crore seed investment and majority stake. Insurance partners include Max Life, HDFC Ergo, Bajaj Allianz, and Bharti AXA. Revenue: ₹52.3 crore FY24. Profitable. 1,055 employees as of August 2025 (90% YoY increase). Described by Nithin Kamath as 'already among the top insurance platforms in India.'",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 1000, "maxValue": 1100 },
        "sameAs": [
          "https://joinditto.in",
          "https://www.linkedin.com/company/ditto-insurance/"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "Fintech Startups India", "item": "https://upforge.in/fintech-startups" },
        { "@type": "ListItem", "position": 4, "name": "Ditto Insurance", "item": "https://upforge.in/startup/ditto-insurance" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who founded Ditto Insurance and what is the founding story?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ditto Insurance was co-founded in February 2021 by Shrehith Karkera (CEO, NMAMIT B.E. Computer Science + IIM Ahmedabad MBA), Bhanu Harish Gurram (IIM Ahmedabad, received Amazon PPO but chose entrepreneurship), and Pawan Kumar Rai (IIM Ahmedabad, ex-Trident Group Manager) — all IIM Ahmedabad batchmates who skipped campus placements to start Finception in 2018. Lokesh Gurram (IIT Delhi, ex-Samsung South Korea) joined as the fourth co-founder six months after Ditto's launch, managing product and technology. The founding insight: insurance in India was being sold through spam calls, mis-selling, and upselling savings products. The founders — already running Finshots, India's leading 3-minute finance newsletter with 500,000+ subscribers — decided to apply the same trust-building, education-first philosophy to insurance advisory."
          }
        },
        {
          "@type": "Question",
          "name": "What is Finshots and how does it relate to Ditto Insurance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Finshots is a free daily financial newsletter that delivers one story per day in three minutes, covering business news, company journeys, economic policy, and personal finance without jargon. Founded in 2019 after Finception (2018), Finshots grew to 500,000+ subscribers organically — without any advertising spending — making it one of India's most trusted financial content brands. In 2021, the team identified that their highly engaged, financially literate readers still struggled with one product category more than any other: insurance. They built Ditto as the monetisation of that trust — a platform where Finshots subscribers could speak to expert advisors and buy the right insurance without being sold the wrong one. Ditto is not just backed by Finshots — it was born from it."
          }
        },
        {
          "@type": "Question",
          "name": "How does Ditto Insurance's advisory model work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ditto's model is built around a team of trained human advisors who guide users through the insurance selection process — not to sell them a specific product, but to help them understand what they actually need and choose accordingly. Users book a free call, speak to an advisor who asks about their age, income, health status, family situation, and financial goals, and receive personalised recommendations for term life or health insurance. There are no spam calls, no follow-up pressure, no upselling of savings products, and no comparison of policies without context. After purchase, Ditto advisors remain accessible for post-policy service and claims assistance. The model is human-assisted digitally — the platform handles the transaction, the advisor handles the consultation. Ditto charges commission from insurers on policies sold, not fees from customers."
          }
        },
        {
          "@type": "Question",
          "name": "Is Ditto Insurance profitable and what is its revenue?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ditto Insurance is profitable — confirmed publicly by Nithin Kamath of Zerodha, who stated that Ditto has 'an insane amount of love from customers, tons of referrals, and is already among the top insurance platforms in India' and is generating robust profits. Annual revenue is ₹52.3 crore for FY2024 (fiscal year ending March 31, 2024). The company has 1,055 employees as of August 2025 — a 90% year-on-year increase in headcount, indicating strong revenue growth in FY2025 as well. Total funding raised remains the single ₹4 crore Rainmatter/Zerodha seed investment from 2021 — the company has not raised external equity since, operating profitably on its own revenue."
          }
        },
        {
          "@type": "Question",
          "name": "Why did Zerodha's Nithin Kamath invest in Ditto Insurance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nithin Kamath discovered Finshots through a video they made about Jet Airways' collapse — the quality of the explanation and the trust it demonstrated with the audience caught his attention. He invited the founders for a conversation, and Zerodha invested ₹4 crore from its Rainmatter fintech fund in 2021. Kamath framed Ditto as 'almost an experiment to see if an advisor-first platform works' — a test of whether the same philosophy that made Zerodha successful (doing right by the user) could work in insurance. It has. For Kamath, Ditto is also a proof of concept for what an advisor-first investment platform could look like in the future. His own quote: 'They've always done what's right for users from day 1, which is rare in the insurance space.'"
          }
        },
        {
          "@type": "Question",
          "name": "What insurance products does Ditto offer and which insurers does it partner with?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ditto offers term life insurance, health insurance, hospital treatment coverage, maternity coverage, and critical illness cover. Insurance insurer partners include Max Life Insurance (first partner, 2021), HDFC Ergo, Bajaj Allianz, and Bharti AXA. The platform is registered as an insurance broking entity (Ditto Insurance Broking Services LLP) regulated by the Insurance Regulatory and Development Authority of India (IRDAI). Ditto earns commission from insurers, not from users — maintaining the no-cost advisory promise to customers. The platform also offers free consultations for existing policyholders reviewing their coverage."
          }
        }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Revenue FY24", v: "₹52.3 Cr" },
  { l: "Founded", v: "2021" },
  { l: "HQ", v: "Bengaluru" },
  { l: "Employees", v: "1,055" },
  { l: "Newsletter", v: "500K+ Subs" },
  { l: "Profitable", v: "Yes" },
]

const TIMELINE = [
  {
    year: "2018 — Finception",
    event: "Shrehith Karkera, Bhanu Harish Gurram, and Pawan Kumar Rai — IIM Ahmedabad batchmates supported by the institute's IIMAvericks entrepreneurship fellowship — skip campus placements entirely. Bhanu had received a pre-placement offer from Amazon but turned it down. The three co-found Finception in 2018, publishing long-form explainers on complex financial topics. Shrehith teaches part-time at T.I.M.E. and Career Launcher coaching institutes so Finshots can hire more interns and survive the early days.",
  },
  {
    year: "Aug 2019 — Finshots Launch",
    event: "The team pivots from long-form to brevity. Finshots launches as a free 3-minute daily financial newsletter — one story per day, every morning, without jargon. Growth is entirely organic: zero advertising spend. A video about Jet Airways' collapse goes viral and catches the eye of Nithin Kamath, Zerodha's co-founder. Kamath invites the team for a conversation. 'It was the best meeting we had in the last one and a half years,' Bhanu said. Rainmatter (Zerodha's fintech fund) invests ₹4 crore seed funding.",
  },
  {
    year: "2020 — 500,000 Subscribers",
    event: "Finshots reaches 500,000 subscribers — organically, without a rupee spent on marketing. Every subscriber found the newsletter through word of mouth or organic social sharing. The team begins conducting an audience AMA on personal finance. Of 2,000 people who see the post, 600 write back asking for help with insurance specifically. The signal is unambiguous. Bhanu's own hospitalisation for 15 days — during which he realises his ₹70,000 medical bill would have bankrupted his family without insurance — crystallises the personal mission behind the next product.",
  },
  {
    year: "Feb 2021 — Ditto Insurance Launch",
    event: "After 8 months of research, Ditto Insurance launches in February 2021. The founding model: no spam calls, no upselling, no savings products disguised as insurance. Book a free call. Speak to a trained advisor. Understand what you need. Buy only what you need. Max Life Insurance partners as the first insurer. Zerodha acquires a majority stake. Lokesh Gurram — IIT Delhi graduate, ex-Samsung South Korea — joins as the fourth co-founder, leading product and technology.",
  },
  {
    year: "2022",
    event: "Ditto partners with HDFC Ergo, Bajaj Allianz, and Bharti AXA — expanding the range of health and term plans available through the platform. The advisory team scales past 30 trained advisors and continues growing. Ditto's model earns increasing media coverage: Economic Times, YourStory, Entrepreneur India. Nithin Kamath describes the advisor-first approach as an experiment he wants to replicate in investment and savings: 'Ditto is proof that doing right by the user from day one builds a stronger business.'",
  },
  {
    year: "2023–24",
    event: "Revenue reaches ₹52.3 crore in FY2024. Profitability confirmed. Ditto launches the Series A from Rainmatter — bringing total external funding to ₹4 crore + additional Zerodha group support. In April 2024, Ditto extends a remarkable offer: UPSC aspirants who cleared the interview but didn't make the final cut are invited to join Ditto's advisory team — recognising that disciplined, research-oriented individuals make excellent insurance advisors. The move goes viral and exemplifies Ditto's cultural distinctiveness.",
  },
  {
    year: "Aug 2025",
    event: "Ditto reaches 1,055 employees — a 90% year-on-year increase in headcount from August 2024, signalling strong FY2025 revenue growth on the path to significantly higher revenues. Nithin Kamath confirms Ditto is 'profitable, with tons of referrals, and already among the top insurance platforms in India.' The company continues operating without external VC funding beyond its original Rainmatter seed — a testament to the business model's unit economics. The Finshots newsletter continues to serve as the most powerful distribution channel for insurance education in India.",
  },
]

const COLS = [
  {
    h: "Three Friends Who Skipped Placements and Simplified Money",
    b: `The decision to skip campus placements at IIM Ahmedabad is not taken lightly. The placement season at India's most prestigious management school is a carefully orchestrated event with offers from McKinsey, Goldman, BCG, and every consumer goods company that understands how strong the talent coming out of Ahmedabad is. Shrehith Karkera, Bhanu Harish Gurram, and Pawan Kumar Rai looked at the placement season in 2018 and decided, collectively, that it was not for them.\n\n"The corporate nine-to-five grind wasn't for either of us," Shrehith said later. The IIMAvericks fellowship — IIM Ahmedabad's entrepreneurship support programme — gave the founding team a monthly stipend that made the leap possible. They launched Finception in 2018, writing long-form explainers about financial markets for a generation of Indians who wanted to understand the stock market but found every available resource either too technical or too patronising. Shrehith taught part-time at coaching institutes to keep the lights on while the newsletter found its audience.\n\nIn 2019, the format pivoted to Finshots — one story per day, three minutes to read, delivered every morning, free of charge, with no jargon. A video explaining Jet Airways' collapse went viral. Nithin Kamath of Zerodha watched it, called the founders in, and Rainmatter invested ₹4 crore. By 2020, Finshots had 500,000 subscribers — every one of them acquired without spending a rupee on advertising. The audience was the product. And the product — trust, built one clear explanation at a time — was about to be put to its hardest test yet.`,
  },
  {
    h: "The ₹70,000 Hospital Bill, the AMA and the Birth of Ditto",
    b: `Bhanu Harish Gurram's hospitalisation was not a business insight — it was a personal crisis. He spent 15 days in hospital. The bill was ₹70,000. He had insurance, which paid it. But the realisation of what that meant hit him with the force that only proximity to financial ruin can deliver: "If I didn't have the insurance back then, we would have been bankrupt and packed our bags and moved back."\n\nHis co-founders had been watching the same dynamic play out across their 500,000 Finshots readers. An AMA — Ask Me Anything — they posted on personal finance attracted 600 responses out of 2,000 who saw it. The overwhelming theme: insurance. People were confused about what they needed, scared of what they were being sold, and unable to find anyone who would help them understand without trying to sell them something at the same time.\n\nAfter eight months of research into insurance regulation, broker licencing, and product design, the team launched Ditto Insurance in February 2021. The model was a deliberate inversion of everything the insurance industry was doing. No spam calls. No upselling. No comparison theatre that reduced a life insurance policy to a price point. Instead: book a free consultation with a trained advisor. Be listened to. Receive a recommendation based on your actual situation. Buy only what you need. Zerodha and Rainmatter acquired a majority stake in the company. Max Life Insurance came on board as the first insurer partner. Lokesh Gurram — IIT Delhi, ex-Samsung South Korea — joined as the fourth co-founder to build the technology platform.\n\nNithin Kamath, Zerodha's co-founder and one of India's most trusted voices in personal finance, described Ditto as "almost an experiment to see if an advisor-first platform works." By 2021, the experiment had its first results. By FY2024, the revenue was ₹52.3 crore and the company was profitable.`,
  },
  {
    h: "The UPSC Offer, 1,055 Employees and India's Most Trusted Policy",
    b: `The Ditto Insurance story is easiest to misread as a fintech story. It is not. It is a trust story. The company's competitive advantage — the thing that Nithin Kamath means when he says Ditto has "an insane amount of love from customers, tons of referrals" — is not the technology, the product range, or the price. It is the conversation. The advisor who picks up the call without a script. The recommendation that comes without a commission motive. The follow-up that happens because the advisor genuinely wants to know if the policy worked out.\n\nThe April 2024 UPSC announcement illustrated the culture precisely. Ditto publicly invited candidates who had cleared the UPSC interview but hadn't made the final merit list to join its advisory team. The logic was stated plainly: these are people who have demonstrated the discipline to study for years, the research skills to master complex subjects, and the communication ability to explain them under pressure. Everything an insurance advisor needs. The offer went viral — and it attracted exactly the kind of advisor Ditto wanted to hire.\n\nBy August 2025, Ditto had 1,055 employees — a 90% year-on-year increase in headcount. The Finshots newsletter continues to deliver 500,000 readers per day who trust its editorial voice more than any advertiser's. Each of those readers is a potential Ditto customer who arrives already educated, already trusting, and already past the moment of confusion that makes insurance sales so difficult for everyone else. Three IIM Ahmedabad batchmates who skipped their placement season in 2018 have built something genuinely rare: a profitable financial services business where the customers refer their friends.`,
  },
]

const PULL_QUOTE = {
  text: "Primarily, insurance is sold — it has been pushed on people. So that's where we came in and said, maybe there's a place here because let's take away the spam calling, let's take away the upselling, let's take away the savings products disguised as protection. If you do what's right for the customer, the business follows.",
  by: "Shrehith Karkera, Co-Founder & CEO, Ditto Insurance (Economic Times, 2022)",
}

const LESSON =
  "A newsletter with 500,000 subscribers who trust you is worth more than a ₹50 crore marketing budget. Ditto's most powerful distribution channel is the daily financial newsletter that its founders started in 2019 and gave away for free. Trust, built one three-minute explanation at a time, converts into insurance policies at a cost-per-acquisition no competing platform can match. Build the audience before you build the product."

const INVESTORS = [
  "Rainmatter Capital / Zerodha (Seed ₹4 Crore, 2021, Majority Stake)",
  "Nithin Kamath — Zerodha Co-Founder (Strategic Mentor + Advocate)",
  "Rainmatter — Zerodha's Fintech Investment Platform",
]

const INSURER_PARTNERS = [
  "Max Life Insurance — Founding OEM Partner (2021)",
  "HDFC Ergo General Insurance",
  "Bajaj Allianz Life Insurance",
  "Bharti AXA Life Insurance",
  "IRDAI-Registered Broker (Ditto Insurance Broking Services LLP)",
]

const FAQS = [
  {
    q: "How is Ditto different from Policybazaar and InsuranceDekho?",
    a: "Policybazaar and InsuranceDekho are comparison platforms — they present multiple policy options side by side, typically ranked by premium, and earn commission when users purchase. Ditto is an advisory platform — it provides personalised consultation, understands the user's specific situation, and recommends what they actually need (which may be fewer or simpler products than a comparison engine would surface). Ditto explicitly does not upsell savings products disguised as insurance, does not make spam follow-up calls, and does not present ranked lists that bury important exclusions in fine print. The structural difference is that Ditto's advisor is incentivised to build a long-term relationship (referrals, renewals, claims assistance) rather than close a transaction.",
  },
  {
    q: "What is the IIMAvericks programme and how did it support Ditto's founding?",
    a: "IIMAvericks is the Indian Institute of Management Ahmedabad's entrepreneurship fellowship programme — it provides a monthly stipend and institutional support to students who choose to build a startup rather than accept a placement offer. Shrehith, Bhanu, and Pawan used the IIMAvericks fellowship to launch Finception in 2018 without the financial pressure that usually forces young founders back to employment within months. Without this programme, the three would likely have taken their Amazon, BCG, and consulting offers — and Finshots, and therefore Ditto, would not exist.",
  },
  {
    q: "Why did Ditto offer jobs to UPSC aspirants who didn't make the final cut?",
    a: "Ditto's April 2024 offer to UPSC aspirants who cleared the interview stage but missed the final merit list was a deliberate talent acquisition strategy. Ditto's advisory model requires advisors who can absorb complex regulatory and product information quickly, synthesise it for non-expert users, communicate clearly and patiently under pressure, and build trust in a single conversation. UPSC aspirants who have cleared the interview round have demonstrated every one of these qualities. The offer was not charity — it was a well-reasoned talent philosophy that went viral because it was simultaneously practical and human.",
  },
  {
    q: "What is Ditto's business model and how does it make money?",
    a: "Ditto earns commission from insurance companies when customers purchase policies through the platform — the standard insurance broker model regulated by IRDAI. Critically, Ditto charges nothing to the customer for the advisory consultation. The company's insight is that commission-based revenue is entirely compatible with customer-first advice as long as the advisor is trained to recommend based on need rather than commission rate, and the platform refuses to carry high-commission savings products. Revenue is ₹52.3 crore FY24, growing rapidly with the 90% YoY headcount increase indicating strong FY25 momentum. The company is profitable on this model alone, without external VC capital beyond the original ₹4 crore Rainmatter seed.",
  },
]

const RELATED = [
  { name: "BharatPe", slug: "bharatpe-fintech", cat: "Fintech / Payments", val: "$604M raised" },
  { name: "Darwinbox", slug: "darwinbox-hr", cat: "HR Tech / Enterprise SaaS", val: "$320M raised" },
  { name: "CARS24", slug: "cars24-auto", cat: "Auto Tech / Used Cars", val: "$1.08B raised" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function DittoInsurancePage() {
  const accent = "#0891b2"
  const accentDark = "#0e7490"
  const accentBg = "#ecfeff"
  const accentBorder = "#a5f3fc"

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
        Ditto Insurance Founder Story — Shrehith Karkera, Bhanu Gurram &amp; Pawan Rai | India's Advisory-First Insurance Platform | Zerodha-Backed | Profitable | UpForge
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
            { n: "Fintech Startups India", h: "/fintech-startups" },
            { n: "Ditto Insurance", h: "/startup/ditto-insurance" },
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
            UpForge · Startup Registry · InsurTech
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
            Edition · InsurTech
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span
            className="text-[9px] font-black uppercase tracking-wider"
            style={{ color: accent }}
          >
            Insurance Advisory · March 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">Bengaluru, Karnataka</span>
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
                INSURTECH / ADVISORY-FIRST
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">March 2026</span>
            </div>

            {/* Headline */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              Three IIM Ahmedabad batchmates who skipped placements, built a newsletter.{" "}
              <em style={{ color: accent }}>
                Then they built India's most trusted insurance platform — and Zerodha backed it.
              </em>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              In 2018, Shrehith Karkera, Bhanu Gurram, and Pawan Rai walked away from their IIM
              Ahmedabad placement season to simplify finance. By 2020, Finshots had 500,000
              subscribers — acquired without a single rupee in advertising. In 2021, they noticed
              those same subscribers were being spammed, mis-sold, and confused by insurance.
              They built Ditto to fix it: no spam calls, no upselling, just honest advice.
              Zerodha invested. Ditto turned profitable. And then they hired UPSC candidates.
            </p>

            {/* Byline */}
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}
            >
              {[
                "By UpForge Editorial",
                "Bengaluru, Karnataka",
                "Est. 2021",
                "India's Advisory-First Insurtech",
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
                src="/Upforge-ditto-insurance.webp"
                alt="Shrehith Karkera, Bhanu Harish Gurram, Pawan Kumar Rai and Lokesh Gurram — Co-Founders of Ditto Insurance — UpForge Founder Chronicle"
                className="w-full object-cover object-top"
                style={{ height: "min(300px,60vw)", display: "block" }}
                loading="eager"
              />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>
                  Shrehith Karkera, Bhanu Gurram &amp; Team
                </p>
                <p
                  className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  Co-Founders · Ditto Insurance
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
                  src="/Upforge-ditto-insurance.webp"
                  alt="Shrehith Karkera, Bhanu Harish Gurram, Pawan Kumar Rai and Lokesh Gurram — Co-Founders of Ditto Insurance — UpForge Founder Chronicle"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3.5"
                  style={{
                    background: "linear-gradient(to top, rgba(12,7,2,0.96) 60%, transparent)",
                  }}
                >
                  <p className="pf text-white font-bold" style={{ fontSize: 14 }}>
                    Shrehith Karkera, Bhanu Gurram &amp; Team
                  </p>
                  <p
                    className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Co-Founders · Ditto Insurance
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://joinditto.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: `1.5px solid ${accent}`, textDecoration: "none" }}
                  aria-label="Visit Ditto Insurance official website"
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
                      joinditto.in — Official Website
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/ditto-insurance/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View Ditto Insurance on LinkedIn"
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
                      LinkedIn — Ditto Insurance
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

              {/* Investor */}
              <div style={{ border: "1px solid #D8D2C4" }}>
                <div
                  className="px-4 py-2"
                  style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}
                >
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Investor &amp; Backer
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

              {/* Insurance Partners */}
              <div style={{ border: "1px solid #D8D2C4" }}>
                <div
                  className="px-4 py-2"
                  style={{ background: "#F9F7F2", borderBottom: "1px solid #D8D2C4" }}
                >
                  <p
                    className="text-[8px] font-black uppercase tracking-[0.24em] text-[#1A1208]"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Insurance Partners
                  </p>
                </div>
                <div className="px-4 py-3 space-y-1.5">
                  {INSURER_PARTNERS.map((p, i) => (
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
                      {p}
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
            Explore More Fintech &amp; InsurTech Startups on UpForge
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "Fintech Startups India 2026", h: "/fintech-startups" },
              { l: "Indian Unicorns Full List", h: "/indian-unicorns" },
              { l: "InsurTech Startups India", h: "/insurtech-startups-india" },
              { l: "IIM Ahmedabad Startups", h: "/iim-startups" },
              { l: "Zerodha Rainmatter Portfolio", h: "/rainmatter-portfolio" },
              { l: "IIT Delhi Startups", h: "/iit-startups" },
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
                Building India's next fintech company? Get verified on UpForge.
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
            * Data sourced from YourStory, Economic Times, FounderThesis, Zee Biz, BruTimes,
            CEOs of Bharat, EverybodyWiki, Tracxn, StartupTalky, MoneyManagement India, and
            Ditto Insurance press releases and public statements as of March 2026. UpForge is an
            independent registry — no paid placements, no sponsored rankings. Revenue figures
            are sourced from Tracxn and third-party filings. Employee data from LinkedIn/Tracxn.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "Fintech Startups India", h: "/fintech-startups" },
                { l: "Indian Unicorns", h: "/indian-unicorns" },
                { l: "Startup Registry", h: "/startup" },
                { l: "BharatPe Profile", h: "/startup/bharatpe-fintech" },
                { l: "Darwinbox Profile", h: "/startup/darwinbox-hr" },
                { l: "CARS24 Profile", h: "/startup/cars24-auto" },
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
