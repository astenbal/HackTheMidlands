class Enemy extends PlayableObject{
    constructor(location, spriteName, name, speed){
        super(location, spriteName, speed);
        this.name = name;
        this.bullets = [];
    }

    update(){
        super.update();
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