"use client"

import React, { useRef, useState } from 'react'
import { ShieldCheck, Sparkles, CheckCircle2, Loader2, Globe, Rocket, Zap, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ApplyPage() {
  const form = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await emailjs.sendForm(
        "service_hez7mw9",
        "template_htai0ev",
        form.current!,
        "qsf9Wt-yXfBKQ7CD7"
      )
      setIsSubmitted(true)
      setTimeout(() => router.push("/"), 3000)
    } catch (error) {
      console.error("Submission failed", error)
      setIsSubmitted(true) 
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyles = "h-14 bg-white/[0.03] border-white/10 text-white placeholder:text-zinc-600 focus:border-indigo-500/50 focus:ring-indigo-500/10 rounded-2xl transition-all text-base shadow-inner"

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col md:flex-row relative overflow-hidden font-sans">
      {/* Background Aesthetic Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")' }} />
      </div>

      {/* Left Panel: The Trust Section */}
      <div className="relative w-full md:w-[40%] p-8 md:p-16 flex flex-col justify-between border-r border-white/5 bg-black/40 backdrop-blur-3xl z-10">
        <Link href="/" className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 w-fit">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Back to Hub</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Institutional Ledger</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
            FORGE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-purple-400">YOUR RISE.</span>
          </h1>

          <div className="space-y-8 pt-6">
            <BenefitItem icon={ShieldCheck} title="Identity Verified" desc="Establish ultimate trust with our cryptographic founder badge." />
            <BenefitItem icon={Globe} title="Global Exposure" desc="Get your startup indexed in India's elite independent directory." />
            <BenefitItem icon={Rocket} title="Scale Priority" desc="Unlock direct-access channels to curated investor networks." />
          </div>
        </motion.div>

        <div className="pt-16 border-t border-white/5 mt-12 flex items-center gap-6">
          <div className="relative h-16 w-16 opacity-20 hover:opacity-40 transition-opacity cursor-help">
            <Image src="/seal.jpg" alt="Official Seal" fill className="object-contain filter grayscale invert" />
          </div>
          <div className="space-y-1">
            <p className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-black">Verification Protocol v2.4</p>
            <p className="text-[8px] text-zinc-600 font-medium">Digital Signature: UPF_0x8392_SECURE</p>
          </div>
        </div>
      </div>

      {/* Right Panel: The Premium Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
              className="w-full max-w-xl bg-white/[0.02] border border-white/10 p-10 md:p-14 rounded-[3rem] backdrop-blur-2xl shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)]"
            >
              <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-bold text-white tracking-tight">Founder Registry</h2>
                <p className="text-zinc-500 text-sm mt-2 font-medium">Please provide accurate data for the verification process.</p>
              </div>

              <form ref={form} onSubmit={sendEmail} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input name="from_name" placeholder="Founder Name" required className={inputStyles} />
                  <Input name="business_name" placeholder="Startup Name" required className={inputStyles} />
                </div>
                <Input name="reply_to" type="email" placeholder="Professional Email" required className={inputStyles} />
                <Input name="website" type="url" placeholder="Startup Website (https://...)" required className={inputStyles} />
                <Textarea 
                  name="message" 
                  placeholder="Tell us about the problem you are solving..." 
                  required 
                  className="min-h-[140px] bg-white/[0.03] border-white/10 text-white rounded-[20px] focus:border-indigo-500/50 focus:ring-indigo-500/10 resize-none p-5 text-base shadow-inner placeholder:text-zinc-600" 
                />
                
                <Button 
                  disabled={isLoading}
                  className="w-full h-16 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl uppercase text-xs font-black tracking-[0.3em] transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98] mt-4 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                      <>Initialize Verification <Zap className="h-4 w-4 fill-indigo-200 group-hover:animate-bounce" /></>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8"
            >
              <div className="relative mx-auto h-32 w-32">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ type: "spring", damping: 12 }}
                  className="h-full w-full rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-[0_0_50px_rgba(99,102,241,0.2)]"
                >
                  <CheckCircle2 className="h-16 w-16" />
                </motion.div>
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-10px] border-2 border-dashed border-indigo-500/20 rounded-full"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Registry Updated</h3>
                <p className="text-zinc-400 max-w-sm mx-auto text-sm font-medium leading-relaxed">
                  Your credentials have been encrypted and submitted to our verification nodes. Redirecting to the hub...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function BenefitItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex gap-5 items-start group">
      <div className="h-12 w-12 shrink-0 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-all duration-300">
        <Icon className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <h4 className="text-white font-bold text-sm tracking-wide group-hover:text-indigo-300 transition-colors uppercase">{title}</h4>
        <p className="text-zinc-500 text-xs leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  )
}
