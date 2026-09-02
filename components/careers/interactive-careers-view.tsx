"use client"

import { useState } from "react"
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Code2,
  Brain,
  BarChart3,
  Compass,
  Layers,
  TrendingUp,
  Target,
  Palette,
  Share2,
  UserCheck,
  ChevronDown,
  CheckCircle2,
  ReceiptText,
} from "lucide-react"
import { HubSpotCareersForm } from "@/components/careers/hubspot-form"

const OPPORTUNITY_AREAS = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    desc: "Model pipelines & evaluation workflows.",
    icon: Brain,
    responsibilities: ["Entity-matching & classification models", "Automated taxonomy pipelines", "Accuracy benchmarking on live data"],
  },
  {
    id: "software-dev",
    title: "Software Development",
    desc: "Edge web apps, APIs, registry architecture.",
    icon: Code2,
    responsibilities: ["Ship features on the Next.js platform", "Design registry-facing APIs", "Own performance & reliability"],
  },
  {
    id: "data-bi",
    title: "Data Analytics & BI",
    desc: "Ecosystem data, funding & market trends.",
    icon: BarChart3,
    responsibilities: ["Founder & investor insight dashboards", "Funding trend analysis", "Large-scale data validation"],
  },
  {
    id: "biz-analysis",
    title: "Business Analysis & Strategy",
    desc: "Industry research & growth positioning.",
    icon: Compass,
    responsibilities: ["Competitive & industry research", "Growth strategy modeling", "Findings → product recommendations"],
  },
  {
    id: "product-mgmt",
    title: "Product Management",
    desc: "Feature scope & verification workflows.",
    icon: Layers,
    responsibilities: ["Own scoping, idea to ship", "Streamline verification flows", "Partner with design & engineering"],
  },
  {
    id: "growth-marketing",
    title: "Digital Marketing & Growth",
    desc: "SEO, developer marketing, outreach.",
    icon: TrendingUp,
    responsibilities: ["Organic search growth", "Founder-focused campaigns", "Ecosystem partnership content"],
  },
  {
    id: "biz-dev",
    title: "Business Development & Sales",
    desc: "Partnerships & founder networks.",
    icon: Target,
    responsibilities: ["Institutional partnerships", "Founder & investor network growth", "Outbound & deal closure"],
  },
  {
    id: "design-uiux",
    title: "UI/UX & Product Design",
    desc: "Clean, accessible interfaces.",
    icon: Palette,
    responsibilities: ["Accessible interface design", "Design system ownership", "Prototyping & testing"],
  },
  {
    id: "content-media",
    title: "Content & Social Media",
    desc: "Editorial reports & founder stories.",
    icon: Share2,
    responsibilities: ["Founder story writing", "Social content planning", "Editorial accuracy & quality"],
  },
  {
    id: "hr-talent",
    title: "HR & Talent Acquisition",
    desc: "Pipelines & candidate operations.",
    icon: UserCheck,
    responsibilities: ["End-to-end pipeline coordination", "Clear candidate communication", "Onboarding operations"],
  },
]

const FAQ_ITEMS = [
  { q: "Who can apply?", a: "Students, fresh graduates, and self-starters of any background — we hire for skill, not resume titles." },
  { q: "Is prior experience required?", a: "No. We weigh curiosity, problem-solving, and output over job history." },
  { q: "What goes in the business analysis?", a: "2–3 practical ideas showing you understand UpForge and how you'd contribute." },
  { q: "Is the assessment mandatory?", a: "Only for applicants who progress past initial review — you'll be notified with instructions." },
  { q: "Who receives the ₹29 assessment fee?", a: "Our independent third-party evaluation partner — never UpForge. It covers their assessment technology only, and is charged and processed entirely by them." },
  { q: "Does paying guarantee selection?", a: "No. It covers the evaluation service only — not an interview, offer, or employment outcome." },
  { q: "How are candidates contacted?", a: "Only via official @upforge.org email addresses, with clear next steps." },
]

