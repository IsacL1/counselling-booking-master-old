// const Room = require('./Room')
const Room = require('./Room')

// Room.create([
Room.create([
  // Level 8
  {
    name: 'SW01',
    floor: '801',
    capacity: 1
  },
  {
    name: 'SW02',
    floor: '802',
    capacity: 1
  }
])
  .then(rooms => {
    console.log(`Created ${rooms.length} rooms.`)
  })
  .catch(error => {
    console.error(error)
  })
