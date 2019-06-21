"use strict";

const debug = require('debug')('userEventsProcess')
const canUserChangeStatus = require('./canUserChangeStatus');
const {delay} = require('bluebird')

const initial_status = "unactivated";


// Assumption: append-only stores
// read-order always the same
const eventStores = [initial_status]

const initial_success = true
const initial_event_id = 0
const processedEvents = {
  [initial_event_id]: [initial_success, initial_status]
}

// Fold it for presentation
const processEventsCronjob = setInterval(() => {
  const latest_event_id = eventStores.length - 1
  debug({
    eventStores,
    processedEvents,
    latest_event_id
  })
  if (!processedEvents[latest_event_id]) {
    const from_event_id = Number(Object.keys(processedEvents).pop())
    for (let i = from_event_id; i < latest_event_id; i++) {
      const [_, old_status] = processedEvents[i]
      const new_status = eventStores[i + 1]
      const success = canUserChangeStatus(old_status, new_status)
      processedEvents[i + 1] = [success, new_status]
      debug({
        old_status, new_status, success, event_id: i
      })
    }
  }
}, 3000);

const readRequestResult = async (event_id) => {
  const result = processedEvents[event_id]
  if (!result) {
    await delay(500)
    return readRequestResult(event_id)
  }
  const [success] = result
  return [success, processedEvents]
}

const requestToUpdateSubscriptionStatus = async to_status => {
  // return index of the last element
  eventStores.push(to_status)
  const event_id = eventStores.length - 1
  return event_id
};

module.exports = {
  eventStores,
  readRequestResult,
  requestToUpdateSubscriptionStatus
};
