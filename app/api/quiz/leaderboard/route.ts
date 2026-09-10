import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || "";

    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "upforge";
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`;

    const body = {
      structuredQuery: {
        from: [{ collectionId: "quiz_leaderboard" }],
        where: slug
          ? {
              fieldFilter: {
                field: { fieldPath: "quizSlug" },
                op: "EQUAL",
                value: { stringValue: slug },
              },
            }
          : undefined,
        orderBy: [{ field: { fieldPath: "score" }, direction: "DESCENDING" }],
        limit: 10,
      },
    };

    const res = await fetch(firestoreUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json({ success: true, leaderboard: [] });
    }

    const data = await res.json();
    const leaderboard = (Array.isArray(data) ? data : [])
      .filter((item: any) => item.document)
      .map((item: any) => {
        const fields = item.document.fields || {};
        return {
          id: item.document.name.split("/").pop(),
          userName: fields.userName?.stringValue || "Anonymous",
          score: Number(fields.score?.integerValue || 0),
          totalQuestions: Number(fields.totalQuestions?.integerValue || 10),
          quizSlug: fields.quizSlug?.stringValue || "",
        };
      });

    return NextResponse.json({ success: true, leaderboard });
  } catch (err: any) {
    return NextResponse.json({ success: false, leaderboard: [], error: err.message }, { status: 200 });
  }
}
