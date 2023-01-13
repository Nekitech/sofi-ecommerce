export default class Counter {
    constructor(input, decrBtn, incrBtn, min = 0, max = 1, productData = {}) {
        this.input = input;
        this.decrBtn = decrBtn;
        this.incrBtn = incrBtn;
        this.min = min;
        this.max = max;
        this.productData = productData;
        this.init()
    }

    init() {
        this.decrBtn.addEventListener('click', this.decr);
        this.incrBtn.addEventListener('click', this.incr);
    }

    decr = () => {
        const value = this.input.value.replace(' м', '');

        if (parseFloat(value) <= this.min + 0.1) {
            this.input.value = this.min + ' м';
            this.input.setAttribute('value', this.min + ' м');
            this.setTotalPrice(this.productData.price)
            return
        } else {
            this.input.value = (value - 0.1).toFixed(1) + ' м';
            this.input.setAttribute('value', (value - 0.1).toFixed(1) + ' м');
            this.setTotalPrice(this.productData.price)
        }

    }

    incr = () => {
        const value = this.input.value.replace(' м', '');

        if (parseFloat(value) >= this.max - 0.1) {
            this.input.value = this.max + ' м';
            this.input.setAttribute('value', this.max + ' м');
            this.setTotalPrice(this.productData.price)
            return
        } else {
            this.input.value = (+value + 0.1).toFixed(1) + ' м';
            this.input.setAttribute('value', (+value + 0.1).toFixed(1) + ' м');
            this.setTotalPrice(this.productData.price)
        }
    }

    setTotalPrice = (price) => {
        if (!this.productData.totalElem) return
        this.productData.totalElem.textContent = price * 10 * parseFloat(this.input.value.replace(' м', '')) + ' руб. за ввыбранную длину';
    }
}
