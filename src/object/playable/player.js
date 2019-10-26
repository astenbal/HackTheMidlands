class Player extends PlayableObject{
    constructor(position, spriteName, name){
        super(position, spriteName)
        this.name = name;
    }

    move(key){
        const oldX = this.position[0]
        const oldY = this.position[1]
        switch(key.key){
            case 'w':
                this.position[1] -= 10;
                break;
            case 'a':
                this.position[0] -= 10;
                break;
            case 's':
                this.position[1] += 10; 
                break;
            case 'd':
                this.position[0] += 10;
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
            console.log(this.overlap(object))
            console.log(this.position[0]);
            console.log(oldX);
            if(this.overlap(object)){
                if(this.position[0] != oldX)
                    this.position[0] = oldX;
                if(this.position[1] != oldY)
                    this.position[1] = oldY;
            }
            break;
        }
    }

    update(){
        super.update();
    }

}