// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiArrowRight, FiCheckCircle, FiCode, FiDatabase, FiTrendingUp,
  FiLayout, FiTerminal, FiAward, FiCpu, FiFileText, FiMenu, FiX,
  FiExternalLink, FiMail, FiVideo,
} from "react-icons/fi";

const C = {
  INK: "#0F1629", PAPER: "#F7F8FA", CARD: "#FFFFFF",
  LINE: "#E2E5EC", LINE_SOFT: "#EEF0F5", MUTED: "#6B7280",
  BODY: "#374151", ROYAL: "#1E3A8A", ROYAL_BG: "#EEF2FF",
  ROYAL_BR: "#C7D2FE", GREEN: "#0F5132", GREEN_BG: "#ECFDF5",
  GREEN_BR: "#A7D9BE", RED: "#991B1B",
};

function useHomeFonts() {
  useEffect(() => {
    if (document.getElementById("gateway-font-link")) return;
    const link = document.createElement("link");
    link.id = "gateway-font-link";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
}

export default function Home() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  useHomeFonts();

  const serif = { fontFamily: "'Source Serif 4', Georgia, serif" };
  const mono = { fontFamily: "'IBM Plex Mono', monospace" };

  const partners = [
    { name: "UpForge", tag: "Startup & Venture Registry", logo: "/upforge.jpg" },
    { name: "Arjuna AI", tag: "AI / LLM Research Labs", logo: "/arjuna.jpg" },
    { name: "Strives Studio", tag: "Digital Tech & Media", logo: "/strives.jpg" },
    { name: "CodeVanguard", tag: "Cloud Systems & DevOps", logo: "/codevanguard.jpg" },
    { name: "DataNexus", tag: "Enterprise Intelligence", logo: "/datanexus.jpg" },
  ];

  const tracks = [
    { title: "Full Stack Web Development", slug: "full-stack-web-development", category: "tech",
      icon: <FiCode className="w-5 h-5" style={{ color: C.ROYAL }} />,
      desc: "Component lifecycles, REST APIs, asynchronous database queries, state management, and edge deployment logic.",
      duration: "30 Minutes", topics: ["React / Next.js", "Node.js", "MongoDB / SQL", "System Architecture"] },
    { title: "Core Software Engineering", slug: "software-engineer", category: "tech",
      icon: <FiTerminal className="w-5 h-5" style={{ color: C.INK }} />,
      desc: "Algorithmic runtime analysis, data structure trade-offs, concurrency, memory bottlenecks, and defensive coding.",
      duration: "30 Minutes", topics: ["DSA Logic", "Time Complexity", "OOP Patterns", "Edge-Case Testing"] },
    { title: "AI & Machine Learning Engineering", slug: "ai-ml-intern", category: "ai",
      icon: <FiCpu className="w-5 h-5" style={{ color: C.ROYAL }} />,
      desc: "LLM integration, RAG architectures, model fine-tuning, embeddings vector search, and PyTorch inference pipelines.",
      duration: "30 Minutes", topics: ["LLM / Groq", "Python / PyTorch", "Vector DBs", "RAG Pipelines"] },
    { title: "Data Analytics & SQL", slug: "data-analyst", category: "data",
      icon: <FiDatabase className="w-5 h-5" style={{ color: C.GREEN }} />,
      desc: "Advanced multi-table joins, subqueries, Pandas matrix operations, ETL hygiene, and statistical interpretation.",
      duration: "30 Minutes", topics: ["PostgreSQL", "Pandas", "ETL Pipelines", "Business Metrics"] },
    { title: "Social Media & Growth Marketing", slug: "social-media-marketing", category: "marketing",
      icon: <FiTrendingUp className="w-5 h-5" style={{ color: C.RED }} />,
      desc: "Acquisition funnels, ROAS metrics, audience retention curves, viral hook architectures, and budget allocations.",
      duration: "30 Minutes", topics: ["Performance Ads", "Funnel Conversion", "ROAS / CAC", "Viral Strategy"] },
    { title: "UI/UX & Product Design", slug: "ui-ux-design", category: "design",
      icon: <FiLayout className="w-5 h-5" style={{ color: C.ROYAL }} />,
      desc: "Design system hierarchies, Figma component tokens, usability heuristics, wireframing, and interactive prototyping.",
      duration: "30 Minutes", topics: ["Figma Systems", "UX Heuristics", "Information Architecture", "User Journeys"] },
  ];

  const filteredTracks = activeTab === "all" ? tracks : tracks.filter((t) => t.category === activeTab);
  const scrollToTracks = () => document.getElementById("tracks")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#1E3A8A] selection:text-white"
      style={{ backgroundColor: C.PAPER, color: C.INK, fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif" }}>

      {/* TOP RIBBON */}
      <div className="hidden md:block py-2.5 px-4 text-xs" style={{ backgroundColor: C.INK, color: "#B6BCCB" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">InternAdda Standardized Assessment Gateway</span>
            <span style={{ color: "#5A6379" }}>•</span>
            <span>Talent Pipeline for UpForge, Arjuna AI, Strives Studio & Partners</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]" style={{ color: "#8892A8", ...mono }}>
            <span>Verified Proctored Sandbox</span><span>|</span><span>internadda.com</span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: C.CARD, borderBottom: `1px solid ${C.LINE}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-4">
            <img src="/logo.jpg" alt="InternAdda" className="h-10 w-auto rounded-lg object-contain"
              style={{ border: `1px solid ${C.LINE}` }} onError={(e) => { e.target.style.display = "none"; }} />
            <div className="h-6 w-[1px]" style={{ backgroundColor: C.LINE }}></div>
            <span className="font-bold text-base tracking-tight" style={{ color: C.INK }}>
              InternAdda <span className="font-bold text-xs uppercase block tracking-wider" style={{ color: C.ROYAL }}>Assessment Engine</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold" style={{ color: C.BODY }}>
            <a href="#assessment-overview" className="transition hover:opacity-70">Assessment</a>
            <a href="#tracks" className="transition hover:opacity-70">Tracks</a>
            <Link to="/certificate" className="font-bold transition flex items-center gap-1" style={{ color: C.ROYAL }}>
              <FiAward className="w-4 h-4" /> Certificate
            </Link>
            <Link to="/terms/assessment" className="transition hover:opacity-70">Terms & Refund</Link>
            <a href="https://upforge.org/quiz" target="_blank" rel="noreferrer"
              className="px-3 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1"
              style={{ color: C.GREEN, backgroundColor: C.GREEN_BG, border: `1px solid ${C.GREEN_BR}` }}>
              <span>Free Quiz</span><FiExternalLink className="w-3 h-3" />
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <button onClick={scrollToTracks}
              className="px-6 py-2.5 rounded-xl text-sm font-bold transition active:scale-95 hover:brightness-110"
              style={{ backgroundColor: C.ROYAL, color: "#FFFFFF" }}>
              Start Technical Assessment
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2.5 rounded-xl"
            style={{ color: C.INK, border: `1px solid ${C.LINE}` }} aria-label="Toggle navigation">
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-5 py-6 space-y-4" style={{ backgroundColor: C.CARD, borderBottom: `1px solid ${C.LINE}` }}>
            <div className="p-3.5 rounded-2xl space-y-2" style={{ backgroundColor: C.PAPER, border: `1px solid ${C.LINE}` }}>
              <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: C.MUTED, ...mono }}>Menu</span>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold" style={{ color: C.BODY }}>
                <a href="#assessment-overview" onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl flex items-center space-x-1.5" style={{ backgroundColor: C.CARD, border: `1px solid ${C.LINE}` }}>
                  <FiCpu className="w-4 h-4 shrink-0" style={{ color: C.ROYAL }} /><span>Overview</span>
                </a>
                <a href="#tracks" onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl flex items-center space-x-1.5" style={{ backgroundColor: C.CARD, border: `1px solid ${C.LINE}` }}>
                  <FiCode className="w-4 h-4 shrink-0" style={{ color: C.ROYAL }} /><span>Tracks</span>
                </a>
                <Link to="/certificate" onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl flex items-center space-x-1.5 font-bold"
                  style={{ backgroundColor: C.CARD, border: `1px solid ${C.LINE}`, color: C.ROYAL }}>
                  <FiAward className="w-4 h-4 shrink-0" style={{ color: C.ROYAL }} /><span>Certificate</span>
                </Link>
                <Link to="/terms/assessment" onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl flex items-center space-x-1.5" style={{ backgroundColor: C.CARD, border: `1px solid ${C.LINE}` }}>
                  <FiFileText className="w-4 h-4 shrink-0" style={{ color: C.GREEN }} /><span>Terms</span>
                </Link>
              </div>
            </div>
            <button onClick={() => { setMobileMenuOpen(false); scrollToTracks(); }}
              className="w-full py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center space-x-1.5"
              style={{ backgroundColor: C.ROYAL, color: "#FFFFFF" }}>
              <span>Start Technical Assessment</span><FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
              style={{ backgroundColor: C.ROYAL_BG, border: `1px solid ${C.ROYAL_BR}`, color: C.ROYAL }}>
              <FiAward /><span>Standardized Technical Verification</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.15]" style={{ ...serif, color: C.INK }}>
              Real Technical Proof. <br /><span style={{ color: C.ROYAL }}>Verified by Top Hiring Teams.</span>
            </h1>
            <p className="text-base sm:text-lg max-w-xl leading-relaxed" style={{ color: C.BODY }}>
              Resumes outline experience; structured assessments demonstrate problem-solving.
              Take a 30-minute terminal evaluation and earn your verified qualification credential.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button onClick={scrollToTracks}
                className="px-8 py-4 font-bold rounded-xl transition flex items-center justify-center space-x-2 active:scale-95 hover:brightness-110"
                style={{ backgroundColor: C.ROYAL, color: "#FFFFFF" }}>
                <span>Start Technical Assessment</span><FiArrowRight className="w-4 h-4" />
              </button>
              <Link to="/certificate"
                className="px-7 py-4 font-semibold rounded-xl text-center transition flex items-center justify-center space-x-1.5"
                style={{ backgroundColor: C.CARD, border: `1px solid ${C.LINE}`, color: C.INK }}>
                <FiAward className="w-4 h-4" style={{ color: C.ROYAL }} /><span>View Certificate</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl p-6 sm:p-8 space-y-4" style={{ backgroundColor: C.CARD, border: `1px solid ${C.LINE}` }}>
              <div className="flex items-center justify-between pb-3" style={{ borderBottom: `1px solid ${C.LINE}` }}>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: C.MUTED }}>Credential Overview</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: C.ROYAL_BG, color: C.ROYAL, border: `1px solid ${C.ROYAL_BR}` }}>Verified Round</span>
              </div>
              <div className="space-y-3 text-xs">
                {[
                  { icon: <FiTerminal className="w-4 h-4 mr-1.5" style={{ color: C.ROYAL }} />, title: "Structured 10-Question Terminal",
                    body: "Evaluates practical scenario understanding, core engineering logic, and implementation principles." },
                  { icon: <FiVideo className="w-4 h-4 mr-1.5" style={{ color: C.GREEN }} />, title: "Hardware Presence & Tab Integrity",
                    body: "Fair, proctored environment protecting authentic candidate evaluation." },
                  { icon: <FiAward className="w-4 h-4 mr-1.5" style={{ color: C.ROYAL }} />, title: "Verified Qualification Certificate",
                    body: "Issued immediately upon qualifying to document your verified technical assessment result." },
                ].map((item, i) => (
                  <div key={i} className="p-3.5 rounded-2xl" style={{ backgroundColor: C.PAPER, border: `1px solid ${C.LINE}` }}>
                    <div className="font-bold flex items-center mb-1" style={{ color: C.INK }}>{item.icon}{item.title}</div>
                    <p className="leading-relaxed" style={{ color: C.BODY }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="py-12"
        style={{ backgroundColor: C.CARD, borderTop: `1px solid ${C.LINE}`, borderBottom: `1px solid ${C.LINE}` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-8 space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.MUTED }}>Verified Candidate Registry Shared With</span>
            <p className="text-xs" style={{ color: C.MUTED }}>Technical telemetry shared with engineering leads & partner panels</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {partners.map((p, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-2xl text-center transition flex flex-col items-center justify-center"
                style={{ backgroundColor: C.PAPER, border: `1px solid ${C.LINE}` }}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 mb-2 rounded-xl flex items-center justify-center p-1 overflow-hidden"
                  style={{ backgroundColor: C.CARD, border: `1px solid ${C.LINE}` }}>
                  <img src={p.logo} alt={p.name} className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `<span class="font-bold font-mono text-sm" style="color:${C.ROYAL}">${p.name.substring(0, 2).toUpperCase()}</span>`;
                    }} />
                </div>
                <div className="font-bold text-xs sm:text-sm" style={{ color: C.INK }}>{p.name}</div>
                <div className="text-[10px] mt-0.5" style={{ color: C.MUTED }}>{p.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASSESSMENT OVERVIEW */}
      <section id="assessment-overview" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.ROYAL }}>Standardized Evaluation</span>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight" style={{ ...serif, color: C.INK }}>
            Complete Your Technical Assessment. Earn a Verified Credential.
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: C.BODY }}>
            Take a structured technical assessment conducted through InternAdda. Qualifying candidates
            receive a Verified Technical Round Qualification Certificate that can be retained and presented
            during relevant future hiring opportunities.
          </p>
          <div className="inline-block p-4 rounded-2xl" style={{ backgroundColor: C.CARD, border: `1px solid ${C.LINE}` }}>
            <div className="text-xl sm:text-2xl font-bold" style={{ ...mono, color: C.INK }}>₹29 Assessment Deposit</div>
            <div className="text-xs mt-1" style={{ color: C.MUTED }}>Not a job application or placement fee.</div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            "Score 50% or above to qualify",
            "Complete the assessment fairly and follow the assessment rules",
            "No confirmed cheating, impersonation or prohibited assistance",
            "Qualifying candidates receive the Verified Technical Round Qualification Certificate",
          ].map((rule, i) => (
            <div key={i} className="p-5 rounded-2xl flex items-start space-x-3" style={{ backgroundColor: C.CARD, border: `1px solid ${C.LINE}` }}>
              <FiCheckCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: C.GREEN }} />
              <span className="text-sm font-semibold" style={{ color: C.BODY }}>{rule}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/terms/assessment" className="inline-flex items-center text-xs font-bold underline underline-offset-4 transition hover:opacity-70" style={{ color: C.ROYAL }}>
            View full Assessment Terms & Refund Policy →
          </Link>
        </div>
      </section>

      {/* CERTIFICATE */}
      <section id="certificate" className="py-16 sm:py-20"
        style={{ backgroundColor: C.CARD, borderTop: `1px solid ${C.LINE}`, borderBottom: `1px solid ${C.LINE}` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: C.ROYAL_BG, border: `1px solid ${C.ROYAL_BR}`, color: C.ROYAL }}>
              <FiAward /><span>Tangible Credential</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium" style={{ ...serif, color: C.INK }}>
              Your Technical Round Qualification, Verified.
            </h2>
            <p className="text-sm sm:text-base" style={{ color: C.BODY }}>
              Qualify once. Keep a verified record of your technical assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative w-full max-w-xl rounded-2xl p-3 sm:p-4 transition-transform hover:scale-[1.01]"
                style={{ backgroundColor: C.PAPER, border: `1px solid ${C.LINE}`, boxShadow: "0 8px 24px rgba(15, 22, 41, 0.06)" }}>
                <img src="/certificate.jpg" alt="Sample Verified Technical Round Qualification Certificate"
                  className="w-full h-auto rounded-xl object-contain" style={{ border: `1px solid ${C.LINE}` }} />
                <div className="absolute bottom-6 right-6 px-3 py-1 rounded-lg text-[10px] font-bold text-white"
                  style={{ backgroundColor: "rgba(15,22,41,0.85)", backdropFilter: "blur(6px)", ...mono }}>
                  Sample Official Credential
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4">
                {[
                  "Verified proof of technical assessment qualification",
                  "Useful as supporting evidence during relevant internship & job applications",
                  "May help you skip the initial technical assessment for relevant future UpForge opportunities",
                ].map((line, i) => (
                  <div key={i} className="p-4 rounded-2xl flex items-start space-x-3" style={{ backgroundColor: C.PAPER, border: `1px solid ${C.LINE}` }}>
                    <FiCheckCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: C.ROYAL }} />
                    <span className="text-sm font-semibold" style={{ color: C.BODY }}>{line}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] leading-relaxed italic" style={{ color: C.MUTED }}>
                * Certificate value and assessment-stage exemptions may vary by employer and role. It does not guarantee employment.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link to="/certificate" className="px-6 py-3 font-bold rounded-xl text-xs sm:text-sm text-center transition hover:brightness-110"
                  style={{ backgroundColor: C.ROYAL, color: "#FFFFFF" }}>View Certificate</Link>
                <button onClick={scrollToTracks} className="px-6 py-3 font-bold rounded-xl text-xs sm:text-sm text-center transition"
                  style={{ backgroundColor: C.CARD, border: `1px solid ${C.LINE}`, color: C.INK }}>Start Technical Assessment</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section id="tracks" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.ROYAL }}>Standardized Domains</span>
          <h2 className="text-3xl sm:text-4xl font-medium" style={{ ...serif, color: C.INK }}>Active Assessment Tracks</h2>
          <p className="text-sm" style={{ color: C.BODY }}>Select your track to begin your 30-minute proctored technical evaluation.</p>
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {[
              { id: "all", label: "All Tracks" }, { id: "tech", label: "Engineering & Dev" },
              { id: "ai", label: "AI & ML" }, { id: "data", label: "Data & Analytics" },
              { id: "marketing", label: "Growth Marketing" }, { id: "design", label: "UI/UX Design" },
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="px-4 py-1.5 rounded-xl text-xs font-bold transition"
                style={activeTab === tab.id
                  ? { backgroundColor: C.INK, color: "#FFFFFF" }
                  : { backgroundColor: C.CARD, color: C.BODY, border: `1px solid ${C.LINE}` }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track, i) => (
            <div key={i} onClick={() => navigate(`/test/${track.slug}`)}
              className="rounded-3xl p-6 sm:p-7 transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-0.5"
              style={{ backgroundColor: C.CARD, border: `1px solid ${C.LINE}` }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.ROYAL; e.currentTarget.style.boxShadow = "0 8px 24px rgba(30, 58, 138, 0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.LINE; e.currentTarget.style.boxShadow = "none"; }}>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="p-2.5 rounded-2xl" style={{ backgroundColor: C.PAPER, border: `1px solid ${C.LINE}` }}>{track.icon}</div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                    style={{ ...mono, color: C.ROYAL, backgroundColor: C.ROYAL_BG, border: `1px solid ${C.ROYAL_BR}` }}>₹29 Deposit</span>
                </div>
                <h3 className="text-lg font-bold transition" style={{ color: C.INK }}>{track.title}</h3>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: C.BODY }}>{track.desc}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {track.topics.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 text-[10px] font-medium rounded-md"
                      style={{ backgroundColor: C.PAPER, border: `1px solid ${C.LINE}`, color: C.BODY }}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 flex items-center justify-between text-xs font-semibold" style={{ borderTop: `1px solid ${C.LINE_SOFT}` }}>
                <span className="text-[11px]" style={{ ...mono, color: C.MUTED }}>{track.duration} • 10 Qs</span>
                <span className="font-bold flex items-center" style={{ color: C.ROYAL }}>Start Track <FiArrowRight className="ml-1" /></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REFUND */}
      <section className="py-14" style={{ backgroundColor: C.CARD, borderTop: `1px solid ${C.LINE}` }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          <div className="rounded-3xl p-6 sm:p-8 space-y-4" style={{ backgroundColor: C.PAPER, border: `1px solid ${C.LINE}` }}>
            <h3 className="text-base font-bold" style={{ color: C.INK }}>Prefer a Refund?</h3>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: C.BODY }}>
              Candidates who are eligible for a refund may request it through InternAdda's prescribed refund process.
            </p>
            <div className="p-4 rounded-2xl space-y-2 text-xs" style={{ backgroundColor: C.CARD, border: `1px solid ${C.LINE}` }}>
              <div className="font-semibold flex items-center gap-1.5" style={{ color: C.INK }}>
                <FiMail style={{ color: C.ROYAL }} /><span>To request a refund, email:</span>
              </div>
              <a href="mailto:partners@internadda.com?subject=Refund%20Request%20%E2%80%93%20%5BRegistered%20Email%5D"
                className="font-mono font-bold hover:underline block" style={{ color: C.ROYAL }}>
                partners@internadda.com
              </a>
              <div className="text-[11px]" style={{ color: C.MUTED, ...mono }}>Subject: Refund Request – [Registered Email]</div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: C.MUTED }}>
              Refund requests are verified against the candidate's assessment record and applicable eligibility criteria.
              Where a certificate has already been issued, an approved refund request will invalidate the certificate and withdraw it from further use.
            </p>
            <div className="pt-2 flex items-center justify-between">
              <Link to="/terms/assessment" className="text-xs font-bold underline" style={{ color: C.ROYAL }}>
                View full Assessment Terms →
              </Link>
              <a href="mailto:partners@internadda.com?subject=Refund%20Request%20%E2%80%93%20%5BRegistered%20Email%5D"
                className="px-4 py-2 rounded-xl text-xs font-semibold transition"
                style={{ backgroundColor: C.CARD, border: `1px solid ${C.LINE}`, color: C.BODY }}>
                Request Refund
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-xs" style={{ backgroundColor: C.CARD, borderTop: `1px solid ${C.LINE}`, color: C.MUTED }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center space-x-3">
              <img src="/logo.jpg" alt="Logo" className="h-8 w-auto rounded object-contain"
                onError={(e) => { e.target.style.display = "none"; }} />
              <div className="text-left">
                <span className="font-bold text-sm block" style={{ color: C.INK }}>InternAdda Career Innovations</span>
                <span className="text-[11px]" style={{ color: C.MUTED }}>Standardized Technical Assessment Platform</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 font-medium" style={{ color: C.BODY }}>
              <a href="#assessment-overview" className="hover:opacity-70">Assessment</a>
              <a href="#tracks" className="hover:opacity-70">Tracks</a>
              <Link to="/certificate" className="hover:opacity-70">Certificate</Link>
              <Link to="/terms/assessment" className="hover:opacity-70">Assessment Terms</Link>
              <a href="https://upforge.org/quiz" target="_blank" rel="noreferrer" className="font-bold hover:underline" style={{ color: C.GREEN }}>
                Free Quiz
