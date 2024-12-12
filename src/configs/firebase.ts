// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC8Bf5t1qD6PpMofam2y-5f3X5A-y8hY_U",
  authDomain: "eve-d771b.firebaseapp.com",
  projectId: "eve-d771b",
  storageBucket: "eve-d771b.appspot.com",
  messagingSenderId: "729191509517",
  appId: "1:729191509517:web:cf1dca639b8c532f866f44",
  measurementId: "G-101Y7G0RCN"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken };
