'use strict'
/* global describe, it */

var assert = require('assert')
var Thunk = require('thunks')()
var thunkQueue = require('../index')

describe('thunk-queue', function () {
  it('thunkQueue()', function (done) {
    var thunk = thunkQueue()

    thunk(function (err, res) {
      assert.strictEqual(err, null)
      assert.deepEqual(res, [1, 2, 3])
    })(done)

    thunk.push(1)

    thunk.push(Thunk(2))

    thunk.end(Thunk.delay(10)(function () {
      return 3
    }))
  })

  it('thunkQueue(value)', function (done) {
    var thunk = thunkQueue(1)

    thunk.push(2)

    thunk.end(Thunk(3))

    thunk(function (err, res) {
      assert.strictEqual(err, null)
      assert.deepEqual(res, [1, 2, 3])
    })(done)
  })

  it('thunkQueue() with empty queue', function (done) {
    var thunk = thunkQueue()

    thunk.end()

    thunk(function (err, res) {
      assert.strictEqual(err, null)
      assert.deepEqual(res, [])
    })(done)
  })

  it('thunkQueue() throw error', function (done) {
    var thunk = thunkQueue()

    thunk.push(1)

    thunk.end()

    assert.throws(function () {
      thunk.push(2)
    })
    done()
  })

})
