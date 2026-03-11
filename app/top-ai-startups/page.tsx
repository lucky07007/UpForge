"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function AIStartupsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <header className="mb-12 border-b border-white/20 pb-8">
        <div className="flex items-center gap-2 text-purple-400 mb-4">
          <Sparkles className="h-5 w-5" />
          <span className="text-xs font-bold tracking-widest uppercase">2026 Intelligence</span>
        </div>
        <h1 className="text-5xl font-black">Top AI Startups India</h1>
      </header>
      <div className="grid gap-6 sm:grid-cols-2">
        {["Sarvam AI", "Krutrim", "KissanAI", "Hanooman"].map(name => (
          <div key={name} className="border border-white/10 bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition-colors">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-slate-400 mt-2">Building indigenous LLMs and AI infrastructure for the Indian context.</p>
            <Link href="/submit" className="mt-6 flex items-center gap-2 text-purple-400 font-bold">Registry Entry <ArrowRight className="h-4 w-4" /></Link>
          </div>
        ))}
      </div>
    </div>
  );
}
