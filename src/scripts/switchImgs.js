export const switchImgs = (root, option) => {
    const cards = document?.querySelectorAll(root);

    cards?.forEach(card => {
        const [smallImg, bigImg] = [
            card?.querySelectorAll('.smallImg'),
            card?.querySelector('.mainImg img')
        ];
        if(option?.hover) {
            smallImg?.forEach(img => {
                img?.addEventListener('mouseover', () => {
                    bigImg.src = img?.src;
                })
            })
        }
        if(option?.click) {
            smallImg?.forEach(img => {
                img?.addEventListener('click', () => {
                    bigImg.src = img?.src;
                })
            })
        }
    })
}