"use client"

import React from 'react'
import { BusinessForm } from "@/components/business-form"
import { ShieldCheck, Lock } from "lucide-react"
import { motion } from "framer-motion"

export default function ApplyPage() {
  return (
    <div className="relative min-h-screen bg-[#0F172A] flex items-center justify-center overflow-hidden">
      {/* 1. Background elements - Matches Hero/Security vibe */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none">
          <svg width="100%" height="100%">
            <rect width="100%" height="100%" fill="url(#apply-grid)" />
            <defs>
              <pattern id="apply-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
          </svg>
        </div>
      </div>

      {/* 2. The Shared Component 
         'forceOpen' ensures the form is visible as a proper page overlay immediately.
      */}
      <BusinessForm forceOpen={true} />

      {/* 3. Aesthetic Background Content while the popup is active */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-0 text-center space-y-6 px-6"
      >
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <Lock className="h-8 w-8 text-indigo-400 opacity-50" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase opacity-40">
            UPFORGE <span className="text-indigo-500">Secure</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-indigo-300/30">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Establishing Encrypted Connection
            </span>
          </div>
        </div>

        <p className="text-slate-500 text-xs font-medium max-w-xs mx-auto leading-relaxed opacity-60">
          The founder registry portal is active. Please complete the form to submit your startup for verification.
        </p>
      </motion.div>

      {/* Security footer decoration */}
      <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none">
        <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/10">
          Institutional Grade Verification Ledger
        </span>
      </div>
    </div>
  )
}
