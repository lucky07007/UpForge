import React from "react";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import LeaderboardClient from "./leaderboard-client";

export const metadata = {
  title: "UpForge Quiz Leaderboards",
  description:
    "Public UpForge quiz leaderboards for startup, marketing, career, fundraising and AI challenges.",
};

export default function QuizLeaderboardPage() {
  // Only public metadata crosses into the client component.
  // Question answer keys never enter the leaderboard bundle.
  const quizzes = QUIZ_REGISTRY.map((quiz) => ({
    slug: quiz.slug,
    title: quiz.title.split("|")[0].trim(),
    category: quiz.category,
  }));

  return <LeaderboardClient quizzes={quizzes} />;
}
