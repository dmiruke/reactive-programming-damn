import { Game } from "./Game";
import { Drawings } from "../Utils/Drawings";
import { Words } from "../Utils/Words";

export class Background extends Game {
    constructor() {
        super(0, 0, 0)
    }
    draw() {
        Drawings.drawImage('.background-image', 0, 0, 500, 500)
    }

    cleanUp(gameObjects) {
        var letters = gameObjects.letters;
        var lettersToRemove = letters.filter(l => l.isOutOfBounds())
        lettersToRemove.forEach(l => {
            Words.removeLetter(l, letters);
        })
    }
}
