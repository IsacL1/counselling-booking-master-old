"use strict";

var Worker = require('./Worker');

var User = require('./User');

Worker.deleteMany().then(function () {
  console.log('Deleted workers');
  process.exit();
});
User.deleteMany().then(function () {
  console.log('Deleted users');
  process.exit();
});