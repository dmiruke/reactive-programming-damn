
import { Game } from "./Game";
import { Utils } from "./Utils";


export class Player extends Game {
    lives : number;
    
    constructor(width: number, height : number, lives) {
        super(width, height, 0)
        this.lives = lives
    }
    isDead() { return this.lives <= 0; }
    loseLives(livesLost) {
        this.lives -= livesLost;
    }
    draw() {
        for (var i = 0; i < this.lives; i++) {
            Utils.drawImage('.heart', this.width + i * 30, this.height, 30, 30)
        }
    }
}