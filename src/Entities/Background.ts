import { Game } from "./Game";
import { Drawings } from "../Modules/Drawings";
import { Words } from "../Modules/Words";
import { Voice } from "../Modules/Voice";

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

    gameOver() {
        Drawings.drawRectangle(0, 0, 500, 500)
        let textStyle = { fillStyle: 'red', font: '52px Chewy' }
        Drawings.drawText('GAME OVER', 150, 240, textStyle)
        Drawings.drawText('MOTHERFUCKER', 100, 300, textStyle)
        Voice.say('GAME OVER MOTHER FUCKER')
    }
}
