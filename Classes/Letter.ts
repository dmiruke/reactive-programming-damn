import { Game } from "./Game";
import { Utils } from "./Utils";

export class Letter extends Game {
    letter : string;
    constructor(letter, x, y, speed = Utils.DEFAULT_SPEED) {
        console.log(`new letter: ${letter}`)
        super(x, y, speed)
        this.letter = letter
    }
    update() {
        this.height = this.height + this.speed
    }
    draw() {
        //console.log('drawing letter');
        var canvas = document.getElementById("game")
        Utils.drawText(this.letter, this.width, this.height, { fillStyle: '#fff' });
    }
    isOutOfBounds() {
        return this.width > 500 || this.height > 500 || this.width < 0 || this.width > 500
    }
}