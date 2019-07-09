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

EventEmitter.prototype.remove = function(eventName) {
  this._map.delete(eventName);
}

const ee = new EventEmitter();
ee.on('hi', (name) => console.log(`Hi ${name}`));
ee.emit('hi', "Someone");