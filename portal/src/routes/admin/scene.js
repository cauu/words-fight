import Router from 'koa-router';

import {
  listScenes,
  createScene,
  removeScene,
  modifyScene,
  generateTree
} from '../../apis/admin/scene.js'

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = await listScenes(ctx);
});

router.post('/', async (ctx, next) => {
  ctx.body = await createScene(ctx);
});

router.del('/', async (ctx, next) => {
  ctx.body = await removeScene(ctx);
});

router.put('/', async (ctx, next) => {
  ctx.body = await modifyScene(ctx);
});

router.get('/tree', async (ctx, next) => {
  ctx.body = await generateTree(ctx);
});

export default router;