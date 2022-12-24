// Подключения
const {src, dest} = require('gulp')

// Конфигурация
const path = require('../config/path.js')
const pluginsConfig = require('../config/pluginsConfig.js')

// Плагины
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const shorthand = require('gulp-shorthand')
const size = require('gulp-size')
const groupCssMediaQueries = require('gulp-group-css-media-queries')
const webpCss = require('gulp-webp-css')

const css = () => {
    return src(path.css.src, {sourcemaps: pluginsConfig.isDev})
        .pipe(autoprefixer())
        .pipe(groupCssMediaQueries())
        .pipe(concat('style.css'))
        .pipe(webpCss())
        .pipe(size({title: 'До сжатия'}))
        .pipe(dest(path.css.dest, {sourcemaps: pluginsConfig.isDev}))

        .pipe(shorthand())
        .pipe(csso())
        .pipe(rename(pluginsConfig.renameSuff))
        .pipe(size({title: 'После сжатия'}))
        .pipe(dest(path.css.dest, {sourcemaps: pluginsConfig.isDev}))
}

module.exports = css