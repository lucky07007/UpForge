import { NextRequest, NextResponse } from "next/server";
import { adminListDocuments } from "@/lib/firebase-admin";

export const runtime = "edge";

const CACHE_SECONDS = 30;

function sortLeaderboard(a: any, b: any) {
  if ((b.percentage || 0) !== (a.percentage || 0)) {
    return (b.percentage || 0) - (a.percentage || 0);
  }
  return (a.timeTakenSeconds || 999999) - (b.timeTakenSeconds || 999999);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const quizSlug = (searchParams.get("quizSlug") || "").trim();

    if (!quizSlug || !/^[a-z0-9-]{3,100}$/.test(quizSlug)) {
      return NextResponse.json({ error: "Invalid quiz" }, { status: 400 });
    }

    const docs = await adminListDocuments(
      `leaderboards/${quizSlug}/scores`,
      50
    );

    const leaderboard = docs
      .sort(sortLeaderboard)
      .slice(0, 10)
      .map((entry: any, index: number) => ({
        rank: index + 1,
        id: entry.id,
        userName: entry.userName || "UpForge Builder",
        score: Number(entry.score || 0),
        totalQuestions: Number(entry.totalQuestions || 0),
        percentage: Number(entry.percentage || 0),
        badgeEarned: entry.badgeEarned || "UpForge Learner",
        timeTakenSeconds: Number(entry.timeTakenSeconds || 0),
      }));

    return NextResponse.json(
      { success: true, leaderboard },
      {
        headers: {
          // Browser may revalidate, while Cloudflare can serve the cached edge
          // copy for 30s and stale data for another 2 minutes.
          "Cache-Control":
            `public, max-age=0, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=120`,
          "CDN-Cache-Control":
            `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=120`,
          Vary: "Accept-Encoding",
        },
      }
    );
  } catch (error) {
    console.error("Leaderboard fetch error:", error);
    return NextResponse.json(
      { success: true, leaderboard: [] },
      {
        headers: {
          "Cache-Control": "public, s-maxage=15, stale-while-revalidate=60",
        },
      }
    );
  }
}
