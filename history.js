import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const historyList = document.getElementById("historyList");

async function loadHistory(user) {
    historyList.innerHTML = "<p>Loading quiz history...</p>";

    try {
        const historyQuery = query(
            collection(db, "history"),
            where("uid", "==", user.uid)
        );

        const snapshot = await getDocs(historyQuery);

        if (snapshot.empty) {
            historyList.innerHTML =
                "<p>No quizzes played yet.</p>";

            return;
        }

        const records = [];

        snapshot.forEach((documentSnapshot) => {
            records.push(documentSnapshot.data());
        });

        records.sort((first, second) => {
            const firstTime =
                first.completedAt?.seconds || 0;

            const secondTime =
                second.completedAt?.seconds || 0;

            return secondTime - firstTime;
        });

        historyList.innerHTML = "";

        records.forEach((record) => {
            let completedDate = "Recently";

            if (record.completedAt?.toDate) {
                completedDate =
                    record.completedAt.toDate().toLocaleString();
            }

            const recordElement =
                document.createElement("div");

            recordElement.className = "record";

            recordElement.innerHTML = `
                <h3>${record.quiz || "Anime Quiz"}</h3>

                <p>
                    Score: ${record.score || 0}/${record.total || 0}
                </p>

                <p>
                    Percentage: ${record.percentage || 0}%
                </p>

                <p>Rank: ${record.rank || "F"}</p>

                <p>XP Earned: ${record.xp || 0}</p>

                <p>${completedDate}</p>
            `;

            historyList.appendChild(recordElement);
        });
    } catch (error) {
        console.error("History error:", error);

        historyList.innerHTML =
            `<p>Could not load history: ${error.message}</p>`;
    }
}

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    loadHistory(user);
});

document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "dashboard.html";
});