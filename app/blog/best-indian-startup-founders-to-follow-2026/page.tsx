// app/blog/best-indian-startup-founders-to-follow-2026/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Indian Startup Founders to Follow in 2026: 10 Builders Reshaping India | UpForge Blog",
  description:
    "The 10 Indian startup founders every entrepreneur, investor, and observer should follow in 2026 — Nithin Kamath, Deepinder Goyal, Kunal Shah, Alakh Pandey, Aadit Palicha, Vineeta Singh, Peyush Bansal and more. What makes them exceptional and what you can learn from each.",
  keywords: [
    "best indian startup founders to follow 2026",
    "top indian entrepreneurs 2026",
    "indian startup founders to watch",
    "nithin kamath deepinder goyal kunal shah",
    "alakh pandey physicswallah founder",
    "indian founder success stories 2026",
    "inspiring indian entrepreneurs 2026",
    "best startup founders india",
    "indian ceo founders to follow",
  ].join(", "),
  alternates: { canonical: "https://upforge.in/blog/best-indian-startup-founders-to-follow-2026" },
  openGraph: {
    title: "Best Indian Startup Founders to Follow in 2026: 10 Builders Reshaping India",
    description: "10 Indian startup founders who are setting the standard for what great building looks like in 2026 — their companies, their principles, and what makes each of them worth studying.",
    url: "https://upforge.in/blog/best-indian-startup-founders-to-follow-2026",
    siteName: "UpForge",
    images: [{ url: "https://upforge.in/og-blog-founders.png", width: 1200, height: 630 }],
    locale: "en_IN", type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "10 Indian Startup Founders to Follow in 2026 | UpForge",
    description: "Nithin Kamath, Deepinder Goyal, Kunal Shah, Alakh Pandey — the Indian founders redefining what ambition looks like in 2026.",
  },
};

const IMGS = {
  hero:     "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=1600&q=85&auto=format",
  nithin:   "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=900&q=80&auto=format",
  deep:     "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80&auto=format",
  kunal:    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80&auto=format",
  alakh:    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=80&auto=format",
  aadit:    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80&auto=format",
  vineeta:  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80&auto=format",
  peyush:   "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=900&q=80&auto=format",
  ritesh:   "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=80&auto=format",
  falguni:  "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=900&q=80&auto=format",
  harshil:  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format",
  closing:  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80&auto=format",
};

