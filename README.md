thunk-queue
====
Thunk queue for uncertainty tasks evaluation.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## [thunks](https://github.com/thunks/thunks)

## Demo

```js
var thunkQueue = require('thunk-queue');
var thunk = thunkQueue();

thunk(function(err, res) {
  // It is will be run after all thunkable task finished in queue.
  console.log(err, res);
});

thunk.push(1); // push a primitive value to queue
thunk.push(Promise.resolve(1)); // push a promise to queue

// thunk.push(...), support all thunkable value, such as primitive value, thunk function, promise, generator object, generator function...

thunk.end(); // end the queue.
```

## Installation

```bash
npm install thunk-queue
```

## API

```js
var thunkQueue = require('thunk-queue');
```

### thunkQueue([thunkable])

Return a thunk function with a closure queue.

```js
var thunk = thunkQueue();
```

#### thunk.push(thunkable)

Push thunkable task to the `thunk`'s queue, thunkable task will be eager evaluated, return the `thunk`;

#### thunk.end([thunkable])

End the `thunk`'s queue. the `thunk` will be evaluated after all tasks finished in queue. return the `thunk`;


[npm-url]: https://npmjs.org/package/thunk-queue
[npm-image]: http://img.shields.io/npm/v/thunk-queue.svg

[travis-url]: https://travis-ci.org/thunks/thunk-queue
[travis-image]: http://img.shields.io/travis/thunks/thunk-queue.svg
