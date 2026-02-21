"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  FileText, 
  Database,
  ArrowRight,
  Lock
} from "lucide-react"
import Link from "next/link"

const steps = [
  {
    title: "Submission",
    description: "Founders submit their startup details, traction metrics, and proof of incorporation.",
    icon: FileText,
  },
  {
    title: "Manual Review",
    description: "Our analysts verify the data against public records and private databases.",
    icon: Search,
  },
  {
    title: "Data Validation",
    description: "Cross-referencing founder profiles and business credentials across multiple sources.",
    icon: Database,
  },
  {
    title: "Registry Seal",
    description: "Once verified, the startup receives the Upforge Seal and a permanent ledger entry.",
    icon: ShieldCheck,
  }
]

export default function VerificationPage() {
  return (
    <div className="relative bg-[#fbf9f6] min-h-screen text-[#1e1b1b] antialiased">
      {/* Subtle diagonal pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 8px)`,
        }}
      />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-44 pb-32 px-6 border-b border-[#1e3a5f]/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#1e3a5f]/10 shadow-sm mb-8"
          >
            <ShieldCheck className="h-4 w-4 text-[#c6a43f]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e3a5f]">The Gold Standard</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1]">
            Verified for 
            <span className="block font-semibold text-[#1e3a5f]">Long-term Trust.</span>
          </h1>
          
          <p className="mt-10 text-lg text-[#4a4a4a] max-w-2xl mx-auto leading-relaxed">
            Upforge Verification is not a vanity badge. It is a signal to investors, 
            talent, and partners that your company is built on a foundation of 
            legitimacy and serious intent.
          </p>
        </div>
      </section>

      {/* ================= PROCESS STEPS ================= */}
      <section className="relative py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="h-14 w-14 rounded-2xl bg-white border border-[#1e3a5f]/10 flex items-center justify-center mb-8 shadow-sm group-hover:border-[#c6a43f]/50 transition-colors">
                <step.icon className="h-6 w-6 text-[#1e3a5f] group-hover:text-[#c6a43f] transition-colors" />
              </div>
              <div className="text-[10px] font-bold text-[#c6a43f] uppercase tracking-[0.3em] mb-3">Step 0{index + 1}</div>
              <h3 className="text-xl font-bold mb-4 text-[#1e1b1b]">{step.title}</h3>
              <p className="text-[#4a4a4a] text-sm leading-relaxed">{step.description}</p>
              
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-20 w-full h-[1px] bg-[#1e3a5f]/10 -z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ELIGIBILITY CRITERIA ================= */}
      <section className="relative py-32 px-6 bg-white border-y border-[#1e3a5f]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-light mb-8 text-[#1e1b1b]">Who can get <span className="font-semibold text-[#1e3a5f]">Verified?</span></h2>
            <p className="text-[#4a4a4a] mb-10 leading-relaxed">
              We maintain a high bar to ensure the Upforge Seal remains prestigious. 
              Our criteria focus on transparency and traction rather than hype.
            </p>
            
            <div className="space-y-6">
              {[
                "Registered entity in India (Private Limited or LLP)",
                "Minimum 6 months of active operations",
                "Verifiable founder profiles (LinkedIn/GitHub/X)",
                "Transparent business model and clear value prop"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 h-5 w-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  </div>
                  <span className="text-[#1e1b1b] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-[#fbf9f6] rounded-[3rem] border border-[#1e3a5f]/10 flex items-center justify-center p-12 overflow-hidden">
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
               >
                 <ShieldCheck className="w-full h-full" />
               </motion.div>
               <div className="relative z-10 text-center">
                 <Lock className="h-12 w-12 mx-auto text-[#c6a43f] mb-6" />
                 <h4 className="text-2xl font-bold mb-2 text-[#1e1b1b]">Secure Ledger</h4>
                 <p className="text-[#4a4a4a] text-sm">Every verified record is cryptographically time-stamped on our private registry.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-36 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-light mb-12 text-[#1e1b1b]">Ready to join the <span className="font-semibold text-[#1e3a5f] underline decoration-[#c6a43f] underline-offset-8">Registry?</span></h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/apply">
              <Button className="h-14 px-12 rounded-full bg-[#1e3a5f] hover:bg-[#14304a] text-white text-xs uppercase tracking-[0.2em] w-full sm:w-auto shadow-lg shadow-[#1e3a5f]/20">
                Start Verification
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="h-14 px-12 rounded-full border-[#1e3a5f]/30 text-[#1e3a5f] hover:bg-[#1e3a5f]/5 text-xs uppercase tracking-[0.2em] w-full sm:w-auto">
                Talk to an Analyst
              </Button>
            </Link>
          </div>
          <p className="mt-10 text-xs text-[#4a4a4a] uppercase tracking-widest">
            Typical review time: 4-7 business days.
          </p>
        </div>
      </section>

    </div>
  )
}
