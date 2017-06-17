
import { Game } from "./Game";
import { Drawings } from "../Modules/Drawings";


export class Player extends Game {
    lives: number;

    constructor(width: number, height: number, lives) {
        super(width, height, 0)
        this.lives = lives
    }

    isDead() { return this.lives <= 0; }

    loseLives(livesLost) {
        this.lives -= livesLost;
    }
    draw() {
        for (var i = 0; i < this.lives; i++) {
            Drawings.drawImage('.heart', this.width + i * 30, this.height, 30, 30)
        }
    }
    getLivesLeft(gameObjects) {
        var letters = gameObjects.letters;
        var livesLost = letters
            .filter(l => l.isOutOfBounds())
            .length;
        gameObjects.player.loseLives(livesLost);
        if (livesLost) console.log('lives lost!', livesLost);
    }

}