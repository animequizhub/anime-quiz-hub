import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAGFCpTR5nOkRwsVqJZ5ADwB86_T0D6Ixo",
  authDomain: "animexquizhub.firebaseapp.com",
  projectId: "animexquizhub",
  storageBucket: "animexquizhub.firebasestorage.app",
  messagingSenderId: "715643124458",
  appId: "1:715643124458:web:aa9e36218838579d13f593"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };