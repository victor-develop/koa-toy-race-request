'use strict'

const axios = require('axios')

const fire = (req_id, args) => axios({
    method: 'POST',
    url: 'http://localhost:3000',
    data: {
        req_id,
        ...args
    }
}).then(({data, status}) => console.log(data, status))

for(let i = 0; i < 5; i++) {
    fire(i, {user_id: 'apple'})
    fire(i, {user_id: 'banana'})
    fire(i, {user_id: 'pear'})
}
