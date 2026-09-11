"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { LeaderboardLoading } from "@/components/quiz/quiz-loading";

const QuizCertificate = dynamic(() => import("@/components/quiz/quiz-certificate"), {
  ssr: false,
});

const QuizComments = dynamic(() => import("@/components/quiz/quiz-comments"), {
  ssr: false,
  loading: () => <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><LeaderboardLoading /></div>,
});

export interface Question {
  id: string | number;
  question: string;
  options: string[];
  explanation?: string;
}

export interface QuizDetailData {
  slug: string;
  title: string;
  description?: string;
  category: string;
  duration?: string;
  badge?: string;
  credentialTier?: string;
  image: string;
  questions: Question[];
}

interface LeaderboardItem {
  rank: number;
  id?: string;
  userName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  badgeEarned: string;
  timeTakenSeconds?: number;
  completedAt?: string;
}

interface CompletionResult {
  certificateId: string;
  record: LeaderboardItem & { id?: string; completedAt?: string };
}

async function readJson(res: Response) {
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("The assessment service returned an invalid response.");
  }
  return res.json();
}

function getBadge(pct: number) {
  if (pct >= 90) return "Top 1% Founder Elite";
  if (pct >= 70) return "Growth Master";
  if (pct >= 50) return "Startup Operator";
  return "Emerging Founder";
}

function makeAttemptId() {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  } catch {}
  return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function rankStyle(rank: number) {
  if (rank === 1) return "border-[#E7C65C] bg-[#FFF9E7]";
  if (rank === 2) return "border-[#CBD5E1] bg-[#F8FAFC]";
  if (rank === 3) return "border-[#D6B08A] bg-[#FFF8F2]";
  return "border-slate-100 bg-white";
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return <span className="text-lg" aria-label="1st place">🥇</span>;
  }
  if (rank === 2) {
    return <span className="text-lg" aria-label="2nd place">🥈</span>;
  }
  if (rank === 3) {
    return <span className="text-lg" aria-label="3rd place">🥉</span>;
  }
  return <span className="w-7 text-center text-xs font-black text-slate-500">#{rank}</span>;
}

