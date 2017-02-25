import Router from 'koa-router';

const router = new Router();

router.get('/test', async (ctx, next) => {
  ctx.body = "client api";
});

export default router;