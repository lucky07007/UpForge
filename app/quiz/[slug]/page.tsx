import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import { QuizDetailClient } from "./quiz-detail-client";
import { Clock, HelpCircle, Award, ShieldCheck, Zap, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return QUIZ_REGISTRY.map((q: any) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const quiz = QUIZ_REGISTRY.find((q: any) => q.slug === params.slug);
  if (!quiz) return { title: "Quiz Not Found | UpForge" };

  return {
    title: `${quiz.title} Benchmark | UpForge Startup Intelligence`,
    description: quiz.description,
    openGraph: {
      title: `${quiz.title} - UpForge Benchmark`,
      description: quiz.description,
      images: [{ url: quiz.image }],
    },
  };
}

export default function QuizDetailPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { start?: string };
}) {
  const quiz = QUIZ_REGISTRY.find((q: any) => q.slug === params.slug);
  if (!quiz) notFound();

  const autoStart = searchParams?.start === "true";

  return (
    <div className="min-h-screen bg-[#06080E] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Benchmarks</span>
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full">
            {quiz.category}
          </span>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0B0F17] shadow-2xl">
          <div className="relative h-64 sm:h-80 w-full">
            <Image
              src={quiz.image}
              alt={quiz.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/70 to-transparent" />
          </div>

          <div className="relative -mt-24 p-6 sm:p-10 space-y-4">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
              {quiz.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              {quiz.description}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>{quiz.questionsCount} Curated Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>{quiz.time} Limit</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>Certified at &ge; 70%</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Up to {quiz.questionsCount * 10} XP</span>
              </div>
            </div>
          </div>
        </div>

        <QuizDetailClient quiz={quiz} autoStart={autoStart} />
      </div>
    </div>
  );
}
