import { auth, db } from "./firebase.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function saveHistory(score,total,rank,xp){

const user=auth.currentUser;

if(!user) return;

await addDoc(collection(db,"history"),{

uid:user.uid,
email:user.email,
quiz:"One Piece",
score:score,
total:total,
rank:rank,
xp:xp,
date:new Date().toLocaleString()

});

}

export { saveHistory };