import Router from 'koa-router';

import RouteQuestion from './question';

const router = new Router();

router.use('/questions', RouteQuestion.routes(), RouteQuestion.allowedMethods());

export default router;