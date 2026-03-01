"use client";

import React, { useRef, useState } from "react";
import {
  ShieldCheck, CheckCircle2, Loader2, Globe, Rocket,
  BadgeCheck, ArrowRight, ChevronRight, Building2,
  Users, TrendingUp, FileText, Sparkles, Calendar,
  IndianRupee, Target, AlertCircle, ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

// ─── EmailJS Config (same as your apply page) ────────────────────────────────
const EJ_SERVICE = "service_hez7mw9";
const EJ_TEMPLATE = "template_htai0ev";
const EJ_KEY = "qsf9Wt-yXfBKQ7CD7";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormState {
  // Step 1 — Identity
  founder_name: string;
  startup_name: string;
  email: string;
  phone: string;
  // Step 2 — Business
  founded_year: string;
  industry: string;
  city: string;
  website: string;
  description: string;
  problem_solved: string;
  // Step 3 — Traction
  target_market: string;
  business_model: string;
  team_size: string;
  funding_stage: string;
  funding_raised: string;
  current_revenue: string;
  // Step 4 — Final
  co_founders: string;
  unique_advantage: string;
  social_media: string;
  how_heard: string;
}

const EMPTY: FormState = {
  founder_name: "", startup_name: "", email: "", phone: "",
  founded_year: "", industry: "", city: "", website: "", description: "", problem_solved: "",
  target_market: "", business_model: "", team_size: "", funding_stage: "", funding_raised: "", current_revenue: "",
  co_founders: "", unique_advantage: "", social_media: "", how_heard: "",
};

// ─── Field component ──────────────────────────────────────────────────────────

function Field({
  label, required, hint, children,
}: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        className="block text-[9px] font-bold uppercase tracking-[0.18em] text-[#888] mb-1.5"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[10px] text-[#BBB] mt-1">{hint}</p>}
    </div>
  );
}

const inputCls =
  "w-full border border-[#D5D0C8] bg-white px-3.5 py-2.5 text-[13px] text-[#1C1C1C] placeholder-[#CCC] focus:outline-none focus:border-[#1C1C1C] transition-colors";
const selectCls =
  "w-full border border-[#D5D0C8] bg-white px-3.5 py-2.5 text-[13px] text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C] transition-colors appearance-none";

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS = [
  { label: "Identity", icon: Users },
  { label: "Business", icon: Building2 },
  { label: "Traction", icon: TrendingUp },
  { label: "Details", icon: Sparkles },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SubmitPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [step, setStep] = useState(0); // 0–3 form steps, 4 = success
  const [form, setForm] = useState<FormState>(EMPTY);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  // Step validation
  const stepValid = [
    form.founder_name && form.startup_name && form.email,
    form.founded_year && form.industry && form.description,
    true, // step 3 all optional
    true, // step 4 all optional
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      // 1. Store in Supabase
      const supabase = createClient();
      const { error: dbError } = await supabase.from("startup_submissions").insert([
        {
          founder_name: form.founder_name,
          startup_name: form.startup_name,
          email: form.email,
          phone: form.phone || null,
          founded_year: form.founded_year ? parseInt(form.founded_year) : null,
          industry: form.industry,
          city: form.city || null,
          website: form.website || null,
          description: form.description,
          problem_solved: form.problem_solved || null,
          target_market: form.target_market || null,
          business_model: form.business_model || null,
          team_size: form.team_size ? parseInt(form.team_size) : null,
          funding_stage: form.funding_stage || null,
          funding_raised: form.funding_raised || null,
          current_revenue: form.current_revenue || null,
          co_founders: form.co_founders || null,
          unique_advantage: form.unique_advantage || null,
          social_media: form.social_media || null,
          how_heard: form.how_heard || null,
          status: "pending",
          submitted_at: new Date().toISOString(),
        },
      ]);

      if (dbError) {
        console.error("Supabase error:", dbError);
        // Don't block the user — still try emailjs
      }

      // 2. Send email notification via EmailJS (same service as your apply page)
      if (formRef.current) {
        await emailjs.send(
          EJ_SERVICE,
          EJ_TEMPLATE,
          {
            from_name: form.founder_name,
            business_name: form.startup_name,
            reply_to: form.email,
            website: form.website || "Not provided",
            message: `
New Startup Submission on UpForge

Startup: ${form.startup_name}
Founder: ${form.founder_name}
Email: ${form.email}
Phone: ${form.phone || "—"}
Founded: ${form.founded_year || "—"}
Industry: ${form.industry}
City: ${form.city || "—"}
Website: ${form.website || "—"}
Description: ${form.description}
Problem: ${form.problem_solved || "—"}
Target Market: ${form.target_market || "—"}
Business Model: ${form.business_model || "—"}
Team Size: ${form.team_size || "—"}
Funding Stage: ${form.funding_stage || "—"}
Funding Raised: ${form.funding_raised || "—"}
Revenue: ${form.current_revenue || "—"}
Co-founders: ${form.co_founders || "—"}
Advantage: ${form.unique_advantage || "—"}
Social: ${form.social_media || "—"}
How heard: ${form.how_heard || "—"}
            `.trim(),
          },
          EJ_KEY
        );
      }

      setStep(4); // success
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again or email us at contact@upforge.in");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 4) {
    return <SuccessScreen startupName={form.startup_name} founderName={form.founder_name} />;
  }

  return (
    <div className="bg-[#F7F5F0] min-h-screen" style={{ fontFamily: "system-ui, sans-serif" }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .fu { animation: fadeUp 0.45s ease both; }
        .fu-2 { animation: fadeUp 0.45s 0.1s ease both; }
        .fu-3 { animation: fadeUp 0.45s 0.2s ease both; }
      `}</style>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">

        {/* ── MASTHEAD ── */}
        <div className="border-b-2 border-[#1C1C1C] pb-6 mb-0 fu">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <p className="text-[9px] tracking-[0.28em] text-[#AAA] uppercase mb-3">UpForge · Registry Submission</p>
              <h1
                className="text-[2.2rem] sm:text-[3rem] lg:text-[3.8rem] tracking-tight leading-[1.0] text-[#1C1C1C]"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                List Your Startup<br />
                <em className="text-[#A89060] not-italic">Free, Forever.</em>
              </h1>
            </div>
            <div className="pb-1 flex flex-col gap-2 lg:items-end">
              <div className="flex items-center gap-2 border border-[#DDD] bg-white px-3 py-1.5 w-fit">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                </span>
                <span className="text-[10px] font-semibold text-[#555] tracking-wide uppercase">Accepting Submissions</span>
              </div>
              <p className="text-[11px] text-[#888]">Takes under 5 minutes · No login required</p>
            </div>
          </div>
        </div>

        {/* ── TRUST STATS STRIP ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#D5D0C8] fu-2">
          {[
            { icon: BadgeCheck, label: "100% Free", sub: "No hidden charges" },
            { icon: ShieldCheck, label: "Manual Verified", sub: "Every profile reviewed" },
            { icon: Globe, label: "Publicly Indexed", sub: "Google discoverable" },
            { icon: Rocket, label: "3–7 Days", sub: "Avg. verification time" },
          ].map((item, i) => (
            <div key={i} className="py-5 px-4 border-r border-[#D5D0C8] last:border-r-0">
              <item.icon className="w-4 h-4 text-[#AAA] mb-2" />
              <p className="text-[12px] font-semibold text-[#1C1C1C] mb-0.5" style={{ fontFamily: "'Georgia', serif" }}>{item.label}</p>
              <p className="text-[10px] text-[#AAA]">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid lg:grid-cols-3 gap-0 border-b border-[#D5D0C8]">

          {/* ── FORM AREA ── */}
          <div className="lg:col-span-2 py-8 pr-0 lg:pr-12 border-r border-[#D5D0C8]">

            {/* Step indicator */}
            <div className="flex items-center gap-0 mb-8">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const done = i < step;
                const active = i === step;
                return (
                  <React.Fragment key={i}>
                    <div className={`flex items-center gap-2 px-3 py-2 transition-all ${
                      active ? "bg-[#1C1C1C] text-white" :
                      done ? "bg-[#EEEAE3] text-[#888]" : "text-[#CCC]"
                    }`}>
                      {done ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Icon className={`w-3.5 h-3.5 ${active ? "text-[#E8C547]" : ""}`} />
                      )}
                      <span className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block`}>{s.label}</span>
                      <span className="text-[9px] text-[#AAA] hidden sm:block">·</span>
                      <span className={`text-[9px] hidden sm:block ${active ? "text-white/50" : "text-[#CCC]"}`}>{i + 1}/4</span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <ChevronRight className="w-3 h-3 text-[#D5D0C8] flex-shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <form ref={formRef}>
              <AnimatePresence mode="wait">

                {/* ── STEP 0: Identity ── */}
                {step === 0 && (
                  <motion.div key="step0" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="space-y-5">
                    <div className="flex items-center gap-2 mb-6 pb-3 border-b border-[#EEEAE3]">
                      <Users className="w-4 h-4 text-[#AAA]" />
                      <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">01 · Founder Identity</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Your Full Name" required>
                        <input name="from_name" value={form.founder_name} onChange={update("founder_name")} placeholder="e.g. Rahul Sharma" className={inputCls} required />
                      </Field>
                      <Field label="Startup Name" required>
                        <input name="business_name" value={form.startup_name} onChange={update("startup_name")} placeholder="e.g. Krutrim AI" className={inputCls} required />
                      </Field>
                      <Field label="Business Email" required>
                        <input name="reply_to" type="email" value={form.email} onChange={update("email")} placeholder="you@startup.in" className={inputCls} required />
                      </Field>
                      <Field label="Phone Number" hint="Optional — for verification only">
                        <input name="phone" type="tel" value={form.phone} onChange={update("phone")} placeholder="+91 98XXX XXXXX" className={inputCls} />
                      </Field>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 1: Business ── */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="space-y-5">
                    <div className="flex items-center gap-2 mb-6 pb-3 border-b border-[#EEEAE3]">
                      <Building2 className="w-4 h-4 text-[#AAA]" />
                      <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">02 · Business Details</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Founded Year" required>
                        <input name="founded_year" type="number" value={form.founded_year} onChange={update("founded_year")} placeholder="e.g. 2022" min="1990" max="2026" className={inputCls} />
                      </Field>
                      <Field label="Industry / Sector" required>
                        <select name="industry" value={form.industry} onChange={update("industry")} className={selectCls}>
                          <option value="">Select sector…</option>
                          {["AI/ML", "FinTech", "SaaS", "EdTech", "HealthTech", "D2C/E-commerce",
                            "Climate Tech", "Space Tech", "AgriTech", "LogiTech", "Mobility",
                            "Gaming", "Web3/Crypto", "BioTech", "Media/Content", "Other"].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Headquarters City">
                        <input name="city" value={form.city} onChange={update("city")} placeholder="e.g. Bengaluru" className={inputCls} />
                      </Field>
                      <Field label="Website URL">
                        <input name="website" type="url" value={form.website} onChange={update("website")} placeholder="https://yourstartup.com" className={inputCls} />
                      </Field>
                    </div>
                    <Field label="One-line Description" required hint="How would you describe your startup in one sentence?">
                      <input name="description" value={form.description} onChange={update("description")} placeholder="e.g. AI-powered invoice automation for Indian SMEs" className={inputCls} />
                    </Field>
                    <Field label="Problem You Solve" hint="What gap in the market does your startup address?">
                      <textarea name="problem_solved" value={form.problem_solved} onChange={update("problem_solved")} placeholder="Describe the core problem you are solving…" rows={3} className={`${inputCls} resize-none`} />
                    </Field>
                  </motion.div>
                )}

                {/* ── STEP 2: Traction ── */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="space-y-5">
                    <div className="flex items-center gap-2 mb-6 pb-3 border-b border-[#EEEAE3]">
                      <TrendingUp className="w-4 h-4 text-[#AAA]" />
                      <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">03 · Traction & Funding</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Target Market">
                        <input value={form.target_market} onChange={update("target_market")} placeholder="e.g. Indian SMEs, B2B SaaS companies" className={inputCls} />
                      </Field>
                      <Field label="Business Model">
                        <input value={form.business_model} onChange={update("business_model")} placeholder="e.g. SaaS subscription, marketplace fee" className={inputCls} />
                      </Field>
                      <Field label="Team Size">
                        <input type="number" value={form.team_size} onChange={update("team_size")} placeholder="e.g. 8" min="1" className={inputCls} />
                      </Field>
                      <Field label="Funding Stage">
                        <select value={form.funding_stage} onChange={update("funding_stage")} className={selectCls}>
                          <option value="">Select stage…</option>
                          {["Bootstrapped", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Revenue-funded"].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Total Funding Raised">
                        <input value={form.funding_raised} onChange={update("funding_raised")} placeholder="e.g. $500K, ₹2Cr, None" className={inputCls} />
                      </Field>
                      <Field label="Current Annual Revenue">
                        <input value={form.current_revenue} onChange={update("current_revenue")} placeholder="e.g. ₹50L ARR, Pre-revenue" className={inputCls} />
                      </Field>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 3: Details ── */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="space-y-5">
                    <div className="flex items-center gap-2 mb-6 pb-3 border-b border-[#EEEAE3]">
                      <Sparkles className="w-4 h-4 text-[#AAA]" />
                      <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888]">04 · Final Details</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Co-Founders">
                        <input value={form.co_founders} onChange={update("co_founders")} placeholder="Names separated by commas" className={inputCls} />
                      </Field>
                      <Field label="Social Media / LinkedIn">
                        <input value={form.social_media} onChange={update("social_media")} placeholder="LinkedIn URL or @handle" className={inputCls} />
                      </Field>
                    </div>
                    <Field label="Your Unique Advantage" hint="What makes your startup defensible? IP, network effects, team, data…">
                      <textarea value={form.unique_advantage} onChange={update("unique_advantage")} placeholder="What sets you apart from existing solutions…" rows={3} className={`${inputCls} resize-none`} />
                    </Field>
                    <Field label="How did you hear about UpForge?">
                      <select value={form.how_heard} onChange={update("how_heard")} className={selectCls}>
                        <option value="">Select…</option>
                        {["LinkedIn", "Twitter / X", "Google Search", "Friend / Colleague", "Investor", "Accelerator", "Other"].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </Field>

                    {/* Final review card */}
                    <div className="border border-[#E8C547]/30 bg-[#E8C547]/5 p-4 mt-2">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[#A89060] mb-2">Review your submission</p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                        {[
                          ["Startup", form.startup_name],
                          ["Founder", form.founder_name],
                          ["Email", form.email],
                          ["Industry", form.industry],
                          ["Founded", form.founded_year || "—"],
                          ["Stage", form.funding_stage || "—"],
                        ].map(([label, value]) => (
                          <div key={label} className="flex gap-1.5">
                            <span className="text-[10px] text-[#AAA]">{label}:</span>
                            <span className="text-[10px] text-[#555] font-semibold truncate">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Error */}
              {error && (
                <div className="mt-4 flex items-start gap-2 border border-red-200 bg-red-50 p-3">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-red-700">{error}</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#EEEAE3]">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className={`flex items-center gap-1.5 px-5 py-2.5 border border-[#D5D0C8] text-[11px] font-bold uppercase tracking-wider text-[#666] hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-colors ${step === 0 ? "invisible" : ""}`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!stepValid[step]}
                    className={`flex items-center gap-2 px-7 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                      stepValid[step]
                        ? "bg-[#1C1C1C] text-white hover:bg-[#333]"
                        : "bg-[#EEEAE3] text-[#BBB] cursor-not-allowed"
                    }`}
                  >
                    Continue <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-7 py-3 bg-[#1C1C1C] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#333] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting…</>
                    ) : (
                      <><Sparkles className="w-3.5 h-3.5 text-[#E8C547]" /> Submit to Registry</>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* ── SIDEBAR ── */}
          <div className="py-8 lg:pl-8">
            <div className="sticky top-24 space-y-5">

              {/* What happens next */}
              <div className="border border-[#D5D0C8] bg-white p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AAA] mb-4">What Happens Next</p>
                <div className="space-y-4">
                  {[
                    { step: "01", title: "Submission received", sub: "Logged instantly in our registry database", icon: FileText },
                    { step: "02", title: "Manual review", sub: "Our team verifies your info within 3–7 days", icon: ShieldCheck },
                    { step: "03", title: "Profile goes live", sub: "Publicly indexed, permanently accessible", icon: Globe },
                    { step: "04", title: "Verification badge", sub: "✓ appears on your profile once confirmed", icon: BadgeCheck },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-[#EEEAE3] text-[#888] flex items-center justify-center text-[8px] font-bold flex-shrink-0 mt-0.5">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#1C1C1C] mb-0.5" style={{ fontFamily: "'Georgia', serif" }}>{item.title}</p>
                        <p className="text-[10px] text-[#AAA]">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust */}
              <div className="border border-[#D5D0C8] bg-white p-5 space-y-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#AAA] mb-1">Our Commitments</p>
                {[
                  { icon: ShieldCheck, text: "We never sell or share your data" },
                  { icon: BadgeCheck, text: "Listings are free — no upsell trap" },
                  { icon: Globe, text: "Your profile stays live permanently" },
                  { icon: FileText, text: "We'll email you when you're live" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <item.icon className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="text-[11px] text-[#666]">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* After listing CTA */}
              <div className="border border-[#E8C547]/30 bg-[#E8C547]/5 p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A89060] mb-3">After listing, get…</p>
                <div className="space-y-2 mb-4">
                  {[
                    "Free AI-generated growth report",
                    "Free valuation estimate",
                    "Sector momentum analysis",
                    "Investor-ready profile page",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <span className="text-[11px] text-[#555]">{item}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="/reports"
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#A89060] hover:text-[#1C1C1C] transition-colors"
                >
                  Get your free report now <ChevronRight className="w-3 h-3" />
                </a>
              </div>

              {/* Help */}
              <p className="text-[10px] text-[#AAA] text-center">
                Questions?{" "}
                <a href="mailto:contact@upforge.in" className="text-[#555] hover:text-[#1C1C1C] underline underline-offset-2 transition-colors">
                  contact@upforge.in
                </a>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({ startupName, founderName }: { startupName: string; founderName: string }) {
  return (
    <div className="bg-[#F7F5F0] min-h-screen flex items-center justify-center px-4" style={{ fontFamily: "system-ui, sans-serif" }}>
      <div className="max-w-2xl w-full">

        {/* Dark success card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#1C1C1C] text-white p-10 sm:p-14 relative overflow-hidden"
        >
          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 80px)",
            }}
          />

          <div className="relative text-center">
            {/* Animated checkmark */}
            <div className="relative mx-auto w-20 h-20 mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-[#E8C547]/10 border border-[#E8C547]/20 flex items-center justify-center mx-auto"
              >
                <CheckCircle2 className="w-10 h-10 text-[#E8C547]" />
              </motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-10px] border border-dashed border-[#E8C547]/20"
              />
            </div>

            <p className="text-[9px] text-[#E8C547] font-bold uppercase tracking-[0.3em] mb-4">Registry Logged</p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl text-white mb-3 tracking-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {startupName} is in the queue.
            </h2>
            <p className="text-white/50 text-sm max-w-sm mx-auto leading-relaxed mb-8">
              Thanks, {founderName.split(" ")[0]}. Our team will review your submission and publish your profile within 3–7 business days. You'll receive a confirmation at your email.
            </p>

            {/* Next steps */}
            <div className="grid sm:grid-cols-3 gap-3 mb-8">
              {[
                { icon: FileText, title: "Get your report", sub: "Free AI analysis now", href: "/reports" },
                { icon: IndianRupee, title: "Valuation tool", sub: "Free estimate", href: "/valuation" },
                { icon: Target, title: "Explore registry", sub: "See other startups", href: "/startup" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex flex-col items-center gap-2 p-4 border border-white/10 hover:border-white/25 hover:bg-white/5 transition-colors group"
                >
                  <item.icon className="w-5 h-5 text-[#E8C547] group-hover:scale-110 transition-transform" />
                  <p className="text-[11px] font-semibold text-white">{item.title}</p>
                  <p className="text-[9px] text-white/40">{item.sub}</p>
                </a>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3">
              <a
                href="/"
                className="flex items-center gap-1.5 text-[10px] text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider"
              >
                Back to home <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Footer note */}
        <p className="text-center text-[10px] text-[#AAA] mt-5">
          Questions? Email us at{" "}
          <a href="mailto:contact@upforge.in" className="text-[#555] underline underline-offset-2">
            contact@upforge.in
          </a>
        </p>
      </div>
    </div>
  );
}
