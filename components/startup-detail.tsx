"use client"

import React, { useRef, useState } from 'react'
import { Startup } from "@/types/startup"
import { Share2, Globe, Linkedin, ArrowLeft, ShieldCheck, Download, CheckCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toBlob } from 'html-to-image'
import saveAs from 'file-saver'
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function StartupDetail({ startup }: { startup: Startup }) {
  const posterRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Standard Web Share + Download Logic
  const handleShare = async () => {
    if (!posterRef.current) return
    setIsGenerating(true)
    
    try {
      const blob = await toBlob(posterRef.current, { 
        cacheBust: true,
        backgroundColor: '#000',
        pixelRatio: 2 // High Resolution
      })

      if (!blob) return

      const file = new File([blob], `${startup.name}-UpForge.png`, { type: 'image/png' })
      
      // Check if browser supports sharing files (Mobile/Modern Browsers)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${startup.name} on UpForge`,
          text: `Check out ${startup.name} on the UpForge Founder Network.`,
        })
      } else {
        // Fallback to direct download for desktops
        saveAs(blob, `${startup.name}-UpForge-Certified.png`)
      }
    } catch (err) {
      console.error("Share failed:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = async () => {
    if (!posterRef.current) return
    setIsGenerating(true)
    const blob = await toBlob(posterRef.current, { backgroundColor: '#000', pixelRatio: 3 })
    if (blob) saveAs(blob, `${startup.name}-Official-Poster.png`)
    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-white">
      
      {/* --- HIDDEN PREMIUM POSTER TEMPLATE (FOR GENERATION) --- */}
      <div className="fixed left-[-9999px] top-0">
        <div ref={posterRef} className="w-[1080px] h-[1350px] bg-black p-24 flex flex-col justify-between border-[30px] border-white/5 text-white">
            <div className="flex justify-between items-start">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-4 w-12 bg-primary rounded-full" />
                        <span className="text-xl font-black uppercase tracking-[0.5em] text-primary">Certified Listing</span>
                    </div>
                    <h1 className="text-[120px] font-black tracking-tighter leading-[0.8]">{startup.name}</h1>
                    <p className="text-4xl text-white/50 font-bold uppercase tracking-widest">{startup.category} • {startup.founded_year}</p>
                </div>
                <img src="/logo.jpg" className="h-32 w-32 rounded-3xl border border-white/10" />
            </div>

            <div className="relative">
                <div className="absolute -left-10 top-0 h-full w-1 bg-primary/30" />
                <p className="text-5xl leading-[1.3] font-medium text-slate-200 pl-4">{startup.description}</p>
            </div>

            <div className="flex justify-between items-end border-t border-white/10 pt-16">
                <div className="space-y-2">
                    <p className="text-xl text-white/30 uppercase tracking-[0.4em]">Verified Founder Network</p>
                    <p className="text-5xl font-black tracking-tighter">UPFORGE.IN</p>
                </div>
                <img src="/seal.jpg" className="h-56 w-auto object-contain brightness-110" />
            </div>
        </div>
      </div>

      {/* --- MAIN PAGE UI --- */}
      <nav className="border-b border-white/5 bg-black/40 backdrop-blur-2xl sticky top-0 z-50">
        <div className="mx-auto max-w-5xl px-6 h-20 flex items-center justify-between">
          <Link href="/#startups" className="group flex items-center gap-2 text-xs font-black tracking-widest text-white/40 hover:text-primary transition-all">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> BACK
          </Link>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={handleDownload} disabled={isGenerating} className="rounded-full text-xs font-black tracking-widest border border-white/5 hover:bg-white/5 uppercase">
              {isGenerating ? "..." : "Save to Gallery"}
            </Button>
            <Button onClick={handleShare} disabled={isGenerating} className="rounded-full px-8 text-xs font-black tracking-widest shadow-2xl shadow-primary/20 uppercase">
              <Share2 className="mr-2 h-4 w-4" /> {isGenerating ? "Generating..." : "Share Now"}
            </Button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 pt-24 pb-40 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          
          {/* Logo Section */}
          <div className="mx-auto mb-12 h-32 w-32 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent p-[1px]">
            <div className="h-full w-full rounded-[2.5rem] bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
                {startup.logo_url ? <img src={startup.logo_url} className="h-full w-full object-contain p-6" /> : <span className="text-5xl font-black">{startup.name[0]}</span>}
            </div>
          </div>

          {/* Title & Status */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Verified Institutional Member</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            {startup.name}
          </h1>

          <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-3xl mx-auto mb-16 font-medium">
            {startup.description}
          </p>

          {/* Seal - Perfectly Centered */}
          <div className="flex flex-col items-center gap-6 mb-24">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <img src="/seal.jpg" alt="UpForge Seal" className="h-40 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-none" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Official Network Branding</p>
          </div>

          {/* Detailed Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {[
              { label: "Category", value: startup.category },
              { label: "Founded", value: startup.founded_year },
              { label: "Region", value: "India" },
              { label: "Status", value: "Active" }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
                <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-2">{item.label}</p>
                <p className="text-lg font-bold">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Action Links */}
          <div className="mt-12 flex justify-center gap-6">
             <Link href="#" className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-white transition-colors">
                <Globe className="h-4 w-4" /> WEBSITE <ExternalLink className="h-3 w-3 opacity-30" />
             </Link>
             <Link href="#" className="flex items-center gap-2 text-sm font-bold text-white/40 hover:text-white transition-colors">
                <Linkedin className="h-4 w-4" /> LINKEDIN <ExternalLink className="h-3 w-3 opacity-30" />
             </Link>
          </div>

        </motion.div>
      </main>
    </div>
  )
}
