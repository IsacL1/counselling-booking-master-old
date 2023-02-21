const Worker = require('./Worker')
const User = require('./User')

Worker.deleteMany().then(() => {
  console.log('Deleted workers')
  process.exit()
})

User.deleteMany().then(() => {
  console.log('Deleted users')
  process.exit()
})
