// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR-SAqRkHLutJlhIQE7WVqvuHe6znDc5c",
  authDomain: "noteauth-5f31c.firebaseapp.com",
  projectId: "noteauth-5f31c",
  storageBucket: "noteauth-5f31c.appspot.com",
  messagingSenderId: "669047368749",
  appId: "1:669047368749:web:c0f31131c796d3f40edca4"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);