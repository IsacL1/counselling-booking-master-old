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
  issue: {
    type: String,
    required: true
  },
  emergencyLv: {
    type: String,
    required: true
  },
  roomId: {
    type: Schema.ObjectId,
    ref: 'Room'
  }
});
/*
const bookingSchema = new Schema({
  _bookingId: Schema.Types.ObjectId,
  user: { type: Schema.ObjectId, ref: 'User' },
  bookingStart: Date,
  bookingEnd: Date,
  startHour: Number,
  duration: Number,
  recurring: [],
  businessUnit: { type: String, required: true },
  purpose: { type: String, required: true },
  roomId: { type: Schema.ObjectId, ref: 'Room' }
})
*/
// Validation to ensure a room cannot be double-booked

bookingSchema.path('bookingStart').validate(function (value) {
  // Extract the Room Id from the query object
  var roomId = this.roomId; // Convert booking Date objects into a number value

  var newBookingStart = value.getTime();
  var newBookingEnd = this.bookingEnd.getTime(); // Function to check for booking clash

  var clashesWithExisting = function clashesWithExisting(existingBookingStart, existingBookingEnd, newBookingStart, newBookingEnd) {
    var errorStatementA = newBookingStart >= existingBookingStart && newBookingStart < existingBookingEnd;
    var errorStatementB = existingBookingStart >= newBookingStart && existingBookingStart < newBookingEnd;

    if (errorStatementA || errorStatementB) {
      throw new Error("Booking could not be saved. There is a clash with an existing booking from\n        ".concat(moment(existingBookingStart).format('HH:mm'), " to \n        ").concat(moment(existingBookingEnd).format('HH:mm on LL')));
    }

    return false;
  }; // Locate the room document containing the bookings
  // return Room.findById(roomId).then(room => {


  return Room.findById(roomId).then(function (room) {
    // Loop through each existing booking and return false if there is a clash
    return room.bookings.every(function (booking) {
      // Convert existing booking Date objects into number values
      var existingBookingStart = new Date(booking.bookingStart).getTime();
      var existingBookingEnd = new Date(booking.bookingEnd).getTime(); // Check whether there is a clash between the new booking and the existing booking

      return !clashesWithExisting(existingBookingStart, existingBookingEnd, newBookingStart, newBookingEnd);
    });
  });
}, "{REASON}"); // Case catgory: family issue, study issue, health Issue, relationship issue

var roomSchema = new Schema({
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
  cases: {
    famIsu: {
      type: Boolean,
      "default": false
    },
    stdIsu: {
      type: Boolean,
      "default": false
    },
    healIsu: {
      type: Boolean,
      "default": false
    },
    relatIsu: {
      type: Boolean,
      "default": false
    }
  },

  /*
  assets: {
    macLab: { type: Boolean, default: false },
    pcLab: { type: Boolean, default: false },
    projector: { type: Boolean, default: false },
    tv: { type: Boolean, default: false },
    opWalls: { type: Boolean, default: false },
    whiteBoard: { type: Boolean, default: false }
  },
  */
  bookings: [bookingSchema]
});
var Room = module.exports = mongoose.model('Room', roomSchema);