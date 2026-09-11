import { NextRequest, NextResponse } from "next/server";
import { adminAddDocument, adminListDocuments } from "@/lib/firebase-admin";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const quizSlug = searchParams.get("quizSlug") || "startup-iq-challenge-2026";

    // Matches Firestore Rule: match /comments/{quizId}/userComments/{commentId}
    const docs = await adminListDocuments(`comments/${quizSlug}/userComments`, 50);

    docs.sort((a: any, b: any) => {
      const timeA = new Date(a.createdAt || a.createTime || 0).getTime();
      const timeB = new Date(b.createdAt || b.createTime || 0).getTime();
      return timeB - timeA;
    });

    return NextResponse.json({ success: true, comments: docs });
  } catch (error: any) {
    console.error("Comments fetch error:", error);
    return NextResponse.json({ success: true, comments: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { quizSlug, author, comment, userRole } = body;

    if (!quizSlug || !comment?.trim() || !author?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const payload = {
      author: String(author).slice(0, 50),
      comment: String(comment).slice(0, 500),
      userRole: String(userRole || "Founder"),
      createdAt: new Date().toISOString(),
      likesCount: 0,
    };

    // Server-side write bypassing client "allow write: if false"
    const doc = await adminAddDocument(`comments/${quizSlug}/userComments`, payload);

    return NextResponse.json({ success: true, comment: doc });
  } catch (error: any) {
    console.error("Post comment error:", error);
    return NextResponse.json({ error: error.message || "Failed to post comment" }, { status: 500 });
  }
}
