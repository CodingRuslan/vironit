import ingredients from './Ingredients';
import randomInteger from './randomInteger';

const ingredientsCount = randomInteger(2,4);

function clientGenerator(clientName) {
  this.clientName = clientName;
  this.order = [];
  for (let i = 0; i < ingredientsCount; i++) {
    this.order.push(ingredients[randomInteger(0,4)])
  }
}

export default clientGenerator;