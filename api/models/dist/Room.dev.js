"use strict";

var mongoose = require('./init');

var Schema = mongoose.Schema;

var moment = require('moment');

var bookingSchema = new Schema({
  _bookingId: Schema.Types.ObjectId,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  bookingStart: Date,
  bookingEnd: Date,
  startHour: Number,
  duration: Number,
  recurring: [],
  businessUnit: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  workerId: {
    type: Schema.ObjectId,
    ref: 'Worker'
  }
}); // Validation to ensure a worker cannot be double-booked

bookingSchema.path('bookingStart').validate(function (value) {
  // Extract the Worker Id from the query object
  var workerId = this.workerId; // Convert booking Date objects into a number value

  var newBookingStart = value.getTime();
  var newBookingEnd = this.bookingEnd.getTime(); // Function to check for booking clash

  var clashesWithExisting = function clashesWithExisting(existingBookingStart, existingBookingEnd, newBookingStart, newBookingEnd) {
    var errorStatementA = newBookingStart >= existingBookingStart && newBookingStart < existingBookingEnd;
    var errorStatementB = existingBookingStart >= newBookingStart && existingBookingStart < newBookingEnd;

    if (errorStatementA || errorStatementB) {
      throw new Error("Booking could not be saved. There is a clash with an existing booking from\n        ".concat(moment(existingBookingStart).format('HH:mm'), " to \n        ").concat(moment(existingBookingEnd).format('HH:mm on LL')));
    }

    return false;
  }; // Locate the worker document containing the bookings


  return Worker.findById(workerId).then(function (worker) {
    // Loop through each existing booking and return false if there is a clash
    return worker.bookings.every(function (booking) {
      // Convert existing booking Date objects into number values
      var existingBookingStart = new Date(booking.bookingStart).getTime();
      var existingBookingEnd = new Date(booking.bookingEnd).getTime(); // Check whether there is a clash between the new booking and the existing booking

      return !clashesWithExisting(existingBookingStart, existingBookingEnd, newBookingStart, newBookingEnd);
    });
  });
}, "{REASON}");
var workerSchema = new Schema({
  name: {
    type: String,
    index: true,
    required: true
  },
  floor: {
    type: String,
    required: true
  },
  capacity: Number,
  assets: {
    macLab: {
      type: Boolean,
      "default": false
    },
    pcLab: {
      type: Boolean,
      "default": false
    },
    projector: {
      type: Boolean,
      "default": false
    },
    tv: {
      type: Boolean,
      "default": false
    },
    opWalls: {
      type: Boolean,
      "default": false
    },
    whiteBoard: {
      type: Boolean,
      "default": false
    }
  },
  bookings: [bookingSchema]
});
var Worker = module.exports = mongoose.model('Worker', workerSchema);