"use client";

import React from "react";

export function QuizLoading({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
      <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
        <span className="relative flex h-5 w-5 items-center justify-center">
          <span className="absolute h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-[#1D4ED8]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#1D4ED8]" />
        </span>
        <span className="text-xs font-bold text-slate-600">{label}</span>
      </div>
    </div>
  );
}

export function LeaderboardLoading() {
  return (
    <div className="space-y-2" role="status" aria-live="polite">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm">
        <span className="h-9 w-9 animate-pulse rounded-xl bg-slate-100" />
        <span className="h-4 w-40 animate-pulse rounded-full bg-slate-100" />
        <span className="ml-auto h-4 w-12 animate-pulse rounded-full bg-slate-100" />
      </div>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm opacity-80">
        <span className="h-9 w-9 animate-pulse rounded-xl bg-slate-100" />
        <span className="h-4 w-32 animate-pulse rounded-full bg-slate-100" />
        <span className="ml-auto h-4 w-12 animate-pulse rounded-full bg-slate-100" />
      </div>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm opacity-60">
        <span className="h-9 w-9 animate-pulse rounded-xl bg-slate-100" />
        <span className="h-4 w-44 animate-pulse rounded-full bg-slate-100" />
        <span className="ml-auto h-4 w-12 animate-pulse rounded-full bg-slate-100" />
      </div>
    </div>
  );
}
