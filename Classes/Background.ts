import { Game } from "./Game";
import { Utils } from "./Utils";

export class Background extends Game {
    constructor() {
        super(0, 0, 0)
    }
    draw() {
        Utils.drawImage('.background-image', 0, 0, 500, 500)
    }
}
