class Player extends PlayableObject{
    constructor(position, spriteName, name){
        super(position, spriteName)
        this.name = name;
        this.reverse = false;
    }

    update(){
        if(this.position[0] >= window.innerWidth || this.position[0] <= 0){
            this.reverse = !this.reverse;
            this.position[1] += 30;
        }
        if(this.reverse)
        {
            this.position[0]-= 10;
        }
        else{
            this.position[0]+= 10;
        }
    }

}