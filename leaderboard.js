import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const leaderboardList =
    document.getElementById("leaderboardList");

function getPercentage(player) {
    const savedPercentage = Number(player.percentage);

    if (Number.isFinite(savedPercentage)) {
        return savedPercentage;
    }

    const score = Number(player.score) || 0;
    const total = Number(player.total) || 0;

    return total > 0
        ? Math.round((score / total) * 100)
        : 0;
}

async function loadLeaderboard() {
    leaderboardList.innerHTML = "<p>Loading players...</p>";

    try {
        const snapshot = await getDocs(
            collection(db, "leaderboard")
        );

        if (snapshot.empty) {
            leaderboardList.innerHTML =
                "<p>No leaderboard records yet.</p>";
            return;
        }

        const players = [];

        snapshot.forEach((documentSnapshot) => {
            const data = documentSnapshot.data();

            players.push({
                ...data,
                percentage: getPercentage(data)
            });
        });

        players.sort((first, second) => {
            // Highest percentage first
            if (second.percentage !== first.percentage) {
                return second.percentage - first.percentage;
            }

            // If tied, highest raw score first
            const secondScore = Number(second.score) || 0;
            const firstScore = Number(first.score) || 0;

            if (secondScore !== firstScore) {
                return secondScore - firstScore;
            }

            // If still tied, highest XP first
            return (
                (Number(second.totalXP) || 0) -
                (Number(first.totalXP) || 0)
            );
        });

        leaderboardList.innerHTML = "";

        players.forEach((player, index) => {
            const playerCard = document.createElement("div");
            playerCard.className = "player";

            playerCard.innerHTML = `
                <h3>
                    #${index + 1}
                    ${player.playerName || "Anime Player"}
                </h3>

                <p>
                    Score:
                    ${Number(player.score) || 0}/
                    ${Number(player.total) || 0}
                </p>

                <p>
                    Percentage: ${player.percentage}%
                </p>

                <p>Rank: ${player.rank || "F"}</p>

                <p>
                    Total XP: ${Number(player.totalXP) || 0}
                </p>
            `;

            leaderboardList.appendChild(playerCard);
        });
    } catch (error) {
        console.error("Leaderboard error:", error);

        leaderboardList.innerHTML =
            `<p>Could not load leaderboard: ${
                error.code || error.message
            }</p>`;
    }
}

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    loadLeaderboard();
});

document
    .getElementById("backBtn")
    .addEventListener("click", () => {
        window.location.href = "dashboard.html";
    });