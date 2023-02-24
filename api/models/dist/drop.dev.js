"use strict";

// const Room = require('./Room')
var Room = require('./Room');

var User = require('./User'); // Room.deleteMany().then(() => {


Room.deleteMany().then(function () {
  console.log('Deleted rooms');
  process.exit();
});
User.deleteMany().then(function () {
  console.log('Deleted users');
  process.exit();
});