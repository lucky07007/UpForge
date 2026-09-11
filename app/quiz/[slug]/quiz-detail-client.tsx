 "use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  RotateCcw,
  Trophy,
} from "lucide-react";
import QuizComments from "@/components/quiz/quiz-comments";
import QuizCertificate from "@/components/quiz/quiz-certificate";

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
}

interface CompletionResult {
  certificateId: string;
  record: LeaderboardItem & { id?: string };
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

export default function QuizDetailClient({
  quiz,
}: {
  quiz: QuizDetailData;
}) {
  const questions = quiz.questions || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [userName, setUserName] = useState("UpForge Builder");
  const [isCompleted, setIsCompleted] = useState(false);
  const [submittingResult, setSubmittingResult] = useState(false);
  const [completionError, setCompletionError] = useState("");
  const [completion, setCompletion] = useState<CompletionResult | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [attemptId, setAttemptId] = useState("");

  useEffect(() => {
    const makeAttemptId = () => {
      try {
        if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
          return crypto.randomUUID();
        }
      } catch {}
      return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    };

    setAttemptId(makeAttemptId());
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("upforge_quiz_name");
      if (saved) setUserName(saved);
    } catch {}
  }, []);

  useEffect(() => {
    if (isCompleted) return;

    const interval = window.setInterval(() => {
      setTimeElapsed((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isCompleted]);

  useEffect(() => {
    let active = true;

    setLeaderboardLoading(true);

    fetch(
      `/api/quiz/leaderboard?quizSlug=${encodeURIComponent(quiz.slug)}`,
      { headers: { "x-upforge-domain": "quiz" } }
    )
      .then(readJson)
      .then((data) => {
        if (active) {
          setLeaderboard(Array.isArray(data?.leaderboard) ? data.leaderboard : []);
        }
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
  }, [quiz.slug]);

  const currentQuestion = questions[currentIdx];
  const currentKey = String(currentQuestion?.id ?? currentIdx);
  const hasAnsweredCurrent =
    selectedAnswers[currentKey] !== undefined;

  const saveName = (value: string) => {
    setUserName(value);

    try {
      window.localStorage.setItem("upforge_quiz_name", value);
    } catch {}
  };

  const submitCompletion = async (
    nextAnswers: Record<string, number>
  ) => {
    if (!attemptId) {
      setCompletionError("Preparing your secure attempt. Please try again.");
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
          userName: userName.trim() || "UpForge Builder",
          timeTakenSeconds: timeElapsed,
        }),
      });

      const data = await readJson(res);

      if (!res.ok || !data?.success) {
        throw new Error(
          data?.error || "We could not record the leaderboard result."
        );
      }

      const record = data.record;

      const submittedEntry: LeaderboardItem = {
        rank: 0,
        id: data.completionId,
        userName: record.userName,
        score: record.score,
        totalQuestions: record.totalQuestions,
        percentage: record.percentage,
        badgeEarned: record.badgeEarned,
        timeTakenSeconds: record.timeTakenSeconds,
      };

      setCompletion({
        certificateId: data.certificateId,
        record: submittedEntry,
      });

      // Optimistic UI: no second Firestore read after the write.
      setLeaderboard((previous) => {
        const merged = [
          submittedEntry,
          ...previous.filter((entry) => entry.id !== submittedEntry.id),
        ];

        merged.sort((a, b) => {
          if (b.percentage !== a.percentage) {
            return b.percentage - a.percentage;
          }
          if (b.score !== a.score) return b.score - a.score;
          return (
            (a.timeTakenSeconds || 999999) -
            (b.timeTakenSeconds || 999999)
          );
        });

        return merged.slice(0, 10).map((entry, index) => ({
          ...entry,
          rank: index + 1,
        }));
      });

      setIsCompleted(true);
    } catch (error: any) {
      setCompletionError(
        error?.message ||
          "We could not record the leaderboard result. Your answers remain on this page."
      );
      setIsCompleted(true);
    } finally {
      setSubmittingResult(false);
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnsweredCurrent || submittingResult) return;

    setSelectedAnswers((previous) => ({
      ...previous,
      [currentKey]: optionIndex,
    }));

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

  const handleRetryCompletion = async () => {
    await submitCompletion(selectedAnswers);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowExplanation(false);
    setTimeElapsed(0);
    setIsCompleted(false);
    setSubmittingResult(false);
    setCompletionError("");
    setCompletion(null);
    try {
      if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        setAttemptId(crypto.randomUUID());
      } else {
        setAttemptId(`${Date.now()}_${Math.random().toString(36).slice(2)}`);
      }
    } catch {
      setAttemptId(`${Date.now()}_${Math.random().toString(36).slice(2)}`);
    }
  };

  if (!currentQuestion && !isCompleted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFFDF5] p-6">
        <p className="text-sm text-slate-500">
          No questions are available for this challenge.
        </p>
      </main>
    );
  }

  const liveScore = completion?.record.score ?? 0;
  const livePercentage = completion?.record.percentage ?? 0;
  const liveBadge = completion?.record.badgeEarned ?? getBadge(livePercentage);

  return (
    <main className="min-h-screen bg-[#FFFDF5] px-4 py-5 sm:px-6 lg:px-10 xl:px-12">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mb-5 flex items-center justify-between gap-4">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-1.5 text-xs font-black text-slate-500 transition hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            All challenges
          </Link>

          {!isCompleted && (
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-3.5 py-2 text-xs font-black text-slate-600 shadow-sm">
              <Clock className="h-4 w-4 text-amber-600" />
              {Math.floor(timeElapsed / 60)}:
              {(timeElapsed % 60).toString().padStart(2, "0")}
            </div>
          )}
        </div>

        {/* Full desktop-width hero. The source image is allowed to keep its natural ratio. */}
        <section className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm">
          <div className="w-full bg-slate-100">
            <img
              src={quiz.image}
              alt={quiz.title}
              className="block h-auto w-full"
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-amber-100 bg-white px-5 py-5 sm:px-7 lg:px-9">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
                {quiz.category}
              </p>
              <h1 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">
                {quiz.title.split("|")[0].trim()}
              </h1>
              <p className="mt-1 max-w-3xl text-sm text-slate-600">
                {quiz.description}
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 px-4 py-2.5 text-xs font-black text-amber-900">
              {quiz.duration || "3–5 Minutes"}
            </div>
          </div>
        </section>

        {!isCompleted ? (
          <section className="mt-6 rounded-3xl border border-amber-100 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            <div className="rounded-2xl border border-amber-100 bg-[#FFFDF5] p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-700">
                    Certificate & leaderboard name
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Optional. If blank, we use “UpForge Builder”.
                  </p>
                </div>

                <input
                  type="text"
                  value={userName}
                  onChange={(event) => saveName(event.target.value)}
                  maxLength={80}
                  className="w-full rounded-xl border border-amber-300 bg-white px-4 py-3 text-sm font-bold text-slate-950 outline-none focus:ring-2 focus:ring-amber-100 sm:max-w-sm"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between text-xs font-black uppercase tracking-wider text-amber-700">
                <span>Question {currentIdx + 1}</span>
                <span>
                  {currentIdx + 1} / {questions.length}
                </span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#F4C542] transition-all duration-300"
                  style={{
                    width: `${((currentIdx + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <h2 className="mt-8 max-w-5xl text-2xl font-black leading-tight text-slate-950 sm:text-3xl lg:text-4xl">
              {currentQuestion.question}
            </h2>

            <div className="mt-7 grid gap-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswers[currentKey] === index;
                const isCorrect = false; // Answer key is server-only.

                return (
                  <button
                    key={index}
                    type="button"
                    disabled={hasAnsweredCurrent || submittingResult}
                    onClick={() => handleSelectOption(index)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left text-sm font-semibold transition sm:p-5 ${
                      isSelected
                        ? "border-amber-400 bg-amber-50 text-slate-950 shadow-sm"
                        : "border-slate-200 bg-white text-slate-800 hover:border-amber-300 hover:bg-amber-50/40"
                    } disabled:cursor-default`}
                  >
                    <span>{option}</span>
                    {hasAnsweredCurrent && isSelected && (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-600" />
                    )}
                  </button>
                );
              })}
            </div>

            {showExplanation && currentQuestion.explanation && (
              <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50/60 p-4 text-sm leading-6 text-slate-700">
                <span className="font-black text-amber-800">Insight: </span>
                {currentQuestion.explanation}
              </div>
            )}

            {hasAnsweredCurrent && (
              <div className="mt-7 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={submittingResult}
                  className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:opacity-50"
                >
                  {currentIdx + 1 === questions.length
                    ? submittingResult
                      ? "Recording result…"
                      : "Finish challenge"
                    : "Next question"}
                </button>
              </div>
            )}
          </section>
        ) : (
          <section className="mt-6 space-y-6">
            <div className="rounded-3xl border border-amber-100 bg-white p-7 text-center shadow-sm sm:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <Trophy className="h-8 w-8" />
              </div>

              <h2 className="mt-5 text-3xl font-black text-slate-950 sm:text-4xl">
                Challenge completed
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Your result was recorded automatically.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-wider text-amber-900">
                <Award className="h-4 w-4" />
                {liveBadge}
              </div>

              {completionError ? (
                <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                  <p>{completionError}</p>
                  <button
                    type="button"
                    onClick={handleRetryCompletion}
                    disabled={submittingResult}
                    className="mt-3 underline"
                  >
                    {submittingResult ? "Retrying…" : "Retry completion"}
                  </button>
                </div>
              ) : completion ? (
                <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
                  {completion.record.userName}: {liveScore}/
                  {completion.record.totalQuestions} ({livePercentage}%)
                  <span className="mx-2">·</span>
                  Certificate ready
                </div>
              ) : null}
            </div>

            {completion && (
              <QuizCertificate
                userName={completion.record.userName}
                quizTitle={quiz.title.split("|")[0].trim()}
                category={quiz.category}
                score={completion.record.score}
                totalQuestions={completion.record.totalQuestions}
                percentage={completion.record.percentage}
                certificateId={completion.certificateId}
                credentialTier={quiz.credentialTier}
              />
            )}

            <section className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
                    Public results
                  </p>
                  <h3 className="mt-1 text-2xl font-black text-slate-950">
                    {quiz.title.split("|")[0].trim()} leaderboard
                  </h3>
                </div>

                <Link
                  href={`/quiz/leaderboard?quiz=${encodeURIComponent(quiz.slug)}`}
                  className="text-xs font-black text-amber-800 underline underline-offset-4"
                >
                  Open full leaderboard
                </Link>
              </div>

              {leaderboardLoading ? (
                <div className="py-10 text-center text-sm text-slate-500">
                  Loading rankings…
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="py-10 text-center text-sm text-slate-500">
                  No leaderboard entries yet.
                </div>
              ) : (
                <div className="mt-5 space-y-2">
                  {leaderboard.slice(0, 10).map((entry) => (
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

            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-black text-slate-700 transition hover:border-amber-300"
              >
                <RotateCcw className="h-4 w-4" />
                Retake challenge
              </button>

              <Link
                href="/quiz"
                className="rounded-xl bg-slate-950 px-5 py-3 text-xs font-black text-white transition hover:bg-slate-800"
              >
                Explore other quizzes
              </Link>
            </div>
          </section>
        )}

        <div className="mt-8">
          <QuizComments quizSlug={quiz.slug} />
        </div>
      </div>
    </main>
  );
}
