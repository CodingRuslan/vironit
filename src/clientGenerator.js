const {...ingridients} = require('./Ingridients')

function clientGenerator(name) {
  this.name = name;
  this.order = ingridients[1]; // Ingridients { name: 'chicken', timeCook: 4 }

  this.getIngr = function() {
    return this.order
  }
}

module.exports = clientGenerator;