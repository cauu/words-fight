import compose from 'koa-compose';
import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'hello';
})

router.get('*', async (ctx, next) => {
  ctx.body = { status: 404 };
})

export default function routes() {
  return compose(
    [
      router.routes(),
      router.allowedMethods()
    ]
  )
}