const FOUNDERS = [
  {
    num: "01",
    name: "Nithin Kamath",
    company: "Zerodha",
    role: "Co-Founder & CEO",
    sector: "FinTech · Stock Broking",
    val: "$3.6B (Bootstrapped)",
    img: IMGS.nithin,
    slug: "zerodha",
    why: "Nithin Kamath is the most important proof point in India's startup ecosystem — that you can build a $3.6B business without taking a single rupee of external capital, by making the consumer's interest the central product principle.",
    philosophy: "Transparency builds trust faster than marketing ever can. Zerodha publishes its internal data, its mistakes, and its strategic thinking with a candour that no other financial services company in India approaches.",
    principle: "Zero brokerage was not a feature. It was a statement about whose side the company is on. Build for the customer and the business follows.",
    follow: "Nithin is exceptionally active on social media and publishes long-form thinking on FinTech, investing, and company building. Every post is worth reading.",
    keyword: "Nithin Kamath Zerodha Founder",
    accent: "#B45309",
  },
  {
    num: "02",
    name: "Deepinder Goyal",
    company: "Zomato",
    role: "Founder & CEO",
    sector: "Food Delivery & Commerce",
    val: "$17B (NSE Listed)",
    img: IMGS.deep,
    slug: "zomato",
    why: "Deepinder Goyal's most underrated quality is not his business acumen or his product instincts — it is his ability to stay calm and rational when the stock market, the media, and the competitive environment are all screaming that Zomato is finished.",
    philosophy: "Zomato has been wrong about many things — the Uber Eats valuation, the grocery pivot timing, the initial Blinkit thesis. What separates Deepinder from most founders is that he acknowledges these mistakes publicly, learns from them rapidly, and moves forward without defensive rationalization.",
    principle: "Every mistake is an asset if you learn from it faster than your competitor learns from theirs.",
    follow: "Follow Deepinder's annual letters to Zomato shareholders — they are among the most honest, self-aware CEO communications in Indian corporate history.",
    keyword: "Deepinder Goyal Zomato Founder",
    accent: "#DC2626",
  },
  {
    num: "03",
    name: "Kunal Shah",
    company: "CRED",
    role: "Founder & CEO",
    sector: "FinTech · Premium Consumer",
    val: "$6.4B",
    img: IMGS.kunal,
    slug: "cred",
    why: "Kunal Shah is the most intellectually interesting active founder in India. His delta 4 theory of consumer behaviour — that a product must be at least 4 points better on a 10-point scale to permanently change consumer habits — is the clearest framework for thinking about product-market fit that has emerged from the Indian ecosystem.",
    philosophy: "CRED is built on the premise that a credit score is identity — that creditworthy Indians deserve a product built specifically for their segment, not a mass-market product stretched to cover them.",
    principle: "Understand the psychology of your customer before you design the product. CRED's success comes from knowing exactly who it is for — and having the discipline to say no to everyone else.",
    follow: "Kunal's Twitter and LinkedIn are required reading — dense with frameworks, counterintuitive observations, and the kind of thinking that only comes from someone who has built and sold a company before building a bigger one.",
    keyword: "Kunal Shah CRED Founder Delta 4",
    accent: "#7C3AED",
  },
  {
    num: "04",
    name: "Alakh Pandey",
    company: "PhysicsWallah",
    role: "Founder & CEO",
    sector: "EdTech · K-12",
    val: "$1.1B",
    img: IMGS.alakh,
    slug: "physicswallah",
    why: "Alakh Pandey is the most important founder in India's EdTech sector — not because PhysicsWallah is the most valuable company in the space, but because it is the one that proved the right thesis: in a country of 1.4 billion people, affordability is a more powerful moat than quality at premium prices.",
    philosophy: "Alakh's origin story — teaching physics on YouTube from a rented room in Allahabad — is not incidental to PhysicsWallah's identity. It IS the identity. The brand's authenticity flows directly from the founder's lived experience of being exactly the student he now serves.",
    principle: "Build for the student who cannot afford Kota, not the one who can. Serve the underserved with uncompromising quality and the market will come to you.",
    follow: "Alakh is one of the most authentic founders in India on social media — his content for students is watched by millions, and his thinking on affordable education is reshaping how the entire EdTech sector approaches pricing.",
    keyword: "Alakh Pandey PhysicsWallah EdTech Founder",
    accent: "#7C3AED",
  },
  {
    num: "05",
    name: "Aadit Palicha",
    company: "Zepto",
    role: "Co-Founder & CEO",
    sector: "Quick Commerce",
    val: "$5B",
    img: IMGS.aadit,
    slug: "zepto",
    why: "Aadit Palicha was 19 years old when he dropped out of Stanford to build Zepto. At 22, he was running a $5B company. His story is not just about youth — it is about the quality of conviction that comes from someone who has never been told what is impossible.",
    philosophy: "Zepto's founding insight — that Indian consumers would pay a premium for grocery delivery in under 10 minutes if the reliability was absolute — was counterintuitive enough that most investors passed. The ones who invested at seed made 50x returns. The conviction that seems unreasonable is often the one that turns out to be right.",
    principle: "Move faster than anyone thinks is safe. Build the dark store network before you have the customers to justify it. The infrastructure advantage compounds in ways that become impossible to replicate.",
    follow: "Aadit's interviews and podcasts are remarkable for someone his age — sharp, undefensive, and deeply operationally fluent. Watch everything he publishes.",
    keyword: "Aadit Palicha Zepto Founder Quick Commerce",
    accent: "#DC2626",
  },
  {
    num: "06",
    name: "Vineeta Singh",
    company: "Sugar Cosmetics",
    role: "Co-Founder & CEO",
    sector: "D2C Beauty & Cosmetics",
    val: "$500M+",
    img: IMGS.vineeta,
    slug: "sugar-cosmetics",
    why: "Vineeta Singh turned down a ₹1Cr salary offer to build Sugar. That decision — choosing a mission over financial security at a moment when the right answer was not obvious — tells you everything you need to know about the kind of founder she is.",
    philosophy: "Sugar was built on the insight that Indian women were systematically underserved by the international beauty brands dominating the Indian market — products tested on Western skin tones, designed for European climates, priced for aspirational buyers who were increasingly choosing homegrown alternatives.",
    principle: "Build for who you know, not for who you imagine. Vineeta built Sugar for the Indian woman she understood intimately — and that specificity became the brand's most defensible quality.",
    follow: "Vineeta is one of the most active founders in the Indian startup ecosystem on social media and as a speaker. Her content on brand building and D2C strategy is among the best available for consumer founders.",
    keyword: "Vineeta Singh Sugar Cosmetics D2C Founder",
    accent: "#DB2777",
  },
  {
    num: "07",
    name: "Peyush Bansal",
    company: "Lenskart",
    role: "Co-Founder & CEO",
    sector: "D2C Eyewear",
    val: "$4.5B",
    img: IMGS.peyush,
    slug: "lenskart",
    why: "Peyush Bansal built Lenskart by doing something most D2C founders avoid: he went offline. At a time when every investor was pushing digital-only, Peyush bet that eyewear — a category where fit, trial, and expertise matter — needed physical stores backed by digital intelligence.",
    philosophy: "Lenskart's vertical integration — owning the prescription lens manufacturing, the retail stores, and the customer relationship — creates a cost and quality advantage that no pure-play online competitor or traditional optical chain can replicate without rebuilding their entire business model.",
    principle: "Phygital is not a compromise between digital and physical. It is the superiority of combining both in a category where each channel solves a different consumer problem.",
    follow: "Peyush's Shark Tank India appearances have made him one of the most accessible founder voices for early-stage entrepreneurs across India. His investment thesis and business commentary are worth studying closely.",
    keyword: "Peyush Bansal Lenskart D2C Founder",
    accent: "#059669",
  },
  {
    num: "08",
    name: "Ritesh Agarwal",
    company: "OYO",
    role: "Founder & CEO",
    sector: "HospitalityTech",
    val: "$2.4B",
    img: IMGS.ritesh,
    slug: "oyo",
    why: "Ritesh Agarwal started OYO at 17 with a budget hotel booking idea, dropped out of college at 18, and by 22 was running a company worth over $10B. The story of how OYO went from a $10B peak to a $2.4B more sustainable valuation — and how Ritesh navigated that correction — is one of the most instructive founder journeys in Indian startup history.",
    philosophy: "The OYO lesson is twofold: that youth and conviction can build extraordinary things very quickly, and that hypergrowth without operational depth creates fragility that must eventually be corrected. The most important phase of the OYO story is not the ascent — it is the painful but necessary rebuilding that followed.",
    principle: "Build fast. But build with foundations. The correction is always more expensive than the discipline would have been.",
    follow: "Ritesh's public communications have become notably more measured and operationally grounded since the 2022 restructuring. The contrast with his earlier exuberance is itself a masterclass in founder evolution.",
    keyword: "Ritesh Agarwal OYO Founder Story",
    accent: "#D97706",
  },
  {
    num: "09",
    name: "Falguni Nayar",
    company: "Nykaa",
    role: "Founder & CEO",
    sector: "Beauty & D2C Commerce",
    val: "$6.5B (Listed)",
    img: IMGS.falguni,
    slug: "nykaa",
    why: "Falguni Nayar is the most powerful counter-argument to every piece of conventional wisdom about who gets to be a startup founder in India. She started at 49. She had no technical background. She came from investment banking, not from a startup. She built a $6.5B public company.",
    philosophy: "Falguni's 20 years as an investment banker were not a detour. They were the preparation. She had spent two decades studying industries, valuing companies, and identifying structural market opportunities — and when she finally decided to build one herself, she had more strategic clarity than most 25-year-old founders ever develop.",
    principle: "Industry knowledge is a founder advantage, not a liability. The best time to start a company is when you understand the market's structure and its failures from the inside.",
    follow: "Falguni is less active publicly than some other founders on this list, but her annual reports and investor communications are exceptionally clear-eyed about Nykaa's strategy and execution challenges.",
    keyword: "Falguni Nayar Nykaa Founder Story",
    accent: "#DB2777",
  },
  {
    num: "10",
    name: "Harshil Mathur",
    company: "Razorpay",
    role: "Co-Founder & CEO",
    sector: "FinTech · Payments Infrastructure",
    val: "$7.5B",
    img: IMGS.harshil,
    slug: "razorpay",
    why: "Harshil Mathur took a problem that every Indian startup founder faced — broken, developer-unfriendly payment integrations — and built a $7.5B company by solving it better than anyone else. The Razorpay story is the clearest Indian example of developer-led growth: make the thing developers need trivially easy, and adoption becomes self-reinforcing.",
    philosophy: "Razorpay's expansion from payment gateway to neobanking, payroll, and lending reflects a founder who understood from day one that payments were not the destination — they were the trust foundation for a full financial operating system for Indian businesses.",
    principle: "Win the developer's trust first. Everything else that a business needs — banking, payroll, lending — can be built on top of the payment relationship once the developer has made you the default.",
    follow: "Harshil publishes infrequently but substantively. His thinking on the FinTech stack, API design, and Indian business infrastructure is consistently worth the time.",
    keyword: "Harshil Mathur Razorpay Founder",
    accent: "#059669",
  },
];

