import { auth, db } from "./firebase.js";

import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function savePlayer(score,total,rank,xp,level){

const user=auth.currentUser;

if(!user) return;

await setDoc(doc(db,"users",user.uid),{

email:user.email,
score:score,
total:total,
rank:rank,
xp:xp,
level:level,
updatedAt:new Date().toLocaleString()

});

}

export { savePlayer };