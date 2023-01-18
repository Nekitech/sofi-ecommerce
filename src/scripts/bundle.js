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
if(accordion){

    new Accordion(document.querySelector('.accordion.orderMake__accordion')).init();

    renderOrder(document.querySelector('.accordion__item__order'));
}


// Yandex map

let center = [52.72132717013808,41.45317712898239];

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

ymaps.ready(init);

