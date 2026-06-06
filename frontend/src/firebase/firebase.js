import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDg9_rcYmyMsSRh0qrNefs7dM-FR3Wqu6o",
  authDomain: "ai-interview-coach-38c0e.firebaseapp.com",
  projectId: "ai-interview-coach-38c0e",
  storageBucket: "ai-interview-coach-38c0e.firebasestorage.app",
  messagingSenderId: "857982575320",
  appId: "1:857982575320:web:ddaf3baa0817f219a6edad",
  measurementId: "G-J44EVEBG1K",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;