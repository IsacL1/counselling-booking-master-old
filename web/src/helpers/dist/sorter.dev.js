"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roomSorter = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var roomSorter = function roomSorter(roomList, floorNumber) {
  var copiedList = roomList.slice(0); // filter list of rooms to those on the given floor

  var filteredList = copiedList.filter(function (room) {
    return room.floor === floorNumber;
  }); // function to sort rooms numerically by their floor number

  var numericalSort = function numericalSort(roomList) {
    return roomList.sort(function (first, second) {
      var firstRoom = first.name.replace(/\D+/, '');
      var secondRoom = second.name.replace(/\D+/, '');

      if (parseInt(firstRoom, 10) > parseInt(secondRoom, 10)) {
        return 1;
      } else {
        return 0;
      }
    });
  }; // numerically sort a new array with each room named 'Room'


  var nameRoom = numericalSort(filteredList.filter(function (room) {
    return room.name[0] === 'R';
  })); // numerically sort a new array with each room named 'Studio'

  var nameStudio = numericalSort(filteredList.filter(function (room) {
    return room.name[0] === 'S';
  })); // numerically sort a new array with all other named room types

  var nameOther = numericalSort(filteredList.filter(function (room) {
    return room.name[0] !== 'S' && room.name[0] !== 'R';
  })); // re-combine the sorted rooms, studios and others into a single array

  return nameRoom.concat(nameStudio).concat(nameOther);
};

exports.roomSorter = roomSorter;