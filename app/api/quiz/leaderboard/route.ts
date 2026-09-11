import { NextRequest, NextResponse } from "next/server";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import { adminListDocuments } from "@/lib/firebase-admin";

type LeaderboardItem = {
  rank: number;
  id?: string;
  userName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  badgeEarned: string;
  timeTakenSeconds: number;
};

const memoryCache = new Map<
  string,
  { expiresAt: number; leaderboard: LeaderboardItem[] }
>();

const CACHE_MS = 20_000;

function response(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control":
        "public, max-age=30, stale-while-revalidate=120, stale-if-error=600",
      "CDN-Cache-Control":
        "public, max-age=30, stale-while-revalidate=120, stale-if-error=600",
    },
  });
}

export async function GET(req: NextRequest) {
  const quizSlug =
    new URL(req.url).searchParams.get("quizSlug") ||
    "startup-iq-challenge-2026";

  if (!QUIZ_REGISTRY.some((quiz) => quiz.slug === quizSlug)) {
    return response(
      { success: false, leaderboard: [], error: "Quiz not found." },
      404
    );
  }

  const cached = memoryCache.get(quizSlug);
  if (cached && cached.expiresAt > Date.now()) {
    return response({ success: true, leaderboard: cached.leaderboard });
  }

  try {
    // One Firestore read per cache window per Worker isolate.
    const docs = await adminListDocuments(
      `leaderboards/${quizSlug}/scores`,
      10
    );

    // Completion document IDs are score-sorted, so Firestore returns the
    // best entries first without an expensive collection-wide read.
    const leaderboard = docs.slice(0, 10).map((entry: any, index: number) => ({
      rank: index + 1,
      id: entry.id,
      userName: String(entry.userName || "UpForge Builder"),
      score: Number(entry.score || 0),
      totalQuestions: Number(entry.totalQuestions || 10),
      percentage: Number(entry.percentage || 0),
      badgeEarned: String(entry.badgeEarned || "Emerging Founder"),
      timeTakenSeconds: Number(entry.timeTakenSeconds || 0),
    }));

    memoryCache.set(quizSlug, {
      expiresAt: Date.now() + CACHE_MS,
      leaderboard,
    });

    return response({ success: true, leaderboard });
  } catch (error) {
    console.error("Leaderboard fetch error:", error);

    // JSON even on failure — never let the browser try to parse a Cloudflare HTML error.
    const stale = memoryCache.get(quizSlug);
    if (stale) {
      return response({
        success: true,
        leaderboard: stale.leaderboard,
        stale: true,
      });
    }

    return response(
      {
        success: false,
        leaderboard: [],
        error: "Leaderboard is temporarily unavailable.",
      },
      503
    );
  }
}
