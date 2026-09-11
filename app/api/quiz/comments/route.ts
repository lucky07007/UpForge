import { NextRequest, NextResponse } from "next/server";
import { adminAddDocument, adminListDocuments } from "@/lib/firebase-admin";

export const runtime = "edge";

const CACHE_SECONDS = 30;

// Keep this intentionally conservative: the goal is to block obvious abuse,
// not to police normal disagreement or strong opinions.
const ABUSIVE_TERMS = [
  "fuck",
  "fucking",
  "motherfucker",
  "bitch",
  "bastard",
  "asshole",
  "dickhead",
  "cocksucker",
  "nigger",
  "faggot",
  "chutiya",
  "madarchod",
  "bhenchod",
  "gandu",
  "harami",
];

function normalizeForModeration(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[@4]/g, "a")
    .replace(/[1!]/g, "i")
    .replace(/[$5]/g, "s")
    .replace(/[0]/g, "o")
    .replace(/[3]/g, "e")
    .replace(/[^a-z0-9]+/g, "");
}

function containsAbuse(value: string) {
  const normalized = normalizeForModeration(value);
  return ABUSIVE_TERMS.some((term) => normalized.includes(term));
}

function cleanText(value: unknown, max: number) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const quizSlug = (searchParams.get("quizSlug") || "").trim();

    if (!quizSlug || !/^[a-z0-9-]{3,100}$/.test(quizSlug)) {
      return NextResponse.json({ error: "Invalid quiz" }, { status: 400 });
    }

    const docs = await adminListDocuments(
      `comments/${quizSlug}/userComments`,
      50
    );

    const comments = docs
      .sort((a: any, b: any) => {
        return (
          new Date(b.createdAt || b.createTime || 0).getTime() -
          new Date(a.createdAt || a.createTime || 0).getTime()
        );
      })
      .slice(0, 50);

    return NextResponse.json(
      { success: true, comments },
      {
        headers: {
          "Cache-Control":
            `public, max-age=0, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=120`,
          "CDN-Cache-Control":
            `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=120`,
        },
      }
    );
  } catch (error) {
    console.error("Comments fetch error:", error);
    return NextResponse.json(
      { success: true, comments: [] },
      {
        headers: {
          "Cache-Control": "public, s-maxage=15, stale-while-revalidate=60",
        },
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const quizSlug = cleanText(body?.quizSlug, 100);
    const author = cleanText(body?.author, 60);
    const comment = cleanText(body?.comment, 600);
    const userRole = body?.userRole === "Founder" ? "Founder" : "Student";
    const company = cleanText(body?.company, 80);

    if (!quizSlug || !author || !comment) {
      return NextResponse.json(
        { error: "Name and comment are required." },
        { status: 400 }
      );
    }

    if (!/^[a-z0-9-]{3,100}$/.test(quizSlug)) {
      return NextResponse.json({ error: "Invalid quiz." }, { status: 400 });
    }

    if (userRole === "Founder" && !company) {
      return NextResponse.json(
        { error: "Founders must add their company name." },
        { status: 400 }
      );
    }

    if (containsAbuse(`${author} ${company} ${comment}`)) {
      // Reject before Firestore write: abusive content is never persisted.
      return NextResponse.json(
        { error: "Please keep the discussion respectful and useful." },
        { status: 422 }
      );
    }

    const payload = {
      quizSlug,
      author,
      comment,
      userRole,
      company: userRole === "Founder" ? company : "",
      createdAt: new Date().toISOString(),
      likesCount: 0,
    };

    const doc = await adminAddDocument(
      `comments/${quizSlug}/userComments`,
      payload
    );

    return NextResponse.json(
      {
        success: true,
        comment: {
          ...payload,
          id: doc?.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Post comment error:", error);
    return NextResponse.json(
      { error: "Could not post the community note." },
      { status: 500 }
    );
  }
}
