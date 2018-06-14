import path from 'path';
import serve from 'koa-static';
import { getBuildFolderPath } from '../../common/utils/appUtil';

export default function initRoutes(app) {
  if (process.env.ENABLE_SERVE_STATIC === 'true') {
    const staticPath = getBuildFolderPath();
    app.use(serve(staticPath));
  }
}
