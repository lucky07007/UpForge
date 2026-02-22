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
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Custom CSS animations (shared with homepage)
const style = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.6; filter: blur(20px); }
    50% { opacity: 1; filter: blur(25px); }
  }
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  .animate-pulse-glow {
    animation: pulse-glow 4s ease-in-out infinite;
  }
`;

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
    <>
      <style>{style}</style>
      <div className="min-h-screen bg-[#0a0c0e] flex flex-col md:flex-row relative overflow-hidden font-sans">
        {/* Dynamic gradient orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-40 w-96 h-96 bg-[#1e3a5f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-[#c6a43f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#1e3a5f]/30 to-[#c6a43f]/30 rounded-full blur-3xl animate-pulse-glow"></div>
        </div>

        {/* Subtle grid overlay */}
        <div
          className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h60v60H0z" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/%3E%3C/svg%3E')] pointer-events-none`}
        ></div>

        {/* Background glow accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#c6a43f]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#1e3a5f]/5 rounded-full blur-[120px]" />
        </div>

        {/* Left Panel: Context & Trust */}
        <div className="relative w-full md:w-[35%] p-8 md:p-12 flex flex-col justify-between bg-black/40 backdrop-blur-xl border-r border-white/10 shadow-2xl z-10">
          <Link
            href="/"
            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all mb-8 w-fit"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[9px] font-black uppercase tracking-widest">Return Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6a43f]/10 border border-[#c6a43f]/20">
              <Sparkles className="h-3 w-3 text-[#c6a43f]" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#c6a43f]">
                Vault Registry
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] uppercase">
              Join the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c6a43f] to-[#e5c87b]">
                Registry.
              </span>
            </h1>

            <div className="space-y-6 pt-4">
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
          </motion.div>

          <div className="pt-12 mt-8 border-t border-white/10 flex items-center gap-4">
            <div className="relative h-12 w-12 opacity-50">
              <Image src="/seal.jpg" alt="Institutional Seal" fill className="object-contain" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[8px] uppercase tracking-[0.4em] text-gray-400 font-black">
                Identity Ledger v2.4
              </p>
              <p className="text-[7px] text-gray-500 font-bold font-mono">
                HASH_AUTH: 0xFD91...883
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel: Premium Form */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
                className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl"
              >
                <div className="mb-8 space-y-1">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Founder Submission</h2>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
                    Secure Form
                  </p>
                </div>

                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="from_name"
                      placeholder="Founder Name"
                      required
                      className="h-12 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-[#c6a43f]/50 focus:ring-1 focus:ring-[#c6a43f]/20 rounded-xl transition-all text-sm shadow-sm"
                    />
                    <Input
                      name="business_name"
                      placeholder="Startup Name"
                      required
                      className="h-12 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-[#c6a43f]/50 focus:ring-1 focus:ring-[#c6a43f]/20 rounded-xl transition-all text-sm shadow-sm"
                    />
                  </div>
                  <Input
                    name="reply_to"
                    type="email"
                    placeholder="Professional Email"
                    required
                    className="h-12 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-[#c6a43f]/50 focus:ring-1 focus:ring-[#c6a43f]/20 rounded-xl transition-all text-sm shadow-sm"
                  />
                  <Input
                    name="website"
                    type="url"
                    placeholder="Startup Website (https://...)"
                    required
                    className="h-12 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-[#c6a43f]/50 focus:ring-1 focus:ring-[#c6a43f]/20 rounded-xl transition-all text-sm shadow-sm"
                  />
                  <Textarea
                    name="message"
                    placeholder="Tell us about the problem you are solving..."
                    required
                    className="min-h-[120px] bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-[#c6a43f]/50 focus:ring-1 focus:ring-[#c6a43f]/20 rounded-xl resize-none p-4 text-sm shadow-sm"
                  />

                  <Button
                    disabled={isLoading}
                    className="w-full h-14 bg-[#c6a43f] hover:bg-[#b08c2e] text-black rounded-xl uppercase text-[10px] font-black tracking-[0.3em] transition-all shadow-lg shadow-[#c6a43f]/20 mt-2 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isLoading ? (
                        <Loader2 className="animate-spin h-4 w-4" />
                      ) : (
                        <>
                          Submit for Verification{" "}
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
                className="text-center space-y-6"
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
                  <h3 className="text-3xl font-black text-white tracking-tighter uppercase">
                    Application Logged
                  </h3>
                  <p className="text-gray-400 max-w-[280px] mx-auto text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    Registry synchronization in progress. Redirecting...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

function BenefitItem({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4 items-start group">
      <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#c6a43f] group-hover:bg-[#c6a43f]/10 group-hover:border-[#c6a43f]/30 transition-all duration-300">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-0.5">
        <h4 className="text-white font-bold text-xs tracking-wide uppercase">{title}</h4>
        <p className="text-gray-400 text-[10px] leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}
