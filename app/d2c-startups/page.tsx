"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function D2CStartupsPage() {
  return (
    <div className="min-h-screen bg-[#F3EFE5] p-8">
      <nav className="mb-8">
        <Link href="/" className="text-sm uppercase tracking-widest text-slate-500 hover:text-black">
          ← Back to Home
        </Link>
      </nav>
      
      <header className="mb-12 border-b-2 border-black pb-8">
        <h1 className="text-5xl font-black italic text-[#C026D3]">D2C Startups India</h1>
        <p className="mt-4 text-xl text-slate-700">The Complete Guide — 2026</p>
      </header>

      <main className="max-w-4xl">
        <div className="grid gap-6">
          {["Nykaa", "Mamaearth", "boAt", "Lenskart"].map((brand) => (
            <div key={brand} className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-bold">{brand}</h2>
              <p className="mt-2 text-slate-600">Leading the Indian D2C revolution with unique playbooks.</p>
              <Link href="/submit" className="mt-4 inline-flex items-center gap-2 font-bold text-[#C026D3]">
                Register your startup <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
