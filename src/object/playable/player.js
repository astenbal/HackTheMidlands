class Player extends PlayableObject{
    constructor(position, spriteName, name, speed){
        super(position, spriteName, speed);
        this.name = name;
        this.bullets = [];
        this.keys = [];
    }

    handleKey(key){
        if (key == 'w' || key == 'a' || key == 's' || key == 'd')
            this.move(key)
        else if(key == ' ')
            this.shoot()
    }

    move(key, shouldPush = true){
        const oldX = this.position[0]
        const oldY = this.position[1]
        if(shouldPush)
            this.keys.push(key);
        switch(this.keys[this.keys.length-1]){
            case 'w':
                this.position[1] -= this.speed;
                break;
            case 'a':
                this.position[0] -= this.speed;
                break;
            case 's':
                this.position[1] += this.speed; 
                break;
            case 'd':
                this.position[0] += this.speed;
                break;
        }
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
                if(this.position[0] != oldX)
                    this.position[0] = oldX;
                if(this.position[1] != oldY)
                    this.position[1] = oldY;
                break;
            }
        }
    }

    stop(e){
        this.keys = this.keys.filter(function(value, index, arr) { return value != e})
    }

    shoot(){
        var xDis = game.mouseX - (this.position[0] + this.image.width);
        var yDis = game.mouseY - (this.position[1] + 2.5 * this.image.height);
        var xProp = Math.abs(xDis) / (Math.abs(xDis) + Math.abs(yDis));
        var yProp = Math.abs(yDis) / (Math.abs(xDis) + Math.abs(yDis));
        var xSpeed = 10 * (xDis > 0 ? xProp : -xProp);
        var ySpeed = 10 * (yDis > 0 ? yProp : -yProp);
        this.bullets.push(new Bullet([this.position[0] + this.image.width, this.position[1] + (this.image.height / 2)], 'bullet', [xSpeed, ySpeed], 5, this))
    }

    update(){
        super.update();
        if(this.keys.length != 0)
            this.move(this.key, false);
        this.bullets = this.bullets.filter(function(value, index, arr){
            return !value.dead;               
        });
        for(const bullet of this.bullets){
            bullet.update();
        }
    }
    
    draw(canvas){
        super.draw(canvas)
        for(const bullet of this.bullets){
            bullet.draw(canvas);
        }
    }

}