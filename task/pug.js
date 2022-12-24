// Подключения
const {src, dest} = require('gulp')

// Конфигурация
const path = require('../config/path.js')
const pluginsConfig = require('../config/pluginsConfig.js')
const rename = require('gulp-rename')

// Плагины
const usePug = require('gulp-pug')
const webpHtml = require('gulp-webp-html')

const pug = () => {
    return src([path.pug.src, '!./src/pug/layout/*.pug'])
        .pipe(usePug(pluginsConfig.pugConf))
        .pipe(webpHtml())
        .pipe(rename({dirname: ''}))
        .pipe(dest(path.pug.dest))
}

module.exports = pug