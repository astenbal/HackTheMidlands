class Enemy extends PlayableObject {
    constructor(position, spriteName, name, speed, shootDelay) {
        super(position, spriteName, speed);
        this.name = name;
        this.bullets = [];
        this.shootDelay = shootDelay;
        this.shootCounter = 0;
        this.ticksSinceMove = 0;
        this.prevPos = [position[0], position[1]];
    }

    update() {
        super.update();
        if (this.prevPos[0] == this.position[0] && this.prevPos[1] == this.position[1]) {
            this.ticksSinceMove++;
            if (this.ticksSinceMove >= 120) {
                var stuck = true;
                while (stuck) {
                    var stillStuck = false;
                    this.position = [Math.random() * game.canvas.width, Math.random() * game.canvas.height];
                    this.hitbox.x = this.position[0];
                    this.hitbox.y= this.position[1];
                    for (const obj of game.objects) {
                        if(obj == this)
                            continue;
                        if (this.overlap(obj)) {
                            stillStuck = true;
                            break;
                        }
                    }
                    stuck = stillStuck;
                }
                this.ticksSinceMove = 0;
            }
        }
        else {
            this.ticksSinceMove = 0;
            this.prevPos = [this.position[0], this.position[1]];
        }
        this.bullets = this.bullets.filter(function (value, index, arr) {
            return !value.dead;
        });
        for (const bullet of this.bullets) {
            bullet.update();
        }
        if (this.shootCounter == this.shootDelay*2) {
            var xDis = game.player.position[0] - (this.position[0] + this.image.width);
            var yDis = game.player.position[1] - (this.position[1] + 0.5 * this.image.height);
            var xProp = Math.abs(xDis) / (Math.abs(xDis) + Math.abs(yDis));
            var yProp = Math.abs(yDis) / (Math.abs(xDis) + Math.abs(yDis));
            var xSpeed = 10 * (xDis > 0 ? xProp : -xProp);
            var ySpeed = 10 * (yDis > 0 ? yProp : -yProp);
            this.bullets.push(new Bullet([this.position[0] + this.image.width, this.position[1] + (this.image.height / 2)], 'bullet', [xSpeed, ySpeed], 5, this))
            this.shootCounter = 0;
        }
        this.shootCounter++;
        if(this.position[0] < this.moveRectangle[0][0])
            this.position[0] = this.moveRectangle[0][0]
        if(this.position[0] > this.moveRectangle[0][1])
            this.position[0] = this.moveRectangle[0][1]
        if(this.position[1] < this.moveRectangle[1][0])
            this.position[1] = this.moveRectangle[1][0]
        if(this.position[1] > this.moveRectangle[1][1])
            this.position[1] = this.moveRectangle[1][1]
        this.hitbox.x = this.position[0];
        this.hitbox.y= this.position[1];
        for(const object of game.objects){
            if(object == this)
                continue;
            if(this.overlap(object)){
                if(this.position[0] != this.oldX)
                    this.position[0] = this.oldX;
                if(this.position[1] != this.oldY)
                    this.position[1] = this.oldY;
                break;
            }
        }
    }

    draw(canvas) {
        super.draw(canvas)
        for (const bullet of this.bullets) {
            bullet.draw(canvas);
        }
    }
}
