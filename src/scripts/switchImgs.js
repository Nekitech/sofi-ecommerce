export const switchImgs = (img1, img2) => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const [smallImg, bigImg] = [
            card.querySelectorAll('.card__blockImg__switchesImgs__img'),
            card.querySelector('.card__blockImg__switchesImgs__mainImg img')
        ];
        smallImg.forEach(img => {
            img.addEventListener('mouseover', () => {
                bigImg.src = img.src;
            })
        })
    })
}