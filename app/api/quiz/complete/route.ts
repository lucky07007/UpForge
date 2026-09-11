import { NextRequest, NextResponse } from "next/server";
import { adminAddDocument } from "@/lib/firebase-admin";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      quizSlug,
      score,
      totalQuestions,
      percentage,
      timeTakenSeconds,
      userName,
      userEmail,
      badgeEarned,
    } = body;

    if (!quizSlug || score === undefined || !totalQuestions) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const uid = "user_" + Math.random().toString(36).substring(2, 10);
    const scoreData = {
      uid,
      userName: String(userName || "Founder"),
      userEmail: String(userEmail || ""),
      score: Number(score),
      totalQuestions: Number(totalQuestions),
      percentage: Number(percentage || Math.round((score / totalQuestions) * 100)),
      timeTakenSeconds: Number(timeTakenSeconds || 0),
      badgeEarned: String(badgeEarned || "Emerging Founder"),
      completedAt: new Date().toISOString(),
    };

    // Matches Firestore Rule: match /leaderboards/{quizId}/scores/{uid}
    const doc = await adminAddDocument(`leaderboards/${quizSlug}/scores`, scoreData, uid);

    return NextResponse.json({ success: true, completionId: doc?.id || uid, record: scoreData });
  } catch (error: any) {
    console.error("Score submission error:", error);
    return NextResponse.json({ error: error.message || "Failed to record score" }, { status: 500 });
  }
}
