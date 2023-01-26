export const sortCatalog = (catalog, filter) => {
    const catalogItems = catalog.querySelectorAll('.card');
    console.log(catalogItems);
    filter.onchange = () => {
        const typeSort = filter.id;
        const parentNode = catalog.querySelector('.catalogPage__productCards');

        if (typeSort === 'sort-price') {
            if (filter.value === 'up') {
                sortByUpPrice(parentNode);
            }
            else if(filter.value === 'down') {
                sortByDownPrice(parentNode);
            }
        }
    }
}

const sortByUpPrice = (parentNode) => {
    const arr = Array.from(parentNode.children);
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            const priceI = parseInt(arr[i].querySelector('.card__blockInfo__price__new').textContent);
            const priceJ = parseInt(arr[j].querySelector('.card__blockInfo__price__new').textContent);
            if (priceI >= priceJ) {
                let replacedNode = parentNode.replaceChild(arr[j], arr[i]);
                insertAfter(replacedNode, arr[j]);
            }
        }
    }
}

const sortByDownPrice = (parentNode) => {
    const arr = Array.from(parentNode.children);
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            const priceI = parseInt(arr[i].querySelector('.card__blockInfo__price__new').textContent);
            const priceJ = parseInt(arr[j].querySelector('.card__blockInfo__price__new').textContent);
            if (priceI <= priceJ) {
                let replacedNode = parentNode.replaceChild(arr[j], arr[i]);
                insertAfter(replacedNode, arr[j]);
            }
        }
    }
}

const insertAfter = (elem, refElem) => {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}