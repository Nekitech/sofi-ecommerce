import {hideMenuData} from "./dataMarket";
import {hideMenuHandler} from "./hide_menu";
import Glide from '@glidejs/glide'
import Counter from "./counterCard";

const hideMenu = document.querySelector('.hide-list');
hideMenuHandler(hideMenu, hideMenuData);





new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    autoplay: 3000,


}).mount()

const counters = document.querySelectorAll('.counter__input');
counters.forEach(counter => {
    new Counter(counter, counter.previousElementSibling, counter.nextElementSibling, 0, 1);
})
