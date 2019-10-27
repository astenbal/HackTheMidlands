class PlayableObject extends GameObject{
    constructor(position, spriteName, speed, str = 5, def = 0){
        super(position, spriteName)
        this.speed = speed;
        this.maxspeed = speed;
        this.str = str;
        this.maxstr = str;
        this.def = def;
        this.maxdef = def;
        this.coins = 0;
    }

    update(){
        super.update();
    }

    draw(canvas){
        super.draw(canvas);
        canvas.fillStyle = "#FF0000";
        canvas.fillRect(this.position[0], this.position[1] - 10, this.image.width, 10);
        canvas.fillStyle = "#00FF00";
        canvas.fillRect(this.position[0], this.position[1] - 10, this.image.width * (this.hp / this.maxhp), 10);
    }
}