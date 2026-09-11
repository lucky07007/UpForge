import { NextRequest, NextResponse } from "next/server";
import { adminListDocuments } from "@/lib/firebase-admin";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const quizSlug = searchParams.get("quizSlug") || "startup-iq-challenge-2026";

    // Matches Firestore Rule: match /leaderboards/{quizId}/scores/{uid}
    const docs = await adminListDocuments(`leaderboards/${quizSlug}/scores`, 50);

    docs.sort((a: any, b: any) => {
      if ((b.percentage || 0) !== (a.percentage || 0)) {
        return (b.percentage || 0) - (a.percentage || 0);
      }
      return (a.timeTakenSeconds || 999) - (b.timeTakenSeconds || 999);
    });

    const leaderboard = docs.slice(0, 10).map((entry: any, index: number) => ({
      rank: index + 1,
      id: entry.id,
      userName: entry.userName || "Founder",
      score: entry.score ?? 0,
      totalQuestions: entry.totalQuestions ?? 10,
      percentage: entry.percentage ?? 0,
      badgeEarned: entry.badgeEarned || "Emerging Founder",
    }));

    return NextResponse.json({ success: true, leaderboard });
  } catch (error: any) {
    console.error("Leaderboard fetch error:", error);
    return NextResponse.json({ success: true, leaderboard: [] });
  }
}
