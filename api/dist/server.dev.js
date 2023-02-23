"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');

var bodyParser = require('body-parser');

var cors = require('cors');

var authMiddleware = require('./middleware/auth');

var _require = require('./middleware/auth'),
    signUp = _require.signUp,
    signIn = _require.signIn,
    signJWTForUser = _require.signJWTForUser,
    requireJWT = _require.requireJWT;

var config = require('./config');

var server = express();

var roomsRouter = require('./routes/rooms');

var authRouter = require('./routes/auth'); //const Worker = require('./models/Room')


var Room = require('./models/Room');

var momentTimezone = require('moment-timezone');

var moment = require('moment');

var HKTimeZone = 'Asia/Hong_Kong'; // Middleware

server.use(bodyParser.json());
server.use(cors({
  credentials: true
}));
server.use(authMiddleware.initialize); // Routes
// server.use([require('./routes/auth'), require('./routes/rooms')])
// server.use('./routes/rooms')
// server.use('/rooms', roomsRouter)

server.post('/auth', signIn, signJWTForUser);
server.post('/auth/sign-up', signUp, signJWTForUser);
server.use('/rooms', roomsRouter);
server.get('/rooms', requireJWT, function (req, res) {
  Room.find() //Worker.find()
  .then(function (rooms) {
    res.json(rooms);
  })["catch"](function (error) {
    res.json({
      error: error
    });
  });
});
server.post('/rooms', requireJWT, function (req, res) {
  Room.create(req.body) //Worker.create(req.body)
  .then(function (room) {
    res.status(201).json(room);
  })["catch"](function (error) {
    res.status(400).json({
      error: error
    });
  });
}); // Function to convert UTC JS Date object to a Moment.js object in AEST

var dateAEST = function dateAEST(date) {
  return momentTimezone(date).tz(HKTimeZone);
}; // Function to calculate the duration of the hours between the start and end of the booking


var durationHours = function durationHours(bookingStart, bookingEnd) {
  // convert the UTC Date objects to Moment.js objeccts
  var startDateLocal = dateAEST(bookingStart);
  var endDateLocal = dateAEST(bookingEnd); // calculate the duration of the difference between the two times

  var difference = moment.duration(endDateLocal.diff(startDateLocal)); // return the difference in decimal format

  return difference.hours() + difference.minutes() / 60;
}; // Make a booking


server.put('/rooms/:id', requireJWT, function (req, res) {
  var id = req.params.id; // If the recurring array is empty, the booking is not recurring

  if (req.body.recurring.length === 0) {
    Room.findByIdAndUpdate( //Worker.findByIdAndUpdate(
    id, {
      $addToSet: {
        bookings: _objectSpread({
          user: req.user,
          // The hour on which the booking starts, calculated from 12:00AM as time = 0
          startHour: dateAEST(req.body.bookingStart).format('H.mm'),
          // The duration of the booking in decimal format
          duration: durationHours(req.body.bookingStart, req.body.bookingEnd)
        }, req.body)
      }
    }, {
      "new": true,
      runValidators: true,
      context: 'query'
    }).then(function (room) {
      res.status(201).json(room);
    })["catch"](function (error) {
      res.status(400).json({
        error: error
      });
    }); // If the booking is a recurring booking
  } else {
    // The first booking in the recurring booking range
    var firstBooking = req.body;
    firstBooking.user = req.user;
    firstBooking.startHour = dateAEST(req.body.bookingStart).format('H.mm');
    firstBooking.duration = durationHours(req.body.bookingStart, req.body.bookingEnd); // An array containing the first booking, to which all additional bookings in the recurring range will be added

    var recurringBookings = [firstBooking]; // A Moment.js object to track each date in the recurring range, initialised with the first date

    var bookingDateTracker = momentTimezone(firstBooking.bookingStart).tz(HKTimeZone); // A Moment.js date object for the final booking date in the recurring booking range - set to one hour ahead of the first booking - to calculate the number of days/weeks/months between the first and last bookings when rounded down

    var lastBookingDate = momentTimezone(firstBooking.recurring[0]).tz(HKTimeZone);
    lastBookingDate.hour(bookingDateTracker.hour() + 1); // The number of subsequent bookings in the recurring booking date range

    var bookingsInRange = req.body.recurring[1] === 'daily' ? Math.floor(lastBookingDate.diff(bookingDateTracker, 'days', true)) : req.body.recurring[1] === 'weekly' ? Math.floor(lastBookingDate.diff(bookingDateTracker, 'weeks', true)) : Math.floor(lastBookingDate.diff(bookingDateTracker, 'months', true)); // Set the units which will be added to the bookingDateTracker - days, weeks or months

    var units = req.body.recurring[1] === 'daily' ? 'd' : req.body.recurring[1] === 'weekly' ? 'w' : 'M'; // Each loop will represent a potential booking in this range

    for (var i = 0; i < bookingsInRange; i++) {
      // Add one unit to the booking tracker to get the date of the potential booking
      var proposedBookingDateStart = bookingDateTracker.add(1, units); // Check whether this day is a Sunday (no bookings on Sundays)

      if (proposedBookingDateStart.day() !== 0) {
        // Create a new booking object based on the first booking
        var newBooking = Object.assign({}, firstBooking); // Calculate the end date/time of the new booking by adding the number of units to the first booking's end date/time

        var firstBookingEndDate = momentTimezone(firstBooking.bookingEnd).tz(HKTimeZone);
        var proposedBookingDateEnd = firstBookingEndDate.add(i + 1, units); // Update the new booking object's start and end dates

        newBooking.bookingStart = proposedBookingDateStart.toDate();
        newBooking.bookingEnd = proposedBookingDateEnd.toDate(); // Add the new booking to the recurring booking array

        recurringBookings.push(newBooking);
      }
    } // Find the relevant room and save the bookings


    Room.findByIdAndUpdate( //Worker.findByIdAndUpdate(
    id, {
      $push: {
        bookings: {
          $each: recurringBookings
        }
      }
    }, {
      "new": true,
      runValidators: true,
      context: 'query'
    }).then(function (room) {
      res.status(201).json(room);
    })["catch"](function (error) {
      res.status(400).json({
        error: error
      });
    });
  }
}); // Delete a booking

server["delete"]('/rooms/:id/:bookingId', requireJWT, function (req, res) {
  var id = req.params.id;
  var bookingId = req.params.bookingId;
  Room.findByIdAndUpdate( //Worker.findByIdAndUpdate(
  id, {
    $pull: {
      bookings: {
        _id: bookingId
      }
    }
  }, {
    "new": true
  }).then(function (room) {
    res.status(201).json(room);
  })["catch"](function (error) {
    res.status(400).json({
      error: error
    });
  });
}); // Error handling

server.use(function (error, req, res, next) {
  res.json({
    error: {
      message: error.message
    }
  });
}); // Read port and host from the configuration file

server.listen(config.port, config.host, function (error) {
  if (error) {
    console.error('Error starting', error);
  } else {
    console.info('Express listening on port ', config.port);
  }
});
module.exports = server;