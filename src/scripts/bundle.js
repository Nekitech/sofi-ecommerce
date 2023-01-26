import {hideMenuData} from "./dataMarket";
import {hideMenuHandler} from "./hide_menu";
import Glide from '@glidejs/glide'
import Counter from "./counterCard";
import {switchImgs} from "./switchImgs";
import BurgerMenu from "./burgerMenu";
import DropDown from "./dropDown";
import {
    checkEmptyCart,
    deleteProductInCart,
    handlerAddProductInCart,
    renderCart,
    renderProductsInfo, renderProductsInfoInHeader
} from "./backend/productInCart";
import {Accordion} from "./accordion";
import {renderOrder} from "./backend/order";
import Inputmask from "inputmask/lib/inputmask";
import JustValidate from 'just-validate';
import {formSend} from "./backend/formSend";
import {searchCatalog} from "./searchCatalog";

const hideMenu = document.querySelector('.hide-list');
hideMenuHandler(hideMenu, hideMenuData);

const carousel = document.querySelector('.glide.slider-glide');
if (carousel) {

    new Glide(carousel, {
        type: 'carousel',
        startAt: 0,
        perView: 1,
        autoplay: 5000,


    }).mount()
}
document.addEventListener('DOMContentLoaded', function () {

    const sliders = document.querySelectorAll('.glide.product__slider');
    sliders.forEach(slider => {
        new Glide(slider, {
            type: 'slider',
            startAt: 0,
            perView: 5,
            gap: 20,
            bound: true,
            breakpoints: {
                1000: {
                    perView: 4,
                },
                900: {
                    perView: 3,
                },
                650: {
                    perView: 2,
                },
                460: {
                    perView: 1,
                }
            },
            rewind: false
        }).mount()
    })
})

// Происходит рендер компонента "Счетчик" через JS, поэтому используем промис, чтобы убедиться, что компонент отрендерился
// и только потом инициализируем счетчики
new Promise((resolve, reject) => {
    const table_body = document.querySelector('.cart__content__tableCart__body');
    if (table_body) {
        renderCart(table_body)
        deleteProductInCart(table_body)
        checkEmptyCart(table_body)
    }
    resolve();
}).then(() => {
    const table_body = document.querySelector('.cart__content__tableCart__body');
    if (!table_body) {
        const counters = document.querySelectorAll('.counter__input');
        counters.forEach(counter => {
            new Counter(counter, counter.previousElementSibling, counter.nextElementSibling, 0, 1);
        })
    }

}).catch((err) => {
    console.log('error:', err);
})


switchImgs('.card', {hover: true, click: false});
switchImgs('.productPage__imgs', {hover: false, click: true});


//burger

const burger = document.querySelector('.burgerBtn');
const menu = document.querySelector('.burgerMenu');
if (burger) {
    new BurgerMenu(menu, burger);
}


//dropDown
const dropdownList = document.querySelectorAll('.dropDown');

if (dropdownList) {
    dropdownList.forEach(dropdown => {
        new DropDown(dropdown).init();
    })
}


// cart


//handlerAddProductInCart();

handlerAddProductInCart()

renderProductsInfo()
renderProductsInfoInHeader()

// deleteProductInCart(document.querySelector('.cart__content__tableCart__body'));


//accordion
const accordion = document.querySelector('.accordion.orderMake__accordion');
if (accordion) {

    new Accordion(document.querySelector('.accordion.orderMake__accordion')).init();

    renderOrder(document.querySelector('.accordion__item__order'));

}


// Yandex map

let center = [52.72132717013808, 41.45317712898239];

