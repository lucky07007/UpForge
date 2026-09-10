import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, HelpCircle, Award } from "lucide-react";
import { getQuizBySlug, getAllQuizzes } from "@/lib/quizData";
import { QuizDetailClient } from "./quiz-detail-client";

interface QuizPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const quizzes = getAllQuizzes();
  return quizzes.map((q) => ({
    slug: q.slug,
  }));
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { slug } = await params;
  const quiz = getQuizBySlug(slug);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 mb-6">
        <Link
          href="/quiz"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Quizzes
        </Link>
      </div>

      <QuizDetailClient quiz={quiz} />
    </div>
  );
}
