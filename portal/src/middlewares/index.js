import compose from 'koa-compose';

import error from './error';

export default function middleware() {
  return compose([
    /**@todo Put all middlewares here */
    error
  ]);
}