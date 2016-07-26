'use strict'

const exposed = require('../core/symbols')

module.exports = function filterFactory (name, handler) {
  if (typeof name !== 'string') {
    throw new TypeError('first argument must be a string')
  }
  if (typeof handler !== 'function') {
    throw new TypeError('second argument must be a function')
  }

  return function filter (node, state, next) {
    node.$require('compile')
    if (!node.$isUsing('filter')) {
      node.$using('filter')
      node[exposed.filters] = new Map()
    }

    node[exposed.filters].set(name, handler)
    return next()
  }
}