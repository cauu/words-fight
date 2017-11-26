import Router from 'koa-router';

import {
  listLevels,
  createLevel,
  removeLevel,
  modifyLevel
} from '../../apis/admin/level.js';

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = await listLevels(ctx);
});

router.post('/', async (ctx, next) => {
  ctx.body = await createLevel(ctx);
});

router.del('/', async (ctx, next) => {
  ctx.body = await removeLevel(ctx);
});

router.put('/', async (ctx, next) => {
  ctx.body = await modifyLevel(ctx);
});

export default router;