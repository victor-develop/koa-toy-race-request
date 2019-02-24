'use strict'

module.exports = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve()
    }, (1 + Math.random()) * 200)
})
