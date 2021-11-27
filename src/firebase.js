import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUZWWEJ3D8LuWvt8C0E9lfceEG6vV6fdk",
  authDomain: "whatsapp-clone-b4ef1.firebaseapp.com",
  projectId: "whatsapp-clone-b4ef1",
  storageBucket: "whatsapp-clone-b4ef1.appspot.com",
  messagingSenderId: "692442146194",
  appId: "1:692442146194:web:321376610f76bbd85b0d4b",
  measurementId: "G-5W6SZCJSZL",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
