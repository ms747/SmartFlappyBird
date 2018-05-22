function mutate(x) {
    if (random(1) < 0.1) {
        let offset = randomGaussian() * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}

class bird {
    constructor(brain) {
        this.x = 20;
        this.y = (height / 2) - (20 / 2);
        this.birdImg = loadImage('./bird.png');
        this.speed = 0;
        this.accel = 0.2;
        this.size = 30;
        this.score = 0;
        this.fitness = 0;
        // if(newBrain){
        //     this.brain = newBrain;  
        // }
        // else{
        //     this.brain = new NeuralNetwork(5,8,2);  
        // }
        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
            this.brain.mutate(mutate);
        } else {
            this.brain = new NeuralNetwork(5, 8, 2);
        }
    }

    copy() {
        return new bird(this.brain);
    }


    draw() {
        image(this.birdImg, this.x, this.y, this.size, this.size);
    }

    update() {
        this.score++;

        if (this.y <= height - (this.size + 2)) {
            this.y += this.speed;
            this.speed += this.accel;
        }
    }

    jump() {
        this.y -= this.speed;
        this.speed = -3;
    }

    think(wall) {
        let closest = null;
        let closestD = Infinity;
        for (let i = 0; i < wall.length; i++) {
            let d = wall[i].x - this.x;
            if (d < closestD && d > 0) {
                closest = wall[i];
                closestD = d;
            }
        }

        let inputs = [];
        inputs[0] = this.y / height;
        inputs[1] = closest.heightUpperWall / height;
        inputs[2] = closest.heightLowerWall / height;
        inputs[3] = closest.x / width;
        inputs[4] = this.speed / 10;


        let output = this.brain.predict(inputs);
        if (output[0] > output[1]) {
            this.jump();
        }
    }

}