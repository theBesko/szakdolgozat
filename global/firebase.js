import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// set(ref(getDatabase(), "DATABASE_ROOT/proba"), {
//     a: `${new Date().getMinutes()}`,
//   });

export const app = initializeApp(firebaseConfig);
