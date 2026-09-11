"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";
import { LeaderboardLoading } from "@/components/quiz/quiz-loading";

interface QuizMeta {
  slug: string;
  title: string;
  category: string;
}

interface Entry {
  rank: number;
  id?: string;
  userName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  badgeEarned: string;
  timeTakenSeconds?: number;
  completedAt?: string;
  quizSlug?: string;
  quizTitle?: string;
}

type Scope = "global" | "quiz";
type Period = "all-time" | "daily";

async function readJson(res: Response) {
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("Leaderboard service returned an invalid response.");
  }
  return res.json();
}

function rowStyle(rank: number) {
  if (rank === 1) return "border-[#E7C65C] bg-[#FFF9E7]";
  if (rank === 2) return "border-[#CBD5E1] bg-[#F8FAFC]";
  if (rank === 3) return "border-[#D6B08A] bg-[#FFF8F2]";
  return "border-slate-100 bg-white";
}

function RankMark({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-xl">🥇</span>;
  if (rank === 2) return <span className="text-xl">🥈</span>;
  if (rank === 3) return <span className="text-xl">🥉</span>;
  return <span className="w-7 text-center text-xs font-black text-slate-500">#{rank}</span>;
}

export default function LeaderboardClient({ quizzes }: { quizzes: QuizMeta[] }) {
  const [scope, setScope] = useState<Scope>("global");
  const [period, setPeriod] = useState<Period>("all-time");
  const [selectedSlug, setSelectedSlug] = useState(quizzes[0]?.slug || "");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("quiz");
    const requestedPeriod = params.get("period");
    if (requested && quizzes.some((quiz) => quiz.slug === requested)) {
      setSelectedSlug(requested);
      setScope("quiz");
    }
    if (requestedPeriod === "daily") setPeriod("daily");
  }, [quizzes]);

  useEffect(() => {
    if (scope === "quiz" && !selectedSlug) return;

    let active = true;
    setLoading(true);
    setError("");

    const params = new URLSearchParams({
      scope,
      period,
    });
    if (scope === "quiz") params.set("quizSlug", selectedSlug);

    fetch(`/api/quiz/leaderboard?${params.toString()}`, {
      headers: { "x-upforge-domain": "quiz" },
    })
      .then(readJson)
      .then((data) => {
        if (!active) return;
        setEntries(Array.isArray(data?.leaderboard) ? data.leaderboard : []);
        if (!data?.success && data?.error) setError(data.error);
      })
      .catch((err) => {
        if (!active) return;
        setEntries([]);
        setError(err?.message || "Leaderboard is temporarily unavailable.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [scope, period, selectedSlug]);

  const activeQuiz = useMemo(
    () => quizzes.find((quiz) => quiz.slug === selectedSlug),
    [quizzes, selectedSlug],
  );

  const heading = scope === "global"
    ? "Global leaderboard"
    : `${activeQuiz?.title || "Challenge"} leaderboard`;

  return (
    <main className="min-h-screen bg-[#FFFDF5] px-4 py-6 md:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <Link href="/quiz" className="inline-flex items-center gap-1.5 text-xs font-black text-slate-500 hover:text-slate-950">
          <ArrowLeft className="h-4 w-4" />
          Back to challenges
        </Link>

        <header className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#1D4ED8]">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1D4ED8]">UpForge rankings</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Leaderboards</h1>
              <p className="mt-1 text-sm text-slate-500">Accuracy first · score second · fastest time breaks ties.</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button type="button" onClick={() => setScope("global")} className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${scope === "global" ? "bg-[#173B72] text-white" : "border border-slate-200 bg-white text-slate-600"}`}>
              Global
            </button>
            <button type="button" onClick={() => setScope("quiz")} className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${scope === "quiz" ? "bg-[#173B72] text-white" : "border border-slate-200 bg-white text-slate-600"}`}>
              By challenge
            </button>
            <span className="mx-1 hidden h-9 w-px bg-slate-200 sm:block" />
            <button type="button" onClick={() => setPeriod("daily")} className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${period === "daily" ? "bg-[#EEF4FB] text-[#173B72]" : "border border-slate-200 bg-white text-slate-600"}`}>
              Today
            </button>
            <button type="button" onClick={() => setPeriod("all-time")} className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${period === "all-time" ? "bg-[#EEF4FB] text-[#173B72]" : "border border-slate-200 bg-white text-slate-600"}`}>
              All time
            </button>
          </div>

          {scope === "quiz" && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {quizzes.map((quiz) => (
                <button
                  key={quiz.slug}
                  type="button"
                  onClick={() => setSelectedSlug(quiz.slug)}
                  className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-black transition ${selectedSlug === quiz.slug ? "bg-[#F4C542] text-slate-950" : "border border-slate-200 bg-white text-slate-600"}`}
                >
                  {quiz.title}
                </button>
              ))}
            </div>
          )}
        </header>

        <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex items-end justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1D4ED8]">
                {period === "daily" ? "Today" : "All time"}
              </p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">{heading}</h2>
            </div>
            <span className="hidden rounded-full bg-slate-50 px-3 py-1.5 text-[10px] font-black text-slate-500 sm:inline-flex">
              Top 10
            </span>
          </div>

          {error && <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">{error}</div>}

          {loading ? (
            <LeaderboardLoading />
          ) : entries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">No scores yet. Be first.</div>
          ) : (
            <div className="space-y-2">
              {entries.slice(0, 10).map((entry) => (
                <div key={entry.id || `${entry.rank}-${entry.userName}`} className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 sm:p-4 ${rowStyle(entry.rank)}`}>
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex w-8 shrink-0 justify-center"><RankMark rank={entry.rank} /></div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-slate-950">{entry.userName}</p>
                      <p className="mt-0.5 truncate text-[10px] font-semibold text-slate-500">
                        {scope === "global" && entry.quizTitle ? `${entry.quizTitle} · ` : ""}{entry.score}/{entry.totalQuestions} · {entry.timeTakenSeconds || 0}s
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-black text-[#173B72]">{entry.percentage}%</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
