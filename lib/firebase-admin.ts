import * as admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountKey) {
    try {
      const rawString = serviceAccountKey.trim();
      let credentialJson: any;

      if (rawString.startsWith("{")) {
        credentialJson = JSON.parse(rawString);
      } else {
        // Safe base64 decoding for Cloudflare Worker Node runtime
        const decoded = Buffer.from(rawString, "base64").toString("utf-8");
        credentialJson = JSON.parse(decoded);
      }

      admin.initializeApp({
        credential: admin.credential.cert(credentialJson),
        projectId: "upforge-quizz",
      });
    } catch (e) {
      console.error("Critical: Failed to initialize Firebase Admin SDK:", e);
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
