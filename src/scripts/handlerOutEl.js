export const handlerOutEl = (callback, ...elems) => {
        document.addEventListener('mousemove', (e) => {
            if (!elems[0].contains(e.target) && !elems[1].contains(e.target)) {
                callback();
            }
        })
}