import React from "react";
import { notFound } from "next/navigation";
import { QUIZ_LIST } from "@/lib/quizData";
import QuizDetailClient from "./quiz-detail-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return QUIZ_LIST.map((quiz) => ({
    slug: quiz.slug,
  }));
}

export default async function QuizDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const quiz = QUIZ_LIST.find((q) => q.slug === resolvedParams.slug);

  if (!quiz) {
    notFound();
  }

  return <QuizDetailClient quiz={quiz} />;
}
