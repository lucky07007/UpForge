 "use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Medal, Trophy } from "lucide-react";

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
}

async function readJson(res: Response) {
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("Leaderboard service returned an invalid response.");
  }
  return res.json();
}

export default function LeaderboardClient({
  quizzes,
}: {
  quizzes: QuizMeta[];
}) {
  const [selectedSlug, setSelectedSlug] = useState(quizzes[0]?.slug || "");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("quiz");

    if (requested && quizzes.some((quiz) => quiz.slug === requested)) {
      setSelectedSlug(requested);
    }
  }, [quizzes]);

  useEffect(() => {
    if (!selectedSlug) return;

    let active = true;
    setLoading(true);
    setError("");

    fetch(
      `/api/quiz/leaderboard?quizSlug=${encodeURIComponent(selectedSlug)}`,
      { headers: { "x-upforge-domain": "quiz" } }
    )
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
  }, [selectedSlug]);

  const activeQuiz = useMemo(
    () => quizzes.find((quiz) => quiz.slug === selectedSlug),
    [quizzes, selectedSlug]
  );

  return (
    <main className="min-h-screen bg-[#FFFDF5] px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-[1300px]">
        <Link
          href="/quiz"
          className="inline-flex items-center gap-1.5 text-xs font-black text-slate-500 hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to challenges
        </Link>

        <header className="mt-6 rounded-3xl border border-amber-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
              <Trophy className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
                UpForge public rankings
              </p>
              <h1 className="mt-1 text-3xl font-black text-slate-950 sm:text-4xl">
                Quiz Leaderboards
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Rankings use accuracy first, score second and completion time
                third. Every completed challenge is submitted automatically.
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {quizzes.map((quiz) => (
              <button
                key={quiz.slug}
                type="button"
                onClick={() => setSelectedSlug(quiz.slug)}
                className={`rounded-xl px-3.5 py-2.5 text-xs font-black transition ${
                  selectedSlug === quiz.slug
                    ? "bg-[#F4C542] text-slate-950"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-amber-300"
                }`}
              >
                {quiz.title}
              </button>
            ))}
          </div>
        </header>

        <section className="mt-6 rounded-3xl border border-amber-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
                {activeQuiz?.category}
              </p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">
                {activeQuiz?.title}
              </h2>
            </div>
            <Medal className="h-6 w-6 text-amber-600" />
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-12 text-center text-sm text-slate-500">
              Loading rankings…
            </div>
          ) : entries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
              No scores yet. Be the first to complete this challenge.
            </div>
          ) : (
            <div className="space-y-2">
              {entries.map((entry) => (
                <div
                  key={entry.id || `${entry.rank}-${entry.userName}`}
                  className={`flex items-center justify-between gap-4 rounded-2xl border p-4 ${
                    entry.rank === 1
                      ? "border-amber-300 bg-amber-50"
                      : "border-slate-100 bg-slate-50/60"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="w-8 text-center text-sm font-black text-amber-700">
                      #{entry.rank}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-slate-950">
                        {entry.userName}
                      </p>
                      <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
                        {entry.badgeEarned}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3 text-right">
                    <div className="hidden sm:block">
                      <p className="text-sm font-black text-slate-950">
                        {entry.score}/{entry.totalQuestions}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-500">
                        {entry.timeTakenSeconds || 0}s
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-900">
                      {entry.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

