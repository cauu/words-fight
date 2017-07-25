import Router from 'koa-router';
import jwt from 'koa-jwt';

import RouteQuestion from './question';
import RouteScene from './scene';
import RouteLevel from './level';
import RouteBook from './book';

import RouteAuth from './auth';

import config from '../../config/config';

const router = new Router();

router.use('/auth', RouteAuth.routes(), RouteAuth.allowedMethods());

router.use(jwt({ secret: config.jwt.secret }));

router.use('/questions', RouteQuestion.routes(), RouteQuestion.allowedMethods());

router.use('/scenes', RouteScene.routes(), RouteScene.allowedMethods());
router.use('/levels', RouteLevel.routes(), RouteLevel.allowedMethods());
router.use('/books', RouteBook.routes(), RouteBook.allowedMethods());

export default router;