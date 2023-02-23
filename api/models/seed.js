const Room = require('./Room')

Room.create([
  // Level 8
  {
    name: 'Worker 1',
    capacity: 1
  }
])
  .then(rooms => {
    console.log(`Created ${rooms.length} rooms.`)
  })
  .catch(error => {
    console.error(error)
  })
