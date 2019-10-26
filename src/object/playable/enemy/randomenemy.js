class RandomEnemy extends Enemy{
    constructor(location, spriteName, name, speed, shootDelay){
        super(location, spriteName, name, speed, shootDelay);
        this.name = name;
        this.dir = Math.floor(Math.random() * 4);
        this.oldX = this.position[0]
        this.oldY = this.position[1]
    }

    update(){
        super.update();
        if(Math.random() < 0.01 || (this.oldX == this.position[0] && this.oldY == this.position[1])){
            this.dir = Math.floor(Math.random() * 4)
        }
        this.oldX = this.position[0]
        this.oldY = this.position[1]
        switch(this.dir){
            case 0:
                this.position[1] -= this.speed;
                break;
            case 1:
                this.position[0] -= this.speed;
                break;
            case 2:
                this.position[1] += this.speed; 
                break;
            case 3:
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
                if(this.position[0] != this.oldX)
                    this.position[0] = this.oldX;
                if(this.position[1] != this.oldY)
                    this.position[1] = this.oldY;
                break;
            }
        }
    }
}