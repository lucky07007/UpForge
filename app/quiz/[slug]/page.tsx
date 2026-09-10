import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, HelpCircle, Award } from "lucide-react";
import { getQuizBySlug, getAllQuizzes, QuizItem } from "@/lib/quizData";
import { QuizDetailClient } from "./quiz-detail-client";

interface QuizPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const quizzes = getAllQuizzes();
  return quizzes.map((quiz) => ({
    slug: quiz.slug,
  }));
}

export async function generateMetadata({ params }: QuizPageProps) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);

  if (!quiz) {
    return {
      title: "Quiz Not Found | UpForge",
      description: "The requested startup assessment quiz could not be found.",
    };
  }

  return {
    title: `${quiz.title} | UpForge Startup Quiz`,
    description: quiz.tagline || quiz.title,
    openGraph: {
      title: quiz.title,
      description: quiz.tagline || quiz.title,
      type: "website",
    },
  };
}

export default async function QuizDetailPage({ params }: QuizPageProps) {
  const { slug } = await params;
  const quiz: QuizItem | undefined = getQuizBySlug(slug);

  if (!quiz) {
    notFound();
  }

  const categoryLabel = quiz.category || quiz.badge || "Startup Intelligence";
  const displayTime = quiz.time || quiz.duration || quiz.metrics?.avgCompletionTime || "3–5 Minutes";

  return (
    <div className="min-h-screen bg-[#07090E] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Quizzes
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full">
            {categoryLabel}
          </span>
        </div>

        <div className="mb-10 bg-neutral-900/60 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            {quiz.title}
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
            {quiz.tagline}
          </p>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-white/10 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-neutral-300">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>{displayTime}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>{quiz.questions.length} Scenarios</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>{quiz.metrics?.credentialTier || "Verified"}</span>
            </div>
          </div>
        </div>

 <QuizDetailClient quiz={{ ...quiz, time: displayTime }} autoStart={false} />
      </div>
    </div>
  );
}
