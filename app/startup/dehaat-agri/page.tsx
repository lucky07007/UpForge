"use client"

// app/startup/dehaat-agri/page.tsx
// UpForge — DeHaat · Shashank Kumar, Shyam Sundar Singh, Amrendra Singh, Adarsh Srivastava & Abhishek Dokania Founder Chronicle
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
      "@id": "https://upforge.in/startup/dehaat-agri#article",
      "headline": "DeHaat — How Shashank Kumar & IIT-IIM Team Built India's Largest End-to-End Agritech Platform From Bihar, Turned Profitable at ₹3,041 Crore Revenue",
      "description": "DeHaat founder story — IIT Delhi B.Tech (Textile Engineering, 2008) Shashank Kumar from Chhapra, Bihar — Forbes 30 Under 30, Ashoka Fellow, PM Champions of Change — co-founded Green Agrevolution Pvt. Ltd. (DeHaat) in 2012 in Patna with IIT Kharagpur alumni Shyam Sundar Singh (IIM Ahmedabad), Amrendra Singh (NIT Jamshedpur), Adarsh Srivastava (ISM Dhanbad), and Abhishek Dokania (IIPM). From ₹15 lakh bootstrapped in 2012 to $270M+ raised from Sofina, Temasek, Lightrock, Prosus, RTP Global, Omnivore, Sequoia India. 1.8 million farmers. 12 Indian states. 11,000+ DeHaat Centres. 503 FPOs. ₹3,041 crore revenue FY25. ₹369 crore profit FY25 — India's first major agritech company to turn profitable. $700–800M valuation. ₹200 crore venture debt from Trifecta Capital (April 2025). The most consequential farmer-first technology story in Indian agriculture.",
      "url": "https://upforge.in/startup/dehaat-agri",
      "datePublished": "2026-03-14T00:00:00+05:30",
      "dateModified": "2026-03-14T00:00:00+05:30",
      "inLanguage": "en-IN",
      "image": {
        "@type": "ImageObject",
        "url": "https://www.upforge.in/Upforge-dehaat-agri.webp",
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
          "name": "Shashank Kumar",
          "jobTitle": "Co-Founder & CEO",
          "worksFor": { "@type": "Organization", "name": "DeHaat" },
          "alumniOf": { "@type": "CollegeOrUniversity", "name": "IIT Delhi" },
          "description": "Shashank Kumar is Co-Founder and CEO of DeHaat (Green Agrevolution Pvt. Ltd.). He was born in Chhapra, Bihar, attended Netarhat Residential School, Jharkhand, and graduated with a B.Tech in Textile Technology from IIT Delhi in 2008. He worked as a supply chain consultant at Beacon Advisory Services for two and a half years before founding FarmsnFarmers Foundation in 2010 and co-founding Green Agrevolution in 2012. He is a Forbes 30 Under 30 Asia (2014), BWDisrupt 40 Under 40 (2018), Ashoka Fellow, Distinguished Alumnus of IIT Delhi (2017), and PM Champions of Change awardee.",
          "sameAs": ["https://in.linkedin.com/in/shashank-kumar-dehaat"]
        },
        {
          "@type": "Person",
          "name": "Shyam Sundar Singh",
          "jobTitle": "Co-Founder & Executive Director",
          "worksFor": { "@type": "Organization", "name": "DeHaat" },
          "alumniOf": [
            { "@type": "CollegeOrUniversity", "name": "IIT Kharagpur" },
            { "@type": "CollegeOrUniversity", "name": "IIM Ahmedabad" }
          ],
          "description": "Shyam Sundar Singh is Co-Founder and Executive Director of DeHaat. He holds a B.Tech from IIT Kharagpur (2004–2008) and an MBA from IIM Ahmedabad. He oversees strategic partnerships, geographic expansion, and stakeholder relationships at DeHaat.",
          "sameAs": ["https://www.linkedin.com/company/dehaat/"]
        },
        {
          "@type": "Person",
          "name": "Amrendra Singh",
          "jobTitle": "Co-Founder & Director",
          "worksFor": { "@type": "Organization", "name": "DeHaat" },
          "alumniOf": { "@type": "CollegeOrUniversity", "name": "NIT Jamshedpur" },
          "description": "Amrendra Singh is Co-Founder and Director of DeHaat. A computer engineer from NIT Jamshedpur, he focuses on building DeHaat's last-mile delivery network and operational infrastructure.",
          "sameAs": ["https://www.linkedin.com/company/dehaat/"]
        },
        {
          "@type": "Person",
          "name": "Adarsh Srivastava",
          "jobTitle": "Co-Founder",
          "worksFor": { "@type": "Organization", "name": "DeHaat" },
          "alumniOf": { "@type": "CollegeOrUniversity", "name": "ISM Dhanbad (IIT (ISM) Dhanbad)" },
          "description": "Adarsh Srivastava is Co-Founder of DeHaat. A mechanical engineer from ISM Dhanbad, he contributes to operational strategy and farmer engagement."
        },
        {
          "@type": "Person",
          "name": "Abhishek Dokania",
          "jobTitle": "Co-Founder & SVP Output",
          "worksFor": { "@type": "Organization", "name": "DeHaat" },
          "description": "Abhishek Dokania is Co-Founder and SVP Output at DeHaat. He leads the agri-output and market linkage vertical — connecting 1.8 million DeHaat farmers to 600+ bulk buyers including ITC, Godrej, Cargill, Reliance Fresh, and FMCG and e-commerce companies."
        }
      ],
      "mentions": {
        "@type": "Organization",
        "name": "DeHaat",
        "url": "https://agrevolution.in",
        "legalName": "Green Agrevolution Private Limited",
        "foundingDate": "2012",
        "foundingLocation": {
          "@type": "Place",
          "addressLocality": "Patna",
          "addressRegion": "Bihar",
          "addressCountry": "IN"
        },
        "description": "DeHaat (Green Agrevolution Pvt. Ltd.) is India's largest and most comprehensive end-to-end agritech platform, founded in 2012 in Patna. It connects 1.8 million smallholder farmers in 12 Indian states to agricultural inputs (3,200+ products), AI-powered crop advisory (30+ crops, regional languages), market linkages (600+ buyers), and financial services. The platform operates through 11,000+ rural DeHaat Centres run by local micro-entrepreneurs, 503 Farmer Producer Organisations, and a digital app with toll-free helpline. Revenue: ₹3,041 crore FY25. Profit: ₹369 crore FY25 — India's first major agritech to turn profitable. Valuation: $700–800M. Total funding: $270M+ from Sofina, Temasek, Lightrock India, Prosus Ventures, RTP Global, Omnivore Partners, Sequoia Capital India, FMO, AgFunder, and Trifecta Capital. Recognised by NASSCOM, Forbes, ET, Niti Aayog, and the Bill & Melinda Gates Foundation. Certified Great Place to Work 2022–23 and 2023–24.",
        "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 1500, "maxValue": 1700 },
        "award": [
          "Forbes 30 Under 30 Asia — Shashank Kumar (2014)",
          "PM Champions of Change — Niti Aayog (2018)",
          "Ashoka Fellow — Shashank Kumar",
          "Distinguished Alumnus IIT Delhi (2017)",
          "Great Place to Work — 2022–23, 2023–24"
        ],
        "sameAs": [
          "https://agrevolution.in",
          "https://www.linkedin.com/company/dehaat/",
          "https://en.wikipedia.org/wiki/DeHaat"
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://upforge.in" },
        { "@type": "ListItem", "position": 2, "name": "Startup Registry", "item": "https://upforge.in/startup" },
        { "@type": "ListItem", "position": 3, "name": "Agritech Startups India", "item": "https://upforge.in/agritech-startups-india" },
        { "@type": "ListItem", "position": 4, "name": "DeHaat", "item": "https://upforge.in/startup/dehaat-agri" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who founded DeHaat and what is the founder's background?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DeHaat was co-founded in 2012 in Patna, Bihar by Shashank Kumar (CEO) — IIT Delhi B.Tech Textile Technology, 2008, from a farming family in Chhapra, Bihar, ex-Beacon Advisory Services supply chain consultant — along with Shyam Sundar Singh (IIT Kharagpur B.Tech, IIM Ahmedabad MBA), Amrendra Singh (NIT Jamshedpur computer engineering), Adarsh Srivastava (ISM Dhanbad mechanical engineering), and Abhishek Dokania (IIPM MBA). Shashank had earlier founded FarmsnFarmers Foundation in 2010, a non-profit for farmer empowerment, before formalising the commercial entity Green Agrevolution Pvt. Ltd. in 2012. He has been recognised with Forbes 30 Under 30 Asia, PM Champions of Change (Niti Aayog), the Ashoka Fellowship, and as Distinguished Alumnus of IIT Delhi."
          }
        },
        {
          "@type": "Question",
          "name": "What is DeHaat's revenue and has it turned profitable?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DeHaat reported ₹3,041 crore in revenue for FY2025 — an 11% increase from ₹2,720 crore in FY2024 and a landmark for Indian agritech. More significantly, DeHaat reported a profit of ₹369 crore in FY2025 — making it the first major agritech company in India to turn profitable at significant scale. Total expenses fell sharply to ₹2,671 crore from ₹3,853 crore in FY24 due to cost rationalisation, reduced employee costs (down 15% to ₹175 crore), and revenue mix improvement. This profitability milestone comes after years of heavy losses as DeHaat invested in network expansion and technology."
          }
        },
        {
          "@type": "Question",
          "name": "How does DeHaat's model work and what does it offer farmers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DeHaat operates a hub-and-spoke model: local micro-entrepreneurs run DeHaat Centres (11,000+ across 12 states), each serving 600–1,000 farmers in a 3–8 km radius. Farmers access services via the DeHaat app, toll-free helpline (1800 270 1420), or physical centre. Services include: agri-input procurement (3,200+ products including seeds, fertilisers, pesticides, cattle feed from Bayer, UPL, Yara, Syngenta); AI-enabled crop advisory for 30+ crops in regional languages (covering pest and disease management, soil health, cropping patterns); market linkages to 600+ bulk buyers (ITC, Godrej, Cargill, Reliance Fresh, Parle, doTERRA, e-commerce); and financial services including credit and insurance through IDBI Bank, IFFCO, and others. Farmers save 10–15% on inputs, see 20% productivity gains, and get 12–15% better farm-gate price discovery."
          }
        },
        {
          "@type": "Question",
          "name": "How much has DeHaat raised and who are its investors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DeHaat has raised $270M+ in total equity funding across 11 rounds since its first external funding in 2014. Key rounds include: Series A ($12M, 2020, Omnivore Partners + Sequoia India); Series B ($26M, 2021, Prosus Ventures + Lightrock India); Series C (unknown, 2021); Series D ($115M, October 2021, Sofina + Lightrock India — India's largest agritech round at the time); Series E ($60M, December 2022, Temasek + Sofina + RTP Global + Prosus + Lightrock India). In April 2025, ₹200 crore (~$23.4M) in venture debt was raised from Trifecta Capital. Total funding including debt: approximately $300M. Valuation: $700M–800M, approaching unicorn status."
          }
        },
        {
          "@type": "Question",
          "name": "What states and how many farmers does DeHaat serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As of 2025, DeHaat serves 1.8 million+ farmers across 12 Indian agrarian states, with its deepest presence in Bihar, Uttar Pradesh, Jharkhand, Odisha, West Bengal, Rajasthan, Madhya Pradesh, and Haryana. It operates 11,000+ DeHaat Centres managed by local micro-entrepreneurs, 503 Farmer Producer Organisations (FPOs), and an extensive warehousing and cold-chain network. The company was founded in Bihar and remains deeply rooted in eastern India — the heartland of small and marginal farmers — while expanding westward and southward. DeHaat has also acquired six companies to date, including YCook India, FieldFresh Foods, AgriCentral, and Helicrofter, to strengthen its output, processing, and advisory capabilities."
          }
        },
        {
          "@type": "Question",
          "name": "How does DeHaat compare to AgroStar, Ninjacart, and other Indian agritechs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DeHaat is India's only agritech that operates end-to-end across all four pillars of the agricultural value chain simultaneously: input supply, AI crop advisory, output market linkage, and financial services. AgroStar focuses primarily on input distribution (seeds, pesticides) and advisory. Ninjacart (Walmart-backed) focuses on supply chain and farm-to-retail logistics for perishables. Samunnati and Agrizy focus on financial services and credit. DeHaat uniquely combines all four through a network of physical DeHaat Centres (not purely digital), making it deeply embedded in rural communities where app-only models fail. Its ₹369 crore FY25 profit makes it the only scaled agritech in India with demonstrated profitability at this revenue level."
          }
        }
      ]
    }
  ]
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STATS = [
  { l: "Revenue FY25", v: "₹3,041 Cr" },
  { l: "Profit FY25", v: "₹369 Cr" },
  { l: "Founded", v: "2012" },
  { l: "Farmers", v: "1.8M+" },
  { l: "States", v: "12" },
  { l: "DeHaat Centres", v: "11,000+" },
]

