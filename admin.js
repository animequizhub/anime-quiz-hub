import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const output=document.getElementById("output");

document.getElementById("viewScoresBtn").onclick=async()=>{

output.innerHTML="";

const snapshot=await getDocs(collection(db,"scores"));

snapshot.forEach(doc=>{

const data=doc.data();

output.innerHTML+=`
<div style="padding:15px;background:#21262d;border-radius:10px;margin:10px 0;">
<h3>${data.email}</h3>
<p>Score: ${data.score}/${data.total}</p>
<p>Rank: ${data.rank}</p>
</div>
`;

});

}

document.getElementById("viewUsersBtn").onclick=()=>{

alert("Firebase Authentication users cannot be listed from the browser for security. This feature will be added later with a secure backend.");

}

document.getElementById("dashboardBtn").onclick=()=>{

window.location.href="dashboard.html";

}