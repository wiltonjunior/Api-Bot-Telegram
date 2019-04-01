
const axios = require('axios');

const http = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  headers: {
    Authorization: {
      toString() {
        return global.TOKEN
      }
    }
  }
})

module.exports = http;
