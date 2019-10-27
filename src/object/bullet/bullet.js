class Bullet extends GameObject {
    constructor(position, spriteName, speed, power, parent) {
        super(position, spriteName);
        this.speed = speed;
        this.power = power;
        this.dead = false;
        this.parent = parent;
    }

    update() {
        super.update();
        this.position[0] += this.speed[0];
        this.position[1] += this.speed[1];
        this.hitbox.x = this.position[0];
        this.hitbox.y = this.position[1];
        var objects = game.objects;
        for (const object of game.objects) {
            if (object == this.parent)
                continue;
            if (this.overlap(object)) {
                if(this.parent instanceof MultiPlayer)
                    console.log(this.hitbox)
                object.hp -= this.power - object.def;
                if (object.hp <= 0) {
                    if(object instanceof Wall)
                        this.parent.coins += 50;
                    else if(object instanceof Enemy)
                        this.parent.coins += 100;
                    object.alive = false;
                    objects = objects.filter(function (value, index, arr) {
                        return value != object;
                    });
                    game.enemies = game.enemies.filter(function (value, index, arr) {
                        return value != object;
                    });
                    game.blocks = game.blocks.filter(function (value, index, arr) {
                        return value != object;
                    });
                }
                this.dead = true;
                break;
            }
        }
        game.objects = objects;

        if (this.position[0] < this.moveRectangle[0][0] || this.position[0] > this.moveRectangle[0][1] || this.position[1] < this.moveRectangle[1][0] ||
            this.position[1] > this.moveRectangle[1][1])
            this.dead = true;
    }
}