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

  // Never send the answer key to the browser.
  const cleanQuiz = {
    slug: quiz.slug,
    title: quiz.title,
    description: quiz.description ?? "",
    category: quiz.category,
    duration: quiz.duration || quiz.time || "3–5 Minutes",
    badge: quiz.badge,
    credentialTier: quiz.metrics?.credentialTier || "UpForge Credential",
    image: quiz.image,
    questions: (quiz.questions || []).map((question) => ({
      id: question.id,
      question: question.question,
      options: question.options,
      explanation: question.explanation,
    })),
  };

  return <QuizDetailClient quiz={cleanQuiz} />;
}

