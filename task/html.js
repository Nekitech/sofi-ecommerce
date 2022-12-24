// Подключения
const {src, dest} = require('gulp')

// Конфигурация
const path = require('../config/path.js')
const pluginsConfig = require('../config/pluginsConfig.js')

// Плагины
const fileInclude = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const size = require('gulp-size')
const webpHtml = require('gulp-webp-html')

const html = () => {
    return src(path.html.src)
        .pipe(fileInclude())
        .pipe(webpHtml())
        .pipe(size({title: 'До сжатия'}))
        .pipe(htmlmin(pluginsConfig.htmlWhitespace))
        .pipe(size({title: 'После сжатия'}))
        .pipe(dest(path.html.dest))

}

module.exports = html;