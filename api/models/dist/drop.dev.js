"use strict";

var Room = require('./Room');

var User = require('./User');

Room.deleteMany().then(function () {
  console.log('Deleted rooms');
  process.exit();
});
User.deleteMany().then(function () {
  console.log('Deleted users');
  process.exit();
});