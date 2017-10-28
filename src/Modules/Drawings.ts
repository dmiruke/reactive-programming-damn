export module Drawings {
    export function drawImage(image, x, y, width, height) {
        const ctx = getContext();
        const img = document.querySelector(image);
        ctx.drawImage(img, x, y, width, height)
    }

    export function getContext() {
        const canvas = document.getElementById("game");
        return canvas.getContext("2d")
    }

    export function drawText(text, x, y, {fillStyle = "yellow", font = "48px Chewy"} = {}) {
        const ctx = getContext();
        ctx.font = font
        ctx.fillStyle = fillStyle
        ctx.fillText(text, x, y)
    }

    export function drawRectangle(x, y, width, height, color = "#000") {
        const ctx = getContext();
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, 500, 500)
    }


    export function appendToDom(word) {
        const ul = document.querySelector('.matches');
        const li = document.createElement('li');
        li.textContent = word;
        ul.appendChild(li);
    }

    export function getRandomPosition(min, max) {
        return Math.floor(Math.random() * max - min)
    }
}