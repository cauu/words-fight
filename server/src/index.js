import Koa from 'koa';

import routes from './routes';
import middlewares from './middlewares';

const app = new Koa();

app.use(middlewares());

app.use(routes());

app.listen(3000);

console.log('App is listening on port 3000.');

export default app;