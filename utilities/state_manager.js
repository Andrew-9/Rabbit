const EventEmitter = require('events');
const emmiter = new EventEmitter();

class StateManager extends EventEmitter {}
module.exports = new StateManager();