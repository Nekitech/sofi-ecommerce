import {popupAddCart} from "../popupAddCart";
import Counter from "../counterCard";

const hashProductInCart = (productData) => {
    const basketData = JSON.parse(localStorage.getItem('basketData')) || [];
    const productInCart = basketData.find((product) => product.name === productData.name && product.mainImg === productData.mainImg);
    if (productInCart) {
        productInCart.length = +(productInCart.length + productData.length).toFixed(1);
        productInCart.total += productData.total;
    } else {
        basketData.push(productData);
    }
    localStorage.setItem('basketData', JSON.stringify(basketData));
}

export const handlerAddProductInCart = () => {
    window.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-cart')) {
            const card = e.target.closest('[data-product]');
            const productData = {
                mainImg: card.querySelector('[data-mainImg]').getAttribute('src'),
                name: card.querySelector('[data-name]').textContent,
                price: parseInt(card.querySelector('[data-price]').textContent),
                length: parseFloat(card.querySelector('[data-counter] input').value
                    .replace(/[^\.\d]/g, '')),
                total: parseInt(card.querySelector('[data-price]').textContent)
                    * parseFloat(card.querySelector('[data-counter] input').value) * 10

            }
            hashProductInCart(productData);
            popupAddCart({img: productData.mainImg, name: productData.name});
            renderProductsInfoInHeader();
        }

    })

}

export const renderCart = (table_cart) => {
    const list_products = JSON.parse(localStorage.getItem('basketData')) || [];
    table_cart.innerHTML = '';
    list_products.forEach((product) => {
        const row = document.createElement('tr');
        row.classList.add('cart__content__tableCart__row')

        const cells = []
        for (let i = 0; i < 5; i++) {
            cells.push(document.createElement('td'));
            cells[i].classList.add('cart__content__tableCart__cell');
        }
        row.append(...cells);

        cells[0].innerHTML = `<img src="${product.mainImg}" alt="${product.name}">`;
        cells[1].innerHTML = product.name + `<br><span class="cart__content__tableCart__cell__delete" data-cart-delete>Удалить</span>`;
        cells[2].textContent = product.price + ' руб. за 0.1 м';
        cells[3].innerHTML = `<div class="counter">
                                        <button class="counter__btn counter__btn--decr">—</button>
                                        <input class="counter__input" type="text" value="${product.length} м" readonly>
                                        <button class="counter__btn counter__btn--incr">+</button>
                                    </div>`;
        cells[4].textContent = product.total + ' руб. за выбранную длину';

        table_cart.append(row);

        const counter = row.querySelector('.counter__input')
        const counterDecr = row.querySelector('.counter__btn--decr')
        const counterIncr = row.querySelector('.counter__btn--incr')

        new Counter(counter, counterDecr, counterIncr, 0, 2, {
            totalElem: cells[4],
            price: product.price,
        }).init();
        const hashProductProperties = () => {
            const basketData = JSON.parse(localStorage.getItem('basketData')) || [];
            const changedProduct = basketData.find((productItem) => productItem.name === product.name && productItem.mainImg === product.mainImg);
            changedProduct.length = parseFloat(counter.value.replace(' м', ''));
            changedProduct.total = parseInt(cells[4].textContent.replace(' руб. за ввыбранную длину', ''));

            localStorage.setItem('basketData', JSON.stringify(basketData));
        }

        counterDecr.addEventListener('click', () => {
            hashProductProperties();
            renderProductsInfo()
            renderProductsInfoInHeader()
        })
        counterIncr.addEventListener('click', () => {
            hashProductProperties();
            renderProductsInfo()
            renderProductsInfoInHeader()
        })


    })

}

export const deleteProductInCart = (table_cart) => {
    table_cart?.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-cart-delete')) {
            const row = e.target.closest('.cart__content__tableCart__row');
            const nameProduct = row.querySelector('.cart__content__tableCart__cell:nth-child(2)').textContent;
            const imgProduct = row.querySelector('.cart__content__tableCart__cell img').getAttribute('src');

            const list_products = JSON.parse(localStorage.getItem('basketData')) || [];
            const newCart = list_products.filter((product) => product.name !== nameProduct && product.mainImg !== imgProduct);
            localStorage.setItem('basketData', JSON.stringify(newCart));
            row.remove();
            checkEmptyCart(table_cart);
            renderProductsInfo();
            renderProductsInfoInHeader()
        }
    })
}

export const checkEmptyCart = (table_cart) => {
    const list_products = JSON.parse(localStorage.getItem('basketData')) || [];
    if (list_products.length === 0) {
        table_cart.innerHTML = `<tr class="cart__content__tableCart__row">
                                    <td class="cart__content__tableCart__cell" colspan="5">Ваша корзина пуста</td>
                                </tr>`;
    }
}

export const renderProductsInfo = () => {
    const cart = document.querySelector('.cart');
    if (!cart) return;
    const amountProducts = cart.querySelector('.cart__content__cartInfo__numberProducts__value');
    const totalPrice = cart.querySelector('.cart__content__cartInfo__totalPrice__value');
    const list_products = JSON.parse(localStorage.getItem('basketData')) || [];

    amountProducts.textContent = list_products.length;
    totalPrice.textContent = list_products.reduce((acc, product) => acc + product.total, 0) + ' руб.';

}

export const renderProductsInfoInHeader = () => {
    const header = document.querySelector('.header');
    const totalPrice = header.querySelector('.header__userBlock__cartPrice');
    const list_products = JSON.parse(localStorage.getItem('basketData')) || [];

    totalPrice.textContent = list_products.reduce((acc, product) => acc + product.total, 0) + ' руб.';
}