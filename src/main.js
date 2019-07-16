import inherit from './components/inherit';
import EventEmitter from './components/EventEmitter';
import clientGenerator from './components/clientGenerator';
import CookerGenerator from './components/Cooker';
import randomInteger from './components/randomInteger';
import render from './components/render';
import './styles/styles.scss';
document.body.appendChild(render());
let countOrder = document.querySelector('p');

const clientContainer = [];
const complitedOrderContainer = [];
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
  clientContainer[0].emit('createClient');
  console.log(`Поступил ${id} заказ \t В очереди [${clientContainer.map((e) => e.clientName)}]`);
  countOrder.innerHTML = `В очереди: ${clientContainer.map((e) => e.clientName)}`;
  
  id++;

  setTimeout(run, randomInteger(0,7) * 1000);
}, 0);

function orderHandler() {  
  if (!chef.inWork) { // если он не в работе => ....
    complitedOrderContainer.push(clientContainer.shift()) //Удаление клиента из очереди
    chef.clientName = complitedOrderContainer[complitedOrderContainer.length - 1].clientName;
    chef.ingredient = complitedOrderContainer[complitedOrderContainer.length - 1].order;
    chef.inWork = true;

    console.log(`${chef.clientName} заказ в обработке`);

    setTimeout(() => {
      chef.emit("chefFree", chef.clientName)
    }, chef.cooking() * 1000)
  }
}

function chefFree(id) {
  chef.inWork = false;
    

  console.log(`${id} выполнен \t\t В очереди [${clientContainer.map((e) => e.clientName)}]`)

  if (clientContainer.length > 0) {
    clientContainer[0].emit('createClient') 
  }
}

