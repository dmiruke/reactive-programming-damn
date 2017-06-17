import { Game } from "./Game";
import { Drawings } from "../Utils/Drawings";

export class Score extends Game {
    value : number;
    constructor(value :number) {
        super(50, 50, 0)
        this.value = value;
    }
    draw() {
        Drawings.drawText(this.value, this.width, this.height)
    }
    add(score) {
        this.value += score.value;
        return this;
    }
}