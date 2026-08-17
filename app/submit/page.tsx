// app/submit/page.tsx — UpForge Startup Submission & UFRN Registration
"use client";

import React, { useState } from "react";
import {
  CheckCircle2, Loader2, Users, Building2, Sparkles,
  ChevronRight, ShieldCheck, ArrowRight, Check, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Navbar } from "@/components/navbar";

// ─── EmailJS Config ───────────────────────────────────────────────────────────
const WORKING_SERVICE_ID  = "service_jwpk5li";
const WORKING_TEMPLATE_ID = "template_ah89eas";
const WORKING_PUBLIC_KEY  = "2N6-20rWXZApcyd_K";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
  founder_name: string;
  startup_name: string;
  email: string;
  website: string;
  description: string;
  industry: string;
  founded_year: string;
}

const EMPTY: FormState = {
  founder_name: "",
  startup_name: "",
  email: "",
  website: "",
  description: "",
  industry: "",
  founded_year: new Date().getFullYear().toString(),
};

const STEPS = [
  { label: "Identity",  icon: Users, desc: "Founder & Company Info" },
  { label: "Details",   icon: Building2, desc: "Sector & Mission" },
];

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({
  label, required, hint, children,
}: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {hint && <span className="text-[10px] text-muted-foreground font-serif italic">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SubmitPage() {
  const [step, setStep]         = useState(0);
  const [form, setForm]         = useState<FormState>(EMPTY);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]       = useState("");

  const update = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [field]: e.target.value }));

  const stepValid = [
    !!(form.founder_name && form.startup_name && form.email),
    !!(form.industry && form.description),
  ];

  const handleSubmit = async () => {
    setIsLoading(true); setError("");
    try {
      // POST to Google Apps Script Web App (Staging Submissions tab)
      const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
      if (APPS_SCRIPT_URL) {
        try {
          await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              founder_name: form.founder_name,
              startup_name: form.startup_name,
              email: form.email,
              website: form.website,
              description: form.description,
              industry: form.industry,
              founded_year: form.founded_year,
            }),
          });
        } catch (postErr) {
          console.warn("Apps Script submission warning:", postErr);
        }
      }

      // EMAIL 1: Admin notification
      await emailjs.send(
        WORKING_SERVICE_ID,
        WORKING_TEMPLATE_ID,
        {
          name:    form.founder_name,
          title:   form.startup_name,
          email:   "contact@upforge.org",
          phone:   "N/A",
          message: `
UpForge Registry Submission
──────────────────────────────
Founder      : ${form.founder_name}
Company      : ${form.startup_name}
Year Founded : ${form.founded_year}
Sector       : ${form.industry}
Website      : ${form.website || "N/A"}
Description  : ${form.description}
──────────────────────────────
Next step: Review → Approve → Auto-send UFRN to ${form.email}
          `.trim(),
        },
        WORKING_PUBLIC_KEY
      );

      // EMAIL 2: Founder confirmation
      await emailjs.send(
        WORKING_SERVICE_ID,
        WORKING_TEMPLATE_ID,
        {
          name:  form.founder_name,
          title: form.startup_name,
          email: form.email,
          phone: "N/A",
          message: `
Hi ${form.founder_name},

We've successfully received your submission for "${form.startup_name}".

This is more than just a listing — it's a step toward being independently verified and discovered globally. Every startup we review has the potential to become part of something bigger.

Our team will carefully review your request and publish it within 3-5 business days.

This is an automated confirmation, so there's no need to reply — but know that your milestone is officially in motion.

Excited to see you grow,
The UpForge Team
          `.trim(),
        },
        WORKING_PUBLIC_KEY
      );
      
      setStep(2);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Please try again or contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 2) {
    return <SuccessScreen startupName={form.startup_name} founderName={form.founder_name} email={form.email} />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-foreground font-serif selection:bg-[#C59A2E]/20">
        
        {/* MASTHEAD */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8 pb-6 text-center flex flex-col items-center">
          <div className="glass-panel w-full rounded-3xl p-8 md:p-12 border border-border/80 shadow-md relative overflow-hidden flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-[0.2em]">
                GLOBAL STARTUP REGISTRY
              </span>
            </div>

            <h1
              className="text-3xl md:text-[46px] lg:text-[54px] font-bold leading-[1.05] text-foreground mb-3 max-w-3xl tracking-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              List Your Startup on <span className="text-amber-500">UpForge</span>
            </h1>

            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-serif italic leading-relaxed">
              Obtain your official UFRN (UpForge Registry Number) and permanent public record. Reviewed by our editorial board across 150+ countries.
            </p>
          </div>
        </section>

        {/* FORM & SIDEBAR GRID */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

            {/* FORM CARD */}
            <div className="border border-border/80 bg-card/90 rounded-3xl p-6 md:p-10 shadow-sm relative">

              {/* STEPPER BAR */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border/60">
                {STEPS.map((s, i) => {
                  const Icon = s.icon;
                  const isActive = step === i;
                  const isDone = step > i;

                  return (
                    <div key={i} className="flex-1 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isActive
                          ? "bg-foreground text-background shadow-sm"
                          : isDone
                          ? "bg-amber-500 text-black font-bold"
                          : "bg-muted text-muted-foreground border border-border/80"
                      }`}>
                        {isDone ? <Check className="w-4 h-4" /> : i + 1}
                      </div>

                      <div className="hidden sm:flex flex-col">
                        <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {s.label}
                        </span>
                        <span className="text-[11px] text-muted-foreground font-serif italic">{s.desc}</span>
                      </div>

                      {i < STEPS.length - 1 && (
                        <div className="flex-1 h-px bg-border/60 mx-2 hidden sm:block" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* FORM FIELDS */}
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <AnimatePresence mode="wait">

                  {/* STEP 1 */}
                  {step === 0 && (
                    <motion.div
                      key="s0"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Field label="Founder Name" required hint="Full legal or public name">
                          <input
                            value={form.founder_name}
                            onChange={update("founder_name")}
                            placeholder="e.g. Sarah Jenkins"
                            className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-amber-500 transition-colors"
                          />
                        </Field>

                        <Field label="Startup Name" required hint="Registered business name">
                          <input
                            value={form.startup_name}
                            onChange={update("startup_name")}
                            placeholder="e.g. Acme AI Solutions"
                            className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-amber-500 transition-colors"
                          />
                        </Field>
                      </div>

                      <Field label="Work Email" required hint="Where UFRN status will be sent">
                        <input
                          type="email"
                          value={form.email}
                          onChange={update("email")}
                          placeholder="sarah@acme.ai"
                          className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </Field>

                      <Field label="Website URL" hint="Optional company page or deck link">
                        <input
                          type="url"
                          value={form.website}
                          onChange={update("website")}
                          placeholder="https://acme.ai"
                          className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-amber-500 transition-colors"
                        />
                      </Field>
                    </motion.div>
                  )}

                  {/* STEP 2 */}
                  {step === 1 && (
                    <motion.div
                      key="s1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Field label="Industry Sector" required>
                          <select
                            value={form.industry}
                            onChange={update("industry")}
                            className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                          >
                            <option value="">Select industry sector</option>
                            {["AI/ML","SaaS","FinTech","HealthTech","EdTech","D2C","Climate Tech","Enterprise","Web3 / Crypto","Robotics","Other"].map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </Field>

                        <Field label="Founded Year" hint="Launch or incorporation year">
                          <input
                            type="number"
                            value={form.founded_year}
                            onChange={update("founded_year")}
                            placeholder="2026"
                            className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-amber-500 transition-colors"
                          />
                        </Field>
                      </div>

                      <Field label="Startup Overview & Mission" required hint="2-3 sentence overview for editorial review">
                        <textarea
                          value={form.description}
                          onChange={update("description")}
                          placeholder="Briefly describe what your startup builds, who your customers are, and key traction..."
                          rows={4}
                          className="w-full bg-background border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-amber-500 transition-colors resize-y font-serif"
                        />
                      </Field>
                    </motion.div>
                  )}
                </AnimatePresence>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 text-xs font-mono">
                    ⚠️ {error}
                  </div>
                )}

                {/* ACTION BUTTONS */}
                <div className="flex items-center justify-between pt-6 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => setStep(s => s - 1)}
                    className={`font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors ${
                      step === 0 ? "invisible" : "visible"
                    }`}
                  >
                    ← Back
                  </button>

                  {step === 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={!stepValid[0]}
                      className="inline-flex items-center gap-2 bg-foreground hover:bg-amber-500 hover:text-black rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed text-background px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Continue <ChevronRight size={14}/>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading || !stepValid[1]}
                      className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed text-black rounded-2xl px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                    >
                      {isLoading ? (
                        <><Loader2 className="w-4 h-4 animate-spin"/> Submitting…</>
                      ) : (
                        <>Submit to Registry <ArrowRight className="w-4 h-4"/></>
                      )}
                    </button>
                  )}
                </div>
              </form>

            </div>

            {/* SIDEBAR */}
            <div className="space-y-6">

              {/* PROCESS TRACKER */}
              <div className="border border-border/80 bg-card/90 rounded-3xl p-6 shadow-sm">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 block mb-4">
                  Audit Protocol
                </span>

                <ul className="space-y-4">
                  {[
                    { n: "01", title: "Data Ingestion", desc: "Form received via encrypted email payload", done: step >= 0 },
                    { n: "02", title: "Editorial Review", desc: "Board verifies founder & operational proof", done: step >= 1 },
                    { n: "03", title: "UFRN Assignment", desc: "Sequential registration number issued", gold: true },
                    { n: "04", title: "Public Ledger", desc: "Live listing on UpForge Global Index", gold: true },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                        item.gold ? "bg-amber-500 text-black font-bold" : "bg-muted text-foreground border border-border/80"
                      }`}>
                        {item.n}
                      </span>
                      <div>
                        <h4 className="font-mono text-xs font-bold text-foreground">{item.title}</h4>
                        <p className="text-[11px] text-muted-foreground leading-normal font-serif italic">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* UFRN SPECIMEN BOX */}
              <div className="border border-amber-500/40 bg-amber-500/5 rounded-3xl p-6 relative overflow-hidden shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                    Specimen Identifier
                  </span>
                </div>

                <div className="bg-background border border-amber-500/30 rounded-xl p-3 mb-3 text-center">
                  <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 tracking-wider">
                    UF-2026-IND-00013
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed font-serif">
                  Every approved startup receives a permanent UFRN for due diligence, pitch decks, and partner verification.
                </p>

                <div className="mt-4 pt-3 border-t border-amber-500/20 text-[10px] text-muted-foreground italic font-serif">
                  Disclaimer: UFRN is an independent registry credential issued by UpForge and does not substitute for legal business incorporation.
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────
function SuccessScreen({
  startupName, founderName, email,
}: { startupName: string; founderName: string; email: string }) {
  const [latestStartup, setLatestStartup] = useState<any>(null);
  const [isLoadingLatest, setIsLoadingLatest] = useState(true);

  React.useEffect(() => {
    let isMounted = true;
    async function fetchLatest() {
      try {
        const res = await fetch("/api/latest-startup");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data?.startup) {
            setLatestStartup(data.startup);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch latest startup for social proof:", err);
      } finally {
        if (isMounted) setIsLoadingLatest(false);
      }
    }
    fetchLatest();
    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-4 md:p-8 font-serif">
        <div className="bg-background border-2 border-foreground max-w-lg w-full p-8 md:p-12 text-center shadow-md relative rounded-3xl">
          
          <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-[#22C55E]" />
          </div>

          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#C59A2E] block mb-2">
            Submission Confirmed
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            Registration Received
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-serif">
            Thank you, <strong className="text-foreground">{founderName.split(" ")[0]}</strong>.{" "}
            <strong className="text-foreground">{startupName}</strong> has been logged in our editorial queue.
          </p>

          <div className="bg-muted border border-[#C59A2E]/30 p-5 mb-6 text-left space-y-2 rounded-2xl">
            <div className="flex items-center gap-2 text-[#C59A2E]">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Audit Protocol</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We sent a confirmation copy to <strong className="text-foreground">{email}</strong>. Our editorial board will issue your official UFRN credential within 3-5 business days.
            </p>
          </div>

          {/* Social Proof — Latest Approved Startup Card */}
          {latestStartup && (
            <div className="mb-6 p-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 text-left transition-all hover:border-amber-500/50">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Latest Approved Startup
                </span>
                {latestStartup.ufrn && (
                  <span className="font-mono text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    {latestStartup.ufrn}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-base text-foreground mb-1">
                {latestStartup.name}
              </h3>
              {latestStartup.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                  {latestStartup.description}
                </p>
              )}
              <a
                href={`/startup/${latestStartup.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline uppercase tracking-wider"
              >
                View Approved Profile <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          <a
            href="/registry"
            className="inline-flex items-center justify-center gap-2 bg-foreground hover:bg-[#C59A2E] text-background px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors w-full rounded-2xl"
          >
            Explore Global Registry <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
}

