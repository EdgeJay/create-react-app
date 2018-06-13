import renderer from '../core/renderer';

export default class RoutingController {
  static async getPage(ctx) {
    console.log(await renderer(ctx));
    ctx.body = `Hello ${ctx.params.top}`;
  }
}
