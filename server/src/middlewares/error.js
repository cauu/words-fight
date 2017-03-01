import { failedDec } from '../utils/api';

export default async (ctx, next) => {
  try {
    await next();
  } catch(e) {
    ctx.body = failedDec(e.message);
  }
}