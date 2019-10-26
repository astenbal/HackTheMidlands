class GameObject{
    constructor(position, spriteName, hp = 100, invulnerable = false, regen = true){
        this.position = position
        this.image = document.getElementById(spriteName);
        this.moveRectangle = [[0, window.innerWidth-this.image.width], [0, window.innerHeight - this.image.height - 50]];
        this.hitbox = {x: this.position[0], y: this.position[1], width: this.image.width, height: this.image.height}
        this.maxhp = hp;
        this.hp = hp;
        this.invulnerable = invulnerable;
        this.regen = regen;
        this.ticksSinceRegen = 0;
        this.regenAmount = 0.01;
        this.regenSpeed = 100;
    }

    update(){
        //throw('NotImplemented');
        if(this.regen && this.ticksSinceRegen >= this.regenSpeed){
            this.hp += this.maxhp * this.regenAmount;
            this.hp = Math.min(this.hp, this.maxhp);
            this.ticksSinceRegen = 0;
        }
        this.ticksSinceRegen++;
    }

    draw(canvas){
        canvas.drawImage(this.image, this.position[0], this.position[1])
    }

    overlap(object){
        var hb = object.hitbox;
        if(this.hitbox.x < hb.x + hb.width &&
            this.hitbox.x + this.hitbox.width > hb.x &&
            this.hitbox.y < hb.y + hb.height &&
            this.hitbox.y + this.hitbox.height > hb.y)
            return true;
        return false;
    }
}