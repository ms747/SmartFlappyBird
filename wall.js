class wall {
    constructor() {
        this.x = width + 50;
        this.size = 50;
        this.gap = 175;
        this.heightUpperWall = random(20, height - 20 - this.gap);
        this.wallTopImg = loadImage('./wall_top.png');
        this.wallBotImg = loadImage('./wall_bot.png');
        this.heightLowerWall = height - this.gap - this.heightUpperWall
        this.birdHasPassedThisWall = false
    }

    upperwall() {
        image(this.wallTopImg, this.x, 0, this.size, this.heightUpperWall)
    }

    lowerwall() {
        image(this.wallBotImg, this.x, this.heightUpperWall + this.gap, this.size, this.heightLowerWall)
    }

    draw() {
        this.upperwall();
        this.lowerwall();
    }

    move() {
        this.x -= 2;
    }

    outOfBound() {
        if (this.x + this.size <= 0) {
            return true;
        }
    }

    didBirdCollide(bird) {
        // Upper Wall
        if (bird.x + bird.size >= this.x && bird.x + bird.size <= this.x + this.size && bird.y + bird.size >= 0 - 100 && bird.y <= this.heightUpperWall) {
            return true;
        }
        // Lower Wall
        if (bird.x + bird.size >= this.x && bird.x + bird.size <= this.x + this.size && bird.y + bird.size >= height - this.heightLowerWall && bird.y + bird.size <= height + 100) {
            return true;
        }
    }

    isBirdAhead(bird) {
        if (bird.x > this.x && this.birdHasPassedThisWall == false) {
            this.birdHasPassedThisWall = true;
            return true;
        } else {
            return false
        }
    }
}