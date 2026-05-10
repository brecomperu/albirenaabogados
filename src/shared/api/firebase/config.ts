import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getFunctions, Functions } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Standard initialization pattern for Next.js
function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp(firebaseConfig);
}

// Build-Safe Service Initializer
// Prevents "auth/invalid-api-key" errors during Next.js static generation
const initService = <T>(initFn: () => T, name: string): T => {
  try {
    if (typeof window !== 'undefined' || firebaseConfig.apiKey) {
      return initFn();
    }
    // Fallback for build-time (will be re-initialized correctly at runtime)
    return {} as T;
  } catch (error) {
    console.warn(`Firebase ${name} initialization delayed:`, error);
    return {} as T;
  }
};

const app = getFirebaseApp();

export const auth: Auth = initService(() => getAuth(app), 'Auth');
export const db: Firestore = initService(() => getFirestore(app, "cs-pe-albirenaabogados-firestore"), 'Firestore');
export const storage: FirebaseStorage = initService(() => getStorage(app), 'Storage');
export const functions: Functions = initService(() => getFunctions(app), 'Functions');

export default getFirebaseApp;
