class Game{
    constructor(canvasID){
        this.canvas = document.getElementById(canvasID).getContext('2d');
        this.objects = [];
    }

    update(){
        for(const object of objects){
            object.update();
        }
    }

    draw(){
        for(const object of objects){
            object.draw();
        }
    }
}