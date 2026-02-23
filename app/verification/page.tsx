// app/verification/page.tsx
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
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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
    <div className="relative bg-white text-black min-h-screen">
      <Navbar />
      <main className="relative pt-20">
        {/* Hero */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-10 bg-black/20 hidden sm:block"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                THE GOLD STANDARD
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-6">
              Verified for <br />
              <span className="text-gray-500 italic font-medium">Long-term Trust.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Upforge Verification is not a vanity badge. It is a signal to investors,
              talent, and partners that your company is built on a foundation of
              legitimacy and serious intent.
            </p>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="h-14 w-14 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center mb-6 group-hover:bg-[#c6a43f]/10 group-hover:text-[#c6a43f] transition-colors">
                    <step.icon className="h-6 w-6 text-[#1e3a5f] group-hover:text-[#c6a43f]" />
                  </div>
                  <div className="text-[10px] font-bold text-[#c6a43f] uppercase tracking-[0.3em] mb-3">
                    Step 0{index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Eligibility Criteria */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tighter mb-6">
                Who can get{" "}
                <span className="text-gray-500 italic font-medium">Verified?</span>
              </h2>
              <p className="text-gray-400 mb-10 leading-relaxed">
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
                    <div className="mt-1 h-5 w-5 rounded-full bg-[#c6a43f]/10 border border-[#c6a43f]/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-3 w-3 text-[#c6a43f]" />
                    </div>
                    <span className="text-black font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-black/5 rounded-2xl shadow-sm p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="relative mx-auto mb-6">
                  <div className="absolute inset-0 bg-[#c6a43f]/10 rounded-full blur-2xl" />
                  <Lock className="h-16 w-16 text-[#c6a43f] relative z-10" />
                </div>
                <h4 className="text-2xl font-bold mb-2">Secure Ledger</h4>
                <p className="text-gray-400 text-sm max-w-xs mx-auto">
                  Every verified record is cryptographically time-stamped on our private registry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tighter mb-8">
              Ready to join the{" "}
              <span className="text-gray-500 italic font-medium underline decoration-[#c6a43f] underline-offset-8">
                Registry?
              </span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/apply">
                <Button className="h-14 px-12 rounded-full bg-[#1e3a5f] hover:bg-[#14304a] text-white text-xs uppercase tracking-[0.2em] shadow-lg w-full sm:w-auto">
                  Start Verification
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="h-14 px-12 rounded-full border-black/10 text-black hover:bg-black/5 text-xs uppercase tracking-[0.2em] w-full sm:w-auto"
                >
                  Talk to an Analyst
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-xs text-gray-400 uppercase tracking-widest">
              Typical review time: 4-7 business days.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
