import Router from 'koa-router';

import { getLevelInfo } from '../../apis/client/level';

const router = new Router();

router.get('/test', async (ctx, next) => {
  ctx.body = "client api";
});

router.get('/level-info', async (ctx, next) => {
  ctx.body = await getLevelInfo(ctx);
});

export default router;