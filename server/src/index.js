import Koa from 'koa';
import log4js from 'log4js';
import mongoose from 'mongoose';

import routes from './routes';
import middlewares from './middlewares';
import base from './config/base';
import config from './config/config';

const { mongodb } = config;
mongoose.connect(mongodb.dbUrl, mongodb.dbOpt);

const app = new Koa();

base(app);

app.use(middlewares());

app.use(routes());

app.listen(3000);

console.log('App is listening on port 3000.');

export default app;