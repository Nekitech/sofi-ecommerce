// Подключения
const {src, dest} = require('gulp')

// Конфигурация
const path = require('../config/path.js')
const pluginsConfig = require('../config/pluginsConfig.js')

// Плагины
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const rename = require('gulp-rename')
const size = require('gulp-size')
const shorthand = require('gulp-shorthand')
const groupCssMediaQueries = require('gulp-group-css-media-queries')
const sassGlob = require('gulp-sass-glob')
const webpCss = require('gulp-webp-css')

const scss = () => {
    return src(path.scss.src, {sourcemaps: pluginsConfig.isDev})
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(webpCss())
        .pipe(autoprefixer())
        .pipe(groupCssMediaQueries())
        .pipe(size({title: 'До сжатия'}))
        .pipe(dest(path.scss.dest))

        .pipe(shorthand())
        .pipe(csso())
        .pipe(rename(pluginsConfig.renameSuff))
        .pipe(size({title: 'После сжатия'}))
        .pipe(dest(path.scss.dest, {sourcemaps: pluginsConfig.isDev}))
}

module.exports = scss