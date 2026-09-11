import { NextRequest, NextResponse } from "next/server";
import { adminAddDocument } from "@/lib/firebase-admin";
import { QUIZ_REGISTRY } from "@/lib/quizData";

export const runtime = "edge";

function getBadge(percentage: number, credentialTier: string) {
  if (percentage >= 90) return "Founder Elite";
  if (percentage >= 70) return credentialTier || "UpForge Certified";
  if (percentage >= 50) return "UpForge Operator";
  return "UpForge Learner";
}

function cleanName(value: unknown) {
  return String(value || "UpForge Builder")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 60) || "UpForge Builder";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const quizSlug = String(body?.quizSlug || "");
    const quiz = QUIZ_REGISTRY.find((item) => item.slug === quizSlug);

    if (!quiz) {
      return NextResponse.json({ error: "Unknown quiz" }, { status: 404 });
    }

    const rawAnswers = body?.answers;
    if (!rawAnswers || typeof rawAnswers !== "object") {
      return NextResponse.json({ error: "Answers are required" }, { status: 400 });
    }

    const answers = Array.from({ length: quiz.questions.length }, (_, index) => {
      const value = rawAnswers[String(index)] ?? rawAnswers[index];
      return Number.isInteger(Number(value)) ? Number(value) : -1;
    });

    // Score is ALWAYS calculated from the server-side answer key.
    // Never trust score/percentage sent by the browser.
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctIndex) score += 1;
    });

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((score / Math.max(totalQuestions, 1)) * 100);
    const badgeEarned = getBadge(percentage, quiz.metrics.credentialTier);
    const userName = cleanName(body?.userName);
    const timeTakenSeconds = Math.max(
      0,
      Math.min(Number(body?.timeTakenSeconds || 0), 60 * 60)
    );

    const completionId =
      "q_" +
      crypto.randomUUID().replace(/-/g, "").slice(0, 24);

    const certificateId =
      "UPF-" +
      new Date().toISOString().slice(0, 10).replace(/-/g, "") +
      "-" +
      completionId.slice(-8).toUpperCase();

    const record = {
      uid: completionId,
      userName,
      score,
      totalQuestions,
      percentage,
      timeTakenSeconds,
      badgeEarned,
      certificateId,
      quizTitle: quiz.title,
      completedAt: new Date().toISOString(),
    };

    await adminAddDocument(
      `leaderboards/${quizSlug}/scores`,
      record,
      completionId
    );

    return NextResponse.json(
      {
        success: true,
        completionId,
        certificateId,
        score,
        totalQuestions,
        percentage,
        badgeEarned,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Quiz completion error:", error);
    return NextResponse.json(
      { error: "Could not record quiz completion." },
      { status: 500 }
    );
  }
}
