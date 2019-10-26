class GameObject{
    constructor(position, spriteName){
        this.position = position
        this.spriteName = spriteName
    }

    update(){
        //throw('NotImplemented');
    }

    draw(canvas){
        canvas.drawImage(document.getElementById(this.spriteName), this.position[0], this.position[1])
    }
}