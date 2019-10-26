class Player extends PlayableObject{
    constructor(position, spriteName, name){
        super(position, spriteName)
        this.name = name;
        this.reverse = false;
    }

    move(key){
        switch(key.key){
            case 'w':
                this.position[1]+= -10;
                break;
            case 'a':
                this.position[0]+= -10;
                break;
            case 's':
                this.position[1]+= 10; 
                break;
            case 'd':
                this.position[0] += 10;
                break;
        }
    }

    update(){
        /*if(this.position[0] >= window.innerWidth || this.position[0] <= 0){
            this.reverse = !this.reverse;
            this.position[1] += 30;
        }
        if(this.reverse)
        {
            this.position[0]-= 10;
        }
        else{
            this.position[0]+= 10;
        }*/
    }

}