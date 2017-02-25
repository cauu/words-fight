import path from 'path';

import compose from 'koa-compose';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import log4js from 'log4js';

export default function baseConfig(app) {
  app.proxy = true;

  log4js.configure({
    appenders: [
      { type: 'console' },
      { 
        type: 'dateFile', 
        filename: path.resolve(__dirname, '../../logs/server.log'),
        pattern: '-yyyy-MM-dd-hh.log',
        alwaysIncludePattern: false,
        category: 'file'
      }
    ],
    replaceConsole: true
  });

  app.use(cors({ credentials: true }));
  app.use(bodyParser());
}