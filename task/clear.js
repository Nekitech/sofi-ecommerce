// Подключения
const {src, dest} = require('gulp')

// Конфигурация
const path = require('../config/path.js')

// Плагины
const del = require('del')

const clear = () => {
    return del(path.root)
}

module.exports = clear