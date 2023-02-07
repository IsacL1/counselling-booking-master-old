const express = require('express')
const { signUp, signIn, signJWTForUser } = require('../middleware/auth')

const router = new express.Router()

// Sign in
router.post('/auth', signIn, signJWTForUser)
// Sign up
router.post('/auth/sign-up', signUp, signJWTForUser)

module.exports = router
