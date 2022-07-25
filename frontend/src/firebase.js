import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzZfF5d2NXTWCnwwbZJzjiJ01uPJ5fIwI",
  authDomain: "clone-289902.firebaseapp.com",
  projectId: "youtubeclone-289902",
  storageBucket: "youtubeclone-289902.appspot.com",
  messagingSenderId: "378749649514",
  appId: "1:378749649514:web:6709424977f24c31bdc013",
  measurementId: "G-5YKN0CK2Y1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;