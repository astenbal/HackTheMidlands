class Game {
    constructor(canvasID) {
        this.canvas = document.getElementById(canvasID);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 100;
        this.context = this.canvas.getContext('2d');
        this.player = new Player([0, 0], 'player', 'player', 3);
        this.enemies = [];
        this.blocks = [];
        this.objects = [this.player];
        for (var i = 0; i < 20; i++) {
            var suc = this.addObject(new Wall([Math.random() * this.canvas.width, Math.random() * this.canvas.height], 'wall'), 'block');
            if (!suc)
                i--;
        }
        for (var i = 0; i < Math.ceil(Math.random() * 3); i++) {
            var suc = this.addObject(new RandomEnemy([Math.random() * this.canvas.width, Math.random() * this.canvas.height], 'enemy', 'Carl', Math.ceil(Math.random() * 5), Math.ceil((Math.random() * 50) + 50)), 'enemy');
            if (!suc)
                i--;
        }
        this.mouseX = 0;
        this.mouseY = 0;
        this.ticksSinceWaveEnd = 0;
        this.ticksSinceNewBlock = 0;
        this.waveTimer = 600;
        this.blockTimer = 600;
        window.onkeydown = function (e) { game.player.handleKey(e.key); };
        window.onkeyup = function (e) { game.player.stop(e.key) };
        window.onmousedown = function (e) { game.player.shoot(false) };
        window.onmouseup = function (e) { game.player.stopshoot() };
        window.onmousemove = function (e) { game.mouseX = e.screenX; game.mouseY = e.screenY; }
    }

    update() {
        for (const object of this.objects) {
            object.update();
        }
        if (this.enemies.length == 0){
            this.ticksSinceWaveEnd++;
            if(this.ticksSinceWaveEnd >= this.waveTimer){
                for (var i = 0; i < Math.ceil(Math.random() * 3); i++) {
                    var suc = this.addObject(new RandomEnemy([Math.random() * this.canvas.width, Math.random() * this.canvas.height], 'enemy', 'Carl', Math.ceil(Math.random() * 5), Math.ceil((Math.random() * 50) + 50)), 'enemy');
                    if (!suc)
                        i--;
                }
                this.ticksSinceWaveEnd = 0;
            }
        }

        if(this.blocks.length <= 10){
            if(this.ticksSinceNewBlock >= this.blockTimer){
                for (var i = 0; i < 1; i++) {
                    var suc = this.addObject(new Wall([Math.random() * this.canvas.width, Math.random() * this.canvas.height], 'wall'), 'block');
                    if (!suc)
                        i--;
                }
            }
        }
        this.ticksSinceNewBlock++;
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (const object of this.objects) {
            object.draw(this.context);
        }
    }

    addObject(object, type) {
        for (const obj of this.objects) {
            if (object.overlap(obj)) {
                return false;
            }
        }
        switch (type) {
            case "enemy":
                this.enemies.push(object);
                break;
            case "block":
                this.blocks.push(object);
                break;
        }
        this.objects.push(object)
        return true;
    }
}

var game = new Game('game');

function Main() {
    game.update();
    game.draw();
    window.setTimeout(Main, 1000 / 120);
}