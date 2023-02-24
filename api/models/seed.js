// const Room = require('./Room')
const Room = require('./Room')

// Room.create([
Room.create([
  // Level 8
  {
    name: 'Eric (Room 1)',
    floor: '801',
    capacity: 1
  },
  {
    name: 'Mary (Room 2)',
    floor: '801',
    capacity: 1
  }
])
  .then(rooms => {
    console.log(`Created ${rooms.length} rooms.`)
  })
  .catch(error => {
    console.error(error)
  })
