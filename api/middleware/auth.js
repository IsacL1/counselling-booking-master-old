const passport = require('passport')
const JWT = require('jsonwebtoken')
const PassportJWT = require('passport-jwt')
const User = require('../models/User')

const jwtSecret =
  '-----BEGIN RSA PRIVATE KEY-----\n' +
  'MIIEoQIBAAKCAQBt9xngkDP5mMnt87ACGVCGGHBUVdCEEaHPboFMPU5cfkLtmLrR\n' +
  'vWc8vOJ2JQc8l42i7rg0bjAjSwruougF+Li7gwrm+AVVwmhlYPtwKp5R4XwgZg06\n' +
  'eQKG194h6QUd96AutmPyU5m51J3LsSfatnBq4Wa4eXvvTvG6SBVVTrC/j+xPM1wK\n' +
  'QztZxOccUPc/G5195H3dYIDVHRSYUntFAJ6kh7sI3OPTAX/1Y1Xfrqy0PzwL9fYy\n' +
  'dna+skr5YaFe2OUrU2zy+OMSovrIoaHUtAAHs3F3wlTxPsM4WzjbcklUPQl9y3YB\n' +
  'R0I1KnbS8MaWLtmkIsHBynyrlaWwkIoMzfiFAgMBAAECggEAV4bLLhcZh525fJDu\n' +
  'k30avuFM55O2eKigJr9KYyiY6r4E/6EFclRTi+C8UFWAwRXQQtPIAtOBtVXRycgY\n' +
  '7kfeokHXt6fKd0xaU/cxq0IA6iOT7SXNebE/9Zx0zoDu9b9X3FaIjyVDwsodHzhP\n' +
  'BKMaL7hhToxDvWMUvLULZe9Qd+hHkYHex2kA+8GBwrcH16PJ42VXjRusN/RH+MPo\n' +
  'fLxyN7jP3R78w6sOjT4CH6Q4ZX5mUkO5XimO7pkEtyv93aNr/79lo9o1+pIsC2zX\n' +
  'GlUX1oOnCKYG+yALt061I7KIjzapgludrsEKF0XKwjBaV9eSY7xW13QJJCJ4lUZK\n' +
  'u+7rMQKBgQCoxBJLWuwrz45M2BDzieKN48g2jDM/MvIFkmnfluQ5q+I9NBwOU4ax\n' +
  '1lHOIaYx7z5Icwcx7xJc3vEe65KZzwoX/Jsb6qGwsJHRkidVfoDiY169udM1qctI\n' +
  '+vXlyDRC09j4Fu4N2jxRmEqxrd/UGzBM0yvIlT3pMUwbdCc2WoT2nwKBgQCmzj0J\n' +
  'fnEbugVNoOHLsHRbXBUKRjAEi6ZRfIkjrST6YJ0higGf6eCY9fWthdHeHE5V4i7r\n' +
  'q/yuyho9EpNPDDMGuSgQyTXB25kbuAi0TajUIMU8TyKJN/yzHL0R+A5Ic3pYTULl\n' +
  'UuxF58O/X6DGyEALteaRvhMjuJOQDD50QJjyWwKBgHbpWD6SPPANmaVZZHBEykXR\n' +
  'pkOQ+5bfLZpxdHnfVsWv74PSUKZjgfeSHCfSm8h5WvgvXHV5jwWy7FAuCiinseP+\n' +
  'z8eWxgC6GLSCd4aM0QEypRGnekNIdPziHxqduv0PScRcW7WU/IU9efvBmIFZ+ulW\n' +
  'rXXyeiHx4z9A01Q/6YnfAoGAQQpVvmfxDpCgFL7QjC3HkP/8rD7l5j/VoBxhFOok\n' +
  'awRVAIjhTUtSahIts3Vkeair2s0Q4o/zPOxNAtdFXSMymkKEHtd2AJrxvl8p9bP6\n' +
  'Soxkm7l3i+2quORRzLneR93PLLMjjGui+Tb/mpVdCWV3o5lPyDBHIjyMPTSo/Yda\n' +
  'm9UCgYAZnD4xI7EKY8vfCwwu5OzBobLa0JqbJgQ+pS73Sl5Ur9aqRxlOn1u8w2Kp\n' +
  'GMXyRMkNK6c60pgvDthBfdZrv9FnF6LzYHw0Vf/Fkk27HPSGX37wsmzm949Y1v/L\n' +
  'yHnPMKxiKe/yHH3dyzLDNcIac2vJi8S5F6wHCT5dbhZdcWMlGg==\n' +
  '-----END RSA PRIVATE KEY-----'
const jwtAlgorithm = 'RS256'
const jwtExpiresIn = '2d'

passport.use(User.createStrategy())

const signUp = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send('No username or password provided.')
  }

  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })

  User.register(user, req.body.password, (error, user) => {
    if (error) {
      next(error)
      return null
    }
  })

  req.user = user
  next()
}

const signJWTForUser = (req, res) => {
  const user = req.user
  const token = JWT.sign(
    {
      email: user.email
    },
    jwtSecret,
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString()
    }
  )
  console.log(token)
  res.json({ token })
}

passport.use(
  new PassportJWT.Strategy(
    {
      jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      algorithms: [jwtAlgorithm]
    },
    (payload, done) => {
      User.findById(payload.sub)
        .then(user => {
          if (user) {
            done(null, user)
          } else {
            done(null, false)
          }
        })
        .catch(error => {
          done(error, false)
        })
    }
  )
)

module.exports = {
  initialize: passport.initialize(),
  signUp,
  signIn: passport.authenticate('local', { session: false }, null),
  requireJWT: passport.authenticate('jwt', { session: false }, null),
  signJWTForUser
}
