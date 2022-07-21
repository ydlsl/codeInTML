const { app, assert } = require('egg-mock/bootstrap');


describe('test/app/controller/home.test.js', () => {
  let tests = [
    {args: [1, 2],       expected: 3},
    {args: [1, 2, 3],    expected: 6},
    {args: [1, 2, 3, 4], expected: 10}
  ];
  let list;
  // describe('test/service/home.test.js', () => {
    it('list = undefined', async () => {
      const ctx = app.mockContext(); // 实例得放在it内
      ctx.request.body = {'asd': 12, 'ert': 456} //有用
      const res = await ctx.service.home.testForMocha(list);
      assert(!res)
    });

    tests.forEach(function(item) {
      it(`list = ${item.args}`, async () => {
        const ctx = app.mockContext();
        ctx.request.query = {'asd': 12} //有用
        list = item.args
        const res = await ctx.service.home.testForMocha(list);
        assert(res)
      });
    })
  // })
})