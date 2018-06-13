import Router from 'koa-router';
import RoutingController from '../controllers/RoutingController';

export default function initRoutes(app) {
  const router = new Router();

  router.get('landing', '/:top?', RoutingController.getPage);

  app.use(router.routes()).use(router.allowedMethods());
}
