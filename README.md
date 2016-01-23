thunk-queue
====
Thunk queue for uncertainty tasks evaluation.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## [thunks](https://github.com/thunks/thunks)

## Demo

```js
var thunkQueue = require('thunk-queue')
var queueT = thunkQueue()

queueT(function(err, res) {
  // It is will be run after all thunkable task finished in queue.
  console.log(err, res)
})

queueT.push(1) // push a primitive value to queue
queueT.push(Promise.resolve(1)) // push a promise to queue

// queueT.push(...), support all thunkable value, such as primitive value, thunk function, promise, generator object, generator function...

queueT.end() // end the queue.
```

## Installation

```bash
npm install thunk-queue
```

## API

```js
var thunkQueue = require('thunk-queue')
```

### thunkQueue([thunkable])

Return a thunk function with a closure queue.

```js
var queueT = thunkQueue()
```

#### queueT.push(thunkable)

Push thunkable task to the `thunk`'s queue, thunkable task will be eager evaluated, return the `queueT`;

#### queueT.end([thunkable])

End the `thunk`'s queue. the `thunk` will be evaluated after all tasks finished in queue. return the `queueT`;


[npm-url]: https://npmjs.org/package/thunk-queue
[npm-image]: http://img.shields.io/npm/v/thunk-queue.svg

[travis-url]: https://travis-ci.org/thunks/thunk-queue
[travis-image]: http://img.shields.io/travis/thunks/thunk-queue.svg
