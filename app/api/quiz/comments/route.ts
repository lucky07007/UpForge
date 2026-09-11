import { NextRequest, NextResponse } from "next/server";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import { adminAddDocument, adminListDocuments } from "@/lib/firebase-admin";
import { allowRateLimitedRequest, getClientIp } from "@/lib/quiz-rate-limit";

type CachedComments = {
  expiresAt: number;
  comments: any[];
};

const commentCache = new Map<string, CachedComments>();
const CACHE_MS = 60_000;

const ABUSE_TERMS = [
  "fuck",
  "fucking",
  "motherfucker",
  "shit",
  "bitch",
  "bastard",
  "asshole",
  "dumbass",
  "stfu",
  "chutiya",
  "chutia",
  "madarchod",
  "madharchod",
  "bhenchod",
  "behenchod",
  "bc",
  "mc",
  "gandu",
  "gaand",
  "harami",
  "kamina",
  "kamine",
];

function publicJson(data: unknown, status = 200) {
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

function noStoreJson(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

function normalizeForModeration(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[@4]/g, "a")
    .replace(/[3]/g, "e")
    .replace(/[1!|]/g, "i")
    .replace(/[0]/g, "o")
    .replace(/[5$]/g, "s")
    .replace(/[7]/g, "t")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsAbuse(value: string) {
  const normalized = normalizeForModeration(value);

  return ABUSE_TERMS.some((term) => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(?:^|\\s)${escaped}(?:$|\\s)`, "i").test(
      normalized
    );
  });
}

function cleanText(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export async function GET(req: NextRequest) {
  const quizSlug =
    new URL(req.url).searchParams.get("quizSlug") ||
    "startup-iq-challenge-2026";

  if (!QUIZ_REGISTRY.some((quiz) => quiz.slug === quizSlug)) {
    return publicJson({ success: false, comments: [], error: "Quiz not found." }, 404);
  }

  const cached = commentCache.get(quizSlug);
  if (cached && cached.expiresAt > Date.now()) {
    return publicJson({ success: true, comments: cached.comments });
  }

  try {
    const docs = await adminListDocuments(
      `comments/${quizSlug}/userComments`,
      100
    );

    docs.sort((a: any, b: any) => {
      return (
        new Date(b?.createdAt || b?.createTime || 0).getTime() -
        new Date(a?.createdAt || a?.createTime || 0).getTime()
      );
    });

    const comments = docs.slice(0, 30);

    commentCache.set(quizSlug, {
      expiresAt: Date.now() + CACHE_MS,
      comments,
    });

    return publicJson({ success: true, comments });
  } catch (error) {
    console.error("Comments fetch error:", error);

    const stale = commentCache.get(quizSlug);
    if (stale) {
      return publicJson({
        success: true,
        comments: stale.comments,
        stale: true,
      });
    }

    return publicJson(
      {
        success: false,
        comments: [],
        error: "Community is temporarily unavailable.",
      },
      503
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (contentLength > 16 * 1024) {
      return noStoreJson({ success: false, error: "Request is too large." }, 413);
    }

    const rate = allowRateLimitedRequest(`comment:${getClientIp(req)}`, 10);
    if (!rate.allowed) {
      const response = noStoreJson(
        { success: false, error: "Too many posts. Please try again shortly." },
        429
      );
      response.headers.set("Retry-After", String(rate.retryAfterSeconds));
      return response;
    }

    const body = await req.json();

    if (String(body?.website || "").trim()) {
      return noStoreJson({ success: false, error: "Invalid submission." }, 400);
    }

    const quizSlug = cleanText(body?.quizSlug, 100);
    const author = cleanText(body?.author, 50);
    const userRole = cleanText(body?.userRole, 20);
    const company = cleanText(body?.company, 80);
    const comment = cleanText(body?.comment, 500);

    if (!QUIZ_REGISTRY.some((quiz) => quiz.slug === quizSlug)) {
      return noStoreJson({ success: false, error: "Quiz not found." }, 404);
    }

    if (!author || !comment) {
      return noStoreJson(
        { success: false, error: "Name and comment are required." },
        400
      );
    }

    if (!["Founder", "Student"].includes(userRole)) {
      return noStoreJson(
        { success: false, error: "Please select Founder or Student." },
        400
      );
    }

    if (userRole === "Founder" && !company) {
      return noStoreJson(
        { success: false, error: "Company name is required for founders." },
        400
      );
    }

    if (containsAbuse(author) || containsAbuse(company) || containsAbuse(comment)) {
      return noStoreJson(
        {
          success: false,
          error: "Please remove abusive language and try again.",
        },
        400
      );
    }

    const payload = {
      author,
      comment,
      userRole,
      company: userRole === "Founder" ? company : "",
      displayRole:
        userRole === "Founder" ? `Founder @ ${company}` : "Student",
      createdAt: new Date().toISOString(),
      likesCount: 0,
    };

    // Reverse timestamp IDs keep newest comments near the beginning of Firestore
    // document-name ordering, so the public feed does not have to scan the whole collection.
    const reverseTimestamp = String(9_999_999_999_999 - Date.now()).padStart(13, "0");
    const entropy =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID().replace(/-/g, "").slice(0, 12)
        : Math.random().toString(36).slice(2, 14);
    const commentId = `c_${reverseTimestamp}_${entropy}`;

    const doc = await adminAddDocument(
      `comments/${quizSlug}/userComments`,
      payload,
      commentId
    );

    // Make the next GET hit Firebase once so the new comment becomes visible.
    commentCache.delete(quizSlug);

    return noStoreJson(
      {
        success: true,
        comment: {
          ...(doc || {}),
          ...payload,
        },
      },
      201
    );
  } catch (error) {
    console.error("Post comment error:", error);

    return noStoreJson(
      {
        success: false,
        error: "Could not post your insight right now. Please try again.",
      },
      500
    );
  }
}

