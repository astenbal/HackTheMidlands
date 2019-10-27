class Wall extends Obstacle{
    constructor(position, spriteName, breaking){
        super(position, spriteName)
        this.breaking = breaking;
        this.broken = false;
        this.def = 0;
    }

    update(){
        super.update();
        if(this.hp < this.maxhp/2 && !this.broken){
            this.image = document.getElementById(this.breaking);
        }
        else if(this.broken){
            this.image = document.getElementById(this.spriteName);
        }
    }
}