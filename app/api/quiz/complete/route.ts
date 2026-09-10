import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { quizzes } from "@/lib/quizData";
import { getCurrentPeriodIds } from "@/lib/quiz-periods";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized: Missing authentication token" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(token);
    } catch {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    const uid = decodedToken.uid;
    const body = await req.json();
    const { quizId, answers, timeTaken, fullName, email } = body;

    if (!quizId || !Array.isArray(answers)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const quiz = quizzes.find((q) => q.id === quizId || q.slug === quizId);
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Secure server-side calculation of the score
    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score += 1;
      }
    });

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;
    const { weeklyId, monthlyId } = getCurrentPeriodIds();

    const attemptDocId = `${uid}_${quiz.id}`;
    const attemptRef = adminDb.collection("attempts").doc(attemptDocId);
    const userRef = adminDb.collection("users").doc(uid);
    const quizLeaderboardRef = adminDb
      .collection("leaderboards")
      .doc(quiz.id)
      .collection("scores")
      .doc(uid);
    const weeklyScoreRef = adminDb
      .collection("periodScores")
      .doc(weeklyId)
      .collection("users")
      .doc(uid);
    const monthlyScoreRef = adminDb
      .collection("periodScores")
      .doc(monthlyId)
      .collection("users")
      .doc(uid);

    let isFirstAttempt = false;
    let xpAwarded = 0;
    let newBestScore = score;
    let previousBestScore = 0;

    await adminDb.runTransaction(async (transaction) => {
      const attemptSnap = await transaction.get(attemptRef);
      const userSnap = await transaction.get(userRef);

      const displayName = fullName || decodedToken.name || decodedToken.email?.split("@")[0] || "Founder";
      const userEmail = email || decodedToken.email || "";

      if (!attemptSnap.exists) {
        isFirstAttempt = true;
        xpAwarded = score * 10;

        transaction.set(attemptRef, {
          uid,
          quizId: quiz.id,
          score,
          totalQuestions,
          xpAwarded,
          percentage,
          passed,
          timeTaken: timeTaken || 0,
          completedAt: FieldValue.serverTimestamp(),
        });

        if (!userSnap.exists) {
          transaction.set(userRef, {
            uid,
            displayName,
            email: userEmail,
            totalXP: xpAwarded,
            quizzesCompleted: 1,
            totalCorrect: score,
            totalAnswered: totalQuestions,
            weeklyXP: xpAwarded,
            monthlyXP: xpAwarded,
            updatedAt: FieldValue.serverTimestamp(),
          });
        } else {
          transaction.update(userRef, {
            totalXP: FieldValue.increment(xpAwarded),
            quizzesCompleted: FieldValue.increment(1),
            totalCorrect: FieldValue.increment(score),
            totalAnswered: FieldValue.increment(totalQuestions),
            weeklyXP: FieldValue.increment(xpAwarded),
            monthlyXP: FieldValue.increment(xpAwarded),
            displayName: displayName || userSnap.data()?.displayName,
            updatedAt: FieldValue.serverTimestamp(),
          });
        }

        transaction.set(quizLeaderboardRef, {
          displayName,
          bestScore: score,
          percentage,
          updatedAt: FieldValue.serverTimestamp(),
        });

        transaction.set(
          weeklyScoreRef,
          {
            displayName,
            xp: FieldValue.increment(xpAwarded),
            updatedAt: FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

        transaction.set(
          monthlyScoreRef,
          {
            displayName,
            xp: FieldValue.increment(xpAwarded),
            updatedAt: FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      } else {
        const prevData = attemptSnap.data();
        previousBestScore = prevData?.score || 0;
        xpAwarded = 0;

        if (score > previousBestScore) {
          newBestScore = score;
          transaction.update(attemptRef, {
            score,
            percentage,
            passed,
            timeTaken: timeTaken || prevData?.timeTaken,
            completedAt: FieldValue.serverTimestamp(),
          });

          transaction.set(
            quizLeaderboardRef,
            {
              displayName,
              bestScore: score,
              percentage,
              updatedAt: FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
        }
      }
    });

    const certId = `UFRN-CERT-${quiz.id.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      score,
      totalQuestions,
      percentage,
      passed,
      xpAwarded,
      isFirstAttempt,
      newBestScore,
      certId: passed ? certId : null,
    });
  } catch (err: any) {
    console.error("API error during quiz completion:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
