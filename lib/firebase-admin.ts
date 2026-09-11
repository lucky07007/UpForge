const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || "upforge-production";
const FIRESTORE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// Helper: Format raw JS object into Firestore REST format
function toFirestoreValue(val: any): any {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === "boolean") return { booleanValue: val };
  if (typeof val === "number") {
    return Number.isInteger(val) ? { integerValue: val.toString() } : { doubleValue: val };
  }
  if (typeof val === "string") return { stringValue: val };
  if (Array.isArray(val)) {
    return { arrayValue: { values: val.map(toFirestoreValue) } };
  }
  if (typeof val === "object") {
    const fields: Record<string, any> = {};
    for (const [k, v] of Object.entries(val)) {
      fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

// Helper: Decode Firestore REST value back to plain JS object
export function fromFirestoreValue(field: any): any {
  if (!field) return null;
  if ("stringValue" in field) return field.stringValue;
  if ("integerValue" in field) return parseInt(field.integerValue, 10);
  if ("doubleValue" in field) return parseFloat(field.doubleValue);
  if ("booleanValue" in field) return field.booleanValue;
  if ("nullValue" in field) return null;
  if ("timestampValue" in field) return field.timestampValue;
  if ("arrayValue" in field) {
    return (field.arrayValue.values || []).map(fromFirestoreValue);
  }
  if ("mapValue" in field) {
    const res: Record<string, any> = {};
    for (const [k, v] of Object.entries(field.mapValue.fields || {})) {
      res[k] = fromFirestoreValue(v);
    }
    return res;
  }
  return null;
}

export function decodeFirestoreDoc(doc: any): any {
  if (!doc || !doc.fields) return null;
  const data: Record<string, any> = {
    id: doc.name ? doc.name.split("/").pop() : undefined,
    createTime: doc.createTime,
    updateTime: doc.updateTime,
  };
  for (const [k, v] of Object.entries(doc.fields)) {
    data[k] = fromFirestoreValue(v);
  }
  return data;
}

export async function firestoreAddDocument(collectionPath: string, data: Record<string, any>) {
  const fields: Record<string, any> = {};
  for (const [k, v] of Object.entries(data)) {
    fields[k] = toFirestoreValue(v);
  }
  const res = await fetch(`${FIRESTORE_BASE_URL}/${collectionPath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Firestore POST failed [${res.status}]: ${text}`);
  }
  const json = await res.json();
  return decodeFirestoreDoc(json);
}

export async function firestoreListDocuments(collectionPath: string, pageSize = 50) {
  const url = `${FIRESTORE_BASE_URL}/${collectionPath}?pageSize=${pageSize}`;
  const res = await fetch(url, { headers: { "Content-Type": "application/json" }, cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  const json = await res.json();
  if (!json.documents) return [];
  return json.documents.map(decodeFirestoreDoc);
}
