import { NextRequest, NextResponse } from "next/server";
import { firestoreAddDocument } from "@/lib/firebase-admin";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      quizSlug,
      quizTitle,
      score,
      totalQuestions,
      percentage,
      timeTakenSeconds,
      userName,
      userEmail,
      badgeEarned,
    } = body;

    if (!quizSlug || score === undefined || !totalQuestions) {
      return NextResponse.json({ error: "Missing required quiz result data" }, { status: 400 });
    }

    const record = {
      quizSlug: String(quizSlug),
      quizTitle: String(quizTitle || quizSlug),
      score: Number(score),
      totalQuestions: Number(totalQuestions),
      percentage: Number(percentage || Math.round((score / totalQuestions) * 100)),
      timeTakenSeconds: Number(timeTakenSeconds || 0),
      userName: String(userName || "Anonymous Founder"),
      userEmail: String(userEmail || ""),
      badgeEarned: String(badgeEarned || "Participant"),
      completedAt: new Date().toISOString(),
    };

    const doc = await firestoreAddDocument("quiz_completions", record);

    return NextResponse.json({ success: true, completionId: doc?.id || "recorded", record });
  } catch (error: any) {
    console.error("Quiz complete submission error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
