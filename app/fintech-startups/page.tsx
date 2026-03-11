"use client";

import Link from "next/link";
import { ArrowRight, Wallet } from "lucide-react";

export default function FintechStartupsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="mb-12 border-b-2 border-emerald-600 pb-6">
        <div className="flex items-center gap-2 text-emerald-600 mb-2">
          <Wallet className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-tighter">Market Report</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900">Fintech Startups India</h1>
      </header>
      <div className="grid gap-4">
        {["Paytm", "PhonePe", "Razorpay", "CRED"].map(name => (
          <div key={name} className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-slate-500 text-sm mt-1">Driving the digital payment and credit revolution in India.</p>
            <Link href="/submit" className="mt-4 inline-block text-emerald-600 font-bold text-sm">Verify Details →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
