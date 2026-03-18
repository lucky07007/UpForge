// data/founders.ts
// 10 highest-traffic trending Indian startups — March 2026 edition.
// Each entry is tuned for SEO: slug, deck, headline, cols, and stats
// are all keyword-rich and match real high-volume search queries.

export interface FounderCol {
  h: string
  b: string
}

export interface FounderStat {
  l: string
  v: string
}

export interface Founder {
  no: string
  edition: string
  category: string
  name: string
  nameShort: string
  initials: string
  company: string
  slug: string
  role: string
  city: string
  context: string
  valuation: string
  funding: string
  founded: string
  imgSrc: string
  videoId: string
  videoTitle: string
  accent: string
  accentBg: string
  accentBorder: string
  headline: string
  deck: string
  cols: FounderCol[]
  pull: string
  pullBy: string
  lesson: string
  stats: FounderStat[]
}

export const FOUNDERS: Founder[] = [
  // ── 01 · ZEPTO ────────────────────────────────────────────────────────────
  {
    no: "01", edition: "No. 01",
    category: "QUICK COMMERCE",
    name: "Aadit Palicha & Kaivalya Vohra",
    nameShort: "Palicha & Vohra",
    initials: "Z",
    company: "Zepto", slug: "zepto",
    role: "Co-Founders — CEO & CTO",
    city: "Bengaluru, KA", context: "Dropped out of Stanford at 19",
    valuation: "$5.9B", funding: "$2.5B+", founded: "2021",
    imgSrc: "https://m.economictimes.com/thumb/msid-124252575,width-1200,height-900,resizemode-4,imgsize-92016/kaivalya-vohra-aadit-palicha.jpg",
    videoId: "nR2jv-r55bg",
    videoTitle: "Aadit Palicha & Kaivalya Vohra — How Zepto Was Built",
    accent: "#D97706", accentBg: "#FFFBEB", accentBorder: "#FDE68A",
    headline: "Two Stanford dropouts. One failed startup. Then a $5.9 billion answer to India's grocery problem.",
    deck: "Aadit Palicha and Kaivalya Vohra built India's fastest-growing unicorn by failing first — then solving the dark-store logistics math nobody else wanted to.",
    cols: [
      {
        h: "The Failed First Act",
        b: "In 2020, Aadit Palicha and Kaivalya Vohra were Stanford freshmen who flew back to India to build KiranaKart — a 45-minute grocery delivery app. It failed within months. Most founders would have returned to California. These two stayed in Bengaluru, rented a room, and dissected every mistake with unusual discipline.\n\nThe pivot they arrived at was precise: dark stores placed within 1.5km of dense residential demand turned 10-minute delivery into a logistics equation, not a marketing gimmick. Every competitor called it insane. The founders called it math.",
      },
      {
        h: "The $5.9 Billion Math Problem",
        b: "Zepto launched in 2021. By August 2023 it became India's first unicorn of the year at a $1.4B valuation. The $350M Series H in 2025 pushed the number to $5.9B — making Palicha and Vohra the youngest founders in India to build a business at that scale.\n\nKaivalya Vohra, at 22, became India's youngest billionaire. Zepto now operates 350+ dark stores across 10 cities, fulfilling millions of orders in under 10 minutes. The logistics equation was solved.",
      },
      {
        h: "Why Zepto Keeps Winning",
        b: "India's quick commerce market crossed $3.3B in 2025. Zepto commands its second-largest share — earned not by being first (Blinkit launched earlier), but by being the most operationally precise about what '10 minutes' actually requires behind the scenes.\n\nThe company's dark-store density model, hyperlocal inventory management, and relentless focus on unit economics set a new standard for Indian e-commerce — one that even Swiggy Instamart and BigBasket have had to respond to.",
      },
    ],
    pull: "We failed with KiranaKart in months. Most people would have gone back to Stanford. We stayed in Bengaluru and figured out what we got wrong.",
    pullBy: "Aadit Palicha",
    lesson: "The first startup teaches you the question. The second one lets you answer it.",
    stats: [
      { l: "Valuation",    v: "$5.9B"  },
      { l: "Founded",      v: "2021"   },
      { l: "Dark Stores",  v: "350+"   },
      { l: "Total Raised", v: "$2.5B+" },
    ],
  },

  // ── 02 · CRED ─────────────────────────────────────────────────────────────
  {
    no: "02", edition: "No. 02",
    category: "FINTECH",
    name: "Kunal Shah",
    nameShort: "Kunal Shah",
    initials: "C",
    company: "CRED", slug: "cred",
    role: "Founder & CEO",
    city: "Bengaluru, KA", context: "Serial founder who cracked trust in fintech",
    valuation: "$6.4B", funding: "$900M+", founded: "2018",
    imgSrc: "https://media.licdn.com/dms/image/v2/D4D12AQGNIdgGfVUh3g/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1694529199100?e=2147483647&v=beta&t=iJ7gfjv5B6utRNCbW1VSNOwSwq_Mchvys5BXLwnemYw",
    videoId: "LgEBOFT2gBM",
    videoTitle: "Kunal Shah on Building CRED — Trust, Credit, and India's Premium Consumer",
    accent: "#111827", accentBg: "#F9FAFB", accentBorder: "#E5E7EB",
    headline: "CRED doesn't reward you for spending. It rewards you for paying your bills on time. That one inversion changed everything.",
    deck: "Kunal Shah built CRED on a counterintuitive insight — India's most creditworthy consumers were underserved and underleveraged. His answer became a $6.4B fintech empire.",
    cols: [
      {
        h: "The Insight Nobody Else Saw",
        b: "Before CRED, Kunal Shah had already sold one company — FreeCharge — to Snapdeal for $400M. He could have retired. Instead, he spent years studying a specific problem: India's top 30 million credit card users paid their bills dutifully, got nothing in return, and were surrounded by fintech products built for people with no credit history.\n\nCRED was the answer to that gap. Launched in 2018, it rewarded users with 'CRED coins' for paying their credit card bills on time — turning a financial chore into a behaviour worth reinforcing.",
      },
      {
        h: "The Brand That Broke the Internet",
        b: "CRED became as famous for its advertising as for its product. Its IPL campaigns — featuring retired cricketers, Bollywood veterans, and absurdist humour — became cultural events. Search volumes for 'what does CRED do' and 'is CRED safe' spiked every April.\n\nThe campaigns were deliberate. Shah understood that trust in fintech is built through familiarity. By making CRED unmissable, he lowered the psychological barrier for a product asking users to share their most sensitive financial data.",
      },
      {
        h: "Building the Premium Fintech Stack",
        b: "CRED has expanded far beyond credit card bill payments. The platform now offers CRED Pay (buy-now-pay-later), CRED Cash (personal loans), CRED Store (premium commerce), CRED Travel (flight bookings), and CRED Garage (car services).\n\nThe flywheel is deliberate: acquire India's most creditworthy users through bill payments, then build financial and lifestyle products tailored to their premium spending patterns. By 2026, CRED has over 12 million monthly active users — all high-income, high-intent consumers.",
      },
    ],
    pull: "India's most creditworthy consumers were being ignored by every fintech. I thought that was a strange way to build a financial ecosystem.",
    pullBy: "Kunal Shah",
    lesson: "Serve the customer everyone else is ignoring — the one with the highest trust and the least noise.",
    stats: [
      { l: "Valuation",   v: "$6.4B"  },
      { l: "Founded",     v: "2018"   },
      { l: "MAU",         v: "12M+"   },
      { l: "Total Raised",v: "$900M+" },
    ],
  },

  // ── 03 · GROWW ────────────────────────────────────────────────────────────
  {
    no: "03", edition: "No. 03",
    category: "FINTECH / INVESTING",
    name: "Lalit Keshre, Harsh Jain, Neeraj Singh & Ishan Bansal",
    nameShort: "Lalit Keshre",
    initials: "G",
    company: "Groww", slug: "groww",
    role: "Co-Founders — CEO, COO, CTO & CPO",
    city: "Bengaluru, KA", context: "Ex-Flipkart engineers who democratised investing",
    valuation: "$3B", funding: "$650M+", founded: "2016",
    imgSrc: "https://img-cdn.publive.online/fit-in/1200x675/filters:format(webp)/entrackr/media/media_files/2025/09/17/groww-2025-09-17-15-09-48.png",
    videoId: "9V1PkAMkPiA",
    videoTitle: "Lalit Keshre on How Groww Made Investing Simple for Every Indian",
    accent: "#00C087", accentBg: "#F0FDF4", accentBorder: "#BBF7D0",
    headline: "Groww didn't just build an investing app. It convinced an entire generation that the stock market was for them.",
    deck: "Four ex-Flipkart engineers quit stable jobs to fix a broken problem — investing in India was intimidating, jargon-heavy, and inaccessible. Groww made it a 3-minute experience.",
    cols: [
      {
        h: "The Flipkart Four",
        b: "In 2016, Lalit Keshre, Harsh Jain, Neeraj Singh, and Ishan Bansal were product managers and engineers at Flipkart — India's most exciting startup at the time. They quit to solve a problem they had personally faced: investing in mutual funds required visiting a bank, filling paper forms, and understanding acronyms that most people never bothered to decode.\n\nGroww's first version was brutally simple — a mobile app where users could start a SIP (systematic investment plan) in under 3 minutes with no paperwork. It was the first investing product in India designed around simplicity rather than features.",
      },
      {
        h: "Riding India's Stock Market Boom",
        b: "The pandemic was Groww's inflection point. With markets crashing and then recovering, millions of young Indians discovered investing for the first time — and they did it on Groww. The platform's clean UI, zero-commission model, and educational content made it the default choice for first-time investors.\n\nGroww crossed 10 million users in 2021, 40 million in 2023, and became India's largest retail broker by active clients. The unicorn round ($3B valuation) came in 2022, backed by Tiger Global, Sequoia, and Ribbit Capital.",
      },
      {
        h: "Beyond Mutual Funds",
        b: "Groww has expanded from mutual funds to stocks, ETFs, IPOs, US stocks, fixed deposits, and digital gold — becoming a full-stack wealth platform for India's growing investor class.\n\nThe company's north star has remained constant: every product must be understandable by a first-time investor in Tier-2 India. That constraint has made Groww the most trusted investing brand among India's 18–35 age group — a demographic that will drive Indian capital markets for the next three decades.",
      },
    ],
    pull: "We wanted investing to feel like ordering food on Swiggy — something you just do, without needing a financial advisor to explain it.",
    pullBy: "Lalit Keshre",
    lesson: "Simplicity is a product strategy. The harder you work to remove friction, the bigger the market you unlock.",
    stats: [
      { l: "Valuation",   v: "$3B"   },
      { l: "Founded",     v: "2016"  },
      { l: "Users",       v: "40M+"  },
      { l: "Total Raised",v: "$650M+"},
    ],
  },

  // ── 04 · MEESHO ───────────────────────────────────────────────────────────
  {
    no: "04", edition: "No. 04",
    category: "SOCIAL COMMERCE",
    name: "Vidit Aatrey & Sanjeev Barnwal",
    nameShort: "Vidit Aatrey",
    initials: "M",
    company: "Meesho", slug: "meesho",
    role: "Co-Founders — CEO & CTO",
    city: "Bengaluru, KA", context: "IIT graduates who built e-commerce for Bharat",
    valuation: "$3.9B", funding: "$1.1B+", founded: "2015",
    imgSrc: "https://entrepreneurloop.com/wp-content/uploads/2025/12/Meesho-Founders.jpg",
    videoId: "gSA9CiYEqxQ",
    videoTitle: "Vidit Aatrey on Building Meesho — India's Largest Social Commerce Platform",
    accent: "#9333EA", accentBg: "#FAF5FF", accentBorder: "#E9D5FF",
    headline: "Meesho is not competing with Amazon. It is serving the 500 million Indians Amazon never reached.",
    deck: "Vidit Aatrey and Sanjeev Barnwal built Meesho for India's real consumer — not the urban professional, but the homemaker in Jaipur who wants to run a business from her phone.",
    cols: [
      {
        h: "E-Commerce for the Other India",
        b: "When Meesho launched in 2015, Indian e-commerce meant Amazon and Flipkart — platforms designed for urban, English-speaking, credit-card-holding consumers. Vidit Aatrey and Sanjeev Barnwal, both IIT graduates, saw a different India entirely.\n\nTheir insight was simple and radical: hundreds of millions of Indians — homemakers, small shopkeepers, students in Tier-2 and Tier-3 cities — wanted to either buy or sell products online, but found existing platforms too complex, too expensive, and too unrelatable. Meesho was built for them.",
      },
      {
        h: "The Reseller Revolution",
        b: "Meesho's original model was social reselling. Sellers would browse Meesho's catalogue, share products via WhatsApp with a custom markup, collect orders, and Meesho would handle fulfilment. It created a new category of entrepreneur — the 'Meesho seller' — mostly women running micro-businesses from home.\n\nBy 2021, Meesho had over 13 million sellers. SoftBank led a $300M round valuing it at $2.1B. The Google and Facebook backing validated its position as the defining platform for India's mass-market internet consumer.",
      },
      {
        h: "India's Largest E-Commerce by Orders",
        b: "By 2024, Meesho had overtaken Flipkart and Amazon in total order volume — not GMV, but the number of individual transactions. This metric matters more than it seems: it reflects the depth of reach into Bharat, where basket sizes are smaller but the population is enormous.\n\nMeesho's zero-commission model for sellers, vernacular-language support, and COD (cash-on-delivery) dominance made it the platform of choice for India's next 300 million e-commerce users. It processes over 1 million orders every day.",
      },
    ],
    pull: "India has 650 million internet users. Most e-commerce companies were building for 50 million of them. We built for the rest.",
    pullBy: "Vidit Aatrey",
    lesson: "The largest market is always the one everyone else thinks is too hard to serve.",
    stats: [
      { l: "Valuation",   v: "$3.9B"  },
      { l: "Founded",     v: "2015"   },
      { l: "Sellers",     v: "13M+"   },
      { l: "Total Raised",v: "$1.1B+" },
    ],
  },

  // ── 05 · PHYSICSWALLAH ────────────────────────────────────────────────────
  {
    no: "05", edition: "No. 05",
    category: "EDTECH",
    name: "Alakh Pandey & Prateek Maheshwari",
    nameShort: "Alakh Pandey",
    initials: "PW",
    company: "PhysicsWallah", slug: "physicswallah",
    role: "Co-Founders — CEO & COO",
    city: "Prayagraj, UP", context: "A teacher who refused to let price be a barrier",
    valuation: "$2.8B", funding: "$210M+", founded: "2020",
    imgSrc: "https://img.etimg.com/thumb/width-1200,height-900,imgsize-136888,resizemode-75,msid-123742997/tech/technology/physicswallah-files-updated-papers-for-rs-3820-crore-ipo-alakh-pandey-prateek-maheshwari-to-pare-stake.jpg",
    videoId: "oChGGxvnKdI",
    videoTitle: "Alakh Pandey — How PhysicsWallah Became India's Most Loved Edtech Startup",
    accent: "#F97316", accentBg: "#FFF7ED", accentBorder: "#FED7AA",
    headline: "Alakh Pandey started teaching on YouTube because he couldn't afford to pay for coaching. Fourteen million students later, he's changed what affordable education means in India.",
    deck: "PhysicsWallah became India's most loved edtech brand not by raising the most money, but by charging the least — and refusing to compromise on teaching quality.",
    cols: [
      {
        h: "The Teacher Who Started on YouTube",
        b: "Alakh Pandey grew up in Prayagraj and wanted to be an engineer. He couldn't afford the coaching fees that most JEE aspirants paid. That personal experience became the founding philosophy of PhysicsWallah.\n\nHe started posting physics lectures on YouTube in 2014 — free, clear, in Hindi, and designed for students who couldn't afford ₹1.5 lakh coaching centres. By 2020, he had 6 million subscribers and a cult following among JEE and NEET aspirants across India.",
      },
      {
        h: "From YouTube to Unicorn",
        b: "In 2020, Alakh Pandey partnered with Prateek Maheshwari to launch the PW app — a full-stack learning platform offering courses for JEE, NEET, UPSC, and school boards at a fraction of BYJU'S prices. A full JEE preparation batch on PW costs ₹4,000–8,000. The same on BYJU'S ran to ₹80,000–1,20,000.\n\nWestbridge Capital led a $100M Series A in 2022, valuing PhysicsWallah at $1.1B — making it India's 101st unicorn. The company reached $2.8B valuation by 2025 with over 8 million paying students.",
      },
      {
        h: "The Anti-BYJU'S",
        b: "While BYJU'S collapsed under the weight of aggressive sales tactics, unsustainable spending, and student loan controversies, PhysicsWallah grew by doing the opposite: keeping prices low, teachers on salary (not commission), and sales teams focused on need over upselling.\n\nPW's offline expansion — 'Vidyapeeth' centres in 30+ cities — gives students who learn best in person access to the same curriculum. The brand's loyalty among Indian students is unmatched in edtech: its YouTube channels collectively have over 30 million subscribers.",
      },
    ],
    pull: "I started teaching online because I knew what it felt like to be told that good education was only for those who could pay for it. That should never be true.",
    pullBy: "Alakh Pandey",
    lesson: "If you solve a real problem at a price people can actually afford, you don't need aggressive sales — the product sells itself.",
    stats: [
      { l: "Valuation",      v: "$2.8B"  },
      { l: "Founded",        v: "2020"   },
      { l: "Paying Students",v: "8M+"    },
      { l: "Total Raised",   v: "$210M+" },
    ],
  },

  // ── 06 · SARVAM AI ────────────────────────────────────────────────────────
  {
    no: "06", edition: "No. 06",
    category: "ARTIFICIAL INTELLIGENCE",
    name: "Vivek Raghavan & Pratyush Kumar",
    nameShort: "Vivek Raghavan",
    initials: "SA",
    company: "Sarvam AI", slug: "sarvam-ai",
    role: "Co-Founders — CEO & CTO",
    city: "Bengaluru, KA", context: "Building India's own sovereign LLM",
    valuation: "$1B+", funding: "$70M+", founded: "2023",
    imgSrc: "https://i.ytimg.com/vi/c8Dc6vRE7VI/maxresdefault.jpg",
    videoId: "c8Dc6vRE7VI",
    videoTitle: "Vivek Raghavan on Building India's Sovereign LLM — Sarvam AI",
    accent: "#2563EB", accentBg: "#EFF6FF", accentBorder: "#BFDBFE",
    headline: "If India wants to lead the AI era, it cannot rely only on models built elsewhere.",
    deck: "Sarvam AI is building India's own large language models — designed for Indian languages, Indian scale, and Indian problems. In 2025, the Government of India chose Sarvam to build the nation's sovereign AI.",
    cols: [
      {
        h: "The India-First AI Vision",
        b: "In 2023, Vivek Raghavan and Pratyush Kumar launched Sarvam AI with one goal: build AI infrastructure designed for India's linguistic and cultural reality.\n\nWhile OpenAI, Anthropic, and Google built models optimised for English and Western datasets, India remained an afterthought — despite having 22 official languages and hundreds of millions of people who primarily communicate in Hindi, Tamil, Telugu, Bengali, Marathi, and Kannada. Sarvam was built to fix that.",
      },
      {
        h: "India's First AI Unicorn",
        b: "Sarvam AI's models were designed not just to translate between languages, but to understand context across India's diverse linguistic structures — crucial for government services, rural education, healthcare, and regional enterprises.\n\nThe company raised $41M in its Series A led by Lightspeed in 2024, and crossed a $1B valuation in 2025 — becoming India's first pure-play AI unicorn. Total funding stands at $70M+ from investors including Peak XV (Sequoia India), Lightspeed, and others.",
      },
      {
        h: "The Sovereign AI Mandate",
        b: "In April 2025, the Government of India selected Sarvam AI under the IndiaAI Mission to build India's first homegrown sovereign large language model — a GPT-4-class model trained on Indian data, running on Indian compute infrastructure.\n\nThis was a watershed moment: the first time the Indian government formally bet on a private AI startup to anchor national AI infrastructure. It positioned Sarvam not just as a company, but as critical public technology — analogous to ISRO or CDAC for the AI era.",
      },
    ],
    pull: "If India wants to lead the AI era, it cannot rely only on models built elsewhere.",
    pullBy: "Vivek Raghavan",
    lesson: "In the AI era, infrastructure matters more than applications. Whoever controls the model controls the stack.",
    stats: [
      { l: "Valuation", v: "$1B+"        },
      { l: "Funding",   v: "$70M+"       },
      { l: "Mission",   v: "Sovereign LLM"},
      { l: "Founded",   v: "2023"        },
    ],
  },

  // ── 07 · RAPIDO ───────────────────────────────────────────────────────────
  {
    no: "07", edition: "No. 07",
    category: "MOBILITY",
    name: "Aravind Sanka, Pavan Guntupalli & SR Rishikesh",
    nameShort: "Aravind Sanka",
    initials: "R",
    company: "Rapido", slug: "rapido",
    role: "Co-Founders — CEO, COO & CTO",
    city: "Bengaluru, KA", context: "Building India's largest mobility platform",
    valuation: "$1.1B", funding: "$400M+", founded: "2015",
    imgSrc: "https://media.assettype.com/businessindia%2F2024-03%2F3b7197a0-bb6c-42d7-a1a8-eb7b864cc7fa%2FRapido_1_opt_DQK6J9L.jpg",
    videoId: "D-HCO9RMQCM",
    videoTitle: "Aravind Sanka on How Rapido Beat Ola and Uber at Their Own Game",
    accent: "#FBBF24", accentBg: "#FFFBEB", accentBorder: "#FDE68A",
    headline: "Rapido did not try to out-Ola Ola. It found the mode of transport India actually uses — the bike — and built the country's largest mobility company around it.",
    deck: "Aravind Sanka and his co-founders built Rapido by betting on bike taxis when every investor said it wasn't scalable. Today Rapido is India's fastest-growing urban mobility platform.",
    cols: [
      {
        h: "Betting on the Bike",
        b: "When Ola and Uber were competing on car rides, Rapido launched in Bengaluru in 2015 with a single product: bike taxis. The logic was unassailable — two-wheelers are how most Indians actually move around cities. They're faster in traffic, cheaper per kilometre, and operate in lanes cars can't access.\n\nEarly investors were sceptical. Regulatory challenges in several states created friction. But Rapido persisted — building captain networks, optimising for short-distance commutes, and creating a supply side of gig workers who preferred bikes for their flexibility and lower operating costs.",
      },
      {
        h: "The Cab Market Pivot",
        b: "By 2023, Rapido had expanded from bike taxis to auto-rickshaws and cabs — leveraging its existing captain network and app infrastructure. The timing was perfect: Ola's service quality had declined sharply, Uber was pulling back from some markets, and millions of commuters were searching for reliable, affordable alternatives.\n\nRapido's cab product grew 400% in 2024. The company entered 100+ cities and became the top-rated ride-hailing app on the App Store in multiple Indian metros — a metric that directly translates to organic search volume and word-of-mouth growth.",
      },
      {
        h: "The $400M Mobility Giant",
        b: "Rapido closed a $200M funding round in 2024, bringing total capital raised to over $400M. Its investor base includes Westbridge, Shell Ventures, and Swiggy (which led an earlier round).\n\nThe company's north star is captain earnings: Rapido captains earn more per hour than on competing platforms, which creates a loyalty flywheel — better supply means better ETAs, which means better rider retention. It is the same supply-side discipline that built Zepto, applied to mobility.",
      },
    ],
    pull: "Everyone said bike taxis were a feature, not a company. We thought that's what they said about bikes before motorcycles replaced horses.",
    pullBy: "Aravind Sanka",
    lesson: "Find the mode of transport — or the behaviour — that already exists at massive scale and is being underserved. Build around that.",
    stats: [
      { l: "Valuation",   v: "$1.1B"  },
      { l: "Founded",     v: "2015"   },
      { l: "Cities",      v: "100+"   },
      { l: "Total Raised",v: "$400M+" },
    ],
  },

  // ── 08 · PORTER ───────────────────────────────────────────────────────────
  {
    no: "08", edition: "No. 08",
    category: "LOGISTICS",
    name: "Uttam Digga, Pranav Goel & Vikas Choudhary",
    nameShort: "Uttam Digga",
    initials: "P",
    company: "Porter", slug: "porter",
    role: "Co-Founders",
    city: "Bengaluru, KA", context: "Fixing India's broken last-mile logistics for businesses",
    valuation: "$1.5B", funding: "$400M+", founded: "2014",
    imgSrc: "https://images.livemint.com/img/2021/10/25/600x338/Porter_founders_1635159357573_1635159371837.png",
    videoId: "gBVpEpLkB0w",
    videoTitle: "Porter Co-Founders on Building India's Largest Intra-City Logistics Platform",
    accent: "#0EA5E9", accentBg: "#F0F9FF", accentBorder: "#BAE6FD",
    headline: "Every small business in India needed a mini truck. Porter made it available in 30 minutes.",
    deck: "Porter solved the problem every Indian entrepreneur knows but nobody talks about: getting goods from one place to another, reliably, on demand. A $1.5B business hiding in plain sight.",
    cols: [
      {
        h: "The Invisible Infrastructure Problem",
        b: "Every day, millions of Indian small businesses — restaurants, retailers, manufacturers, moving companies — need to transport goods within a city. Before Porter, this meant calling a local mini-truck operator, negotiating prices, waiting unpredictably, and having no recourse if something went wrong.\n\nUttam Digga, Pranav Goel, and Vikas Choudhary founded Porter in 2014 to fix this. Their model was simple: aggregate mini-truck and two-wheeler delivery capacity into an app-based platform, standardise pricing, and give businesses on-demand logistics with GPS tracking and invoice management.",
      },
      {
        h: "Building the B2B Logistics Stack",
        b: "Porter's growth was steady and unglamorous — exactly the kind of business that gets overlooked during the consumer-app boom but compounds powerfully over time. By 2022, Porter was operating in 20+ cities with 5 lakh+ registered driver partners and serving everything from Swiggy restaurant chains to FMCG distributors.\n\nThe $150M Series E in 2022 valued Porter at $1B. The company followed with a $200M raise in 2025, bringing total funding to over $400M and valuation to $1.5B. Investors include Tiger Global, Sequoia, LightBox, and Mahindra.",
      },
      {
        h: "India's Intra-City Logistics Leader",
        b: "Porter now processes over 5 million deliveries per month across 25+ cities. Its product has expanded to include two-wheeler deliveries (Porter Bike), packers and movers, and enterprise logistics contracts with large FMCG and e-commerce companies.\n\nThe company's long-term moat is its driver-partner network and the operational data it has accumulated over a decade — knowing exactly which routes, vehicles, and time windows optimise for speed and cost. That data is impossible to replicate quickly, making Porter one of India's most defensible logistics businesses.",
      },
    ],
    pull: "India has 63 million MSMEs. Almost all of them need to move goods. We just made that reliable.",
    pullBy: "Uttam Digga",
    lesson: "The most durable businesses are built on problems that are large, boring, and essential. Everyone can see them. Few want to solve them.",
    stats: [
      { l: "Valuation",    v: "$1.5B"  },
      { l: "Founded",      v: "2014"   },
      { l: "Driver Partners",v:"5L+"   },
      { l: "Total Raised", v: "$400M+" },
    ],
  },

  // ── 09 · SPINNY ───────────────────────────────────────────────────────────
  {
    no: "09", edition: "No. 09",
    category: "AUTO-TECH",
    name: "Niraj Singh",
    nameShort: "Niraj Singh",
    initials: "S",
    company: "Spinny", slug: "spinny",
    role: "Co-Founder & CEO",
    city: "Gurugram, HR", context: "India's fastest-growing company 2026 — TIME",
    valuation: "$1.8B", funding: "$600M+", founded: "2015",
    imgSrc: "https://images.moneycontrol.com/static-mcnews/2021/12/Niraj-Singh-cofounder-and-CEO-of-Spinny-1.jpg?impolicy=website&width=1600&height=900",
    videoId: "Yz2KUYzFMKo",
    videoTitle: "Niraj Singh on Building Spinny — India's Most Trusted Used Car Platform",
    accent: "#10B981", accentBg: "#ECFDF5", accentBorder: "#A7F3D0",
    headline: "Used car buying in India was a trust problem disguised as a market problem. Spinny solved the trust.",
    deck: "Niraj Singh built Spinny into India's most trusted used car platform by doing the opposite of what the market expected — buying cars outright, fixing them up, and standing behind every sale with a full warranty.",
    cols: [
      {
        h: "The Trust Problem in Used Cars",
        b: "India's used car market is enormous — 4.4 million vehicles sold in FY2024, growing 10% annually. But it was dominated by distrust: buyers worried about hidden accident damage, odometer tampering, and undisclosed service histories. Sellers worried about getting low-balled by aggregators and brokers.\n\nNiraj Singh founded Spinny in 2015 with a specific conviction: the only way to fix trust in used cars was to take full ownership of the vehicle — buy it, inspect it thoroughly, recondition it, and sell it with a warranty. Not a marketplace. A full-stack dealer.",
      },
      {
        h: "The Acquisition of GoMechanic",
        b: "In 2024, Spinny acquired GoMechanic — India's largest car service chain — in a deal that transformed its positioning. With GoMechanic's service network integrated, Spinny could now offer buyers end-to-end car ownership: purchase, service, insurance, and resale.\n\nThe acquisition was strategic and counter-cyclical: GoMechanic had faced governance challenges in 2023, depressing its valuation. Spinny bought a nationally recognised brand and 1000+ service touchpoints at a fraction of its peak value. It was one of the sharpest M&A moves in Indian startup history.",
      },
      {
        h: "TIME's Fastest-Growing Company in India",
        b: "In 2026, TIME Magazine ranked Spinny as the fastest-growing company in India — a recognition that reflected both its revenue trajectory and its expansion from a Gurugram-based startup to a 35-city national platform.\n\nSpinny's model has proven that full-stack, trust-first commerce can work in India even in high-consideration categories. Its NPS (net promoter score) consistently ranks among the highest in Indian auto-tech — built not on advertising, but on what happens after the sale.",
      },
    ],
    pull: "In used cars, the product is trust. Everything else — the app, the showrooms, the warranty — is just how you deliver trust at scale.",
    pullBy: "Niraj Singh",
    lesson: "In markets defined by distrust, the brand that guarantees the experience wins — even if it costs more to build.",
    stats: [
      { l: "Valuation",   v: "$1.8B"  },
      { l: "Founded",     v: "2015"   },
      { l: "Cities",      v: "35+"    },
      { l: "Total Raised",v: "$600M+" },
    ],
  },

  // ── 10 · KRUTRIM AI ───────────────────────────────────────────────────────
  {
    no: "10", edition: "No. 10",
    category: "ARTIFICIAL INTELLIGENCE",
    name: "Bhavish Aggarwal",
    nameShort: "Bhavish Aggarwal",
    initials: "K",
    company: "Krutrim AI", slug: "krutrim-ai",
    role: "Founder & CEO",
    city: "Bengaluru, KA", context: "India's first AI unicorn — built in 7 months",
    valuation: "$1B+", funding: "$50M+", founded: "2023",
    imgSrc: "https://cdn.analyticsvidhya.com/wp-content/uploads/2024/01/image-198.png",
    videoId: "q8dIZrENpII",
    videoTitle: "Bhavish Aggarwal on Building Krutrim — India's First AI Unicorn",
    accent: "#7C3AED", accentBg: "#F5F3FF", accentBorder: "#DDD6FE",
    headline: "Bhavish Aggarwal built Ola. Then he left to build India's first AI company — and hit a billion-dollar valuation in seven months.",
    deck: "Krutrim is Bhavish Aggarwal's bet on India owning its AI future — a full-stack AI company building models, chips, and cloud infrastructure designed for the Indian market.",
    cols: [
      {
        h: "From Ride-Hailing to AI",
        b: "Bhavish Aggarwal co-founded Ola in 2010, building it into India's dominant ride-hailing platform worth over $7B. By 2022, he had handed day-to-day operations to a new team and turned his attention to what he believed was a more important problem: India's complete dependence on foreign AI infrastructure.\n\nIn 2023, he founded Krutrim — the name means 'artificial' in Sanskrit. The company's scope was deliberately ambitious: not just another AI chatbot, but a vertically integrated AI company building its own models, its own AI chips (under the 'Krutrim Si' brand), and its own cloud compute platform.",
      },
      {
        h: "Unicorn in Seven Months",
        b: "Krutrim raised $50M in a funding round led by Matrix Partners India in January 2024, at a $1B valuation. The company was seven months old. It was India's fastest startup to reach unicorn status — beating Zepto's record.\n\nThe fundraise was a signal about investor appetite for Indian AI infrastructure. With ChatGPT reshaping global technology and India's government actively funding domestic AI through the IndiaAI Mission, Krutrim's positioning — Indian AI, built in India, for India — landed at exactly the right moment.",
      },
      {
        h: "The Full-Stack AI Ambition",
        b: "Krutrim's product roadmap is the most vertically ambitious of any Indian AI company. It is building: a multimodal LLM trained on Indian languages and data; 'Krutrim Si' — proprietary AI accelerator chips designed to reduce India's dependency on Nvidia GPUs; and 'Krutrim Cloud' — an AI-native cloud platform for Indian enterprises and developers.\n\nThe company is also developing AI assistants, coding tools, and enterprise AI products — targeting the $6B+ Indian enterprise software market. Critics note the ambition is vast and execution risk is high. Supporters argue India needs exactly this kind of bet to matter in the global AI era.",
      },
    ],
    pull: "India cannot be a consumer of AI built elsewhere. We have to build the models, the chips, and the cloud — the whole stack. That's Krutrim.",
    pullBy: "Bhavish Aggarwal",
    lesson: "The biggest opportunities in AI are not in the applications layer. They're in the infrastructure nobody in India is building.",
    stats: [
      { l: "Valuation",  v: "$1B+"  },
      { l: "Founded",    v: "2023"  },
      { l: "Unicorn In", v: "7 months" },
      { l: "Total Raised",v: "$50M+"},
    ],
  },
]
