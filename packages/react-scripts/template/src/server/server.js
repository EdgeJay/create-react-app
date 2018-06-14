import Koa from 'koa';
import initRoutes from './core/routes';
import initStatic from './core/static';

const app = new Koa();

initRoutes(app);
initStatic(app);

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server running at port ${process.env.NODE_PORT}`);
});
