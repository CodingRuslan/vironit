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
    const queueContainer = document.createElement('div');
    const processWrap = document.createElement('div');
    const processContainer = document.createElement('div');
    const readyOrderWrap = document.createElement('div');
    const readyOrderContainer = document.createElement('div');
    const queueLabel = document.createElement('h3');
    const processLabel = document.createElement('h3');
    const readyOrderLabel = document.createElement('h3');

    mainWrap.classList.add('mainWrap');
    queueWrap.classList.add('queueWrap');
    processWrap.classList.add('processWrap');
    readyOrderWrap.classList.add('readyOrderWrap');
    queueContainer.classList.add('queueContainer');
    processContainer.classList.add('processContainer');
    readyOrderContainer.classList.add('readyOrderContainer');

    queueLabel.classList.add('label');
    processLabel.classList.add('label');
    readyOrderLabel.classList.add('label');

    queueLabel.innerHTML = "в очереди" ;
    processLabel.innerHTML = "готовятся";
    readyOrderLabel.innerHTML = "готовые заказы";

    mainWrap.appendChild(queueWrap);
    mainWrap.appendChild(processWrap);
    mainWrap.appendChild(readyOrderWrap);
    queueWrap.appendChild(queueLabel);
    queueWrap.appendChild(queueContainer);
    processWrap.appendChild(processLabel);
    processWrap.appendChild(processContainer);
    readyOrderWrap.appendChild(readyOrderLabel);
    readyOrderWrap.appendChild(readyOrderContainer);

    //orderInfoWrap
    const orderInfoWrap = document.createElement('div');
    const orderInfoContainer = document.createElement('div')
    const orderReviewContainder = document.createElement('div');
    const orderId = document.createElement('div');
    const orderIngredients = document.createElement('div');
    const orderTimeCooking = document.createElement('div');
    const orderReview = document.createElement('div');

    orderInfoWrap.classList.add('orderInfoWrap');
    orderInfoContainer.classList.add('orderInfoContainer');
    orderReviewContainder.classList.add('orderReviewContainder');
    orderId.classList.add('orderId');
    orderIngredients.classList.add('orderIngredients');
    orderTimeCooking.classList.add('orderTimeCooking');
    orderReview.classList.add('orderReview');

    orderInfoWrap.appendChild(orderInfoContainer);
    orderInfoWrap.appendChild(orderReviewContainder);
    orderInfoContainer.appendChild(orderId);
    orderInfoContainer.appendChild(orderIngredients);
    orderReviewContainder.appendChild(orderTimeCooking);   
    orderReviewContainder.appendChild(orderReview);   

    generalWrapper.appendChild(headWrap);
    generalWrapper.appendChild(mainWrap);
    generalWrapper.appendChild(orderInfoWrap);

    return generalWrapper;
}
