import inherit from './components/inherit';
import EventEmitter from './components/EventEmitter';
import clientGenerator from './components/clientGenerator';
import CookerGenerator from './components/Cooker';
import randomInteger from './components/randomInteger';
import render from './components/render';
import './styles/styles.scss';

const cookContainer = [];
const clientContainer = [];
const performanceContainer = [];
const completedOrderContainer = [];
let id = 1;
let removeCookFlag = false;

const Client = new clientGenerator();
const clientConstructor = inherit(EventEmitter, Client);

const Cooker = new CookerGenerator();
const CookerConstructor = inherit(EventEmitter, Cooker);

document.body.appendChild(render());
const orderCount = document.querySelector('.orderCount');
const cookCount = document.querySelector('.cookCount');
const queue = document.querySelector('div.queueWrap p');
const process = document.querySelector('div.processWrap p');
const readyOrder = document.querySelector('div.readyOrderWrap p');
const addCookBtn = document.querySelector('button.addCookBtn');
const deleteCookBtn = document.querySelector('button.deleteCookBtn');
const cookScreen = document.querySelector('.cookScreen');

cookCount.innerHTML = `Поваров в работе: ${cookContainer.length}`;

addCookBtn.addEventListener('click',() => {
  cookContainer.push(new CookerConstructor());
  cookContainer[cookContainer.length - 1].on("chefFree", chefFree);
  cookCount.innerHTML = `Поваров в работе: ${cookContainer.length}`;

  const cookIcon = document.createElement('div');
  cookIcon.classList.add('cookNotWorksIcon');
  cookScreen.appendChild(cookIcon);
});

deleteCookBtn.addEventListener('click', () => {
  if (cookContainer.length > 0 ) {
    removeCookFlag = true;
  }
})

setTimeout(function run() {
  clientContainer.push(new clientConstructor(`${id}`));
  clientContainer[clientContainer.length - 1].on("createClient", orderHandler); // создаем подписку
  clientContainer[0].emit('createClient');
  
  // console.log(`Поступил ${id} заказ \t В очереди [${clientContainer.map((e) => e.clientName)}]`);
  orderCount.innerHTML = `Размер очереди: ${clientContainer.length}`;
  queue.innerHTML = `${clientContainer.map((e) => e.clientName).join(' ')}`;
  id++;

  setTimeout(run, randomInteger(0,7) * 1000);
}, 0);

function orderHandler() {
    for (let i = 0; i <= cookContainer.length - 1; i++) {
      if (!cookContainer[i].inWork) { // если он не в работе => ....
        if (clientContainer.length > 0){
          performanceContainer.unshift(clientContainer.shift()); // Перемещение заказа в выполнение
          process.innerHTML = `${performanceContainer.map((e) => e.clientName).join(' ')}`;
          cookContainer[i].clientName = performanceContainer[0].clientName;
          cookContainer[i].ingredient = performanceContainer[0].order;
          cookContainer[i].inWork = true;
          orderCount.innerHTML = `Размер очереди: ${clientContainer.length}`;
          queue.innerHTML = `${clientContainer.map((e) => e.clientName).join(' ')}`;

          const cookIcon = document.querySelector('.cookNotWorksIcon');
          cookIcon.classList.add("cookWorksIcon");
          cookIcon.classList.remove("cookNotWorksIcon");
          // console.log(`${cookContainer[i].clientName} заказ в обработке`);

          setTimeout(() => {
            if (cookContainer[i] !== undefined) {
              cookContainer[i].emit("chefFree", cookContainer[i].clientName, i);
            }
          }, cookContainer[i].cooking() * 1000)
        }
      }
    }
}

function chefFree(clientName, cookId) {
  if (removeCookFlag && cookId === cookContainer.length - 1) { // удаление повара
    removeCookFlag = false;
    cookContainer[cookId].inWork = false;
    completedOrderContainer.push(performanceContainer[performanceContainer.findIndex((e) => {if(e.clientName == clientName) {return e}})]);
    performanceContainer.splice(performanceContainer.findIndex((e) => {if(e.clientName == clientName) {return e}}), 1);
    process.innerHTML = `${performanceContainer.map((e) => e.clientName).join(' ')}`;
    readyOrder.innerHTML = `${completedOrderContainer.map((e) => e.clientName).join(' ')}`;

    cookContainer.splice(cookId, 1)
    cookCount.innerHTML = `Поваров в работе: ${cookContainer.length}`;
    
    const cookIcon = document.querySelector('.cookWorksIcon')
    cookScreen.removeChild(cookIcon); 

    if (cookContainer.length > 0) {
      returnClient(completedOrderContainer[completedOrderContainer.length - 1]);
    }
  } else {
    cookContainer[cookId].inWork = false;
    completedOrderContainer.push(performanceContainer[performanceContainer.findIndex((e) => {if(e.clientName == clientName) {return e}})]);
    performanceContainer.splice(performanceContainer.findIndex((e) => {if(e.clientName == clientName) {return e}}), 1);
    process.innerHTML = `${performanceContainer.map((e) => e.clientName).join(' ')}`;
    readyOrder.innerHTML = `${completedOrderContainer.map((e) => e.clientName).join(' ')}`;

    const cookIcon = document.querySelector('.cookWorksIcon');
    cookIcon.classList.remove("cookWorksIcon");
    cookIcon.classList.add("cookNotWorksIcon");
  }

  // console.log(`${clientName} выполнен \t\t В очереди [${clientContainer.map((e) => e.clientName)}]`);

  if (clientContainer.length > 0) {
    clientContainer[0].emit('createClient') 
  }

  if (cookContainer.length > 0) {
    returnClient(completedOrderContainer[completedOrderContainer.length - 1]);
  }
}

function returnClient(client) {
  if (randomInteger(1, 100) <= 25) {
    clientContainer.push(client);
    orderCount.innerHTML = `Размер очереди: ${clientContainer.length}`;
    queue.innerHTML = `${clientContainer.map((e) => e.clientName).join(' ')}`;
  } 
}