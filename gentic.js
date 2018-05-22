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
    console.log(index);
    let r = random(1);  
    while(r > 0){
        console.log(savedBird[index].fitness)
        r = r - savedBird[index].fitness;
        index++;
    }
    index--;
    let birdy = savedBird[index]  
    let child = new bird(birdy.brain)
    return child;
}

function calculateFitness(){
    let sum = 0;
    for(let birdie of b){
        sum += birdie.score;
    }
   
    for(let birdie of b){
        birdie.fitness= birdie.score / sum;
    }
}