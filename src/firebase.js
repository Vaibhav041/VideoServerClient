import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADu4T4GG5FkwAV5ZsK-ZR0qfv13DhqoPw",
  authDomain: "video-f2239.firebaseapp.com",
  projectId: "video-f2239",
  storageBucket: "video-f2239.appspot.com",
  messagingSenderId: "197091852795",
  appId: "1:197091852795:web:fdbb856433d7cfa58f4b5e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;