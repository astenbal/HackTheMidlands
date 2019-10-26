class PlayableObject extends GameObject{
    constructor(position, spriteName){
        super(position, spriteName)
    }

    update(){
        this.hitbox.x = this.position[0];
        this.hitbox.y= this.position[1];
    }
}