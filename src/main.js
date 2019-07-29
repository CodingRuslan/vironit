import inherit from './components/inherit';
import EventEmitter from './components/EventEmitter';
import СlientGenerator from './components/СlientGenerator';
import CookerGenerator from './components/Cooker';
import randomInteger from './components/randomInteger';
import render from './components/render';
import './styles/styles.scss';

const cookContainer = [];
const clientContainer = [];
const performanceContainer = [];
const completedOrderContainer = [];
let id = 1;

const Client = new СlientGenerator();
const СlientConstructor = inherit(EventEmitter, Client);

const Cooker = new CookerGenerator();
const CookerConstructor = inherit(EventEmitter, Cooker);
  
document.body.appendChild(render());
const orderCount = document.querySelector('.orderCount');
const cookCount = document.querySelector('.cookCount');
const queue = document.querySelector('div.queueWrap div');
const process = document.querySelector('div.processWrap div');
const readyOrder = document.querySelector('div.readyOrderWrap div');
const addCookBtn = document.querySelector('button.addCookBtn');
const deleteCookBtn = document.querySelector('button.deleteCookBtn');
const cookScreen = document.querySelector('.cookScreen');

setTimeout(function run() {
  clientContainer.push(new СlientConstructor(`${id}`,performance.now()));
  clientContainer[clientContainer.length - 1].on("createClient", orderHandler);
  clientContainer[0].emit('createClient');
  renderInfo();
  
  id++;
  setTimeout(run, randomInteger(0,7) * 1000);
}, 0);

function orderHandler() {
  for (let i = 0; i <= cookContainer.length - 1; i++) {
    if (!cookContainer[i].inWork) {
      if (clientContainer.length > 0){
        performanceContainer.unshift(clientContainer.shift());
        cookContainer[i].clientName = performanceContainer[0].clientName;
        cookContainer[i].ingredient = performanceContainer[0].order;
        cookContainer[i].inWork = true;

        const cookIcon = document.querySelector('.cookNotWorksIcon');
        cookIcon.classList.add("cookWorksIcon");
        cookIcon.classList.remove("cookNotWorksIcon");

        renderInfo();
        setTimeout(() => {
            cookContainer[i].emit("chefFree", cookContainer[i].clientName, i);
        }, cookContainer[i].cooking() * 1000)
      }
    }
  }
}

function chefFree(clientName, cookId) {
  cookContainer[cookId].inWork = false;
  completedOrderContainer.push(performanceContainer[performanceContainer.findIndex((e) => {if(e.clientName == clientName) {return e}})]);
  completedOrderContainer[completedOrderContainer.length - 1].orderPreparationTime = Math.floor((performance.now() - completedOrderContainer[completedOrderContainer.length - 1].orderPreparationTime) / 1000);
  performanceContainer.splice(performanceContainer.findIndex((e) => {if(e.clientName == clientName) {return e}}), 1);

  const cookIcon = document.querySelector('.cookWorksIcon');
  cookIcon.classList.remove("cookWorksIcon");
  cookIcon.classList.add("cookNotWorksIcon");
  renderInfo();
  
  if (cookContainer.length > 0) {
    returnClient(completedOrderContainer[completedOrderContainer.length - 1]);
  }

  if (clientContainer.length > 0) {
    clientContainer[0].emit('createClient');
  }
}

addCookBtn.addEventListener('click',() => {
  cookContainer.push(new CookerConstructor());
  cookContainer[cookContainer.length - 1].on("chefFree", chefFree);

  const cookIcon = document.createElement('div');
  cookIcon.classList.add('cookNotWorksIcon');
  cookScreen.appendChild(cookIcon);
  renderInfo();
});

deleteCookBtn.addEventListener('click', () => {
  if (cookContainer.length > 0 ) {
    if (!cookContainer[cookContainer.length - 1].inWork) {
      cookContainer.splice(cookContainer.length - 1, 1)
      
      const cookIcon = document.querySelector('.cookNotWorksIcon');
      cookScreen.removeChild(cookIcon); 
      renderInfo();
    }
  }
})

