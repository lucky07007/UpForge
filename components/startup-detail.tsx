"use client"

import React, { useRef, useState } from 'react'
import { Startup } from "@/types/startup"
import { Share2, Globe, ArrowLeft, Download, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toBlob } from 'html-to-image'
import saveAs from 'file-saver'
import { motion } from "framer-motion"
import Link from "next/link"

export function StartupDetail({ startup }: { startup: Startup }) {
  const posterRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Website Link Fix
  const getCleanUrl = (url: string | undefined) => {
    if (!url) return "#"
    return url.startsWith('http') ? url : `https://${url}`
  }

  const handleAction = async (type: 'share' | 'download') => {
    if (!posterRef.current) return
    setIsGenerating(true)
    try {
      const blob = await toBlob(posterRef.current, { 
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 2 
      })
      if (!blob) return
      
      if (type === 'download') {
        saveAs(blob, `${startup.name}-Certificate.png`)
      } else {
        const file = new File([blob], `${startup.name}-Member.png`, { type: 'image/png' })
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: startup.name, text: `Verified on UpForge` })
        } else {
          saveAs(blob, `${startup.name}-Member.png`)
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
      
      {/* --- PREMIUM POSTER TEMPLATE (Optimized) --- */}
      <div className="fixed left-[-9999px] top-0">
        <div ref={posterRef} className="w-[1000px] h-[1000px] bg-white p-16 flex flex-col justify-between border-[12px] border-slate-50 relative">
            <div className="flex justify-between items-start">
                <div className="space-y-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 font-black text-xs uppercase tracking-widest rounded">Network Member</span>
                    <h1 className="text-6xl font-black tracking-tighter uppercase">{startup.name}</h1>
                    <p className="text-xl text-slate-400 font-bold uppercase">{startup.category} • {startup.founded_year}</p>
                </div>
                <img src="/logo.jpg" className="h-20 w-20 rounded-xl" />
            </div>
            <div className="py-10 border-l-4 border-blue-600 pl-8">
                <p className="text-3xl font-medium text-slate-700 leading-snug">
                   Officially recognized as a high-growth startup within the <span className="text-blue-600 font-bold">UpForge Ecosystem</span>. Vetted for innovation and excellence.
                </p>
            </div>
            <div className="flex justify-between items-end border-t border-slate-100 pt-8">
                <div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Verify at</p>
                    <p className="text-3xl font-black text-slate-900">UPFORGE.IN</p>
                </div>
                <img src="/seal.jpg" className="h-44 w-auto" />
            </div>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/#startups" className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 hover:text-primary transition-all">
            <ArrowLeft className="h-4 w-4" /> BACK
          </Link>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => handleAction('download')} disabled={isGenerating} className="rounded-full text-[10px] font-black tracking-widest">
              <Download className="mr-2 h-3.5 w-3.5" /> {isGenerating ? "..." : "DOWNLOAD"}
            </Button>
            <Button size="sm" onClick={() => handleAction('share')} disabled={isGenerating} className="rounded-full px-6 text-[10px] font-black tracking-widest bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100">
              <Share2 className="mr-2 h-3.5 w-3.5" /> {isGenerating ? "..." : "SHARE"}
            </Button>
          </div>
        </div>
      </nav>

      {/* --- CONTENT (LEFT ALIGNED) --- */}
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="h-20 w-20 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden mb-6 shadow-sm">
                  {startup.logo_url ? <img src={startup.logo_url} className="h-full w-full object-contain p-3" /> : <span className="text-3xl font-black text-blue-600">{startup.name?.[0]}</span>}
              </div>
              
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-xs font-black uppercase tracking-widest">Verified Institutional Listing</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 uppercase leading-[0.85] mb-6">
                {startup.name}
              </h1>

              <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium max-w-3xl mb-10">
                {startup.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <a 
                  href={getCleanUrl(startup.website_url)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl text-xs font-black tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
                >
                  VISIT WEBSITE <ExternalLink className="h-4 w-4 opacity-50" />
                </a>
              </div>
            </motion.div>

            {/* Seal Area */}
            <div className="pt-16 mt-16 border-t border-slate-100 flex items-center gap-8">
                <img src="/seal.jpg" alt="Seal" className="h-32 w-auto" />
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Authentication</p>
                    <p className="text-xs font-bold text-slate-500 uppercase">UpForge Network Verified Member • 2026</p>
                </div>
            </div>
          </div>

          {/* Right Side: Metadata Cards */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-50/50 border border-slate-100 p-8 rounded-[2rem] space-y-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Startup Metadata</h3>
                <div className="grid grid-cols-1 gap-6">
                    {[
                        { label: "Industry Sector", value: startup.category },
                        { label: "Batch / Founded", value: startup.founded_year },
                        { label: "Location", value: "India (Global)" },
                        { label: "Status", value: "Active Member" }
                    ].map((item, i) => (
                        <div key={i} className="group">
                            <p className="text-[9px] font-black uppercase text-blue-600 tracking-widest mb-1">{item.label}</p>
                            <p className="text-lg font-bold text-slate-800">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="p-8 rounded-[2rem] border border-dashed border-slate-200 flex flex-col items-center text-center gap-4">
                <ShieldCheck className="h-8 w-8 text-slate-300" />
                <p className="text-[10px] font-bold text-slate-400 uppercase leading-loose">
                    This profile is cryptographically secured & verified by the UpForge Institutional Board.
                </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
