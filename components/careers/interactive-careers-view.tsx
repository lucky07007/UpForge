"use client"

import { useState } from "react"
import {
  Briefcase,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Sparkles,
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
  FileCheck,
  Clock,
  Award,
  ChevronDown,
  Lock,
  ExternalLink,
} from "lucide-react"
import { HubSpotCareersForm } from "@/components/careers/hubspot-form"

const OPPORTUNITY_AREAS = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    desc: "Build intelligence pipelines, model evaluation workflows, and automated entity taxonomy.",
    icon: Brain,
  },
  {
    id: "software-dev",
    title: "Software Development",
    desc: "Develop high-performance edge web applications, APIs, and scalable registry architecture.",
    icon: Code2,
  },
  {
    id: "data-bi",
    title: "Data Analytics & Business Intelligence",
    desc: "Analyze startup ecosystem datasets, funding trends, and market performance metrics.",
    icon: BarChart3,
  },
  {
    id: "biz-analysis",
    title: "Business Analysis & Strategy",
    desc: "Research industry trends, founder models, and strategic growth positioning for registry entities.",
    icon: Compass,
  },
  {
    id: "product-mgmt",
    title: "Product Management",
    desc: "Define feature scope, streamline verification workflows, and enhance user experience.",
    icon: Layers,
  },
  {
    id: "growth-marketing",
    title: "Digital Marketing & Growth",
    desc: "Drive organic search visibility, developer marketing, and ecosystem outreach.",
    icon: TrendingUp,
  },
  {
    id: "biz-dev",
    title: "Business Development & Sales",
    desc: "Build institutional partnerships, founder networks, and ecosystem collaborations.",
    icon: Target,
  },
  {
    id: "design-uiux",
    title: "UI/UX & Product Design",
    desc: "Craft clean, accessible, and modern user interfaces across registry platforms.",
    icon: Palette,
  },
  {
    id: "content-media",
    title: "Content & Social Media",
    desc: "Produce editorial reports, founder chronicles, and industry insights.",
    icon: Share2,
  },
  {
    id: "hr-talent",
    title: "HR & Talent Acquisition",
    desc: "Coordinate recruitment pipelines, candidate communications, and onboarding operations.",
    icon: UserCheck,
  },
]

const FAQ_ITEMS = [
  {
    q: "Who can apply?",
    a: "We welcome applications from students, fresh graduates, early-career professionals, builders, and self-starters across all backgrounds who are eager to contribute practical skills and initiative.",
  },
  {
    q: "Do I need previous work experience?",
    a: "No prior corporate experience is required. We prioritize curiosity, problem-solving capability, domain understanding, and your ability to deliver meaningful output over legacy job titles.",
  },
  {
    q: "What should I include in the business analysis?",
    a: "Your business analysis or value proposal should demonstrate a baseline understanding of UpForge's platform and mission. Share 2–3 practical ideas on how your skills could solve a problem or improve an operational/product area.",
  },
  {
    q: "What happens after I submit my application?",
    a: "Our team reviews submitted resumes and business proposals. Candidates whose background and proposal align with potential opportunities may be invited to the next stage of our evaluation process.",
  },
  {
    q: "Is the AI assessment mandatory for every applicant?",
    a: "No. Assessments are utilized only for candidates whose initial application progresses to the evaluation stage. You will be notified with full instructions if your profile is selected for an assessment.",
  },
  {
    q: "Why is there a ₹199 assessment fee?",
    a: "Where applicable, the assessment is hosted and administered by an independent third-party service provider [NEEDS CONFIRMATION]. The ₹199 fee is charged directly by the assessment provider to cover technology and evaluation costs. UpForge does not charge a recruitment fee for submitting an application.",
  },
  {
    q: "Does paying the assessment fee guarantee selection?",
    a: "No. Payment of the third-party assessment fee covers the cost of evaluation service only and does NOT guarantee selection, an interview with the UpForge team, employment, salary, or any specific outcome.",
  },
  {
    q: "How will UpForge contact selected candidates?",
    a: "Candidates selected for further steps will be contacted directly via email by the UpForge team with clear next steps for evaluation or HR discussion.",
  },
  {
    q: "What email address will UpForge use for recruitment communication?",
    a: "All official recruitment communications from UpForge will come exclusively from official @upforge.org email addresses (e.g. careers@upforge.org or desk@upforge.org). Always verify sender addresses before responding.",
  },
]

