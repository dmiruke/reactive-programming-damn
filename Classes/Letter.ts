import { Game } from "./Game";
import { GameVars } from "../Modules/GameVars";
import { Drawings } from "../Modules//Drawings";

export class Letter extends Game {
    letter : string;
    constructor(letter, x, y, speed = GameVars.DEFAULT_SPEED) {
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
        Drawings.drawText(this.letter, this.width, this.height, { fillStyle: '#fff' });
    }
    isOutOfBounds() {
        return this.width > 500 || this.height > 500 || this.width < 0 || this.width > 500
    }
}