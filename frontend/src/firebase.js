import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzZfF5d2NXTWCnwwbZJzjiJ01uPJ5fIwI",
  authDomain: "clone-289902.firebaseapp.com",
  projectId: "youtubeclone-289902",
  storageBucket: "youtubeclone-289902.appspot.com",
  messagingSenderId: "378749649514",
  appId: "1:378749649514:web:e2047a2a9b1d94fbbdc013",
  measurementId: "G-P277MV499F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;