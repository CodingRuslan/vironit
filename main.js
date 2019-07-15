const inherit = require('./src/inherit');
const EventEmitter = require('./src/EventEmitter');
const clientGenerator = require('./src/clientGenerator');
const CookerGenerator = require('./src/Cooker');
const randomInteger = require('./src/randomInteger')

const clientContainer = [];
let id = 1;

const Client = new clientGenerator();
const clientConstructor = inherit(EventEmitter, Client);

const Cooker = new CookerGenerator();
const CookerConstructor = inherit(EventEmitter, Cooker);
const chef = new CookerConstructor();

chef.on("chefFree", chefFree)

setTimeout(function run() {
  clientContainer.push(new clientConstructor(`${id}`));
  clientContainer[clientContainer.length - 1].on("createClient", orderHandler); // создаем подписку

  console.log(`Поступил ${id} заказ \t В очереди [${clientContainer.map((e) => e.clientName)}]`);

  clientContainer[0].emit('createClient');
  id++;

  setTimeout(run, randomInteger(0,7) * 1000);
}, 0);

function orderHandler() {  
  if (!chef.inWork) { // если он не в работе => ....
    chef.clientName = clientContainer[0].clientName;
    chef.ingredient = clientContainer[0].order;
    chef.inWork = true;

    console.log(`${chef.clientName} заказ в обработке`);

    setTimeout(() => {
      chef.emit("chefFree", chef.clientName)
    }, chef.cooking() * 1000)
  }
}

function chefFree(id) {
  chef.inWork = false;
  clientContainer.shift()  //Удаление клиента из очереди

  console.log(`${id} выполнен \t\t В очереди [${clientContainer.map((e) => e.clientName)}]`)

  if (clientContainer.length > 0) {
    clientContainer[0].emit('createClient') 
  }
}