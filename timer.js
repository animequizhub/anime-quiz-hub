let timeLeft = 30;

const timer = document.getElementById("timer");

function startTimer(onTimeUp){

timeLeft = 30;

timer.textContent = "⏰ Time: " + timeLeft;

const countdown = setInterval(()=>{

timeLeft--;

timer.textContent = "⏰ Time: " + timeLeft;

if(timeLeft <= 0){

clearInterval(countdown);

onTimeUp();

}

},1000);

return countdown;

}

export { startTimer };