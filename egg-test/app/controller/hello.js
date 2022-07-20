const Controller = require('egg').Controller;

class HelloController extends Controller {
  //@test index
  async index() {
    const { ctx } = this;
    ctx.response.body = "这是Hello!";
  }

  // index12
  async index12() {
    const { ctx } = this;
    ctx.response.body = "这是Hello!";
  }
}

module.exports = HelloController;