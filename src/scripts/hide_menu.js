import {handlerOutEl} from "./handlerOutEl";

const closeMenu = (menu) => {
    menu.classList.remove('activeHideMenu');
    menu.querySelector('.hide-list__wrapper').innerHTML = '';

}

export const hideMenuHandler = (hideMenu, data) => {
    const wrapper = hideMenu.querySelector('.hide-list__wrapper');
    const menuList = document?.querySelectorAll('.header__menu__link')

    menuList?.forEach((item) => {
        if(data[item.textContent]) item.classList.add('activeHideList');

        item.addEventListener('mouseover', (e) => {
            wrapper.innerHTML = '';
            const textItem = e.target.textContent;

            if (data[textItem]) {
                for (let type in data[textItem]) {
                    const ul = document.createElement('ul');
                    const title = document.createElement('h3');
                    ul.classList.add('hide-list__list');
                    title.classList.add('hide-list__subtitle');
                    title.textContent = type;
                    ul.append(title);
                    data[textItem][type]?.forEach((item) => {
                        const li = document.createElement('li');
                        li.classList.add('hide-list__item');
                        li.textContent = item;
                        ul.append(li);
                    })
                    wrapper.append(ul);

                }
                hideMenu.classList.add('activeHideMenu');

            }
        })

    })
    handlerOutEl(() => {
        closeMenu(hideMenu)
    }, hideMenu, document.querySelector('.header__menu'));

}

