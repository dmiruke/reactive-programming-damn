export module Words {

    export function getRandomLetter() {
        return String.fromCharCode(97 + Math.floor(Math.random() * 26))
    }

    export function removeLetter(letter, letters) {
        let idx = letters.indexOf(letter)
        letters.splice(idx, 1)
    }

    export function findLetterMatchingWord(letters, word) {
        return letters.find(l => word.toLowerCase().startsWith(l.letter))
    }

    export function matchWords({gameObjects, userWord}, success: Function) {
        console.log(`matching ${userWord} with ${gameObjects.letters.map(l => l.letter)}`);
        const letterMatched = Words.findLetterMatchingWord(gameObjects.letters, userWord);
        if (letterMatched) {
            Words.removeLetter(letterMatched, gameObjects.letters)
            success();
        }
    }

}