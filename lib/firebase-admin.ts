import * as admin from "firebase-admin";

function getFirebaseAdminApp() {
  if (admin.apps.length > 0) {
    return admin.apps[0]!;
  }

  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountKey) {
    try {
      const rawString = serviceAccountKey.trim();
      let credentialJson: any;

      if (rawString.startsWith("{")) {
        credentialJson = JSON.parse(rawString);
      } else {
        const decoded = Buffer.from(rawString, "base64").toString("utf-8");
        credentialJson = JSON.parse(decoded);
      }

      return admin.initializeApp({
        credential: admin.credential.cert(credentialJson),
        projectId: credentialJson.project_id || "upforge-quizz",
      });
    } catch (e) {
      console.error("Warning: Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY, falling back:", e);
      return admin.initializeApp({
        projectId: "upforge-quizz",
      });
    }
  }

  return admin.initializeApp({
    projectId: "upforge-quizz",
  });
}

const app = getFirebaseAdminApp();

export const adminDb = admin.firestore(app);
export const adminAuth = admin.auth(app);
export default admin;
