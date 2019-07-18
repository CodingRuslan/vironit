export default function render() {    
    const generalWrapper = document.createElement('div');
    generalWrapper.classList.add('generalWrapper');
    
    // header
    const headWrap = document.createElement('div');
    const orderCountWrap = document.createElement('div');
    const cookCountWrap = document.createElement('div');
    const orderCount = document.createElement('p');
    const cookCount = document.createElement('p');
    const cookScreen = document.createElement('div');
    const addCookBtn = document.createElement('button');
    const deleteCookBtn = document.createElement('button');

    headWrap.classList.add('headWrap');
    orderCountWrap.classList.add('orderCountWrap');
    cookCountWrap.classList.add('cookCountWrap');
    orderCount.classList.add('text', 'orderCount');
    cookCount.classList.add('text', 'cookCount');
    cookScreen.classList.add('cookScreen');
    addCookBtn.classList.add('addCookBtn', 'button');
    deleteCookBtn.classList.add('deleteCookBtn', 'button');

    addCookBtn.innerHTML = ' + ';
    deleteCookBtn.innerHTML = ' - ';

    headWrap.appendChild(orderCountWrap);
    headWrap.appendChild(cookCountWrap);
    orderCountWrap.appendChild(orderCount);
    cookCountWrap.appendChild(cookCount);
    headWrap.appendChild(cookScreen);
    headWrap.appendChild(addCookBtn);
    headWrap.appendChild(deleteCookBtn);

    // main
    const mainWrap = document.createElement('div');
    const queueWrap = document.createElement('div');
    const processWrap = document.createElement('div');
    const readyOrderWrap = document.createElement('div');
    const queueLabel = document.createElement('h3');
    const processLabel = document.createElement('h3');
    const readyOrderLabel = document.createElement('h3');
    const queue = document.createElement('p');
    const process = document.createElement('p');
    const readyOrder = document.createElement('p');

    mainWrap.classList.add('mainWrap');
    queueWrap.classList.add('queueWrap');
    processWrap.classList.add('processWrap');
    readyOrderWrap.classList.add('readyOrderWrap');

    queueLabel.classList.add('text', 'label');
    processLabel.classList.add('text', 'label');
    readyOrderLabel.classList.add('text', 'label');
    
    queue.classList.add('text');
    process.classList.add('text');
    readyOrder.classList.add('text');

    queueLabel.innerHTML = "в очереди" ;
    processLabel.innerHTML = "готовятся";
    readyOrderLabel.innerHTML = "готовые заказы";

    mainWrap.appendChild(queueWrap);
    mainWrap.appendChild(processWrap);
    mainWrap.appendChild(readyOrderWrap);
    queueWrap.appendChild(queueLabel);
    queueWrap.appendChild(queue);
    processWrap.appendChild(processLabel);
    processWrap.appendChild(process);
    readyOrderWrap.appendChild(readyOrderLabel);
    readyOrderWrap.appendChild(readyOrder);

    generalWrapper.appendChild(headWrap);
    generalWrapper.appendChild(mainWrap);

    return generalWrapper;
}
