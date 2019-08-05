function EventEmitter() {
  this._map = new Map();

  this.on = function on(eventName, listener) {
    const listeners = this._map.get(eventName);
    if (listeners) {
      this._map.set(eventName, listeners.concat(listener))
    } else {
      this._map.set(eventName, [listener])
    }
  }

  this.emit = function emit(eventName, ...args) {
    const listeners = this._map.get(eventName);
    listeners.forEach(element => {
      element(...args);
    });
  }

  this.removeListener = function removeListener(eventName, listener) {
    const listeners = this._map.get(eventName);
    this._map.set(eventName, listeners.filter(e => e !== listener));
  }
}

export default EventEmitter;