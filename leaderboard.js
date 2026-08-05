import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    getDocs,
    orderBy,
    query
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const leaderboardList =
    document.getElementById("leaderboardList");

async function loadLeaderboard() {
    leaderboardList.innerHTML = "<p>Loading players...</p>";

    try {
        const leaderboardQuery = query(
            collection(db, "leaderboard"),
            orderBy("percentage", "desc")
        );

        const snapshot = await getDocs(leaderboardQuery);

        if (snapshot.empty) {
            leaderboardList.innerHTML =
                "<p>No leaderboard records yet.</p>";
            return;
        }

        leaderboardList.innerHTML = "";

        let position = 1;

        snapshot.forEach((documentSnapshot) => {
            const player = documentSnapshot.data();

            const playerCard = document.createElement("div");
            playerCard.className = "player";

            playerCard.innerHTML = `
                <h3>
                    #${position} ${player.playerName || "Anime Player"}
                </h3>

                <p>
                    Score: ${player.score || 0}/${player.total || 0}
                </p>

                <p>
                    Percentage: ${player.percentage || 0}%
                </p>

                <p>Rank: ${player.rank || "F"}</p>

                <p>Total XP: ${player.totalXP || 0}</p>
            `;

            leaderboardList.appendChild(playerCard);
            position++;
        });
    } catch (error) {
        console.error("Leaderboard error:", error);

        leaderboardList.innerHTML =
            `<p>Could not load leaderboard: ${error.message}</p>`;
    }
}

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    loadLeaderboard();
});

document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "dashboard.html";
});