export default function QuizDetailClient({ quiz }: { quiz: QuizDetailData }) {
  const questions = quiz.questions || [];
  const title = quiz.title.split("|")[0].trim();

  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [userName, setUserName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [submittingResult, setSubmittingResult] = useState(false);
  const [completionError, setCompletionError] = useState("");
  const [completion, setCompletion] = useState<CompletionResult | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [attemptId, setAttemptId] = useState("");

  useEffect(() => setAttemptId(makeAttemptId()), []);

  useEffect(() => {
    if (!started || isCompleted) return;
    const interval = window.setInterval(() => setTimeElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(interval);
  }, [started, isCompleted]);

  useEffect(() => {
    if (!started) return;
    let active = true;
    setLeaderboardLoading(true);

    fetch(`/api/quiz/leaderboard?quizSlug=${encodeURIComponent(quiz.slug)}&period=all-time`, {
      headers: { "x-upforge-domain": "quiz" },
    })
      .then(readJson)
      .then((data) => {
        if (active) setLeaderboard(Array.isArray(data?.leaderboard) ? data.leaderboard : []);
      })
      .catch(() => {
        if (active) setLeaderboard([]);
      })
      .finally(() => {
        if (active) setLeaderboardLoading(false);
      });

    return () => {
      active = false;
    };
  }, [started, quiz.slug]);

  const currentQuestion = questions[currentIdx];
  const currentKey = String(currentQuestion?.id ?? currentIdx);
  const hasAnsweredCurrent = selectedAnswers[currentKey] !== undefined;
  const canStart = userName.trim().length >= 2;

  const startChallenge = () => {
    if (!canStart || !questions.length) return;
    setUserName(userName.trim().replace(/\s+/g, " ").slice(0, 80));
    setStarted(true);
  };

  const submitCompletion = async (nextAnswers: Record<string, number>) => {
    if (!attemptId) {
      setCompletionError("Preparing your secure attempt. Please try again.");
      return;
    }
    if (!userName.trim()) {
      setCompletionError("Please enter your name before completing the challenge.");
      return;
    }

    setSubmittingResult(true);
    setCompletionError("");

    try {
      const res = await fetch("/api/quiz/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizSlug: quiz.slug,
          answers: nextAnswers,
          attemptId,
          userName: userName.trim(),
          timeTakenSeconds: timeElapsed,
          website: "",
        }),
      });

      const data = await readJson(res);
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "We could not record the leaderboard result.");
      }

      const record = data.record;
      const submittedEntry: LeaderboardItem = {
        rank: Number(data.rank || 0),
        id: data.completionId,
        userName: record.userName,
        score: record.score,
        totalQuestions: record.totalQuestions,
        percentage: record.percentage,
        badgeEarned: record.badgeEarned,
        timeTakenSeconds: record.timeTakenSeconds,
        completedAt: record.completedAt,
      };

      setCompletion({ certificateId: data.certificateId, record: submittedEntry });

      setLeaderboard((previous) => {
        const merged = [submittedEntry, ...previous.filter((entry) => entry.id !== submittedEntry.id)];
        merged.sort((a, b) => {
          if (b.percentage !== a.percentage) return b.percentage - a.percentage;
          if (b.score !== a.score) return b.score - a.score;
          return (a.timeTakenSeconds || 999999) - (b.timeTakenSeconds || 999999);
        });
        return merged.slice(0, 10).map((entry, index) => ({ ...entry, rank: index + 1 }));
      });

      setIsCompleted(true);
    } catch (error: any) {
      setCompletionError(error?.message || "We could not record this completion. Please retry once.");
      setIsCompleted(true);
    } finally {
      setSubmittingResult(false);
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnsweredCurrent || submittingResult) return;
    setSelectedAnswers((previous) => ({ ...previous, [currentKey]: optionIndex }));
    setShowExplanation(true);
  };

  const handleNext = async () => {
    setShowExplanation(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((value) => value + 1);
      return;
    }
    await submitCompletion(selectedAnswers);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowExplanation(false);
    setTimeElapsed(0);
    setIsCompleted(false);
    setStarted(false);
    setSubmittingResult(false);
    setCompletionError("");
    setCompletion(null);
    setLeaderboard([]);
    setAttemptId(makeAttemptId());
  };

  const liveScore = completion?.record.score ?? 0;
  const livePercentage = completion?.record.percentage ?? 0;
  const liveBadge = completion?.record.badgeEarned ?? getBadge(livePercentage);

  const progress = useMemo(
    () => (questions.length ? ((currentIdx + 1) / questions.length) * 100 : 0),
    [currentIdx, questions.length]
  );

  if (!currentQuestion && !isCompleted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFFDF5] p-6">
        <p className="text-sm text-slate-500">No questions are available for this challenge.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFDF5] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-4 flex items-center justify-between gap-4">
          <Link href="/quiz" className="inline-flex items-center gap-1.5 text-xs font-black text-slate-500 transition hover:text-slate-950">
            <ArrowLeft className="h-4 w-4" />
            All challenges
          </Link>
          {started && !isCompleted && (
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600 shadow-sm">
              <Clock className="h-4 w-4 text-[#1D4ED8]" />
              {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")}
            </div>
          )}
        </div>

        {!started && !isCompleted ? (
          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="mx-auto max-w-4xl px-5 py-8 text-center sm:px-10 sm:py-12">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FB] text-[#1D4ED8]">
                <Award className="h-6 w-6" />
              </div>
              <p className="mt-4 text-[11px] font-black uppercase tracking-[0.18em] text-[#1D4ED8]">UpForge assessment</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">{quiz.description}</p>

              <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs font-bold text-slate-600">
                <span className="rounded-full bg-slate-50 px-3 py-1.5">{questions.length} questions</span>
                <span className="rounded-full bg-slate-50 px-3 py-1.5">{quiz.duration || "3–5 minutes"}</span>
                <span className="rounded-full bg-slate-50 px-3 py-1.5">Certificate</span>
              </div>

              <div className="mx-auto mt-7 max-w-xl text-left">
                <label htmlFor="quiz-name" className="mb-2 block text-xs font-black uppercase tracking-[0.12em] text-slate-600">
                  Your name
                </label>
                <input
                  id="quiz-name"
                  type="text"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value.slice(0, 80))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") startChallenge();
                  }}
                  autoComplete="name"
                  maxLength={80}
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-base font-semibold text-slate-950 outline-none transition focus:border-[#1D4ED8] focus:ring-4 focus:ring-blue-50"
                />
                <p className="mt-2 text-xs text-slate-400">Used on your certificate and leaderboard.</p>
              </div>

              <button
                type="button"
                onClick={startChallenge}
                disabled={!canStart}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#173B72] px-7 py-3.5 text-sm font-black text-white shadow-sm transition hover:bg-[#102B50] disabled:cursor-not-allowed disabled:opacity-45"
              >
                <Play className="h-4 w-4" />
                Start challenge
              </button>
            </div>
          </section>
        ) : !isCompleted ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-7 lg:p-9">
            <div className="flex items-center justify-between gap-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#1D4ED8]">
              <span>Question {currentIdx + 1}</span>
              <span>{currentIdx + 1} / {questions.length}</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-[#1D4ED8] transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>

            <h2 className="mt-6 max-w-6xl text-xl font-black leading-tight text-slate-950 sm:text-2xl lg:text-3xl">
              {currentQuestion.question}
            </h2>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswers[currentKey] === index;
                return (
                  <button
                    key={index}
                    type="button"
                    disabled={hasAnsweredCurrent || submittingResult}
                    onClick={() => handleSelectOption(index)}
                    className={`flex min-h-14 w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition sm:min-h-16 sm:px-5 ${
                      isSelected
                        ? "border-blue-400 bg-blue-50 text-slate-950 shadow-sm"
                        : "border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-blue-50/40"
                    } disabled:cursor-default`}
                  >
                    <span>{option}</span>
                    {hasAnsweredCurrent && isSelected && <CheckCircle2 className="h-5 w-5 shrink-0 text-[#1D4ED8]" />}
                  </button>
                );
              })}
            </div>

            {showExplanation && currentQuestion.explanation && (
              <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3 text-xs leading-5 text-slate-700">
                <span className="font-black text-[#173B72]">Why: </span>{currentQuestion.explanation}
              </div>
            )}

            {hasAnsweredCurrent && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={submittingResult}
                  className="rounded-xl bg-[#173B72] px-6 py-3 text-sm font-black text-white transition hover:bg-[#102B50] disabled:opacity-50"
                >
                  {currentIdx + 1 === questions.length ? (submittingResult ? "Recording…" : "Finish") : "Next"}
                </button>
              </div>
            )}
          </section>
        ) : (
          <section className="mt-2 space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[#1D4ED8]">
                <Trophy className="h-7 w-7" />
              </div>
              <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">Challenge completed</h2>
              <p className="mt-1 text-sm text-slate-500">{liveScore}/{completion?.record.totalQuestions ?? questions.length} correct · {livePercentage}%</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-black text-[#173B72]">
                <Award className="h-4 w-4" /> {liveBadge}
              </div>

              {completionError ? (
                <div className="mx-auto mt-5 max-w-xl rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                  <p>{completionError}</p>
                  <button type="button" onClick={() => submitCompletion(selectedAnswers)} disabled={submittingResult} className="mt-2 underline">
                    {submittingResult ? "Retrying…" : "Retry completion"}
                  </button>
                </div>
              ) : completion ? (
                <div className="mx-auto mt-5 max-w-xl rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-bold text-emerald-800">
                  Result recorded on the public UpForge leaderboard.
                </div>
              ) : null}
            </div>

            {completion && (
              <QuizCertificate
                userName={completion.record.userName}
                quizTitle={title}
                category={quiz.category}
                score={completion.record.score}
                totalQuestions={completion.record.totalQuestions}
                percentage={completion.record.percentage}
                certificateId={completion.certificateId}
                issuedAt={completion.record.completedAt}
                credentialTier={quiz.credentialTier}
              />
            )}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1D4ED8]">Public results</p>
                  <h3 className="mt-1 text-xl font-black text-slate-950">{title} leaderboard</h3>
                </div>
                <Link href={`/quiz/leaderboard?quiz=${encodeURIComponent(quiz.slug)}`} className="text-xs font-black text-[#173B72] underline underline-offset-4">
                  View all
                </Link>
              </div>

              <div className="mt-4">
                {leaderboardLoading ? (
                  <LeaderboardLoading />
                ) : leaderboard.length === 0 ? (
                  <div className="py-8 text-center text-sm text-slate-500">No scores yet.</div>
                ) : (
                  <div className="space-y-2">
                    {leaderboard.slice(0, 10).map((entry) => (
                      <div key={entry.id || `${entry.rank}-${entry.userName}`} className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 ${rankStyle(entry.rank)}`}>
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex w-8 justify-center"><RankBadge rank={entry.rank} /></div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-black text-slate-950">{entry.userName}</p>
                            <p className="mt-0.5 text-[10px] font-semibold text-slate-500">{entry.score}/{entry.totalQuestions} · {entry.timeTakenSeconds || 0}s</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-black text-[#173B72]">{entry.percentage}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <div className="flex flex-wrap justify-center gap-2.5">
              <button type="button" onClick={handleRestart} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-black text-slate-700 transition hover:border-blue-300">
                <RotateCcw className="h-4 w-4" /> Retake
              </button>
              <Link href="/quiz/leaderboard" className="rounded-xl bg-[#173B72] px-5 py-3 text-xs font-black text-white transition hover:bg-[#102B50]">All leaderboards</Link>
              <Link href="/quiz" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-black text-slate-700">Other challenges</Link>
            </div>
          </section>
        )}

        <div className="mt-6"><QuizComments quizSlug={quiz.slug} /></div>
      </div>
    </main>
  );
}
