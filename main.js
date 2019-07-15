const inherit = require('./src/inherit');
const EventEmitter = require('./src/EventEmitter');
const clientGenerator = require('./src/clientGenerator');
const CookerGenerator = require('./src/Cooker');
// массив(очередь) клиентов

const Client = new clientGenerator();
const clientConstructor = inherit(EventEmitter, Client);

const Cooker = new CookerGenerator();
const CookerConstructor = inherit(EventEmitter, Cooker);
const chef = new CookerConstructor();

// setTimeout(function run() {
//   func(i);
//   setTimeout(run, 100);
// }, 100);

//SetTimeOut{
  const bob = new clientConstructor("Bob"); // приходит клиент
  bob.on("createClient", someFunc); // создаем подписку
  chef.on("chefFree", chefFree())
//}

bob.emit('createClient')

function someFunc() {
  chef.clientName = bob.clientName;
  chef.ingredient = bob.order;
  bob.inWork = true;
  setTimeout(() => {
    chef.on("chefFree")
    console.log("good")
  }, chef.cooking() * 500)
}

function chefFree() {
  bob.inWork = false;
  //Удаление слиента из очереди
}