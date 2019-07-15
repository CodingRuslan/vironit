const {...ingredients} = require('./Ingredients');
const randomInteger = require('./randomInteger');

function clientGenerator(clientName) {
  this.clientName = clientName;
  this.order =[ingredients[randomInteger(0,4)], ingredients[randomInteger(0,4)]];

  this.getIngr = function() {
    return this.order
  }
}

module.exports = clientGenerator;