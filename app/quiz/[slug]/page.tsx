import React from "react";
import { notFound } from "next/navigation";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import QuizDetailClient from "./quiz-detail-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (QUIZ_REGISTRY || []).map((quiz) => ({
    slug: quiz.slug,
  }));
}

export default async function QuizDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const quiz = (QUIZ_REGISTRY || []).find(
    (q) => q.slug === resolvedParams.slug
  );

  if (!quiz) {
    notFound();
  }

  return <QuizDetailClient quiz={quiz} />;
}
