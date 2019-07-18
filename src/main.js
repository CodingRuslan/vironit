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

const Client = new clientGenerator();
const clientConstructor = inherit(EventEmitter, Client);

const Cooker = new CookerGenerator();
const CookerConstructor = inherit(EventEmitter, Cooker);

//!!!---------------------------render -------------------------------
document.body.appendChild(render());
const orderCount = document.querySelector('.orderCount');
const cookCount = document.querySelector('.cookCount');
const queue = document.querySelector('div.queueWrap p');
const process = document.querySelector('div.processWrap p');
const readyOrder = document.querySelector('div.readyOrderWrap p');
const addCookBtn = document.querySelector('button.addCookBtn');
const deleteCookBtn = document.querySelector('button.deleteCookBtn');

cookCount.innerHTML = `Поваров в работе: ${cookContainer.length}`;
// ---------------------------------------------------------------------

addCookBtn.addEventListener('click',() => {
  cookContainer.push(new CookerConstructor());
  cookContainer[cookContainer.length - 1].on("chefFree", chefFree);
  cookCount.innerHTML = `Поваров в работе: ${cookContainer.length}`;
});

deleteCookBtn.addEventListener('click', () => {
  cookContainer[cookContainer.length - 1].removeListener("chefFree", chefFree);
  cookContainer.pop();
  cookCount.innerHTML = `Поваров в работе: ${cookContainer.length}`;
})

setTimeout(function run() {
  clientContainer.push(new clientConstructor(`${id}`));
  clientContainer[clientContainer.length - 1].on("createClient", orderHandler); // создаем подписку
  clientContainer[0].emit('createClient');
  
  // console.log(`Поступил ${id} заказ \t В очереди [${clientContainer.map((e) => e.clientName)}]`);
  orderCount.innerHTML = `Размер очереди: ${clientContainer.length}`;
  queue.innerHTML = `${clientContainer.map((e) => e.clientName).join(' ')}`;
  id++;
  
  setTimeout(run, randomInteger(0,2) * 1000);
}, 1);

function orderHandler() {
    for (let i = 0; i <= cookContainer.length - 1; i++) {
      if (!cookContainer[i].inWork) { // если он не в работе => ....
        if (clientContainer.length > 0){
          performanceContainer.unshift(clientContainer.shift()); // Перемещение заказа в выполнение
          process.innerHTML = `${performanceContainer.map((e) => e.clientName)}`;
          cookContainer[i].clientName = performanceContainer[0].clientName;
          cookContainer[i].ingredient = performanceContainer[0].order;
          cookContainer[i].inWork = true;
          orderCount.innerHTML = `Размер очереди: ${clientContainer.length}`;
          queue.innerHTML = `${clientContainer.map((e) => e.clientName).join(' ')}`;
          // console.log(`${cookContainer[i].clientName} заказ в обработке`);

          setTimeout(() => {
            cookContainer[i].emit("chefFree", cookContainer[i].clientName, i)
          }, cookContainer[i].cooking() * 1000)
        }
      }
    }

}

function chefFree(clientName, cookId) {
  cookContainer[cookId].inWork = false;
  completedOrderContainer.push(performanceContainer[performanceContainer.findIndex((e) => {if(e.clientName == clientName) {return e}})]);
  performanceContainer.splice(performanceContainer.findIndex((e) => {if(e.clientName == clientName) {return e}}), 1);
  process.innerHTML = `${performanceContainer.map((e) => e.clientName)}`;
  readyOrder.innerHTML = `${completedOrderContainer.map((e) => e.clientName).join(' ')}`;
  // console.log(`${clientName} выполнен \t\t В очереди [${clientContainer.map((e) => e.clientName)}]`);

  if (clientContainer.length > 0) {
    clientContainer[0].emit('createClient') 
  }
}

