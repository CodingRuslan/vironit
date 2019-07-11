function B() {
	this.counter = 0;
}

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
 
const F = inherit(B, {
  constructor: function() {
   this.name = "foo";
  },
  getCounter: function() {
    return this.counter;
  },
});
  
  const f = new F();
  console.log(f)
  console.log(f.getCounter()) // 0;