const TRUST_LINE = [
  { icon: ShieldCheck, label: "Verified Process" },
  { icon: Lock, label: "Secure Application" },
  { icon: ReceiptText, label: "No Fee To UpForge" },
  { icon: Mail, label: "Official @upforge.org Only" },
]

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Application",
    line: "Resume, role, and a short business proposal.",
    detail:
      "Submit your resume/CV, selected area, LinkedIn (optional), a short business analysis on how you'd contribute, and your availability.",
  },
  {
    n: "02",
    title: "Assessment",
    line: "A brief AI-powered evaluation, ₹29 partner fee.",
    detail: "assessment", // rendered specially below
  },
  {
    n: "03",
    title: "HR Discussion",
    line: "Role, compensation, and joining details.",
    detail: "Candidates who clear the assessment discuss responsibilities, documentation, compensation, and joining details with the UpForge team. All progression is subject to final evaluation and team fit.",
  },
]

export function InteractiveCareersView() {
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null)
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null)

  const selectedRole = OPPORTUNITY_AREAS.find((r) => r.id === selectedRoleId)

  const handleRoleSelect = (roleId: string) => {
    setSelectedRoleId(roleId)
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-amber-500/20">
      {/* MASTHEAD / HERO */}
      <section className="max-w-[1000px] mx-auto px-5 md:px-8 pt-14 pb-10 text-center border-b border-border">
        <div className="inline-flex items-center gap-2 mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          UpForge Careers · 2026 Cohort
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-[60px] font-bold leading-[1.05] mb-4 tracking-tight text-foreground"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Build With UpForge.
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-serif italic mb-9">
          Real ownership, from day one — no corporate ladder.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <a
            href="#apply"
            className="inline-flex items-center gap-2 bg-foreground hover:bg-amber-500 text-background hover:text-black py-3 px-7 rounded-md font-bold uppercase tracking-[0.15em] text-[11px] transition-colors"
          >
            Apply Now <ArrowRight size={13} />
          </a>
          <a
            href="#process"
            className="inline-flex items-center gap-2 border border-border hover:border-amber-500/70 py-3 px-7 rounded-md font-bold uppercase tracking-[0.15em] text-[11px] transition-colors"
          >
            The Process
          </a>
        </div>

        {/* Trust line — single row, minimal */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {TRUST_LINE.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <t.icon size={12} className="text-amber-500" />
              {t.label}
            </span>
          ))}
        </div>
      </section>

      <main className="max-w-[1000px] mx-auto px-5 md:px-8 py-14 space-y-16">
        {/* 01 — THE OPPORTUNITY (compact) */}
        <section>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="font-mono text-xl font-bold text-foreground">10</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Open Areas</div>
            </div>
            <div className="sm:border-x border-border">
              <div className="font-mono text-xl font-bold text-amber-600 dark:text-amber-400">3</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Step Process</div>
            </div>
            <div>
              <div className="font-mono text-xl font-bold text-foreground">100%</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Transparent</div>
            </div>
          </div>
        </section>

        {/* 02 — ROLES (editorial list, click to expand) */}
        <section>
          <div className="flex items-baseline gap-3 mb-1 pb-3 border-b border-border">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">01</span>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground">Open Areas</h2>
          </div>
          <p className="text-xs text-muted-foreground font-serif italic mb-2 mt-3">
            Click a role to see what you'd actually work on.
          </p>

          <div className="divide-y divide-border border-b border-border">
            {OPPORTUNITY_AREAS.map((area) => {
              const Icon = area.icon
              const isSelected = selectedRoleId === area.id
              const isExpanded = expandedRoleId === area.id

              return (
                <div key={area.id}>
                  <button
                    type="button"
                    onClick={() => setExpandedRoleId(isExpanded ? null : area.id)}
                    className="w-full py-4 flex items-center gap-4 text-left group cursor-pointer"
                  >
                    <Icon size={16} className={isSelected ? "text-amber-500 shrink-0" : "text-muted-foreground shrink-0 group-hover:text-amber-500 transition-colors"} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold font-serif text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {area.title}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                            · Selected
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground font-serif hidden sm:inline">{area.desc}</span>
                    </div>
                    <ChevronDown size={15} className={`shrink-0 text-muted-foreground transition-transform ${isExpanded ? "rotate-180 text-amber-500" : ""}`} />
                  </button>

                  {isExpanded && (
                    <div className="pb-5 pl-8 flex flex-wrap items-center gap-x-6 gap-y-2">
                      {area.responsibilities.map((r, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground font-serif">
                          <CheckCircle2 size={11} className="text-amber-500 shrink-0" />
                          {r}
                        </span>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleRoleSelect(area.id)}
                        className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 hover:text-amber-500 cursor-pointer"
                      >
                        Select & Apply <ArrowRight size={11} />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* 03 — PROCESS (single active detail panel = far less default text) */}
        <section id="process" className="scroll-mt-20">
          <div className="flex items-baseline gap-3 mb-1 pb-3 border-b border-border">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">02</span>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border-b border-border">
            {PROCESS_STEPS.map((step, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`py-5 md:px-5 text-left cursor-pointer transition-colors ${idx > 0 ? "md:pl-6" : ""} ${
                  activeStep === idx ? "bg-amber-500/5" : "hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`font-mono text-2xl font-bold ${
                      activeStep === idx ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground/40"
                    }`}
                  >
                    {step.n}
                  </span>
                  <ChevronDown size={14} className={`text-muted-foreground transition-transform ${activeStep === idx ? "rotate-180 text-amber-500" : ""}`} />
                </div>
                <h3 className="text-sm font-bold font-serif text-foreground">{step.title}</h3>
                <p className="text-xs text-muted-foreground font-serif mt-0.5">{step.line}</p>
              </button>
            ))}
          </div>

          {/* Active step detail — only ONE panel of text visible at a time */}
          <div className="border border-t-0 border-border p-6">
            {activeStep === 1 ? (
              <div className="space-y-3">
                <p className="text-sm text-foreground font-serif leading-relaxed">
                  A short AI-powered interview/assessment, hosted by an independent evaluation partner — not UpForge.
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 border-t border-border/60 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                    <ReceiptText size={13} /> ₹29 Partner Fee
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-amber-500" /> Not Paid To UpForge
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Lock size={13} className="text-amber-500" /> Secure Checkout
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground font-serif italic pt-1">
                  Payment doesn't guarantee selection. Review the provider's terms before paying.
                </p>
              </div>
            ) : (
              <p className="text-sm text-foreground font-serif leading-relaxed">
                {PROCESS_STEPS[activeStep].detail}
              </p>
            )}
          </div>
        </section>

        {/* 04 — APPLY */}
        <section id="apply" className="scroll-mt-20">
          <div className="flex items-baseline gap-3 mb-6 pb-3 border-b border-border">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">03</span>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground">Apply</h2>
          </div>
          <HubSpotCareersForm selectedRole={selectedRole?.title} />
        </section>

        {/* 05 — FAQ */}
        <section>
          <div className="flex items-baseline gap-3 mb-1 pb-3 border-b border-border">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">04</span>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground">FAQ</h2>
          </div>

          <div className="divide-y divide-border border-b border-border">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIdx === idx
              return (
                <div key={idx}>
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full py-4 text-left flex justify-between items-center gap-4 text-foreground cursor-pointer"
                  >
                    <span className="text-sm font-serif font-bold">{item.q}</span>
                    <ChevronDown size={15} className={`text-amber-500 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <p className="pb-4 text-xs text-muted-foreground font-serif leading-relaxed max-w-2xl">
                      {item.a}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
