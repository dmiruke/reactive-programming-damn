import { Observable } from "rxjs";
import { Subject } from "rxjs";

import { Background } from "./Entities/Background";
import { Score } from "./Entities/Score";
import { Player } from "./Entities/Player";
import { Letter } from "./Entities/Letter";
import { Drawings } from "./Modules/Drawings";
import { Words } from "./Modules/Words";
import { Voice } from "./Modules/Voice";
import { GameVars } from "./Modules/GameVars";

Voice.say('START GAME NOW!');
/* VOICE STUFF */
var commands = {
    '*word': word => {
        console.log('user said: ', word);
        userWords$.next(word);
    }
};
Voice.configureVoiceRecognition(commands);

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
    //FUKKU, please https://github.com/tc39/proposal-object-rest-spread#rest-properties
        var gameObjects = { letters: l, player: p, background: b, all: [b, s, p, ...l] }
        return gameObjects
    })
    //.sample(gameLoop$)
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
    () => background$.subscribe((b) => b.gameOver()))

//Match said words
var userWordsAndGame$ = game$
    .combineLatest(userWords$, (gameObjects, userWord) => {
        return { gameObjects, userWord }
    })
    .distinct(o => o.userWord)


userWordsAndGame$.subscribe((gou) => {
    Words.matchWords(gou, function () {
        console.log('matched word')
        console.log('scored!');
        ScoreSubject.next(100)
    });
    Drawings.appendToDom(gou.userWord);
});

