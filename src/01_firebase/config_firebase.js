// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "--redacted",
  authDomain: "cpre-3290-project-1.firebaseapp.com",
  projectId: "cpre-3290-project-1",
  storageBucket: "cpre-3290-project-1.appspot.com",
  messagingSenderId: "--redacted",
  appId: "1:314637038386:web:8eeb9c609e3231f9e25d2b"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);

export default firebase_app