document.addEventListener('click', e => {
  const el = e.target;
  const orderId = document.querySelector('.orderId');
  const orderIngredients = document.querySelector('.orderIngredients');
  const orderTimeCooking = document.querySelector('.orderTimeCooking');
  const orderReview = document.querySelector('.orderReview');

  if (el.parentNode.classList.value === "queueContainer") {
    orderId.innerHTML = `<h1>Заказ номер ${clientContainer[clientContainer.findIndex((e) => {
      if (e.clientName === el.id) {
        return e;
      }
    })].clientName}</h1>`;

    let ingrStr = "<h2>Ингридиенты</h2>";

    clientContainer[clientContainer.findIndex((e) => {
      if (e.clientName === el.id) {
        return e;
      }
    })].order.forEach((e) => {
      ingrStr += `<p class = "ingredientText">${e.name}</p>`
    });
    orderIngredients.innerHTML = ingrStr;
    orderTimeCooking.innerHTML = `<h2>Заказ еще в обработке</h2>`
    orderReview.innerHTML = "";
  } else if (el.parentNode.classList.value === "processContainer") {
    orderId.innerHTML = `<h1>Заказ номер ${performanceContainer[performanceContainer.findIndex((e) => {
      if (e.clientName === el.id) {
        return e;
      }
    })].clientName}</h1>`;

    let ingrStr = "<h2>Ингридиенты</h2>";

    performanceContainer[performanceContainer.findIndex((e) => {
      if (e.clientName === el.id) {
        return e;
      }
    })].order.forEach((e) => {
      ingrStr += `<p class = "ingredientText">${e.name}</p>`
    });
    orderIngredients.innerHTML = ingrStr;
    orderTimeCooking.innerHTML = `<h2>Заказ еще в обработке</h2>`;
    orderReview.innerHTML = "";
  } else if (el.parentNode.classList.value === "readyOrderContainer") {
    orderId.innerHTML = `<h1>Заказ номер ${completedOrderContainer[completedOrderContainer.findIndex((e) => {
      if (e.clientName === el.id) {
        return e;
      }})].clientName}</h1>`;

    let ingrStr = "<h2>Ингридиенты</h2>";

    completedOrderContainer[completedOrderContainer.findIndex((e) => {
      if (e.clientName === el.id) {
        return e;
      }
    })].order.forEach((e) => {
      ingrStr += `<p class = "ingredientText">${e.name}</p>`
    });
    orderIngredients.innerHTML = ingrStr;

    orderTimeCooking.innerHTML = `<h2>Заказ готовился ${completedOrderContainer[completedOrderContainer.findIndex((e) => {
      if (e.clientName === el.id) {
        return e;
      }})].orderPreparationTime} секунд</h2>`

      if (completedOrderContainer[completedOrderContainer.findIndex((e) => {
        if (e.clientName === el.id) {
          return e;
        }})].orderPreparationTime <= 20) {
        orderReview.innerHTML = "<h2>Клиент доволен</h2>";
        orderReview.classList.add('goodReview');
        if (orderReview.classList.length > 2) {
          orderReview.classList.toggle("badReview");
        }
      } else {
        orderReview.innerHTML = "<h2>Клиент разочарован</h2>";
        orderReview.classList.add('badReview');

        if (orderReview.classList.length > 2) {
          orderReview.classList.toggle("goodReview");
        }
      }
  }
})

function returnClient(client) {
  if (randomInteger(1, 100) <= 25) {
    clientContainer.push(new СlientConstructor(`${client.clientName}`));
    clientContainer[clientContainer.length - 1].on("createClient", orderHandler);
    clientContainer[0].emit('createClient');
    renderInfo();
  } 
}

function renderInfo() {
  cookCount.innerHTML = `Поваров в работе: ${cookContainer.length}`;
  orderCount.innerHTML = `Размер очереди: ${clientContainer.length}`;
  
  queue.innerHTML = `${clientContainer.map((e) => `<p class = "text" id = ${e.clientName}>${e.clientName}</p>`).join(' ')}`;
  process.innerHTML = `${performanceContainer.map((e) => `<p class = "text" id = ${e.clientName}>${e.clientName}</p>`).join(' ')}`;
  readyOrder.innerHTML = `${completedOrderContainer.map((e) => `<p class = "text" id = ${e.clientName}>${e.clientName}</p>`).join(' ')}`;
}