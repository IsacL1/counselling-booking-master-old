"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onFilterByAvailablity = exports.onFilterByCapacity = exports.onFilterByFeature = exports.onFilterByFloor = exports.capacityParams = exports.filterParams = exports.floorParams = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _bookingForm = require("../helpers/bookingForm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var floorParams = [{
  name: '8',
  value: false
}, {
  name: '13',
  value: false
}, {
  name: 'all',
  value: false
}]; // initial feature filter parameters

exports.floorParams = floorParams;
var filterParams = [{
  name: 'macLab',
  value: false
}, {
  name: 'pcLab',
  value: false
}, {
  name: 'tv',
  value: false
}, {
  name: 'opWalls',
  value: false
}, {
  name: 'projector',
  value: false
}]; // Initial Capacity parameters

exports.filterParams = filterParams;
var capacityParams = [{
  capacity: 16,
  id: '16seats',
  value: false
}, {
  capacity: 18,
  id: '18seats',
  value: false
}, {
  capacity: 20,
  id: '20seats',
  value: false
}, {
  capacity: 24,
  id: '24seats',
  value: false
}, {
  capacity: 40,
  id: '40seats',
  value: false
}]; // Filtering Functions
// Filter workerData by floor

exports.capacityParams = capacityParams;

var onFilterByFloor = function onFilterByFloor(param, filteredData) {
  if (param === 'all') {
    return filteredData;
  } else {
    return filteredData.filter(function (worker) {
      return worker.floor === param;
    });
  }
}; // Filter data by feature


exports.onFilterByFloor = onFilterByFloor;

var onFilterByFeature = function onFilterByFeature(params, filteredData) {
  params.forEach(function (feature) {
    if (feature.name === 'macLab' && feature.value === true) {
      filteredData = filteredData.filter(function (worker) {
        return worker.assets.macLab === true;
      });
    } else if (feature.name === 'pcLab' && feature.value === true) {
      filteredData = filteredData.filter(function (worker) {
        return worker.assets.pcLab === true;
      });
    } else if (feature.name === 'tv' && feature.value === true) {
      filteredData = filteredData.filter(function (worker) {
        return worker.assets.tv === true;
      });
    } else if (feature.name === 'opWall' && feature.value === true) {
      filteredData = filteredData.filter(function (worker) {
        return worker.assets.opWalls === true;
      });
    } else if (feature.name === 'projector' && feature.value === true) {
      filteredData = filteredData.filter(function (worker) {
        return worker.assets.projector === true;
      });
    }
  });
  return filteredData;
}; // Filter data by capacity


exports.onFilterByFeature = onFilterByFeature;

var onFilterByCapacity = function onFilterByCapacity(params, filteredData) {
  var workersByCapacity = [];
  params.forEach(function (capacity) {
    if (capacity.value === true) {
      workersByCapacity.push.apply(workersByCapacity, _toConsumableArray(filteredData.filter(function (worker) {
        return worker.capacity === capacity.capacity;
      })));
    }
  });

  if (workersByCapacity.length > 0) {
    return workersByCapacity;
  } else {
    return filteredData;
  }
}; // Filter data by availability


exports.onFilterByCapacity = onFilterByCapacity;

var onFilterByAvailablity = function onFilterByAvailablity(params, filteredData) {
  if (params === 'fullyAvail') {
    filteredData = filteredData.filter(function (worker) {
      return worker.bookings.length === 0;
    });
  } else if (params === 'partAvail') {
    filteredData = filteredData.filter(function (worker) {
      return worker.bookings.length > 0;
    });
  } else if (params === 'fullBooked') {
    filteredData = !filteredData.filter(function (worker) {
      return worker.bookings.length > 0;
    }) && !filteredData.filter(function (worker) {
      return worker.bookings.length === 0;
    });
  }

  return filteredData;
};

exports.onFilterByAvailablity = onFilterByAvailablity;