let b;
let w = [];
let startMilli;
let currentMilli;
let back;

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
    b.draw();
}

function keyPressed() {
    if (keyCode === 32) {
        b.jump();
    }
}