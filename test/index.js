'use strict'

const assert = require('assert')
const tman = require('tman')
const thunk = require('thunks')()
const thunkQueue = require('../index')

tman.suite('thunk-queue', function () {
  tman.it('thunkQueue()', function (done) {
    const queue = thunkQueue()

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

  tman.it('thunkQueue(tasks)', function (done) {
    const queue = thunkQueue(1, 2, 3)

    queue.push(4)

    queue.end(thunk(5))

    queue(function (err, res) {
      assert.strictEqual(err, null)
      assert.deepEqual(res, [1, 2, 3, 4, 5])
    })(done)
  })

  tman.it('thunkQueue() with empty queue', function (done) {
    const queue = thunkQueue()

    queue.end()

    queue(function (err, res) {
      assert.strictEqual(err, null)
      assert.deepEqual(res, [])
    })(done)
  })

  tman.it('thunkQueue() run in sequence', function (done) {
    const queue = thunkQueue()
    let pending = 0

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

  tman.it('thunkQueue() ended and throw error', function (done) {
    const queue = thunkQueue()

    queue.push(1)

    queue.end()

    assert.throws(function () {
      queue.push(2)
    })
    done()
  })
})