const TIMELINE = [
  {
    year: "2008–2010",
    event: "Shashank Kumar graduates from IIT Delhi (B.Tech Textile Technology, 2008) — having grown up in Chhapra, Bihar, the son of a Bihar electricity board employee and a schoolteacher, attending Netarhat Residential School. He joins Beacon Advisory Services as a supply chain consultant, advising FMCG and retail clients for two and a half years — and begins returning to Bihar, talking to farmers. What he hears is consistent: middlemen capture most of the value, inputs are expensive and fake, and no one talks to farmers about crops the way they deserve.",
  },
  {
    year: "2010–12",
    event: "Shashank founds FarmsnFarmers Foundation (FnF) — a non-profit registered under the Society Registration Act — to help farmers adopt better cropping patterns, market their produce, and maximise profit per acre. He begins recruiting friends from IIT Kharagpur, NIT Jamshedpur, and ISM Dhanbad: Manish Kumar, Amrendra Singh, Shyam Sundar Singh, Adarsh Srivastava, and Abhishek Dokania join over the following months. Green Agrevolution Pvt. Ltd. is incorporated in 2012 — the commercial entity behind the DeHaat brand.",
  },
  {
    year: "2012–16",
    event: "Bootstrapped with ₹15 lakh. DeHaat launches in Bihar and Odisha with 5 nodes and 30 DeHaat Centres serving 10,200 farmers across 11 Bihar districts. The model: local micro-entrepreneurs run each DeHaat Centre, providing seeds, fertilisers, pesticides, crop advisory, and market linkage to 600–1,000 farmers within a 6–8 km radius. Companies including DuPont Pioneer, Bayer, Syngenta, UPL, and Seminis sell inputs through DeHaat; buyers like ITC, Godrej, Cargill, and Reliance Fresh buy output. Revenue: ₹7 crore FY2016. First external funding from NABARD's Rural Innovation Fund.",
  },
  {
    year: "2019–20",
    event: "Series A: $12M from Omnivore Partners, Sequoia Capital India, FMO (Netherlands development bank), and AgFunder. DeHaat expands to UP, Jharkhand, and West Bengal. 360,000 farmers on platform. 1,300+ micro-entrepreneurs. 4,000+ agricultural input products available. AI-powered crop advisory launched — delivering pest and disease management guidance via mobile app and call centre in regional languages. Shashank Kumar named Forbes 30 Under 30, Ashoka Fellow, and PM Champions of Change.",
  },
  {
    year: "Oct 2021",
    event: "Series D: $115 million led by Sofina (Belgium's most respected family-owned investment holding) and Lightrock India — India's largest agritech funding round at the time. Prosus Ventures (Naspers) and RTP Global (backed Zoom, Bumble) co-invest. Total raised: ~$160M. DeHaat now serves 1 million+ farmers. 60x revenue growth over 40 months documented. Acquisitions begin: YCook India, FieldFresh Foods, Helicrofter, AgriCentral, and others folded in over 18 months to strengthen output and processing capabilities.",
  },
  {
    year: "Dec 2022",
    event: "Series E: $60M raised from Temasek Holdings (Singapore's sovereign wealth fund), Sofina Ventures, RTP Global, Prosus Ventures, and Lightrock India. Total equity raised crosses $222M. CEO Shashank Kumar: '60x growth of DeHaat in the last 40 months has laid a foundation for a clear path to profitability.' Revenue: ₹1,965 crore FY23. Targeted EBITDA breakeven within 12 months. 2.5M farmer target set for March 2023.",
  },
  {
    year: "FY25 — Profitability",
    event: "DeHaat reports ₹3,041 crore revenue for FY2025 — 11% growth from ₹2,720 crore in FY24. The headline number that transforms the story: ₹369 crore net profit — India's first major agritech company to turn consistently profitable at this scale. Total expenses fall to ₹2,671 crore from ₹3,853 crore in FY24. Employee costs reduced 15% to ₹175 crore. The cost discipline that DeHaat learned across four restructuring cycles delivers the most important number the Indian agritech sector has ever posted.",
  },
  {
    year: "Apr 2025",
    event: "₹200 crore (~$23.4M) venture debt raised from Trifecta Capital — India's leading venture debt firm. Total capital deployed since founding: $300M+. Valuation: $700M–800M, approaching unicorn status. 1.8 million farmers. 12 states. 11,000+ DeHaat Centres. 503 FPOs. AI advisory for 30+ crops in regional languages. 600+ institutional buyers. The platform that began with ₹15 lakh and 30 centres in Bihar is now India's most consequential agritech infrastructure company.",
  },
]

