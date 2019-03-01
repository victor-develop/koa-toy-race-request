'use strict'

const bb = require('bluebird')

const randomDuration = () => 1 + Math.random() * 200

module.exports = async (key) => {
    console.log(`finding-${key}`)
    await bb.delay(randomDuration())
    console.log(`writing-${key}`)
}
