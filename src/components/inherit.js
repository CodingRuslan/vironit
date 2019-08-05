function inherit(parrentObj, proto) {
  const { constructor, ...prototype} = proto;
  function newConstructor() {
    parrentObj.apply(this, arguments);
    constructor.apply(this, arguments);
  }

  newConstructor.prototype = Object.create(parrentObj.prototype)
  newConstructor.prototype.constructor = newConstructor;

  newConstructor.prototype = Object.keys(prototype).reduce((currentPrototype, method) => 
   Object.assign({}, currentPrototype, { [method]: prototype[method] }), newConstructor.prototype);

  return newConstructor
}
 
export default inherit;