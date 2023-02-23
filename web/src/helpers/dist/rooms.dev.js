"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookingArray = exports.dailyBookings = exports.formatAssetName = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Case catgory: family issue, study issue, health Issue, relationship issue
// case = origin version's asset
var formatAssetName = function formatAssetName(asset) {
  if (asset === 'famIsu') {
    return 'Family Issue';
  } else if (asset === 'stdIsu') {
    return 'Study Issue';
  } else if (asset === 'healIsu') {
    return 'health Issue';
  } else if (asset === 'relatIsu') {
    return 'Relationship Issue';
  }
};
/*
const formatAssetName = asset => {
  if (asset === 'opWalls') {
    return 'Operable Walls'
  } else if (asset === 'pcLab') {
    return 'PC Lab'
  } else if (asset === 'macLab') {
    return 'Mac Lab'
  } else if (asset === 'tv') {
    return 'TV'
  } else if (asset === 'whiteBoard') {
    return 'Whiteboard'
  } else if (asset === 'projector') {
    return 'Projector'
  }
}
*/
// Accepts the search date in 'YYYY/MM/DD' format and all of a room's bookings and filters the array for bookings that match the search date


exports.formatAssetName = formatAssetName;

var dailyBookings = function dailyBookings(currentDate, roomBookings) {
  var filteredBookings = roomBookings.filter(function (booking // Check if the booking is for the current date
  ) {
    return (0, _moment["default"])(booking.bookingStart).format('YYYY-MM-DD') === (0, _moment["default"])(currentDate).format('YYYY-MM-DD');
  });
  return filteredBookings;
}; // A function to take the bookings for a particular room on a given date and insert them into an array which maps each hour of that day


exports.dailyBookings = dailyBookings;

var bookingArray = function bookingArray(filteredBookings) {
  // An array from 1 to 24 representing each hour of the day
  var dayHours = _toConsumableArray(Array(24).keys());

  filteredBookings.forEach(function (booking) {
    var startTime = booking.startHour;
    var duration = booking.duration;
    var finalHour = startTime + duration; // Push each booking into the relevant hour in the 24 hour array
    // Loop from the beginning of the start hour to the end of the final hour (rounding half hours)

    for (var i = Math.floor(startTime); i < Math.ceil(finalHour); i++) {
      // Create a copy of the booking to customise for each hour
      var bookingData = Object.assign({}, booking); // Check if the total booking is half-hour long and begins on the half hour

      if (duration === 0.5 && startTime % 1 !== 0) {
        bookingData.secondHalfHour = true; // Check if the total booking is half-hour long and begins on the hour
      } else if (duration === 0.5 && startTime % 1 === 0) {
        bookingData.firstHalfHour = true; // If the booking is longer than half an hour
      } else {
        // Check if the booking starts on the half hour
        if (i === Math.floor(startTime) && startTime % 1 !== 0) {
          bookingData.secondHalfHour = true;
        } // Check if the booking ends on the half hour


        if (i === Math.ceil(finalHour - 1) && finalHour % 1 !== 0) {
          bookingData.firstHalfHour = true;
        }
      } // Add the booking object to the relevant hour in the 24 hour array
      // If there is already a booking in that hour, enter the second booking as the second item in an array


      dayHours[i] = typeof dayHours[i] === 'number' ? bookingData : [dayHours[i], bookingData];
    }
  }); // Return the 24 hour array with all booking objects added to each hour they apply to

  return dayHours;
};

exports.bookingArray = bookingArray;