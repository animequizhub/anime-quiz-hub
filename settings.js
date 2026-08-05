import { auth } from "./firebase.js";

import {
signOut,
sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

document.getElementById("changePasswordBtn").onclick=async()=>{

if(auth.currentUser){

await sendPasswordResetEmail(auth,auth.currentUser.email);

alert("Password reset email sent.");

}

}

document.getElementById("logoutBtn").onclick=async()=>{

await signOut(auth);

window.location.href="login.html";

}

document.getElementById("backBtn").onclick=()=>{

window.location.href="dashboard.html";

}