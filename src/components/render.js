function render() {    
   
    const wrapHead = document.createElement('div');
    const countOrder = document.createElement('p');

    wrapHead.appendChild(countOrder);

    // element.innerHTML = "Hello world"

    return wrapHead;
}

export default render;