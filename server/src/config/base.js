import path from 'path';

import compose from 'koa-compose';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import log4js from 'log4js';
import * as swagger from 'swagger2';
import { validate } from 'swagger2-koa';

export default function baseConfig(app) {
  app.proxy = true;

  const document = swagger.loadDocumentSync('./swagger.yml');

   if(!swagger.validateDocument(document)) {
    throw Error(`./swagger.yml does not conform to the Swagger 2.0 schema`);
  }

  log4js.configure({
    appenders: [
      { type: 'console' },
      { 
        type: 'dateFile', 
        filename: path.resolve(__dirname, '../../logs/server.log'),
        pattern: '-yyyy-MM-dd-hh.log',
        category: 'file'
      }
    ],
    replaceConsole: true
  });

  app.use(cors({ credentials: true }));
  app.use(bodyParser());
  app.use(validate(document));
}