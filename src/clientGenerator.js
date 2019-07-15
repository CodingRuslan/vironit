const {...ingredients} = require('./Ingredients')

function clientGenerator(clientName) {
  this.clientName = clientName;
  this.order =[ingredients[1], ingredients[2]]; // Ingredients [{ name: 'chicken', timeCook: 4 }, Ingredients("pepperoni", 3);]

  this.getIngr = function() {
    return this.order
  }
}

module.exports = clientGenerator;