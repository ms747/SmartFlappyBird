let TOTAL = 1000;
let b = [];
let w = [];
let startMilli;
let currentMilli;
let back;
let score = 0;
let gameState = true
let counter = 0;
let savedBird = [];
let slider;
function setup() {
    createCanvas(400, 400);
    for(let i = 0 ; i < TOTAL ; i++){
        b.push(new bird());
    }
    slider = createSlider(1,100,1);
    //w.push(new wall());
    startMilli = 0;
}

function preload() {
    back = loadImage('./background.png');
}

function draw() {
    // currentMilli = millis();
    // if (currentMilli - startMilli >= 2500) {
    //     w.push(new wall());
    //     startMilli = currentMilli;
    // }

    background(back);
    for(let n = 0; n < slider.value();n++){
    if(counter % 150 == 0){
        w.push(new wall());
    }    

    

    for (let i = 0; i < w.length; i++) {
        if (w[i].outOfBound()) {
            w.splice(i, 1);
        }

        for(let j = b.length - 1; j >= 0 ; j--){
            if(w[i].didBirdCollide(b[j])){
                savedBird.push(b.splice(j,1)[0]);  
            }
        }

        //w[i].draw();
        w[i].move();
    }
    // if (w[0].didBirdCollide(b)) {
    //     gameState = false
    //     noLoop();
    //     textSize(32);
    //     textAlign(CENTER, CENTER);
    //     fill(255);
    //     text('Game Over', width / 2, height / 2);
    // }

    // if (!w[0].didBirdCollide(b) && w[0].isBirdAhead(b)) {
    //     score++;
    // }
    
    // textSize(32);
    // textAlign(CENTER, CENTER);
    // fill(255);
    // text(score, width / 2, 40);

    if(b.length === 0){
        counter = 0;
        nextGen();
        w = [];
        w.push(new wall());
    }


    for(let i = 0 ; i < b.length ; i++){
        if(b[i].y <= 0){
            b.splice(i,1);
        }
        b[i].think(w);
        b[i].update();
    }
    counter++;
}

    for(walls of w){
        walls.draw();
    }

    for(birds of b){
        birds.draw();
    }
    
}

// function keyPressed() {
//     if (keyCode === 32) {
//         b.jump();
//     }

//     if (keyCode === 'r' || keyCode === 'R') {
//         console.log("restart");
//     }
// }