import React from "react";
import { notFound } from "next/navigation";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import QuizDetailClient from "./quiz-detail-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (QUIZ_REGISTRY || []).map((quiz) => ({ slug: quiz.slug }));
}

export default async function QuizDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const quiz = (QUIZ_REGISTRY || []).find((item) => item.slug === slug);

  if (!quiz) notFound();

  // IMPORTANT: correctIndex never goes to the browser.
  // The completion API calculates the final score server-side.
  const cleanQuiz = {
    slug: quiz.slug,
    title: quiz.title,
    description: quiz.description ?? "",
    category: quiz.category,
    image: quiz.image,
    duration: quiz.duration || quiz.time || "3–5 Minutes",
    badge: quiz.badge,
    credentialTier: quiz.metrics.credentialTier,
    questions: (quiz.questions || []).map((question) => ({
      id: question.id,
      question: question.question,
      options: question.options,
      explanation: question.explanation,
    })),
  };

  return <QuizDetailClient quiz={cleanQuiz} />;
}
