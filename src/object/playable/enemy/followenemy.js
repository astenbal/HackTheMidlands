class FollowEnemy extends Enemy{
    constructor(location, spriteName, name, speed, shootDelay){
        super(location, spriteName, name, speed, shootDelay);
        this.name = name;
        this.oldX = this.position[0]
        this.oldY = this.position[1]
    }

    update(){
        super.update();
        this.oldX = this.position[0]
        this.oldY = this.position[1]
        var xdif = game.player.position[0] - this.position[0];
        var ydif = game.player.position[1] - this.position[1];

        var absxdif = Math.abs(xdif);
        var absydif = Math.abs(ydif);

        if(absxdif>absydif){
          if(game.player.position[0]>this.position[0]){
            this.position[0] += this.speed;
          }
          else if(game.player.position[0]<this.position[0]){
            this.position[0] -= this.speed;
          }
        }

        else{
          if(game.player.position[1]>this.position[1]){
            this.position[1] += this.speed;
          }
          else{
            this.position[1] -= this.speed;
          }
        }
    }
}
