class BulletEnemy extends Enemy{
    constructor(position, spriteName, name, speed, shootDelay){
        super(position, spriteName, name, speed, shootDelay);
        this.name = name;
        this.dir = Math.floor(Math.random() * 4);
        this.oldX = this.position[0]
        this.oldY = this.position[1]
    }

    update(){
      super.update();

      for(const bul of game.player.bullets){
        var futureBullet = [bul.position[0] + bul.speed[0]*5, bul.position[1] + bul.speed[1]*5];
        if(bul.position[0]>this.position[0]){
          this.position[0] -= this.speed;
        }
        else{
          this.position[0] += this.speed;
        }
        if(bul.position[1]>this.position[1]){
          this.position[1] -= this.speed;
        }
        else{
          this.position[1] += this.speed;
        }
        return;
      }
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
