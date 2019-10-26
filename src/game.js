class Game{
    constructor(canvasID){
        this.canvas = document.getElementById(canvasID);
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext('2d');
        this.player = new Player([1,0], 'player', 'player');
        this.objects = [this.player];
        console.log(this.player);
        window.onkeyup = function(e){game.player.move(e)};
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
        this.objects.push(object)
    }
}

var game = new Game('game');

function Main(){
    game.update();
    game.draw();
    window.setTimeout(Main, 60);
}