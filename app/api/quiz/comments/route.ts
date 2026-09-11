import { NextRequest, NextResponse } from "next/server";
import { firestoreAddDocument, firestoreListDocuments } from "@/lib/firebase-admin";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const quizSlug = searchParams.get("quizSlug");

    const docs = await firestoreListDocuments("quiz_comments", 80);

    let filtered = docs;
    if (quizSlug) {
      filtered = docs.filter((c: any) => c.quizSlug === quizSlug);
    }

    filtered.sort((a: any, b: any) => {
      const timeA = new Date(a.createdAt || a.createTime || 0).getTime();
      const timeB = new Date(b.createdAt || b.createTime || 0).getTime();
      return timeB - timeA;
    });

    return NextResponse.json({ success: true, comments: filtered });
  } catch (error: any) {
    console.error("Fetch comments error:", error);
    return NextResponse.json({ success: true, comments: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { quizSlug, author, comment, userRole } = body;

    if (!quizSlug || !comment?.trim() || !author?.trim()) {
      return NextResponse.json({ error: "quizSlug, author, and comment are required" }, { status: 400 });
    }

    const payload = {
      quizSlug: String(quizSlug),
      author: String(author).slice(0, 50),
      comment: String(comment).slice(0, 500),
      userRole: String(userRole || "Founder"),
      createdAt: new Date().toISOString(),
      upvotes: 0,
    };

    const doc = await firestoreAddDocument("quiz_comments", payload);

    return NextResponse.json({ success: true, comment: doc });
  } catch (error: any) {
    console.error("Post comment error:", error);
    return NextResponse.json({ error: error.message || "Failed to post comment" }, { status: 500 });
  }
}
