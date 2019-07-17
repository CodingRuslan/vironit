import inherit from './components/inherit';
import EventEmitter from './components/EventEmitter';
import clientGenerator from './components/clientGenerator';
import CookerGenerator from './components/Cooker';
import randomInteger from './components/randomInteger';
import render from './components/render';
import './styles/styles.scss';
// import { join } from 'path';

// const cookContainer = [];
const clientContainer = [];
const performanceContainer = [];
const completedOrderContainer = [];
let id = 1; 

const Client = new clientGenerator();
const clientConstructor = inherit(EventEmitter, Client);

const Cooker = new CookerGenerator();
const CookerConstructor = inherit(EventEmitter, Cooker);
const chef = new CookerConstructor();

chef.on("chefFree", chefFree);

//!!!---------------------------render ---------------------------------
document.body.appendChild(render());
const orderCount = document.querySelector('.orderCount');
const cookCount = document.querySelector('.cookCount');
const queue = document.querySelector('div.queueWrap p');
const process = document.querySelector('div.processWrap p');
const readyOrder = document.querySelector('div.readyOrderWrap p');

cookCount.innerHTML = 'Поваров в работе: 1';
// ---------------------------------------------------------------------

setTimeout(function run() {
  clientContainer.push(new clientConstructor(`${id}`));
  clientContainer[clientContainer.length - 1].on("createClient", orderHandler); // создаем подписку
  clientContainer[0].emit('createClient');
  
  console.log(`Поступил ${id} заказ \t В очереди [${clientContainer.map((e) => e.clientName)}]`);
  orderCount.innerHTML = `Размер очереди: ${clientContainer.length}`;
  queue.innerHTML = `${clientContainer.map((e) => e.clientName).join(' ')}`;
  
  id++;

  setTimeout(run, randomInteger(0,7) * 1000);
}, 0);

function orderHandler() {  
  if (!chef.inWork) { // если он не в работе => ....
    performanceContainer.push(clientContainer.shift()) // Перемещение заказа в выполнение
    chef.clientName = performanceContainer[0].clientName;
    chef.ingredient = performanceContainer[0].order;
    chef.inWork = true;
    completedOrderContainer.push(performanceContainer.shift())
    orderCount.innerHTML = `Размер очереди: ${clientContainer.length}`;
    queue.innerHTML = `${clientContainer.map((e) => e.clientName).join(' ')}`;
    process.innerHTML = `${completedOrderContainer.slice(completedOrderContainer.length - 1, completedOrderContainer.length).map((e) => e.clientName)}`; // вместо - 1 [].length

    console.log(`${chef.clientName} заказ в обработке`);

    setTimeout(() => {
      chef.emit("chefFree", chef.clientName)
    }, chef.cooking() * 1000)
  }
}

function chefFree(id) {
  chef.inWork = false;
  readyOrder.innerHTML = `${completedOrderContainer.map((e) => e.clientName).join(' ')}`;
  console.log(`${id} выполнен \t\t В очереди [${clientContainer.map((e) => e.clientName)}]`);

  if (clientContainer.length > 0) {
    clientContainer[0].emit('createClient') 
  }
}

