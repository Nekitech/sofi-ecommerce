const isProd = process.argv.includes('--production')
const isDev = !isProd

module.exports = {
    isProd: isProd,
    isDev: isDev,
    htmlWhitespace: {
        collapseWhitespace: isProd
    },
    imagemin: {
        verbose: true
    },
    renameSuff: {
        suffix: '.min'
    },
    pugConf: {
        pretty: isDev, // сжимать - false, не сжимать - true
        data: {} // параметр data - для передачи данных во все файлы pug, например, объект с данными
    },
    fonterConf: {
        formats: ["ttf", "woff", "eot", "svg"]
    }


}