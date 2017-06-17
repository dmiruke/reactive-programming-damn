import { Observable } from "rxjs";
import { Subject } from "rxjs";

import { Background } from "./Classes/Background";
import { Score } from "./Classes/Score";
import { Player } from "./Classes/Player";
import { Letter } from "./Classes/Letter";
import { Drawings } from "./Utils/Drawings";
import { Words } from "./Utils/Words";
import { GameVars } from "./Utils/GameVars";

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
    .interval(GameVars.INTERVAL_WORD)
    //Generate new random letter in random position
    .map(_ => new Letter(Words.getRandomLetter(), Drawings.getRandomPosition(0, 500), 0))
    //Push generateed letter in an array of letter
    .scan((letters, newLetter) => {
        console.log('generate new letter');
        letters.push(newLetter)
        return letters
    }, [])

//Player Observable
var player$: Observable<Player> = Observable
    //Generate new player
    .of(new Player(340, 20, GameVars.LIVES));

//Game Loop
var gameLoop$: Observable<number> = Observable.interval(GameVars.INTERVAL_GAME)

var game$: Observable<any> = gameLoop$
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

        player$.subscribe(p => p.getLivesLeft(gameObjects))
        background$.subscribe(p => p.cleanUp(gameObjects))
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
    Drawings.appendToDom(gou.userWord);
});

function matchWords({ gameObjects, userWord }) {
    console.log(`matching ${userWord} with ${gameObjects.letters.map(l => l.letter)}`);
    var letterMatched = Words.findLetterMatchingWord(gameObjects.letters, userWord)
    if (letterMatched) {
        Words.removeLetter(letterMatched, gameObjects.letters)
        console.log('matched word')
        updateScore(100);
    }
}

function updateScore(score) {
    console.log('scored!');
    ScoreSubject.next(score)
}

function gameOver() {
    Drawings.drawRectangle(0, 0, 500, 500)
    let textStyle = { fillStyle: 'red', font: '52px Chewy' }
    Drawings.drawText('GAME OVER', 150, 240, textStyle)
    Drawings.drawText('MOTHERFUCKER', 100, 300, textStyle)
    say('GAME OVER MOTHER FUCKER')
}


function say(something) {
    if (!speechSynthesis) return;
    var speechUtterance = new SpeechSynthesisUtterance(something);
    speechSynthesis.speak(speechUtterance);
}
