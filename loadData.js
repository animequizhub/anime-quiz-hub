import { auth, db } from "./firebase.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function loadPlayer(){

const user=auth.currentUser;

if(!user) return null;

const ref=doc(db,"users",user.uid);

const snap=await getDoc(ref);

if(snap.exists()){

return snap.data();

}

return null;

}

export { loadPlayer };