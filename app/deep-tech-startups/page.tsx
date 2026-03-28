// app/deep-tech-startups/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Deep Tech Startups in India 2026: AI, Quantum, Robotics & Advanced Materials | UpForge",
  description:
    "The definitive list of India's top deep tech startups in 2026 — Niramai, Ati Motors, Agnikul, SigTuple, Detect Technologies and more. AI diagnostics, autonomous robots, quantum computing, advanced materials. Funding, founders, and India's deep tech revolution. Updated March 2026.",
  keywords: [
    "top deep tech startups India 2026",
    "Indian deep tech startups 2026",
    "Niramai AI diagnostics India",
    "Ati Motors autonomous robots India",
    "SigTuple AI pathology India",
    "Detect Technologies industrial AI",
    "quantum computing startups India",
    "advanced materials startups India",
    "deep tech funding India 2026",
    "India deep tech ecosystem",
    "IITM deep tech startups",
    "deep tech VC India",
    "robotics startups India",
    "AI hardware India startups",
    "India semiconductor startups",
    "photonics startups India",
    "biotech deep tech India",
    "India $60 billion deep tech 2030",
  ].join(", "),
  alternates: { canonical: "https://upforge.in/deep-tech-startups" },
  openGraph: {
    title: "Top Deep Tech Startups in India 2026: AI, Quantum, Robotics & Advanced Materials",
    description:
      "Niramai, Ati Motors, SigTuple, Detect Technologies — India's deep tech revolution profiled. Funding, founders, and what each company is actually building. Updated March 2026.",
    url: "https://upforge.in/deep-tech-startups",
    siteName: "UpForge",
    images: [{ url: "https://upforge.in/og-deeptech.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Deep Tech Startups in India 2026 | UpForge",
    description:
      "India's top deep tech startups — AI diagnostics, autonomous robots, quantum, photonics. The complete guide to India's deep tech ecosystem.",
  },
};

const IMGS = {
  hero:     "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=85&auto=format",
  niramai:  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format",
  ati:      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80&auto=format",
  sigtuple: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80&auto=format",
  detect:   "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80&auto=format",
  scinai:   "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80&auto=format",
  banner:   "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80&auto=format",
};

const REGISTRY = [
  { rank:1,  name:"Niramai Health Analytix", founded:2016, sector:"AI Diagnostics · HealthTech",      funding:"$16.5M", stage:"Series B",  city:"Bengaluru", slug:"niramai" },
  { rank:2,  name:"Ati Motors",              founded:2017, sector:"Autonomous Mobile Robots",         funding:"$20M",   stage:"Series B",  city:"Bengaluru", slug:"ati-motors" },
  { rank:3,  name:"SigTuple",               founded:2015, sector:"AI Pathology & Diagnostics",       funding:"$19.5M", stage:"Series C",  city:"Bengaluru", slug:"sigtuple" },
  { rank:4,  name:"Detect Technologies",    founded:2016, sector:"Industrial AI & Computer Vision",  funding:"$26M",   stage:"Series B",  city:"Chennai",   slug:"detect-technologies" },
  { rank:5,  name:"Unbox Robotics",         founded:2019, sector:"Warehouse Robotics",               funding:"$12M",   stage:"Series A",  city:"Pune",      slug:"unbox-robotics" },
  { rank:6,  name:"Scinai Immunotherapeutics",founded:2019,sector:"Nano-Antibody Therapeutics",      funding:"$30M",   stage:"Series B",  city:"Hyderabad", slug:"scinai" },
  { rank:7,  name:"GreyOrange",             founded:2011, sector:"Fulfillment Robotics & AI",        funding:"$170M",  stage:"Series C",  city:"Gurugram",  slug:"greyorange" },
  { rank:8,  name:"Planys Technologies",    founded:2015, sector:"Subsea Robotics & Inspection",     funding:"$8M",    stage:"Series A",  city:"Chennai",   slug:"planys-technologies" },
  { rank:9,  name:"NewSpace Research",      founded:2018, sector:"UAV Systems & Avionics",           funding:"$5.6M",  stage:"Series A",  city:"Bengaluru", slug:"newspace-research" },
  { rank:10, name:"Zebi Data",              founded:2017, sector:"Data Security · Blockchain",       funding:"$4.5M",  stage:"Seed+",     city:"Hyderabad", slug:"zebi-data" },
  { rank:11, name:"Agriwatch",              founded:2016, sector:"AgriTech · Precision Sensors",     funding:"$6M",    stage:"Series A",  city:"Hyderabad", slug:"agriwatch" },
  { rank:12, name:"Swaayatt Robots",        founded:2016, sector:"Autonomous Driving · L4",         funding:"$3.2M",  stage:"Seed+",     city:"Bhopal",    slug:"swaayatt-robots" },
  { rank:13, name:"Tonbo Imaging",          founded:2012, sector:"Photonics · Defence Imaging",      funding:"$9M",    stage:"Series A",  city:"Bengaluru", slug:"tonbo-imaging" },
  { rank:14, name:"Log 9 Materials",        founded:2015, sector:"Advanced Battery Materials",       funding:"$50M",   stage:"Series C",  city:"Bengaluru", slug:"log9-materials" },
  { rank:15, name:"Ossus Biorenewables",    founded:2019, sector:"Synthetic Biology · Biomaterials", funding:"$2.1M",  stage:"Seed",      city:"Chennai",   slug:"ossus-biorenewables" },
];

const SPOTLIGHTS = [
  {
    rank:"01", name:"Niramai Health Analytix",
    founder:"Geetha Manjunath & Nidhi Mathur",
    funding:"$16.5M", year:2016, city:"Bengaluru",
    sector:"AI Diagnostics · Thermal Imaging · HealthTech",
    badge:"WHO Innovation Award",
    img:IMGS.niramai, slug:"niramai",
    story:"Niramai (Non-Invasive Risk Assessment with Machine Intelligence and Artificial Intelligence) uses proprietary thermography hardware and deep learning to detect breast cancer at Stage 0–1, before a physical lump even forms. Unlike mammography, it requires no radiation, no compression, no trained radiologist, and costs a fraction of conventional screening. The technology works in low-resource settings across India, Bangladesh, and Southeast Asia — precisely where early-cancer detection infrastructure does not exist.",
    why:"Breast cancer kills over 90,000 Indian women every year, mostly because it is detected late. Niramai's approach is not incremental — it is a category-level disruption of how cancer is found, enabling mass screening at Rs 200 per patient instead of Rs 3,000+. The global addressable market for AI cancer diagnostics is $13.7B by 2030, and Niramai has a technology moat that no radiology software company can replicate without the hardware.",
  },
  {
    rank:"02", name:"Ati Motors",
    founder:"Vinayak Bhatt & Saurabh Chandra",
    funding:"$20M", year:2017, city:"Bengaluru",
    sector:"Autonomous Mobile Robots · Industrial Automation",
    badge:"200+ Robots Deployed",
    img:IMGS.ati, slug:"ati-motors",
    story:"Ati Motors builds autonomous material transport robots — the Sherpa series — that navigate complex, dynamic factory and warehouse floors without pre-mapped tracks, magnetic tape, or fixed routes. Its robots use LiDAR-based SLAM (Simultaneous Localisation and Mapping) and custom motion planning algorithms to move between any two points in a facility, adapting in real time to forklifts, workers, and changing layouts. Clients include Mahindra, Bosch, Titan, and Volvo — with 200+ robots deployed across 12 facilities.",
    why:"Global manufacturers are facing an irreversible labour crisis on factory floors. Ati's robots don't replace operators — they replace repetitive internal logistics, freeing humans for skilled tasks. India's manufacturing automation market will grow at 28% CAGR through 2030 as the PLI scheme drives factory construction at scale. Ati has the hardware, the software stack, and the Indian-cost-structure advantage to become the dominant player in Asian factory automation.",
  },
  {
    rank:"03", name:"SigTuple",
    founder:"Apurv Anand, Rohit Kumar Pandey & Tathagato Pal",
    funding:"$19.5M", year:2015, city:"Bengaluru",
    sector:"AI Pathology · Smart Microscopy · Lab Diagnostics",
    badge:"AI-Powered Microscopy",
    img:IMGS.sigtuple, slug:"sigtuple",
    story:"SigTuple has built AI-powered microscopy platforms — Manthana — that automate the analysis of blood smears, urine, semen, and retinal scans. A pathology lab in a small town can now produce specialist-grade diagnostic reports without a specialist. The system digitises slides, runs deep learning inference across thousands of cells per sample, and flags abnormalities with clinical-grade accuracy. Its technology is deployed across 500+ labs in India and has processed over 10 million samples.",
    why:"India has 1 pathologist per 100,000 people — a gap that cannot be filled with training pipelines in any reasonable timeline. SigTuple's platform is the infrastructure layer that makes pathology expertise location-independent. As India's diagnostics market grows to $32B by 2028, SigTuple sits at the intersection of hardware, AI, and regulatory moat — a combination that is almost impossible to build from scratch.",
  },
  {
    rank:"04", name:"Detect Technologies",
    founder:"Tarun Kumar, Harikrishnan Tulsidas & Karthik Bhatt",
    funding:"$26M", year:2016, city:"Chennai",
    sector:"Industrial AI · Computer Vision · Asset Inspection",
    badge:"IIT Madras Incubated",
    img:IMGS.detect, slug:"detect-technologies",
    story:"Detect Technologies builds AI and sensor systems for industrial asset inspection and safety monitoring — pipelines, storage tanks, refineries, power plants. Its D-Sense platform uses guided wave ultrasonics and ML to detect corrosion inside pipelines without shutting them down. Its Visual AI products automate safety compliance monitoring across plants in real time. Clients include Indian Oil, BPCL, Shell, and ONGC, with deployments spanning 40+ facilities globally.",
    why:"Industrial accidents in oil, gas, and power — caused by undetected corrosion or missed safety violations — cost the Indian economy over $2B annually. Detect's technology turns preventable disasters into predicted ones. As India accelerates petrochemical capacity expansion under the PLI scheme, the inspection and safety monitoring market will compound at over 20% CAGR for a decade. Detect has a hardware-software moat plus deep client relationships that take years to build.",
  },
  {
    rank:"05", name:"Log 9 Materials",
    founder:"Akshay Singhal & Kartik Hajela",
    funding:"$50M", year:2015, city:"Bengaluru",
    sector:"Advanced Battery Materials · EV Energy Storage",
    badge:"Graphene Battery Pioneer",
    img:IMGS.scinai, slug:"log9-materials",
    story:"Log 9 Materials is building the battery chemistry that India's EV transition requires but cannot import. Starting from graphene-based aluminium-air batteries and pivoting into fast-charge lithium-ion cells for Indian two- and three-wheelers, Log 9 has developed proprietary electrode materials and cell architectures that deliver faster charging, longer cycle life, and Indian-temperature resilience. Its RapidX battery cells are in commercial deployment with fleet operators, and its gigafactory roadmap is funded through Series C.",
    why:"India's EV ambition is entirely contingent on battery supply that is not Chinese — a strategic imperative that the government, automakers, and VCs all understand. Log 9 is one of the only Indian companies with deep materials science capability, manufacturing infrastructure, and commercial traction simultaneously. As the PLI battery scheme funds gigafactory construction, Log 9's proprietary cell chemistry becomes a sovereign asset.",
  },
];

const STATS = [
  { val:"3,500+",  label:"Deep Tech Startups in India (2025)" },
  { val:"$2.1B+",  label:"Deep Tech Funding in India (2024)" },
  { val:"$60B",    label:"India Deep Tech Economy Target 2030" },
  { val:"450+",    label:"Deep Tech Patents Filed by Startups (2024)" },
];

const SECTORS = [
  { name:"AI & Machine Learning Hardware",     count:420, pct:88 },
  { name:"Robotics & Autonomous Systems",      count:310, pct:72 },
  { name:"BioTech & Life Sciences",            count:280, pct:65 },
  { name:"Advanced Materials & Energy",        count:190, pct:44 },
  { name:"Photonics, Sensors & Imaging",       count:140, pct:33 },
  { name:"Quantum Computing & Cryptography",   count:55,  pct:13 },
];

const TIMELINE = [
  { year:"2018", event:"DST launches Rs 3,660Cr National Mission on Interdisciplinary Cyber-Physical Systems" },
  { year:"2019", event:"IITM Research Park surpasses 100 deep tech startups incubated" },
  { year:"2020", event:"Govt launches Rs 1,000Cr Seed Fund; BIRAC increases deep tech allocations" },
  { year:"2021", event:"Peak XV, Blume, Stellaris launch dedicated deep tech funds; Log 9 raises Series A" },
  { year:"2022", event:"GreyOrange becomes India's first robotics unicorn; defence deep tech FDI opened" },
  { year:"2023", event:"National Deep Tech Startup Policy announced; quantum computing mission funded at Rs 6,003Cr" },
  { year:"2024", event:"Detect Technologies expands to 40+ global facilities; Niramai receives WHO recognition" },
  { year:"2025", event:"3,500+ deep tech startups active; $2.1B raised; 450+ patents filed" },
  { year:"2026", event:"Multiple Series C rounds; Log 9 gigafactory groundbreaking; India joins global quantum race" },
];

const FAQ = [
  {
    q:"Which are the top deep tech startups in India in 2026?",
    a:"India's top deep tech startups in 2026 include GreyOrange ($170M, fulfillment robotics unicorn), Log 9 Materials ($50M, advanced battery materials), Detect Technologies ($26M, industrial AI from IITM), Ati Motors ($20M, autonomous factory robots), SigTuple ($19.5M, AI pathology), and Niramai ($16.5M, AI cancer diagnostics). India now has over 3,500 active deep tech startups.",
  },
  {
    q:"What is deep tech and how does it differ from regular startups?",
    a:"Deep tech startups are built on fundamental scientific or engineering breakthroughs — novel materials, AI hardware, robotics, quantum systems, or biotech — requiring years of R&D before commercialisation. Unlike software startups, deep tech companies have high technical barriers to entry, strong IP moats, and longer funding cycles, but also larger defensibility and TAM. India's deep tech ecosystem is now one of the fastest-growing globally.",
  },
  {
    q:"How large is India's deep tech funding market?",
    a:"India's deep tech startups raised over $2.1 billion in 2024, up from $800M in 2021 — a 2.6x growth in three years. The government's National Deep Tech Startup Policy, the Rs 6,003 crore National Quantum Mission, and the DST's Cyber-Physical Systems programme collectively direct over Rs 15,000 crore toward deep tech R&D and commercialisation.",
  },
  {
    q:"Which cities are the deep tech hubs of India?",
    a:"Bengaluru leads India's deep tech ecosystem with over 40% of all startups, home to Niramai, Ati Motors, SigTuple, Log 9, and GreyOrange. Chennai is the second hub, driven by IIT Madras incubation (Detect Technologies, Planys). Hyderabad, Pune, and Delhi-NCR round out the top five. Each city has distinct sector strengths — Bengaluru for AI/robotics, Chennai for industrial tech, Hyderabad for biotech.",
  },
  {
    q:"Who invests in Indian deep tech startups?",
    a:"Key investors include Peak XV Partners, Blume Ventures, Stellaris Venture Partners, Kalaari Capital, and 3one4 Capital for early-stage. At growth stage, Temasek, Lightrock, and British International Investment have made significant commitments. Government bodies including BIRAC, DST, and DRDO provide non-dilutive grant funding. The government's Rs 1,000 crore Startup India Seed Fund also allocates specifically to deep tech.",
  },
];

export default function DeepTechStartupsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=DM+Sans:wght@400;500;600;700&display=swap');

        .pf { font-family:'Playfair Display',Georgia,serif !important; }
        .ss { font-family:'Source Serif 4',Georgia,serif; }
        .dm { font-family:'DM Sans',system-ui,sans-serif; }

        :root {
          --bg:      #F2F4F2;
          --bg2:     #E8EDE8;
          --bg3:     #DDE5DD;
          --ink:     #0C180E;
          --ink2:    #182018;
          --ink3:    #2E452E;
          --ink4:    #527052;
          --ink5:    #7A9E7A;
          --ink6:    #B0CCB0;
          --rule:    #C4D8C4;
          --rule2:   #D4E4D4;
          --deep:    #0A3D1E;
          --deep2:   #1A6B3A;
          --deep3:   #2E9E5E;
          --deep4:   #7ECFA0;
          --nova:    #0E7A3C;
          --nova2:   #3DAA6E;
          --glow:    #00D4AA;
          --white:   #FCFFFC;
        }

        * { box-sizing:border-box; }
        body { background:var(--bg); margin:0; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position:-400% center; }
          100% { background-position:400% center; }
        }
        @keyframes barGrow {
          from { width:0 !important; }
          to   { width:var(--w); }
        }
        @keyframes nodePulse {
          0%,100% { opacity:.45; transform:scale(1); }
          50% { opacity:.9; transform:scale(1.15); }
        }

        .a0 { animation:fadeUp .5s .00s cubic-bezier(.16,1,.3,1) both; }
        .a1 { animation:fadeUp .5s .10s cubic-bezier(.16,1,.3,1) both; }
        .a2 { animation:fadeUp .5s .22s cubic-bezier(.16,1,.3,1) both; }
        .a3 { animation:fadeUp .5s .34s cubic-bezier(.16,1,.3,1) both; }

        .imgf { position:relative; overflow:hidden; }
        .imgf img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; transition:transform .7s ease; }
        .imgf:hover img { transform:scale(1.05); }

        /* Circuit nodes */
        .nodes { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
        .nodes::before {
          content:''; position:absolute; width:3px; height:3px; border-radius:50%; background:rgba(0,212,170,.6);
          box-shadow:80px 60px 0 rgba(0,212,170,.4),200px 140px 0 rgba(0,212,170,.6),340px 50px 0 rgba(0,212,170,.3),520px 190px 0 rgba(0,212,170,.5),670px 90px 0 rgba(0,212,170,.4),840px 160px 0 rgba(0,212,170,.6),990px 70px 0 rgba(0,212,170,.3),150px 310px 0 rgba(0,212,170,.5),420px 360px 0 rgba(0,212,170,.4),740px 290px 0 rgba(0,212,170,.6),910px 330px 0 rgba(0,212,170,.4);
          animation:nodePulse 3.5s ease-in-out infinite;
        }
        .nodes::after {
          content:''; position:absolute; width:1px; height:1px; border-radius:50%; background:rgba(62,170,110,.7);
          box-shadow:160px 110px 0 rgba(62,170,110,.5),370px 210px 0 rgba(62,170,110,.7),490px 70px 0 rgba(62,170,110,.4),710px 140px 0 rgba(62,170,110,.6),870px 230px 0 rgba(62,170,110,.5),230px 390px 0 rgba(62,170,110,.7);
          animation:nodePulse 5.5s 1.5s ease-in-out infinite;
        }

        .sh { display:flex; align-items:center; gap:12px; }
        .sh-l { font-family:'DM Sans',system-ui,sans-serif; font-size:7.5px; font-weight:700; text-transform:uppercase; letter-spacing:.32em; color:var(--ink5); white-space:nowrap; }
        .sh-r { flex:1; height:1px; background:var(--rule2); }
        .sh-dot { width:4px; height:4px; background:var(--nova); border-radius:50%; flex-shrink:0; }

        .stat-box { border:1.5px solid var(--ink); background:var(--white); padding:24px 20px; text-align:center; position:relative; overflow:hidden; }
        .stat-box::after { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--deep),var(--nova),var(--deep3),var(--glow)); }

        .spot-card {
          border:1.5px solid var(--ink); background:var(--white);
          overflow:hidden; position:relative;
          display:grid; grid-template-columns:300px 1fr;
          min-height:380px;
          transition:box-shadow .2s,transform .2s;
        }
        .spot-card:hover { box-shadow:5px 5px 0 var(--ink); transform:translate(-2px,-2px); }
        .spot-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:3px;
          background:linear-gradient(90deg,var(--deep),var(--nova),var(--deep3),var(--glow),var(--deep3),var(--nova),var(--deep));
          background-size:400% auto; animation:shimmer 5s linear infinite; z-index:3;
        }

        .spot-img { position:relative; border-right:1.5px solid var(--ink); overflow:hidden; background:var(--deep); }
        .spot-img img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:saturate(55%) brightness(.75); transition:transform .7s ease; }
        .spot-card:hover .spot-img img { transform:scale(1.05); }
        .spot-img-ov { position:absolute; inset:0; background:linear-gradient(to right,rgba(10,61,30,.0) 0%,rgba(10,61,30,.55) 100%); pointer-events:none; }
        .hex-ring { position:absolute; bottom:-48px; left:-48px; width:200px; height:200px; border-radius:50%; border:1px solid rgba(0,212,170,.12); pointer-events:none; }
        .hex-ring::after { content:''; position:absolute; inset:30px; border-radius:50%; border:1px solid rgba(0,212,170,.08); }
        .spot-rank { position:absolute; bottom:16px; left:18px; font-family:'Playfair Display',serif; font-size:5rem; font-weight:900; color:rgba(0,212,170,.08); line-height:1; user-select:none; }
        .spot-badge { position:absolute; top:16px; left:16px; font-family:'DM Sans',system-ui,sans-serif; font-size:7px; font-weight:700; text-transform:uppercase; letter-spacing:.18em; padding:3px 9px; background:var(--nova); color:white; z-index:2; }

        .spot-body { padding:clamp(22px,3vw,36px); display:flex; flex-direction:column; justify-content:space-between; }

        .dropcap::first-letter { font-family:'Playfair Display',serif; font-size:3.2em; font-weight:900; float:left; line-height:.78; margin-right:5px; color:var(--nova); }
        .pull-quote { border-left:4px solid var(--nova); padding:10px 0 10px 20px; margin:20px 0; }

        .fund-pill { display:inline-block; padding:2px 9px; border:1px solid rgba(14,122,60,.28); background:rgba(14,122,60,.08); font-family:'DM Sans',system-ui,sans-serif; font-size:11px; font-weight:800; color:var(--nova); }

        .uni-row { display:grid; grid-template-columns:38px 1fr 100px 160px 80px 100px 74px; align-items:center; padding:11px 16px; border-bottom:1px solid var(--rule2); background:var(--white); transition:background .1s; text-decoration:none; color:inherit; }
        .uni-row:hover { background:var(--bg2); }
        .uni-row.header { background:var(--ink); color:rgba(255,255,255,.42); position:sticky; top:0; z-index:4; }

        .bar-track { background:var(--rule2); height:5px; overflow:hidden; }
        .bar-fill { height:100%; background:linear-gradient(90deg,var(--deep),var(--nova),var(--deep3)); animation:barGrow 1.3s cubic-bezier(.16,1,.3,1) .5s both; }

        .tl-dot { width:9px; height:9px; border-radius:50%; background:var(--nova); border:2px solid var(--white); box-shadow:0 0 0 2px var(--nova),0 0 8px rgba(14,122,60,.35); flex-shrink:0; margin-top:4px; }

        .faq-item { border-bottom:1px solid var(--rule2); padding:14px 0; }
        .faq-q { font-family:'DM Sans',system-ui,sans-serif; font-size:13.5px; font-weight:600; color:var(--ink); }
        .faq-a { font-family:'Source Serif 4',Georgia,serif; font-size:13px; color:var(--ink3); line-height:1.85; padding-top:10px; max-width:760px; }

        #rpbar2 { position:fixed; top:0; left:0; height:2px; background:linear-gradient(90deg,var(--deep),var(--nova),var(--deep3),var(--glow)); z-index:999; width:0%; transition:width .1s; pointer-events:none; }

        @media (max-width:860px) {
          .spot-card   { grid-template-columns:1fr !important; }
          .spot-img    { min-height:240px !important; border-right:none !important; border-bottom:1.5px solid var(--ink); }
          .uni-row     { grid-template-columns:30px 1fr 90px 80px !important; }
          .uni-hide    { display:none !important; }
          .stat-grid   { grid-template-columns:repeat(2,1fr) !important; }
          .sector-grid { grid-template-columns:1fr !important; }
          .sb-grid     { grid-template-columns:1fr !important; }
        }
        @media (max-width:560px) { .stat-grid { grid-template-columns:1fr !important; } }
      `}</style>

      <div id="rpbar2" />
      <script dangerouslySetInnerHTML={{ __html:`window.addEventListener('scroll',function(){var el=document.getElementById('rpbar2');if(!el)return;var d=document.documentElement;el.style.width=((d.scrollTop/(d.scrollHeight-d.clientHeight))*100)+'%';});` }} />

      <main itemScope itemType="https://schema.org/CollectionPage" style={{minHeight:"100vh",background:"var(--bg)"}}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:JSON.stringify({"@context":"https://schema.org","@type":"CollectionPage",name:"Top Deep Tech Startups in India 2026",description:"The definitive list of India's top deep tech startups in 2026 — AI, robotics, quantum, advanced materials.",url:"https://upforge.in/deep-tech-startups",publisher:{"@type":"Organization",name:"UpForge",url:"https://upforge.in"},dateModified:new Date().toISOString().split("T")[0]}) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:FAQ.map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}}))}) }} />

        {/* BREADCRUMB */}
        <nav className="dm a0" style={{background:"var(--bg2)",borderBottom:"1px solid var(--rule2)",padding:"9px 0"}}>
          <div style={{maxWidth:1100,margin:"0 auto",padding:"0 clamp(16px,3vw,36px)"}}>
            <ol style={{display:"flex",alignItems:"center",gap:7,fontSize:9,color:"var(--ink5)",textTransform:"uppercase",letterSpacing:"0.18em",listStyle:"none",margin:0,padding:0}}>
              <li><Link href="/" style={{color:"var(--ink5)",textDecoration:"none"}}>UpForge</Link></li>
              <li style={{color:"var(--rule)"}}>›</li>
              <li><Link href="/startup" style={{color:"var(--ink5)",textDecoration:"none"}}>Startups</Link></li>
              <li style={{color:"var(--rule)"}}>›</li>
              <li style={{color:"var(--ink4)",fontWeight:700}}>Deep Tech 2026</li>
            </ol>
          </div>
        </nav>

        {/* HERO */}
        <div className="a0" style={{borderBottom:"3px solid var(--ink)"}}>
          <div className="imgf" style={{height:"clamp(320px,42vw,540px)",background:"var(--deep)"}}>
            <img src={IMGS.hero} alt="Indian deep tech startups 2026 — AI robotics quantum advanced materials" style={{filter:"brightness(.45) saturate(50%)"}} />
            <div className="nodes" />
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,rgba(10,61,30,.2) 0%,rgba(10,61,30,.90) 100%)"}} />
            <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 clamp(18px,5vw,72px)",textAlign:"center"}}>
              <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap",justifyContent:"center"}}>
                {["3,500+ Companies","$2.1B Funded 2024","$60B by 2030","National Quantum Mission"].map(t=>(
                  <span key={t} className="dm" style={{fontSize:7.5,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(126,207,160,.5)",border:"1px solid rgba(126,207,160,.2)",padding:"3px 11px"}}>{t}</span>
                ))}
              </div>
              <h1 className="pf" itemProp="name" style={{fontSize:"clamp(1.9rem,5.5vw,4.4rem)",fontWeight:900,lineHeight:1.0,color:"white",letterSpacing:"-0.03em",marginBottom:20,maxWidth:960}}>
                Deep Tech Startups India 2026:{" "}
                <em style={{color:"#7ECFA0",fontStyle:"italic"}}>AI, Robotics, Quantum & the Science of Impossible Problems</em>
              </h1>
              <p className="ss" style={{fontSize:"clamp(13.5px,1.8vw,16px)",color:"rgba(126,207,160,.55)",fontStyle:"italic",maxWidth:640,lineHeight:1.65}}>
                Robots navigating factory floors. AI reading cancer before it forms. Battery materials designed atom by atom. India's deep tech revolution is built on science that takes years to master — and decades to displace.
              </p>
            </div>
          </div>
          <div style={{background:"var(--ink)"}}>
            <div style={{maxWidth:1100,margin:"0 auto",padding:"0 clamp(16px,3vw,36px)"}}>
              <div style={{display:"flex",flexWrap:"wrap",alignItems:"stretch"}}>
                {[{l:"Updated",v:"March 2026"},{l:"Active Deep Tech Startups",v:"3,500+"},{l:"Total Funding (2024)",v:"$2.1B+"},{l:"2030 Target",v:"$60B Deep Tech Economy"}].map((m,i)=>(
                  <div key={i} style={{padding:"13px 22px",borderRight:"1px solid rgba(255,255,255,.06)"}}>
                    <p className="dm" style={{fontSize:7,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.2em",color:"rgba(255,255,255,.28)",marginBottom:3}}>{m.l}</p>
                    <p className="dm" style={{fontSize:11,color:"rgba(126,207,160,.7)",fontWeight:600}}>{m.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 clamp(16px,3vw,36px) clamp(48px,8vw,100px)"}}>

          {/* INTRO */}
          <div className="a1" style={{padding:"clamp(30px,5vw,52px) 0",borderBottom:"1px solid var(--rule2)"}}>
            <div className="sh" style={{marginBottom:20}}><div className="sh-dot" /><span className="sh-l">India's Deep Tech Story</span><div className="sh-r" /></div>
            <div className="sb-grid" style={{display:"grid",gridTemplateColumns:"1fr clamp(180px,22vw,240px)",gap:"clamp(24px,3vw,44px)",alignItems:"start"}}>
              <div>
                <p className="pf" itemProp="description" style={{fontSize:"clamp(1.1rem,2.3vw,1.4rem)",fontWeight:400,lineHeight:1.72,color:"var(--ink)",marginBottom:18,maxWidth:780}}>
                  Deep tech is not a sector — it is a mode of building. It means founding a company on a scientific insight that took years to develop, building hardware that cannot be replicated without years of iteration, and pursuing markets where the technology itself is the moat. India's deep tech ecosystem crossed 3,500 startups in 2025, raised $2.1 billion, and is now home to robotics unicorns, AI diagnostics companies deployed across three continents, and battery chemistry startups with government backing.
                </p>
                <p className="ss" style={{fontSize:13.5,color:"var(--ink3)",lineHeight:1.88,maxWidth:740}}>
                  This is UpForge's definitive guide to India's top deep tech startups — ranked by funding, technical depth, and strategic significance. From Niramai's cancer-detecting thermography to Log 9's graphene battery cells to Detect Technologies' pipeline inspection AI, these are the companies solving problems that software alone cannot touch.
                </p>
              </div>
              <div style={{borderLeft:"1px solid var(--rule2)",paddingLeft:"clamp(16px,2.5vw,30px)"}}>
                <p className="dm" style={{fontSize:7.5,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.22em",color:"var(--ink5)",marginBottom:12}}>Quick Facts · 2026</p>
                {[["Active Startups","3,500+"],["Funding (2024)","$2.1B"],["Top Hub","Bengaluru (40%)"],["Quantum Mission","₹6,003Cr"],["Seed Fund","₹1,000Cr"],["2030 Target","$60B economy"]].map(([k,v])=>(
                  <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid var(--rule2)"}}>
                    <span className="dm" style={{fontSize:10,color:"var(--ink5)"}}>{k}</span>
                    <span className="dm" style={{fontSize:10,fontWeight:700,color:"var(--ink3)"}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="a2" style={{padding:"clamp(24px,4vw,42px) 0",borderBottom:"1px solid var(--rule2)"}}>
            <div className="sh" style={{marginBottom:20}}><div className="sh-dot" /><span className="sh-l">India Deep Tech · Key Numbers 2026</span><div className="sh-r" /></div>
            <div className="stat-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
              {STATS.map((s,i)=>(
                <div key={i} className="stat-box">
                  <p className="pf" style={{fontSize:"clamp(1.4rem,2.5vw,2.1rem)",fontWeight:900,color:"var(--ink)",marginBottom:7,lineHeight:1}}>{s.val}</p>
                  <p className="dm" style={{fontSize:9,color:"var(--ink4)",lineHeight:1.5,textTransform:"uppercase",letterSpacing:"0.1em"}}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TIMELINE */}
          <div className="a2" style={{padding:"clamp(24px,4vw,42px) 0",borderBottom:"1px solid var(--rule2)"}}>
            <div className="sh" style={{marginBottom:20}}><div className="sh-dot" /><span className="sh-l">India Deep Tech Timeline · 2018 → 2026</span><div className="sh-r" /></div>
            <div style={{position:"relative",paddingLeft:30}}>
              <div style={{position:"absolute",left:4,top:8,bottom:8,width:2,background:"linear-gradient(to bottom,var(--nova),var(--rule2))"}} />
              {TIMELINE.map((m,i)=>(
                <div key={i} style={{display:"flex",gap:18,marginBottom:18,alignItems:"flex-start"}}>
                  <div className="tl-dot" />
                  <div style={{display:"flex",gap:14,alignItems:"baseline",flexWrap:"wrap"}}>
                    <span className="dm" style={{fontSize:8.5,fontWeight:800,color:"var(--nova)",textTransform:"uppercase",letterSpacing:"0.15em",minWidth:38}}>{m.year}</span>
                    <p className="ss" style={{fontSize:13.5,color:"var(--ink3)",lineHeight:1.5,margin:0}}>{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTOR BARS */}
          <div className="a2" style={{padding:"clamp(24px,4vw,42px) 0",borderBottom:"1px solid var(--rule2)"}}>
            <div className="sh" style={{marginBottom:20}}><div className="sh-dot" /><span className="sh-l">Deep Tech Sector Breakdown · India 2026</span><div className="sh-r" /></div>
            <div className="sector-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"13px 44px"}}>
              {SECTORS.map((s,i)=>(
                <div key={i}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span className="dm" style={{fontSize:10.5,fontWeight:700,color:"var(--ink3)"}}>{s.name}</span>
                    <span className="dm" style={{fontSize:9,color:"var(--ink5)",fontWeight:600}}>{s.count} startups</span>
                  </div>
                  <div className="bar-track"><div className="bar-fill" style={{width:`${s.pct}%`,"--w":`${s.pct}%`} as React.CSSProperties} /></div>
                </div>
              ))}
            </div>
          </div>

          {/* SPOTLIGHT CARDS */}
          <div style={{marginTop:"clamp(32px,5vw,58px)"}}>
            <div className="sh" style={{marginBottom:22}}><div className="sh-dot" /><span className="sh-l">5 Deep Tech Deep Dives · Founders & Missions</span><div className="sh-r" /></div>
            <p className="ss" style={{fontSize:13,color:"var(--ink4)",marginBottom:26,fontStyle:"italic"}}>
              Five companies at the frontier of India's deep tech ecosystem — the science, the milestones, and what each one is really building toward.
            </p>

            {SPOTLIGHTS.map((s,idx)=>(
              <article key={idx} className="spot-card" style={{marginBottom:24}} itemScope itemType="https://schema.org/Organization">
                <div className="spot-img">
                  <img src={s.img} alt={`${s.name} — Indian deep tech startup 2026`} itemProp="logo" />
                  <div className="spot-img-ov" />
                  <div className="hex-ring" />
                  <span className="spot-rank">{s.rank}</span>
                  <span className="spot-badge">{s.badge}</span>
                </div>
                <div className="spot-body">
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                      <span className="dm" style={{fontSize:8,fontWeight:800,letterSpacing:"0.22em",textTransform:"uppercase",color:"var(--nova)"}}>Rank {s.rank}</span>
                      <div style={{flex:1,height:1,background:"var(--rule2)"}} />
                      <span className="dm" style={{fontSize:7.5,color:"var(--ink5)",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase"}}>{s.city} · {s.year}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"baseline",gap:10,marginBottom:5,flexWrap:"wrap"}}>
                      <h2 className="pf" itemProp="name" style={{fontSize:"clamp(1.3rem,2.5vw,2rem)",fontWeight:700,color:"var(--ink)",lineHeight:1.1}}>{s.name}</h2>
                      <span className="fund-pill">{s.funding}</span>
                    </div>
                    <p className="dm" style={{fontSize:9.5,color:"var(--ink4)",marginBottom:18,textTransform:"uppercase",letterSpacing:"0.14em",fontWeight:600}}>{s.sector}</p>
                    <p className="ss dropcap" style={{fontSize:13.5,color:"var(--ink2)",lineHeight:1.88,marginBottom:0}}>{s.story}</p>
                    <div className="pull-quote">
                      <p className="ss" style={{fontSize:13,color:"var(--ink3)",lineHeight:1.82,fontStyle:"italic",margin:0}}>{s.why}</p>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,paddingTop:16,borderTop:"1px solid var(--rule2)",marginTop:4}}>
                    <div>
                      <p className="dm" style={{fontSize:7.5,color:"var(--ink5)",textTransform:"uppercase",letterSpacing:"0.14em",marginBottom:3}}>Founded by</p>
                      <p className="dm" style={{fontSize:11,fontWeight:700,color:"var(--ink)"}} itemProp="founder">{s.founder}</p>
                    </div>
                    <Link href={`/startup/${s.slug}`} style={{display:"inline-flex",alignItems:"center",gap:7,background:"var(--ink)",color:"white",padding:"9px 18px",textDecoration:"none",fontSize:8.5,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.15em",fontFamily:"'DM Sans',system-ui"}}>
                      Full Profile →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* REGISTRY TABLE */}
          <div style={{marginTop:"clamp(36px,6vw,68px)"}}>
            <div className="sh" style={{marginBottom:16}}><div className="sh-dot" /><span className="sh-l">Complete Deep Tech Registry · India 2026</span><div className="sh-r" /></div>
            <p className="ss" style={{fontSize:12.5,color:"var(--ink4)",marginBottom:18,fontStyle:"italic"}}>India's funded deep tech startups — AI, robotics, biotech, advanced materials, photonics, and quantum.</p>
            <div style={{border:"1.5px solid var(--ink)",overflow:"hidden"}}>
              <div className="uni-row header">
                {["#","Company","Funding","Sector","City","Stage","Founded"].map((h,i)=>(
                  <span key={i} className={`dm${i>3?" uni-hide":""}`} style={{fontSize:7.5,fontWeight:800,letterSpacing:"0.2em",textTransform:"uppercase"}}>{h}</span>
                ))}
              </div>
              {REGISTRY.map(u=>(
                <Link key={u.rank} href={`/startup/${u.slug}`} className="uni-row">
                  <span className="dm" style={{fontSize:9,fontWeight:700,color:"var(--ink5)"}}>{u.rank}</span>
                  <span className="dm" style={{fontSize:12,fontWeight:800,color:"var(--ink)"}}>{u.name}</span>
                  <span className="dm uni-hide" style={{fontSize:11,fontWeight:800,color:"var(--nova)"}}>{u.funding}</span>
                  <span className="dm uni-hide" style={{fontSize:9.5,color:"var(--ink4)",fontWeight:600}}>{u.sector}</span>
                  <span className="dm uni-hide" style={{fontSize:9.5,color:"var(--ink5)"}}>{u.city}</span>
                  <span className="dm uni-hide" style={{fontSize:9,color:"var(--ink4)"}}>{u.stage}</span>
                  <span className="dm uni-hide" style={{fontSize:10,color:"var(--ink5)"}}>{u.founded}</span>
                </Link>
              ))}
              <div style={{background:"var(--bg2)",padding:"14px 16px",borderTop:"1px solid var(--rule2)",textAlign:"center"}}>
                <Link href="/startup" className="dm" style={{fontSize:9,fontWeight:700,color:"var(--nova)",textTransform:"uppercase",letterSpacing:"0.16em",textDecoration:"none"}}>View Full Startup Registry →</Link>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div style={{marginTop:"clamp(36px,6vw,68px)"}}>
            <div className="sh" style={{marginBottom:20}}><div className="sh-dot" /><span className="sh-l">Frequently Asked Questions · India Deep Tech</span><div className="sh-r" /></div>
            <div style={{border:"1.5px solid var(--ink)",background:"var(--white)",overflow:"hidden"}}>
              <div style={{background:"var(--ink)",padding:"12px 20px"}}>
                <span className="dm" style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:"0.2em"}}>Questions · People Also Ask</span>
              </div>
              <div style={{padding:"4px 24px 20px"}}>
                {FAQ.map((f,i)=>(
                  <div key={i} className="faq-item" itemScope itemType="https://schema.org/Question">
                    <p className="faq-q" itemProp="name">{f.q}</p>
                    <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                      <p className="faq-a" itemProp="text">{f.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CLOSING BANNER */}
          <div style={{marginTop:"clamp(36px,6vw,68px)",border:"1.5px solid var(--ink)",background:"var(--deep)",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,var(--deep),var(--nova),var(--deep3),var(--glow),var(--deep3),var(--nova),var(--deep))",backgroundSize:"400% auto",animation:"shimmer 6s linear infinite"}} />
            <div className="imgf" style={{height:210}}>
              <img src={IMGS.banner} alt="India deep tech ecosystem 2026" style={{filter:"brightness(.15) saturate(30%)"}} />
              <div className="nodes" />
              <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 clamp(24px,5vw,72px)",textAlign:"center"}}>
                <p className="pf" style={{fontSize:"clamp(1.2rem,2.8vw,2.1rem)",fontWeight:700,color:"white",lineHeight:1.22,fontStyle:"italic"}}>
                  "India's deep tech founders are not building features. They are building{" "}
                  <em style={{color:"#7ECFA0"}}>the science itself</em> — and that cannot be forked, cloned, or outspent."
                </p>
              </div>
            </div>
            <div style={{padding:"clamp(20px,3vw,36px)"}}>
              <p className="ss" style={{fontSize:13.5,color:"rgba(126,207,160,.6)",lineHeight:1.88,maxWidth:780}}>
                UpForge tracks every significant deep tech startup in India — from seed to scale. The companies rewriting what India can build at the molecular, atomic, and algorithmic level. India's $60 billion deep tech economy target requires hundreds more Niramai, Log 9, and Detect Technologies stories to succeed.
              </p>
            </div>
          </div>

          {/* FOOTER NAV */}
          <nav aria-label="Related pages" style={{padding:"18px 0",borderTop:"2px solid var(--ink)",marginTop:"clamp(32px,5vw,56px)"}}>
            <ul style={{display:"flex",flexWrap:"wrap",gap:"8px 22px",listStyle:"none",margin:0,padding:0}}>
              {[
                {l:"IIT Madras Startups",h:"/iit-madras-startups"},
                {l:"SpaceTech Startups",h:"/spacetech-startups"},
                {l:"Top AI Startups 2026",h:"/top-ai-startups"},
                {l:"Indian Unicorns 2026",h:"/indian-unicorns"},
                {l:"Top Funded Startups",h:"/top-funded-startups"},
                {l:"Startup Registry",h:"/startup"},
                {l:"Submit Your Startup",h:"/submit"},
              ].map(lnk=>(
                <li key={lnk.h}><Link href={lnk.h} className="dm" style={{fontSize:8.5,color:"var(--ink5)",textTransform:"uppercase",letterSpacing:"0.15em",textDecoration:"none"}}>{lnk.l}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
    </>
  );
}
