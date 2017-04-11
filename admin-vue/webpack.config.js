var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: './app.ts'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.ts$/, loader: 'vue-ts-loader' }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: false,
      options: {
        resolve: {
          extensions: ['.ts', '.vue', '.js']
        }
      }
    })
  ]
};