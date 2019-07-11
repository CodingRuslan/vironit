function Ingridients(name, timeCook) {
  this.name = name;
  this.timeCook = timeCook;
}

const base = new Ingridients("base", 5);
const chicken = new Ingridients("chicken", 4);
const pepperoni = new Ingridients("pepperoni", 3);
const pineapple = new Ingridients("pineapple", 2);
const cheese = new Ingridients("cheese", 1);

const ingridientsContainer = new Array(base, chicken, pepperoni, pineapple,cheese);
module.exports = ingridientsContainer;