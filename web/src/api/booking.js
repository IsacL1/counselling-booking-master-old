import moment from 'moment'
import momentTimezone from 'moment-timezone'
import api from './init'

// Function to receive booking data (AEST) and convert to JS Date object
// Data expected in [year, month, date, hours, seconds] format
const dateUTC = (dataArray) => {
  // Ensure date data is saved in AEST and then converted to a Date object in UTC
  return momentTimezone(dataArray).tz('Australia/Sydney').toDate()
}

// Make a worker booking
export function makeBooking(data, existingBookings) {
  // Convert booking data to UTC Date objects
  let bookingStart = dateUTC(data.startDate)
  let bookingEnd = dateUTC(data.endDate)

  // Convert booking Date objects into a number value
  let newBookingStart = bookingStart.getTime()
  let newBookingEnd = bookingEnd.getTime()

  // Check whether the new booking times overlap with any of the existing bookings
  let bookingClash = false

  existingBookings.forEach(booking => {

    // Convert existing booking Date objects into number values
    let existingBookingStart = new Date(booking.bookingStart).getTime()
    let existingBookingEnd = new Date(booking.bookingEnd).getTime()

    // Check whether there is a clash between the new booking and the existing booking
    if (((newBookingStart >= existingBookingStart) && (newBookingStart < existingBookingEnd)) ||
      ((existingBookingStart >= newBookingStart) && (existingBookingStart < newBookingEnd))) {
          // Switch the bookingClash variable if there is a clash
          return bookingClash = true
    }
  })

  // Ensure the new booking is valid (i.e. the start time is before the end time, and the booking is for a future time)
  let validDate = newBookingStart < newBookingEnd && newBookingStart > new Date().getTime()

  // If a recurring booking as been selected, ensure the end date is after the start date
  let validRecurring = (data.recurringData.length > 0) ? 
    dateUTC(data.recurringData[0]).getTime() > newBookingEnd : true

  // Save the booking to the database and return the booking if there are no clashes and the new booking time is not in the past
  if (!bookingClash && validDate && validRecurring) {
    return api.put(`/workers/${data.workerId}`, {
      bookingStart: bookingStart,
      bookingEnd: bookingEnd,
      businessUnit: data.businessUnit,
      purpose: data.purpose,
      workerId: data.workerId,
      recurring: data.recurringData
    })
      .then(res => res.data)
      .catch(err => alert(err.response.data.error.message.match(/error:.+/i)[0]))
  }
}

// Delete a worker booking
export function deleteBooking(workerId, bookingId) {
  return api.delete(`/workers/${workerId}/${bookingId}`)
    .then(res => res.data)
}

export function updateStateWorker(self, updatedWorker, loadMyBookings) {
  self.setState((previousState) => {
    // Find the relevant worker in React State and replace it with the new worker data
    const updatedWorkerData = previousState.workerData.map((worker) => {
      if (worker._id === updatedWorker._id) {
        return updatedWorker
      } else {
        return worker
      }
    })
    return {
      // Update the worker data in application state
      workerData: updatedWorkerData,
      currentWorker: updatedWorker
    }
  })
  loadMyBookings()
}