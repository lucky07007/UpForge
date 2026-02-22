"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  Search,
  FileText,
  Database,
  ArrowRight,
  Lock,
  Sparkles,
} from "lucide-react";
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
  .shimmer {
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255,255,255,0.1) 50%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

const steps = [
  {
    title: "Submission",
    description:
      "Founders submit their startup details, traction metrics, and proof of incorporation.",
    icon: FileText,
  },
  {
    title: "Manual Review",
    description:
      "Our analysts verify the data against public records and private databases.",
    icon: Search,
  },
  {
    title: "Data Validation",
    description:
      "Cross-referencing founder profiles and business credentials across multiple sources.",
    icon: Database,
  },
  {
    title: "Registry Seal",
    description:
      "Once verified, the startup receives the Upforge Seal and a permanent ledger entry.",
    icon: ShieldCheck,
  },
];

export default function VerificationPage() {
  return (
    <>
      <style>{style}</style>
      <div className="relative bg-[#0a0c0e] min-h-screen text-white antialiased overflow-hidden">
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

        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-44 pb-32 px-6 border-b border-white/10 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 shadow-xl"
            >
              <Sparkles className="h-4 w-4 text-[#c6a43f]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                The Gold Standard
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#c6a43f]">
                Verified for
              </span>
              <span className="block mt-2 relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c6a43f] via-[#1e3a5f] to-[#c6a43f] [text-shadow:_0_0_30px_rgba(198,164,63,0.5)]">
                  Long-term Trust.
                </span>
                <span className="absolute -inset-1 bg-gradient-to-r from-[#c6a43f]/30 to-[#1e3a5f]/30 blur-2xl -z-10"></span>
              </span>
            </h1>

            <p className="mt-10 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Upforge Verification is not a vanity badge. It is a signal to investors,
              talent, and partners that your company is built on a foundation of
              legitimacy and serious intent.
            </p>
          </div>
        </section>

        {/* ================= PROCESS STEPS ================= */}
        <section className="relative py-32 px-6 max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full hover:border-[#c6a43f]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#c6a43f]/10">
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 shimmer pointer-events-none"></div>
                  <div className="relative">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <step.icon className="h-6 w-6 text-[#c6a43f]" />
                    </div>
                    <div className="text-[10px] font-bold text-[#c6a43f] uppercase tracking-[0.3em] mb-3">
                      Step 0{index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {index !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[1px] bg-gradient-to-r from-[#c6a43f]/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= ELIGIBILITY CRITERIA ================= */}
        <section className="relative py-32 px-6 bg-black/40 backdrop-blur-sm border-y border-white/10 z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-8 text-white">
                Who can get{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c6a43f] to-[#e5c87b]">
                  Verified?
                </span>
              </h2>
              <p className="text-gray-300 mb-10 leading-relaxed">
                We maintain a high bar to ensure the Upforge Seal remains prestigious.
                Our criteria focus on transparency and traction rather than hype.
              </p>

              <div className="space-y-6">
                {[
                  "Registered entity in India (Private Limited or LLP)",
                  "Minimum 6 months of active operations",
                  "Verifiable founder profiles (LinkedIn/GitHub/X)",
                  "Transparent business model and clear value prop",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    </div>
                    <span className="text-white font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-white/5 backdrop-blur-sm border border-white/10 rounded-[3rem] flex items-center justify-center p-12 overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                >
                  <ShieldCheck className="w-full h-full text-white" />
                </motion.div>
                <div className="relative z-10 text-center">
                  <Lock className="h-12 w-12 mx-auto text-[#c6a43f] mb-6" />
                  <h4 className="text-2xl font-bold mb-2 text-white">Secure Ledger</h4>
                  <p className="text-gray-300 text-sm">
                    Every verified record is cryptographically time-stamped on our private registry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="relative py-36 px-6 text-center z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light mb-12 text-white">
              Ready to join the{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c6a43f] to-[#e5c87b] underline decoration-[#c6a43f] underline-offset-8">
                Registry?
              </span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/apply">
                <Button className="group relative h-14 px-12 rounded-full bg-[#c6a43f] hover:bg-[#b08c2e] text-black text-xs uppercase tracking-[0.2em] font-bold w-full sm:w-auto shadow-lg shadow-[#c6a43f]/20 overflow-hidden">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  Start Verification
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="h-14 px-12 rounded-full border-white/20 text-white hover:bg-white/10 text-xs uppercase tracking-[0.2em] w-full sm:w-auto"
                >
                  Talk to an Analyst
                </Button>
              </Link>
            </div>
            <p className="mt-10 text-xs text-gray-400 uppercase tracking-widest">
              Typical review time: 4-7 business days.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
