import { NextRequest, NextResponse } from "next/server";
import { firestoreListDocuments } from "@/lib/firebase-admin";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const quizSlug = searchParams.get("quizSlug");

    const docs = await firestoreListDocuments("quiz_completions", 100);

    let filtered = docs;
    if (quizSlug) {
      filtered = docs.filter((item: any) => item.quizSlug === quizSlug);
    }

    filtered.sort((a: any, b: any) => {
      if ((b.percentage || 0) !== (a.percentage || 0)) {
        return (b.percentage || 0) - (a.percentage || 0);
      }
      return (a.timeTakenSeconds || 999) - (b.timeTakenSeconds || 999);
    });

    const leaderboard = filtered.slice(0, 20).map((entry: any, index: number) => ({
      rank: index + 1,
      id: entry.id,
      userName: entry.userName || "Anonymous Founder",
      score: entry.score ?? 0,
      totalQuestions: entry.totalQuestions ?? 10,
      percentage: entry.percentage ?? 0,
      timeTakenSeconds: entry.timeTakenSeconds ?? 0,
      badgeEarned: entry.badgeEarned || "Participant",
      completedAt: entry.completedAt || entry.createTime,
    }));

    return NextResponse.json({ success: true, count: leaderboard.length, leaderboard });
  } catch (error: any) {
    console.error("Leaderboard fetch error:", error);
    return NextResponse.json({ success: true, count: 0, leaderboard: [] });
  }
}
