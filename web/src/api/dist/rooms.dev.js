"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listWorkers = listWorkers;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _init = _interopRequireDefault(require("./init"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function listWorkers() {
  return _init["default"].get('/workers').then(function (res) {
    return res.data;
  });
}