'use strict'

const bluebird = require('bluebird')

let status = 'unactivated'

const getSubscriptionStatus = async () => {
    return status
}


const updateSubscriptionStatus = async (to_status) => {
    await bluebird.delay(2000)
    status = to_status
}

module.exports = {
    getSubscriptionStatus,
    updateSubscriptionStatus
}
