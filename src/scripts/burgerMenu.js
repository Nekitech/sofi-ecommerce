export default class BurgerMenu {
    constructor(menu, btn) {
        this.menu = menu;
        this.btn = btn;
        this.body = document.querySelector('html');
        this.init();
    }

    init() {
        this.btn.addEventListener('click', this.toggleMenu.bind(this));
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1000) {
                this.menu.classList.remove('activeBurger')
                this.btn.classList.remove('activeBurger')
                this.body.classList.remove('activeBurger')

            }
        })
    }

    toggleMenu() {
        this.btn.classList.toggle('activeBurger');
        this.menu.classList.toggle('activeBurger');
        this.body.classList.toggle('activeBurger');
    }
}