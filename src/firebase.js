import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8RKSCUYwYXfphqTwN6M_1la05oyAqRio",
  authDomain: "realtor-clone-react-28bdb.firebaseapp.com",
  projectId: "realtor-clone-react-28bdb",
  storageBucket: "realtor-clone-react-28bdb.appspot.com",
  messagingSenderId: "699480251469",
  appId: "1:699480251469:web:8e050456a1b9ee879d1004",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
