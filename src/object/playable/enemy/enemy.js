class Enemy extends PlayableObject{
    constructor(location, spriteName, name, speed, shootDelay){
        super(location, spriteName, speed);
        this.name = name;
        this.bullets = [];
        this.shootDelay = shootDelay;
        this.shootCounter = 0;
    }

    update(){
        super.update();
        this.bullets = this.bullets.filter(function(value, index, arr){
            return !value.dead;               
        });
        for(const bullet of this.bullets){
            bullet.update();
        }
        if(this.shootCounter == this.shootDelay){
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
    }
    
    draw(canvas){
        super.draw(canvas)
        for(const bullet of this.bullets){
            bullet.draw(canvas);
        }
    }
}