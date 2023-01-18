export const renderOrder = (order) => {
    const basket = JSON.parse(localStorage.getItem('basketData'));

    const infoTotal = document?.querySelector('.orderMake__info');

    if(infoTotal) {
        const infoPriceElem = infoTotal?.querySelector('.orderMake__info__totalProducts__value');
        // const infoDeliveryElem = infoTotal?.querySelector('.orderMake__info__delivery');
        const infoTotalPriceElem = infoTotal?.querySelector('.orderMake__info__totalSum__value');

        const infoPriceSum = infoPriceElem.textContent = basket.reduce((acc, item) => {
            return item.total + acc;
        }, 0);
        infoTotalPriceElem.textContent = infoPriceSum + ' руб.';

    }


    basket.forEach(item => {
        const product = document.createElement('div');
        product.classList.add('accordion__item__order__item');
        product.innerHTML = `
            <div class="accordion__item__order__item__img">
                <img src="${item.mainImg}" alt="image">
            </div>
            <div class="accordion__item__order__item__info">
                <div class="accordion__item__order__item__info__title">
                    ${item.name}
                </div>
                <div class="accordion__item__order__item__info__length">
                    ${item.length} м
                </div>
                <div class="accordion__item__order__item__info__price">
                    ${item.total} руб.
                </div>
            </div>
            
        `
        order.append(product);
    })
}