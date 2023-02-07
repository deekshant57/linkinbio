// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { key } from "./components/Home";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: key,
  authDomain: "linkinbio-4829b.firebaseapp.com",
  projectId: "linkinbio-4829b",
  storageBucket: "linkinbio-4829b.appspot.com",
  messagingSenderId: "394574704220",
  appId: "1:394574704220:web:9ff54161763f9a450a4099",
  measurementId: "G-HP325LFZR8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
