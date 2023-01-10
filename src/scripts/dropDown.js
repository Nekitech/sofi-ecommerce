export default class DropDown {
    constructor(dropdown) {
        this.dropdown = dropdown
    }

    init() {
        this.dropdown.addEventListener('click', this.toggleList.bind(this))

    }

    toggleList() {
        const dropdownList = this.dropdown.querySelector('.burgerMenu__dropDown__hideList');
        this?.dropdown.classList.toggle('activeDropDown')
        dropdownList?.classList.toggle('activeDropDown')

    }
}