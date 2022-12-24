// Подключения
const {src, dest} = require('gulp')

// Конфигурация
const path = require('../config/path.js')
const pluginsConfig = require('../config/pluginsConfig.js')

// Плагины
const newer = require('gulp-newer')
const fonter = require('gulp-fonter')
const ttf2woff2 = require('gulp-ttf2woff2')

const fonts = () => {
    return src(path.fonts.src)
        .pipe(fonter(pluginsConfig.fonterConf))
        .pipe(newer(path.fonts.dest))
        .pipe(dest(path.fonts.dest))

        .pipe(ttf2woff2())
        .pipe(dest(path.fonts.dest))
}
module.exports = fonts