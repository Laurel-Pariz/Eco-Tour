import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEIimmXJgo0Zb7u8egKMd8B_m9XLlv-XI",
  authDomain: "eco-tourism-booking-platform.firebaseapp.com",
  projectId: "eco-tourism-booking-platform",
  storageBucket: "eco-tourism-booking-platform.appspot.com",
  messagingSenderId: "570602471347",
  appId: "1:570602471347:web:ded7ed92f711f5169355c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)