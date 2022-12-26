import {hideMenuData} from "./dataMarket";
import {hideMenuHandler} from "./hide_menu";


const hideMenu = document.querySelector('.hide-list');
hideMenuHandler(hideMenu, hideMenuData);




import Glide from '@glidejs/glide'
new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,

}).mount()