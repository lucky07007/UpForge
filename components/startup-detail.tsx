"use client"

import React, { useRef, useState } from 'react'
import { Startup } from "@/types/startup"
import { Share2, Globe, Linkedin, ArrowLeft, ShieldCheck, CheckCircle, ExternalLink, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toBlob } from 'html-to-image'
import saveAs from 'file-saver'
import { motion } from "framer-motion"
import Link from "next/link"

export function StartupDetail({ startup }: { startup: Startup }) {
  const posterRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleShare = async () => {
    if (!posterRef.current) return
    setIsGenerating(true)
    try {
      const blob = await toBlob(posterRef.current, { 
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 2 
      })
      if (!blob) return
      const file = new File([blob], `${startup.name}-UpForge.png`, { type: 'image/png' })
      
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${startup.name} | UpForge Network`,
          text: `Proud to be a verified member of the UpForge Founder Network!`,
        })
      } else {
        saveAs(blob, `${startup.name}-UpForge-Certificate.png`)
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
    const blob = await toBlob(posterRef.current, { backgroundColor: '#ffffff', pixelRatio: 3 })
    if (blob) saveAs(blob, `${startup.name}-Official-Certificate.png`)
    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      
      {/* --- PREMIUM POSTER TEMPLATE (Optimized for No-Cut) --- */}
      <div className="fixed left-[-9999px] top-0">
        <div ref={posterRef} className="w-[1080px] h-[1350px] bg-white p-20 flex flex-col justify-between border-[1px] border-slate-200 text-slate-900 relative overflow-hidden">
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="flex justify-between items-start relative z-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-[2px] w-8 bg-primary" />
                        <span className="text-sm font-black uppercase tracking-[0.4em] text-primary">Official Network Recognition</span>
                    </div>
                    {/* Text sizes reduced to prevent cutting */}
                    <h1 className="text-7xl font-black tracking-tighter leading-tight text-slate-900 uppercase">{startup.name}</h1>
                    <p className="text-2xl text-slate-500 font-bold uppercase tracking-widest">{startup.category} • FOUNDED {startup.founded_year}</p>
                </div>
                <img src="/logo.jpg" className="h-24 w-24 rounded-2xl border border-slate-100 shadow-sm" />
            </div>

            <div className="relative z-10 py-10">
                <p className="text-3xl leading-[1.5] font-semibold text-slate-700 max-w-[850px]">
                   This document confirms that <span className="text-primary">{startup.name}</span> is a verified member of the UpForge Founder Ecosystem, meeting the institutional standards of innovation and leadership in the Indian startup landscape.
                </p>
            </div>

            <div className="flex justify-between items-end border-t border-slate-100 pt-12 relative z-10">
                <div className="space-y-1">
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-[0.3em]">Institutional Verification</p>
                    <p className="text-3xl font-black tracking-tighter text-slate-900">UPFORGE.IN</p>
                    <p className="text-xs text-slate-300 font-medium tracking-widest uppercase">Member ID: UF-{startup.id?.substring(0,8) || 'VERIFIED'}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-4">
                  <img src="/seal.jpg" className="h-44 w-auto object-contain" />
                  <p className="text-[10px] font-black text-slate-300 tracking-[0.2em] uppercase">Valid Institutional Seal</p>
                </div>
            </div>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-5xl px-6 h-20 flex items-center justify-between">
          <Link href="/#startups" className="group flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 hover:text-primary transition-all">
            <ArrowLeft className="h-3 w-3" /> BACK TO NETWORK
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload} disabled={isGenerating} className="rounded-full text-[10px] font-black tracking-widest border-slate-200">
              {isGenerating ? "..." : "DOWNLOAD"}
            </Button>
            <Button size="sm" onClick={handleShare} disabled={isGenerating} className="rounded-full px-6 text-[10px] font-black tracking-widest shadow-lg shadow-primary/10">
              <Share2 className="mr-2 h-3 w-3" /> {isGenerating ? "GENERATING..." : "SHARE POSTER"}
            </Button>
          </div>
        </div>
      </nav>

      {/* --- CONTENT --- */}
      <main className="mx-auto max-w-4xl px-6 pt-20 pb-32 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <div className="mx-auto mb-10 h-28 w-28 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shadow-sm">
              {startup.logo_url ? <img src={startup.logo_url} className="h-full w-full object-contain p-5" /> : <span className="text-4xl font-black text-primary">{startup.name[0]}</span>}
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 mb-6">
            <Award className="h-3.5 w-3.5 text-primary" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Institutional Network Member</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900 uppercase">
            {startup.name}
          </h1>

          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto mb-16 font-medium">
            {startup.description}
          </p>

          {/* SEAL - CENTERED & PREMIUM */}
          <div className="flex flex-col items-center gap-4 mb-20">
            <div className="h-[1px] w-16 bg-slate-100" />
            <img src="/seal.jpg" alt="Seal" className="h-36 w-auto grayscale hover:grayscale-0 transition-all duration-500" />
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">Certified by UpForge Network</p>
              <p className="text-[8px] font-medium text-slate-200 uppercase">Verification Level: Institutional</p>
            </div>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Industry", value: startup.category },
              { label: "Established", value: startup.founded_year },
              { label: "Jurisdiction", value: "India" },
              { label: "Verification", value: "Member" }
            ].map((item, i) => (
              <div key={i} className="py-6 px-2 rounded-2xl border border-slate-50 bg-slate-50/30">
                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</p>
                <p className="text-sm font-bold text-slate-800">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center gap-8 border-t border-slate-50 pt-10">
             <Link href="#" className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-primary transition-colors tracking-widest">
                <Globe className="h-3.5 w-3.5" /> WEBSITE
             </Link>
             <Link href="#" className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-primary transition-colors tracking-widest">
                <Linkedin className="h-3.5 w-3.5" /> LINKEDIN
             </Link>
          </div>

        </motion.div>
      </main>
    </div>
  )
}
