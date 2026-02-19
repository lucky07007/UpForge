"use client"

import React, { useRef, useState } from 'react'
import { Startup } from "@/types/startup"
import { Share2, Globe, ArrowLeft, Download, CheckCircle2, ExternalLink, ShieldCheck, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toBlob } from 'html-to-image'
import saveAs from 'file-saver'
import { motion } from "framer-motion"
import Link from "next/link"

export function StartupDetail({ startup }: { startup: Startup }) {
  const posterRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // 1. Website Link Fix: Ensuring absolute URLs
  const getCleanUrl = (url: string | undefined) => {
    if (!url) return "#"
    const trimmedUrl = url.trim()
    if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
      return trimmedUrl
    }
    return `https://${trimmedUrl}`
  }

  const handleAction = async (type: 'share' | 'download') => {
    if (!posterRef.current) return
    setIsGenerating(true)
    try {
      const blob = await toBlob(posterRef.current, { 
        cacheBust: true,
        backgroundColor: '#0f172a', // Dark premium background for poster
        pixelRatio: 3 // Ultra-high resolution
      })
      if (!blob) return
      
      if (type === 'download') {
        saveAs(blob, `${startup.name}-Recognition.png`)
      } else {
        const file = new File([blob], `${startup.name}-Featured.png`, { type: 'image/png' })
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ 
            files: [file], 
            title: `Featured: ${startup.name}`, 
            text: `We are excited to share that ${startup.name} is now officially featured on UpForge!` 
          })
        } else {
          saveAs(blob, `${startup.name}-Featured.png`)
        }
      }
    } catch (err) {
      console.error("Action failed:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900">
      
      {/* --- PREMIUM POSTER TEMPLATE (Social Media Ready) --- */}
      <div className="fixed left-[-9999px] top-0">
        <div 
          ref={posterRef} 
          className="w-[1000px] h-[1000px] bg-[#0f172a] p-20 flex flex-col justify-between relative overflow-hidden text-white font-sans"
        >
          {/* Decorative Gradients for Premium Feel */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
          
          <div className="z-10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg">
                <img src="/logo.jpg" className="h-10 w-10 object-contain" alt="UpForge" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">UpForge</span>
            </div>
            <div className="px-5 py-2 border border-white/20 bg-white/5 backdrop-blur-md rounded-full text-xs font-bold tracking-[0.2em] text-blue-400">
              OFFICIAL FEATURE
            </div>
          </div>

          <div className="z-10 text-center space-y-8">
             <div className="relative inline-block">
                <div className="h-40 w-40 mx-auto rounded-[2.5rem] bg-white p-4 shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white/10">
                  {startup.logo_url ? (
                    <img src={startup.logo_url} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-6xl font-black text-slate-900">{startup.name?.[0]}</span>
                  )}
                </div>
                <div className="absolute -bottom-4 -right-4 bg-blue-600 p-3 rounded-full border-4 border-[#0f172a]">
                  <Award className="h-6 w-6 text-white" />
                </div>
             </div>

             <div className="space-y-4">
               <h1 className="text-7xl font-black tracking-tighter uppercase leading-none italic">
                 {startup.name}
               </h1>
               <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full" />
               <p className="text-2xl text-slate-400 font-medium max-w-2xl mx-auto line-clamp-2">
                 {startup.description}
               </p>
             </div>
          </div>

          <div className="z-10 grid grid-cols-3 gap-8 border-t border-white/10 pt-12 items-end">
            <div>
              <p className="text-[10px] font-black uppercase text-blue-500 tracking-widest mb-1">Category</p>
              <p className="text-xl font-bold">{startup.category || 'Startup'}</p>
            </div>
            <div className="flex justify-center">
               <img src="/seal.jpg" className="h-32 w-auto opacity-90 brightness-110" alt="Verified Seal" />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase text-blue-500 tracking-widest mb-1">Status</p>
              <p className="text-xl font-bold italic underline decoration-blue-500">Verified Member</p>
            </div>
          </div>
          
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-[10px] font-bold text-white/30 tracking-[0.5em] uppercase">Verified at www.upforge.in</p>
          </div>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/#startups" className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 hover:text-primary transition-all">
            <ArrowLeft className="h-4 w-4" /> BACK TO LIST
          </Link>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => handleAction('download')} disabled={isGenerating} className="rounded-full text-[10px] font-black tracking-widest">
              <Download className="mr-2 h-3.5 w-3.5" /> {isGenerating ? "GENERATING..." : "DOWNLOAD POSTER"}
            </Button>
            <Button size="sm" onClick={() => handleAction('share')} disabled={isGenerating} className="rounded-full px-6 text-[10px] font-black tracking-widest bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100">
              <Share2 className="mr-2 h-3.5 w-3.5" /> {isGenerating ? "..." : "SHARE"}
            </Button>
          </div>
        </div>
      </nav>

      {/* --- CONTENT --- */}
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Main Info */}
          <div className="lg:col-span-8 space-y-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="h-24 w-24 rounded-[2rem] bg-white border border-slate-100 flex items-center justify-center overflow-hidden mb-8 shadow-xl shadow-slate-100">
                  {startup.logo_url ? <img src={startup.logo_url} className="h-full w-full object-contain p-4" alt={startup.name} /> : <span className="text-4xl font-black text-blue-600">{startup.name?.[0]}</span>}
              </div>
              
              <div className="flex items-center gap-2 text-blue-600 mb-6 bg-blue-50 w-fit px-4 py-1.5 rounded-full">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Verified Institutional Listing</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 uppercase leading-[0.85] mb-8">
                {startup.name}
              </h1>

              <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium max-w-3xl mb-12">
                {startup.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <a 
                  href={getCleanUrl(startup.website_url)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 group"
                >
                  VISIT OFFICIAL WEBSITE <ExternalLink className="h-4 w-4 opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Verification Footer */}
            <div className="pt-20 mt-20 border-t border-slate-100 flex flex-wrap items-center gap-10">
                <img src="/seal.jpg" alt="Seal" className="h-36 w-auto grayscale hover:grayscale-0 transition-all" />
                <div className="space-y-2">
                    <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300">Digital Authentication</p>
                    <p className="text-sm font-bold text-slate-500 uppercase leading-relaxed">
                      UpForge Network Verified Member<br/>
                      <span className="text-blue-600">Reference: UPF-{startup.id?.toString().substring(0,8).toUpperCase() || '2026'}</span>
                    </p>
                </div>
            </div>
          </div>

          {/* Right Side: Metadata Cards */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50/50 border border-slate-100 p-10 rounded-[3rem] space-y-10">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-200 pb-4">Startup Metadata</h3>
                <div className="grid grid-cols-1 gap-8">
                    {[
                        { label: "Industry Sector", value: startup.category },
                        { label: "Founded Year", value: startup.founded_year || '2026' },
                        { label: "Network Status", value: "Verified Active" },
                        { label: "Origin", value: "India" }
                    ].map((item, i) => (
                        <div key={i} className="group">
                            <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-1.5">{item.label}</p>
                            <p className="text-xl font-bold text-slate-800">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="p-10 rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center text-center gap-6 bg-white">
                <div className="bg-slate-50 p-4 rounded-full">
                  <ShieldCheck className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase leading-loose tracking-wide">
                  This profile is cryptographically secured & verified by the UpForge Institutional Board. Any unauthorized reproduction is prohibited.
                </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
