import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "upforge";

    // Write to Firestore via standard REST API (Edge compatible)
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/quiz_leads`;

    await fetch(firestoreUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          email: { stringValue: body.email || "" },
          name: { stringValue: body.name || "" },
          quizSlug: { stringValue: body.quizSlug || "" },
          score: { integerValue: body.score || 0 },
          createdAt: { timestampValue: new Date().toISOString() },
        },
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 200 });
  }
}
