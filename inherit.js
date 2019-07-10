function B() {
	this.counter = 0;
}

function inherit(parrentObj, childObj) {
  return function() {
    parrentObj.apply(this, arguments);
    for(let key in childObj) {
      this[key] = childObj[key];
    }
  }
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
  console.log(f.constructor())