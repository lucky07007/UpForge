import { NextRequest, NextResponse } from "next/server";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import { adminListDocuments } from "@/lib/firebase-admin";

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
  quizSlug?: string;
  quizTitle?: string;
};

type CachedLeaderboard = {
  leaderboard: LeaderboardEntry[];
  expiresAt: number;
};

const memoryCache = new Map<string, CachedLeaderboard>();
const CACHE_TTL_MS = 20_000;
const TODAY = () => new Date().toISOString().slice(0, 10);

function response(
  data: Record<string, unknown>,
  status = 200,
  browserCache = "public, max-age=15, stale-while-revalidate=60, stale-if-error=600",
  edgeCache = "public, max-age=30, stale-while-revalidate=120, stale-if-error=600",
) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": browserCache,
      "CDN-Cache-Control": edgeCache,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function noStoreResponse(data: Record<string, unknown>, status = 200) {
  return response(data, status, "no-store, max-age=0", "no-store, max-age=0");
}

function sanitize(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
}

function isValidQuizSlug(slug: string) {
  return QUIZ_REGISTRY.some((quiz) => quiz.slug === slug || quiz.id === slug);
}

function quizMeta(slug: string) {
  const quiz = QUIZ_REGISTRY.find((item) => item.slug === slug || item.id === slug);
  return quiz
    ? { slug: quiz.slug, title: quiz.title.split("|")[0].trim(), category: quiz.category }
    : null;
}

function toNumber(value: unknown, fallback = 0) {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeEntry(
  raw: Record<string, unknown>,
  idFromDoc?: string,
  fallbackQuizSlug?: string,
): LeaderboardEntry | null {
  const id = String(raw.id ?? idFromDoc ?? "").slice(0, 160);
  const userName = String(raw.userName ?? raw.name ?? "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 100);
  const score = Math.max(0, Math.floor(toNumber(raw.score)));
  const totalQuestions = Math.max(1, Math.floor(toNumber(raw.totalQuestions, 1)));
  const percentage = Math.min(
    100,
    Math.max(0, Math.round(toNumber(raw.percentage, (score / totalQuestions) * 100))),
  );
  const badgeEarned = String(raw.badgeEarned ?? raw.badge ?? "").slice(0, 100);
  const timeTakenSeconds = Math.max(0, Math.floor(toNumber(raw.timeTakenSeconds)));
  const completedAt = String(raw.completedAt ?? "").slice(0, 100);
  const quizSlug = String(raw.quizSlug ?? fallbackQuizSlug ?? "");

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
    quizSlug: quizSlug || undefined,
    quizTitle: quizSlug ? quizMeta(quizSlug)?.title : undefined,
  };
}

function rankEntries(entries: LeaderboardEntry[]) {
  return entries
    .sort((a, b) => {
      if (b.percentage !== a.percentage) return b.percentage - a.percentage;
      if (b.score !== a.score) return b.score - a.score;
      if (a.timeTakenSeconds !== b.timeTakenSeconds) return a.timeTakenSeconds - b.timeTakenSeconds;
      return a.id.localeCompare(b.id);
    })
    .slice(0, 10)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}

async function readCollection(collectionPath: string, quizSlug?: string) {
  const documents = await adminListDocuments(collectionPath, 10);
  return documents
    .map((document: any) => normalizeEntry(document, document?.id, quizSlug))
    .filter((entry: LeaderboardEntry | null): entry is LeaderboardEntry => Boolean(entry));
}

async function getLeaderboard(quizSlug: string, period: "daily" | "all-time", dateKey: string) {
  const collectionPath =
    period === "daily"
      ? `leaderboards/${quizSlug}/daily/${dateKey}/scores`
      : `leaderboards/${quizSlug}/scores`;

  return rankEntries(await readCollection(collectionPath, quizSlug));
}

async function getGlobalLeaderboard(period: "daily" | "all-time", dateKey: string) {
  const results = await Promise.all(
    QUIZ_REGISTRY.map((quiz) =>
      getLeaderboard(quiz.slug, period, dateKey).catch((error) => {
        console.error(`[quiz/leaderboard] global ${quiz.slug} failed:`, error);
        return [] as LeaderboardEntry[];
      }),
    ),
  );

  return rankEntries(results.flat());
}

export async function GET(request: NextRequest) {
  const rawSlug =
    request.nextUrl.searchParams.get("quizSlug") ??
    request.nextUrl.searchParams.get("quiz") ??
    request.nextUrl.searchParams.get("slug") ??
    "";
  const quizSlug = sanitize(rawSlug);
  const scope = request.nextUrl.searchParams.get("scope") === "global" ? "global" : "quiz";
  const period = request.nextUrl.searchParams.get("period") === "daily" ? "daily" : "all-time";
  const requestedDate = sanitize(request.nextUrl.searchParams.get("date") ?? "");
  const dateKey = /^\d{4}-\d{2}-\d{2}$/.test(requestedDate) ? requestedDate : TODAY();

  if (scope === "quiz" && !quizSlug) {
    return noStoreResponse({ success: false, error: "Quiz slug is required.", leaderboard: [] }, 400);
  }

  if (scope === "quiz" && !isValidQuizSlug(quizSlug)) {
    return noStoreResponse({ success: false, error: "Quiz not found.", leaderboard: [] }, 404);
  }

  const cacheKey = `${scope}:${quizSlug || "global"}:${period}:${dateKey}`;
  const now = Date.now();
  const cached = memoryCache.get(cacheKey);
  if (cached && cached.expiresAt > now) {
    return response({
      success: true,
      leaderboard: cached.leaderboard,
      scope,
      period,
      date: period === "daily" ? dateKey : undefined,
      cached: true,
    });
  }

  try {
    const leaderboard =
      scope === "global"
        ? await getGlobalLeaderboard(period, dateKey)
        : await getLeaderboard(quizSlug, period, dateKey);

    memoryCache.set(cacheKey, { leaderboard, expiresAt: now + CACHE_TTL_MS });

    if (memoryCache.size > 200) {
      const firstKey = memoryCache.keys().next().value;
      if (typeof firstKey === "string") memoryCache.delete(firstKey);
    }

    return response({
      success: true,
      leaderboard,
      scope,
      period,
      date: period === "daily" ? dateKey : undefined,
      cached: false,
    });
  } catch (error) {
    console.error("[quiz/leaderboard] GET failed:", error);

    const stale = memoryCache.get(cacheKey);
    if (stale) {
      return response({
        success: true,
        leaderboard: stale.leaderboard,
        scope,
        period,
        date: period === "daily" ? dateKey : undefined,
        stale: true,
      });
    }

    return response(
      { success: false, error: "Leaderboard temporarily unavailable.", leaderboard: [] },
      503,
    );
  }
}
