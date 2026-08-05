function calculateLevel(totalXP){

if(totalXP < 100) return 1;
if(totalXP < 250) return 2;
if(totalXP < 450) return 3;
if(totalXP < 700) return 4;
if(totalXP < 1000) return 5;
if(totalXP < 1500) return 6;
if(totalXP < 2200) return 7;
if(totalXP < 3000) return 8;
if(totalXP < 4000) return 9;

return 10;

}

export { calculateLevel };