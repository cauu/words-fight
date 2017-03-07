import Router from 'koa-router';

import RouteQuestion from './question';
import RouteScene from './scene';
import RouteLevel from './level';
import RouteBook from './book';

const router = new Router();

router.use('/questions', RouteQuestion.routes(), RouteQuestion.allowedMethods());
router.use('/scenes', RouteScene.routes(), RouteScene.allowedMethods());
router.use('/levels', RouteLevel.routes(), RouteLevel.allowedMethods());
router.use('/books', RouteBook.routes(), RouteBook.allowedMethods());

export default router;