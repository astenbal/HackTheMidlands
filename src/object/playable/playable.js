class PlayableObject extends GameObject{
    constructor(position, spriteName, speed){
        super(position, spriteName)
        this.speed = speed;
    }

    update(){
        
    }

    draw(canvas){
        super.draw(canvas);
        canvas.fillStyle = "#FF0000";
        canvas.fillRect(this.position[0], this.position[1] - 10, this.image.width, 10);
        canvas.fillStyle = "#00FF00";
        canvas.fillRect(this.position[0], this.position[1] - 10, this.image.width * (this.hp / this.maxhp), 10);
    }
}