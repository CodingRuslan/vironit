function Ingredients(name, timeCook) {
  this.name = name;
  this.timeCook = timeCook;
}

const base = new Ingredients("Основа", 5);
const chicken = new Ingredients("Курица", 4);
const pepperoni = new Ingredients("Пепперони", 3);
const pineapple = new Ingredients("Ананас", 2);
const cheese = new Ingredients("Сыр", 1);
const ham = new Ingredients("Ветчина", 3);
const shrimp = new Ingredients("Креветки", 2);
const mushrooms = new Ingredients("Грибы", 2);
const pepper = new Ingredients("Перец", 1);
const olives = new Ingredients("Оливки", 1);
const tomatoes = new Ingredients("Томаты", 2);


const ingredientsContainer = new Array(base, chicken, pepperoni, pineapple, cheese, ham, shrimp, mushrooms, pepper, olives, tomatoes);

export default ingredientsContainer;