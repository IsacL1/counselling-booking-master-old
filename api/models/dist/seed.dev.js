"use strict";

var Worker = require('./Worker');

Worker.create([// Level 8
{
  name: 'Worker 1',
  floor: '8',
  capacity: 18,
  assets: {
    pcLab: true
  }
}, {
  name: 'Worker 2',
  floor: '8',
  capacity: 18,
  assets: {
    projector: true
  }
}, {
  name: 'Worker 3',
  floor: '8',
  capacity: 18,
  assets: {
    projector: true,
    opWalls: true
  }
}, {
  name: 'Worker 4',
  floor: '8',
  capacity: 24
}, {
  name: 'Worker 5',
  floor: '8',
  capacity: 18,
  assets: {
    opWalls: true
  }
}, {
  name: 'Worker 6',
  floor: '8',
  capacity: 18
}, {
  name: 'Worker 7',
  floor: '8',
  capacity: 18
}, {
  name: 'Worker 8',
  floor: '8',
  capacity: 18
}, {
  name: 'Worker 9',
  floor: '8',
  capacity: 18
}, {
  name: 'Worker 10',
  floor: '8',
  capacity: 18
}, {
  name: 'Worker 11',
  floor: '8',
  capacity: 18
}, {
  name: 'Worker 12',
  floor: '8',
  capacity: 18,
  assets: {
    tv: true
  }
}, {
  name: 'Worker 13',
  floor: '8',
  capacity: 18
}, {
  name: 'Worker 14',
  floor: '8',
  capacity: 18,
  assets: {
    tv: true
  }
}, {
  name: 'Worker 15',
  floor: '8',
  capacity: 18,
  assets: {
    tv: true
  }
}, {
  name: 'Studio 11',
  floor: '8',
  capacity: 18
}, {
  name: 'Studio 12',
  floor: '8',
  capacity: 18
}, {
  name: 'Studio 13',
  floor: '8',
  capacity: 18
}, {
  name: 'Studio 14',
  floor: '8',
  capacity: 18
}, {
  name: 'Studio 15',
  floor: '8',
  capacity: 18
}, {
  name: 'Lab 01',
  floor: '8',
  capacity: 20,
  assets: {
    macLab: true
  }
}, // Level 13
{
  name: 'Worker 1',
  floor: '13',
  capacity: 20,
  assets: {
    opWalls: true
  }
}, {
  name: 'Worker 2',
  floor: '13',
  capacity: 20,
  assets: {
    opWalls: true
  }
}, {
  name: 'Worker 3',
  floor: '13',
  capacity: 20,
  assets: {
    opWalls: true
  }
}, {
  name: 'Worker 4',
  floor: '13',
  capacity: 20,
  assets: {
    projector: true,
    opWalls: true
  }
}, {
  name: 'Worker 5',
  floor: '13',
  capacity: 20,
  assets: {
    projector: true
  }
}, {
  name: 'Worker 6',
  floor: '13',
  capacity: 20,
  assets: {
    projector: true
  }
}, {
  name: 'Worker 7',
  floor: '13',
  capacity: 20,
  assets: {
    projector: true
  }
}, {
  name: 'Worker 8/9',
  floor: '13',
  capacity: 40,
  assets: {
    projector: true
  }
}, {
  name: 'Worker 10',
  floor: '13',
  capacity: 16
}, {
  name: 'Worker 11',
  floor: '13',
  capacity: 20
}, {
  name: 'Worker 12',
  floor: '13',
  capacity: 20
}, {
  name: 'Worker 13',
  floor: '13',
  capacity: 20,
  assets: {
    macLab: true
  }
}, {
  name: 'Worker 14',
  floor: '13',
  capacity: 20,
  assets: {
    pcLab: true
  }
}, {
  name: 'Worker 15',
  floor: '13',
  capacity: 20,
  assets: {
    pcLab: true
  }
}, {
  name: 'Worker 16',
  floor: '13',
  capacity: 20,
  assets: {
    pcLab: true
  }
}, {
  name: 'Worker 17',
  floor: '13',
  capacity: 20
}, {
  name: 'Worker 18',
  floor: '13',
  capacity: 20
}, {
  name: 'Green Screen Worker',
  floor: '13',
  capacity: null,
  assets: {
    tv: true
  }
}]).then(function (workers) {
  console.log("Created ".concat(workers.length, " workers."));
})["catch"](function (error) {
  console.error(error);
});