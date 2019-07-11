function B() {
	this.counter = 0;
}

function inherit(parrentObj, childObj) {
  childObj.prototype = Object.create(parrentObj.prototype)
  childObj.prototype.constructor = childObj; 

  function newConstructor() {
    parrentObj.apply(this, arguments);
    for(let key in childObj) {
      this[key] = childObj[key];
    }
  }

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