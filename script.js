// Wait until the webpage is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Find the Start Quiz button
    const startBtn = document.getElementById("startBtn");

    // Check if the button exists
    if (startBtn) {

        // Run this code when the button is clicked
        startBtn.addEventListener("click", function () {

            alert("🚀 Welcome to Anime Quiz Hub!\n\nThe quiz is still under development.");

            // Later we'll replace this with:
            // window.location.href = "quiz.html";
        });

    }

});