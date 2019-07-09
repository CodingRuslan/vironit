function B() {
	this.counter = 0;
}


// function inherit(parrent, obj) {
//   constructor() = {
//     this
//   }
//   otherMethod
// }
 
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