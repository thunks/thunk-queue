'use strict'
// **Github:** https://github.com/thunks/thunk-queue
//
// **License:** MIT

const thunk = require('thunks')()
const slice = Array.prototype.slice

module.exports = function thunkQueue (tasks) {
  const ctx = this
  const queue = []

  let endQueue = null
  let index = 0
  let ended = false
  let pending = false

  const resultThunk = thunk.call(this, function (callback) {
    endQueue = callback
  })(function (error, res) {
    if (error != null) throw error
    return res
  })

  resultThunk.push = function (task) {
    if (ended) throw new Error('the queue is ended.')
    queue.push(thunk(function (done) {
      if (typeof task === 'function' && task.length !== 1) task = task.call(ctx)
      thunk.call(ctx, task)(done)
    }))
    eagerEval()
    return resultThunk
  }

  resultThunk.end = function (task) {
    if (task) resultThunk.push(task)
    ended = true
    thunk.seq(queue)(endQueue)
    return resultThunk
  }

  if (!Array.isArray(tasks)) tasks = slice.call(arguments)
  if (tasks.length) tasks.map(resultThunk.push)
  return resultThunk

  function eagerEval () {
    if (pending || ended || index === queue.length) return
    index++
    pending = true
    queue[index - 1] = queue[index - 1](function (error, res) {
      if (error != null) throw error
      pending = false
      eagerEval()
      return res
    })
  }
}