export function InteractiveCareersView() {
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState<number>(1)
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null)

  const selectedRole = OPPORTUNITY_AREAS.find((r) => r.id === selectedRoleId)

  const handleRoleSelect = (roleId: string) => {
    setSelectedRoleId(roleId)
    // Smooth scroll to application form
    const applyEl = document.getElementById("apply")
    if (applyEl) {
      applyEl.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-amber-500/20">
      {/* 1. HERO SECTION */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-6 pb-10 text-center">
        <div className="glass-panel w-full rounded-3xl p-8 md:p-14 border border-border/80 shadow-md relative overflow-hidden flex flex-col items-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em]">
              ACTIVE RECRUITMENT • 2026 COHORT
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.05] mb-5 max-w-4xl tracking-tight text-foreground"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Build With UpForge.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-serif italic mb-8">
            Join a growing startup where your ideas, skills, and initiative can create real impact.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#apply"
              className="inline-flex items-center gap-2.5 bg-foreground hover:bg-amber-500 text-background hover:text-black py-3.5 px-8 rounded-2xl font-bold uppercase tracking-[0.15em] text-xs font-mono transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Apply to Join UpForge <ArrowRight size={14} />
            </a>
            <a
              href="#process"
              className="inline-flex items-center gap-2 border border-border/80 hover:border-amber-500/60 bg-card hover:bg-muted py-3.5 px-8 rounded-2xl font-bold uppercase tracking-[0.15em] text-xs font-mono transition-all duration-200 shadow-xs"
            >
              Explore the Process
            </a>
          </div>

          {/* Clean Metric Chips */}
          <div className="grid grid-cols-3 gap-3 md:gap-8 pt-10 mt-8 border-t border-border/50 w-full max-w-2xl text-center">
            <div>
              <div className="font-mono text-base md:text-xl font-bold text-foreground">10 Areas</div>
              <div className="text-[10px] md:text-xs font-serif text-muted-foreground">Opportunities</div>
            </div>
            <div>
              <div className="font-mono text-base md:text-xl font-bold text-amber-600 dark:text-amber-400">3 Steps</div>
              <div className="text-[10px] md:text-xs font-serif text-muted-foreground">Selection Process</div>
            </div>
            <div>
              <div className="font-mono text-base md:text-xl font-bold text-foreground">100%</div>
              <div className="text-[10px] md:text-xs font-serif text-muted-foreground">Transparent</div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-4 md:px-8 pb-20 space-y-16">
        {/* 2. WHY UPFORGE */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-amber-500 font-mono text-xs font-bold">01 /</span>
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Why UpForge
            </h2>
            <div className="flex-1 h-px bg-border/60" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Real Startup Experience",
                desc: "Work directly on live products, data systems, and public registry features from day one.",
                icon: Briefcase,
              },
              {
                title: "Ownership & Responsibility",
                desc: "Take full ownership of your tasks with clear autonomy and high accountability.",
                icon: Target,
              },
              {
                title: "Tech & Business Exposure",
                desc: "Gain broad perspective across software engineering, data analysis, product design, and growth.",
                icon: Layers,
              },
              {
                title: "Learn by Building",
                desc: "Develop your craft by solving real problems alongside builders who prioritize execution.",
                icon: Award,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 border border-border/80 rounded-2xl bg-card hover:border-amber-500/60 shadow-xs hover:shadow-md hover:translate-y-[-2px] transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                  <item.icon size={20} />
                </div>
                <h3 className="text-base font-bold font-serif mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-serif">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. WHO WE'RE LOOKING FOR */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-amber-500 font-mono text-xs font-bold">02 /</span>
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Who We're Looking For
            </h2>
            <div className="flex-1 h-px bg-border/60" />
          </div>

          <div className="p-8 border border-border/80 rounded-3xl bg-card shadow-sm space-y-5">
            <h3
              className="text-2xl md:text-3xl font-bold text-foreground"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Builders, Problem Solvers & Initiative-Driven Talent
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-serif max-w-4xl">
              UpForge welcomes students, fresh graduates, early-career professionals, self-taught builders, and experienced problem solvers. We prioritize your skills, curiosity, logical thinking, and ability to contribute over prior employment history or formal resume titles.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-muted/50 border border-border/60 flex items-center gap-3">
                <CheckCircle2 size={18} className="text-amber-500 shrink-0" />
                <span className="text-xs font-mono font-semibold text-foreground">
                  Strong Initiative & Self-Drive
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-muted/50 border border-border/60 flex items-center gap-3">
                <CheckCircle2 size={18} className="text-amber-500 shrink-0" />
                <span className="text-xs font-mono font-semibold text-foreground">
                  Practical Problem Solving
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-muted/50 border border-border/60 flex items-center gap-3">
                <CheckCircle2 size={18} className="text-amber-500 shrink-0" />
                <span className="text-xs font-mono font-semibold text-foreground">
                  Eagerness to Learn & Execute
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CLICKABLE AREAS OF OPPORTUNITY */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-amber-500 font-mono text-xs font-bold">03 /</span>
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                Areas of Opportunity
              </h2>
              <div className="flex-1 h-px bg-border/60" />
            </div>
          </div>

          <p className="text-xs md:text-sm text-muted-foreground font-serif italic">
            Click any area below to highlight role details and pre-select it for your application:
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {OPPORTUNITY_AREAS.map((area) => {
              const Icon = area.icon
              const isSelected = selectedRoleId === area.id

              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => handleRoleSelect(area.id)}
                  className={`p-5 text-left border rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? "border-amber-500 bg-amber-500/10 shadow-md ring-2 ring-amber-500/20"
                      : "border-border/80 bg-card hover:border-amber-500/60 hover:shadow-sm"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-amber-500 text-black border-amber-500"
                            : "bg-muted text-foreground border-border group-hover:border-amber-500/40"
                        }`}
                      >
                        <Icon size={18} />
                      </div>
                      {isSelected && (
                        <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">
                          SELECTED
                        </span>
                      )}
                    </div>

                    <h3 className="text-xs font-mono font-bold text-foreground mb-1.5 uppercase tracking-wide group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-serif">
                      {area.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-border/40 text-[10px] font-mono text-muted-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 flex items-center justify-between">
                    <span>Select Role</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* 5. HOW OUR APPLICATION WORKS (INTERACTIVE STEPPER) */}
        <section id="process" className="space-y-6 scroll-mt-20">
          <div className="flex items-center gap-3">
            <span className="text-amber-500 font-mono text-xs font-bold">04 /</span>
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              How Our Application Works
            </h2>
            <div className="flex-1 h-px bg-border/60" />
          </div>

          <p className="text-xs md:text-sm text-muted-foreground font-serif italic">
            Maximally transparent from step one — no hidden steps or unstated requirements.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* STEP 1 */}
            <div
              onClick={() => setActiveStep(1)}
              className={`p-6 border rounded-3xl transition-all duration-200 cursor-pointer ${
                activeStep === 1
                  ? "border-amber-500/80 bg-card shadow-md ring-1 ring-amber-500/30"
                  : "border-border/80 bg-card/70 hover:border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  STEP 01
                </span>
                <FileCheck size={18} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold font-serif text-foreground mb-2">
                Application & Business Analysis
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-serif mb-4">
                Candidate submits: resume/CV, selected area/role, LinkedIn (optional), a short business analysis/value proposal, why they want to join, and availability.
              </p>
              <div className="p-3 bg-muted/60 rounded-xl border border-border/60 text-[11px] text-foreground/80 font-serif italic">
                "We ask candidates to understand UpForge before applying and share a practical view of how their skills and ideas could contribute."
              </div>
            </div>

            {/* STEP 2 */}
            <div
              onClick={() => setActiveStep(2)}
              className={`p-6 border rounded-3xl transition-all duration-200 cursor-pointer ${
                activeStep === 2
                  ? "border-amber-500 bg-amber-500/5 shadow-md ring-1 ring-amber-500/30"
                  : "border-amber-500/40 bg-card hover:border-amber-500/70"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  STEP 02
                </span>
                <Clock size={18} className="text-amber-500" />
              </div>
              <h3 className="text-lg font-bold font-serif text-foreground mb-2">
                Assessment
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-serif mb-3">
                Candidates whose applications progress to the assessment stage may be invited to complete an AI-powered interview/assessment.
              </p>

              <div className="p-4 border border-amber-500/30 bg-amber-500/10 rounded-2xl space-y-2 text-[11px] text-foreground font-serif">
                <div className="font-mono font-bold text-amber-600 dark:text-amber-400 uppercase text-[10px] tracking-wider">
                  Assessment fee: ₹199
                </div>
                <p className="leading-relaxed text-muted-foreground text-[10.5px]">
                  Where applicable, the AI assessment is provided by an independent third-party assessment service [NEEDS CONFIRMATION]. The ₹199 fee is charged by the assessment provider to cover the assessment service and related technology costs. UpForge does not charge a recruitment fee for submitting an application.
                </p>
                <p className="font-semibold text-foreground/90 text-[10.5px]">
                  Payment does not guarantee selection, an interview with the UpForge team, employment, salary, or any other outcome.
                </p>
                <p className="text-[10px] text-muted-foreground italic">
                  Candidates should review the assessment provider's terms, privacy policy, and refund policy before making payment.
                </p>
              </div>
            </div>

            {/* STEP 3 */}
            <div
              onClick={() => setActiveStep(3)}
              className={`p-6 border rounded-3xl transition-all duration-200 cursor-pointer ${
                activeStep === 3
                  ? "border-amber-500/80 bg-card shadow-md ring-1 ring-amber-500/30"
                  : "border-border/80 bg-card/70 hover:border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  STEP 03
                </span>
                <UserCheck size={18} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold font-serif text-foreground mb-2">
                HR Discussion & Documentation
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-serif mb-4">
                Candidates who successfully complete the assessment and progress further may be invited to discuss the role, responsibilities, documentation, compensation, and joining details with the UpForge team.
              </p>
              <div className="p-3 bg-muted/60 rounded-xl border border-border/60 text-[11px] text-muted-foreground font-serif italic">
                All progression is subject to final evaluation and team fit.
              </div>
            </div>
          </div>
        </section>

        {/* 6. APPLICATION FORM */}
        <section id="apply" className="space-y-6 scroll-mt-20">
          <div className="flex items-center gap-3">
            <span className="text-amber-500 font-mono text-xs font-bold">05 /</span>
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Apply to Join UpForge
            </h2>
            <div className="flex-1 h-px bg-border/60" />
          </div>

          <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
            <h3
              className="text-2xl md:text-3xl font-bold text-foreground"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Apply to Join UpForge
            </h3>
            <p className="text-sm text-muted-foreground font-serif">
              Tell us about yourself, share your resume, and show us how you can contribute.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <HubSpotCareersForm selectedRole={selectedRole?.title} />
          </div>
        </section>

        {/* 7. TRUST & TRANSPARENCY */}
        <section className="space-y-6">
          <div className="p-6 md:p-8 border border-border/80 rounded-3xl bg-muted/30 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-foreground font-bold font-mono text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Recruitment Trust & Transparency Policy</span>
            </div>
            <ul className="grid md:grid-cols-2 gap-3 text-xs text-muted-foreground font-serif leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>
                  UpForge follows a structured application and assessment process. Submitting an application does not guarantee progression or employment.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>
                  Application review is based strictly on candidate submissions, skills, and business proposals.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>
                  Assessment/payment, where applicable, does not guarantee employment.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>
                  Candidates should use official <strong>@upforge.org</strong> email addresses for UpForge recruitment communications. UpForge will never ask for sensitive financial credentials during initial application.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* 8. FAQ ACCORDION */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-amber-500 font-mono text-xs font-bold">06 /</span>
            <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              Frequently Asked Questions
            </h2>
            <div className="flex-1 h-px bg-border/60" />
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIdx === idx
              return (
                <div
                  key={idx}
                  className={`border rounded-2xl transition-all duration-200 ${
                    isOpen
                      ? "border-amber-500/60 bg-card shadow-sm"
                      : "border-border/80 bg-card hover:border-amber-500/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-mono font-bold text-xs uppercase tracking-wider flex justify-between items-center text-foreground cursor-pointer outline-none"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-amber-500 transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs md:text-sm text-muted-foreground leading-relaxed font-serif border-t border-border/40 pt-3">
                      {item.a}
                    </div>
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
