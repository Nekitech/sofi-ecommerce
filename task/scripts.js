// Подключения
const {src, dest} = require('gulp')

// Конфигурация
const path = require('../config/path.js')
const pluginsConfig = require("../config/pluginsConfig.js");

// Плагины
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const webpack = require("webpack-stream");


const Scripts = () => {
    return src(path.js.src, {sourcemaps: pluginsConfig.isDev})
        .pipe(babel())
        .pipe(webpack({
            mode: pluginsConfig.isDev ? 'development' : 'production',
            output: {
                filename: 'bundle.min.js',
            },
            // devtool: pluginsConfig.isDev ? 'source-map' : '',
        }))
        .pipe(dest(path.js.dest))
}
module.exports = Scripts
