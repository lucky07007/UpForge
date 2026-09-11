import { NextRequest, NextResponse } from "next/server";
import { adminListDocuments } from "@/lib/firebase-admin";
import { QUIZ_REGISTRY } from "@/lib/quizData";

type LeaderboardEntry = {
  rank: number;
  id: string;
  userName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  badgeEarned: string;
  timeTakenSeconds: number;
  completedAt: string;
};

type CachedLeaderboard = {
  leaderboard: LeaderboardEntry[];
  expiresAt: number;
};

const memoryCache = new Map<string, CachedLeaderboard>();
const CACHE_TTL_MS = 20_000;

function response(
  data: Record<string, unknown>,
  status = 200,
  cacheControl =
    "public, max-age=5, s-maxage=10, stale-while-revalidate=30, stale-if-error=120",
) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": cacheControl,
      "CDN-Cache-Control": cacheControl,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function noStoreResponse(data: Record<string, unknown>, status = 200) {
  return response(data, status, "no-store, max-age=0");
}

function sanitizeQuizSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "");
}

function isValidQuizSlug(slug: string) {
  return QUIZ_REGISTRY.some((quiz) => quiz.slug === slug || quiz.id === slug);
}

function toNumber(value: unknown, fallback = 0) {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeEntry(raw: Record<string, unknown>, idFromDoc?: string): LeaderboardEntry | null {
  const id = String(raw.id ?? idFromDoc ?? "").slice(0, 160);
  const userName = String(raw.userName ?? raw.name ?? "").replace(/[<>]/g, "").trim().slice(0, 100);
  const score = Math.max(0, Math.floor(toNumber(raw.score)));
  const totalQuestions = Math.max(1, Math.floor(toNumber(raw.totalQuestions, 1)));
  const percentage = Math.min(100, Math.max(0, Math.round(toNumber(raw.percentage, (score / totalQuestions) * 100))));
  const badgeEarned = String(raw.badgeEarned ?? raw.badge ?? "").slice(0, 100);
  const timeTakenSeconds = Math.max(0, Math.floor(toNumber(raw.timeTakenSeconds)));
  const completedAt = String(raw.completedAt ?? "").slice(0, 100);

  if (!id || !userName) return null;

  return {
    rank: 0,
    id,
    userName,
    score,
    totalQuestions,
    percentage,
    badgeEarned,
    timeTakenSeconds,
    completedAt,
  };
}

export async function GET(request: NextRequest) {
  const rawSlug =
    request.nextUrl.searchParams.get("quizSlug") ??
    request.nextUrl.searchParams.get("quiz") ??
    request.nextUrl.searchParams.get("slug") ??
    "";
  const quizSlug = sanitizeQuizSlug(rawSlug);

  if (!quizSlug) {
    return noStoreResponse({ success: false, error: "Quiz slug is required.", leaderboard: [] }, 400);
  }

  if (!isValidQuizSlug(quizSlug)) {
    return noStoreResponse({ success: false, error: "Quiz not found.", leaderboard: [] }, 404);
  }

  const now = Date.now();
  const cached = memoryCache.get(quizSlug);
  if (cached && cached.expiresAt > now) {
    return response({ success: true, leaderboard: cached.leaderboard, cached: true });
  }

  try {
    /*
     * Completion IDs are deliberately sortable:
     * ufc_<100-percentage>_<questions-score>_<time>_<attemptId>
     *
     * Firestore documents.list returns document names in ascending order when
     * no orderBy is supplied, so pageSize=10 gives the best 10 without scanning
     * the whole collection.
     */
    const documents = await adminListDocuments(`leaderboards/${quizSlug}/scores`, 10);
    const entries: LeaderboardEntry[] = documents
      .map((document: any) => normalizeEntry(document, document?.id))
      .filter((entry: LeaderboardEntry | null): entry is LeaderboardEntry => Boolean(entry));

    const leaderboard: LeaderboardEntry[] = entries
      .slice(0, 10)
      .map((entry: LeaderboardEntry, index: number) => ({ ...entry, rank: index + 1 }));

    memoryCache.set(quizSlug, {
      leaderboard,
      expiresAt: now + CACHE_TTL_MS,
    });

    if (memoryCache.size > 100) {
      const firstKey = memoryCache.keys().next().value;
      if (typeof firstKey === "string") memoryCache.delete(firstKey);
    }

    return response({ success: true, leaderboard, cached: false });
  } catch (error) {
    console.error("[quiz/leaderboard] GET failed:", error);

    const stale = memoryCache.get(quizSlug);
    if (stale) {
      return response({ success: true, leaderboard: stale.leaderboard, stale: true });
    }

    return response(
      { success: false, error: "Leaderboard temporarily unavailable.", leaderboard: [] },
      503,
      "public, max-age=5, s-maxage=5, stale-if-error=60",
    );
  }
}