const COLS = [
  {
    h: "A Boy From Bihar, a 3am Call With Farmers, and ₹15 Lakh",
    b: `Shashank Kumar grew up in Chhapra, Bihar — the state most associated with Indian agriculture's deepest dysfunctions, where 90% of farmers are small and marginal, where middlemen take 40–60% of the value of every crop, where inputs are expensive, frequently adulterated, and sold without advice, and where the gap between farm gate price and retail price represents one of India's most persistent forms of structural inequality.\n\nHis father worked at the Bihar National Electricity Board. His mother taught school. He attended Netarhat Residential School — one of India's finest government residential schools — and earned a place at IIT Delhi, graduating with a B.Tech in Textile Technology in 2008. He joined Beacon Advisory Services as a supply chain consultant, spending two and a half years advising FMCG and retail companies on procurement and distribution. And every time he went home to Bihar, he talked to farmers. The same conversation, every time: the seeds don't work, the fertiliser is fake or mis-prescribed, nobody helps with pests and disease, and when the crop comes, a middleman decides what it is worth.\n\n"I used to feel extremely bad that farmers are working very hard, but the return is not proportional," Shashank told YourStory. In 2010, he left his job and founded FarmsnFarmers Foundation — a non-profit — with ₹15 lakh scraped together from the founding team. Two years later, he and his friends Shyam Sundar Singh (IIT Kharagpur, IIM Ahmedabad), Amrendra Singh (NIT Jamshedpur), Adarsh Srivastava (ISM Dhanbad), and Abhishek Dokania (IIPM) formally incorporated Green Agrevolution Pvt. Ltd. They gave their model a name: DeHaat. It means 'village' in Hindi. The name was not an accident.`,
  },
  {
    h: "The Micro-Entrepreneur Model, $115M and 60x Growth",
    b: `The architectural insight that made DeHaat defensible — and that no VC-backed agritech app has been able to replicate — was the decision to build through local micro-entrepreneurs rather than central distribution. Each DeHaat Centre is owned and run by a local person: a trusted community figure who provides agri-inputs, delivers crop advisory, and connects farmers to output markets within a 3–8 km radius. This is not a franchise — the micro-entrepreneur has skin in the game, knows the farmers personally, and is accountable to the outcomes. At scale, this creates a distribution network that no e-commerce approach can duplicate for a population that does not, as Shashank noted in 2016, have high smartphone penetration.\n\nThe technology layered on top of this human network was always AI-first. DeHaat's crop advisory system — personalised recommendations for pest and disease management across 30+ crops, delivered in regional languages via mobile app and call centre — was built in-house over years, drawing on India's most comprehensive database of farm-level pest incidents and crop outcomes. The platform processes queries from 1.8 million farmers through a combination of call centre agents and automated AI responses, with escalation protocols for unusual crop conditions.\n\nSofina and Lightrock India's $115 million Series D in October 2021 — India's largest agritech funding round at the time — was the institutional validation of a thesis that had been building since 2012. By then, DeHaat had achieved 60x revenue growth in 40 months, serving a million farmers across Bihar, UP, Jharkhand, and Odisha. Temasek joined at Series E in December 2022. The company that Shashank started with ₹15 lakh in a rented office in Patna was now one of the most significant agricultural technology companies ever built in Asia.`,
  },
  {
    h: "₹3,041 Crore Revenue, ₹369 Crore Profit and What It Means",
    b: `The FY2025 financial results published by DeHaat changed the narrative of Indian agritech entirely. ₹3,041 crore in revenue. ₹369 crore in net profit. For a sector that had been written off as capital-intensive, structurally loss-making, and dependent on perpetual fundraising, the numbers are not just a milestone for DeHaat — they are a proof of model for every farmer-focused technology company that comes after.\n\nThe profitability was not an accident of revenue growth. Total expenses fell from ₹3,853 crore in FY24 to ₹2,671 crore in FY25 — a 31% reduction driven by cost discipline, reduced employee costs (₹175 crore, down 15%), and a fundamental improvement in the unit economics of the DeHaat Centre model. The Trifecta Capital ₹200 crore venture debt in April 2025 — raised as a profitable company, not a loss-making one — signals that India's agritech infrastructure story is entering a new phase.\n\nShashank Kumar's journey from a Bihar farm family to IIT Delhi, to Beacon Advisory, to a ₹15 lakh bootstrap in Patna, to 11,000 rural centres serving 1.8 million farmers across 12 states, mirrors the journey of the Indian agricultural sector itself: deeply rooted in the hardest terrain, building capacity over decades rather than quarters, and delivering outcomes that the market had long been told were impossible. The ₹369 crore profit is the most important data point in Indian agritech history. It says: this works.`,
  },
]

