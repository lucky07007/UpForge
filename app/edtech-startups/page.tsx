"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, GraduationCap } from "lucide-react";

export default function EdTechStartupsPage() {
  return (
    <div className="min-h-screen bg-[#F0F4F8] p-8 font-sans">
      <nav className="mb-8">
        <Link href="/" className="text-xs uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">
          ← UpForge Home
        </Link>
      </nav>
      
      <header className="mb-12 border-b-2 border-blue-900 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="h-6 w-6 text-blue-700" />
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Sector Analysis</span>
        </div>
        <h1 className="text-5xl font-black text-blue-900">EdTech Startups India</h1>
        <p className="mt-4 text-xl text-slate-600 italic">Reimagining Education for 2026</p>
      </header>

      <main className="max-w-4xl">
        <div className="grid gap-6">
          {["Byju's", "Unacademy", "PhysicsWallah", "Eruditus"].map((brand) => (
            <div key={brand} className="group border-2 border-blue-900 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(30,58,138,1)]">
              <h2 className="text-2xl font-bold text-blue-900">{brand}</h2>
              <p className="mt-2 text-slate-600">Leading the digital learning transformation with scalable technology and content.</p>
              <div className="mt-4 flex items-center justify-between">
                <Link href="/submit" className="inline-flex items-center gap-2 font-bold text-blue-700">
                  Verify Startup <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="text-[10px] font-black uppercase text-slate-300">Verified Registry</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-16 border-t border-slate-200 pt-8 text-center text-slate-400">
        <p className="text-[10px] uppercase tracking-widest">© 2026 UpForge Intelligence Unit</p>
      </footer>
    </div>
  );
}
