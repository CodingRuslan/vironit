function B() {
	this.counter = 0;
}

// function F() {
//   B.apply(this, arguments);
//   this.constructor = function() {
//     this.name = "foo";
//   }
//   this.getCounter = function() {
//     return this.counter;
//   }
// }

// F.prototype = Object.create(B.prototype)
// F.prototype.constructor = F;

function inherit(parrentObj, childObj) {
  

  const newObj = new Object();
  // const key = Object.keys(childObj);
  for(key in childObj) {
    newObj.prototype[key] = childObj[key];
    // this.key = childObj[key]
  }

  parrentObj.apply(newObj, arguments);
  return newObj;
  // childObj.prototype = Object.create(parrentObj.prototype)
  // childObj.prototype.constructor = childObj;
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
  console.log(f.getCounter()) // 0;