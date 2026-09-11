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
  if (rank === 1) return "border-accent-gold/50 bg-accent-gold/10 shadow-sm";
  if (rank === 2) return "border-slate-300/60 bg-muted/50";
  if (rank === 3) return "border-amber-700/25 bg-amber-50/50 dark:bg-amber-950/10";
  return "border-[var(--glass-border)] bg-card";
}

function RankMark({ rank }: { rank: number }) {
  if (rank === 1) return <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-gold/15 text-lg">🥇</span>;
  if (rank === 2) return <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-lg">🥈</span>;
  if (rank === 3) return <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-lg">🥉</span>;
  return <span className="w-7 text-center text-xs font-bold text-muted-foreground">#{rank}</span>;
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
    <main className="min-h-screen bg-background px-4 py-6 text-foreground md:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <Link href="/quiz" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to challenges
        </Link>

        <header className="mt-5 rounded-2xl border border-[var(--glass-border)] bg-card p-5 shadow-sm sm:p-7">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent-primary">UpForge rankings</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Leaderboards</h1>
              <p className="mt-1 text-sm text-muted-foreground">Accuracy first · score second · fastest time breaks ties.</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button type="button" onClick={() => setScope("global")} className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${scope === "global" ? "bg-accent-primary text-white" : "border border-[var(--glass-border)] bg-background text-muted-foreground"}`}>
              Global
            </button>
            <button type="button" onClick={() => setScope("quiz")} className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${scope === "quiz" ? "bg-accent-primary text-white" : "border border-[var(--glass-border)] bg-background text-muted-foreground"}`}>
              By challenge
            </button>
            <span className="mx-1 hidden h-9 w-px bg-slate-200 sm:block" />
            <button type="button" onClick={() => setPeriod("daily")} className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${period === "daily" ? "bg-accent-primary/10 text-accent-primary" : "border border-[var(--glass-border)] bg-background text-muted-foreground"}`}>
              Today
            </button>
            <button type="button" onClick={() => setPeriod("all-time")} className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${period === "all-time" ? "bg-accent-primary/10 text-accent-primary" : "border border-[var(--glass-border)] bg-background text-muted-foreground"}`}>
              All time
            </button>
          </div>

          {scope === "quiz" && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {quizzes.map((quiz) => (
                <button
                  key={quiz.slug}
                  type="button"
                  onClick={() => setSelectedSlug(quiz.slug)}
                  className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-black transition ${selectedSlug === quiz.slug ? "bg-accent-gold text-slate-950" : "border border-[var(--glass-border)] bg-background text-muted-foreground"}`}
                >
                  {quiz.title}
                </button>
              ))}
            </div>
          )}
        </header>

        <section className="mt-5 rounded-2xl border border-[var(--glass-border)] bg-card p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex items-end justify-between gap-3 border-b border-[var(--glass-border)] pb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent-primary">
                {period === "daily" ? "Today" : "All time"}
              </p>
              <h2 className="mt-1 text-2xl font-bold text-foreground">{heading}</h2>
            </div>
            <span className="hidden rounded-full bg-muted px-3 py-1.5 text-[10px] font-bold text-muted-foreground sm:inline-flex">
              Top 10
            </span>
          </div>

          {error && <div className="mb-4 rounded-xl border border-accent-gold/30 bg-accent-gold/10 px-4 py-3 text-sm font-semibold text-foreground">{error}</div>}

          {loading ? (
            <LeaderboardLoading />
          ) : entries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--glass-border)] p-10 text-center text-sm text-muted-foreground">No scores yet. Be first.</div>
          ) : (
            <div className="space-y-2">
              {entries.slice(0, 10).map((entry) => (
                <div key={entry.id || `${entry.rank}-${entry.userName}`} className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 sm:p-4 ${rowStyle(entry.rank)}`}>
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex w-8 shrink-0 justify-center"><RankMark rank={entry.rank} /></div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-foreground">{entry.userName}</p>
                      <p className="mt-0.5 truncate text-[10px] font-medium text-muted-foreground">
                        {scope === "global" && entry.quizTitle ? `${entry.quizTitle} · ` : ""}{entry.score}/{entry.totalQuestions} · {entry.timeTakenSeconds || 0}s
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-accent-primary/10 px-2.5 py-1 text-xs font-bold text-accent-primary">{entry.percentage}%</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
