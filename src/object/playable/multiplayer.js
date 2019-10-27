class MultiPlayer extends Player{
    constructor(id, position){
        super(position, 'player', 'player', 3);
        this.id = id;
    }

    shoot(bulPos, bulSpeed, bulStr){
        this.bullets.push(new Bullet(bulPos, 'bullet', bulSpeed, bulStr, this))
    }
}