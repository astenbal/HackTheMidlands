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
    }
}