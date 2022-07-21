const Controller = require('egg').Controller;

class StuController extends Controller {
	async show1() {
		this.ctx.response.body = "这是get得到的信息";
	}
	async show2() {
		console.log('2222 = ', this.ctx.request.body)
		this.ctx.response.body = "这是post得到的信息";
	}
}

module.exports = StuController;
