import React from "react";
import Link from "next/link";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import { Clock, ArrowRight, BrainCircuit } from "lucide-react";

export const metadata = {
  title: "Startup & Founder IQ Challenges | UpForge",
  description:
    "Test your startup intelligence, benchmark against verified Indian founders, and earn ecosystem credentials.",
};

export default function QuizIndexPage() {
  const quizzes = QUIZ_REGISTRY || [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <BrainCircuit className="w-3.5 h-3.5" /> Founder Intelligence Suite
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Startup & Founder IQ Challenges
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Assess your startup building readiness, fundraising metrics, and
            execution IQ. Benchmark against leading founders and earn verifiable
            badges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.slug}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-6 shadow-sm hover:border-emerald-500/60 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>{quiz.category}</span>
                  <span className="flex items-center gap-1 text-zinc-500">
                    <Clock className="w-3 h-3" /> {quiz.timeLimitMinutes || 5} min
                  </span>
                </div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {quiz.title}
                </h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3">
                  {quiz.description}
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/60 mt-6 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-medium">
                  {quiz.questions.length} Questions
                </span>
                <Link
                  href={`/quiz/${quiz.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  Start Assessment <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
