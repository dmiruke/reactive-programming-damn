import { Observable } from "rxjs";
import { Subject } from "rxjs";
import { Background } from "./Classes/Background";
import { Score } from "./Classes/Score";
import { Player } from "./Classes/Player";
import { Letter } from "./Classes/Letter";
import { Utils } from "./Classes/Utils";

say('START GAME NOW!');

/* VOICE STUFF */
var commands = {
    '*word': word => {
        console.log('user said: ', word);
        userWords$.next(word);
    }
};
// Add our commands to annyang
annyang.addCommands(commands);
// Start listening. You can call this here, or attach this call to an event, button, etc.
annyang.start();

var userWords$ = new Subject()
var ScoreSubject = new Subject()

//Score Observable
var score$: Observable<Score> = ScoreSubject
    .startWith(0)
    .map((v: number) => new Score(v))
    .scan((prev, cur) => prev.add(cur), new Score(0))

//Background Observable
var background$: Observable<Background> = Observable
    .of(new Background())

//Letters Observable
var letters$: Observable<Letter[]> = Observable
    //Every INVERVAL_WORD time
    .interval(Utils.INTERVAL_WORD)
    //Generate new random letter in random position
    .map(_ => new Letter(Utils.getRandomLetter(), Utils.getRandomPosition(0, 500), 0))
    //Push generateed letter in an array of letter
    .scan((letters, newLetter) => {
        console.log('generate new letter');
        letters.push(newLetter)
        return letters
    }, [])

//Player Observable
var player$: Observable<Player> = Observable
    //Generate new player
    .of(new Player(340, 20, Utils.LIVES));

//Game Loop
var gameLoop$: Observable<number> = Observable.interval(Utils.INTERVAL_GAME)

var game$ : Observable<any> = gameLoop$
    .combineLatest(background$, letters$, score$, player$, (_, b, l, s, p) => {
        var gameObjects = { letters: l, player: p, all: [b, s, p, ...l] }
        return gameObjects
    })
    //.sample(Utils.INTERVAL_GAME)
    .takeWhile(go => !go.player.isDead())
    .share()

//Subscribe and update game information
game$
    .subscribe((gameObjects) => {
        gameObjects
            .all
            .forEach(g => {
                g.update()
                g.draw()
            })
        computeLivesLeft(gameObjects);
        cleanUp(gameObjects);
    },
    (error) => { console.error('ERROR: ', error) },
    () => gameOver())

//Match said words
var userWordsAndGame$ = game$
    .combineLatest(userWords$, (gameObjects, userWord) => {
        return { gameObjects, userWord }
    })
    .distinct(o => o.userWord)

    
userWordsAndGame$.subscribe((gou) => {
    matchWords(gou);
    Utils.appendToDom(gou.userWord);
});


function computeLivesLeft(gameObjects) {
    var letters = gameObjects.letters;
    var livesLost = letters
        .filter(l => l.isOutOfBounds())
        .length;
    gameObjects.player.loseLives(livesLost);
    if (livesLost) console.log('lives lost!', livesLost);
}

function cleanUp(gameObjects) {
    var letters = gameObjects.letters;
    var lettersToRemove = letters.filter(l => l.isOutOfBounds())
    lettersToRemove.forEach(l => {
        //console.log('remove out of bounds letter', l)
        removeLetter(l, letters);
    })
}

function matchWords({ gameObjects, userWord }) {
    console.log(`matching ${userWord} with ${gameObjects.letters.map(l => l.letter)}`);
    var letterMatched = findLetterMatchingWord(gameObjects.letters, userWord)
    if (letterMatched) {
        removeLetter(letterMatched, gameObjects.letters)
        console.log('matched word')
        updateScore(100);
    }
}

function findLetterMatchingWord(letters, word) {
    return letters.find(l => word.toLowerCase().startsWith(l.letter))
}

function removeLetter(letter, letters) {
    let idx = letters.indexOf(letter)
    letters.splice(idx, 1)
}

function updateScore(score) {
    console.log('scored!');
    ScoreSubject.next(score)
}



function gameOver() {
    Utils.drawRectangle(0, 0, 500, 500)
    let textStyle = { fillStyle: 'red', font: '52px Chewy' }
    Utils.drawText('GAME OVER', 150, 240, textStyle)
    Utils.drawText('MOTHERFUCKER', 100, 300, textStyle)
    say('GAME OVER MOTHER FUCKER')
}



function say(something) {
    if (!speechSynthesis) return;
    var speechUtterance = new SpeechSynthesisUtterance(something);
    speechSynthesis.speak(speechUtterance);
}
