const axios = require('axios')
const { rememberToken, getValidToken } = require('./token')

const baseURL = 'http://localhost:7000/'

// Create an axios instance
const api = axios.create({
  baseURL
})

export function setToken(token) {
  console.log("In Set token")
  // saves token to local storage
  rememberToken(token)
  if (token) {
    // Setting the Authorisation header for all future GET requests
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

// Validates token, and removes it if it's invalid
setToken(getValidToken())

export default api
