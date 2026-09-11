import React from "react";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import LeaderboardClient from "./leaderboard-client";

export const metadata = {
  title: "UpForge Public Quiz Leaderboards",
  description:
    "Public UpForge quiz rankings for startup, marketing, career, fundraising and AI challenges.",
};

export default function QuizLeaderboardPage() {
  const quizzes = QUIZ_REGISTRY.map((quiz) => ({
    slug: quiz.slug,
    title: quiz.title.split("|")[0].trim(),
    category: quiz.category,
  }));

  return <LeaderboardClient quizzes={quizzes} />;
}

