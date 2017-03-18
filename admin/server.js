/* eslint no-console: 0 */
import fs from 'fs';
import httpProxy from 'http-proxy';
import webpack from  'webpack';
import config from './webpack.config.js';
import webpackMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';

import Koa from  'koa';
import Router from 'koa-router';
import koaStatic from  'koa-static';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import send from 'koa-send';
import nodeCommandParams from 'node-command-params';

const app = new Koa();
app.use(compress());
app.use(bodyParser());
const router = new Router();

// runtime params
// proxy proxy backend server
const runtimeConfig = nodeCommandParams();
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // mocks
  app.use(router.use('*', async(path, next) => {
    try {
      let filePath = path + '.' + this.req.method + '.json';

      fs.accessSync(__dirname + '/mocks' + filePath, fs.R_OK);
      send(this, filePath, {root: __dirname + '/mocks'});
    } catch (e) {
      next;
    }
  }).routes());

  // Proxy api requests
  if (runtimeConfig.proxy) {
    app.use(async() => {
      await new Promise((resolve, reject) => {
        httpProxy.createProxyServer(runtimeConfig.proxy).web(this.req, this.res, function (err) {
          if (err) {
            return reject();
          }

          resolve();
        })
      })
    }); // ex: http://localhost:3100
  }
} else {
  app.use(koaStatic('dist'));

  app.use(router.get('*', async function () {
    await send(this, 'dist/index.html');
  }).routes());
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }

  console.info('==>   Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
