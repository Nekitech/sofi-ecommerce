
// Подключения
const {watch, series, parallel} = require('gulp')

// Плагины
const browserSync = require('browser-sync').create()

// Конфигурация
const path = require('./config/path.js')
const pluginsConfig = require('./config/pluginsConfig.js')

// Задачи
const clear = require('./task/clear.js')
const pug = require('./task/pug.js')
const scss = require('./task/scss.js')
const js = require('./task/scripts.js')
const img = require('./task/img.js')
const fonts = require('./task/fonts.js')

// Наблюдение
const watcher = () => {
    watch(path.pug.watch, pug).on('all', browserSync.reload)
    watch(path.scss.watch, scss).on('all', browserSync.reload)
    watch(path.js.watch, js).on('all', browserSync.reload)
    watch(path.img.watch, img).on('all', browserSync.reload)
    watch(path.fonts.watch, fonts).on('all', browserSync.reload)
}


// Сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: path.root
        }
    }) 
}

// Билд
const build = series(
    clear,
    parallel(pug, scss, js, img, fonts)
)

// Разработка
const dev = series(
    build,
    parallel(watcher, server)
)

// Экспорты
exports.watch = watcher
exports.clear = clear
exports.scss = scss
exports.js = js
exports.img = img
exports.pug = pug
exports.fonts = fonts

exports.default = pluginsConfig.isProd ? build : dev



