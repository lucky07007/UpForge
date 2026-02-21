"use client"

import React from 'react'
import { ApplicationForm } from "@/components/application-form"
import { ShieldCheck, Lock, Sparkles, CheckCircle, Globe, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar: Premium Benefits & Trust */}
      <div className="relative w-full md:w-[40%] bg-indigo-950 p-8 md:p-12 flex flex-col justify-between border-r border-white/10">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/seal.jpg" 
            alt="Institutional Seal" 
            fill 
            className="object-cover mix-blend-overlay"
          />
        </div>
        
        <div className="relative z-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-400/30 mb-8">
            <ShieldCheck className="h-6 w-6 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase leading-none mb-4">
            Join the <br /> <span className="text-indigo-400">Ecosystem</span>
          </h1>
          <p className="text-indigo-200/60 text-sm font-medium max-w-xs leading-relaxed">
            Institutional-grade verification for India's most ambitious independent builders.
          </p>

          <div className="mt-12 space-y-6">
            <BenefitItem 
              icon={<Sparkles className="text-amber-400" />}
              title="Sponsored Visibility"
              desc="Featured placement across the network for maximum reach."
            />
            <BenefitItem 
              icon={<Globe className="text-blue-400" />}
              title="Verified Badge"
              desc="Instant trust for investors and potential collaborators."
            />
            <BenefitItem 
              icon={<Zap className="text-indigo-400" />}
              title="Registry Priority"
              desc="Get listed in our institutional grade founder ledger."
            />
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-white/10">
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/30">
            Institutional Verification Ledger v2.0
          </span>
        </div>
      </div>

      {/* Main Content: The Form */}
      <div className="flex-1 bg-white p-8 md:p-20 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Startup Application</h2>
            <p className="text-zinc-500 mt-2">Complete the registry details below. All data is encrypted.</p>
          </div>

          {/* Pass proper IDs if available, or handle within the component */}
          <ApplicationForm userEmail="" userId="" />
        </div>
      </div>
    </div>
  )
}

function BenefitItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="text-white font-bold text-sm uppercase tracking-wider">{title}</h4>
        <p className="text-indigo-200/40 text-xs mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}
