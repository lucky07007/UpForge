// app/careers/page.tsx — UpForge Careers & Opportunities
import type { Metadata } from "next"
import Link from "next/link"
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
  AlertTriangle,
  Mail,
  Lock,
  FileCheck,
  Clock,
  Award,
} from "lucide-react"
import { HubSpotCareersForm } from "@/components/careers/hubspot-form"

export const metadata: Metadata = {
  title: "Careers at UpForge | Build With Us",
  description:
    "Explore career and internship opportunities at UpForge. Learn about our application process and discover how you can contribute to a growing startup.",
  alternates: {
    canonical: "https://www.upforge.org/careers",
  },
  openGraph: {
    title: "Careers at UpForge | Build With Us",
    description:
      "Explore career and internship opportunities at UpForge. Learn about our transparent application process and join our growing team.",
    url: "https://www.upforge.org/careers",
    siteName: "UpForge",
    images: [
      {
        url: "https://www.upforge.org/og/global-registry.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@upforge_in",
    creator: "@upforge_in",
    title: "Careers at UpForge | Build With Us",
    description:
      "Join a growing startup where your ideas, skills, and initiative create real impact.",
    images: ["https://www.upforge.org/og/global-registry.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const OPPORTUNITY_AREAS = [
  {
    title: "AI & Machine Learning",
    desc: "Build intelligence pipelines, model evaluation workflows, and automated entity taxonomy.",
    icon: Brain,
  },
  {
    title: "Software Development",
    desc: "Develop high-performance edge web applications, APIs, and scalable registry architecture.",
    icon: Code2,
  },
  {
    title: "Data Analytics & Business Intelligence",
    desc: "Analyze startup ecosystem datasets, funding trends, and market performance metrics.",
    icon: BarChart3,
  },
  {
    title: "Business Analysis & Strategy",
    desc: "Research industry trends, founder models, and strategic growth positioning for registry entities.",
    icon: Compass,
  },
  {
    title: "Product Management",
    desc: "Define feature scope, streamline verification workflows, and enhance user experience.",
    icon: Layers,
  },
  {
    title: "Digital Marketing & Growth",
    desc: "Drive organic search visibility, developer marketing, and ecosystem outreach.",
    icon: TrendingUp,
  },
  {
    title: "Business Development & Sales",
    desc: "Build institutional partnerships, founder networks, and ecosystem collaborations.",
    icon: Target,
  },
  {
    title: "UI/UX & Product Design",
    desc: "Craft clean, accessible, and modern user interfaces across registry platforms.",
    icon: Palette,
  },
  {
    title: "Content & Social Media",
    desc: "Produce editorial reports, founder chronicles, and industry insights.",
    icon: Share2,
  },
  {
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

export default function CareersPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.upforge.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Careers",
        item: "https://www.upforge.org/careers",
      },
    ],
  }

  const webpageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Careers at UpForge | Build With Us",
    description:
      "Explore career and internship opportunities at UpForge. Learn about our application process and discover how you can contribute to a growing startup.",
    url: "https://www.upforge.org/careers",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }}
      />

      <div className="min-h-screen bg-background text-foreground selection:bg-amber-500/20">
        {/* 1. HERO SECTION */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8 pb-12 text-center">
          <div className="glass-panel w-full rounded-3xl p-8 md:p-14 border border-border/80 shadow-md relative overflow-hidden flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-[0.2em]">
                CAREERS & OPPORTUNITIES
              </span>
            </div>

            <h1
              className="text-4xl md:text-6xl lg:text-[64px] font-bold leading-[1.05] mb-5 max-w-4xl tracking-tight text-foreground"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Build With UpForge.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-serif italic mb-8">
              Join a growing startup where your ideas, skills, and initiative can create real impact.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#apply"
                className="inline-flex items-center gap-2.5 bg-foreground hover:bg-amber-500 text-background hover:text-black py-3.5 px-8 rounded-2xl font-bold uppercase tracking-[0.15em] text-xs font-mono transition-all shadow-sm"
              >
                Apply to Join UpForge <ArrowRight size={14} />
              </a>
              <a
                href="#process"
                className="inline-flex items-center gap-2 border border-border/80 hover:border-amber-500/60 bg-card hover:bg-muted py-3.5 px-8 rounded-2xl font-bold uppercase tracking-[0.15em] text-xs font-mono transition-all shadow-xs"
              >
                Explore the Process
              </a>
            </div>
          </div>
        </section>

        <main className="max-w-[1200px] mx-auto px-4 md:px-8 pb-16 space-y-16">
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
                  title: "Tech & Business Cross-Pollination",
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
                  className="p-6 border border-border/80 rounded-2xl bg-card hover:border-amber-500/60 shadow-xs hover:shadow-md hover-lift transition-all duration-200"
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

            <div className="p-8 border border-border/80 rounded-3xl bg-card shadow-sm space-y-4">
              <h3
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Builders, Problem Solvers & Initiative-Driven Talent
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-serif">
                UpForge welcomes students, fresh graduates, early-career professionals, self-taught builders, and experienced problem solvers. We prioritize your skills, curiosity, logical thinking, and ability to contribute over prior employment history or formal resume titles.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-2.5 text-xs font-mono text-foreground font-semibold">
                  <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
                  <span>Strong Initiative & Self-Drive</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-mono text-foreground font-semibold">
                  <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
                  <span>Practical Problem Solving</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-mono text-foreground font-semibold">
                  <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
                  <span>Eagerness to Learn & Execute</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. AREAS OF OPPORTUNITY */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-amber-500 font-mono text-xs font-bold">03 /</span>
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                Areas of Opportunity
              </h2>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            <p className="text-xs md:text-sm text-muted-foreground font-serif italic">
              Explore opportunities across key operational and technical disciplines at UpForge:
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {OPPORTUNITY_AREAS.map((area, idx) => {
                const Icon = area.icon
                return (
                  <div
                    key={idx}
                    className="p-5 border border-border/80 rounded-2xl bg-card hover:border-amber-500/50 shadow-xs hover-lift transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center text-foreground mb-3">
                        <Icon size={16} />
                      </div>
                      <h3 className="text-xs font-mono font-bold text-foreground mb-1.5 uppercase tracking-wide">
                        {area.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed font-serif">
                        {area.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* 5. HOW OUR APPLICATION WORKS (3 STEPS) */}
          <section id="process" className="space-y-6 scroll-mt-20">
            <div className="flex items-center gap-3">
              <span className="text-amber-500 font-mono text-xs font-bold">04 /</span>
              <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                How Our Application Works
              </h2>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            <p className="text-xs md:text-sm text-muted-foreground font-serif italic">
              Transparent from step one — we respect your time and outline our evaluation workflow clearly.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* STEP 1 */}
              <div className="p-6 border border-border/80 rounded-3xl bg-card shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                      STEP 01
                    </span>
                    <FileCheck size={18} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold font-serif text-foreground mb-2">
                    Application & Business Analysis
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-serif mb-3">
                    Submit your resume, selected area, LinkedIn (optional), availability, and a short business analysis proposal.
                  </p>
                  <div className="p-3 bg-muted/60 rounded-xl border border-border/60 text-[11px] text-foreground/80 font-serif italic">
                    "We ask candidates to understand UpForge before applying and share a practical view of how their skills and ideas could contribute."
                  </div>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="p-6 border border-amber-500/40 rounded-3xl bg-card shadow-sm space-y-4 flex flex-col justify-between">
                <div>
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

                  <div className="p-4 border border-amber-500/30 bg-amber-500/5 rounded-2xl space-y-2 text-[11px] text-foreground font-serif">
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
              </div>

              {/* STEP 3 */}
              <div className="p-6 border border-border/80 rounded-3xl bg-card shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                      STEP 03
                    </span>
                    <UserCheck size={18} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold font-serif text-foreground mb-2">
                    HR Discussion & Documentation
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-serif mb-3">
                    Candidates who successfully complete the assessment and progress further may be invited to discuss the role, responsibilities, documentation, compensation, and joining details with the UpForge team.
                  </p>
                  <div className="p-3 bg-muted/60 rounded-xl border border-border/60 text-[11px] text-muted-foreground font-serif italic">
                    All progression is subject to final evaluation and team fit.
                  </div>
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
                Submit Your Application
              </h3>
              <p className="text-sm text-muted-foreground font-serif">
                Tell us about yourself, share your resume, and show us how you can contribute.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <HubSpotCareersForm />
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
                    Application evaluation is based strictly on candidate submissions, skills, and practical proposals.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>
                    Third-party assessment or fee payment, where applicable, does not guarantee selection or hiring outcomes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>
                    Always verify recruitment communications arrive from official <strong>@upforge.org</strong> email addresses. UpForge will never ask for sensitive financial credentials.
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
              {FAQ_ITEMS.map((item, idx) => (
                <details
                  key={idx}
                  className="group border border-border/80 rounded-2xl p-5 bg-card cursor-pointer shadow-xs hover:border-amber-500/50 transition-colors"
                >
                  <summary className="font-mono font-bold text-xs uppercase tracking-wider flex justify-between items-center text-foreground select-none">
                    <span>{item.q}</span>
                    <span className="text-amber-500 group-open:rotate-180 transition-transform font-mono text-sm">
                      ↓
                    </span>
                  </summary>
                  <p className="text-xs md:text-sm text-muted-foreground mt-3 leading-relaxed font-serif pt-3 border-t border-border/40">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