const PULL_QUOTE = {
  text: "I used to feel extremely bad that farmers are working very hard, but the return is not proportional. The problem is structural — it is about inputs, advisory, and markets all failing the farmer at the same time. DeHaat's mission is to solve all three simultaneously, for every farmer in India, at the last mile.",
  by: "Shashank Kumar, Co-Founder & CEO, DeHaat",
}

const LESSON =
  "The most defensible agritech companies are not app-first — they are community-first. DeHaat's micro-entrepreneur network cannot be replicated by a VC-backed app because it is built on trust accumulated over a decade, one farmer and one crop advisory at a time. Technology accelerates what the human network builds. The network is the moat. The profit proves it."

const INVESTORS = [
  "Sofina Ventures — Series D Lead ($115M, Oct 2021) + Series E",
  "Lightrock India — Series D + Series E",
  "Temasek Holdings — Series E ($60M, Dec 2022)",
  "Prosus Ventures / Naspers — Series B + Series D + Series E",
  "RTP Global — Series D + Series E",
  "Trifecta Capital — ₹200 Cr Venture Debt (Apr 2025)",
  "Omnivore Partners — Series A + Multiple Follow-ons",
  "Sequoia Capital India / Peak XV — Series A",
  "FMO — Netherlands Development Finance Company",
  "NABARD Rural Innovation Fund (First Institutional, 2016)",
]

