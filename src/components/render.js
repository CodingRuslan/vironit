export default function render() {    
    const generalWrapper = document.createElement('div');
    generalWrapper.classList.add('generalWrapper')
    
    // header
    const headWrap = document.createElement('div');
    const orderCountWrap = document.createElement('div');
    const cookCountWrap = document.createElement('div');
    const orderCount = document.createElement('p');
    const cookCount = document.createElement('p');

    headWrap.classList.add('headWrap');
    orderCountWrap.classList.add('orderCountWrap');
    cookCountWrap.classList.add('cookCountWrap');
    orderCount.classList.add('text', 'orderCount');
    cookCount.classList.add('text', 'cookCount');

    headWrap.appendChild(orderCountWrap);
    headWrap.appendChild(cookCountWrap);
    orderCountWrap.appendChild(orderCount);
    cookCountWrap.appendChild(cookCount);

    // main
    const mainWrap = document.createElement('div');
    const queueWrap = document.createElement('div');
    const processWrap = document.createElement('div');
    const readyOrderWrap = document.createElement('div');
    const queueLable = document.createElement('h3');
    const processLable = document.createElement('h3');
    const readyOrderLable = document.createElement('h3');
    const queue = document.createElement('p');
    const process = document.createElement('p');
    const readyOrder = document.createElement('p');

    mainWrap.classList.add('mainWrap');
    queueWrap.classList.add('queueWrap');
    processWrap.classList.add('processWrap');
    readyOrderWrap.classList.add('readyOrderWrap');

    queueLable.classList.add('text', 'lable')
    processLable.classList.add('text', 'lable')
    readyOrderLable.classList.add('text', 'lable')
    
    queue.classList.add('text');
    process.classList.add('text');
    readyOrder.classList.add('text');

    queueLable.innerHTML = "в очереди" ;
    processLable.innerHTML = "готовятся";
    readyOrderLable.innerHTML = "готовые заказы";

    mainWrap.appendChild(queueWrap);
    mainWrap.appendChild(processWrap);
    mainWrap.appendChild(readyOrderWrap);
    queueWrap.appendChild(queueLable);
    queueWrap.appendChild(queue);
    processWrap.appendChild(processLable);
    processWrap.appendChild(process);
    readyOrderWrap.appendChild(readyOrderLable);
    readyOrderWrap.appendChild(readyOrder);

    generalWrapper.appendChild(headWrap);
    generalWrapper.appendChild(mainWrap);

    return generalWrapper;
}