
const inputCounter = document.querySelector('.counter__input');
const decrBtn = document.querySelector('.counter__btn--decr');
const incrBtn = document.querySelector('.counter__btn--incr');

export default class Counter {
    constructor(input, decrBtn, incrBtn, min = 0, max = 1) {
        this.input = input;
        this.decrBtn = decrBtn;
        this.incrBtn = incrBtn;
        this.min = min;
        this.max = max;
        this.init();
    }

    init() {

        this.decrBtn.addEventListener('click', this.decr);
        this.incrBtn.addEventListener('click', this.incr);
    }

    decr = () => {
        const value = this.input.value.replace(' м', '');

        if (parseFloat(value) <= this.min) this.input.value = this.min + ' м';
        else this.input.value = (value - 0.1).toFixed(1) + ' м';
    }

    incr = () => {
        const value = this.input.value.replace(' м', '');

        if (parseFloat(value) >= this.max) this.input.value = this.max + ' м';
        else this.input.value = (+value + 0.1).toFixed(1) + ' м';
    }
}
