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

  ctx.body = await adminCheck(ctx);
});

router.post('/register', async (ctx, next) => {
  ctx.body = await register(ctx);
});

router.get('/login', async (ctx, next) => {
  const adminLogin = login(true);

  ctx.body = await adminLogin(ctx);
});

router.get('/logout', async (ctx, next) => {
  /**@desc no need to logout in server-side*/
  // ctx.body = await logout(ctx);
});

export default router;