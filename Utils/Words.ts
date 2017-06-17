export module Words {

    export function getRandomLetter() {
        var letter = String.fromCharCode(97 + Math.floor(Math.random() * 26))
        return letter
    }

    export function removeLetter(letter, letters) {
        let idx = letters.indexOf(letter)
        letters.splice(idx, 1)
    }

    export function findLetterMatchingWord(letters, word) {
        return letters.find(l => word.toLowerCase().startsWith(l.letter))
    }

}