// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo9VZIxLcz1PsG_NfEOqaryTyDnJ64uHs",
  authDomain: "workmanager-4446a.firebaseapp.com",
  projectId: "workmanager-4446a",
  storageBucket: "workmanager-4446a.appspot.com",
  messagingSenderId: "822817858209",
  appId: "1:822817858209:web:a37af04f054a6ca44606e0",
  measurementId: "G-2QBV3ZPW0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const Auth = getAuth(app);
const Provider = new GoogleAuthProvider();
export {Auth,Provider};