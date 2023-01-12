import {hideMenuData} from "./dataMarket";
import {hideMenuHandler} from "./hide_menu";
import Glide from '@glidejs/glide'
import Counter from "./counterCard";
import {switchImgs} from "./switchImgs";
import BurgerMenu from "./burgerMenu";
import DropDown from "./dropDown";
import {handlerAddProductInCart} from "./backend/addProductInCart";

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


const counters = document.querySelectorAll('.counter__input');
counters.forEach(counter => {
    new Counter(counter, counter.previousElementSibling, counter.nextElementSibling, 0, 1);
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

if(dropdownList) {
    dropdownList.forEach(dropdown => {
        new DropDown(dropdown).init();
    })
}

//handlerAddProductInCart();

handlerAddProductInCart()
