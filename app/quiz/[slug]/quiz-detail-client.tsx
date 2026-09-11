"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Download,
  RotateCcw,
  Trophy,
} from "lucide-react";
import QuizCertificate from "@/components/quiz/quiz-certificate";
import QuizComments from "@/components/quiz/quiz-comments";

interface Question {
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
  image: string;
  duration: string;
  badge: string;
  credentialTier: string;
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

const GOLD = "#F4C542";

export default function QuizDetailClient({ quiz }: { quiz: QuizDetailData }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showInsight, setShowInsight] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [name, setName] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [submissionState, setSubmissionState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [result, setResult] = useState<{
    score: number;
    percentage: number;
    badge: string;
    certificateId: string;
  } | null>(null);

  useEffect(() => {
    try {
      setName(localStorage.getItem("upforge_quiz_name") || "");
    } catch {}
  }, []);

  useEffect(() => {
    if (isCompleted) return;
    const timer = window.setInterval(() => setTimeElapsed((v) => v + 1), 1000);
    return () => window.clearInterval(timer);
  }, [isCompleted]);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/quiz/leaderboard?quizSlug=${encodeURIComponent(quiz.slug)}`, {
      headers: { "x-upforge-domain": "quiz" },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.leaderboard) setLeaderboard(data.leaderboard);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [quiz.slug]);

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentIdx];
  const hasAnswered = answers[currentIdx] !== undefined;

  const badgeForPercentage = (percentage: number) => {
    if (percentage >= 90) return "Founder Elite";
    if (percentage >= 70) return quiz.credentialTier || "UpForge Certified";
    if (percentage >= 50) return "UpForge Operator";
    return "UpForge Learner";
  };

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnswered) return;
    setAnswers((prev) => ({ ...prev, [currentIdx]: optionIndex }));
    setShowInsight(true);
  };

  const submitCompletion = async (finalAnswers: Record<number, number>) => {
    setSubmissionState("submitting");

    const safeName = name.trim() || "UpForge Builder";
    try {
      localStorage.setItem("upforge_quiz_name", safeName);
    } catch {}

    try {
      const response = await fetch("/api/quiz/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-upforge-domain": "quiz",
        },
        body: JSON.stringify({
          quizSlug: quiz.slug,
          answers: finalAnswers,
          userName: safeName,
          timeTakenSeconds: timeElapsed,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Could not record completion");
      }

      const completed = {
        score: Number(data.score || 0),
        percentage: Number(data.percentage || 0),
        badge: String(data.badgeEarned || badgeForPercentage(data.percentage || 0)),
        certificateId: String(data.certificateId),
      };

      setResult(completed);
      setSubmissionState("success");

      // No second Firebase read. Merge the new result into the already-cached
      // leaderboard response in memory.
      const optimisticEntry: LeaderboardItem = {
        rank: 0,
        id: data.completionId,
        userName: safeName,
        score: completed.score,
        totalQuestions: questions.length,
        percentage: completed.percentage,
        badgeEarned: completed.badge,
        timeTakenSeconds: timeElapsed,
      };

      setLeaderboard((current) => {
        const merged = [
          optimisticEntry,
          ...current.filter((entry) => entry.id !== optimisticEntry.id),
        ].sort((a, b) => {
          if (b.percentage !== a.percentage) return b.percentage - a.percentage;
          return (a.timeTakenSeconds || 999999) - (b.timeTakenSeconds || 999999);
        });

        return merged.slice(0, 10).map((entry, index) => ({
          ...entry,
          rank: index + 1,
        }));
      });
    } catch (error) {
      console.error(error);
      setSubmissionState("error");
    }
  };

  const handleNext = () => {
    setShowInsight(false);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((value) => value + 1);
      return;
    }

    setIsCompleted(true);
    void submitCompletion(answers);
  };

  const handleRestart = () => {
    setAnswers({});
    setShowInsight(false);
    setIsCompleted(false);
    setCurrentIdx(0);
    setTimeElapsed(0);
    setResult(null);
    setSubmissionState("idle");
  };

  const certificateName = name.trim() || "UpForge Builder";
  const percentage = result?.percentage ?? 0;

  if (!currentQuestion && !isCompleted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFFDF5] p-6">
        <p className="text-sm text-slate-500">No questions are available.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFDF5] px-4 py-8 text-slate-900 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            All challenges
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm">
            <Clock className="h-3.5 w-3.5 text-amber-600" />
            {Math.floor(timeElapsed / 60)}:
            {(timeElapsed % 60).toString().padStart(2, "0")}
          </div>
        </div>

        {!isCompleted ? (
          <section className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-[0_18px_55px_rgba(120,90,20,0.08)]">
            <div className="relative h-40 overflow-hidden sm:h-52">
              <Image
                src={quiz.image}
                alt={`${quiz.title} cover`}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white sm:left-8 sm:right-8">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-amber-200">
                    {quiz.category}
                  </p>
                  <h1 className="mt-1 text-xl font-black sm:text-3xl">
                    {quiz.title.split("|")[0].trim()}
                  </h1>
                </div>
                <span className="hidden rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur sm:inline-flex">
                  {quiz.duration}
                </span>
              </div>
            </div>

            <div className="space-y-7 p-5 sm:p-8">
              <div className="grid gap-4 rounded-2xl border border-amber-100 bg-amber-50/70 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-amber-800">
                    Certificate & leaderboard name
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Optional. If left blank, we use &quot;UpForge Builder&quot;.
                  </p>
                </div>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value.slice(0, 60))}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-amber-200 bg-white px-3.5 py-2.5 text-sm font-semibold outline-none ring-0 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 sm:w-64"
                  autoComplete="name"
                />
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between text-xs font-black uppercase tracking-wider text-amber-800">
                  <span>Question {currentIdx + 1}</span>
                  <span>
                    {currentIdx + 1} / {questions.length}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#F4C542] transition-all duration-300"
                    style={{
                      width: `${((currentIdx + 1) / questions.length) * 100}%`,
                    }}
                  />
                </div>

                <h2 className="mt-7 text-xl font-black leading-8 sm:text-2xl">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const selected = answers[currentIdx] === index;

                  return (
                    <button
                      key={`${currentQuestion.id}-${index}`}
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(index)}
                      className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left text-sm font-semibold transition ${
                        selected
                          ? "border-amber-400 bg-amber-50 text-slate-950 shadow-sm"
                          : "border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/40"
                      } ${hasAnswered ? "cursor-default" : ""}`}
                    >
                      <span>{option}</span>
                      {selected && (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showInsight && currentQuestion.explanation && (
                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm leading-6 text-slate-700">
                  <span className="font-black text-amber-800">Insight: </span>
                  {currentQuestion.explanation}
                </div>
              )}

              {hasAnswered && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                  >
                    {currentIdx + 1 === questions.length
                      ? "Finish & certify"
                      : "Next question"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="space-y-8">
            <div className="rounded-3xl border border-amber-100 bg-white p-6 text-center shadow-[0_18px_55px_rgba(120,90,20,0.08)] sm:p-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <Trophy className="h-8 w-8" />
              </div>

              <h1 className="mt-5 text-3xl font-black">
                Challenge completed
              </h1>

              {result ? (
                <>
                  <p className="mt-2 text-sm text-slate-600">
                    {result.score}/{questions.length} correct · {result.percentage}%
                  </p>
                  <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-black text-amber-900">
                    <Award className="h-4 w-4" />
                    {result.badge}
                  </div>
                </>
              ) : (
                <p className="mt-3 text-sm text-slate-500">
                  {submissionState === "submitting"
                    ? "Recording your verified result…"
                    : "Preparing your certificate…"}
                </p>
              )}

              {submissionState === "error" && (
                <div className="mx-auto mt-5 max-w-xl rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  We could not record the leaderboard result. Your answers remain
                  on this page; please retry the completion once.
                  <button
                    type="button"
                    onClick={() => void submitCompletion(answers)}
                    className="ml-2 font-black underline"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>

            {result && (
              <QuizCertificate
                name={certificateName}
                quizTitle={quiz.title.split("|")[0].trim()}
                category={quiz.category}
                score={result.score}
                total={questions.length}
                percentage={percentage}
                certificateId={result.certificateId}
              />
            )}

            <section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-amber-700">
                    Public results
                  </p>
                  <h2 className="mt-1 text-xl font-black">
                    {quiz.title.split("|")[0].trim()} leaderboard
                  </h2>
                </div>
                <Link
                  href={`/quiz/leaderboard?quiz=${encodeURIComponent(quiz.slug)}`}
                  className="text-xs font-black text-amber-800 underline underline-offset-4"
                >
                  Open full leaderboard
                </Link>
              </div>

              {leaderboard.length === 0 ? (
                <p className="py-6 text-center text-sm text-slate-500">
                  No leaderboard entries yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {leaderboard.slice(0, 10).map((entry) => (
                    <div
                      key={entry.id || `${entry.rank}-${entry.userName}`}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="w-7 text-center text-sm font-black text-amber-700">
                          #{entry.rank}
                        </span>
                        <span className="truncate text-sm font-bold text-slate-900">
                          {entry.userName}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 text-xs">
                        <span className="font-black text-slate-700">
                          {entry.score}/{entry.totalQuestions}
                        </span>
                        <span className="rounded-full bg-amber-100 px-2 py-1 font-bold text-amber-900">
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
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black text-slate-700"
              >
                <RotateCcw className="h-4 w-4" />
                Retake challenge
              </button>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-black text-white"
              >
                Explore other quizzes
              </Link>
            </div>
          </section>
        )}

        <QuizComments quizSlug={quiz.slug} />
      </div>
    </main>
  );
}