const RELATED = [
  { name: "Top Indian Unicorns 2026",       slug: "/blog/top-indian-unicorns-2026",             sector: "Stories"   },
  { name: "India Startup Ecosystem 2026",   slug: "/blog/india-startup-ecosystem-2026",         sector: "Ecosystem" },
  { name: "How to Get Startup Funding",     slug: "/blog/how-to-get-startup-funding-india-2026",sector: "Guide"     },
  { name: "Indian Unicorns Registry",       slug: "/indian-unicorns",                           sector: "Rankings"  },
];

export default function BlogFounders() {
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
        }
        body{background:var(--parch)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .a0{animation:fadeUp .44s .00s cubic-bezier(.16,1,.3,1) both}
        .a1{animation:fadeUp .44s .08s cubic-bezier(.16,1,.3,1) both}
        .imgf{position:relative;overflow:hidden}
        .imgf img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;filter:sepia(14%) contrast(108%);transition:transform .6s ease}
        .imgf:hover img{transform:scale(1.03)}
        .founder-card{border:1.5px solid var(--ink);background:var(--white);overflow:hidden;position:relative}
        .principle-block{background:var(--ink);border-left:4px solid var(--gold2);padding:14px 18px;margin-top:12px}
        .follow-block{background:var(--parch2);border:1px solid var(--rule);padding:11px 14px;margin-top:10px}
        .insight-strip{display:inline-flex;align-items:flex-start;gap:8px;background:#FEF3C7;border:1px solid rgba(180,83,9,.25);padding:9px 14px;width:100%;margin-top:10px}
        .sh{display:flex;align-items:center;gap:10px}
        .sh-l{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.28em;color:var(--ink5);font-family:system-ui;white-space:nowrap}
        .sh-r{flex:1;height:1px;background:var(--rule2)}
        .rel-card{display:flex;flex-direction:column;background:var(--white);text-decoration:none;transition:transform .15s,box-shadow .15s;position:relative}
        .rel-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2.5px;background:transparent;transition:background .15s}
        .rel-card:hover{transform:translate(-2px,-2px);box-shadow:4px 4px 0 var(--ink);z-index:1}
        .rel-card:hover::before{background:var(--gold2)}
        .dropcap::first-letter{font-family:'Playfair Display',Georgia,serif;font-size:3.8em;font-weight:900;float:left;line-height:.82;margin-right:8px;margin-top:6px;color:var(--ink)}
        @media(max-width:900px){.founder-two{grid-template-columns:1fr!important}}
      `}</style>

      <article itemScope itemType="https://schema.org/Article" style={{ minHeight:"100vh", background:"var(--parch)" }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context":"https://schema.org","@type":"Article",
          headline:"Best Indian Startup Founders to Follow in 2026: 10 Builders Reshaping India",
          description:"10 Indian startup founders worth following in 2026 — their companies, philosophies, and the founding principles that made them exceptional.",
          author:{"@type":"Organization","name":"UpForge"},
          publisher:{"@type":"Organization","name":"UpForge","url":"https://upforge.in"},
          datePublished:new Date().toISOString().split("T")[0],
          url:"https://upforge.in/blog/best-indian-startup-founders-to-follow-2026",
          keywords:"best indian startup founders to follow 2026, nithin kamath deepinder goyal kunal shah alakh pandey, top indian entrepreneurs",
        })}} />

        {/* BREADCRUMB */}
        <nav className="sf a0" style={{ background:"var(--parch2)", borderBottom:"1px solid var(--rule2)", padding:"8px 0" }}>
          <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 clamp(16px,3vw,36px)" }}>
            <ol style={{ display:"flex", alignItems:"center", gap:6, fontSize:9, color:"var(--ink5)", textTransform:"uppercase", letterSpacing:"0.18em", listStyle:"none", margin:0, padding:0 }}>
              <li><Link href="/" style={{ color:"var(--ink5)", textDecoration:"none" }}>UpForge</Link></li>
              <li style={{ color:"var(--rule)" }}>/</li>
              <li><Link href="/blog" style={{ color:"var(--ink5)", textDecoration:"none" }}>Blog</Link></li>
              <li style={{ color:"var(--rule)" }}>/</li>
              <li style={{ color:"var(--ink4)", fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:220 }}>Indian Founders to Follow 2026</li>
            </ol>
          </div>
        </nav>

        {/* HERO */}
        <div className="a0" style={{ borderBottom:"3px solid var(--ink)" }}>
          <div className="imgf" style={{ height:"clamp(280px,38vw,480px)" }}>
            <img src={IMGS.hero} alt="Best Indian Startup Founders to Follow 2026" />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(26,18,8,.35) 0%,rgba(26,18,8,.88) 100%)" }} />
            <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 clamp(16px,5vw,64px)", textAlign:"center" }}>
              <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap", justifyContent:"center" }}>
                {["10 Founders","Profiles","India 2026"].map(t=>(
                  <span key={t} className="sf" style={{ fontSize:8, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.65)", border:"1px solid rgba(255,255,255,0.2)", padding:"3px 10px" }}>{t}</span>
                ))}
              </div>
              <h1 className="pf" itemProp="headline" style={{ fontSize:"clamp(1.8rem,5.5vw,4.2rem)", fontWeight:900, lineHeight:1.02, color:"white", letterSpacing:"-0.02em", marginBottom:18, maxWidth:880 }}>
                Best Indian Startup Founders to Follow in 2026:{" "}
                <em style={{ color:"#E8C547", fontStyle:"italic" }}>10 Builders Reshaping India</em>
              </h1>
              <p className="rp" style={{ fontSize:"clamp(13px,1.8vw,16px)", color:"rgba(255,255,255,0.62)", fontStyle:"italic", maxWidth:580, lineHeight:1.6 }}>
                What they built. How they think. Why studying them makes you a better founder.
              </p>
            </div>
            <div className="sf" style={{ position:"absolute", top:18, right:18, background:"rgba(26,18,8,.7)", border:"1px solid rgba(255,255,255,.1)", padding:"5px 12px", fontSize:8, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,.55)" }}>
              UpForge · Blog
            </div>
          </div>
          <div style={{ background:"var(--ink)" }}>
            <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 clamp(16px,3vw,36px)" }}>
              <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center" }}>
                {[
                  { l:"Published", v:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}) },
                  { l:"Reading Time", v:"~14 min" },
                  { l:"Founders Profiled", v:"10" },
                  { l:"Category", v:"People · Founders · Leadership" },
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
                The best founders to follow are not the ones with the largest social media followings or the most press coverage. They are the ones whose thinking is worth studying — whose decisions, philosophies, and building principles offer transferable lessons for every founder building in India right now.
              </p>
              <p className="rp" style={{ fontSize:13.5, color:"var(--ink3)", lineHeight:1.85 }}>
                This is UpForge's list of the 10 Indian startup founders most worth following in 2026 — covering why each founder is exceptional, what they believe about building, the principle that defines their company, and why studying them makes you a better builder regardless of what sector you are in.
              </p>
            </div>
            <div style={{ padding:"clamp(24px,3vw,40px) 0 clamp(24px,3vw,40px) clamp(16px,3vw,32px)", minWidth:"clamp(200px,26vw,280px)" }}>
              <div className="sh" style={{ marginBottom:14 }}><span className="sh-l">10 Founders</span><div className="sh-r" /></div>
              {FOUNDERS.map((f,i)=>(
                <a key={i} href={`#founder-${f.num}`} style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:9, textDecoration:"none" }}>
                  <span className="sf" style={{ fontSize:8, fontWeight:700, color:"var(--gold2)", flexShrink:0, minWidth:18 }}>{f.num}</span>
                  <div>
                    <span className="rp" style={{ fontSize:11.5, color:"var(--ink)", fontWeight:600, lineHeight:1.3 }}>{f.name}</span>
                    <span className="sf" style={{ fontSize:8, color:"var(--ink5)", display:"block", lineHeight:1.3 }}>{f.company}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* FOUNDER PROFILES */}
          <div style={{ marginTop:"clamp(32px,5vw,56px)" }}>
            {FOUNDERS.map((f,idx)=>(
              <div key={idx} id={`founder-${f.num}`} className="founder-card" style={{ marginBottom:20, position:"relative" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${f.accent}CC,${f.accent},${f.accent}66)` }} />
                <div className="founder-two" style={{ display:"grid", gridTemplateColumns:idx%2===0?"1fr 320px":"320px 1fr", gap:0, minHeight:360 }}>
                  {idx%2!==0&&(
                    <div className="imgf" style={{ borderRight:"1.5px solid var(--ink)", minHeight:340 }}>
                      <img src={f.img} alt={f.company} />
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(26,18,8,.65) 0%,transparent 60%)" }} />
                      <div style={{ position:"absolute", bottom:20, left:20 }}>
                        <span className="pf" style={{ fontSize:"4rem", fontWeight:900, color:"rgba(255,255,255,0.1)", lineHeight:1 }}>{f.num}</span>
                      </div>
                      <div style={{ position:"absolute", top:20, left:20 }}>
                        <p className="pf" style={{ fontSize:"1.1rem", fontWeight:900, color:"white", lineHeight:1.1, marginBottom:3 }}>{f.name}</p>
                        <p className="sf" style={{ fontSize:7.5, color:"rgba(255,255,255,.5)", textTransform:"uppercase", letterSpacing:"0.16em", fontWeight:600 }}>{f.company}</p>
                      </div>
                    </div>
                  )}

                  <div style={{ padding:"clamp(20px,3vw,34px)", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                        <span className="sf" style={{ fontSize:9, fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase", color:f.accent }}>{f.num} of 10</span>
                        <div style={{ flex:1, height:1, background:"var(--rule2)" }} />
                        <span className="sf" style={{ fontSize:8, color:"var(--ink5)", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" }}>{f.keyword}</span>
                      </div>

                      <h2 className="pf" style={{ fontSize:"clamp(1.2rem,2.5vw,1.75rem)", fontWeight:700, color:"var(--ink)", lineHeight:1.1, marginBottom:4 }}>{f.name}</h2>
                      <p className="sf" style={{ fontSize:9.5, color:"var(--ink4)", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:600 }}>{f.role} · {f.company}</p>
                      <p className="sf" style={{ fontSize:9, color:f.accent, marginBottom:16, fontWeight:700 }}>{f.sector} · {f.val}</p>

                      <div className="sh" style={{ marginBottom:10 }}><span className="sh-l">Why Follow</span><div className="sh-r" /></div>
                      <p className="rp dropcap" style={{ fontSize:13.5, color:"var(--ink3)", lineHeight:1.88, marginBottom:12 }}>{f.why}</p>

                      <div className="sh" style={{ marginBottom:10, marginTop:14 }}><span className="sh-l">Building Philosophy</span><div className="sh-r" /></div>
                      <p className="rp" style={{ fontSize:13, color:"var(--ink3)", lineHeight:1.82, marginBottom:0 }}>{f.philosophy}</p>
                    </div>

                    <div style={{ marginTop:16 }}>
                      <div className="principle-block">
                        <p className="sf" style={{ fontSize:8, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.18em", color:"rgba(232,197,71,.7)", marginBottom:8 }}>Founding Principle · {f.name}</p>
                        <p className="rp" style={{ fontSize:12.5, color:"rgba(255,255,255,.82)", lineHeight:1.75, fontStyle:"italic" }}>{f.principle}</p>
                      </div>
                      <div className="follow-block">
                        <p className="sf" style={{ fontSize:8, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.16em", color:"var(--ink5)", marginBottom:6 }}>💡 How to Follow</p>
                        <p className="rp" style={{ fontSize:12, color:"var(--ink4)", lineHeight:1.7, fontStyle:"italic" }}>{f.follow}</p>
                      </div>
                      <Link href={`/startup/${f.slug}`} style={{ display:"inline-flex", marginTop:12, alignItems:"center", gap:6, fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.12em", color:f.accent, textDecoration:"none", fontFamily:"system-ui" }}>
                        Read {f.company} Story on UpForge →
                      </Link>
                    </div>
                  </div>

                  {idx%2===0&&(
                    <div className="imgf" style={{ borderLeft:"1.5px solid var(--ink)", minHeight:340 }}>
                      <img src={f.img} alt={f.company} />
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to left,rgba(26,18,8,.65) 0%,transparent 60%)" }} />
                      <div style={{ position:"absolute", bottom:20, right:20, textAlign:"right" }}>
                        <span className="pf" style={{ fontSize:"4rem", fontWeight:900, color:"rgba(255,255,255,0.1)", lineHeight:1 }}>{f.num}</span>
                      </div>
                      <div style={{ position:"absolute", top:20, right:20, textAlign:"right" }}>
                        <p className="pf" style={{ fontSize:"1.1rem", fontWeight:900, color:"white", lineHeight:1.1, marginBottom:3 }}>{f.name}</p>
                        <p className="sf" style={{ fontSize:7.5, color:"rgba(255,255,255,.5)", textTransform:"uppercase", letterSpacing:"0.16em", fontWeight:600 }}>{f.company}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CLOSING */}
          <div style={{ marginTop:"clamp(36px,6vw,64px)", border:"1.5px solid var(--ink)", background:"var(--ink)", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--gold3),var(--gold2),#E8C547,var(--gold2),var(--gold3))" }} />
            <div className="imgf" style={{ height:190 }}>
              <img src={IMGS.closing} alt="India founders" style={{ filter:"sepia(40%) brightness(0.32) contrast(1.1)" }} />
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 clamp(20px,5vw,60px)", textAlign:"center" }}>
                <p className="pf" style={{ fontSize:"clamp(1.3rem,3vw,2.2rem)", fontWeight:700, color:"white", lineHeight:1.22, fontStyle:"italic" }}>
                  "The best thing about studying great founders is not what they did.{" "}
                  <em style={{ color:"#E8C547" }}>It is understanding why — so you can apply the principle, not just copy the decision.</em>"
                </p>
              </div>
            </div>
            <div style={{ padding:"clamp(24px,4vw,40px)" }}>
              <p className="rp" style={{ fontSize:14, color:"rgba(255,255,255,.75)", lineHeight:1.88, maxWidth:760 }}>
                Every founder on this list made decisions that seemed wrong to most observers at the time. Every one of them had a clarity about their market, their customer, and their building philosophy that allowed them to hold course when the noise was loudest. That clarity is what UpForge is built to help you develop — by studying the people who have already demonstrated it.
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
                    <div style={{ marginTop:8 }}><span className="sf" style={{ fontSize:8.5, color:"var(--gold2)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em" }}>Read →</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <nav aria-label="Blog navigation" style={{ padding:"16px 0", borderTop:"2px solid var(--ink)", marginTop:"clamp(32px,5vw,52px)" }}>
            <ul style={{ display:"flex", flexWrap:"wrap", gap:"8px 20px", listStyle:"none", margin:0, padding:0 }}>
              {[
                { l:"Indian Startups",       h:"/indian-startups"   },
                { l:"Indian Unicorns 2026",  h:"/indian-unicorns"   },
                { l:"FinTech Startups",      h:"/fintech-startups"  },
                { l:"EdTech Startups",       h:"/edtech-startups"   },
                { l:"D2C Startups",          h:"/d2c-startups"      },
                { l:"Back to Blog",          h:"/blog"              },
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
