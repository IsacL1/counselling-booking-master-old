const mongoose = require('mongoose')

mongoose.Promise = global.Promise
process.env.MONGO_URI =
  'mongodb://ken:elam0417@ac-j7lsw52-shard-00-00.wxgkica.mongodb.net:27017,ac-j7lsw52-sha' +
  'rd-00-01.wxgkica.mongodb.net:27017,ac-j7lsw52-shard-00-02.wxgkica.mongodb.net:27017/?ssl=t' +
  'rue&replicaSet=atlas-9oo61t-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(process.env.MONGO_URI)

  .then(() => {
    console.log('Successfully connected to database')
  })

  .catch(error => {
    console.error('Error connecting to MongoDB database', error)
  })

module.exports = mongoose
