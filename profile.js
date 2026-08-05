import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location.href="login.html";
return;

}

document.getElementById("username").textContent =
user.email.split("@")[0];

document.getElementById("email").textContent =
user.email;

document.getElementById("level").textContent =
"Level: "+(localStorage.getItem("level")||1);

document.getElementById("xp").textContent =
"XP: "+(localStorage.getItem("totalXP")||0);

document.getElementById("rank").textContent =
"Rank: Rookie";

});

document.getElementById("historyBtn").onclick=()=>{

window.location.href="history.html";

}

document.getElementById("dashboardBtn").onclick=()=>{

window.location.href="dashboard.html";

}