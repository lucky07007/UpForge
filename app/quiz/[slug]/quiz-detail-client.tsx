"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, Trophy, Clock, Award, RotateCcw } from "lucide-react";
import QuizComments from "@/components/quiz/quiz-comments";

export interface Question {
  id: string | number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizDetailData {
  slug: string;
  title: string;
  description?: string;
  category: string;
  questions: Question[];
}

interface LeaderboardItem {
  rank: number;
  userName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  badgeEarned: string;
}

export default function QuizDetailClient({ quiz }: { quiz: QuizDetailData }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [submittingResult, setSubmittingResult] = useState(false);
  const [founderName, setFounderName] = useState("");
  const [founderEmail, setFounderEmail] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);

  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  useEffect(() => {
    fetch(`/api/quiz/leaderboard?quizSlug=${encodeURIComponent(quiz.slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.leaderboard) setLeaderboard(data.leaderboard);
      })
      .catch(() => {});
  }, [quiz.slug, submissionSuccess]);

  const questions = quiz.questions || [];
  const currentQ = questions[currentIdx];
  const hasAnsweredCurrent = selectedAnswers[currentIdx] !== undefined;

  const handleSelectOption = (optIdx: number) => {
    if (hasAnsweredCurrent) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: optIdx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const score = questions.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.correctIndex ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / (questions.length || 1)) * 100);

  const getBadge = (pct: number) => {
    if (pct >= 90) return "Top 1% Founder Elite";
    if (pct >= 70) return "Growth Master";
    if (pct >= 50) return "Startup Operator";
    return "Emerging Founder";
  };

  const badge = getBadge(percentage);

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingResult(true);
    try {
      const res = await fetch("/api/quiz/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizSlug: quiz.slug,
          quizTitle: quiz.title,
          score,
          totalQuestions: questions.length,
          percentage,
          timeTakenSeconds: timeElapsed,
          userName: founderName.trim() || "Founder",
          userEmail: founderEmail.trim(),
          badgeEarned: badge,
        }),
      });
      if (res.ok) {
        setSubmissionSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingResult(false);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
    setCurrentIdx(0);
    setTimeElapsed(0);
    setSubmissionSuccess(false);
  };

  if (!currentQ && !isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-sm text-zinc-500">No questions available in this challenge.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Challenges
          </Link>
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
            <Clock className="w-4 h-4 text-emerald-500" />
            <span>
              {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        {!isCompleted ? (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <span>{quiz.category}</span>
                <span>
                  Question {currentIdx + 1} of {questions.length}
                </span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 pt-2">
                {currentQ.question}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentIdx] === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyles = "border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 bg-white dark:bg-zinc-950";
                if (hasAnsweredCurrent) {
                  if (isCorrect) {
                    btnStyles = "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200";
                  } else if (isSelected) {
                    btnStyles = "border-red-500 bg-red-50/50 dark:bg-red-950/30 text-red-900 dark:text-red-200";
                  } else {
                    btnStyles = "border-zinc-200 dark:border-zinc-800 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={hasAnsweredCurrent}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${btnStyles}`}
                  >
                    <span>{option}</span>
                    {hasAnsweredCurrent && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
                    {hasAnsweredCurrent && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Insight: </span>
                <span>{currentQ.explanation}</span>
              </div>
            )}

            {hasAnsweredCurrent && (
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow transition-colors"
                >
                  {currentIdx + 1 === questions.length ? "Finish Assessment" : "Next Question"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                Challenge Completed!
              </h2>
              <p className="text-zinc-500 text-sm">
                You scored <span className="font-bold text-emerald-600 dark:text-emerald-400">{score}</span> out of{" "}
                <span className="font-bold">{questions.length}</span> ({percentage}%)
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" /> {badge}
            </div>

            {!submissionSuccess ? (
              <form onSubmit={handleSubmitScore} className="max-w-md mx-auto space-y-3 text-left">
                <p className="text-xs text-zinc-500 text-center">
                  Claim your rank on the Verified Founder Leaderboard:
                </p>
                <input
                  type="text"
                  placeholder="Founder Name"
                  value={founderName}
                  onChange={(e) => setFounderName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  required
                />
                <input
                  type="email"
                  placeholder="Work Email"
                  value={founderEmail}
                  onChange={(e) => setFounderEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
                  required
                />
                <button
                  type="submit"
                  disabled={submittingResult}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  {submittingResult ? "Recording..." : "Submit to Leaderboard"}
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm font-medium">
                Verified! Your score has been added to the UpForge Leaderboard.
              </div>
            )}

            {leaderboard.length > 0 && (
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 text-left">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                  Live Leaderboard
                </h4>
                <div className="space-y-2">
                  {leaderboard.slice(0, 5).map((entry, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-600">#{entry.rank}</span>
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">
                          {entry.userName}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-zinc-500">
                        <span>{entry.score}/{entry.totalQuestions} ({entry.percentage}%)</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">
                          {entry.badgeEarned}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Challenge
              </button>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Explore Other Quizzes
              </Link>
            </div>
          </div>
        )}

        <QuizComments quizSlug={quiz.slug} />
      </div>
    </div>
  );
}
