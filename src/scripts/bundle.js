import {hideMenuData} from "./dataMarket";
import {hideMenuHandler} from "./hide_menu";
import Glide from '@glidejs/glide'
import Counter from "./counterCard";

const hideMenu = document.querySelector('.hide-list');
hideMenuHandler(hideMenu, hideMenuData);


new Glide('.glide.slider-glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    autoplay: 3000,


}).mount()
document.addEventListener('DOMContentLoaded', function () {

    const sliders = document.querySelectorAll('.glide.product__slider');
    sliders.forEach(slider => {
       new Glide(slider, {
            type: 'slider',
            startAt: 0,
            perView: 5,
            gap: 20,
            bound: true,
        }).mount()
    })
})




const counters = document.querySelectorAll('.counter__input');
counters.forEach(counter => {
    new Counter(counter, counter.previousElementSibling, counter.nextElementSibling, 0, 1);
})
