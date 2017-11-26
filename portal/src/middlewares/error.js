import { failedDec } from '../utils/api';

export default async (ctx, next) => {
  try {
    await next();
  } catch(e) {
    if(e.status === 401) {
      ctx.body = {
        status: 'LOGIN-ERROR',
        result: 'Not authorized!'
      };
    } else {
      ctx.body = failedDec(e.message);
    }
  }
}