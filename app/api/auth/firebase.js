// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCn9fwEPZZNe0vs5OBqrM1Qqd2WS8mSfY",
  authDomain: "studyatcal.firebaseapp.com",
  projectId: "studyatcal",
  storageBucket: "studyatcal.firebasestorage.app",
  messagingSenderId: "350168184481",
  appId: "1:350168184481:web:683a16b4fa183ac8f0e2e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);