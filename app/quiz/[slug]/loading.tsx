import React from "react";

export default function QuizDetailLoading() {
  return (
    <main className="min-h-screen bg-[#FFFDF5] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="h-5 w-28 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="mx-auto h-5 w-36 animate-pulse rounded-full bg-slate-100" />
          <div className="mx-auto mt-4 h-10 w-3/4 max-w-2xl animate-pulse rounded-xl bg-slate-100" />
          <div className="mx-auto mt-3 h-4 w-full max-w-xl animate-pulse rounded-full bg-slate-100" />
          <div className="mx-auto mt-8 h-12 max-w-xl animate-pulse rounded-2xl bg-slate-100" />
          <div className="mx-auto mt-4 h-12 w-44 animate-pulse rounded-xl bg-slate-100" />
        </div>
      </div>
    </main>
  );
}
