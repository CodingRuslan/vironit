import ingredients from './Ingredients';
import randomInteger from './randomInteger';



function clientGenerator(clientName, orderPreparationTime, review) {
  this.clientName = clientName;
  this.orderPreparationTime = orderPreparationTime;
  this.review = review;
  this.order = [];

  // const ingredientsCount = randomInteger(2,7);
  for (let i = 0; i < randomInteger(2,7); i++) {
    this.order.push(ingredients[randomInteger(0, 10)])
  }
}

export default clientGenerator;