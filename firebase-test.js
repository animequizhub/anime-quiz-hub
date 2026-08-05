import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    serverTimestamp,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const accountElement = document.getElementById("account");
const statusElement = document.getElementById("status");
const testButton = document.getElementById("testBtn");

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (!user) {
        accountElement.textContent = "Not logged in.";
        statusElement.textContent =
            "Log in first, then open this test page.";

        testButton.disabled = true;
        return;
    }

    currentUser = user;

    accountElement.textContent =
        `Logged in as: ${user.email}`;

    statusElement.textContent =
        "Ready to test Firestore.";
});

testButton.addEventListener("click", async () => {
    if (!currentUser) {
        statusElement.textContent = "No logged-in user.";
        return;
    }

    testButton.disabled = true;
    statusElement.textContent = "Saving test document...";

    try {
        await setDoc(
            doc(db, "users", currentUser.uid),
            {
                uid: currentUser.uid,
                email: currentUser.email,
                firebaseTest: "Successful",
                latestQuiz: "Firebase Test",
                latestScore: 1,
                latestTotal: 1,
                latestPercentage: 100,
                latestRank: "S+",
                totalXP: 100,
                updatedAt: serverTimestamp()
            },
            { merge: true }
        );

        statusElement.textContent =
            "SUCCESS: Firestore is connected and saving!";
    } catch (error) {
        console.error(error);

        statusElement.textContent =
            `ERROR: ${error.code || error.message}`;

        testButton.disabled = false;
    }
});