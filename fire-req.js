'use strict'

const axios = require('axios')
const uuid = require('uuid/v4')

const fire = (req_id, args) => axios({
    method: 'POST',
    url: 'http://localhost:3000',
    data: {
        req_id,
        ...args
    }
}).then(({data, status}) => console.log(data, status))

const request_id = (i) => `${uuid()}___${i}`

const apple = 'apple_' + uuid()
const banana = 'banana_' + uuid()
const pear = 'pear_' + uuid()

for(let i = 0; i < 5; i++) {
    fire(request_id(i), {user_id: apple})
    fire(request_id(i), {user_id: banana})
    fire(request_id(i), {user_id: pear})
}
