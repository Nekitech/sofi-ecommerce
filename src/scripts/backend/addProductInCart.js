const hashProductInCart = (productData) => {
    const basketData = JSON.parse(localStorage.getItem('basketData')) || [];
    const productInCart = basketData.find((product) => product.name === productData.name && product.mainImg === productData.mainImg);
    if (productInCart) {
        productInCart.length = +(productInCart.length + productData.length).toFixed(1);
        productInCart.total += productData.total;
    }
    else {
        basketData.push(productData);
    }
    localStorage.setItem('basketData', JSON.stringify(basketData));
}

export const handlerAddProductInCart = () => {
    window.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-cart')) {
            const card = e.target.closest('.card');
            const productData = {
                name: card.querySelector('.card__blockInfo__title').textContent,
                mainImg: card.querySelector('.card__blockImg__switchesImgs__mainImg.mainImg img')
                    .getAttribute('src'),
                price: parseInt(card.querySelector('.card__blockInfo__price__new').textContent),
                length: parseFloat(card.querySelector('.counter__input').value
                    .replace(' м', '')),
                total: parseInt(card.querySelector('.card__blockInfo__price__new').textContent)
                    * parseFloat(card.querySelector('.counter__input').value) * 10

            }
            hashProductInCart(productData);

        }

    })

}