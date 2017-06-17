/* DOMAIN MODEL */
import { GameVars } from '../Modules/GameVars';
export abstract class Game {
    width: number;
    height: number;
    speed: number;

    intervalGame: number = GameVars.INTERVAL_GAME
    defaultSpeed: number = GameVars.DEFAULT_SPEED
    lives: number = GameVars.LIVES

    constructor(width: number, height: number, speed: number) {
        this.width = width
        this.height = height
        this.speed = speed
    }
    update() { }
    draw() { }
}
