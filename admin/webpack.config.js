'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    browser: [
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'app/App.js')
    ],
    ieCompatible: path.join(__dirname, 'app/utils/ie-compatible.js')
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      filename: 'index.html',
      inject: false,
      chunks: ['browser', 'ieCompatible']
    })
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    }, {
      test: /\.js?$/,
      exclude: /node_modules|lib/,
      loader: 'eslint-loader'
    }, {
      test: /\.json?$/,
      loader: 'json-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!less-loader'
      })
    }, {
      test: /\.(woff(2)?|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'file-loader?name=i/[name].[exthttp://ife.baidu.com/course/all]'
    }]
  }
};
