import compose from 'koa-compose';
import Router from 'koa-router';

import RouteAdmin from './admin';
import RouteClient from './client';

const router = new Router();

router.use(async (ctx, next) => {
  ctx.checkQuery = ctx.checkQuery.bind(ctx);
  ctx.checkParams = ctx.checkParams.bind(ctx);
  ctx.checkBody = ctx.checkBody.bind(ctx);
  await next(ctx);
})

router.use('/admin-api/v1', RouteAdmin.routes(), RouteAdmin.allowedMethods());
router.use('/client-api/v1', RouteClient.routes(), RouteClient.allowedMethods());

router.get('*', async (ctx, next) => {
  ctx.body = { 
    status: 'FAILED',
    result: 'NOT FOUND'
  };
});

export default function routes() {
  return compose(
    [
      router.routes(),
      router.allowedMethods()
    ]
  )
};