export module Drawings {
    export function drawImage(image, x, y, width, height) {
        var ctx = getContext()
        var img = document.querySelector(image)
        ctx.drawImage(img, x, y, width, height)
    }

    export function getContext() {
        var canvas = document.getElementById("game")
        return canvas.getContext("2d")
    }

    export function drawText(text, x, y, { fillStyle = "yellow", font = "48px Chewy" } = {}) {
        var ctx = getContext()
        ctx.font = font
        ctx.fillStyle = fillStyle
        ctx.fillText(text, x, y)
    }

    export function drawRectangle(x, y, width, height, color = "#000") {
        var ctx = getContext()
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, 500, 500)
    }



    export function appendToDom(word) {
        var ul = document.querySelector('.matches')
        var li = document.createElement('li')
        li.textContent = word;
        ul.appendChild(li);
    }

    export function getRandomPosition(min, max) {
        return Math.floor(Math.random() * max - min)
    }
}