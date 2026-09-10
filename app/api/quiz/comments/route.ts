import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const quizId = searchParams.get("quizId");
    const parentId = searchParams.get("parentId");
    const limitCount = Math.min(parseInt(searchParams.get("limit") || "15", 10), 50);

    if (!quizId) {
      return NextResponse.json({ error: "quizId is required" }, { status: 400 });
    }

    if (parentId) {
      const repliesSnap = await adminDb
        .collection("comments")
        .doc(quizId)
        .collection("userComments")
        .doc(parentId)
        .collection("replies")
        .orderBy("createdAt", "asc")
        .limit(limitCount)
        .get();

      const replies = repliesSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toMillis() || Date.now(),
      }));

      return NextResponse.json({ success: true, replies });
    }

    const commentsSnap = await adminDb
      .collection("comments")
      .doc(quizId)
      .collection("userComments")
      .orderBy("createdAt", "desc")
      .limit(limitCount)
      .get();

    const comments = commentsSnap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toMillis() || Date.now(),
    }));

    return NextResponse.json({ success: true, comments });
  } catch (err: any) {
    console.error("Error reading comments:", err);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    const body = await req.json();
    const { quizId, parentId, text, action, commentId } = body;

    if (!quizId) {
      return NextResponse.json({ error: "quizId required" }, { status: 400 });
    }

    // Like / Unlike action
    if (action === "toggleLike") {
      if (!commentId) {
        return NextResponse.json({ error: "commentId required" }, { status: 400 });
      }

      const likeRef = adminDb
        .collection("comments")
        .doc(quizId)
        .collection("userComments")
        .doc(commentId)
        .collection("likes")
        .doc(uid);

      const commentRef = adminDb
        .collection("comments")
        .doc(quizId)
        .collection("userComments")
        .doc(commentId);

      let liked = false;

      await adminDb.runTransaction(async (t) => {
        const likeDoc = await t.get(likeRef);
        if (likeDoc.exists) {
          t.delete(likeRef);
          t.update(commentRef, { likesCount: FieldValue.increment(-1) });
          liked = false;
        } else {
          t.set(likeRef, { createdAt: FieldValue.serverTimestamp() });
          t.update(commentRef, { likesCount: FieldValue.increment(1) });
          liked = true;
        }
      });

      return NextResponse.json({ success: true, liked });
    }

    // Validation for new comments and replies
    if (!text || typeof text !== "string" || text.trim().length === 0 || text.length > 1000) {
      return NextResponse.json({ error: "Valid text (max 1000 chars) is required" }, { status: 400 });
    }

    const displayName = decodedToken.name || decodedToken.email?.split("@")[0] || "Founder";

    // Reply creation
    if (parentId) {
      const parentRef = adminDb
        .collection("comments")
        .doc(quizId)
        .collection("userComments")
        .doc(parentId);

      const replyRef = parentRef.collection("replies").doc();

      await adminDb.runTransaction(async (t) => {
        t.set(replyRef, {
          userId: uid,
          displayName,
          text: text.trim(),
          createdAt: FieldValue.serverTimestamp(),
        });
        t.update(parentRef, { replyCount: FieldValue.increment(1) });
      });

      return NextResponse.json({ success: true, replyId: replyRef.id });
    }

    // Top-level comment creation
    const commentRef = adminDb
      .collection("comments")
      .doc(quizId)
      .collection("userComments")
      .doc();

    await commentRef.set({
      userId: uid,
      displayName,
      text: text.trim(),
      likesCount: 0,
      replyCount: 0,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true, commentId: commentRef.id });
  } catch (err: any) {
    console.error("Error writing comment:", err);
    return NextResponse.json({ error: err.message || "Failed to submit" }, { status: 500 });
  }
}
