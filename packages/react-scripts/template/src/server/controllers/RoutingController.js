import renderer from '../core/renderer';
import { shouldSkipPath } from '../utils/routeUtil';

export default class RoutingController {
  static async getPage(ctx, next) {
    if (shouldSkipPath(ctx)) {
      await next();
      return;
    }
    ctx.body = await renderer(ctx);
    ctx.type = 'html';
  }
}
