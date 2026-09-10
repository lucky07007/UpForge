import Link from "next/link";
import Image from "next/image";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import { CheckCircle2, Clock, HelpCircle, Award, Trophy, MessageSquare, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startup Knowledge & Intelligence Benchmarks | UpForge Quiz",
  description: "Test your startup execution, funding, valuation, and legal knowledge against verified benchmarks.",
};

export default function QuizListPage() {
  return (
    <div className="min-h-screen bg-[#06080E] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold tracking-wide uppercase mb-4">
              Intelligence Certification
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-serif">
              UpForge Startup Benchmarks
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl font-sans">
              Rigorous, editorial knowledge checks for early-stage and growth founders. Pass with 70% to verify credentials.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#0D121F] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
              <Trophy className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Standard Passing Score</p>
                <p className="text-sm font-bold text-white">70% Minimum</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {QUIZ_REGISTRY.map((quiz: any) => {
            const summary = quiz.subtitle || quiz.description || "";
            return (
              <div
                key={quiz.id}
                className="bg-[#0B0F17] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all duration-300 shadow-xl group"
              >
                <div>
                  <div className="relative h-48 w-full bg-[#141A29]">
                    <Image
                      src={quiz.image}
                      alt={quiz.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-black/30" />
                    <span className="absolute top-3 left-3 bg-[#0B0F17]/80 backdrop-blur-md border border-white/10 text-xs px-2.5 py-1 rounded-md text-[#D4AF37] font-semibold">
                      {quiz.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white font-serif line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                      {quiz.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400 line-clamp-2 leading-relaxed">
                      {summary}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-300 border-t border-white/5 pt-4">
                      <div className="flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                        <span>{quiz.questionsCount || quiz.questions?.length} Questions</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>{quiz.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#D4AF37]" />
                        <span>Verified Cert</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Standard Mode
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" /> Peer Discussions
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/quiz/${quiz.slug}`}
                      className="flex-1 text-center py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Review Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/quiz/${quiz.slug}?start=true`}
                      className="flex-1 text-center py-2.5 px-4 rounded-xl text-xs font-semibold text-[#0B0F17] bg-gradient-to-r from-[#D4AF37] to-[#B38F27] hover:brightness-110 transition-all shadow-md shadow-[#D4AF37]/20"
                    >
                      Start Quiz
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
