import Router from 'koa-router';

import {
  login,
  register,
  logout,
  checkAuth
} from '../../apis/auth';

const router = new Router();

router.get('/check', async (ctx, next) => {
  const adminCheck = checkAuth(true);
  console.log(adminCheck);

  ctx.body = await adminCheck(ctx);
});

router.post('/register', async (ctx, next) => {
  ctx.body = await register(ctx);
});

router.get('/login', async (ctx, next) => {
  const adminLogin = login(true);

  ctx.body = await adminLogin(ctx);
});

export default router;