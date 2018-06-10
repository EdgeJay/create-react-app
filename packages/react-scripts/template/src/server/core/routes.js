import Router from 'koa-router';

export default function initRoutes(app) {
  const router = new Router();

  router.get('landing', '/:top?', async ctx => {
    ctx.body = 'Hello world!!';
  });

  app.use(router.routes()).use(router.allowedMethods());
}
