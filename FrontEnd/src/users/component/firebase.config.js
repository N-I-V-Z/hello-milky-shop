// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLnw3-hD1Ot1l94KmPZbHMnXRIPV6FAi8",
  authDomain: "hellomilkyshop-4cf00.firebaseapp.com",
  projectId: "hellomilkyshop-4cf00",
  storageBucket: "hellomilkyshop-4cf00.appspot.com",
  messagingSenderId: "899381214397",
  appId: "1:899381214397:web:2c4aa861f5571d5e390bd4",
  measurementId: "G-PGTTJ7X9YJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
