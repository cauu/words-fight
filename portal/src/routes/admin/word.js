import Router from 'koa-router';

import {
  listWords,
  createWord
} from '../../apis/admin/word';

const router = new Router();

router.post('/', async (ctx, next) => {
  ctx.body = await createWord(ctx);
});

export default router;