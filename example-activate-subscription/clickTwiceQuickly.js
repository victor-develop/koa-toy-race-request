const patchStatus = require('./patchStatus');

const clickTwiceQuickly = () => {
    patchStatus('active')
    patchStatus('active')
}

clickTwiceQuickly()
