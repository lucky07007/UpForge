import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { getCurrentPeriodIds } from "@/lib/quiz-periods";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "global";
    const quizId = searchParams.get("quizId");
    const limitCount = Math.min(parseInt(searchParams.get("limit") || "10", 10), 50);

    const entries: Array<{
      uid: string;
      displayName: string;
      scoreOrXp: number;
      secondary?: string | number;
    }> = [];

    if (type === "quiz" && quizId) {
      const snap = await adminDb
        .collection("leaderboards")
        .doc(quizId)
        .collection("scores")
        .orderBy("bestScore", "desc")
        .limit(limitCount)
        .get();

      snap.forEach((doc) => {
        const data = doc.data();
        entries.push({
          uid: doc.id,
          displayName: data.displayName || "Founder",
          scoreOrXp: data.bestScore ?? 0,
          secondary: `${data.percentage ?? 0}%`,
        });
      });
    } else if (type === "weekly" || type === "monthly") {
      const { weeklyId, monthlyId } = getCurrentPeriodIds();
      const periodId = type === "weekly" ? weeklyId : monthlyId;

      const snap = await adminDb
        .collection("periodScores")
        .doc(periodId)
        .collection("users")
        .orderBy("xp", "desc")
        .limit(limitCount)
        .get();

      snap.forEach((doc) => {
        const data = doc.data();
        entries.push({
          uid: doc.id,
          displayName: data.displayName || "Founder",
          scoreOrXp: data.xp ?? 0,
          secondary: "XP",
        });
      });
    } else {
      // Global Leaderboard
      const snap = await adminDb
        .collection("users")
        .orderBy("totalXP", "desc")
        .limit(limitCount)
        .get();

      snap.forEach((doc) => {
        const data = doc.data();
        entries.push({
          uid: doc.id,
          displayName: data.displayName || "Founder",
          scoreOrXp: data.totalXP ?? 0,
          secondary: `${data.quizzesCompleted ?? 0} finished`,
        });
      });
    }

    return NextResponse.json({ success: true, type, entries });
  } catch (err: any) {
    console.error("Leaderboard query error:", err);
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
