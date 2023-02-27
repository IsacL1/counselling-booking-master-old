"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onFilterByAvailablity = exports.onFilterByCapacity = exports.onFilterByIssue = exports.onFilterByFloor = exports.capacityParams = exports.filterParams = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _bookingForm = require("../helpers/bookingForm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var filterParams = [{
  name: 'famIsu',
  value: false
}, {
  name: 'styIsu',
  value: false
}, {
  name: 'healIsu',
  value: false
}, {
  name: 'relatIsu',
  value: false
}];
/*
export const filterParams = [ 
  {name: 'macLab', value: false},
  {name: 'pcLab', value: false},
  {name: 'tv', value: false},
  {name: 'opWalls', value: false},
  {name: 'projector', value: false} ]
*/
// Initial Capacity parameters

exports.filterParams = filterParams;
var capacityParams = [{
  capacity: 1,
  id: '1seat',
  value: false
}];
/*
export const capacityParams = [
  {capacity: 16, id: '16seats', value: false},
  {capacity: 18, id: '18seats', value: false},
  {capacity: 20, id: '20seats', value: false},
  {capacity: 24, id: '24seats', value: false},
  {capacity: 40, id: '40seats', value: false},
]
*/
// Filtering Functions
// Filter roomData by floor

exports.capacityParams = capacityParams;

var onFilterByFloor = function onFilterByFloor(param, filteredData) {
  if (param === 'all') {
    return filteredData;
  } else {
    return filteredData.filter(function (room) {
      return room.floor === param;
    });
  }
}; // Filter data by issue


exports.onFilterByFloor = onFilterByFloor;

var onFilterByIssue = function onFilterByIssue(params, filteredData) {
  params.forEach(function (issue) {
    if (issue.name === 'famIsu' && issue.value === true) {
      filteredData = filteredData.filter(function (room) {
        return room.assets.famIsu === true;
      });
    } else if (issue.name === 'styIsu' && issue.value === true) {
      filteredData = filteredData.filter(function (room) {
        return room.assets.styIsu === true;
      });
    } else if (issue.name === 'healIsu' && issue.value === true) {
      filteredData = filteredData.filter(function (room) {
        return room.assets.healIsu === true;
      });
    } else if (issue.name === 'relatIsu' && issue.value === true) {
      filteredData = filteredData.filter(function (room) {
        return room.assets.relatIsu === true;
      });
    }
  });
  return filteredData;
};
/*
export const onFilterByFeature = (params, filteredData) => {
  params.forEach(feature => {
    if (feature.name === 'macLab' && feature.value === true) {
      filteredData = filteredData.filter(room => room.assets.macLab === true)
    } else if (feature.name === 'pcLab' && feature.value === true) {
      filteredData = filteredData.filter(room => room.assets.pcLab === true)
    } else if (feature.name === 'tv' && feature.value === true) {
      filteredData = filteredData.filter(room => room.assets.tv === true)
    } else if (feature.name === 'opWall' && feature.value === true) {
      filteredData = filteredData.filter(room => room.assets.opWalls === true)
    } else if (feature.name === 'projector' && feature.value === true) {
      filteredData = filteredData.filter(room => room.assets.projector === true)
    }
  })
  return filteredData
}
*/
// Filter data by capacity


exports.onFilterByIssue = onFilterByIssue;

var onFilterByCapacity = function onFilterByCapacity(params, filteredData) {
  var roomsByCapacity = [];
  params.forEach(function (capacity) {
    if (capacity.value === true) {
      roomsByCapacity.push.apply(roomsByCapacity, _toConsumableArray(filteredData.filter(function (room) {
        return room.capacity === capacity.capacity;
      })));
    }
  });

  if (roomsByCapacity.length > 0) {
    return roomsByCapacity;
  } else {
    return filteredData;
  }
}; // Filter data by availability


exports.onFilterByCapacity = onFilterByCapacity;

var onFilterByAvailablity = function onFilterByAvailablity(params, filteredData) {
  if (params === 'fullyAvail') {
    filteredData = filteredData.filter(function (room) {
      return room.bookings.length === 0;
    });
  } else if (params === 'partAvail') {
    filteredData = filteredData.filter(function (room) {
      return room.bookings.length > 0;
    });
  } else if (params === 'fullBooked') {
    filteredData = !filteredData.filter(function (room) {
      return room.bookings.length > 0;
    }) && !filteredData.filter(function (room) {
      return room.bookings.length === 0;
    });
  }

  return filteredData;
};

exports.onFilterByAvailablity = onFilterByAvailablity;