const RECOGNITIONS = [
  "Forbes 30 Under 30 Asia — Shashank Kumar (2014)",
  "PM Champions of Change, Niti Aayog (2018)",
  "Ashoka Fellow — Shashank Kumar",
  "Distinguished Alumnus — IIT Delhi (2017)",
  "BWDisrupt 40 Under 40 — Shashank Kumar (2018)",
  "NASSCOM Agritech Startup Award",
  "Bill & Melinda Gates Foundation Recognition",
  "Great Place to Work Certified — 2022–23, 2023–24",
  "Economic Times Agritech Startup Feature",
  "Niti Aayog Champions of Change Award",
]

const FAQS = [
  {
    q: "What is a DeHaat Centre and how does the micro-entrepreneur model work?",
    a: "A DeHaat Centre is a last-mile agricultural services point run by a local micro-entrepreneur — typically a trusted community member who lives within the served village cluster. Each centre covers 600–1,000 farmers in a 3–8 km radius. The micro-entrepreneur stocks agri-inputs (seeds, fertilisers, pesticides, cattle feed), provides advisory through DeHaat's digital systems and call centre support, and facilitates output aggregation and buyer connections. Unlike a franchise, the micro-entrepreneur earns directly from the transactions they facilitate — creating genuine accountability and local trust. DeHaat trains and certifies each micro-entrepreneur and provides the technology platform, supply chain access, and buyer relationships. With 11,000+ such centres across 12 states, DeHaat has built India's most extensive farmer-facing rural distribution network.",
  },
  {
    q: "What acquisitions has DeHaat made and why?",
    a: "DeHaat has acquired six companies to date: YCook India (food processing), FieldFresh Foods (agri-output processing and distribution), Helicrofter (western India market access), and AgriCentral (farmer advisory and app user base). The acquisition strategy follows a clear logic: DeHaat's core model is end-to-end farmer services, but end-to-end means the company must control or influence every part of the value chain — from the input manufacturer to the consumer plate. Acquisitions in processing and output help DeHaat capture value that would otherwise leak to third parties, improve farm-gate prices for farmers, and create sticky long-term relationships with institutional buyers like ITC, Cargill, and Reliance Fresh.",
  },
  {
    q: "How does DeHaat use AI in crop advisory and what crops does it cover?",
    a: "DeHaat's AI crop advisory system provides personalised recommendations for 30+ crops including rice, wheat, maize, mustard, sugarcane, vegetables, and pulses. The system draws on DeHaat's proprietary crop pest and disease database — built from 12+ years of farm-level data across millions of advisory interactions. Farmers describe symptoms through the app, call centre, or DeHaat Centre, and receive AI-generated advice cross-referenced with current weather, soil type, crop stage, and regional pest outbreak alerts. Advisory is delivered in regional languages including Hindi, Bhojpuri, Odia, Bengali, and others. Farmers using the advisory system report 20% productivity gains and 10–15% input cost savings compared to unadvised farming.",
  },
  {
    q: "Is DeHaat considering an IPO?",
    a: "As of early 2026, DeHaat has not publicly announced IPO plans. However, with ₹3,041 crore in FY25 revenue, ₹369 crore profit, and a $700–800M valuation approaching unicorn status, the company now has the financial profile required for a public listing. The April 2025 Trifecta Capital venture debt — raised as a profitable company — suggests DeHaat is focused on consolidating and scaling its existing geographic presence before pursuing an IPO. The $115M Series D's CEO statement — 'two-thirds of capital still to be deployed' — implied the company was not yet optimised. The FY25 profit suggests that optimisation is now complete. An IPO within 24–36 months of March 2026 is widely anticipated by institutional investors.",
  },
]

