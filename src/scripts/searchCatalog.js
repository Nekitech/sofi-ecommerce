export const searchCatalog = (input, catalog) => {
    const catalogItems = catalog.querySelectorAll('.card');

    input.oninput = () => {
        const value = input.value.trim().toLowerCase();
        if (value !== '') {
            catalogItems.forEach(item => {
                const productName = item.querySelector('.card__blockInfo__title').textContent.trim().toLowerCase();

                if (productName.search(value) === -1) {
                    item.classList.add('hideItem');
                } else {
                    item.classList.remove('hideItem');
                }
            })
        } else {
            catalogItems.forEach(item => {
                item.classList.remove('hideItem');
            })
        }
    }
}