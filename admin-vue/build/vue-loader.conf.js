var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: Object.assign(
    {},
    utils.cssLoaders({
      sourceMap: isProduction
        ? config.build.productionSourceMap
        : config.dev.cssSourceMap,
      extract: isProduction
    }),
    { js:  'vue-ts-loader' }
  ),
  esModule: true,
  postcss: [
    require('autoprefixer')({
      browsers: ['last 2 versions']
    })
  ]
}
