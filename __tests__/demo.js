const Rx = require("rxjs");

function ajax(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    resolve(JSON.parse("{\"batchcomplete\":\"\",\"continue\":{\"sroffset\":10,\"continue\":\"-||\"},\"query\":{\"searchinfo\":{\"totalhits\":2384},\"search\":[{\"ns\":0,\"title\":\"Reactive programming\",\"pageid\":12291165,\"size\":28714,\"wordcount\":3585,\"snippet\":\"In computing, <span class=\\\"searchmatch\\\">reactive</span> <span class=\\\"searchmatch\\\">programming</span> is an asynchronous <span class=\\\"searchmatch\\\">programming</span> paradigm concerned with data streams and the propagation of change. This means that\",\"timestamp\":\"2017-10-23T10:03:02Z\"},{\"ns\":0,\"title\":\"Functional reactive programming\",\"pageid\":7493690,\"size\":8418,\"wordcount\":915,\"snippet\":\"Functional <span class=\\\"searchmatch\\\">reactive</span> <span class=\\\"searchmatch\\\">programming</span> (FRP) is a <span class=\\\"searchmatch\\\">programming</span> paradigm for <span class=\\\"searchmatch\\\">reactive</span> <span class=\\\"searchmatch\\\">programming</span> (asynchronous dataflow <span class=\\\"searchmatch\\\">programming</span>) using the building blocks\",\"timestamp\":\"2017-09-26T21:32:25Z\"},{\"ns\":0,\"title\":\"Reactive extensions\",\"pageid\":41467178,\"size\":5392,\"wordcount\":717,\"snippet\":\"In software <span class=\\\"searchmatch\\\">programming</span>, <span class=\\\"searchmatch\\\">Reactive</span> Extensions (also known as <span class=\\\"searchmatch\\\">Reactive</span>X) is a set of tools allowing imperative <span class=\\\"searchmatch\\\">programming</span> languages to operate on sequences\",\"timestamp\":\"2017-06-08T12:49:42Z\"},{\"ns\":0,\"title\":\"Synchronous programming language\",\"pageid\":2211347,\"size\":5808,\"wordcount\":656,\"snippet\":\"A synchronous <span class=\\\"searchmatch\\\">programming</span> language is a computer <span class=\\\"searchmatch\\\">programming</span> language optimized for <span class=\\\"searchmatch\\\">programming</span> <span class=\\\"searchmatch\\\">reactive</span> systems. Computer systems can be sorted in three\",\"timestamp\":\"2016-09-23T19:54:24Z\"},{\"ns\":0,\"title\":\"Reactivity\",\"pageid\":18697679,\"size\":416,\"wordcount\":42,\"snippet\":\"<span class=\\\"searchmatch\\\">Reactivity</span> may refer to: <span class=\\\"searchmatch\\\">Reactivity</span> (chemistry), the rate at which a chemical substance tends to undergo a chemical reaction <span class=\\\"searchmatch\\\">Reactive</span> <span class=\\\"searchmatch\\\">programming</span>, a property\",\"timestamp\":\"2017-02-26T10:48:14Z\"},{\"ns\":0,\"title\":\"Reactive attachment disorder\",\"pageid\":740176,\"size\":78996,\"wordcount\":9671,\"snippet\":\"<span class=\\\"searchmatch\\\">Reactive</span> attachment disorder (RAD) is described in clinical literature as a severe and relatively uncommon disorder that can affect children. RAD is characterized\",\"timestamp\":\"2017-10-05T11:53:36Z\"},{\"ns\":0,\"title\":\"Reactive Streams\",\"pageid\":48896716,\"size\":9419,\"wordcount\":817,\"snippet\":\"<span class=\\\"searchmatch\\\">Reactive</span> Streams is an initiative to provide a standard for asynchronous stream processing with non-blocking back pressure.   <span class=\\\"searchmatch\\\">Reactive</span> Streams started\",\"timestamp\":\"2017-10-09T14:17:34Z\"},{\"ns\":0,\"title\":\"Reactive oxygen species\",\"pageid\":640697,\"size\":48755,\"wordcount\":5900,\"snippet\":\"Play media         <span class=\\\"searchmatch\\\">Reactive</span> oxygen species (ROS) are chemically <span class=\\\"searchmatch\\\">reactive</span> chemical species containing oxygen. Examples include peroxides, superoxide, hydroxyl\",\"timestamp\":\"2017-10-05T20:26:19Z\"},{\"ns\":0,\"title\":\"Reactive devaluation\",\"pageid\":34981918,\"size\":3925,\"wordcount\":422,\"snippet\":\"<span class=\\\"searchmatch\\\">Reactive</span> devaluation is a cognitive bias that occurs when a proposal is devalued if it appears to originate from an antagonist. The bias was proposed by\",\"timestamp\":\"2017-07-19T13:01:20Z\"},{\"ns\":0,\"title\":\"Power factor\",\"pageid\":41568,\"size\":41221,\"wordcount\":5391,\"snippet\":\"expressed in watts (W) <span class=\\\"searchmatch\\\">Reactive</span> power (                        Q                 {\\\\displaystyle Q}   ), usually expressed in <span class=\\\"searchmatch\\\">reactive</span> volt-amperes (var) These\",\"timestamp\":\"2017-10-16T16:53:08Z\"}]}}"));
  });
}

it("Should add all the element in the array", () => {
  Rx.Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
    .reduce((total, delta) => total + delta)
    .subscribe(total => {
      expect(total).toBe(45);
    });
})


it("Should add all the element in the array by using a delay", () => {
  Rx.Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
    .reduce((total, delta) => total + delta)
    .delay(1000)
    .subscribe(total => {
      expect(total).toBe('no-sense!');
    });
});



it("Should add all the element in the array by using a delay (right way)", (done) => {
  Rx.Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
    .reduce((total, delta) => total + delta)
    .delay(1000)
    .subscribe(total => {
      expect(total).toBe(45);
    }, null, done);
});

it("Should fetch Wikipedia pages for search term \"reactive programming\" using an observable + promise", function (done) {
  const searchTerm = 'reactive+programming';
  const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch="+searchTerm;
  const testFn = query => Rx.Observable.fromPromise(ajax(query))
    .subscribe(data => {
      expect(data).toHaveProperty("query")
      expect(data).toHaveProperty("query.search")
      expect(data.query.search.length).toBe(10)
    },null,  done);

    testFn(url);
});