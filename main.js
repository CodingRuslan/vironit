function EventEmitter() {
  this._map = new Map();
}

EventEmitter.prototype.emit = function(eventName, ...args) {
  const listeners = this._map.get(eventName);
  listeners.forEach(element => {
    element(...args);
  });
}

EventEmitter.prototype.on = function(eventName, listener) {
  const listeners = this._map.get(eventName);
  if (listeners) {
    this._map.set(eventName, listeners.concat(listener))
  } else {
    this._map.set(eventName, [listener])
  }
}

EventEmitter.prototype.removeListener = function(eventName, listener) {
  const listeners = this._map.get(eventName);
  this._map.set(eventName, listeners.filter(e => e !== listener));
}

const ee = new EventEmitter();

function someListener(...args) {
  console.log("Hi", ...args)
}

ee.on('hi', someListener);
ee.emit('hi', "Someone", "lol");

ee.removeListener("hi", someListener)
ee.emit('hi', "Someone", "lol");