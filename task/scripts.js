// Подключения
const {src, dest} = require('gulp')

// Конфигурация
const path = require('../config/path.js')
const pluginsConfig = require("../config/pluginsConfig.js");

// Плагины
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')


const Scripts = () => {
    return src(path.js.src, {sourcemaps: pluginsConfig.isDev})
        .pipe(concat('main.Scripts'))
        .pipe(babel())
        .pipe(dest(path.js.dest))

        .pipe(uglify())
        .pipe(concat('main.min.Scripts'))
        .pipe(babel())
        .pipe(dest(path.js.dest, {sourcemaps: pluginsConfig.isDev}))
}
module.exports = Scripts
