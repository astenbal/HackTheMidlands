class Player extends PlayableObject {
    constructor(position, spriteName, name, speed) {
        super(position, spriteName, speed);
        this.name = name;
        this.bullets = [];
        this.keys = [];
        this.shouldShoot = false;
        this.shootdelay = 60;
        this.ticksSinceShot = 0;
        this.amountOfUpgrades = 0;
        this.prevHealth = this.hp;
    }

    handleKey(key) {
        if (key == 'w' || key == 'a' || key == 's' || key == 'd')
            this.move(key)
        else if (key == ' ')
            this.shoot()
        else if (key == 'v' || key == 'b' || key == 'n' || key == 'm')
            this.upgrade(key);
    }

    move(key, shouldPush = true) {
        const oldX = this.position[0]
        const oldY = this.position[1]
        if (shouldPush)
            this.keys.push(key);
        switch (this.keys[this.keys.length - 1]) {
            case 'w':
                this.position[1] -= this.speed;
                break;
            case 'a':
                this.position[0] -= this.speed;
                break;
            case 's':
                this.position[1] += this.speed;
                break;
            case 'd':
                this.position[0] += this.speed;
                break;
        }
        if(multiplayer)
            socket.emit('loc', this.position);
        if (this.position[0] < this.moveRectangle[0][0])
            this.position[0] = this.moveRectangle[0][0]
        if (this.position[0] > this.moveRectangle[0][1])
            this.position[0] = this.moveRectangle[0][1]
        if (this.position[1] < this.moveRectangle[1][0])
            this.position[1] = this.moveRectangle[1][0]
        if (this.position[1] > this.moveRectangle[1][1])
            this.position[1] = this.moveRectangle[1][1]
        this.hitbox.x = this.position[0];
        this.hitbox.y = this.position[1];
        for (const object of game.objects) {
            if (object == this)
                continue;
            if (this.overlap(object)) {
                if (this.position[0] != oldX)
                    this.position[0] = oldX;
                if (this.position[1] != oldY)
                    this.position[1] = oldY;
                break;
            }
        }
    }

    upgrade(key) {
        if (this.coins >= 50 + this.amountOfUpgrades * 10) {
            switch (key) {
                case 'v':
                    this.maxhp += 15;
                    this.hp += 15;
                    break;
                case 'b':
                    this.maxdef += 1;
                    this.def += 1;
                    break;
                case 'n':
                    this.maxspeed += 0.5;
                    this.speed += 0.5;
                    break;
                case 'm':
                    this.maxstr += 1;
                    this.str += 1;
                    break;
            }
            this.coins -= 50 + this.amountOfUpgrades * 10;
            this.amountOfUpgrades++;
            socket.emit('stats', [[this.maxhp, this.hp], [this.maxdef, this.def], [this.maxspeed, this.speed], [this.maxstr, this.str], this.coins]);
        }
    }

    stop(e) {
        this.keys = this.keys.filter(function (value, index, arr) { return value != e })
    }

    shoot(auto = true) {
        if ((auto && this.ticksSinceShot >= this.shootdelay) || (!auto & this.ticksSinceShot >= (this.shootdelay / 3))) {
            this.shouldShoot = true;
            var xDis = game.mouseX - (this.position[0] + this.image.width);
            var yDis = game.mouseY - (this.position[1] + 2.5 * this.image.height);
            var xProp = Math.abs(xDis) / (Math.abs(xDis) + Math.abs(yDis));
            var yProp = Math.abs(yDis) / (Math.abs(xDis) + Math.abs(yDis));
            var xSpeed = 10 * (xDis > 0 ? xProp : -xProp);
            var ySpeed = 10 * (yDis > 0 ? yProp : -yProp);
            var bulPos = [this.position[0] + this.image.width, this.position[1] + (this.image.height / 2)];
            var bulSpeed = [xSpeed, ySpeed];
            this.bullets.push(new Bullet(bulPos, 'bullet', bulSpeed, this.str, this))
            this.ticksSinceShot = 0;
            if(multiplayer){
                socket.emit('bul', [bulPos,bulSpeed, this.str]);
            }
        }
    }

    stopshoot() {
        this.shouldShoot = false;
    }

    update() {
        super.update();
        this.ticksSinceShot++;
        if (this.keys.length != 0)
            this.move(this.key, false);
        if (this.shouldShoot) {
            this.shoot()
        }
        this.bullets = this.bullets.filter(function (value, index, arr) {
            return !value.dead;
        });
        for (const bullet of this.bullets) {
            bullet.update();
        }
        if(this.prevHealth != this.hp && multiplayer){
            socket.emit('health', this.hp);
            this.prevHealth = this.hp;
        }
    }

    draw(canvas) {
        super.draw(canvas)
        for (const bullet of this.bullets) {
            bullet.draw(canvas);
        }
    }

}