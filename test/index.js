'use strict'
/* global describe, it */

var assert = require('assert')
var thunk = require('thunks')()
var thunkQueue = require('../index')

describe('thunk-queue', function () {
  it('thunkQueue()', function (done) {
    var queue = thunkQueue()

    queue(function (err, res) {
      assert.strictEqual(err, null)
      assert.deepEqual(res, [1, 2, 3])
    })(done)

    queue.push(1)

    queue.push(thunk(2))

    queue.end(thunk.delay(10)(function () {
      return 3
    }))
  })

  it('thunkQueue(tasks)', function (done) {
    var queue = thunkQueue(1, 2, 3)

    queue.push(4)

    queue.end(thunk(5))

    queue(function (err, res) {
      assert.strictEqual(err, null)
      assert.deepEqual(res, [1, 2, 3, 4, 5])
    })(done)
  })

  it('thunkQueue() with empty queue', function (done) {
    var queue = thunkQueue()

    queue.end()

    queue(function (err, res) {
      assert.strictEqual(err, null)
      assert.deepEqual(res, [])
    })(done)
  })

  it('thunkQueue() run in sequence', function (done) {
    var queue = thunkQueue()
    var pending = 0

    ;[3, 2, 1].map(function (val) {
      queue.push(function (cb) {
        pending++
        setTimeout(function () {
          assert.strictEqual(pending, 1)
          pending--
          cb(null, val)
        }, 200)
      })
    })

    queue.end()(function (err, res) {
      assert.strictEqual(err, null)
      assert.deepEqual(res, [3, 2, 1])
    })(done)
  })

  it('thunkQueue() ended and throw error', function (done) {
    var queue = thunkQueue()

    queue.push(1)

    queue.end()

    assert.throws(function () {
      queue.push(2)
    })
    done()
  })
})
