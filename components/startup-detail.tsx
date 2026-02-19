"use client"

import React, { useRef, useState } from "react"
import { Startup } from "@/types/startup"
import {
  Share2,
  ArrowLeft,
  Download,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Globe,
  MapPin,
  Calendar,
  Building2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { toBlob } from "html-to-image"
import saveAs from "file-saver"
import { motion } from "framer-motion"
import Link from "next/link"

export function StartupDetail({ startup }: { startup: Startup }) {
  const posterRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const getCleanUrl = (url?: string | null) => {
    if (!url) return null
    let formatted = url.trim()
    if (!/^https?:\/\//i.test(formatted)) {
      formatted = `https://${formatted}`
    }
    try {
      new URL(formatted)
      return formatted
    } catch {
      return null
    }
  }

  const handleAction = async (type: "share" | "download") => {
    if (!posterRef.current) return
    setIsGenerating(true)

    try {
      const blob = await toBlob(posterRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 3,
      })

      if (!blob) return

      if (type === "download") {
        saveAs(blob, `${startup.name}-Official-Recognition.png`)
      } else {
        const file = new File([blob], `${startup.name}-UpForge-Feature.png`, {
          type: "image/png",
        })

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `Official Recognition: ${startup.name}`,
            text: `${startup.name} is a verified member of the UpForge network.`,
          })
        } else {
          saveAs(blob, `${startup.name}-UpForge-Feature.png`)
        }
      }
    } catch (err) {
      console.error("Poster generation failed:", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const websiteUrl = getCleanUrl(startup.website)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900 selection:bg-blue-100">

      {/* Premium Top Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400" />

      {/* ---------------- HIDDEN PREMIUM POSTER ---------------- */}
      <div className="fixed left-[-9999px] top-0">
        <div
          ref={posterRef}
          className="w-[1080px] h-[1080px] bg-white p-24 flex flex-col justify-between relative overflow-hidden text-slate-900"
        >
          <div className="absolute top-0 left-0 w-full h-4 bg-slate-900" />

          {/* Watermark Seal */}
          <img
            src="/seal.jpg"
            alt="Official Seal"
            className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-5 w-[400px] pointer-events-none"
          />

          <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                <img src="/logo.jpg" className="h-10 w-10 object-contain brightness-0 invert" alt="UpForge" />
              </div>
              <div>
                <span className="text-3xl font-black tracking-tighter block text-slate-900">UPFORGE</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Institutional Network</span>
              </div>
            </div>

            {/* Official Seal Block */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Official Recognition
                </p>
                <p className="text-sm font-black text-slate-900 tracking-wider">
                  Institutional Seal
                </p>
              </div>
              <img
                src="/seal.jpg"
                alt="UpForge Official Seal"
                className="h-20 w-20 object-contain"
              />
            </div>
          </div>

          <div className="text-center space-y-12 z-10">
            <div className="relative inline-block">
              <div className="h-56 w-56 mx-auto rounded-[3rem] bg-white shadow-2xl p-8 flex items-center justify-center border border-slate-100">
                {startup.logo_url ? (
                  <img src={startup.logo_url} className="object-contain h-full w-full" alt="" />
                ) : (
                  <span className="text-8xl font-black text-slate-900">
                    {startup.name?.[0]}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-2xl shadow-xl">
                <ShieldCheck className="h-10 w-10" />
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-7xl font-black tracking-tight text-slate-900 leading-none">
                {startup.name}
              </h1>
              <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full" />
              <p className="text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                {startup.description}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-end z-10 border-t-2 border-slate-50 pt-16">
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verification Status</p>
              <div className="flex items-center gap-2 text-green-600 font-bold">
                <CheckCircle2 className="h-5 w-5" />
                <span>VERIFIED ACTIVE MEMBER</span>
              </div>
            </div>
            <div className="text-right space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Network Node</p>
              <p className="text-xl font-bold text-slate-900">www.upforge.in</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/startup"
            className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            STARTUP DIRECTORY
          </Link>

          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAction("download")}
              disabled={isGenerating}
              className="font-bold text-slate-600 hover:text-slate-900"
            >
              <Download className="mr-2 h-4 w-4" />
              {isGenerating ? "Processing..." : "Export Recognition"}
            </Button>

            <Button
              size="sm"
              onClick={() => handleAction("share")}
              disabled={isGenerating}
              className="bg-slate-900 hover:bg-blue-600 text-white font-bold px-6 shadow-lg"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Profile
            </Button>
          </div>
        </div>
      </nav>

      {/* ---------------- MAIN ---------------- */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

              <div className="flex items-center gap-4 mb-8">
                <img src="/seal.jpg" alt="Official Seal" className="h-14 w-14 object-contain" />
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Officially Verified & Recognized
                  </p>
                  <p className="text-xs font-semibold text-slate-500">
                    Certified by UpForge Institutional Network
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
                <div className="h-28 w-28 rounded-3xl bg-white border border-slate-100 shadow-xl flex items-center justify-center shrink-0">
                  {startup.logo_url ? (
                    <img src={startup.logo_url} className="object-contain h-full w-full p-6" alt={startup.name} />
                  ) : (
                    <span className="text-4xl font-black text-slate-900">
                      {startup.name?.[0]}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-tight mb-2">
                    {startup.name}
                  </h1>
                  <p className="text-lg font-bold text-slate-400 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Headquartered in India
                  </p>
                </div>
              </div>

              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium mb-12">
                {startup.description}
              </p>

              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl text-base font-bold hover:bg-blue-600 transition-all shadow-xl hover:-translate-y-1"
                >
                  <Globe className="h-5 w-5" />
                  Visit Official Portal
                  <ExternalLink className="h-4 w-4 opacity-50" />
                </a>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-4 sticky top-32">
            <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-xl space-y-8">

              <div>
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                  Verification Data
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Building2 className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Sector</p>
                      <p className="font-bold text-slate-900">{startup.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Calendar className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Cohort</p>
                      <p className="font-bold text-slate-900">{startup.founded_year || "2026"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                      <p className="font-bold text-green-600">Active Network Member</p>
                    </div>
                  </div>

                  {/* Seal Authority */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <img src="/seal.jpg" alt="Certification Seal" className="h-12 w-12 object-contain" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">
                        Certification Authority
                      </p>
                      <p className="font-bold text-slate-900">
                        UpForge Institutional Council
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl bg-slate-50 text-slate-900 text-sm font-bold hover:bg-slate-100 transition-colors"
              >
                Report Information Error
              </Link>

            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
