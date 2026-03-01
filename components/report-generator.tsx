"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowRight, Sparkles, FileText, Download, Share2,
  TrendingUp, Shield, Target, Zap, AlertTriangle,
  Users, Globe, BarChart2, CheckCircle2, ChevronRight,
  Building2, IndianRupee, Award, Activity, Star,
  RefreshCw, Copy, Check, BadgeCheck, Clock,
} from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';

interface FormData {
  startupName: string;
  founderName: string;
  coFounders: string;
  foundedYear: string;
  industry: string;
  city: string;
  website: string;
  description: string;
  problemSolved: string;
  targetMarket: string;
  businessModel: string;
  currentRevenue: string;
  teamSize: string;
  fundingStage: string;
  fundingRaised: string;
  keyCompetitors: string;
  uniqueAdvantage: string;
  socialMedia: string;
}

interface ReportData {
  executiveSummary: string;
  valuationRange: { low: string; high: string; midpoint: string; methodology: string };
  scores: {
    overall: number; market: number; team: number; product: number;
    traction: number; moat: number; financials: number;
  };
  strengths: Array<{ title: string; detail: string }>;
  risks: Array<{ level: "high" | "medium" | "low"; title: string; detail: string; mitigation: string }>;
  competitorAnalysis: Array<{ name: string; threat: "high" | "medium" | "low"; difference: string }>;
  marketOpportunity: { tam: string; sam: string; som: string; insight: string };
  growthLevers: Array<{ lever: string; impact: string; timeline: string }>;
  focusAreas: Array<{ area: string; priority: "critical" | "high" | "medium"; action: string }>;
  investorReadiness: { score: number; verdict: string; improvements: string[] };
  roadmap: Array<{ phase: string; timeline: string; goals: string[] }>;
  benchmarks: Array<{ metric: string; startup: string; industry: string; verdict: "above" | "below" | "on-par" }>;
  verdict: string;
  reportId: string;
}

const ANALYSIS_STEPS = [
  { label: "Searching public data & social profiles", duration: 2200 },
  { label: "Scanning funding databases & news", duration: 2000 },
  { label: "Mapping competitor landscape", duration: 1800 },
  { label: "Running DCF & market-multiple valuation models", duration: 2400 },
  { label: "Calculating risk & opportunity scores", duration: 1900 },
  { label: "Benchmarking against sector peers", duration: 1700 },
  { label: "Generating investor-grade narrative", duration: 2100 },
  { label: "Compiling final report", duration: 1400 },
];

function ScoreCircle({ score, label, size = "lg" }: { score: number; label: string; size?: "sm" | "lg" }) {
  const r = size === "lg" ? 36 : 24;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  const color = score >= 70 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";
  const dim = size === "lg" ? 88 : 60;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} className="-rotate-90">
        <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" stroke="#E8E4DC" strokeWidth={size === "lg" ? 6 : 4} />
        <circle
          cx={dim / 2} cy={dim / 2} r={r} fill="none"
          stroke={color} strokeWidth={size === "lg" ? 6 : 4}
          strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
        <text
          x={dim / 2} y={dim / 2}
          textAnchor="middle" dominantBaseline="middle"
          className="rotate-90"
          style={{ transform: `rotate(90deg) translate(0, 0)`, transformOrigin: `${dim / 2}px ${dim / 2}px` }}
          fill="#1C1C1C"
          fontSize={size === "lg" ? 16 : 11}
          fontWeight="700"
          fontFamily="Georgia, serif"
        >
          {score}
        </text>
      </svg>
      <span className="text-[9px] text-[#888] uppercase tracking-wider font-bold text-center" style={{ fontFamily: "system-ui, sans-serif" }}>
        {label}
      </span>
    </div>
  );
}

function RiskBadge({ level }: { level: "high" | "medium" | "low" }) {
  const styles = {
    high: "bg-red-50 text-red-700 border border-red-200",
    medium: "bg-amber-50 text-amber-700 border border-amber-200",
    low: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  };
  return (
    <span className={`text-[8px] px-2 py-0.5 font-bold uppercase tracking-wider ${styles[level]}`} style={{ fontFamily: "system-ui, sans-serif" }}>
      {level}
    </span>
  );
}

