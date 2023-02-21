"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = exports.storage = exports.auth = exports.app = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var _storage = require("firebase/storage");

var _firestore = require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyDPq3-Wcix-6xtA8V4jmAZmu2HES_WkO1Q",
  authDomain: "fyp-chatroom-ffe7b.firebaseapp.com",
  projectId: "fyp-chatroom-ffe7b",
  storageBucket: "fyp-chatroom-ffe7b.appspot.com",
  messagingSenderId: "710575606967",
  appId: "1:710575606967:web:a62da042c9be748453d132",
  measurementId: "G-SZQFMBHZH4"
}; // Initialize Firebase

var app = (0, _app.initializeApp)(firebaseConfig);
exports.app = app;
var auth = (0, _auth.getAuth)();
exports.auth = auth;
var storage = (0, _storage.getStorage)();
exports.storage = storage;
var db = (0, _firestore.getFirestore)();
exports.db = db;