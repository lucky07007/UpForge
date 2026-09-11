import React from "react";

export default function LeaderboardLoadingPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF5] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="h-5 w-28 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="h-4 w-28 animate-pulse rounded-full bg-slate-100" />
          <div className="mt-3 h-9 w-60 animate-pulse rounded-xl bg-slate-100" />
          <div className="mt-6 flex gap-2">
            <div className="h-10 w-20 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-10 w-20 animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>
        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-4">
                <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-100" />
                <div className="h-4 w-44 animate-pulse rounded-full bg-slate-100" />
                <div className="ml-auto h-5 w-12 animate-pulse rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
