function calculateXP(score, total){

const percentage = (score / total) * 100;

if(percentage == 100) return 100;

if(percentage >= 90) return 90;

if(percentage >= 80) return 80;

if(percentage >= 70) return 70;

if(percentage >= 60) return 60;

if(percentage >= 50) return 50;

return 20;

}

export { calculateXP };