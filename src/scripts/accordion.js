export class Accordion {
    constructor(element) {
        this.element = element;
        this.items = this.element.querySelectorAll('.accrodion__item');


    }

    init() {
        this.element.addEventListener('click', this.toggle.bind(this));
        const btnsPrev = this.element.querySelectorAll('.accordion__item__body__footer__btns__prev');
        const btnsNext = this.element.querySelectorAll('.accordion__item__body__footer__btns__next');

        btnsPrev.forEach(btn => {
            btn.addEventListener('click', this.prev.bind(this))
        })
        btnsNext.forEach(btn => {
            btn.addEventListener('click', this.next.bind(this))
        })
    }

    toggle(event) {
        event.preventDefault();
        let target = event.target;
        let headerItem = target?.closest('.accordion__item__header');
        const item = target?.closest('.accordion__item');
        if (!headerItem || !item?.classList.contains('passedItem')) return;

        headerItem?.classList.toggle('activeItemAccordion');
        const itemHeaders = this.element.querySelectorAll('.accordion__item__header');
        itemHeaders.forEach(itemHeader => {
            if (itemHeader !== headerItem) {
                itemHeader.classList.remove('activeItemAccordion');
            }
        })
        console.log(item.nextElementSibling)
    }

    prev(event) {
        const target = event.target;
        const item = target.closest('.accordion__item')
        const headerItem = item.querySelector('.accordion__item__header')


        headerItem.classList.remove('activeItemAccordion');
        const prevItem = item.previousElementSibling;
        prevItem
            .querySelector('.accordion__item__header')
            .classList.add('activeItemAccordion');

    }

    next(event) {
        const target = event.target;
        const item = target.closest('.accordion__item')
        const headerItem = item.querySelector('.accordion__item__header')

        item.classList.add('passedItem');
        headerItem.classList.remove('activeItemAccordion');
        const nextItem = item.nextElementSibling;
        console.log(nextItem)
        nextItem
            .querySelector('.accordion__item__header')
            .classList.add('activeItemAccordion');
    }
}