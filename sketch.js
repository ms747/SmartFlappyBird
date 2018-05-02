let b;
let w = [];
let startMilli;
let currentMilli;
let back;
let score = 0;
let gameState = true

function setup() {
    createCanvas(400, 400);
    b = new bird();
    w.push(new wall());
    startMilli = 0;
}

function preload() {
    back = loadImage('./background.png');
}

function draw() {
    currentMilli = millis();
    if (currentMilli - startMilli >= 2000) {
        w.push(new wall());
        startMilli = currentMilli;
    }
    background(back);

    for (let i = 0; i < w.length; i++) {
        if (w[i].outOfBound()) {
            w.splice(i, 1);
        }
        w[i].draw();
    }
    if (w[0].didBirdCollide(b)) {
        gameState = false
        noLoop();
        textSize(32);
        textAlign(CENTER, CENTER);
        fill(255);
        text('Game Over', width / 2, height / 2);
    }

    if (!w[0].didBirdCollide(b) && w[0].isBirdAhead(b)) {
        score++;
        console.log("Score", score);

    }
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255);
    text(score, width / 2, 40);
    b.draw();
}

function keyPressed() {
    if (keyCode === 32) {
        b.jump();
    }

    if (keyCode === 'r' || keyCode === 'R') {
        console.log("restart");
    }
}