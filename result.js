import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    runTransaction,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const score = Number(localStorage.getItem("score")) || 0;
const total = Number(localStorage.getItem("total")) || 0;
const quizName = localStorage.getItem("quizName") || "One Piece";
const attemptId =
    localStorage.getItem("attemptId") ||
    `${Date.now()}-${Math.random()}`;

const percentage =
    total > 0
        ? Math.round((score / total) * 100)
        : 0;

let rank = "F";
let earnedXP = 20;
let resultMessage = "Keep practicing!";

if (percentage === 100) {
    rank = "S+";
    earnedXP = 100;
    resultMessage = "Perfect score!";
} else if (percentage >= 90) {
    rank = "S";
    earnedXP = 90;
    resultMessage = "Outstanding!";
} else if (percentage >= 80) {
    rank = "A";
    earnedXP = 80;
    resultMessage = "Excellent work!";
} else if (percentage >= 70) {
    rank = "B";
    earnedXP = 70;
    resultMessage = "Great job!";
} else if (percentage >= 60) {
    rank = "C";
    earnedXP = 60;
    resultMessage = "Good effort!";
} else if (percentage >= 50) {
    rank = "D";
    earnedXP = 50;
    resultMessage = "You passed!";
}

const quizNameElement = document.getElementById("quizName");
const scoreElement = document.getElementById("score");
const percentageElement = document.getElementById("percentage");
const rankElement = document.getElementById("rank");
const xpElement = document.getElementById("xp");
const messageElement = document.getElementById("message");
const retryButton = document.getElementById("retryBtn");
const dashboardButton = document.getElementById("dashboardBtn");

quizNameElement.textContent = `${quizName} Quiz`;
scoreElement.textContent = `Score: ${score}/${total}`;
percentageElement.textContent = `Percentage: ${percentage}%`;
rankElement.textContent = `Rank: ${rank}`;
xpElement.textContent = `⭐ XP Earned: ${earnedXP}`;

retryButton.disabled = true;
dashboardButton.disabled = true;

retryButton.textContent = "Saving...";
dashboardButton.textContent = "Saving...";

messageElement.textContent =
    "Saving your result. Please wait...";

function enableButtons() {
    retryButton.disabled = false;
    dashboardButton.disabled = false;

    retryButton.textContent = "Try Again";
    dashboardButton.textContent = "Dashboard";
}

async function saveResultOnce(user) {
    const userReference = doc(db, "users", user.uid);
    const historyReference = doc(db, "history", attemptId);
    const leaderboardReference = doc(
        db,
        "leaderboard",
        user.uid
    );

    return runTransaction(db, async (transaction) => {
        const historySnapshot =
            await transaction.get(historyReference);

        if (historySnapshot.exists()) {
            return "already-saved";
        }

        const userSnapshot =
            await transaction.get(userReference);

        const previousXP = userSnapshot.exists()
            ? Number(userSnapshot.data().totalXP) || 0
            : 0;

        const newTotalXP = previousXP + earnedXP;

        const playerName =
            user.email?.split("@")[0] || "Anime Player";

        transaction.set(
            userReference,
            {
                uid: user.uid,
                email: user.email,
                playerName,
                latestQuiz: quizName,
                latestScore: score,
                latestTotal: total,
                latestPercentage: percentage,
                latestRank: rank,
                totalXP: newTotalXP,
                updatedAt: serverTimestamp()
            },
            { merge: true }
        );

        transaction.set(historyReference, {
            attemptId,
            uid: user.uid,
            email: user.email,
            quiz: quizName,
            score,
            total,
            percentage,
            rank,
            xp: earnedXP,
            completedAt: serverTimestamp()
        });

        transaction.set(
            leaderboardReference,
            {
                uid: user.uid,
                playerName,
                score,
                total,
                percentage,
                rank,
                totalXP: newTotalXP,
                updatedAt: serverTimestamp()
            },
            { merge: true }
        );

        return "saved";
    });
}

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        messageElement.textContent =
            "You are not logged in. Redirecting...";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

        return;
    }

    try {
        const saveStatus = await saveResultOnce(user);

        if (saveStatus === "already-saved") {
            messageElement.textContent =
                `${resultMessage} This result was already saved.`;
        } else {
            messageElement.textContent =
                `${resultMessage} Result saved successfully!`;
        }

        enableButtons();
    } catch (error) {
        console.error("Saving failed:", error);

        messageElement.textContent =
            `Save failed: ${error.code || error.message}`;

        enableButtons();
    }
});

retryButton.addEventListener("click", () => {
    if (!retryButton.disabled) {
        window.location.href = "onepiece.html";
    }
});

dashboardButton.addEventListener("click", () => {
    if (!dashboardButton.disabled) {
        window.location.href = "dashboard.html";
    }
});