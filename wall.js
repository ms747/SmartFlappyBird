class wall {
    constructor() {
        this.x = width + 50;
        this.size = 50;
        this.gap = 100;
        this.heightUpperWall = random(20, height - 20 - this.gap);
        this.wallTopImg = loadImage('./wall_top.png');
        this.wallBotImg = loadImage('./wall_bot.png');
    }

    upperwall() {
        image(this.wallTopImg, this.x, 0, this.size, this.heightUpperWall)
    }

    lowerwall() {
        image(this.wallBotImg, this.x, this.heightUpperWall + this.gap, this.size, (height - this.gap - this.heightUpperWall))
    }

    draw() {
        this.upperwall();
        this.lowerwall();
        this.move();
    }

    move() {
        this.x -= 2;
    }

    outOfBound() {
        if (this.x + this.size <= 0) {
            return true;
        }
    }
}