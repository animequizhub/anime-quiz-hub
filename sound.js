const correctSound=new Audio("sounds/correct.mp3");

const wrongSound=new Audio("sounds/wrong.mp3");

function playCorrect(){

correctSound.play();

}

function playWrong(){

wrongSound.play();

}

export{

playCorrect,
playWrong

};