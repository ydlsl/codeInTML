const Controller = require('egg').Controller;

class HelloController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.response.body = "这是Hello!";
  }
}

module.exports = HelloController;