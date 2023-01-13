export const popupAddCart = ({img, name}) => {
    const popupElem = document.getElementById('popup-add-cart');

    const popupImg = popupElem.querySelector('.popup__content__info__img img');
    const popupName = popupElem.querySelector('.popup__content__info__name');
    const popupBtn = popupElem.querySelectorAll('.popup__content__btns button');
    console.log(popupImg)

    popupImg.setAttribute('src',  img);
    popupName.textContent = name;
    popupElem.classList.add('activePopup');

    popupBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            popupElem.classList.remove('activePopup');
        })
    })
    window.addEventListener('click', (e) => {
        if (e.target === popupElem) {
            popupElem.classList.remove('activePopup');
        }
    })
}