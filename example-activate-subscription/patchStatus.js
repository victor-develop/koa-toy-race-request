'use strict'

const axios = require('axios')
const uuid = require('uuid/v4')
const url = 'http://localhost:3001'

const activate = (status) => axios({
    url,
    method: 'patch',
    data: {
        status,
    }
})
.then(({data, status}) => console.log({data, status}))
.catch(({response: {data, status}}) => console.error({data, status}))

module.exports = activate
