import Router from 'koa-router';

import {
  listQuestions,
  createQuestion
} from '../../apis/admin/question';

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = await listQuestions(ctx.query);
});

router.post('/', async (ctx, next) => {
  ctx.body = await createQuestion(ctx.request.body);
})

export default router;