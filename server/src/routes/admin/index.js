import Router from 'koa-router';

import RouteQuestion from './question';
import RouteScene from './scene';

const router = new Router();

router.use('/questions', RouteQuestion.routes(), RouteQuestion.allowedMethods());
router.use('/scenes', RouteScene.routes(), RouteScene.allowedMethods());

export default router;