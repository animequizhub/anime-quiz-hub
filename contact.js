document.getElementById("sendBtn").onclick=()=>{

const name=document.getElementById("name").value;
const email=document.getElementById("email").value;
const message=document.getElementById("message").value;

if(name===""||email===""||message===""){

alert("Please fill in all fields.");
return;

}

alert("Message sent successfully! (This will be connected to Firebase later)");

}

document.getElementById("backBtn").onclick=()=>{

window.location.href="dashboard.html";

}