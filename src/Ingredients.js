function Ingredients(name, timeCook) {
  this.name = name;
  this.timeCook = timeCook;
}

const base = new Ingredients("base", 5);
const chicken = new Ingredients("chicken", 4);
const pepperoni = new Ingredients("pepperoni", 3);
const pineapple = new Ingredients("pineapple", 2);
const cheese = new Ingredients("cheese", 1);

const ingredientsContainer = new Array(base, chicken, pepperoni, pineapple,cheese);
module.exports = ingredientsContainer;