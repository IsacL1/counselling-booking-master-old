"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeBooking = makeBooking;
exports.deleteBooking = deleteBooking;
exports.updateStateWorker = updateStateWorker;

var _moment = _interopRequireDefault(require("moment"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _init = _interopRequireDefault(require("./init"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Function to receive booking data (AEST) and convert to JS Date object
// Data expected in [year, month, date, hours, seconds] format
var dateUTC = function dateUTC(dataArray) {
  // Ensure date data is saved in AEST and then converted to a Date object in UTC
  return (0, _momentTimezone["default"])(dataArray).tz('Australia/Sydney').toDate();
}; // Make a worker booking


function makeBooking(data, existingBookings) {
  // Convert booking data to UTC Date objects
  var bookingStart = dateUTC(data.startDate);
  var bookingEnd = dateUTC(data.endDate); // Convert booking Date objects into a number value

  var newBookingStart = bookingStart.getTime();
  var newBookingEnd = bookingEnd.getTime(); // Check whether the new booking times overlap with any of the existing bookings

  var bookingClash = false;
  existingBookings.forEach(function (booking) {
    // Convert existing booking Date objects into number values
    var existingBookingStart = new Date(booking.bookingStart).getTime();
    var existingBookingEnd = new Date(booking.bookingEnd).getTime(); // Check whether there is a clash between the new booking and the existing booking

    if (newBookingStart >= existingBookingStart && newBookingStart < existingBookingEnd || existingBookingStart >= newBookingStart && existingBookingStart < newBookingEnd) {
      // Switch the bookingClash variable if there is a clash
      return bookingClash = true;
    }
  }); // Ensure the new booking is valid (i.e. the start time is before the end time, and the booking is for a future time)

  var validDate = newBookingStart < newBookingEnd && newBookingStart > new Date().getTime(); // If a recurring booking as been selected, ensure the end date is after the start date

  var validRecurring = data.recurringData.length > 0 ? dateUTC(data.recurringData[0]).getTime() > newBookingEnd : true; // Save the booking to the database and return the booking if there are no clashes and the new booking time is not in the past

  if (!bookingClash && validDate && validRecurring) {
    return _init["default"].put("/workers/".concat(data.workerId), {
      bookingStart: bookingStart,
      bookingEnd: bookingEnd,
      businessUnit: data.businessUnit,
      purpose: data.purpose,
      workerId: data.workerId,
      recurring: data.recurringData
    }).then(function (res) {
      return res.data;
    })["catch"](function (err) {
      return alert(err.response.data.error.message.match(/error:.+/i)[0]);
    });
  }
} // Delete a worker booking


function deleteBooking(workerId, bookingId) {
  return _init["default"]["delete"]("/workers/".concat(workerId, "/").concat(bookingId)).then(function (res) {
    return res.data;
  });
}

function updateStateWorker(self, updatedWorker, loadMyBookings) {
  self.setState(function (previousState) {
    // Find the relevant worker in React State and replace it with the new worker data
    var updatedWorkerData = previousState.workerData.map(function (worker) {
      if (worker._id === updatedWorker._id) {
        return updatedWorker;
      } else {
        return worker;
      }
    });
    return {
      // Update the worker data in application state
      workerData: updatedWorkerData,
      currentWorker: updatedWorker
    };
  });
  loadMyBookings();
}