import Router from 'koa-router';

import {
  listBooks,
  createBook,
  removeBook,
  modifyBook
} from '../../apis/admin/book.js';

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = await listBooks(ctx);
});

router.post('/', async (ctx, next) => {
  ctx.body = await createBook(ctx);
});

router.del('/', async (ctx, next) => {
  ctx.body = await removeBook(ctx);
});

router.put('/', async (ctx, next) => {
  ctx.body = await modifyBook(ctx);
});

export default router;