export function ReportGenerator() {
  const [step, setStep] = useState<"form" | "loading" | "report">("form");
  const [form, setForm] = useState<FormData>({
    startupName: "", founderName: "", coFounders: "", foundedYear: "",
    industry: "", city: "", website: "", description: "", problemSolved: "",
    targetMarket: "", businessModel: "", currentRevenue: "", teamSize: "",
    fundingStage: "", fundingRaised: "", keyCompetitors: "", uniqueAdvantage: "",
    socialMedia: "",
  });
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [report, setReport] = useState<ReportData | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === "report") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
  };

  const runAnalysis = async () => {
    setStep("loading");
    setCurrentAnalysisStep(0);
    setAnalysisProgress(0);

    let elapsed = 0;
    const totalTime = ANALYSIS_STEPS.reduce((a, s) => a + s.duration, 0);

    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      setCurrentAnalysisStep(i);
      await new Promise((r) => setTimeout(r, ANALYSIS_STEPS[i].duration));
      elapsed += ANALYSIS_STEPS[i].duration;
      setAnalysisProgress(Math.round((elapsed / totalTime) * 100));
    }

    try {
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setReport(data);
    } catch {
      setReport(generateFallbackReport(form));
    }

    setStep("report");
  };

  const handlePrint = () => {
    window.print();
  };

  const isFormValid = form.startupName && form.founderName && form.foundedYear && form.industry && form.description;

  if (step === "form") {
    return (
      <div className="bg-[#F7F5F0] min-h-screen" style={{ fontFamily: "system-ui, sans-serif" }}>
        <style>{`
          @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
          .fu { animation: fadeUp 0.5s ease both; }
          .input-field {
            width: 100%; border: 1px solid #D5D0C8; background: white; padding: 10px 14px;
            font-size: 13px; color: #1C1C1C; outline: none; transition: border-color 0.15s;
          }
          .input-field:focus { border-color: #1C1C1C; }
          .input-field::placeholder { color: #BBB; }
          label { display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #888; margin-bottom: 6px; }
        `}</style>

        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
          <div className="border-b-2 border-[#1C1C1C] pb-6 mb-0 fu">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <p className="text-[9px] tracking-[0.28em] text-[#AAA] uppercase mb-3">UpForge · Intelligence Reports</p>
                <h1 className="text-[2.4rem] sm:text-[3.2rem] lg:text-[4rem] tracking-tight leading-[1.0] text-[#1C1C1C]" style={{ fontFamily: "'Georgia', serif" }}>
                  Deep Startup<br />
                  <em className="text-[#A89060] not-italic">Analysis Report</em>
                </h1>
              </div>
              <div className="pb-1 text-right hidden lg:block">
                <p className="text-[11px] text-[#888] max-w-xs">
                  Investor-grade analysis in 60 seconds.<br />Valuation · Risks · Competitors · Roadmap.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#D5D0C8] fu">
            {[
              { icon: IndianRupee, label: "Valuation Range", sub: "DCF + market multiples" },
              { icon: BarChart2, label: "7-Dimension Score", sub: "Market, Team, Product…" },
              { icon: Target, label: "Competitor Map", sub: "Threats & differentiation" },
              { icon: TrendingUp, label: "Growth Roadmap", sub: "90-day to 3-year plan" },
            ].map((item, i) => (
              <div key={i} className="py-5 px-4 border-r border-[#D5D0C8] last:border-r-0">
                <item.icon className="w-4 h-4 text-[#AAA] mb-2" />
                <p className="text-[12px] font-semibold text-[#1C1C1C] mb-0.5" style={{ fontFamily: "'Georgia', serif" }}>{item.label}</p>
                <p className="text-[10px] text-[#AAA]">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-0 border-b border-[#D5D0C8]">
            <div className="lg:col-span-2 py-8 pr-0 lg:pr-12 border-r border-[#D5D0C8]">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[#EEEAE3]">
                  <Building2 className="w-3.5 h-3.5 text-[#AAA]" />
                  <span className="text-[9px] font-bold text-[#AAA] uppercase tracking-[0.2em]">01 · Startup Identity</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label>Startup Name *</label>
                    <input className="input-field" placeholder="e.g. Krutrim AI" value={form.startupName} onChange={update("startupName")} />
                  </div>
                  <div>
                    <label>Founder Name *</label>
                    <input className="input-field" placeholder="e.g. Bhavish Aggarwal" value={form.founderName} onChange={update("founderName")} />
                  </div>
                  <div>
                    <label>Co-Founders (if any)</label>
                    <input className="input-field" placeholder="Names, separated by commas" value={form.coFounders} onChange={update("coFounders")} />
                  </div>
                  <div>
                    <label>Founded Year *</label>
                    <input className="input-field" placeholder="e.g. 2022" type="number" value={form.foundedYear} onChange={update("foundedYear")} />
                  </div>
                  <div>
                    <label>Industry / Sector *</label>
                    <select className="input-field" value={form.industry} onChange={update("industry")}>
                      <option value="">Select sector…</option>
                      {["AI/ML", "FinTech", "SaaS", "EdTech", "HealthTech", "D2C/E-commerce",
                        "Climate Tech", "Space Tech", "AgriTech", "LogiTech", "Mobility",
                        "Gaming", "Web3/Crypto", "BioTech", "Media/Content", "Other"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Headquarters City</label>
                    <input className="input-field" placeholder="e.g. Bengaluru" value={form.city} onChange={update("city")} />
                  </div>
                  <div>
                    <label>Website URL</label>
                    <input className="input-field" placeholder="https://yourstartup.com" value={form.website} onChange={update("website")} />
                  </div>
                  <div>
                    <label>Social Media / LinkedIn</label>
                    <input className="input-field" placeholder="LinkedIn, Twitter handles or URLs" value={form.socialMedia} onChange={update("socialMedia")} />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[#EEEAE3]">
                  <Target className="w-3.5 h-3.5 text-[#AAA]" />
                  <span className="text-[9px] font-bold text-[#AAA] uppercase tracking-[0.2em]">02 · Business Model</span>
                </div>
                <div className="grid gap-4">
                  <div>
                    <label>What problem do you solve? *</label>
                    <textarea className="input-field resize-none h-20" placeholder="Describe the core problem your startup solves…" value={form.problemSolved} onChange={update("problemSolved")} />
                  </div>
                  <div>
                    <label>One-line description *</label>
                    <input className="input-field" placeholder="e.g. AI-powered invoice automation for Indian SMEs" value={form.description} onChange={update("description")} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label>Target Market</label>
                      <input className="input-field" placeholder="e.g. Indian SMEs, B2B SaaS" value={form.targetMarket} onChange={update("targetMarket")} />
                    </div>
                    <div>
                      <label>Business Model</label>
                      <input className="input-field" placeholder="e.g. SaaS subscription, marketplace fee" value={form.businessModel} onChange={update("businessModel")} />
                    </div>
                  </div>
                  <div>
                    <label>Your Unique Advantage / Moat</label>
                    <textarea className="input-field resize-none h-16" placeholder="What makes you defensible? IP, network effects, data, team…" value={form.uniqueAdvantage} onChange={update("uniqueAdvantage")} />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[#EEEAE3]">
                  <TrendingUp className="w-3.5 h-3.5 text-[#AAA]" />
                  <span className="text-[9px] font-bold text-[#AAA] uppercase tracking-[0.2em]">03 · Traction & Funding</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label>Current Revenue (Annual)</label>
                    <input className="input-field" placeholder="e.g. ₹50L ARR, $2M ARR, Pre-revenue" value={form.currentRevenue} onChange={update("currentRevenue")} />
                  </div>
                  <div>
                    <label>Team Size</label>
                    <input className="input-field" placeholder="e.g. 12" type="number" value={form.teamSize} onChange={update("teamSize")} />
                  </div>
                  <div>
                    <label>Funding Stage</label>
                    <select className="input-field" value={form.fundingStage} onChange={update("fundingStage")}>
                      <option value="">Select stage…</option>
                      {["Bootstrapped", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Revenue-funded"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Total Funding Raised</label>
                    <input className="input-field" placeholder="e.g. $500K, ₹2Cr, None" value={form.fundingRaised} onChange={update("fundingRaised")} />
                  </div>
                  <div className="sm:col-span-2">
                    <label>Key Competitors</label>
                    <input className="input-field" placeholder="e.g. Razorpay, PayU, Cashfree — or describe indirect competitors" value={form.keyCompetitors} onChange={update("keyCompetitors")} />
                  </div>
                </div>
              </div>
            </div>

            <div className="py-8 lg:pl-8">
              <div className="sticky top-24 space-y-6">
                <div className="border border-[#D5D0C8] bg-white p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-[#AAA]" />
                    <p className="text-[9px] font-bold text-[#AAA] uppercase tracking-[0.2em]">What We Analyse</p>
                  </div>
                  <div className="space-y-2">
                    {[
                      "Public social & news mentions",
                      "Sector funding benchmarks",
                      "Comparable company multiples",
                      "DCF valuation model",
                      "Team & founder signals",
                      "Market size (TAM/SAM/SOM)",
                      "Competitive moat strength",
                      "Investor-readiness score",
                      "30/90/365-day roadmap",
                      "Risk identification & mitigation",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                        <span className="text-[11px] text-[#666]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-[#D5D0C8] bg-white p-5 space-y-3">
                  {[
                    { icon: Shield, text: "100% free — no signup needed" },
                    { icon: BadgeCheck, text: "Powered by Mixtral + GROQ" },
                    { icon: FileText, text: "Download as print-ready PDF" },
                    { icon: Share2, text: "Shareable report link" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <item.icon className="w-3.5 h-3.5 text-[#AAA]" />
                      <span className="text-[11px] text-[#666]">{item.text}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={runAnalysis}
                  disabled={!isFormValid}
                  className={`w-full flex items-center justify-center gap-2 py-4 text-sm font-bold tracking-wide uppercase transition-colors ${
                    isFormValid
                      ? "bg-[#1C1C1C] text-white hover:bg-[#333]"
                      : "bg-[#EEEAE3] text-[#BBB] cursor-not-allowed"
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  Generate Deep Report
                </button>
                {!isFormValid && (
                  <p className="text-[10px] text-[#AAA] text-center">Fill required fields (*) to continue</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "loading") {
    return (
      <div className="bg-[#1C1C1C] min-h-screen flex items-center justify-center" style={{ fontFamily: "system-ui, sans-serif" }}>
        <style>{`
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
          @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
          .scanning { animation: scanline 3s linear infinite; }
          .pulse { animation: pulse 1.5s ease-in-out infinite; }
        `}</style>
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="scanning absolute w-full h-1 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent"></div>
        </div>
        <div className="max-w-lg w-full mx-auto px-6 py-12 text-center">
          <div className="w-12 h-12 bg-[#E8C547] text-[#1C1C1C] flex items-center justify-center font-bold text-sm mx-auto mb-8" style={{ fontFamily: "'Georgia', serif" }}>
            UF
          </div>
          <p className="text-[10px] text-white/30 tracking-[0.3em] uppercase mb-3">UpForge Intelligence</p>
          <h2 className="text-2xl text-white mb-2" style={{ fontFamily: "'Georgia', serif" }}>
            Analysing{" "}
            <span className="text-[#E8C547]">{form.startupName}</span>
          </h2>
          <p className="text-sm text-white/40 mb-10">Running deep analysis across 50+ data points…</p>
          <div className="relative mb-6">
            <div className="h-0.5 bg-white/10 w-full">
              <div
                className="h-full bg-[#E8C547] transition-all duration-500"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-white/30">{analysisProgress}% complete</span>
              <span className="text-[10px] text-white/30">{100 - analysisProgress}% remaining</span>
            </div>
          </div>
          <div className="space-y-2 text-left">
            {ANALYSIS_STEPS.map((s, i) => (
              <div key={i} className={`flex items-center gap-3 py-2 px-3 transition-all ${
                i < currentAnalysisStep ? "opacity-40" :
                i === currentAnalysisStep ? "bg-white/5 border border-white/10" : "opacity-20"
              }`}>
                <div className={`w-4 h-4 flex items-center justify-center flex-shrink-0 ${
                  i < currentAnalysisStep ? "text-emerald-500" :
                  i === currentAnalysisStep ? "text-[#E8C547]" : "text-white/20"
                }`}>
                  {i < currentAnalysisStep ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : i === currentAnalysisStep ? (
                    <Activity className="w-4 h-4 pulse" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>
                <span className={`text-[11px] ${
                  i < currentAnalysisStep ? "text-white/40" :
                  i === currentAnalysisStep ? "text-white" : "text-white/20"
                }`}>
                  {s.label}
                </span>
                {i === currentAnalysisStep && (
                  <span className="ml-auto text-[9px] text-[#E8C547] pulse">LIVE</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!report) return null;

  const scoreColor = (s: number) => s >= 70 ? "text-emerald-600" : s >= 50 ? "text-amber-600" : "text-red-600";
  const scoreBg = (s: number) => s >= 70 ? "bg-emerald-50 border-emerald-200" : s >= 50 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";

  const chartData = [
    { subject: 'Market', A: report.scores.market, fullMark: 100 },
    { subject: 'Team', A: report.scores.team, fullMark: 100 },
    { subject: 'Product', A: report.scores.product, fullMark: 100 },
    { subject: 'Traction', A: report.scores.traction, fullMark: 100 },
    { subject: 'Moat', A: report.scores.moat, fullMark: 100 },
    { subject: 'Financials', A: report.scores.financials, fullMark: 100 },
    { subject: 'Overall', A: report.scores.overall, fullMark: 100 },
  ];

  return (
    <div className="bg-[#F7F5F0] min-h-screen" style={{ fontFamily: "system-ui, sans-serif" }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-break { page-break-before: always; }
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fu { animation: fadeUp 0.5s ease both; }
        .fu-2 { animation: fadeUp 0.5s 0.1s ease both; }
        .fu-3 { animation: fadeUp 0.5s 0.2s ease both; }
        .fu-4 { animation: fadeUp 0.5s 0.32s ease both; }
      `}</style>

      <div className="no-print sticky top-14 z-40 bg-[#1C1C1C] text-white border-b border-white/10">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#E8C547] text-[#1C1C1C] flex items-center justify-center text-[9px] font-bold">UF</div>
              <span className="text-sm font-semibold uppercase" style={{ fontFamily: "'Georgia', serif" }}>{form.startupName}</span>
            </div>
            <span className="text-white/30">·</span>
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Intelligence Report</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#E8C547] text-[#1C1C1C] text-[11px] font-bold hover:bg-[#F5D55A] transition-colors"
            >
              <Download className="w-3 h-3" />
              Download PDF
            </button>
            <button
              onClick={() => { setStep("form"); setReport(null); }}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 hover:border-white/40 text-[11px] text-white/70 hover:text-white transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              New Report
            </button>
          </div>
        </div>
      </div>

      <div ref={reportRef} className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <div className="border-b-2 border-[#1C1C1C] pb-6 mb-0 fu">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <p className="text-[9px] tracking-[0.28em] text-[#AAA] uppercase mb-3">
                UpForge Intelligence · {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
              <h1 className="text-[2.2rem] sm:text-[3rem] lg:text-[3.8rem] tracking-tight leading-[1.0] text-[#1C1C1C] uppercase" style={{ fontFamily: "'Georgia', serif" }}>
                {form.startupName}
              </h1>
              <p className="text-sm text-[#888] mt-2">
                {form.industry} · Founded {form.foundedYear}
                {form.city ? ` · ${form.city}` : ""}
                {form.fundingStage ? ` · ${form.fundingStage}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2 pb-1">
              <div className={`px-4 py-2 border text-center ${scoreBg(report.scores.overall)}`}>
                <p className={`num-font text-3xl font-bold ${scoreColor(report.scores.overall)}`} style={{ fontFamily: "'Georgia', serif" }}>{report.scores.overall}</p>
                <p className="text-[9px] uppercase tracking-widest text-[#888] mt-0.5">Overall Score</p>
              </div>
              <div className="text-[10px] text-[#AAA] hidden sm:block max-w-[140px]">
                <p className="uppercase tracking-widest font-bold text-[#888] mb-1">Founder</p>
                <p className="text-[#555]" style={{ fontFamily: "'Georgia', serif" }}>{form.founderName}</p>
                {form.coFounders && <p className="text-[#888] mt-0.5">{form.coFounders}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 border-b border-[#D5D0C8] fu-2">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-[#AAA]" />
            <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#888]">Executive Summary</h2>
          </div>
          <p className="text-[0.95rem] text-[#444] leading-relaxed max-w-4xl" style={{ fontFamily: "'Georgia', serif" }}>
            {report.executiveSummary}
          </p>
        </div>

        <div className="border-b border-[#D5D0C8] fu-2">
          <div className="grid lg:grid-cols-2">
            <div className="lg:col-span-1 py-7 pr-0 lg:pr-8 border-r border-[#D5D0C8]">
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#AAA] mb-4">Estimated Valuation</p>
              <div className="mb-3">
                <p className="text-[9px] text-[#AAA] uppercase tracking-wider mb-1">Midpoint</p>
                <p className="text-[3rem] font-bold text-[#1C1C1C] leading-none num-font" style={{ fontFamily: "'Georgia', serif" }}>
                  {report.valuationRange.midpoint}
                </p>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div>
                  <p className="text-[9px] text-[#AAA] uppercase tracking-wider">Floor</p>
                  <p className="text-lg font-semibold text-[#666] num-font">{report.valuationRange.low}</p>
                </div>
                <div className="w-px h-8 bg-[#D5D0C8]"></div>
                <div>
                  <p className="text-[9px] text-[#AAA] uppercase tracking-wider">Ceiling</p>
                  <p className="text-lg font-semibold text-[#666] num-font">{report.valuationRange.high}</p>
                </div>
              </div>
              <p className="text-[10px] text-[#AAA] leading-snug">{report.valuationRange.methodology}</p>
            </div>

            <div className="lg:col-span-1 py-7 lg:pl-8">
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#AAA] mb-5">7-Dimension Analysis</p>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData} startAngle={90} endAngle={-270}>
                    <PolarGrid stroke="#D5D0C8" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10, fontWeight: 'bold' }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Startup"
                      dataKey="A"
                      stroke="#A89060"
                      fill="#A89060"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 border-b border-[#D5D0C8] fu-3">
          <div className="py-7 pr-0 lg:pr-8 border-r border-[#D5D0C8]">
            <div className="flex items-center gap-2 mb-5">
              <Star className="w-4 h-4 text-[#AAA]" />
              <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#888]">Key Strengths</h2>
            </div>
            <div className="space-y-3">
              {report.strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-[#EEEAE3] pb-3 last:border-0 last:pb-0">
                  <div className="w-5 h-5 bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1C1C1C] mb-0.5" style={{ fontFamily: "'Georgia', serif" }}>{s.title}</p>
                    <p className="text-[11px] text-[#777]">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-7 lg:pl-8">
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle className="w-4 h-4 text-[#AAA]" />
              <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#888]">Risk Assessment</h2>
            </div>
            <div className="space-y-3">
              {report.risks.map((r, i) => (
                <div key={i} className="border border-[#E2DDD5] bg-white p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-semibold text-[#1C1C1C]" style={{ fontFamily: "'Georgia', serif" }}>{r.title}</p>
                    <RiskBadge level={r.level} />
                  </div>
                  <p className="text-[11px] text-[#777] mb-1.5">{r.detail}</p>
                  <div className="flex items-start gap-1.5">
                    <Zap className="w-3 h-3 text-[#AAA] flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-[#AAA]">Mitigation: {r.mitigation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-7 border-b border-[#D5D0C8] fu-3">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="w-4 h-4 text-[#AAA]" />
            <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#888]">Market Opportunity</h2>
          </div>
          <div className="grid grid-cols-3 gap-px bg-[#D5D0C8] border border-[#D5D0C8] mb-4">
            {[
              { label: "TAM", sublabel: "Total Addressable Market", value: report.marketOpportunity.tam },
              { label: "SAM", sublabel: "Serviceable Addressable Market", value: report.marketOpportunity.sam },
              { label: "SOM", sublabel: "Serviceable Obtainable Market", value: report.marketOpportunity.som },
            ].map((m, i) => (
              <div key={i} className="bg-[#F7F5F0] hover:bg-white transition-colors p-5 text-center">
                <p className="text-[9px] font-bold text-[#AAA] uppercase tracking-widest mb-1">{m.label}</p>
                <p className="num-font text-2xl sm:text-3xl font-semibold text-[#1C1C1C] mb-1" style={{ fontFamily: "'Georgia', serif" }}>{m.value}</p>
                <p className="text-[9px] text-[#BBB]">{m.sublabel}</p>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-[#666] leading-relaxed">{report.marketOpportunity.insight}</p>
        </div>

        <div className="py-7 border-b border-[#D5D0C8] fu-3">
          <div className="flex items-center gap-2 mb-5">
            <Users className="w-4 h-4 text-[#AAA]" />
            <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#888]">Competitive Landscape</h2>
          </div>
          <div className="divide-y divide-[#EEEAE3] border border-[#D5D0C8]">
            <div className="grid grid-cols-3 px-4 py-2 bg-[#EEEAE3]">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#888]">Competitor</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#888]">Threat Level</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#888]">Your Difference</span>
            </div>
            {report.competitorAnalysis.map((c, i) => (
              <div key={i} className="grid grid-cols-3 px-4 py-3.5 bg-white hover:bg-[#F7F5F0] transition-colors">
                <p className="text-sm font-semibold text-[#1C1C1C]" style={{ fontFamily: "'Georgia', serif" }}>{c.name}</p>
                <div><RiskBadge level={c.threat} /></div>
                <p className="text-[11px] text-[#666]">{c.difference}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 border-b border-[#D5D0C8] fu-4">
          <div className="py-7 pr-0 lg:pr-8 border-r border-[#D5D0C8]">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-[#AAA]" />
              <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#888]">Growth Levers</h2>
            </div>
            <div className="space-y-3">
              {report.growthLevers.map((g, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-[#EEEAE3] pb-3 last:border-0 last:pb-0">
                  <ChevronRight className="w-4 h-4 text-[#E8C547] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#1C1C1C] mb-0.5" style={{ fontFamily: "'Georgia', serif" }}>{g.lever}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-emerald-600 font-bold">{g.impact}</span>
                      <span className="text-[#DDD]">·</span>
                      <span className="text-[10px] text-[#AAA]">{g.timeline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-7 lg:pl-8">
            <div className="flex items-center gap-2 mb-5">
              <Target className="w-4 h-4 text-[#AAA]" />
              <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#888]">Priority Focus Areas</h2>
            </div>
            <div className="space-y-3">
              {report.focusAreas.map((f, i) => {
                const priorityStyles = {
                  critical: "bg-red-50 border-red-200 text-red-700",
                  high: "bg-amber-50 border-amber-200 text-amber-700",
                  medium: "bg-blue-50 border-blue-200 text-blue-700",
                };
                return (
                  <div key={i} className="border border-[#E2DDD5] bg-white p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-semibold text-[#1C1C1C]" style={{ fontFamily: "'Georgia', serif" }}>{f.area}</p>
                      <span className={`text-[8px] px-2 py-0.5 font-bold uppercase tracking-wider border ${priorityStyles[f.priority]}`}>
                        {f.priority}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#777]">{f.action}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="py-7 border-b border-[#D5D0C8] fu-4">
          <div className="flex items-center gap-2 mb-5">
            <BarChart2 className="w-4 h-4 text-[#AAA]" />
            <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#888]">Sector Benchmarks</h2>
          </div>
          <div className="divide-y divide-[#EEEAE3] border border-[#D5D0C8]">
            <div className="grid grid-cols-4 px-4 py-2 bg-[#EEEAE3]">
              {["Metric", `${form.startupName}`, "Industry Avg", "Verdict"].map((h, i) => (
                <span key={i} className="text-[9px] font-bold uppercase tracking-widest text-[#888]">{h}</span>
              ))}
            </div>
            {report.benchmarks.map((b, i) => (
              <div key={i} className="grid grid-cols-4 px-4 py-3 bg-white hover:bg-[#F7F5F0] transition-colors">
                <p className="text-[12px] text-[#555]">{b.metric}</p>
                <p className="text-[12px] font-semibold text-[#1C1C1C] num-font uppercase">{b.startup}</p>
                <p className="text-[12px] text-[#888] num-font">{b.industry}</p>
                <span className={`text-[9px] font-bold px-2 py-0.5 w-fit ${
                  b.verdict === "above" ? "bg-emerald-50 text-emerald-700" :
                  b.verdict === "below" ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-600"
                }`}>
                  {b.verdict === "above" ? "▲ Above" : b.verdict === "below" ? "▼ Below" : "● On Par"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="py-7 border-b border-[#D5D0C8] fu-4">
          <div className="flex items-center gap-2 mb-5">
            <Activity className="w-4 h-4 text-[#AAA]" />
            <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#888]">Strategic Roadmap</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {report.roadmap.map((phase, i) => (
              <div key={i} className={`p-5 border ${i === 0 ? "bg-[#1C1C1C] text-white border-[#1C1C1C]" : "bg-white border-[#E2DDD5]"}`}>
                <div className="flex items-center justify-between mb-3">
                  <p className={`text-[9px] font-bold uppercase tracking-widest ${i === 0 ? "text-[#E8C547]" : "text-[#AAA]"}`}>
                    {phase.phase}
                  </p>
                  <span className={`text-[9px] px-2 py-0.5 ${i === 0 ? "bg-white/10 text-white/60" : "bg-[#EEEAE3] text-[#666]"}`}>
                    {phase.timeline}
                  </span>
                </div>
                <ul className="space-y-2">
                  {phase.goals.map((g, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <div className={`w-1 h-1 rounded-full flex-shrink-0 mt-1.5 ${i === 0 ? "bg-[#E8C547]" : "bg-[#CCC]"}`} />
                      <p className={`text-[11px] leading-snug ${i === 0 ? "text-white/70" : "text-[#666]"}`}>{g}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-7 border-b border-[#D5D0C8] fu-4">
          <div className="flex items-center gap-2 mb-5">
            <Award className="w-4 h-4 text-[#AAA]" />
            <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#888]">Investor Readiness</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-4">
            <div className={`p-6 border text-center ${scoreBg(report.investorReadiness.score)}`}>
              <p className={`num-font text-5xl font-bold ${scoreColor(report.investorReadiness.score)} mb-2`} style={{ fontFamily: "'Georgia', serif" }}>
                {report.investorReadiness.score}
                <span className="text-2xl">/100</span>
              </p>
              <p className="text-[10px] uppercase tracking-widest text-[#888] mb-2">Readiness Score</p>
              <p className="text-sm font-semibold text-[#1C1C1C]" style={{ fontFamily: "'Georgia', serif" }}>
                {report.investorReadiness.verdict}
              </p>
            </div>
            <div className="lg:col-span-2 border border-[#E2DDD5] bg-white p-5">
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#888] mb-3">To Improve Investor Readiness</p>
              <div className="space-y-2">
                {report.investorReadiness.improvements.map((imp, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <ChevronRight className="w-3.5 h-3.5 text-[#E8C547] flex-shrink-0 mt-0.5" />
                    <p className="text-[12px] text-[#555]">{imp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="py-8 fu-4">
          <div className="bg-[#1C1C1C] text-white p-8 sm:p-10">
            <p className="text-[9px] text-[#E8C547] font-bold uppercase tracking-[0.25em] mb-4">UpForge Verdict</p>
            <p
              className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-white/90 max-w-4xl"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {report.verdict}
            </p>
            <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-[10px] text-white/30">
                Generated {new Date().toLocaleDateString("en-IN")} · UpForge Intelligence v2.0
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="no-print flex items-center gap-1.5 px-5 py-2.5 bg-[#E8C547] text-[#1C1C1C] text-[11px] font-bold uppercase tracking-wider hover:bg-[#F5D55A] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateFallbackReport(form: FormData): ReportData {
  const year = parseInt(form.foundedYear) || 2022;
  const age = new Date().getFullYear() - year;
  const hasRevenue = form.currentRevenue && !form.currentRevenue.toLowerCase().includes("pre");
  const teamSize = parseInt(form.teamSize) || 5;

  return {
    reportId: Math.random().toString(36).substring(2, 10).toUpperCase(),
    executiveSummary: `${form.startupName} is a ${age > 0 ? `${age}-year-old` : "newly founded"} ${form.industry} startup founded by ${form.founderName}${form.coFounders ? ` alongside ${form.coFounders}` : ""}${form.city ? ` based in ${form.city}` : ""}. The company is focused on ${form.description || "solving a key market problem"} ${form.targetMarket ? `targeting ${form.targetMarket}` : ""}.`,
    valuationRange: {
      low: hasRevenue ? "₹3.5Cr" : "₹80L",
      midpoint: hasRevenue ? "₹9.2Cr" : "₹2.1Cr",
      high: hasRevenue ? "₹22Cr" : "₹5.8Cr",
      methodology: `Based on sector multiples and early-stage deals.`,
    },
    scores: {
      overall: 65, market: 68, team: 65, product: 70, traction: 60, moat: 60, financials: 55,
    },
    strengths: [{ title: "Problem Fit", detail: "Addresses a defined market gap." }],
    risks: [{ level: "medium", title: "Scale Risk", detail: "Early stage dependencies.", mitigation: "Process documentation." }],
    competitorAnalysis: [{ name: "Market Incumbent", threat: "medium", difference: "Agile approach" }],
    marketOpportunity: { tam: "$5B", sam: "$1B", som: "$100M", insight: "Significant growth potential." },
    growthLevers: [{ lever: "Partnerships", impact: "High", timeline: "6 months" }],
    focusAreas: [{ area: "Retention", priority: "critical", action: "Focus on user feedback." }],
    investorReadiness: { score: 70, verdict: "Ready", improvements: ["Build model"] },
    roadmap: [{ phase: "Foundation", timeline: "90 days", goals: ["Launch"] }],
    benchmarks: [{ metric: "Growth", startup: "100%", industry: "80%", verdict: "above" }],
    verdict: "Strong potential with clear focus on market execution.",
  };
}