if(ymaps) {
    function init() {
        let map = new ymaps.Map('map', {
            center: center,
            zoom: 17
        });

        // map.controls.remove('geolocationControl'); // удаляем геолокацию
        map.controls.remove('searchControl'); // удаляем поиск
        map.controls.remove('trafficControl'); // удаляем контроль трафика
        map.controls.remove('typeSelector'); // удаляем тип
        map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
        // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
        map.controls.remove('rulerControl'); // удаляем контрол правил
        // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    }

    ymaps?.ready(init);

}


//phone mask

const phoneInput = document.querySelectorAll('input[type="tel"]');

if (phoneInput) {
    phoneInput.forEach(input => {
        const mask = new Inputmask("+7 (999) 999-99-99");
        mask.mask(input);

    })
}

//validation form

const form = document.getElementById('form-data');

if (form) {
    const validator = new JustValidate(form, {
        lockForm: true,
        focusInvalidField: true,
    });



    validator
        .addField(document.querySelector('.accordion__item__input'), [
            {
                rule: 'required',
                errorMessage: 'Поле обязательно для заполнения'
            },
            {
                rule: 'minLength',
                value: 2,
                errorMessage: 'Минимальная длина поля 2 символа'
            }
        ])
        .addField(form.querySelector('input[name="paymentWay"]'), [
            {
                rule: 'required',
                errorMessage: 'Выберите способ оплаты'
            },

        ])
        .addField(form.querySelector('input[name="deliveryWay"]'), [
            {
                rule: 'required',
                errorMessage: 'Выберите способ доставки'
            },

        ])
        .addField(form.querySelector('input[name="name"]'), [
            {
                rule: 'required',
                errorMessage: 'Поле обязательно для заполнения'
            },
            {
                rule: 'minLength',
                value: 2,
                errorMessage: 'Минимальная длина имени 2 символа'
            },
            {
                rule: 'maxLength',
                value: 80,
                errorMessage: 'Максимальная длина имени 80 символов'
            },


        ])
        .addField(form.querySelector('input[name="number-phone"]'), [
            {
                rule: 'required',
                errorMessage: 'Поле обязательно для заполнения'
            },
            {

                validator: function (value, name) {
                    const phone = value.replace(/\D/g, '');
                    return phone.length >= 11;

                },
                errorMessage: 'Номер телефона должен содержать не менее 11 цифр'
            }

        ])
        .addField(form.querySelector('input[name="email"]'), [
            {
                rule: 'required',
                errorMessage: 'Поле обязательно для заполнения'
            },
            {
                rule: 'maxLength',
                value: 80,
                errorMessage: 'Максимальная длина email 80 символов'
            },
            {
                rule: 'email',
                errorMessage: 'Некорректный email'
            },
        ])
        .addField(form.querySelector('textarea[name="address"]'), [
            {
                rule: 'required',
                errorMessage: 'Поле обязательно для заполнения'
            },
            {
                rule: 'minLength',
                value: 10,
                errorMessage: 'Минимальная длина адреса 10 символов'
            },
            {
                rule: 'maxLength',
                value: 160,
                errorMessage: 'Максимальная длина адреса 80 символов'
            },
        ])
        .addField(form.querySelector('textarea[name="comment"]'), [
            {
                rule: 'maxLength',
                value: 320,
                errorMessage: 'Максимальная длина комментария 150 символов'
            },
        ])
        .onFail(function () {

            const paymentWays = document.querySelectorAll('input[name="paymentWay"]:checked');
            const deliveryWays = document.querySelectorAll('input[name="deliveryWay"]:checked');

            const accordionItems = document.querySelectorAll('.accordion__item');

            const accordionItemDelivery = accordionItems[2]
            const accordionItemPayment = accordionItems[3]
            console.log(accordionItemPayment, accordionItemDelivery, deliveryWays,  paymentWays);


            if (deliveryWays.length > 0) {
                console.log('deliveryWays');
                accordionItemDelivery.classList.add('passedItem');
                accordionItemDelivery.classList.remove('errorItem');
            } else {
                accordionItemDelivery.classList.remove('passedItem');
                accordionItemDelivery.classList.add('errorItem');
            }

            if (paymentWays.length > 0) {
                console.log('paymentWays');
                accordionItemPayment.classList.add('passedItem');
                accordionItemPayment.classList.remove('errorItem');

            } else {
                accordionItemPayment.classList.remove('passedItem');
                accordionItemPayment.classList.add('errorItem');
            }
            const validationFields = document.querySelectorAll('[data-validate-field]');
            console.log(validationFields);
            validationFields.forEach(field => {
                const accordionItem = field.closest('.accordion__item');

                if (field.classList.contains('just-validate-error-field')) {
                    accordionItem.classList.add('errorItem');
                    accordionItem.classList.remove('passedItem');
                } else {
                    accordionItem.classList.remove('errorItem');
                    accordionItem.classList.add('passedItem');
                }
            })

        })
        .onSuccess( (e) => {
            e.preventDefault();
            const formD = new FormData(form);
            console.log(formD);

            const btnSend = document.querySelector('.accordion__item__body__footer__makeOrder')

            btnSend.addEventListener('click', async (e) => {
                const data = {
                    city: document.querySelector('.accordion__item__input').value,
                    delivery: Array.from(document.querySelectorAll('input[name="deliveryWay"]')).filter(item => item.checked)[0].value,
                    payment: Array.from(document.querySelectorAll('input[name="paymentWay"]')).filter(item => item.checked)[0].value,
                    name: document.querySelector('input[name="name"]').value,
                    email: document.querySelector('input[name="email"]').value,
                    phone: document.querySelector('input[name="number-phone"]').value,
                    address: document.querySelector('textarea[name="address"]').value,
                    comment: document.querySelector('textarea[name="comment"]').value,
                    products: JSON.parse(localStorage.getItem('basketData')),
                }

                const convertObject = (arr) => {
                    return arr.reduce((acc, item, index) => {
                        acc[index] = item;
                        return acc;
                    }, {})
                }


                const formData = new FormData();

                formData.append('city', data.city);
                formData.append('delivery', data.delivery);
                formData.append('payment', data.payment);
                formData.append('name', data.name);
                formData.append('email', data.email);
                formData.append('phone', data.phone);
                formData.append('address', data.address);
                formData.append('comment', data.comment);
                formData.append('products', JSON.stringify(convertObject(data.products)));

                const response = await fetch('../../wp-content/themes/sofi-theme/sendmail.php', {
                    method: 'POST',
                    body: formData,

                })

                if (response.ok) {
                    const result = await response.json();
                    console.log(result);
                } else {
                    console.log('error');
                }


            })

        })

}

//search Catalog

const inputSearch = document.querySelector('.header__searchForm__input');
const catalog = document.querySelector('.catalogPage');

if(catalog) {
    searchCatalog(inputSearch, catalog);
}





