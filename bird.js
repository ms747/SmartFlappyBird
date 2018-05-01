class bird {
    constructor() {
        this.x = 20;
        this.y = (height / 2) - (20 / 2);
        this.birdImg = loadImage('./bird.png');
        this.speed = 0;
        this.accel = 0.2;
        this.size = 30;
    }

    draw() {
        image(this.birdImg, this.x, this.y, this.size, this.size);
        if (this.y <= height - (this.size + 2)) {
            this.y += this.speed;
            this.speed += this.accel;
        }
    }

    jump() {
        this.y -= this.speed;
        this.speed = -3;
    }


}