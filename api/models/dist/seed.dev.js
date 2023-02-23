"use strict";

var Room = require('./Room');

Room.create([// Level 8
{
  name: 'Worker 1',
  capacity: 1
}]).then(function (rooms) {
  console.log("Created ".concat(rooms.length, " rooms."));
})["catch"](function (error) {
  console.error(error);
});