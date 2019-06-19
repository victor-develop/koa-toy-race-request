"use strict";

const {delay} = require('bluebird')

const initial_status = "unactivated";

// Assumption: append-only stores
// read-order always the same
const eventStores = [initial_status]

// Fold it for presentation
const getEventsUntil = async (event_id) => {
    if (eventStores.length > event_id) {
        return eventStores.slice(0, event_id + 1)
    } else {
        await delay(500)
        return getEventsUntil(event_id)
    }
}

const requestToUpdateSubscriptionStatus = async to_status => {
  await delay(2000);
  // return index of the last element
  eventStores.push(to_status)
  const event_id = eventStores.length - 1
  return event_id
};

module.exports = {
  eventStores,
  getEventsUntil,
  requestToUpdateSubscriptionStatus
};
