
Originally posted on [https://samueleresca.net/](https://samueleresca.net) 

This article is about Reactive programming, a lot of topics inside the article are language independent and [pattern oriented](https://samueleresca.net/2016/08/solid-principles-using-typescript/). The article is NOT about ReactJS.

Obviously, "DAMN."  is a tribute to the new album by Kendrick Lamar,

![](https://media.giphy.com/media/3o7btTV6kjvYgEaUqA/giphy.gif)

> **_“_****_Reactive_ ****_programming_**_ is an asynchronous __[programming paradigm](https://en.wikipedia.org/wiki/Programming_paradigm)__ concerned with __[data streams](https://en.wikipedia.org/wiki/Dataflow_programming)__ and the propagation of change__.”_ _- Wikipedia_

The reactive programming paradigm has gained a lot of popularity in the recent years as a model that aims to simplify the implementation of event-driven applications and the execution of asyncronous code.

#### Reactive manifesto

Systems built as Reactive systems are more **flexible**, **loosely-coupled** and **scalable**. This makes them easier to develop and amenable to change. They are significantly more tolerant of failure and when failure does occur they meet it with elegance rather than disaster. Reactive systems are highly responsive, giving users effective interactive feedback. Reactive systems are:

*   Responsive;
*   Resilient;
*   Elastic (Scalable);
*   Message driven (Component);

You can find and sign the reactive manifesto here:  [http://www.reactivemanifesto.org/](http://www.reactivemanifesto.org/)

#### Start to think functional

The following points are what some of the functional programming languages exhibits:

*   **First-class functions:** this means the language supports passing functions as arguments to other functions, returning them as the values from other functions, and assigning them to variables or storing them in data structures;
*   **Higher-order functions:  **higher-order function is a function that does at least one of the following: take one or more functions as an input, output a function;
*   **Lexical Closure:  ** closure (also lexical closure or function closure) is a function together with a referencing environment for the non-local variables of that function;
*   **Immutable Data:** an immutable object is an object whose state cannot be modified after it is created;
*   **Lazy Evaluation: **is an evaluation strategy which delays the evaluation of an expression until its value is needed and which also avoids repeated evaluations;

### ReactiveX

[Reactivex.io](http://reactivex.io) implements the best idea from  **Observer pattern**, the **Iterator pattern** and **functional programming**. The **Observer pattern** lets a number of observers get notified when something changes in a subject that they are observing. The **Iterator pattern** lets us abstract how we iterate over a specific collection by wrapping this iteration inside an object and providing a uniform API. [Reactivex.io](http://reactivex.io) is not a specific-language library, in fact it is available for almost all languages: [http://reactivex.io/languages.html](http://reactivex.io/languages.html).

#### Pattern implementation

ReactiveX extends the observer pattern to support sequences of data and/or events and adds operators that allow you to compose sequences together declaratively while abstracting away concerns about things like **low-level threading**, **synchronization**, **thread-safety**, **concurrent data structures**, and **non-blocking I/O**. Here is the UML diagram that describe the **observer pattern** implementation: ![Reactive programming](https://samueleresca.net/wp-content/uploads/2017/06/observer_pattern_UML-960x396.png)

#### Operators

An important feature of Reactive extensions are **operators**. Data streams can be combined with operators **to link Observables together and change their behaviours**. There are different type of operators, for example debounceTime() ( we have seen it before) or filter, which can emit only specific items from an Observable that pass a predicate test. Here is the complete list which shows how to use [the variety of Observable operators.](http://reactivex.io/documentation/operators.html) [RxMarbales.com](http://rxmarbles.com/) combines Observable operators with [**marble diagrams**](http://rxwiki.wikidot.com/marble-diagrams) (which describe data flows) and provides for each operator a concrete example.

### ReactiveX _in practice (on data, events and promises)_

First of all, reactive extensions act on **every type** of **collection and arrays**. Let's take the following snippet:
```javascript
[1,2,3].map(value=>value*10)
 .forEach(value=>
     console.log(value)
  );
 //10
 //20
 //30
```
we can implement the same thing using `Observable <T> ` : 

```javascript
 Observable.of(1,2,3)
 .map(value=>value*10)
 .subscribe(value=>
     console.log(value)
  );
 //10
 //20
 //30
```

_Why we should use `Observable <T>` rather than a simple array? _

  The difference between an array and a `Observable <T>` is that `Array` is a **collection of items,** an `Observable` is a collection of items **over time.** The key point is **TIME**. Secondly, `Observable <T>` can also use** events**, in that case,  the click on an HTML5 input control, for example a button: 

 
 ```javascript

button.addEventListener('click', event =>{
     console.log("clicked");
 });
```

We can convert click event to an Observable stream of data:

 ```javascript

Observable.fromEvent(button, 'click')
     .subscribe(event=>
         {
           console.log("you clicked");
         });
```
At this time, it is more easy manipulate the stream of data, for example by adding a `delay` between every click in order to prevent click spam: 


 ```javascript

Observable.fromEvent(button, 'click')
     .debouceTime(500)
     .subscribe(event=>
         {
           console.log("you clicked");
         });
```

We can describe the data flow by using a [**marble diagram**](http://rxwiki.wikidot.com/marble-diagrams): ![Reactive extensions](https://samueleresca.net/wp-content/uploads/2017/06/Screen-Shot-2017-06-11-at-18.54.01-960x348.png) Finally, we can also apply `Observable <T>` on **Promises.** The key difference is that promises can only express one single task that will be completed some time in the future. `Observable.fromPromises()` generalizes that concept of a promise into an asynchronous sequence of data through time and gives you a ton of operators that help you manipulate that sequence in whichever way you want. Here is an example: 

 ```javascript

//example promise that will resolve or reject based on input
const myPromise = (willReject) => {
    return new Promise((resolve, reject) => {
          if(willReject){
            reject('Rejected!');
        }
        resolve('Resolved!');
    })
}
//emit true, then false
const source = Rx.Observable.of(true, false);
const example = source
    .mergeMap(val => Rx.Observable
        //turn promise into observable
        .fromPromise(myPromise(val))
        //catch and gracefully handle rejections
        .catch(error => Rx.Observable.of(`Error: ${error}`))
    )
//output: 'Error: Rejected!', 'Resolved!'
const subscribe = example.subscribe(val => console.log(val));
```


#### Case of studies @ NETFLIX

Netflix is one of the principal user of Reactive extensions. In fact, we can find a lot of talk from Netflix UI Engineering about the topic: [Netflix JavaScript Talks - Async JavaScript with Reactive Extensions](https://www.youtube.com/watch?v=XRYN2xt11Ek) [Netflix JavaScript Talks - RxJS + Redux + React = Amazing!](https://www.youtube.com/watch?v=AslncyG8whg) [Netflix JavaScript Talks - Real-time Insights powered by Reactive Programming](https://www.youtube.com/watch?v=uODxUJ5Jwis) The following example is from one of listed talk, and shows how we can simplify our code by using Reactive programming: 

```javascript

function play(movieId, cancelButton, callback) {
    var movieTicket,
        playError,
        tryFinish = function () {
            if (playError) {
                callback(null, playError);
            }
            else if (movieTicket && player.initialized) {
                callback(null, ticket);
            }
        };

    cancelButton.addEventListener("click", function () { playError = "cancel"; });

    if (!player.initialized) {
        player.init(function () {
            playError = error;
            tryFinish();
        });
    }

    authorizeMovie(movieId, function (error, ticket) {
        playError = error;
        movieTicket = ticket;
        tryFinish();
    });

}
```


with `Observable <T>` : 


```javascript

var authorizations =
    player
        .init()
        .map(() =>
            playAttemps
                .map(movieId =>
                    player.authorize(movieId)
                        .retry(3)
                        .takeUntil(cancels))
                .concatAll())
        .concatAll();

authorizations.forEach(
    license => player.play(license),
    error => showError()
);
```


#### Web speech example

I found an awesome example powered by [Jaime González García](https://barbarianmeetscoding.com/)  @Active Dublin 2k16. Here is the link to the [**complete example.**](https://www.barbarianmeetscoding.com/blog/2016/05/02/making-a-game-with-rx-dot-js-and-web-speech-at-active-dublin-2016-part-iii/)   You can also find the typescript version of the example @ the following repo: [https://github.com/samueleresca/reactive-programming-damn](https://github.com/samueleresca/reactive-programming-damn)

### Final thought

As a result, reactive extensions helps us to write better codebase using the following principles and techniques:

*   **Functional:** avoid intricate stateful programs, using clean input/output functions over observable streams;
*   **Less is more:** reactiveX's operators often reduce what was once an elaborate challenge into a few lines of code;
*   **Async error handling:** traditional try/catch is powerless for errors in asynchronous computations, but ReactiveX is equipped with proper mechanisms for handling errors;
*   **Concurrency made easy :** observables and Schedulers in ReactiveX allow the programmer to abstract away low-level threading, synchronization, and concurrency issues;

##### **Keep in mind**

In conclusion, there are some threadoffs to evaluate when using Reactive extensions, it might not be the type of library you rely on to solve one problem in the application. Reactive extensions are more a lifestyle choice for an application, an application that wants to be reactive everywhere. On the plus side, Reactive extensions give us the ability to handle events and react to data using some higher level abstractions. 

Cheers :) 

Cover image by [Corrado Zeni](http://www.corradozeni.it/)