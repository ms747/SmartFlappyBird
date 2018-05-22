function nextGen(){
    console.log("next gen");
    calculateFitness();
    for(let i = 0 ; i < TOTAL ; i++){
        b[i] = pickOne();     
    }
    savedBird = [];
}



function pickOne(){
    let index = 0;
    let r = random(1);  
    while(r > 0){
        r = r - savedBird[index].fitness;
        index++;
    }
    index--;
    let brain = savedBird[index].copy();
    let child = new bird(brain);
    return child;
}

function calculateFitness(){
    let sum = 0;
    for(let birdie of savedBird){
        sum += birdie.score;
    }
   
    for(let birdie of savedBird){
        birdie.fitness= birdie.score / sum;
    }
}