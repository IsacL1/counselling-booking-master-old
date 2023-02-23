"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeBooking = makeBooking;
exports.deleteBooking = deleteBooking;
exports.updateStateRoom = updateStateRoom;

var _moment = _interopRequireDefault(require("moment"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _init = _interopRequireDefault(require("./init"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var HKTimeZone = 'Asia/Hong_Kong'; // Function to receive booking data (AEST) and convert to JS Date object
// Data expected in [year, month, date, hours, seconds] format

var dateUTC = function dateUTC(dataArray) {
  // Ensure date data is saved in AEST and then converted to a Date object in UTC
  return (0, _momentTimezone["default"])(dataArray).tz(HKTimeZone).toDate();
}; // Make a room booking


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
    return _init["default"].put("/rooms/".concat(data.roomId), {
      bookingStart: bookingStart,
      bookingEnd: bookingEnd,
      issue: data.issue,
      emergencyLv: data.emergencyLv,
      //businessUnit: data.businessUnit,
      //purpose: data.purpose,
      roomId: data.roomId //recurring: data.recurringData

    }).then(function (res) {
      return res.data;
    })["catch"](function (err) {
      return alert(err.response.data.error.message.match(/error:.+/i)[0]);
    });
  }
} // Delete a room booking


function deleteBooking(roomId, bookingId) {
  return _init["default"]["delete"]("/rooms/".concat(roomId, "/").concat(bookingId)).then(function (res) {
    return res.data;
  });
}

function updateStateRoom(self, updatedRoom, loadMyBookings) {
  self.setState(function (previousState) {
    // Find the relevant room in React State and replace it with the new room data
    var updatedRoomData = previousState.roomData.map(function (room) {
      if (room._id === updatedRoom._id) {
        return updatedRoom;
      } else {
        return room;
      }
    });
    return {
      // Update the room data in application state
      roomData: updatedRoomData,
      currentRoom: updatedRoom
    };
  });
  loadMyBookings();
}