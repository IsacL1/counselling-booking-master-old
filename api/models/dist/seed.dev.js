"use strict";

// const Room = require('./Room')
var Room = require('./Room'); // Room.create([


Room.create([// Level 8
{
  name: 'Eric (Room 1)',
  floor: '801',
  capacity: 1
}, {
  name: 'Mary (Room 2)',
  floor: '801',
  capacity: 1
}]).then(function (rooms) {
  console.log("Created ".concat(rooms.length, " rooms."));
})["catch"](function (error) {
  console.error(error);
});