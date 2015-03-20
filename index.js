'use strict';
// **Github:** https://github.com/thunks/thunk-queue
//
// **License:** MIT

var Thunk = require('thunks')();

module.exports = function thunkQueue(task) {
  var endQueue, queue = [], ctx = this, ended = false;

  var thunk = Thunk.call(this, function (callback) {
    endQueue = callback;
  })(function(error, res) {
    if (error != null) throw error;
    return res;
  });

  thunk.push = function(task) {
    if (ended) throw new Error('the queue is ended.');
    queue.push(evalThunk(ctx, task));
    return thunk;
  };

  thunk.end = function(task) {
    if (task) thunk.push(task);
    ended = true;
    Thunk.all(queue)(endQueue);
    return thunk;
  };

  return task ? thunk.push(task) : thunk;
};

function evalThunk(ctx, task) {
  return Thunk.call(this, task)(function (error, res) {
    if (error != null) throw error;
    return arguments.length > 2 ? Thunk.digest.apply(null, arguments) : res;
  });
}
