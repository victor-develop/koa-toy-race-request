'use strict'

module.exports = (key) => new Promise((resolve) => {
    setTimeout(() => {
        console.log(`writing-${key}`)
        resolve()
    }, (1 + Math.random()) * 200)
})
