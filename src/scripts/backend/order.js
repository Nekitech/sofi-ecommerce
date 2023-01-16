export const renderOrder = (order) => {
    const basket = JSON.parse(localStorage.getItem('basketData'));
    console.log(basket)
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
                    ${item.length} руб.
                </div>
                <div class="accordion__item__order__item__info__price">
                    ${item.price} руб.
                </div>
            </div>
            
        `
        order.append(product);
    })
}