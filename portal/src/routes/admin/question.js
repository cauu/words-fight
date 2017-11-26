import Router from 'koa-router';

import {
  listQuestions,
  createQuestion,
  removeQuestion,
  modifyQuestion
} from '../../apis/admin/question';

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = await listQuestions(ctx);
});

router.post('/', async (ctx, next) => {
  ctx.body = await createQuestion(ctx);
})

router.del('/', async (ctx, next) => {
  ctx.body = await removeQuestion(ctx);
});

router.put('/', async (ctx, next) => {
  ctx.body = await modifyQuestion(ctx);
});

export default router;