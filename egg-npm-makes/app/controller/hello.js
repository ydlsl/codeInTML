const Controller = require('egg').Controller;

class HelloController extends Controller {
  //@test index
  async index() {
    const { ctx } = this;
    console.log(' 00000000 = ', ctx.request.query)
    if(!ctx.request.query){
      throw new Error('没有参数')
    }
    ctx.response.body = "这是Hello!";
  }

  //@test index12
  async index12() {
    const { ctx } = this;
    ctx.response.body = "这是Hello!";
  }
}

module.exports = HelloController;