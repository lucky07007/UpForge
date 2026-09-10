import * as admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountKey) {
    try {
      const parsedKey = JSON.parse(
        serviceAccountKey.startsWith("{")
          ? serviceAccountKey
          : Buffer.from(serviceAccountKey, "base64").toString("utf-8")
      );

      admin.initializeApp({
        credential: admin.credential.cert(parsedKey),
        projectId: "upforge-quizz",
      });
    } catch (e) {
      console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:", e);
      admin.initializeApp({
        projectId: "upforge-quizz",
      });
    }
  } else {
    admin.initializeApp({
      projectId: "upforge-quizz",
    });
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
