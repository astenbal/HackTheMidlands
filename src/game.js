class Game{
    constructor(canvasID){
        this.canvas = document.getElementById(canvasID);
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight - 100;
        this.context = this.canvas.getContext('2d');
        this.player = new Player([0,0], 'player', 'player', 3);
        this.objects = [this.player, new RandomEnemy([300, 500], 'enemy', 'Carl', 3)];
        for(var i = 0; i < 20; i++){
            var suc = this.addObject(new Wall([Math.random() * this.canvas.width, Math.random() * this.canvas.height], 'wall'));
            if(!suc)
                i--;
        }
        this.mouseX = 0;
        this.mouseY = 0;
        console.log(this.player);
        window.onkeydown = function(e){game.player.handleKey(e.key);};
        window.onkeyup = function(e){game.player.stop()};
        window.onmousedown = function(e){game.player.shoot()};
        window.onmousemove = function(e){game.mouseX = e.screenX; game.mouseY = e.screenY; }
    }

    update(){
        for(const object of this.objects){
            object.update();
        }
    }

    draw(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for(const object of this.objects){
            object.draw(this.context);
        }
    }
    
    addObject(object){
        for(const obj of this.objects){
            if(object.overlap(obj)){
                return false;
            }
        }
        this.objects.push(object)
        return true;
    }
}

var game = new Game('game');

function Main(){
    game.update();
    game.draw();
    window.setTimeout(Main, 1000 / 120);
}