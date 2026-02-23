// app/apply/page.tsx
"use client";

import React, { useRef, useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Loader2,
  Globe,
  Rocket,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function ApplyPage() {
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await emailjs.sendForm(
        "service_hez7mw9",
        "template_htai0ev",
        form.current!,
        "qsf9Wt-yXfBKQ7CD7"
      );
      setIsSubmitted(true);
      setTimeout(() => router.push("/"), 3000);
    } catch (error) {
      console.error("Submission failed", error);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-white text-black min-h-screen">
      <Navbar />
      <main className="relative pt-20">
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left: Context & Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8 text-center lg:text-left"
              >
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <span className="h-px w-10 bg-black/20 hidden sm:block"></span>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                    VAULT REGISTRY
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tighter leading-[0.9]">
                  Join the <br />
                  <span className="text-gray-500 italic font-medium">Registry.</span>
                </h1>

                <p className="text-base text-gray-400 max-w-md mx-auto lg:mx-0">
                  Get verified, gain trust, and connect with India’s top builders and investors.
                </p>

                <div className="space-y-6 pt-4 max-w-md mx-auto lg:mx-0">
                  <BenefitItem
                    icon={ShieldCheck}
                    title="Verified Badge"
                    desc="Institutional trust for your startup profile."
                  />
                  <BenefitItem
                    icon={Globe}
                    title="Elite Network"
                    desc="Direct access to India's top 1% builders."
                  />
                  <BenefitItem
                    icon={Rocket}
                    title="Scale Ready"
                    desc="Priority listing for curated capital channels."
                  />
                </div>

                {/* Decorative seal */}
                <div className="hidden lg:flex items-center gap-4 pt-8 border-t border-black/5">
                  <div className="space-y-0.5">
                    <p className="text-[8px] uppercase tracking-[0.4em] text-gray-400 font-black">
                      Identity Ledger v2.4
                    </p>
                    <p className="text-[7px] text-gray-400 font-bold font-mono">
                      HASH_AUTH: 0xFD91...883
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right: Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full"
              >
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white border border-black/5 rounded-2xl shadow-sm p-6 sm:p-8"
                    >
                      <div className="mb-6 space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight">Founder Submission</h2>
                        <p className="text-gray-400 text-xs uppercase tracking-wider">
                          Secure Form
                        </p>
                      </div>

                      <form ref={form} onSubmit={sendEmail} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            name="from_name"
                            placeholder="Founder Name"
                            required
                            className="h-12 border-black/10 focus:border-[#1e3a5f] rounded-xl text-sm"
                          />
                          <Input
                            name="business_name"
                            placeholder="Startup Name"
                            required
                            className="h-12 border-black/10 focus:border-[#1e3a5f] rounded-xl text-sm"
                          />
                        </div>
                        <Input
                          name="reply_to"
                          type="email"
                          placeholder="Professional Email"
                          required
                          className="h-12 border-black/10 focus:border-[#1e3a5f] rounded-xl text-sm"
                        />
                        <Input
                          name="website"
                          type="url"
                          placeholder="Startup Website (https://...)"
                          required
                          className="h-12 border-black/10 focus:border-[#1e3a5f] rounded-xl text-sm"
                        />
                        <Textarea
                          name="message"
                          placeholder="Tell us about the problem you are solving..."
                          required
                          className="min-h-[120px] border-black/10 focus:border-[#1e3a5f] rounded-xl resize-none p-4 text-sm"
                        />

                        <Button
                          disabled={isLoading}
                          className="w-full h-14 bg-[#1e3a5f] hover:bg-[#14304a] text-white rounded-xl uppercase text-[10px] font-black tracking-[0.3em] transition-all mt-2 relative overflow-hidden group"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-3">
                            {isLoading ? (
                              <Loader2 className="animate-spin h-4 w-4" />
                            ) : (
                              <>
                                Submit for Verification
                                <Zap className="h-3 w-3 fill-current group-hover:animate-pulse" />
                              </>
                            )}
                          </span>
                        </Button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-black/5 rounded-2xl shadow-sm p-12 text-center space-y-6"
                    >
                      <div className="relative mx-auto h-24 w-24">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-full w-full rounded-full bg-[#c6a43f]/10 border border-[#c6a43f]/30 flex items-center justify-center text-[#c6a43f]"
                        >
                          <CheckCircle2 className="h-12 w-12 animate-pulse" />
                        </motion.div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-[-8px] border border-dashed border-[#c6a43f]/20 rounded-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-3xl font-black tracking-tighter uppercase">
                          Application Logged
                        </h3>
                        <p className="text-gray-400 max-w-[280px] mx-auto text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                          Registry synchronization in progress. Redirecting...
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function BenefitItem({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4 items-start group text-left">
      <div className="h-10 w-10 shrink-0 rounded-xl bg-[#1e3a5f]/10 border border-black/5 flex items-center justify-center text-[#1e3a5f] group-hover:bg-[#1e3a5f]/20 group-hover:border-[#1e3a5f]/20 transition-all duration-300">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-0.5">
        <h4 className="font-bold text-xs tracking-wide uppercase">{title}</h4>
        <p className="text-gray-400 text-[10px] leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}
