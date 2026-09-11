import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Trophy } from "lucide-react";
import { QUIZ_REGISTRY } from "@/lib/quizData";

export const metadata = {
  title: "UpForge Challenges | Startup, Marketing, Career & Fundraising IQ",
  description:
    "Take practical UpForge challenges, receive a completion certificate and appear automatically on the public leaderboard.",
};

export default function QuizIndexPage() {
  const quizzes = QUIZ_REGISTRY || [];

  return (
    <main className="min-h-screen bg-[#FFFDF5] px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-[1300px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">
              UpForge Assessment
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Challenges built for builders
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Complete a challenge, get your UpForge certificate and have your
              result added automatically to the public leaderboard.
            </p>
          </div>

          <Link
            href="/quiz/leaderboard"
            className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-black text-slate-900 shadow-sm transition hover:border-amber-400"
          >
            <Trophy className="h-4 w-4 text-amber-600" />
            Public Leaderboards
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {quizzes.map((quiz) => (
            <article
              key={quiz.slug}
              className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Link href={`/quiz/${quiz.slug}`} className="block">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={quiz.image}
                    alt={quiz.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-500 hover:scale-[1.015]"
                    unoptimized
                  />
                </div>
              </Link>

              <div className="flex min-h-[230px] flex-col p-6">
                <div className="flex items-center justify-between gap-3 text-xs font-black uppercase tracking-wide text-amber-700">
                  <span>{quiz.category}</span>
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    {quiz.duration || quiz.time || "3–5 Minutes"}
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-black leading-tight text-slate-950">
                  {quiz.title.split("|")[0].trim()}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                  {quiz.description}
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                  <span className="text-xs font-bold text-slate-500">
                    {quiz.questions.length} questions · Certificate
                  </span>
                  <Link
                    href={`/quiz/${quiz.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#F4C542] px-4 py-2.5 text-xs font-black text-slate-950 transition hover:bg-[#E9B72F]"
                  >
                    Start Challenge
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

