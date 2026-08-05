import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const welcomeText = document.getElementById("welcomeText");
const latestResult = document.getElementById("latestResult");
const quizBtn = document.getElementById("quizBtn");
const profileBtn = document.getElementById("profileBtn");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    welcomeText.textContent = `Welcome, ${user.email}`;

    try {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (!userDoc.exists()) {
            latestResult.textContent = "No quiz taken yet.";
            return;
        }

        const data = userDoc.data();

        latestResult.textContent =
            `${data.latestQuiz || "Quiz"}: ` +
            `${data.latestScore || 0}/${data.latestTotal || 0} ` +
            `(${data.latestPercentage || 0}%) — ` +
            `Rank ${data.latestRank || "F"}`;

    } catch (error) {
        latestResult.textContent =
            `Loading error: ${error.code || error.message}`;
    }
});

quizBtn.addEventListener("click", () => {
    window.location.href = "quiz.html";
});

profileBtn.addEventListener("click", () => {
    window.location.href = "profile.html";
});

logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
});