import renderer from '../core/renderer';

export default class RoutingController {
  static async getPage(ctx) {
    ctx.body = await renderer(ctx);
    ctx.type = 'html';
  }
}
