import ingredients from './Ingredients';
import randomInteger from './randomInteger';



function clientGenerator(clientName) {
  let ingredientsCount = randomInteger(2,7);
  this.clientName = clientName;
  this.order = [];
  for (let i = 0; i < ingredientsCount; i++) {
    this.order.push(ingredients[randomInteger(0, 10)])
  }
}

export default clientGenerator;