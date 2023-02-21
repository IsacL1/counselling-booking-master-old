"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workerSorter = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var workerSorter = function workerSorter(workerList, floorNumber) {
  var copiedList = workerList.slice(0); // filter list of workers to those on the given floor

  var filteredList = copiedList.filter(function (worker) {
    return worker.floor === floorNumber;
  }); // function to sort workers numerically by their floor number

  var numericalSort = function numericalSort(workerList) {
    return workerList.sort(function (first, second) {
      var firstWorker = first.name.replace(/\D+/, '');
      var secondWorker = second.name.replace(/\D+/, '');

      if (parseInt(firstWorker, 10) > parseInt(secondWorker, 10)) {
        return 1;
      } else {
        return 0;
      }
    });
  }; // numerically sort a new array with each worker named 'Worker'


  var nameWorker = numericalSort(filteredList.filter(function (worker) {
    return worker.name[0] === 'R';
  })); // numerically sort a new array with each worker named 'Studio'

  var nameStudio = numericalSort(filteredList.filter(function (worker) {
    return worker.name[0] === 'S';
  })); // numerically sort a new array with all other named worker types

  var nameOther = numericalSort(filteredList.filter(function (worker) {
    return worker.name[0] !== 'S' && worker.name[0] !== 'R';
  })); // re-combine the sorted workers, studios and others into a single array

  return nameWorker.concat(nameStudio).concat(nameOther);
};

exports.workerSorter = workerSorter;