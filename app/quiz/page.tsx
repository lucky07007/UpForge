import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Clock, Trophy, Award } from "lucide-react";
import { QUIZ_REGISTRY } from "@/lib/quizData";

export const metadata = {
  title: "Startup & Founder IQ Challenges | UpForge",
  description:
    "Take practical startup, marketing, career, fundraising and AI challenges, earn a completion certificate and benchmark on the UpForge leaderboard.",
};

export default function QuizIndexPage() {
  const quizzes = QUIZ_REGISTRY || [];

  return (
    <main className="min-h-screen bg-[#FFFDF5] text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900">
            <BrainCircuit className="h-4 w-4" />
            UpForge IQ Challenges
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Test your thinking. Earn your UpForge credential.
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
            Practical quizzes for founders, students and builders. Finish any
            challenge, get your completion certificate and automatically enter
            that quiz&apos;s public leaderboard.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/quiz/leaderboard"
              className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-400"
            >
              <Trophy className="h-4 w-4 text-amber-600" />
              View Leaderboards
            </Link>
            <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600">
              <Award className="h-4 w-4 text-amber-600" />
              Certificate on completion
            </span>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <article
              key={quiz.slug}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-[0_10px_35px_rgba(120,90,20,0.07)] transition duration-200 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_18px_45px_rgba(120,90,20,0.12)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-amber-50">
                <Image
                  src={quiz.image}
                  alt={`${quiz.title} cover`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  priority={quiz === quizzes[0]}
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-[11px] font-black text-slate-900 shadow-sm">
                  {quiz.badge}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3 text-xs font-bold">
                  <span className="text-amber-700">{quiz.category}</span>
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    {quiz.duration || quiz.time || "3–5 Minutes"}
                  </span>
                </div>

                <h2 className="mt-3 text-lg font-black leading-6 text-slate-950">
                  {quiz.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-sm leading-5 text-slate-600">
                  {quiz.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold text-slate-500">
                    {quiz.questions.length} questions
                  </span>
                  <Link
                    href={`/quiz/${quiz.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#F4C542] px-3.5 py-2 text-xs font-black text-slate-950 transition hover:bg-[#EAB72F]"
                  >
                    Start challenge
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
