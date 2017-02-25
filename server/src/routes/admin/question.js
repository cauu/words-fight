import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx, next) => {
  let plan = {
    'test': 'test',
    'haha': 'haha'
  }

  await testAsync();

  ctx.body = {
    status: 'SUCCESS',
    result: plan,
    pagination: {
      pageNo: 1,
      nextPageNo: 2
    }
  }
});

router.post('/', async (ctx, next) => {
  ctx.body = {
    status: "POST"
  }
})

export default router;