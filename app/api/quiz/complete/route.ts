import { NextRequest, NextResponse } from "next/server";
import { QUIZ_REGISTRY } from "@/lib/quizData";
import { adminAddDocument } from "@/lib/firebase-admin";

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

function json(data: unknown, status = 200) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: JSON_HEADERS,
  });
}

function cleanName(value: unknown) {
  const name = String(value ?? "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);

  return name || "UpForge Builder";
}

function makeId(prefix: string) {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().replace(/-/g, "").slice(0, 16)
      : Math.random().toString(36).slice(2, 14);

  return `${prefix}_${Date.now().toString(36)}_${random}`;
}

function getBadge(percentage: number) {
  if (percentage >= 90) return "Top 1% Founder Elite";
  if (percentage >= 70) return "Growth Master";
  if (percentage >= 50) return "Startup Operator";
  return "Emerging Founder";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const quizSlug = String(body?.quizSlug || "").trim();
    const answers =
      body?.answers && typeof body.answers === "object"
        ? body.answers
        : {};
    const userName = cleanName(body?.userName);
    const timeTakenSeconds = Math.max(
      0,
      Math.min(Number(body?.timeTakenSeconds) || 0, 60 * 60)
    );

    const suppliedAttemptId = String(body?.attemptId || "")
      .replace(/[^a-zA-Z0-9_-]/g, "")
      .slice(0, 48);

    const attemptId = suppliedAttemptId || makeId("attempt");

    const quiz = QUIZ_REGISTRY.find((item) => item.slug === quizSlug);

    if (!quiz) {
      return json({ success: false, error: "Quiz not found." }, 404);
    }

    if (!answers || typeof answers !== "object") {
      return json({ success: false, error: "Answers are required." }, 400);
    }

    let score = 0;

    for (const question of quiz.questions) {
      const raw = answers[String(question.id)];
      const selected = Number(raw);

      if (
        Number.isInteger(selected) &&
        selected >= 0 &&
        selected < question.options.length &&
        selected === question.correctIndex
      ) {
        score += 1;
      }
    }

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((score / Math.max(totalQuestions, 1)) * 100);
    const badgeEarned = getBadge(percentage);
    const completionId = `ufc_${attemptId}`;
    const certificateId = `UFR-CERT-${quizSlug.slice(0, 8).toUpperCase()}-${attemptId
      .slice(-8)
      .toUpperCase()}`;

    const record = {
      uid: completionId,
      userName,
      score,
      totalQuestions,
      percentage,
      timeTakenSeconds,
      badgeEarned,
      certificateId,
      quizSlug,
      completedAt: new Date().toISOString(),
    };

    let doc: any = null;

    try {
      doc = await adminAddDocument(
        `leaderboards/${quizSlug}/scores`,
        record,
        completionId
      );
    } catch (error: any) {
      // A lost network response can cause the browser to retry. The same
      // custom document ID makes that retry idempotent.
      if (!String(error?.message || "").includes("409")) {
        throw error;
      }
    }

    return json({
      success: true,
      completionId: doc?.id || completionId,
      certificateId,
      record: {
        ...record,
        id: doc?.id || completionId,
      },
    });
  } catch (error) {
    console.error("Quiz completion error:", error);

    return json(
      {
        success: false,
        error: "We could not record this completion. Please retry once.",
      },
      500
    );
  }
}
