import { getAchievement } from "./achievement.js";

const totalXP = Number(localStorage.getItem("totalXP")) || 0;

let level = 1;

if(totalXP>=100) level=2;
if(totalXP>=250) level=3;
if(totalXP>=450) level=4;
if(totalXP>=700) level=5;
if(totalXP>=1000) level=6;
if(totalXP>=1500) level=7;
if(totalXP>=2200) level=8;
if(totalXP>=3000) level=9;
if(totalXP>=4000) level=10;

const achievement = getAchievement(level);

document.getElementById("achievementList").innerHTML=`
<div class="badge">
<h2>${achievement}</h2>
<p>Current Level: ${level}</p>
<p>Total XP: ${totalXP}</p>
</div>
`;

document.getElementById("backBtn").onclick=()=>{
window.location.href="dashboard.html";
};