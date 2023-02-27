const mongoose = require('mongoose')

mongoose.Promise = global.Promise
// Ken's DB

process.env.MONGO_URI =
  'mongodb://ken:elam0417@' +
  'ac-j7lsw52-shard-00-00.wxgkica.mongodb.net:27017,' +
  'ac-j7lsw52-shard-00-01.wxgkica.mongodb.net:27017,' +
  'ac-j7lsw52-shard-00-02.wxgkica.mongodb.net:27017/' +
  '?ssl=true&replicaSet=atlas-9oo61t-shard-0&authSource=admin&retryWrites=true&w=majority'

// Is' DB
/*
process.env.MONGO_URI =
  'mongodb+srv://xan95123:xus951753@cluster0.qeeq1cr.mongodb.net/?retryWrites=true&w=majority'
  */
/*
  'mongodb://xan95123:xus951753@ac-qdfbavq-shard-00-00.qeeq1cr.mongodb.net:27017,' +
  'ac-qdfbavq-shard-00-01.qeeq1cr.mongodb.net:27017,ac-qdfbavq-shard-00-02.qeeq1cr.mongodb.net:27017/' +
  '?ssl=true&replicaSet=atlas-13zctm-shard-0&authSource=admin&retryWrites=true&w=majority'
*/
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Successfully connected to database')
  })

  .catch(error => {
    console.error('Error connecting to MongoDB database', error)
  })

module.exports = mongoose
