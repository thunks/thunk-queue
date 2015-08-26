'use strict'
// **Github:** https://github.com/thunks/thunk-queue
//
// **License:** MIT

var thunk = require('thunks')()

module.exports = function thunkQueue (task) {
  var endQueue
  var queue = []
  var ctx = this
  var ended = false

  var resultThunk = thunk.call(this, function (callback) {
    endQueue = callback
  })(function (error, res) {
    if (error != null) throw error
    return res
  })

  resultThunk.push = function (task) {
    if (ended) throw new Error('the queue is ended.')
    queue.push(evalThunk(ctx, task))
    return resultThunk
  }

  resultThunk.end = function (task) {
    if (task) resultThunk.push(task)
    ended = true
    thunk.all(queue)(endQueue)
    return resultThunk
  }

  return task ? resultThunk.push(task) : resultThunk
}

function evalThunk (ctx, task) {
  return thunk.call(this, task)(function (error, res) {
    if (error != null) throw error
    return arguments.length > 2 ? thunk.digest.apply(null, arguments) : res
  })
}
