"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  FileText, 
  UserCheck, 
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
    title: "Founder Interview",
    description: "A brief sync to understand the long-term vision and 'intent' behind the build.",
    icon: UserCheck,
  },
  {
    title: "Registry Seal",
    description: "Once verified, the startup receives the Upforge Seal and a permanent ledger entry.",
    icon: ShieldCheck,
  }
]

export default function VerificationPage() {
  return (
    <div className="bg-[#F8F8F6] min-h-screen text-zinc-900 antialiased">
      
      {/* ================= HERO SECTION ================= */}
      <section className="pt-44 pb-32 px-6 border-b border-zinc-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 shadow-sm mb-8"
          >
            <ShieldCheck className="h-4 w-4 text-indigo-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">The Gold Standard</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1]">
            Verified for 
            <span className="block font-semibold">Long-term Trust.</span>
          </h1>
          
          <p className="mt-10 text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Upforge Verification is not a vanity badge. It is a signal to investors, 
            talent, and partners that your company is built on a foundation of 
            legitimacy and serious intent.
          </p>
        </div>
      </section>

      {/* ================= PROCESS STEPS ================= */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="h-14 w-14 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center mb-8 shadow-sm group-hover:border-indigo-500 transition-colors">
                <step.icon className="h-6 w-6 text-zinc-600" />
              </div>
              <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.3em] mb-3">Step 0{index + 1}</div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
              
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-20 w-full h-[1px] bg-zinc-200 -z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ELIGIBILITY CRITERIA ================= */}
      <section className="py-32 px-6 bg-white border-y border-zinc-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-light mb-8">Who can get <span className="font-semibold">Verified?</span></h2>
            <p className="text-zinc-600 mb-10 leading-relaxed">
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
                  <span className="text-zinc-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-[#F8F8F6] rounded-[3rem] border border-zinc-200 flex items-center justify-center p-12 overflow-hidden">
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
               >
                 <ShieldCheck className="w-full h-full" />
               </motion.div>
               <div className="relative z-10 text-center">
                 <Lock className="h-12 w-12 mx-auto text-zinc-300 mb-6" />
                 <h4 className="text-2xl font-bold mb-2">Secure Ledger</h4>
                 <p className="text-zinc-500 text-sm">Every verified record is cryptographically time-stamped on our private registry.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-36 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-light mb-12">Ready to join the <span className="font-semibold underline decoration-indigo-500 underline-offset-8">Registry?</span></h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/apply">
              <Button className="h-14 px-12 rounded-full bg-black hover:bg-zinc-800 text-white text-xs uppercase tracking-[0.2em] w-full sm:w-auto">
                Start Verification
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="h-14 px-12 rounded-full border-zinc-300 text-zinc-700 hover:bg-zinc-100 text-xs uppercase tracking-[0.2em] w-full sm:w-auto">
                Talk to an Analyst
              </Button>
            </Link>
          </div>
          <p className="mt-10 text-xs text-zinc-400 uppercase tracking-widest">
            Typical review time: 4-7 business days.
          </p>
        </div>
      </section>

    </div>
  )
}
