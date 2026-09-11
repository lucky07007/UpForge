import { NextRequest, NextResponse } from "next/server";
import { adminListDocuments } from "@/lib/firebase-admin";
import { QUIZ_REGISTRY } from "@/lib/quizData";

type LeaderboardEntry = {
  uid: string;
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  badge: string;
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
  cacheControl = "public, max-age=30, stale-while-revalidate=120, stale-if-error=600",
) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": cacheControl,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function noStoreResponse(
  data: Record<string, unknown>,
  status = 200,
) {
  return response(
    data,
    status,
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
}

function sanitizeQuizSlug(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
}

function sanitizeEntry(
  raw: Record<string, unknown>,
): LeaderboardEntry | null {
  const uid = typeof raw.uid === "string" ? raw.uid.slice(0, 128) : "";
  const name = typeof raw.name === "string" ? raw.name.slice(0, 100) : "";

  const score =
    typeof raw.score === "number" && Number.isFinite(raw.score)
      ? Math.max(0, Math.floor(raw.score))
      : 0;

  const totalQuestions =
    typeof raw.totalQuestions === "number" &&
    Number.isFinite(raw.totalQuestions)
      ? Math.max(1, Math.floor(raw.totalQuestions))
      : 1;

  const percentage =
    typeof raw.percentage === "number" && Number.isFinite(raw.percentage)
      ? Math.min(100, Math.max(0, Math.round(raw.percentage)))
      : Math.round((score / totalQuestions) * 100);

  const badge =
    typeof raw.badge === "string" ? raw.badge.slice(0, 100) : "";

  const timeTakenSeconds =
    typeof raw.timeTakenSeconds === "number" &&
    Number.isFinite(raw.timeTakenSeconds)
      ? Math.max(0, Math.floor(raw.timeTakenSeconds))
      : 0;

  const completedAt =
    typeof raw.completedAt === "string"
      ? raw.completedAt.slice(0, 100)
      : "";

  if (!uid || !name) {
    return null;
  }

  return {
    uid,
    name,
    score,
    totalQuestions,
    percentage,
    badge,
    timeTakenSeconds,
    completedAt,
  };
}

export async function GET(
  request: NextRequest,
) {
  try {
    const rawSlug =
      request.nextUrl.searchParams.get("quiz") ??
      request.nextUrl.searchParams.get("slug") ??
      "";

    const quizSlug = sanitizeQuizSlug(rawSlug);

    if (!quizSlug) {
      return noStoreResponse(
        {
          success: false,
          error: "Quiz slug is required.",
        },
        400,
      );
    }

    if (!QUIZ_REGISTRY[quizSlug]) {
      return noStoreResponse(
        {
          success: false,
          error: "Quiz not found.",
        },
        404,
      );
    }

    const now = Date.now();
    const cached = memoryCache.get(quizSlug);

    if (cached && cached.expiresAt > now) {
      return response({
        success: true,
        leaderboard: cached.leaderboard,
        cached: true,
      });
    }

    /*
     * Completion documents use a sortable ID:
     *
     *   ufc_<percentage-rank>_<score-rank>_<time-rank>_<attemptId>
     *
     * Firestore documents.list defaults to __name__ ASC when no orderBy
     * is supplied. Therefore the first 10 documents are the best scores.
     *
     * This avoids reading the entire leaderboard collection.
     */
    const documents = await adminListDocuments(
      `leaderboards/${quizSlug}/scores`,
      10,
    );

    const leaderboard: LeaderboardEntry[] = [];

    for (const document of documents) {
      const rawFields =
        document &&
        typeof document === "object" &&
        "fields" in document
          ? (document as { fields?: Record<string, unknown> }).fields
          : undefined;

      if (!rawFields) {
        continue;
      }

      /*
       * Firestore REST values can be returned as typed wrappers
       * such as { stringValue: "..." } or { integerValue: "..." }.
       * Handle both wrapped and plain values.
       */
      const unwrap = (value: unknown): unknown => {
        if (!value || typeof value !== "object") {
          return value;
        }

        const objectValue = value as Record<string, unknown>;

        if ("stringValue" in objectValue) {
          return objectValue.stringValue;
        }

        if ("integerValue" in objectValue) {
          const number = Number(objectValue.integerValue);
          return Number.isFinite(number) ? number : 0;
        }

        if ("doubleValue" in objectValue) {
          const number = Number(objectValue.doubleValue);
          return Number.isFinite(number) ? number : 0;
        }

        if ("timestampValue" in objectValue) {
          return objectValue.timestampValue;
        }

        if ("booleanValue" in objectValue) {
          return objectValue.booleanValue;
        }

        return value;
      };

      const normalized: Record<string, unknown> = {};

      for (const [key, value] of Object.entries(rawFields)) {
        normalized[key] = unwrap(value);
      }

      const entry = sanitizeEntry(normalized);

      if (entry) {
        leaderboard.push(entry);
      }
    }

    const cacheEntry: CachedLeaderboard = {
      leaderboard,
      expiresAt: now + CACHE_TTL_MS,
    };

    memoryCache.set(quizSlug, cacheEntry);

    /*
     * Prevent unbounded growth if many random quiz slugs are requested.
     */
    if (memoryCache.size > 100) {
      const firstKey = memoryCache.keys().next().value;

      if (typeof firstKey === "string") {
        memoryCache.delete(firstKey);
      }
    }

    return response({
      success: true,
      leaderboard,
      cached: false,
    });
  } catch (error) {
    console.error("[quiz/leaderboard] GET failed:", error);

    /*
     * IMPORTANT:
     * Keep this fallback completely separate from the fresh-cache branch.
     *
     * This avoids the TypeScript `never` inference problem that caused
     * the Cloudflare build failure:
     *
     *   Property 'leaderboard' does not exist on type 'never'
     */
    const rawSlug =
      request.nextUrl.searchParams.get("quiz") ??
      request.nextUrl.searchParams.get("slug") ??
      "";

    const quizSlug = sanitizeQuizSlug(rawSlug);

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
        error: "Leaderboard temporarily unavailable.",
        leaderboard: [],
      },
      503,
      "public, max-age=5, stale-if-error=60",
    );
  }
}
