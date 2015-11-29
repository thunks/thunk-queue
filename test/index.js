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

  it('thunkQueue(value)', function (done) {
    var queue = thunkQueue(1)

    queue.push(2)

    queue.end(thunk(3))

    queue(function (err, res) {
      assert.strictEqual(err, null)
      assert.deepEqual(res, [1, 2, 3])
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

  it('thunkQueue() throw error', function (done) {
    var queue = thunkQueue()

    queue.push(1)

    queue.end()

    assert.throws(function () {
      queue.push(2)
    })
    done()
  })
})
