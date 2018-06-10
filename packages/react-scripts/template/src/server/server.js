import Koa from 'koa';
import initRoutes from './core/routes';

const app = new Koa();

initRoutes(app);

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server running at port ${process.env.NODE_PORT}`);
});
