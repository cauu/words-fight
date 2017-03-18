'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var clean = require('clean-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    browser: path.join(__dirname, 'app/App.js'),
    ieCompatible: path.join(__dirname, 'app/utils/ie-compatible.js'),
    mobile: path.join(__dirname, 'app/App-h5.js'),
    common: ['react', 'react-router']
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[chunkhash].min.js'
  },
  resolve: {
    modules: ['node_modules'],
  },
  plugins: [
    new clean(['dist']),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common-[chunkhash].min.js',
      chunks: ['browser', 'mobile']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest-[chunkhash].min.js',
      chunks: ['common']
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'app/index.html',
      filename: 'index.html',
      chunks: ['common', 'browser', 'ieCompatible'],
      chunksSortMode: function (chunk1, chunk2) {
        return chunk1.id - chunk2.id;
      },
      minify: {
        collapseWhitespace: true,
        processConditionalComments: true
      }
    }),
    new HtmlWebpackPlugin({
      template: 'app/index-h5.html',
      filename: 'index-h5.html',
      chunks: ['common', 'mobile'],
      chunksSortMode: function (chunk1, chunk2) {
        return chunk1.id - chunk2.id;
      },
      minify: {
        collapseWhitespace: true
      }
    }),
    new InlineManifestWebpackPlugin(),
    new ExtractTextPlugin('[name]-[contenthash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer(),
        ]
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'es3ify-loader'
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.js?$/,
        exclude: /node_modules|lib/,
        loader: 'eslint-loader'
      }, {
        test: /\.json?$/,
        loader: 'json-loader'
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss'
        })
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
        loader: 'file-loader?name=i/[name].[ext]'
      }]
  }
};
