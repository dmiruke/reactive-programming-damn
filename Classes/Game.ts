/* DOMAIN MODEL */
export abstract class Game {
    width: number;
    height: number;
    speed: number;

    constructor(width: number, height: number, speed: number) {
        this.width = width
        this.height = height
        this.speed = speed
    }
    update() { }
    draw() { }
}