const RELATED = [
  { name: "Aurassure", slug: "aurassure", cat: "Climate Tech / IoT", val: "₹29 Cr raised" },
  { name: "Blue Energy Motors", slug: "blue-energy-motors", cat: "LNG & EV Trucks", val: "$50M raised" },
  { name: "Darwinbox", slug: "darwinbox-hr", cat: "HR Tech / Enterprise SaaS", val: "$320M raised" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function DeHaatPage() {
  const accent = "#15803d"
  const accentDark = "#14532d"
  const accentBg = "#f0fdf4"
  const accentBorder = "#bbf7d0"

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
        DeHaat Founder Story — Shashank Kumar &amp; Team | India's Largest Agritech Platform | ₹3,041 Crore Revenue | ₹369 Crore Profit FY25 | UpForge
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
            { n: "Agritech Startups India", h: "/agritech-startups-india" },
            { n: "DeHaat", h: "/startup/dehaat-agri" },
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
            UpForge · Startup Registry · Agriculture Technology
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
            Edition · Agritech
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span
            className="text-[9px] font-black uppercase tracking-wider"
            style={{ color: accent }}
          >
            Agritech &amp; Rural Infrastructure · March 2026
          </span>
          <div className="h-3 w-px bg-[#C8C2B4]" />
          <span className="text-[9px] text-[#AAA]">Patna, Bihar · Gurugram, Haryana</span>
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
                AGRITECH / RURAL INFRASTRUCTURE / AI
              </span>
              <span className="text-[9px] text-[#AAA] uppercase tracking-wider">March 2026</span>
            </div>

            {/* Headline */}
            <h2
              className="pf font-black leading-[1.05] text-[#1A1208] mb-5"
              style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)" }}
            >
              A Bihar farmer's son. IIT Delhi. ₹15 lakh. 13 years.{" "}
              <em style={{ color: accent }}>
                ₹3,041 crore revenue. ₹369 crore profit. India's agritech finally proves the model.
              </em>
            </h2>

            {/* Deck */}
            <p
              className="italic leading-[1.75] mb-6 pb-6 text-[#5A4A30]"
              style={{ fontSize: "clamp(14px,1.9vw,17px)", borderBottom: "1px solid #C8C2B4" }}
            >
              Shashank Kumar grew up watching Bihar's farmers work harder than anyone and earn
              less than almost anyone. He left IIT Delhi, left his consulting career, and started
              DeHaat in Patna with ₹15 lakh and four friends from IIT, NIT, and ISM. Thirteen
              years later: 11,000 rural centres, 1.8 million farmers, 12 states, $270M raised from
              Sofina, Temasek, and Prosus — and the first major profit in India's agritech history.
            </p>

            {/* Byline */}
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8"
              style={{ fontFamily: "system-ui,sans-serif" }}
            >
              {[
                "By UpForge Editorial",
                "Patna & Gurugram",
                "Est. 2012",
                "India's Largest Agritech Platform",
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
                src="/Upforge-dehaat-agri.webp"
                alt="Shashank Kumar, Co-Founder & CEO of DeHaat — UpForge Founder Chronicle"
                className="w-full object-cover object-top"
                style={{ height: "min(300px,60vw)", display: "block" }}
                loading="eager"
              />
              <div className="px-4 py-3" style={{ background: "#1A1208" }}>
                <p className="pf text-white font-bold" style={{ fontSize: 13 }}>
                  Shashank Kumar &amp; DeHaat Founding Team
                </p>
                <p
                  className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                  style={{ fontFamily: "system-ui,sans-serif" }}
                >
                  Co-Founders · DeHaat / Green Agrevolution
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
                  src="/Upforge-dehaat-agri.webp"
                  alt="Shashank Kumar, Co-Founder & CEO of DeHaat — UpForge Founder Chronicle"
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
                    Shashank Kumar &amp; Founding Team
                  </p>
                  <p
                    className="text-white/40 text-[9px] uppercase tracking-wide mt-0.5"
                    style={{ fontFamily: "system-ui,sans-serif" }}
                  >
                    Co-Founders · DeHaat / Green Agrevolution
                  </p>
                </div>
              </div>

              {/* Website + LinkedIn */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://agrevolution.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: `1.5px solid ${accent}`, textDecoration: "none" }}
                  aria-label="Visit DeHaat official website"
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
                      agrevolution.in — DeHaat Official
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: accent }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/dehaat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: "1.5px solid #0077b5", textDecoration: "none" }}
                  aria-label="View DeHaat on LinkedIn"
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
                      LinkedIn — DeHaat
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

              {/* Awards & Recognition */}
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
            Explore More Agritech &amp; Rural Tech Startups on UpForge
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: "Agritech Startups India 2026", h: "/agritech-startups-india" },
              { l: "Indian Unicorns Full List", h: "/indian-unicorns" },
              { l: "IIT Delhi Startups", h: "/iit-startups" },
              { l: "Bihar & Patna Startups", h: "/bihar-startups" },
              { l: "Rural Tech Startups India", h: "/rural-tech-startups-india" },
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
                Building India's next agritech company? Get verified on UpForge.
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
            * Data sourced from YourStory, IIT KGP Alumni Foundation, Startuppedia, DNA India,
            GAIN Health, Tracxn, TechCrunch, Inc42, Economic Times, Registrar of Companies (ROC)
            filings, and DeHaat press releases as of March 2026. UpForge is an independent
            registry — no paid placements, no sponsored rankings. Revenue and profit figures
            for FY2025 are sourced from ROC filings published March 2026.
          </p>

          <nav aria-label="Footer navigation" className="mt-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                { l: "Agritech Startups India", h: "/agritech-startups-india" },
                { l: "Indian Unicorns", h: "/indian-unicorns" },
                { l: "Startup Registry", h: "/startup" },
                { l: "Aurassure Profile", h: "/startup/aurassure" },
                { l: "Blue Energy Motors Profile", h: "/startup/blue-energy-motors" },
                { l: "Darwinbox Profile", h: "/startup/darwinbox-hr" },
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
