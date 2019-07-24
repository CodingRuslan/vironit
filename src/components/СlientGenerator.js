import ingredients from './Ingredients';
import randomInteger from './randomInteger';

function clientGenerator(clientName) {
  this.clientName = clientName;
  this.order =[ingredients[randomInteger(0,4)], ingredients[randomInteger(0,4)]];

  this.getIngr = function() {
    return this.order
  }
}

export default clientGenerator;