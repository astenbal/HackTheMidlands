class StatMenu extends MenuObject {
    constructor(position, owner, defIcon, strIcon, speedIcon, hpIcon, coinIcon) {
        super(position);
        this.owner = owner;
        this.defIcon = document.getElementById(defIcon);
        this.strIcon = document.getElementById(strIcon);
        this.speedIcon = document.getElementById(speedIcon);
        this.hpIcon = document.getElementById(hpIcon);
        this.coinIcon = document.getElementById(coinIcon);
    }

    draw(canvas) {
        canvas.beginPath();
        canvas.rect(this.position[0], this.position[1], 400, 100);
        canvas.stroke();
        canvas.textAlign = 'left'
        canvas.font = "20px Arial";
        canvas.drawImage(this.hpIcon, this.position[0] + 5, this.position[1] + 5);
        game.context.fillText(Math.floor(this.owner.hp) + '/' + this.owner.maxhp, this.position[0] + 55, this.position[1] + 45);
        canvas.drawImage(this.defIcon, this.position[0] + 125, this.position[1] + 5);
        game.context.fillText(this.owner.def + '/' + this.owner.maxdef, this.position[0] + 175, this.position[1] + 45);
        canvas.drawImage(this.speedIcon, this.position[0] + 5, this.position[1] + 50);
        game.context.fillText(this.owner.speed + '/' + this.owner.maxspeed, this.position[0] + 55, this.position[1] + 75);
        canvas.drawImage(this.strIcon, this.position[0] + 125, this.position[1] + 50);
        game.context.fillText(this.owner.str + '/' + this.owner.maxstr, this.position[0] + 175, this.position[1] + 75);
        canvas.drawImage(this.coinIcon, this.position[0] + 250, this.position[1] + 5);
        game.context.fillText(this.owner.coins, this.position[0] + 300, this.position[1] + 45);
    }
}